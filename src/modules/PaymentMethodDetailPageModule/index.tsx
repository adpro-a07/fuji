import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import MainPaymentMethodDetailSection from "./sections/MainPaymentMethodDetailSection"
import { PaymentMethodDetail } from "./interface"

export default async function PaymentMethodDetailPageModule({
                                                                paymentMethodId,
                                                            }: {
    paymentMethodId: string
}) {
    try {
        // Fetch the payment method detail
        const response = await get<PaymentMethodDetail>(`/api/v1/payment-methods/${paymentMethodId}`, {
            isAuthorized: true,
        })
        console.log("Payment Method API response:", response)
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
        redirect("/payment-methods")
    }
}
