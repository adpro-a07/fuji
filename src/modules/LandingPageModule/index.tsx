import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const LandingPageModule = async () => {
  return (
    <section>
      <div className="mx-10 mt-20 flex flex-col md:flex-row">
        <div className="mt-10 flex w-full flex-col space-y-3 md:mt-15 md:w-3/5 md:p-5">
          <h1 className="w-full text-4xl font-extrabold md:w-4/5 md:text-6xl">PerbaikiinAja</h1>
          <p className="text-muted-foreground w-full text-lg md:w-4/5">
            PerbaikiinAja is your trusted partner for fast, reliable repair services. Whether it’s your phone, laptop,
            or home appliance — request a repair in minutes, track the progress, and get it fixed without hassle.
          </p>
          <div className="mt-3 space-x-3">
            <Button asChild>
              <Link href="/repair-orders">Request a repair order</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">How it works</Link>
            </Button>
          </div>
        </div>
        <div className="hidden w-full md:block md:w-2/5">
          <Image
            src="/assets/images/perbaikiin_aja_logo.png"
            alt="PerbaikiinAja App Preview"
            width={500}
            height={300}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

export default LandingPageModule
