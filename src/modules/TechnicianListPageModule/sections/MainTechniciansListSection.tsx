import React from "react"
import { UserData } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserData"
import PaginationElement from "../module-elements/PaginationElement"
import { TechnicianCard } from "../module-elements/TechnicianCard"

export default function MainTechniciansListSection({
                                                     technicians,
                                                     totalPages,
                                                   }: {
  technicians: UserData[]
  totalPages: number
}) {
  return (
    <div className="m-2 rounded-xl p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {technicians.length > 0 ? (
          technicians.map((tech) => <TechnicianCard key={tech.identity?.id} technician={tech} />)
        ) : (
          <div className="col-span-4 py-10 text-center">
            <p className="text-gray-500">No technicians found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && <PaginationElement totalPages={totalPages} />}
    </div>
  )
}