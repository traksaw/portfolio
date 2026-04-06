export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="font-serif text-4xl text-stone-900 sm:text-5xl">
        Get in Touch
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-stone-500">
        Whether you&apos;re interested in working together, have a question, or
        just want to say hi — I&apos;d love to hear from you.
      </p>
      <div className="mt-10">
        <a
          href="mailto:workwithwaskar@gmail.com"
          className="inline-block rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold tracking-wide text-stone-100 transition-all duration-200 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/20"
        >
          Send Me an Email
        </a>
      </div>
    </section>
  )
}
