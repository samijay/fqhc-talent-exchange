// components/seo/JsonLd.tsx
// Drop this component into your layout or individual pages

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FQHC Talent Exchange",
    url: "https://www.fqhctalent.com",
    logo: "https://www.fqhctalent.com/logo.png",
    description:
      "The only talent platform built exclusively for Federally Qualified Health Centers. Connecting mission-driven professionals with community health organizations across California.",
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
      "Community Health Workers",
      "Enhanced Care Management",
      "Chronic Care Management",
      "Medi-Cal",
      "FQHC Staffing",
      "Healthcare Recruitment",
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
    name: "FQHC Talent Exchange",
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
    publisher: {
      "@type": "Organization",
      name: "FQHC Talent Exchange",
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
      "@type": "ListItemElement",
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
