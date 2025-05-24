import React from "react"
import { ReportResponseInterface } from "../interface"
import ReportCard from "../module-elements/ReportCard"

export default function MainReportListSection({ reports }: { reports: ReportResponseInterface[] }) {
  return (
    <div className="m-2 rounded-xl p-5">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Completed Technician Report List</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {reports.length > 0 ? (
          reports.map((report) => <ReportCard report={report} key={report.id} />)
        ) : (
          <div className="col-span-4 py-10 text-center">
            <p className="text-gray-500">No reports found</p>
          </div>
        )}
      </div>
    </div>
  )
}
