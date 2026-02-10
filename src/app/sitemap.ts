// app/sitemap.ts
// Next.js automatically serves this at /sitemap.xml

import type { MetadataRoute } from "next";

const SITE_URL = "https://fqhctalent.com";

// California metro areas for location pages
const locationSlugs = [
  "los-angeles",
  "san-diego",
  "san-francisco-bay-area",
  "sacramento",
  "fresno",
  "riverside-san-bernardino",
];

// Blog post slugs — add new posts here as you publish them
const blogSlugs = [
  "medi-cal-funding-cuts-community-health-workers",
  "what-is-enhanced-care-management-ecm",
  "fqhc-community-health-worker-salary-california",
  "how-to-write-fqhc-resume",
  "ecm-ccm-community-supports-explained",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/join`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/directory`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/for-job-seekers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/for-employers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Location pages
  const locationPages: MetadataRoute.Sitemap = locationSlugs.map((slug) => ({
    url: `${SITE_URL}/fqhc-jobs-${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic job listing pages — pull from your database
  // Uncomment and adapt when you have jobs in Supabase:
  //
  // const { data: jobs } = await supabase
  //   .from("jobs")
  //   .select("slug, updated_at")
  //   .eq("status", "active");
  //
  // const jobPages: MetadataRoute.Sitemap = (jobs || []).map((job) => ({
  //   url: `${SITE_URL}/jobs/${job.slug}`,
  //   lastModified: new Date(job.updated_at),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.7,
  // }));

  return [...staticPages, ...locationPages, ...blogPages];
}
