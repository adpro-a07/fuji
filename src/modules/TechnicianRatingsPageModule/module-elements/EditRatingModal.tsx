"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { put } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"
import { createAndUpdateRatingSchema } from "@/modules/CreateRatingPageModule/constant"
import StarRating from "@/modules/CreateRatingPageModule/module-elements/StarRating"
import { RatingWithTechnicianDataInterface } from "../interface"

export default function EditRatingModal({ rating }: { rating: RatingWithTechnicianDataInterface }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof createAndUpdateRatingSchema>>({
    resolver: zodResolver(createAndUpdateRatingSchema),
    defaultValues: {
      score: rating.score,
      comment: rating.comment,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    await handleFormSubmission(
      () =>
        put(`/api/v1/rating/ratings/${rating.id}`, values, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Memperbarui rating...",
        success: "Rating berhasil diperbarui!",
        error: "Gagal memperbarui rating",
        redirectTo: `/technicians/${rating.technician.identity?.id}/ratings`,
        router,
        onSuccess: () => setOpen(false),
      }
    )
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid gap-4 py-4">
            <DialogHeader>
              <DialogTitle>Edit Rating</DialogTitle>
              <DialogDescription>Perbarui skor dan komentar rating kamu.</DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <StarRating value={field.value} onChange={(val) => form.setValue("score", val)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Komentar</FormLabel>
                  <FormControl>
                    <Textarea maxLength={1000} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
