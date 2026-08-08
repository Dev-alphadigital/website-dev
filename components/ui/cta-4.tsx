import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "Easy Integration",
  "24/7 Support",
  "Customizable Design",
  "Scalable Performance",
  "Hundreds of Blocks",
];

// Adapted from the shadcnblocks Cta4 demo: swapped bg-muted/text-muted-
// foreground (shadcn CSS-variable tokens this project's Tailwind config
// never defines) for the brand palette, and blue-sub -- the brand guide's
// "sub blue" -- for the panel so it reads as a layered navy-on-navy card
// rather than shadcn's neutral-on-white block. Headings/body use the
// project's own h2/body type-scale tokens instead of shadcn's generic
// text-2xl/text-3xl. Dropped target="_blank": the demo's buttonUrl was an
// external marketing link, but every real usage of this component here
// points at an in-page anchor, where opening a new tab would be wrong.
// Also dropped the original demo's outer <section className="py-32">
// <div className="container mx-auto"> wrapper -- this file is just the
// inner panel now, since every caller (e.g. MidCta) already owns its own
// <section> chrome (background, padding, CursorGlow) and wrapping it again
// here would double up the page rhythm.
export const Cta4 = ({
  title = "Call to Action",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto illo praesentium nisi, accusantium quae.",
  buttonText = "Get Started",
  buttonUrl = "#",
  items = defaultItems,
}: Cta4Props) => {
  return (
    <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-blue-sub px-6 py-10 md:flex-row md:items-center lg:px-16 lg:py-14">
      <div className="md:w-1/2">
        <h2 className="font-display text-h2-sm font-extrabold text-white md:text-h2">{title}</h2>
        <p className="mt-3 text-body-sm text-white/85 md:text-body">{description}</p>
        <Button className="mt-6" asChild>
          <a href={buttonUrl}>
            {buttonText} <ArrowRight className="size-4" aria-hidden />
          </a>
        </Button>
      </div>
      <div className="md:w-2/5">
        <ul className="flex flex-col space-y-3 text-btn-sm font-medium text-white">
          {items.map((item, idx) => (
            <li className="flex items-center gap-3" key={idx}>
              <Check className="size-4 flex-shrink-0 text-signal" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
