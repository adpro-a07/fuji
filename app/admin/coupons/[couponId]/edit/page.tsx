import React from "react"
import UpdateCouponPageModule from "@/modules/UpdateCouponPageModule"

export default async function page(props: { params: Promise<{ couponId: string }> }) {
  const { couponId } = await props.params

  return <UpdateCouponPageModule params={{ couponId }} />
}
