import { ButtonLink } from "./ui/ButtonLink"

export function Hero() {
  return (
    <section className="py-20 text-center sm:py-28">
      <h1 className="text-5xl font-bold leading-tight text-th-heading sm:text-6xl lg:text-7xl">
        Waskar Paulino
      </h1>

      <p className="mt-4 text-base font-medium text-th-muted">
        Creative Technologist &middot; Speaker &middot; DJ
      </p>

      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-th-body sm:text-xl">
        I build AI tools and community platforms, teach what I learn along
        the way, and DJ on the weekends.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/projects">See my projects &rarr;</ButtonLink>
        <ButtonLink href="/speaking" variant="secondary">
          See my talks &rarr;
        </ButtonLink>
      </div>
    </section>
  )
}
