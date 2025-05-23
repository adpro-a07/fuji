import React from "react"
import MainUpdateCouponSection from "./sections/MainUpdateCouponSection"


export default function UpdateCouponPageModule({ params }: { params: { couponId: string } }) {
  return (
    <div className="px-16 pt-32">
      <MainUpdateCouponSection couponId={params.couponId} />
    </div>
  )
}