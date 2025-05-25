"use server"

import { cookies } from "next/headers"
import { StructuredResponse } from "../customFetch/interface"

export const logoutAction = async (): Promise<StructuredResponse<unknown>> => {
  const cookieStore = await cookies()

  cookieStore.delete("kilimanjaro-access")
  cookieStore.delete("kilimanjaro-refresh")

  return {
    success: true,
    message: "Successfully logged out",
    data: null,
  }
}
