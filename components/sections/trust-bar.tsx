import { trustBarContent } from "@/lib/content";
import { Marquee } from "@/components/shared/marquee";

export function TrustBar() {
  return (
    <section className="border-b border-navy/10 bg-cream py-10">
      <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-navy/50">
        {trustBarContent.label}
      </p>
      <Marquee className="mb-4">
        {trustBarContent.logos.map((logo) => (
          <span
            key={logo}
            className="whitespace-nowrap font-display text-lg font-bold text-navy/30 grayscale transition hover:text-navy hover:grayscale-0"
          >
            {logo}
          </span>
        ))}
      </Marquee>
      <Marquee reverse>
        {[...trustBarContent.logos].reverse().map((logo) => (
          <span
            key={logo}
            className="whitespace-nowrap font-display text-lg font-bold text-navy/30 grayscale transition hover:text-navy hover:grayscale-0"
          >
            {logo}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
