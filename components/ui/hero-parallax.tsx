"use client";

import React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

export type ParallaxProject = {
  title: string;
  category: string;
  href: string;
};

const CARD_GRADIENTS = [
  "from-navy via-navy to-signal",
  "from-signal via-navy to-navy",
  "from-gold via-navy to-navy",
  "from-navy via-signal to-navy",
  "from-navy via-gold to-navy",
];

// Adapted from Aceternity's hero-parallax block. The upstream version renders
// a fixed 5/5/5 product grid backed by real screenshot thumbnails; Alpha
// Digital's portfolio doesn't have case-study screenshots yet, so cards use
// brand-gradient placeholders and rows are split dynamically to fit however
// many projects are passed in.
export const HeroParallax = ({ products }: { products: ParallaxProject[] }) => {
  const rows: ParallaxProject[][] = [];
  for (let i = 0; i < products.length; i += 5) {
    rows.push(products.slice(i, i + 5));
  }

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  // Scroll runway scales with row count so the tilt-in effect has room to
  // play out whether there are 3 projects or 15.
  const sectionHeight = `${100 + rows.length * 60}vh`;

  return (
    <div
      ref={ref}
      style={{ height: sectionHeight }}
      className="relative flex flex-col self-auto overflow-hidden py-20 antialiased [perspective:1000px] [transform-style:preserve-3d] md:py-32"
    >
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className={`mb-10 flex gap-6 md:mb-16 md:gap-8 ${
              rowIndex % 2 === 0 ? "flex-row-reverse space-x-reverse" : "flex-row"
            }`}
          >
            {row.map((product, i) => (
              <ProductCard
                product={product}
                translate={rowIndex % 2 === 0 ? translateX : translateXReverse}
                gradient={CARD_GRADIENTS[(rowIndex * 5 + i) % CARD_GRADIENTS.length]}
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
  translate: MotionValue<number>;
  gradient: string;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product relative h-72 w-64 flex-shrink-0 md:h-96 md:w-[26rem]"
    >
      <Link
        href={product.href}
        className={`block h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br shadow-xl transition group-hover/product:shadow-2xl ${gradient}`}
      >
        <div className="flex h-full w-full items-center justify-center p-6">
          <span className="select-none text-center font-display text-3xl font-extrabold text-white/10 md:text-5xl">
            {product.title}
          </span>
        </div>
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
