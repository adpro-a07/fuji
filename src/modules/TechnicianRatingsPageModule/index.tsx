"use server"

import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import { AuthClient } from "@/lib/grpc"
import {
  RatingResponseInterface,
  RatingWithTechnicianDataInterface,
} from "./interface"
import RatingsSection from "./sections/RatingsSection"

export default async function TechnicianRatingsPageModule({
  technicianId,
  currentPage,
                                                          }: {
  technicianId: string
  currentPage: number
  searchQuery?: string
}) {
  try {
    const response = await get<RatingResponseInterface[]>(`/api/v1/rating/technicians/${technicianId}/ratings`, {
      isAuthorized: true,
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to fetch ratings")
    }

    const ratingsData: RatingResponseInterface[] = response.data ?? []

    if (ratingsData.length === 0) {
      return (
        <section className="pt-16">
          <RatingsSection ratings={[]} totalPages={1} currentPage={currentPage} />
        </section>
      )
    }

    const technicianIdsRequest: Array<{ type: "userId" | "email"; value: string }> = ratingsData.map((rating) => ({
      type: "userId" as const,
      value: rating.technicianId as string,
    }))

    const authClient = AuthClient.getInstance()
    const technicianLookupResponse = await authClient.batchLookupUsers(technicianIdsRequest, false)
    if (technicianLookupResponse.error) {
      throw new Error(technicianLookupResponse.error.message)
    }

    const techniciansMap = new Map(
      technicianLookupResponse.data?.results?.map((technician) => [
        technician.userData?.identity?.id,
        JSON.parse(JSON.stringify(technician.userData)), // ✅ convert to plain object
      ])
    )

    const userIdsRequest: Array<{ type: "userId" | "email"; value: string }> = ratingsData.map((rating) => ({
      type: "userId" as const,
      value: rating.userId as string,
    }))

    const userLookupResponse = await authClient.batchLookupUsers(userIdsRequest, false)
    if (userLookupResponse.error) {
      throw new Error(userLookupResponse.error.message)
    }

    const usersMap = new Map(
      userLookupResponse.data?.results?.map((user) => [
        user.userData?.identity?.id,
        JSON.parse(JSON.stringify(user.userData)),
      ])
    )

    const ratings: RatingWithTechnicianDataInterface[] = ratingsData.map((rating) => ({
      ...rating,
      updatedAt: rating.updatedAt.toString(),
      technician: techniciansMap.get(rating.technicianId)!,
      user: usersMap.get(rating.userId)!,
    }))

    return (
      <section className="px-6 pt-20">
        <div className="mb-6 flex flex-col items-center text-center">
          <a href="/technicians" className="mb-2 self-start text-sm text-blue-600 hover:underline">
            ← Back to Technicians
          </a>
          <h1 className="text-2xl font-bold">{techniciansMap.get(technicianId)?.identity?.fullName}'s Ratings</h1>
        </div>

        <RatingsSection ratings={ratings} totalPages={1} currentPage={currentPage} />
      </section>
    )
  } catch (error: any) {
    const errorMessage = error.message || "Gagal mengambil data rating."

    return (
      <section className="px-6 pt-20 text-center">
        <h1 className="mb-4 text-xl font-bold text-red-600">Terjadi kesalahan</h1>
        <p className="text-muted-foreground mb-4">{errorMessage}</p>
        <a href="/technicians" className="text-sm text-blue-600 hover:underline">
          ← Kembali ke halaman teknisi
        </a>
      </section>
    )
  }
}