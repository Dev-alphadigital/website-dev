"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  handleShuffle: () => void;
  onDragActive: (active: boolean) => void;
  testimonial: string;
  position: "front" | "middle" | "back";
  id: number;
  name: string;
  role: string;
  isMobile: boolean;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialCard({ handleShuffle, onDragActive, testimonial, position, id, name, role, isMobile }: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";
  // Fan-out offset is a percentage of the card's own width, so it scales
  // down automatically as the card shrinks on mobile -- but 33%/66% of
  // even the smaller mobile card was still enough to push the middle/back
  // cards past a narrow phone's screen edge, hence a smaller fan on mobile.
  const middleOffset = isMobile ? "18%" : "33%";
  const backOffset = isMobile ? "36%" : "66%";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? middleOffset : backOffset,
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX ?? 0;
        onDragActive(true);
      }}
      onDragEnd={(e: any) => {
        const endX = e.clientX ?? 0;
        if (dragRef.current - endX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
        onDragActive(false);
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[360px] w-[68vw] max-w-[280px] select-none place-content-center space-y-6 rounded-2xl border-2 border-cream-2 bg-white p-7 shadow-xl sm:h-[420px] sm:w-[320px] sm:max-w-none md:h-[450px] md:w-[350px] ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy text-lg font-bold text-white"
      >
        {initials(name)}
      </div>
      <span className="text-center font-body text-body-card italic leading-relaxed text-navy/80">&ldquo;{testimonial}&rdquo;</span>
      <div className="text-center">
        <span className="block text-sm font-bold text-navy">{name}</span>
        <span className="block text-xs text-signal">{role}</span>
      </div>
    </motion.div>
  );
}

interface ShuffleCardsProps {
  testimonials: Array<{ id: number; quote: string; name: string; role: string }>;
}

const AUTO_SHUFFLE_INTERVAL = 3000;

export function ShuffleCards({ testimonials }: ShuffleCardsProps) {
  const [order, setOrder] = React.useState(testimonials.map((t) => t.id));
  const [hasShuffled, setHasShuffled] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleShuffle = React.useCallback(() => {
    setHasShuffled(true);
    setOrder((prev) => {
      const next = [...prev];
      next.push(next.shift() as number);
      return next;
    });
  }, []);

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleShuffle, AUTO_SHUFFLE_INTERVAL);
    return () => clearInterval(interval);
  }, [handleShuffle, isPaused]);

  const positions: Array<"front" | "middle" | "back"> = ["front", "middle", "back"];
  const visible = order.slice(0, 3).map((id, index) => ({
    ...testimonials.find((t) => t.id === id)!,
    position: positions[index],
  }));

  return (
    <div
      className="relative mx-auto h-[360px] w-[68vw] max-w-[280px] sm:h-[420px] sm:w-[320px] sm:max-w-none md:h-[450px] md:w-[350px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {visible.map((t) => (
        <TestimonialCard
          key={t.id}
          id={t.id}
          testimonial={t.quote}
          name={t.name}
          role={t.role}
          position={t.position}
          handleShuffle={handleShuffle}
          onDragActive={setIsPaused}
          isMobile={isMobile}
        />
      ))}
      {!hasShuffled && (
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.7, 1] }}
          className="absolute -bottom-10 left-0 right-0 text-center text-xs font-medium text-neutral-500"
        >
          Drag the card to see more &rarr;
        </motion.p>
      )}
    </div>
  );
}
