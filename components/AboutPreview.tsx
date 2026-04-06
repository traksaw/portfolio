import Link from "next/link"

export function AboutPreview() {
  return (
    <section className="border-t border-th-line py-20 text-center">
      <h2 className="font-serif text-3xl text-th-heading sm:text-4xl">
        A Bit About Me
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-th-body">
        I&apos;m a creative technologist and former Apple Genius turned full stack
        engineer, driven by a love for storytelling, community, and building
        tools that matter. With a background in education and performance, I
        bring empathy and clarity to every project I touch.
      </p>
      <div className="mt-8">
        <Link
          href="/about"
          className="inline-block rounded-full border border-th-line-hover px-7 py-2.5 text-sm font-medium text-th-muted transition-all duration-200 hover:border-th-heading hover:text-th-heading"
        >
          More About Me
        </Link>
      </div>
    </section>
  )
}
