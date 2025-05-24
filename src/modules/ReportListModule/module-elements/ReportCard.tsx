import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportResponseInterface } from "../interface"

export default function ReportCard({ report }: { report: ReportResponseInterface }) {
  return (
    <Link href={`/admin/reports/${report.id}`} className="block">
      <Card className="transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-lg">📄</span>
              <div>
                <p className="text-lg font-semibold">Diagnosis: {report.diagnosis}</p>
              </div>
            </div>
          </CardTitle>
          <CardDescription>Technician ID: {report.technicianId}</CardDescription>
          <CardDescription>Status: {report.status}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
