import React from "react"
import { PaymentMethodSummaryInterface } from "../interface"
import CreateRepairOrderForm from "../module-elements/CreateRepairOrderForm"

export default function MainCreateRepairOrderSection({
  paymentMethods,
}: {
  paymentMethods: PaymentMethodSummaryInterface[]
}) {
  return (
    <div className="m-2 rounded-xl p-5">
      <CreateRepairOrderForm paymentMethods={paymentMethods} />
    </div>
  )
}
