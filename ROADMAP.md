# FQHC Talent Exchange — Product Roadmap & Feature Tracker

*Last updated: 2026-03-08*

---

## Mission
To strengthen California's safety-net workforce by connecting mission-driven health professionals with FQHCs — faster, smarter, and with the cultural fit that matters.

## Vision
A California where every community health center is fully staffed with professionals who reflect the communities they serve.

---

## ✅ Shipped Features

| # | Feature | Date | Notes |
|---|---------|------|-------|
| 1 | **FQHC Directory** | Jan 2026 | 90 CA FQHCs, interactive map, search/filter/sort, profile pages |
| 2 | **Job Listings** | Jan 2026 | 156 listings, linked to FQHCs, grouped role filter |
| 3 | **Regional Job Pages** | Jan 2026 | 6 CA regions, SEO-optimized |
| 4 | **Resume Builder** | Jan 2026 | Template-based, 8 role templates, html2pdf.js, multi-step |
| 5 | **Career Assessment** | Jan 2026 | 15-question behavioral, 5 domains (incl. Transition Readiness), role-specific scenarios |
| 6 | **Candidate Waitlist** | Jan 2026 | Supabase, email via Resend |
| 7 | **Employer Waitlist** | Jan 2026 | Dark theme, distinct from candidate |
| 8 | **Blog** | Jan 2026 | 12 articles, EN/ES, FQHC-specific content |
| 9 | **Bilingual (EN/ES)** | Jan 2026 | next-intl v4, browser detection |
| 10 | **Displaced Worker Fast-Track** | Feb 2026 | EN/ES form, 48-hour guarantee, priority emails |
| 11 | **Fast-Track Resume** | Feb 2026 | Lightweight 4-step builder from fast-track flow |
| 12 | **Role Expansion** | Feb 2026 | 30+ roles, grouped filter, 3 new resume templates |
| 13 | **Role-Tailored Assessment** | Feb 2026 | Role-specific questions, employer insights, salary benchmarks |
| 14 | **Language Proficiency** | Feb 2026 | 17 languages, proficiency levels on resume |
| 15 | **Union Directory** | Feb 2026 | Union profiles, labor timeline, curated resources, 3-tab page |
| 16 | **Healthcare Timeline** | Feb 2026 | US healthcare history 1798-2026, legislation tracker |
| 17 | **Funding Impact Tracker** | Feb 2026 | H.R. 1 policy timeline, revenue strategies, enrollment strategies |
| 18 | **Layoff Tracker** | Feb 2026 | 11 tracked layoffs, WARN Act data, helper functions |
| 19 | **FQHC Union Data** | Feb 2026 | 10 FQHCs with verified union info |
| 20 | **Security Hardening** | Feb 2026 | PII removed, DB errors not leaked |
| 21 | **Canonical URL Migration** | Feb 2026 | www.fqhctalent.com |
| 22 | **GA4 Analytics** | Feb 2026 | Google Analytics 4 tracking |
| 23 | **Sitemap** | Feb 2026 | All pages + 90 FQHC profiles |
| 24 | **Market Intelligence Dashboard** | Feb 2026 | `/insights` — funding cliffs, regional snapshots, role demand, salary intel |
| 25 | **Union Partnership Tab** | Feb 2026 | 4th tab on unions page: common interest framework (patients, staff, org) |
| 26 | **"Why Work at an FQHC" Page** | Feb 2026 | `/why-fqhc` — career ladders, salary data, comparison table, total comp |
| 27 | **BookingCTA (Calendly)** | Feb 2026 | Reusable CTA in assessments (≥60%), hire success, fast-track success |
| 28 | **HTML Pitch Deck** | Feb 2026 | `/pitchdeck` — 9-slide interactive deck with real data, replaces PDF |
| 29 | **Blog Data Viz Upgrades** | Feb 2026 | TL;DR cards, salary bars, total comp, comparison tables, career ladders — 5 articles |
| 30 | **Blog Data Viz Components** | Feb 2026 | `BlogDataViz.tsx` — reusable TLDRCard, SalaryRangeChart, TotalCompVisual, ComparisonTable, CareerLadderViz, FundingCliffCard, StatCallout |
| 31 | **Transition Readiness (Phase 1)** | Feb 2026 | 5th assessment domain, FOGLAMP checklist, Five Conversations, failure factor coaching, First 90 Days plan generator |
| 32 | **Pitch Deck Update** | Feb 2026 | Updated to 5-domain/15-question assessment + competitive moat callout |
| 33 | **Interactive Demo Page** | Feb 2026 | `/demo` — 9-section product walkthrough, bilingual, real market intelligence data |
| 34 | **Manager Team Readiness Tool** | Feb 2026 | `/team-readiness` — 5-domain leadership assessment, 35 questions, 4 roles, STARS diagnosis, management actions, Liberating Structures |
| 35 | **Security Audit** | Feb 2026 | Full audit: 14 categories passed, 0 critical vulnerabilities, CSP/HSTS/Zod/rate limiting verified |
| 36 | **Nav/Homepage/Footer Update** | Feb 2026 | Team Readiness in nav, 5-card employer section on homepage (Team Readiness + Demo), footer links for Team Readiness, Demo, Insights |
| 37 | **Homepage Redesign** | Feb 2026 | Removed generic Why/How/Testimonials, added: Free Tools (6 cards), Market Intelligence teaser, Layoff Counter (2,300+ workers), Trending Articles section, live data stats bar |
| 38 | **Healthcare Hiring Trends Article** | Feb 2026 | `/blog/healthcare-hiring-trends-2026` — BLS data (82K Jan jobs), HRSA projections, CA FQHC workforce analysis, bilingual, data viz bars |
| 39 | **Pitch Deck Rebuild (16 slides)** | Feb 2026 | Full rewrite from 9→16 slides matching PDF template: TAM/SAM/SOM ($20.5B/$2.1B/$8.5M), competitors, AI matching, pricing, 16-week playbook, metrics, keyboard nav |
| 40 | **Feedback Button** | Feb 2026 | Floating feedback widget on all pages, Supabase `feedback_submissions` table, bilingual EN/ES, 4 feedback types |
| 41 | **Career Roadmap Page** | Feb 2026 | `/career-roadmap` — 5 career tracks with 4 levels each, CA salary data (P25/P50/P75), 9 regional multipliers, certifications at each level, bilingual |
| 42 | **Certification Catalog** | Feb 2026 | `/certifications` — 15 CA-specific certifications with cost, duration, salary impact, training programs, filterable by role/cost/type |
| 43 | **Career Insights Dashboard** | Feb 2026 | `/career-insights` — standalone career assessment page wrapping existing CareerInsights + First90DaysPlan components, role selector, post-assessment pathway/cert links |
| 44 | **Daily Content Pipeline** | Feb 2026 | 4 Claude Code slash commands: `/update-layoffs` (WARN Act XLSX → LayoffEntry), `/scrape-jobs` (FQHC career pages → FQHCJobListing), `/draft-blog` (bilingual article drafter), `/daily-update` (orchestrator). Career page config for 15 FQHCs. |
| 45 | **Assessment Philosophy Page** | Feb 2026 | `/our-assessment` — domain methodology, objective hiring values, bilingual |
| 46 | **The Drop Explainer + Waitlist** | Feb 2026 | `/the-drop` — exclusive matching explainer, candidate + employer waitlists, Supabase table |
| 47 | **Email System Upgrade** | Feb 2026 | Mission banner, resource links, market snapshot in all emails; assessment results + Drop invitation emails |
| 48 | **FQHC Directory Expansion** | Feb 2026 | 90 → 220 FQHCs from HRSA data. Added quality scores, violations, labor history fields to interface. |
| 49 | **Nav Redesign** | Feb 2026 | Dropdown menus for Insights (Market Insights, Layoff Tracker, Blog) and Tools (Resume Builder, Career Assessment, Career Roadmap, Certifications). Cleaner mobile accordion. |
| 50 | **Layoff Tracker Expansion** | Feb 2026 | Added Borrego Health (2021, 218 workers) and LA County DPH (2026, 7 clinic closures). Now 15 entries. |
| 51 | **Fast-Track Repositioning** | Feb 2026 | Removed "48-hour" promise from 13 files. New hero: "Get Job-Ready". Free tools cards link to resume/assessment/jobs. Priority intake messaging. Updated emails with free tools section. |
| 52 | **Nav Redesign v2** | Feb 2026 | "For Job Seekers" dropdown (Resume Builder, Career Assessment, Career Roadmap, Certifications, Why FQHC, Priority Intake). "For Employers" dropdown (Post a Job, Team Readiness, Demo, The Drop). CTAs: Find a Job + Hire Talent. |
| 53 | **Policy & Intel Pipeline** | Feb 2026 | 3 new slash commands: `/scan-policy` (federal/state/local legislative scanner with 10+ source categories), `/intel-brief` (weekly newsletter generator with primary source links for every claim), updated `/daily-update` (added Step 3: Legislative & Policy Scan with 4 parallel searches, policy date tracker, decision rules). |
| 54 | **Career Resources Catalog** | Feb 2026 | `/resources` — 18 real programs across 5 categories: loan repayment, free training, professional development, union education, state workforce. Primary source URLs, bilingual, cost badges, deadline alerts. |
| 55 | **Workplace Guides** | Feb 2026 | `/guides` — 9 operational guides across 3 categories (clinical workflows, revenue/billing, programs/compliance). ECM, RN co-visits, BH integration, revenue mechanics, CalAIM, documentation, grant cycles. Primary sources from HRSA/CMS/DHCS/NACHC. |
| 56 | **FQHC News Intelligence Feed** | Feb 2026 | `fqhc-news-intel.ts` — Curated intelligence data file with 8 categories (legislation, lobbying, patient-story, merger-acquisition, funding, workforce, undocumented-access, change-management). 20 seed items. Updated daily via `/daily-update`. Primary source URLs required. |
| 57 | **Executive Intelligence Dashboard** | Feb 2026 | `/insights` rewritten — dark stone hero, stat strip, breaking intel feed with category filter tabs, funding cliff countdown, undocumented access watch section, change management playbook, regional market snapshot, collapsible workforce market data, sources index. |
| 58 | **Intelligence-Led Homepage** | Feb 2026 | Homepage redesign — leads with "California's FQHC Intelligence Platform", breaking intel top 5, funding cliff countdown, two-audience split (Leaders vs Job Seekers), live market data cards, featured FQHCs, latest articles, dual CTA. |
| 59 | **Enhanced Pipeline Commands** | Feb 2026 | Updated `/daily-update` (Step 3.5: News & Intel Scan with 5 searches, IntelItem output format), updated `/scan-policy` (Step 3.5: Extended Categories — M&A, patient stories, lobbying, undocumented access, change management; Step 5.5: IntelItem generation). |
| 60 | **Strategic Operating Environment Redesign** | Feb 2026 | Full pivot from job board to executive strategy monitor. Rumelt "Good Strategy" framework homepage (Challenge → Response → Execution). Nav: Strategy / Intelligence / Tools / Jobs / Directory (no email CTAs). Dark dropdown menus. Footer restructured to 4 columns. |
| 61 | **Executive Guides Page** | Feb 2026 | `/strategy/guides` — 6 real FQHC case studies (PureView, MCR Health, Highland Health, Urban Health Plan, Sun River Health, United Health Centers) structured around Rumelt framework. Expandable cards: Diagnose → Guiding Policy → Actions → Outcomes. Primary sources. |
| 62 | **OKR Templates Page** | Feb 2026 | `/strategy/okrs` — 12 OKR templates across 5 domains (revenue resilience, workforce retention, patient access, operational efficiency, cross-department). 3 difficulty levels. Links to related case studies. Breaks silos with cross-department key results. |
| 63 | **Case Studies Index** | Feb 2026 | `/strategy/case-studies` — Compact card grid of FQHC case studies with headline outcomes. Links to full guides and FQHC profiles. |
| 64 | **AI Implementation Tracker** | Feb 2026 | `/ai-tracker` — 8 AI adoption items across 6 categories (clinical documentation, revenue cycle, scheduling, care coordination, population health, policy framework). Filter by category and adoption stage. Vendor/partnership tracking. Primary sources. |
| 65 | **Shared IntelCard Component** | Feb 2026 | `IntelCard.tsx` — Reusable intelligence card with hyperlinked source text, FQHC profile link badges via `affectedOrgSlugs`, expandable full summary, compact/full variants. Used on homepage and insights. |
| 66 | **FQHC Case Studies Data** | Feb 2026 | `fqhc-case-studies.ts` — 6 verified case studies with Rumelt framework structure. Challenge/guidingPolicy/actions/outcomes. Linked to directory profiles and primary sources. |
| 67 | **AI Tracker Data** | Feb 2026 | `fqhc-ai-tracker.ts` — 8 AI adoption items: CHAI-NACHC, eClinicalWorks, Claude for Healthcare, Elation Health, NACHC AI Action Guide, RCM adoption stats, ambient documentation, RapidClaims. |
| 68 | **OKR Templates Data** | Feb 2026 | `fqhc-okr-templates.ts` — 12 templates with objectives, key results, metrics, targets, departments involved. 3 difficulty levels. Links to related case studies and intel items. |
| 69 | **Directory Profile Enhancements** | Feb 2026 | FQHC profiles now show Related Intelligence and Related Case Studies sections. Salary/benefits moved lower. Uses `getIntelForFQHC()` and `getCaseStudiesForFQHC()`. |
| 70 | **AI Innovation Scan Pipeline** | Feb 2026 | Added Step 3.6 to `/daily-update`: 3 AI-focused searches (FQHC AI implementation, NACHC technology, EHR AI documentation) with AIAdoptionItem output format. |
| 71 | **Thought Leaders Page** | Feb 2026 | `/strategy/leaders` — 28 real FQHC thought leaders across 8 categories (NACHC, state PCA, FQHC CEO, policy, workforce, AI, HRSA, consulting). Filterable by category/topic. Expandable bios with "Why Follow" highlights, connected content badges, social links. |
| 72 | **Strategy Knowledge Map** | Feb 2026 | `/strategy/knowledge-map` — Master knowledge graph connecting all strategic content. 60+ edges, 6 strategic themes with urgency levels, 4 learning paths. Theme cards, connection explorer, foresight panels. |
| 73 | **Case Study Expansion** | Feb 2026 | 6 → 18 case studies in `fqhc-case-studies.ts`. Added `headline` field for card previews (distinct from challenge). New: Neighborhood Healthcare AI, Genesis Telehealth, CommuniCare Dental, Fenway LGBTQ+, Callen-Lorde, Weitzman Research, YVFWC Integrated, Zufall Multilingual, Salud CHW Pipeline, Oregon PCA QI, Whitman-Walker, Asian Health Services. |
| 74 | **OKR Template Expansion** | Feb 2026 | 12 → 24 OKR templates. New tactical templates: 340B pharmacy, ECM scaling, AI documentation, undocumented enrollment, telehealth, SB 525, grant diversification, dental, BH integration, UDS quality, revenue cycle, CHW program. |
| 75 | **Security Hardening v2** | Feb 2026 | Removed `unsafe-eval` from CSP, added UUID validation to newsletter unsubscribe, feedback route now returns 503 on missing table (not silent success), improved email error logging with route context. |
| 76 | **Scope-of-Practice Data** | Feb 2026 | `scope-of-practice.ts` — 10 CA FQHC roles (MD, NP, PA, RN, LVN, MA, CHW, LCSW, AMFT/ASW, RDH) with BPC citations, delegation rules, supervision chains, top-of-license barriers, change management, revenue impact. 15 delegation tasks with role authorization matrix. |
| 77 | **FQHC Movement History Data** | Feb 2026 | `fqhc-movement-history.ts` — 30 events across 5 eras (1960-2026), farmworker origins to modern crisis. 8 cross-cultural alliances (Chavez-Itliong, Black Panthers, Geiger-Mound Bayou, RFK-Delano, Asian mutual aid, Jewish physicians, bipartisan champions, rural conservatives). |
| 78 | **Cultural Humility Data** | Feb 2026 | `cultural-humility.ts` — 6 domains (language access, cultural humility, community-centered, implicit bias, health equity, workforce diversity), 20 competencies with CLAS standards, 5 workforce diversity scenarios with strengths/challenges/actions. |
| 79 | **Interactive Visualizations** | Feb 2026 | 4 new viz components: `ThreatTimeline.tsx` (horizontal funding cliff scroll), `DelegationMatrix.tsx` (interactive role × task grid), `RevenueImpactSimulator.tsx` (slider-based what-if), `MovementTimeline.tsx` (vertical era timeline with filters). Pure Tailwind + React state, zero new dependencies. |
| 80 | **Scope-of-Practice Page** | Feb 2026 | `/strategy/scope-of-practice` — Interactive delegation matrix, 10 expandable role cards with full scope/barriers/revenue, top-of-license barriers summary, financial case for full scope. |
| 81 | **Cultural Humility Page** | Feb 2026 | `/strategy/cultural-humility` — 6 filterable domains, 20 expandable competency cards with practical steps/metrics/barriers, 5 real-world diversity scenarios, Tervalon & Murray-García quote. |
| 82 | **FQHC Movement Page** | Feb 2026 | `/strategy/movement` — Interactive MovementTimeline (30 events, 5 eras), 8 cross-cultural alliance cards with community chips and key figures, "We Are the Continuation" closing narrative. |
| 83 | **Cultural & Movement Pipeline** | Feb 2026 | Added Step 3.7 to `/daily-update`: cultural competency and community health equity scans. Tracks CLAS updates, CHW scope expansion, cultural humility programs, SB 803 certification updates. |
| 84 | **Newsletter Signup Component** | Feb 2026 | `NewsletterSignup.tsx` — Reusable component with 3 variants (inline/card/banner), audience toggle (Leaders/Job Seekers/Both), bilingual, embedded on blog, insights, and strategy/guides pages. |
| 85 | **Newsletter Email Templates** | Feb 2026 | `newsletter-templates.ts` — Full HTML email templates for Intel Brief (7 sections: executive summary, policy, funding, workforce, AI, key dates, featured content) and The Pulse (job highlights, market trends, tool spotlight, career tips). Impact level badges, primary source links, inline styles for email clients. |
| 86 | **Newsletter Send System** | Feb 2026 | `newsletter-send.ts` + `/api/newsletter/send` + `/api/newsletter/preview` — Batch send utility (10/batch with rate limiting), Supabase subscriber query, `newsletter_sends` tracking table, preview endpoint with sample data, protected by NEWSLETTER_SECRET. |
| 87 | **Newsletter Page** | Feb 2026 | `/newsletter` — Standalone signup with full audience selector, Intel Brief + The Pulse track descriptions, stats bar (weekly cadence, primary sources, bilingual). |
| 88 | **Offboarding Toolkit Page** | Feb 2026 | `/strategy/offboarding` — Employer-facing workforce transition toolkit. 3-tier service model: Free (self-serve career tools), Managed Transition ($500-1,500/event), Placement Partnership ($2-5K/placement). 4-step process viz, layoff preview cards from live data, dark employer theme. GTM sales enabler for FQHC HR outreach. |
| 89 | **Resilience Scorecard** | Feb 2026 | `fqhc-resilience.ts` + `/strategy/resilience` — 220 FQHCs scored across 5 weighted dimensions (program diversity, workforce stability, data maturity, quality indicators, financial positioning). Grades A-F, risk levels. Searchable/sortable/filterable scorecard with expandable detail cards, grade distribution viz, factor-level explanations. |
| 90 | **Resilience Integration** | Feb 2026 | Resilience grade badges on homepage featured FQHCs with scores. Directory profile resilience cards with 5-dimension bar charts, data completeness, and link to scorecard. Employer-facing offboarding CTA cross-linked from layoff tracker. |
| 91 | **FQHC Comparison Tool** | Feb 2026 | `/compare` — Side-by-side comparison of 2-3 FQHCs. Search-to-select, org basics, Glassdoor, programs, resilience (grade + 5 dimensions with CSS bar chart), funding vulnerability, union status, certifications, data completeness. Best-value highlighting per row. |
| 92 | **Footer Newsletter Signup** | Feb 2026 | Inline `NewsletterSignup` component embedded in footer brand column for site-wide email capture on every page. |
| 93 | **Nav & Documentation Updates** | Feb 2026 | Compare FQHCs added to Tools dropdown + footer. SEO metadata, sitemap, i18n (EN/ES). Updated CLAUDE.md + ROADMAP.md. |
| 94 | **Regional Intelligence Pages** | Feb 2026 | `/intelligence/[region]` — 9 SSG region dashboards with per-region FQHC table, resilience distribution, top programs, EHR landscape, layoff impact, job count, regional intel feed. `regional-intelligence.ts` helper with county-to-region mapping and aggregation. |
| 95 | **Regional Nav + Sitemap** | Feb 2026 | Regional Intelligence in Intelligence dropdown + footer. 9 sitemap entries. i18n keys (EN/ES). |
| 96 | **FQHC Strategic Reports** | Feb 2026 | `/report/[slug]` — 220 per-FQHC strategic intelligence reports (SSG). 10-section executive report: summary, resilience with regional comparison, threat landscape + funding cliffs, programs, workforce intel + job listings, related intelligence, case studies, regional context, action items. GTM outreach hook. |
| 97 | **Report Integration** | Feb 2026 | Directory profiles link to strategic reports. 220 report entries in sitemap. |
| 98 | **Salary Intelligence Page** | Feb 2026 | `/salary-data` — 30 roles × 9 CA regions salary benchmarks with P25/P50/P75, department filter, regional adjustment, sortable table with visual range bars, career track progression, regional comparison, key insights. |
| 99 | **Custom 404 Page** | Feb 2026 | Branded 404 with navigation to homepage, directory, jobs, intelligence. |
| 100 | **Salary + 404 Nav Integration** | Feb 2026 | Salary Intelligence in Intelligence dropdown + footer. SEO metadata, sitemap, i18n (EN/ES). 🎉 **100th feature shipped!** |
| 101 | **SEO Metadata Layout Files** | Mar 2026 | 50 server-component `layout.tsx` files across all pages + blog articles (Next.js server components export `metadata` alongside "use client" pages). Fixed CTR leakage on top-ranked pages with no title tags. 3 high-priority pages: how-to-write-fqhc-resume (pos. 3.0), fqhc-benefits-guide (pos. 5.8, 65 impressions), funding-impact (pos. 4.9). Added 6 missing seo-config entries. |
| 102 | **AI Tracker Redesign** | Mar 2026 | Full redesign of `/ai-tracker` with 2/3+1/3 grid layout (main feed + sticky sidebar), trending ticker with anchor links, featured KTVU video banner (Akido ScopeAI), category + stage filter pills, featured items sidebar (teal), policy deadlines sidebar (amber), latest intel sidebar (blue), related resources section (masterclass card + 2 guide cards), newsletter CTA. |
| 103 | **Newsletter Questionnaire Form** | Mar 2026 | `NewsletterQuestionnaireForm.tsx` — 5-step inline personalization flow on `/newsletter` page. Progress dots. Step 1: Email + audience. Step 2: Role (7 leader or 7 seeker options). Step 3: Primary challenge. Step 4: Topics multi-select (up to 4). Step 5: Org size (leaders) or skip to confirmation (seekers). Step 6: Personalized confirmation with role + challenge + topics displayed. API: email captured at step 1, preferences saved at final step. Skip allowed at steps 2–5. |
| 104 | **Newsletter Questionnaire Page** | Mar 2026 | Standalone `/newsletter/questionnaire` page + layout. POST endpoint at `/api/newsletter/questionnaire` with Zod validation, Supabase upsert (email, audience, roleType, primaryChallenge, region, orgSize, preferences JSONB). Rate limited (3/min/IP). Robots noindex. |
| 105 | **Welcome Drip Sequences** | Mar 2026 | `drip-templates.ts` (8 email templates), `/api/newsletter/drip` GET endpoint (Bearer {NEWSLETTER_SECRET}), `vercel.json` cron (17:00 UTC daily). Candidate track: Day 3/7/10/14 (ECM tips, salary data, interview prep, 90-day guide). Employer track: Day 3/7/14/21 (platform tour, resilience, case studies, offboarding CTA). `supabase-newsletter-drip.sql` adds drip_step column. |
| 106 | **Interview Prep Tool — Provider Roles** | Mar 2026 | 6 new FQHC provider questions (panel management, NP/PA scope, PPS billing, Denti-Cal, dental integration, MD/NP supervision) with full STAR tips + red flags + follow-ups. 4 role guides: Physician ($185-260K), NP ($120-175K), PA-C ($115-148K), Dentist ($130-195K) with NHSC loan repayment info. |
| 107 | **Resume Builder — Provider Templates** | Mar 2026 | 4 new provider resume templates (physician, nurse_practitioner, physician_assistant, dentist) with 6 FQHC-specific bullets each covering panel management, PPS, HEDIS, CalAIM, NHSC, supervision requirements, Denti-Cal. Provider roles listed first in selector. GraduationCap/UserCog/ClipboardList/Smile icons. |
| 108 | **Career Assessment — 90-Day Plan Separation** | Mar 2026 | Assessment flow now ends with results only. 90-day plan is opt-in via STARS type selector (5 options: startup/turnaround/accelerated/realignment/sustaining) shown after results. "Change scenario" button regenerates plan with different STARS type. Plan generated on demand, not automatically. |
| 109 | **Jobs Table Column Sorting** | Mar 2026 | `SortColHeader` component with active indicator (teal + directional arrow), `SortDir` state, `handleColumnSort()` toggles direction on repeat click. Position/Salary/Market/Type columns clickable. Dropdown syncs. Salary/market default desc, others default asc. |
| 110 | **Career Page Config Expansion** | Mar 2026 | 20 new FQHCs added to `career-page-config.ts`. 6 confirmed scrapeable: Open Door Community Health Centers (Workday wd503), Valley Health Team (Workday wd5), Marin Community Clinics (iCIMS), United Health Centers (iCIMS), Petaluma Health Center (JobVite), Davis Street Community Center (SmartRecruiters). Added ATS types: jobvite, smartrecruiters, neogov, paylocity, atsondemand, governmentjobs. |
| 111 | **FQHC Data Enrichment — Full Completion** | Mar 2026 | All 87 remaining `hrsa-import` entries enriched to `hrsa-enriched` via 6 parallel research agents (Batches A–F). Each entry now has description, programs[], EHR system, Glassdoor rating + review count, careers URL, patient/staff counts, mission statement, funding impact level. **Result: 0 hrsa-import remaining, 125 hrsa-enriched + 90 curated = 215 total FQHCs.** |
| 112 | **AI Vendor Comparison** | Mar 2026 | `FQHC_AI_VENDORS` array (8 vendors) in `fqhc-ai-tracker.ts`: Sunoh.ai, Abridge, Nabla, RapidClaims, Akido ScopeAI, healow AI, Elation Health AI, CHAI-NACHC Framework. New types: `AIVendor`, `VendorCategory`, `EHRIntegration`. Helper functions: `getVendorsByEHR()`, `getVendorsByCategory()`, `getHighFitVendors()`. UI: Vendor Comparison section on `/ai-tracker` with category filter pills, 4-col card grid, EHR compatibility dots (native/api/none), key features, FQHC customers, pricing, NACHC/CHAI badges. |
| 113 | **Flywheel Strategy Document** | Mar 2026 | `.feedback/strategy/flywheel-strategy.md` — 4-stage content flywheel (DISCOVER → SUBSCRIBE → ENGAGE → CONVERT). Content calendar rhythm (Mon: daily-update, Tue: intel-brief, Wed-Fri: LinkedIn, Fri: weekly-roundup). KPI ladder: pageviews → signups → tool completions → Calendly bookings. `intel-brief.md` updated with Step 0: Subscriber Intelligence (query Supabase segment breakdown before drafting). |

