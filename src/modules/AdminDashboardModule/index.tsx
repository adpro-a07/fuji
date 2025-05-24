import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { CouponResponseInterface } from "@/modules/ManageCouponsPageModule/interface"
import { Alert, Report } from "./interface"
import { MainAdminSection } from "./sections/MainAdminSection"

export default async function AdminDashboardModule() {
  const couponsRes = await get<CouponResponseInterface[]>("/api/v1/coupons", { isAuthorized: true })
  const coupons = couponsRes.success && couponsRes.data ? couponsRes.data : []

  const reportsRes = await get<Report[]>("/api/v1/reports?status=completed", { isAuthorized: true })
  const completedReports = reportsRes.success && reportsRes.data ? reportsRes.data : []

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

  return <MainAdminSection coupons={coupons} completedReports={completedReports} alerts={alerts} />
}