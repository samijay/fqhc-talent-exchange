// lib/seo-config.ts
// Central SEO configuration for all pages

export const SITE_URL = "https://www.fqhctalent.com";
export const SITE_NAME = "FQHC Talent";
export const SITE_DESCRIPTION =
  "California's FQHC strategic intelligence platform — executive dashboards, workforce data, policy tracking, free career tools, and 214+ FQHC profiles. Built for the leaders and professionals navigating the biggest crisis in community health history.";

// Root layout metadata — merge this into your existing layout.tsx
export const rootMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FQHC Talent | Strategic Intelligence for California's Community Health Centers",
    template: "%s | FQHC Talent",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "FQHC intelligence",
    "FQHC strategy",
    "community health center California",
    "FQHC workforce data",
    "FQHC policy tracker",
    "FQHC executive dashboard",
    "Medicaid funding cuts FQHC",
    "FQHC resilience scorecard",
    "FQHC salary data",
    "FQHC jobs California",
    "community health worker jobs",
    "FQHC career tools",
    "FQHC directory California",
    "FQHC layoff tracker",
    "H.R. 1 Medicaid FQHC",
    "FQHC AI adoption",
    "CalAIM FQHC",
    "FQHC case studies",
    "FQHC OKR templates",
    "FQHC talent",
  ],
  authors: [{ name: "FQHC Talent" }],
  creator: "FQHC Talent",
  publisher: "FQHC Talent",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "FQHC Talent | Strategic Intelligence & Free Career Tools for California FQHCs",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "FQHC Talent | Strategic Intelligence for California FQHCs",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "x-default": SITE_URL,
      "en": SITE_URL,
      "es": `${SITE_URL}/es`,
    },
  },
  verification: {
    // Add these once you have accounts set up:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  other: {
    "theme-color": "#0d9488", // Teal-600 to match your brand
  },
};

