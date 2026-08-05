"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatBadgeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FloatBadge({ children, delay = 0, duration = 5, className = "" }: FloatBadgeProps) {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
