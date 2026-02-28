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

## Active Priorities (as of 2026-02-27)
- **Just Shipped:** Strategic Operating Environment Redesign — Rumelt framework homepage, 4 new strategy pages, nav/footer restructure, AI tracker, shared IntelCard, directory profile enhancements
- **Live at:** https://www.fqhctalent.com — 70 features shipped, deployed on Vercel
- **Next Up:** GTM outreach to FQHC HR directors, first manual placement
- **GTM:** Ready for outbound. Site repositioned as "California's FQHC Strategic Monitor" for executives.
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
| **Career Assessment** | Done | `src/lib/career-assessment-engine.ts`, `src/components/resume-builder/CareerInsights.tsx` | 15-question behavioral, 5 domains (incl. Transition Readiness), role-specific scenarios, employer insights |
| **Candidate Waitlist** | Done | `src/app/[locale]/join/page.tsx`, `src/app/api/candidate-waitlist/` | Supabase, email via Resend |
| **Employer Waitlist** | Done | `src/app/[locale]/hire/page.tsx`, `src/app/api/employer-waitlist/` | Dark theme (stone gradient + amber) |
| **Blog** | Done | `src/app/[locale]/blog/` | 13 articles, EN/ES, SEO metadata, FQHC-specific content |
| **Sitemap** | Done | `src/app/sitemap.ts` | All pages + 90 FQHC profiles |
| **Pitch Deck** | Done | `src/app/pitchdeck/page.tsx` | 16-slide interactive presentation with mission/vision framing, TAM/SAM/SOM, competitors, AI matching, pricing, playbook, metrics, keyboard nav |
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
| **Executive Intelligence Dashboard** | Done | `src/app/[locale]/insights/`, `src/lib/market-intelligence.ts`, `src/lib/fqhc-news-intel.ts` | Breaking intel feed, funding cliffs, undocumented access watch, change management playbook, regional snapshots, role demand, salary intel |
| **Union Partnership Tab** | Done | `src/app/[locale]/unions/page.tsx`, `src/lib/union-data.ts` | 4th tab with common interest framework (patients, staff, org) |
| **Why FQHC Page** | Done | `src/app/[locale]/why-fqhc/page.tsx` | Career ladders, salary data, comparison table, total comp visual, bilingual |
| **BookingCTA (Calendly)** | Done | `src/components/booking/BookingCTA.tsx`, `src/lib/booking-config.ts` | Reusable CTA in CareerInsights (≥60%), CareerAssessment, hire, fast-track |
| **Blog Data Viz Upgrades** | Done | `src/components/blog/BlogDataViz.tsx` | TL;DR cards, salary bars, total comp, comparison tables, career ladders, funding cliffs — 5 articles upgraded |
| **Transition Readiness (Phase 1)** | Done | `src/lib/career-assessment-engine.ts`, `src/lib/first-90-days.ts` | 5th domain, 11 new questions, FOGLAMP checklist, Five Conversations, failure factor coaching |
| **Interactive Demo Page** | Done | `src/app/[locale]/demo/page.tsx` | 9-section product walkthrough, bilingual, real market intelligence data |
| **Manager Team Readiness Tool** | Done | `src/app/[locale]/team-readiness/`, `src/lib/manager-assessment-engine.ts` | 5-domain leadership assessment, 35 questions, 4 roles, STARS, management actions, Liberating Structures |
| **Security Audit** | Done | All API routes, headers, deps | 14 categories passed, 0 critical vulnerabilities |
| **Feedback Button** | Done | `src/components/layout/FeedbackButton.tsx`, `src/app/api/feedback/route.ts` | Floating widget on all pages, Supabase `feedback_submissions`, bilingual, 4 types (bug/suggestion/praise/other) |
| **Career Roadmap** | Done | `src/app/[locale]/career-roadmap/page.tsx`, `src/lib/career-pathways.ts` | 5 career tracks, 4 levels each, CA salary P25/P50/P75, 9 regional multipliers, certifications per level, bilingual |
| **Certification Catalog** | Done | `src/app/[locale]/certifications/page.tsx`, `src/lib/certification-data.ts` | 15 CA-specific certifications, cost/duration/salary impact, filter by role/cost/type, CA training programs |
| **Career Insights Dashboard** | Done | `src/app/[locale]/career-insights/page.tsx` | Standalone assessment page, role selector, wraps CareerInsights + First90DaysPlan, links to roadmap/certs |
| **Daily Content Pipeline** | Done | `.claude/commands/`, `src/lib/career-page-config.ts` | 4 slash commands: `/update-layoffs` (WARN Act XLSX), `/scrape-jobs` (FQHC career pages), `/draft-blog` (bilingual articles), `/daily-update` (orchestrator). Career page config for 15 FQHCs. |
| **FQHC Directory Expansion** | Done | `src/lib/california-fqhcs.ts` | 90 → 220 FQHCs from HRSA data. Added qualityScore, violations, laborHistory, hrsaGrantNumber, dataSource fields. |
| **Fast-Track Repositioning** | Done | 13 files | Removed "48-hour" promise site-wide. New hero: "Get Job-Ready". Free tools cards. Priority intake messaging. Updated emails. |
| **Nav Redesign v2** | Done | `src/components/layout/Header.tsx` | "For Job Seekers" dropdown (8 items), "For Employers" dropdown (4 items), "Insights" dropdown (3 items). CTAs: Find a Job + Hire Talent. |
| **Policy & Intel Pipeline** | Done | `.claude/commands/scan-policy.md`, `.claude/commands/intel-brief.md` | 3 new slash commands: `/scan-policy` (deep legislative scanner), `/intel-brief` (weekly newsletter generator), updated `/daily-update` (added policy scan step). 10+ source categories, primary source links required, policy date tracker. |
| **Career Resources Catalog** | Done | `src/app/[locale]/resources/page.tsx`, `src/lib/career-resources.ts` | 18 real programs (loan repayment, free training, professional dev, union education, state workforce). Filter by category + cost. Cost badges, deadline alerts, primary source URLs for every program. Bilingual. |
| **Workplace Guides** | Done | `src/app/[locale]/guides/page.tsx`, `src/lib/fqhc-guides.ts` | 9 operational guides across 3 categories (clinical workflows, revenue/billing, programs/compliance). ECM workflows, RN co-visits, BH integration, FQHC revenue 101, bilingual revenue, revenue cycle roles, CalAIM, documentation, grant cycles. Expandable cards, filter by category/role/difficulty, primary sources, bilingual. |
| **FQHC News Intelligence Feed** | Done | `src/lib/fqhc-news-intel.ts` | 20 seed items across 8 categories (legislation, lobbying, patient-story, merger-acquisition, funding, workforce, undocumented-access, change-management). 4 impact levels. Bilingual headlines/summaries. Primary source URLs. Helper functions for filtering/sorting. Updated daily via `/daily-update`. |
| **Intelligence-Led Homepage** | Done | `src/app/[locale]/page.tsx` | Redesign from tool-led to intelligence-led. Dark hero ("California's FQHC Intelligence Platform"), breaking intel top 5, funding cliff countdown, two-audience split (Leaders vs Job Seekers), live market data cards, featured FQHCs, latest articles, dual CTA. |
| **Enhanced Pipeline Commands** | Done | `.claude/commands/daily-update.md`, `.claude/commands/scan-policy.md` | daily-update Step 3.5: News & Intel Scan (5 searches, IntelItem output). scan-policy Step 3.5: Extended Categories (M&A, patient stories, lobbying, undocumented access). scan-policy Step 5.5: IntelItem generation format. |
| **Strategic Operating Environment Redesign** | Done | `src/app/[locale]/page.tsx`, Header, Footer, messages | Full pivot: Rumelt framework homepage (Challenge → Response → Execution). Nav: Strategy / Intelligence / Tools / Jobs / Directory. Dark dropdown menus. No email/hire CTAs. Footer restructured (Strategy, Intelligence, Tools, Company). |
| **Executive Guides Page** | Done | `src/app/[locale]/strategy/guides/page.tsx`, `src/lib/fqhc-case-studies.ts` | 6 real case studies (PureView, MCR Health, Highland Health, Urban Health Plan, Sun River Health, United Health Centers). Rumelt framework: Diagnose → Guiding Policy → Actions → Outcomes. Filter by category. Primary source links. |
| **OKR Templates Page** | Done | `src/app/[locale]/strategy/okrs/page.tsx`, `src/lib/fqhc-okr-templates.ts` | 12 templates, 5 domains, 3 difficulty levels. Cross-department key results. Links to case studies. Bilingual. |
| **Case Studies Index** | Done | `src/app/[locale]/strategy/case-studies/page.tsx` | Compact card grid with headline outcomes. Links to full guides and FQHC profiles. |
| **AI Implementation Tracker** | Done | `src/app/[locale]/ai-tracker/page.tsx`, `src/lib/fqhc-ai-tracker.ts` | 8 items, 6 categories, 4 adoption stages. CHAI-NACHC, eClinicalWorks, Claude for Healthcare, Elation Health, RapidClaims. Filter + stats. |
| **Shared IntelCard Component** | Done | `src/components/intel/IntelCard.tsx` | Hyperlinked source text, FQHC profile link badges via affectedOrgSlugs, expandable full/compact variants. Used on homepage + insights. |
| **Directory Profile Enhancements** | Done | `src/app/[locale]/directory/[slug]/page.tsx` | Related Intelligence + Related Case Studies sections. Salary/benefits moved lower. Uses getIntelForFQHC() + getCaseStudiesForFQHC(). |
| **AI Innovation Scan Pipeline** | Done | `.claude/commands/daily-update.md` | Step 3.6: 3 AI-focused searches, AIAdoptionItem output format. Tracks FQHC AI adoption, NACHC technology, EHR AI documentation. |

