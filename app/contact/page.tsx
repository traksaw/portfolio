export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="font-serif text-4xl text-th-heading sm:text-5xl">
        Get in Touch
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-th-body">
        Whether you&apos;re interested in working together, have a question, or
        just want to say hi — I&apos;d love to hear from you.
      </p>
      <div className="mt-10">
        <a
          href="mailto:workwithwaskar@gmail.com"
          className="inline-block rounded-full bg-th-btn px-8 py-3.5 text-sm font-semibold tracking-wide text-th-btn-text transition-all duration-200 hover:bg-th-btn-hover hover:shadow-lg hover:shadow-th-shadow"
        >
          Send Me an Email
        </a>
      </div>
    </section>
  )
}
