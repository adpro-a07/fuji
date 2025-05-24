import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { CouponResponseInterface } from "@/modules/ManageCouponsPageModule/interface"
import { Alert, Report } from "./interface"
import { MainAdminSection } from "./sections/MainAdminSection"

export default async function AdminDashboardModule() {
  const couponsRes = await get<CouponResponseInterface[]>("/api/v1/coupons", { isAuthorized: true })
  const coupons = couponsRes.success && couponsRes.data ? couponsRes.data : []

  const reportsRes = await get<Report[]>("/api/v1/admin/reports", { isAuthorized: true })
  const completedReports = reportsRes.success && reportsRes.data ? reportsRes.data : []

  // Find top 3 technician IDs
  const technicianReportCount: Record<string, number> = {}
  completedReports.forEach((report) => {
    if (report.technicianId) {
      technicianReportCount[report.technicianId] = (technicianReportCount[report.technicianId] || 0) + 1
    }
  })
  const topTechnicianIds = Object.entries(technicianReportCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id)

  // Fetch technician names
  let technicianNames: Record<string, string> = {}
  if (topTechnicianIds.length > 0) {
    // gunakan param `ids`
    const usersRes = await get<{ id: string; fullName: string }[]>(`/api/v1/users?ids=${topTechnicianIds.join(",")}`, {
      isAuthorized: true,
    })
    if (usersRes.success && usersRes.data) {
      technicianNames = Object.fromEntries(usersRes.data.map((u) => [u.id, u.fullName]))
    }
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
