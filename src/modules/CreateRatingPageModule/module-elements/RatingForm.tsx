"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { post } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"
import StarRating from "./StarRating"
import { createAndUpdateRatingSchema } from "../constant"

export default function CreateRatingForm() {
  const router = useRouter()
  const params = useParams()
  const repairOrderId = params?.repairOrderId as string

  const form = useForm<z.infer<typeof createAndUpdateRatingSchema>>({
    resolver: zodResolver(createAndUpdateRatingSchema),
    defaultValues: {
      score: 0,
      comment: "",
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    if (!repairOrderId) {
      throw new Error("Repair Order ID tidak ditemukan.")
    }

    await handleFormSubmission(
      () =>
        post(`/api/v1/rating/ratings?repairOrderId=${repairOrderId}`, values, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Mengirim rating...",
        success: "Rating berhasil dikirim!",
        error: "Gagal mengirim rating",
        redirectTo: "/repair-orders",
        router,
      }
    )
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-6 rounded-xl border p-6 shadow-sm">
        <h1 className="text-center text-2xl font-bold">Beri Rating Layanan</h1>

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
                <Textarea placeholder="Bagikan pengalaman Anda..." maxLength={1000} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Kirim Rating
        </Button>
      </form>
    </Form>
  )
}
