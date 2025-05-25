import { z } from "zod"

export const createAndUpdateRepairOrderSchema = z.object({
  itemName: z.string().max(100).nonempty("Item name is required"),
  itemCondition: z.string().max(100).nonempty("Item condition is required"),
  issueDescription: z.string().max(500).nonempty("Issue description is required"),
  desiredServiceDate: z.preprocess(
    (val) => (typeof val === "string" || val instanceof Date ? new Date(val) : val),
    z.date({ required_error: "Desired service date is required", invalid_type_error: "Invalid date" }).refine(
      (date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date >= today
      },
      { message: "Desired service date must be today or in the future" }
    )
  ),
  paymentMethodId: z.string().uuid(),
  couponCode: z.preprocess((val) => (val === "" ? null : val), z.string().nullable().optional()),
})
