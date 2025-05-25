"use client"

import React, { JSX } from "react"
import { useRouter } from "next/navigation"
import { Banknote, Wallet } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentMethodDetail } from "../interface"
import EditPaymentMethodModal from "../module-elements/EditPaymentMethodModal"
import DeletePaymentMethodBtn from "../module-elements/DeletePaymentMethodBtn"

const typeIcons: Record<string, JSX.Element> = {
    BANK_TRANSFER: <Banknote className="text-blue-500" />,
    E_WALLET: <Wallet className="text-purple-500" />,
}

export default function MainPaymentMethodDetailSection({
                                                           paymentMethod,
                                                       }: {
    paymentMethod: PaymentMethodDetail
}) {
    const icon = typeIcons[paymentMethod.type] ?? null
    const router = useRouter()

    return (
        <div className="w-full max-w-xl space-y-4">
            {/* Back Button */}
            <Button variant="ghost" size="sm" onClick={() => router.push("/payment-methods")} className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to list
            </Button>

            {/* Detail Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-xl">
                        {icon}
                        <span>{paymentMethod.provider}</span>
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {paymentMethod.type.replace("_", " ")}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 text-sm">
                    <div>
                        <span className="font-medium">Account Name:</span> {paymentMethod.accountName}
                    </div>
                    <div>
                        <span className="font-medium">Account Number:</span> {paymentMethod.accountNumber}
                    </div>
                    <div>
                        <span className="font-medium">Created At:</span>{" "}
                        {new Date(paymentMethod.createdAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })}
                    </div>
                    <div>
                        <span className="font-medium">Updated At:</span>{" "}
                        {new Date(paymentMethod.updatedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })}
                    </div>
                    <Badge variant="outline">ID: {paymentMethod.id}</Badge>

                    <div className="pt-4 flex justify-end gap-2">
                        <EditPaymentMethodModal paymentMethod={paymentMethod} />
                        <DeletePaymentMethodBtn id={paymentMethod.id} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
