import { redirect } from "next/navigation"
import React from "react"
import { UUID } from "crypto"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { AuthClient } from "@/lib/grpc"
import MainRepairOrderDetailSection from "./sections/MainRepairOrderDetailSection"
import {
  RepairOrderResponseInterface,
  RepairOrderWithTechnicianDataInterface,
} from "../RepairOrderListModule/interface"
import { CouponResponseInterface } from "../ManageCouponsPageModule/interface"

export default async function RepairOrderDetailPageModule({ repairOrderId }: { repairOrderId: string }) {
  try {
    // Get all repair orders
    const repairOrderResponse = await get<RepairOrderResponseInterface>(`/api/v1/repair-orders/${repairOrderId}`, {
      isAuthorized: true,
    })

    if (!repairOrderResponse.success) throw new Error(repairOrderResponse.message)

    const authClient = AuthClient.getInstance()

    // Get the technician id
    const technicianDataResponse = await authClient.lookupUserById(repairOrderResponse.data?.technicianId as UUID)

    if (technicianDataResponse.error) throw new Error(technicianDataResponse.error.message)

    if (!technicianDataResponse.data) throw new Error("Technician data not found")

    const repairOrder: RepairOrderWithTechnicianDataInterface = {
      ...repairOrderResponse.data!,
      technician: technicianDataResponse.data.userData!,
    }

    let coupon: CouponResponseInterface | null = null
    if (repairOrder.couponId) {
      const couponId = repairOrder.couponId
      const couponResponse = await get<CouponResponseInterface>(`/api/v1/coupons/${couponId}`, {
        isAuthorized: true,
      })

      if (!couponResponse.success) {
        throw new Error(couponResponse.message)
      }

      coupon = couponResponse.data || null
    }

    return (
      <section>
        <div className="pt-16">
          <MainRepairOrderDetailSection repairOrder={repairOrder} coupon={coupon} />
        </div>
      </section>
    )
  } catch (error) {
    console.log(error)
    redirect("/repair-orders")
  }
}
