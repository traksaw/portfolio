import type { Metadata } from "next"

import { ButtonLink } from "@/components/ui/ButtonLink"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Waskar Paulino for speaking inquiries, collaborations, or just to say hi.",
}

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
        <ButtonLink href="mailto:workwithwaskar@gmail.com" external>
          Send Me an Email
        </ButtonLink>
      </div>
    </section>
  )
}
