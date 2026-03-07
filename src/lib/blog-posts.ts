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

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "february-2026-jobs-report-healthcare-crisis",
    title:
      "The February 2026 Jobs Report: Healthcare Was Holding Up the Economy. Now It's Cracking.",
    esTitle:
      "El Informe de Empleos de Febrero 2026: El Sector Salud Sostenía la Economía. Ahora Se Está Fracturando.",
    description:
      "The U.S. lost 92,000 jobs in February 2026. Healthcare — which had been creating 121% of all job growth — went negative for the first time in years. What the BLS data, the Kaiser strike, and looming Medicaid cuts mean for FQHCs.",
    esDescription:
      "EE.UU. perdió 92,000 empleos en febrero 2026. El sector salud — que había creado el 121% de todo el crecimiento laboral — se volvió negativo por primera vez en años. Lo que significan los datos del BLS, la huelga de Kaiser y los recortes de Medicaid para los FQHCs.",
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
    title: "Healthcare Hiring Trends 2026: What the Jobs Data Tells Us About FQHC Careers",
    esTitle:
      "Tendencias de Contratación en Salud 2026: Lo Que los Datos Revelan Sobre Carreras en FQHCs",
    description:
      "Healthcare added 82,000 jobs in January 2026 — 63% of all U.S. job growth. We break down the BLS data, HRSA workforce projections, and what it means for community health center careers in California.",
    esDescription:
      "El sector de salud añadió 82,000 empleos en enero 2026 — el 63% de todo el crecimiento laboral en EE.UU. Analizamos los datos del BLS, proyecciones de HRSA, y qué significa para carreras en centros de salud comunitarios en California.",
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
    title: "The Complete Guide to FQHC Benefits: What Community Health Workers Actually Get",
    esTitle:
      "Guía Completa de Beneficios en FQHC: Lo Que Realmente Reciben los Trabajadores de Salud Comunitaria",
    description:
      "Discover the full value of FQHC benefits packages — from health insurance and NHSC loan repayment to retirement plans, generous PTO, and professional development. Learn how a $65k FQHC salary can equal $85k+ in total compensation.",
    esDescription:
      "Descubre el valor completo de los paquetes de beneficios de FQHC — desde seguro médico y reembolso de préstamos NHSC hasta planes de jubilación, PTO generoso y desarrollo profesional. Aprende cómo un salario de $65k en FQHC puede equivaler a $85k+ en compensación total.",
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
    title: "Laid Off from an FQHC? Here\u2019s How to Fast-Track Your Job Search",
    esTitle: "\u00bfDespedido/a de un FQHC? C\u00f3mo Acelerar Tu B\u00fasqueda de Empleo",
    description:
      "Thousands of community health workers in California are being displaced by Medi-Cal funding cuts and FQHC restructuring. But many FQHCs are still hiring. Free career tools and aggregated job postings can help you land your next role.",
    esDescription:
      "Miles de trabajadores de salud comunitaria en California están siendo desplazados por recortes de fondos de Medi-Cal y reestructuración de FQHCs. Pero muchos FQHCs siguen contratando. Herramientas gratis y ofertas de empleo agregadas pueden ayudarte.",
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
    title: "Top 10 FQHC Interview Questions and How to Answer Them",
    esTitle:
      "Las 10 Principales Preguntas de Entrevista en FQHC y Cómo Responderlas",
    description:
      "Prepare for your FQHC job interview with these common questions and expert answers. From ECM program knowledge to cultural competency, learn exactly what community health centers are looking for.",
    esDescription:
      "Prepárate para tu entrevista de trabajo en FQHC con estas preguntas comunes y respuestas de expertos. Desde conocimiento de programas ECM hasta competencia cultural, aprende exactamente qué buscan los centros de salud comunitarios.",
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
    title: "How to Write an FQHC Resume That Gets Noticed",
    esTitle:
      "Cómo Escribir un Currículum para FQHC Que Llame la Atención",
    description:
      "Your FQHC experience is valuable — but only if hiring managers can see it. Learn how to write a community health resume that highlights the programs, EHR systems, and competencies that FQHCs are looking for.",
    esDescription:
      "Tu experiencia en FQHC es valiosa — pero solo si los gerentes de contratación pueden verla. Aprende a escribir un currículum de salud comunitaria que destaque los programas, sistemas EHR y competencias que buscan los FQHCs.",
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
