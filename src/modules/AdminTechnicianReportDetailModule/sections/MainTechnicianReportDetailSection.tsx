"use client"
import { ArrowLeft, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { ReportResponseInterface } from "../interface"
import ReportDetailCard from "../module-elements/ReportDetailCard"

interface Props {
  report: ReportResponseInterface
  technicianNames?: Record<string, string>
}

export default function MainTechnicianReportDetailSection({ report, technicianNames = {} }: Props) {
  const router = useRouter()

  return (
    <div className="transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group mb-6 inline-flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Reports</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center space-x-3">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Report Details</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            View comprehensive information about this technician report
          </p>
        </div>

        {/* Report Detail Card */}
        <ReportDetailCard report={report} technicianNames={technicianNames} />
      </div>
    </div>
  )
}
