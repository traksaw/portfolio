/* app/layout.tsx */
import "./globals.css"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { PostHogProvider } from "@/components/PostHogProvider"
import { SITE_URL } from "@/lib/site"

// Self-hosted so the build never needs Google Fonts to be reachable.
// One variable file (Latin subset) covers weights 400–700.
// Source: Google Fonts. License: app/fonts/DMSans-OFL.txt (SIL OFL 1.1).
const dmSans = localFont({
  src: "./fonts/DMSans-latin-wght.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Waskar Paulino | Software Engineer, Speaker, DJ",
    template: "%s | Waskar Paulino",
  },
  description:
    "Creative technologist building AI tools and community platforms, teaching what I learn, and DJing on the weekends.",
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-sans bg-th-surface text-th-body`}
      >
        <PostHogProvider>
          <Navbar />
          <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-12">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  )
}
