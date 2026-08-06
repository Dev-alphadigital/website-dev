import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Blur/fade/slide-up entrance via a Tailwind CSS keyframe (see
// tailwind.config.ts), not a Framer Motion whileInView. That version
// reliably got stuck invisible on some dev-mode reloads under React Strict
// Mode's effect double-invoke (same failure mode as emphasis-line.tsx's
// original implementation) -- unacceptable here since it could hide the
// whole card grid, not just one line of text. CSS keyframes fire on paint
// with no hydration dependency, so this plays on mount rather than waiting
// for scroll-into-view, but by the time a visitor scrolls this far down the
// page it's already settled either way.
export function ScrollReveal({ children, className = "", delay = 0.1 }: ScrollRevealProps) {
  return (
    <div className={`animate-reveal-in ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
