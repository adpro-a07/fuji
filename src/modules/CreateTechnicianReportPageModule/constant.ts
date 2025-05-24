import { z } from "zod"

export const createTechnicianReportSchema = z.object({
    repairOrderId: z.string().uuid("Invalid repair order ID"),
    diagnosis: z.string().max(500).nonempty("Diagnosis is required"),
    actionPlan: z.string().max(500).nonempty("Action plan is required"),
    estimatedCost: z.string().refine(
        (val) => {
            const num = parseFloat(val)
            return !isNaN(num) && num > 0
        },
        { message: "Estimated cost must be a positive number" }
    ),
    estimatedTimeSeconds: z.string().refine(
        (val) => {
            const num = parseInt(val)
            return !isNaN(num) && num > 0
        },
        { message: "Estimated time must be a positive number" }
    ),
})