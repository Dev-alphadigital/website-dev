import Link from "next/link";
import { guidesContent } from "@/lib/content";
import { HoverCard } from "@/components/shared/hover-card";

export function Guides() {
  return (
    <section id="guides" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{guidesContent.eyebrow}</p>
          <h2 className="font-display text-3xl font-extrabold text-navy md:text-5xl">{guidesContent.headline}</h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">{guidesContent.subheadline}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {guidesContent.posts.map((post) => (
            <HoverCard key={post.title} className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
              <div className="flex h-32 items-center justify-center bg-cream-2">
                <span className="text-xs font-bold uppercase tracking-widest text-navy/30">{post.category}</span>
              </div>
              <div className="p-6">
                <Link href={post.categoryHref} className="text-[11px] font-bold uppercase tracking-widest text-signal">
                  {post.category}
                </Link>
                <h3 className="mt-2 font-display text-base font-bold leading-snug text-navy">
                  <Link href={post.href}>{post.title}</Link>
                </h3>
                <p className="mt-3 max-h-0 overflow-hidden text-xs font-medium text-neutral-500 opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-6 group-hover:opacity-100">
                  {post.readTime}
                </p>
              </div>
            </HoverCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={guidesContent.cta.href}
            className="inline-block rounded-full border-2 border-navy px-8 py-4 text-sm font-bold text-navy transition hover:border-signal hover:text-signal"
          >
            {guidesContent.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
