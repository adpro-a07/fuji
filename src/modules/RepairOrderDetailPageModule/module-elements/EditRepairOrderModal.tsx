"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { put } from "@/components/utils/customFetch/serverFetchClients"
import { RepairOrderWithoutTechnicianDataInterface } from "../interface"
import { createAndUpdateRepairOrderSchema } from "@/modules/CreateRepairOrderPageModule/constant"
import { handleFormSubmission } from "@/components/utils/toast"
import { CalendarIcon, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function EditRepairOrderModal({
  repairOrder,
}: {
  repairOrder: RepairOrderWithoutTechnicianDataInterface
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof createAndUpdateRepairOrderSchema>>({
    resolver: zodResolver(createAndUpdateRepairOrderSchema),
    defaultValues: {
      itemName: repairOrder.itemName,
      itemCondition: repairOrder.itemCondition,
      issueDescription: repairOrder.issueDescription,
      desiredServiceDate: new Date(repairOrder.desiredServiceDate),
      paymentMethodId: repairOrder.paymentMethodId,
      couponId: repairOrder.couponId || "",
    },
  })

  const onSubmit: () => void = form.handleSubmit(async (values) => {
    await handleFormSubmission(
      () =>
        put(`/api/v1/repair-orders/${repairOrder.id}`, values, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Updating repair order...",
        success: "Repair order updated successfully!",
        error: "Failed to update repair order",
        redirectTo: `/repair-orders/${repairOrder.id}`, // or wherever you want to redirect
        router,
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form action={onSubmit} className="grid gap-4 py-4">
            <DialogHeader>
              <DialogTitle>Edit Class</DialogTitle>
              <DialogDescription>Make changes to your class here. Click save when you're done.</DialogDescription>
            </DialogHeader>
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
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
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
              name="couponId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon ID</FormLabel>
                  <FormControl>
                    <Input placeholder="UUID" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
