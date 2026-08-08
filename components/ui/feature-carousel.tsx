"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Building2, Truck, Scale, ShieldCheck, HeartPulse, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Icons resolve by key rather than taking a component reference as a prop:
// this is a client component ("use client"), and its caller (Industries) is
// a server component, so a function/component reference can't cross that
// RSC boundary -- see feature-shader-cards.tsx for the same fix.
const iconMap: Record<string, LucideIcon> = {
  shoppingBag: ShoppingBag,
  building: Building2,
  truck: Truck,
  scale: Scale,
  shieldCheck: ShieldCheck,
  heartPulse: HeartPulse,
};

// Alternating brand-color panels stand in for real photography when a
// feature doesn't have an `image` (e.g. an industry the client hasn't
// supplied a photo for yet), so the carousel never shows a blank panel.
const gradients = ["from-navy to-navy/70", "from-signal to-signal/70", "from-navy to-signal"];

export interface CarouselFeature {
  id: string;
  label: string;
  icon: keyof typeof iconMap;
  description: string;
  href?: string;
  image?: string;
}

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel({ features }: { features: CarouselFeature[] }) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="mx-auto w-full max-w-7xl md:p-8">
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[2.5rem] border border-navy/10 lg:aspect-video lg:flex-row lg:rounded-[4rem]">
        <div className="relative z-30 flex min-h-[350px] w-full flex-col items-start justify-center overflow-hidden bg-navy px-8 md:min-h-[450px] md:px-16 lg:h-full lg:w-[40%] lg:pl-16">
          <div className="absolute inset-x-0 top-0 z-40 h-12 bg-gradient-to-b from-navy via-navy/80 to-transparent md:h-20 lg:h-16" />
          <div className="absolute inset-x-0 bottom-0 z-40 h-12 bg-gradient-to-t from-navy via-navy/80 to-transparent md:h-20 lg:h-16" />
          <div className="relative z-20 flex h-full w-full items-center justify-center lg:justify-start">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(-(features.length / 2), features.length / 2, distance);
              const Icon = iconMap[feature.icon];

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-full border px-6 py-3.5 text-left transition-all duration-700 md:px-10 md:py-5 lg:px-8 lg:py-4",
                      isActive
                        ? "z-10 border-white bg-white text-navy"
                        : "border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-signal" : "text-white/40"
                      )}
                    >
                      <Icon size={18} strokeWidth={2} aria-hidden />
                    </div>

                    <span className="whitespace-nowrap text-sm font-bold uppercase tracking-tight md:text-[15px]">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden border-t border-navy/10 bg-cream-2 px-6 py-16 md:min-h-[600px] md:px-12 md:py-24 lg:h-full lg:border-l lg:border-t-0 lg:px-10 lg:py-16">
          <div className="relative flex aspect-[4/5] w-full max-w-[420px] items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";
              const Icon = iconMap[feature.icon];

              // Rounded corners + overflow clipping live on this OUTER,
              // never-transformed div; the actual x/scale/rotate motion is
              // on an inner div with no border-radius of its own. Mobile
              // browsers can glitch -- corners flashing square, then
              // rounded, mid-transition -- when a border-radius+
              // overflow-hidden element is *also* the one being scaled/
              // rotated on the GPU. Splitting the clip layer from the
              // transform layer avoids that; desktop rendered fine either
              // way, so this is a no-visual-difference structural fix.
              return (
                <div
                  key={feature.id}
                  style={{ zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0 }}
                  className="absolute inset-0 overflow-hidden rounded-[2rem] border-4 border-cream bg-cream md:rounded-[2.8rem] md:border-8"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                    className="absolute inset-0 origin-center"
                  >
                    {feature.image ? (
                      <Image
                        src={feature.image}
                        alt={feature.label}
                        fill
                        sizes="(min-width: 1024px) 420px, 100vw"
                        className={cn("object-cover transition-all duration-700", isActive ? "" : "blur-[2px]")}
                        priority={index === 0}
                      />
                    ) : (
                      <div className={cn("relative flex h-full w-full items-center justify-center bg-gradient-to-br", gradients[index % gradients.length])}>
                        <Icon
                          size={200}
                          strokeWidth={1}
                          className={cn("text-white transition-all duration-700", isActive ? "opacity-15" : "opacity-10 blur-[2px]")}
                          aria-hidden
                        />
                      </div>
                    )}

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 pt-32"
                        >
                          <div className="mb-3 w-fit rounded-full border border-white/20 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy shadow-lg">
                            {index + 1} &bull; {feature.label}
                          </div>
                          {/* Mobile-only: 20px (text-xl) read as oversized
                              against the card, reduced ~40% to 12px.
                              md:text-2xl (unchanged) keeps desktop as-is. */}
                          <p className="font-display text-[12px] font-bold leading-tight tracking-tight text-white drop-shadow-md md:text-2xl">
                            {feature.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
