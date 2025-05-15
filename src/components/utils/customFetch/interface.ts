/**
 * Configuration options for customFetch requests
 */
export interface CustomFetchRequestInit extends Omit<RequestInit, "signal"> {
  isAuthorized?: boolean // Send request with auth data
  uploadFile?: boolean // Upload a file
  toAuthBackend?: boolean // Send to auth backend
  allowAutoRefresh?: boolean // Allow token refresh logic on auth failure
  timeout?: number // Request timeout in milliseconds
}

/**
 * Information about a request for debugging and logging purposes
 */
export interface RequestInfo {
  url: string
  method: string
}

/**
 * Base response structure from APIs
 */
export interface CustomFetchBaseResponse {
  title?: string
  description?: string
  code?: number
  success: boolean
  message: string
  detail?: unknown
  [x: string]: unknown
}

/**
 * Structured response type that extends base response
 */
export type StructuredResponse<T> = {
  success: boolean
  message: string
  data?: T
  status?: number
  detail?: unknown
  requestInfo?: RequestInfo // Added to provide context for errors
  redirectTo?: string
}

/**
 * Response format for token refresh operations
 */
export interface RefreshTokenResponse {
  access: string
  access_expiration: string
}
