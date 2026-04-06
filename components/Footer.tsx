import Link from "next/link"

const socialLinks = [
  {
    href: "https://github.com/traksaw",
    label: "GitHub",
    icon: (
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    ),
  },
  {
    href: "https://www.linkedin.com/in/waskar-m-paulino/",
    label: "LinkedIn",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    href: "https://substack.com/@raksaw",
    label: "Substack",
    icon: (
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    ),
  },
  {
    href: "https://medium.com/@waskar.paulino",
    label: "Medium",
    icon: (
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.86 0-3.38-2.88-3.38-6.42s1.52-6.42 3.38-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    ),
  },
  {
    href: "https://x.com/r_ksaw",
    label: "X",
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  {
    href: "https://www.instagram.com/traksaw/",
    label: "Instagram",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    href: "https://bsky.app/profile/traksaw.bsky.social",
    label: "Bluesky",
    icon: (
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.593 3.494 6.216 3.065-4.659.79-6.648 3.39-3.744 6.827 3.31 3.921 5.903.81 6.904-2.238.16-.49.25-.79.25-.79s.09.3.25.79c1.001 3.048 3.594 6.159 6.904 2.238 2.904-3.437.915-6.037-3.744-6.827 2.623.429 5.431-.438 6.216-3.065C20.622 9.418 21 4.458 21 3.768c0-.689-.139-1.861-.902-2.203-.659-.3-1.664-.62-4.3 1.24C13.046 4.747 10.087 8.686 9 10.8h3z" />
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="h-[1px] w-full bg-gradient-to-r from-amber-500/0 via-amber-400/30 to-amber-500/0" />

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        {/* Top: Brand + CTA */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500">
            Don&rsquo;t just build tools. Build something you&rsquo;d want to play with.
          </p>

          <Link
            href="/contact"
            className="inline-block shrink-0 rounded-full border border-amber-400/30 px-5 py-2 text-sm font-semibold tracking-wide text-amber-300 transition-all duration-200 hover:border-amber-400/60 hover:bg-amber-400/10"
          >
            Book me to speak
          </Link>
        </div>

        {/* Divider */}
        <div className="my-8 h-[1px] w-full bg-stone-800" />

        {/* Bottom: Icons + Copyright */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-5">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative text-stone-600 transition-all duration-200 hover:text-amber-300 hover:-translate-y-0.5"
              >
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {icon}
                </svg>
              </a>
            ))}
          </div>

          <p className="text-xs text-stone-700">
            &copy; {new Date().getFullYear()} Waskar Miguel Paulino
          </p>
        </div>
      </div>
    </footer>
  )
}
