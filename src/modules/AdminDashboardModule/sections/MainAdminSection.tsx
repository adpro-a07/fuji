import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Alert, Report } from "@/modules/AdminDashboardModule/interface"
import { CouponResponseInterface } from "@/modules/ManageCouponsPageModule/interface"
import { get } from "@/components/utils/customFetch/serverFetchClients"

async function fetchDashboardData() {
  const couponsRes = await get<CouponResponseInterface[]>("/api/v1/coupons", { isAuthorized: true })
  const coupons = couponsRes.success && couponsRes.data ? couponsRes.data : []

  const reportsRes = await get<Report[]>("/api/v1/reports?status=completed", { isAuthorized: true })
  const completedReports = reportsRes.success && reportsRes.data ? reportsRes.data : []

  const now = new Date()
  const soonExpiringCoupons: Alert[] = coupons
    .filter((c: CouponResponseInterface) => {
      const daysLeft = Math.ceil((new Date(c.validUntil).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return daysLeft > 0 && daysLeft <= 30
    })
    .map((c: CouponResponseInterface) => ({
      couponId: c.id,
      code: c.code,
      validUntil: typeof c.validUntil === "string" ? c.validUntil : new Date(c.validUntil).toISOString(),
      daysLeft: Math.ceil((new Date(c.validUntil).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    }))

  return { coupons, completedReports, alerts: soonExpiringCoupons }
}

export const MainAdminSection = async () => {
  const { coupons, completedReports, alerts } = await fetchDashboardData()

  const now = new Date()
  const totalCoupons = coupons.length
  const activeCoupons = coupons.filter((c: CouponResponseInterface) => new Date(c.validUntil) >= now).length
  const expiredCoupons = totalCoupons - activeCoupons

  // Top coupons by usageCount
  const topCoupons = [...coupons]
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, 3)

  return (
    <div className="flex flex-col items-center space-y-6 bg-background text-foreground min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>

      {/* Alerts for soon-to-expire coupons */}
      {alerts.length > 0 && (
        <div className="w-full max-w-2xl mb-4">
          <Card className="p-4 bg-yellow-100 border-yellow-400">
            <div className="font-semibold text-yellow-800 mb-2">Coupons expiring within 30 days:</div>
            <ul className="list-disc pl-5">
              {alerts.map((alert) => (
                <li key={alert.couponId}>
                  Coupon <span className="font-bold">{alert.code}</span> expires in <span className="font-bold">{alert.daysLeft}</span> day(s) (until {new Date(alert.validUntil).toLocaleDateString()})
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-2xl">
        {/* Card for Completed Reports */}
        <Card className="flex flex-col items-center p-6 shadow-md w-60">
          <h3 className="text-lg font-semibold mb-2">Completed Reports</h3>
          <p className="text-8xl font-bold">{completedReports.length}</p>
        </Card>

        {/* Card for Coupons */}
        <Card className="flex flex-col items-center p-6 shadow-md w-60">
          <h3 className="text-lg font-semibold mb-2">Coupons</h3>
          <p className="text-md">Total: <span className="font-bold">{totalCoupons}</span></p>
          <p className="text-md text-green-700">Active: <span className="font-bold">{activeCoupons}</span></p>
          <p className="text-md text-gray-500">Expired: <span className="font-bold">{expiredCoupons}</span></p>
        </Card>
      </div>

      {/* Top Coupons Section */}
      <div className="w-full max-w-2xl mt-4">
        <h3 className="text-lg font-semibold mb-2">Top Coupons</h3>
        {topCoupons.length > 0 ? (
          <ul className="list-decimal pl-5">
            {topCoupons.map((coupon) => (
              <li key={coupon.id}>
                <span className="font-bold">{coupon.code}</span> &mdash; Used: {coupon.usageCount ?? 0} times
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No coupons found</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <Button asChild>
          <Link href="/admin">View All Reports</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/coupons">Manage Coupons</Link>
        </Button>
      </div>
    </div>
  )
}
