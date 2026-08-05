// Alpha Digital — Landing Page Content
// Single source of truth for all copy on the page. Import from here into components;
// do not hardcode copy directly inside components.

// ---------- Types ----------

export interface CtaLink {
  label: string;
  href: string;
}

export interface StatItem {
  number: number;
  suffix: string;
  label: string;
}

export interface FeatureItem {
  title: string;
  body: string;
}

export interface ServiceItem {
  name: string;
  description: string;
  href: string;
  anchorText: string;
}

export interface AboutCard {
  title: string;
  body: string;
}

export interface IndustryItem {
  name: string;
  href: string;
}

export interface PortfolioProject {
  name: string;
  category: string;
  description: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ShuffleTestimonial {
  id: number;
  testimonial: string;
  author: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MapDot {
  start: { lat: number; lng: number; label: string };
  end: { lat: number; lng: number; label: string };
}

// ---------- 1. Hero Section ----------

export const heroContent = {
  eyebrow: "Full-Service Digital Marketing Agency",
  headline: "A Digital Marketing Agency Built Around One Goal: More of the Right Customers",
  subheadline:
    "Alpha Digital plans and runs SEO, PPC, branding, and AI automation strategies that bring qualified traffic to your website and turn it into real leads.",
  primaryCta: { label: "Get My Free Marketing Audit", href: "#lead-form" } as CtaLink,
  secondaryCta: { label: "See Our Work", href: "/portfolio/" } as CtaLink,
  trustLine: "70+ clients served across retail, finance, healthcare, and tech.",
  floatBadges: ["5+ Years of Experience", "70+ Satisfied Clients", "100+ Successful Projects"],
};

// ---------- 2. Trust Bar (Logos) ----------

export const trustBarContent = {
  label: "Trusted by growing brands in retail, finance, healthcare, and tech",
};

// ---------- 3. Why Choose Alpha Digital ----------

export const whyUsContent = {
  eyebrow: "Why Alpha Digital",
  headline: "We Build Marketing Systems, Not One-Off Campaigns",
  subheadline:
    "You get one team covering SEO, PPC, content, AI automation, and web development, plus a clear report every month so you always know what's working and why.",
  stats: [
    { number: 5, suffix: "+", label: "Years of experience" },
    { number: 70, suffix: "+", label: "Satisfied clients" },
    { number: 100, suffix: "+", label: "Successful projects" },
  ] as StatItem[],
  features: [
    {
      title: "Reporting You Can Actually Read",
      body: "Every client gets a plain-language report each month. No jargon, just what changed and what we're doing next.",
    },
    {
      title: "Keyword and Search Insight",
      body: "We study what your customers are actually typing into Google, then build content and pages around it.",
    },
    {
      title: "Search Visibility That Compounds",
      body: "SEO gains build on each other. We focus on rankings that hold steady, not quick spikes that fade.",
    },
    {
      title: "One Team, Every Channel",
      body: "SEO, PPC, branding, and web development work off the same strategy instead of four disconnected vendors.",
    },
  ] as FeatureItem[],
};

// ---------- 4. Services ----------

export const servicesContent = {
  eyebrow: "What We Do",
  headline: "Marketing Services Built to Work Together",
  subheadline:
    "Pick one service or combine a few. Each one is built to support the others instead of working in isolation.",
  services: [
    {
      name: "SEO Services",
      description: "Rank higher in search and turn that visibility into steady, repeatable traffic.",
      href: "/seo-services-usa",
      anchorText: "SEO services",
    },
    {
      name: "AI SEO & GEO Services",
      description: "Show up when people search using AI tools like ChatGPT, Gemini, and AI Overviews.",
      href: "/aeo-geo-services",
      anchorText: "AI search optimization",
    },
    {
      name: "Web Development",
      description: "Websites built to load fast, look sharp, and turn visitors into leads.",
      href: "/web-mvp-development",
      anchorText: "web development services",
    },
    {
      name: "MVP Development",
      description: "Get your product idea in front of real users faster, without overbuilding it first.",
      href: "/web-mvp-development",
      anchorText: "MVP development",
    },
    {
      name: "AI Automation",
      description: "Automate the repetitive parts of marketing and sales so your team can focus on strategy.",
      href: "/ai-marketing-automation",
      anchorText: "AI automation services",
    },
    {
      name: "Branding Services",
      description: "Build a look and voice that people remember and trust the second time they see it.",
      href: "/branding-services",
      anchorText: "branding services",
    },
    {
      name: "PPC Services",
      description: "Ad campaigns built around actual sales goals, tracked down to the dollar spent.",
      href: "/ppc-management-services",
      anchorText: "PPC management",
    },
    {
      name: "Social Media Marketing",
      description: "Content and ad strategy that keeps your brand active and easy to find on social.",
      href: "/social-media-marketing",
      anchorText: "social media marketing",
    },
    {
      name: "Email Marketing",
      description: "Email flows that keep leads warm and bring past customers back.",
      href: "/email-marketing-services",
      anchorText: "email marketing services",
    },
  ] as ServiceItem[],
  cta: { label: "Get a Free Marketing Audit", href: "#lead-form" } as CtaLink,
};

// ---------- 5. Free Audit Lead Form ----------

export const leadFormContent = {
  headline: "Get Your Free Marketing Audit",
  subheadline:
    "We'll look at your site and your current marketing, then send you a short breakdown of what's working and what's holding you back. No cost, no obligation.",
  fields: ["Name", "Email", "Website URL"],
  ctaLabel: "Get My Free Audit",
  consentLine: "By submitting this form, you agree to our Terms & Conditions.",
  microTrust: ["No spam, ever", "Response within 1 business day", "Built for businesses of any size"],
};

// ---------- 6. About Alpha Digital ----------

export const aboutContent = {
  eyebrow: "Who We Are",
  headline: "A Team That Treats Your Growth Like Our Own",
  subheadline:
    "We've worked with footwear brands, spirits companies, AI startups, and outsourcing firms. Different industries, same approach: understand how the business actually makes money, then build the marketing around that.",
  valueTag: "Our Approach",
  valueHeadline: "Strategy First, Tactics Second",
  valueBody:
    "Before we touch a single ad or blog post, we map out how your specific business gets and keeps customers. That's what decides which channels we prioritize first.",
  cards: [
    {
      title: "Our Mission",
      body: "We help businesses grow their search visibility and revenue with strategies we can actually explain and prove, not guesswork.",
    },
    {
      title: "Our Vision",
      body: "A future where small and mid-size businesses can compete for search visibility the same way big brands do, with the right strategy instead of the biggest budget.",
    },
  ] as AboutCard[],
};

// ---------- 7. Industries We Serve ----------

export const industriesContent = {
  headline: "Industries We Serve",
  subheadline: "The channels that work best change by industry. Here's where we've built the deepest experience.",
  industries: [
    { name: "Retail", href: "/industries/retail" },
    { name: "Real Estate", href: "/industries/real-estate" },
    { name: "Logistics", href: "/industries/logistics" },
    { name: "Law Firms", href: "/industries/law-firms" },
    { name: "Insurance", href: "/industries/insurance" },
    { name: "Healthcare", href: "/industries/healthcare" },
    { name: "Enterprise", href: "/industries/enterprise" },
    { name: "Finance", href: "/industries/finance" },
    { name: "Advertising", href: "/industries/advertising" },
  ] as IndustryItem[],
  moreTile: { label: "See All Industries", href: "/industries/" } as CtaLink,
};

// ---------- 8. Portfolio ----------

export const portfolioContent = {
  headline: "Work We're Proud Of",
  subheadline: "A few examples of what changes when the strategy actually fits the business.",
  filters: ["Branding", "Web Development", "Mobile Development", "SEO", "Performance Marketing", "AI"],
  projects: [
    {
      name: "Rayseen",
      category: "Branding",
      description: "A footwear brand that grew organic traffic to its product pages instead of relying on paid ads.",
      href: "/portfolio/rayseen",
    },
    {
      name: "Acr\u00f3nimo",
      category: "Branding",
      description: "A spirits brand that built search visibility around the exact terms its buyers search for.",
      href: "/portfolio/acronimo",
    },
    {
      name: "Deejo's Cafe",
      category: "Branding",
      description: "A local cafe that built a stronger, more consistent brand presence online.",
      href: "/portfolio/deejos-cafe",
    },
  ] as PortfolioProject[],
  cta: { label: "View Full Portfolio", href: "/portfolio/" } as CtaLink,
};

// ---------- 9. Client Testimonials ----------

export const testimonialsContent = {
  eyebrow: "Satisfied Clients",
  headline: "What Our Clients Say",
  testimonials: [
    {
      quote:
        "Working with Alpha Digital helped us improve our marketing flow and creative output. Their ideas were clear, fast, and easy to apply. Our campaigns now look stronger and feel more connected across all channels.",
      name: "Leana Garcia",
      role: "Director of Marketing & Creative Services, Inktel",
    },
    {
      quote:
        "Alpha Digital helped us organize our digital marketing and reach the right customers at the right time. Their strategies were simple to follow and brought steady improvement.",
      name: "Nelson Flores-Giacometto",
      role: "Director of Marketing, Gallo",
    },
    {
      quote:
        "Alpha Digital helped us grow online with better content, design, and structure. Everything became easier for our users, and our message reached more people.",
      name: "Joseph Kelly",
      role: "CEO, Spiritual Guidance",
    },
    {
      quote:
        "Alpha Digital's branding and marketing ideas helped us connect with customers in a more meaningful way. Our online presence improved, our story became clearer, and our sales grew.",
      name: "Alessandra Camino",
      role: "CEO, Acr\u00f3nimo Spirits",
    },
    {
      quote:
        "Alpha Digital helped us turn a simple idea into a powerful AI insurance comparison platform. Users now upload their quotes and instantly get clean charts, summaries, and recommendations.",
      name: "Mohammad Farah",
      role: "Hakem.ai",
    },
    {
      quote:
        "We handle debt agreements that are hundreds of pages long. The AI now finds key clauses, highlights covenants, and shows page numbers in seconds. What used to take days now takes minutes.",
      name: "Jeff Wallace",
      role: "Debt Compliance Services LLC",
    },
    {
      quote:
        "Alpha Digital built an AI-powered SMS system that feels like magic. Our customers text a normal number, but every reply comes from AI. It cut response times without hiring extra staff.",
      name: "James Stayton",
      role: "Sensible Driver",
    },
    {
      quote:
        "Alpha Digital automated our workflow using Zapier and connected everything to Salesforce. The system now updates client review dates on its own, and it keeps our CRM clean and accurate.",
      name: "Brionne Moss",
      role: "MossyLand LLC",
    },
  ] as Testimonial[],
  logos: ["Inktel", "Acr\u00f3nimo Spirits", "Hakem.ai", "MossyLand LLC", "Sensible Driver", "Debt Compliance Services"],
};

// Same testimonials, reshaped for the TestimonialCard shuffle-stack component.
export const shuffleTestimonials: ShuffleTestimonial[] = [
  {
    id: 1,
    testimonial:
      "Working with Alpha Digital helped us improve our marketing flow and creative output. Their ideas were clear, fast, and easy to apply. Our campaigns now look stronger and feel more connected across all channels.",
    author: "Leana Garcia \u2013 Director of Marketing & Creative Services, Inktel",
  },
  {
    id: 2,
    testimonial:
      "Alpha Digital helped us organize our digital marketing and reach the right customers at the right time. Their strategies were simple to follow and brought steady improvement.",
    author: "Nelson Flores-Giacometto \u2013 Director of Marketing, Gallo",
  },
  {
    id: 3,
    testimonial:
      "Alpha Digital helped us grow online with better content, design, and structure. Everything became easier for our users, and our message reached more people.",
    author: "Joseph Kelly \u2013 CEO, Spiritual Guidance",
  },
  {
    id: 4,
    testimonial:
      "Alpha Digital's branding and marketing ideas helped us connect with customers in a more meaningful way. Our online presence improved, our story became clearer, and our sales grew.",
    author: "Alessandra Camino \u2013 CEO, Acr\u00f3nimo Spirits",
  },
  {
    id: 5,
    testimonial:
      "Alpha Digital helped us turn a simple idea into a powerful AI insurance comparison platform. Users now upload their quotes and instantly get clean charts, summaries, and recommendations.",
    author: "Mohammad Farah \u2013 Hakem.ai",
  },
  {
    id: 6,
    testimonial:
      "We handle debt agreements that are hundreds of pages long. The AI now finds key clauses, highlights covenants, and shows page numbers in seconds. What used to take days now takes minutes.",
    author: "Jeff Wallace \u2013 Debt Compliance Services LLC",
  },
  {
    id: 7,
    testimonial:
      "Alpha Digital built an AI-powered SMS system that feels like magic. Our customers text a normal number, but every reply comes from AI. It cut response times without hiring extra staff.",
    author: "James Stayton \u2013 Sensible Driver",
  },
  {
    id: 8,
    testimonial:
      "Alpha Digital automated our workflow using Zapier and connected everything to Salesforce. The system now updates client review dates on its own, and it keeps our CRM clean and accurate.",
    author: "Brionne Moss \u2013 MossyLand LLC",
  },
];

// ---------- 10. Where We're Located ----------

export const locationsContent = {
  eyebrow: "Global Reach",
  headline: "Where We're Located",
  subheadline: "One team, four countries. We work with clients across the USA, Canada, UAE, and Pakistan.",
};

// Hub-and-spoke from the Mobile, AL headquarters to each served country.
export const officeDots: MapDot[] = [
  {
    start: { lat: 30.6944, lng: -88.0431, label: "Mobile, USA" },
    end: { lat: 43.6532, lng: -79.3832, label: "Toronto, Canada" },
  },
  {
    start: { lat: 30.6944, lng: -88.0431, label: "Mobile, USA" },
    end: { lat: 25.2048, lng: 55.2708, label: "Dubai, UAE" },
  },
  {
    start: { lat: 30.6944, lng: -88.0431, label: "Mobile, USA" },
    end: { lat: 33.6844, lng: 73.0479, label: "Islamabad, Pakistan" },
  },
];

// ---------- 11. Mid-Page CTA Banner ----------

export const midCtaContent = {
  headline: "Ready to See What's Actually Possible for Your Site?",
  subheadline: "Get a free breakdown of your current SEO and marketing setup, no strings attached.",
  cta: { label: "Get My Free Audit", href: "#lead-form" } as CtaLink,
};

// ---------- 12. Guides & Resources (Blog Preview) ----------

export const guidesContent = {
  eyebrow: "Guides & Resources",
  headline: "Straightforward Answers to Common Marketing Questions",
  subheadline: "Practical guides on SEO, branding, and AI marketing, written to actually be useful, not just to fill space.",
  cardsNote: "Pull the 3 most recent posts automatically, sorted by publish date.",
  cta: { label: "See All Guides", href: "/blog/" } as CtaLink,
};

// ---------- 13. Instagram Feed ----------

export const instagramContent = {
  headline: "Follow Along on Instagram",
  handle: "@AlphaDigital",
  note: "Live grid of the latest 8 posts, links out to the profile.",
};

// ---------- 14. FAQ ----------

export const faqContent = {
  headline: "Common Questions About Working With a Digital Marketing Agency",
  authorNote: "Answered by Alpha Digital's strategy team.",
  faqs: [
    {
      question: "How long does SEO take to show results?",
      answer:
        "Most businesses start seeing measurable movement within 3 to 6 months. SEO builds over time rather than overnight, but the gains tend to last much longer than paid ads once they land.",
    },
    {
      question: "Do I need SEO and PPC, or just one?",
      answer:
        "It depends on your timeline. PPC brings traffic right away while SEO is still building. Most businesses run both early on, then lean more on SEO as rankings improve.",
    },
    {
      question: "What makes a digital marketing agency worth hiring instead of doing it in-house?",
      answer:
        "An agency brings tools, tested processes, and a team that's already solved the problems you're about to run into. That said, it works best when the agency actually explains its strategy instead of treating it as a black box.",
    },
    {
      question: "How is AI changing SEO right now?",
      answer:
        "Search is expanding beyond the classic list of blue links. People now get answers directly from AI tools like ChatGPT and Google AI Overviews. That means content needs to be clear and well-structured enough for both people and AI systems to understand and cite.",
    },
    {
      question: "How much should I expect to spend on digital marketing?",
      answer:
        "It varies a lot by industry and goals. A realistic starting range gets discussed during a free audit once we understand your current traffic, competition, and goals.",
    },
    {
      question: "Can a small business compete with bigger brands in search results?",
      answer:
        "Yes, especially with SEO. Search rankings reward relevance and topical depth, not just budget size. A focused local or niche strategy can outrank a bigger competitor with a broader, less specific approach.",
    },
  ] as FaqItem[],
};

// ---------- 15. Final Contact Section ----------

export const contactContent = {
  headline: "Let's Talk About Your Marketing",
  subheadline: "Tell us a bit about your business and what you're trying to achieve. We'll follow up with next steps.",
  contactInfo: {
    location: "8708 5650 Old Pascagoula Rd, Mobile, AL 36619",
    phone: "+1 201-778-4431",
    email: "contact.us@alphadigital.live",
  },
  fields: ["First Name", "Last Name", "Email Address", "Phone Number", "Service (dropdown)", "Message"],
  cta: { label: "Get My Free Consultation", href: "#" } as CtaLink,
};

// ---------- Internal Linking Map (reference only, not rendered) ----------

export const internalLinkingMap = [
  { anchorText: "SEO services", href: "/seo-services-usa" },
  { anchorText: "AI search optimization", href: "/aeo-geo-services" },
  { anchorText: "web development services", href: "/web-mvp-development" },
  { anchorText: "MVP development", href: "/web-mvp-development" },
  { anchorText: "AI automation services", href: "/ai-marketing-automation" },
  { anchorText: "branding services", href: "/branding-services" },
  { anchorText: "PPC management", href: "/ppc-management-services" },
  { anchorText: "social media marketing", href: "/social-media-marketing" },
  { anchorText: "email marketing services", href: "/email-marketing-services" },
];
