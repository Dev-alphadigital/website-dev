"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
  "from-navy via-signal to-navy",
  "from-navy via-gold to-navy",
  "from-signal via-gold to-navy",
];

// Adapted from Aceternity's hero-parallax block. The upstream version is a
// horizontally-scrolling, scroll-linked showcase that needs an artificially
// tall wrapper (multiple viewport heights) to give its pin/tilt animation
// scroll room to run — that wrapper height never matches the actual content
// height, which is what left dead space before whatever follows the section.
// This version keeps the tilt/fade-in feel but triggers it per-card via
// whileInView as the grid scrolls into view, so the section is exactly as
// tall as its content: a real 3-column CSS grid, no scroll-linked track.
export const HeroParallax = ({ products }: { products: ParallaxProject[] }) => {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-3 lg:gap-8">
      {products.map((product, i) => (
        <ProductCard
          key={product.title}
          product={product}
          gradient={CARD_GRADIENTS[i % CARD_GRADIENTS.length]}
          delay={(i % 3) * 0.1}
        />
      ))}
    </div>
  );
};

export const ProductCard = ({
  product,
  gradient,
  delay,
}: {
  product: ParallaxProject;
  gradient: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group/product relative h-72 [perspective:1000px] [transform-style:preserve-3d] md:h-80"
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
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
        <span className="text-[11px] font-bold uppercase tracking-widest text-signal">
          {product.category}
        </span>
        <h3 className="mt-1 font-display text-lg font-bold text-white">{product.title}</h3>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 transition-opacity duration-300 group-hover/product:opacity-0">
        <span className="font-display text-lg font-bold text-white">{product.title}</span>
      </div>
    </motion.div>
  );
};
