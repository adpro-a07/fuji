"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import {
  CalendarIcon,
  CreditCard,
  Smartphone,
  Building,
  Tag,
  Wrench,
  FileText,
  Calendar as CalendarIconAlt,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { post } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"
import { cn } from "@/lib/utils"
import { createAndUpdateRepairOrderSchema } from "../constant"
import { PaymentMethodSummaryInterface, PaymentMethodTypeEnum } from "../interface"
import { RepairOrderResponseInterface } from "@/modules/RepairOrderListModule/interface"

const getPaymentMethodIcon = (type: PaymentMethodTypeEnum) => {
  switch (type) {
    case PaymentMethodTypeEnum.E_WALLET:
      return <Smartphone className="h-4 w-4" />
    case PaymentMethodTypeEnum.BANK_TRANSFER:
      return <Building className="h-4 w-4" />
    default:
      return <CreditCard className="h-4 w-4" />
  }
}

const getPaymentMethodLabel = (type: PaymentMethodTypeEnum) => {
  switch (type) {
    case PaymentMethodTypeEnum.E_WALLET:
      return "E-Wallet"
    case PaymentMethodTypeEnum.BANK_TRANSFER:
      return "Bank Transfer"
    default:
      return type
  }
}

export default function CreateRepairOrderForm({ paymentMethods }: { paymentMethods: PaymentMethodSummaryInterface[] }) {
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
        onSuccess: (data) => {
          router.push(`/repair-orders/${(data as RepairOrderResponseInterface).id}`)
        },
      }
    )
  })

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Card className="shadow-lg">
        <CardHeader className="pb-6 text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Wrench className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-3xl font-bold">Create New Repair Order</CardTitle>
          <p className="text-muted-foreground">Fill out the details below to request a repair service</p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form action={onSubmit} className="space-y-8">
              {/* Item Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <FileText className="text-primary h-5 w-5" />
                  <span>Item Information</span>
                </div>
                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="itemName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Item Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Dell XPS 15 Laptop" className="h-11" {...field} />
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
                        <FormLabel className="text-base font-medium">Item Condition</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., good, fair, damaged" className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="issueDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Issue Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe the issue in detail. e.g., The device won't turn on, screen is cracked, etc."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Be as specific as possible to help our technicians prepare for the repair
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Service Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <CalendarIconAlt className="text-primary h-5 w-5" />
                  <span>Service Details</span>
                </div>
                <Separator />

                <FormField
                  control={form.control}
                  name="desiredServiceDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base font-medium">Desired Service Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "h-11 justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Select a date"}
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
                      <FormDescription>When you'd like your repair to be completed by</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Payment & Discount Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <CreditCard className="text-primary h-5 w-5" />
                  <span>Payment & Discount</span>
                </div>
                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="paymentMethodId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Payment Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Choose payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.id} value={method.id}>
                                <div className="flex items-center gap-2">
                                  {getPaymentMethodIcon(method.type)}
                                  <span>{getPaymentMethodLabel(method.type)}</span>
                                  <Badge variant="secondary" className="ml-auto">
                                    {method.provider}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="couponCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Coupon Code</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Tag className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                              placeholder="e.g., SUMMER2024"
                              className="h-11 pl-10"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Optional - Enter a valid coupon code for discounts</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" className="h-12 w-full text-base font-medium">
                  <Wrench className="mr-2 h-5 w-5" />
                  Create Repair Order
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
