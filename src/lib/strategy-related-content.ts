// strategy-related-content.ts
// Curated cross-links for strategy pages — each page gets 3-4 related items.
// Uses the RelatedItem type from the design system.

import type { RelatedItem } from "@/components/ui/design-system/RelatedContent";

/**
 * Map of strategy page slug → related content items.
 * Curated for maximum discoverability: each page links to complementary
 * content from different sections (strategy, intelligence, career, labor).
 */
export const STRATEGY_RELATED: Record<string, RelatedItem[]> = {
  guides: [
    { href: "/strategy/okrs", type: "strategy", title: { en: "OKR Templates", es: "Plantillas OKR" }, description: { en: "Turn case study insights into measurable objectives for your FQHC.", es: "Convierte los hallazgos de los casos de estudio en objetivos medibles para tu FQHC." } },
    { href: "/strategy/frameworks", type: "strategy", title: { en: "Execution Frameworks", es: "Marcos de Ejecución" }, description: { en: "Change management and decision tools for FQHC leaders.", es: "Herramientas de gestión del cambio y toma de decisiones para líderes de FQHC." } },
    { href: "/strategy/resilience", type: "intelligence", title: { en: "Resilience Scorecard", es: "Tarjeta de Resiliencia" }, description: { en: "See how 220 FQHCs score across 5 resilience dimensions.", es: "Mira cómo 220 FQHCs puntúan en 5 dimensiones de resiliencia." } },
    { href: "/strategy/masterclass", type: "academy", title: { en: "Masterclass Modules", es: "Módulos de Masterclass" }, description: { en: "Deep-dive strategy modules for the 2026 crisis moment.", es: "Módulos estratégicos profundos para el momento de crisis 2026." } },
  ],
  okrs: [
    { href: "/strategy/guides", type: "strategy", title: { en: "Executive Guides", es: "Guías Ejecutivas" }, description: { en: "Real case studies showing how FQHCs implemented change.", es: "Casos de estudio reales mostrando cómo los FQHCs implementaron cambios." } },
    { href: "/strategy/okr-course", type: "academy", title: { en: "OKR Course", es: "Curso de OKRs" }, description: { en: "Learn how to write and implement OKRs for your FQHC.", es: "Aprende a escribir e implementar OKRs para tu FQHC." } },
    { href: "/strategy/workforce-resilience", type: "strategy", title: { en: "Workforce Resilience", es: "Resiliencia Laboral" }, description: { en: "Build team stability during funding uncertainty.", es: "Construye estabilidad del equipo durante incertidumbre de financiamiento." } },
  ],
  frameworks: [
    { href: "/strategy/guides", type: "strategy", title: { en: "Executive Guides", es: "Guías Ejecutivas" }, description: { en: "See these frameworks applied in real FQHC case studies.", es: "Mira estos marcos aplicados en casos de estudio reales de FQHC." } },
    { href: "/strategy/okrs", type: "strategy", title: { en: "OKR Templates", es: "Plantillas OKR" }, description: { en: "Measure your execution with ready-to-use OKR templates.", es: "Mide tu ejecución con plantillas OKR listas para usar." } },
    { href: "/strategy/economics", type: "strategy", title: { en: "Healthcare Economics", es: "Economía de la Salud" }, description: { en: "Understand PPS, 340B, and FMAP before applying frameworks.", es: "Entiende PPS, 340B y FMAP antes de aplicar marcos." } },
  ],
  masterclass: [
    { href: "/strategy/research", type: "academy", title: { en: "Research Archive", es: "Archivo de Investigación" }, description: { en: "66 academic entries supporting masterclass content.", es: "66 entradas académicas que respaldan el contenido de la masterclass." } },
    { href: "/strategy/guides", type: "strategy", title: { en: "Executive Guides", es: "Guías Ejecutivas" }, description: { en: "Real-world case studies complementing masterclass theory.", es: "Casos de estudio del mundo real que complementan la teoría." } },
    { href: "/strategy/economics", type: "strategy", title: { en: "Healthcare Economics", es: "Economía de la Salud" }, description: { en: "Deep-dive into PPS, 340B, and value-based payment.", es: "Profundiza en PPS, 340B y pago basado en valor." } },
    { href: "/academy", type: "academy", title: { en: "FQHC Academy", es: "Academia FQHC" }, description: { en: "Continue learning with structured courses and certifications.", es: "Continúa aprendiendo con cursos estructurados y certificaciones." } },
  ],
  resilience: [
    { href: "/strategy/guides", type: "strategy", title: { en: "Executive Guides", es: "Guías Ejecutivas" }, description: { en: "See how high-resilience FQHCs achieved their scores.", es: "Mira cómo FQHCs de alta resiliencia lograron sus puntajes." } },
    { href: "/strategy/okrs", type: "strategy", title: { en: "OKR Templates", es: "Plantillas OKR" }, description: { en: "Set objectives to improve your resilience dimensions.", es: "Establece objetivos para mejorar tus dimensiones de resiliencia." } },
    { href: "/strategy/workforce-resilience", type: "strategy", title: { en: "Workforce Resilience", es: "Resiliencia Laboral" }, description: { en: "Focus on the workforce stability dimension.", es: "Enfócate en la dimensión de estabilidad laboral." } },
    { href: "/funding-impact", type: "intelligence", title: { en: "Funding Impact", es: "Impacto de Financiamiento" }, description: { en: "Track policy changes affecting financial positioning.", es: "Rastrea cambios de política que afectan el posicionamiento financiero." } },
  ],
  "labor-relations": [
    { href: "/unions", type: "labor", title: { en: "Union Directory", es: "Directorio de Sindicatos" }, description: { en: "Profiles of 7 unions representing FQHC workers in California.", es: "Perfiles de 7 sindicatos que representan trabajadores de FQHC en California." } },
    { href: "/strategy/movement", type: "strategy", title: { en: "The Movement", es: "El Movimiento" }, description: { en: "FQHC history and cross-cultural labor alliances.", es: "Historia de FQHC y alianzas laborales interculturales." } },
    { href: "/strategy/workforce-resilience", type: "strategy", title: { en: "Workforce Resilience", es: "Resiliencia Laboral" }, description: { en: "Build team stability through partnership, not adversity.", es: "Construye estabilidad del equipo a través de la colaboración." } },
    { href: "/strategy/advocacy", type: "intelligence", title: { en: "Advocacy Watch", es: "Vigilancia de Abogacía" }, description: { en: "Track legislative actions affecting FQHC workers.", es: "Rastrea acciones legislativas que afectan a trabajadores de FQHC." } },
  ],
  "workforce-resilience": [
    { href: "/strategy/labor-relations", type: "labor", title: { en: "Labor Relations", es: "Relaciones Laborales" }, description: { en: "Navigate union partnerships and NLRB cases.", es: "Navega asociaciones sindicales y casos NLRB." } },
    { href: "/strategy/resilience", type: "intelligence", title: { en: "Resilience Scorecard", es: "Tarjeta de Resiliencia" }, description: { en: "Benchmark your workforce stability score.", es: "Compara tu puntaje de estabilidad laboral." } },
    { href: "/strategy/offboarding", type: "strategy", title: { en: "Transition Toolkit", es: "Kit de Transición" }, description: { en: "Support displaced workers with structured services.", es: "Apoya a trabajadores desplazados con servicios estructurados." } },
    { href: "/strategy/cultural-humility", type: "strategy", title: { en: "Cultural Humility", es: "Humildad Cultural" }, description: { en: "Build culturally competent, diverse teams.", es: "Construye equipos diversos y culturalmente competentes." } },
  ],
  economics: [
    { href: "/strategy/masterclass", type: "academy", title: { en: "Masterclass", es: "Masterclass" }, description: { en: "Deep-dive into financial survival and revenue recovery.", es: "Profundiza en supervivencia financiera y recuperación de ingresos." } },
    { href: "/strategy/clinic-simulator", type: "strategy", title: { en: "Clinic Simulator", es: "Simulador de Clínica" }, description: { en: "Model revenue scenarios with real FQHC staffing data.", es: "Modela escenarios de ingresos con datos reales de personal." } },
    { href: "/funding-impact", type: "intelligence", title: { en: "Funding Impact", es: "Impacto de Financiamiento" }, description: { en: "Track H.R. 1 and policy changes affecting FQHC revenue.", es: "Rastrea H.R. 1 y cambios de política que afectan ingresos." } },
  ],
  movement: [
    { href: "/strategy/cultural-humility", type: "strategy", title: { en: "Cultural Humility", es: "Humildad Cultural" }, description: { en: "How movement values translate to workforce practice.", es: "Cómo los valores del movimiento se traducen en práctica laboral." } },
    { href: "/strategy/labor-relations", type: "labor", title: { en: "Labor Relations", es: "Relaciones Laborales" }, description: { en: "Current labor organizing in the FQHC tradition.", es: "Organización laboral actual en la tradición de FQHC." } },
    { href: "/unions", type: "labor", title: { en: "Union Directory", es: "Directorio de Sindicatos" }, description: { en: "Today's unions carrying forward the movement's legacy.", es: "Los sindicatos de hoy que continúan el legado del movimiento." } },
  ],
  "cultural-humility": [
    { href: "/strategy/movement", type: "strategy", title: { en: "The Movement", es: "El Movimiento" }, description: { en: "The social justice roots behind cultural competency.", es: "Las raíces de justicia social detrás de la competencia cultural." } },
    { href: "/strategy/workforce-resilience", type: "strategy", title: { en: "Workforce Resilience", es: "Resiliencia Laboral" }, description: { en: "Diverse, culturally competent teams are more resilient.", es: "Equipos diversos y culturalmente competentes son más resilientes." } },
    { href: "/strategy/scope-of-practice", type: "strategy", title: { en: "Top-of-Scope", es: "Alcance Máximo" }, description: { en: "Workforce optimization through role clarity.", es: "Optimización laboral a través de claridad de roles." } },
  ],
  "scope-of-practice": [
    { href: "/strategy/economics", type: "strategy", title: { en: "Healthcare Economics", es: "Economía de la Salud" }, description: { en: "Revenue impact of practicing at top-of-license.", es: "Impacto en ingresos de practicar al máximo de licencia." } },
    { href: "/strategy/clinic-simulator", type: "strategy", title: { en: "Clinic Simulator", es: "Simulador de Clínica" }, description: { en: "Model revenue gains from delegation optimization.", es: "Modela ganancias de ingresos por optimización de delegación." } },
    { href: "/salary-data", type: "intelligence", title: { en: "Salary Intelligence", es: "Inteligencia Salarial" }, description: { en: "CA salary benchmarks for all 10 scope-tracked roles.", es: "Benchmarks salariales de CA para los 10 roles rastreados." } },
  ],
  offboarding: [
    { href: "/layoffs", type: "intelligence", title: { en: "Layoff Tracker", es: "Rastreador de Despidos" }, description: { en: "Track workforce displacement across California FQHCs.", es: "Rastrea desplazamiento laboral en FQHCs de California." } },
    { href: "/strategy/workforce-resilience", type: "strategy", title: { en: "Workforce Resilience", es: "Resiliencia Laboral" }, description: { en: "Build stability to prevent future layoffs.", es: "Construye estabilidad para prevenir despidos futuros." } },
    { href: "/fast-track", type: "career", title: { en: "Career Hub", es: "Centro de Carrera" }, description: { en: "Free tools for displaced workers getting job-ready.", es: "Herramientas gratuitas para trabajadores desplazados." } },
  ],
  "tech-stack": [
    { href: "/ai-tracker", type: "intelligence", title: { en: "AI Tracker", es: "Rastreador de IA" }, description: { en: "Track AI adoption across the FQHC sector.", es: "Rastrea la adopción de IA en el sector FQHC." } },
    { href: "/strategy/economics", type: "strategy", title: { en: "Healthcare Economics", es: "Economía de la Salud" }, description: { en: "Understand the financial systems your tech supports.", es: "Entiende los sistemas financieros que tu tecnología soporta." } },
    { href: "/strategy/resilience", type: "intelligence", title: { en: "Resilience Scorecard", es: "Tarjeta de Resiliencia" }, description: { en: "Data maturity is a key resilience dimension.", es: "La madurez de datos es una dimensión clave de resiliencia." } },
  ],
  research: [
    { href: "/strategy/masterclass", type: "academy", title: { en: "Masterclass", es: "Masterclass" }, description: { en: "Applied learning from the research archive.", es: "Aprendizaje aplicado del archivo de investigación." } },
    { href: "/strategy/guides", type: "strategy", title: { en: "Executive Guides", es: "Guías Ejecutivas" }, description: { en: "See research in action through real FQHC case studies.", es: "Mira la investigación en acción a través de casos de estudio reales." } },
    { href: "/academy", type: "academy", title: { en: "FQHC Academy", es: "Academia FQHC" }, description: { en: "Structured learning paths through key research.", es: "Caminos de aprendizaje estructurados a través de investigación clave." } },
  ],
  advocacy: [
    { href: "/funding-impact", type: "intelligence", title: { en: "Funding Impact", es: "Impacto de Financiamiento" }, description: { en: "Revenue impact of the policies being tracked.", es: "Impacto en ingresos de las políticas rastreadas." } },
    { href: "/strategy/labor-relations", type: "labor", title: { en: "Labor Relations", es: "Relaciones Laborales" }, description: { en: "Labor-focused legislative actions and NLRB cases.", es: "Acciones legislativas enfocadas en trabajo y casos NLRB." } },
    { href: "/intelligence/legislation", type: "intelligence", title: { en: "Legislative Tracker", es: "Rastreador Legislativo" }, description: { en: "Full legislative monitoring dashboard.", es: "Panel completo de monitoreo legislativo." } },
  ],
  compliance: [
    { href: "/academy/hipaa-essentials", type: "academy", title: { en: "HIPAA Essentials", es: "Fundamentos de HIPAA" }, description: { en: "Free HIPAA training course for FQHC staff.", es: "Curso gratuito de capacitación HIPAA para personal de FQHC." } },
    { href: "/academy/billing-compliance", type: "academy", title: { en: "Billing Compliance", es: "Cumplimiento de Facturación" }, description: { en: "Navigate FQHC billing rules and audit preparation.", es: "Navega reglas de facturación FQHC y preparación de auditorías." } },
    { href: "/strategy/guides", type: "strategy", title: { en: "Executive Guides", es: "Guías Ejecutivas" }, description: { en: "Real case studies of compliance transformations.", es: "Casos de estudio reales de transformaciones de cumplimiento." } },
  ],
};
