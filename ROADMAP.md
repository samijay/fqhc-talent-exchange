# FQHC Talent Exchange — Product Roadmap & Feature Tracker

*Last updated: 2026-02-27*

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

---

## 🔨 In Progress (Current Sprint)

### Strategic Pivot: Repositioning Fast-Track & GTM

**Problem:** The "48-hour placement guarantee" on `/fast-track` isn't realistic yet — no employer pipeline to fulfill it. Need to reposition.

**New positioning — For Candidates (Displaced Workers):**
- Lead with **free tools**: Resume Builder, Career Assessment, Career Roadmap, Certifications
- Position as the **#1 aggregator** for FQHC jobs, insights, directory (220 FQHCs, 177+ listings)
- Fast-track becomes a **priority intake** form, not a delivery promise
- Message: "We help you get job-ready — assessment, resume, career plan — all free, all designed for community health"

**New positioning — For FQHCs (Employers facing layoffs):**
- Lead with **layoff support**: "Your workers deserve a soft landing"
- **Free tier:** Offboarding toolkit — resume builder access, career assessment for affected staff, job board aggregation across 220 FQHCs
- **Paid tier 1:** Managed offboarding — we intake your displaced workers, assess them, build their resumes, promote them to hiring FQHCs
- **Paid tier 2:** Placement services — curated matches via The Drop, facilitated intros, follow-up
- Message: "Turn layoffs into transitions. We help your displaced staff land at FQHCs that are hiring."

**Tiered Service Model:**
| Tier | For Candidates | For FQHCs | Price |
|------|---------------|-----------|-------|
| **Free** | Resume builder, assessment, career roadmap, certifications, job board, directory | List in directory, access to candidate pool | $0 |
| **Priority** | Fast-track intake, priority matching, career coaching | Managed offboarding for displaced staff, employer branding | $500-1,500/event |
| **Premium** | The Drop (curated matches, 48h employer response) | Talent Drop (batch of 5-10 pre-screened candidates), dedicated sourcing | $2-5K/placement or subscription |

---

## 📋 Backlog — Near-Term (Next 1-3 Months)

| # | Feature | Priority | Value | Notes |
|---|---------|----------|-------|-------|
| ~~40~~ | ~~Feedback / Bug Reporter Button~~ | ~~High~~ | ~~UX/Trust~~ | ✅ Shipped — see #40 above |
| ~~41~~ | ~~Talent Drop System~~ | ~~High~~ | ~~Revenue~~ | ✅ Shipped as The Drop — see #46 above |
| 42 | **Employer Dashboard** | High | Revenue | Portal for FQHCs to review candidates, track pipeline, manage postings |
| 43 | **User Authentication** | High | Foundation | Accounts for candidates + employers. Required for dashboard/drops. |
| 44 | **Manager 90-Day Plan Generator** | Medium | B2B | Extend first-90-days.ts for 4 leadership roles with team-specific plans |
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
| 80 | **Offboarding Toolkit Page** | High | Revenue | `/offboarding` — FQHC-facing page: "Turn layoffs into transitions." Free tier (self-serve tools), Managed tier (we intake workers), Premium tier (placement). |
| 81 | **FQHC Data Enrichment** | Medium | Data | Populate quality scores, violations, labor history for 220 FQHCs from HRSA UDS, CMS, OSHA, NLRB data. |
| 82 | **HRSA-Import FQHC Enrichment** | Medium | Data | Add missing data (patient/staff counts, programs, EHR, Glassdoor, salary ranges) to 131 HRSA-imported FQHC entries. |
| 83 | **Newsletter Infrastructure** | High | Engagement | Supabase `newsletter_subscribers` table, `/api/newsletter/subscribe` + `/unsubscribe` routes, footer signup component, preference center. Two tracks: "Intel Brief" (employer) + "The Pulse" (candidate). |
| 84 | **Newsletter Signup Page** | High | Engagement | `/newsletter` — standalone signup with audience selector (FQHC Leader / Candidate / Both), region preference, role interest. Bilingual. |
| 85 | **Intel Brief Weekly Template** | High | Content/Revenue | Email template for weekly FQHC Intel Brief: policy analysis, workforce data, market signals, sourced with primary links. Executive-facing. |
| 86 | **The Pulse Weekly Template** | High | Content | Email template for weekly candidate newsletter: job market summary, policy in plain language, free tool CTAs. Warm/actionable tone. |
| 87 | **Welcome Drip Sequences** | Medium | Engagement | 5-email candidate sequence (14 days) + 4-email employer sequence (21 days). Post-signup nurture leveraging assessment, tools, market data. |

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

## 💰 Go-To-Market & First Dollar Strategy

### What You Have Today

