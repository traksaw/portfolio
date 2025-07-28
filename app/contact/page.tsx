export default function ContactPage() {
  return (
    <section className="max-w-2xl mx-auto py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">Get in Touch</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Whether you&apos;re interested in working together, have a question, or just want to say hi — I&apos;d love to hear from you.
      </p>
      <div className="text-center">
        <a
          href="mailto:workwithwaskar@gmail.com"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
        >
          Send Me an Email
        </a>
      </div>
    </section>
  )
}