### Data Sources (Strategic Assets)
| File | Size | Contents |
|------|------|----------|
| `src/lib/california-fqhcs.ts` | ~230KB | 220 FQHCs (90 curated + 131 HRSA-imported): slug, stats, programs, EHR, Glassdoor, salary ranges, funding vulnerability, union info, quality scores, violations, labor history |
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
| `src/lib/career-pathways.ts` | ~500 lines | 5 career tracks (Community Health, Clinical Ops, BH, Revenue/Admin, Nursing), 4 levels each, CA salary ranges, 9 regional multipliers, certifications per level |
| `src/lib/certification-data.ts` | ~700 lines | 15 CA-specific certifications with cost, duration, salary impact, issuing body, where to get in CA, bilingual |
| `src/lib/career-page-config.ts` | ~120 lines | 15 FQHC career page configs: scrapeable status, ATS type, lastChecked date, notes. Used by `/scrape-jobs` command. |
| `src/lib/career-resources.ts` | ~550 lines | 18 career resources across 5 categories: loan repayment (4), free training (5), professional dev (4), union education (2), state workforce (3). Primary source URLs, bilingual, cost tiers, deadline tracking. |
| `src/lib/fqhc-guides.ts` | ~850 lines | 9 operational guides: ECM workflows, RN co-visits, BH integration, FQHC revenue 101, bilingual revenue impact, revenue cycle roles, CalAIM overview, documentation compliance, grant cycles & job security. Primary sources from HRSA, CMS, DHCS, NACHC. |
| `src/lib/fqhc-news-intel.ts` | ~530 lines | 20 curated intel items across 8 categories (legislation, lobbying, patient-story, merger-acquisition, funding, workforce, undocumented-access, change-management). Types, category metadata, impact styles, helper functions. Updated daily via `/daily-update` pipeline. |
| `src/lib/fqhc-case-studies.ts` | ~450 lines | 6 real FQHC case studies with Rumelt framework: challenge/guidingPolicy/actions/outcomes. PureView, MCR Health, Highland Health, Urban Health Plan, Sun River Health, United Health Centers. Primary source URLs. |
| `src/lib/fqhc-ai-tracker.ts` | ~350 lines | 8 AI adoption items: CHAI-NACHC, eClinicalWorks, Claude for Healthcare, Elation Health, NACHC AI Action Guide, RCM adoption stats, ambient documentation, RapidClaims. 6 categories, 4 adoption stages. |
| `src/lib/fqhc-okr-templates.ts` | ~400 lines | 12 OKR templates: 5 domains (revenue, workforce, patient access, ops, cross-department), 3 difficulty levels. Key results with metrics, targets, departments. Links to case studies + intel items. |

