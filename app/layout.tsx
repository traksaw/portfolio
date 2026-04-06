/* app/layout.tsx */
import "./globals.css"
import { DM_Sans, Instrument_Serif } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
})

export const metadata = {
  title: "Waskar Miguel Paulino | Portfolio",
  description: "Software Engineer Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} font-sans bg-th-surface text-th-body`}
      >
        <Navbar />
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-12">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
