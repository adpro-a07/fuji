"use client"

import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { RatingWithTechnicianDataInterface } from "../interface"

export default function RatingCard({ rating }: { rating: RatingWithTechnicianDataInterface }) {
  return (
    <Card className="shadow-md border rounded-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="font-semibold">{rating.user?.identity?.fullName}</div>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(rating.updatedAt), {
              addSuffix: true,
              locale: id,
            })}
          </div>
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
