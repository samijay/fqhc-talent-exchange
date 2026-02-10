# FQHC Talent Exchange — Project Context

## What It Is
A niche job marketplace connecting community health professionals (CHWs, care coordinators, case managers, etc.) with FQHCs across California. Think Indeed but hyper-focused on community health centers.

## Tech Stack
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript strict
- **Styling:** Tailwind CSS 4, shadcn/ui (New York), Radix UI
- **Backend:** Supabase (PostgreSQL), API routes in Next.js
- **Forms:** React Hook Form + Zod validation
- **SEO:** Custom metadata per page, JSON-LD schema, sitemap, robots.txt
- **Deployment:** Vercel
- **Repo:** github.com/samijay/fqhc-talent-exchange

## Current Pages
- Homepage with CTAs, stats, how-it-works
- /join — Job seeker registration (waitlist)
- /hire — Employer 3-step intake form
- /jobs — Job listings (Supabase-powered)
- /directory — Searchable California FQHC directory (50+ centers)
- /pricing — 4 tiers (Free, $299, $599, Enterprise)
- /blog — 3 articles (resume tips, ECM guide, Medi-Cal funding)
- /about, /for-job-seekers, /for-employers
- 6 regional pages (LA, SD, SF, Sacramento, Fresno, Riverside)

## Audience
- **Job seekers:** CHWs, care coordinators, case managers, medical assistants — many bilingual Spanish/English, many navigating Medi-Cal ecosystem
- **Employers:** FQHCs, community health orgs in California
- **Language needs:** English primary, Spanish critical (large portion of workforce is bilingual or Spanish-dominant)

## Current State (Feb 2026)
- Responsive design exists but may need mobile polish
- No i18n/Spanish support yet (commented-out placeholder in seo-config.ts)
- 3 blog articles, needs more content
- Supabase tables: candidates, employers, waitlists, early_access
- Uncommitted changes in working tree

## Content Voice
- Professional but approachable
- Speaks to community health workers who may not have traditional tech backgrounds
- Emphasizes mission-driven work, community impact
- SEO-aware: targets "FQHC jobs", "community health worker jobs California", etc.
