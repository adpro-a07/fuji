import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import {
  RepairOrderResponseInterface,
  RepairOrderWithTechnicianDataInterface,
} from "../RepairOrderListModule/interface"
import { AuthClient } from "@/lib/grpc"
import MainRepairOrderDetailSection from "./sections/MainRepairOrderDetailSection"

export default async function RepairOrderDetailPageModule({ repairOrderId }: { repairOrderId: string }) {
  try {
    // Get all repair orders
    const repairOrderResponse = await get<RepairOrderResponseInterface>(`/api/v1/repair-orders/${repairOrderId}`, {
      isAuthorized: true,
    })

    if (!repairOrderResponse.success) throw new Error(repairOrderResponse.message)

    const authClient = AuthClient.getInstance()

    // Get the technician ids
    const technicianDataResponse = await authClient.lookupUserById(repairOrderResponse.data?.technicianId!)

    if (technicianDataResponse.error) throw new Error(technicianDataResponse.error.message)

    const repairOrder: RepairOrderWithTechnicianDataInterface = {
      ...repairOrderResponse.data!,
      technician: technicianDataResponse.data?.userData!,
    }

    return (
      <section>
        <div className="pt-16">
          <MainRepairOrderDetailSection repairOrder={repairOrder} />
        </div>
      </section>
    )
  } catch (error) {
    console.log(error)
    redirect("/repair-orders")
  }
}
