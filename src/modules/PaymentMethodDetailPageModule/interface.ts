
export enum PaymentType {
    BANK_TRANSFER = "BANK_TRANSFER",
    E_WALLET = "E_WALLET",
}


export interface PaymentMethodDetail {
    id: string
    provider: string
    type: PaymentType
    accountName: string
    accountNumber: string
    createdAt: string
    updatedAt: string
}
