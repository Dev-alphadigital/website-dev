"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Code2,
  Rocket,
  Cpu,
  Palette,
  Target,
  Share2,
  Mail,
  type LucideIcon,
} from "lucide-react";
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

  // Depending on `index` (not just `isPaused`) means every step -- whether
  // from this timer or the prev/next buttons -- restarts the 2s countdown,
  // so tapping a button doesn't get immediately undone by the timer
  // advancing again right behind it.
  React.useEffect(() => {
    if (isPaused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % services.length), SLIDE_INTERVAL);
    return () => clearTimeout(id);
  }, [isPaused, index, services.length]);

  const goTo = (next: number) => setIndex(((next % services.length) + services.length) % services.length);

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
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous service"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-signal hover:text-signal"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <div className="flex gap-1.5">
          {services.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-signal" : "w-1.5 bg-navy/20"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next service"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-signal hover:text-signal"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}
