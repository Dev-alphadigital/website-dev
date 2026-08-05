"use client";

import { leadFormContent } from "@/lib/content";
import { FloatBadge } from "@/components/shared/float-badge";
import { Check } from "lucide-react";

export function LeadForm() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire this up to your form handler / CRM of choice.
  }

  return (
    <section id="lead-form" className="bg-navy py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">{leadFormContent.headline}</h2>
        <p className="mt-4 text-base text-cream-2/80">{leadFormContent.subheadline}</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4 text-left">
          {leadFormContent.fields.map((field) => (
            <div key={field}>
              <label htmlFor={field} className="mb-1.5 block text-xs font-semibold text-cream-2/70">
                {field}
              </label>
              <input
                id={field}
                name={field}
                type={field === "Email" ? "email" : field === "Website URL" ? "url" : "text"}
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-signal focus:ring-2 focus:ring-signal/40"
                placeholder={field}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full rounded-full bg-signal px-8 py-4 text-sm font-bold text-white transition hover:brightness-110"
          >
            {leadFormContent.ctaLabel}
          </button>

          <p className="text-center text-xs text-cream-2/50">{leadFormContent.consentLine}</p>
        </form>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {leadFormContent.microTrust.map((line, i) => (
            <FloatBadge key={line} delay={i * 0.5} duration={4.5 + i * 0.4}>
              <span className="flex items-center gap-1.5 text-xs font-medium text-cream-2/70">
                <Check size={14} className="text-gold" />
                {line}
              </span>
            </FloatBadge>
          ))}
        </div>
      </div>
    </section>
  );
}
