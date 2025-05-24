"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuthContext } from "@/components/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginFormSchema } from "../constant"
import { handleFormSubmission } from "@/components/utils/toast"

export const LoginForm = () => {
  const { login } = useAuthContext()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: () => void = form.handleSubmit(async (data: z.infer<typeof loginFormSchema>) => {
    await handleFormSubmission(() => login(data), {
      loading: "Logging in...",
      success: "Successfully logged in!",
      error: "Login failed.",
    })
  })

  return (
    <Form {...form}>
      <form action={onSubmit} className="space-y-8">
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
          name="password"
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
        <div className="flex flex-col space-y-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Button className="w-full" asChild={true}>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
