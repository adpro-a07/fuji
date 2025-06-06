import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { AuthClient } from "@/lib/grpc"
import { RepairOrderResponseInterface, RepairOrderWithTechnicianDataInterface } from "./interface"
import MainRepairOrdersListSection from "./sections/MainRepairOrdersListSection"

export default async function RepairOrderListModule() {
  try {
    // Get all repair orders
    const repairOrdersResponse = await get<RepairOrderResponseInterface[]>("/api/v1/repair-orders", {
      isAuthorized: true,
    })

    if (!repairOrdersResponse.success) throw new Error(repairOrdersResponse.message)

    // Group all the technician ids of the repair orders
    const technicianIdsRequest: Array<{ type: "userId" | "email"; value: string }> =
      repairOrdersResponse.data?.map((repair_order) => ({
        type: "userId",
        value: repair_order.technicianId as string,
      })) ?? []

    const authClient = AuthClient.getInstance()

    // Get the technician ids
    const response = await authClient.batchLookupUsers(technicianIdsRequest, false)

    if (response.error) throw new Error(response.error.message)

    // Create a map of technician ids
    const usersMap = new Map(response.data?.results?.map((user) => [user.userData?.identity?.id, user.userData!]))

    // Create a combined repair orders array
    const repairOrders: RepairOrderWithTechnicianDataInterface[] =
      repairOrdersResponse.data?.map((repair_order) => ({
        ...repair_order,
        technician: usersMap.get(repair_order.technicianId)!,
      })) ?? []

    return (
      <section>
        <div className="pt-16">
          <MainRepairOrdersListSection repair_orders={repairOrders} />
        </div>
      </section>
    )
  } catch (error) {
    console.log(error)
    redirect("/")
  }
}