### Slash Commands (Content & Intelligence Pipeline)
| Command | Purpose | Data Source |
|---------|---------|-------------|
| `/daily-update` | Morning pipeline: WARN check + job scan + policy scan + apply changes | EDD WARN, 4 FQHC APIs, web search |
| `/scan-policy` | Deep legislative/policy scan: federal, state, local. Structured intel findings. | NACHC, CPCA, CHCF, DHCS, KFF, CBO, news |
| `/intel-brief` | Generate weekly newsletter: employer Intel Brief + candidate Pulse. Primary sources required. | `/scan-policy` output + our data |
| `/update-layoffs` | Fetch CA WARN Act XLSX, filter healthcare, generate LayoffEntry | CA EDD WARN Report (`warn_report1.xlsx`) |
| `/scrape-jobs` | Check 10 FQHC career pages/day, generate FQHCJobListing | FQHC `careersUrl` fields |
| `/draft-blog` | Suggest topics from data, draft bilingual article | Codebase data + web search |

### Database (Supabase)
- `candidate_waitlist` — candidate signups (live)
- `employer_waitlist` — employer signups (live)
- `resume_profiles` — resume data (migration: `supabase-resume-profiles.sql` — NOT YET RUN)
- `displaced_candidates` — fast-track displaced worker signups (migration: `supabase-displaced-candidates.sql` — NOT YET RUN)
- `assessment_results` column — JSONB on resume_profiles (migration: `supabase-assessment-migration.sql` — NOT YET RUN)
- `feedback_submissions` — feedback from floating widget (migration: `supabase-feedback.sql` — NOT YET RUN)

