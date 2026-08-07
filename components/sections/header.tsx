"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-extrabold text-navy">
          Alpha<span className="text-signal">Digital</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-navy/80 transition hover:text-signal">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#lead-form"
          className="hidden rounded-full bg-signal px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy md:inline-block"
        >
          Get My Free Audit
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="text-navy md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-navy/10 bg-cream px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-semibold text-navy/80"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#lead-form"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-signal px-5 py-3 text-center text-sm font-bold text-white"
          >
            Get My Free Audit
          </a>
        </nav>
      )}
    </header>
  );
}
