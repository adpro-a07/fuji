'use client'

import React from "react"
import { TechnicianReport, TechnicianReportStatusEnum } from "../interface"
import TechnicianReportCard from "../module-elements/TechnicianReportCard"

interface Props {
    reports: TechnicianReport[]
    status: TechnicianReportStatusEnum
    setStatus: React.Dispatch<React.SetStateAction<TechnicianReportStatusEnum>>
}

export default function MainTechnicianReportListSection({ reports, status, setStatus }: Props) {
    return (
        <div className="p-6 mt-20">
            <div className="mb-4">
                <div className="inline-block relative w-64">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as TechnicianReportStatusEnum)}
                        className="block appearance-none w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2 pr-8 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        {Object.values(TechnicianReportStatusEnum).map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {reports.length > 0 ? (
                    reports.map((report) => (
                        <TechnicianReportCard key={report.reportId} report={report} />
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-10">No reports found for {status}</div>
                )}
            </div>
        </div>
    )
}