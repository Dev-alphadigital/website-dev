"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface EmphasisLineProps {
  children: ReactNode;
  className?: string;
}

// Fades/scales the line in, then draws a signal-colored underline beneath it
// a beat later, so the phrase reads as the emphasized payoff after the H1.
export function EmphasisLine({ children, className = "" }: EmphasisLineProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      className={`relative inline-block ${className}`}
    >
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-signal"
        aria-hidden="true"
      />
    </motion.p>
  );
}
