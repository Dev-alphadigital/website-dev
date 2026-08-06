import { whyUsContent } from "@/lib/content";
import { CounterOnScroll } from "@/components/shared/counter-on-scroll";
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

        <div className="mt-16">
          <FeatureShaderCards features={features} />
        </div>
      </div>
    </section>
  );
}
