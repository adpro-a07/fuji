import { AuthContextProvider } from "@/components/contexts/AuthContext"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ui/theme-provider"
import "styles/tailwind.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthContextProvider user={undefined}>
            {children}
            <Toaster></Toaster>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
