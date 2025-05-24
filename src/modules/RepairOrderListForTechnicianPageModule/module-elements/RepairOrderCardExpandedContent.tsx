"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CreateTechnicianReportForm from "../../CreateTechnicianReportPageModule/module-elements/CreateTechnicianReportForm"
import { RepairOrderForTechnician } from "../interface"

export default function RepairOrderCardExpandedContent({ repairOrder }: { repairOrder: RepairOrderForTechnician }) {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateReportSuccess = () => {
    setIsDialogOpen(false)
    // Optionally refresh the page or update the UI
    router.refresh()
  }

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => router.push(`/technician-report/create?repairOrderId=${repairOrder.id}`)}
            >
              Create Technician Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Technician Report</DialogTitle>
            </DialogHeader>
            <CreateTechnicianReportForm repairOrderId={repairOrder.id} onSuccess={handleCreateReportSuccess} />
          </DialogContent>
        </Dialog>
        {/* Add more buttons here as needed */}
      </div>
    </div>
  )
}
