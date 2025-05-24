"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { StructuredResponse } from "@/components/utils/customFetch/interface"
import { post } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"
import { createTechnicianReportSchema } from "../constant"
import type { TechnicianReportCreatePayload, TechnicianReportDraftResponse } from "../interface"

type TechnicianReportFormValues = z.infer<typeof createTechnicianReportSchema>

interface CreateTechnicianReportFormProps {
    repairOrderId: string
    onSuccess?: () => void
}

export default function CreateTechnicianReportForm({
                                                       repairOrderId,
                                                       onSuccess
                                                   }: CreateTechnicianReportFormProps) {
    const router = useRouter()

    const form = useForm<TechnicianReportFormValues>({
        resolver: zodResolver(createTechnicianReportSchema),
        defaultValues: {
            repairOrderId,
            diagnosis: "",
            actionPlan: "",
            estimatedCost: "",
            estimatedTimeSeconds: "",
        },
    })

    const createTechnicianReport = async (
        values: TechnicianReportFormValues
    ): Promise<StructuredResponse<TechnicianReportDraftResponse>> => {
        try {
            const payload: TechnicianReportCreatePayload = {
                repairOrderId: values.repairOrderId,
                diagnosis: values.diagnosis,
                actionPlan: values.actionPlan,
                estimatedCost: values.estimatedCost,
                estimatedTimeSeconds: values.estimatedTimeSeconds,
            }

            const response = await post("/api/v1/technician-reports", payload, {
                toAuthBackend: false,
                isAuthorized: true,
            })

            if (!response.success) {
                throw new Error(response.message || "Failed to create technician report")
            }

            return response as unknown as StructuredResponse<TechnicianReportDraftResponse>
        } catch (error: unknown) {
            if (navigator.onLine) {
                throw new Error((error as Error)?.message || "An unknown error occurred")
            }
            throw error
        }
    }

    const onSubmit = form.handleSubmit(async (values) => {
        await handleFormSubmission(() => createTechnicianReport(values), {
            loading: "Creating technician report...",
            success: "Successfully created technician report!",
            error: "Failed to create technician report",
            redirectTo: "/technician-report/technician-report-list?status=DRAFT",
            router,
            onSuccess,
        })
    })

    // Helper function to convert seconds to human readable format
    const formatTimeEstimate = (seconds: string) => {
        const num = parseInt(seconds)
        if (isNaN(num)) return ""

        const hours = Math.floor(num / 3600)
        const minutes = Math.floor((num % 3600) / 60)

        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''}`
        }
        return `${minutes} minute${minutes > 1 ? 's' : ''}`
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-6 rounded-xl border p-6 shadow-sm">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Create Technician Report</h1>
                </div>

                <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Diagnosis</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe the problem found and root cause..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Provide a detailed diagnosis of the issue found
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="actionPlan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Action Plan</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe the steps needed to fix the issue..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Outline the steps and procedures to resolve the issue
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="estimatedCost"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estimated Cost</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            className="pl-8"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Total estimated cost for parts and labor
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="estimatedTimeSeconds"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estimated Time (seconds)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="3600"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {field.value && formatTimeEstimate(field.value) && (
                                        <span className="text-blue-600">≈ {formatTimeEstimate(field.value)}</span>
                                    )}
                                    {!field.value && "Time needed in seconds (e.g., 3600 = 1 hour)"}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                        Create Report
                    </Button>
                </div>
            </form>
        </Form>
    )
}