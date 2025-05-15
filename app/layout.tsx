import { AuthContextProvider } from "@/components/contexts/AuthContext"
import Navbar from "@/components/ui/navbar"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ui/theme-provider"
import "styles/tailwind.css"
import { Noto_Sans_Mono } from "next/font/google"

const noto_sans_mono = Noto_Sans_Mono({
  subsets: ["latin"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={noto_sans_mono.className}>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthContextProvider user={undefined}>
            <Navbar />
            {children}
            <Toaster></Toaster>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
