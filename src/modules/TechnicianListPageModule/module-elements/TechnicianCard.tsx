import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { UserData } from "@/proto/generated/id/ac/ui/cs/advprog/kilimanjaro/auth/UserData"

export function TechnicianCard({ technician }: { technician: UserData }) {
  const { identity, profile } = technician

  const formatRupiah = (value: number | string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value))
  }

  return (
    <Card className="w-full max-w-md rounded-2xl border p-4 shadow-lg">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{identity?.fullName?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{identity?.fullName}</h2>
            <p className="text-muted-foreground text-sm">{identity?.email}</p>
          </div>
        </div>

        <div className="space-y-1 text-sm">
          <p>
            <strong>Phone:</strong> {identity?.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {profile?.address}
          </p>
          <p>
            <strong>Experience:</strong> {profile?.workExperience}
          </p>
          <p>
            <strong>Jobs Done:</strong> {profile?.totalJobsDone}
          </p>
          <p>
            <strong>Total Income:</strong> {formatRupiah(profile?.totalIncome?.toString() || 0)}
          </p>
        </div>

        <Badge variant="secondary">Technician</Badge>
      </CardContent>
    </Card>
  )
}
