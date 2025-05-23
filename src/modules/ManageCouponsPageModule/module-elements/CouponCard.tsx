"use client"
import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CouponResponseInterface } from "../interface"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { del as deleteRequest } from "@/components/utils/customFetch/serverFetchClients"
import { DeletePopUpModal } from "./DeletePopUpModal"
import Link from "next/link"

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

  return (
    <div className="block">
      <Card className="transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{coupon.code}</span>
            </div>
          </CardTitle>
          <CardDescription>
            Valid until: {coupon.validUntil instanceof Date ? coupon.validUntil.toLocaleDateString() : new Date(coupon.validUntil).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Discount:</span> {coupon.discountAmount}
          </p>
          <p>
            <span className="font-medium">Max Usage:</span> {coupon.maxUsage}
          </p>
          <p>
            <span className="font-medium">Used:</span> {coupon.usageCount}
          </p>
          <p>
            <span className="font-medium">Created At:</span> {new Date(coupon.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Updated At:</span> {new Date(coupon.updatedAt).toLocaleDateString()}
          </p>
          <div className="flex space-x-2 pt-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/coupons/${coupon.id}/edit`}>Update</Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              className="hover:bg-red-700 dark:hover:bg-red-800"
            >
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