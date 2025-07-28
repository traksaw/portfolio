import Link from "next/link"

export function Navbar() {
  return (
    <header className="w-full py-4 px-6 shadow-sm bg-white sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Waskar.dev
        </Link>
        <div className="space-x-6 text-sm sm:text-base">
          <Link href="/projects" className="hover:text-blue-600">Projects</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </nav>
    </header>
  )
}