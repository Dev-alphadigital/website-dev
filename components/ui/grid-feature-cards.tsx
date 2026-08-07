import { cn } from "@/lib/utils";
import React from "react";

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  /** Which brand color drives the icon badge and watermark tint. Defaults to navy. */
  accent?: "navy" | "signal";
};

type FeatureCardProps = React.ComponentProps<"div"> & {
  feature: FeatureType;
};

const accentStyles = {
  navy: {
    badge: "bg-navy text-white",
    wash: "from-navy/15 to-navy/[0.03]",
    fill: "fill-navy/10 stroke-navy/30",
  },
  signal: {
    badge: "bg-signal text-white",
    wash: "from-signal/15 to-signal/[0.03]",
    fill: "fill-signal/10 stroke-signal/30",
  },
};

// Adapted from the original grid-feature-cards demo: it styles the watermark
// grid pattern, icon, and body copy with shadcn's foreground/muted-foreground
// CSS-variable tokens, which this project's Tailwind config never defines
// (it uses literal brand colors instead) -- those classes would resolve to
// nothing. Swapped for navy/signal so each card carries a real brand-color
// icon badge and matching watermark tint instead of flat gray.
export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const p = genRandomPattern();
  const accent = accentStyles[feature.accent ?? "navy"];

  return (
    <div className={cn("relative overflow-hidden p-6", className)} {...props}>
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-60 transition-opacity duration-500 group-hover/card:opacity-100",
            accent.wash
          )}
        >
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className={cn("absolute inset-0 h-full w-full mix-blend-overlay", accent.fill)}
          />
        </div>
      </div>
      <div
        className={cn(
          "relative z-20 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110",
          accent.badge
        )}
      >
        <feature.icon className="size-5" strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="relative z-20 mt-8 font-display text-h3-card font-bold text-navy">{feature.title}</h3>
      <p className="relative z-20 mt-2 font-body text-body-card font-light leading-relaxed text-neutral-600">{feature.description}</p>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
    Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
  ]);
}
