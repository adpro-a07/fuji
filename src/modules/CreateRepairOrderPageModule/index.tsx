import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { PaymentMethodSummaryInterface } from "./interface"
import MainCreateRepairOrderSection from "./sections/MainCreateRepairOrderSection"

export default async function CreateRepairOrderPageModule() {
  try {
    const paymentMethodsResponse = await get<PaymentMethodSummaryInterface[]>("/api/v1/payment-methods", {
      isAuthorized: true,
    })

    if (!paymentMethodsResponse.success) throw new Error(paymentMethodsResponse.message)

    const paymentMethods = paymentMethodsResponse.data ?? []
    return (
      <div className="px-16 pt-32">
        <MainCreateRepairOrderSection paymentMethods={paymentMethods} />
      </div>
    )
  } catch (error) {
    console.log(error)
    redirect("/repair-orders")
  }
}
