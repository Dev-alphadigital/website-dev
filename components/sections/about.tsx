import { aboutContent } from "@/lib/content";
import { HoverCard } from "@/components/shared/hover-card";

export function About() {
  return (
    <section id="about" className="bg-cream py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{aboutContent.eyebrow}</p>
          <h2 className="font-display text-3xl font-extrabold text-navy md:text-4xl">{aboutContent.headline}</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">{aboutContent.subheadline}</p>

          <div className="mt-8 rounded-2xl border-l-4 border-signal bg-cream-2 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-signal">{aboutContent.valueTag}</p>
            <h3 className="mt-2 font-display text-xl font-bold text-navy">{aboutContent.valueHeadline}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{aboutContent.valueBody}</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {aboutContent.cards.map((card) => (
            <HoverCard
              key={card.title}
              className="rounded-2xl border-2 border-transparent bg-white p-7 shadow-sm transition-colors group-hover:border-gold"
            >
              <h3 className="font-display text-lg font-bold text-navy">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{card.body}</p>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
