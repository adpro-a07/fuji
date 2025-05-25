import { BookCheck, BookKey, BookMarked, BookOpen, BookX, Star } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RepairOrderWithTechnicianDataInterface } from "../interface"

const statusIcons = {
  PENDING_CONFIRMATION: <BookKey className="text-yellow-500" />,
  IN_PROGRESS: <BookOpen className="text-green-500" />,
  COMPLETED: <BookCheck className="text-blue-500" />,
  CANCELLED: <BookX className="text-gray-500" />,
  DEFAULT: <BookMarked className="text-purple-500" />,
}

export default function RepairOrderCard({ repair_order }: { repair_order: RepairOrderWithTechnicianDataInterface }) {
  const icon = statusIcons[repair_order.status] ?? statusIcons.DEFAULT
  const technicianName = `${repair_order.technician?.identity?.fullName ?? "Unknown"}`
  const isCompleted = repair_order.status === "COMPLETED"

  return (
    <div className="relative">
      {isCompleted && (
        <Link href={`/repair-orders/${repair_order.id}/create-rating`} className="absolute top-4 right-4 z-10">
          <Button
            size="sm"
            variant="secondary"
            className="hover:text-primary flex items-center space-x-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <Star className="h-4 w-4" />
            <span>Beri Rating</span>
          </Button>
        </Link>
      )}

      <Link href={`/repair-orders/${repair_order.id}`} className="block">
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                {icon}
                <div>
                  <p className="text-lg font-semibold">{repair_order.itemName}</p>
                </div>
              </div>
            </CardTitle>
            <CardDescription>Assigned to: {technicianName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Condition:</span> {repair_order.itemCondition}
            </p>
            <p>
              <span className="font-medium">Issue:</span> {repair_order.issueDescription}
            </p>
            <p>
              <span className="font-medium">Service Date:</span> {repair_order.desiredServiceDate}
            </p>
            <p>
              <span className="font-medium">Status:</span> {repair_order.status}
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
