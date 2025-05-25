import { BookCheck, BookKey, BookMarked, BookOpen, BookX, Tag, Users } from "lucide-react"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CouponResponseInterface } from "@/modules/ManageCouponsPageModule/interface"
import { RepairOrderWithTechnicianDataInterface } from "@/modules/RepairOrderListModule/interface"
import DeleteRepairOrderBtn from "../module-elements/DeleteRepairOrderBtn"
import EditRepairOrderModal from "../module-elements/EditRepairOrderModal"

const statusIcons = {
  PENDING_CONFIRMATION: <BookKey className="text-yellow-500" />,
  IN_PROGRESS: <BookOpen className="text-green-500" />,
  COMPLETED: <BookCheck className="text-blue-500" />,
  CANCELLED: <BookX className="text-gray-500" />,
  DEFAULT: <BookMarked className="text-purple-500" />,
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING_CONFIRMATION":
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
    case "IN_PROGRESS":
      return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
    case "COMPLETED":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    case "CANCELLED":
      return "bg-muted text-muted-foreground border-border"
    default:
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
  }
}

export default function MainRepairOrderDetailSection({
  repairOrder,
  coupon,
}: {
  repairOrder: RepairOrderWithTechnicianDataInterface
  coupon: CouponResponseInterface | null
}) {
  const icon = statusIcons[repairOrder.status] ?? statusIcons.DEFAULT
  const { technician, ...repairOrderWithoutTechnician } = repairOrder
  const showActions = repairOrder.status === "PENDING_CONFIRMATION"

  return (
    <div className="mx-auto mt-4 w-full max-w-6xl space-y-4">
      {/* Main Repair Order Card */}
      <Card className="p-6">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon}
              <div>
                <CardTitle className="text-2xl font-bold">{repairOrder.itemName}</CardTitle>
                <Badge className={`mt-2 ${getStatusColor(repairOrder.status)}`}>
                  {repairOrder.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Item Details */}
          <Card className="border-l-primary border-l-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="text-primary h-5 w-5" />
                Item Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Condition:</span>
                  <span className="font-semibold">{repairOrder.itemCondition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Service Date:</span>
                  <span className="font-semibold">{repairOrder.desiredServiceDate}</span>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground mb-1 font-medium">Issue Description:</p>
                <p className="bg-muted rounded border p-2 text-sm">{repairOrder.issueDescription}</p>
              </div>
              <Separator />
              <div className="text-muted-foreground space-y-1 text-xs">
                <p>Created: {new Date(repairOrder.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(repairOrder.updatedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Technician Details */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-green-500" />
                Technician Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              {technician ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Name:</span>
                      <span className="font-semibold">{technician.identity?.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Email:</span>
                      <span className="text-sm">{technician.identity?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Phone:</span>
                      <span className="text-sm">{technician.identity?.phoneNumber}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div>
                      <p className="text-muted-foreground mb-1 font-medium">Address:</p>
                      <p className="bg-muted rounded border p-2 text-sm">{technician.profile?.address}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Experience:</span>
                      <span className="text-sm font-semibold">{technician.profile?.workExperience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Jobs Done:</span>
                      <Badge variant="secondary">{technician.profile?.totalJobsDone}</Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground flex h-32 items-center justify-center">
                  <div className="text-center">
                    <Users className="mx-auto mb-2 h-8 w-8 opacity-50" />
                    <p className="text-sm">No technician assigned yet</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Coupon Details */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tag className="h-5 w-5 text-purple-500" />
                Coupon Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {coupon ? (
                <div className="space-y-3">
                  <div className="text-center">
                    <Badge className="border-purple-500/20 bg-purple-500/10 px-3 py-1 text-lg text-purple-600 dark:text-purple-400">
                      {coupon.code}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Discount:</span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        ${(coupon.discountAmount / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Usage:</span>
                      <span className="text-sm">
                        {coupon.usageCount} / {coupon.maxUsage}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Valid Until:</span>
                      <span className="text-sm font-semibold">{new Date(coupon.validUntil).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Status:</span>
                    <Badge
                      className={
                        new Date(coupon.validUntil) > new Date() && coupon.usageCount < coupon.maxUsage
                          ? "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {new Date(coupon.validUntil) > new Date() && coupon.usageCount < coupon.maxUsage
                        ? "Active"
                        : "Expired/Used Up"}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground space-y-1 text-xs">
                    <p>Created: {new Date(coupon.createdAt).toLocaleString()}</p>
                    <p>Updated: {new Date(coupon.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground flex h-32 items-center justify-center">
                  <div className="text-center">
                    <Tag className="mx-auto mb-2 h-8 w-8 opacity-50" />
                    <p className="text-sm">No coupon applied</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>

        {showActions && (
          <>
            <Separator className="my-6" />
            <div className="flex justify-end gap-3 px-6 pb-2">
              <EditRepairOrderModal repairOrder={repairOrderWithoutTechnician} coupon={coupon} />
              <DeleteRepairOrderBtn repairOrderId={repairOrder.id} />
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
