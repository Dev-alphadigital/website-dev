import { heroContent } from "@/lib/content";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { FloatBadge } from "@/components/shared/float-badge";
import { CounterOnScroll } from "@/components/shared/counter-on-scroll";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pb-28 pt-20 md:pb-40 md:pt-28">
      <CursorGlow colorFrom="rgba(241,80,47,0.35)" colorTo="rgba(11,30,54,0)" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gold">{heroContent.eyebrow}</p>

        <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          {heroContent.headline}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-cream-2/90 md:text-lg">{heroContent.subheadline}</p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={heroContent.primaryCta.href}
            className="w-full rounded-full bg-signal px-8 py-4 text-center text-sm font-bold text-white shadow-lg shadow-signal/30 transition hover:brightness-110 sm:w-auto"
          >
            {heroContent.primaryCta.label}
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="text-sm font-semibold text-cream underline decoration-gold/50 underline-offset-4 transition hover:text-gold"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>

        <p className="mt-6 text-xs text-cream-2/60">{heroContent.trustLine}</p>
      </div>

      {/* Three float badges drifting around the hero, each on its own speed/delay so they never sync */}
      <div className="relative mx-auto mt-16 hidden max-w-5xl px-6 md:block" aria-hidden="false">
        <FloatBadge delay={0} duration={5.5} className="absolute left-[6%] top-0">
          <BadgeCard {...heroContent.floatBadges[0]} />
        </FloatBadge>
        <FloatBadge delay={0.8} duration={4.5} className="absolute left-1/2 top-6 -translate-x-1/2">
          <BadgeCard {...heroContent.floatBadges[1]} />
        </FloatBadge>
        <FloatBadge delay={1.4} duration={6} className="absolute right-[6%] top-0">
          <BadgeCard {...heroContent.floatBadges[2]} />
        </FloatBadge>
      </div>

      {/* Mobile: badges as a static row instead of floating over content */}
      <div className="relative mx-auto mt-10 grid max-w-sm grid-cols-3 gap-3 px-6 md:hidden">
        {heroContent.floatBadges.map((badge) => (
          <div key={badge.label} className="rounded-xl bg-white/10 px-2 py-3 text-center backdrop-blur">
            <span className="block font-display text-lg font-extrabold text-white">
              <CounterOnScroll target={badge.number} suffix={badge.suffix} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function BadgeCard({ label, number, suffix }: { label: string; number: number; suffix: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 shadow-lg backdrop-blur">
      <p className="whitespace-nowrap font-display text-lg font-extrabold text-white">
        <CounterOnScroll target={number} suffix={suffix} />
      </p>
      <p className="whitespace-nowrap text-[11px] font-medium text-cream-2/80">{label.replace(/^\d+\+?\s*/, "")}</p>
    </div>
  );
}
