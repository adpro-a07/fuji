"use server"

import { cookies } from "next/headers"
import { z } from "zod"
import { post } from "@/components/utils/customFetch/serverFetchClients"
import { loginFormSchema } from "@/modules/LoginPageModule/constant"
import { LoginResponse } from "./interface"
import { StructuredResponse } from "@/components/utils/customFetch/interface"

export const loginAction = async (values: z.infer<typeof loginFormSchema>) => {
  const response = await post<LoginResponse>("/api/v1/auth/login", values, {
    toAuthBackend: true,
  })

  if (!response.data || !response.success) {
    return response
  }

  const cookieStore = await cookies()

  cookieStore.set("kilimanjaro-access", response.data.accessToken, {
    httpOnly: true,
    sameSite: "strict",
  })
  cookieStore.set("kilimanjaro-refresh", response.data.refreshToken, {
    httpOnly: true,
    sameSite: "strict",
  })

  return response as StructuredResponse<LoginResponse>
}
