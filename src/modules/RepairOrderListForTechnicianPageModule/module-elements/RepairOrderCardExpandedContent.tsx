import React from "react"
import { Button } from "@/components/ui/button"
import { RepairOrderForTechnician } from "../interface"

export default function RepairOrderCardExpandedContent({ repairOrder }: { repairOrder: RepairOrderForTechnician }) {
  return (
    <div className="space-y-2 px-4 pb-4 text-sm">
      <p>
        <span className="font-medium">Full Issue:</span> {repairOrder.issueDescription}
      </p>
      <p>
        <span className="font-medium">Service Date:</span> {repairOrder.desiredServiceDate}
      </p>
      <p>
        <span className="font-medium">Created At:</span> {new Date(repairOrder.createdAt).toLocaleString()}
      </p>

      <div className="flex gap-2 pt-4">
        <Button variant="secondary" className="w-full">
          Create Technician Report
        </Button>
        {/* Add more buttons here as needed */}
      </div>
    </div>
  )
}
