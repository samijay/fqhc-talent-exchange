// =============================================================================
// FQHC Bibliography Data
// Typed data file for the FQHC Master Bibliography & Resource Guide
// Source: resources/fqhc-bibliography.md
// =============================================================================

export type BibliographyCategory =
  | "academic-programs"
  | "researchers"
  | "undocumented-care"
  | "scale-economics"
  | "financial-management"
  | "governance"
  | "strategic-planning"
  | "news-intelligence"
  | "data-dashboards"
  | "podcasts"
  | "government-resources"
  | "key-statistics";

export type ResourceType =
  | "program"
  | "researcher"
  | "report"
  | "tool"
  | "podcast"
  | "dataset"
  | "government"
  | "article"
  | "book"
  | "organization";

export interface BibliographyEntry {
  id: string;
  title: string;
  author?: string;
  organization?: string;
  url?: string;
  description: string;
  category: BibliographyCategory;
  subcategory?: string;
  type: ResourceType;
}

export interface BibliographySection {
  id: BibliographyCategory;
  title: string;
  esTitle: string;
  description: string;
  esDescription: string;
  icon: string; // Lucide icon name
}

// =============================================================================
// SECTIONS
// =============================================================================

export const BIBLIOGRAPHY_SECTIONS: BibliographySection[] = [
  {
    id: "academic-programs",
    title: "Academic Programs & Executive Education",
    esTitle: "Programas Académicos y Educación Ejecutiva",
    description:
      "Graduate programs, leadership development, and professional certifications for FQHC executives and emerging leaders.",
    esDescription:
      "Programas de posgrado, desarrollo de liderazgo y certificaciones profesionales para ejecutivos de FQHC y líderes emergentes.",
    icon: "GraduationCap",
  },
  {
    id: "researchers",
    title: "Top Researchers & Thought Leaders",
    esTitle: "Investigadores Principales y Líderes de Opinión",
    description:
      "The leading scholars and research centers shaping FQHC policy, quality measurement, and community health center economics.",
    esDescription:
      "Los principales académicos y centros de investigación que dan forma a la política, medición de calidad y economía de los centros de salud comunitarios.",
    icon: "BookOpen",
  },
  {
    id: "undocumented-care",
    title: "Undocumented Patient Care",
    esTitle: "Atención a Pacientes Indocumentados",
    description:
      "Peer-reviewed studies, legal frameworks, policy analysis, and best practice guides for serving undocumented patients.",
    esDescription:
      "Estudios revisados por pares, marcos legales, análisis de políticas y guías de mejores prácticas para atender a pacientes indocumentados.",
    icon: "HeartHandshake",
  },
  {
    id: "scale-economics",
    title: "Scale Economics & Operational Frameworks",
    esTitle: "Economías de Escala y Marcos Operacionales",
    description:
      "Research on FQHC efficiency, operational excellence frameworks, and growth strategies including M&A and IPA formation.",
    esDescription:
      "Investigación sobre eficiencia de FQHC, marcos de excelencia operativa y estrategias de crecimiento incluyendo fusiones y formación de IPA.",
    icon: "TrendingUp",
  },
  {
    id: "financial-management",
    title: "Financial Management & Revenue",
    esTitle: "Gestión Financiera e Ingresos",
    description:
      "PPS rate optimization, 340B program resources, revenue diversification strategies, and financial health benchmarks.",
    esDescription:
      "Optimización de tarifas PPS, recursos del programa 340B, estrategias de diversificación de ingresos y puntos de referencia de salud financiera.",
    icon: "DollarSign",
  },
  {
    id: "governance",
    title: "Governance & Leadership",
    esTitle: "Gobernanza y Liderazgo",
    description:
      "Board requirements, CEO/CFO competency frameworks, succession planning, and federal governance compliance.",
    esDescription:
      "Requisitos de la junta directiva, marcos de competencias para CEO/CFO, planificación de sucesión y cumplimiento de gobernanza federal.",
    icon: "Users",
  },
  {
    id: "strategic-planning",
    title: "Strategic Planning Frameworks",
    esTitle: "Marcos de Planificación Estratégica",
    description:
      "FQHC-relevant strategy frameworks including scenario planning, Porter's Five Forces, Blue Ocean, and value-based care models.",
    esDescription:
      "Marcos estratégicos relevantes para FQHC incluyendo planificación de escenarios, las Cinco Fuerzas de Porter, Océano Azul y modelos de atención basada en valor.",
    icon: "Target",
  },
  {
    id: "news-intelligence",
    title: "News, Journalism & Intelligence Sources",
    esTitle: "Noticias, Periodismo y Fuentes de Inteligencia",
    description:
      "Tiered news sources from must-read daily publications to FQHC-specific outlets, investigative journalism, and consulting firms.",
    esDescription:
      "Fuentes de noticias organizadas por niveles desde publicaciones diarias esenciales hasta medios específicos de FQHC, periodismo investigativo y firmas de consultoría.",
    icon: "Newspaper",
  },
  {
    id: "data-dashboards",
    title: "Data Dashboards & Benchmarking",
    esTitle: "Tableros de Datos y Evaluación Comparativa",
    description:
      "HRSA data warehouse, quality dashboards, financial benchmarking tools, and state-level reporting systems.",
    esDescription:
      "Almacén de datos de HRSA, tableros de calidad, herramientas de evaluación financiera y sistemas de informes a nivel estatal.",
    icon: "BarChart3",
  },
  {
    id: "podcasts",
    title: "Podcasts & Media",
    esTitle: "Podcasts y Medios",
    description:
      "Audio and video resources including the longest-running CHC podcast, historical documentaries, and leadership interviews.",
    esDescription:
      "Recursos de audio y video incluyendo el podcast más antiguo de CHC, documentales históricos y entrevistas de liderazgo.",
    icon: "Headphones",
  },
  {
    id: "government-resources",
    title: "Government & Congressional Resources",
    esTitle: "Recursos Gubernamentales y del Congreso",
    description:
      "CRS reports, GAO audits, MACPAC analyses, key legislation, and HRSA/CMS reference materials.",
    esDescription:
      "Informes del CRS, auditorías del GAO, análisis de MACPAC, legislación clave y materiales de referencia de HRSA/CMS.",
    icon: "Landmark",
  },
  {
    id: "key-statistics",
    title: "Key Statistics",
    esTitle: "Estadísticas Clave",
    description:
      "Essential data points on health center patients, financial margins, workforce shortages, and program adoption rates.",
    esDescription:
      "Datos esenciales sobre pacientes de centros de salud, márgenes financieros, escasez de personal y tasas de adopción de programas.",
    icon: "Hash",
  },
];

// =============================================================================
// Helper to generate kebab-case IDs from titles
// =============================================================================

const toKebabCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

// =============================================================================
// ENTRIES
// =============================================================================

