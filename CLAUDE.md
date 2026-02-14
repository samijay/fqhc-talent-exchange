# Memory

## Me
Jonathan (jweingard@gmail.com), founder of FQHC Talent Exchange — a job marketplace connecting community health professionals with Federally Qualified Health Centers in California.

## Terms
| Term | Meaning |
|------|---------|
| FQHC | Federally Qualified Health Center |
| CHW | Community Health Worker |
| ECM | Enhanced Care Management (Medi-Cal program) |
| CCM | Complex Care Management |
| BH-ASO | Behavioral Health Administrative Services Organization |
| TCM | Targeted Case Management |
| EHR | Electronic Health Record |
| OCHIN Epic | Common FQHC EHR system |
| Medi-Cal | California's Medicaid program |

## Project: FQHC Talent Exchange
| Detail | Value |
|--------|-------|
| **Stack** | Next.js 16, React 19, TypeScript, Tailwind 4, Supabase |
| **URL** | https://fqhctalent.com |
| **Repo** | github.com/samijay/fqhc-talent-exchange |
| **UI** | shadcn/ui (New York style), teal/amber palette |
| **Hosting** | Vercel |
| **Regions** | LA, San Diego, SF Bay, Sacramento, Fresno, Riverside/SB |
| **Roles** | CHWs, care coordinators, medical assistants, case managers, behavioral health, dental, etc. |

## Active Priorities
- Mobile responsiveness polish
- New SEO-optimized blog content (English + Spanish)
- More content across all pages
- Employer portal / dashboard (future)
- Full assessment engine with matching algorithm (future)
- Talent Drop system (future — see pitch deck)

## Preferences
- Wants to review plans before code execution
- Uses Claude.ai Projects for content drafting, Cowork for implementation
- Prefers Git for backups (not OneDrive for code)
- Audience is bilingual (English/Spanish) healthcare workers in California
- NO Claude API integration for resume builder — uses template-based approach instead

## What's Built (Progress Log)

### Completed Features
| Feature | Status | Key Files | Notes |
|---------|--------|-----------|-------|
| **i18n (EN/ES)** | Done | `messages/en.json`, `messages/es.json`, `src/i18n/` | next-intl v4, `localePrefix: "as-needed"`, browser detection |
| **FQHC Directory** | Done | `src/app/[locale]/directory/page.tsx`, `src/lib/california-fqhcs.ts` | 87 CA FQHCs, interactive map, sheet modal, search/filter/sort |
| **FQHC Profile Pages** | Done | `src/app/[locale]/directory/[slug]/page.tsx` | SSG with generateStaticParams, org stats, jobs, salary table, benefits |
| **Job Listings** | Done | `src/app/[locale]/jobs/page.tsx`, `src/lib/fqhc-job-listings.ts` | 165 listings with fqhcSlug linking |
| **Regional Job Pages** | Done | `src/app/[locale]/fqhc-jobs-*/page.tsx` | 6 CA regions, SEO-optimized |
| **Resume Builder** | Done | `src/components/resume-builder/` | Template-based, 5 role templates, html2pdf.js, multi-step form |
| **Career Assessment** | Done | `src/components/career-assessment/CareerAssessment.tsx` | 5-question screener, role recommendations |
| **Candidate Waitlist** | Done | `src/app/[locale]/join/page.tsx`, `src/app/api/candidate-waitlist/` | Supabase, email via Resend |
| **Employer Waitlist** | Done | `src/app/[locale]/hire/page.tsx`, `src/app/api/employer-waitlist/` | Dark theme (stone gradient + amber), distinct from candidate |
| **Blog** | Done | `src/app/[locale]/blog/` | 5 articles, EN/ES, SEO metadata |
| **Color Rebrand** | Done | All files | teal-700/800/900 primary, amber-500 accent, stone neutrals |
| **Separate Signups** | Done | Header, /join, /hire, Footer | Distinct visual identity, cross-links between flows |
| **Sitemap** | Done | `src/app/sitemap.ts` | Includes all pages + 87 FQHC profiles |

### Data Sources
- `src/lib/california-fqhcs.ts` (74KB) — 87 FQHCs with slug, stats, programs, EHR, Glassdoor ratings, careers URLs
- `src/lib/fqhc-job-listings.ts` (96KB) — 165 job listings linked by fqhcSlug
- `src/components/resume-builder/resume-templates.ts` — 5 role templates with FQHC-optimized bullet points

### Database (Supabase)
- `candidate_waitlist` — candidate signups (live)
- `employer_waitlist` — employer signups (live)
- `resume_profiles` — resume data (SQL migration created but NOT YET RUN — `supabase-resume-profiles.sql`)

### Key Patterns
- **Multi-step form**: `useState(step)` with conditional rendering, progress bar
- **API route**: POST to `/api/`, upsert to Supabase, handle 409 duplicates
- **i18n**: `useTranslations("namespace")` client-side, `getTranslations()` server-side
- **PDF generation**: html2pdf.js with dynamic import (client-side only)
- **Static generation**: `generateStaticParams()` for /directory/[slug]

### Not Yet Built (MVP Gaps)
- AI-powered matching algorithm
- Employer dashboard / portal
- Talent Drop system (batch candidate delivery)
- Full assessment engine (beyond 5-question screener)
- User authentication / accounts
- Real job application flow (currently links to external careers pages)
- Supabase resume_profiles table (migration written, not executed)

### Color Palette
| Role | Tailwind | Hex |
|------|----------|-----|
| Primary | teal-700 | #0F766E |
| Primary dark | teal-800/900 | Hero gradients, headings |
| Primary light | teal-50/100 | Hover backgrounds |
| Accent | amber-500 | #F59E0B |
| Employer theme | stone-800/900/950 | /hire page dark gradient |
| Neutrals | stone-* | Text, borders |

### Nav Structure
| Label (EN) | Route | Purpose |
|------------|-------|---------|
| Jobs | /jobs | Browse 165 job listings |
| Directory | /directory | 87 FQHC directory with map |
| Resume Builder | /resume-builder | Free template-based resume builder |
| Find a Job | /join | Candidate waitlist signup |
| Post a Job | /hire | Employer waitlist signup (dark theme) |
| CTA: Build Resume | /resume-builder | Primary CTA button |
| CTA: Hire Talent | /hire | Secondary CTA button (dark) |
