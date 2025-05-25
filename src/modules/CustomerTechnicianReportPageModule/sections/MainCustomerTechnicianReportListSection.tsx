"use client"

import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { TechnicianReport, TechnicianReportStatusEnum } from "../interface"
import CustomerTechnicianReportCard from "../module-elements/CustomerTechnicianReportCard"

interface Props {
  reports: TechnicianReport[]
  status: TechnicianReportStatusEnum
}

export default function MainCustomerTechnicianReportListSection({ reports, status }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value

    const params = new URLSearchParams(searchParams.toString())
    params.set("status", newStatus)

    router.push(`?${params.toString()}`)
  }

  return (
      <div className="mt-20 p-6">
        <div className="mb-6">
          <h1 className="mb-4 text-2xl font-bold">Technician Reports</h1>
          <div className="relative inline-block w-64">
            <select
                value={status}
                onChange={handleChange}
                className="block w-full appearance-none rounded border border-gray-300 bg-white px-4 py-2 pr-8 text-gray-700 transition focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            >
              {Object.values(TechnicianReportStatusEnum).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {reports && reports.length > 0 ? (
              reports.map((report) => <CustomerTechnicianReportCard key={report.reportId} report={report} />)
          ) : (
              <div className="py-10 text-center text-gray-500">No reports found for {status}</div>
          )}
        </div>
      </div>
  )
}