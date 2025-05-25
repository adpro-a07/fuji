import React from "react"
import TechnicianRatingsPageModule from "@/modules/TechnicianRatingsPageModule"

type PageProps = {
  params: { technicianId: string }
  searchParams?: { page?: string; search?: string }
}

export default async function Page({ params, searchParams }: PageProps) {
  const { technicianId } = await params
  const { page = "1", search: searchQuery = "" } = (await searchParams) ?? {}
  const currentPage = Number(page)

  return <TechnicianRatingsPageModule technicianId={technicianId} currentPage={currentPage} searchQuery={searchQuery} />
}
