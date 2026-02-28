// lib/seo-config.ts
// Central SEO configuration for all pages

export const SITE_URL = "https://www.fqhctalent.com";
export const SITE_NAME = "FQHC Talent Exchange";
export const SITE_DESCRIPTION =
  "The only talent platform built exclusively for Federally Qualified Health Centers. Find FQHC jobs in California — community health workers, care coordinators, behavioral health specialists, and more.";

// Root layout metadata — merge this into your existing layout.tsx
export const rootMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FQHC Talent Exchange | FQHC Jobs & Community Health Careers",
    template: "%s | FQHC Talent Exchange",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "FQHC jobs",
    "FQHC jobs California",
    "community health worker jobs",
    "FQHC staffing",
    "community health center careers",
    "enhanced care management jobs",
    "care coordinator jobs",
    "FQHC recruitment",
    "community health worker resume",
    "Medi-Cal jobs",
    "safety net healthcare jobs",
    "CHW jobs",
    "promotora jobs",
    "FQHC talent",
    "healthcare talent California",
    "behavioral health specialist FQHC",
    "OCHIN Epic jobs",
    "chronic care management jobs",
    "ECM jobs California",
    "FQHC hiring",
  ],
  authors: [{ name: "FQHC Talent Exchange" }],
  creator: "FQHC Talent Exchange",
  publisher: "FQHC Talent Exchange",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "FQHC Talent Exchange | Find Your Next Community Health Role",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "FQHC Talent Exchange | FQHC Jobs & Community Health Careers",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      // "es-US": `${SITE_URL}/es`, // Uncomment when Spanish version is ready
    },
  },
  verification: {
    // Add these once you have accounts set up:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  other: {
    "theme-color": "#0d9488", // Teal-600 to match your brand
  },
};

