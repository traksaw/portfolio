import Link from "next/link"

export function Hero() {
  return (
    <section className="py-24 text-center sm:py-32">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
        Software Engineer &middot; Creative Technologist
      </p>
      <h1 className="font-serif text-5xl leading-tight text-stone-900 sm:text-6xl lg:text-7xl">
        Hey, I&apos;m Waskar
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-500 sm:text-xl">
        Passionate about building for community, storytelling, and impact.
        Let&apos;s build something meaningful together.
      </p>
      <div className="mt-10">
        <Link
          href="/projects"
          className="inline-block rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold tracking-wide text-stone-100 transition-all duration-200 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/20"
        >
          See My Work
        </Link>
      </div>
    </section>
  )
}
