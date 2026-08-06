import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { contactContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Alpha Digital",
  description: contactContent.subheadline,
};

// Standalone, "headless" contact page: intentionally does not render the
// site Header/Footer (neither lives in the root layout, so simply not
// importing them here is enough) since this is meant for use as a bare
// landing/embed page -- e.g. a paid-ad destination or an iframe embed --
// rather than as a page within normal site navigation.
export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Alpha Digital",
    description: contactContent.subheadline,
    url: "https://alphadigital.live/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Alpha Digital",
      email: contactContent.contactInfo.email,
      telephone: contactContent.contactInfo.phone,
      address: contactContent.contactInfo.location,
    },
  };

  return (
    <main className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Contact />
    </main>
  );
}
