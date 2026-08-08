import { midCtaContent } from "@/lib/content";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { Cta4 } from "@/components/ui/cta-4";

export function MidCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-20">
      <CursorGlow colorFrom="rgba(251,61,0,0.3)" colorTo="rgba(251,61,0,0)" />
      <div className="relative mx-auto max-w-5xl px-6">
        <Cta4
          title={midCtaContent.headline}
          description={midCtaContent.subheadline}
          buttonText={midCtaContent.cta.label}
          buttonUrl={midCtaContent.cta.href}
          items={midCtaContent.items}
        />
      </div>
    </section>
  );
}
