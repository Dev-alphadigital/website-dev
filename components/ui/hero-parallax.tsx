"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
const AUTO_HIGHLIGHT_INTERVAL = 2200;
const MOBILE_SLIDE_INTERVAL = 2000;

export const HeroParallax = ({ products }: { products: ParallaxProject[] }) => {
  const rows: ParallaxProject[][] = [];
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3));
  }

  // Sweeps the hover-style overlay (category + title over a dark scrim)
  // across the cards on its own, one at a time, so the reveal is visible
  // without requiring a cursor -- pauses while the grid is actually being
  // hovered so it doesn't fight the user's own interaction.
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % products.length), AUTO_HIGHLIGHT_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, products.length]);

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
    <div
      ref={ref}
      className="relative py-16 antialiased [perspective:1000px] [transform-style:preserve-3d] md:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Mobile only: single-row auto-sliding carousel instead of the
          stacked column the scroll-parallax grid below falls back to.
          The scroll-linked rotate/translate grid stays exactly as-is at
          sm and up. */}
      <div className="sm:hidden">
        <MobileProductSlider products={products} />
      </div>

      <motion.div className="hidden sm:block" style={{ rotateX, rotateZ, translateY, opacity }}>
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
                isAutoActive={rowIndex * 3 + i === activeIndex}
                key={product.title}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

function MobileProductSlider({ products }: { products: ParallaxProject[] }) {
  const [index, setIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Depending on `index` (not just `isPaused`) means every step -- whether
  // from this timer or the prev/next buttons -- restarts the 2s countdown,
  // so tapping a button doesn't get immediately undone by the timer
  // advancing again right behind it.
  React.useEffect(() => {
    if (isPaused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % products.length), MOBILE_SLIDE_INTERVAL);
    return () => clearTimeout(id);
  }, [isPaused, index, products.length]);

  const goTo = (next: number) => setIndex(((next % products.length) + products.length) % products.length);

  return (
    <div onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {products.map((product, i) => (
            <div key={product.title} className="w-full flex-shrink-0 px-6">
              <Link href={product.href} className="relative block h-64 w-full overflow-hidden rounded-2xl shadow-xl">
                {product.image ? (
                  <Image src={product.image} alt={product.title} fill sizes="100vw" className="object-cover" />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br p-6 ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]}`}
                  >
                    <span className="select-none text-center font-display text-2xl font-extrabold text-white/10">
                      {product.title}
                    </span>
                  </div>
                )}
                {/* Bottom gradient rather than the desktop cards' full
                    bg-navy/85 scrim: the mobile slider shows one card at a
                    time with no hover state to make an opaque navy scrim
                    feel temporary, and the section itself is also navy, so
                    a full scrim made the card indistinguishable from the
                    page background -- just blank space until the text.
                    A bottom-only fade keeps the photo visible while still
                    giving the title/category text a readable backing. */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-2xl bg-gradient-to-t from-navy via-navy/70 to-transparent p-5">
                  <span className="text-h4-sm font-bold uppercase tracking-widest text-signal">{product.category}</span>
                  <h3 className="mt-1 font-display text-h3-card font-bold text-white">{product.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous project"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-signal hover:text-signal"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <div className="flex gap-1.5">
          {products.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-signal" : "w-1.5 bg-navy/20"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next project"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-signal hover:text-signal"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}

export const ProductCard = ({
  product,
  translate,
  gradient,
  isAutoActive,
}: {
  product: ParallaxProject;
  translate: ReturnType<typeof useSpring>;
  gradient: string;
  isAutoActive: boolean;
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
      {/* Category + title over a dark scrim -- always readable, unlike plain
          text over an arbitrary screenshot. Visible on hover, or on its own
          turn in the auto-sweep. */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col justify-end rounded-2xl bg-navy/85 p-5 transition-opacity duration-500 group-hover/product:opacity-100 ${
          isAutoActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-h4-sm font-bold uppercase tracking-widest text-signal">{product.category}</span>
        <h3 className="mt-1 font-display text-h3-card font-bold text-white">{product.title}</h3>
      </div>
    </motion.div>
  );
};
