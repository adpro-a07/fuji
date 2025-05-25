import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportResponseInterface } from "../interface"

export default function ReportDetailCard({
  report,
  technicianNames = {},
}: {
  report: ReportResponseInterface
  technicianNames?: Record<string, string>
}) {
  const technicianName = technicianNames[report.technicianId] || report.technicianId
  return (
    <Card className="max-w-8xl mx-auto w-full shadow">
      <CardHeader>
        <CardTitle className="text-2xl">Technician Name: {technicianName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xl">
        <div>
          <span className="font-semibold">ID:</span> {report.technicianId}
        </div>
        <div>
          <span className="font-semibold">Diagnosis:</span> {report.diagnosis}
        </div>
        <div>
          <span className="font-semibold">Action Plan:</span> {report.actionPlan}
        </div>
        <div>
          <span className="font-semibold">Estimated Cost:</span> {report.estimatedCost}
        </div>
        <div>
          <span className="font-semibold">Estimated Time (s):</span> {report.estimatedTimeSeconds}
        </div>
        <div>
          <span className="font-semibold">Status:</span> {report.status}
        </div>
        <div>
          <span className="font-semibold">Last Updated:</span> {new Date(report.lastUpdatedAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
