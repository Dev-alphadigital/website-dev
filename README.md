# Alpha Digital Landing Page (Next.js)

Full build of the landing page from the approved copy deck. App Router, TypeScript, Tailwind, Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's inside

- `app/page.tsx` — assembles all 15 sections in order
- `lib/content.ts` — every headline, stat, and CTA in one file. Edit copy here, not inside components.
- `components/sections/` — one file per page section (Hero, Services, FAQ, etc.)
- `components/shared/` — the reusable interactive pieces: CounterOnScroll, FloatBadge, CursorGlow, HoverCard, Marquee, AccordionReveal, StickyProgress
- `components/ui/map.tsx` — the animated WorldMap for the "Where We're Located" section
- `components/ui/testimonial-cards.tsx` — the draggable ShuffleCards testimonial stack, restyled to the brand palette with initials avatars instead of stock photos

## Before you publish

1. **Wire up the two forms.** `LeadForm` and `Contact` currently `preventDefault()` on submit. Connect them to your CRM, form handler, or API route.
2. **Replace placeholder visuals.** The Portfolio project tiles, Guides post thumbnails, and Instagram grid use text placeholders. Swap in real images.
3. **Portfolio images.** Add real project screenshots to the three portfolio cards.
4. **Instagram feed.** The grid is 8 static placeholder tiles. Swap in a real Instagram Basic Display API call or embed if you want it live.
5. **Guides section.** `guidesContent.posts` is hardcoded to 3 placeholder posts. Replace with a real fetch from your CMS or blog, sorted by publish date, as noted in the original copy deck.
6. **Confirm every stat.** The 5+ years, 70+ clients, and 100+ projects figures came from the existing site, so they're safe to ship. If you add any new number later, back it up with real data first.

## Design tokens

| Token | Hex | Use |
|---|---|---|
| Navy | `#0B1E36` | Primary text, dark section backgrounds |
| Signal (orange) | `#F1502F` | Primary CTA, links, accents |
| Gold | `#C99A3E` | Secondary accents, eyebrows on dark backgrounds |
| Cream | `#FAF6EC` | Primary page background |
| Cream 2 | `#F1EADA` | Alternate section background |

Fonts: Montserrat (headings, 600–900 weight) and Inter (body, 400–700 weight), pulled via `next/font/google`, matching the existing site.

## Accessibility and performance notes

- All custom animations respect `prefers-reduced-motion`.
- Keyboard focus is visible everywhere (signal-orange outline) instead of relying on the browser default.
- The FAQ section ships with FAQPage schema markup for search and AI answer engines.