---

## 🔨 Current Priorities (as of 2026-03-09)

### Priority 1: Critical Security Fixes

These must be done BEFORE GTM outreach — any FQHC security review would flag them:

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| S1 | **RLS policies expose PII** — `resume_profiles`, `candidate_waitlist`, `employer_waitlist` tables have `FOR SELECT TO anon USING (true)` = anyone can read all PII | CRITICAL | Restrict SELECT to `service_role` only in Supabase SQL |
| S2 | **Supabase project ID hardcoded** in admin email HTML (offboarding-intake route.ts line 172) | CRITICAL | Remove direct dashboard URL, use env var or generic text |
| S3 | **GA4 loads before cookie consent** — layout.tsx imports `@next/third-parties/google` which fires before CookieConsent banner | HIGH | Replace with custom `GoogleAnalytics.tsx` component that respects consent |
| S4 | **Newsletter drip endpoint returns email addresses** in error response body (PII exposure) | HIGH | Return error counts only, log emails server-side |
| S5 | **`xlsx` (SheetJS) has known vulnerabilities** — prototype pollution, ReDoS, no fix available | HIGH | Migrate to `exceljs` or accept risk (write-only use) |
| S6 | **In-memory rate limiting ineffective on Vercel** — serverless containers don't share state | HIGH | Migrate to `@upstash/ratelimit` with Redis |
| S7 | **CSP `frame-src 'none'` conflicts** with YouTube domains listed after it | MEDIUM | Remove `'none'`, keep only YouTube domains |
| S8 | **No Content-Type validation** on any API route (13 POST routes) | MEDIUM | Add `Content-Type: application/json` check |
| S9 | **`/api/team-readiness` missing rate limiting** | MEDIUM | Add `checkRateLimit()` consistent with other routes |
| S10 | **`supabaseAdmin` in same file as public client** (`supabase.ts`) | MEDIUM | Split into `supabase-admin.ts` with `import "server-only"` |

