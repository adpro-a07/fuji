import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { ReportResponseInterface } from "./interface"
import MainReportListSection from "./sections/MainReportListSection"

export default async function ReportListModule() {
  try {
    const reportsResponse = await get<ReportResponseInterface[]>("/api/v1/admin/reports", {
      isAuthorized: true,
    })

    if (!reportsResponse.success) throw new Error(reportsResponse.message)

    const reports: ReportResponseInterface[] = reportsResponse.data ?? []

    return (
      <section>
        <div className="pt-16">
          <MainReportListSection reports={reports} />
        </div>
      </section>
    )
  } catch (error) {
    console.log(error)
    redirect("/")
  }
}
