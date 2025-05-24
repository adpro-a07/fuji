"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TechnicianReport } from "../interface"

export default function TechnicianReportCard({ report }: { report: TechnicianReport }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="w-full cursor-pointer transition-all hover:shadow-lg" onClick={() => setExpanded(!expanded)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Technician Report - {report.status}</CardTitle>
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
              <strong>Estimated Time:</strong> {report.estimatedTimeSeconds} seconds
            </p>
            <div className="pt-3">
              <Button variant="secondary" className="w-full">
                Take Action
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
