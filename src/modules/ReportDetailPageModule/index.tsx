import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { ReportResponseInterface } from "@/modules/ReportListModule/interface"
import MainReportDetailSection from "./sections/MainReportDetailSection"
import { AuthClient } from "@/lib/grpc"
import { UserRole } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserRole"

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

  // Fetch all technicians for name mapping
  const authClient = AuthClient.getInstance()
  const techniciansResponse = await authClient.listUsers({
    role: UserRole.TECHNICIAN,
  })
  let technicianNames: Record<string, string> = {}
  if (!techniciansResponse.error && techniciansResponse.data?.users) {
    technicianNames = Object.fromEntries(
      techniciansResponse.data.users.map((u) => [u.identity?.id, u.identity?.fullName])
    )
  }

  return (
    <section className="m-20 mx-auto max-w-6xl p-8">
      <MainReportDetailSection report={report} technicianNames={technicianNames} />
    </section>
  )
}
