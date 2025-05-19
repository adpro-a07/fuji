"use server"
import { cookies } from "next/headers"
import { env } from "env.mjs"
import { CustomFetchBaseResponse, CustomFetchRequestInit, RefreshTokenResponse, StructuredResponse } from "./interface"

// Track refresh token state
let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null
// Queue for pending requests during token refresh
const requestQueue: Array<() => void> = []

// Default request timeout in milliseconds (30 seconds)
const DEFAULT_TIMEOUT = 30000

function isSafeRelativeUrl(url: string): boolean {
  if (typeof url !== "string") return false
  if (url.startsWith("http://") || url.startsWith("https://")) return false
  if (!url.startsWith("/")) return false
  if (url.includes("..") || url.includes("\\")) return false
  return true
}

/**
 * Determines if a response already has the expected StructuredResponse format
 * by checking for required properties
 */
function isStructuredResponse<T>(data: unknown): data is StructuredResponse<T> {
  return (
    data !== null &&
    typeof data === "object" &&
    "success" in data &&
    typeof data.success === "boolean" &&
    "message" in data &&
    typeof data.message === "string"
  )
}

/**
 * Performs a customized fetch request with support for token-based authentication,
 * automatic token refreshing, file uploads, and error handling.
 *
 * WARNING: This function accesses `cookies()` and `redirect()` from `next/headers` and `next/navigation`.
 * It MUST only be used in **Next.js Server Components** or in **Client Components through a form `action` attribute**.
 * Do NOT call this directly from regular Client Components or hooks (like `useEffect`) as it will cause runtime errors.
 *
 * @template T - The expected type of the response data.
 * @param url - The endpoint URL (relative to the appropriate base URL).
 * @param options - Optional configuration for the request, including auth, method, headers, etc.
 * @param _isRetry - Internal flag to indicate whether this is a retry after a token refresh.
 * @returns A `StructuredResponse` containing success status, message, optional data, and status code.
 */
