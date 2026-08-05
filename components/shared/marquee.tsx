import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}

// Duplicates its children once so the loop is seamless, and pauses on hover
// via the `group-hover:` utility on the animated track.
export function Marquee({ children, reverse = false, className = "" }: MarqueeProps) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent" />
      <div
        className={`flex w-max gap-12 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
