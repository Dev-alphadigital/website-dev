import { midCtaContent } from "@/lib/content";
import { CursorGlow } from "@/components/shared/cursor-glow";

export function MidCta() {
  return (
    <section className="relative overflow-hidden bg-signal py-20">
      <CursorGlow colorFrom="rgba(11,30,54,0.25)" colorTo="rgba(241,80,47,0)" />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-2xl font-extrabold text-white md:text-4xl">{midCtaContent.headline}</h2>
        <p className="mt-3 text-sm text-white/85 md:text-base">{midCtaContent.subheadline}</p>
        <a
          href={midCtaContent.cta.href}
          className="mt-8 inline-block rounded-full bg-navy px-8 py-4 text-sm font-bold text-white transition hover:brightness-125"
        >
          {midCtaContent.cta.label}
        </a>
      </div>
    </section>
  );
}
