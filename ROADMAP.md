# FQHC Talent Exchange — Product Roadmap & Feature Tracker

*Last updated: 2026-02-19*

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
| 79 | **Fast-Track Repositioning** | High | GTM | Remove "48-hour" promise. Reposition around free tools (resume builder, assessment, insights, directory, jobs). For FQHCs: tiered offboarding services. See "Strategic Pivot" above. |
| 80 | **Offboarding Toolkit Page** | High | Revenue | `/offboarding` — FQHC-facing page: "Turn layoffs into transitions." Free tier (self-serve tools), Managed tier (we intake workers), Premium tier (placement). |
| 81 | **FQHC Data Enrichment** | Medium | Data | Populate quality scores, violations, labor history for 220 FQHCs from HRSA UDS, CMS, OSHA, NLRB data. |
| 82 | **HRSA-Import FQHC Enrichment** | Medium | Data | Add missing data (patient/staff counts, programs, EHR, Glassdoor, salary ranges) to 131 HRSA-imported FQHC entries. |

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
| 67 | **Multi-State Expansion** | High | Growth | Expand beyond California (TX, NY, FL have most FQHCs) |
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
2. **177+ job listings** with real salary data + 548 live API-scrapeable jobs across 4 FQHCs
3. **Career assessment** — 5 behavioral domains, role-specific scenarios, transition readiness scoring
4. **Resume builder** — FQHC-optimized, 8 role templates, 17 languages
5. **Career roadmap** — 5 tracks, 4 levels, CA salary data with regional multipliers
6. **Certification catalog** — 15 CA-specific certs with ROI data
7. **Layoff intelligence** — 15 tracked events, 2,500+ affected workers
8. **Market intelligence dashboard** — funding cliffs, regional snapshots, role demand, salary intel
9. **Manager Team Readiness** — B2B lead gen tool (assess your team, then offer to help hire)
10. **The Drop** — exclusive matching program with waitlists
11. **Interactive demo** at `/demo` for sharing with prospects

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
| Fast-track promises "48 hours" | Sets unrealistic expectations | Reposition around free tools + priority intake (in progress) |
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
- [ ] Cloudflare Email Routing for `hello@fqhctalent.com`
- [ ] Assessment question bank expansion (50+ questions per domain)
- [ ] Assessment A/B testing — compare question variants by predictive accuracy
- [ ] Employer feedback loop — did the hire succeed? Feed into assessment weights
- [ ] "Assessment Verified" badge on candidate profiles
- [ ] Team Readiness + Individual Assessment correlation analysis
- [ ] GA4 cross-domain tracking for healthcaretalent.org + fqhctalent.com
- [ ] Offboarding toolkit page (`/offboarding`) — FQHC-facing landing page for tiered layoff services
- [ ] Fast-track page rewrite — remove "48 hours", position around free tools + priority intake
- [ ] "FQHC Layoff Response" email template for outreach to HR directors at FQHCs with layoffs
- [ ] Offboarding case study page — after first successful offboarding, publish results
- [ ] Displaced worker → hiring FQHC geographic matching (map visualization)
- [ ] HRSA UDS quality data integration for 220 FQHCs (clinical quality, patient satisfaction scores)
- [ ] NLRB complaint data integration for labor history tracking
- [ ] OSHA violation data integration for workplace safety tracking
