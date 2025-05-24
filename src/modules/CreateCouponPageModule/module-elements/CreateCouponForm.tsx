"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, format as formatDate } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { StructuredResponse } from "@/components/utils/customFetch/interface"
import { post } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"
import { cn } from "@/lib/utils"

// Coupon creation schema
const createCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  discountAmount: z.number().min(1, "Discount must be at least 1"),
  maxUsage: z.number().min(1, "Max usage must be at least 1"),
  validUntil: z.date(),
})

type CouponFormValues = z.infer<typeof createCouponSchema>

export default function CreateCouponForm() {
  const router = useRouter()

  const defaultValidUntil = new Date()
  defaultValidUntil.setDate(defaultValidUntil.getDate() + 30)
  defaultValidUntil.setHours(23, 59, 0, 0)

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(createCouponSchema),
    defaultValues: {
      code: "",
      discountAmount: 0,
      maxUsage: 0,
      validUntil: defaultValidUntil,
    },
  })

  const createCoupon = async (values: CouponFormValues): Promise<StructuredResponse<unknown>> => {
    try {
      const payload = {
        ...values,
        validUntil: formatDate(values.validUntil, "yyyy-MM-dd"),
      }
      const response = await post("/api/v1/coupons", payload, {
        toAuthBackend: false,
        isAuthorized: true,
      })

      if (!response.success) {
        throw new Error(response.message || "Failed to create coupon")
      }

      return response
    } catch (error: unknown) {
      if (navigator.onLine) {
        throw new Error((error as Error)?.message || "An unknown error occurred")
      }
      throw error
    }
  }

  const onSubmit = form.handleSubmit(async (values) => {
    await handleFormSubmission(() => createCoupon(values), {
      loading: "Creating coupon...",
      success: "Successfully created coupon!",
      error: "Failed to create coupon",
      redirectTo: "/admin/coupons",
      router,
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-6 rounded-xl border p-6 shadow-sm">
        <h1 className="text-center text-2xl font-bold">Create New Coupon</h1>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coupon Code</FormLabel>
              <FormControl>
                <Input placeholder="Ex: SUMMER2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discountAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Ex: 20"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxUsage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Usage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Ex: 100"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="validUntil"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Valid Until</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Coupon will be valid until this date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Coupon
        </Button>
      </form>
    </Form>
  )
}