### Priority 2: Performance — Stop Shipping 2MB of Data to Every Browser

The single highest-impact fix for user experience. Currently, "use client" pages import massive data files:

| Issue | Impact | Fix |
|-------|--------|-----|
| **Homepage loads ~1.5MB** of raw TypeScript data (fqhcJobListings 1MB + californiaFQHCs 304KB + news intel 119KB) | First-load performance destroyed on mobile | Convert homepage to server component, pre-compute minimal data |
| **22 pages marked "use client" with zero interactivity** — they only use `useLocale()` from next-intl | Extra JS shipped for nothing | Convert to server components using `getLocale()` from `next-intl/server` |
| **`docx` library (920KB) statically imported** in resume builder | Download button loads 920KB before user even clicks | Dynamic `import()` like existing `xlsx` and `html2pdf.js` pattern |
| **`IntelCard.tsx` imports entire 304KB FQHC data** just to look up slug-to-name for badges | Every page with IntelCard loads 304KB | Pass pre-computed slug-to-name map as prop |
| **Zero `loading.tsx` files** in entire app | No loading feedback during navigation | Add at least root + jobs + directory loading states |
| **Only 2 `<Suspense>` boundaries** in 98 client pages | No progressive rendering | Wrap heavy components in Suspense with skeleton fallbacks |

