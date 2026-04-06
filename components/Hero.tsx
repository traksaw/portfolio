import { ButtonLink } from "./ui/ButtonLink"

export function Hero() {
  return (
    <section className="py-24 text-center sm:py-32">
      <h1 className="text-5xl font-bold leading-tight text-th-heading sm:text-6xl lg:text-7xl">
        Waskar Paulino
      </h1>

      <p className="mt-4 text-base font-medium text-th-muted">
        CTO &amp; Co-Founder,{" "}
        <a
          href="https://ideatebetter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-th-heading transition-colors hover:text-th-accent"
        >
          Ideate
        </a>{" "}
        &middot; Speaker &middot; DJ
      </p>

      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-th-body sm:text-xl">
        I build AI tools for creative teams, write about the messy middle of
        founding a startup, and DJ on the weekends.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/speaking">See my talks &rarr;</ButtonLink>
        <ButtonLink href="/writing" variant="secondary">
          Read my writing &rarr;
        </ButtonLink>
      </div>
    </section>
  )
}
