import { toast } from "sonner"

/**
 * Error types for better error handling and categorization
 */
export enum ErrorType {
  VALIDATION = "validation",
  NETWORK = "network",
  SERVER = "server",
  AUTH = "auth",
  UNKNOWN = "unknown",
}

/**
 * Extended error interface with additional context
 */
export interface EnhancedError extends Error {
  type?: ErrorType
  details?: Record<string, any>
  code?: string | number
}

/**
 * Interface for toast messages configuration
 */
export interface ToastMessages {
  loading: string
  success: string | ((data: any) => string)
  error: string | ((error: EnhancedError) => string)
}

/**
 * Interface for toast callbacks
 */
export interface ToastCallbacks<T> {
  onSuccess?: (data: T) => void
  onError?: (error: EnhancedError) => void
}

/**
 * Interface for toast promise options
 */
export interface ToastPromiseOptions<T> {
  messages: ToastMessages
  callbacks?: ToastCallbacks<T>
  errorTypeHandlers?: Partial<Record<ErrorType, (error: EnhancedError) => string>>
}

/**
 * Helper function to categorize errors
 */
export function categorizeError(error: any): EnhancedError {
  const enhancedError: EnhancedError =
    error instanceof Error ? error : new Error(typeof error === "string" ? error : "Unknown error")

  // Error already categorized
  if (enhancedError.type) {
    return enhancedError
  }

  // Network error detection
  if (!navigator.onLine || error?.message?.includes("network") || error?.message?.includes("fetch")) {
    enhancedError.type = ErrorType.NETWORK
    return enhancedError
  }

  // Check for authentication errors
  if (error?.status === 401 || error?.code === 401 || error?.message?.includes("unauthorized")) {
    enhancedError.type = ErrorType.AUTH
    return enhancedError
  }

  // Check for server errors
  if (error?.status >= 500 || error?.code >= 500) {
    enhancedError.type = ErrorType.SERVER
    return enhancedError
  }

  // Check for validation errors
  if (error?.status === 400 || error?.code === 400 || error?.message?.includes("validation")) {
    enhancedError.type = ErrorType.VALIDATION
    return enhancedError
  }

  // Default to unknown
  enhancedError.type = ErrorType.UNKNOWN
  return enhancedError
}

/**
 * Create a default error message based on error type
 */
function getDefaultErrorMessage(error: EnhancedError): string {
  switch (error.type) {
    case ErrorType.NETWORK:
      return "Network error. Please check your connection and try again."
    case ErrorType.SERVER:
      return "Server error. Our team has been notified. Please try again later."
    case ErrorType.AUTH:
      return "Authentication error. Please log in again."
    case ErrorType.VALIDATION:
      return error.message || "The provided data is invalid."
    default:
      return error.message || "An unexpected error occurred. Please try again."
  }
}

/**
 * The main toast promise utility function
 */
export function useToastPromise<T = any>() {
  return {
    /**
     * Wraps a promise with toast notifications
     */
    toastPromise: <P extends Promise<T>>(promise: P, options: ToastPromiseOptions<T>): P => {
      // Extract options with defaults
      const { messages, callbacks = {}, errorTypeHandlers = {} } = options

      // Create enhanced promise that handles errors properly
      const enhancedPromise = promise
        .then((result) => {
          if (callbacks.onSuccess) {
            callbacks.onSuccess(result)
          }
          return result
        })
        .catch((error) => {
          // Enhance and categorize the error
          const enhancedError = categorizeError(error)

          // Log the error for debugging
          console.error("Operation failed:", enhancedError)

          if (callbacks.onError) {
            callbacks.onError(enhancedError)
          }

          throw enhancedError
        }) as P

      // Show toast with the enhanced promise
      toast.promise(enhancedPromise, {
        loading: messages.loading,
        success: (data) => {
          if (typeof messages.success === "function") {
            return messages.success(data)
          }
          return messages.success
        },
        error: (error: EnhancedError) => {
          // Use type-specific handler if available
          if (error.type && errorTypeHandlers[error.type]) {
            return errorTypeHandlers[error.type]!(error)
          }

          // Use custom error formatter if provided
          if (typeof messages.error === "function") {
            return messages.error(error)
          }

          // Use default error message based on type
          return messages.error || getDefaultErrorMessage(error)
        },
      })

      return enhancedPromise
    },
  }
}

/**
 * Create an enhanced error with proper typing and context
 */
export function createError(
  message: string,
  type: ErrorType = ErrorType.UNKNOWN,
  details?: Record<string, any>,
  code?: string | number
): EnhancedError {
  const error = new Error(message) as EnhancedError
  error.type = type
  error.details = details
  error.code = code
  return error
}
