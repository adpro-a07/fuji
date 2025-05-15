"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(mediaQuery.matches ? "dark" : "light")

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const SWITCH = () => {
    switch (theme) {
      case "light":
        setTheme("dark")
        break
      case "dark":
        setTheme("light")
        break
      case "system":
        setTheme(systemTheme === "light" ? "dark" : "light")
        break
      default:
        break
    }
  }

  const TOGGLE_THEME = () => {
    //@ts-expect-error: idk this is for animation
    if (!document.startViewTransition) SWITCH()

    //@ts-expect-error: this for animation too
    document.startViewTransition(SWITCH)
  }

  return (
    <Button variant="outline" size="icon" onClick={TOGGLE_THEME}>
      <Sun className="size-3 scale-100 rotate-0 transition-all md:size-4 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-3 scale-0 rotate-90 transition-all md:size-4 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
