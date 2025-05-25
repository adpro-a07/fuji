"use client"

import PaginationElement from "@/modules/TechnicianListPageModule/module-elements/PaginationElement"
import { RatingWithTechnicianDataInterface } from "../interface"
import RatingCard from "../module-elements/RatingCard"

export default function RatingsSection({
                                         ratings,
                                         totalPages,
                                       }: {
  ratings: RatingWithTechnicianDataInterface[]
  currentPage: number
  totalPages: number
}) {
  return (
    <div className="pt-16 px-6">
      {ratings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No ratings found for this technician.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ratings.map((rating) => (
              <RatingCard key={rating.id} rating={rating} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6">
              <PaginationElement totalPages={totalPages} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
