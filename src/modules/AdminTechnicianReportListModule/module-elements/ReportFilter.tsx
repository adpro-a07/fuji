import React from "react"

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
    <div className="mb-4 flex items-center gap-8">
      <input
        type="text"
        placeholder="Search by diagnosis...."
        value={search || ""}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-64 rounded border px-2 py-1"
      />
      <select
        value={technicianId || ""}
        onChange={(e) => onTechnicianChange(e.target.value || undefined)}
        className="w-52 rounded border px-2 py-1"
      >
        <option value="">All Technicians</option>
        {technicians.map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
