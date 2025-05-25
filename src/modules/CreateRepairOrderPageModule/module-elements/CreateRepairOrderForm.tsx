"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { post } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"
import { cn } from "@/lib/utils"
import { createAndUpdateRepairOrderSchema } from "../constant"

export default function CreateRepairOrderForm() {
  const router = useRouter()

  const defaultDesiredServiceDate = new Date()
  defaultDesiredServiceDate.setDate(defaultDesiredServiceDate.getDate() + 7)
  defaultDesiredServiceDate.setHours(23, 55, 0, 0)

  const form = useForm<z.infer<typeof createAndUpdateRepairOrderSchema>>({
    resolver: zodResolver(createAndUpdateRepairOrderSchema),
    defaultValues: {
      itemName: "",
      itemCondition: "",
      issueDescription: "",
      desiredServiceDate: defaultDesiredServiceDate,
      paymentMethodId: "",
      couponCode: "",
    },
  })

  const onSubmit: () => void = form.handleSubmit(async (values) => {
    await handleFormSubmission(
      () =>
        post("/api/v1/repair-orders", values, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Creating repair order...",
        success: "Repair order created successfully!",
        error: "Failed to create repair order",
        redirectTo: "/repair-orders", // or wherever you want to redirect
        router,
      }
    )
  })

  return (
    <Form {...form}>
      <form action={onSubmit} className="mx-auto max-w-xl space-y-6 rounded-xl border p-6 shadow-sm">
        <h1 className="text-center text-2xl font-bold">Create New Repair Order</h1>
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Dell XPS 15 Laptop" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Condition</FormLabel>
              <FormControl>
                <Input placeholder="Ex: bad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issueDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex: it won't turn on" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desiredServiceDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Desired Service Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick deadline</span>}
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
              <FormDescription>When you'd like your repair to be completed by.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethodId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method ID</FormLabel>
              <FormControl>
                <Input placeholder="UUID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="couponCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coupon ID</FormLabel>
              <FormControl>
                <Input placeholder="Ex: SUMMER2024" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Repair Order
        </Button>
      </form>
    </Form>
  )
}
