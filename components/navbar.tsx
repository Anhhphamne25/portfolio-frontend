"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/lab", label: "Systems" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-foreground font-bold text-sm transition-transform group-hover:scale-105">
          AC
        </div>
        <span className="font-semibold text-foreground text-sm">Alex Chen</span>
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-secondary hover:text-foreground",
              pathname === link.href
                ? "bg-secondary text-foreground"
                : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/lab"
        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-sm"
      >
        Try Systems
      </Link>
    </header>
  )
}
