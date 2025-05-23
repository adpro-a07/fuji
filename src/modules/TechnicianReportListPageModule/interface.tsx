export enum TechnicianReportStatusEnum {
    DRAFT = "DRAFT",
    SUBMITTED = "SUBMITTED",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

export interface TechnicianReport {
    reportId: string
    repairOrderId: string
    technicianId: string
    diagnosis: string
    actionPlan: string
    estimatedCost: number
    estimatedTimeSeconds: number
    status: TechnicianReportStatusEnum | string
}

export interface TechnicianReportApiResponse {
    success: boolean
    message: string
    data: TechnicianReport[]
    timestamp: string
}
