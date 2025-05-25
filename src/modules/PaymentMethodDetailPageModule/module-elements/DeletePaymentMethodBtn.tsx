"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { del } from "@/components/utils/customFetch/serverFetchClients"
import { toastHandlers } from "@/components/utils/toast"

export default function DeletePaymentMethodBtn({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this payment method?")
    if (!confirmed) return

    await toastHandlers.delete(() => del(`/api/v1/payment-methods/${id}`, { isAuthorized: true }), {
      onSuccess: () => router.push("/admin/payment-methods"),
    })
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      <Trash2 className="mr-2 h-4 w-4" /> Delete
    </Button>
  )
}
