/* ──────────────────────────────────────────────────────────
 * ProcessStrip
 *
 * "Show your process" — real evidence of building live and in
 * public, not just finished project write-ups. Two cards:
 * built live on a broadcast, and performed live at a real event.
 * Visual pattern matches LatestStrip's Card (border-t accent,
 * hover-lift, uppercase tracked kicker).
 * ────────────────────────────────────────────────────────── */

import Image from "next/image"

function ProcessCard({
  kicker,
  title,
  description,
  imageSrc,
  imageAlt,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  unoptimized,
}: {
  kicker: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
  unoptimized?: boolean
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-th-line border-t-[3px] border-t-th-accent bg-th-surface-card shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl">
      <div className="relative aspect-video">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          unoptimized={unoptimized}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-th-muted">
          {kicker}
        </span>
        <h3 className="mt-3 text-lg font-bold text-th-heading">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-th-body">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-th-accent"
          >
            {primaryLabel} &rarr;
          </a>
          {secondaryHref && secondaryLabel && (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-th-heading underline decoration-th-line-hover underline-offset-4 transition-colors hover:decoration-th-accent"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function ProcessStrip() {
  return (
    <section className="py-16">
      <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-th-accent">
        Built in Public
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <ProcessCard
          kicker="Live Build"
          title="Built live on broadcast"
          description="Three AI personalities debating checkout decisions, built in 4 hours with Victor Jackson for CodeTV's Web Dev Challenge S2.E12, sponsored by OpenRouter."
          imageSrc="/projects/shopping-debate/debate-demo.jpg"
          imageAlt="Shopping Debate demo shown live on the CodeTV Web Dev Challenge broadcast"
          primaryHref="https://youtu.be/BOCU-seUXQ8?t=1840"
          primaryLabel="Watch the demo"
          secondaryHref="https://github.com/philaconvalley/shoppingDebateChromeExtension"
          secondaryLabel="GitHub"
        />
        <ProcessCard
          kicker="Live Set"
          title="Performed live at Indy Hall"
          description="A real-time, audio-reactive visual system driving spectrum bars, particle fields, and mandalas off a Pioneer DDJ-REV1 in front of an audience in Philadelphia."
          imageSrc="/projects/dj-visualizer/demo.gif"
          imageAlt="DJ Visualizer galaxy mode reacting live to audio"
          primaryHref="https://github.com/philaconvalley/djVisualizer"
          primaryLabel="View on GitHub"
          unoptimized
        />
      </div>
    </section>
  )
}
