"use client"
import { useSearchParams } from "next/navigation"
import React from "react"
import MainCreateTechnicianReportSection from "./sections/MainCreateTechnicianReportSection"

export default function CreateTechnicianReportPageModule() {
    const searchParams = useSearchParams()
    const repairOrderId = searchParams.get("repairOrderId") || ""

    return (
        <div className="px-16 pt-32">
            <MainCreateTechnicianReportSection
                repairOrderId={repairOrderId}
            />
        </div>
    )
}