import React from "react"
import { BookCheck, BookKey, BookMarked, BookOpen, BookX } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RepairOrderForTechnician } from "../interface"

const statusIcons = {
    PENDING_CONFIRMATION: <BookKey className="text-yellow-500" />,
    IN_PROGRESS: <BookOpen className="text-green-500" />,
    COMPLETED: <BookCheck className="text-blue-500" />,
    CANCELLED: <BookX className="text-gray-500" />,
    DEFAULT: <BookMarked className="text-purple-500" />,
}

export default function RepairOrderCardForTechnician({ repairOrder }: { repairOrder: RepairOrderForTechnician }) {
    const icon = statusIcons[repairOrder.status as keyof typeof statusIcons] ?? statusIcons.DEFAULT

    return (
        <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center space-x-2">
                        {icon}
                        <span className="text-lg font-semibold">{repairOrder.itemName}</span>
                    </div>
                </CardTitle>
                <CardDescription>Status: {repairOrder.status}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
                <p>
                    <span className="font-medium">Condition:</span> {repairOrder.itemCondition}
                </p>
                <p>
                    <span className="font-medium">Issue:</span> {repairOrder.issueDescription}
                </p>
                <p>
                    <span className="font-medium">Service Date:</span> {repairOrder.desiredServiceDate}
                </p>
                <p>
                    <span className="font-medium">Created At:</span> {new Date(repairOrder.createdAt).toLocaleString()}
                </p>
                <Button className="mt-2 w-full" variant="secondary" disabled>
                    Create Technician Report
                </Button>
            </CardContent>
        </Card>
    )
}