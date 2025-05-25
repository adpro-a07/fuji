import { UUID } from "crypto"

export interface ReportResponseInterface {
  id: UUID
  repairOrderId: UUID
  technicianId: UUID
  diagnosis: string
  actionPlan: string
  estimatedCost: number
  estimatedTimeSeconds: number
  status: string
  lastUpdatedAt: Date
}
