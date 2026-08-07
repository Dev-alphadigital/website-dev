import { midCtaContent } from "@/lib/content";
import { CursorGlow } from "@/components/shared/cursor-glow";

export function MidCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-20">
      <CursorGlow colorFrom="rgba(251,61,0,0.3)" colorTo="rgba(251,61,0,0)" />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-h2-sm font-extrabold text-white md:text-h2">{midCtaContent.headline}</h2>
        <p className="mt-3 text-body-sm text-white/85 md:text-body">{midCtaContent.subheadline}</p>
        <a
          href={midCtaContent.cta.href}
          className="mt-8 inline-block rounded-full bg-signal px-8 py-4 text-btn font-bold text-white transition hover:brightness-110"
        >
          {midCtaContent.cta.label}
        </a>
      </div>
    </section>
  );
}
