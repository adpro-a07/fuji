import { getCookie } from "cookies-next/server"
import { cookies } from "next/headers"
import { AuthClientService } from "../utils/grpcClient/grpc-service"

export default async function useUserServer() {
  const access = await getCookie("kilimanjaro-access", { cookies })
  if (!access) {
    return null
  }

  try {
    const authService = new AuthClientService()

    const { client } = await authService.callValidateToken(access)

    if (!client?.valid) return null

    return client.userData
  } catch {
    return null
  }
}
