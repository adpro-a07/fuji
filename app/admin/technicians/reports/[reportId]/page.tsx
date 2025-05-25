import ReportDetailPageModule from "src/modules/TechnicianReportDetailPageModule"

export default async function Page({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params
  return <ReportDetailPageModule reportId={reportId} />
}
