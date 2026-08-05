import { testimonialsContent } from "@/lib/content";
import { ShuffleCards } from "@/components/ui/testimonial-cards";

export function Testimonials() {
  return (
    <section className="bg-navy py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">{testimonialsContent.eyebrow}</p>
        <h2 className="font-display text-3xl font-extrabold text-white md:text-5xl">{testimonialsContent.headline}</h2>
      </div>

      <div className="mt-16 px-6 pb-10">
        <ShuffleCards testimonials={testimonialsContent.testimonials} />
      </div>
    </section>
  );
}
