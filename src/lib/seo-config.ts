// lib/seo-config.ts
// Central SEO configuration for all pages

export const SITE_URL = "https://fqhctalent.com";
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
    images: [
      {
        url: `${SITE_URL}/og-image.png`, // Create a 1200x630 OG image
        width: 1200,
        height: 630,
        alt: "FQHC Talent Exchange — Connecting community health professionals with FQHCs across California",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FQHC Talent Exchange | FQHC Jobs & Community Health Careers",
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
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
