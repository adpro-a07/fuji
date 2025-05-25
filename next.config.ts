import withBundleAnalyzer from "@next/bundle-analyzer"

import { env } from "./env.mjs"
import { NextConfig } from "next"

const config: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
}

module.exports = {
  experimental: {
    nodeMiddleware: true,
  },
  output: "standalone",
}

export default env.ANALYZE ? withBundleAnalyzer({ enabled: env.ANALYZE })(config) : config
