"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/speaking", label: "Speaking" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300 ease-out
        ${scrolled
          ? "bg-stone-950/90 backdrop-blur-xl shadow-lg shadow-stone-950/10"
          : "bg-stone-950"
        }
      `}
    >
      {/* Accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0" />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group relative text-xl font-semibold tracking-tight text-stone-100 transition-colors hover:text-amber-300 sm:text-2xl"
        >
          <span className="relative">
            Waskar Paulino
            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-amber-400/60 transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative px-3 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200
                  ${isActive
                    ? "text-amber-300"
                    : "text-stone-400 hover:text-stone-100"
                  }
                `}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-amber-400/50" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className="flex w-5 flex-col items-end gap-[5px]">
            <span
              className={`block h-[1.5px] bg-stone-200 transition-all duration-300 ease-out ${
                menuOpen ? "w-5 translate-y-[6.5px] rotate-45" : "w-5"
              }`}
            />
            <span
              className={`block h-[1.5px] w-3.5 bg-stone-200 transition-all duration-300 ease-out ${
                menuOpen ? "scale-x-0 opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-stone-200 transition-all duration-300 ease-out ${
                menuOpen ? "w-5 -translate-y-[6.5px] -rotate-45" : "w-4"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-stone-950/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed right-0 top-0 z-40 flex h-full w-72 flex-col bg-stone-950 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 pt-24">
          {navLinks.map(({ href, label }, i) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  group flex items-center gap-3 rounded-lg px-3 py-3 text-lg font-medium tracking-wide transition-all duration-200
                  ${isActive
                    ? "bg-stone-900/80 text-amber-300"
                    : "text-stone-400 hover:bg-stone-900/50 hover:text-stone-100"
                  }
                `}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
              >
                <span
                  className={`h-1 w-1 rounded-full transition-colors ${
                    isActive ? "bg-amber-400" : "bg-stone-700 group-hover:bg-stone-500"
                  }`}
                />
                {label}
              </Link>
            )
          })}
        </div>

        {/* Mobile menu footer accent */}
        <div className="mt-auto px-6 pb-8">
          <div className="h-[1px] w-full bg-gradient-to-r from-amber-500/0 via-amber-400/30 to-amber-500/0" />
          <p className="mt-4 text-sm font-semibold tracking-wide text-stone-600">
            Waskar Paulino
          </p>
        </div>
      </div>
    </header>
  )
}
