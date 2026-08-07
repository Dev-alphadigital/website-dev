"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, Code2, Rocket, Cpu, Palette, Target, Share2, Mail, type LucideIcon } from "lucide-react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";

// Icons resolve by key rather than a component reference passed in as a
// prop: this is a client component and its caller (Services) is a server
// component, so a function/component reference can't cross that RSC
// boundary -- see feature-carousel.tsx for the same fix.
const iconMap: Record<string, LucideIcon> = {
  search: Search,
  sparkles: Sparkles,
  code2: Code2,
  rocket: Rocket,
  cpu: Cpu,
  palette: Palette,
  target: Target,
  share2: Share2,
  mail: Mail,
};

export interface MobileServiceSlide {
  name: string;
  description: string;
  href: string;
  anchorText: string;
  iconKey: keyof typeof iconMap;
  accent: "navy" | "signal";
}

const SLIDE_INTERVAL = 2000;

export function MobileServiceSlider({ services }: { services: MobileServiceSlide[] }) {
  const [index, setIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % services.length), SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, services.length]);

  return (
    <div onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {services.map((service) => (
            <div key={service.name} className="w-full flex-shrink-0 px-1">
              <div className="flex flex-col rounded-2xl border border-navy/10 bg-white shadow-sm">
                <FeatureCard
                  className="flex-1"
                  feature={{
                    title: service.name,
                    description: service.description,
                    icon: iconMap[service.iconKey],
                    accent: service.accent,
                  }}
                />
                <Link
                  href={service.href}
                  className="mb-6 ml-6 inline-flex w-fit items-center gap-1.5 text-xs font-bold text-signal"
                >
                  {service.anchorText}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-1.5">
        {services.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-signal" : "w-1.5 bg-navy/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
