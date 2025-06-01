import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { AuthClient } from "@/lib/grpc"
import { UserRole } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserRole"
import { ReportResponseInterface } from "./interface"
import MainTechnicianReportListSection from "./sections/MainTechnicianReportListSection"

export default async function TechnicianReportListModule() {
  try {
    const reportsResponse = await get<ReportResponseInterface[]>("/api/v1/admin/reports", {
      isAuthorized: true,
    })

    if (!reportsResponse.success) throw new Error(reportsResponse.message)

    const reports: ReportResponseInterface[] = reportsResponse.data ?? []

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
      <section>
        <div className="pt-16">
          <MainTechnicianReportListSection reports={reports} technicianNames={technicianNames} />
        </div>
      </section>
    )
  } catch (error) {
    console.log(error)
    redirect("/")
  }
}
