"use client"

import Link from "next/link"
import React from "react"
import { useAuthContext } from "@/components/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { PaymentMethodSummary } from "../interface"
import PaymentMethodCard from "../module-elements/PaymentMethodCard"

export default function MainPaymentMethodsListSection({
                                                          paymentMethods,
                                                      }: {
    paymentMethods: PaymentMethodSummary[]
}) {
    const { user } = useAuthContext()
    const isAdmin = user?.role === "ADMIN"

    return (
        <div className="m-2 rounded-xl p-5">
            <div className="mb-4 flex justify-end">
                {isAdmin && (
                    <Link href="/payment-methods/create">
                        <Button className="w-fit">Add Payment Method</Button>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {paymentMethods.length > 0 ? (
                    paymentMethods.map((method) => (
                        <PaymentMethodCard key={method.id} method={method} />
                    ))
                ) : (
                    <div className="col-span-4 py-10 text-center text-gray-500">
                        No payment methods found
                    </div>
                )}
            </div>
        </div>
    )
}
