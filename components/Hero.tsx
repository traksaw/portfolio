import { ButtonLink } from "./ui/ButtonLink"

export function Hero() {
  return (
    <section className="py-20 text-center sm:py-28">
      <h1
        className="rise-in text-5xl font-bold leading-tight text-th-heading sm:text-6xl lg:text-7xl"
        style={{ animationDelay: "0ms" }}
      >
        Waskar Paulino
      </h1>

      <p
        className="rise-in mt-4 text-base font-medium text-th-muted"
        style={{ animationDelay: "100ms" }}
      >
        Creative Technologist &middot; Speaker &middot; DJ
      </p>

      <p
        className="rise-in mx-auto mt-6 max-w-xl text-lg leading-relaxed text-th-body sm:text-xl"
        style={{ animationDelay: "200ms" }}
      >
        I build AI tools and community platforms, teach what I learn along
        the way, and DJ on the weekends.
      </p>

      <div
        className="rise-in mt-10 flex flex-wrap items-center justify-center gap-4"
        style={{ animationDelay: "300ms" }}
      >
        <ButtonLink href="/projects">See my projects &rarr;</ButtonLink>
        <ButtonLink href="/speaking" variant="secondary">
          See my talks &rarr;
        </ButtonLink>
      </div>
    </section>
  )
}
