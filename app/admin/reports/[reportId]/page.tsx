import ReportDetailPageModule from "@/modules/ReportDetailPageModule"

export default async function Page({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params
  return <ReportDetailPageModule reportId={reportId} />
}
