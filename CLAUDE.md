# Memory

## Me
Founder of FQHC Talent Exchange — a job marketplace connecting community health professionals with Federally Qualified Health Centers in California.

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
| H.R. 1 | "One Big Beautiful Bill" — largest Medicaid cuts in history |
| CalAIM | California Advancing and Innovating Medi-Cal |
| SB 525 | Healthcare minimum wage law ($25/hr by 2027 for FQHCs) |
| PPS | Prospective Payment System (FQHC reimbursement method) |
| NHSC | National Health Service Corps (loan repayment program) |

## Project: FQHC Talent Exchange
| Detail | Value |
|--------|-------|
| **Stack** | Next.js 16, React 19, TypeScript, Tailwind 4, Supabase |
| **URL** | https://www.fqhctalent.com |
| **Repo** | github.com/samijay/fqhc-talent-exchange |
| **UI** | shadcn/ui (New York style), teal/amber palette |
| **Hosting** | Vercel |
| **Regions** | LA, San Diego, SF Bay, Sacramento, Central Valley, Inland Empire, Central Coast, North State, North Coast |
| **Roles** | 30+ roles across care coordination, clinical, behavioral health, dental, pharmacy, admin, leadership |

## Mission & Vision
- **Mission:** To strengthen California's safety-net workforce by connecting mission-driven health professionals with FQHCs — faster, smarter, and with the cultural fit that matters.
- **Vision:** A California where every community health center is fully staffed with professionals who reflect the communities they serve.
- **Brand Pillars:** Candidate Advocacy, FQHC Expertise, Speed to Placement, Health Equity Impact

## Active Priorities (as of 2026-02-16)
- **Just Shipped:** Market Intelligence Dashboard (`/insights`), Why FQHC page, BookingCTA (Calendly), HTML pitch deck, blog upgrades with data viz, union partnership tab
- **Next Up:** Deploy to Vercel, outbound to FQHC HR directors, first manual placement
- **GTM:** Ready for outbound. First dollar = manual placement from fast-track pipeline.
- **See:** `ROADMAP.md` for full feature tracker, backlog, and GTM strategy

## Preferences
- Wants to review plans before code execution
- Uses Claude.ai Projects for content drafting, Claude Code for implementation
- Prefers Git for backups (not OneDrive for code)
- Audience is bilingual (English/Spanish) healthcare workers in California
- NO Claude API integration for resume builder — uses template-based approach instead
- Wants high-quality content with data visualizations, not SEO slop
- Wants strategic foresight generated from the data assets
- Track all feature ideas in ROADMAP.md

## What's Built (Progress Log)

