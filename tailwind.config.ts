import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand guide: Main (navy/signal) + Sub (blue-sub/gold) palettes.
        navy: "#042133",
        signal: "#FB3D00",
        gold: "#FFB83B",
        "blue-sub": "#163C54",
        cream: "#FAF6EC",
        "cream-2": "#F1EADA",
      },
      fontFamily: {
        // Brand guide: Inter for headings, Montserrat for text & buttons.
        display: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
      fontSize: {
        // Brand type scale (desktop pixel sizes from the brand guide).
        h1: ["55px", { lineHeight: "1.05" }],
        h2: ["45px", { lineHeight: "1.1" }],
        "h2-sm": ["35px", { lineHeight: "1.15" }],
        h3: ["25px", { lineHeight: "1.25" }],
        "h3-card": ["20px", { lineHeight: "1.3" }],
        h4: ["15px", { lineHeight: "1.4" }],
        "h4-sm": ["12px", { lineHeight: "1.4" }],
        body: ["17px", { lineHeight: "1.6" }],
        "body-card": ["16px", { lineHeight: "1.6" }],
        "body-sm": ["15px", { lineHeight: "1.6" }],
        hero: ["20px", { lineHeight: "1.5" }],
        "hero-sm": ["18px", { lineHeight: "1.5" }],
        btn: ["15px", { lineHeight: "1" }],
        "btn-sm": ["14px", { lineHeight: "1" }],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        "emphasis-in": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "underline-in": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "reveal-in": {
          "0%": { opacity: "0", transform: "translateY(-8px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        orbit: "orbit 22s linear infinite",
        "emphasis-in": "emphasis-in 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both",
        "underline-in": "underline-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.9s both",
        "reveal-in": "reveal-in 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
