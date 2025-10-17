"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AnimatedSvgBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: theme === "dark" ? 0.3 : 0.5,
          backgroundImage: "url('/animated-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))"
              : "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.5))",
        }}
      />
    </div>
  )
}