// Per-page metadata — use these in individual page files
export const pageMetadata = {
  jobs: {
    title: "FQHC Jobs in California | Community Health Center Careers",
    description:
      "Browse open positions at Federally Qualified Health Centers across California. Community health workers, care coordinators, behavioral health specialists, nurses, and more. 100% free for job seekers.",
    openGraph: {
      title: "FQHC Jobs in California",
      description:
        "Find community health center jobs across California. Free for candidates.",
      url: `${SITE_URL}/jobs`,
    },
    alternates: { canonical: `${SITE_URL}/jobs` },
  },
  forJobSeekers: {
    title:
      "For Job Seekers | Free FQHC Job Placement & Career Support",
    description:
      "Get matched with FQHC jobs across California — completely free. We advocate for community health workers, care coordinators, and clinic professionals with personalized placement support.",
    openGraph: {
      title: "For Job Seekers — FQHC Talent Exchange",
      description:
        "Free job placement for community health professionals. Get your first employer introduction in 5 days.",
      url: `${SITE_URL}/for-job-seekers`,
    },
    alternates: { canonical: `${SITE_URL}/for-job-seekers` },
  },
  forEmployers: {
    title: "For Employers | FQHC Staffing & Recruitment Solutions",
    description:
      "Fill critical FQHC roles faster with pre-vetted community health professionals. We specialize in ECM, CCM, Community Supports, and clinical staffing for Federally Qualified Health Centers.",
    openGraph: {
      title: "For Employers — FQHC Talent Exchange",
      description:
        "Pre-vetted FQHC talent. Average 21-day placement. We know community health staffing.",
      url: `${SITE_URL}/for-employers`,
    },
    alternates: { canonical: `${SITE_URL}/for-employers` },
  },
  blog: {
    title: "FQHC Career Resources & Community Health Insights",
    description:
      "Expert insights on FQHC careers, Medi-Cal program updates, community health worker career guides, salary data, and hiring trends for Federally Qualified Health Centers.",
    openGraph: {
      title: "Blog — FQHC Talent Exchange",
      description:
        "FQHC career resources, Medi-Cal updates, and community health insights.",
      url: `${SITE_URL}/blog`,
    },
    alternates: { canonical: `${SITE_URL}/blog` },
  },
  directory: {
    title: "California FQHC Directory | Find Community Health Centers",
    description:
      "Browse 50+ Federally Qualified Health Centers across California. Search by region, EHR system, and programs. Find FQHCs in Los Angeles, San Diego, Bay Area, Sacramento, and more.",
    openGraph: {
      title: "California FQHC Directory — FQHC Talent Exchange",
      description:
        "Searchable directory of 50+ FQHCs across California with programs, EHR systems, and locations.",
      url: `${SITE_URL}/directory`,
    },
    alternates: { canonical: `${SITE_URL}/directory` },
  },
  resources: {
    title: "FQHC Career Resources | Salary Guides, Tools & Links",
    description:
      "Guides, salary data, tools, and links for community health professionals. Resume builder, FQHC directory, career assessment, and external resources for FQHC workers in California.",
    openGraph: {
      title: "Career Resources — FQHC Talent Exchange",
      description:
        "Salary guides, career tools, and resources for FQHC professionals in California.",
      url: `${SITE_URL}/resources`,
    },
    alternates: { canonical: `${SITE_URL}/resources` },
  },
  insights: {
    title:
      "FQHC Executive Dashboard | Market Intelligence, Policy Tracking & Workforce Data",
    description:
      "Real-time intelligence for FQHC executives — legislation tracking, funding cliff countdowns, workforce displacement data, undocumented access policy watch, and change management strategy for California community health centers.",
    openGraph: {
      title: "FQHC Executive Intelligence Dashboard",
      description:
        "Legislation, funding, workforce, and strategy — what California FQHC leaders need to know today.",
      url: `${SITE_URL}/insights`,
    },
    alternates: { canonical: `${SITE_URL}/insights` },
  },
  guides: {
    title:
      "FQHC Workplace Guides | Clinical Workflows, Billing & Revenue for Health Center Workers",
    description:
      "Practical how-to guides for FQHC workers — ECM workflows, RN co-visit billing, PPS revenue mechanics, CalAIM programs, and documentation standards. Primary sources from HRSA, CMS, and DHCS.",
    openGraph: {
      title: "Workplace Guides — FQHC Talent Exchange",
      description:
        "How ECM works, how billing works, and how your role drives revenue at an FQHC. Practical guides with primary sources.",
      url: `${SITE_URL}/guides`,
    },
    alternates: { canonical: `${SITE_URL}/guides` },
  },
  privacy: {
    title: "Privacy Policy | FQHC Talent Exchange",
    description:
      "Learn how FQHC Talent Exchange collects, uses, and protects your personal information. We are committed to transparency and data privacy for all job seekers and employers.",
    openGraph: {
      title: "Privacy Policy — FQHC Talent Exchange",
      description: "How we handle your data at FQHC Talent Exchange.",
      url: `${SITE_URL}/privacy`,
    },
    alternates: { canonical: `${SITE_URL}/privacy` },
  },
  terms: {
    title: "Terms of Service | FQHC Talent Exchange",
    description:
      "Terms of service for using FQHC Talent Exchange, the talent platform connecting community health professionals with Federally Qualified Health Centers in California.",
    openGraph: {
      title: "Terms of Service — FQHC Talent Exchange",
      description: "Terms of service for FQHC Talent Exchange.",
      url: `${SITE_URL}/terms`,
    },
    alternates: { canonical: `${SITE_URL}/terms` },
  },
  whyFqhc: {
    title: "Why Work at an FQHC? | Career Growth, Loan Repayment & Mission-Driven Healthcare",
    description:
      "Discover why mission-driven healthcare professionals choose FQHCs over hospital systems and private practice. Faster career growth, NHSC loan repayment ($50K–$75K tax-free), broader scope of practice, and meaningful impact serving California's underserved communities.",
    openGraph: {
      title: "Why Work at an FQHC? — FQHC Talent Exchange",
      description:
        "Lead sooner. Impact more. Earn more than you think. See how FQHC careers compare to hospitals and private practice.",
      url: `${SITE_URL}/why-fqhc`,
    },
    alternates: { canonical: `${SITE_URL}/why-fqhc` },
  },
  demo: {
    title: "Platform Demo | See FQHC Talent Exchange in Action",
    description:
      "Take a visual tour of FQHC Talent Exchange — California's only talent platform built for community health centers. See our FQHC directory, job search, resume builder, career assessment, and market intelligence tools.",
    openGraph: {
      title: "Platform Demo — FQHC Talent Exchange",
      description:
        "See how we connect community health professionals with FQHCs across California.",
      url: `${SITE_URL}/demo`,
    },
    alternates: { canonical: `${SITE_URL}/demo` },
  },
  about: {
    title:
      "About FQHC Talent Exchange | Our Mission to Strengthen Community Health",
    description:
      "FQHC Talent Exchange connects displaced community health workers with Federally Qualified Health Centers across California. Learn about our mission and why we built the only talent platform dedicated to community health.",
    openGraph: {
      title: "About — FQHC Talent Exchange",
      description:
        "The only talent platform built exclusively for FQHCs. Learn about our mission.",
      url: `${SITE_URL}/about`,
    },
    alternates: { canonical: `${SITE_URL}/about` },
  },
  careerRoadmap: {
    title: "FQHC Career Roadmap | Career Paths & Salary Progression in California",
    description:
      "Explore 5 career pathways in California FQHCs — from entry-level to leadership. See salary ranges by region, required certifications, and skills at every level.",
    openGraph: {
      title: "Career Roadmap — FQHC Talent Exchange",
      description:
        "5 career tracks with California salary data, certifications, and regional adjustments.",
      url: `${SITE_URL}/career-roadmap`,
    },
    alternates: { canonical: `${SITE_URL}/career-roadmap` },
  },
  certifications: {
    title: "FQHC Certifications | California Certification Guide for Community Health",
    description:
      "15 certifications for California FQHC careers — costs, duration, salary impact, and where to get them. CHW Certificate, CCM, CPC, LCSW, BLS, OCHIN Epic, and more.",
    openGraph: {
      title: "Certification Catalog — FQHC Talent Exchange",
      description:
        "California-specific certification guide for FQHC careers. Costs, salary impact, and training programs.",
      url: `${SITE_URL}/certifications`,
    },
    alternates: { canonical: `${SITE_URL}/certifications` },
  },
  careerInsights: {
    title: "FQHC Career Assessment | Discover Your Strengths in Community Health",
    description:
      "Take a free 4-minute career assessment across 5 behavioral domains. Get personalized insights, a 90-day onboarding plan, and certification recommendations for your FQHC role.",
    openGraph: {
      title: "Career Assessment — FQHC Talent Exchange",
      description:
        "Free career assessment for FQHC professionals. Get personalized insights and a 90-day plan.",
      url: `${SITE_URL}/career-insights`,
    },
    alternates: { canonical: `${SITE_URL}/career-insights` },
  },
  strategyGuides: {
    title: "FQHC Executive Guides | Real Case Studies with Strategic Framework",
    description:
      "How real FQHCs are solving funding, workforce, and operational challenges — structured around Rumelt's Good Strategy framework. PureView, MCR Health, Highland Health, Sun River Health case studies with measurable outcomes.",
    openGraph: {
      title: "Executive Guides — FQHC Talent Exchange",
      description:
        "Real FQHC case studies: federal dependency reduction, revenue diversification, AI implementation, and 340B optimization.",
      url: `${SITE_URL}/strategy/guides`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/guides` },
  },
  strategyOKRs: {
    title: "FQHC OKR Templates | Crisis Change Management for Health Centers",
    description:
      "12 ready-to-use OKR templates for FQHC crisis change management — revenue resilience, workforce retention, patient access, operational efficiency, and cross-department alignment. Break silos, track progress, execute strategy.",
    openGraph: {
      title: "OKR Templates — FQHC Talent Exchange",
      description:
        "OKR templates for FQHC leaders facing funding cuts, workforce disruption, and operational challenges.",
      url: `${SITE_URL}/strategy/okrs`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/okrs` },
  },
  strategyCaseStudies: {
    title: "FQHC Case Studies | Real Solutions to Funding & Workforce Challenges",
    description:
      "How FQHCs are reducing federal dependency, diversifying revenue, implementing AI, and retaining workforce — with measurable outcomes and primary source links.",
    openGraph: {
      title: "Case Studies — FQHC Talent Exchange",
      description:
        "Real FQHC case studies with verified outcomes: revenue growth, federal dependency reduction, AI adoption.",
      url: `${SITE_URL}/strategy/case-studies`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/case-studies` },
  },
  aiTracker: {
    title: "FQHC AI Tracker | AI Adoption in Community Health Centers",
    description:
      "Monitor artificial intelligence adoption at FQHCs nationwide — clinical documentation, revenue cycle, scheduling, care coordination, and population health. Track vendors, partnerships, metrics, and adoption stages.",
    openGraph: {
      title: "AI Tracker — FQHC Talent Exchange",
      description:
        "Tracking AI implementation across FQHCs: ambient documentation, revenue cycle automation, scheduling, and care coordination.",
      url: `${SITE_URL}/ai-tracker`,
    },
    alternates: { canonical: `${SITE_URL}/ai-tracker` },
  },
  newsletter: {
    title: "FQHC Intelligence Briefings | Weekly Executive & Career Updates",
    description:
      "Subscribe to weekly FQHC intelligence: Intel Brief for executives (policy, funding, AI adoption) and The Pulse for job seekers (listings, salary trends, career tools). Every insight backed by primary sources.",
    openGraph: {
      title: "Newsletter — FQHC Talent Exchange",
      description:
        "Weekly FQHC intelligence briefings for executives and job seekers. Policy, funding, AI, career updates.",
      url: `${SITE_URL}/newsletter`,
    },
    alternates: { canonical: `${SITE_URL}/newsletter` },
  },
  teamReadiness: {
    title: "Team Readiness Assessment for FQHC Managers | Leadership Tool",
    description:
      "Assess your team's readiness across 5 behavioral domains. Built for FQHC managers, supervisors, and directors. Get personalized management actions, Liberating Structures, and team-building strategies.",
    openGraph: {
      title: "Team Readiness Assessment — FQHC Talent Exchange",
      description:
        "Assess your FQHC team's readiness with our 5-domain leadership assessment. Get management actions and team-building tools.",
      url: `${SITE_URL}/team-readiness`,
    },
    alternates: { canonical: `${SITE_URL}/team-readiness` },
  },
};

// California metro areas for location pages
export const californiaMetros = [
  {
    slug: "los-angeles",
    city: "Los Angeles",
    region: "Los Angeles County",
    description:
      "Los Angeles County has the highest concentration of FQHCs in California, serving over 1.5 million patients. Find community health jobs across LA's extensive network of community clinics.",
    fqhcCount: "70+",
  },
  {
    slug: "san-diego",
    city: "San Diego",
    region: "San Diego County",
    description:
      "San Diego's FQHCs serve diverse border communities with specialized programs in behavioral health and chronic disease management. Find FQHC jobs in San Diego County.",
    fqhcCount: "15+",
  },
  {
    slug: "san-francisco-bay-area",
    city: "San Francisco Bay Area",
    region: "Bay Area",
    description:
      "The Bay Area's FQHCs span San Francisco, Oakland, San Jose, and surrounding communities, serving some of California's most diverse patient populations.",
    fqhcCount: "40+",
  },
  {
    slug: "sacramento",
    city: "Sacramento",
    region: "Sacramento County",
    description:
      "Sacramento's FQHCs serve the capital region with growing programs in Enhanced Care Management and behavioral health integration.",
    fqhcCount: "10+",
  },
  {
    slug: "fresno",
    city: "Fresno",
    region: "Central Valley",
    description:
      "The Central Valley's FQHCs serve California's agricultural heartland, with high demand for bilingual community health workers and promotoras.",
    fqhcCount: "15+",
  },
  {
    slug: "riverside-san-bernardino",
    city: "Riverside & San Bernardino",
    region: "Inland Empire",
    description:
      "The Inland Empire's rapidly growing FQHC network is expanding to meet the needs of one of California's fastest-growing regions.",
    fqhcCount: "20+",
  },
];
