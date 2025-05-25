import * as grpc from "@grpc/grpc-js"
import { UUID } from "crypto"
import { promisify } from "util"
import { BatchUserLookupRequest } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/BatchUserLookupRequest"
import { BatchUserLookupResponse } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/BatchUserLookupResponse"
import { GetRandomTechnicianRequest } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/GetRandomTechnicianRequest"
import { GetRandomTechnicianResponse } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/GetRandomTechnicianResponse"
import { ListUsersRequest } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/ListUsersRequest"
import { ListUsersResponse } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/ListUsersResponse"
import { RequestMetadata } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/RequestMetadata"
import { TokenRefreshRequest } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/TokenRefreshRequest"
import { TokenRefreshResponse } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/TokenRefreshResponse"
import { TokenValidationRequest } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/TokenValidationRequest"
import { TokenValidationResponse } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/TokenValidationResponse"
import { UserIdentifier } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserIdentifier"
import { UserLookupRequest } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserLookupRequest"
import { UserLookupResponse } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserLookupResponse"
import { UserRole } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserRole"
import { GRPC_CONFIG } from "./config"
import { AuthServiceDefinition, UserServiceDefinition } from "./grpc-client"

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

    const hasGrpcCode = (err: unknown): err is { code: grpc.status } =>
      typeof err === "object" && err !== null && "code" in err && typeof (err as { code?: unknown }).code === "number"

    const grpcCode = hasGrpcCode(error) ? error.code : grpc.status.UNKNOWN
    const message = (error as Error)?.message || defaultMessage

    return new GrpcError(grpcCode, message)
  }
}

/**
 * Response type for auth service methods
 */
export type ServiceResponse<T> = {
  data: T | null
  error: GrpcError | null
}

/**
 * Create a standard request metadata object
 */
const createRequestMetadata = (): RequestMetadata => {
  return {
    requestId: crypto.randomUUID(),
    clientVersion: GRPC_CONFIG.CLIENT_VERSION,
    correlationId: crypto.randomUUID(),
  }
}

/**
 * Auth service client with connection management and typed response handling
 */
export class AuthClient {
  private static instance: AuthClient | null = null
  private authClient: InstanceType<typeof AuthServiceDefinition>
  private userClient: InstanceType<typeof UserServiceDefinition>
  private authConnected: boolean = false
  private userConnected: boolean = false

