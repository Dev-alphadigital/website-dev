import { portfolioContent } from "@/lib/content";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function Portfolio() {
  const projects = portfolioContent.projects.map((project) => ({
    title: project.name,
    category: project.category,
    href: project.href,
    image: project.image,
  }));

  return (
    <section id="portfolio" className="overflow-hidden bg-navy">
      <div className="mx-auto max-w-2xl px-6 pt-24 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">{portfolioContent.eyebrow}</p>
        <h2 className="font-display text-h2-sm font-extrabold text-white md:text-h2">{portfolioContent.headline}</h2>
        <p className="mt-4 font-body text-body text-cream-2/80">{portfolioContent.subheadline}</p>
      </div>

      <HeroParallax products={projects} />

      <div className="px-6 pb-24 text-center">
        <a
          href={portfolioContent.cta.href}
          className="inline-block rounded-full bg-signal px-8 py-4 text-sm font-bold text-white shadow-lg shadow-signal/30 transition hover:brightness-110"
        >
          {portfolioContent.cta.label}
        </a>
      </div>
    </section>
  );
}
