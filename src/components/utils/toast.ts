import { toast } from "sonner"
import { StructuredResponse } from "@/components/utils/customFetch/interface"

/**
 * Configuration for toast messages and actions
 */
export interface ToastConfig<T = unknown> {
  loading?: string
  success?: string | ((data?: T) => string)
  error?: string | ((error: string) => string)
  onSuccess?: (data?: T) => void | Promise<void>
  onError?: (error: string) => void
}

/**
 * Default toast messages for common operations
 */
export const TOAST_MESSAGES = {
  CREATE: {
    loading: "Creating...",
    success: "Successfully created!",
    error: "Failed to create",
  },
  UPDATE: {
    loading: "Updating...",
    success: "Successfully updated!",
    error: "Failed to update",
  },
  DELETE: {
    loading: "Deleting...",
    success: "Successfully deleted!",
    error: "Failed to delete",
  },
  SUBMIT: {
    loading: "Submitting...",
    success: "Successfully submitted!",
    error: "Failed to submit",
  },
} as const

/**
 * Enhanced toast handler that works seamlessly with StructuredResponse
 */
export async function handleToastAction<T>(
  action: () => Promise<StructuredResponse<T>>,
  config: ToastConfig
): Promise<StructuredResponse<T>> {
  let result: StructuredResponse<T>

  try {
    toast.promise(
      async () => {
        result = await action()

        if (!result.success) {
          throw new Error(result.message || "Operation failed")
        }

        // Execute success callback if provided
        if (config.onSuccess) {
          await config.onSuccess(result.data)
        }

        return result
      },
      {
        loading: config.loading || "Processing...",
        success: (response) => {
          const successMessage =
            typeof config.success === "function"
              ? config.success(response.data)
              : config.success || "Operation completed successfully"
          return successMessage
        },
        error: (error) => {
          const errorMessage =
            typeof config.error === "function"
              ? config.error(error.message)
              : error.message || config.error || "Operation failed"

          // Execute error callback if provided
          if (config.onError) {
            config.onError(error.message)
          }

          return errorMessage
        },
      }
    )

    return result!
  } catch (error) {
    // If something goes wrong with the toast, still return the result
    // This ensures we always return a StructuredResponse
    return (
      result! ||
      ({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      } as StructuredResponse<T>)
    )
  }
}

/**
 * Simplified toast handler for basic operations
 */
export async function handleSimpleToast<T>(
  action: () => Promise<StructuredResponse<T>>,
  operation: keyof typeof TOAST_MESSAGES,
  customMessages?: Partial<ToastConfig>
): Promise<StructuredResponse<T>> {
  const baseMessages = TOAST_MESSAGES[operation]

  return handleToastAction(action, {
    loading: customMessages?.loading || baseMessages.loading,
    success: customMessages?.success || baseMessages.success,
    error: customMessages?.error || baseMessages.error,
    onSuccess: customMessages?.onSuccess,
    onError: customMessages?.onError,
  })
}

/**
 * Form submission handler with built-in error handling and navigation
 */
export async function handleFormSubmission<T>(
  action: () => Promise<StructuredResponse<T>>,
  config: ToastConfig & {
    redirectTo?: string
    router?: { push: (url: string) => void }
  }
): Promise<StructuredResponse<T>> {
  const { redirectTo, router, ...toastConfig } = config

  return handleToastAction(action, {
    ...toastConfig,
    onSuccess: async (data) => {
      // Execute custom success callback first
      if (toastConfig.onSuccess) {
        await toastConfig.onSuccess(data)
      }

      // Handle navigation
      if (redirectTo && router) {
        router.push(redirectTo)
      }
    },
  })
}

/**
 * Hook for consistent form submission handling
 */
export function useFormToast() {
  return {
    handleSubmission: handleFormSubmission,
    handleAction: handleToastAction,
    handleSimple: handleSimpleToast,
  }
}

// Pre-configured toast handlers for common scenarios
export const toastHandlers = {
  create: <T>(action: () => Promise<StructuredResponse<T>>, customConfig?: Partial<ToastConfig>) =>
    handleSimpleToast(action, "CREATE", customConfig),

  update: <T>(action: () => Promise<StructuredResponse<T>>, customConfig?: Partial<ToastConfig>) =>
    handleSimpleToast(action, "UPDATE", customConfig),

  delete: <T>(action: () => Promise<StructuredResponse<T>>, customConfig?: Partial<ToastConfig>) =>
    handleSimpleToast(action, "DELETE", customConfig),

  submit: <T>(action: () => Promise<StructuredResponse<T>>, customConfig?: Partial<ToastConfig>) =>
    handleSimpleToast(action, "SUBMIT", customConfig),
}