### Completed Features
| Feature | Status | Key Files | Notes |
|---------|--------|-----------|-------|
| **i18n (EN/ES)** | Done | `messages/en.json`, `messages/es.json`, `src/i18n/` | next-intl v4, `localePrefix: "as-needed"`, browser detection |
| **FQHC Directory** | Done | `src/app/[locale]/directory/page.tsx`, `src/lib/california-fqhcs.ts` | 90 CA FQHCs, interactive map, sheet modal, search/filter/sort |
| **FQHC Profile Pages** | Done | `src/app/[locale]/directory/[slug]/page.tsx` | SSG with generateStaticParams, org stats, jobs, salary table, benefits |
| **Job Listings** | Done | `src/app/[locale]/jobs/page.tsx`, `src/lib/fqhc-job-listings.ts` | 156 listings with fqhcSlug linking, grouped role filter |
| **Regional Job Pages** | Done | `src/app/[locale]/fqhc-jobs-*/page.tsx` | 6 CA regions, SEO-optimized |
| **Resume Builder** | Done | `src/components/resume-builder/` | Template-based, 8 role templates, html2pdf.js, multi-step form |
| **Career Assessment** | Done | `src/lib/career-assessment-engine.ts`, `src/components/resume-builder/CareerInsights.tsx` | 12-question behavioral, 4 domains, role-specific scenarios, employer insights |
| **Candidate Waitlist** | Done | `src/app/[locale]/join/page.tsx`, `src/app/api/candidate-waitlist/` | Supabase, email via Resend |
| **Employer Waitlist** | Done | `src/app/[locale]/hire/page.tsx`, `src/app/api/employer-waitlist/` | Dark theme (stone gradient + amber) |
| **Blog** | Done | `src/app/[locale]/blog/` | 12 articles, EN/ES, SEO metadata, FQHC-specific content |
| **Sitemap** | Done | `src/app/sitemap.ts` | All pages + 90 FQHC profiles |
| **Pitch Deck** | Done | `src/app/pitchdeck/route.ts` | Serves PDF from /public/ (to be replaced with HTML) |
| **Security Hardening** | Done | API routes | PII removed, DB errors not leaked |
| **Resume Upload & Parse** | Done | `src/app/api/parse-resume/route.ts` | PDF/DOCX, Supabase storage |
| **GA4 Analytics** | Done | `src/components/analytics/GoogleAnalytics.tsx` | G-CDE54Q86SR |
| **Fast-Track Displaced Worker** | Done | `src/app/[locale]/fast-track/page.tsx`, `src/app/api/displaced-candidates/` | EN/ES, 48-hour guarantee, priority emails |
| **Fast-Track Resume** | Done | `src/components/resume-builder/FastTrackResume.tsx` | Lightweight 4-step from fast-track flow |
| **Role Expansion** | Done | Multiple files | 30+ roles, grouped filter, 3 new resume templates, 18 salary ranges |
| **Role-Tailored Assessment** | Done | `src/lib/career-assessment-engine.ts`, `src/lib/role-experience-questions.ts` | Role-specific questions, employer insights, salary benchmarks |
| **Language Proficiency** | Done | `resume-templates.ts`, `ResumeBuilder.tsx` | 17 languages, proficiency levels |
| **Union Directory** | Done | `src/app/[locale]/unions/page.tsx`, `src/lib/union-data.ts` | 3-tab page: directory, timeline, resources |
| **Healthcare Timeline** | Done | `src/app/[locale]/healthcare-timeline/page.tsx` | US history 1798-2026, legislation tracker, milestones |
| **Funding Impact Tracker** | Done | `src/app/[locale]/funding-impact/`, `src/lib/funding-impact-data.ts` | H.R. 1 policy timeline, revenue strategies, enrollment strategies |
| **Layoff Tracker** | Done | `src/app/[locale]/layoffs/`, `src/lib/california-fqhc-layoffs.ts` | 11 orgs, 2,300+ workers affected |
| **FQHC Union Data** | Done | `src/lib/california-fqhcs.ts` | 10 FQHCs with verified union info (NUHW, SEIU locals) |
| **Canonical URL Migration** | Done | middleware, seo-config | www.fqhctalent.com |
| **Market Intelligence Dashboard** | Done | `src/app/[locale]/insights/`, `src/lib/market-intelligence.ts` | Funding cliffs, regional snapshots, role demand, salary intelligence, EHR/program data |
| **Union Partnership Tab** | Done | `src/app/[locale]/unions/page.tsx`, `src/lib/union-data.ts` | 4th tab with common interest framework (patients, staff, org) |
| **Why FQHC Page** | Done | `src/app/[locale]/why-fqhc/page.tsx` | Career ladders, salary data, comparison table, total comp visual, bilingual |
| **BookingCTA (Calendly)** | Done | `src/components/booking/BookingCTA.tsx`, `src/lib/booking-config.ts` | Reusable CTA in CareerInsights (≥60%), CareerAssessment, hire, fast-track |
| **HTML Pitch Deck** | Done | `src/app/pitchdeck/page.tsx` | 9-slide interactive presentation with real data, replaces PDF |
| **Blog Data Viz Upgrades** | Done | `src/components/blog/BlogDataViz.tsx` | TL;DR cards, salary bars, total comp, comparison tables, career ladders, funding cliffs — 5 articles upgraded |
| **Transition Readiness (Phase 1)** | Done | `src/lib/career-assessment-engine.ts`, `src/lib/first-90-days.ts` | 5th domain, 11 new questions, FOGLAMP checklist, Five Conversations, failure factor coaching |
| **Pitch Deck Update** | Done | `src/app/pitchdeck/page.tsx` | Updated to 5-domain/15-question + competitive moat callout |
| **Interactive Demo Page** | Done | `src/app/[locale]/demo/page.tsx` | 9-section product walkthrough, bilingual, real market intelligence data |
| **Manager Team Readiness Tool** | Done | `src/app/[locale]/team-readiness/`, `src/lib/manager-assessment-engine.ts` | 5-domain leadership assessment, 35 questions, 4 roles, STARS, management actions, Liberating Structures |
| **Security Audit** | Done | All API routes, headers, deps | 14 categories passed, 0 critical vulnerabilities |

