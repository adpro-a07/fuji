"use client"

import { useAuthContext } from "@/components/contexts/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import EditRatingModal from "./EditRatingModal"
import { RatingWithTechnicianDataInterface } from "../interface"

export default function RatingCard({ rating }: { rating: RatingWithTechnicianDataInterface }) {
  const { user: currentUser } = useAuthContext()
  const isOwner = currentUser?.id === rating.user?.identity?.id

  return (
    <Card className="shadow-md border rounded-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-semibold">{rating.user?.identity?.fullName}</div>
            <div className="text-sm text-muted-foreground">
              {new Date(rating.updatedAt).toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
              })}
            </div>
          </div>
          {isOwner && <EditRatingModal rating={rating} />}
        </div>

        <div className="flex items-center mb-2">
          {Array.from({ length: rating.score }, (_, i) => (
            <span key={i}>⭐</span>
          ))}
          <span className="ml-2">{rating.score}/5</span>
        </div>

        <p>{rating.comment}</p>
      </CardContent>
    </Card>
  )
}

