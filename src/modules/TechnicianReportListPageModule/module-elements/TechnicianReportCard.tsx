"use client"

import { Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { del, post } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"
import UpdateTechnicianReportForm from "./UpdateTechnicianReportForm"
import { TechnicianReport, TechnicianReportStatusEnum } from "../interface"

export default function TechnicianReportCard({ report }: { report: TechnicianReport }) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const isDraft = report.status === TechnicianReportStatusEnum.DRAFT
  const isApproved = report.status === TechnicianReportStatusEnum.APPROVED
  const isInProgress = report.status === TechnicianReportStatusEnum.IN_PROGRESS

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this technician report? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)
    await handleFormSubmission(
      () =>
        del(`/api/v1/technician-reports/${report.reportId}`, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Deleting technician report...",
        success: "Technician report deleted successfully!",
        error: "Failed to delete technician report",
        router,
        onSuccess: () => {
          router.refresh()
        },
      }
    )
    setIsDeleting(false)
  }

  const handleStartWork = async () => {
    if (!confirm("Are you sure you want to start working on this technician report?")) {
      return
    }

    setIsStarting(true)
    await handleFormSubmission(
      () =>
        post(`/api/v1/technician-reports/${report.reportId}/start`, undefined, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Starting work on technician report...",
        success: "Successfully started work on technician report!",
        error: "Failed to start work on technician report",
        router,
        onSuccess: () => {
          router.refresh()
        },
      }
    )
    setIsStarting(false)
  }

  const handleCompleteWork = async () => {
    if (!confirm("Are you sure you want to complete this technician report?")) {
      return
    }

    setIsCompleting(true)
    await handleFormSubmission(
      () =>
        post(`/api/v1/technician-reports/${report.reportId}/complete`, undefined, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Completing technician report...",
        success: "Successfully completed technician report!",
        error: "Failed to complete technician report",
        router,
        onSuccess: () => {
          router.refresh()
        },
      }
    )
    setIsCompleting(false)
  }

  const handleUpdateSuccess = () => {
    setIsUpdateDialogOpen(false)
    router.refresh()
  }

  const formatTimeEstimate = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : ""}`
    }
    return `${minutes} minute${minutes > 1 ? "s" : ""}`
  }

  return (
    <Card className="w-full cursor-pointer transition-all hover:shadow-lg" onClick={() => setExpanded(!expanded)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Technician Report - {report.status}</CardTitle>
          {isDraft && (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" title="Edit Report">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Update Technician Report</DialogTitle>
                  </DialogHeader>
                  <UpdateTechnicianReportForm
                    report={report}
                    onSuccess={handleUpdateSuccess}
                    onCancel={() => setIsUpdateDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
                title="Delete Report"
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p>
          <strong>Diagnosis:</strong> {report.diagnosis}
        </p>
        <p>
          <strong>Action Plan:</strong> {report.actionPlan}
        </p>

        {expanded && (
          <>
            <p>
              <strong>Estimated Cost:</strong> ${report.estimatedCost}
            </p>
            <p>
              <strong>Estimated Time:</strong> {formatTimeEstimate(report.estimatedTimeSeconds)}
            </p>
            {isApproved && (
              <div className="pt-3" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="default"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleStartWork}
                  disabled={isStarting}
                >
                  {isStarting ? "Starting Work..." : "Start Work"}
                </Button>
              </div>
            )}
            {isInProgress && (
              <div className="pt-3" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleCompleteWork}
                  disabled={isCompleting}
                >
                  {isCompleting ? "Completing Work..." : "Complete Work"}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
