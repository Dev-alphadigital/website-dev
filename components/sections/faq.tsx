import { faqContent } from "@/lib/content";
import { AccordionReveal } from "@/components/shared/accordion-reveal";

export function Faq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-24">
      {/* FAQ schema markup: a strong candidate for featured snippets and AI answer citations */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-display text-h2-sm font-extrabold text-navy md:text-h2">
          {faqContent.headline}
        </h2>

        <div className="mt-10">
          <AccordionReveal items={faqContent.faqs} />
        </div>
      </div>
    </section>
  );
}
