'use client'

import React, { useState } from "react"
import { TechnicianReport } from "../interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TechnicianReportCard({ report }: { report: TechnicianReport }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <Card
            className="w-full transition-all cursor-pointer hover:shadow-lg"
            onClick={() => setExpanded(!expanded)}
        >
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Technician Report - {report.status}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
                <p><strong>Diagnosis:</strong> {report.diagnosis}</p>
                <p><strong>Action Plan:</strong> {report.actionPlan}</p>

                {expanded && (
                    <>
                        <p><strong>Estimated Cost:</strong> ${report.estimatedCost}</p>
                        <p><strong>Estimated Time:</strong> {report.estimatedTimeSeconds} seconds</p>
                        <div className="pt-3">
                            <Button variant="secondary" className="w-full">Take Action</Button>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
