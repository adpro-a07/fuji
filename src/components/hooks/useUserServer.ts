import { getCookie } from "cookies-next/server"
import { cookies } from "next/headers"
import { UUID } from "crypto"
import { AuthClient } from "@/lib/grpc/auth-service"
import { verifyJwtRS256 } from "../utils/jwtTokenValidator"

export default async function useUserServer() {
  const access = await getCookie("kilimanjaro-access", { cookies })
  if (!access) {
    return null
  }

  try {
    const { payload, error: jwtError } = await verifyJwtRS256(access)

    if (jwtError) {
      console.error("Auth error: ", jwtError.message)
      throw new Error("Invalid access token")
    }

    const authClient = AuthClient.getInstance()
    const { data, error: lookupError } = await authClient.lookupUserById(payload?.userId as UUID)

    if (lookupError || !data?.userData) {
      return null
    }

    return data.userData
  } catch {
    return null
  }
}
