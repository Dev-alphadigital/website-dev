import { testimonialsContent } from "@/lib/content";
import { ShuffleCards } from "@/components/ui/testimonial-cards";

export function Testimonials() {
  return (
    <section className="overflow-hidden bg-navy py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">{testimonialsContent.eyebrow}</p>
            <h2 className="font-display text-h2-sm font-extrabold text-white md:text-h2">{testimonialsContent.headline}</h2>
          </div>

          {/* No extra horizontal padding here below lg: the outer max-w-6xl
              px-6 already provides it, and stacking a second px-6 on top
              (48px total each side) left too little room for the card
              stack's fanned-out siblings on narrow phones, pushing them
              past the viewport edge. */}
          <div className="pb-10 lg:px-0 lg:pb-0">
            <ShuffleCards testimonials={testimonialsContent.testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}
