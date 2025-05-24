import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { CouponResponseInterface } from "@/modules/ManageCouponsPageModule/interface"
import UpdateCouponForm from "../module-elements/UpdateCouponForm"

export default async function MainUpdateCouponSection({ couponId }: { couponId: string }) {
  const response = await get<CouponResponseInterface>(`/api/v1/coupons/${couponId}`, {
    isAuthorized: true,
  })

  if (!response.success || !response.data) {
    return <div className="m-2 rounded-xl p-5">Coupon not found.</div>
  }

  const coupon = {
    code: response.data.code,
    discountAmount: response.data.discountAmount,
    maxUsage: response.data.maxUsage,
    validUntil: response.data.validUntil,
  }

  return (
    <div className="m-2 rounded-xl p-5">
      <UpdateCouponForm coupon={coupon} couponId={couponId} />
    </div>
  )
}
