import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { PaymentMethodDetail } from "./interface"
import MainPaymentMethodDetailSection from "./sections/MainPaymentMethodDetailSection"

export default async function PaymentMethodDetailPageModule({ paymentMethodId }: { paymentMethodId: string }) {
  try {
    // Fetch the payment method detail
    const response = await get<PaymentMethodDetail>(`/api/v1/payment-methods/${paymentMethodId}`, {
      isAuthorized: true,
    })

    if (!response.success || !response.data) {
      throw new Error("Failed to load payment method data")
    }

    return (
      <section className="flex justify-center pt-16">
        <MainPaymentMethodDetailSection paymentMethod={response.data} />
      </section>
    )
  } catch (error) {
    console.error(error)
    redirect("/admin/payment-methods")
  }
}
