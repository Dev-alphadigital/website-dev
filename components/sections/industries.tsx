import Link from "next/link";
import { ShoppingBag, Building2, Truck, Scale, ShieldCheck, HeartPulse } from "lucide-react";
import { industriesContent } from "@/lib/content";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const industryIcons = [ShoppingBag, Building2, Truck, Scale, ShieldCheck, HeartPulse];

export function Industries() {
  return (
    <section className="bg-cream-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{industriesContent.eyebrow}</p>
          <h2 className="font-display text-3xl font-extrabold text-navy md:text-5xl">{industriesContent.headline}</h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">{industriesContent.subheadline}</p>
        </ScrollReveal>

        {/* 3x2 grid, reusing the What We Do card treatment for visual consistency */}
        <ScrollReveal
          delay={0.3}
          className="mt-14 grid grid-cols-1 divide-x divide-y divide-dashed divide-navy/15 border border-dashed border-navy/15 bg-white sm:grid-cols-2 lg:grid-cols-3"
        >
          {industriesContent.industries.map((industry, index) => (
            <Link key={industry.name} href={industry.href} className="block">
              <FeatureCard
                feature={{
                  title: industry.name,
                  description: industry.description,
                  icon: industryIcons[index % industryIcons.length],
                  accent: index % 2 === 0 ? "navy" : "signal",
                }}
              />
            </Link>
          ))}
        </ScrollReveal>

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
