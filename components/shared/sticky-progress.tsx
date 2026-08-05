"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// A slim scroll progress bar. Fades in after the hero and fades back out
// in the last 5% of the page, so it reads as "you've reached the end"
// at the final contact section rather than just disappearing.
export function StickyProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.95, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ scaleX, opacity }}
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-signal"
      aria-hidden="true"
    />
  );
}
