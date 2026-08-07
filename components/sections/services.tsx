import Link from "next/link";
import { ArrowRight, Search, Sparkles, Code2, Rocket, Cpu, Palette, Target, Share2, Mail } from "lucide-react";
import { servicesContent } from "@/lib/content";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { ServiceCard } from "@/components/ui/service-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { AmbientBlobs } from "@/components/shared/ambient-blobs";

const serviceIcons = [Search, Sparkles, Code2, Rocket, Cpu, Palette, Target, Share2, Mail];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-cream-2 py-24">
      <AmbientBlobs />
      {/* Faint OrbitIcon-style background chips, desktop only, low opacity so they never compete with the cards */}
      <div className="pointer-events-none absolute inset-0 hidden opacity-[0.06] md:block" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-orbit rounded-full border-2 border-dashed border-navy" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{servicesContent.eyebrow}</p>
          <h2 className="font-display text-h2-sm font-extrabold text-navy md:text-h2">{servicesContent.headline}</h2>
          <p className="mt-4 font-body text-body text-neutral-600">{servicesContent.subheadline}</p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {servicesContent.services.map((service, index) => (
            <ServiceCard key={service.name} index={index}>
              <FeatureCard
                className="flex-1"
                feature={{
                  title: service.name,
                  description: service.description,
                  icon: serviceIcons[index % serviceIcons.length],
                  accent: index % 2 === 0 ? "navy" : "signal",
                }}
              />
              <Link
                href={service.href}
                className="relative z-20 mb-6 ml-6 inline-flex w-fit items-center gap-1.5 text-xs font-bold text-signal"
              >
                {service.anchorText}
                <ArrowRight size={13} className="transition-transform duration-300 group-hover/card:translate-x-1" />
              </Link>
            </ServiceCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={servicesContent.cta.href}
            className="inline-block rounded-full bg-navy px-8 py-4 text-sm font-bold text-white transition hover:bg-signal"
          >
            {servicesContent.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