### Key Patterns
- **Multi-step form**: `useState(step)` with conditional rendering, progress bar
- **API route**: POST to `/api/`, upsert to Supabase, handle 409 duplicates
- **i18n**: `useTranslations("namespace")` client-side, `getTranslations()` server-side; many pages use inline `const t = (obj: {en, es}, locale) => ...` pattern
- **PDF generation**: html2pdf.js with dynamic import (client-side only)
- **Static generation**: `generateStaticParams()` for /directory/[slug]
- **Data viz**: Tailwind CSS inline bars/cards (no charting library)
- **Manager assessment**: Separate engine (`manager-assessment-engine.ts`) imports core types from candidate engine, has own questions/scoring/insights
- **Daily content pipeline**: Claude Code slash commands (`.claude/commands/*.md`) for WARN Act layoffs, job scraping, blog drafting. Run `/daily-update` each morning.

### Not Yet Built (MVP Gaps)
- Newsletter infrastructure (Supabase table, subscribe/unsubscribe API, signup component, email templates)
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
| Menu | Label (EN) | Route | Purpose |
|------|------------|-------|---------|
| Direct | Jobs | /jobs | Browse 177+ job listings |
| Direct | Directory | /directory | 220 FQHC directory with map |
| **Strategy** ▾ | Executive Guides | /strategy/guides | 6 real case studies with Rumelt framework |
| | OKR Templates | /strategy/okrs | 12 crisis change management templates |
| | Case Studies | /strategy/case-studies | Compact case study index with outcomes |
| | Funding Impact | /funding-impact | H.R. 1 policy timeline + revenue strategies |
| **Intelligence** ▾ | Dashboard | /insights | Executive intel feed, funding cliffs, workforce data |
| | AI Tracker | /ai-tracker | AI adoption monitoring across FQHC sector |
| | Layoff Tracker | /layoffs | 20 events, 3,477+ workers tracked |
| | Blog | /blog | 13 articles, bilingual |
| **Tools** ▾ | Resume Builder | /resume-builder | Free template-based resume builder |
| | Career Assessment | /career-insights | 5-domain assessment + 90-day plan |
| | Career Roadmap | /career-roadmap | 5 tracks, 4 levels, CA salary data |
| | Certifications | /certifications | 15 CA-specific certifications |
| | Career Resources | /resources | 18 free/low-cost programs |
| | Workplace Guides | /guides | 9 operational how-to guides |
| | Team Readiness | /team-readiness | Manager leadership assessment |
| | Priority Intake | /fast-track | Displaced worker priority matching |
| Language | EN/ES toggle | — | Bilingual switcher |

### Footer Columns
| Column | Links |
|--------|-------|
| Strategy | Executive Guides, OKR Templates, Case Studies, Funding Impact |
| Intelligence | Dashboard, AI Tracker, Layoff Tracker, Blog |
| Tools | Jobs, Directory, Resume Builder, Career Assessment, Career Roadmap, Certifications, Career Resources, Workplace Guides, Team Readiness, Priority Intake |
| Company | About |

### Hidden Pages (no nav or footer link)
| Route | Purpose |
|-------|---------|
| /pitchdeck | HTML pitch deck (16 slides, keyboard nav) |
| /unions | Union directory + labor partnership |
| /healthcare-timeline | US healthcare history 1798-2026 |

---

