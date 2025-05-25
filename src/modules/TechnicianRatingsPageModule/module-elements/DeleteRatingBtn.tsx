"use client"

import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { del } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"

export default function DeleteRatingBtn({ ratingId, isAdmin }: { ratingId: string; isAdmin: boolean }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const onDelete = async () => {
    await handleFormSubmission(
      () =>
        del(`/api/v1/rating/ratings/${ratingId}?admin=${isAdmin}`, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Menghapus rating...",
        success: "Rating berhasil dihapus!",
        error: "Gagal menghapus rating",
        redirectTo: "/technicians",
        router,
        onSuccess: () => setOpen(false),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-700 hover:bg-red-100 hover:text-red-900">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Rating?</DialogTitle>
          <DialogDescription>
            Tindakan ini akan menghapus rating secara permanen dari sistem. Apakah kamu yakin?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button className="bg-red-500 text-white hover:bg-red-600" onClick={onDelete}>
            Ya, Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
