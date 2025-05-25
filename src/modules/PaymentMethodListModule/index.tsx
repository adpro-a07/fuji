import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { PaymentMethodSummary } from "./interface"
import MainPaymentMethodsListSection from "./sections/MainPaymentMethodsListSection"

export default async function PaymentMethodListModule() {
    const response = await get<PaymentMethodSummary[]>("/api/v1/payment-methods", {
        isAuthorized: true,
    })

    return (
        <section>
            <div className="pt-16">
                <MainPaymentMethodsListSection paymentMethods={response.data ?? []} />
            </div>
        </section>
    )
}
