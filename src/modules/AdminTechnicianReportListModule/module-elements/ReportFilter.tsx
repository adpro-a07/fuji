import React from "react"
import { Search, User } from "lucide-react"

interface ReportFilterProps {
  technicians: [string, string][]
  technicianId?: string
  search?: string
  onTechnicianChange: (technicianId?: string) => void
  onSearchChange: (search: string) => void
}

export default function ReportFilter({
  technicians,
  technicianId,
  search,
  onTechnicianChange,
  onSearchChange,
}: ReportFilterProps) {
  return (
    <div className="mb-8 space-y-4 sm:flex sm:items-center sm:gap-4 sm:space-y-0">
      {/* Search Input */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          placeholder="Search by diagnosis..."
          value={search || ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      {/* Technician Filter */}
      <div className="relative">
        <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <select
          value={technicianId || ""}
          onChange={(e) => onTechnicianChange(e.target.value || undefined)}
          className="min-w-48 cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white py-3 pr-8 pl-10 text-gray-900 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Technicians</option>
          {technicians.map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
