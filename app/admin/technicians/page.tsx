import React from "react"
import TechnicianListPageModule from "@/modules/TechnicianListPageModule"

export default async function page(props: {
  searchParams?: Promise<{
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1

  return <TechnicianListPageModule currentPage={currentPage} isVerbose={true} />
}
