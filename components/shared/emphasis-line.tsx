import { ReactNode } from "react";

interface EmphasisLineProps {
  children: ReactNode;
  className?: string;
}

// Pure CSS entrance (Tailwind keyframes, see tailwind.config.ts): the line
// fades/scales in, then a signal-colored underline draws in beneath it a
// beat later. Deliberately not a Framer Motion mount animation — that
// version played fine in production but reliably got stuck at its initial
// (invisible) state in dev, where React Strict Mode double-invokes effects.
// CSS keyframes trigger on paint regardless of that, so this is a server
// component with no hydration dependency at all.
export function EmphasisLine({ children, className = "" }: EmphasisLineProps) {
  return (
    <p className={`relative inline-block animate-emphasis-in ${className}`}>
      {children}
      <span
        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left animate-underline-in rounded-full bg-signal"
        aria-hidden="true"
      />
    </p>
  );
}
