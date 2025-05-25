"use server"
import { cookies } from "next/headers"
import { env } from "env.mjs"
import { CustomFetchBaseResponse, CustomFetchRequestInit, StructuredResponse } from "./interface"

// Default request timeout in milliseconds (30 seconds)
const DEFAULT_TIMEOUT = 30000
// Maximum response size (10MB)
const MAX_RESPONSE_SIZE = 10 * 1024 * 1024

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
 * Logs request details in development mode
 */
function logRequest(method: string, url: string, isAuthorized: boolean) {
  if (process.env.NODE_ENV === "development") {
    const authStatus = isAuthorized ? "[AUTH]" : "[PUBLIC]"
    console.log(`${authStatus} ${method} ${url}`)
  }
}

/**
 * Performs a customized fetch request with support for token-based authentication,
 * file uploads, and comprehensive error handling.
 *
 * WARNING: This function accesses `cookies()` from `next/headers`.
 * It MUST only be used in **Next.js Server Components** or in **Client Components through a form `action` attribute**.
 * Do NOT call this directly from regular Client Components or hooks (like `useEffect`) as it will cause runtime errors.
 *
 * @template T - The expected type of the response data.
 * @param url - The endpoint URL (relative to the appropriate base URL).
 * @param options - Optional configuration for the request, including auth, method, headers, etc.
 * @returns A `StructuredResponse` containing success status, message, optional data, and status code.
 */
export async function customFetch<T = CustomFetchBaseResponse>(
  url: string,
  options: CustomFetchRequestInit = { uploadFile: false }
): Promise<StructuredResponse<T>> {
  const {
    isAuthorized = false,
    uploadFile = false,
    toAuthBackend = false,
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
  const method = fetchOptions.method || "GET"

  // Support for request cancellation
  const abortController = new AbortController()
  const timeoutId = timeout ? setTimeout(() => abortController.abort(), timeout) : null

  try {
    // Handle authorization
    if (isAuthorized) {
      const cookieStore = await cookies()
      const accessToken = cookieStore.get("kilimanjaro-access")

      if (accessToken) {
        headers["authorization"] = `Bearer ${accessToken.value}`
      } else {
        return {
          success: false,
          message: "Unauthorized: Access token not found",
          redirectTo: "/login",
        }
      }
    }

    // Set content type for non-file uploads
    if (!uploadFile) {
      headers["Content-Type"] = "application/json"
    }

    const requestOptions: RequestInit = {
      ...fetchOptions,
      headers: { ...headers, ...(fetchOptions.headers || {}) },
      signal: abortController.signal,
    }

    // Log request in development
    logRequest(method, fullUrl.toString(), isAuthorized)

    const response = await fetch(fullUrl.toString(), requestOptions)

    // Check response size
    const contentLength = response.headers.get("content-length")
    if (contentLength && parseInt(contentLength) > MAX_RESPONSE_SIZE) {
      return {
        success: false,
        message: "Response too large",
        status: 413,
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

          // Extract error details from common API error formats
          if (errorBody && typeof errorBody === "object") {
            errorDetail = (
              "detail" in errorBody
                ? errorBody.detail
                : "message" in errorBody
                ? errorBody.message
                : "error" in errorBody
                ? errorBody.error
                : JSON.stringify(errorBody)
            ) as string
          }
        } else {
          const textError = await response.text()
          errorDetail = textError || response.statusText
        }
      } catch {
        // If we can't parse the error, use status text
        errorDetail = response.statusText
      }

      return {
        success: false,
        message: errorDetail,
        status: response.status,
        requestInfo: {
          url: fullUrl.toString(),
          method,
        },
      }
    }

    // Handle empty response (204 No Content)
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
      // Handle binary data (images, files, etc.)
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
          method,
        },
      }
    }

    // Handle network and other errors
    const errorMessage = error instanceof Error ? error.message : "Unknown network error occurred"

    return {
      success: false,
      message: errorMessage,
      status: 0, // Use 0 to indicate network/connection error
      requestInfo: {
        url: fullUrl.toString(),
        method,
      },
    }
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }
}
