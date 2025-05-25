export enum PaymentMethodTypeEnum {
  E_WALLET = "E_WALLET",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export interface PaymentMethodSummaryInterface {
  id: string
  type: PaymentMethodTypeEnum
  provider: string
}
