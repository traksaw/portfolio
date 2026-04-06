import Link from "next/link"

export function AboutPreview() {
  return (
    <section className="border-t border-stone-200 py-20 text-center">
      <h2 className="font-serif text-3xl text-stone-900 sm:text-4xl">
        A Bit About Me
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-500">
        I&apos;m a creative technologist and former Apple Genius turned full stack
        engineer, driven by a love for storytelling, community, and building
        tools that matter. With a background in education and performance, I
        bring empathy and clarity to every project I touch.
      </p>
      <div className="mt-8">
        <Link
          href="/about"
          className="inline-block rounded-full border border-stone-300 px-7 py-2.5 text-sm font-medium text-stone-700 transition-all duration-200 hover:border-stone-900 hover:text-stone-900"
        >
          More About Me
        </Link>
      </div>
    </section>
  )
}
