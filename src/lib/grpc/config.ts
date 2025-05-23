import path from "path"
import { env } from "env.mjs"

export const GRPC_CONFIG = {
  AUTH_SERVICE: {
    URL: env.AUTH_GRPC_URL,
    PROTO_PATH: path.resolve(process.cwd(), "./proto/auth.proto"),
    TIMEOUT_MS: 5000, // Default timeout for gRPC calls
  },

  CLIENT_VERSION: "v1.0",
}