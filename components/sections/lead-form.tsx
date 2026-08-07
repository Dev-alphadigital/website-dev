"use client";

import { Check, Loader2 } from "lucide-react";
import { leadFormContent } from "@/lib/content";
import { FloatBadge } from "@/components/shared/float-badge";
import { useFormSubmit } from "@/hooks/use-form-submit";

export function LeadForm() {
  const { status, error, submit } = useFormSubmit("Marketing Audit Request");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  return (
    <section id="lead-form" className="bg-navy py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-h2-sm font-extrabold text-white md:text-h2">{leadFormContent.headline}</h2>
            <p className="mt-4 font-body text-body text-cream-2/80">{leadFormContent.subheadline}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
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

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-signal px-8 py-4 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
              {status === "submitting" ? "Sending..." : leadFormContent.ctaLabel}
            </button>

            {status === "success" && (
              <p className="text-center text-sm font-semibold text-gold">
                Thanks! We&rsquo;ll be in touch within 1 business day.
              </p>
            )}
            {status === "error" && <p className="text-center text-sm font-semibold text-signal">{error}</p>}

            <p className="text-center text-xs text-cream-2/50">{leadFormContent.consentLine}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