### Priority 3: Data Integrity Fixes

| Issue | Severity | Fix |
|-------|----------|-----|
| **5 orphan FQHC slugs in job listings** — 15 jobs link to nonexistent profiles (`sac-health-system`, `central-coast-community-health`, `clinica-de-salud-del-valle`, `community-health-center-network`, `sacramento-covered`) | HIGH | Add missing directory entries or fix slug references |
| **2 orphan slugs in intel items** — `santa-clara-valley-health` and `sacramento-county-health-center` in `affectedOrgSlugs` don't match directory | MEDIUM | Fix to `county-of-santa-clara` and `sacramento-county-primary` |
| **Funding impact timeline has 2 passed deadlines** without status updates (Jan 1 2026 events still "frozen"/"at-risk") | HIGH | Update statuses in `funding-impact-data.ts` |
| **Header comment in california-fqhcs.ts is wrong** — says "220 orgs (90 curated + 131 HRSA-imported)" but actual is 214 (89 curated + 125 hrsa-enriched) | MEDIUM | Fix comment |
| **`qualityScore` and `violations` fields are entirely empty** across all 214 FQHCs | LOW | Either populate from HRSA UDS/CMS data or remove from interface |
| **15 job listings from January 2026** are 54+ days old | LOW | Review and update or remove stale listings |

### Priority 4: SEO & Architecture

| Issue | Severity | Fix |
|-------|----------|-----|
| **4 pages missing from sitemap** — `/career-insights`, `/career-roadmap`, `/certifications`, `/guides` (all in nav) | HIGH | Add to `sitemap.ts` staticPages array |
| **JSON-LD BreadcrumbList uses `"ListItemElement"`** instead of `"ListItem"` (Google will reject) | MEDIUM | Fix in `JsonLd.tsx` |
| **13 metadataBase build warnings** — several layouts define metadata without `metadataBase` | MEDIUM | Add `metadataBase` to root layout or inline metadata |
| **Directory description says "50+ FQHCs"** — actual count is 214 | LOW | Update in `seo-config.ts` |
| **Middleware deprecation** — Next.js 16 deprecated `middleware` in favor of `proxy` | MEDIUM | Plan migration when next-intl supports proxy convention |
| **ESLint: 466 errors** from `.vercel/output/` not being ignored + `_audit*.ts` root files | MEDIUM | Update `.eslintignore`, delete audit files |

### Priority 5: Code Quality

| Issue | Impact | Fix |
|-------|--------|-----|
| **Inline `t()` helper duplicated 39 times** | Maintenance burden | Extract to `src/lib/i18n-helpers.ts` |
| **`formatDate()` duplicated 9 times** | Inconsistency risk | Extract to `src/lib/format-helpers.ts` |
| **`formatSalary()` duplicated 7 times** | Inconsistency risk | Consolidate to one export |
| **`movement-founders.ts` (33KB) never imported** | Dead weight | Delete or build founders page |
| **Large monolithic pages** (homepage 1,408 lines, jobs 1,375, directory 1,197) | Readability, code-splitting | Break into sub-components |
| **Single `error.tsx` for entire app** | Poor error UX | Add per-route-group error boundaries |
| **Navigation dropdowns lack ARIA attributes** | Accessibility | Add `aria-expanded`, `aria-haspopup`, keyboard support |

