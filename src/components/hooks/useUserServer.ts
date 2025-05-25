import { getCookie } from "cookies-next/server"
import { cookies } from "next/headers"
import { AuthClient } from "@/lib/grpc/auth-service"

export default async function useUserServer() {
  const access = await getCookie("kilimanjaro-access", { cookies })
  if (!access) {
    return null
  }

  try {
    const authClient = AuthClient.getInstance()
    const { data, error } = await authClient.validateToken(access)

    if (error) {
      console.error("Auth error: ", error.message)
    }

    if (!data || !data.userData) {
      return null
    }

    return data.userData
  } catch {
    return null
  }
}
