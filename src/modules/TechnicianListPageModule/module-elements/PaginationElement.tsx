"use client"

import { usePathname, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationElement({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page") || 1)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="mt-6 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(currentPage > 1 ? currentPage - 1 : 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {currentPage > 2 && (
            <>
              <PaginationItem>
                <PaginationLink href={createPageUrl(1)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((n) => Math.abs(currentPage - n) <= 1)
            .map((n) => (
              <PaginationItem key={n}>
                <PaginationLink href={createPageUrl(n)} isActive={n === currentPage}>
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}

          {currentPage < totalPages - 1 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={createPageUrl(totalPages)}>{totalPages}</PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href={createPageUrl(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