### Priority 6: GTM Outreach + Job Expansion

**Manual Steps (blocking):**
1. Run `supabase-newsletter-drip.sql` in Supabase SQL Editor (adds drip_step column)
2. Set `CRON_SECRET = NEWSLETTER_SECRET` in Vercel project settings to activate daily drip cron
3. Run `supabase-master-setup.sql` in Supabase (all 11 tables — BUT fix RLS policies first per S1!)

**Outreach (this week):**
- Run `/scrape-jobs` for 6 new scrapeable FQHCs (Open Door, Valley Health Team, Marin Community, Petaluma Health, Davis Street, United Health Centers)
- Run `/intel-brief` to generate first newsletter with subscriber intelligence step
- Initial email to FQHC HR directors: position as the FQHC Strategic Monitor
- Lead with: AI vendor comparison, resilience scorecard, strategic reports
- CTA: "Book a Briefing" (Calendly) + offboarding intake form for FQHCs with layoffs

---

## 📋 Backlog — Near-Term (Next 1-3 Months)

| # | Feature | Priority | Value | Notes |
|---|---------|----------|-------|-------|
| ~~40~~ | ~~Feedback / Bug Reporter Button~~ | ~~High~~ | ~~UX/Trust~~ | ✅ Shipped — see #40 above |
| ~~41~~ | ~~Talent Drop System~~ | ~~High~~ | ~~Revenue~~ | ✅ Shipped as The Drop — see #46 above |
| 42 | **Employer Dashboard** | High | Revenue | Portal for FQHCs to review candidates, track pipeline, manage postings |
| 43 | **User Authentication** | High | Foundation | Accounts for candidates + employers. Required for dashboard/drops. |
| ~~44~~ | ~~Manager 90-Day Plan Generator~~ | ~~Medium~~ | ~~B2B~~ | ✅ Shipped — `manager-90-days.ts` + `Manager90DaysPlan.tsx`. Rich 30/60/90 plans for all 4 leadership roles (program_manager, clinical_supervisor, operations_director, executive_director). STARS-informed coaching notes, interactive TEAM FOGLAMP checklist, Five Conversations grid, role-specific key resources. Shown as expandable section in TeamReadinessResults. |
| 45 | **Team Readiness Results to Supabase** | Medium | Data | Persist manager assessment results, enable comparisons over time |
| 46 | **Real Job Application Flow** | Medium | UX | Apply directly instead of linking to external careers pages |
| 47 | **Employer-Initiated Offboarding** | High | Revenue | FQHCs notify us of upcoming layoffs → we intake, assess, and re-place workers. Core of tiered offboarding model. |
| 48 | **FQHC Resilience Scorecard** | Medium | Content | Rank 220 FQHCs by funding vulnerability, program diversity, stability |
| 49 | **Displaced Worker Matching** | High | Value | Auto-match laid-off workers to similar roles at hiring FQHCs. Key to offboarding tier. |
| 50 | **Regional Labor Market Reports** | Medium | Content | Quarterly reports per CA region with salary, demand, layoff data |
| ~~51~~ | ~~Career Roadmap Generator~~ | ~~Medium~~ | ~~Engagement~~ | ✅ Shipped — see #41 above |
| 52 | **Email Drip Campaigns** | Medium | Engagement | Post-signup nurture sequences for candidates + employers |
| 53 | **Distributed Rate Limiting** | Medium | Security | Migrate to @upstash/ratelimit with Redis for multi-instance Vercel |
| 54 | **Manager-to-Candidate Matching** | Medium | Core | Assess both sides of the hire — match manager needs to candidate strengths |
| ~~75~~ | ~~Assessment Philosophy Page~~ | ~~High~~ | ~~Trust/SEO~~ | ✅ Shipped — see #45 above |
| ~~76~~ | ~~The Drop Explainer + Waitlist~~ | ~~High~~ | ~~Revenue~~ | ✅ Shipped — see #46 above |
| ~~77~~ | ~~Email System Upgrade~~ | ~~High~~ | ~~Engagement~~ | ✅ Shipped — see #47 above |
| 78 | **Adaptive Assessment Engine** | Medium | Moat | Phase 1: expanded question bank (110+). Phase 2: difficulty scaling (CAT). Phase 3: outcome-based weight learning from placement data. |
| ~~79~~ | ~~Fast-Track Repositioning~~ | ~~High~~ | ~~GTM~~ | ✅ Shipped — see #51 above |
| ~~80~~ | ~~Offboarding Toolkit Page~~ | ~~High~~ | ~~Revenue~~ | ✅ Shipped as `/strategy/offboarding` — see #88 above |
| ~~81~~ | ~~FQHC Data Enrichment~~ | ~~Medium~~ | ~~Data~~ | ✅ Shipped — all 87 hrsa-import entries enriched to hrsa-enriched. 215 total FQHCs (90 curated + 125 hrsa-enriched), 0 stubs remaining. See #111 above. |
| ~~82~~ | ~~HRSA-Import FQHC Enrichment~~ | ~~Medium~~ | ~~Data~~ | ✅ Shipped — see #111 above. All HRSA-imported entries now have real data from web research agents. |
| ~~83~~ | ~~Newsletter Infrastructure~~ | ~~High~~ | ~~Engagement~~ | ✅ Shipped — see #84-87 below |
| ~~84~~ | ~~Newsletter Signup Page~~ | ~~High~~ | ~~Engagement~~ | ✅ Shipped — `/newsletter` page + reusable `NewsletterSignup` component with 3 variants (inline/card/banner), audience toggle, embedded on blog, insights, strategy/guides pages |
| ~~85~~ | ~~Intel Brief Weekly Template~~ | ~~High~~ | ~~Content/Revenue~~ | ✅ Shipped — Full HTML email template in `newsletter-templates.ts`, section-based layout (executive summary, policy, funding, workforce, AI, key dates), impact badges, primary source links |
| ~~86~~ | ~~The Pulse Weekly Template~~ | ~~High~~ | ~~Content~~ | ✅ Shipped — Full HTML email template for candidate newsletter: job highlights, market trends, tool spotlight, career tips, featured post. Bilingual. |
| ~~87~~ | ~~Welcome Drip Sequences~~ | ~~Medium~~ | ~~Engagement~~ | ✅ Shipped — `drip-templates.ts` (8 email templates), `/api/newsletter/drip` GET endpoint, `vercel.json` cron (17:00 UTC daily). Candidate: Day 3/7/10/14. Employer: Day 3/7/14/21. See #105 above. Requires running `supabase-newsletter-drip.sql` and setting CRON_SECRET = NEWSLETTER_SECRET in Vercel. |
| 88 | **CSRF Token Middleware** | Medium | Security | Add CSRF protection to all POST routes. Consider `csrf` package or custom double-submit cookie pattern. |
| 89 | **Supabase RLS Audit** | High | Security | Verify Row Level Security policies on all Supabase tables. Ensure admin client is only used server-side, public client can't bypass policies. |
| 90 | **CSP Nonce Support** | Low | Security | Eliminate `unsafe-inline` from CSP by generating per-request nonces for inline scripts. Requires Next.js middleware integration. |
| ~~91~~ | ~~Salary Negotiation Masterclass~~ | ~~Medium~~ | ~~Content/B2B~~ | ✅ Shipped — `salary-negotiation-dual-perspective` masterclass module added to `fqhc-masterclasses.ts` (leadership category). Covers both sides: HR directors + candidates. NHSC loan repayment, SB 525, bilingual premiums, grant-funded caps, union dynamics, retention ROI formula. Links to `/salary-data`, `/resources`, `/certifications`, `/strategy/scope-of-practice`. |
| ~~92~~ | ~~GA4 Custom Event Tracking~~ | ~~High~~ | ~~Analytics~~ | ✅ Shipped — `src/lib/analytics.ts` with 25+ tracking functions. Instrumented 12 files: newsletter, feedback, waitlist, locum forms, career/manager assessments, resume builder, clinic simulator, intel cards, compare tool, language toggle. |
| ~~93~~ | ~~SEO Quick Wins~~ | ~~Medium~~ | ~~SEO~~ | ✅ Shipped — `public/llms.txt` for AI discoverability, hreflang alternates enabled (x-default/en/es), FAQPage schema on `/guides`, ArticleJsonLd Organization author on all 15 blog posts. |
| 94 | **Expanded Job Scraping — All FQHC Roles** | High | Data/Content | Current scraping only captures ~611 jobs from 4 FQHCs (AltaMed, FHCSD, AHS, La Clinica). Need MUCH wider scope: (1) Add EHR analysts, population health roles, data analysts, quality improvement, compliance, finance, IT/IS, facilities, HR, marketing, grants management, health informatics. (2) Expand scraping to more of our 220 FQHCs — many have career pages we don't scrape yet. (3) Capture ALL back-office roles, not just clinical/care coordination. (4) Build role taxonomy that maps scraped job titles to our 30+ role categories. Goal: become the definitive CA FQHC job aggregator with 1,000+ listings. |
| 95 | **Role-Specific Assessments for New Roles** | High | Engagement/Moat | Build career assessments tailored to expanded role set: EHR analyst (Epic/NextGen proficiency, data governance, workflow optimization), population health analyst (risk stratification, HEDIS measures, panel management), data analyst (SQL, Tableau/Power BI, UDS reporting), quality improvement (PDSA cycles, accreditation), revenue cycle (coding, claims, denial management), compliance officer (HRSA OSV, 340B, HIPAA). Each with role-specific scenarios, scoring domains, salary benchmarks, and career pathway recommendations. Leverage our existing assessment engine architecture. |
| 96 | **Resume Builder — Expanded Role Templates** | High | Engagement | Add resume templates for all new roles from #95: EHR analyst, population health, data analyst, QI coordinator, revenue cycle specialist, compliance officer, grants manager, health informatics. Each template: role-specific bullet bank, key skills/certifications, EHR system proficiency section, program experience (UDS, HEDIS, CalAIM). Templates should reflect what FQHC hiring managers actually screen for. |
| 97 | **Cross-Linking: Resume Builder → Assessment → Jobs** | Medium | UX/Conversion | Make resume builder discoverable and accessible from: (1) Career assessment results page ("Build your resume with these strengths highlighted"), (2) Career insights dashboard, (3) Job listing pages ("Apply with an FQHC-optimized resume"), (4) Career roadmap ("Ready for your next level? Build your resume"). Not aggressive — contextual CTAs that add value. Also link assessment → jobs ("See roles matching your strengths") and jobs → assessment ("Not sure? Take our career assessment first"). |
| 98 | **Newsletter Personalization by Location** | Medium | Engagement | Enhance newsletter system to support location-based customization: (1) Add region preference to newsletter signup (9 CA regions), (2) Store region in Supabase `newsletter_subscribers` table, (3) Filter intel items, job highlights, and regional news by subscriber's region, (4) Generate region-specific newsletter sections. Check if Resend supports merge tags / dynamic content per recipient or if we need to generate separate templates per region. Tech stack check: Resend API, Supabase subscriber segmentation, batch send by region. |
| ~~99~~ | ~~Weekly Roundup Command (`/weekly-roundup`)~~ | ~~High~~ | ~~Content/Newsletter~~ | ✅ Shipped — `.claude/commands/weekly-roundup.md` (366 lines, 8 steps). Look Back (git log + data files), Look Forward (funding cliffs), Job Market Pulse (4 live APIs + static), Site Highlights, 5 web searches → IntelItem code, Intel Brief draft, The Pulse draft, Summary block. Run Fridays before `/intel-brief`. |
| 100 | **Analytics Feedback Loop** | Medium | Analytics/Strategy | `.feedback/` folder + `/feedback-session` command created. Weekly process: (1) Export GA4 CSVs → `.feedback/reports/`, (2) Run `/feedback-session` to analyze and generate insights, (3) Feed insights into content strategy (what to write, what to optimize), (4) Track implementation in `.feedback/SESSION_LOG.md`. |
| 101 | **Career Assessment & 90-Day Plan Separation** | High | UX/Core | **Currently:** assessment + 90-day plan are bundled together in one flow. **Problem:** user expects assessment results FIRST, then 90-day plan as optional follow-up. **Fix:** (1) Assessment flow ends with results page (domain scores, strengths, growth areas, failure factors, employer insights, salary data). (2) After results, offer "Generate Your 90-Day Plan" as a separate CTA — user chooses if they want it. (3) 90-day plan becomes its own standalone page/tool at `/90-day-plan` that can also be accessed directly (not only via assessment). (4) Both are independently downloadable. |
| 102 | **Watkins First 90 Days Screening Questions** | High | Core/Moat | Develop proper screening questions applying Watkins methodology to EACH discipline and role type. Currently STARS type defaults to "sustaining" — user can't choose their transition scenario. **Build:** (1) Pre-plan screening flow: "What best describes your situation?" → STARS type selector (Startup/Turnaround/Accelerated Growth/Realignment/Sustaining) with plain-language descriptions per FQHC role. (2) Role-specific transition screening: questions about the new position, team dynamics, organizational context, reporting structure. (3) Resume-aware screening: if user uploaded resume, extract prior experience to tailor plan (moving from private practice → FQHC? Hospital → community health? Same-org promotion?). (4) Position context: title, department, team size, who they report to, whether the position is new or replacement. (5) Generate STARS diagnosis from answers — don't make user self-diagnose. (6) Each discipline gets custom Watkins application: CHW transition ≠ RN transition ≠ Revenue Cycle transition. |
| 103 | **90-Day Plan Resource Linking** | High | UX/Value | Link and cite relevant resources INSIDE the 90-day plan — both internal site content and external sources. (1) Internal links: career roadmap for their role, relevant certifications, matching guides (ECM workflows for care coordinators, revenue cycle guides for billing staff, CalAIM overview for new hires). (2) External links: HRSA resources, NACHC toolkits, state licensing boards, professional associations. (3) Role-specific resource bundles: "Your first week reading list" with curated articles from our blog + external sources. (4) Certification recommendations linked to `/certifications` with cost/timeline data. |
| 104 | **Downloadable 90-Day Plan (Word + PDF)** | High | UX/Engagement | Make everything downloadable as Word (.docx) AND PDF. Currently only PDF via html2pdf.js. **Build:** (1) PDF download with professional formatting — cover page with name/role/date, table of contents, branded header/footer. (2) Word (.docx) export using docx.js library — editable so managers/candidates can customize their plan. (3) Downloadable handouts: FOGLAMP checklist (1-page PDF), Five Conversations guide (2-page PDF), STARS diagnosis worksheet. (4) Each phase (30/60/90 days) as a standalone printable checklist. |
| 105 | **Watkins Infographics & Handouts** | High | Content/Engagement | Create visual infographics and handouts based on Watkins "The First 90 Days" appendices and methodology. **Build:** (1) STARS Situation Diagnostic — visual flowchart/decision tree ("Am I in a Startup, Turnaround, Accelerated Growth, Realignment, or Sustaining situation?") with FQHC-specific examples for each. (2) Five Conversations Framework — single-page visual showing the 5 manager conversations (Situation, Expectations, Resources, Style, Personal Development) with sample questions tailored to FQHC roles. (3) FOGLAMP Checklist — beautifully formatted 1-page handout (Feedback loops, Onboarding tasks, Get to know people, Learn the culture, Ask for support, Manage energy, Plan ahead). (4) 90-Day Acceleration Planner — blank template version of our plan that users can fill in manually. (5) Transition Risk Assessment — visual scorecard showing common transition failure patterns and how to avoid them. (6) Coalition Building Map — stakeholder analysis template for new FQHC hires. (7) Learning Plan Template — structured approach to learning the new org in first 30 days. All branded with FQHC Talent Exchange, downloadable as PDF, designed as printable handouts. |

