"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { ReportResponseInterface } from "../interface"
import ReportDetailCard from "../module-elements/ReportDetailCard"

interface Props {
  report: ReportResponseInterface
  technicianNames?: Record<string, string>
}

export default function MainTechnicianReportDetailSection({ report, technicianNames = {} }: Props) {
  const router = useRouter()

  return (
    <div className="m-2 rounded-xl p-5">
      <button onClick={() => router.back()} className="mb-4 text-blue-500 hover:underline">
        Back
      </button>
      <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">Detail Report</h1>
      <ReportDetailCard report={report} technicianNames={technicianNames} />
    </div>
  )
}