## Current Context
- **Just shipped:** Strategic Operating Environment Redesign — Rumelt framework homepage, 4 new strategy pages (guides, OKRs, case studies, AI tracker), nav/footer restructure, shared IntelCard, directory profile enhancements, AI scan pipeline
- **Building next:** Newsletter infrastructure (Supabase table, signup, email templates)
- **GTM status:** Ready for outbound. Site repositioned as "California's FQHC Strategic Monitor" — executive-grade intelligence, no email CTAs.
- **Data:** 177 job listings, 220 FQHCs (131 from HRSA need enrichment), 20 layoff entries (3,477+ workers), 577 live API-scrapeable jobs, 28 intel items, 6 case studies, 8 AI tracker items, 12 OKR templates
- **Pipeline:** 6 slash commands: `/daily-update` (now with AI scan step), `/scan-policy`, `/intel-brief`, `/update-layoffs`, `/scrape-jobs`, `/draft-blog`
- **Email:** `hello@fqhctalent.com` receiving via Cloudflare Email Routing (verified). Resend domain verification pending for sending.
- **Domains:** fqhctalent.com (primary, live on Vercel) + healthcaretalent.org (GA4 cross-domain tracking)
- **Newsletter strategy:** Two tracks — "FQHC Intel Brief" (employer-facing executive briefing) + "The Pulse" (candidate-facing career update). Primary source links for every claim. Weekly cadence.
- **Manual steps needed:** Run `supabase-drop-waitlist.sql` + `supabase-feedback.sql` in Supabase SQL Editor. Resend domain verification (add DKIM records in Cloudflare DNS). Create Calendly account. Update Vercel `FROM_EMAIL` env var.

