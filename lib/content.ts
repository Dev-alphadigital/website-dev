// Alpha Digital landing page copy.
// Sourced directly from the approved copy deck. Edit text here only,
// never inline inside a section component, so copy stays in one place.

export const heroContent = {
  headline: "A Digital Marketing Agency Built Around One Goal",
  headlineEmphasis: "More Right Customers",
  primaryCta: { label: "Get My Free Marketing Audit", href: "#lead-form" },
  secondaryCta: { label: "See Our Work", href: "/portfolio/" },
  trustLine: "70+ clients served across retail, finance, healthcare, and tech.",
};

export const servicesContent = {
  eyebrow: "What We Do",
  headline: "Marketing Services Built to Work Together",
  subheadline:
    "Pick one service or combine a few, since each one works with the others instead of running in isolation. Our SEO team shares keyword data with the people writing your ads. Developers build pages around what is already converting. One strategist tracks all of it, so nothing gets duplicated or falls through the cracks, and every channel points at the same goal: more of the right customers finding and choosing you.",
  services: [
    {
      name: "SEO",
      description: "Rank higher in search and turn that visibility into steady, repeatable traffic.",
      href: "/seo-services-usa",
      anchorText: "SEO services",
    },
    {
      name: "AI SEO & GEO",
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
      name: "Branding",
      description: "Build a look and voice that people remember and trust the second time they see it.",
      href: "/branding-services",
      anchorText: "branding services",
    },
    {
      name: "PPC",
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
  ],
  cta: { label: "View All Services", href: "#lead-form" },
};

export const leadFormContent = {
  headline: "Get Your Free Marketing Audit",
  subheadline:
    "We'll look at your site and your current marketing, then send you a short breakdown of what's working and what's holding you back. No cost, no obligation.",
  fields: ["Name", "Email", "Website URL"],
  ctaLabel: "Get My Free Audit",
  consentLine: "By submitting this form, you agree to our Terms & Conditions.",
  microTrust: ["No spam, ever", "Response within 1 business day", "Built for businesses of any size"],
};

export const industriesContent = {
  eyebrow: "Where We've Built Experience",
  headline: "Industries We Serve",
  subheadline: "The channels that work best change by industry. Here's where we've built the deepest experience.",
  industries: [
    {
      name: "Retail",
      href: "/industries/retail",
      description: "Product pages and campaigns built to turn browsers into repeat buyers.",
      image: "/industries/retail.webp",
    },
    {
      name: "Real Estate",
      href: "/industries/real-estate",
      description: "Local visibility and lead capture for agents, brokers, and property teams.",
      image: "/industries/real-estate.webp",
    },
    {
      name: "Logistics",
      href: "/industries/logistics",
      description: "Search and content that reaches decision-makers evaluating new providers.",
      image: "/industries/logistics.webp",
    },
    {
      name: "Law Firms",
      href: "/industries/law-firms",
      description: "Trust-building content and local SEO for practices that compete on reputation.",
      image: "/industries/law-firms.webp",
    },
    {
      name: "Insurance",
      href: "/industries/insurance",
      description: "Clear, compliant messaging that turns quote requests into policies.",
      image: "/industries/insurance.webp",
    },
    {
      name: "Healthcare",
      href: "/industries/healthcare",
      description: "Patient-facing content and local search built around HIPAA-aware best practices.",
      image: "/industries/healthcare.webp",
    },
  ],
  moreTile: { label: "See All Industries", href: "/industries/" },
};

export const portfolioContent = {
  eyebrow: "Our Work",
  headline: "Work We're Proud Of",
  subheadline: "A few examples of what changes when the strategy actually fits the business.",
  filters: ["All", "Branding", "Web Development", "Mobile Development", "SEO", "Performance Marketing", "AI"],
  projects: [
    {
      name: "Rayseen",
      category: "Branding",
      description: "A footwear brand that grew organic traffic to its product pages instead of relying on paid ads.",
      href: "/portfolio/rayseen",
      image: "/portfolio/rayseen.webp",
    },
    {
      name: "Acrónimo",
      category: "Branding",
      description: "A spirits brand that built search visibility around the exact terms its buyers search for.",
      href: "/portfolio/acronimo",
      image: "/portfolio/acronimo.webp",
    },
    {
      name: "Inktel",
      category: "Web Development",
      description: "A contact center solutions provider with a rebuilt site and AI tooling showcase.",
      href: "#",
      image: "/portfolio/inktel.webp",
    },
    {
      name: "Buena Vista Creative",
      category: "Branding",
      description: "A creative agency site built to highlight growth, acquisitions, and brand work.",
      href: "#",
      image: "/portfolio/buena-vista-creative.webp",
    },
    {
      name: "Hakem AI",
      category: "AI",
      description: "An AI-powered insurance comparison platform that turns uploaded quotes into instant summaries.",
      href: "#",
      image: "/portfolio/hakem-ai.webp",
    },
    {
      name: "Your HR Toolkit",
      category: "Web Development",
      description: "An HR resource platform built to give small businesses easy access to ready-to-use tools.",
      href: "#",
      image: "/portfolio/your-hr-toolkit.webp",
    },
  ],
  cta: { label: "View Full Portfolio", href: "/portfolio/" },
};

export const testimonialsContent = {
  eyebrow: "Satisfied Clients",
  headline: "What Our Clients Say",
  testimonials: [
    {
      id: 1,
      quote:
        "Working with Alpha Digital helped us improve our marketing flow and creative output. Their ideas were clear, fast, and easy to apply. Our campaigns now look stronger and feel more connected across all channels.",
      name: "Leana Garcia",
      role: "Director of Marketing & Creative Services, Inktel",
    },
    {
      id: 2,
      quote:
        "Alpha Digital helped us organize our digital marketing and reach the right customers at the right time. Their strategies were simple to follow and brought steady improvement.",
      name: "Nelson Flores-Giacometto",
      role: "Director of Marketing, Gallo",
    },
    {
      id: 3,
      quote:
        "Alpha Digital helped us grow online with better content, design, and structure. Everything became easier for our users, and our message reached more people.",
      name: "Joseph Kelly",
      role: "CEO, Spiritual Guidance",
    },
    {
      id: 4,
      quote:
        "Alpha Digital's branding and marketing ideas helped us connect with customers in a more meaningful way. Our online presence improved, our story became clearer, and our sales grew.",
      name: "Alessandra Camino",
      role: "CEO, Acrónimo Spirits",
    },
    {
      id: 5,
      quote:
        "Alpha Digital helped us turn a simple idea into a powerful AI insurance comparison platform. Users now upload their quotes and instantly get clean charts, summaries, and recommendations.",
      name: "Mohammad Farah",
      role: "Hakem.ai",
    },
    {
      id: 6,
      quote:
        "We handle debt agreements that are hundreds of pages long. The AI now finds key clauses, highlights covenants, and shows page numbers in seconds. What used to take days now takes minutes.",
      name: "Jeff Wallace",
      role: "Debt Compliance Services LLC",
    },
    {
      id: 7,
      quote:
        "Alpha Digital built an AI-powered SMS system that feels like magic. Our customers text a normal number, but every reply comes from AI. It cut response times without hiring extra staff.",
      name: "James Stayton",
      role: "Sensible Driver",
    },
  ],
};

export const locationsContent = {
  eyebrow: "Global Reach",
  headline: "Where We're Located",
  subheadline: "One team, four countries. We work with clients across the USA, Canada, UAE, and Pakistan.",
};

export const officeDots = [
  {
    start: { lat: 30.6944, lng: -88.0431, label: "Mobile, USA" },
    end: { lat: 43.6532, lng: -79.3832, label: "Ontario, Canada" },
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

export const caseStudiesContent = {
  eyebrow: "Proof, Not Promises",
  headline: "Case Studies",
  subheadline: "Real SEO programs built for real industries. Download the playbook for the one closest to your business.",
  studies: [
    {
      id: "fintech-seo",
      icon: "landmark" as const,
      industry: "Fintech",
      title: "SEO Services for Fintech Businesses",
      description:
        "How we build compliant, high-trust SEO programs for banks, lenders, and fintech platforms competing in one of the most regulated search categories online.",
      highlights: [
        "Compliance-safe technical SEO audit & fixes",
        "Content strategy built around trust & YMYL signals",
        "Visibility for regulated financial services terms",
        "Conversion-focused landing page recommendations",
      ],
      image: "/case-studies/fintech.webp" as string | undefined,
      // Placeholder link -- swap for the real downloadable resource.
      downloadHref: "#",
    },
    {
      id: "enterprise-retail-seo",
      icon: "building2" as const,
      industry: "Retail & Enterprises",
      title: "SEO Services for Retail & Enterprises",
      description:
        "How we structure SEO for large, multi-location retail and enterprise brands, balancing scale, governance, and consistent visibility across every market.",
      highlights: [
        "Multi-location & multi-brand technical SEO architecture",
        "Category and product page optimization at scale",
        "Content governance for large marketing teams",
        "Search visibility across new & existing store locations",
      ],
      image: "/case-studies/retail-enterprises.webp" as string | undefined,
      downloadHref: "#",
    },
  ],
};

export const midCtaContent = {
  headline: "See What's Actually Holding Your Site Back",
  subheadline:
    "We'll audit your SEO, page speed, and current marketing setup, then send a plain-language breakdown of what's working and what's costing you customers. No cost, no obligation.",
  cta: { label: "Get My Free Audit", href: "#lead-form" },
};

export const faqContent = {
  headline: "Frequently Asked Questions",
  faqs: [
    {
      question: "How long does SEO take to show results?",
      answer:
        "Most businesses see measurable movement in rankings and organic traffic within 3 to 6 months, with stronger compounding gains between months 6 and 12. SEO works by building trust with search engines through steady technical health, relevant content, and credible links, so results build gradually rather than appearing overnight like a paid ad click. The upside is durability: once rankings stabilize, they typically hold much longer than paid traffic, which stops the moment a campaign budget runs out. Actual timelines vary based on your site's history, competition level, and how much content and technical work is required upfront.",
    },
    {
      question: "Do I need SEO and PPC, or just one?",
      answer:
        "Most businesses benefit from running SEO and PPC together, especially early on. PPC delivers traffic and leads immediately, which matters while SEO is still building authority in the background, and the two channels share data: PPC keyword performance reveals which search terms actually convert, informing SEO content strategy, and vice versa. As organic rankings climb and start capturing consistent traffic, many businesses shift budget away from PPC and lean more heavily on SEO, since it costs less to sustain long-term. Whether you need both depends on your timeline, budget, and how competitive your industry is.",
    },
    {
      question: "What makes a digital marketing agency worth hiring instead of doing it in-house?",
      answer:
        "An agency brings tested processes, specialized tools, and a team that has already solved the problems your business is about to run into, saving the time and cost of learning through trial and error. You also get access to a full team, strategist, writer, designer, developer, instead of one in-house generalist trying to cover every channel. That said, hiring an agency only pays off when it operates transparently: the best partnerships involve the agency clearly explaining its strategy and reporting results in plain language, not treating the work as a black box you have to trust blindly.",
    },
    {
      question: "How is AI changing SEO right now?",
      answer:
        "Search is expanding beyond the classic list of blue links. People increasingly get answers directly from AI tools like ChatGPT, Google AI Overviews, and Gemini, which pull information from web content and summarize it rather than sending users to click through to a site. That shift means content needs to be structured clearly, with direct answers, defined headings, and factual accuracy, so both search engines and AI systems can understand, extract, and cite it. Businesses that adapt their content for this kind of clarity now are positioning themselves to stay visible as search traffic moves toward AI-generated answers.",
    },
    {
      question: "How much should I expect to spend on digital marketing?",
      answer:
        "Digital marketing budgets vary widely based on your industry, competition, and goals, so there's no single number that applies to every business. A local service business targeting a small geographic area typically needs a smaller budget than a national e-commerce brand competing in a crowded market. The most reliable way to get a realistic number is a free audit, where we review your current traffic, competitors, and growth goals, then recommend a starting budget and channel mix based on what similar businesses in your space are actually spending to see results.",
    },
    {
      question: "Can a small business compete with bigger brands in search results?",
      answer:
        "Yes, and SEO is one of the few marketing channels where budget size isn't the deciding factor. Search engines rank pages based on relevance and topical depth, not who spent the most money, which means a small business with a focused, specific strategy can outrank a much bigger competitor whose content is broader and less targeted. Local and niche strategies work especially well here: ranking for a specific service in a specific city is far more achievable than competing for a broad national keyword. The key is choosing focused targets instead of trying to compete everywhere at once.",
    },
  ],
};

export const contactContent = {
  headline: "Let's Talk About Your Marketing",
  subheadline: "Tell us a bit about your business and what you're trying to achieve. We'll follow up with next steps.",
  contactInfo: {
    location: "5650 Old Pascagoula Rd, Mobile, AL 36619",
    phone: "+1 201-778-4431",
    email: "contact.us@alphadigital.live",
  },
  fields: ["Name", "Email Address", "Number", "Service (dropdown)", "Message"],
  cta: { label: "Get My Free Consultation", href: "#" },
};

// Internal linking map, kept here for reference and for any future automated link auditing.
export const internalLinkingMap = [
  { anchor: "SEO services", href: "/seo-services-usa" },
  { anchor: "AI search optimization", href: "/aeo-geo-services" },
  { anchor: "web development services", href: "/web-mvp-development" },
  { anchor: "MVP development", href: "/web-mvp-development" },
  { anchor: "AI automation services", href: "/ai-marketing-automation" },
  { anchor: "branding services", href: "/branding-services" },
  { anchor: "PPC management", href: "/ppc-management-services" },
  { anchor: "social media marketing", href: "/social-media-marketing" },
  { anchor: "email marketing services", href: "/email-marketing-services" },
];
