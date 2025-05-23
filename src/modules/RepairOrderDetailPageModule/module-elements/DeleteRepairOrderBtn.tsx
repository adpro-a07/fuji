"use client"
import { useRouter } from "next/navigation"
import React from "react"
import { Button } from "@/components/ui/button"
import { del } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"
import { Trash } from "lucide-react"

export default function DeleteRepairOrderBtn({ repairOrderId }: { repairOrderId: string }) {
  const router = useRouter()
  const deleteClass: () => void = async () => {
    await handleFormSubmission(
      () =>
        del(`/api/v1/repair-orders/${repairOrderId}`, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Deleting repair order...",
        success: "Repair order deleted successfully!",
        error: "Failed to delete repair order",
        redirectTo: "/repair-orders",
        router,
      }
    )
  }

  return (
    <form action={deleteClass}>
      <Button variant="destructive" type="submit">
        <Trash className="mr-2 h-4 w-4" /> Delete
      </Button>
    </form>
  )
}
