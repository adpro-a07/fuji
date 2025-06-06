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
    <div className="px-6 pt-16">
      {ratings.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          <p>No ratings found for this technician.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
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
