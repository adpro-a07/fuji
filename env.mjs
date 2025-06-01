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
    JWT_PUBLIC_KEY: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    AUTH_REST_URL: process.env.KILIMANJARO_URL ?? "http://localhost:8090",
    AUTH_GRPC_URL: process.env.KILIMANJARO_GRPC_URL ?? "http://localhost:9090",
    MAIN_REST_URL: process.env.EVEREST_URL ?? "http://localhost:8080",
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
  },
})
