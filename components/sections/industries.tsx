import Link from "next/link";
import { industriesContent } from "@/lib/content";
import { HoverCard } from "@/components/shared/hover-card";
import { Marquee } from "@/components/shared/marquee";

export function Industries() {
  return (
    <section className="bg-cream-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{industriesContent.eyebrow}</p>
          <h2 className="font-display text-3xl font-extrabold text-navy md:text-5xl">{industriesContent.headline}</h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">{industriesContent.subheadline}</p>
        </div>

        {/* Desktop / tablet grid */}
        <div className="mt-12 hidden grid-cols-3 gap-4 sm:grid lg:grid-cols-5">
          {industriesContent.industries.map((industry) => (
            <HoverCard key={industry.name} className="rounded-xl border border-navy/10 bg-white">
              <Link href={industry.href} className="block px-4 py-6 text-center">
                <span className="font-display text-sm font-bold text-navy">{industry.name}</span>
              </Link>
            </HoverCard>
          ))}
          <Link
            href={industriesContent.moreTile.href}
            className="flex items-center justify-center rounded-xl border-2 border-dashed border-navy/20 px-4 py-6 text-center transition hover:border-signal"
          >
            <span className="font-display text-sm font-bold text-signal">{industriesContent.moreTile.label}</span>
          </Link>
        </div>

        {/* Mobile marquee, since a 9-item grid feels cramped on small screens */}
        <div className="mt-10 sm:hidden">
          <Marquee>
            {[
              ...industriesContent.industries.map((i) => ({ label: i.name, href: i.href })),
              industriesContent.moreTile,
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-bold text-navy"
              >
                {item.label}
              </Link>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
