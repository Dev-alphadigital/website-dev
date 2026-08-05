"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: "front" | "middle" | "back";
  id: number;
  name: string;
  role: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialCard({ handleShuffle, testimonial, position, id, name, role }: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX ?? 0;
      }}
      onDragEnd={(e: any) => {
        const endX = e.clientX ?? 0;
        if (dragRef.current - endX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[420px] w-[320px] select-none place-content-center space-y-6 rounded-2xl border-2 border-cream-2 bg-white p-7 shadow-xl md:h-[450px] md:w-[350px] ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy text-lg font-bold text-white"
      >
        {initials(name)}
      </div>
      <span className="text-center text-base italic leading-relaxed text-navy/80">&ldquo;{testimonial}&rdquo;</span>
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

export function ShuffleCards({ testimonials }: ShuffleCardsProps) {
  const [order, setOrder] = React.useState(testimonials.map((t) => t.id));
  const [hasShuffled, setHasShuffled] = React.useState(false);

  const handleShuffle = () => {
    setHasShuffled(true);
    setOrder((prev) => {
      const next = [...prev];
      next.push(next.shift() as number);
      return next;
    });
  };

  const positions: Array<"front" | "middle" | "back"> = ["front", "middle", "back"];
  const visible = order.slice(0, 3).map((id, index) => ({
    ...testimonials.find((t) => t.id === id)!,
    position: positions[index],
  }));

  return (
    <div className="relative mx-auto h-[420px] w-[320px] md:h-[450px] md:w-[350px]">
      {visible.map((t) => (
        <TestimonialCard
          key={t.id}
          id={t.id}
          testimonial={t.quote}
          name={t.name}
          role={t.role}
          position={t.position}
          handleShuffle={handleShuffle}
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