export const BIBLIOGRAPHY_ENTRIES: BibliographyEntry[] = [
  // ---------------------------------------------------------------------------
  // 1. Academic Programs & Executive Education
  // ---------------------------------------------------------------------------

  // NACHC Leadership Programs
  {
    id: "c-suite-leadership-exchange-ceo",
    title: "C-Suite Leadership Exchange — CEO",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "Peer-to-peer in-person cohort for sitting CEOs; capstone project; NACHC's flagship leadership program.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },
  {
    id: "c-suite-leadership-exchange-cfo",
    title: "C-Suite Leadership Exchange — CFO",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "In-person cohort for sitting CFOs covering financial strategy, RCM, and grants management.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },
  {
    id: "c-suite-leadership-exchange-clinical",
    title: "C-Suite Leadership Exchange — Clinical",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "In-person cohort for CMOs/CDOs focused on quality, clinical operations, and provider leadership.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },
  {
    id: "new-leaders-exchange-nle",
    title: "New Leaders Exchange (NLE)",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "6-month virtual + in-person program for emerging leaders with mentorship, capstone, and peer learning.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },
  {
    id: "nle-cfo-program",
    title: "NLE CFO Program",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "6-month virtual program for aspiring CFOs covering RCM, data security, and business continuity.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },
  {
    id: "cfo-leadership-institute-cfoi",
    title: "CFO Leadership Institute (CFOi)",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "6 monthly workshops for current CFOs with deep dives on FQHC-specific finance.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },
  {
    id: "emerging-leaders-program",
    title: "Emerging Leaders Program",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "Mixed-format leadership pipeline development program for mid-career professionals.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },
  {
    id: "clinical-leadership-program",
    title: "Clinical Leadership Program",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "Mixed-format program for clinical staff focused on evidence-based practice and team leadership.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },
  {
    id: "operations-finance-institute",
    title: "Operations & Finance Institute",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "Mixed-format program covering FQHC-specific operational management for operations and finance staff.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },
  {
    id: "board-member-training",
    title: "Board Member Training",
    organization: "NACHC",
    url: "https://www.nachc.org/trainings-and-conferences/",
    description:
      "Self-paced + cohort training for board members on governance, fiduciary duties, and compliance.",
    category: "academic-programs",
    subcategory: "NACHC Leadership Programs",
    type: "program",
  },

  // Graduate Programs
  {
    id: "east-carolina-university-chc-certificate",
    title: "Graduate Certificate in CHC Administration",
    organization: "East Carolina University",
    description:
      "Only graduate certificate specifically designed for CHC leadership; online, partnership with NACHC.",
    category: "academic-programs",
    subcategory: "Graduate Programs",
    type: "program",
  },
  {
    id: "columbia-university-mailman-mha",
    title: "MHA / Health Policy & Management",
    organization: "Columbia University Mailman",
    description:
      "Sara Rosenbaum's intellectual home (via GWU); strong safety-net focus in health policy and management.",
    category: "academic-programs",
    subcategory: "Graduate Programs",
    type: "program",
  },
  {
    id: "johns-hopkins-bloomberg-mha",
    title: "MHA / Health Services Research",
    organization: "Johns Hopkins Bloomberg",
    description:
      "Leiyu Shi's CHC research base; strongest quantitative methods for health services research.",
    category: "academic-programs",
    subcategory: "Graduate Programs",
    type: "program",
  },
  {
    id: "unc-gillings-mha",
    title: "MHA / Health Policy & Management",
    organization: "UNC Gillings",
    description:
      "Rural health specialty; FQHC-relevant community health focus in health policy and management.",
    category: "academic-programs",
    subcategory: "Graduate Programs",
    type: "program",
  },
  {
    id: "usc-price-mha",
    title: "MHA / Health Administration",
    organization: "USC Price",
    description:
      "Strong California policy focus; Medicaid/Medi-Cal specialty in health administration.",
    category: "academic-programs",
    subcategory: "Graduate Programs",
    type: "program",
  },
  {
    id: "gw-milken-institute-mha",
    title: "MHA / Health Policy",
    organization: "GW Milken Institute",
    description:
      "Home of the Geiger Gibson Program; CHC policy research epicenter for health policy studies.",
    category: "academic-programs",
    subcategory: "Graduate Programs",
    type: "program",
  },
  {
    id: "ucsf-health-programs",
    title: "Various Health Programs",
    organization: "UCSF",
    description:
      "Kevin Grumbach's primary care research; Bay Area FQHC connections and community health focus.",
    category: "academic-programs",
    subcategory: "Graduate Programs",
    type: "program",
  },
  {
    id: "ohsu-ochin-health-informatics",
    title: "Health Informatics Research",
    organization: "OHSU/OCHIN",
    description:
      "Jennifer DeVoe's FQHC data network; EHR/HIT research in health informatics.",
    category: "academic-programs",
    subcategory: "Graduate Programs",
    type: "program",
  },

  // HRSA-Funded Training
  {
    id: "thcgme-teaching-health-center-gme",
    title: "Teaching Health Center GME (THCGME)",
    organization: "HRSA",
    url: "https://bhw.hrsa.gov/funding/apply-grant/teaching-health-center-graduate-medical-education",
    description:
      "Residency training in community health centers funded by HRSA.",
    category: "academic-programs",
    subcategory: "HRSA-Funded Training",
    type: "program",
  },
  {
    id: "weitzman-institute",
    title: "Weitzman Institute",
    organization: "CHC Inc.",
    url: "https://www.weitzmaninstitute.org/",
    description:
      "Applied research and training institute at Community Health Center, Inc.",
    category: "academic-programs",
    subcategory: "HRSA-Funded Training",
    type: "program",
  },
  {
    id: "bphc-technical-assistance",
    title: "BPHC Technical Assistance",
    organization: "HRSA",
    url: "https://bphc.hrsa.gov/technical-assistance",
    description:
      "Compliance, operations, and quality technical assistance for health centers.",
    category: "academic-programs",
    subcategory: "HRSA-Funded Training",
    type: "program",
  },

  // California-Specific Programs
  {
    id: "healthmanagement-plus",
    title: "HealthManagement+",
    organization: "CPCA",
    description:
      "California FQHC leadership development program provided by CPCA.",
    category: "academic-programs",
    subcategory: "California-Specific Programs",
    type: "program",
  },
  {
    id: "leadership-equity-program",
    title: "Leadership Equity Program",
    organization: "CPCA",
    description:
      "DEI-focused leadership development program for California health center leaders.",
    category: "academic-programs",
    subcategory: "California-Specific Programs",
    type: "program",
  },
  {
    id: "fache-designation",
    title: "FACHE Designation",
    organization: "ACHE",
    description:
      "Healthcare executive credential; NACHC offers prep courses for the Fellow of the American College of Healthcare Executives.",
    category: "academic-programs",
    subcategory: "California-Specific Programs",
    type: "program",
  },

  // Professional Associations
  {
    id: "ache-fellow-designation",
    title: "ACHE — Fellow (FACHE) Designation",
    organization: "ACHE",
    url: "https://www.ache.org/",
    description:
      "American College of Healthcare Executives; FACHE fellow designation and professional resources.",
    category: "academic-programs",
    subcategory: "Professional Associations",
    type: "organization",
  },
  {
    id: "mgma-practice-management",
    title: "MGMA — Practice Management Resources",
    organization: "MGMA",
    url: "https://www.mgma.com/",
    description:
      "Medical Group Management Association; practice management resources and benchmarking.",
    category: "academic-programs",
    subcategory: "Professional Associations",
    type: "organization",
  },
  {
    id: "aapcho-api-health-network",
    title: "AAPCHO — API Health Center Network",
    organization: "AAPCHO",
    url: "https://www.aapcho.org/",
    description:
      "Association of Asian Pacific Community Health Organizations; API health center advocacy and resources.",
    category: "academic-programs",
    subcategory: "Professional Associations",
    type: "organization",
  },

  // ---------------------------------------------------------------------------
  // 2. Top Researchers & Thought Leaders
  // ---------------------------------------------------------------------------

  // The Canon
  {
    id: "sara-rosenbaum",
    title: "Sara Rosenbaum",
    organization: "GW Milken Institute SPH",
    url: "https://www.healthaffairs.org/do/10.1377/hauthor20070816.869046/full/",
    description:
      "Foremost FQHC policy scholar. PPS reform, Medicaid payment, the value proposition of CHCs.",
    category: "researchers",
    subcategory: "The Canon",
    type: "researcher",
  },
  {
    id: "peter-shin",
    title: "Peter Shin",
    organization: "GW / Geiger Gibson Program",
    description:
      "Co-author with Rosenbaum; CHC economy studies, policy briefs on community health center economics.",
    category: "researchers",
    subcategory: "The Canon",
    type: "researcher",
  },
  {
    id: "leiyu-shi",
    title: "Leiyu Shi",
    organization: "Johns Hopkins Bloomberg",
    description:
      "Quantitative CHC outcomes research; disparities reduction evidence base for community health centers.",
    category: "researchers",
    subcategory: "The Canon",
    type: "researcher",
  },
  {
    id: "jennifer-devoe",
    title: "Jennifer DeVoe",
    organization: "OHSU / OCHIN",
    description:
      "FQHC health IT, data networks, EHR-driven research in community health settings.",
    category: "researchers",
    subcategory: "The Canon",
    type: "researcher",
  },
  {
    id: "kevin-grumbach",
    title: "Kevin Grumbach",
    organization: "UCSF",
    description:
      "Primary care workforce, CHC delivery models, community-oriented care research.",
    category: "researchers",
    subcategory: "The Canon",
    type: "researcher",
  },
  {
    id: "leah-zallman",
    title: "Leah Zallman (1979-2022)",
    organization: "Cambridge Health Alliance",
    description:
      "Proved immigrants contribute +$58.3B net to healthcare; posthumous JAMA publication on immigrant contributions.",
    category: "researchers",
    subcategory: "The Canon",
    type: "researcher",
  },
  {
    id: "lilia-cervantes",
    title: "Lilia Cervantes",
    organization: "University of Colorado",
    description:
      "Emergency-only dialysis study; undocumented patient access research and advocacy.",
    category: "researchers",
    subcategory: "The Canon",
    type: "researcher",
  },
  {
    id: "mark-masselli",
    title: "Mark Masselli",
    organization: "CHC Inc. / CHC Radio",
    description:
      "Practitioner-scholar; longest-running CHC podcast host on Conversations on Health Care.",
    category: "researchers",
    subcategory: "The Canon",
    type: "researcher",
  },
  {
    id: "steve-weinman",
    title: "Steve Weinman",
    organization: "FQHC Associates",
    description:
      "Former FQHC CEO; practical leadership blog and podcast at fqhc.org.",
    category: "researchers",
    subcategory: "The Canon",
    type: "researcher",
  },

  // Research Centers
  {
    id: "geiger-gibson-program",
    title: "Geiger Gibson Program",
    organization: "GWU",
    url: "https://geigergibson.publichealth.gwu.edu/",
    description:
      "CHC policy research; the academic home of community health centers.",
    category: "researchers",
    subcategory: "Research Centers",
    type: "organization",
  },
  {
    id: "ochin",
    title: "OCHIN",
    organization: "OCHIN",
    url: "https://www.ochin.org/",
    description:
      "FQHC health IT network; data-driven research supporting community health centers.",
    category: "researchers",
    subcategory: "Research Centers",
    type: "organization",
  },
  {
    id: "alliancechicago",
    title: "AllianceChicago",
    organization: "AllianceChicago",
    url: "https://www.alliancechicago.org/",
    description:
      "CHC research collaborative advancing community health center practice and policy.",
    category: "researchers",
    subcategory: "Research Centers",
    type: "organization",
  },
  {
    id: "rchn-community-health-foundation",
    title: "RCHN Community Health Foundation",
    organization: "RCHN",
    url: "https://www.rchnfoundation.org/",
    description: "Funds Geiger Gibson research on community health center policy.",
    category: "researchers",
    subcategory: "Research Centers",
    type: "organization",
  },
  {
    id: "community-health-center-chronicles",
    title: "Community Health Center Chronicles",
    organization: "CHC Chronicles",
    url: "https://www.chcchronicles.org/",
    description:
      "Living history archive; documentaries and oral histories of the community health center movement.",
    category: "researchers",
    subcategory: "Research Centers",
    type: "organization",
  },

  // ---------------------------------------------------------------------------
  // 3. Undocumented Patient Care
  // ---------------------------------------------------------------------------

  // Landmark Studies
  {
    id: "emergency-only-vs-standard-hemodialysis",
    title: "Emergency-Only vs Standard Hemodialysis",
    author: "Cervantes et al.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5838789/",
    description:
      "14x greater mortality for emergency-only dialysis; 162 vs 10 inpatient days/year. JAMA Internal Medicine, 2018.",
    category: "undocumented-care",
    subcategory: "Landmark Studies",
    type: "article",
  },
  {
    id: "immigrants-net-financial-contribution",
    title: "Immigrants' Net Financial Contribution",
    author: "Zallman et al.",
    url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2798221",
    description:
      "Immigrants contributed +$58.3B more than received in 2017. JAMA Network Open, 2022.",
    category: "undocumented-care",
    subcategory: "Landmark Studies",
    type: "article",
  },
  {
    id: "immigrants-and-medicare-trust-fund",
    title: "Immigrants and Medicare Trust Fund",
    author: "Zallman et al.",
    url: "https://www.healthaffairs.org/doi/abs/10.1377/hlthaff.2012.1223",
    description:
      "+$115.2B net contribution to Medicare (2002-09). Health Affairs, 2013.",
    category: "undocumented-care",
    subcategory: "Landmark Studies",
    type: "article",
  },
  {
    id: "chilling-effects-of-enforcement",
    title: "Chilling Effects of Enforcement",
    author: "Friedman & Venkataramani",
    url: "https://www.healthaffairs.org/doi/abs/10.1377/hlthaff.2020.02356",
    description:
      "16.9% decline in healthcare visits among lawfully present Hispanics. Health Affairs, 2021.",
    category: "undocumented-care",
    subcategory: "Landmark Studies",
    type: "article",
  },
  {
    id: "unauthorized-vs-authorized-spending",
    title: "Unauthorized vs Authorized Spending",
    author: "Lehn et al.",
    url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2774076",
    description:
      "ML analysis: unauthorized immigrants use fewer services, lower costs. JAMA Network Open, 2020.",
    category: "undocumented-care",
    subcategory: "Landmark Studies",
    type: "article",
  },
  {
    id: "barriers-to-healthcare-literature-review",
    title: "Barriers to Healthcare (Literature Review)",
    author: "Lopez-Cevallos et al.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4634824/",
    description:
      "Taxonomic framework of policy/system/individual barriers. Risk Management & Healthcare Policy, 2015.",
    category: "undocumented-care",
    subcategory: "Landmark Studies",
    type: "article",
  },
  {
    id: "challenges-in-la-county-fqhcs",
    title: "Challenges in LA County FQHCs",
    author: "Park et al.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7484891/",
    description:
      "Qualitative: fear of discovery, cost, navigation barriers. Journal of General Internal Medicine, 2020.",
    category: "undocumented-care",
    subcategory: "Landmark Studies",
    type: "article",
  },
  {
    id: "beyond-chilling-effects",
    title: 'Beyond "Chilling Effects"',
    author: "Vargas Bustamante et al.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10079615/",
    description:
      "Direct mechanisms preventing access for Latinx AND Asian immigrants. Medical Care, 2023.",
    category: "undocumented-care",
    subcategory: "Landmark Studies",
    type: "article",
  },
  {
    id: "indirect-enforcement-effects",
    title: "Indirect Enforcement Effects",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0277953625008718",
    description:
      "16.9% decline in visits even among lawfully present older Hispanics. Social Science & Medicine, 2025.",
    category: "undocumented-care",
    subcategory: "Landmark Studies",
    type: "article",
  },

  // Legal Frameworks
  {
    id: "section-330-overview",
    title: "Section 330 Overview",
    organization: "HRSA / Rural Health Info Hub",
    url: "https://www.ruralhealthinfo.org/topics/federally-qualified-health-centers",
    description:
      "Overview of Section 330 of the Public Health Service Act governing FQHCs.",
    category: "undocumented-care",
    subcategory: "Legal Frameworks",
    type: "government",
  },
  {
    id: "hhs-restricts-care-for-immigrants-2025",
    title: "HHS Restricts Care for Immigrants (2025)",
    organization: "Hinshaw & Culbertson LLP",
    url: "https://www.hinshawlaw.com/en/insights/healthcare-alert/health-care-alert-hhs-restricts-care-for-immigrants",
    description:
      "Legal analysis of 2025 HHS restrictions on care for immigrants.",
    category: "undocumented-care",
    subcategory: "Legal Frameworks",
    type: "article",
  },
  {
    id: "emtala-fact-sheet",
    title: "EMTALA Fact Sheet",
    organization: "CMS",
    url: "https://www.cms.gov/newsroom/fact-sheets/emergency-health-services-undocumented-aliens",
    description:
      "CMS fact sheet on emergency health services for undocumented aliens under EMTALA.",
    category: "undocumented-care",
    subcategory: "Legal Frameworks",
    type: "government",
  },
  {
    id: "emtala-and-undocumented-immigrants",
    title: "EMTALA & Undocumented Immigrants",
    organization: "UH Law",
    url: "https://law.uh.edu/hjhlp/volumes/Vol_10_2/Smith.pdf",
    description:
      "Legal analysis of EMTALA obligations regarding undocumented immigrants.",
    category: "undocumented-care",
    subcategory: "Legal Frameworks",
    type: "article",
  },
  {
    id: "ca-sb-81-care-over-fear-act",
    title: 'CA SB 81 "Care Over Fear Act"',
    organization: "Governor Newsom",
    url: "https://www.gov.ca.gov/2025/09/20/governor-newsom-signs-laws-to-protect-school-children-and-hospital-patients-and-limit-fear-tactics-used-by-trumps-secret-police-force-to-terrorize-communities/",
    description:
      "California law protecting hospital patients and school children from immigration enforcement tactics.",
    category: "undocumented-care",
    subcategory: "Legal Frameworks",
    type: "government",
  },
  {
    id: "ca-ag-healthcare-guidance",
    title: "CA AG Healthcare Guidance",
    organization: "California AG",
    url: "https://oag.ca.gov/sites/all/files/agweb/pdfs/immigration/healthcare-guidance.pdf",
    description:
      "California Attorney General guidance for healthcare providers on immigration enforcement.",
    category: "undocumented-care",
    subcategory: "Legal Frameworks",
    type: "government",
  },
  {
    id: "medi-cal-expansion-laws",
    title: "Medi-Cal Expansion Laws (SB 75/104/184, AB 133)",
    organization: "SCC Gov",
    url: "https://stgenssa.sccgov.org/debs/program_handbooks/medi-cal/assets/06CitizenImm/SB75SB104AB133.htm",
    description:
      "Overview of California Medi-Cal expansion legislation for immigrant populations.",
    category: "undocumented-care",
    subcategory: "Legal Frameworks",
    type: "government",
  },
  {
    id: "noncitizens-access-to-health-care-crs",
    title: "Noncitizens' Access to Health Care",
    organization: "CRS",
    url: "https://www.congress.gov/crs-product/R47351",
    description:
      "Congressional Research Service report on the full legal landscape for noncitizen healthcare access.",
    category: "undocumented-care",
    subcategory: "Legal Frameworks",
    type: "government",
  },
  {
    id: "ice-protected-areas-rescission",
    title: "ICE Protected Areas Rescission",
    organization: "NILC",
    url: "https://www.nilc.org/resources/factsheet-trumps-rescission-of-protected-areas-policies-undermines-safety-for-all/",
    description:
      "Factsheet on Trump's rescission of protected areas policies and implications for safety.",
    category: "undocumented-care",
    subcategory: "Legal Frameworks",
    type: "report",
  },

  // Policy Analysis
  {
    id: "state-health-coverage-for-immigrants",
    title: "State Health Coverage for Immigrants",
    organization: "KFF",
    url: "https://www.kff.org/racial-equity-and-health-policy/state-health-coverage-for-immigrants-and-implications-for-health-coverage-and-care/",
    description:
      "State-by-state analysis of health coverage for immigrants and implications for care. September 2025.",
    category: "undocumented-care",
    subcategory: "Policy Analysis",
    type: "report",
  },
  {
    id: "key-facts-on-immigrant-health-coverage",
    title: "Key Facts on Immigrant Health Coverage",
    organization: "KFF",
    url: "https://www.kff.org/racial-equity-and-health-policy/key-facts-on-health-coverage-of-immigrants/",
    description:
      "Key facts on health coverage of immigrants in the United States. September 2025.",
    category: "undocumented-care",
    subcategory: "Policy Analysis",
    type: "report",
  },
  {
    id: "kff-nyt-2025-survey-of-immigrants",
    title: "KFF/NYT 2025 Survey of Immigrants",
    organization: "KFF / New York Times",
    url: "https://www.kff.org/immigrant-health/kff-new-york-times-2025-survey-of-immigrants-health-and-health-care-experiences-during-the-second-trump-administration/",
    description:
      "Survey of immigrants' health and healthcare experiences during the second Trump administration. December 2025.",
    category: "undocumented-care",
    subcategory: "Policy Analysis",
    type: "report",
  },
  {
    id: "health-coverage-of-noncitizens-2024",
    title: "Health Coverage of Noncitizens 2024",
    organization: "Urban Institute",
    url: "https://www.urban.org/research/publication/health-coverage-noncitizens-united-states-2024",
    description:
      "Research on health coverage of noncitizens in the United States as of 2024. April 2025.",
    category: "undocumented-care",
    subcategory: "Policy Analysis",
    type: "report",
  },
  {
    id: "policy-changes-and-immigrant-coverage",
    title: "Policy Changes & Immigrant Coverage",
    organization: "Commonwealth Fund",
    url: "https://www.commonwealthfund.org/publications/explainer/2025/oct/what-recent-policy-changes-mean-immigrant-health-coverage",
    description:
      "Explainer on what recent policy changes mean for immigrant health coverage. October 2025.",
    category: "undocumented-care",
    subcategory: "Policy Analysis",
    type: "report",
  },
  {
    id: "covering-the-uninsured-national-scan",
    title: "Covering the Uninsured: National Scan",
    organization: "CHCF",
    url: "https://www.chcf.org/resource/covering-uninsured-national-scan-state-based-coverage-immigrants/",
    description:
      "National scan of state-based coverage for immigrants. October 2025.",
    category: "undocumented-care",
    subcategory: "Policy Analysis",
    type: "report",
  },
  {
    id: "undocumented-medi-cal-experiences",
    title: "Undocumented Medi-Cal Experiences",
    organization: "CHCF",
    url: "https://www.chcf.org/resource/undocumented-californians-newly-eligible-for-medi-cal-share-their-experiences/",
    description:
      "Undocumented Californians newly eligible for Medi-Cal share their experiences. September 2025.",
    category: "undocumented-care",
    subcategory: "Policy Analysis",
    type: "report",
  },
  {
    id: "chilling-effects-of-public-charge",
    title: "Chilling Effects of Public Charge",
    organization: "KFF",
    url: "https://www.kff.org/medicaid/potential-chilling-effects-of-public-charge-and-other-immigration-policies-on-medicaid-and-chip-enrollment/",
    description:
      "Analysis of potential chilling effects of public charge and immigration policies on Medicaid and CHIP enrollment. December 2025.",
    category: "undocumented-care",
    subcategory: "Policy Analysis",
    type: "report",
  },

  // California Data
  {
    id: "health-conditions-of-ca-undocumented",
    title: "Health Conditions of CA Undocumented",
    organization: "PPIC",
    url: "https://www.ppic.org/publication/health-conditions-and-health-care-among-californias-undocumented-immigrants/",
    description:
      "369,891 patients, 5.4M visits at 350 CHCs. Analysis of health conditions among California's undocumented immigrants.",
    category: "undocumented-care",
    subcategory: "California Data",
    type: "report",
  },
  {
    id: "ca-health-coverage-update",
    title: "Health Coverage Update",
    organization: "PPIC",
    url: "https://www.ppic.org/publication/health-coverage-and-care-for-undocumented-immigrants/",
    description:
      "Mental health: 15.3% severe distress, 8.2% seeing provider. Health coverage and care for undocumented immigrants.",
    category: "undocumented-care",
    subcategory: "California Data",
    type: "report",
  },
  {
    id: "medi-cal-lowering-poverty",
    title: "Medi-Cal Lowering Poverty",
    organization: "PPIC",
    url: "https://www.ppic.org/blog/californias-medi-cal-expansion-is-lowering-poverty-among-undocumented-immigrants/",
    description:
      "California's Medi-Cal expansion is lowering poverty among undocumented immigrants beyond health outcomes.",
    category: "undocumented-care",
    subcategory: "California Data",
    type: "article",
  },
  {
    id: "ca-uninsured-in-2024",
    title: "CA Uninsured in 2024",
    organization: "UC Berkeley Labor Center",
    url: "https://laborcenter.berkeley.edu/californias-uninsured-in-2024/",
    description:
      "710K newly eligible; 520K still uninsured. Analysis of California's uninsured population in 2024.",
    category: "undocumented-care",
    subcategory: "California Data",
    type: "report",
  },
  {
    id: "health-gains-after-expansion",
    title: "Health Gains After Expansion",
    organization: "UCLA",
    url: "https://healthpolicy.ucla.edu/our-work/publications/california-sees-health-gains-undocumented-residents-after-medi-cal-expansion",
    description:
      "+10 percentage points in excellent health (children). California sees health gains for undocumented residents after Medi-Cal expansion.",
    category: "undocumented-care",
    subcategory: "California Data",
    type: "report",
  },
  {
    id: "2022-expansion-implementation-lessons",
    title: "2022 Expansion Implementation Lessons",
    organization: "UCLA LPPI",
    url: "https://latino.ucla.edu/research/lessons-2022-adult-medical-expansion/",
    description:
      "3 barriers: technology, language, immigration fear. Lessons from 2022 adult Medi-Cal expansion implementation.",
    category: "undocumented-care",
    subcategory: "California Data",
    type: "report",
  },
  {
    id: "ca-fqhcs-financial-performance",
    title: "CA FQHCs: Financial Performance",
    organization: "CHCF",
    url: "https://www.chcf.org/resource/california-fqhcs-financial-operational-performance-analysis/",
    description:
      "64% Medi-Cal payer mix; 25% operated at a loss. California FQHCs financial and operational performance analysis.",
    category: "undocumented-care",
    subcategory: "California Data",
    type: "report",
  },
  {
    id: "medi-cal-expansion-freeze",
    title: "Medi-Cal Expansion Freeze",
    organization: "SCC Gov / DHCS",
    url: "https://stgenssa.sccgov.org/debs/program_handbooks/medi-cal/assets/00Updates/Updates2025/2025_Update_Medi-Cal_Expansion_Freeze.htm",
    description:
      "Jan 2026 enrollment freeze; Jul 2026 dental cuts. Medi-Cal expansion enrollment freeze details.",
    category: "undocumented-care",
    subcategory: "California Data",
    type: "government",
  },

  // Best Practice Guides
  {
    id: "healthcare-and-immigration-enforcement-guide",
    title: "Healthcare & Immigration Enforcement (THE guide)",
    organization: "NILC & PHR",
    url: "https://www.nilc.org/wp-content/uploads/2025/03/Health-Care-and-U.S.-Immigration-Enforcement_What-Providers-Need-to-Know_Guide_PHR-and-NILC-2025.pdf",
    description:
      "The definitive guide for healthcare providers on immigration enforcement. March 2025.",
    category: "undocumented-care",
    subcategory: "Best Practice Guides",
    type: "report",
  },
  {
    id: "know-your-rights-providers-enforcement",
    title: "Know Your Rights: Providers & Enforcement",
    organization: "NILC",
    url: "https://www.nilc.org/resources/healthcare-provider-and-patients-rights-imm-enf/",
    description:
      "Healthcare provider and patient rights regarding immigration enforcement. January 2025.",
    category: "undocumented-care",
    subcategory: "Best Practice Guides",
    type: "report",
  },
  {
    id: "can-undocumented-immigrants-access-care",
    title: "Can Undocumented Immigrants Access Care?",
    organization: "NILC",
    url: "https://www.nilc.org/articles/can-undocumented-immigrants-access-health-care/",
    description:
      "Guide on healthcare access options for undocumented immigrants. 2025.",
    category: "undocumented-care",
    subcategory: "Best Practice Guides",
    type: "article",
  },
  {
    id: "immigration-resources-for-health-centers",
    title: "Immigration Resources for Health Centers",
    organization: "CPCA",
    url: "https://www.cpca.org/CPCA/Health_Center_Resources/IMMIGRANT_RESOURCES/CPCA/HEALTH_CENTER_RESOURCES/Immigrant_Resources_content/Immigration_Resources.aspx",
    description:
      "CPCA's ongoing collection of immigration resources for California health centers.",
    category: "undocumented-care",
    subcategory: "Best Practice Guides",
    type: "report",
  },
  {
    id: "waiting-room-know-your-rights-case-study",
    title: 'Waiting Room "Know Your Rights" (Case Study)',
    organization: "Clinica Romero / Health Equity",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8804239/",
    description:
      "Case study on implementing 'Know Your Rights' materials in clinic waiting rooms. 2022.",
    category: "undocumented-care",
    subcategory: "Best Practice Guides",
    type: "article",
  },
  {
    id: "good-sanctuary-doctoring",
    title: "Good Sanctuary Doctoring",
    organization: "AMA Journal of Ethics",
    url: "https://journalofethics.ama-assn.org/article/good-sanctuary-doctoring-undocumented-patients/2019-01",
    description:
      "AMA Journal of Ethics article on sanctuary doctoring for undocumented patients. January 2019.",
    category: "undocumented-care",
    subcategory: "Best Practice Guides",
    type: "article",
  },
  {
    id: "immigrant-safety-in-hospitals-clinics",
    title: "Immigrant Safety in Hospitals & Clinics",
    organization: "ACLU NorCal",
    url: "https://www.aclunorcal.org/know-your-rights/know-your-rights-immigrant-safety-hospitals-and-clinics/",
    description:
      "Know your rights guide on immigrant safety in hospitals and clinics. 2025.",
    category: "undocumented-care",
    subcategory: "Best Practice Guides",
    type: "report",
  },
  {
    id: "protected-areas-rescission-implications",
    title: "Protected Areas Rescission Implications",
    organization: "Holland & Knight LLP",
    url: "https://www.hklaw.com/en/insights/publications/2025/01/rescission-of-the-dhs-protected-areas-policy-implications",
    description:
      "Analysis of the rescission of DHS protected areas policy and its implications for healthcare. January 2025.",
    category: "undocumented-care",
    subcategory: "Best Practice Guides",
    type: "article",
  },

  // Patient Impact Research (Chilling Effects)
  {
    id: "ice-tactics-limit-healthcare-access",
    title: "ICE Tactics Limit Healthcare Access",
    organization: "PHR",
    url: "https://phr.org/news/ice-tactics-and-deportation-fears-limit-access-to-health-care-for-children-of-immigrants-survey/",
    description:
      "84% of healthcare workers report patient visit declines due to ICE tactics and deportation fears.",
    category: "undocumented-care",
    subcategory: "Patient Impact Research",
    type: "report",
  },
  {
    id: "public-charge-announcement-effects",
    title: "Public Charge Announcement Effects",
    url: "https://academic.oup.com/healthaffairsscholar/article/1/2/qxad023/7206916",
    description:
      "Merely announcing the public charge rule caused measurable enrollment declines. Health Affairs, 2020.",
    category: "undocumented-care",
    subcategory: "Patient Impact Research",
    type: "article",
  },
  {
    id: "essential-workers-avoided-medicaid",
    title: "Essential Workers Avoided Medicaid",
    organization: "KFF",
    url: "https://www.kff.org/medicaid/potential-chilling-effects-of-public-charge-and-other-immigration-policies-on-medicaid-and-chip-enrollment/",
    description:
      "Pandemic essential workers skipped programs due to public charge fears. Health Affairs, 2021.",
    category: "undocumented-care",
    subcategory: "Patient Impact Research",
    type: "article",
  },
  {
    id: "health-costs-of-fear-fl-sb-1718",
    title: "Health Costs of Fear (FL SB 1718)",
    organization: "USF",
    url: "https://www.usf.edu/arts-sciences/centers/iwrc/news/2024/the-health-costs-of-fear-article.aspx",
    description:
      "77% adverse mental health; 59% affected service access. Study of Florida SB 1718 health impacts.",
    category: "undocumented-care",
    subcategory: "Patient Impact Research",
    type: "report",
  },

  // ---------------------------------------------------------------------------
  // 4. Scale Economics & Operational Frameworks
  // ---------------------------------------------------------------------------

  // Scale Economics Research
  {
    id: "altman-z-score-for-fqhcs",
    title: "Altman Z-Score for FQHCs (2025)",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9441282/",
    description:
      "Financially distressed FQHCs had 7.93x greater odds of closure/consolidation.",
    category: "scale-economics",
    subcategory: "Scale Economics Research",
    type: "article",
  },
  {
    id: "fqhc-efficiency-dea-analysis",
    title: "FQHC Efficiency (DEA Analysis)",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6391222/",
    description:
      "Only ~20% of FQHCs on efficiency frontier; 39-45M encounters possible vs 29M actual.",
    category: "scale-economics",
    subcategory: "Scale Economics Research",
    type: "article",
  },
  {
    id: "grant-revenue-and-efficiency",
    title: "Grant Revenue & Efficiency",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3976192/",
    description:
      "Grants negatively associated with efficiency for non-frontier FQHCs.",
    category: "scale-economics",
    subcategory: "Scale Economics Research",
    type: "article",
  },
  {
    id: "hit-optimization-and-quality",
    title: "HIT Optimization & Quality",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7363086/",
    description:
      "Larger FQHCs outperform on quality; PCMH status + size = best outcomes.",
    category: "scale-economics",
    subcategory: "Scale Economics Research",
    type: "article",
  },
  {
    id: "hccn-affiliation-growth",
    title: "HCCN Affiliation Growth",
    url: "https://jhmhp.amegroups.org/article/view/8389/html",
    description:
      "70% to 83% FQHC membership in HCCNs (2015-2020). Health center controlled network growth trends.",
    category: "scale-economics",
    subcategory: "Scale Economics Research",
    type: "article",
  },

  // Rural vs Urban Performance
  {
    id: "rural-vs-urban-fqhc-performance",
    title: "Rural vs Urban FQHC Performance",
    organization: "Capital Link / Rural Health Info Hub",
    url: "https://www.caplink.org/fqhc-trends-2024",
    description:
      "Rural: 46% Medicaid, 0.3-11.4% margins, 92% telehealth-MH. Urban: 71% Medicaid, lower margins, 69.9% personnel costs.",
    category: "scale-economics",
    subcategory: "Rural vs Urban Performance",
    type: "dataset",
  },

  // Operational Excellence Frameworks
  {
    id: "lean-six-sigma-for-fqhcs",
    title: "Lean Six Sigma",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8820448/",
    description:
      "Altarum Institute CHC Innovation Project (3 FQHCs, 18 months): standardization improved flow, quality, and access.",
    category: "scale-economics",
    subcategory: "Operational Excellence Frameworks",
    type: "report",
  },
  {
    id: "baldrige-performance-excellence",
    title: "Baldrige Performance Excellence",
    url: "https://www.nist.gov/baldrige/publications/baldrige-excellence-framework/health-care",
    description:
      "7 categories; hospitals using it were 6x more likely in top 100; no FQHC winner yet.",
    category: "scale-economics",
    subcategory: "Operational Excellence Frameworks",
    type: "tool",
  },
  {
    id: "pcmh-recognition",
    title: "PCMH Recognition",
    organization: "HRSA",
    url: "https://bphc.hrsa.gov/initiatives/advancing-health-center-excellence/hrsa-accreditation-patient-centered-medical-home/select-accreditation",
    description:
      "HRSA covers fees; positively associated with UDS quality measures. Patient-Centered Medical Home recognition.",
    category: "scale-economics",
    subcategory: "Operational Excellence Frameworks",
    type: "program",
  },
  {
    id: "aaahc-accreditation",
    title: "AAAHC Accreditation",
    organization: "AAAHC",
    url: "https://www.aaahc.org/accreditation/primary-care/government/fqhc-330-grantees/",
    description:
      "Interactive, consultative surveys; serves FQHCs, Look-Alikes, Indian Health Service.",
    category: "scale-economics",
    subcategory: "Operational Excellence Frameworks",
    type: "program",
  },

  // Growth Strategies
  {
    id: "ma-practical-guide",
    title: "M&A Practical Guide",
    organization: "CHCF",
    url: "https://www.chcf.org/resource/mergers-acquisitions-guide-community-health-centers/",
    description:
      "70% success rate, cultural fit #1 factor. Practical guide to mergers and acquisitions for CHCs (2020).",
    category: "scale-economics",
    subcategory: "Growth Strategies",
    type: "report",
  },
  {
    id: "mergers-of-equals",
    title: "Mergers of Equals",
    organization: "CHCF",
    url: "https://www.chcf.org/resource/partnership-equals-lessons-mergers-similarly-sized-positioned-centers/",
    description:
      "Partnership of Equals: lessons from mergers of similarly sized and positioned health centers.",
    category: "scale-economics",
    subcategory: "Growth Strategies",
    type: "report",
  },
  {
    id: "new-access-points-nap",
    title: "New Access Points (NAP)",
    organization: "HRSA",
    url: "https://copehealthsolutions.com/cblog/fqhc-new-access-points-what-to-know-if-your-organization-is-considering-applying/",
    description:
      "First NOFO since 2019, $50M, max $650K/year. Guide for organizations considering NAP applications.",
    category: "scale-economics",
    subcategory: "Growth Strategies",
    type: "report",
  },
  {
    id: "ipa-formation-chipa-model",
    title: "IPA Formation (CHIPA Model)",
    organization: "CHIPA (NY)",
    url: "https://www.communityhealthipa.com/",
    description:
      "Community Health IPA model: collective MCO contracting, VBC readiness for health centers.",
    category: "scale-economics",
    subcategory: "Growth Strategies",
    type: "organization",
  },

  // ---------------------------------------------------------------------------
  // 5. Financial Management & Revenue
  // ---------------------------------------------------------------------------

  // PPS Rate Optimization
  {
    id: "pps-rate-optimization-2025",
    title: "PPS Rate Optimization (2025)",
    organization: "PYA / NACHC",
    url: "https://www.pyapc.com/insights/medicare-payment-primer-federally-qualified-health-centers-prospective-payment-system/",
    description:
      "2025 national base PPS rate: $202.65; Tribal rate: $718. New billable services (2024): Caregiver training, G0511 General Care Management, SDoH risk assessments (G0136).",
    category: "financial-management",
    subcategory: "PPS Rate Optimization",
    type: "report",
  },
  {
    id: "nachc-fqhc-payment-guide",
    title: "NACHC FQHC Payment Guide",
    organization: "NACHC",
    url: "https://www.nachc.org/wp-content/uploads/2025/05/FQHC-Payment-Guide.pdf",
    description:
      "Comprehensive FQHC payment guide from NACHC covering PPS, billing codes, and reimbursement strategies.",
    category: "financial-management",
    subcategory: "PPS Rate Optimization",
    type: "report",
  },

  // 340B Program
  {
    id: "340b-critical-program-for-health-centers",
    title: "340B: A Critical Program for Health Centers",
    organization: "NACHC",
    url: "https://www.nachc.org/resource/340-b-a-critical-program-for-health-centers/",
    description:
      "NACHC resource explaining why the 340B program is critical for community health centers.",
    category: "financial-management",
    subcategory: "340B Program",
    type: "report",
  },
  {
    id: "340b-funding-health-equity",
    title: "340B Funding Health Equity",
    organization: "NACHC",
    url: "https://www.nachc.org/resource/health-centers-and-340b-funding-health-equity/",
    description:
      "Research on how health centers use 340B savings to fund health equity initiatives.",
    category: "financial-management",
    subcategory: "340B Program",
    type: "report",
  },
  {
    id: "340b-compliance-resources",
    title: "340B Compliance Resources",
    organization: "FQHC 340B",
    url: "https://www.fqhc340b.com/",
    description:
      "Compliance resources and tools for FQHCs participating in the 340B drug pricing program.",
    category: "financial-management",
    subcategory: "340B Program",
    type: "tool",
  },
  {
    id: "growth-in-the-340b-program",
    title: "Growth in the 340B Program",
    organization: "CBO",
    url: "https://www.cbo.gov/publication/61730",
    description:
      "Congressional Budget Office analysis of growth trends in the 340B drug pricing program.",
    category: "financial-management",
    subcategory: "340B Program",
    type: "government",
  },
  {
    id: "340b-special-report",
    title: "340B Special Report",
    organization: "Advocates for Community Health",
    url: "https://advocatesforcommunityhealth.org/340b-special-report/",
    description:
      "Special report on the 340B program from Advocates for Community Health.",
    category: "financial-management",
    subcategory: "340B Program",
    type: "report",
  },

  // Revenue Structure & Diversification
  {
    id: "chc-financing-kff",
    title: "CHC Financing",
    organization: "KFF",
    url: "https://www.kff.org/medicaid/community-health-center-financing-the-role-of-medicaid-and-section-330-grant-funding-explained/",
    description:
      "Medicaid 45%, Section 330 11%, other grants 15%. The role of Medicaid and Section 330 grant funding explained.",
    category: "financial-management",
    subcategory: "Revenue Structure & Diversification",
    type: "report",
  },
  {
    id: "how-chcs-are-funded",
    title: "How CHCs Are Funded",
    organization: "Advocates for Community Health",
    url: "https://advocatesforcommunityhealth.org/how-are-community-health-centers-funded/",
    description:
      "CHCs serve 14% of US population for 1% of healthcare spending. Overview of CHC funding sources.",
    category: "financial-management",
    subcategory: "Revenue Structure & Diversification",
    type: "report",
  },
  {
    id: "medi-cal-how-health-centers-get-paid",
    title: "Medi-Cal: How Health Centers Get Paid",
    organization: "CHCF",
    url: "https://www.chcf.org/wp-content/uploads/2022/05/MediCalExplainedHealthCentersPaid.pdf",
    description:
      "PPS mechanism, wrap-around payments, managed care. How Medi-Cal pays California health centers.",
    category: "financial-management",
    subcategory: "Revenue Structure & Diversification",
    type: "report",
  },
  {
    id: "funding-uncertainty-business-model",
    title: "Funding Uncertainty & Business Model",
    organization: "FQHC Associates",
    url: "https://www.fqhc.org/blog/2026/2/4/fqhc-funding-uncertainty-isnt-the-real-problem-the-business-model-is",
    description:
      "One CHC reduced federal dependency from 62.5% to 17%. Analysis of why the business model is the real problem.",
    category: "financial-management",
    subcategory: "Revenue Structure & Diversification",
    type: "article",
  },
  {
    id: "when-patients-govern",
    title: "When Patients Govern",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5590367/",
    description:
      "$552 cost/patient vs $270 grant funding = $282 gap. Journal of Health Politics, 2017.",
    category: "financial-management",
    subcategory: "Revenue Structure & Diversification",
    type: "article",
  },

  // Financial Health
  {
    id: "chcs-financial-challenges-loom-large",
    title: "CHCs Financial Challenges Loom Large",
    organization: "Commonwealth Fund",
    url: "https://www.commonwealthfund.org/blog/2024/community-health-centers-are-serving-more-patients-ever-financial-challenges-loom-large",
    description:
      "Net margins -2.1% in 2024; 50% had negative margins in 2023. Commonwealth Fund, 2024.",
    category: "financial-management",
    subcategory: "Financial Health",
    type: "report",
  },
  {
    id: "capital-link-financial-analysis",
    title: "Capital Link Financial Analysis",
    organization: "Capital Link",
    url: "https://www.caplink.org/fqhc-trends-2024",
    description:
      "Rural vs urban benchmarks, 2020-2023 financial trends for FQHCs.",
    category: "financial-management",
    subcategory: "Financial Health",
    type: "dataset",
  },
  {
    id: "ca-fqhc-financial-performance-chcf",
    title: "CA FQHC Financial Performance",
    organization: "CHCF",
    url: "https://www.chcf.org/resource/california-fqhcs-financial-operational-performance-analysis/",
    description:
      "CA median margins declining from 7.3% (2016) to 3.5% (2019). California FQHCs financial and operational performance.",
    category: "financial-management",
    subcategory: "Financial Health",
    type: "report",
  },

  // Revenue Cycle Best Practices
  {
    id: "fqhc-revenue-cycle-best-practices",
    title: "FQHC Revenue Cycle Best Practices",
    organization: "Coronis Health",
    url: "https://coronishealth.com/blog/fqhc-revenue-cycle-management-best-practices-pmg/",
    description:
      "Specialized FQHC billing training on PPS codes, technology/automation for claims and denial management, organization-wide collaboration.",
    category: "financial-management",
    subcategory: "Revenue Cycle Best Practices",
    type: "article",
  },
  {
    id: "optimizing-revenue-cycle-for-fqhcs",
    title: "Optimizing Revenue Cycle for FQHCs",
    organization: "CPA Medical Billing",
    url: "https://cpamedicalbilling.com/optimizing-the-revenue-cycle-for-medical-practices-and-fqhcs/",
    description:
      "Guidance on optimizing the revenue cycle for medical practices and FQHCs.",
    category: "financial-management",
    subcategory: "Revenue Cycle Best Practices",
    type: "article",
  },

  // ---------------------------------------------------------------------------
  // 6. Governance & Leadership
  // ---------------------------------------------------------------------------

  // Board Requirements
  {
    id: "hrsa-compliance-manual-ch-19",
    title: "HRSA Compliance Manual: Ch. 19 (Board Authority)",
    organization: "HRSA",
    url: "https://bphc.hrsa.gov/compliance/compliance-manual/chapter19",
    description:
      "Federal requirements for FQHC board authority including 51%+ patient board members under Section 330.",
    category: "governance",
    subcategory: "Board Requirements",
    type: "government",
  },
  {
    id: "hrsa-compliance-manual-ch-20",
    title: "HRSA Compliance Manual: Ch. 20 (Board Composition)",
    organization: "HRSA",
    url: "https://bphc.hrsa.gov/compliance/compliance-manual/chapter20",
    description:
      "Federal requirements for FQHC board composition: representative of served population, no more than 50% non-patient healthcare industry members.",
    category: "governance",
    subcategory: "Board Requirements",
    type: "government",
  },
  {
    id: "fqhc-governance-requirements-practical-impacts",
    title: "FQHCs: Practical Impacts of Governance Requirements",
    organization: "National Law Review",
    url: "https://natlawreview.com/article/fqhcs-practical-impacts-governance-requirements",
    description:
      "Analysis of practical impacts of federal governance requirements on FQHCs.",
    category: "governance",
    subcategory: "Board Requirements",
    type: "article",
  },
  {
    id: "nachc-board-roles-responsibilities",
    title: "NACHC Board Roles & Responsibilities",
    organization: "NACHC",
    url: "https://www.nachc.org/wp-content/uploads/2023/10/Health-Center-Board-Roles-and-Responsibilities-10-23.pdf",
    description:
      "Health center board roles and responsibilities guide from NACHC (October 2023).",
    category: "governance",
    subcategory: "Board Requirements",
    type: "report",
  },

  // CEO Competency Framework
  {
    id: "nachc-ceo-competencies",
    title: "NACHC CEO Competencies",
    organization: "NACHC",
    url: "https://www.nachc.org/training-events/training-for-health-center-professionals/leadership-development/",
    description:
      "12 competency domains for FQHC CEOs (adapted from ACHE 2023). Only 64% of boards satisfied with succession planning.",
    category: "governance",
    subcategory: "CEO Competency Framework",
    type: "report",
  },
  {
    id: "nachc-ceo-succession-toolkit",
    title: "NACHC CEO Succession Toolkit",
    organization: "NACHC",
    url: "https://www.nachc.org/wp-content/uploads/2023/03/Succession-Planning-Toolkit.pdf",
    description:
      "Succession planning toolkit for FQHC boards. CEO succession gap: 6-7 of ~30 positions filled internally.",
    category: "governance",
    subcategory: "CEO Competency Framework",
    type: "tool",
  },

  // CFO Competency Framework
  {
    id: "nachc-cfo-competencies",
    title: "NACHC CFO Competencies",
    organization: "NACHC",
    url: "https://www.nachc.org/resource/chief-financial-officer-cfo-competencies-and-professional-development-tool/",
    description:
      "11 competency domains for FQHC CFOs from NACHC.",
    category: "governance",
    subcategory: "CFO Competency Framework",
    type: "report",
  },
  {
    id: "nachc-coo-toolkit",
    title: "NACHC COO Toolkit",
    organization: "NACHC",
    url: "https://www.nachc.org/wp-content/uploads/2023/11/COO_Toolkit_update_1123-FINAL.pdf",
    description:
      "NACHC COO toolkit for FQHC chief operating officer competency development.",
    category: "governance",
    subcategory: "CFO Competency Framework",
    type: "tool",
  },

  // ---------------------------------------------------------------------------
  // 7. Strategic Planning Frameworks
  // ---------------------------------------------------------------------------

  // Most FQHC-Relevant Frameworks
  {
    id: "scenario-planning",
    title: "Scenario Planning",
    url: "https://www.communitylinkconsulting.com/clc-articles-tips/scenario-planning-fqhc-federal-funding-uncertainty",
    description:
      'Build "if/then" models for Medicaid cuts, 330 funding, 340B changes. Community Link Consulting.',
    category: "strategic-planning",
    subcategory: "Most FQHC-Relevant Frameworks",
    type: "article",
  },
  {
    id: "rumelt-good-strategy-bad-strategy",
    title: 'Rumelt ("Good Strategy/Bad Strategy")',
    description:
      "Diagnosis, Guiding Policy, Coherent Actions; maps well to defined FQHC challenges. Used on fqhctalent.com.",
    category: "strategic-planning",
    subcategory: "Most FQHC-Relevant Frameworks",
    type: "book",
  },
  {
    id: "porters-five-forces",
    title: "Porter's Five Forces",
    url: "https://www.clearpointstrategy.com/blog/strategic-planning-models-healthcare",
    description:
      "Retail clinics, MCO bargaining power, telehealth substitutes. ClearPoint Strategy.",
    category: "strategic-planning",
    subcategory: "Most FQHC-Relevant Frameworks",
    type: "article",
  },
  {
    id: "blue-ocean-strategy",
    title: "Blue Ocean Strategy",
    url: "https://www.blueoceanstrategy.com/blog/blue-ocean-strategy-healthcare-industry/",
    description:
      "FQHCs' integrated model (primary + BH + dental + pharmacy + social) is inherently blue ocean.",
    category: "strategic-planning",
    subcategory: "Most FQHC-Relevant Frameworks",
    type: "article",
  },
  {
    id: "value-based-care",
    title: "Value-Based Care",
    url: "https://www.maximizedrevenue.com/navigating-value-based-care-financial-planning-in-2026/",
    description:
      "65% of FQHCs lack financial resources; VBC via IPAs/ACOs is strategic necessity. Maximized Revenue.",
    category: "strategic-planning",
    subcategory: "Most FQHC-Relevant Frameworks",
    type: "article",
  },
  {
    id: "balanced-scorecard",
    title: "Balanced Scorecard",
    description:
      "Multi-dimensional performance tracking. Standard healthcare management framework applicable to FQHCs.",
    category: "strategic-planning",
    subcategory: "Most FQHC-Relevant Frameworks",
    type: "tool",
  },

  // Financial Planning
  {
    id: "building-a-resilient-financial-plan",
    title: "Building a Resilient Financial Plan",
    organization: "Maximized Revenue",
    url: "https://www.maximizedrevenue.com/preparing-for-the-next-funding-cycle-building-a-resilient-financial-plan-for-your-fqhc/",
    description:
      "Guidance on preparing for the next funding cycle and building a resilient financial plan for FQHCs.",
    category: "strategic-planning",
    subcategory: "Financial Planning",
    type: "article",
  },

  // ---------------------------------------------------------------------------
  // 8. News, Journalism & Intelligence Sources
  // ---------------------------------------------------------------------------

  // Tier 1: Must-Read (Daily)
  {
    id: "kff-health-news",
    title: "KFF Health News",
    organization: "KFF",
    url: "https://kffhealthnews.org/",
    description:
      "Best independent health journalism in the US. Essential daily reading for FQHC leaders.",
    category: "news-intelligence",
    subcategory: "Tier 1: Must-Read",
    type: "organization",
  },
  {
    id: "california-healthline",
    title: "California Healthline",
    organization: "KFF / CHCF",
    url: "https://californiahealthline.org/",
    description:
      "CA-specific daily digest covering Medi-Cal, clinic operations, and policy. Partnership of KFF and CHCF.",
    category: "news-intelligence",
    subcategory: "Tier 1: Must-Read",
    type: "organization",
  },
  {
    id: "nachc-newsroom",
    title: "NACHC Newsroom",
    organization: "NACHC",
    url: "https://www.nachc.org/newsroom/",
    description:
      "Official sector voice; legislative updates, policy statements, and CHC news.",
    category: "news-intelligence",
    subcategory: "Tier 1: Must-Read",
    type: "organization",
  },
  {
    id: "kff-daily-health-policy-report",
    title: "KFF Daily Health Policy Report",
    organization: "KFF",
    url: "https://www.kff.org/",
    description:
      "Policy aggregation and original research. Daily health policy reporting and analysis.",
    category: "news-intelligence",
    subcategory: "Tier 1: Must-Read",
    type: "organization",
  },

  // Tier 2: Industry (Daily/Weekly)
  {
    id: "fiercehealthcare",
    title: "FierceHealthcare",
    url: "https://www.fiercehealthcare.com/",
    description:
      "Payer-provider dynamics, M&A, digital health. Leading healthcare industry publication.",
    category: "news-intelligence",
    subcategory: "Tier 2: Industry",
    type: "organization",
  },
  {
    id: "beckers-hospital-review",
    title: "Becker's Hospital Review",
    url: "https://www.beckershospitalreview.com/",
    description:
      "Hospital and health system news, safety net partnerships, and industry trends.",
    category: "news-intelligence",
    subcategory: "Tier 2: Industry",
    type: "organization",
  },
  {
    id: "modern-healthcare",
    title: "Modern Healthcare",
    description:
      "Health system strategy, Medicaid, and healthcare finance coverage. Subscription publication.",
    category: "news-intelligence",
    subcategory: "Tier 2: Industry",
    type: "organization",
  },
  {
    id: "health-affairs-forefront",
    title: "Health Affairs Forefront",
    url: "https://www.healthaffairs.org/content/forefront",
    description:
      "Policy analysis blog featuring Sara Rosenbaum and peers. Peer-reviewed health policy analysis.",
    category: "news-intelligence",
    subcategory: "Tier 2: Industry",
    type: "organization",
  },

  // Tier 3: FQHC-Specific
  {
    id: "fqhc-associates-fqhc-connect",
    title: "FQHC Associates / FQHC Connect",
    url: "https://www.fqhc.org/blog",
    description:
      "Practical leadership blog and peer community for FQHC executives.",
    category: "news-intelligence",
    subcategory: "Tier 3: FQHC-Specific",
    type: "organization",
  },
  {
    id: "340b-report",
    title: "340B Report",
    url: "https://340breport.com/",
    description:
      "340B program news — existential for FQHC finances. Dedicated coverage of drug pricing policy.",
    category: "news-intelligence",
    subcategory: "Tier 3: FQHC-Specific",
    type: "organization",
  },
  {
    id: "340b-health",
    title: "340B Health",
    url: "https://www.340bhealth.org/",
    description:
      "340B covered entity advocacy organization representing hospitals and health centers.",
    category: "news-intelligence",
    subcategory: "Tier 3: FQHC-Specific",
    type: "organization",
  },
  {
    id: "advocates-for-community-health",
    title: "Advocates for Community Health",
    url: "https://advocatesforcommunityhealth.org/",
    description:
      "Forward-thinking FQHC policy organization advancing community health center innovation.",
    category: "news-intelligence",
    subcategory: "Tier 3: FQHC-Specific",
    type: "organization",
  },
  {
    id: "cpca",
    title: "CPCA",
    organization: "CPCA",
    url: "https://www.cpca.org/",
    description:
      "California Primary Care Association; policy alerts, ACCESS magazine, and health center resources.",
    category: "news-intelligence",
    subcategory: "Tier 3: FQHC-Specific",
    type: "organization",
  },
  {
    id: "cms-mln-connects",
    title: "CMS MLN Connects",
    organization: "CMS",
    url: "https://www.cms.gov/medicare/payment/prospective-payment-systems/federally-qualified-health-centers-fqhc-center",
    description:
      "Official CMS policy changes, billing updates, and FQHC payment system information.",
    category: "news-intelligence",
    subcategory: "Tier 3: FQHC-Specific",
    type: "government",
  },
  {
    id: "rural-health-info-hub",
    title: "Rural Health Info Hub",
    url: "https://www.ruralhealthinfo.org/topics/federally-qualified-health-centers",
    description:
      "Rural FQHC alerts, funding opportunities, and workforce resources.",
    category: "news-intelligence",
    subcategory: "Tier 3: FQHC-Specific",
    type: "organization",
  },

  // California Investigative Journalism
  {
    id: "calmatters-health",
    title: "CalMatters Health",
    url: "https://calmatters.org/category/health/",
    description:
      "California politics, Medi-Cal policy, and clinic closures coverage.",
    category: "news-intelligence",
    subcategory: "California Investigative Journalism",
    type: "organization",
  },
  {
    id: "laist-health",
    title: "LAist Health",
    url: "https://laist.com/news/health",
    description:
      "LA County safety net and community health reporting.",
    category: "news-intelligence",
    subcategory: "California Investigative Journalism",
    type: "organization",
  },
  {
    id: "california-health-report",
    title: "California Health Report",
    url: "https://www.calhealthreport.org/",
    description:
      "Independent California health journalism covering state health policy and community health.",
    category: "news-intelligence",
    subcategory: "California Investigative Journalism",
    type: "organization",
  },

  // Landmark Investigations
  {
    id: "fqhcs-suing-patients",
    title: "FQHCs Suing Patients (as low as $59)",
    organization: "ProPublica",
    url: "https://www.propublica.org/article/federally-qualified-health-centers-unpaid-bills-lawsuits",
    description:
      "ProPublica investigation into FQHCs suing patients for unpaid bills as low as $59.",
    category: "news-intelligence",
    subcategory: "Landmark Investigations",
    type: "article",
  },
  {
    id: "fqhc-profit-margins-investigation",
    title: "FQHC Profit Margins (9 centers >20%)",
    organization: "KFF Health News",
    url: "https://340breport.com/health-centers-criticize-kaiser-health-news-story-about-profit-margins/",
    description:
      "Investigation into FQHC profit margins finding 9 centers with margins exceeding 20%.",
    category: "news-intelligence",
    subcategory: "Landmark Investigations",
    type: "article",
  },

  // Consulting & Advisory
  {
    id: "community-link-consulting",
    title: "Community Link Consulting",
    url: "https://www.communitylinkconsulting.com/",
    description:
      "175+ FQHCs across 40+ states since 1999. Strategic planning, operations, and compliance consulting.",
    category: "news-intelligence",
    subcategory: "Consulting & Advisory",
    type: "organization",
  },
  {
    id: "health-management-associates-hma",
    title: "Health Management Associates (HMA)",
    url: "https://www.healthmanagement.com/insights/spotlight/expand-and-support-fqhcs/",
    description:
      "Strategic planning, board development, and finance advisory for FQHCs.",
    category: "news-intelligence",
    subcategory: "Consulting & Advisory",
    type: "organization",
  },
  {
    id: "forvis-mazars",
    title: "Forvis Mazars",
    url: "https://www.forvismazars.us/industries/healthcare-life-sciences/community-health-centers",
    description:
      "CHC-specialized accounting and advisory firm for community health centers.",
    category: "news-intelligence",
    subcategory: "Consulting & Advisory",
    type: "organization",
  },
  {
    id: "capital-link",
    title: "Capital Link",
    url: "https://www.caplink.org/",
    description:
      "Financial benchmarking, growth feasibility studies, and capital planning for health centers.",
    category: "news-intelligence",
    subcategory: "Consulting & Advisory",
    type: "organization",
  },
  {
    id: "manatt-health",
    title: "Manatt Health",
    url: "https://www.manatt.com/insights/newsletters/health-highlights",
    description:
      "Medicaid policy, telehealth regulatory analysis, and health equity advisory.",
    category: "news-intelligence",
    subcategory: "Consulting & Advisory",
    type: "organization",
  },
  {
    id: "ace-healthcare-solutions",
    title: "ACE Healthcare Solutions",
    url: "https://acehealthcaresolutions.com/resources/",
    description:
      "Pharmacy, operations consulting, and case studies for community health centers.",
    category: "news-intelligence",
    subcategory: "Consulting & Advisory",
    type: "organization",
  },

  // ---------------------------------------------------------------------------
  // 9. Data Dashboards & Benchmarking
  // ---------------------------------------------------------------------------

  {
    id: "hrsa-uds-data-warehouse",
    title: "HRSA UDS Data Warehouse",
    organization: "HRSA",
    url: "https://data.hrsa.gov/topics/health-centers/uds",
    description:
      "Every Section 330 grantee: demographics, quality, staffing, and finance data.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "hrsa-national-awardee-data",
    title: "HRSA National Awardee Data",
    organization: "HRSA",
    url: "https://data.hrsa.gov/tools/data-reporting/program-data/national",
    description:
      "Program-level aggregates for health center awardees nationwide.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "hrsa-chqr-dashboard",
    title: "HRSA CHQR Dashboard",
    organization: "HRSA",
    url: "https://bphc.hrsa.gov/data-reporting",
    description:
      "Quality recognition badges and clinical quality measure tracking for health centers.",
    category: "data-dashboards",
    type: "tool",
  },
  {
    id: "hrsa-adjusted-quartile-rankings",
    title: "HRSA Adjusted Quartile Rankings",
    organization: "HRSA",
    url: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance/uniform-data-system-uds-health-center-adjusted-quartile-ranking",
    description:
      "Quality benchmarks Q1-Q4 for health center adjusted quartile rankings.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "nachc-chartbook",
    title: "NACHC Chartbook",
    organization: "NACHC",
    url: "https://www.nachc.org/resource/community-health-center-chartbook/",
    description:
      "Annual ~75-page data visualization of Uniform Data System (UDS) results.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "kff-chc-financing-data",
    title: "KFF CHC Financing Data",
    organization: "KFF",
    url: "https://www.kff.org/medicaid/community-health-center-financing-the-role-of-medicaid-and-section-330-grant-funding-explained/",
    description:
      "Revenue mix and growth trends 2010-2024 for community health center financing.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "capital-link-financial-trends",
    title: "Capital Link Financial Trends",
    organization: "Capital Link",
    url: "https://www.caplink.org/fqhc-trends-2024",
    description:
      "Urban/rural benchmarks and debt capacity trends for FQHC financial analysis.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "ca-hcai-data",
    title: "CA HCAI Data",
    organization: "HCAI",
    url: "https://hcai.ca.gov/",
    description:
      "California community health center reporting from the Department of Health Care Access and Information.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "ca-chhs-open-data-portal",
    title: "CA CHHS Open Data Portal",
    organization: "CHHS",
    url: "https://data.chhs.ca.gov/",
    description:
      "Licensed facility crosswalk and health data from California Health and Human Services.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "cpca-chc-data",
    title: "CPCA CHC Data",
    organization: "CPCA",
    url: "https://www.cpca.org/CPCA/About/Publications_and_Reports/CHC_Data/CPCA/About/CHC_Data.aspx",
    description:
      "CA-specific benchmarking data from the California Primary Care Association.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "chcf-safety-net-almanac",
    title: "CHCF Safety Net Almanac",
    organization: "CHCF",
    url: "https://www.chcf.org/wp-content/uploads/2024/07/HealthCareSafetyNetAlmanac2024.pdf",
    description:
      "CA safety net utilization and payer mix data from the California Health Care Foundation.",
    category: "data-dashboards",
    type: "dataset",
  },
  {
    id: "peterson-kff-health-system-tracker",
    title: "Peterson-KFF Health System Tracker",
    organization: "Peterson-KFF",
    url: "https://www.healthsystemtracker.org/",
    description:
      "Macro healthcare spending context and health system performance tracking.",
    category: "data-dashboards",
    type: "dataset",
  },

  // ---------------------------------------------------------------------------
  // 10. Podcasts & Media
  // ---------------------------------------------------------------------------

  {
    id: "conversations-on-health-care-chc-radio",
    title: "Conversations on Health Care (CHC Radio)",
    author: "Mark Masselli & Margaret Flinter",
    url: "https://www.chcradio.com/episodes.php",
    description:
      "Longest-running CHC podcast; national leaders, AI, workforce. Hosted by Mark Masselli and Margaret Flinter.",
    category: "podcasts",
    type: "podcast",
  },
  {
    id: "the-community-health-center-podcast",
    title: "The Community Health Center Podcast",
    organization: "Higginbotham Insurance",
    url: "https://www.chcpodcast.com/",
    description:
      "Quarterly podcast covering grant funding, mobile units, and Medicaid unwinding topics.",
    category: "podcasts",
    type: "podcast",
  },
  {
    id: "fqhc-associates-podcast",
    title: "FQHC Associates Podcast",
    author: "Steve Weinman",
    url: "https://www.fqhc.org/blog/category/Podcast",
    description:
      "Practical CEO leadership podcast covering immigration, marketing, and operations.",
    category: "podcasts",
    type: "podcast",
  },

  // Essential Historical Media
  {
    id: "community-health-center-chronicles-media",
    title: "Community Health Center Chronicles",
    url: "https://www.chcchronicles.org/",
    description:
      "Documentaries, oral histories, interactive timeline (1965-present) of the community health center movement.",
    category: "podcasts",
    subcategory: "Essential Historical Media",
    type: "organization",
  },
  {
    id: "agents-of-hope-centers-of-change",
    title: '"Agents of Hope, Centers of Change"',
    organization: "CHC Chronicles",
    description:
      "Documentary film on the community health center movement. Available via CHC Chronicles.",
    category: "podcasts",
    subcategory: "Essential Historical Media",
    type: "article",
  },

  // ---------------------------------------------------------------------------
  // 11. Government & Congressional Resources
  // ---------------------------------------------------------------------------

  // Congressional Research Service
  {
    id: "crs-r43937-federal-health-centers-overview",
    title: "R43937: Federal Health Centers Overview",
    organization: "CRS",
    url: "https://www.congress.gov/crs-product/R43937",
    description:
      "Authorization, funding structure, and eligibility for federal health centers.",
    category: "government-resources",
    subcategory: "Congressional Research Service",
    type: "government",
  },
  {
    id: "crs-r43911-community-health-center-fund",
    title: "R43911: Community Health Center Fund",
    organization: "CRS",
    url: "https://www.congress.gov/crs-product/R43911",
    description:
      "CHCF mandatory funding mechanism established by the Affordable Care Act.",
    category: "government-resources",
    subcategory: "Congressional Research Service",
    type: "government",
  },
  {
    id: "crs-r47351-noncitizens-access",
    title: "R47351: Noncitizens' Access to Health Care",
    organization: "CRS",
    url: "https://www.congress.gov/crs-product/R47351",
    description:
      "Full legal landscape for noncitizen healthcare access from the Congressional Research Service.",
    category: "government-resources",
    subcategory: "Congressional Research Service",
    type: "government",
  },

  // GAO
  {
    id: "gao-23-106664",
    title: "GAO-23-106664 (2023)",
    organization: "GAO",
    url: "https://www.gao.gov/products/gao-23-106664",
    description:
      "Federal/state support growing but slower; more volatile funding mix for health centers.",
    category: "government-resources",
    subcategory: "Government Accountability Office",
    type: "government",
  },
  {
    id: "gao-19-496",
    title: "GAO-19-496 (2019)",
    organization: "GAO",
    url: "https://www.gao.gov/assets/gao-19-496.pdf",
    description:
      "CHCF provided ~$12.6B in service area grants (FY2011-2017).",
    category: "government-resources",
    subcategory: "Government Accountability Office",
    type: "government",
  },

  // MACPAC
  {
    id: "macpac-medicaid-payment-policy-fqhcs",
    title: "Medicaid Payment Policy for FQHCs",
    organization: "MACPAC",
    url: "https://www.macpac.gov/publication/medicaid-payment-policy-for-federally-qualified-health-centers/",
    description:
      "PPS rate-setting, alternative payment models, and Medicaid's role in FQHC payment.",
    category: "government-resources",
    subcategory: "MACPAC",
    type: "government",
  },
  {
    id: "macpac-considering-medicaid-payment-fqhcs",
    title: "Considering Medicaid Payment to FQHCs",
    organization: "MACPAC",
    url: "https://www.macpac.gov/publication/considering-medicaid-payment-to-federally-qualified-health-centers/",
    description:
      "APM reform convening on alternative payment models for FQHCs.",
    category: "government-resources",
    subcategory: "MACPAC",
    type: "government",
  },

  // Key Legislation
  {
    id: "consolidated-appropriations-act-2026",
    title: "Consolidated Appropriations Act (2026)",
    description:
      "$4.6B CHCF; signed February 2026. Major funding legislation for community health centers.",
    category: "government-resources",
    subcategory: "Key Legislation",
    type: "government",
  },
  {
    id: "community-health-center-reauthorization-act",
    title: "Community Health Center Reauthorization Act (S.2308)",
    url: "https://www.congress.gov/bill/118th-congress/senate-bill/2308/all-info",
    description:
      "Bipartisan reauthorization bill for community health centers.",
    category: "government-resources",
    subcategory: "Key Legislation",
    type: "government",
  },
  {
    id: "hr-1-one-big-beautiful-bill",
    title: 'H.R. 1 "One Big Beautiful Bill"',
    description:
      "Largest Medicaid cuts in history. Major threat to FQHC funding and patient coverage.",
    category: "government-resources",
    subcategory: "Key Legislation",
    type: "government",
  },

  // HRSA / CMS
  {
    id: "bphc-data-and-reporting",
    title: "BPHC Data & Reporting",
    organization: "HRSA",
    url: "https://bphc.hrsa.gov/data-reporting",
    description:
      "UDS manual, training, and UDS+ transition resources for health center reporting.",
    category: "government-resources",
    subcategory: "HRSA / CMS",
    type: "government",
  },
  {
    id: "2025-uds-manual",
    title: "2025 UDS Manual",
    organization: "HRSA",
    url: "https://bphc.hrsa.gov/sites/default/files/bphc/compliance/2025-uds-manual.pdf",
    description:
      "All Uniform Data System reporting requirements for 2025.",
    category: "government-resources",
    subcategory: "HRSA / CMS",
    type: "government",
  },
  {
    id: "cms-fqhc-center",
    title: "CMS FQHC Center",
    organization: "CMS",
    url: "https://www.cms.gov/files/document/mln006397-federally-qualified-health-center.pdf",
    description:
      "Billing and payment policy reference for FQHCs (January 2026).",
    category: "government-resources",
    subcategory: "HRSA / CMS",
    type: "government",
  },
  {
    id: "uds-cqm-benchmarks",
    title: "UDS CQM Benchmarks",
    organization: "HRSA",
    url: "https://bphc.hrsa.gov/sites/default/files/bphc/data-reporting/uds-cqm-benchmarks.pdf",
    description:
      "Clinical quality measure targets and benchmarks for health center reporting.",
    category: "government-resources",
    subcategory: "HRSA / CMS",
    type: "government",
  },

  // ---------------------------------------------------------------------------
  // 12. Key Statistics
  // ---------------------------------------------------------------------------

  {
    id: "us-health-center-patients-2024",
    title: "US Health Center Patients (2024)",
    organization: "HRSA UDS",
    description: "32.4 million patients served by US health centers in 2024.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "us-health-center-sites",
    title: "US Health Center Sites",
    organization: "HRSA",
    description: "14,000+ health center sites across the United States.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "uninsured-health-center-patients-2024",
    title: "Uninsured Health Center Patients (2024)",
    organization: "KFF/HRSA",
    description:
      "5.9 million uninsured patients (18%) served by health centers in 2024.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "national-avg-operating-margin-2024",
    title: "National Avg Operating Margin (2024)",
    organization: "NACHC",
    description:
      "National average operating margin of -2.4% for health centers in 2024.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "grantee-operating-margin-2024",
    title: "Grantee Operating Margin (2024)",
    organization: "NACHC",
    description:
      "Grantee operating margin of -2.1% for health centers in 2024.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "fqhcs-with-negative-margins-2023",
    title: "FQHCs with Negative Margins (2023)",
    organization: "Commonwealth Fund",
    description:
      "Approximately 50% of FQHCs had negative operating margins in 2023.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "undocumented-adults-using-chcs",
    title: "Undocumented Adults Using CHCs as Usual Care",
    organization: "KFF",
    description:
      "42% of undocumented adults use community health centers as their usual source of care (2023).",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "ca-undocumented-eligible-medi-cal-2024",
    title: "CA Undocumented Adults Eligible for Medi-Cal (Jan 2024)",
    organization: "UC Berkeley",
    description:
      "710,000 undocumented adults in California became eligible for Medi-Cal in January 2024.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "ca-undocumented-still-uninsured",
    title: "CA Undocumented Still Uninsured",
    organization: "UC Berkeley",
    description:
      "520,000 undocumented Californians remain uninsured despite Medi-Cal expansion.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "ca-undocumented-patients-at-350-chcs",
    title: "CA Undocumented Patients at 350 CHCs",
    organization: "PPIC",
    description:
      "369,891 individuals with 5.4 million visits studied at 350 California community health centers.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "immigrants-net-healthcare-contribution-2017",
    title: "Immigrants' Net Healthcare Contribution (2017)",
    author: "Zallman, JAMA",
    description:
      "Immigrants contributed +$58.3 billion more than they received in healthcare in 2017.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "healthcare-workers-reporting-visit-declines",
    title: "Healthcare Workers Reporting Patient Visit Declines (post-Jan 2025)",
    organization: "PHR",
    description:
      "84% of healthcare workers reported patient visit declines after January 2025.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "immigrants-skipping-healthcare-2025",
    title: "Immigrants Skipping/Postponing Healthcare (2025)",
    organization: "KFF/NYT",
    description:
      "29% of immigrants reported skipping or postponing healthcare in 2025.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "fqhcs-reporting-physician-shortages",
    title: "FQHCs Reporting Physician Shortages",
    organization: "Commonwealth Fund 2024",
    description: "70% of FQHCs reported physician shortages in 2024.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "fqhcs-reporting-mental-health-shortages",
    title: "FQHCs Reporting Mental Health Shortages",
    organization: "Commonwealth Fund 2024",
    description: "77% of FQHCs reported mental health provider shortages in 2024.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "fqhcs-screening-for-social-needs",
    title: "FQHCs Screening for Social Needs",
    organization: "Commonwealth Fund 2024",
    description:
      "67% of FQHCs screen for social needs (up from 40% in 2018).",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "fqhcs-offering-telehealth",
    title: "FQHCs Offering Telehealth",
    organization: "Commonwealth Fund 2024",
    description:
      "96% of FQHCs offer telehealth services (up from 24% in 2018).",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "fqhcs-participating-in-acos",
    title: "FQHCs Participating in ACOs",
    organization: "Commonwealth Fund 2025",
    description:
      "62% of FQHCs participate in Accountable Care Organizations.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "2025-national-base-pps-rate",
    title: "2025 National Base PPS Rate",
    organization: "CMS",
    description:
      "$202.65 national base Prospective Payment System rate for FQHCs in 2025.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "pandemic-funding-lost-2024",
    title: "Pandemic Funding Lost (entering 2024)",
    organization: "NACHC",
    description:
      "~$1.5 billion in pandemic funding lost as health centers entered 2024.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "section-330-funding-fy2019",
    title: "Section 330 Funding (FY 2019)",
    organization: "CRS",
    description: "$5.6 billion in Section 330 funding in fiscal year 2019.",
    category: "key-statistics",
    type: "dataset",
  },
  {
    id: "chcf-authorization-expires",
    title: "CHCF Authorization Expires",
    organization: "Congress",
    description:
      "Community Health Center Fund authorization expires December 31, 2026.",
    category: "key-statistics",
    type: "dataset",
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

export const getEntriesByCategory = (
  category: BibliographyCategory
): BibliographyEntry[] =>
  BIBLIOGRAPHY_ENTRIES.filter((entry) => entry.category === category);

export const getEntriesBySubcategory = (
  subcategory: string
): BibliographyEntry[] =>
  BIBLIOGRAPHY_ENTRIES.filter((entry) => entry.subcategory === subcategory);

export const getEntriesByType = (type: ResourceType): BibliographyEntry[] =>
  BIBLIOGRAPHY_ENTRIES.filter((entry) => entry.type === type);

export const getSectionById = (
  id: BibliographyCategory
): BibliographySection | undefined =>
  BIBLIOGRAPHY_SECTIONS.find((section) => section.id === id);

export const getEntryById = (id: string): BibliographyEntry | undefined =>
  BIBLIOGRAPHY_ENTRIES.find((entry) => entry.id === id);

export const getSubcategoriesForCategory = (
  category: BibliographyCategory
): string[] => {
  const subcategories = new Set<string>();
  BIBLIOGRAPHY_ENTRIES.forEach((entry) => {
    if (entry.category === category && entry.subcategory) {
      subcategories.add(entry.subcategory);
    }
  });
  return Array.from(subcategories);
};
