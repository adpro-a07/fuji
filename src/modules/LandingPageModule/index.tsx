// src/modules/LandingPageModule/index.tsx
import Image from "next/image"
import AuthActionButtons from "./components/AuthActionButtons"

const LandingPageModule = () => {
  return (
    <section>
      <div className="mx-10 mt-20 flex flex-col md:flex-row">
        <div className="mt-10 flex w-full flex-col space-y-3 md:mt-15 md:w-3/5 md:p-5">
          <h1 className="w-full text-4xl font-extrabold md:w-4/5 md:text-6xl">PerbaikiinAja</h1>
          <p className="text-muted-foreground w-full text-lg md:w-4/5">
            PerbaikiinAja is your trusted partner for fast, reliable repair services. Whether it's your phone, laptop,
            or home appliance — request a repair in minutes, track the progress, and get it fixed without hassle.
          </p>
          <p>Adpro A07 - Presentasi</p>
          <AuthActionButtons />
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
