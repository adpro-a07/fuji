"use client"
import React from "react"
import { RepairOrderForTechnician } from "../interface"
import RepairOrderCardForTechnician from "../module-elements/RepairOrderCardForTechnician"

export default function MainRepairOrderListForTechnicianSection({
  repairOrders,
}: {
  repairOrders: RepairOrderForTechnician[]
}) {
  return (
    <div className="m-2 mt-20 rounded-xl p-5">
      <div className="space-y-4">
        {repairOrders.length > 0 ? (
          repairOrders.map((order) => <RepairOrderCardForTechnician repairOrder={order} key={order.id} />)
        ) : (
          <div className="py-10 text-center text-gray-500">No incoming repair orders found</div>
        )}
      </div>
    </div>
  )
}
