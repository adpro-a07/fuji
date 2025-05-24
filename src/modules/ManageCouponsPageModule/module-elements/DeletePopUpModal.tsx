import React from "react"
import { Button } from "@/components/ui/button"

export function DeletePopUpModal({
  open,
  onClose,
  onConfirm,
  message,
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  message: string
}) {
  if (!open) return null
  return (
    <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="mb-4 text-lg">{message}</div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
