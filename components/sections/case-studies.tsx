import { caseStudiesContent } from "@/lib/content";
import { CaseStudyCard } from "@/components/ui/case-study-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function CaseStudies() {
  return (
    <section id="case-studies" className="bg-cream py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-signal">{caseStudiesContent.eyebrow}</p>
        <h2 className="font-display text-h2-sm font-extrabold text-navy md:text-h2">{caseStudiesContent.headline}</h2>
        <p className="mt-4 font-body text-body text-neutral-500">{caseStudiesContent.subheadline}</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 px-6 md:grid-cols-2">
        {caseStudiesContent.studies.map((study, index) => (
          <ScrollReveal key={study.id} delay={index * 0.12}>
            <CaseStudyCard study={study} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
