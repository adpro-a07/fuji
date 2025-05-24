import React from "react"
import CreateTechnicianReportForm from "../module-elements/CreateTechnicianReportForm"

interface MainCreateTechnicianReportSectionProps {
    repairOrderId: string
}

export default function MainCreateTechnicianReportSection({
                                                              repairOrderId
                                                          }: MainCreateTechnicianReportSectionProps) {
    return (
        <div className="m-2 rounded-xl p-5">
            <CreateTechnicianReportForm
                repairOrderId={repairOrderId}
            />
        </div>
    )
}