// Per-page metadata — use these in individual page files
export const pageMetadata = {
  jobs: {
    title: "FQHC Jobs in California | Community Health Center Careers",
    description:
      "Browse 600+ open positions at Federally Qualified Health Centers across California. Community health workers, care coordinators, behavioral health specialists, nurses, and more. Updated weekly. 100% free for job seekers.",
    openGraph: {
      title: "FQHC Jobs in California — 600+ Open Positions",
      description:
        "600+ community health center jobs across California. Updated weekly. Free for candidates.",
      url: `${SITE_URL}/jobs`,
    },
    alternates: { canonical: `${SITE_URL}/jobs` },
  },
  forJobSeekers: {
    title:
      "For Job Seekers | Free FQHC Career Tools & Resources",
    description:
      "Explore FQHC jobs across California with free career tools — resume builder, career assessment, salary data, aggregated job postings, and strategic insights for community health professionals.",
    openGraph: {
      title: "For Job Seekers — FQHC Talent",
      description:
        "Free career tools for community health professionals. Resume builder, salary intelligence, and 214+ FQHC profiles.",
      url: `${SITE_URL}/for-job-seekers`,
    },
    alternates: { canonical: `${SITE_URL}/for-job-seekers` },
  },
  // forEmployers: archived — page moved to _archive/cta/pages/for-employers/
  blog: {
    title: "FQHC Strategic Intelligence Blog | Revenue, Compliance & Workforce Data for California",
    description:
      "Data-driven articles for FQHC leaders and professionals: revenue optimization, BLS hiring data, Medi-Cal policy analysis, salary benchmarks, and career guides. Updated weekly with primary source citations.",
    openGraph: {
      title: "FQHC Intelligence Blog — FQHC Talent",
      description:
        "Revenue strategies, hiring data, Medi-Cal policy analysis, and career guides for California FQHCs.",
      url: `${SITE_URL}/blog`,
    },
    alternates: { canonical: `${SITE_URL}/blog` },
  },
  directory: {
    title: "Every FQHC in California — 220 Health Centers with Ratings, Salaries & Programs",
    description:
      "The most complete directory of California's 220 FQHCs — Glassdoor ratings, salary ranges, EHR systems, programs, resilience grades, and strategic reports. Search by region, filter by program, compare side-by-side.",
    openGraph: {
      title: "California FQHC Directory — 220 Health Centers with Ratings & Salaries",
      description:
        "The most complete directory of California FQHCs — Glassdoor ratings, salary ranges, resilience scores, programs, and strategic reports.",
      url: `${SITE_URL}/directory`,
    },
    alternates: { canonical: `${SITE_URL}/directory` },
  },
  resources: {
    title: "FQHC Career Resources | Salary Guides, Tools & Links",
    description:
      "Guides, salary data, tools, and links for community health professionals. Resume builder, FQHC directory, career assessment, and external resources for FQHC workers in California.",
    openGraph: {
      title: "Career Resources — FQHC Talent",
      description:
        "Salary guides, career tools, and resources for FQHC professionals in California.",
      url: `${SITE_URL}/resources`,
    },
    alternates: { canonical: `${SITE_URL}/resources` },
  },
  insights: {
    title:
      "FQHC Executive Dashboard | Market Intelligence, Policy Tracking & Workforce Data",
    description:
      "Real-time intelligence for FQHC executives — legislation tracking, funding cliff countdowns, workforce displacement data, undocumented access policy watch, and change management strategy for California community health centers.",
    openGraph: {
      title: "FQHC Executive Intelligence Dashboard",
      description:
        "Legislation, funding, workforce, and strategy — what California FQHC leaders need to know today.",
      url: SITE_URL,
    },
    alternates: { canonical: SITE_URL },
  },
  guides: {
    title:
      "FQHC Workplace Guides | Clinical Workflows, Billing & Revenue for Health Center Workers",
    description:
      "Practical how-to guides for FQHC workers — ECM workflows, RN co-visit billing, PPS revenue mechanics, CalAIM programs, and documentation standards. Primary sources from HRSA, CMS, and DHCS.",
    openGraph: {
      title: "Workplace Guides — FQHC Talent",
      description:
        "How ECM works, how billing works, and how your role drives revenue at an FQHC. Practical guides with primary sources.",
      url: `${SITE_URL}/guides`,
    },
    alternates: { canonical: `${SITE_URL}/guides` },
  },
  privacy: {
    title: "Privacy Policy | FQHC Talent",
    description:
      "Learn how FQHC Talent collects, uses, and protects your personal information. We are committed to transparency and data privacy for all job seekers and employers.",
    openGraph: {
      title: "Privacy Policy — FQHC Talent",
      description: "How we handle your data at FQHC Talent.",
      url: `${SITE_URL}/privacy`,
    },
    alternates: { canonical: `${SITE_URL}/privacy` },
  },
  terms: {
    title: "Terms of Service | FQHC Talent",
    description:
      "Terms of service for using FQHC Talent, the talent platform connecting community health professionals with Federally Qualified Health Centers in California.",
    openGraph: {
      title: "Terms of Service — FQHC Talent",
      description: "Terms of service for FQHC Talent.",
      url: `${SITE_URL}/terms`,
    },
    alternates: { canonical: `${SITE_URL}/terms` },
  },
  whyFqhc: {
    title: "Why Work at an FQHC? | Career Growth, Loan Repayment & Mission-Driven Healthcare",
    description:
      "Discover why mission-driven healthcare professionals choose FQHCs over hospital systems and private practice. Faster career growth, NHSC loan repayment ($50K–$75K tax-free), broader scope of practice, and meaningful impact serving California's underserved communities.",
    openGraph: {
      title: "Why Work at an FQHC? — FQHC Talent",
      description:
        "Lead sooner. Impact more. Earn more than you think. See how FQHC careers compare to hospitals and private practice.",
      url: `${SITE_URL}/why-fqhc`,
    },
    alternates: { canonical: `${SITE_URL}/why-fqhc` },
  },
  demo: {
    title: "Platform Demo | See FQHC Talent in Action",
    description:
      "Take a visual tour of FQHC Talent — California's only talent platform built for community health centers. See our FQHC directory, job search, resume builder, career assessment, and market intelligence tools.",
    openGraph: {
      title: "Platform Demo — FQHC Talent",
      description:
        "See how we connect community health professionals with FQHCs across California.",
      url: `${SITE_URL}/demo`,
    },
    alternates: { canonical: `${SITE_URL}/demo` },
  },
  about: {
    title:
      "About FQHC Talent | Our Mission to Strengthen Community Health",
    description:
      "FQHC Talent provides strategic workforce intelligence and free career tools for California's community health centers. Learn about our mission to strengthen the safety-net workforce.",
    openGraph: {
      title: "About — FQHC Talent",
      description:
        "The only talent platform built exclusively for FQHCs. Learn about our mission.",
      url: `${SITE_URL}/about`,
    },
    alternates: { canonical: `${SITE_URL}/about` },
  },
  careerRoadmap: {
    title: "FQHC Career Roadmap | Career Paths & Salary Progression in California",
    description:
      "Explore 5 career pathways in California FQHCs — from entry-level to leadership. See salary ranges by region, required certifications, and skills at every level.",
    openGraph: {
      title: "Career Roadmap — FQHC Talent",
      description:
        "5 career tracks with California salary data, certifications, and regional adjustments.",
      url: `${SITE_URL}/career-roadmap`,
    },
    alternates: { canonical: `${SITE_URL}/career-roadmap` },
  },
  certifications: {
    title: "FQHC Certifications | California Certification Guide for Community Health",
    description:
      "15 certifications for California FQHC careers — costs, duration, salary impact, and where to get them. CHW Certificate, CCM, CPC, LCSW, BLS, OCHIN Epic, and more.",
    openGraph: {
      title: "Certification Catalog — FQHC Talent",
      description:
        "California-specific certification guide for FQHC careers. Costs, salary impact, and training programs.",
      url: `${SITE_URL}/certifications`,
    },
    alternates: { canonical: `${SITE_URL}/certifications` },
  },
  careerInsights: {
    title: "FQHC Career Assessment | Discover Your Strengths in Community Health",
    description:
      "Take a free 4-minute career assessment across 5 behavioral domains. Get personalized insights, a 90-day onboarding plan, and certification recommendations for your FQHC role.",
    openGraph: {
      title: "Career Assessment — FQHC Talent",
      description:
        "Free career assessment for FQHC professionals. Get personalized insights and a 90-day plan.",
      url: `${SITE_URL}/career-insights`,
    },
    alternates: { canonical: `${SITE_URL}/career-insights` },
  },
  strategyGuides: {
    title: "FQHC Executive Guides | Real Case Studies with Strategic Framework",
    description:
      "How real FQHCs are solving funding, workforce, and operational challenges — structured around Rumelt's Good Strategy framework. PureView, MCR Health, Highland Health, Sun River Health case studies with measurable outcomes.",
    openGraph: {
      title: "Executive Guides — FQHC Talent",
      description:
        "Real FQHC case studies: federal dependency reduction, revenue diversification, AI implementation, and 340B optimization.",
      url: `${SITE_URL}/strategy/guides`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/guides` },
  },
  strategyOKRs: {
    title: "FQHC OKR Templates | Crisis Change Management for Health Centers",
    description:
      "24 ready-to-use OKR templates for FQHC crisis change management — revenue resilience, workforce retention, patient access, operational efficiency, and cross-department alignment. Break silos, track progress, execute strategy.",
    openGraph: {
      title: "OKR Templates — FQHC Talent",
      description:
        "OKR templates for FQHC leaders facing funding cuts, workforce disruption, and operational challenges.",
      url: `${SITE_URL}/strategy/okrs`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/okrs` },
  },
  strategyCaseStudies: {
    title: "FQHC Case Studies | Real Solutions to Funding & Workforce Challenges",
    description:
      "How FQHCs are reducing federal dependency, diversifying revenue, implementing AI, and retaining workforce — with measurable outcomes and primary source links.",
    openGraph: {
      title: "Case Studies — FQHC Talent",
      description:
        "Real FQHC case studies with verified outcomes: revenue growth, federal dependency reduction, AI adoption.",
      url: `${SITE_URL}/strategy/case-studies`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/case-studies` },
  },
  strategyEconomics: {
    title: "Healthcare Economics for FQHCs | PPS, 340B, FMAP & Value-Based Payment Explained",
    description:
      "Healthcare economics explained at 3 levels — from new hire to executive. PPS reimbursement, 340B drug pricing, FMAP Medicaid financing, HCC risk adjustment, CalAIM ECM, SB 525, and more. With FQHC-specific context and primary sources.",
    openGraph: {
      title: "Healthcare Economics for FQHCs — FQHC Talent",
      description:
        "Every FQHC economic concept explained at 3 levels. Share with your team — from CHWs to the C-suite.",
      url: `${SITE_URL}/strategy/economics`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/economics` },
  },
  strategyFrameworks: {
    title: "Execution Frameworks for FQHCs | Change Management, Decision Tools & Assessments",
    description:
      "12 execution frameworks adapted for FQHCs — Kotter 8-Step, ADKAR, Bridges Transition, Cynefin, Eisenhower Matrix, OODA Loop, STARS, FOGLAMP, DMAIC, PDSA, Rumelt, SWOT+PESTEL. With FQHC applications and primary sources.",
    openGraph: {
      title: "Execution Frameworks for FQHCs — FQHC Talent",
      description:
        "Change management, decision-making, and operational excellence frameworks — adapted for community health centers.",
      url: `${SITE_URL}/strategy/frameworks`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/frameworks` },
  },
  strategyLeaders: {
    title: "FQHC Thought Leaders & Influencers | Who to Follow in Community Health",
    description:
      "28 thought leaders shaping the future of FQHCs — NACHC leadership, state PCA directors, innovative CEOs, policy experts, AI pioneers, and HRSA officials. Follow these voices to stay ahead.",
    openGraph: {
      title: "Thought Leaders — FQHC Talent",
      description:
        "28 FQHC influencers across national leadership, policy, AI, workforce research, and innovative CEOs.",
      url: `${SITE_URL}/strategy/leaders`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/leaders` },
  },
  strategyKnowledgeMap: {
    title: "FQHC Strategy Knowledge Map | How Everything Connects",
    description:
      "See the interlinkages between FQHC case studies, economics concepts, execution frameworks, OKR templates, and thought leaders. 6 strategic themes, 4 learning paths, and 60+ connections with strategic foresight for FQHC executives.",
    openGraph: {
      title: "Strategy Knowledge Map — FQHC Talent",
      description:
        "The master knowledge graph: 6 strategic themes, guided learning paths, and 60+ connections between FQHC strategy content.",
      url: `${SITE_URL}/strategy/knowledge-map`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/knowledge-map` },
  },
  aiTracker: {
    title: "Which AI Tools Are FQHCs Actually Using? 22 Real Deployments Tracked (2026)",
    description:
      "Real FQHC AI adoption data — not hype. 22 verified deployments across community health centers: ambient scribes, RCM automation, scheduling AI. Compare 8 vendors by EHR compatibility. See what's working and what's not.",
    openGraph: {
      title: "FQHC AI Tracker 2026 — FQHC Talent",
      description:
        "22 AI adoption events, 8 vendor comparisons, EHR compatibility matrix. Live tracking of AI implementation across community health centers.",
      url: `${SITE_URL}/ai-tracker`,
    },
    alternates: { canonical: `${SITE_URL}/ai-tracker` },
  },
  newsletter: {
    title: "FQHC Intelligence Briefings | Weekly Executive & Career Updates",
    description:
      "Subscribe to weekly FQHC intelligence: Intel Brief for executives (policy, funding, AI adoption) and The Pulse for job seekers (listings, salary trends, career tools). Every insight backed by primary sources.",
    openGraph: {
      title: "Newsletter — FQHC Talent",
      description:
        "Weekly FQHC intelligence briefings for executives and job seekers. Policy, funding, AI, career updates.",
      url: `${SITE_URL}/newsletter`,
    },
    alternates: { canonical: `${SITE_URL}/newsletter` },
  },
  strategyScopeOfPractice: {
    title: "FQHC Scope-of-Practice Guide | Top-of-License Workforce Management for California",
    description:
      "Interactive scope-of-practice matrix for California FQHCs — 10 roles, delegation rules, supervision chains, and revenue impact of working at the top of license. MD, NP, PA, RN, LVN, MA, CHW, LCSW, AMFT/ASW, RDH.",
    openGraph: {
      title: "Scope-of-Practice Guide — FQHC Talent",
      description:
        "What each FQHC role can do under California law. Interactive delegation matrix with regulatory citations.",
      url: `${SITE_URL}/strategy/scope-of-practice`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/scope-of-practice` },
  },
  strategyCulturalHumility: {
    title: "Cultural Humility for FQHCs | Leveraging Multicultural Workforces in Community Health",
    description:
      "Cultural humility frameworks for FQHC workforce management — CLAS standards, language access, implicit bias, health equity dashboards, and strategies for leveraging 90%+ Latino workforces as a strategic advantage.",
    openGraph: {
      title: "Cultural Humility — FQHC Talent",
      description:
        "How FQHCs can leverage multicultural workforces as a strategic advantage. CLAS standards, practical frameworks, and real examples.",
      url: `${SITE_URL}/strategy/cultural-humility`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/cultural-humility` },
  },
  strategyMovement: {
    title: "The FQHC Movement | California's Story from Farmworker Clinics to Today",
    description:
      "Interactive timeline of the FQHC movement in California — from Cesar Chavez's farmworker clinics to today's Medicaid crisis. 30 events, 8 cross-cultural alliances, and the stories of unexpected heroes who built the safety net.",
    openGraph: {
      title: "The FQHC Movement — FQHC Talent",
      description:
        "From farmworker clinics to today: the untold story of California's community health center movement.",
      url: `${SITE_URL}/strategy/movement`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/movement` },
  },
  strategyOffboarding: {
    title: "Free Transition Resources for Displaced FQHC Workers | FQHC Talent",
    description:
      "Free career tools for community health workers affected by layoffs. Resume builder, career assessment, certification guides, salary data, and aggregated job listings across 214 California FQHCs.",
    openGraph: {
      title: "Transition Resources — FQHC Talent",
      description:
        "Free career tools for displaced community health workers. Resume builder, assessments, certifications, and job listings across 214 California FQHCs.",
      url: `${SITE_URL}/strategy/offboarding`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/offboarding` },
  },
  strategyResilience: {
    title: "FQHC Resilience Scorecard | 214 California FQHCs Scored Across 5 Dimensions",
    description:
      "Every California FQHC scored on program diversity, workforce stability, data maturity, quality indicators, and financial positioning. Search your organization and compare against peers.",
    openGraph: {
      title: "FQHC Resilience Scorecard — FQHC Talent",
      description:
        "See how your FQHC scores across 5 resilience dimensions. 214 California FQHCs ranked with detailed breakdowns.",
      url: `${SITE_URL}/strategy/resilience`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/resilience` },
  },
  salaryData: {
    title: "FQHC Salary Intelligence | 30 Roles × 9 CA Regions | P25/P50/P75 Benchmarks",
    description:
      "California FQHC salary data: P25, P50, and P75 benchmarks for 30 community health roles across 9 regions. Regional cost adjustments, career track progressions, and key insights for workforce planning.",
    openGraph: {
      title: "FQHC Salary Intelligence — FQHC Talent",
      description:
        "Salary benchmarks for 30 FQHC roles across 9 California regions. P25/P50/P75 data with regional adjustments.",
      url: `${SITE_URL}/salary-data`,
    },
    alternates: { canonical: `${SITE_URL}/salary-data` },
  },
  compare: {
    title: "Compare FQHCs Side-by-Side | Resilience, Ratings & Programs",
    description:
      "Compare 2-3 California FQHCs side-by-side across resilience scores, Glassdoor ratings, programs, staffing, funding vulnerability, and more. Data-driven organizational analysis.",
    openGraph: {
      title: "Compare FQHCs — FQHC Talent",
      description:
        "Side-by-side comparison of California FQHCs: resilience, ratings, programs, and workforce data.",
      url: `${SITE_URL}/compare`,
    },
    alternates: { canonical: `${SITE_URL}/compare` },
  },
  pathway: {
    title: "Learning Pathway — Personalized FQHC Career Journey | FQHC Talent",
    description:
      "Select your role and experience level to get a curated learning pathway through guides, assessments, certifications, case studies, and strategic tools for California FQHC professionals.",
    openGraph: {
      title: "Learning Pathway — FQHC Talent",
      description:
        "Personalized learning journey for FQHC professionals. 12 roles × 4 experience levels → curated content pathway.",
      url: `${SITE_URL}/pathway`,
    },
    alternates: { canonical: `${SITE_URL}/pathway` },
  },
  workforceResilience: {
    title: "Workforce Resilience & Retention Hub | FQHC Talent",
    description:
      "22 evidence-based retention strategies for FQHCs organized into 6 pillars — career ladders, compensation, burnout prevention, culture, remote work, and training. Interactive turnover cost calculator and retention benchmarks. Sourced from NACHC, HRSA, SHRM, and BLS.",
    openGraph: {
      title: "Workforce Resilience & Retention Hub — FQHC Talent",
      description:
        "Turnover is destroying FQHC budgets. 22 strategies, a cost calculator, and benchmarks to build a retention machine.",
      url: `${SITE_URL}/strategy/workforce-resilience`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/workforce-resilience` },
  },
  locumTenens: {
    title: "FQHC-Rate Locum Tenens Provider Coverage | FQHC Talent",
    description:
      "Cut locum agency costs by 40-60%. Connect with mission-driven NPs, MDs, PAs, and dentists for temporary FQHC coverage at rates community health centers can afford.",
    openGraph: {
      title: "FQHC-Rate Provider Coverage — FQHC Talent",
      description:
        "Skip the agency markup. Find CA-licensed providers for vacation coverage, recruitment gaps, and extended hours at mission-driven FQHC rates.",
      url: `${SITE_URL}/locum-tenens`,
    },
    alternates: { canonical: `${SITE_URL}/locum-tenens` },
  },
  clinicSimulator: {
    title: "FQHC Clinic Operations Simulator | Staffing, Scheduling & Revenue Modeling",
    description:
      "Interactive clinic operations simulator for California FQHCs. Model staffing ratios, PPS rates, co-visit economics, Provider-of-the-Day breakeven, disease management programs, and economies of scale for 250-1,000 staff operations.",
    openGraph: {
      title: "Clinic Operations Simulator — FQHC Talent",
      description:
        "Model staffing, scheduling, and revenue for your California FQHC. Compare small vs. large operations with 15+ interactive levers.",
      url: `${SITE_URL}/strategy/clinic-simulator`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/clinic-simulator` },
  },
  revenueSimulator: {
    title: "Revenue Impact Simulator | Model FQHC Revenue Scenarios",
    description:
      "Interactive revenue impact simulator for California FQHCs. Model the impact of federal funding changes, 340B pharmacy optimization, top-of-scope staffing, and turnover reduction — with real data and instant results.",
    openGraph: {
      title: "Revenue Impact Simulator — FQHC Talent",
      description:
        "What if federal funding drops 20%? What if you optimize 340B? Explore revenue scenarios for your California FQHC.",
      url: `${SITE_URL}/strategy/revenue-simulator`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/revenue-simulator` },
  },
  login: {
    title: "Sign In | FQHC Talent",
    description:
      "Sign in to your FQHC Talent account. Save favorites, customize your intelligence feed, and track your progress through executive strategy content.",
    openGraph: {
      title: "Sign In — FQHC Talent",
      description:
        "Sign in to personalize your FQHC intelligence feed and save your favorite strategy content.",
      url: `${SITE_URL}/login`,
    },
    alternates: { canonical: `${SITE_URL}/login` },
  },
  dashboard: {
    title: "My Dashboard | FQHC Talent",
    description:
      "Your personalized FQHC intelligence dashboard — curated feed, saved favorites, watchlist, and account settings.",
    robots: { index: false, follow: false },
    openGraph: {
      title: "My Dashboard — FQHC Talent",
      description:
        "Your personalized FQHC intelligence dashboard.",
      url: `${SITE_URL}/dashboard`,
    },
    alternates: { canonical: `${SITE_URL}/dashboard` },
  },
  teamReadiness: {
    title: "Team Readiness Assessment for FQHC Managers | Leadership Tool",
    description:
      "Assess your team's readiness across 5 behavioral domains. Built for FQHC managers, supervisors, and directors. Get personalized management actions, Liberating Structures, and team-building strategies.",
    openGraph: {
      title: "Team Readiness Assessment — FQHC Talent",
      description:
        "Assess your FQHC team's readiness with our 5-domain leadership assessment. Get management actions and team-building tools.",
      url: `${SITE_URL}/team-readiness`,
    },
    alternates: { canonical: `${SITE_URL}/team-readiness` },
  },
  fastTrack: {
    title: "Priority Intake for Displaced FQHC Workers | Free Career Tools",
    description:
      "Free career support for community health workers facing layoffs. Resume builder, career assessment, salary benchmarks, and aggregated FQHC job listings across California. Priority matching for displaced workers.",
    openGraph: {
      title: "Priority Intake — FQHC Talent",
      description:
        "Free tools for displaced healthcare workers. Resume builder, career assessment, and FQHC job listings across California.",
      url: `${SITE_URL}/fast-track`,
    },
    alternates: { canonical: `${SITE_URL}/fast-track` },
  },
  layoffs: {
    title: "3,477+ Community Health Workers Laid Off in California — FQHC Layoff Tracker (2026)",
    description:
      "Every FQHC layoff in California, tracked. WARN Act filings, affected roles, severance details across 20+ organizations. Updated weekly from CA EDD WARN reports. See which regions and roles are hit hardest.",
    openGraph: {
      title: "FQHC Layoff Tracker — FQHC Talent",
      description:
        "Live tracker: 3,477+ community health workers affected by layoffs across California FQHCs. WARN Act filings, roles, and timelines.",
      url: `${SITE_URL}/layoffs`,
    },
    alternates: { canonical: `${SITE_URL}/layoffs` },
  },
  healthcareTimeline: {
    title: "US Healthcare History Timeline 1798–2026 | Policy & Legislation Milestones",
    description:
      "Interactive timeline of US healthcare history — from the Marine Hospital Service (1798) to H.R. 1 Medicaid cuts (2026). Key legislation, policy milestones, and their impact on community health centers.",
    openGraph: {
      title: "US Healthcare History Timeline — FQHC Talent",
      description:
        "228 years of US healthcare history in one interactive timeline. From Marine Hospitals to Medicare to the FQHC crisis of 2026.",
      url: `${SITE_URL}/healthcare-timeline`,
    },
    alternates: { canonical: `${SITE_URL}/healthcare-timeline` },
  },
  unions: {
    title: "FQHC Union Directory | Labor Partnerships & Worker Rights in Community Health",
    description:
      "Directory of unions representing FQHC workers in California — NUHW, SEIU locals, AFSCME, and more. Union contracts, labor timelines, worker rights resources, and partnership frameworks for FQHC leaders.",
    openGraph: {
      title: "FQHC Union Directory — FQHC Talent",
      description:
        "Unions at California FQHCs: who represents workers, contract data, and labor partnership resources for community health centers.",
      url: `${SITE_URL}/unions`,
    },
    alternates: { canonical: `${SITE_URL}/unions` },
  },
  strategyMasterclass: {
    title: "FQHC Executive Masterclass | 15 Deep-Dive Modules for the 2026 Crisis",
    description:
      "15 strategy masterclass modules for FQHC executives — financial survival, revenue recovery, undocumented care access, fundraising, healthcare economics, and crisis leadership. Primary sources from HRSA, NACHC, KFF, and academic research.",
    openGraph: {
      title: "FQHC Executive Masterclass — FQHC Talent",
      description:
        "The 2026 crisis demands new strategy. 15 deep-dive modules on financial survival, revenue recovery, AI, and leadership for FQHC executives.",
      url: `${SITE_URL}/strategy/masterclass`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/masterclass` },
  },
  strategyResearch: {
    title: "FQHC Academic Research Archive | Evidence Base for Community Health Strategy",
    description:
      "Curated academic research, peer-reviewed studies, and evidence-based resources for FQHC executives and policymakers. Primary sources from HRSA, NACHC, KFF, CHCF, and leading universities.",
    openGraph: {
      title: "FQHC Research Archive — FQHC Talent",
      description:
        "Academic research and evidence base for FQHC strategy — peer-reviewed studies, policy briefs, and primary sources.",
      url: `${SITE_URL}/strategy/research`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/research` },
  },
  resumeBuilder: {
    title: "Free FQHC Resume Builder | Community Health Resume Templates",
    description:
      "Build a community health resume in minutes. 8 role-specific templates for CHWs, care coordinators, nurses, behavioral health specialists, and more. Tailored for California FQHC hiring managers. Free, no account needed.",
    openGraph: {
      title: "Free Resume Builder — FQHC Talent",
      description:
        "Free community health resume builder. 8 FQHC-specific templates, bilingual support, and one-click PDF download.",
      url: `${SITE_URL}/resume-builder`,
    },
    alternates: { canonical: `${SITE_URL}/resume-builder` },
  },
  academy: {
    title: "FQHC Academy | Free Interactive Training for Community Health",
    description:
      "Free interactive courses for FQHC leaders and staff. OKRs, clinic operations, compliance, scheduling, and more — with simulations, quizzes, and XP tracking.",
    openGraph: {
      title: "FQHC Academy — Free Interactive Training",
      description:
        "Master community health operations with free interactive courses. OKRs, clinic management, compliance, and career tools.",
      url: `${SITE_URL}/academy`,
    },
    alternates: { canonical: `${SITE_URL}/academy` },
  },
  academyClinicManager: {
    title: "Clinic Manager Master Class | Free FQHC Operations Training",
    description:
      "8-module master class for FQHC clinic managers. PPS billing, team design, scheduling, BH integration, CalAIM, workforce retention, and financial modeling with live simulator exercises.",
    openGraph: {
      title: "Clinic Manager Master Class — FQHC Academy",
      description:
        "Free 8-module course covering PPS revenue, team-based care, scheduling, and financial modeling for FQHC clinic managers.",
      url: `${SITE_URL}/academy/clinic-manager`,
    },
    alternates: { canonical: `${SITE_URL}/academy/clinic-manager` },
  },
  hipaaEssentials: {
    title: "HIPAA Essentials for FQHC Staff | Free Compliance Training",
    description:
      "Free 30-minute HIPAA training for FQHC employees. Covers Privacy Rule, Security Rule, breach response, and daily habits with real community health scenarios and interactive exercises.",
    openGraph: {
      title: "HIPAA Essentials — FQHC Academy",
      description:
        "Free HIPAA compliance training built for FQHCs. 4 modules with interactive quizzes, real scenarios, and XP tracking.",
      url: `${SITE_URL}/academy/hipaa-essentials`,
    },
    alternates: { canonical: `${SITE_URL}/academy/hipaa-essentials` },
  },
  osvPrep: {
    title: "HRSA Operational Site Visit Prep | Free OSV Training for FQHCs",
    description:
      "Prepare for your HRSA Operational Site Visit with this free 37-minute course. Covers all 19 program requirements, top deficiencies (SFDP, credentialing, governance), and a 90-day preparation playbook.",
    openGraph: {
      title: "HRSA OSV Prep — FQHC Academy",
      description:
        "Free HRSA OSV preparation course for FQHC leaders. 19 program requirements, common deficiencies, and a proven 90-day prep timeline.",
      url: `${SITE_URL}/academy/osv-prep`,
    },
    alternates: { canonical: `${SITE_URL}/academy/osv-prep` },
  },
  billingCompliance: {
    title: "Billing Compliance 101 | Free PPS Billing Training for FQHCs",
    description:
      "Free 30-minute FQHC billing compliance course. Master PPS rates, same-day billing rules, documentation requirements, the False Claims Act, and audit readiness with interactive exercises.",
    openGraph: {
      title: "Billing Compliance 101 — FQHC Academy",
      description:
        "Free billing compliance training for FQHCs. PPS rules, same-day billing, documentation, False Claims Act, and audit prep.",
      url: `${SITE_URL}/academy/billing-compliance`,
    },
    alternates: { canonical: `${SITE_URL}/academy/billing-compliance` },
  },
  strategyCompliance: {
    title: "FQHC Compliance Hub | HIPAA, HRSA, OSHA Checklists & Tools",
    description:
      "Interactive compliance checklists, policy templates, and regulatory calendar for FQHCs. Track HIPAA, HRSA, OSHA, billing, and workforce compliance with scoring and progress tracking.",
    openGraph: {
      title: "FQHC Compliance Hub — FQHC Talent",
      description:
        "Free compliance tools for FQHCs. Interactive checklists across 7 domains, policy templates, and regulatory deadline tracking.",
      url: `${SITE_URL}/strategy/compliance`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/compliance` },
  },
  bibliography: {
    title: "FQHC Bibliography | 200+ Curated Resources for Community Health Leaders",
    description:
      "Comprehensive bibliography of FQHC resources — academic programs, thought leaders, research, government data, podcasts, and policy briefs. Curated for executives, managers, and researchers in community health.",
    openGraph: {
      title: "FQHC Bibliography — FQHC Talent",
      description:
        "200+ curated resources for FQHC leaders. Academic programs, thought leaders, research, government data, and podcasts.",
      url: `${SITE_URL}/bibliography`,
    },
    alternates: { canonical: `${SITE_URL}/bibliography` },
  },
  downloads: {
    title: "Free FQHC Downloads | Templates, Reports & Tools",
    description:
      "Download free FQHC tools — OKR templates (Excel), compliance checklists (PDF), policy templates (DOCX), schedule exports, resume PDFs, and clinic simulation reports. All generated from our interactive tools.",
    openGraph: {
      title: "Free Downloads — FQHC Talent",
      description:
        "Free downloadable FQHC tools: Excel templates, PDF checklists, DOCX policies, and clinic simulation reports.",
      url: `${SITE_URL}/downloads`,
    },
    alternates: { canonical: `${SITE_URL}/downloads` },
  },
  strategySchedulePlanner: {
    title: "FQHC Schedule Planner | Staff Scheduling with MA Ratio Optimization",
    description:
      "Visual weekly staff scheduling tool for FQHCs. Optimize MA:provider ratios, compare shift patterns (4×10 vs 5×8), track coverage gaps, model revenue impact, and export to Excel.",
    openGraph: {
      title: "FQHC Schedule Planner — FQHC Talent",
      description:
        "Free Tetris-style schedule planner for FQHCs. Optimize MA ratios, model revenue, compare schedules, and export to Excel.",
      url: `${SITE_URL}/strategy/schedule-planner`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/schedule-planner` },
  },
  compliance: {
    title: "FQHC Risk & Compliance Management | HRSA, HIPAA, Billing",
    description:
      "19 HRSA program requirements, HIPAA data protection, billing compliance. Downloadable checklists, calendars, and risk matrices for California FQHCs.",
    openGraph: {
      title: "Risk & Compliance — FQHC Talent",
      description:
        "FQHC compliance hub: 19 HRSA requirements, HIPAA data protection, billing rules, and annual regulatory calendar.",
      url: `${SITE_URL}/compliance`,
    },
    alternates: { canonical: `${SITE_URL}/compliance` },
  },
  complianceHrsaAudits: {
    title: "HRSA Audit Preparation & OSV Compliance | FQHC Talent",
    description:
      "Prepare for HRSA Operational Site Visits with this comprehensive guide. 19 program requirements, top deficiencies, and a 90-day preparation playbook.",
    openGraph: {
      title: "HRSA Audit Prep — FQHC Talent",
      description:
        "19 HRSA program requirements, common deficiencies, and a proven 90-day OSV preparation timeline.",
      url: `${SITE_URL}/compliance/hrsa-audits`,
    },
    alternates: { canonical: `${SITE_URL}/compliance/hrsa-audits` },
  },
  complianceHipaa: {
    title: "HIPAA Compliance for FQHCs | Privacy Rule, Security Rule & Breach Response",
    description:
      "Complete HIPAA compliance framework for FQHCs. Privacy Rule, Security Rule, breach response procedures, and daily protection habits with FQHC-specific scenarios.",
    openGraph: {
      title: "HIPAA Compliance — FQHC Talent",
      description:
        "HIPAA Privacy Rule, Security Rule, breach response, and risk assessment framework built for FQHCs.",
      url: `${SITE_URL}/compliance/hipaa`,
    },
    alternates: { canonical: `${SITE_URL}/compliance/hipaa` },
  },
  complianceBilling: {
    title: "FQHC Billing Compliance | PPS Rules, Coding & False Claims Act",
    description:
      "Master FQHC billing compliance: PPS billing rules, same-day same-provider billing, documentation standards, False Claims Act, audit readiness, and anti-fraud protections.",
    openGraph: {
      title: "Billing Compliance — FQHC Talent",
      description:
        "PPS billing rules, same-day billing, documentation, False Claims Act, fraud prevention, and audit preparation for FQHCs.",
      url: `${SITE_URL}/compliance/billing`,
    },
    alternates: { canonical: `${SITE_URL}/compliance/billing` },
  },
  complianceCalendar: {
    title: "FQHC Annual Compliance Calendar | Regulatory Deadlines by Month",
    description:
      "Track annual FQHC compliance deadlines month-by-month. HRSA, HIPAA, OSHA, billing, payroll, and workforce compliance dates with action checklists.",
    openGraph: {
      title: "Compliance Calendar — FQHC Talent",
      description:
        "FQHC compliance calendar: HRSA, HIPAA, OSHA, and billing deadlines by month with action checklists.",
      url: `${SITE_URL}/compliance/calendar`,
    },
    alternates: { canonical: `${SITE_URL}/compliance/calendar` },
  },
  complianceKnowledgeBase: {
    title: "FQHC Compliance Knowledge Base | Searchable Regulations & Guidance",
    description:
      "Searchable, indexed knowledge base of FQHC compliance regulations, guidance, and policy documents from HRSA, CMS, DHCS, and HHS.",
    openGraph: {
      title: "Knowledge Base — FQHC Talent",
      description:
        "Searchable compliance knowledge base: HRSA, HIPAA, OSHA, billing, and workforce regulations for FQHCs.",
      url: `${SITE_URL}/compliance/knowledge-base`,
    },
    alternates: { canonical: `${SITE_URL}/compliance/knowledge-base` },
  },
  complianceEducationBarriers: {
    title: "Fighting Education Barriers in Healthcare | EEOC Adverse Impact & Job Requirements",
    description:
      "Challenge education requirements that aren't legally required in California FQHCs. Role-by-role legal analysis, EEOC adverse impact framework, and 4-step process to fight credential inflation.",
    keywords: [
      "education barriers",
      "EEOC",
      "adverse impact",
      "credential inflation",
      "job requirements",
      "FQHC",
      "healthcare workforce",
      "California labor law",
    ],
    openGraph: {
      title: "Fighting Education Barriers — FQHC Talent",
      description:
        "Challenge unnecessary education requirements. EEOC framework, role-by-role analysis, and 4-step challenge process.",
      url: `${SITE_URL}/compliance/education-barriers`,
    },
    alternates: { canonical: `${SITE_URL}/compliance/education-barriers` },
  },
  okrCourse: {
    title: "Master OKRs for Your FQHC | Free Interactive Course with AI Critique",
    description:
      "Free 6-module OKR course designed for FQHC executives. Interactive exercises, scoring simulators, and an AI-powered capstone where you write real OKRs for your health center. Bilingual (English/Spanish). ~45 minutes.",
    openGraph: {
      title: "Master OKRs for Your FQHC — FQHC Academy",
      description:
        "Free interactive OKR training for community health center leaders. 6 modules, hands-on exercises, and AI-powered capstone critique.",
      url: `${SITE_URL}/strategy/okr-course`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/okr-course` },
  },
  okrCourseCapstone: {
    title: "OKR Capstone Project | Write Real OKRs with AI Feedback",
    description:
      "Put your OKR knowledge to the test. Write a real objective and key results for your FQHC and get instant AI-powered critique on measurability, ambition, FQHC relevance, and clarity.",
    openGraph: {
      title: "OKR Capstone Project — FQHC Academy",
      description:
        "Write real OKRs for your FQHC and get AI-powered feedback on measurability, ambition, and strategic alignment.",
      url: `${SITE_URL}/strategy/okr-course/capstone`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/okr-course/capstone` },
  },
  okrTeamSprint: {
    title: "Team OKR Sprint | Build OKRs Together with Your Executive Team",
    description:
      "Free 4-session async sprint where FQHC executive teams build real OKRs together. Strategic alignment voting, objective drafting, key results workshop, and AI readiness assessment. Bilingual (English/Spanish).",
    openGraph: {
      title: "Team OKR Sprint — FQHC Talent",
      description:
        "Free team OKR sprint for FQHC executives. 4 async sessions: alignment, drafting, key results, and AI readiness review.",
      url: `${SITE_URL}/strategy/okr-team-sprint`,
    },
    alternates: { canonical: `${SITE_URL}/strategy/okr-team-sprint` },
  },
};

// California metro areas for location pages
export const californiaMetros = [
  {
    slug: "los-angeles",
    city: "Los Angeles",
    region: "Los Angeles County",
    description:
      "Los Angeles County has the highest concentration of FQHCs in California, serving over 1.5 million patients. Find community health jobs across LA's extensive network of community clinics.",
    fqhcCount: "70+",
  },
  {
    slug: "san-diego",
    city: "San Diego",
    region: "San Diego County",
    description:
      "San Diego's FQHCs serve diverse border communities with specialized programs in behavioral health and chronic disease management. Find FQHC jobs in San Diego County.",
    fqhcCount: "15+",
  },
  {
    slug: "san-francisco-bay-area",
    city: "San Francisco Bay Area",
    region: "Bay Area",
    description:
      "The Bay Area's FQHCs span San Francisco, Oakland, San Jose, and surrounding communities, serving some of California's most diverse patient populations.",
    fqhcCount: "40+",
  },
  {
    slug: "sacramento",
    city: "Sacramento",
    region: "Sacramento County",
    description:
      "Sacramento's FQHCs serve the capital region with growing programs in Enhanced Care Management and behavioral health integration.",
    fqhcCount: "10+",
  },
  {
    slug: "fresno",
    city: "Fresno",
    region: "Central Valley",
    description:
      "The Central Valley's FQHCs serve California's agricultural heartland, with high demand for bilingual community health workers and promotoras.",
    fqhcCount: "15+",
  },
  {
    slug: "riverside-san-bernardino",
    city: "Riverside & San Bernardino",
    region: "Inland Empire",
    description:
      "The Inland Empire's rapidly growing FQHC network is expanding to meet the needs of one of California's fastest-growing regions.",
    fqhcCount: "20+",
  },
];
