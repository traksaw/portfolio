import { ButtonLink } from "./ui/ButtonLink"
import { HeroSceneLoader } from "./HeroSceneLoader"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-center sm:py-32">
      <HeroSceneLoader />

      {/* Text is pointer-events-none so hover/click reach the constellation
          stars sitting behind it; the CTA buttons below re-enable pointer
          events on themselves. */}
      <h1 className="pointer-events-none text-5xl font-bold leading-tight text-th-heading sm:text-6xl lg:text-7xl">
        Waskar Paulino
      </h1>

      <p className="pointer-events-none mt-4 text-base font-medium text-th-muted">
        Creative Technologist &middot; Speaker &middot; DJ
      </p>

      <p className="pointer-events-none mx-auto mt-6 max-w-xl text-lg leading-relaxed text-th-body sm:text-xl">
        I build AI tools and community platforms, teach what I learn along
        the way, and DJ on the weekends.
      </p>

      <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/speaking">See my talks &rarr;</ButtonLink>
        <ButtonLink href="/writing" variant="secondary">
          Read my writing &rarr;
        </ButtonLink>
      </div>
    </section>
  )
}
