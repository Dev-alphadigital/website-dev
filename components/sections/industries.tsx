import Link from "next/link";
import { industriesContent } from "@/lib/content";
import { FeatureCarousel, type CarouselFeature } from "@/components/ui/feature-carousel";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const industryIconKeys: CarouselFeature["icon"][] = [
  "shoppingBag",
  "building",
  "truck",
  "scale",
  "shieldCheck",
  "heartPulse",
];

export function Industries() {
  const features: CarouselFeature[] = industriesContent.industries.map((industry, index) => ({
    id: industry.name.toLowerCase().replace(/\s+/g, "-"),
    label: industry.name,
    description: industry.description,
    icon: industryIconKeys[index % industryIconKeys.length],
    href: industry.href,
  }));

  return (
    <section className="bg-cream-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{industriesContent.eyebrow}</p>
          <h2 className="font-display text-3xl font-extrabold text-navy md:text-5xl">{industriesContent.headline}</h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">{industriesContent.subheadline}</p>
        </ScrollReveal>

        <div className="mt-14">
          <FeatureCarousel features={features} />
        </div>

        <div className="mt-12 text-center">
          <Link
            href={industriesContent.moreTile.href}
            className="inline-block rounded-full border-2 border-navy px-8 py-4 text-sm font-bold text-navy transition hover:border-signal hover:text-signal"
          >
            {industriesContent.moreTile.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
