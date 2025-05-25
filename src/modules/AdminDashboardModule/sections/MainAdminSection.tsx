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

  // Enhanced alert logic for expired and near-expired coupons
  const oneDayInMs = 24 * 60 * 60 * 1000
  const expiredCouponsAlert = coupons.filter((coupon) => {
    const validUntil = new Date(coupon.validUntil)
    return validUntil < now
  })

  const nearExpiredCouponsAlert = coupons.filter((coupon) => {
    const validUntil = new Date(coupon.validUntil)
    const timeDiff = validUntil.getTime() - now.getTime()
    return timeDiff > 0 && timeDiff <= oneDayInMs
  })

  const combinedAlerts = [
    ...alerts,
    ...expiredCouponsAlert.map((coupon) => ({
      couponId: coupon.id,
      code: coupon.code,
      validUntil: coupon.validUntil,
      daysLeft: 0,
      type: "expired" as const,
    })),
    ...nearExpiredCouponsAlert.map((coupon) => {
      const validUntil = new Date(coupon.validUntil)
      const timeDiff = validUntil.getTime() - now.getTime()
      const hoursLeft = Math.ceil(timeDiff / (60 * 60 * 1000))
      return {
        couponId: coupon.id,
        code: coupon.code,
        validUntil: coupon.validUntil,
        daysLeft: 0,
        hoursLeft,
        type: "near-expired" as const,
      }
    }),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 transition-colors duration-300 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="mt-20 mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Manage your system with ease and efficiency</p>
        </div>

        {/* Navigation Buttons */}
        <div className="mb-12">
          <div className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button
                asChild
                className="h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
              >
                <Link href="/admin/technicians" className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  <span>View Technicians</span>
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md transition-all duration-300 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg"
              >
                <Link href="/admin/technicians/register" className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span>Register Technician</span>
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md transition-all duration-300 hover:from-purple-600 hover:to-purple-700 hover:shadow-lg"
              >
                <Link href="/admin/technicians/reports" className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>View Reports</span>
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg"
              >
                <Link href="/admin/coupons" className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span>Manage Coupons</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Completed Reports - Hero Card */}
          <Card className="relative overflow-hidden rounded-2xl border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-2xl lg:col-span-3">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-10 text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-white/20 p-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-2xl font-semibold">Completed Reports</h3>
              <p className="mb-2 text-6xl font-bold">{completedReports.length}</p>
              <p className="text-white/80">Total reports processed</p>
            </div>
          </Card>

          {/* Total Coupons */}
          <Card className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/50">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">Total Coupons</h3>
            <p className="mb-1 text-4xl font-bold text-gray-900 dark:text-gray-100">{totalCoupons}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">All coupons created</p>
          </Card>

          {/* Coupons Breakdown */}
          <Card className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm lg:col-span-2 dark:border-gray-700/50 dark:bg-gray-800/80">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-100">Coupons Breakdown</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mx-auto mb-3 w-fit rounded-xl bg-green-100 p-3 dark:bg-green-900/50">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{activeCoupons}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 w-fit rounded-xl bg-blue-100 p-3 dark:bg-blue-900/50">
                  <svg
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{usedCoupons}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Used</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 w-fit rounded-xl bg-gray-100 p-3 dark:bg-gray-700/50">
                  <svg
                    className="h-6 w-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{expiredCoupons}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expired</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Top Technicians */}
          <Card className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-xl bg-purple-100 p-3 dark:bg-purple-900/50">
                <svg
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top 3 Technicians</h3>
            </div>
            {topTechnicians.length > 0 ? (
              <div className="space-y-4">
                {topTechnicians.map(([technicianId, count], index) => {
                  const name = technicianNames[technicianId] || `Technician ID: ${technicianId}`
                  const colors = [
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
                    "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300",
                    "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
                  ]
                  return (
                    <div
                      key={technicianId}
                      className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50"
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${colors[index]}`}
                        >
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {count} report{count > 1 ? "s" : ""}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="mx-auto mb-3 h-12 w-12 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6m-10 0h6"
                  />
                </svg>
                <p>No technician reports found</p>
              </div>
            )}
          </Card>

          {/* Top Coupons */}
          <Card className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-xl bg-green-100 p-3 dark:bg-green-900/50">
                <svg
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top Coupons</h3>
            </div>
            {topCoupons.length > 0 ? (
              <div className="space-y-3">
                {topCoupons.map((coupon, index) => (
                  <div
                    key={coupon.id}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                        {index + 1}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{coupon.code}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{coupon.usageCount ?? 0} uses</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="mx-auto mb-3 h-12 w-12 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <p>No coupons found</p>
              </div>
            )}
          </Card>
        </div>

        {/* Alerts Section */}
        <Card className="overflow-hidden rounded-2xl border border-yellow-200/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-yellow-700/50 dark:bg-gray-800/80">
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-400 p-6">
            <div className="flex items-center text-white">
              <div className="mr-4 rounded-xl bg-white/20 p-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">System Alerts</h3>
                <p className="text-white/90">Critical notifications that require attention</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {combinedAlerts.length > 0 ? (
              <div className="space-y-4">
                {combinedAlerts.map((alert) => {
                  if ("type" in alert && alert.type === "expired") {
                    return (
                      <div
                        key={`expired-${alert.couponId}`}
                        className="flex items-start rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-900/20"
                      >
                        <div className="mr-3 flex-shrink-0 rounded-lg bg-red-100 p-2 dark:bg-red-900/50">
                          <svg
                            className="h-5 w-5 text-red-600 dark:text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-red-800 dark:text-red-200">EXPIRED</p>
                          <p className="text-red-700 dark:text-red-300">
                            Coupon <span className="font-bold">{alert.code}</span> expired on{" "}
                            {new Date(alert.validUntil).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )
                  } else if ("type" in alert && alert.type === "near-expired") {
                    return (
                      <div
                        key={`near-expired-${alert.couponId}`}
                        className="flex items-start rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-800/50 dark:bg-orange-900/20"
                      >
                        <div className="mr-3 flex-shrink-0 rounded-lg bg-orange-100 p-2 dark:bg-orange-900/50">
                          <svg
                            className="h-5 w-5 text-orange-600 dark:text-orange-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-orange-800 dark:text-orange-200">EXPIRES SOON</p>
                          <p className="text-orange-700 dark:text-orange-300">
                            Coupon <span className="font-bold">{alert.code}</span> expires in{" "}
                            <span className="font-bold">{alert.hoursLeft}</span> hour(s)
                          </p>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div
                        key={alert.couponId}
                        className="flex items-start rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800/50 dark:bg-yellow-900/20"
                      >
                        <div className="mr-3 flex-shrink-0 rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900/50">
                          <svg
                            className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-yellow-800 dark:text-yellow-200">WARNING</p>
                          <p className="text-yellow-700 dark:text-yellow-300">
                            Coupon <span className="font-bold">{alert.code}</span> expires in{" "}
                            <span className="font-bold">{alert.daysLeft}</span> day(s)
                          </p>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="mx-auto mb-3 h-12 w-12 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>No alerts at the moment</p>
                <p className="mt-1 text-sm">All systems are running smoothly</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
