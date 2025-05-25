
export enum PaymentType {
    BANK_TRANSFER = "BANK_TRANSFER",
    E_WALLET = "E_WALLET",
}



export interface PaymentMethodSummary {
    id: string
    type: PaymentType
    provider: string
    accountNumber: string
    accountName: string
    createdAt: string
    updatedAt: string
}