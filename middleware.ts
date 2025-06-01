import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { UserRole } from "@/components/contexts/AuthContext/interface"
import { AuthClient } from "@/lib/grpc"
import { verifyJwtRS256 } from "@/components/utils/jwtTokenValidator"

// Route configuration type supporting both static paths and regex patterns
interface RouteConfig {
  roles: UserRole[]
  isRegex?: boolean
  pattern?: RegExp
}

const routePermissions: Record<string, RouteConfig> = {
  // Static path examples
  "/repair-orders": {
    roles: [UserRole.CUSTOMER],
  },
  "/repair-orders/create": {
    roles: [UserRole.CUSTOMER],
  },
  "/admin/technicians": {
    roles: [UserRole.ADMIN],
  },

  // Regex pattern example for all /admin routes
  // Highly suggest prompting for better RegEx patterns
  "^/admin": {
    roles: [UserRole.ADMIN],
    isRegex: true,
    pattern: /^\/admin(\/.*)?$/,
  },
}

// Route matcher utility class
class RouteMatcher {
  /**
   * Find matching route configuration for a given path
   * Checks static paths first for performance, then regex patterns
   */
  static findMatchingRoute(path: string): UserRole[] | null {
    // First, try exact static path match (fastest)
    const staticMatch = routePermissions[path]
    if (staticMatch && !staticMatch.isRegex) {
      return staticMatch.roles
    }

    // Then try normalized path match for UUID segments
    const normalizedPath = this.normalizePath(path)
    const normalizedMatch = routePermissions[normalizedPath]
    if (normalizedMatch && !normalizedMatch.isRegex) {
      return normalizedMatch.roles
    }

    // Finally, try regex patterns
    for (const [_key, config] of Object.entries(routePermissions)) {
      if (config.isRegex && config.pattern) {
        if (config.pattern.test(path)) {
          return config.roles
        }
      }
    }

    return null
  }

  /**
   * Normalize path by replacing UUID segments with [uuid] placeholder
   * Maintains backward compatibility with existing UUID normalization
   */
  private static normalizePath(path: string): string {
    path = path.split("?")[0]?.replace(/\/$/, "") as string

    return path
      .split("/")
      .map((segment) => (this.isUUIDSegment(segment) ? "[uuid]" : segment))
      .join("/")
  }

  /**
   * Check if a path segment is a UUID
   */
  private static isUUIDSegment(segment: string): boolean {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(segment)
  }

  /**
   * Validate route configuration at startup
   * Ensures regex patterns are valid and compile successfully
   */
  static validateConfiguration(): void {
    for (const [key, config] of Object.entries(routePermissions)) {
      if (config.isRegex) {
        try {
          // Test if pattern exists and is valid
          if (!config.pattern) {
            console.warn(`Route config "${key}" marked as regex but missing pattern`)
          } else {
            // Test compilation
            config.pattern.test("/test")
          }
        } catch (error) {
          console.error(`Invalid regex pattern for route "${key}":`, error)
        }
      }
    }
  }
}

// Logger utility with readable timestamps and request IDs
class MiddlewareLogger {
  private requestId: string
  private startTime: number

  constructor() {
    this.requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
    this.startTime = performance.now()
  }

