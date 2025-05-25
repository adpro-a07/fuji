import React from "react"
import CreateRepairOrderForm from "../module-elements/CreateRepairOrderForm"
import { PaymentMethodSummaryInterface } from "../interface"

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