### Data Sources (Strategic Assets)
| File | Size | Contents |
|------|------|----------|
| `src/lib/california-fqhcs.ts` | 103KB | 90 FQHCs: slug, stats, programs, EHR, Glassdoor, salary ranges, funding vulnerability, union info |
| `src/lib/fqhc-job-listings.ts` | 125KB | 156 job listings: salary, role, region, department, EHR, programs, language requirements |
| `src/lib/funding-impact-data.ts` | 123KB | Policy timeline, impact stats, program impacts, revenue model, legislation sources, revenue strategies, enrollment strategies, implementation milestones |
| `src/lib/california-fqhc-layoffs.ts` | 19KB | 11 layoff entries with WARN Act data, 2,300+ workers affected |
| `src/lib/job-posting-templates.ts` | 38KB | 30 salary benchmarks (p25/p50/p75), posting templates, screening questions |
| `src/lib/union-data.ts` | 63KB | 7 union profiles, 40+ resources, labor timeline 1798-2025 |
| `src/lib/career-assessment-engine.ts` | 40KB+ | 15 universal + 40 role-specific questions, 5 behavioral domains (incl. Transition Readiness) |
| `src/lib/role-insights.ts` | 69KB | Role-specific career guidance, employer wants, next steps |
| `src/lib/role-experience-questions.ts` | ~36 questions | Experience questions per role with resume bullet mappings |
| `src/lib/market-intelligence.ts` | ~570 lines | Aggregation layer: market overview, regional snapshots, role demand, salary intel, funding cliffs, EHR/program adoption |
| `src/lib/booking-config.ts` | ~80 lines | Calendly URL, score thresholds, copy variants (candidate/employer/fastTrack/manager) |
| `src/lib/first-90-days.ts` | ~655 lines | STARS types, Five Conversations (candidate + manager), FOGLAMP (candidate + team), role-specific 30/60/90 plans |
| `src/lib/manager-assessment-engine.ts` | ~1,087 lines | 35 manager questions (15 universal + 20 role-specific), 4 leadership roles, STARS inference, failure factor detection |
| `src/lib/manager-role-insights.ts` | ~430 lines | Strength/growth/next steps for 4 leadership roles (EN+ES), employer qualifications |
| `src/lib/management-actions.ts` | ~330 lines | 15 management actions by domain, 8 Liberating Structures with step-by-step instructions |

### Database (Supabase)
- `candidate_waitlist` — candidate signups (live)
- `employer_waitlist` — employer signups (live)
- `resume_profiles` — resume data (migration: `supabase-resume-profiles.sql` — NOT YET RUN)
- `displaced_candidates` — fast-track displaced worker signups (migration: `supabase-displaced-candidates.sql` — NOT YET RUN)
- `assessment_results` column — JSONB on resume_profiles (migration: `supabase-assessment-migration.sql` — NOT YET RUN)

### Key Patterns
- **Multi-step form**: `useState(step)` with conditional rendering, progress bar
- **API route**: POST to `/api/`, upsert to Supabase, handle 409 duplicates
- **i18n**: `useTranslations("namespace")` client-side, `getTranslations()` server-side; many pages use inline `const t = (obj: {en, es}, locale) => ...` pattern
- **PDF generation**: html2pdf.js with dynamic import (client-side only)
- **Static generation**: `generateStaticParams()` for /directory/[slug]
- **Data viz**: Tailwind CSS inline bars/cards (no charting library)
- **Manager assessment**: Separate engine (`manager-assessment-engine.ts`) imports core types from candidate engine, has own questions/scoring/insights

### Not Yet Built (MVP Gaps)
- Feedback / bug reporter button (floating, "we appreciate all feedback" messaging)
- AI-powered matching algorithm
- Employer dashboard / portal
- Talent Drop system (batch candidate delivery)
- User authentication / accounts
- Real job application flow (currently links to external careers pages)
- Employer-initiated offboarding (Phase 2/3 of displaced worker funnel)
- Supabase migrations need to be run (resume_profiles, displaced_candidates, assessment_results)
- Manager 90-Day Plan Generator (extend first-90-days.ts for 4 leadership roles)
- Persist team readiness results to Supabase
- Distributed rate limiting (@upstash/ratelimit with Redis)

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
| Jobs | /jobs | Browse 156 job listings |
| Directory | /directory | 90 FQHC directory with map |
| Insights | /insights | Market intelligence dashboard (funding cliffs, salary, demand) |
| Layoffs | /layoffs | Layoff tracker (11 orgs, 2,300+ workers) |
| Resume Builder | /resume-builder | Free template-based resume builder |
| Find a Job | /join | Candidate waitlist signup |
| Post a Job | /hire | Employer waitlist signup (dark theme) |
| CTA: Build Resume | /resume-builder | Primary CTA button |
| CTA: Hire Talent | /hire | Secondary CTA button (dark) |

### Hidden Pages
| Route | Purpose |
|-------|---------|
| /pitchdeck | HTML pitch deck (9 slides, interactive) |
| /why-fqhc | SEO page: why work at an FQHC |
| /unions | Union directory + labor partnership |
| /healthcare-timeline | US healthcare history 1798-2026 |
| /funding-impact | H.R. 1 policy tracker + revenue strategies |
| /demo | Interactive 9-section product walkthrough |
| /team-readiness | Manager Team Readiness Assessment (5-domain, 4 roles, STARS) |