---

## 💡 Backlog — Medium-Term (3-6 Months)

| # | Feature | Priority | Value | Notes |
|---|---------|----------|-------|-------|
| 55 | **AI-Powered Matching** | High | Core | Match candidates to jobs based on assessment, experience, preferences |
| 56 | **Admin Dashboard** | High | Operations | View assessment results, candidate pipeline, employer activity |
| 57 | **Candidate Profile Pages** | Medium | UX | Public or semi-public profiles for vetted candidates |
| 58 | **Employer Reviews** | Medium | Content | "Glassdoor for FQHCs" — employee reviews + ratings |
| 59 | **Salary Transparency Tool** | Medium | SEO | Interactive salary explorer by role + region + experience |
| 60 | **Interview Prep Tool** | Medium | Engagement | Role-specific mock interview with scoring |
| 61 | **Mobile App** | Low | Reach | PWA or native app for on-the-go job seekers |
| ~~62~~ | ~~Certification Tracker~~ | ~~Medium~~ | ~~Value~~ | ✅ Shipped as Certification Catalog — see #42 above |
| 63 | **Continuing Education Hub** | Low | Engagement | Curated CEU/CME courses for FQHC professionals |
| 64 | **EHR Skills Assessment** | Medium | Matching | OCHIN Epic, NextGen, eCW proficiency assessment |
| 65 | **Union Organizing Risk Map** | Low | Content | Score FQHCs on unionization likelihood |
| 66 | **Legislative Alert System** | Medium | Value | Track bills affecting FQHC funding, notify subscribers |
| 114 | **Grant Tracker** | Medium | Content/B2B | Page + tool tracking grant opportunities for FQHCs: (1) Active grant opportunities (HRSA, foundation, state, federal) with eligibility criteria, (2) Upcoming deadlines with countdown/calendar view, (3) Grant news and legislation affecting funding streams, (4) Tips for grant writing and compliance (HRSA OSV prep, budget narratives, UDS reporting alignment), (5) Historical grant award data (SAC, CHC, MHCC, BPHC awards by FQHC), (6) Filter by grant type, amount range, eligibility (new vs competing, FQHC size, programs). Complements existing funding-impact page and resilience scorecard. Data sources: HRSA BPHC, Grants.gov, CA DHCS, foundation directories. Could feed into Intel Brief newsletter as "Grant Watch" section. |

