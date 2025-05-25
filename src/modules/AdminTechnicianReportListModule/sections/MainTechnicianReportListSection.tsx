"use client"
import React, { useState } from "react"
import { FileText } from "lucide-react"
import { ReportResponseInterface } from "../interface"
import ReportCard from "../module-elements/ReportCard"
import ReportFilter from "../module-elements/ReportFilter"

export default function MainTechnicianReportListSection({
  reports,
  technicianNames = {},
}: {
  reports: ReportResponseInterface[]
  technicianNames?: Record<string, string>
}) {
  const [technicianId, setTechnicianId] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState("")
  const technicians = Object.entries(technicianNames)

  const filteredReports = reports.filter((report) => {
    let match = true
    if (technicianId) match = match && report.technicianId === technicianId
    if (search) {
      match = match && report.diagnosis.toLowerCase().includes(search.toLowerCase())
    }
    return match
  })

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-10 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Completed Technician Report List</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and review all completed technician reports</p>
        </div>

        {/* Filters */}
        <ReportFilter
          technicians={technicians}
          technicianId={technicianId}
          search={search}
          onTechnicianChange={setTechnicianId}
          onSearchChange={setSearch}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredReports.length} of {reports.length} completed reports
          </p>
        </div>

        {/* Reports Grid */}
        {filteredReports.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} technicianNames={technicianNames} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 p-4 dark:bg-gray-800">
              <FileText className="h-8 w-8 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No reports found</h3>
            <p className="mx-auto max-w-md text-gray-600 dark:text-gray-400">
              {search || technicianId
                ? "Try adjusting your search criteria or filters to find more reports."
                : "There are no completed reports to display at this time."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
