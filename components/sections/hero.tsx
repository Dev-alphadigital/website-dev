import { heroContent } from "@/lib/content";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { EmphasisLine } from "@/components/shared/emphasis-line";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

// Sizes are the previous w-* values scaled up 40% (e.g. w-24/w-28 = 96px/112px -> 134px/157px).
const floatingLogos: { src: string; alt: string; depth: number; position: string; size: string }[] = [
  { src: "/logos/hakem-ai.png", alt: "Hakem AI", depth: 0.6, position: "top-[6%] left-[3%]", size: "w-[134px] md:w-[157px]" },
  { src: "/logos/sensely.png", alt: "Sensely", depth: 1.4, position: "top-[22%] left-[2%]", size: "w-[157px] md:w-[179px]" },
  { src: "/logos/enso.png", alt: "Enso", depth: 0.8, position: "top-[40%] left-[4%]", size: "w-[112px] md:w-[134px]" },
  { src: "/logos/clipper-ai.png", alt: "ClipperAI", depth: 2, position: "top-[57%] left-[2%]", size: "w-[157px] md:w-[179px]" },
  { src: "/logos/levity.png", alt: "Levity", depth: 1, position: "top-[74%] left-[5%]", size: "w-[134px] md:w-[157px]" },
  { src: "/logos/patientory.png", alt: "Patientory Inc.", depth: 1.6, position: "top-[88%] left-[9%]", size: "w-[179px] md:w-[202px]" },
  { src: "/logos/rayseen.png", alt: "Rayseen", depth: 1.7, position: "top-[12%] left-[13%]", size: "w-[134px] md:w-[157px]" },
  { src: "/logos/voicecenta.png", alt: "Voicecenta.ai", depth: 1.2, position: "top-[3%] left-[30%]", size: "w-[157px] md:w-[179px]" },
  { src: "/logos/appiel-ai.png", alt: "Appiel AI", depth: 0.7, position: "top-[2%] left-[60%]", size: "w-[134px] md:w-[157px]" },
  { src: "/logos/matchmap.png", alt: "MatchMap", depth: 1.8, position: "top-[5%] left-[83%]", size: "w-[157px] md:w-[179px]" },
  { src: "/logos/vikk-ai.png", alt: "VIKK AI", depth: 1, position: "top-[21%] left-[94%]", size: "w-[134px] md:w-[157px]" },
  { src: "/logos/keyfree.png", alt: "Kez Keyfree", depth: 2.2, position: "top-[39%] left-[93%]", size: "w-[157px] md:w-[179px]" },
  { src: "/logos/karahi-boys.png", alt: "Karahi Boys", depth: 0.9, position: "top-[57%] left-[95%]", size: "w-[134px] md:w-[157px]" },
  { src: "/logos/deejos.png", alt: "Deejos", depth: 1.5, position: "top-[74%] left-[91%]", size: "w-[157px] md:w-[179px]" },
  { src: "/logos/acronimo.png", alt: "Acronimo", depth: 1, position: "top-[89%] left-[83%]", size: "w-[134px] md:w-[157px]" },
  { src: "/logos/strava.png", alt: "Strava", depth: 1.3, position: "top-[92%] left-[35%]", size: "w-[134px] md:w-[157px]" },
  { src: "/logos/tunefly.png", alt: "Tunefly", depth: 0.8, position: "top-[91%] left-[60%]", size: "w-[134px] md:w-[157px]" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pb-28 pt-20 md:pb-40 md:pt-28">
      <CursorGlow colorFrom="rgba(241,80,47,0.35)" colorTo="rgba(11,30,54,0)" />

      {/* Client-logo parallax, desktop only: drifts with the cursor behind the headline */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
        <Floating sensitivity={-0.6} className="overflow-hidden">
          {floatingLogos.map((logo) => (
            <FloatingElement key={logo.alt} depth={logo.depth} className={logo.position}>
              <img
                src={logo.src}
                alt={logo.alt}
                className={`${logo.size} h-auto object-contain opacity-70 transition-opacity hover:opacity-100`}
              />
            </FloatingElement>
          ))}
        </Floating>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          {heroContent.headline}
        </h1>

        <EmphasisLine className="mt-3 font-display text-2xl font-extrabold text-signal sm:text-3xl md:text-4xl">
          {heroContent.headlineEmphasis}
        </EmphasisLine>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={heroContent.primaryCta.href}
            className="w-full rounded-full bg-signal px-8 py-4 text-center text-sm font-bold text-white shadow-lg shadow-signal/30 transition hover:brightness-110 sm:w-auto"
          >
            {heroContent.primaryCta.label}
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="text-sm font-semibold text-cream underline decoration-gold/50 underline-offset-4 transition hover:text-gold"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>

        <p className="mt-6 text-xs text-cream-2/60">{heroContent.trustLine}</p>
      </div>
    </section>
  );
}
