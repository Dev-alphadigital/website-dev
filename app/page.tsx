import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { WhyUs } from "@/components/sections/why-us";
import { Services } from "@/components/sections/services";
import { LeadForm } from "@/components/sections/lead-form";
import { About } from "@/components/sections/about";
import { Industries } from "@/components/sections/industries";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { Locations } from "@/components/sections/locations";
import { CaseStudies } from "@/components/sections/case-studies";
import { MidCta } from "@/components/sections/mid-cta";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WhyUs />
      <Services />
      <LeadForm />
      <About />
      <Industries />
      <Portfolio />
      <Testimonials />
      <Locations />
      <CaseStudies />
      <MidCta />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
