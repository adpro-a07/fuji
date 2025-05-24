import React from "react"
import TechnicianReportList from "src/modules/TechnicianReportListPageModule"

export default async function Page(props: {
  searchParams?: Promise<{
    status?: string
  }>
}) {
  const searchParams = await props.searchParams
  const status = searchParams?.status

  return <TechnicianReportList status={status} />
}
