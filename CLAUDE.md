# Task: Build the Alpha Digital Interactive Landing Page

This is a standalone landing page for Alpha Digital, a digital marketing agency. Build it as a single-page React app (or a route/page if the codebase already has a router) using the content and components in this folder.

## Before you start

1. Confirm the project supports **shadcn's project structure**, **Tailwind CSS**, and **TypeScript**.
   - If shadcn isn't set up, run `npx shadcn@latest init` first. This scaffolds `/components/ui`, the Tailwind config, and the `cn()` utility that both components below expect.
   - If Tailwind or TypeScript aren't installed, set those up before continuing; the shadcn CLI init will normally handle both if run in a fresh project.
2. Confirm the default component path is `/components/ui`. If the project uses a different convention, still create `/components/ui` and put these two components there rather than scattering them elsewhere. Keeping shared, reusable UI in one predictable folder is what lets the rest of the codebase (and shadcn's own tooling) find and reuse them instead of every page re-implementing its own version.
3. Install dependencies:
   ```bash
   npm install framer-motion dotted-map next-themes
   ```
   (`next` is only required if this is a Next.js project; if it's a plain Vite/CRA React app, skip it and swap the `next/image` import in `map.tsx` for a plain `<img>` tag, and drop the `next-themes` usage in favor of a simple light/dark boolean prop or a static light theme.)

## Files in this package

- `content/landing-page-content.ts` — every section's copy, already typed and exported as named constants. This is the single source of truth for text. Do not hardcode copy directly into components; import it from here.
- `components/ui/map.tsx` — the `WorldMap` component for Section 10 (Where We're Located).
- `components/ui/testimonial-cards.tsx` — the `TestimonialCard` component for Section 9 (Client Testimonials), used in a draggable shuffle stack.

Copy both component files into the project's `/components/ui` folder as-is, then adjust their Tailwind classes to match the brand palette (see Design Tokens below) rather than the dark demo theme they ship with.

## Build order (15 sections, in page order)

Build top to bottom. Each section pulls its copy from the matching export in `content/landing-page-content.ts`.

1. **Hero** — `heroContent`. Cursor-following gradient glow behind the headline. Three floating badge chips around the hero visual, each with a count-up number, staggered so they don't float in sync. One dominant primary CTA; the secondary link stays a plain text link, not a second button.
2. **Trust Bar** — `trustBarContent`. Dual-direction logo marquee (top row drifts left, bottom row drifts right), grayscale logos that go full color on hover, pause the marquee on hover.
3. **Why Choose Us** — `whyUsContent`. Stat row counts up from 0 when scrolled into view. Four feature cards lift and reveal an icon on hover.
4. **Services** — `servicesContent`. Grid of hover cards; each "Learn More" link uses the `anchorText` field as its link text, not generic "click here." Optional faint drifting icon layer behind the grid on desktop only.
5. **Free Audit Lead Form** — `leadFormContent`. Single CTA, no competing phone number or chat widget inside this section. The three micro-trust lines float gently below the form.
6. **About Us** — `aboutContent`. Mission/vision cards get a colored border animation on hover.
7. **Industries We Serve** — `industriesContent`. Hover reveals a filled icon; only add a one-line example per tile if you have a real, confirmed result for that vertical, otherwise leave it as just the industry name.
8. **Portfolio** — `portfolioContent`. Filter pills above the grid (client-side filter, no reload). Cards reveal a "View Case Study" badge on hover. Swipeable row on mobile.
9. **Client Testimonials** — `testimonialsContent` + `shuffleTestimonials`. Build this with the `TestimonialCard` shuffle-stack component (see Section 9 build notes below).
10. **Where We're Located** — `locationsContent` + `officeDots`. Build this with the `WorldMap` component (see Section 10 build notes below).
11. **Mid-Page CTA Banner** — `midCtaContent`. Keep it simple: cursor glow background, one button, nothing else competing for attention.
12. **Guides & Resources** — `guidesContent`. Blog cards pull the 3 most recent posts automatically (wire this to whatever CMS/data source the project uses). Hover reveals estimated read time.
13. **Instagram Feed** — `instagramContent`. Live grid of the latest 8 posts. Hover reveals like/comment counts. No CTA button in this section.
14. **FAQ** — `faqContent`. Accordion, only one question open at a time. Add FAQ schema (JSON-LD) in the page head using this same data.
15. **Final Contact Section** — `contactContent`. One CTA button. If the phone number is clickable, style it as a plain link, not a second button.

### Section 9 build notes: Testimonial Shuffle Cards

Use `shuffleTestimonials` (already shaped as `{ id, testimonial, author }`) with the `TestimonialCard` component:

```tsx
import { TestimonialCard } from "@/components/ui/testimonial-cards";
import { useState } from "react";
import { shuffleTestimonials } from "@/content/landing-page-content";

function TestimonialShuffle() {
  const [positions, setPositions] = useState(["front", "middle", "back"]);
  const visible = shuffleTestimonials.slice(0, 3);

  const handleShuffle = () => {
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop());
    setPositions(newPositions);
  };

  return (
    <div className="relative h-[450px] w-[350px] mx-auto">
      {visible.map((t, index) => (
        <TestimonialCard key={t.id} {...t} handleShuffle={handleShuffle} position={positions[index]} />
      ))}
    </div>
  );
}
```

Two things to fix before shipping this component:
- **Avatar images.** The component defaults to random stranger photos from `i.pravatar.cc` keyed to `id`. These are real, named clients, so don't ship random placeholder faces next to their names. Replace the `<img>` in `testimonial-cards.tsx` with either a real headshot/logo if available, or an initials avatar (first letter of the author's name on a brand-color circle).
- **Theme.** The component ships with dark styling (`bg-slate-800/20`, `border-slate-700`, `text-slate-400`). Swap these for the brand's cream/navy palette so it matches the rest of the page.

Add a small "drag to see more" hint under the card stack on first load, then fade it out after the first shuffle, since the drag interaction isn't obvious on its own.

### Section 10 build notes: Where We're Located (World Map)

```tsx
import { WorldMap } from "@/components/ui/map";
import { locationsContent, officeDots } from "@/content/landing-page-content";

<section id="locations" className="py-24 bg-white dark:bg-black">
  <div className="max-w-5xl mx-auto text-center px-6 mb-10">
    <p className="text-xs font-bold uppercase tracking-widest text-[var(--signal)] mb-3">
      {locationsContent.eyebrow}
    </p>
    <h2 className="font-extrabold text-3xl md:text-5xl text-[var(--navy)] dark:text-white">
      {locationsContent.headline}
    </h2>
    <p className="text-neutral-500 max-w-xl mx-auto mt-4 text-base md:text-lg">
      {locationsContent.subheadline}
    </p>
  </div>
  <WorldMap dots={officeDots} lineColor="#F1502F" showLabels animationDuration={2} loop />
</section>
```

Set `lineColor` to the brand's signal orange (`#F1502F`), not the component's default blue. This component needs a `ThemeProvider` from `next-themes` wrapping the app for its dark/light mode read to work; add one if the project doesn't already have it. Keep this section free of its own CTA button, it's a quiet visual break between the testimonials and the mid-page CTA banner.

## Design tokens (match the existing Alpha Digital site)

```css
--cream: #FAF6EC;
--cream-2: #F1EADA;
--navy: #0B1E36;
--navy-2: #122A4C;
--signal: #F1502F;   /* primary accent / CTA color */
--signal-dark: #D63F20;
--gold: #D9A441;
--ink: #181C24;
--ink-soft: #5B6472;
```

Fonts: `Montserrat` (700-900 weight) for headings, `Inter` (400-700) for body text. Both are already loaded via Google Fonts on the existing site if you need the `<link>` tags.

## Interactive element vocabulary

Use this naming consistently in component/file names and code comments so the codebase stays self-explanatory:

| Name | Behavior |
|---|---|
| `FloatBadge` | Small pill/card, gentle continuous `translateY` float loop |
| `OrbitIcon` | Icon drifting in a slow circular path |
| `CounterOnScroll` | Number counts up from 0 once in viewport |
| `HoverReveal` | Card reveals extra content/icon on hover or tap |
| `CursorGlow` | Soft gradient blob following the cursor with slight delay |
| `TabFilter` | Pill tabs that filter a grid client-side |
| `StickyProgress` | Slim scroll-progress bar or sticky mini nav |
| `Marquee` | Horizontally auto-scrolling row |
| `AccordionReveal` | Expand/collapse, used for FAQ |
| `DragCarousel` | Swipeable/draggable card row |

## Non-negotiables
- One primary CTA per section, no competing buttons/forms/phone links fighting for the same click.
- Every internal link uses the `anchorText` provided in the content file, not generic "click here" or "learn more" with no context.
- Every stat displayed must be one of the confirmed real numbers in the content file (5+ years, 70+ clients, 100+ projects). Don't invent new stats without confirming them first.
- No em dashes in any copy you write or edit. Grade 7 reading level, plain language, no hype.

## Internal linking map

| Anchor text | Links to |
|---|---|
| SEO services | /seo-services-usa |
| AI search optimization | /aeo-geo-services |
| web development services | /web-mvp-development |
| MVP development | /web-mvp-development |
| AI automation services | /ai-marketing-automation |
| branding services | /branding-services |
| PPC management | /ppc-management-services |
| social media marketing | /social-media-marketing |
| email marketing services | /email-marketing-services |
| industry names | /industries/[slug] |
| project names | /portfolio/[slug] |
| blog category tags | matching service page |

Keep each anchor phrase tied to one destination page across the whole site. Don't send two different anchor phrases that mean the same thing to two different pages, that creates competition between the site's own pages in search results.
