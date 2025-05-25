import { z } from "zod"

export const createAndUpdateRatingSchema = z.object({
  score: z.number().min(1, "Rating minimal 1").max(5, "Rating maksimal 5"),
  comment: z.string().max(1000).nonempty("Komentar tidak boleh kosong"),
})
