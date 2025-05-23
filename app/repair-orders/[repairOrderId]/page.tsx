import React from "react"
import RepairOrderDetailPageModule from "@/modules/RepairOrderDetailPageModule"

export default async function page(props: { params: Promise<{ repairOrderId: string }> }) {
  const { repairOrderId } = await props.params
  return <RepairOrderDetailPageModule repairOrderId={repairOrderId} />
}
