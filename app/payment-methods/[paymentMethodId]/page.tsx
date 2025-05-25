import React from "react"
import PaymentMethodDetailPageModule from "@/modules/PaymentMethodDetailPageModule"

export default function PaymentMethodDetailPage({ params }: { params: { paymentMethodId: string } }) {
    return <PaymentMethodDetailPageModule paymentMethodId={params.paymentMethodId} />
}
