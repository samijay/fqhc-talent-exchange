// blog-posts.ts — Shared blog post metadata for use across pages
// Used by: /blog (index page), homepage (unified intelligence feed)

export interface BlogPost {
  slug: string;
  title: string;
  esTitle: string;
  description: string;
  esDescription: string;
  date: string; // Human-readable EN date
  esDate: string;
  isoDate: string; // ISO date for sorting
  category: string;
  esCategory: string;
  readTime: string;
  esReadTime: string;
  /** Set to false for posts that are in the data but don't have a page file yet */
  live?: boolean;
}

// Helper to generate Next.js Metadata for a blog post by slug
// Used by individual blog article layout.tsx files
export function generateBlogMetadata(slug: string) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article" as const,
      publishedTime: post.isoDate,
      url: `https://www.fqhctalent.com/blog/${post.slug}`,
    },
    alternates: {
      canonical: `https://www.fqhctalent.com/blog/${post.slug}`,
    },
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "march-2026-jobs-report-fqhc-hiring-slowdown",
    title:
      "March 2026 Jobs Report: 76K Healthcare Jobs, FQHC Hiring Crisis",
    esTitle:
      "Empleos Marzo 2026: 76K en Salud, Crisis de Contrataci\u00f3n FQHC",
    description:
      "Healthcare added 76K jobs in March 2026 but FQHCs can\u2019t fill roles. BLS data, NACHC vacancies, NP growth +40%, Medicaid cuts threatening California community health centers.",
    esDescription:
      "Salud agreg\u00f3 76K empleos en marzo 2026 pero FQHCs no pueden llenar roles. Datos BLS, vacantes NACHC, crecimiento NP +40%, recortes de Medicaid amenazan centros de salud comunitarios de California.",
    date: "April 6, 2026",
    esDate: "6 de abril de 2026",
    isoDate: "2026-04-06",
    category: "Data Report",
    esCategory: "Informe de Datos",
    readTime: "10 min read",
    esReadTime: "10 min de lectura",
  },
  {
    slug: "fqhc-technology-stack-guide-2026",
    title:
      "Your FQHC Technology Stack in 2026: 12 Categories, 28 Vendors, and the Decisions That Actually Matter",
    esTitle:
      "Tu Stack Tecnológico FQHC en 2026: 12 Categorías, 28 Proveedores y las Decisiones que Realmente Importan",
    description:
      "A practical guide to evaluating FQHC technology vendors across EHR, billing, HR, cybersecurity, and 8 more categories. Real pricing, FQHC-specific discounts, and a decision framework for health centers of any size.",
    esDescription:
      "Una guía práctica para evaluar proveedores de tecnología para FQHCs en EHR, facturación, RRHH, ciberseguridad y 8 categorías más. Precios reales, descuentos específicos para FQHCs y un marco de decisión.",
    date: "March 20, 2026",
    esDate: "20 de marzo de 2026",
    isoDate: "2026-03-20",
    category: "Technology & AI",
    esCategory: "Tecnología e IA",
    readTime: "10 min read",
    esReadTime: "10 min de lectura",
  },
  {
    slug: "hrsa-site-visit-survival-guide-2026",
    live: false, // page file not yet created
    title: "HRSA Site Visit Survival Guide: 19 Requirements Every California FQHC Must Master",
    esTitle: "Guía de Supervivencia de Visita de HRSA: 19 Requisitos que Todo FQHC de California Debe Dominar",
    description: "Your OSV is coming. Here are the 19 HRSA program requirements with CFR citations, common failures, and a downloadable 30-day prep checklist for governance, clinical, financial, and operational readiness.",
    esDescription: "Tu OSV viene. Aquí están los 19 requisitos de HRSA con citas CFR, fallas comunes y una lista de verificación de preparación de 30 días descargable para preparación de gobernanza, clínica, financiera y operacional.",
    date: "March 10, 2026",
    esDate: "10 de marzo de 2026",
    isoDate: "2026-03-10",
    category: "Compliance & Risk",
    esCategory: "Cumplimiento y Riesgo",
    readTime: "11 min read",
    esReadTime: "11 min de lectura",
  },
  {
    slug: "hipaa-compliance-for-fqhcs-2026-update",
    live: false, // page file not yet created
    title: "HIPAA Compliance for FQHCs: 2026 Update on Breaches, BAAs, and OCR Penalties",
    esTitle: "Cumplimiento HIPAA para FQHCs: Actualización 2026 sobre Violaciones, BAAs y Multas de OCR",
    description: "HIPAA enforcement is accelerating. Learn the 5 compliance gaps FQHCs miss most, how to respond to breaches in 72 hours, why your BAA audit matters, and what the latest OCR settlements mean for your org.",
    esDescription: "La aplicación de HIPAA se está acelerando. Aprende las 5 brechas de cumplimiento que los FQHCs más pierden, cómo responder a violaciones en 72 horas, por qué tu auditoría BAA importa y qué significan los últimos acuerdos de OCR.",
    date: "March 8, 2026",
    esDate: "8 de marzo de 2026",
    isoDate: "2026-03-08",
    category: "Compliance & Risk",
    esCategory: "Cumplimiento y Riesgo",
    readTime: "10 min read",
    esReadTime: "10 min de lectura",
  },
  {
    slug: "billing-compliance-avoiding-false-claims-2026",
    live: false, // page file not yet created
    title: "Billing Compliance: Avoiding False Claims Act Penalties at California FQHCs",
    esTitle: "Cumplimiento de Facturación: Evitando Multas de la Ley de Reclamaciones Falsas en FQHCs de California",
    description: "OIG recovered $4.7B in healthcare fraud last year. Understand PPS billing rules, same-day encounter documentation, ECM/CCM coding standards, and the 3 compliance gaps that trigger OIG audits at FQHCs.",
    esDescription: "El OIG recuperó $4.7B en fraude de salud el año pasado. Comprende las reglas de facturación PPS, documentación de encuentros del mismo día, estándares de codificación ECM/CCM y las 3 brechas que activan auditorías OIG.",
    date: "March 6, 2026",
    esDate: "6 de marzo de 2026",
    isoDate: "2026-03-06",
    category: "Compliance & Risk",
    esCategory: "Cumplimiento y Riesgo",
    readTime: "12 min read",
    esReadTime: "12 min de lectura",
  },
  {
    slug: "340b-program-compliance-audit-prevention",
    live: false, // page file not yet created
    title: "340B Program Compliance: Avoiding Contract Pharmacy Violations and Audit Triggers",
    esTitle: "Cumplimiento del Programa 340B: Evitando Violaciones de Farmacias de Contrato y Disparadores de Auditoría",
    description: "340B audits have doubled since 2024. Learn the 6 compliance rules that trigger manufacturer recalls, contract pharmacy pitfalls, split-billing requirements, and what to document for every 340B transaction.",
    esDescription: "Las auditorías 340B se han duplicado desde 2024. Aprende las 6 reglas de cumplimiento que activan devoluciones de fabricantes, trampas de farmacias de contrato y qué documentar por cada transacción 340B.",
    date: "March 4, 2026",
    esDate: "4 de marzo de 2026",
    isoDate: "2026-03-04",
    category: "Compliance & Risk",
    esCategory: "Cumplimiento y Riesgo",
    readTime: "9 min read",
    esReadTime: "9 min de lectura",
  },
  {
    slug: "fqhc-ai-scribes-what-workers-need-to-know",
    title:
      "AI Scribes at FQHCs: What Community Health Workers Need to Know in 2026",
    esTitle:
      "Escribas de IA en los FQHCs: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber en 2026",
    description:
      "66% of physicians now use AI scribes. Learn how ambient AI documentation is changing FQHC workflows, reducing burnout, and what it means for your role.",
    esDescription:
      "El 66% de los médicos ya usan escribas de IA. Conoce cómo la documentación ambiental con IA está cambiando los flujos de trabajo en FQHCs y qué significa para tu rol.",
    date: "March 9, 2026",
    esDate: "9 de marzo de 2026",
    isoDate: "2026-03-09",
    category: "Technology & AI",
    esCategory: "Tecnología e IA",
    readTime: "9 min read",
    esReadTime: "9 min de lectura",
  },
  {
    slug: "fqhc-copay-advantage-patient-surge",
    title:
      "The FQHC Copay Advantage: Why Community Health Centers May See a Patient Surge",
    esTitle:
      "La Ventaja de Copago de los FQHCs: Por Que los Centros de Salud Comunitarios Podrian Ver un Aumento de Pacientes",
    description:
      "H.R. 1 lets states charge Medicaid copays up to $35 — but FQHCs are exempt. Learn how this copay advantage could drive a patient surge to community health centers.",
    esDescription:
      "H.R. 1 permite copagos de Medicaid de hasta $35 — pero los FQHCs estan exentos. Descubre como esta ventaja podria generar un aumento de pacientes.",
    date: "March 9, 2026",
    esDate: "9 de marzo de 2026",
    isoDate: "2026-03-09",
    category: "Policy & Strategy",
    esCategory: "Politica y Estrategia",
    readTime: "8 min read",
    esReadTime: "8 min de lectura",
  },
  {
    slug: "february-2026-jobs-report-healthcare-crisis",
    title:
      "Healthcare Created 121% of U.S. Job Growth in February — Then Congress Cut $911B from Medicaid",
    esTitle:
      "Salud Creó el 121% del Crecimiento Laboral en Febrero — Luego el Congreso Recortó $911B de Medicaid",
    description:
      "Healthcare was the only sector growing in February 2026 — then Congress passed the largest Medicaid cuts in history. What this means for FQHC jobs, Kaiser strike fallout, and where community health centers are still hiring.",
    esDescription:
      "Salud fue el único sector creciendo en febrero 2026 — luego el Congreso aprobó los mayores recortes de Medicaid en la historia. Qué significa para empleos FQHC, impacto de la huelga Kaiser y dónde siguen contratando los centros de salud.",
    date: "March 6, 2026",
    esDate: "6 de marzo de 2026",
    isoDate: "2026-03-06",
    category: "Data Report",
    esCategory: "Informe de Datos",
    readTime: "12 min read",
    esReadTime: "12 min de lectura",
  },
  {
    slug: "healthcare-hiring-trends-2026",
    title: "82,000 Healthcare Jobs Added in January 2026 — Which FQHC Roles Are Growing Fastest?",
    esTitle:
      "82,000 Empleos de Salud en Enero 2026 — ¿Qué Roles FQHC Crecen Más Rápido?",
    description:
      "Healthcare created 63% of all U.S. job growth in January 2026. See which California FQHC roles are surging, BLS data breakdown, HRSA projections, and where community health centers are hiring now.",
    esDescription:
      "Salud creó el 63% del crecimiento laboral de EE.UU. en enero 2026. Descubre qué roles FQHC en California están en auge, datos BLS, proyecciones HRSA y dónde están contratando los centros de salud comunitaria.",
    date: "February 16, 2026",
    esDate: "16 de febrero de 2026",
    isoDate: "2026-02-16",
    category: "Data Report",
    esCategory: "Informe de Datos",
    readTime: "10 min read",
    esReadTime: "10 min de lectura",
  },
  {
    slug: "fqhc-salary-negotiation-guide",
    title: "How to Negotiate Your FQHC Salary: A Guide for Community Health Professionals",
    esTitle:
      "Cómo Negociar Tu Salario en un FQHC: Guía para Profesionales de Salud Comunitaria",
    description:
      "Learn proven salary negotiation strategies tailored to FQHCs. Understand grant-funded pay structures, leverage your bilingual and ECM skills, and negotiate total compensation packages worth $20k+ beyond base salary.",
    esDescription:
      "Aprende estrategias comprobadas de negociación salarial adaptadas para FQHCs. Comprende las estructuras de pago financiadas por subvenciones, aprovecha tus habilidades bilingües y de ECM, y negocia paquetes de compensación total que valen $20k+ más allá del salario base.",
    date: "February 15, 2026",
    esDate: "15 de febrero de 2026",
    isoDate: "2026-02-15",
    category: "Career Resources",
    esCategory: "Recursos Profesionales",
    readTime: "8 min read",
    esReadTime: "8 min de lectura",
  },
  {
    slug: "fqhc-benefits-guide-community-health",
    title: "FQHC Benefits Guide 2026: How a $65K Salary Equals $85K+ in Total Compensation",
    esTitle:
      "Guía de Beneficios FQHC 2026: Cómo un Salario de $65K Equivale a $85K+ en Compensación Total",
    description:
      "FQHC benefits breakdown: NHSC loan repayment ($50-75K), health insurance, retirement plans, 4-6 weeks PTO, and professional development. See why a $65K FQHC salary equals $85K+ in total comp vs. private practice.",
    esDescription:
      "Desglose de beneficios FQHC: reembolso NHSC ($50-75K), seguro médico, jubilación, 4-6 semanas PTO y desarrollo profesional. Por qué un salario FQHC de $65K equivale a $85K+ en compensación total vs. práctica privada.",
    date: "February 15, 2026",
    esDate: "15 de febrero de 2026",
    isoDate: "2026-02-15",
    category: "Benefits",
    esCategory: "Beneficios",
    readTime: "9 min read",
    esReadTime: "9 min de lectura",
  },
  {
    slug: "laid-off-fqhc-fast-track-job-search",
    title: "Laid Off from an FQHC? 1,700+ Open Positions & Free Career Tools (2026)",
    esTitle: "\u00bfDespedido/a de un FQHC? 1,700+ Posiciones Abiertas y Herramientas Gratis (2026)",
    description:
      "3,477 California community health workers displaced by Medi-Cal cuts — but 1,700+ FQHC positions are open right now. Free resume builder, career assessment, and job listings across 214 FQHCs. Get job-ready today.",
    esDescription:
      "3,477 trabajadores de salud comunitaria desplazados por recortes de Medi-Cal — pero 1,700+ posiciones FQHC están abiertas ahora. Constructor de currículum gratis, evaluación de carrera y empleos en 214 FQHCs.",
    date: "February 15, 2026",
    esDate: "15 de febrero de 2026",
    isoDate: "2026-02-15",
    category: "Career Resources",
    esCategory: "Recursos Profesionales",
    readTime: "8 min read",
    esReadTime: "8 min de lectura",
  },
  {
    slug: "fqhc-career-insights-assessment",
    title: "Career Insights Assessment: A Behavioral Assessment Built for Community Health",
    esTitle:
      "Evaluación de Perspectivas Profesionales: Una Evaluación Conductual para Salud Comunitaria",
    description:
      "Discover the Career Insights Assessment — a scenario-based behavioral evaluation across 4 domains adapted from the TPB Universal Assessment framework. Understand your strengths, growth areas, and biggest opportunity for rapid improvement in community health careers.",
    esDescription:
      "Descubre la Evaluación de Perspectivas Profesionales — una evaluación conductual basada en escenarios en 4 dominios adaptada del marco TPB Universal Assessment. Comprende tus fortalezas, áreas de crecimiento y mayor oportunidad de mejora rápida en carreras de salud comunitaria.",
    date: "February 15, 2026",
    esDate: "15 de febrero de 2026",
    isoDate: "2026-02-15",
    category: "Assessment Tools",
    esCategory: "Herramientas de Evaluación",
    readTime: "9 min read",
    esReadTime: "9 min de lectura",
  },
  {
    slug: "fqhc-vs-private-practice",
    title: "FQHC vs Private Practice: Which Is Right for Your Healthcare Career in California?",
    esTitle:
      "FQHC vs Práctica Privada: ¿Cuál Es Mejor para Tu Carrera de Salud en California?",
    description:
      "Compare working at a Federally Qualified Health Center vs private practice or hospitals. Explore compensation, benefits, loan repayment, scope of practice, career growth, and cultural fit to find the right path for your community health career.",
    esDescription:
      "Compara trabajar en un Centro de Salud Federalmente Calificado vs práctica privada u hospitales. Explora compensación, beneficios, reembolso de préstamos, alcance de práctica, crecimiento profesional y ajuste cultural para encontrar el camino correcto para tu carrera.",
    date: "February 15, 2026",
    esDate: "15 de febrero de 2026",
    isoDate: "2026-02-15",
    category: "Career Guidance",
    esCategory: "Orientación Profesional",
    readTime: "10 min read",
    esReadTime: "10 min de lectura",
  },
  {
    slug: "top-10-fqhc-interview-questions",
    title: "Top 10 FQHC Interview Questions 2026: STAR Answers & What Hiring Managers Look For",
    esTitle:
      "Las 10 Principales Preguntas de Entrevista FQHC 2026: Respuestas STAR y Lo Que Buscan",
    description:
      "FQHC interview prep with STAR-format answers. Covers ECM program knowledge, cultural competency, EHR experience, and team-based care questions. Real hiring manager insights for California community health center jobs.",
    esDescription:
      "Preparación de entrevista FQHC con respuestas formato STAR. Cubre ECM, competencia cultural, experiencia EHR y preguntas de atención en equipo. Perspectivas reales de gerentes de contratación en centros de salud comunitarios.",
    date: "February 14, 2026",
    esDate: "14 de febrero de 2026",
    isoDate: "2026-02-14",
    category: "Interview Prep",
    esCategory: "Preparación de Entrevistas",
    readTime: "12 min read",
    esReadTime: "12 min de lectura",
  },
  {
    slug: "nhsc-loan-repayment-guide",
    title: "NHSC Loan Repayment for FQHC Workers: Complete Guide",
    esTitle:
      "Reembolso de Préstamos NHSC para Trabajadores de FQHC: Guía Completa",
    description:
      "Learn how the National Health Service Corps loan repayment program can pay off up to $50,000 of your student loans for working at an FQHC. Eligibility, application tips, and which California FQHCs qualify.",
    esDescription:
      "Aprende cómo el programa de reembolso de préstamos del National Health Service Corps puede pagar hasta $50,000 de tus préstamos estudiantiles por trabajar en un FQHC. Elegibilidad, consejos de solicitud y qué FQHCs de California califican.",
    date: "February 14, 2026",
    esDate: "14 de febrero de 2026",
    isoDate: "2026-02-14",
    category: "Benefits & Compensation",
    esCategory: "Beneficios y Compensación",
    readTime: "10 min read",
    esReadTime: "10 min de lectura",
  },
  {
    slug: "working-at-top-of-scope-fqhc",
    title: "Working at Top of Scope: How FQHCs Are Revolutionizing Patient Access",
    esTitle:
      "Trabajar al Máximo de Tu Alcance: Cómo los FQHCs Están Revolucionando el Acceso al Paciente",
    description:
      "Learn how FQHCs use team-based care to maximize provider scope of practice. Discover how RNs, MAs, and providers work together to increase patient access and reduce burnout while maintaining quality care.",
    esDescription:
      "Aprende cómo los FQHCs usan atención basada en equipos para maximizar el alcance de práctica. Descubre cómo RNs, MAs y proveedores trabajan juntos para aumentar el acceso al paciente y reducir el agotamiento manteniendo la calidad de atención.",
    date: "February 10, 2026",
    esDate: "10 de febrero de 2026",
    isoDate: "2026-02-10",
    category: "Clinical Operations",
    esCategory: "Operaciones Clínicas",
    readTime: "11 min read",
    esReadTime: "11 min de lectura",
  },
  {
    slug: "fqhc-career-ladder-ma-rn-provider",
    title: "The FQHC MA, RN & Provider Career Ladder: How to Advance in Community Health",
    esTitle:
      "La Escalera Profesional de MA, RN y Proveedores en FQHC: Cómo Avanzar en Salud Comunitaria",
    description:
      "Explore career advancement paths at FQHCs for MAs, RNs, and providers. Learn about progression opportunities, certifications that accelerate growth, salary ranges, and how bilingual skills unlock faster advancement.",
    esDescription:
      "Explora caminos de avance profesional en FQHCs para MAs, RNs y proveedores. Aprende sobre oportunidades de progresión, certificaciones que aceleran el crecimiento, rangos salariales y cómo las habilidades bilingües desbloquean un avance más rápido.",
    date: "February 10, 2026",
    esDate: "10 de febrero de 2026",
    isoDate: "2026-02-10",
    category: "Career Growth",
    esCategory: "Crecimiento Profesional",
    readTime: "12 min read",
    esReadTime: "12 min de lectura",
  },
  {
    slug: "how-to-write-fqhc-resume",
    title: "How to Write an FQHC Resume in 2026: Free Templates & Community Health Tips",
    esTitle:
      "Cómo Escribir un Currículum para FQHC en 2026: Plantillas Gratis y Consejos",
    description:
      "Free FQHC resume templates for 8 roles. Highlight ECM, EHR systems, and bilingual skills that California community health centers are hiring for right now. Includes downloadable templates.",
    esDescription:
      "Plantillas gratis de currículum para FQHC en 8 roles. Destaca habilidades de ECM, sistemas EHR y bilingüismo que los centros de salud comunitarios de California buscan ahora mismo.",
    date: "February 7, 2026",
    esDate: "7 de febrero de 2026",
    isoDate: "2026-02-07",
    category: "Career Resources",
    esCategory: "Recursos Profesionales",
    readTime: "7 min read",
    esReadTime: "7 min de lectura",
  },
  {
    slug: "what-is-enhanced-care-management-ecm",
    title: "What Is Enhanced Care Management (ECM)? A Career Guide for Community Health Workers",
    esTitle:
      "¿Qué Es Enhanced Care Management (ECM)? Guía Profesional para Trabajadores de Salud Comunitaria",
    description:
      "Enhanced Care Management is one of the fastest-growing programs at California FQHCs. Learn what ECM is, what roles it creates, what skills you need, and how to land an ECM job.",
    esDescription:
      "Enhanced Care Management es uno de los programas de más rápido crecimiento en los FQHCs de California. Aprende qué es ECM, qué puestos crea, qué habilidades necesitas y cómo conseguir un trabajo en ECM.",
    date: "February 5, 2026",
    esDate: "5 de febrero de 2026",
    isoDate: "2026-02-05",
    category: "Career Resources",
    esCategory: "Recursos Profesionales",
    readTime: "10 min read",
    esReadTime: "10 min de lectura",
  },
  {
    slug: "medi-cal-funding-cuts-community-health-workers",
    title: "Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026",
    esTitle:
      "Recortes de Fondos de Medi-Cal: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber en 2026",
    description:
      "California's Medi-Cal funding cuts are displacing thousands of community health workers at FQHCs statewide. Here's what happened, what it means for your career, and how to find your next role quickly.",
    esDescription:
      "Los recortes de fondos de Medi-Cal de California están desplazando a miles de trabajadores de salud comunitaria en FQHCs en todo el estado. Esto es lo que pasó, lo que significa para tu carrera y cómo encontrar tu próximo puesto rápidamente.",
    date: "February 1, 2026",
    esDate: "1 de febrero de 2026",
    isoDate: "2026-02-01",
    category: "Career Resources",
    esCategory: "Recursos Profesionales",
    readTime: "8 min read",
    esReadTime: "8 min de lectura",
  },
];

// Slugs for all live blog posts (those with page files published).
// Derived automatically — add new posts to BLOG_POSTS above and omit `live: false` when the page is ready.
export const PUBLISHED_BLOG_SLUGS = BLOG_POSTS.filter((p) => p.live !== false).map((p) => p.slug);