1. **220 FQHC profiles** — the most comprehensive CA directory (funding vulnerability, union status, programs, EHR, quality scores, labor history)
2. **177+ job listings** with real salary data + 588 live API-scrapeable jobs across 4 FQHCs
3. **Career assessment** — 5 behavioral domains, role-specific scenarios, transition readiness scoring
4. **Resume builder** — FQHC-optimized, 8 role templates, 17 languages
5. **Career roadmap** — 5 tracks, 4 levels, CA salary data with regional multipliers
6. **Certification catalog** — 15 CA-specific certs with ROI data
7. **Layoff intelligence** — 15 tracked events, 2,500+ affected workers
8. **Executive intelligence dashboard** — legislation, funding cliffs, workforce data, undocumented access watch, change management playbook, 20+ curated intel items
9. **Intelligence-led homepage** — breaking intel, funding cliff countdown, two-audience split (Leaders vs Job Seekers)
10. **Manager Team Readiness** — B2B lead gen tool (assess your team, then offer to help hire)
11. **The Drop** — exclusive matching program with waitlists
12. **Interactive demo** at `/demo` for sharing with prospects
13. **Policy & intel pipeline** — 6 slash commands: `/daily-update` (WARN + jobs + policy + AI scan), `/scan-policy` (deep legislative dive), `/intel-brief` (newsletter generator), `/update-layoffs`, `/scrape-jobs`, `/draft-blog`
14. **FQHC Intel Brief** — weekly executive briefing template with primary source links, cross-referenced against our proprietary data
15. **Strategic operating environment** — Rumelt-framework homepage (Challenge → Response → Execution), 4 new strategy pages (guides, OKRs, case studies, AI tracker), no email/hire CTAs
16. **Executive Guides** — 6 real case studies with verified outcomes and primary sources, structured around Good Strategy framework
17. **OKR Templates** — 12 ready-to-use templates for FQHC crisis change management across 5 domains
18. **AI Tracker** — 8 AI adoption items tracked across clinical documentation, revenue cycle, scheduling, care coordination

### Two-Track GTM

#### Track A: Candidate Acquisition (Free — Volume Play)
Position as the **#1 free career platform for community health workers**:
- Resume builder → Career assessment → Career roadmap → Certifications → Job listings
- **For displaced workers:** "Get job-ready in 30 minutes — free resume, free assessment, free career plan"
- **For career changers:** "Discover your path in community health"
- **SEO + content marketing** drives organic traffic; tools convert to waitlist signups
- Every candidate who completes assessment + resume = qualified lead for The Drop

#### Track B: FQHC Revenue (Paid — Tiered Services)

**Lead with layoffs** — FQHCs facing workforce reductions need a partner:

| Tier | Service | Price | Trigger |
|------|---------|-------|---------|
| **Free** | Directory listing, access to candidate pool, self-serve insights | $0 | Any FQHC |
| **Offboarding Lite** | We intake displaced workers, build resumes, assess skills, promote to hiring FQHCs | $500-1,500/event | FQHC announces layoffs |
| **Offboarding Pro** | Managed transition: dedicated support, career coaching, priority matching | $2-5K/event | Larger layoffs (50+ workers) |
| **The Drop** | Monthly batch of 5-10 pre-screened, assessed candidates for open roles | $500-1,500/mo or $200-500/intro | Actively hiring FQHCs |
| **Placement** | Direct placement with success guarantee | 10-15% first-year salary | Hard-to-fill roles (RN, BH, dental) |

**Why this works:**
- **Layoffs create urgency** — FQHCs doing layoffs want to do right by their staff
- **Free tools build trust** — candidates experience value before we pitch employers
- **Data is the moat** — 220 FQHCs, quality scores, labor history, live job counts
- **Offboarding → placement pipeline** — workers we help today become candidates we place tomorrow

### GTM Sequence (Updated)

| Phase | Action | Revenue Model | Timeline |
|-------|--------|---------------|----------|
| **1. Free Value** | Platform live. 220 FQHCs, tools, content, SEO. | None — candidate acquisition | ✅ Done |
| **2. Outreach** | Email 10-15 HR directors. Lead with layoff data + their FQHC profile. Offer free "Talent Intelligence Brief" for their region. | None — relationship building | Week 1-2 |
| **3. Offboarding Pilot** | Partner with 1-2 FQHCs facing layoffs. Offer managed offboarding for displaced staff. | Offboarding fee ($500-1,500) | Week 2-4 |
| **4. First Placement** | Match displaced workers to hiring FQHCs via The Drop or direct placement. | Placement fee ($2-5K) | Week 4-8 |
| **5. Talent Drop Pilot** | Offer 3 hiring FQHCs a monthly Talent Drop. | Subscription ($500-1,500/mo) | Month 2-3 |
| **6. Scale** | Employer dashboard, automated matching, multi-region. | Recurring revenue | Month 3-6 |

### What Blocks Revenue?

| Blocker | Impact | Fix |
|---------|--------|-----|
| ~~Fast-track promises "48 hours"~~ | ~~Sets unrealistic expectations~~ | ✅ Repositioned — free tools + priority intake (shipped #51) |
| No employer dashboard | Can't show candidates at scale | Build after first manual placement |
| No auth system | Can't gate premium features | Build after first revenue |
| **Nothing blocks outreach** | You have data, tools, and content no competitor has | Pick up the phone |

### The Honest Answer

The platform is strong. The data is unique. The tools are real. What's needed is **10 outbound emails to FQHC HR directors** — specifically:
1. FQHCs that just did layoffs (offer offboarding support)
2. FQHCs that are actively hiring (offer The Drop)
3. FQHCs in regions with both layoffs AND hiring (the arbitrage opportunity)

---

## 🧠 Ideas Parking Lot

*Capture any feature ideas, user feedback, or brainstorms here. Nothing is too small or too crazy.*

- [ ] "FQHC of the Week" featured employer spotlight
- [ ] Job alert emails (notify candidates when matching jobs post)
- [ ] Referral bonuses for candidates who refer other candidates
- [ ] FQHC comparison tool (side-by-side compare 2-3 FQHCs)
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
- [ ] Newsletter signup in footer (email input on every page, feeds Supabase table)
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
