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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {repairOrders.length > 0 ? (
                    repairOrders.map((order) => (
                        <RepairOrderCardForTechnician repairOrder={order} key={order.id} />
                    ))
                ) : (
                    <div className="col-span-4 py-10 text-center">
                        <p className="text-gray-500">No incoming repair orders found</p>
                    </div>
                )}
            </div>
        </div>
    )
}