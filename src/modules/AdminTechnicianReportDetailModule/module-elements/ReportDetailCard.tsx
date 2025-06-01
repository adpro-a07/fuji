import { Calendar, CheckCircle, ClipboardList, Clock, DollarSign, Hash, Stethoscope, User } from "lucide-react"
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

  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num || 0)
  }

  const formatTime = (seconds: number | string) => {
    const totalSeconds = typeof seconds === "string" ? parseFloat(seconds) : seconds
    if (!totalSeconds) return "0 seconds"

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const remainingSeconds = totalSeconds % 60

    const parts = []
    if (hours > 0) parts.push(`${hours}h`)
    if (minutes > 0) parts.push(`${minutes}m`)
    if (remainingSeconds > 0) parts.push(`${remainingSeconds}s`)

    return parts.join(" ") || "0 seconds"
  }

  const detailItems = [
    {
      icon: Hash,
      label: "Report ID",
      value: report.id || "N/A",
      className: "font-mono text-sm",
    },
    {
      icon: User,
      label: "Technician ID",
      value: report.technicianId,
      className: "font-mono text-sm",
    },
    {
      icon: Stethoscope,
      label: "Diagnosis",
      value: report.diagnosis,
      className: "leading-relaxed",
    },
    {
      icon: ClipboardList,
      label: "Action Plan",
      value: report.actionPlan || "No action plan specified",
      className: "leading-relaxed",
    },
    {
      icon: DollarSign,
      label: "Estimated Cost",
      value: formatCurrency(report.estimatedCost || 0),
      className: "font-semibold text-green-600 dark:text-green-400",
    },
    {
      icon: Clock,
      label: "Estimated Time",
      value: formatTime(report.estimatedTimeSeconds || 0),
      className: "font-medium",
    },
    {
      icon: Calendar,
      label: "Last Updated",
      value: new Date(report.lastUpdatedAt).toLocaleString(),
      className: "text-sm",
    },
  ]

  return (
    <Card className="w-full border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="border-b border-gray-200 pb-6 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900 dark:text-white">{technicianName}</CardTitle>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Technician Report</p>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="mr-1 h-3 w-3" />
            COMPLETED
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid gap-6">
          {detailItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
                  <IconComponent className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <dt className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">{item.label}</dt>
                  <dd className={`text-gray-900 dark:text-white ${item.className}`}>{item.value}</dd>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
