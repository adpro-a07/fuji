// app/technician-report/customer-technician-reports/page.tsx
import React from "react"
import CustomerTechnicianReportModule from "@/modules/CustomerTechnicianReportPageModule"

export default async function Page(props: {
    searchParams?: Promise<{
        status?: string
    }>
}) {
    const searchParams = await props.searchParams
    const status = searchParams?.status

    return <CustomerTechnicianReportModule status={status} />
}
