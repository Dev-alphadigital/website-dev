import { whyUsContent } from "@/lib/content";
import { FeatureShaderCards, type ShaderFeature } from "@/components/ui/feature-shader-cards";

const featureIcons: ShaderFeature["icon"][] = ["fileBarChart", "search", "trendingUp", "users"];

export function WhyUs() {
  const features = whyUsContent.features.map((feature, index) => ({
    ...feature,
    icon: featureIcons[index % featureIcons.length],
  }));

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="items-end justify-between gap-10 md:flex">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{whyUsContent.eyebrow}</p>
            <h2 className="font-display text-3xl font-extrabold text-navy md:text-5xl">{whyUsContent.headline}</h2>
          </div>
          <p className="mt-4 max-w-md text-base text-neutral-600 md:mt-0 md:text-lg">{whyUsContent.subheadline}</p>
        </div>

        <div className="mt-16">
          <FeatureShaderCards features={features} />
        </div>
      </div>
    </section>
  );
}
