"use client"
import React, { useState } from "react"
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
  const [search, setSearch] = useState<string>("")
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
    <div className="m-2 rounded-xl p-5">
      <ReportFilter
        technicians={technicians}
        technicianId={technicianId}
        search={search}
        onTechnicianChange={setTechnicianId}
        onSearchChange={setSearch}
      />
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Completed Technician Report List</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <ReportCard report={report} key={report.id} technicianNames={technicianNames} />
          ))
        ) : (
          <div className="col-span-4 py-10 text-center">
            <p className="text-gray-500">No reports found</p>
          </div>
        )}
      </div>
    </div>
  )
}
