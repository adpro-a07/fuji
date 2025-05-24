"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { useAuthContext } from "../contexts/AuthContext"
import { post } from "../utils/customFetch/serverFetchClients"
import { logoutAction } from "../utils/logout/actions"
import { UserRole } from "../contexts/AuthContext/interface"
import { handleFormSubmission } from "../utils/toast"

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, setIsAuthenticated, setStoredUser } = useAuthContext()
  const router = useRouter()

  const searchParams = useSearchParams()
  useEffect(() => {
    const refreshParam = searchParams.get("_refresh")

    if (refreshParam) {
      const url = new URL(window.location.href)
      url.searchParams.delete("_refresh")

      window.location.replace(url)
    }
  }, [searchParams])

  const handleLogout: () => void = async () => {
    await handleFormSubmission(
      () =>
        post(`/api/v1/auth/logout`, null, {
          toAuthBackend: true,
          isAuthorized: true,
        }).then(() => logoutAction()),
      {
        loading: "Logging out...",
        success: "Successfully logged out!",
        error: "Failed to logout",
        redirectTo: "/",
        router: router,
        onSuccess: async () => {
          setIsAuthenticated(false)
          setStoredUser(null)
        },
      }
    )
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-10 w-full border-b border-transparent bg-white shadow-md dark:border-white dark:bg-slate-950">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            PerbaikiinAja
          </Link>
          {user && user.role === UserRole.ADMIN && (
            <Link href="/admin" style={{ marginLeft: 32}}>
              <Badge
                variant="outline"
                className="cursor-pointer text-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Admin Dashboard
              </Badge>
            </Link>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden h-full items-center space-x-4 md:flex">
          <ModeToggle />
          {user ? (
            <>
              <span className="text-sm font-medium">
                Hi, {user.fullName}! ({user.role})
              </span>
              <form action={handleLogout}>
                <Button type="submit">Logout</Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mb-2 flex flex-col space-y-2 border-t p-2 md:hidden">
          <div className="flex flex-col items-start space-y-1 mb-2">
            <div className="flex flex-col items-start space-y-1 mb-2">
              <Link href="/" className="text-xl font-bold">
                PerbaikiinAja
              </Link>
              {user && user.role === UserRole.ADMIN && (
                <Link href="/admin" style={{ marginTop: 5 }}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer text-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Admin Dashboard
                  </Badge>
                </Link>
              )}
            </div>
          </div>
          {user ? (
            <>
              <span className="ml-1 text-sm font-medium">
                Hi, {user.fullName}! ({user.role})
              </span>
              <form action={handleLogout}>
                <Button type="submit">Logout</Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
          <div className="mt-1 ml-1">
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}

export default function Navbar() {
  return (
    <Suspense>
      <NavbarContent />
    </Suspense>
  )
}
