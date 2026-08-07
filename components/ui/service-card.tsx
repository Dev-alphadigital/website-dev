"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const STAGGER_STEP_MS = 90;

// The old version relied on `ScrollReveal`, which animates on mount (a
// deliberate choice elsewhere to dodge a React Strict Mode bug -- see that
// component's comment) rather than on scroll-into-view. For a grid this far
// down the page, that entrance finishes before a visitor ever scrolls to
// it, so the section always looked static/"dead" no matter how it was
// styled. This uses a real IntersectionObserver instead: each card starts
// hidden and animates in only once it actually enters the viewport,
// staggered by column so the grid visibly builds itself in. Cards also get
// their own hover lift/glow, so the section keeps feeling alive after the
// entrance is done, not just once on scroll.
export function ServiceCard({
  index,
  children,
  className,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${(index % 3) * STAGGER_STEP_MS}ms` : "0ms" }}
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-signal/40 hover:shadow-xl",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
