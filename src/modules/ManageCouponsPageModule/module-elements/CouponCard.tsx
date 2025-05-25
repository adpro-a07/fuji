"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { del as deleteRequest } from "@/components/utils/customFetch/serverFetchClients"
import { DeletePopUpModal } from "./DeletePopUpModal"
import { CouponResponseInterface } from "../interface"

export default function CouponCard({ coupon }: { coupon: CouponResponseInterface }) {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDelete = async () => {
    await deleteRequest(`/api/v1/coupons/${coupon.id}`, {
      isAuthorized: true,
    })
    setShowDeleteModal(false)
    router.refresh()
  }

  // Currency formatting function
  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num || 0)
  }

  // Determine coupon status and styling
  const now = new Date()
  const validUntil = new Date(coupon.validUntil)
  const isExpired = validUntil < now
  const oneDayInMs = 24 * 60 * 60 * 1000
  const isNearExpiry = !isExpired && validUntil.getTime() - now.getTime() <= oneDayInMs
  const isFullyUsed = coupon.usageCount >= coupon.maxUsage
  const usagePercentage = (coupon.usageCount / coupon.maxUsage) * 100

  // Dynamic styling based on coupon status
  const getCardStyling = () => {
    if (isExpired) {
      return "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 dark:from-gray-800 dark:to-gray-900 dark:border-gray-600"
    }
    if (isNearExpiry) {
      return "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 dark:from-yellow-900 dark:to-yellow-950 dark:border-orange-600"
    }
    if (isFullyUsed) {
      return "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 dark:from-purple-900 dark:to-pink-900 dark:border-purple-600"
    }
    return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 dark:border-blue-600"
  }

  const getStatusBadge = () => {
    if (isExpired) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
          EXPIRED
        </span>
      )
    }
    if (isNearExpiry) {
      return (
        <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200">
          EXPIRES SOON
        </span>
      )
    }
    if (isFullyUsed) {
      return (
        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          FULLY USED
        </span>
      )
    }
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
        ACTIVE
      </span>
    )
  }

  const getUsageBarColor = () => {
    if (usagePercentage >= 90) return "bg-red-500"
    if (usagePercentage >= 70) return "bg-orange-500"
    if (usagePercentage >= 50) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="block">
      <Card className={`transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${getCardStyling()}`}>
        <CardHeader className="relative overflow-hidden">
          <CardTitle className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                  {coupon.code}
                </span>
              </div>
              {getStatusBadge()}
            </div>
          </CardTitle>
          <CardDescription className="relative z-10 text-base">
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
              {formatCurrency(coupon.discountAmount)}
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                Valid until:{" "}
                {coupon.validUntil instanceof Date
                  ? coupon.validUntil.toLocaleDateString()
                  : new Date(coupon.validUntil).toLocaleDateString()}
              </span>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Usage Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Usage Progress</span>
              <span className="text-gray-600 dark:text-gray-400">
                {coupon.usageCount}/{coupon.maxUsage}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getUsageBarColor()}`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{usagePercentage.toFixed(1)}% used</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">MAX USAGE</span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{coupon.maxUsage}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">TIMES USED</span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{coupon.usageCount}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>Created: {new Date(coupon.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Updated: {new Date(coupon.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
              size="sm"
            >
              <Link href={`/admin/coupons/${coupon.id}/edit`} className="flex items-center justify-center space-x-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span>Update</span>
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-xl"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
      <DeletePopUpModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this coupon?"
      />
    </div>
  )
}
