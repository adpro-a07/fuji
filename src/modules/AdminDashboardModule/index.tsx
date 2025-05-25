import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { CouponResponseInterface } from "@/modules/ManageCouponsPageModule/interface"
import { Alert, Report } from "./interface"
import { MainAdminSection } from "./sections/MainAdminSection"
import { AuthClient } from "@/lib/grpc"
import { UserRole } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserRole"

export default async function AdminDashboardModule() {
  const couponsRes = await get<CouponResponseInterface[]>("/api/v1/coupons", { isAuthorized: true })
  const coupons = couponsRes.success && couponsRes.data ? couponsRes.data : []

  const reportsRes = await get<Report[]>("/api/v1/admin/reports", { isAuthorized: true })
  const completedReports = reportsRes.success && reportsRes.data ? reportsRes.data : []

  // Fetch all technicians using gRPC
  const authClient = AuthClient.getInstance()
  const techniciansResponse = await authClient.listUsers({
    role: UserRole.TECHNICIAN,
  })
  let technicianNames: Record<string, string> = {}
  if (!techniciansResponse.error && techniciansResponse.data?.users) {
    technicianNames = Object.fromEntries(
      techniciansResponse.data.users.map((u) => [u.identity?.id, u.identity?.fullName])
    )
  }

  const now = new Date()
  const alerts: Alert[] = coupons
    .filter((c) => {
      const daysLeft = Math.ceil((new Date(c.validUntil).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return daysLeft > 0 && daysLeft <= 30
    })
    .map((c) => ({
      couponId: c.id,
      code: c.code,
      validUntil: typeof c.validUntil === "string" ? c.validUntil : new Date(c.validUntil).toISOString(),
      daysLeft: Math.ceil((new Date(c.validUntil).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    }))

  return (
    <MainAdminSection
      coupons={coupons}
      completedReports={completedReports}
      alerts={alerts}
      technicianNames={technicianNames}
    />
  )
}
