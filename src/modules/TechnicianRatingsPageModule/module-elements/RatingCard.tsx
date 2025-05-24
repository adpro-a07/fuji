"use client"

import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import { useAuthContext } from "@/components/contexts/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import DeleteRatingBtn from "./DeleteRatingBtn"
import EditRatingModal from "./EditRatingModal"
import { RatingWithTechnicianDataInterface } from "../interface"

export default function RatingCard({ rating }: { rating: RatingWithTechnicianDataInterface }) {
  const { user: currentUser } = useAuthContext()

  const isOwner = currentUser?.id === rating.user?.identity?.id
  const isAdmin = currentUser?.role === "ADMIN"
  const canDelete = isOwner || isAdmin

  return (
    <Card className="shadow-md border rounded-lg">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
          <div>
            <div className="font-semibold">{rating.user?.identity?.fullName}</div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(rating.updatedAt), {
                addSuffix: true,
                locale: id,
              })}
            </div>
          </div>

          {canDelete && (
            <div className="flex gap-2 self-start sm:self-auto">
              {isOwner && <EditRatingModal rating={rating} />}
              <DeleteRatingBtn ratingId={rating.id.toString()} isAdmin={isAdmin} />
            </div>
          )}
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
