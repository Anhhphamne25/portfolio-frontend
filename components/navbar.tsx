"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
    { href: "/pambot", label: "PamBot" },
    { href: "/lab", label: "Lab" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex text-[#081e5a] items-center justify-between px-6 py-4 backdrop-blur-md bg-[#fff] border-b border-border">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-xl bg-[#bad6ed] flex items-center justify-center text-[#081e5a] font-bold text-sm transition-transform group-hover:scale-105">
          AP
        </div>
        <span className="font-semibold text-sm text-[#081e5a]">
          Phạm Tuấn Anh
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-secondary hover:text-[#081e5a]",
              pathname === link.href
                ? "bg-[#F5F7FA] text-[#081e5a]"
                : "text-[#7D93C0]",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/pambot"
          className="ml-2 px-4 py-2 rounded-xl bg-[#6e95d0] text-[#ffffff] text-sm font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-sm"
        >
          Try PamBot
        </Link>
        <Link
          href="/lab"
          className="px-4 py-2 rounded-xl bg-[#6e95d0] text-[#ffffff] text-sm font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-sm"
        >
          Try Lab
        </Link>
      </div>
    </header>
  );
}
