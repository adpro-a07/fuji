import { BookCheck, BookKey, BookMarked, BookOpen, BookX } from "lucide-react"
import { RepairOrderWithTechnicianDataInterface } from "@/modules/RepairOrderListModule/interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"
import { Separator } from "@/components/ui/separator"
import DeleteRepairOrderBtn from "../module-elements/DeleteRepairOrderBtn"
import EditRepairOrderModal from "../module-elements/EditRepairOrderModal"

const statusIcons = {
  PENDING_CONFIRMATION: <BookKey className="text-yellow-500" />,
  IN_PROGRESS: <BookOpen className="text-green-500" />,
  COMPLETED: <BookCheck className="text-blue-500" />,
  CANCELLED: <BookX className="text-gray-500" />,
  DEFAULT: <BookMarked className="text-purple-500" />,
}

export default function MainRepairOrderDetailSection({
  repairOrder,
}: {
  repairOrder: RepairOrderWithTechnicianDataInterface
}) {
  const icon = statusIcons[repairOrder.status] ?? statusIcons.DEFAULT
  const { technician, ...repairOrderWithoutTechnician } = repairOrder

  const showActions = repairOrder.status === "PENDING_CONFIRMATION"
  return (
    <Card className="mx-auto mt-4 w-full max-w-4xl p-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          {icon}
          <span>{repairOrder.itemName}</span>
        </CardTitle>
        <p className="text-muted-foreground text-sm">Status: {repairOrder.status}</p>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Item Details */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Item Details</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Condition:</span> {repairOrder.itemCondition}
            </p>
            <p>
              <span className="font-medium">Issue:</span> {repairOrder.issueDescription}
            </p>
            <p>
              <span className="font-medium">Service Date:</span> {repairOrder.desiredServiceDate}
            </p>
            <p>
              <span className="font-medium">Created At:</span> {new Date(repairOrder.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Updated At:</span> {new Date(repairOrder.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Technician Details */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Technician Info</h3>
          {technician ? (
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Name:</span> {technician.identity?.fullName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {technician.identity?.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {technician.identity?.phoneNumber}
              </p>
              <p>
                <span className="font-medium">Address:</span> {technician.profile?.address}
              </p>
              <p>
                <span className="font-medium">Experience:</span> {technician.profile?.workExperience}
              </p>
              <p>
                <span className="font-medium">Total Jobs Done:</span> {technician.profile?.totalJobsDone}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No technician assigned yet.</p>
          )}
        </div>
      </CardContent>
      {showActions && (
        <>
          <Separator className="my-4" />
          <div className="flex justify-end gap-2 px-6 pb-4">
            <EditRepairOrderModal repairOrder={repairOrderWithoutTechnician} />
            <DeleteRepairOrderBtn repairOrderId={repairOrder.id} />
          </div>
        </>
      )}
    </Card>
  )
}
