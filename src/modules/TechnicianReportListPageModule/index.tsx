import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { TechnicianReport, TechnicianReportStatusEnum } from "./interface"
import MainTechnicianReportListSection from "./sections/MainTechnicianReportListSection"

export default async function TechnicianReportList({ status }: { status?: string }) {
  const allowedStatuses = Object.values(TechnicianReportStatusEnum)
  const isValidStatus = allowedStatuses.includes(status as TechnicianReportStatusEnum)

  if (!isValidStatus) redirect("?status=DRAFT")
  try {
    const response = await get<TechnicianReport[]>(`/api/v1/technician-reports?status=${status}`, {
      isAuthorized: true,
    })

    if (!response.success) throw new Error(response.message)

    return (
      <MainTechnicianReportListSection
        reports={response.data!}
        status={(status || "DRAFT") as TechnicianReportStatusEnum}
      />
    )
  } catch (error) {
    console.log(error)
    redirect("/")
  }
}
