"use client";

import { useState } from "react";
import Link from "next/link";
import { portfolioContent } from "@/lib/content";
import { HoverCard } from "@/components/shared/hover-card";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? portfolioContent.projects
      : portfolioContent.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{portfolioContent.eyebrow}</p>
          <h2 className="font-display text-3xl font-extrabold text-navy md:text-5xl">{portfolioContent.headline}</h2>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">{portfolioContent.subheadline}</p>
        </div>

        {/* TabFilter: filters the grid client-side, no page reload */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {portfolioContent.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                activeFilter === filter
                  ? "border-signal bg-signal text-white"
                  : "border-navy/15 bg-white text-navy/70 hover:border-navy/30"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Scrollable drag row on mobile, grid on desktop */}
        <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <HoverCard
              key={project.name}
              className="relative min-w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border border-navy/10 bg-white sm:min-w-0"
            >
              <div className="flex h-40 items-center justify-center bg-cream-2">
                <span className="font-display text-2xl font-extrabold text-navy/20">{project.name}</span>
              </div>
              <div className="p-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-signal">{project.category}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-navy">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{project.description}</p>
                <Link
                  href={project.href}
                  className="mt-4 inline-block translate-y-1 text-sm font-bold text-signal opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
                >
                  View Case Study &rarr;
                </Link>
              </div>
            </HoverCard>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="mt-12 text-center text-sm text-neutral-500">No projects in this category yet. Check back soon.</p>
        )}

        <div className="mt-12 text-center">
          <a
            href={portfolioContent.cta.href}
            className="inline-block rounded-full border-2 border-navy px-8 py-4 text-sm font-bold text-navy transition hover:border-signal hover:text-signal"
          >
            {portfolioContent.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
