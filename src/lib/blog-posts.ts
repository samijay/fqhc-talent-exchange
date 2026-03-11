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
      "February 2026 Healthcare Jobs Report: BLS Data Shows 121% of U.S. Job Growth — Then $911B in Cuts",
    esTitle:
      "Informe de Empleos de Salud Febrero 2026: Datos del BLS Muestran 121% del Crecimiento Laboral — Luego $911B en Recortes",
    description:
      "February 2026 BLS data analysis: healthcare created 121% of all U.S. job growth while every other sector was flat. Then Congress passed $911B in Medicaid cuts. Economic indicators, Kaiser strike impact, and what it means for FQHCs.",
    esDescription:
      "Análisis de datos BLS febrero 2026: salud creó 121% del crecimiento laboral de EE.UU. mientras otros sectores estaban planos. Luego el Congreso aprobó $911B en recortes de Medicaid. Indicadores económicos, impacto de huelga Kaiser y lo que significa para FQHCs.",
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
    title: "Healthcare Hiring Trends 2026: 82,000 Jobs Added in January — BLS Data & FQHC Growth Analysis",
    esTitle:
      "Tendencias de Contratación en Salud 2026: 82,000 Empleos en Enero — Datos BLS y Análisis de Crecimiento FQHC",
    description:
      "Healthcare added 82,000 jobs in January 2026 — 63% of all U.S. job growth. BLS data breakdown, HRSA workforce projections, California FQHC hiring surge data, and which community health roles are growing fastest.",
    esDescription:
      "Salud añadió 82,000 empleos en enero 2026 — 63% del crecimiento laboral de EE.UU. Desglose de datos BLS, proyecciones HRSA, datos de contratación en FQHCs de California y qué roles de salud comunitaria crecen más rápido.",
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
    title: "Laid Off from an FQHC? 1,000+ Open Positions & Free Career Tools (2026)",
    esTitle: "\u00bfDespedido/a de un FQHC? 1,000+ Posiciones Abiertas y Herramientas Gratis (2026)",
    description:
      "3,477 California community health workers displaced by Medi-Cal cuts — but 1,000+ FQHC positions are open right now. Free resume builder, career assessment, and job listings across 214 FQHCs. Get job-ready today.",
    esDescription:
      "3,477 trabajadores de salud comunitaria desplazados por recortes de Medi-Cal — pero 1,000+ posiciones FQHC están abiertas ahora. Constructor de currículum gratis, evaluación de carrera y empleos en 214 FQHCs.",
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
