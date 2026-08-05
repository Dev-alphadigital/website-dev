"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

// HoverReveal pattern: a card that lifts a few pixels with a soft shadow on
// hover or tap. Works on touch since the animation triggers on tap too.
export function HoverCard({ children, className = "" }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(11,30,54,0.18)" }}
      whileTap={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group ${className}`}
    >
      {children}
    </motion.div>
  );
}
