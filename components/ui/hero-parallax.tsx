"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export type ParallaxProject = {
  title: string;
  category: string;
  href: string;
  /** Optional case-study screenshot. Falls back to a brand-gradient placeholder when omitted. */
  image?: string;
};

const CARD_GRADIENTS = [
  "from-navy via-navy to-signal",
  "from-signal via-navy to-navy",
  "from-gold via-navy to-navy",
];

// Adapted from Aceternity's hero-parallax block. Two things changed from a
// literal copy-paste, both learned the hard way from an earlier version of
// this exact component in this codebase:
//
// 1. The original ties scroll progress to `offset: ["start start", "end
//    start"]`, which only reaches progress 1 once the ENTIRE container has
//    scrolled past the top of the viewport. To give a 15-item, 3-row
//    layout room for its sliding effect, upstream compensates with an
//    artificially tall wrapper (h-[300vh]). For any smaller product count
//    that wrapper ends up far taller than the actual content, so users
//    scroll through a long stretch of nothing after the cards already
//    animated in and the section visually appears "stuck" -- that's the
//    dead-space bug this project hit and fixed once already. Using
//    `["start end", "end start"]` instead scrubs the animation across the
//    section's entire time in the viewport, so a normally-sized container
//    (no vh hack) works correctly with any number of rows.
// 2. translateX/translateY magnitudes are scaled down from the original
//    (1000px / -700..500px) to suit a compact 3-wide row instead of a
//    5-wide one spilling off both edges of the screen.
export const HeroParallax = ({ products }: { products: ParallaxProject[] }) => {
  const rows: ParallaxProject[][] = [];
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3));
  }

  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 0 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.3], [12, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [0.3, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.3], [6, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.3], [-60, 0]), springConfig);

  return (
    <div ref={ref} className="relative py-16 antialiased [perspective:1000px] [transform-style:preserve-3d] md:py-24">
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className={`mb-10 flex flex-col items-center gap-6 last:mb-0 sm:gap-8 ${
              rowIndex % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
            } sm:justify-center`}
          >
            {row.map((product, i) => (
              <ProductCard
                product={product}
                translate={rowIndex % 2 === 0 ? translateX : translateXReverse}
                gradient={CARD_GRADIENTS[(rowIndex * 3 + i) % CARD_GRADIENTS.length]}
                key={product.title}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  gradient,
}: {
  product: ParallaxProject;
  translate: ReturnType<typeof useSpring>;
  gradient: string;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -12 }}
      className="group/product relative h-64 w-64 flex-shrink-0 sm:h-72 sm:w-80 md:h-80 md:w-96"
    >
      <Link
        href={product.href}
        className={`block h-full w-full overflow-hidden rounded-2xl shadow-xl transition group-hover/product:shadow-2xl ${
          product.image ? "relative bg-navy" : `bg-gradient-to-br ${gradient}`
        }`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 24rem, (min-width: 640px) 20rem, 16rem"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6">
            <span className="select-none text-center font-display text-2xl font-extrabold text-white/10 md:text-3xl">
              {product.title}
            </span>
          </div>
        )}
      </Link>
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-2xl bg-navy/85 p-5 opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
        <span className="text-[11px] font-bold uppercase tracking-widest text-signal">{product.category}</span>
        <h3 className="mt-1 font-display text-lg font-bold text-white">{product.title}</h3>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 transition-opacity duration-300 group-hover/product:opacity-0">
        <span className="font-display text-lg font-bold text-white">{product.title}</span>
      </div>
    </motion.div>
  );
};
