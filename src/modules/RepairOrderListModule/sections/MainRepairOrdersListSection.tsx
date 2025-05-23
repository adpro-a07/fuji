import React from "react"
import Link from "next/link"
import { RepairOrderWithTechnicianDataInterface } from "../interface"
import RepairOrderCard from "../module-elements/RepairOrderCard"
import { Button } from "@/components/ui/button"

export default function MainRepairOrdersListSection({
  repair_orders,
}: {
  repair_orders: RepairOrderWithTechnicianDataInterface[]
}) {
  return (
    <div className="m-2 rounded-xl p-5">
      <div className="mb-4 flex justify-end">
        <Link href="/repair-orders/create">
          <Button className="w-fit">Request Repair Order</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {repair_orders.length > 0 ? (
          repair_orders.map((repair_order) => <RepairOrderCard repair_order={repair_order} key={repair_order.id} />)
        ) : (
          <div className="col-span-4 py-10 text-center">
            <p className="text-gray-500">No repair orders found</p>
          </div>
        )}
      </div>
    </div>
  )
}
