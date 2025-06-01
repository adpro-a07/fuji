"use client"

import Link from "next/link"
import { useAuthContext } from "@/components/contexts/AuthContext"
import { UserRole } from "@/components/contexts/AuthContext/interface"
import { Button } from "@/components/ui/button"

export default function AuthActionButtons() {
  const { user } = useAuthContext()

  return (
    <div className="mt-3 space-y-3">
      <div className="space-x-3">
        <Button asChild>
          <Link href="/repair-orders">Request a repair order</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/technicians">View our technicians</Link>
        </Button>
      </div>

      {user && user.role === UserRole.TECHNICIAN && (
        <div className="space-y-2">
          <div className="space-x-3">
            <Button variant="secondary" asChild>
              <Link href="/technician-report/technician-repair-orders">View Incoming Repair Orders</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/technician-report/technician-report-list">My Technician Reports</Link>
            </Button>
          </div>
          <div className="text-muted-foreground text-sm">
            <p>• View and manage repair orders assigned to you</p>
            <p>• Access your technician reports and work history</p>
          </div>
        </div>
      )}

      {user && user.role === UserRole.CUSTOMER && (
        <div className="space-y-2">
          <div>
            <Button variant="secondary" asChild>
              <Link href="/technician-report/customer-technician-reports">Track My Progress</Link>
            </Button>
          </div>
          <div className="text-muted-foreground text-sm">
            <p>• Monitor the progress of your repair orders in real-time</p>
          </div>
        </div>
      )}
    </div>
  )
}
