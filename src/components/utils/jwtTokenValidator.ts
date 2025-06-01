import { importSPKI, jwtVerify } from "jose"
import { UserRole } from "@/components/contexts/AuthContext/interface"
import { env } from "env.mjs"

export interface AccessTokenPayload {
  sub: string
  iat: number
  exp: number
  fullName: string
  role: UserRole
  type: "access" | "refresh" | string
  userId: string
}

type JwtVerificationResult<T> = {
  payload: T | null
  error: Error | null
}

/**
 * Verifies a JWT token using a base64-encoded PEM public key (RS256).
 *
 * @param token - The JWT string to validate
 * @returns An object containing the verified payload or an error
 */
export async function verifyJwtRS256<T extends object = AccessTokenPayload>(
  token: string
): Promise<JwtVerificationResult<T>> {
  try {
    const base64Pem = env.JWT_PUBLIC_KEY

    const pem = Buffer.from(base64Pem, "base64").toString("utf-8")
    const publicKey = await importSPKI(pem, "RS256")

    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ["RS256"],
    })

    return { payload: payload as T, error: null }
  } catch (err) {
    return { payload: null, error: err instanceof Error ? err : new Error(String(err)) }
  }
}
