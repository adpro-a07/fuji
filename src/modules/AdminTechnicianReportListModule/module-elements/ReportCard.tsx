import { CheckCircle, FileText, User } from "lucide-react"
import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportResponseInterface } from "../interface"

export default function ReportCard({
  report,
  technicianNames = {},
}: {
  report: ReportResponseInterface
  technicianNames?: Record<string, string>
}) {
  const technicianName = technicianNames[report.technicianId] || report.technicianId

  return (
    <Card className="group cursor-pointer border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <Link href={`/admin/technicians/reports/${report.id}`} passHref>
        <CardHeader className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-blue-100 p-2 transition-colors duration-200 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                  Report #{report.id || "N/A"}
                </CardTitle>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-100 px-1 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle className="mr-1 h-3 w-3" />
                COMPLETED
              </span>
            </div>
          </div>

          <CardDescription className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">Diagnosis:</span> {report.diagnosis}
          </CardDescription>

          <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">{technicianName}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Link>
    </Card>
  )
}
