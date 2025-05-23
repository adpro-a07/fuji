export interface Report {
  id: string
  technicianId: string
  diagnosis: string
  actionPlan: string
  estimatedCost: number
  estimatedTimeSeconds: number
  status: string
  lastUpdatedAt: string
}

// Alert interface (in interface.ts)
export interface Alert {
  couponId: string
  code: string
  validUntil: string
  daysLeft: number
}

