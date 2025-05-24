import Link from "next/link"
import React from "react"
import { Button } from "@/components/ui/button" // Assuming you have a Button component
import { CouponResponseInterface } from "../interface"
import CouponCard from "../module-elements/CouponCard"

export default function MainManageCouponSection({ coupons }: { coupons: CouponResponseInterface[] }) {
  return (
    <div className="m-2 rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Manage Coupons</h2>
        <Button asChild>
          <Link href="/admin/coupons/create">+ Add Coupon</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {coupons.length > 0 ? (
          coupons.map((coupon) => <CouponCard key={coupon.id} coupon={coupon} />)
        ) : (
          <div className="col-span-4 py-10 text-center">
            <p className="text-gray-500">No coupons found</p>
          </div>
        )}
      </div>
    </div>
  )
}
