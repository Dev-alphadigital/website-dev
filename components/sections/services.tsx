import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesContent } from "@/lib/content";
import { HoverCard } from "@/components/shared/hover-card";

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-cream-2 py-24">
      {/* Faint OrbitIcon-style background chips, desktop only, low opacity so they never compete with the cards */}
      <div className="pointer-events-none absolute inset-0 hidden opacity-[0.06] md:block" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-orbit rounded-full border-2 border-dashed border-navy" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{servicesContent.eyebrow}</p>
          <h2 className="font-display text-3xl font-extrabold text-navy md:text-5xl">{servicesContent.headline}</h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">{servicesContent.subheadline}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicesContent.services.map((service) => (
            <HoverCard key={service.name} className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-display text-base font-bold text-navy">{service.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{service.description}</p>
              <Link
                href={service.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-signal"
              >
                {service.anchorText}
                <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </Link>
            </HoverCard>
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
