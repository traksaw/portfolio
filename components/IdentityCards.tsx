import { identityLanes } from "@/lib/data"
import { ButtonLink } from "./ui/ButtonLink"

export function IdentityCards() {
  return (
    <section className="pb-20 pt-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {identityLanes.map((lane, i) => (
          <article
            key={lane.label}
            className="identity-card group flex flex-col rounded-2xl border border-th-line border-t-2 border-t-th-accent bg-th-surface-card p-8 shadow-lg shadow-th-shadow transition-all duration-300 hover:-translate-y-1 hover:border-th-line-hover hover:shadow-xl"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* ── Lane label ── */}
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-th-accent">
              {lane.label}
            </span>

            {/* ── Body copy ── */}
            <p className="mt-4 flex-1 text-base leading-relaxed text-th-body">
              {lane.body}
            </p>

            {/* ── CTA ── */}
            <div className="mt-8">
              <ButtonLink href={lane.href} variant="ghost" className="w-full text-center">
                {lane.cta} &rarr;
              </ButtonLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
