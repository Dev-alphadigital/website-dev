import { whyUsContent } from "@/lib/content";
import { CounterOnScroll } from "@/components/shared/counter-on-scroll";
import { HoverCard } from "@/components/shared/hover-card";

export function WhyUs() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{whyUsContent.eyebrow}</p>
          <h2 className="font-display text-3xl font-extrabold text-navy md:text-5xl">{whyUsContent.headline}</h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">{whyUsContent.subheadline}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-navy/10 rounded-2xl bg-navy py-8">
          {whyUsContent.stats.map((stat) => (
            <div key={stat.label} className="px-2 text-center">
              <p className="font-display text-3xl font-extrabold text-white md:text-4xl">
                <CounterOnScroll target={stat.number} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-[11px] font-medium text-cream-2/70 md:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {whyUsContent.features.map((feature) => (
            <HoverCard key={feature.title} className="rounded-2xl border border-navy/10 bg-white p-7">
              <div className="mb-4 h-10 w-10 rounded-full bg-signal/10 transition group-hover:bg-signal/20" />
              <h3 className="font-display text-lg font-bold text-navy">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{feature.body}</p>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
