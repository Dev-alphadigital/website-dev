import { locationsContent, officeDots } from "@/lib/content";
import { WorldMap } from "@/components/ui/map";

export function Locations() {
  return (
    <section id="locations" className="bg-white py-24">
      <div className="mx-auto mb-10 max-w-3xl px-6 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{locationsContent.eyebrow}</p>
        <h2 className="font-display text-h2-sm font-extrabold text-navy md:text-h2">{locationsContent.headline}</h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-body text-neutral-500">{locationsContent.subheadline}</p>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <WorldMap dots={officeDots} lineColor="#FB3D00" showLabels animationDuration={2} loop />
      </div>
    </section>
  );
}
