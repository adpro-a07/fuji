import React from "react"
import PaymentMethodDetailPageModule from "@/modules/PaymentMethodDetailPageModule"

export default async function PaymentMethodDetailPage({ params }: { params: Promise<{ paymentMethodId: string }> }) {
  const { paymentMethodId } = await params

  return <PaymentMethodDetailPageModule paymentMethodId={paymentMethodId} />
}
