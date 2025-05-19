import { customFetch } from ".."
import { CustomFetchBaseResponse, CustomFetchRequestInit, StructuredResponse } from "../interface"

/**
 * Sends a GET request using `customFetch`.
 *
 * WARNING: This function internally uses `customFetch`, which must only be run
 * from Next.js Server Components or invoked through a Client Component's form `action` attribute.
 *
 * @template T - The expected type of the response data.
 * @param url - The endpoint URL.
 * @param options - Optional fetch configuration.
 * @returns A `StructuredResponse` containing the result of the GET request.
 */
export const get = async <T = CustomFetchBaseResponse,>(
  url: string,
  options?: CustomFetchRequestInit
): Promise<StructuredResponse<T>> => {
  return customFetch<T>(url, { ...options, method: "GET" })
}

/**
 * Sends a POST request using `customFetch`, with support for JSON and file uploads.
 *
 * WARNING: This function internally uses `customFetch`, which must only be run
 * from Next.js Server Components or invoked through a Client Component's form `action` attribute.
 *
 * @template T - The expected type of the response data.
 * @template D - The type of the data to be sent in the request body.
 * @param url - The endpoint URL.
 * @param data - Optional payload to send in the request body.
 * @param options - Optional fetch configuration.
 * @returns A `StructuredResponse` containing the result of the POST request.
 */
export const post = async <T = CustomFetchBaseResponse, D = unknown>(
  url: string,
  data?: D,
  options?: CustomFetchRequestInit
): Promise<StructuredResponse<T>> => {
  const isUpload = options?.uploadFile ?? false

  return customFetch<T>(url, {
    ...options,
    method: "POST",
    body: data ? (isUpload ? (data as BodyInit) : JSON.stringify(data)) : undefined,
  })
}

/**
 * Sends a PUT request using `customFetch`, with support for JSON and file uploads.
 *
 * WARNING: This function internally uses `customFetch`, which must only be run
 * from Next.js Server Components or invoked through a Client Component's form `action` attribute.
 *
 * @template T - The expected type of the response data.
 * @template D - The type of the data to be sent in the request body.
 * @param url - The endpoint URL.
 * @param data - Optional payload to send in the request body.
 * @param options - Optional fetch configuration.
 * @returns A `StructuredResponse` containing the result of the PUT request.
 */
export const put = async <T = CustomFetchBaseResponse, D = unknown>(
  url: string,
  data?: D,
  options?: CustomFetchRequestInit
): Promise<StructuredResponse<T>> => {
  const isUpload = options?.uploadFile ?? false

  return customFetch<T>(url, {
    ...options,
    method: "PUT",
    body: data ? (isUpload ? (data as BodyInit) : JSON.stringify(data)) : undefined,
  })
}

/**
 * Sends a DELETE request using `customFetch`.
 *
 * WARNING: This function internally uses `customFetch`, which must only be run
 * from Next.js Server Components or invoked through a Client Component's form `action` attribute.
 *
 * @template T - The expected type of the response data.
 * @param url - The endpoint URL.
 * @param options - Optional fetch configuration.
 * @returns A `StructuredResponse` containing the result of the DELETE request.
 */
export const del = async <T = CustomFetchBaseResponse,>(
  url: string,
  options?: CustomFetchRequestInit
): Promise<StructuredResponse<T>> => {
  return customFetch<T>(url, { ...options, method: "DELETE" })
}
