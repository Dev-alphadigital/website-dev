import { testimonialsContent } from "@/lib/content";
import { ShuffleCards } from "@/components/ui/testimonial-cards";

export function Testimonials() {
  return (
    <section className="bg-navy py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">{testimonialsContent.eyebrow}</p>
            <h2 className="font-display text-h2-sm font-extrabold text-white md:text-h2">{testimonialsContent.headline}</h2>
          </div>

          <div className="px-6 pb-10 lg:px-0 lg:pb-0">
            <ShuffleCards testimonials={testimonialsContent.testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}
