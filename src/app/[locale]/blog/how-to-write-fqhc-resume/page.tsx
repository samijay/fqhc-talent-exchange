"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface ArticleContent {
  category: string;
  title: string;
  description: string;
  breadcrumbTitle: string;
  datePublished: string;
  dateDisplay: string;
  readTime: string;
  openingParagraph: string;
  sections: Array<{
    heading: string;
    content: Array<{
      type: "paragraph" | "list" | "box";
      text?: string;
      items?: string[];
      gridItems?: string[];
    }>;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  relatedArticles: Array<{
    href: string;
    title: string;
  }>;
}

const enContent: ArticleContent = {
  category: "Career Resources",
  title: "How to Write an FQHC Resume That Gets Noticed",
  description:
    "Your FQHC experience is valuable — but only if hiring managers can see it. Learn how to write a community health resume that highlights the programs, EHR systems, and competencies that FQHCs are looking for.",
  breadcrumbTitle: "How to Write an FQHC Resume",
  datePublished: "2026-02-07",
  dateDisplay: "February 7, 2026",
  readTime: "7 min read",
  openingParagraph:
    "Your FQHC experience is valuable — but only if hiring managers can see it. Community health centers don't hire the same way a hospital or a private practice does. They're looking for candidates who understand their programs, their patient populations, and their operational realities. A generic resume won't communicate that. Here's how to write one that does.",
  sections: [
    {
      heading: "Why Generic Resumes Don't Work for FQHC Jobs",
      content: [
        {
          type: "paragraph",
          text: "FQHCs are a unique corner of healthcare. They operate under Section 330 federal grants, serve predominantly Medi-Cal and uninsured populations, and run programs that don't exist in most other healthcare settings. When an FQHC hiring manager reviews a resume that says \"provided patient care coordination\" with no further detail, they have no way to tell whether you've actually worked in their world or you're applying from a completely different context.",
        },
        {
          type: "paragraph",
          text: "The specificity of your experience is what sets you apart. FQHC hiring managers are scanning for signals — program names, EHR systems, grant terminology, compliance frameworks — that tell them you can hit the ground running. If those signals aren't on your resume, you're getting passed over for candidates who included them, even if your actual experience is stronger.",
        },
      ],
    },
    {
      heading: "Lead with Programs, Not Just Job Titles",
      content: [
        {
          type: "paragraph",
          text: "One of the biggest mistakes FQHC professionals make is leading with generic job titles and responsibilities. Instead, lead with the specific programs you've worked in. The programs are what generate revenue for FQHCs, and they're what hiring managers care about most.",
        },
        {
          type: "paragraph",
          text: "If you've worked in Enhanced Care Management (ECM), say so explicitly — don't bury it under a vague description of \"care coordination.\" The same goes for Chronic Care Management (CCM), Community Supports, Transitional Care Management (TCM), and Behavioral Health – Administrative Services Organization (BH-ASO). Each of these programs has specific workflows, documentation requirements, and billing structures. When you name them, you're telling the hiring manager that you already understand how these programs work operationally — and that saves them months of training.",
        },
        {
          type: "paragraph",
          text: "For example, instead of writing \"Coordinated care for high-risk patients,\" write \"Managed a panel of 85 ECM members, conducting outreach, completing comprehensive assessments, and coordinating with managed care plans to meet CalAIM documentation requirements.\" That single sentence tells a hiring manager everything they need to know about your readiness for the role.",
        },
      ],
    },
    {
      heading: "Name Your EHR Systems",
      content: [
        {
          type: "paragraph",
          text: "This one detail can make or break your candidacy. FQHCs run on specific Electronic Health Record systems, and switching between them is not trivial. If an FQHC uses OCHIN Epic and you have OCHIN Epic experience, that's a major advantage. If they use NextGen or eClinicalWorks and you've worked in those systems, say so clearly.",
        },
        {
          type: "paragraph",
          text: "Many candidates list \"EHR proficiency\" or \"electronic medical records\" on their resume without naming the actual system. That tells a hiring manager nothing useful. FQHC operations teams know that each EHR has its own workflows for scheduling, charting, referral management, and reporting. A candidate who knows their way around OCHIN Epic — including care team assignments, the social determinants of health module, and panel management tools — is far more valuable than one who simply claims general EHR experience.",
        },
        {
          type: "paragraph",
          text: "Create a dedicated \"Systems & Tools\" section on your resume and list every relevant platform: your EHR, your care management platform, any reporting dashboards, and communication tools like health information exchanges (HIEs) that you've used.",
        },
      ],
    },
    {
      heading: "Quantify Your Impact",
      content: [
        {
          type: "paragraph",
          text: "Numbers are the fastest way to prove you can do the job. FQHC hiring managers think in terms of panel sizes, outreach completion rates, enrollment numbers, and UDS metrics. Give them data points they can relate to.",
        },
        {
          type: "list",
          items: [
            "Panel size: \"Managed a caseload of 90+ ECM members across two managed care plans.\"",
            "Outreach volume: \"Completed 200+ monthly outreach attempts including phone, text, field visits, and community events.\"",
            "Enrollment outcomes: \"Enrolled 45 new members into ECM over a 6-month period, exceeding team target by 20%.\"",
            "UDS metrics: \"Contributed to improving diabetes HbA1c control rates from 52% to 64% within my assigned patient panel.\"",
            "Retention and engagement: \"Maintained an 88% member engagement rate across a 12-month reporting period.\"",
          ],
        },
        {
          type: "paragraph",
          text: "Even if you don't have exact numbers for everything, provide reasonable estimates. A resume that says \"managed a large caseload\" tells a hiring manager almost nothing. A resume that says \"managed 75–90 active members\" tells them exactly what to expect.",
        },
      ],
    },
    {
      heading: "Highlight Language and Cultural Competencies",
      content: [
        {
          type: "paragraph",
          text: "In FQHC hiring, language skills and cultural competency aren't nice-to-haves — they're often essential requirements. FQHCs serve diverse, multilingual patient populations, and a candidate who can conduct outreach, health education, and care coordination in Spanish, Hmong, Vietnamese, Tagalog, or another community language has a significant competitive advantage.",
        },
        {
          type: "paragraph",
          text: "Don't just list \"bilingual Spanish\" at the bottom of your resume. Weave it into your experience descriptions: \"Conducted ECM assessments and motivational interviewing in Spanish for a predominantly monolingual Spanish-speaking patient panel.\" This shows not just that you speak the language, but that you've used it in a clinical or community health context.",
        },
        {
          type: "paragraph",
          text: "Similarly, highlight community connections. If you've built relationships with local schools, churches, food banks, housing authorities, or other community organizations, mention them. FQHCs value staff who are embedded in the communities they serve and can facilitate warm referrals to social services.",
        },
      ],
    },
    {
      heading: "FQHC-Specific Keywords to Include",
      content: [
        {
          type: "paragraph",
          text: "Many FQHCs use applicant tracking systems (ATS) that scan for keywords before a human ever sees your resume. Even when resumes are reviewed manually, hiring managers are scanning for sector-specific terminology. Make sure the following terms appear on your resume where relevant:",
        },
        {
          type: "box",
          gridItems: [
            "330 Grant / Section 330",
            "PPS (Prospective Payment System)",
            "UDS Reporting",
            "CalAIM",
            "Enhanced Care Management (ECM)",
            "Community Supports",
            "PCMH (Patient-Centered Medical Home)",
            "HEDIS Measures",
            "Managed Care Plans",
            "OCHIN Epic",
            "NextGen",
            "eClinicalWorks",
            "Care Coordination",
            "Social Determinants of Health (SDOH)",
            "Motivational Interviewing",
            "Chronic Care Management (CCM)",
            "Transitional Care Management (TCM)",
            "BH-ASO",
            "Population Health",
            "Outreach & Enrollment",
            "Health Equity",
            "Trauma-Informed Care",
            "Sliding Fee Scale",
            "HRSA",
          ],
        },
        {
          type: "paragraph",
          text: "Don't force keywords in where they don't belong, but make sure that every program, system, and framework you've actually worked with is represented on your resume using the standard industry terminology.",
        },
      ],
    },
    {
      heading: "Resume Structure That Works",
      content: [
        {
          type: "paragraph",
          text: "For FQHC roles, a hybrid resume format works best — combining a brief professional summary at the top with a reverse-chronological work history. Here's a structure that consistently performs well:",
        },
        {
          type: "list",
          items: [
            "Professional Summary (3–4 lines): Lead with your years of FQHC experience, key programs (ECM, CCM, Community Supports), EHR systems, languages spoken, and one or two measurable outcomes.",
            "Core Competencies: A two-column list of 8–12 FQHC-relevant skills and keywords. This section helps with ATS scanning and gives hiring managers a quick visual overview.",
            "Professional Experience: For each role, list the organization name, your title, dates of employment, and 3–5 bullet points. Start each bullet with an action verb and include program names, panel sizes, and outcomes wherever possible.",
            "Systems & Tools: Dedicated section listing EHR platforms, care management software, reporting tools, and any other relevant technology.",
            "Education & Certifications: Include CHW certifications, motivational interviewing training, BLS/CPR, and any program-specific training (e.g., ECM training through a managed care plan).",
            "Languages: List all languages with your proficiency level (fluent, conversational, written).",
          ],
        },
        {
          type: "paragraph",
          text: "Keep it to two pages maximum. FQHC hiring managers review a high volume of applications — a concise, well-organized resume that surfaces the right information quickly will outperform a longer one every time.",
        },
      ],
    },
    {
      heading: "Common Mistakes to Avoid",
      content: [
        {
          type: "paragraph",
          text: "After reviewing hundreds of FQHC resumes, these are the most common mistakes that cost candidates interviews:",
        },
        {
          type: "list",
          items: [
            "Using generic language: Phrases like \"assisted patients\" or \"provided support services\" tell a hiring manager nothing about your actual scope. Be specific about what you did, for whom, and in what program.",
            "Missing program names: If you worked in ECM, CCM, or Community Supports, those program names need to be on your resume. Don't assume the hiring manager will infer it from your job description.",
            "Not listing EHR systems: This is one of the first things FQHC hiring managers look for. Omitting it is a missed opportunity.",
            "Burying language skills: If you're bilingual or multilingual, make it prominent. Many FQHC positions require or strongly prefer bilingual candidates — don't make them hunt for this information.",
            "No metrics or outcomes: A resume without numbers feels vague. Even approximate panel sizes or outreach volumes demonstrate that you understand the scale of FQHC work.",
            "One-size-fits-all approach: Tailor your resume for each application. If the job posting mentions ECM, lead with your ECM experience. If it emphasizes OCHIN Epic, make sure that's front and center.",
            "Ignoring the professional summary: Many hiring managers read the summary and skim the rest. If your summary doesn't immediately signal FQHC experience, you're starting at a disadvantage.",
          ],
        },
      ],
    },
  ],
  ctaTitle: "Ready to Put Your FQHC Resume to Work?",
  ctaDescription:
    "Join FQHC Talent Exchange and get matched with community health centers that are actively hiring for your exact skills and experience.",
  ctaButtonText: "Build Your Free Resume",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title: "Medi-Cal Funding Cuts: What Community Health Workers Need to Know",
    },
    {
      href: "/blog/what-is-enhanced-care-management-ecm",
      title: "What Is Enhanced Care Management (ECM)? A Career Guide",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Recursos de Carrera",
  title: "Cómo Escribir un Currículum de FQHC que Destaque",
  description:
    "Tu experiencia en FQHC es valiosa — pero solo si los gerentes de contratación pueden verla. Aprende cómo escribir un currículum de salud comunitaria que destaque los programas, sistemas de EHR y competencias que los FQHCs buscan.",
  breadcrumbTitle: "Cómo Escribir un Currículum de FQHC",
  datePublished: "2026-02-07",
  dateDisplay: "7 de Febrero de 2026",
  readTime: "7 min",
  openingParagraph:
    "Tu experiencia en FQHC es valiosa — pero solo si los gerentes de contratación pueden verla. Los centros de salud comunitarios no contratan de la misma manera que lo hacen los hospitales o las prácticas privadas. Buscan candidatos que comprendan sus programas, sus poblaciones de pacientes y sus realidades operacionales. Un currículum genérico no comunicará eso. Aquí está cómo escribir uno que lo haga.",
  sections: [
    {
      heading: "¿Por Qué los Currículos Genéricos No Funcionan para Trabajos en FQHC?",
      content: [
        {
          type: "paragraph",
          text: "Los FQHCs son un rincón único de la atención médica. Operan bajo subvenciones federales de la Sección 330, sirven principalmente a poblaciones de Medi-Cal y sin seguro, y ejecutan programas que no existen en la mayoría de otros escenarios de atención médica. Cuando un gerente de contratación de FQHC revisa un currículum que dice \"proporcioné coordinación de atención al paciente\" sin más detalle, no tiene forma de saber si realmente trabajaste en su mundo o si estás solicitando desde un contexto completamente diferente.",
        },
        {
          type: "paragraph",
          text: "La especificidad de tu experiencia es lo que te distingue. Los gerentes de contratación de FQHC buscan señales — nombres de programas, sistemas de EHR, terminología de subvenciones, marcos de cumplimiento — que les digan que puedes estar listo desde el primer día. Si esas señales no están en tu currículum, serás descartado en favor de candidatos que las incluyeron, incluso si tu experiencia real es más sólida.",
        },
      ],
    },
    {
      heading: "Lidera con Programas, No Solo con Títulos de Trabajo",
      content: [
        {
          type: "paragraph",
          text: "Uno de los errores más grandes que cometen los profesionales de FQHC es comenzar con títulos de trabajo genéricos y responsabilidades. En su lugar, lidera con los programas específicos en los que has trabajado. Los programas son lo que genera ingresos para los FQHCs, y es lo que más importa a los gerentes de contratación.",
        },
        {
          type: "paragraph",
          text: "Si has trabajado en Gestión de Atención Mejorada (ECM), dilo explícitamente — no lo entierres bajo una descripción vaga de \"coordinación de atención\". Lo mismo aplica para Gestión de Atención Crónica (CCM), Servicios Comunitarios, Gestión de Atención Transicional (TCM) y Servicios de Salud Conductual – Organización de Servicios Administrativos (BH-ASO). Cada uno de estos programas tiene flujos de trabajo específicos, requisitos de documentación y estructuras de facturación. Cuando los nombras, le estás diciendo al gerente de contratación que ya entiendes cómo funcionan estos programas operacionalmente — y eso les ahorra meses de capacitación.",
        },
        {
          type: "paragraph",
          text: "Por ejemplo, en lugar de escribir \"Coordiné atención para pacientes de alto riesgo\", escribe \"Administré un panel de 85 miembros de ECM, realizando alcance, completando evaluaciones integrales y coordinando con planes de atención administrada para cumplir con los requisitos de documentación de CalAIM\". Esa única oración le dice a un gerente de contratación todo lo que necesita saber sobre tu preparación para el rol.",
        },
      ],
    },
    {
      heading: "Nombra Tus Sistemas de EHR",
      content: [
        {
          type: "paragraph",
          text: "Este detalle puede hacer o deshacer tu candidatura. Los FQHCs funcionan con sistemas específicos de Registro Electrónico de Salud, y cambiar entre ellos no es trivial. Si un FQHC usa OCHIN Epic y tienes experiencia con OCHIN Epic, esa es una ventaja importante. Si usan NextGen o eClinicalWorks y has trabajado en esos sistemas, dilo claramente.",
        },
        {
          type: "paragraph",
          text: "Muchos candidatos enumeran \"competencia en EHR\" o \"registros médicos electrónicos\" en su currículum sin nombrar el sistema real. Eso no le dice nada útil a un gerente de contratación. Los equipos de operaciones de FQHC saben que cada EHR tiene sus propios flujos de trabajo para programación, gráficos, gestión de referencias e informes. Un candidato que sabe cómo navegar OCHIN Epic — incluida la asignación del equipo de atención, el módulo de determinantes sociales de la salud y herramientas de gestión de paneles — es mucho más valioso que uno que simplemente afirma experiencia general en EHR.",
        },
        {
          type: "paragraph",
          text: "Crea una sección dedicada a \"Sistemas y Herramientas\" en tu currículum y enumera cada plataforma relevante: tu EHR, tu plataforma de gestión de atención, cualquier panel de informes y herramientas de comunicación como intercambios de información de salud (HIEs) que hayas usado.",
        },
      ],
    },
    {
      heading: "Cuantifica Tu Impacto",
      content: [
        {
          type: "paragraph",
          text: "Los números son la forma más rápida de demostrar que puedes hacer el trabajo. Los gerentes de contratación de FQHC piensan en términos de tamaños de panel, tasas de finalización de alcance, números de inscripción y métricas de UDS. Dame puntos de datos con los que se puedan relacionar.",
        },
        {
          type: "list",
          items: [
            "Tamaño del panel: \"Administré una carga de casos de 90+ miembros de ECM en dos planes de atención administrada\".",
            "Volumen de alcance: \"Completé 200+ intentos de alcance mensuales, incluyendo teléfono, texto, visitas de campo y eventos comunitarios\".",
            "Resultados de inscripción: \"Inscribí 45 nuevos miembros en ECM durante un período de 6 meses, superando el objetivo del equipo en 20%\".",
            "Métricas de UDS: \"Contribuí a mejorar las tasas de control de HbA1c en diabetes del 52% al 64% dentro de mi panel de pacientes asignado\".",
            "Retención y participación: \"Mantuve una tasa de participación de miembros del 88% durante un período de informes de 12 meses\".",
          ],
        },
        {
          type: "paragraph",
          text: "Incluso si no tienes números exactos para todo, proporciona estimaciones razonables. Un currículum que dice \"administré una carga de casos grande\" le dice casi nada a un gerente de contratación. Un currículum que dice \"administré 75–90 miembros activos\" le dice exactamente qué esperar.",
        },
      ],
    },
    {
      heading: "Destaca las Competencias de Idioma y Culturales",
      content: [
        {
          type: "paragraph",
          text: "En la contratación de FQHC, las habilidades del idioma y la competencia cultural no son complementos — a menudo son requisitos esenciales. Los FQHCs sirven a poblaciones de pacientes diversas y multilingües, y un candidato que pueda realizar alcance, educación en salud y coordinación de atención en español, hmong, vietnamita, tagalo u otro idioma comunitario tiene una ventaja competitiva significativa.",
        },
        {
          type: "paragraph",
          text: "No simplemente enumeres \"bilingüe español\" al final de tu currículum. Teje esto en tus descripciones de experiencia: \"Realicé evaluaciones de ECM e entrevistas motivacionales en español para un panel de pacientes predominantemente hispanohablantes monolingües\". Esto muestra no solo que hablas el idioma, sino que lo has usado en un contexto clínico o de salud comunitaria.",
        },
        {
          type: "paragraph",
          text: "Del mismo modo, destaca conexiones comunitarias. Si has construido relaciones con escuelas locales, iglesias, bancos de alimentos, autoridades de vivienda u otras organizaciones comunitarias, menciónalas. Los FQHCs valoran el personal que está incrustado en las comunidades a las que sirven y puede facilitar referencias cálidas a servicios sociales.",
        },
      ],
    },
    {
      heading: "Palabras Clave Específicas de FQHC para Incluir",
      content: [
        {
          type: "paragraph",
          text: "Muchos FQHCs utilizan sistemas de seguimiento de solicitantes (ATS) que buscan palabras clave antes de que un humano vea tu currículum. Incluso cuando los currículos se revisan manualmente, los gerentes de contratación buscan terminología específica del sector. Asegúrate de que los siguientes términos aparezcan en tu currículum cuando sea relevante:",
        },
        {
          type: "box",
          gridItems: [
            "Subvención 330 / Sección 330",
            "PPS (Sistema de Pago Prospectivo)",
            "Informes de UDS",
            "CalAIM",
            "Gestión de Atención Mejorada (ECM)",
            "Servicios Comunitarios",
            "PCMH (Centro Médico Centrado en el Paciente)",
            "Medidas HEDIS",
            "Planes de Atención Administrada",
            "OCHIN Epic",
            "NextGen",
            "eClinicalWorks",
            "Coordinación de Atención",
            "Determinantes Sociales de la Salud (SDOH)",
            "Entrevista Motivacional",
            "Gestión de Atención Crónica (CCM)",
            "Gestión de Atención Transicional (TCM)",
            "BH-ASO",
            "Salud de la Población",
            "Alcance e Inscripción",
            "Equidad en Salud",
            "Atención Informada por Trauma",
            "Escala de Cuota Deslizante",
            "HRSA",
          ],
        },
        {
          type: "paragraph",
          text: "No fuerces palabras clave donde no pertenecen, pero asegúrate de que cada programa, sistema y marco con el que realmente hayas trabajado esté representado en tu currículum usando la terminología estándar de la industria.",
        },
      ],
    },
    {
      heading: "Estructura de Currículum que Funciona",
      content: [
        {
          type: "paragraph",
          text: "Para roles de FQHC, un formato de currículum híbrido funciona mejor — combinando un breve resumen profesional en la parte superior con un historial de trabajo en orden cronológico inverso. Aquí está una estructura que funciona consistentemente bien:",
        },
        {
          type: "list",
          items: [
            "Resumen Profesional (3–4 líneas): Lidera con tus años de experiencia en FQHC, programas clave (ECM, CCM, Servicios Comunitarios), sistemas de EHR, idiomas hablados y uno o dos resultados medibles.",
            "Competencias Centrales: Una lista de dos columnas de 8–12 habilidades y palabras clave relevantes para FQHC. Esta sección ayuda con el escaneo de ATS y le da a los gerentes de contratación una descripción visual rápida.",
            "Experiencia Profesional: Para cada rol, enumera el nombre de la organización, tu título, fechas de empleo y 3–5 puntos. Comienza cada punto con un verbo de acción e incluye nombres de programas, tamaños de panel y resultados cuando sea posible.",
            "Sistemas y Herramientas: Sección dedicada que enumera plataformas de EHR, software de gestión de atención, herramientas de informes y cualquier otra tecnología relevante.",
            "Educación y Certificaciones: Incluye certificaciones CHW, capacitación en entrevista motivacional, BLS/CPR y cualquier capacitación específica del programa (p. ej., capacitación en ECM a través de un plan de atención administrada).",
            "Idiomas: Enumera todos los idiomas con tu nivel de competencia (fluido, conversacional, escrito).",
          ],
        },
        {
          type: "paragraph",
          text: "Mantenlo a un máximo de dos páginas. Los gerentes de contratación de FQHC revisan un alto volumen de solicitudes — un currículum conciso y bien organizado que destaque la información correcta rápidamente superará a uno más largo cada vez.",
        },
      ],
    },
    {
      heading: "Errores Comunes a Evitar",
      content: [
        {
          type: "paragraph",
          text: "Después de revisar cientos de currículos de FQHC, estos son los errores más comunes que les cuestan entrevistas a los candidatos:",
        },
        {
          type: "list",
          items: [
            "Usar lenguaje genérico: Frases como \"asistí a pacientes\" o \"proporcioné servicios de apoyo\" no le dicen nada útil a un gerente de contratación sobre tu alcance real. Sé específico sobre qué hiciste, para quién y en qué programa.",
            "Falta de nombres de programas: Si trabajaste en ECM, CCM o Servicios Comunitarios, esos nombres de programa deben estar en tu currículum. No asumas que el gerente de contratación lo inferirá de tu descripción de trabajo.",
            "No enumerar sistemas de EHR: Esta es una de las primeras cosas que buscan los gerentes de contratación de FQHC. Omitirlo es una oportunidad perdida.",
            "Enterrar habilidades de idioma: Si eres bilingüe o multilingüe, hazlo prominente. Muchos puestos de FQHC requieren o prefieren fuertemente candidatos bilingües — no hagas que busquen esta información.",
            "Sin métricas o resultados: Un currículum sin números se siente vago. Incluso tamaños de panel aproximados o volúmenes de alcance demuestran que entiendes la escala del trabajo de FQHC.",
            "Enfoque de talla única: Personaliza tu currículum para cada solicitud. Si la publicación del trabajo menciona ECM, lidera con tu experiencia en ECM. Si enfatiza OCHIN Epic, asegúrate de que esté al frente.",
            "Ignorar el resumen profesional: Muchos gerentes de contratación leen el resumen y ojean el resto. Si tu resumen no señala inmediatamente experiencia en FQHC, estás comenzando con desventaja.",
          ],
        },
      ],
    },
  ],
  ctaTitle: "¿Listo para Poner Tu Currículum de FQHC a Trabajar?",
  ctaDescription:
    "Únete a FQHC Talent Exchange y obten coincidencias con centros de salud comunitarios que están contratando activamente para tus habilidades y experiencia exactas.",
  ctaButtonText: "Crea Tu CV Gratis",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Cortes de Financiamiento de Medi-Cal: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber",
    },
    {
      href: "/blog/what-is-enhanced-care-management-ecm",
      title: "¿Qué Es la Gestión de Atención Mejorada (ECM)? Una Guía de Carrera",
    },
  ],
};

