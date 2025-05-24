export interface TechnicianReportCreatePayload {
  repairOrderId: string
  diagnosis: string
  actionPlan: string
  estimatedCost: string
  estimatedTimeSeconds: string
}

export interface TechnicianReportDraftResponse {
  reportId: string
  repairOrderId: string
  technicianId: string
  diagnosis: string
  actionPlan: string
  estimatedCost: number
  estimatedTimeSeconds: number
  status: string
}

export interface TechnicianReportApiResponse {
  success: boolean
  message: string
  data: TechnicianReportDraftResponse
  timestamp: string
}
