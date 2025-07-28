/* app/layout.tsx */
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export const metadata = {
  title: "Waskar Miguel Paulino | Portfolio",
  description: "Software Engineer Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-12">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
