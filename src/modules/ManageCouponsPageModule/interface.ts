import { UUID } from "crypto"

export interface CouponResponseInterface {
  id: UUID
  code: UUID
  discountAmount: number
  maxUsage: number
  usageCount: number
  validUntil: Date
  createdAt: string
  updatedAt: string
}
