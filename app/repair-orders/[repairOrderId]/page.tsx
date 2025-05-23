import RepairOrderDetailPageModule from "@/modules/RepairOrderDetailPageModule"
import React from "react"

export default async function page(props: { params: Promise<{ repairOrderId: string }> }) {
  const { repairOrderId } = await props.params
  return <RepairOrderDetailPageModule repairOrderId={repairOrderId} />
}
