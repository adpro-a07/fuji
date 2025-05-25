"use client"

import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { post } from "@/components/utils/customFetch/serverFetchClients"
import { handleFormSubmission } from "@/components/utils/toast"
import { TechnicianReport, TechnicianReportStatusEnum } from "../interface"

export default function CustomerTechnicianReportCard({ report }: { report: TechnicianReport }) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [isAccepting, setIsAccepting] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  const isSubmitted = report.status === TechnicianReportStatusEnum.SUBMITTED

  const handleAccept = async () => {
    if (!confirm("Are you sure you want to accept this technician report?")) {
      return
    }

    setIsAccepting(true)
    await handleFormSubmission(
      () =>
        post(`/api/v1/technician-reports/${report.reportId}/accept`, undefined, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Accepting technician report...",
        success: "Technician report accepted successfully!",
        error: "Failed to accept technician report",
        router,
        onSuccess: () => {
          router.refresh()
        },
      }
    )
    setIsAccepting(false)
  }

  const handleReject = async () => {
    if (!confirm("Are you sure you want to reject this technician report?")) {
      return
    }

    setIsRejecting(true)
    await handleFormSubmission(
      () =>
        post(`/api/v1/technician-reports/${report.reportId}/reject`, undefined, {
          toAuthBackend: false,
          isAuthorized: true,
        }),
      {
        loading: "Rejecting technician report...",
        success: "Technician report rejected successfully!",
        error: "Failed to reject technician report",
        router,
        onSuccess: () => {
          router.refresh()
        },
      }
    )
    setIsRejecting(false)
  }

  const formatTimeEstimate = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : ""}`
    }
    return `${minutes} minute${minutes > 1 ? "s" : ""}`
  }

  const getStatusColor = (status: TechnicianReportStatusEnum) => {
    switch (status) {
      case TechnicianReportStatusEnum.SUBMITTED:
        return "text-yellow-600"
      case TechnicianReportStatusEnum.APPROVED:
        return "text-green-600"
      case TechnicianReportStatusEnum.REJECTED:
        return "text-red-600"
      case TechnicianReportStatusEnum.IN_PROGRESS:
        return "text-blue-600"
      case TechnicianReportStatusEnum.COMPLETED:
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="w-full cursor-pointer transition-all hover:shadow-lg" onClick={() => setExpanded(!expanded)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Technician Report - <span className={getStatusColor(report.status)}>{report.status}</span>
          </CardTitle>
          {isSubmitted && (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAccept}
                disabled={isAccepting || isRejecting}
                className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <Check className="mr-1 h-4 w-4" />
                {isAccepting ? "Accepting..." : "Accept"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                disabled={isAccepting || isRejecting}
                className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
              >
                <X className="mr-1 h-4 w-4" />
                {isRejecting ? "Rejecting..." : "Reject"}
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
            <p>
              <strong>Repair Order ID:</strong> {report.repairOrderId}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
