"use client";

import { MapPin, Phone, Mail, Loader2, Paperclip } from "lucide-react";
import { contactContent } from "@/lib/content";
import { useFormSubmit } from "@/hooks/use-form-submit";

export function Contact() {
  const { status, error, submit } = useFormSubmit("Contact Form");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  return (
    <section id="contact" className="bg-cream py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-h2-sm font-extrabold text-navy md:text-h2">{contactContent.headline}</h2>
          <p className="mt-4 font-body text-body leading-relaxed text-neutral-600">{contactContent.subheadline}</p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-signal" />
              <span className="text-sm text-neutral-600">{contactContent.contactInfo.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-signal" />
              <a href={`tel:${contactContent.contactInfo.phone}`} className="text-sm text-neutral-600 hover:text-navy">
                {contactContent.contactInfo.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-signal" />
              <a href={`mailto:${contactContent.contactInfo.email}`} className="text-sm text-neutral-600 hover:text-navy">
                {contactContent.contactInfo.email}
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactContent.fields.map((field) => {
              const isFullWidth = field === "Message" || field === "Service (dropdown)";
              if (field === "Service (dropdown)") {
                return (
                  <div key={field} className="sm:col-span-2">
                    <label htmlFor={field} className="mb-1.5 block text-xs font-semibold text-navy/60">
                      Service
                    </label>
                    <select
                      id={field}
                      name="Service"
                      className="w-full rounded-xl border border-navy/15 bg-cream px-4 py-3 text-sm text-navy outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/30"
                    >
                      <option>SEO</option>
                      <option>PPC</option>
                      <option>Branding</option>
                      <option>Web Development</option>
                      <option>AI Automation</option>
                      <option>Social Media Marketing</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                );
              }
              if (field === "Message") {
                return (
                  <div key={field} className="sm:col-span-2">
                    <label htmlFor={field} className="mb-1.5 block text-xs font-semibold text-navy/60">
                      {field}
                    </label>
                    <textarea
                      id={field}
                      name={field}
                      rows={4}
                      className="w-full rounded-xl border border-navy/15 bg-cream px-4 py-3 text-sm text-navy outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/30"
                    />
                  </div>
                );
              }
              return (
                <div key={field} className={isFullWidth ? "sm:col-span-2" : ""}>
                  <label htmlFor={field} className="mb-1.5 block text-xs font-semibold text-navy/60">
                    {field}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={field === "Email Address" ? "email" : field === "Phone Number" ? "tel" : "text"}
                    className="w-full rounded-xl border border-navy/15 bg-cream px-4 py-3 text-sm text-navy outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/30"
                  />
                </div>
              );
            })}

            <div className="sm:col-span-2">
              <label htmlFor="attachments" className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-navy/60">
                <Paperclip size={13} />
                Attach Files (optional)
              </label>
              <input
                id="attachments"
                name="attachments"
                type="file"
                multiple
                className="w-full rounded-xl border border-navy/15 bg-cream px-4 py-3 text-sm text-navy outline-none transition file:mr-3 file:rounded-full file:border-0 file:bg-signal file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white focus:border-signal focus:ring-2 focus:ring-signal/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-signal px-8 py-4 text-sm font-bold text-white transition hover:bg-navy disabled:opacity-60"
          >
            {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
            {status === "submitting" ? "Sending..." : contactContent.cta.label}
          </button>

          {status === "success" && (
            <p className="mt-4 text-center text-sm font-semibold text-signal">
              Thanks! We&rsquo;ve received your message and will follow up soon.
            </p>
          )}
          {status === "error" && <p className="mt-4 text-center text-sm font-semibold text-signal">{error}</p>}
        </form>
      </div>
    </section>
  );
}
