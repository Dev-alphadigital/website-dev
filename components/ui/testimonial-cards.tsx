"use client";

import * as React from "react";
import { motion } from "framer-motion";

type CardPosition = "front" | "middle" | "back";

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: CardPosition;
  id: number;
  author: string;
  /** Optional real headshot or client logo. Falls back to an initials avatar. */
  avatarUrl?: string;
}

function getInitials(author: string): string {
  const namePart = author.split("\u2013")[0]?.trim() || author;
  const parts = namePart.split(" ").filter(Boolean);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

export function TestimonialCard({ handleShuffle, testimonial, position, id, author, avatarUrl }: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0",
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX;
      }}
      onDragEnd={(e: any) => {
        if (dragRef.current - e.clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      // Brand palette (cream/navy), swapped from the original dark-slate demo styling
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-[var(--navy)]/15 bg-[var(--cream)] p-6 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`Photo of ${author}`}
          className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-[var(--navy)]/20 bg-white object-cover"
        />
      ) : (
        // Initials avatar fallback: do not use placeholder stock photos next to real, named clients.
        <div
          aria-hidden="true"
          className="pointer-events-none mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-[var(--navy)]/20 bg-[var(--signal)] text-3xl font-bold text-white"
        >
          {getInitials(author)}
        </div>
      )}
      <span className="text-center text-lg italic text-[var(--ink)]">&ldquo;{testimonial}&rdquo;</span>
      <span className="text-center text-sm font-medium text-[var(--signal-dark)]">{author}</span>
    </motion.div>
  );
}
