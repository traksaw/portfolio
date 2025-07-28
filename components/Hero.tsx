export function Hero() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Hey, I&apos;m Waskar 👋🏾</h1>
      <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-600">
        I&apos;m a software engineer and creative technologist passionate about building for community, storytelling, and impact. Let&apos;s build something meaningful together.
      </p>
      <div className="mt-6">
        <a
          href="/projects"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
        >
          See My Work
        </a>
      </div>
    </section>
  )
}