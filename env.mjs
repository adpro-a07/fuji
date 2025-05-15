import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    AUTH_REST_URL: z.string().url(),
    AUTH_GRPC_URL: z.string().url(),
    MAIN_REST_URL: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    AUTH_REST_URL: process.env.KILIMANJARO_URL,
    AUTH_GRPC_URL: process.env.KILIMANJARO_GRPC_URL,
    MAIN_REST_URL: process.env.EVEREST_URL,
  },
})
