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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-sm">
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