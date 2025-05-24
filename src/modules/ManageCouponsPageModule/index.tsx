import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { CouponResponseInterface } from "./interface"
import MainManageCouponSection from "./sections/MainManageCouponSection"

export default async function ManageCouponsPageModule() {
  try {
    const coupons_response = await get<CouponResponseInterface[]>("/api/v1/coupons", {
      isAuthorized: true,
    })

    if (!coupons_response.success) {
      console.error("API error:", coupons_response)
      throw new Error(coupons_response.message)
    }

    const coupons = coupons_response.data ?? []

    return (
      <section>
        <div className="pt-16">
          <MainManageCouponSection coupons={coupons} />
        </div>
      </section>
    )
  } catch (error) {
    console.error("Module error:", error)
    redirect("/")
  }
}