  private constructor() {
    const serviceUrl = GRPC_CONFIG.AUTH_SERVICE.URL
    const grpcOptions = {
      "grpc.keepalive_time_ms": 30000,
      "grpc.keepalive_timeout_ms": 10000,
      "grpc.max_reconnect_backoff_ms": 5000,
    }

    // Initialize AuthService client
    this.authClient = new AuthServiceDefinition(serviceUrl, grpc.credentials.createInsecure(), grpcOptions)

    // Initialize UserService client
    this.userClient = new UserServiceDefinition(serviceUrl, grpc.credentials.createInsecure(), grpcOptions)
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
   * Ensure auth client is connected
   */
  private async ensureAuthConnected(): Promise<void> {
    if (this.authConnected) return
    return new Promise<void>((resolve, reject) => {
      const deadline = new Date()
      deadline.setSeconds(deadline.getSeconds() + 5)
      this.authClient.waitForReady(deadline, (error) => {
        if (error) {
          reject(new GrpcError(grpc.status.UNAVAILABLE, `Failed to connect to auth service: ${error.message}`))
          return
        }
        this.authConnected = true
        resolve()
      })
    })
  }

  /**
   * Ensure user client is connected
   */
  private async ensureUserConnected(): Promise<void> {
    if (this.userConnected) return
    return new Promise<void>((resolve, reject) => {
      const deadline = new Date()
      deadline.setSeconds(deadline.getSeconds() + 5)
      this.userClient.waitForReady(deadline, (error) => {
        if (error) {
          reject(new GrpcError(grpc.status.UNAVAILABLE, `Failed to connect to user service: ${error.message}`))
          return
        }
        this.userConnected = true
        resolve()
      })
    })
  }

  /**
   * Close all gRPC connections
   */
  public close(): void {
    if (this.authConnected) {
      this.authClient.close()
      this.authConnected = false
    }
    if (this.userConnected) {
      this.userClient.close()
      this.userConnected = false
    }
  }

  /**
   * ==================== AUTH SERVICE METHODS ====================
   */

  /**
   * Validate a user token
   */
  public async validateToken(token: string, includeUserData = true): Promise<ServiceResponse<TokenValidationResponse>> {
    try {
      await this.ensureAuthConnected()
      const request: TokenValidationRequest = {
        metadata: createRequestMetadata(),
        token,
        includeUserData,
      }
      type ValidateTokenFn = (request: TokenValidationRequest) => Promise<TokenValidationResponse>
      const validateTokenCall = promisify(this.authClient.validateToken.bind(this.authClient)) as ValidateTokenFn
      const data = await validateTokenCall(request)
      return { data, error: null }
    } catch (error) {
      const grpcError = GrpcError.fromError(error, "Token validation failed")
      return { data: null, error: grpcError }
    }
  }

  /**
   * Refresh an access token using a refresh token
   */
  public async refreshToken(refreshToken: string): Promise<ServiceResponse<TokenRefreshResponse>> {
    try {
      await this.ensureAuthConnected()
      const request: TokenRefreshRequest = {
        metadata: createRequestMetadata(),
        refreshToken,
      }
      type RefreshTokenFn = (request: TokenRefreshRequest) => Promise<TokenRefreshResponse>
      const refreshTokenCall = promisify(this.authClient.refreshToken.bind(this.authClient)) as RefreshTokenFn
      const data = await refreshTokenCall(request)
      return { data, error: null }
    } catch (error) {
      const grpcError = GrpcError.fromError(error, "Token refresh failed")
      return { data: null, error: grpcError }
    }
  }

  /**
   * Look up a user by ID
   */
  public async lookupUserById(id: UUID): Promise<ServiceResponse<UserLookupResponse>> {
    try {
      await this.ensureAuthConnected()
      const request: UserLookupRequest = {
        metadata: createRequestMetadata(),
        identifier: "userId",
        userId: id.toString(),
      }
      type LookupUserFn = (request: UserLookupRequest) => Promise<UserLookupResponse>
      const lookupUserCall = promisify(this.authClient.lookupUser.bind(this.authClient)) as LookupUserFn
      const data = await lookupUserCall(request)
      return { data, error: null }
    } catch (error) {
      const grpcError = GrpcError.fromError(error, "User lookup by ID failed")
      return { data: null, error: grpcError }
    }
  }

  /**
   * Look up a user by email
   */
  public async lookupUserByEmail(email: string): Promise<ServiceResponse<UserLookupResponse>> {
    try {
      await this.ensureAuthConnected()
      const request: UserLookupRequest = {
        metadata: createRequestMetadata(),
        identifier: "email",
        email,
      }
      type LookupUserFn = (request: UserLookupRequest) => Promise<UserLookupResponse>
      const lookupUserCall = promisify(this.authClient.lookupUser.bind(this.authClient)) as LookupUserFn
      const data = await lookupUserCall(request)
      return { data, error: null }
    } catch (error) {
      const grpcError = GrpcError.fromError(error, "User lookup by email failed")
      return { data: null, error: grpcError }
    }
  }

  /**
   * Batch lookup users by IDs and/or emails
   */
  public async batchLookupUsers(
    identifiers: Array<{ type: "userId" | "email"; value: string }>,
    includeProfile = true
  ): Promise<ServiceResponse<BatchUserLookupResponse>> {
    try {
      await this.ensureAuthConnected()

      const userIdentifiers: UserIdentifier[] = identifiers.map((id) => {
        if (id.type === "userId") {
          return {
            identifier: "userId",
            userId: id.value,
          }
        } else {
          return {
            identifier: "email",
            email: id.value,
          }
        }
      })

      const request: BatchUserLookupRequest = {
        metadata: createRequestMetadata(),
        identifiers: userIdentifiers,
        includeProfile,
      }

      type BatchLookupUsersFn = (request: BatchUserLookupRequest) => Promise<BatchUserLookupResponse>
      const batchLookupUsersCall = promisify(
        this.authClient.batchLookupUsers.bind(this.authClient)
      ) as BatchLookupUsersFn
      const data = await batchLookupUsersCall(request)
      return { data, error: null }
    } catch (error) {
      const grpcError = GrpcError.fromError(error, "Batch user lookup failed")
      return { data: null, error: grpcError }
    }
  }

  /**
   * ==================== USER SERVICE METHODS ====================
   */

  /**
   * List users with optional filtering by role
   */
  public async listUsers(
    options: {
      role?: UserRole
      pageSize?: number
      pageNumber?: number
    } = {}
  ): Promise<ServiceResponse<ListUsersResponse>> {
    try {
      await this.ensureUserConnected()

      const request: ListUsersRequest = {
        metadata: createRequestMetadata(),
        role: options.role || UserRole.UNSPECIFIED,
        pageSize: options.pageSize || 10,
        pageNumber: options.pageNumber || 0,
      }

      type ListUsersFn = (request: ListUsersRequest) => Promise<ListUsersResponse>
      const listUsersCall = promisify(this.userClient.listUsers.bind(this.userClient)) as ListUsersFn
      const data = await listUsersCall(request)
      return { data, error: null }
    } catch (error) {
      const grpcError = GrpcError.fromError(error, "List users failed")
      return { data: null, error: grpcError }
    }
  }

  /**
   * Get a random technician for assignment purposes
   */
  public async getRandomTechnician(): Promise<ServiceResponse<GetRandomTechnicianResponse>> {
    try {
      await this.ensureUserConnected()

      const request: GetRandomTechnicianRequest = {
        metadata: createRequestMetadata(),
      }

      type GetRandomTechnicianFn = (request: GetRandomTechnicianRequest) => Promise<GetRandomTechnicianResponse>
      const getRandomTechnicianCall = promisify(
        this.userClient.getRandomTechnician.bind(this.userClient)
      ) as GetRandomTechnicianFn
      const data = await getRandomTechnicianCall(request)
      return { data, error: null }
    } catch (error) {
      const grpcError = GrpcError.fromError(error, "Get random technician failed")
      return { data: null, error: grpcError }
    }
  }
}
