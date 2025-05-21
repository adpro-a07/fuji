import { UserData } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserData"
import { UUID } from "crypto"

export enum RepairOrderStatusEnum {
  PENDING_CONFIRMATION = "PENDING_CONFIRMATION",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface RepairOrderResponseInterface {
  id: UUID
  customerId: UUID
  technicianId: UUID
  status: RepairOrderStatusEnum
  itemName: string
  itemCondition: string
  issueDescription: string
  desiredServiceDate: string
  paymentMethodId: UUID
  couponId: UUID | null
  createdAt: string
  updatedAt: string
}

export interface RepairOrderWithTechnicianDataInterface extends Omit<RepairOrderResponseInterface, "technicianId"> {
  technician: UserData
}
