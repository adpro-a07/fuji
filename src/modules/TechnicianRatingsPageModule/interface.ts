import { UUID } from "crypto"
import { UserData } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserData"

export interface RatingResponseInterface {
  id: UUID
  userId: UUID
  technicianId: UUID
  score: number
  comment: string
  updatedAt: string
}

export interface RatingWithTechnicianDataInterface extends Omit<RatingResponseInterface, "technicianId"> {
  technician: UserData,
  user: UserData
}