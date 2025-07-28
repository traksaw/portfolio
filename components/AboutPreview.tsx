import Link from "next/link"

export function AboutPreview() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-semibold mb-4">A Bit About Me</h2>
      <p className="max-w-2xl mx-auto text-gray-700 text-lg">
        I’m a creative technologist and former Apple Genius turned full stack engineer, driven by a love for storytelling, community, and building tools that matter. With a background in education and performance, I bring empathy and clarity to every project I touch.
      </p>
      <div className="mt-6">
        <Link
          href="/about"
          className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition"
        >
          More About Me
        </Link>
      </div>
    </section>
  )
}