  // Get human-readable timestamp in format: "Apr 27 14:32:45.123"
  private getReadableTimestamp(): string {
    const now = new Date()

    // Get month abbreviation
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = months[now.getMonth()]

    // Get day
    const day = now.getDate()

    // Get time with milliseconds
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const seconds = now.getSeconds().toString().padStart(2, "0")
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0")

    return `${month} ${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
  }

  // Format duration to be more readable
  public formatDuration(milliseconds: number): string {
    if (milliseconds < 1) {
      return "< 1ms"
    } else if (milliseconds < 1000) {
      return `${milliseconds.toFixed(2)}ms`
    } else {
      return `${(milliseconds / 1000).toFixed(2)}s`
    }
  }

  // Get elapsed time since logger was created
  getElapsedTime(): string {
    const elapsed = performance.now() - this.startTime
    return this.formatDuration(elapsed)
  }

  private formatMessage(level: string, message: string, extraInfo?: Record<string, any>): string {
    const timestamp = this.getReadableTimestamp()
    const elapsed = this.getElapsedTime()

    // Color coding for different log levels (visible in many terminal emulators)
    let levelFormatted
    switch (level) {
      case "DEBUG":
        levelFormatted = "\x1b[34mDEBUG\x1b[0m"
        break // Blue
      case "INFO":
        levelFormatted = "\x1b[32mINFO\x1b[0m"
        break // Green
      case "WARN":
        levelFormatted = "\x1b[33mWARN\x1b[0m"
        break // Yellow
      case "ERROR":
        levelFormatted = "\x1b[31mERROR\x1b[0m"
        break // Red
      default:
        levelFormatted = level
    }

    let logMessage = `[${timestamp}] [${levelFormatted}] [${this.requestId}] [+${elapsed}] ${message}`

    if (extraInfo) {
      const extras = Object.entries(extraInfo)
        .map(([key, value]) => {
          // Format durations if they end with 'ms'
          if (typeof value === "string" && value.endsWith("ms")) {
            const numValue = parseFloat(value.replace("ms", ""))
            if (!isNaN(numValue)) {
              return `${key}=${this.formatDuration(numValue)}`
            }
          }
          return `${key}=${typeof value === "object" ? JSON.stringify(value) : value}`
        })
        .join(" ")

      logMessage += ` | ${extras}`
    }

    return logMessage
  }

  debug(message: string, extraInfo?: Record<string, any>): void {
    console.debug(this.formatMessage("DEBUG", message, extraInfo))
  }

  info(message: string, extraInfo?: Record<string, any>): void {
    console.info(this.formatMessage("INFO", message, extraInfo))
  }

  warn(message: string, extraInfo?: Record<string, any>): void {
    console.warn(this.formatMessage("WARN", message, extraInfo))
  }

  error(message: string, error?: any, extraInfo?: Record<string, any>): void {
    const combinedInfo = {
      ...extraInfo,
      ...(error && {
        errorMessage: error.message,
        errorStack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
    }

    console.error(this.formatMessage("ERROR", message, combinedInfo))
  }

  logPerformance(label: string, startTime: number): void {
    const duration = performance.now() - startTime
    this.debug(`Performance: ${label}`, { duration: this.formatDuration(duration) })
  }
}

// Validate configuration on module load
RouteMatcher.validateConfiguration()

export async function middleware(request: NextRequest) {
  const logger = new MiddlewareLogger()
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get("user-agent") || "unknown"

  logger.info("Middleware processing request", {
    path: pathname,
    userAgent,
    method: request.method,
    hasAccessToken: !!request.cookies.get("kilimanjaro-access")?.value,
    hasRefreshToken: !!request.cookies.get("kilimanjaro-refresh")?.value,
  })

  // Use enhanced route matcher
  const matchStartTime = performance.now()
  const allowedRoles = RouteMatcher.findMatchingRoute(pathname)
  logger.logPerformance("Route matching", matchStartTime)

  if (!allowedRoles) {
    logger.debug("Public route access granted")
    return NextResponse.next()
  }

  logger.debug("Protected route detected", { allowedRoles })

  const accessToken = request.cookies.get("kilimanjaro-access")?.value
  const refreshToken = request.cookies.get("kilimanjaro-refresh")?.value

  if (accessToken) {
    logger.info("Verifying access token")

    try {
      const verifyStartTime = performance.now()

      const { payload, error } = await verifyJwtRS256(accessToken)

      const verifyDuration = performance.now() - verifyStartTime

      if (!error && payload) {
        const role = payload.role

        logger.debug("Access token verification successful", {
          role,
          duration: logger.formatDuration(verifyDuration),
        })

        if (role && allowedRoles.includes(role)) {
          logger.info("Role authorization successful", { role, allowedRoles })
          return NextResponse.next()
        } else {
          logger.warn("Role unauthorized for route", {
            role,
            requiredRoles: allowedRoles,
            redirectTo: "/",
          })
          return NextResponse.redirect(new URL("/", request.url))
        }
      } else {
        logger.warn("Access token verification failed", {
          duration: logger.formatDuration(verifyDuration),
        })
      }
    } catch (error) {
      logger.error("Token verification error", error, { tokenType: "access" })
    }
  }

  if (refreshToken) {
    logger.info("Attempting token refresh")

    try {
      const refreshStartTime = performance.now()

      const authClient = AuthClient.getInstance()
      const { data, error } = await authClient.refreshToken(refreshToken)

      const refreshDuration = performance.now() - refreshStartTime

      if (!error && data) {
        logger.debug("Token refresh successful", {
          duration: logger.formatDuration(refreshDuration),
          status: data.status,
        })

        logger.info("Refreshed token role authorized", {
          allowedRoles,
          redirectingWithRefresh: true,
        })

        const url = new URL(request.url)
        url.searchParams.set("_refresh", "true")
        const response = NextResponse.redirect(url)

        response.cookies.set("kilimanjaro-access", data.accessToken!, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })

        response.cookies.set("kilimanjaro-refresh", data.refreshToken!, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })

        return response
      } else {
        logger.warn("Token refresh failed", {
          status: data?.status,
          duration: logger.formatDuration(refreshDuration),
        })
      }
    } catch (error) {
      logger.error("Token refresh error", error)
    }
  }

  logger.info("Authentication failed, redirecting to login", {
    redirectTo: "/login",
    callbackUrl: request.url,
  })

  const loginUrl = new URL("/login", request.url)
  loginUrl.searchParams.set("callbackUrl", encodeURIComponent(request.url))

  logger.info("Middleware complete", { totalProcessingTime: logger.getElapsedTime() })

  return NextResponse.redirect(loginUrl)
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api/public|_next/static|_next/image|favicon.ico).*)"],
}
