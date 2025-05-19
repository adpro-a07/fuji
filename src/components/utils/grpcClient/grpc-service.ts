import { env } from "env.mjs"
import { AuthService } from "./grpc-client"
import { promisify } from "util"
import * as grpc from "@grpc/grpc-js"
import { UUID } from "crypto"

const target = env.AUTH_GRPC_URL

export class AuthClientService extends AuthService {
  constructor() {
    super(target, grpc.credentials.createInsecure())
  }

  public async callValidateToken(token: string) {
    const validateTokenCall = promisify(this.validateToken).bind(this)
    return await validateTokenCall({
      token: token,
      includeUserData: true,
    })
      .then((client) => ({ client, error: null }))
      .catch((error) => ({ error, client: null }))
  }

  public async callLookupUserById(id: UUID) {
    const lookupUserByIdCall = promisify(this.lookupUser).bind(this)
    return await lookupUserByIdCall({
      identifier: "userId",
      userId: id,
    })
      .then((client) => ({ client, error: null }))
      .catch((error) => ({ error, client: null }))
  }
}
