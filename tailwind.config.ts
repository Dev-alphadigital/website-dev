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
        navy: "#0B1E36",
        signal: "#F1502F",
        gold: "#C99A3E",
        cream: "#FAF6EC",
        "cream-2": "#F1EADA",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
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
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        orbit: "orbit 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
