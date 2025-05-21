import * as grpc from "@grpc/grpc-js"
import { UUID } from "crypto"
import { promisify } from "util"
import { GRPC_CONFIG } from "./config"
import { AuthServiceDefinition } from "./grpc-client"
import { TokenValidationResponse } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/TokenValidationResponse"
import { UserLookupResponse } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserLookupResponse"
import { TokenValidationRequest } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/TokenValidationRequest"
import { UserLookupRequest } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserLookupRequest"

/**
 * Custom error class for gRPC errors
 */
export class GrpcError extends Error {
  constructor(
    public code: grpc.status,
    message: string
  ) {
    super(message)
    this.name = "GrpcError"
  }

  static fromError(error: unknown, defaultMessage: string): GrpcError {
    if (error instanceof GrpcError) {
      return error
    }

    const errorObj = error as Error
    const grpcCode = (error as any)?.code || grpc.status.UNKNOWN
    const message = errorObj?.message || defaultMessage

    return new GrpcError(grpcCode, message)
  }
}

/**
 * Response type for auth service methods
 */
export type AuthServiceResponse<T> = {
  data: T | null
  error: GrpcError | null
}

/**
 * Auth service client with connection management and typed response handling
 */
export class AuthClient {
  private static instance: AuthClient | null = null
  private client: InstanceType<typeof AuthServiceDefinition>
  private connected: boolean = false

  private constructor() {
    this.client = new AuthServiceDefinition(
      GRPC_CONFIG.AUTH_SERVICE.URL,
      process.env.NODE_ENV === "production" ? grpc.credentials.createSsl() : grpc.credentials.createInsecure(),
      {
        "grpc.keepalive_time_ms": 30000,
        "grpc.keepalive_timeout_ms": 10000,
        "grpc.max_reconnect_backoff_ms": 5000,
      }
    )
  }

  /**
   * Get singleton instance of auth client
   */
  public static getInstance(): AuthClient {
    if (!AuthClient.instance) {
      AuthClient.instance = new AuthClient()
    }
    return AuthClient.instance
  }

  /**
   * Ensure client is connected
   */
  private async ensureConnected(): Promise<void> {
    if (this.connected) return

    return new Promise<void>((resolve, reject) => {
      const deadline = new Date()
      deadline.setSeconds(deadline.getSeconds() + 5)

      this.client.waitForReady(deadline, (error) => {
        if (error) {
          reject(new GrpcError(grpc.status.UNAVAILABLE, `Failed to connect to auth service: ${error.message}`))
          return
        }

        this.connected = true
        resolve()
      })
    })
  }

  /**
   * Close the gRPC connection
   */
  public close(): void {
    if (this.connected) {
      this.client.close()
      this.connected = false
    }
  }

  /**
   * Validate a user token
   */
  public async validateToken(
    token: string,
    includeUserData = true
  ): Promise<AuthServiceResponse<TokenValidationResponse>> {
    try {
      await this.ensureConnected()

      // Use properly typed request object
      const request: TokenValidationRequest = {
        token,
        includeUserData,
      }

      // Explicitly type the promisified function
      type ValidateTokenFn = (request: TokenValidationRequest) => Promise<TokenValidationResponse>

      const validateTokenCall = promisify(this.client.validateToken.bind(this.client)) as ValidateTokenFn

      const data = await validateTokenCall(request)
      return { data, error: null }
    } catch (error) {
      const grpcError = GrpcError.fromError(error, "Token validation failed")

      return { data: null, error: grpcError }
    }
  }

  /**
   * Look up a user by ID
   */
  public async lookupUserById(id: UUID): Promise<AuthServiceResponse<UserLookupResponse>> {
    try {
      await this.ensureConnected()

      // Use properly typed request object
      const request: UserLookupRequest = {
        identifier: "userId",
        userId: id,
      }

      // Explicitly type the promisified function
      type LookupUserFn = (request: UserLookupRequest) => Promise<UserLookupResponse>

      const lookupUserCall = promisify(this.client.lookupUser.bind(this.client)) as LookupUserFn

      const data = await lookupUserCall(request)
      return { data, error: null }
    } catch (error) {
      const grpcError = GrpcError.fromError(error, "User lookup failed")

      return { data: null, error: grpcError }
    }
  }
}
