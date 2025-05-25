"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { post } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"

// Validation schema
const createPaymentMethodSchema = z.object({
  type: z.string().refine((val) => val === "BANK_TRANSFER" || val === "E_WALLET", {
    message: "Type must be BANK_TRANSFER or E_WALLET",
  }),
  provider: z.string().min(1, "Provider is required").max(100),
  accountNumber: z.string().regex(/^\d+$/, "Account number must contain only digits").min(10).max(30),
  accountName: z.string().min(1, "Account name is required").max(100),
})

export default function CreatePaymentMethodForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof createPaymentMethodSchema>>({
    resolver: zodResolver(createPaymentMethodSchema),
    defaultValues: {
      type: "",
      provider: "",
      accountNumber: "",
      accountName: "",
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    await handleFormSubmission(
      () =>
        post("/api/v1/payment-methods", values, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Creating payment method...",
        success: "Payment method created successfully!",
        error: "Failed to create payment method",
        redirectTo: "/payment-methods",
        router,
      }
    )
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-6 rounded-xl border p-6 shadow-sm">
        <h1 className="text-center text-2xl font-bold">Create Payment Method</h1>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="E_WALLET">E-Wallet</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider</FormLabel>
              <FormControl>
                <Input placeholder="Ex: BCA, GoPay" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Payment Method
        </Button>
      </form>
    </Form>
  )
}
