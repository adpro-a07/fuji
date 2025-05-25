// modules/CustomerTechnicianReportModule.tsx
import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { TechnicianReport, TechnicianReportStatusEnum } from "./interface"
import MainCustomerTechnicianReportListSection from "./sections/MainCustomerTechnicianReportListSection"
export default async function CustomerTechnicianReportModule({ status }: { status?: string }) {
    const normalizedStatus = status || "SUBMITTED"
    console.log(status)
    const allowedStatuses = Object.values(TechnicianReportStatusEnum)
    const isValidStatus = allowedStatuses.includes(normalizedStatus as TechnicianReportStatusEnum)

    if (!isValidStatus) {
        redirect("/technician-report/customer-technician-reports?status=SUBMITTED")
    }

    try {
        const response = await get<TechnicianReport[]>(
            `/api/v1/technician-reports/for-customer?status=${normalizedStatus}`,
            { isAuthorized: true }
        )

        if (!response.success && response.message !== "No technician report submissions found") {
            throw new Error(response.message)
        }

        return (
            <MainCustomerTechnicianReportListSection
                reports={response.data ?? []}
                status={normalizedStatus as TechnicianReportStatusEnum}
            />
        )
    } catch (error) {
        console.error(error)
        redirect("/")
    }
}
