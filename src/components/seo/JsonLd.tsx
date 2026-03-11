// components/seo/JsonLd.tsx
// Drop this component into your layout or individual pages

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FQHC Talent",
    url: "https://www.fqhctalent.com",
    logo: "https://www.fqhctalent.com/logo.png",
    description:
      "California's FQHC strategic intelligence platform — executive dashboards, workforce data, policy tracking, free career tools, and 220+ FQHC profiles for the leaders and professionals navigating community health.",
    sameAs: [
      // Add your social profiles here
      // "https://www.linkedin.com/company/fqhc-talent-exchange",
      // "https://twitter.com/fqhctalent",
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
    knowsAbout: [
      "Federally Qualified Health Centers",
      "FQHC Strategic Intelligence",
      "Community Health Workforce",
      "Medicaid Policy Tracking",
      "FQHC Resilience Scoring",
      "Enhanced Care Management",
      "CalAIM Programs",
      "Healthcare AI Adoption",
      "FQHC Salary Intelligence",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FQHC Talent",
    url: "https://www.fqhctalent.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.fqhctalent.com/jobs?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Use this on individual job listing pages
export function JobPostingJsonLd({
  title,
  description,
  datePosted,
  validThrough,
  employmentType,
  hiringOrganization,
  city,
  state,
  salaryMin,
  salaryMax,
  salaryUnit = "YEAR",
  qualifications,
  programs,
  ehrSystems,
}: {
  title: string;
  description: string;
  datePosted: string; // ISO 8601 format: "2026-01-15"
  validThrough: string; // ISO 8601 format: "2026-03-15"
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "TEMPORARY";
  hiringOrganization: {
    name: string;
    url?: string;
    logo?: string;
  };
  city: string;
  state: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryUnit?: "HOUR" | "YEAR";
  qualifications?: string[];
  programs?: string[]; // e.g., ["ECM", "CCM", "Community Supports"]
  ehrSystems?: string[]; // e.g., ["OCHIN Epic", "NextGen"]
}) {
  // Build enhanced description with program and EHR info
  let enhancedDescription = description;
  if (programs?.length) {
    enhancedDescription += `\n\nProgram Experience: ${programs.join(", ")}`;
  }
  if (ehrSystems?.length) {
    enhancedDescription += `\n\nEHR Systems: ${ehrSystems.join(", ")}`;
  }

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description: enhancedDescription,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: hiringOrganization.name,
      ...(hiringOrganization.url && { sameAs: hiringOrganization.url }),
      ...(hiringOrganization.logo && { logo: hiringOrganization.logo }),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: state,
        addressCountry: "US",
      },
    },
    applicantLocationRequirements: {
      "@type": "State",
      name: state,
    },
    industry: "Healthcare",
    occupationalCategory: "29-0000",
  };

  if (salaryMin && salaryMax) {
    data.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: salaryMin,
        maxValue: salaryMax,
        unitText: salaryUnit,
      },
    };
  }

  if (qualifications?.length) {
    data.qualifications = qualifications.join(". ");
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Use this on blog/resource pages
export function ArticleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  slug,
  imageUrl,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  imageUrl?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url: `https://www.fqhctalent.com/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "FQHC Talent",
      url: "https://www.fqhctalent.com",
    },
    publisher: {
      "@type": "Organization",
      name: "FQHC Talent",
      url: "https://www.fqhctalent.com",
    },
    ...(imageUrl && { image: imageUrl }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.fqhctalent.com/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// FAQ structured data for rich results
export function FAQPageJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Course structured data for Google rich results
export function CourseJsonLd({
  name,
  description,
  url,
  provider,
  duration,
  isAccessibleForFree = true,
  inLanguage = ["en", "es"],
}: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  duration?: string;
  isAccessibleForFree?: boolean;
  inLanguage?: string[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url,
    isAccessibleForFree,
    inLanguage,
    ...(duration && { timeRequired: duration }),
    provider: {
      "@type": "Organization",
      name: provider || "FQHC Talent",
      url: "https://www.fqhctalent.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "Free",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Breadcrumb structured data
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
