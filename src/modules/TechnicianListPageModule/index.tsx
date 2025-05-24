import { redirect } from "next/navigation"
import React from "react"
import { AuthClient } from "@/lib/grpc"
import { UserRole } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserRole"
import { TECHNICIAN_LIST_PAGE_SIZE } from "./constant"
import MainTechniciansListSection from "./sections/MainTechniciansListSection"

export default async function TechnicianListPageModule({
  currentPage,
  isVerbose = false,
}: {
  currentPage: number
  isVerbose?: boolean
}) {
  try {
    // Get all technicians
    const authClient = AuthClient.getInstance()

    // Get the technician ids
    const response = await authClient.listUsers({
      role: UserRole.TECHNICIAN,
      pageSize: TECHNICIAN_LIST_PAGE_SIZE,
      pageNumber: currentPage - 1,
    })

    if (response.error) throw new Error(response.error.message)

    const technicians = response.data?.users || []

    return (
      <section>
        <div className="pt-16">
          <MainTechniciansListSection
            technicians={technicians}
            totalPages={response.data?.totalPages || 1}
            isVerbose={isVerbose}
          />
        </div>
      </section>
    )
  } catch (error) {
    console.log(error)
    redirect("/")
  }
}
