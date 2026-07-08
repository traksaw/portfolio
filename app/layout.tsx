/* app/layout.tsx */
import "./globals.css"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  // TODO: update metadataBase once the custom domain is live (see plan §6 — deployment)
  metadataBase: new URL("https://waskarmiguelpaulino.netlify.app"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-sans bg-th-surface text-th-body`}
      >
        <Navbar />
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-12">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
