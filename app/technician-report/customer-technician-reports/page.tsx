import React from "react"
import CustomerTechnicianReportModule from "@/modules/CustomerTechnicianReportPageModule"

export default function Page({
                               searchParams,
                             }: {
  searchParams: { status?: string }
}) {
  return <CustomerTechnicianReportModule status={searchParams.status} />
}