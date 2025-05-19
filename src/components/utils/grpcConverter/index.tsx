import { UserRole as GrpcUserRole } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserRole"
import { Timestamp, Timestamp__Output } from "@/proto/generated/google/protobuf/Timestamp"
import { UserRole } from "@/components/contexts/AuthContext/interface"

// Conversion function
export function convertGrpcRoleToUserRole(grpcRole: GrpcUserRole): UserRole {
  // Handle string values
  if (grpcRole === "ADMIN" || grpcRole === 1) {
    return "ADMIN" as unknown as UserRole.ADMIN
  } else if (grpcRole === "TECHNICIAN" || grpcRole === 2) {
    return "TECHNICIAN" as unknown as UserRole.TECHNICIAN
  } else if (grpcRole === "CUSTOMER" || grpcRole === 3) {
    return "CUSTOMER" as unknown as UserRole.CUSTOMER
  } else {
    return "CUSTOMER" as unknown as UserRole.CUSTOMER
  }
}

/**
 * Converts a gRPC Timestamp to an ISO string
 * @param timestamp The gRPC timestamp to convert
 * @returns ISO formatted date string
 */
export function convertTimestampToString(timestamp: Timestamp | Timestamp__Output): string {
  // Handle undefined values
  if (!timestamp || timestamp.seconds === undefined) {
    return ""
  }

  // Convert seconds to number
  let seconds: number
  if (typeof timestamp.seconds === "string") {
    seconds = parseInt(timestamp.seconds, 10)
  } else if (typeof timestamp.seconds === "number") {
    seconds = timestamp.seconds
  } else {
    // Handle Long type
    seconds = Number(timestamp.seconds)
  }

  // Get nanoseconds or default to 0
  const nanos = timestamp.nanos || 0

  // Create date from seconds and convert to milliseconds
  const date = new Date(seconds * 1000)

  // Add nanoseconds portion (convert to milliseconds first)
  date.setMilliseconds(date.getMilliseconds() + nanos / 1000000)

  // Return ISO string
  return date.toISOString()
}
