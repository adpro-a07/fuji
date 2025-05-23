import { redirect } from "next/navigation"
import React from "react"
import { get } from "@/components/utils/customFetch/serverFetchClients"
import MainRepairOrderListForTechnicianSection from "./sections/MainRepairOrderListForTechnicianSection"
import {RepairOrderForTechnician, RepairOrderListForTechnicianApiResponse} from "./interface"

export default async function RepairOrderListForTechnician() {
    try {
        const response = await get<RepairOrderListForTechnicianApiResponse>(
            "/api/v1/technician-reports/incoming-repair-orders",
            { isAuthorized: true }
        )

        if (!response?.success || !Array.isArray(response.data)) throw new Error(response?.message ?? "Failed to fetch")

        return <MainRepairOrderListForTechnicianSection repairOrders={response.data as RepairOrderForTechnician[]} />
    } catch (error) {
        console.log(error)
        redirect("/")
    }
}