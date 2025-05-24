import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { ReportResponseInterface } from "@/modules/ReportListModule/interface"
import MainReportDetailSection from "./sections/MainReportDetailSection"

interface Props {
  reportId: string
}

export default async function ReportDetailPageModule({ reportId }: Props) {
  // Fetch report details
  const reportRes = await get<ReportResponseInterface>(`/api/v1/admin/reports/${reportId}`, { isAuthorized: true })

  if (!reportRes.success || !reportRes.data) {
    return <div className="p-8 text-center text-red-500">Report not found.</div>
  }

  const report = reportRes.data

  return (
    <section className="m-20 mx-auto max-w-6xl p-8">
      <MainReportDetailSection report={report} />
    </section>
  )
}
