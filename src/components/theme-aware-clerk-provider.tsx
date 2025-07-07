"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ThemeAwareClerkProviderProps {
  children: React.ReactNode
}

export function ThemeAwareClerkProvider({ children }: ThemeAwareClerkProviderProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use resolvedTheme to get the actual theme when using 'system'
  const isDark = mounted ? resolvedTheme === 'dark' : false

  return (
    <ClerkProvider 
      appearance={{
        baseTheme: isDark ? dark : undefined,
        elements: {
          // Ensure the components blend well with your design system
          card: "shadow-none border",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          socialButtonsBlockButtonText: "text-foreground",
          formFieldInput: "border border-input bg-background text-foreground",
          formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
          footerActionText: "text-muted-foreground",
          footerActionLink: "text-primary hover:text-primary/80"
        }
      }}
    >
      {children}
    </ClerkProvider>
  )
} 