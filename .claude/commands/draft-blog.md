# Draft Blog Article

Analyze current FQHC data and draft a new bilingual blog article for the FQHC Talent Exchange blog.

## Arguments

If a topic is provided after the command (e.g., `/draft-blog CalAIM funding changes`), use that topic. Otherwise, follow the topic selection process below.

## Step 1: Topic Selection (if no topic provided)

Analyze the codebase data to suggest timely topics:

1. Read `src/lib/california-fqhc-layoffs.ts` — any new layoffs or trends since the last article?
2. Read `src/lib/fqhc-job-listings.ts` — count by role type, any hiring patterns worth covering?
3. Read `src/lib/funding-impact-data.ts` — upcoming funding cliffs or policy changes?
4. Read `src/lib/market-intelligence.ts` — market trends worth reporting?
5. Use WebSearch to check for recent FQHC or Medi-Cal news in California

Based on this, suggest **3 topic ideas** with:
- Proposed title (EN)
- One-sentence pitch
- Which data from the codebase supports it

**Wait for the founder to pick a topic before proceeding.**

## Step 2: Read the Template

Read this article as the template to follow exactly:
`src/app/[locale]/blog/healthcare-hiring-trends-2026/page.tsx`

Note the exact structure:
- `"use client"` directive
- Imports: `Link` from `next/link`, `useLocale` from `next-intl`, `ArticleJsonLd` and `BreadcrumbJsonLd` from `@/components/seo/JsonLd`, `TLDRCard` and `StatCallout` from `@/components/blog/BlogDataViz`
- `ArticleContent` interface definition
- `enContent` and `esContent` const objects
- Default export component with rendering logic

Also read `src/components/blog/BlogDataViz.tsx` to understand the available data visualization components (TLDRCard, StatCallout, and any others).

## Step 3: Draft the Article

Write a complete article following these quality guidelines:

### Content Quality
- Use **real data** from the codebase — actual salary ranges, layoff counts, job listing numbers, FQHC names
- Include **specific California/FQHC context** — not generic healthcare content
- Make it **actionable** — every article should help a job seeker or employer take a next step
- Write at an 8th-grade reading level — clear and accessible
- Target **800-1,200 words** for the EN version

### Citations (MANDATORY — every article must have sources)
- **Every statistical claim, dollar amount, percentage, or policy reference MUST have an inline source link**
- Use this format for inline links: `<a href="URL" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">linked text</a>`
- **Primary source hierarchy**: Government (HRSA, CMS, DHCS, BLS, EDD) > Policy orgs (KFF, NACHC, CHCF, CPCA) > Industry pubs > News
- Use WebSearch to find and verify primary source URLs for every claim
- **Every article MUST end with a Sources section** (before the CTA/related articles):
```tsx
{/* Sources */}
<div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700">
  <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
    {isEs ? "Fuentes" : "Sources"}
  </h2>
  <ol className="list-decimal list-inside space-y-2 text-sm text-stone-600 dark:text-stone-400">
    <li><a href="URL" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Source Title</a> — Organization, Date</li>
  </ol>
</div>
```
- The Sources section must appear in BOTH English and Spanish versions
- **Minimum 5 primary sources per article** — if you can't find 5, the article needs more research
- If a source URL can't be verified, use {/* TODO: verify source */} so it gets caught in review

### Structure
- **TLDRCard** with 3-4 key takeaways near the top
- **StatCallout** with at least one compelling number
- **4-6 sections** with clear headings
- Each section has 2-3 paragraphs or a mix of paragraphs and lists
- **CTA section** at the bottom linking to relevant tools (resume builder, career assessment, jobs, fast-track)
- **3 related articles** from existing blog posts

### Bilingual
- Write the full EN version first (`enContent`)
- Then write the full ES version (`esContent`) — this should be a natural Spanish translation, NOT machine-translated. Use the same tone and data but write it as a Spanish-speaking healthcare professional would read it.
- All metadata must be bilingual: category, title, description, breadcrumbTitle, dateDisplay, readTime

### SEO
- Title should include "FQHC" or "community health" for search relevance
- Description should be 150-160 characters
- Include relevant terms: California, Medi-Cal, FQHC, community health, specific role names

## Step 4: Present for Review

Show the complete article content — both EN and ES versions — and wait for approval. Highlight:
- Word count
- Data points used from the codebase
- **Source count and list** — every article must cite ≥5 primary sources with working URLs
- Any claims where a primary source couldn't be found (flagged with TODO)

**Wait for approval before creating any files.**

## Step 5: Create the Files

After approval:

### 5a. Create the article page

Create: `src/app/[locale]/blog/{slug}/page.tsx`

The slug should be:
- Lowercase, hyphenated
- Include "fqhc" if relevant
- Be descriptive but not too long (4-8 words)

### 5b. Update the blog index

Read `src/app/[locale]/blog/page.tsx` and add the new article to the `posts` array as the **FIRST entry** (newest first). The entry format:

```typescript
{
  slug: "your-article-slug",
  title: "English Title",
  esTitle: "Spanish Title",
  description: "English description (150-160 chars)",
  esDescription: "Spanish description",
  date: "February 17, 2026",       // Today's date in this format
  esDate: "17 de febrero de 2026",  // Spanish date format
  category: "Category Name",
  esCategory: "Spanish Category",
  readTime: "X min read",
  esReadTime: "X min de lectura",
}
```

### 5c. Update the sitemap

Read `src/app/sitemap.ts` and add the new slug to the `blogSlugs` array.

### 5d. Build check

Run `npm run build` to verify the new article compiles without TypeScript errors.

## Step 6: Summary

Report:
- Article title and slug
- Word count (EN / ES)
- Data sources used
- Files created/modified
- Build result
