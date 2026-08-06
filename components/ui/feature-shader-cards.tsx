"use client";

import { FileBarChart, Search, TrendingUp, Users } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";

// Keyed by name rather than taking a component reference as a prop: this is
// a client component ("use client"), and WhyUs (its caller) is a server
// component, so passing a function/component reference across that RSC
// boundary isn't serializable. A string key sidesteps that entirely.
const iconMap = { fileBarChart: FileBarChart, search: Search, trendingUp: TrendingUp, users: Users };

export interface ShaderFeature {
  title: string;
  body: string;
  icon: keyof typeof iconMap;
}

// Brand hues (navy #0B1E36, signal #F1502F, gold #C99A3E) as HSL, varied in
// lightness/mix per card so the animated background stays on-brand instead
// of the original demo's rainbow presets.
const shaderPalettes = [
  {
    proportion: 0.35,
    softness: 0.9,
    distortion: 0.16,
    swirl: 0.7,
    swirlIterations: 9,
    shape: "checks" as const,
    shapeScale: 0.09,
    colors: ["hsl(213, 66%, 10%)", "hsl(213, 55%, 24%)", "hsl(10, 87%, 55%)", "hsl(213, 45%, 38%)"],
  },
  {
    proportion: 0.4,
    softness: 1.0,
    distortion: 0.18,
    swirl: 0.8,
    swirlIterations: 11,
    shape: "stripes" as const,
    shapeScale: 0.11,
    colors: ["hsl(10, 80%, 38%)", "hsl(10, 87%, 58%)", "hsl(213, 60%, 14%)", "hsl(10, 70%, 72%)"],
  },
  {
    proportion: 0.38,
    softness: 0.95,
    distortion: 0.17,
    swirl: 0.75,
    swirlIterations: 10,
    shape: "checks" as const,
    shapeScale: 0.1,
    colors: ["hsl(40, 50%, 26%)", "hsl(40, 62%, 52%)", "hsl(213, 60%, 13%)", "hsl(40, 55%, 68%)"],
  },
  {
    proportion: 0.42,
    softness: 1.05,
    distortion: 0.19,
    swirl: 0.85,
    swirlIterations: 12,
    shape: "stripes" as const,
    shapeScale: 0.1,
    colors: ["hsl(213, 60%, 12%)", "hsl(40, 56%, 45%)", "hsl(10, 87%, 52%)", "hsl(213, 40%, 28%)"],
  },
];

export function FeatureShaderCards({ features }: { features: ShaderFeature[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {features.map((feature, index) => {
        const shader = shaderPalettes[index % shaderPalettes.length];
        const Icon = iconMap[feature.icon];
        return (
          <div key={feature.title} className="relative h-72 overflow-hidden rounded-3xl">
            <div className="absolute inset-0">
              <Warp
                style={{ height: "100%", width: "100%" }}
                proportion={shader.proportion}
                softness={shader.softness}
                distortion={shader.distortion}
                swirl={shader.swirl}
                swirlIterations={shader.swirlIterations}
                shape={shader.shape}
                shapeScale={shader.shapeScale}
                scale={1}
                rotation={0}
                speed={0.6}
                colors={shader.colors}
              />
            </div>

            <div className="relative z-10 flex h-full flex-col rounded-3xl border border-white/10 bg-navy/80 p-7">
              <Icon className="mb-4 h-9 w-9 text-white" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-cream-2/90">{feature.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
