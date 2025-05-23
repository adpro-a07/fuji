export enum RepairOrderStatusEnum {
    PENDING_CONFIRMATION = "PENDING_CONFIRMATION",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export interface RepairOrderForTechnician {
    id: string
    customerId: string
    technicianId: string
    status: RepairOrderStatusEnum | string
    itemName: string
    itemCondition: string
    issueDescription: string
    desiredServiceDate: string
    createdAt: string
    updatedAt: string
    paymentMethodId: string | null
    couponId: string | null
}

export interface RepairOrderListForTechnicianApiResponse {
    success: boolean
    message: string
    data: RepairOrderForTechnician[]
    timestamp: string
}