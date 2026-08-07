"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorGlowProps {
  className?: string;
  colorFrom?: string;
  colorTo?: string;
  size?: number;
}

// A soft gradient blob that trails the cursor with a slight spring delay.
// Confined to its parent (must be `relative`), not the whole viewport.
export function CursorGlow({
  className = "",
  colorFrom = "rgba(251,61,0,0.25)",
  colorTo = "rgba(4,33,51,0)",
  size = 480,
}: CursorGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Start centered so the glow is present before the first mouse move.
    const rect = el.getBoundingClientRect();
    x.set(rect.width / 2);
    y.set(rect.height / 2);

    function handleMove(e: MouseEvent) {
      const bounds = el!.getBoundingClientRect();
      x.set(e.clientX - bounds.left);
      y.set(e.clientY - bounds.top);
    }

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, ${colorFrom} 0%, ${colorTo} 70%)`,
        }}
        className="absolute rounded-full blur-2xl"
      />
    </div>
  );
}
