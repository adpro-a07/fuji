import { env } from "env.mjs"
import path from "path"

export const GRPC_CONFIG = {
  AUTH_SERVICE: {
    URL: env.AUTH_GRPC_URL,
    PROTO_PATH: path.resolve(process.cwd(), "./proto/auth.proto"),
    TIMEOUT_MS: 5000, // Default timeout for gRPC calls
  },
}
