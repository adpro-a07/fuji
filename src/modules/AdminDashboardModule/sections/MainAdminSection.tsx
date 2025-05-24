import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Alert, Report } from "@/modules/AdminDashboardModule/interface"
import { CouponResponseInterface } from "@/modules/ManageCouponsPageModule/interface"

export function MainAdminSection({
                                   coupons,
                                   completedReports,
                                   alerts,
                                 }: {
  coupons: CouponResponseInterface[]
  completedReports: Report[]
  alerts: Alert[]
}) {
  const now = new Date()
  const totalCoupons = coupons.length
  const activeCoupons = coupons.filter((c) => new Date(c.validUntil) >= now).length
  const expiredCoupons = totalCoupons - activeCoupons
  const usedCoupons = coupons.filter((c) => (c.usageCount ?? 0) > 0).length

  // Top coupons by usageCount
  const topCoupons = [...coupons]
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, 5)

  return (
    <div className="flex flex-col items-center bg-background text-foreground min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>

      <div className="flex flex-wrap justify-center gap-6 mb-8 w-full max-w-4xl">
        <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-4xl">
          <Card className="col-span-2 p-6 items-center shadow h-full">
            <h3 className="text-lg font-semibold mb-2">Completed Reports</h3>
            <p className="text-8xl font-bold">{completedReports.length}</p>
          </Card>
          <Card className="p-6 shadow items-center">
            <h3 className="text-lg font-semibold mb-2">Total Coupons</h3>
            <p className="text-6xl font-bold">{totalCoupons}</p>
          </Card>
          <Card className="p-6 shadow items-center">
            <h3 className="text-lg font-semibold mb-2">Coupons Breakdown</h3>
            <div className="space-y-1 text-sm">
              <p className="text-xl">Active: <span className="font-bold text-green-600 ">{activeCoupons}</span></p>
              <p className="text-xl">Used: <span className="font-bold text-blue-600">{usedCoupons}</span></p>
              <p className="text-xl">Expired: <span className="font-bold text-gray-500">{expiredCoupons}</span></p>
            </div>
          </Card>
        </div>
      </div>

      <div className="w-full max-w-2xl mb-8">
        <Card className="p-6 shadow">
          <h3 className="text-lg font-semibold mb-4">Top Coupons</h3>
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

      <div className="w-full max-w-2xl">
        <Card className="p-6 bg-yellow-50 border border-yellow-200 shadow">
          <h3 className="text-lg font-semibold mb-4 text-yellow-800">Alerts</h3>
          {alerts.length > 0 ? (
            <ul className="list-disc pl-5">
              {alerts.map((alert) => (
                <li key={alert.couponId} className="mb-2">
                  Coupon <span className="font-bold">{alert.code}</span> expires in <span className="font-bold">{alert.daysLeft}</span> day(s) (until{" "}
                  {new Date(alert.validUntil).toLocaleDateString()})
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No coupon alerts</div>
          )}
        </Card>
      </div>

      <div className="flex space-x-4 mt-8">
        <Button asChild>
          <Link href="/admin/reports">View All Reports</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/coupons">Manage Coupons</Link>
        </Button>
      </div>
    </div>
  )
}