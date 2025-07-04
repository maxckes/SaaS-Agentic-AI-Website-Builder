"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react"

interface ThemeToggleProps {
  variant?: "button" | "dropdown"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ThemeToggle({ 
  variant = "button", 
  size = "md",
  className 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
        className={className}
        disabled
      >
        <MonitorIcon className="h-4 w-4" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  const getThemeIcon = (currentTheme: string) => {
    switch (currentTheme) {
      case 'light':
        return <SunIcon className="h-4 w-4" />
      case 'dark':
        return <MoonIcon className="h-4 w-4" />
      default:
        return <MonitorIcon className="h-4 w-4" />
    }
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  if (variant === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
            className={className}
          >
            {getThemeIcon(theme || 'system')}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[140px]">
          <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
            <SunIcon className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
            <MoonIcon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
            <MonitorIcon className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      variant="outline"
      size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
      onClick={cycleTheme}
      className={className}
    >
      {getThemeIcon(theme || 'system')}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 