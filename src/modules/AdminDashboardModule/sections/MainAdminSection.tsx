import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, Report } from "@/modules/AdminDashboardModule/interface"
import { CouponResponseInterface } from "@/modules/ManageCouponsPageModule/interface"

export function MainAdminSection({
  coupons,
  completedReports,
  alerts,
  technicianNames = {},
}: {
  coupons: CouponResponseInterface[]
  completedReports: Report[]
  alerts: Alert[]
  technicianNames?: Record<string, string>
}) {
  const now = new Date()
  const totalCoupons = coupons.length
  const activeCoupons = coupons.filter((c) => new Date(c.validUntil) >= now).length
  const expiredCoupons = totalCoupons - activeCoupons
  const usedCoupons = coupons.filter((c) => (c.usageCount ?? 0) > 0).length

  // Top coupons by usageCount
  const topCoupons = [...coupons].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, 5)

  // Top 3 Technicians by completed report count
  const technicianReportCount: Record<string, number> = {}
  completedReports.forEach((report) => {
    if (report.technicianId) {
      technicianReportCount[report.technicianId] = (technicianReportCount[report.technicianId] || 0) + 1
    }
  })
  const topTechnicians = Object.entries(technicianReportCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center p-6">
      <h2 className="mb-6 text-2xl font-semibold">Admin Panel</h2>

      {/* Buttons for managing coupons and viewing reports */}
      <div className="mb-6 flex space-x-4">
        <Button asChild>
          <Link href="/admin/reports">View All Reports</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/coupons">Manage Coupons</Link>
        </Button>
      </div>

      <div className="mb-2 flex w-full max-w-4xl flex-wrap justify-center gap-6">
        <div className="mb-8 grid w-full max-w-4xl grid-cols-2 gap-6">
          <Card className="col-span-2 h-full w-full max-w-4xl items-center p-6 shadow">
            <h3 className="mb-1 text-2xl font-semibold">Completed Reports</h3>
            <p className="text-8xl font-bold">{completedReports.length}</p>
          </Card>
          <Card className="w-full max-w-4xl items-center p-6 shadow">
            <h3 className="mb-2 text-2xl font-semibold">Total Coupons</h3>
            <p className="text-6xl font-bold">{totalCoupons}</p>
          </Card>
          <Card className="w-full max-w-4xl items-center p-6 shadow">
            <h3 className="mb-2 text-2xl font-semibold">Coupons Breakdown</h3>
            <div className="space-y-1 text-sm">
              <p className="text-xl">
                Active: <span className="font-bold text-green-600">{activeCoupons}</span>
              </p>
              <p className="text-xl">
                Used: <span className="font-bold text-blue-600">{usedCoupons}</span>
              </p>
              <p className="text-xl">
                Expired: <span className="font-bold text-gray-500">{expiredCoupons}</span>
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="mb-8 w-full max-w-4xl">
        <Card className="mb-6 w-full max-w-4xl items-center p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold">Top 3 Technicians (Completed Reports)</h3>
          {topTechnicians.length > 0 ? (
            <ol className="list-decimal pl-5 font-medium">
              {topTechnicians.map(([technicianId, count]) => {
                // Show technician name if available, otherwise fallback to ID
                const name = technicianNames[technicianId] || `Technician ID: ${technicianId}`
                return (
                  <li key={technicianId} className="mb-2">
                    <span className="font-semibold">
                      {name} — {count} completed report{count > 1 ? "s" : ""}
                    </span>
                  </li>
                )
              })}
            </ol>
          ) : (
            <div className="text-gray-500">No technician reports found</div>
          )}
        </Card>
        <Card className="w-full max-w-4xl items-center p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">Top Coupons</h3>
          {topCoupons.length > 0 ? (
            <ul className="list-decimal pl-5">
              {topCoupons.map((coupon) => (
                <li key={coupon.id} className="mb-2">
                  <span className="font-bold">{coupon.code}</span> &mdash; Used: {coupon.usageCount ?? 0} times
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No coupons found</div>
          )}
        </Card>
      </div>

      <div className="w-full max-w-4xl">
        <Card className="w-full max-w-4xl border border-yellow-200 bg-yellow-50 p-6 shadow dark:border-yellow-700 dark:bg-yellow-950">
          <h3 className="mb-4 text-lg font-semibold text-yellow-800 dark:text-yellow-300">Alerts!</h3>
          {alerts.length > 0 ? (
            <ul className="list-disc pl-5">
              {alerts.map((alert) => (
                <li key={alert.couponId} className="mb-2 text-black dark:text-yellow-100">
                  Coupon <span className="font-bold">{alert.code}</span> expires in{" "}
                  <span className="font-bold">{alert.daysLeft}</span> day(s) (until{" "}
                  {new Date(alert.validUntil).toLocaleDateString()})
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">No coupon alerts</div>
          )}
        </Card>
      </div>
    </div>
  )
}
