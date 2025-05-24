import { notFound } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { CouponResponseInterface } from "@/modules/ManageCouponsPageModule/interface"
import UpdateCouponForm from "@/modules/UpdateCouponPageModule/module-elements/UpdateCouponForm"

export default async function Page({ params }: { params: { couponId: string } }) {
  const couponId = params.couponId

  const response = await get<CouponResponseInterface>(`/api/v1/coupons/${couponId}`, {
    isAuthorized: true,
  })

  if (!response.success || !response.data) {
    notFound()
  }

  const coupon = {
    code: response.data.code,
    discountAmount: response.data.discountAmount,
    maxUsage: response.data.maxUsage,
    validUntil: response.data.validUntil,
  }

  return (
    <div className="pt-16">
      <UpdateCouponForm coupon={coupon} couponId={couponId} />
    </div>
  )
}
