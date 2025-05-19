import { Noto_Sans_Mono } from "next/font/google"
import { UUID } from "crypto"
import { AuthContextProvider } from "@/components/contexts/AuthContext"
import { User } from "@/components/contexts/AuthContext/interface"
import useUserServer from "@/components/hooks/useUserServer"
import Navbar from "@/components/ui/navbar"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ui/theme-provider"
import "styles/tailwind.css"
import { convertGrpcRoleToUserRole, convertTimestampToString } from "@/components/utils/grpcConverter"

const noto_sans_mono = Noto_Sans_Mono({
  subsets: ["latin"],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const grpcUserData = await useUserServer()

  const user: User | null =
    grpcUserData && grpcUserData.identity && grpcUserData.profile
      ? {
          id: grpcUserData.identity.id as UUID,
          email: grpcUserData.identity.email,
          fullName: grpcUserData.identity.fullName,
          phoneNumber: grpcUserData.identity.phoneNumber,
          role: convertGrpcRoleToUserRole(grpcUserData.identity.role),
          address: grpcUserData.profile.address,
          experience: grpcUserData.profile.workExperience,
          totalJobsDone: grpcUserData.profile.totalJobsDone,
          totalIncome: Number(grpcUserData.profile.totalIncome),
          createdAt: convertTimestampToString(grpcUserData.identity.createdAt!),
          updatedAt: convertTimestampToString(grpcUserData.identity.updatedAt!),
        }
      : null

  return (
    <html lang="en" className={noto_sans_mono.className}>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthContextProvider user={user}>
            <Navbar />
            {children}
            <Toaster></Toaster>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
