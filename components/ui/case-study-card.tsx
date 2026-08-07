"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Building2, CheckCircle2, Download, Landmark } from "lucide-react";

const iconMap = { landmark: Landmark, building2: Building2 } as const;

const CARD_GRADIENTS: Record<string, string> = {
  "fintech-seo": "from-navy via-navy to-gold",
  "enterprise-retail-seo": "from-navy via-navy to-signal",
};

export type CaseStudy = {
  id: string;
  icon: keyof typeof iconMap;
  industry: string;
  title: string;
  description: string;
  highlights: string[];
  image?: string;
  downloadHref: string;
};

// Flip card: hover reveals the back on desktop, tap/click (or Enter/Space)
// toggles it on touch and keyboard, so the interaction works without a
// cursor. The download link lives inside a div[role=button] rather than a
// native <button>, which keeps the HTML valid (a real <button> can't
// contain an <a>) while `stopPropagation` on the link's click keeps it from
// also re-triggering the flip.
//
// Hover/click/focus handlers live on the OUTER, never-transformed wrapper,
// not on the element that actually gets `rotateY(...)`. That used to be one
// div: as it rotates under perspective, its on-screen bounding box visibly
// narrows (foreshortening), so a cursor sitting anywhere off-center -- an
// edge or corner, which is a completely normal place to hover a card --
// would end up outside the now-shrunk box mid-rotation. That fired
// mouseleave, which reversed the flip, which grew the box back under the
// cursor, which fired mouseenter again: an endless flicker loop that never
// let the card finish flipping unless the cursor happened to land dead
// center. The outer wrapper's hit-test box is a plain, untransformed
// rectangle that never changes size, so hover stays stable everywhere on
// the card regardless of rotation progress.
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [flipped, setFlipped] = React.useState(false);
  // Touch devices synthesize a mouseenter + click for a single tap on
  // hover-bound elements, so binding both would flip the card open on
  // "hover" and immediately closed again by the trailing click. Hover-driven
  // flipping is scoped to devices that actually support hover; click stays
  // the only trigger everywhere else (touch, and it also backstops
  // keydown for keyboard users).
  const [canHover, setCanHover] = React.useState(false);
  React.useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  const Icon = iconMap[study.icon];
  const gradient = CARD_GRADIENTS[study.id] ?? "from-navy via-navy to-signal";

  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={flipped}
      aria-label={`${study.title} case study -- ${flipped ? "showing" : "show"} what's inside`}
      onClick={() => {
        if (!canHover) toggle();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      onMouseEnter={() => {
        if (canHover) setFlipped(true);
      }}
      onMouseLeave={() => {
        if (canHover) setFlipped(false);
      }}
      className="cursor-pointer rounded-2xl outline-none [perspective:1600px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
    >
      <div
        className="group relative h-[440px] w-full rounded-2xl [transform-style:preserve-3d] transition-transform duration-[900ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-lg [backface-visibility:hidden]">
          <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${gradient}`}>
            {study.image ? (
              <Image src={study.image} alt={study.title} fill sizes="(min-width: 768px) 24rem, 100vw" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Icon className="h-16 w-16 text-white/20" strokeWidth={1.25} aria-hidden />
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
              {study.industry}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-xl font-bold text-navy">{study.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{study.description}</p>
            <div className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-bold uppercase tracking-widest text-signal">
              See what&apos;s inside
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-navy p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold">{study.industry} &middot; SEO</span>
            <h3 className="mt-2 font-display text-lg font-bold text-white">{study.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {study.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-cream-2/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal" aria-hidden />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={study.downloadHref}
            download
            onClick={(e) => e.stopPropagation()}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download Case Study
          </a>
        </div>
      </div>
    </div>
  );
}