---

## 🔮 Backlog — Long-Term (6-12+ Months)

| # | Feature | Priority | Value | Notes |
|---|---------|----------|-------|-------|
| 67 | **Multi-State Expansion** | High | Growth | Phase 1: CO, IL, OR, WA, NY (states with undocumented coverage tracking + similar policy landscape). State comparison dashboard: coverage status, policy changes, FQHC impact by state. Lessons from states scaling back (MN ended, IL cutting). Phase 2: TX, FL (highest FQHC counts). |
| 68 | **Staffing Agency Partnership** | Medium | Revenue | White-label platform for FQHC staffing agencies |
| 69 | **Grant Writing Assistance** | Medium | Value | Help FQHCs write HRSA grants for workforce positions |
| 70 | **Predictive Workforce Analytics** | High | Premium | Forecast hiring needs 6-12 months ahead from funding data |
| 71 | **FQHC Benchmarking Tool** | Medium | B2B | Compare FQHCs on staff ratios, salaries, programs, quality |
| 72 | **Training Program Marketplace** | Low | Revenue | Connect FQHCs with CHW training providers, MA programs, etc. |
| 73 | **Locum/Travel Healthcare** | Low | Revenue | Short-term FQHC placements for hard-to-fill roles |
| 74 | **API for FQHC Data** | Low | Revenue | Paid API access to FQHC intelligence data |

---

## 💰 Go-To-Market & Revenue Strategy

*Updated 2026-03-20 — Pivoted from job placement to audience monetization model*

### Revenue Model: Sell Access, Not Services

**Core insight:** Don't sell TO FQHCs (negative margins, cutting budgets). Sell ACCESS to FQHC decision-makers to vendors/suppliers who want to reach them.

| Revenue Stream | Price | Buyer | Status |
|----------------|-------|-------|--------|
| **Newsletter sponsorship** | $500-2K/issue | AI vendors, EHR companies, staffing agencies | Not started — need subscribers first |
| **Vendor directory / sponsored listings** | $200-1K/month | AI vendors (Abridge, Sunoh.ai), EHR companies | AI Tracker page built — no paid listings yet |
| **Affiliate/referral** | Variable | Staffing agencies (15-25% of placement), training programs ($50-500/enrollment) | Links exist — no tracking |
| **Sponsored content / webinars** | $2-5K/piece | Vendors wanting to present to FQHC audience | Not started |

### What's NOT the Revenue Model

- ~~Job board fees~~ — FQHCs have their own ATS + Indeed
- ~~Job placement/staffing~~ — Requires recruiting operation we don't have
- ~~SaaS tools sold to FQHCs~~ — Budget-constrained buyers cutting staff
- ~~Consulting~~ — Possible long-term, not near-term

### Target Buyers (Who Has Money)

| Buyer | Why They'd Pay | Example |
|-------|---------------|---------|
| AI/health tech vendors | AI Tracker = buying guide for FQHC execs evaluating tools | Abridge (Best in KLAS, AltaMed customer) |
| EHR vendors | EHR compatibility matrix reaches FQHC IT decision-makers | eClinicalWorks, athenahealth, NextGen |
| Staffing agencies | Job seekers on our site = referral pipeline | AMN Healthcare, CompHealth, CHC Solutions |
| Training/certification programs | Cert catalog recommends their programs | CHW training, NHSC programs |
| Revenue cycle companies | Guides/masterclass reach CFOs | RCM vendors |

### 90-Day California Revenue Test

**Month 1 (Week 1-4): Build the Audience**
- [ ] Get 100 Intel Brief subscribers via direct outreach to 174 CA FQHC orgs
- [ ] Send 3 consecutive weekly Intel Briefs (prove cadence)
- [ ] Track open rates, clicks, replies
- [ ] Verify Resend domain (DKIM records in Cloudflare)
- [ ] Build cold outreach email sequence (3-touch)
- [ ] Find 100 target contacts (CEOs, HR directors, CFOs)
- [ ] Send personalized outreach in batches of 10/day

**Month 2 (Week 5-8): Prove Engagement**
- [ ] Send Intel Briefs #4-7 (maintain weekly cadence)
- [ ] Survey subscribers: "What tools is your org evaluating?"
- [ ] Approach first sponsor (Abridge = ideal: Best in KLAS, AltaMed customer, FQHC-focused)
- [ ] Offer $500 single-issue test sponsorship
- [ ] Add affiliate tracking to cert/training recommendations
- [ ] Launch `/sponsor` page with audience stats + pricing

**Month 3 (Week 9-12): First Revenue**
- [ ] Close first sponsor ($500 test)
- [ ] Expand to 2-3 more vendor conversations
- [ ] Add National Watch section (trigger-law states, undocumented rollback tracker)
- [ ] Evaluate: 100+ subscribers + 40%+ open rate + sponsor = go national

**Decision Point at 90 Days:**
- **Green light** (50+ subs, 40%+ opens, sponsor interest) → Go national with intelligence layer
- **Red flag** (< 20 subs, < 20% opens, no replies) → Content isn't resonating; talk to the few who did respond

### What You Have Today (as of 2026-03-20)

1. **215 FQHC profiles** — 90 curated + 125 hrsa-enriched. Core fields 100% complete.
2. **1,053 static + 621 live API jobs** = 1,674 total across 30+ FQHCs
3. **121 curated intel items** across 9 categories with primary sources
4. **19 AI tracker items + 8 vendor comparisons** with EHR matrix
5. **Intel Brief #1 written** — ready to send (March 10 edition in `newsletter-editions.ts`)
6. **Newsletter infrastructure 95% built** — templates, send API, drip sequences, subscriber table, questionnaire
7. **220 per-FQHC strategic reports** with Calendly CTA
8. **25 OKR templates, 18 masterclass modules, 22 case studies**
9. **Cold outreach templates** — 3-email sequence in `marketing/outreach/`
10. **Zero subscribers, zero revenue** — the building phase is over

### National Expansion (Post-Validation)

| Phase | What | When | Effort |
|-------|------|------|--------|
| **1. National Intelligence** | H.R. 1 state tracker, 9 trigger-law states, undocumented coverage rollback across 14 states + DC | After Month 1 (if subs growing) | 2 weeks |
| **2. Vendor Marketplace** | Expand AI Tracker to paid vendor listings, sponsor page | Month 2-3 | 2 weeks |
| **3. Beachhead State** | Full depth in NY, OR, or TX (HRSA import + intel + jobs) | Month 4-6 | 2-3 months |
| **4. Multi-State Pipeline** | Systematize state expansion, 2-4 weeks per new state | Month 6-12 | Ongoing |

### What Blocks Revenue?

| Blocker | Impact | Fix |
|---------|--------|-----|
| **Zero subscribers** | Can't sell sponsorships without an audience | Outreach campaign (this month) |
| **Resend domain verification** | Emails may land in spam | Check DKIM records in Cloudflare |
| **No sponsor page** | Vendors can't self-serve | Build `/sponsor` with audience stats |
| **No open rate tracking** | Can't prove value to sponsors | Wire up Resend webhooks |
| Nothing blocks outreach | Data, tools, content all built | **Start sending emails** |

---

## 🧠 Ideas Parking Lot

*Capture any feature ideas, user feedback, or brainstorms here. Nothing is too small or too crazy.*