export default function HowToWriteFqhcResumeArticle() {
  const locale = useLocale();
  const content = locale === "es" ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title={content.title}
        description={content.description}
        datePublished={content.datePublished}
        slug="how-to-write-fqhc-resume"
      />
      <BreadcrumbJsonLd
        items={[
          { name: locale === "es" ? "Inicio" : "Home", url: "https://fqhctalent.com" },
          { name: locale === "es" ? "Blog" : "Blog", url: "https://fqhctalent.com/blog" },
          {
            name: content.breadcrumbTitle,
            url: "https://fqhctalent.com/blog/how-to-write-fqhc-resume",
          },
        ]}
      />

      <article className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-700">
              {locale === "es" ? "Inicio" : "Home"}
            </Link>{" "}
            &rarr;{" "}
            <Link href="/blog" className="hover:text-stone-700">
              Blog
            </Link>{" "}
            &rarr; {content.breadcrumbTitle}
          </nav>

          {/* Header */}
          <header className="mb-12">
            <p className="text-teal-700 font-semibold mb-3">
              {content.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              {content.title}
            </h1>
            <div className="flex items-center gap-4 text-stone-500">
              <time dateTime={content.datePublished}>{content.dateDisplay}</time>
              <span>&middot;</span>
              <span>{content.readTime}</span>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed">
              {content.openingParagraph}
            </p>

            {content.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
                  {section.heading}
                </h2>
                {section.content.map((item, itemIdx) => {
                  if (item.type === "paragraph") {
                    return (
                      <p key={itemIdx} className="text-stone-700 leading-relaxed">
                        {item.text}
                      </p>
                    );
                  } else if (item.type === "list") {
                    return (
                      <ul key={itemIdx} className="text-stone-700 leading-relaxed space-y-2">
                        {item.items?.map((listItem, listIdx) => (
                          <li key={listIdx}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  } else if (item.type === "box") {
                    return (
                      <div key={itemIdx} className="bg-stone-50 rounded-lg p-6 my-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-stone-700">
                          {item.gridItems?.map((gridItem, gridIdx) => (
                            <span key={gridIdx}>{gridItem}</span>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              {content.ctaTitle}
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              {content.ctaDescription}
            </p>
            <a
              href="/resume-builder"
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-800 transition-colors"
            >
              {content.ctaButtonText}
            </a>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-stone-900 mb-6">
              {locale === "es" ? "Artículos Relacionados" : "Related Articles"}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content.relatedArticles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.href}
                  className="bg-stone-50 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <p className="text-sm text-teal-700 mb-2">{content.category}</p>
                  <h4 className="font-semibold text-stone-900">
                    {article.title}
                  </h4>
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