## Session Log
| Date | Summary |
|------|---------|
| 2026-02-27 (session 2) | **Strategic Operating Environment Redesign.** Full pivot from job board to executive strategy monitor. Created 3 data files: `fqhc-case-studies.ts` (6 case studies), `fqhc-ai-tracker.ts` (8 AI items), `fqhc-okr-templates.ts` (12 OKR templates). Updated `fqhc-news-intel.ts` with `affectedOrgSlugs` + `getIntelForFQHC()`. Built shared `IntelCard.tsx` (hyperlinked sources, FQHC profile badges). Nav redesign: Strategy/Intelligence/Tools/Jobs/Directory (no email CTAs, dark dropdowns). Footer: 4 columns (Strategy, Intelligence, Tools, Company). Homepage rewrite: Rumelt framework (Challenge → Response → Execution), single-column intel feed (fixed duplicates), no email CTAs. 4 new pages: `/strategy/guides`, `/strategy/okrs`, `/strategy/case-studies`, `/ai-tracker`. Directory profiles: added Related Intel + Case Studies sections, moved salary/benefits lower. Insights: hyperlinked sources, FQHC profile links, removed Hire Talent CTA. Added SEO metadata for 4 new pages. Added Step 3.6 AI Innovation Scan to `/daily-update`. Updated ROADMAP (features #60-70). |
| 2026-02-27 (session 1) | Strategic repositioning + daily update #5. Built FQHC News Intelligence Feed (`fqhc-news-intel.ts` — 28 items, 8 categories, 4 impact levels). Rewrote `/insights` as Executive Intelligence Dashboard. Redesigned homepage — intelligence-led. Updated `/daily-update` and `/scan-policy` with IntelItem output. Daily update: WARN check found Indian Health Center of Santa Clara Valley CLOSURE (21 employees, WARN filed Oct 2025) — added to layoff tracker (now 20 entries, 3,477+ workers). Job scan: AltaMed 234, FHCSD 149, AHS 22, La Clinica 172 = 577 total (prev 582, -5). Policy scan: FQHC Transparency Ballot Initiative (#25-0008), NACHC P&I Forum ($4.6B CHCF), HRSA MAHA-aligned grants, SJV clinics financial tsunami, CA Dems push to restore undocumented benefits. Intel: +8 new items (ballot initiative, CA undocumented restoration, NACHC P&I, HRSA MAHA, Indian Health Center closure, SJV tsunami, healthcare M&A 43% distress-driven, United Health Centers IPA launch). |
| 2026-02-25 | Daily update #4: WARN check (0 FQHC entries, 115 healthcare total), job scan 582 total (-6). Generated first Intel Brief + The Pulse newsletter. Added 2 layoff entries (L.A. Care 225, Santa Clara 365 FTEs). Built Career Resources catalog (18 programs, 5 categories). Built Workplace Guides page: 9 operational how-to guides across 3 categories (clinical workflows, revenue/billing, programs/compliance). Covers ECM, RN co-visits, BH integration, FQHC revenue, bilingual revenue impact, revenue cycle, CalAIM, documentation, grant cycles. All with primary sources from HRSA/CMS/DHCS/NACHC. Nav now 8 items in "For Job Seekers". |
| 2026-02-24 | Daily update #3: WARN check (0 FQHC entries), job scan 588 total (+40). Built policy & intel pipeline: `/scan-policy` (deep legislative scanner, 10+ source categories), `/intel-brief` (weekly newsletter generator with primary source links), updated `/daily-update` with policy scanning step. Designed newsletter strategy: "Intel Brief" (employer) + "The Pulse" (candidate). Key news: Alameda Health System 247 layoffs (public hearing today), CA sues over $600M federal cuts, CHCF authorization expires Dec 2026. |
| 2026-02-20 | Fast-track repositioning: removed "48-hour" from 13 files, new "Get Job-Ready" hero with free tools cards. Nav redesign v2: "For Job Seekers" dropdown (6 items), "For Employers" dropdown (4 items), "Insights" (3 items). Domain email `hello@fqhctalent.com` verified via Cloudflare. Updated ROADMAP (features #51-52 shipped, backlog #79 done). |
| 2026-02-19 | Daily update #2 + major expansion. WARN check (0 new FQHC entries, added Borrego Health historical + LA DPH clinic closures). Job scan: 548 total across 4 APIs. Nav redesign (dropdowns). FQHC directory expanded 90→220 from HRSA data (added quality scores, violations, labor history fields). ROADMAP strategic pivot: repositioned fast-track away from "48-hour" promise, new tiered offboarding model for FQHCs. |
| 2026-02-18 | Ran first `/daily-update` (22 new jobs). Built Assessment Philosophy page, The Drop page + API + SQL. Upgraded email system (mission banner, resources, market snapshot). Made layoff tracker date auto-derive from data. Updated daily-update command with date checklist. |
| 2026-02-17 | Built daily content pipeline (4 slash commands). Tested WARN Act XLSX parsing (215 healthcare entries). Career page config for 15 FQHCs. Security audit (20 attack vectors, 0 vulnerabilities). Talent Drop design (3-round exclusive matching). Legal risk analysis for CA employment agency law. |
| 2026-02-16 | Built feedback button, career insights dashboard, career roadmap page, certification catalog (features #40-43). |

## Decisions Made
| Date | Decision | Reasoning |
|------|----------|-----------|
| 2026-02-27 | Pivot to strategic operating environment | Job board + CTAs → executive strategy monitor. Rumelt framework homepage. No email collection. Strategy/Intelligence/Tools nav. Dark dropdowns. Homepage = Challenge → Response → Execution. Site serves FQHC executives tracking political landscape, not candidates filling forms. |
| 2026-02-27 | OKRs for change management | OKR templates as key strategic tool for FQHCs breaking silos during crisis. 12 templates, 5 domains. Cross-department key results by design. Links to real case studies for credibility. |
| 2026-02-24 | Intel Brief as core product | Newsletter isn't just engagement — it's an executive intelligence briefing. Primary sources for every claim. Two tracks: employer (Intel Brief) + candidate (Pulse). The daily-update pipeline feeds the newsletter content engine. |
| 2026-02-24 | Primary sources non-negotiable | Every insight in the newsletter must link to a primary source. Source hierarchy: govt > policy orgs > industry pubs > news. This is what separates us from SEO content. |
| 2026-02-19 | Tiered offboarding model | Free (self-serve tools) → Managed offboarding ($500-1,500) → Placement ($2-5K). Lead with layoffs for FQHC outreach. |
| 2026-02-19 | Remove "48-hour" fast-track promise | Not fulfillable without employer pipeline. Reposition around free tools + priority intake. |
| 2026-02-19 | HRSA data for directory expansion | 216 CA FQHCs from HRSA CSV. Added quality/violations/labor fields for future enrichment from UDS, CMS, OSHA, NLRB. |
| 2026-02-18 | Workday JSON API for job scraping | Hidden POST endpoint returns structured data (title, salary, description). Works for AltaMed (217 jobs) and FHCSD (164 jobs). Lever JSON API for Asian Health Services (20 jobs). |
| 2026-02-18 | "The Drop" as brand name (untranslated in ES) | Exclusive matching program. Keep English name for brand recognition. |
| 2026-02-17 | Claude Code slash commands over API for daily pipeline | No API cost, human-in-the-loop review, matches existing workflow |
| 2026-02-17 | Employer-paid model for placements | Legally simpler under CA B&P Code §9900 (employment agency law). Candidates never pay. |
| 2026-02-17 | 3-round Talent Drop matching | Round 1: 48h exclusive. Round 2: 48h second chance. Round 3: open pool. Creates urgency without rushing. |
