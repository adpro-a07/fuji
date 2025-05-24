"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { post } from "@/components/utils/customFetch/serverFetchClients"
import { registrationFormSchema } from "../constant"
import { handleFormSubmission } from "@/components/utils/toast"

export const CustomerRegistrationForm = () => {
  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password1: "",
      password2: "",
      phoneNumber: "",
      address: "",
    },
  })

  const router = useRouter()

  const onSubmit: () => void = form.handleSubmit(async (values: z.infer<typeof registrationFormSchema>) => {
    await handleFormSubmission(
      () =>
        post(`/api/v1/auth/register`, values, {
          toAuthBackend: true,
        }),
      {
        loading: "Registering...",
        success: "Successfully registered!",
        error: "Registration failed.",
        redirectTo: `/login`,
        router,
      }
    )
  })

  return (
    <Form {...form}>
      <form action={onSubmit} className="space-y-8 rounded-2xl border-2 p-5">
        <p className="text-center text-2xl font-bold">Register</p>
        <div className="flex-row space-x-5 rounded-2xl md:flex md:border-2 md:p-5">
          <div className="space-y-2 pr-5 md:border-r-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password again" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Register</Button>
      </form>
    </Form>
  )
}
