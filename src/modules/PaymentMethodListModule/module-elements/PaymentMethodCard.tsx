import { Banknote, Wallet } from "lucide-react"
import Link from "next/link"
import React, { JSX } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentMethodSummary } from "../interface"

const typeIcons: Record<string, JSX.Element> = {
  BANK_TRANSFER: <Banknote className="text-blue-500" />,
  E_WALLET: <Wallet className="text-purple-500" />,
}

interface Props {
  method: PaymentMethodSummary
}

export default function PaymentMethodCard({ method }: Props) {
  const icon = typeIcons[method.type] ?? <Wallet className="text-gray-500" />

  return (
    <Link href={`/admin/payment-methods/${method.id}`} className="block">
      <Card className="cursor-pointer transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {icon}
            <span>{method.provider}</span>
          </CardTitle>
          <CardDescription>{method.type.replace("_", " ")}</CardDescription>
        </CardHeader>
        <CardContent className="mt-2" />
      </Card>
    </Link>
  )
}
