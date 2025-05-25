import { z } from "zod"

export const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Email should be valid" })
    .max(100, { message: "Email must be less than 100 characters" }),
  password: z.string(),
})