- [ ] "FQHC of the Week" featured employer spotlight
- [ ] Job alert emails (notify candidates when matching jobs post)
- [ ] Referral bonuses for candidates who refer other candidates
- [x] FQHC comparison tool (side-by-side compare 2-3 FQHCs) — **SHIPPED #91** `/compare`
- [ ] Credential verification integration (license lookup APIs)
- [ ] Community forum / Slack for FQHC professionals
- [ ] Podcast: interviews with FQHC leaders about hiring
- [ ] Partner with CHW training programs for pipeline
- [ ] Data export for FQHC researchers / CHCF / NACHC
- [ ] Spanish-first content strategy (not just translation)
- [ ] WhatsApp integration for candidate communication
- [ ] SMS reminders for assessment completion / resume download
- [ ] Team Readiness comparison (manager retakes quarterly, sees trends over time)
- [ ] Liberating Structures library page (standalone reference for FQHC managers)
- [ ] Manager peer network / community feature
- [ ] Export Team Readiness results as PDF
- [ ] Onboarding playbook generator (auto-create 30/60/90 plan from assessment)
- [x] ~~Feedback / bug reporter floating button with "we appreciate all feedback" messaging~~ — Shipped!
- [x] ~~Daily content pipeline for layoffs, jobs, blog~~ — Shipped as Claude Code slash commands!
- [ ] Assessment results email with domain scores + Drop invitation
- [ ] Resume completion reminder email
- [x] ~~Cloudflare Email Routing for `hello@fqhctalent.com`~~ — Set up and verified!
- [ ] **OKR DOCX download** — add Word format alongside existing Excel download for each OKR template (user requested)
- [ ] **Company-wide turnaround OKR** — enhanced flagship OKR focused on operational expansion + top-of-scope schedule redesign based on clinic simulator headcount (user requested)
- [ ] Assessment question bank expansion (50+ questions per domain)
- [ ] Assessment A/B testing — compare question variants by predictive accuracy
- [ ] Employer feedback loop — did the hire succeed? Feed into assessment weights
- [ ] "Assessment Verified" badge on candidate profiles
- [ ] Team Readiness + Individual Assessment correlation analysis
- [ ] GA4 cross-domain tracking for healthcaretalent.org + fqhctalent.com
- [ ] Offboarding toolkit page (`/offboarding`) — FQHC-facing landing page for tiered layoff services
- [x] ~~Fast-track page rewrite — remove "48 hours", position around free tools + priority intake~~ — Shipped!
- [ ] "FQHC Layoff Response" email template for outreach to HR directors at FQHCs with layoffs
- [ ] Offboarding case study page — after first successful offboarding, publish results
- [ ] Displaced worker → hiring FQHC geographic matching (map visualization)
- [ ] HRSA UDS quality data integration for 220 FQHCs (clinical quality, patient satisfaction scores)
- [ ] NLRB complaint data integration for labor history tracking
- [ ] OSHA violation data integration for workplace safety tracking
- [x] ~~Policy & intel pipeline (3 slash commands: /scan-policy, /intel-brief, daily-update Step 3)~~ — Built!
- [x] Newsletter signup in footer (email input on every page, feeds Supabase table) — **SHIPPED #93** inline variant in footer
- [ ] Post-assessment email capture ("Email my results + get weekly insights")
- [ ] Post-resume download email capture ("Get career tips in your inbox")
- [ ] Blog inline newsletter CTA (teal callout box mid-article)
- [ ] Exit-intent on /jobs ("Get new FQHC jobs in your inbox every Wednesday")
- [ ] Newsletter preference center page (`/newsletter/preferences`)
- [ ] Resend audience segments (candidate, employer, displaced, drop)
- [ ] CPCA legislative alert RSS/feed monitoring
- [ ] DHCS All Plan Letters (APL) automated scanner for FQHC-relevant bulletins
- [ ] County Board of Supervisors agenda scanner (Alameda, LA, San Diego, SF)
- [ ] CMS Medicaid.gov rule monitoring for provider payment changes
- [ ] Congressional bill tracker for CHCF reauthorization
- [ ] "Intel Brief" as a standalone paid product ($50-100/mo for non-subscribers)

---

## 🔥 Creativity Log — Push the Limits

*Bold ideas that push beyond the obvious. Not backlog items — these are provocations to revisit. Review this section monthly and pick the one that makes you uncomfortable.*

### Data Visualization & Interactivity
- [ ] **Interactive threat dashboard** — real-time policy risk heatmap by CA region, colored by urgency
- [ ] **FQHC financial simulator** — "What happens if federal funding drops 20%?" with sliders for revenue scenarios
- [ ] **Strategic screening GUI** — decision tree for executives: "Should we expand 340B? Launch an IPA? Hire CHWs?"
- [ ] **Animated funding timeline** — scroll-driven animation showing money flowing/drying up across funding sources
- [ ] **Live FQHC comparison radar chart** — select 2-3 FQHCs, visually compare 8 dimensions (funding, quality, workforce, programs, etc.)
- [ ] **Budget waterfall chart** — show how a single FQHC's $10M budget flows through programs, staff, overhead
- [ ] **"What If" workforce calculator** — model: "If we move 5 MAs to top-of-scope and hire 3 CHWs, patient throughput changes by X%"
- [ ] **Heat map of CA underserved areas** — overlay FQHC locations against HPSA/MUA designations + population density

### Deep Cultural & Historical Content
- [ ] **"Roots of the Safety Net"** — interactive CA FQHC origin story (farmworker clinics → Chicano movement → Black Panthers → present)
- [ ] **Cultural humility training framework** — not just a page, but an actual assessment tool for FQHC teams (like Team Readiness but cultural focus)
- [ ] **Oral history project** — record and transcribe stories from FQHC founders, long-tenured CHWs, community elders
- [ ] **"Unexpected Allies" article series** — cross-cultural partnerships that built the safety net (Bobby Kennedy + Cesar Chavez, Jack Geiger + Mound Bayou, etc.)
- [ ] **Spanish-first content strategy** — original Spanish content created for Spanish-speaking audiences, not translated English
- [ ] **Multilingual capacity mapper** — visualize language coverage gaps: which languages does your patient population speak vs. which can your staff serve?
- [ ] **"In Their Own Words"** — video/audio testimonials from patients and CHWs about what FQHCs mean to their communities
- [ ] **Intergenerational stories** — farmworker grandmother → CHW daughter → NP granddaughter — real CA families in the movement

### Technical Workforce Intelligence
- [ ] **Scope-of-practice interactive matrix** — what each role CAN do by CA regulation, expandable to other states
- [ ] **Delegation decision tree** — "Can my MA do this?" interactive flowchart tool
- [ ] **Top-of-license revenue calculator** — estimate revenue impact of moving staff to full scope of practice
- [ ] **Supervision ratio optimizer** — given your team composition, what's the optimal supervision structure?
- [ ] **SB 525 wage impact modeler** — show real cost impact by FQHC size as minimum wage scales to $25/hr
- [ ] **Turnover cost calculator** — "Replacing one care coordinator costs $X in recruiting, training, lost productivity"
- [ ] **Staff scheduling optimizer** — model patient demand vs. staff availability, identify coverage gaps
- [ ] **"The Great Unlocking"** — article series on moving entrenched teams to top-of-scope in cultures resistant to change

### Strategic Intelligence (Big Bets)
- [ ] **FQHC M&A tracker** — who's acquiring whom, financial distress signals, consolidation patterns
- [ ] **Predictive layoff model** — leading indicators (funding cliffs + financial ratios + WARN filings → risk score)
- [ ] **State policy comparison matrix** — CA vs CO vs IL vs OR vs WA on undocumented coverage, Medicaid expansion, FQHC funding
- [ ] **FQHC CEO compensation tracker** — from IRS 990 data, compare exec pay across similar-sized FQHCs
- [ ] **Board composition analyzer** — diversity, expertise gaps, term limits, community representation
- [ ] **Payer mix analyzer** — % Medi-Cal vs Medicare vs private vs uninsured by FQHC, trend over time
- [ ] **Quality score predictor** — which FQHCs are likely to lose accreditation or fail UDS benchmarks?
- [ ] **"Dark data" dashboard** — surface insights from our data assets that nobody else is tracking (e.g., which FQHCs are quietly expanding vs. contracting)

### Product & Business Model
- [ ] **FQHC Intel Brief as paid product** — weekly executive intelligence briefing, $50-100/mo, 500 FQHC leaders = $300-600K ARR
- [ ] **FQHC Board Meeting Prep Kit** — pre-built board presentations using our data: funding landscape, workforce metrics, peer benchmarks
- [ ] **"Strategic Retreat in a Box"** — half-day strategy session materials: Rumult diagnosis, OKR worksheets, case studies, facilitation guide
- [ ] **FQHC CFO Dashboard** — financial intelligence: payer mix trends, revenue per visit, cost per patient, 340B performance
- [ ] **White-label data API** — let PCAs, NACHC, researchers, staffing agencies buy access to our intelligence data
- [ ] **Workforce readiness certification** — badge system for FQHCs that demonstrate top-of-scope staffing, cultural humility, competitive compensation
