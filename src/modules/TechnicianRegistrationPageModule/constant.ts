import { z } from "zod"

export const technicianRegistrationFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Fullname must be between 3 and 100 characters" })
    .max(100, { message: "Fullname must be between 3 and 100 characters" })
    .regex(/^[\p{L} .'-]+$/u, {
      message: "Fullname should contain only letters, spaces, and basic punctuation",
    }),

  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Email should be valid" })
    .max(100, { message: "Email must be less than 100 characters" }),

  phoneNumber: z
    .string()
    .min(8, { message: "Phone number must be between 8 and 15 characters" })
    .max(15, { message: "Phone number must be between 8 and 15 characters" })
    .regex(/^[+]?[0-9]{8,15}$/, {
      message: "Phone number must contain only numbers with optional + prefix and be between 8-15 digits",
    }),

  password1: z
    .string()
    .min(8, { message: "Password must be between 8 and 100 characters" })
    .max(100, { message: "Password must be between 8 and 100 characters" })
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {
      message:
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character",
    }),

  password2: z.string().nonempty({ message: "Password confirmation is required" }),

  address: z
    .string()
    .min(5, { message: "Address must be between 5 and 200 characters" })
    .max(200, { message: "Address must be between 5 and 200 characters" }),

  experience: z
    .string()
    .min(5, { message: "Experience must be between 5 and 500 characters" })
    .max(500, { message: "Experience must be between 5 and 500 characters" })
    .nonempty({ message: "Experience is required" }),
})