export async function customFetch<T = CustomFetchBaseResponse>(
  url: string,
  options: CustomFetchRequestInit = { uploadFile: false },
  _isRetry = false
): Promise<StructuredResponse<T>> {
  const {
    isAuthorized = false,
    uploadFile = false,
    toAuthBackend = false,
    allowAutoRefresh = true,
    timeout = DEFAULT_TIMEOUT,
    ...fetchOptions
  } = options

  const headers: HeadersInit = {}

  // Get appropriate base URL
  const baseUrl = toAuthBackend ? env.AUTH_REST_URL : env.MAIN_REST_URL
  if (!baseUrl) {
    return {
      success: false,
      message: "API base URL is not defined in environment variables",
    }
  }

  if (!isSafeRelativeUrl(url)) {
    return {
      success: false,
      message: "Invalid URL: only relative paths are allowed",
    }
  }

  const fullUrl = new URL(url, baseUrl)

  // Support for request cancellation
  const abortController = new AbortController()
  const timeoutId = timeout ? setTimeout(() => abortController.abort(), timeout) : null

  try {
    // Handle authorization
    if (isAuthorized) {
      const cookieStore = await cookies()
      const token = cookieStore.get("kilimanjaro-access")

      if (token) {
        headers["authorization"] = `Bearer ${token.value}`

        // Proactively check for near-expiration tokens
        // This requires token to be a JWT with an exp claim
        if (allowAutoRefresh && isTokenNearExpiration(token.value)) {
          if (!_isRetry) {
            await refreshAccessTokenWithQueue()
            // Get the new token after refresh
            const newToken = cookieStore.get("kilimanjaro-access")
            if (newToken) {
              headers["authorization"] = `Bearer ${newToken.value}`
            } else {
              return {
                success: false,
                message: "Unauthorized",
                redirectTo: "/login",
              }
            }
          }
        }
      } else {
        return {
          success: false,
          message: "Unauthorized",
          redirectTo: "/login",
        }
      }
    }

    // Set content type appropriately
    if (uploadFile) {
      // Let browser set content type for file uploads
      delete headers["Content-Type"]
    } else {
      headers["Content-Type"] = "application/json"
    }

    const requestOptions: RequestInit = {
      ...fetchOptions,
      headers: { ...headers, ...(fetchOptions.headers || {}) },
      signal: abortController.signal,
    }

    const response = await fetch(fullUrl.toString(), requestOptions)

    // Handle token refresh if needed
    if (response.status === 401 && isAuthorized && !_isRetry) {
      if (allowAutoRefresh) {
        const didRefresh = await refreshAccessTokenWithQueue()

        if (didRefresh) {
          console.info(`[customFetch] Token refreshed, retrying request to ${url}`)
          return customFetch<T>(url, options, true)
        }
        console.warn(`[customFetch] Token refresh failed, redirecting to login`)
      }
      return {
        success: false,
        message: "Unauthorized",
        redirectTo: "/login",
      }
    }

    // Handle non-successful responses
    if (!response.ok) {
      let errorDetail = response.statusText

      try {
        const contentType = response.headers.get("content-type")
        if (contentType?.includes("application/json")) {
          const errorBody = await response.json()

          // Check if error response is already in StructuredResponse format
          if (isStructuredResponse(errorBody)) {
            return errorBody as StructuredResponse<T>
          }

          // Otherwise, extract error details
          if (errorBody && typeof errorBody === "object") {
            errorDetail = (
              "detail" in errorBody
                ? errorBody.detail
                : "message" in errorBody
                ? errorBody.message
                : JSON.stringify(errorBody)
            ) as string
          } else {
            errorDetail = JSON.stringify(errorBody)
          }
        } else {
          errorDetail = (await response.text()) || response.statusText
        }
      } catch {
        // If we can't parse the error, use status text
      }

      return {
        success: false,
        message: errorDetail,
        status: response.status,
        requestInfo: {
          url: fullUrl.toString(),
          method: requestOptions.method || "GET",
        },
      }
    }

    // Handle empty response
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return {
        success: true,
        message: "Operation completed successfully",
        data: {} as T,
        status: response.status,
      }
    }

    // Process successful response based on content type
    const contentType = response.headers.get("content-type")

    if (contentType?.includes("application/json")) {
      const jsonData = await response.json()

      // If the response is already in the StructuredResponse format, return it directly
      if (isStructuredResponse<T>(jsonData)) {
        return jsonData as StructuredResponse<T>
      }

      // Otherwise, wrap it in a StructuredResponse
      return {
        success: true,
        message: "Request completed successfully",
        data: jsonData as T,
        status: response.status,
      }
    } else if (contentType?.includes("text/")) {
      const textData = await response.text()
      return {
        success: true,
        message: "Request completed successfully",
        data: textData as unknown as T,
        status: response.status,
      }
    } else {
      const blobData = await response.blob()
      return {
        success: true,
        message: "Request completed successfully",
        data: blobData as unknown as T,
        status: response.status,
      }
    }
  } catch (error) {
    // Handle different error types
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        success: false,
        message: `Request timeout after ${timeout}ms`,
        status: 408, // Request Timeout
        requestInfo: {
          url: fullUrl.toString(),
          method: fetchOptions.method || "GET",
        },
      }
    }

    // Handle network errors
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown network error occurred",
      status: 0, // Use 0 to indicate network/connection error
      requestInfo: {
        url: fullUrl.toString(),
        method: fetchOptions.method || "GET",
      },
    }
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }
}

/**
 * Checks if a JWT token is nearing expiration (within 60 seconds)
 */
function isTokenNearExpiration(token: string, thresholdSeconds = 60): boolean {
  try {
    const base64Url = token.split(".")[1]
    if (!base64Url) return false

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8")

    const payload = JSON.parse(jsonPayload) as { exp?: number }

    if (typeof payload.exp === "number") {
      return payload.exp * 1000 - Date.now() < thresholdSeconds * 1000
    }

    return false
  } catch (error) {
    console.warn("[customFetch] Failed to check token expiration", error)
    return false
  }
}

/**
 * Refreshes the access token using a queue mechanism to prevent multiple refresh requests
 */
async function refreshAccessTokenWithQueue(): Promise<boolean> {
  // If already refreshing, wait for that to complete
  if (isRefreshing) {
    return new Promise<boolean>((resolve) => {
      requestQueue.push(() => resolve(refreshPromise || Promise.resolve(false)))
    })
  }

  // Start a new refresh
  isRefreshing = true
  refreshPromise = refreshAccessToken().finally(() => {
    isRefreshing = false
    refreshPromise = null

    // Process queued requests
    while (requestQueue.length) {
      const nextRequest = requestQueue.shift()
      nextRequest?.()
    }
  })

  return refreshPromise
}

// Refresh token function
async function refreshAccessToken(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("kilimanjaro-refresh")

    if (!refreshToken) {
      return false
    }

    const response = await fetch(`${env.AUTH_API_URL}/api/v1/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken.value }),
    })

    if (!response.ok) {
      return false
    }

    const tokens = (await response.json()) as RefreshTokenResponse
    cookieStore.set("kilimanjaro-access", tokens.access)
    return true
  } catch {
    return false
  }
}
