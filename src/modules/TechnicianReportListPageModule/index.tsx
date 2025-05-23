'use client'

import React, { useEffect, useState } from "react"
import MainTechnicianReportListSection from "./sections/MainTechnicianReportListSection"
import { TechnicianReport, TechnicianReportApiResponse, TechnicianReportStatusEnum } from "./interface"
import { get } from "@/components/utils/customFetch/serverFetchClients"

export default function TechnicianReportList() {
    const [reports, setReports] = useState<TechnicianReport[]>([])
    const [status, setStatus] = useState<TechnicianReportStatusEnum>(TechnicianReportStatusEnum.DRAFT)

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await get<TechnicianReportApiResponse>(
                    `/api/v1/technician-reports?status=${status}`,
                    { isAuthorized: true }
                )
                if (response?.success) {
                    const mappedData = Array.isArray(response.data)
                        ? (response.data as TechnicianReport[]).map((report) => ({
                            ...report,
                            status: TechnicianReportStatusEnum[report.status as keyof typeof TechnicianReportStatusEnum] ?? report.status
                        }))
                        : []
                    setReports(mappedData)
                } else {
                    console.error(response?.message)
                }
            } catch (error) {
                console.error("Fetch error", error)
            }
        }
        fetchReports()
    }, [status])

    return <MainTechnicianReportListSection reports={reports} status={status} setStatus={setStatus} />
}