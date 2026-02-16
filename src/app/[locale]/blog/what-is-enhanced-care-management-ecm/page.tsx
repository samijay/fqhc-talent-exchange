"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface RoleCard {
  title: string;
  salary: string;
  description: string;
}

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
    subHeading?: string;
    content: Array<{
      type?: "paragraph" | "list" | "roleCard" | "roleCards";
      text?: string;
      items?: string[];
      boldText?: string;
      roles?: RoleCard[];
      subHeading?: string;
      content?: Array<{ type: string; text?: string; items?: string[] }>;
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
  title: "What Is Enhanced Care Management (ECM)? A Career Guide for Community Health Workers",
  description:
    "Enhanced Care Management (ECM) is one of the fastest-growing programs at California FQHCs. Learn what ECM is, what roles it creates, what skills you need, and how to land an ECM job.",
  breadcrumbTitle: "What Is ECM?",
  datePublished: "2026-02-05",
  dateDisplay: "February 5, 2026",
  readTime: "10 min read",
  openingParagraph:
    "If you work in community health in California — or want to — you've almost certainly heard the acronym ECM. Enhanced Care Management is one of the biggest workforce drivers at Federally Qualified Health Centers right now, creating thousands of new roles across the state. Whether you're a seasoned care coordinator looking to specialize or a community health worker exploring your next move, understanding ECM is essential to navigating today's FQHC job market.",
  sections: [
    {
      heading: "What Is Enhanced Care Management?",
      content: [
        {
          type: "paragraph",
          text: "Enhanced Care Management is a statewide benefit under California's CalAIM initiative — the sweeping Medi-Cal transformation launched by the Department of Health Care Services (DHCS). ECM replaces earlier fragmented care management programs with a single, standardized model designed to serve Medi-Cal members who face the most complex health and social challenges.",
        },
        {
          type: "paragraph",
          text: "At its core, ECM provides intensive, person-centered care coordination for individuals who cycle through emergency departments, struggle with chronic conditions, experience homelessness, have serious mental illness, or are transitioning out of incarceration. Rather than managing patients from behind a desk, ECM teams meet members where they are — in shelters, in homes, on the street — and help them navigate every aspect of their health and social needs.",
        },
        {
          type: "paragraph",
          text: "For FQHCs, ECM is both a mandate and an opportunity. Managed care plans contract with FQHCs to deliver ECM services to assigned member panels, and FQHCs bill for those services through capitated or fee-for-service arrangements. This creates a direct revenue stream that funds dedicated ECM staff — and that means jobs.",
        },
      ],
    },
    {
      heading: "Why ECM Matters for FQHC Careers",
      content: [
        {
          type: "paragraph",
          text: "Before CalAIM, community health worker positions at FQHCs were often grant-funded and temporary. When the grant ended, the position ended. ECM changes this dynamic significantly. Because ECM is a permanent Medi-Cal benefit — not a time-limited pilot — the positions it funds are more sustainable. FQHCs that build strong ECM programs can maintain stable staffing as long as they serve their assigned member panels effectively.",
        },
        {
          type: "paragraph",
          text: "The scale is substantial. Every managed care plan in California is required to offer ECM, and most contract with FQHCs as their primary delivery partners. As health plans expand their ECM enrollment targets, FQHCs need more staff to manage larger panels. The result is a steady pipeline of new positions — from frontline outreach workers to program managers who oversee entire ECM operations.",
        },
        {
          type: "paragraph",
          text: "For community health workers, ECM also provides a clearer career ladder than many traditional FQHC roles. You can enter as an outreach specialist, advance into a care manager position as you gain experience and credentials, and eventually move into program management or supervisory roles. This kind of structured progression has historically been rare in the community health workforce.",
        },
      ],
    },
    {
      heading: "ECM Roles and What They Pay",
      content: [
        {
          type: "paragraph",
          text: "ECM has created a distinct set of roles at FQHCs across California. While titles vary between organizations, the following positions represent the most common ECM roles and their typical salary ranges based on current FQHC postings statewide.",
        },
        {
          type: "roleCards",
          roles: [
            {
              title: "ECM Care Manager",
              salary: "$55,000 – $72,000/year",
              description: "The backbone of any ECM program. Care managers carry a panel of 35–60 high-acuity members, conduct comprehensive assessments, develop individualized care plans, coordinate with providers and community-based organizations, and document all encounters in the EHR. Most positions require a bachelor's degree in social work, public health, or a related field — though some FQHCs will accept equivalent experience in lieu of a degree.",
            },
            {
              title: "Community Health Worker / ECM",
              salary: "$42,000 – $58,000/year",
              description: "CHWs in ECM programs conduct field-based outreach, help members navigate social services, provide health education, assist with appointment scheduling and transportation, and serve as the cultural and linguistic bridge between members and clinical teams. Bilingual ability — especially Spanish — is often required. California's CHW certification adds significant value.",
            },
            {
              title: "ECM Program Manager",
              salary: "$75,000 – $100,000/year",
              description: "Program managers oversee the entire ECM operation at an FQHC — including staff supervision, managed care plan compliance, data reporting, quality metrics, and program expansion. This role typically requires 3–5 years of care management experience and strong familiarity with CalAIM requirements and health plan contracts. Program managers are the primary liaison between the FQHC and its managed care partners.",
            },
            {
              title: "ECM Outreach Specialist",
              salary: "$38,000 – $50,000/year",
              description: "Outreach specialists focus on locating and engaging hard-to-reach ECM members — individuals experiencing homelessness, those recently released from incarceration, or members who have disengaged from care. This is primarily a field-based role requiring strong interpersonal skills, comfort working in shelters and encampments, and the ability to build trust quickly. It's often the entry point into an ECM career.",
            },
          ],
        },
      ],
    },
    {
      heading: "Skills and Qualifications for ECM Roles",
      content: [
        {
          type: "paragraph",
          text: "When FQHC hiring managers review candidates for ECM positions, they're looking beyond standard clinical qualifications. ECM requires a unique combination of clinical knowledge, community engagement skills, and program-specific competencies. Here's what consistently appears at the top of the list.",
        },
        {
          type: "paragraph",
          boldText: "Motivational interviewing and trauma-informed care.",
          text: " ECM members have complex histories. The ability to engage individuals who may be distrustful of the healthcare system, using evidence-based communication techniques, is essential for every ECM role from outreach to management.",
        },
        {
          type: "paragraph",
          boldText: "Bilingual proficiency.",
          text: " Spanish-English bilingual candidates are in exceptionally high demand across California FQHCs. Mandarin, Vietnamese, Tagalog, and Armenian are also highly valued depending on the service area. If you're bilingual, make sure it's prominent on your resume — it can be the deciding factor.",
        },
        {
          type: "paragraph",
          boldText: "Care plan development and documentation.",
          text: " ECM requires thorough documentation of every member interaction, assessment, and care plan update. Hiring managers want to see that you can maintain accurate, timely records that meet both FQHC and managed care plan requirements.",
        },
        {
          type: "paragraph",
          boldText: "Knowledge of social determinants of health (SDOH).",
          text: " ECM is inherently about addressing the social factors that drive poor health outcomes — housing instability, food insecurity, lack of transportation, social isolation. Candidates who understand SDOH frameworks and can connect members to community resources are exactly what FQHCs need.",
        },
        {
          type: "paragraph",
          boldText: "CHW certification.",
          text: " California's Community Health Worker certification, while not always required, significantly strengthens your candidacy. It signals to employers that you have formalized training in community health principles, cultural competency, and health education — all of which are core to ECM delivery.",
        },
      ],
    },
    {
      heading: "EHR Systems Used in ECM",
      content: [
        {
          type: "paragraph",
          text: "One of the most underappreciated factors in FQHC hiring is EHR system experience. FQHCs invest heavily in their electronic health record systems, and candidates who already know the system save weeks of onboarding time. For ECM roles specifically, your EHR proficiency matters because ECM documentation requirements are extensive and system-specific.",
        },
        {
          type: "paragraph",
          boldText: "OCHIN Epic",
          text: " is the most widely used EHR among California FQHCs, particularly those that are part of the OCHIN network. If you've worked in Epic — especially the care management and population health modules — you're immediately competitive at a large share of FQHC employers.",
        },
        {
          type: "paragraph",
          boldText: "NextGen",
          text: " is the second most common EHR in the FQHC space. Many mid-size and larger FQHCs use NextGen for both clinical and care management workflows. Experience with NextGen's care coordination and population health tools is a strong differentiator.",
        },
        {
          type: "paragraph",
          boldText: "eClinicalWorks (eCW)",
          text: " and NextGen are used by a smaller but notable segment of FQHCs. Other platforms you may encounter include OCHIN Epic for population health reporting and Unite Us or Aunt Bertha (findhelp) for social care referral management — both of which are frequently used alongside the primary EHR in ECM programs.",
        },
        {
          type: "paragraph",
          text: "On your resume and in your FQHC Talent Exchange profile, always list every EHR system you've used, including the specific modules you're proficient in. This is one of the first filters hiring managers apply.",
        },
      ],
    },
    {
      heading: "How to Position Yourself for ECM Jobs",
      content: [
        {
          type: "paragraph",
          text: "Landing an ECM role at an FQHC requires more than just having relevant experience — you need to present that experience in the language that FQHC hiring managers recognize and search for. Here are the most effective ways to position yourself.",
        },
        {
          subHeading: "Tailor Your Resume to ECM Keywords",
          content: [
            {
              type: "paragraph",
              text: "Use the specific terminology that ECM hiring managers are filtering for: \"Enhanced Care Management,\" \"CalAIM,\" \"comprehensive assessment,\" \"individualized care plan,\" \"member engagement,\" \"panel management,\" and \"managed care plan coordination.\" If you've done this work under a different program name, translate your experience into ECM language.",
            },
          ],
        },
        {
          subHeading: "Quantify Your Impact",
          content: [
            {
              type: "paragraph",
              text: "Numbers stand out on FQHC resumes. Include your panel size (e.g., \"managed a panel of 50 high-acuity ECM members\"), your engagement rates, ED utilization reductions, or successful housing placements. If you contributed to meeting health plan quality metrics, say so with specific data points.",
            },
          ],
        },
        {
          subHeading: "Get Certified",
          content: [
            {
              type: "paragraph",
              text: "If you don't already have California's CHW certification, pursuing it now is one of the highest-ROI career moves you can make. Additionally, certifications in motivational interviewing, Mental Health First Aid, or trauma-informed care all strengthen your ECM candidacy. List every relevant certification prominently on your resume.",
            },
          ],
        },
        {
          subHeading: "Build Your FQHC Talent Exchange Profile",
          content: [
            {
              type: "paragraph",
              text: "When you create a profile on FQHC Talent Exchange, you can specify your ECM experience, EHR proficiency, language skills, and preferred regions — all the factors that FQHC hiring managers use to evaluate candidates. This lets us match you directly with ECM openings that fit your background, rather than forcing you to scroll through generic job boards.",
            },
          ],
        },
      ],
    },
    {
      heading: "Where ECM Jobs Are Growing Fastest",
      content: [
        {
          type: "paragraph",
          text: "ECM hiring is happening across California, but several regions are seeing particularly strong growth due to high Medi-Cal enrollment, large FQHC networks, and aggressive health plan ECM expansion targets.",
        },
        {
          type: "paragraph",
          boldText: "Los Angeles County",
          text: " has the largest concentration of ECM positions in the state, driven by its massive Medi-Cal population and dense network of FQHCs including AltaMed, JWCH, Northeast Valley Health Corporation, and dozens of others. LA County FQHCs are hiring across all ECM role types, with particular demand for bilingual Spanish care managers and outreach specialists.",
        },
        {
          type: "paragraph",
          boldText: "The San Francisco Bay Area",
          text: " is another major ECM hiring hub, with organizations like LifeLong Medical Care, La Clínica de La Raza, and Ravenswood Family Health Network expanding their ECM teams. Bay Area ECM salaries tend to run 10–15% higher than statewide averages to account for cost of living.",
        },
        {
          type: "paragraph",
          boldText: "The Inland Empire (Riverside and San Bernardino counties)",
          text: " is experiencing some of the fastest ECM growth in percentage terms. FQHCs in this region are scaling rapidly to serve a large and growing Medi-Cal population, and many are actively recruiting ECM staff from other parts of the state. Cost of living is lower than coastal California, making salary-to-cost ratios particularly attractive.",
        },
        {
          type: "paragraph",
          boldText: "The Sacramento region",
          text: " and Central Valley (including Fresno, Bakersfield, and Stockton) are also seeing steady ECM hiring growth, particularly for bilingual roles serving agricultural and immigrant communities. These regions often have fewer applicants competing for each position, making them an excellent option for candidates willing to relocate.",
        },
      ],
    },
    {
      heading: "The Bottom Line",
      content: [
        {
          type: "paragraph",
          text: "Enhanced Care Management is reshaping the community health workforce in California. It's creating more positions, more sustainable funding, and a clearer career pathway for community health workers, care coordinators, and outreach professionals than any previous program. If you're working in community health — or want to — understanding ECM and positioning yourself for ECM roles is one of the smartest career moves you can make right now.",
        },
        {
          type: "paragraph",
          text: "The FQHCs that are hiring today need people who understand the communities they serve, who can navigate complex social and clinical systems, and who are committed to the mission of health equity. If that describes you, the opportunities are real and growing.",
        },
      ],
    },
  ],
  ctaTitle: "Ready to Find Your ECM Role?",
  ctaDescription:
    "Join FQHC Talent Exchange and get matched with FQHCs that are actively hiring for Enhanced Care Management positions across California.",
  ctaButtonText: "Build Your Free Resume",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title: "Medi-Cal Funding Cuts: What Community Health Workers Need to Know",
    },
    {
      href: "/blog/how-to-write-fqhc-resume",
      title: "How to Write an FQHC Resume That Gets Noticed",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Recursos de Carrera",
  title: "¿Qué Es la Gestión de Atención Mejorada (ECM)? Una Guía de Carrera para Trabajadores de Salud Comunitaria",
  description:
    "La Gestión de Atención Mejorada (ECM) es uno de los programas de más rápido crecimiento en los FQHCs de California. Aprende qué es ECM, qué funciones crea, qué habilidades necesitas y cómo conseguir un trabajo en ECM.",
  breadcrumbTitle: "¿Qué Es ECM?",
  datePublished: "2026-02-05",
  dateDisplay: "5 de Febrero de 2026",
  readTime: "10 min",
  openingParagraph:
    "Si trabajas en salud comunitaria en California — o quieres hacerlo — casi ciertamente has escuchado el acrónimo ECM. La Gestión de Atención Mejorada es uno de los mayores impulsores de la fuerza laboral en los Centros de Salud Calificados Federalmente en este momento, creando miles de nuevos puestos en toda el estado. Ya seas un coordinador de atención experimentado buscando especializarte o un trabajador de salud comunitaria explorando tu próximo movimiento, entender ECM es esencial para navegar el mercado laboral de FQHC de hoy.",
  sections: [
    {
      heading: "¿Qué Es la Gestión de Atención Mejorada?",
      content: [
        {
          type: "paragraph",
          text: "La Gestión de Atención Mejorada es un beneficio estatal bajo la iniciativa CalAIM de California — la transformación integral de Medi-Cal lanzada por el Departamento de Servicios de Atención Médica (DHCS). ECM reemplaza programas anteriores de gestión de atención fragmentados con un modelo único y estandarizado diseñado para servir a miembros de Medi-Cal que enfrentan los desafíos de salud y sociales más complejos.",
        },
        {
          type: "paragraph",
          text: "En esencia, ECM proporciona coordinación de atención intensiva y centrada en la persona para individuos que circulan a través de departamentos de emergencia, luchan con condiciones crónicas, experimentan falta de hogar, tienen enfermedades mentales graves o están en transición después de la encarcelación. En lugar de administrar pacientes desde un escritorio, los equipos de ECM se reúnen con miembros donde estén — en refugios, en hogares, en la calle — y los ayudan a navegar todos los aspectos de sus necesidades de salud y sociales.",
        },
        {
          type: "paragraph",
          text: "Para los FQHCs, ECM es tanto un mandato como una oportunidad. Los planes de atención administrada contratan con los FQHCs para entregar servicios de ECM a paneles de miembros asignados, y los FQHCs facturan por esos servicios a través de arreglos capitados o de tarifa por servicio. Esto crea un flujo de ingresos directo que financia personal dedicado de ECM — y eso significa empleos.",
        },
      ],
    },
    {
      heading: "¿Por Qué ECM Importa para Carreras en FQHC?",
      content: [
        {
          type: "paragraph",
          text: "Antes de CalAIM, los puestos de trabajadores de salud comunitaria en los FQHCs a menudo eran financiados por subvenciones y temporales. Cuando la subvención terminaba, el puesto terminaba. ECM cambia esta dinámica significativamente. Porque ECM es un beneficio permanente de Medi-Cal — no un piloto limitado en el tiempo — los puestos que financia son más sostenibles. Los FQHCs que construyen programas sólidos de ECM pueden mantener personal estable mientras sirvan sus paneles de miembros asignados de manera efectiva.",
        },
        {
          type: "paragraph",
          text: "La escala es sustancial. Cada plan de atención administrada en California está obligado a ofrecer ECM, y la mayoría contrata con FQHCs como sus socios de entrega primarios. A medida que los planes de salud amplían sus objetivos de inscripción en ECM, los FQHCs necesitan más personal para administrar paneles más grandes. El resultado es un flujo constante de nuevos puestos — desde trabajadores de alcance de primera línea hasta gerentes de programa que supervisan operaciones completas de ECM.",
        },
        {
          type: "paragraph",
          text: "Para los trabajadores de salud comunitaria, ECM también proporciona una escalera de carrera más clara que muchos roles tradicionales de FQHC. Puedes entrar como especialista de alcance, avanzar a una posición de gerente de atención a medida que ganes experiencia y credenciales, y eventualmente pasar a roles de gestión de programa o supervisión. Este tipo de progresión estructurada ha sido históricamente rara en la fuerza laboral de salud comunitaria.",
        },
      ],
    },
    {
      heading: "Funciones de ECM y Qué Pagan",
      content: [
        {
          type: "paragraph",
          text: "ECM ha creado un conjunto distintivo de funciones en FQHCs en toda California. Aunque los títulos varían entre organizaciones, los siguientes puestos representan las funciones de ECM más comunes y sus rangos salariales típicos según los anuncios actuales de FQHC en todo el estado.",
        },
        {
          type: "roleCards",
          roles: [
            {
              title: "Gerente de Atención de ECM",
              salary: "$55,000 – $72,000/año",
              description: "La columna vertebral de cualquier programa de ECM. Los gerentes de atención llevan un panel de 35–60 miembros de alta complejidad, realizan evaluaciones integrales, desarrollan planes de atención individualizados, coordinan con proveedores y organizaciones comunitarias, y documentan todos los encuentros en el EHR. La mayoría de los puestos requieren una licenciatura en trabajo social, salud pública o un campo relacionado — aunque algunos FQHCs aceptarán experiencia equivalente en lugar de una licenciatura.",
            },
            {
              title: "Trabajador de Salud Comunitaria / ECM",
              salary: "$42,000 – $58,000/año",
              description: "Los CHWs en programas de ECM realizan alcance basado en el campo, ayudan a los miembros a navegar servicios sociales, proporcionan educación en salud, ayudan con programación de citas y transporte, y sirven como el puente cultural y lingüístico entre miembros y equipos clínicos. La capacidad bilingüe — especialmente español — a menudo se requiere. La certificación CHW de California añade valor significativo.",
            },
            {
              title: "Gerente de Programa de ECM",
              salary: "$75,000 – $100,000/año",
              description: "Los gerentes de programa supervisan toda la operación de ECM en un FQHC — incluyendo supervisión del personal, cumplimiento de plan de atención administrada, informes de datos, métricas de calidad y expansión del programa. Este rol típicamente requiere 3–5 años de experiencia en gestión de atención y familiaridad sólida con requisitos de CalAIM y contratos de planes de salud. Los gerentes de programa son el enlace primario entre el FQHC y sus socios de atención administrada.",
            },
            {
              title: "Especialista en Alcance de ECM",
              salary: "$38,000 – $50,000/año",
              description: "Los especialistas en alcance se enfocean en ubicar y comprometer miembros de ECM difíciles de alcanzar — individuos experimentando falta de hogar, aquellos recientemente liberados de encarcelación, o miembros que se han desvinculado de la atención. Este es principalmente un rol basado en campo que requiere habilidades de relaciones interpersonales sólidas, comodidad trabajando en refugios y campamentos, y la capacidad de construir confianza rápidamente. A menudo es el punto de entrada a una carrera en ECM.",
            },
          ],
        },
      ],
    },
    {
      heading: "Habilidades y Calificaciones para Funciones de ECM",
      content: [
        {
          type: "paragraph",
          text: "Cuando los gerentes de contratación de FQHC revisan candidatos para posiciones de ECM, buscan más allá de calificaciones clínicas estándar. ECM requiere una combinación única de conocimiento clínico, habilidades de participación comunitaria y competencias específicas del programa. Aquí está lo que consistentemente aparece en la parte superior de la lista.",
        },
        {
          type: "paragraph",
          boldText: "Entrevista motivacional y atención informada por trauma.",
          text: " Los miembros de ECM tienen historias complejas. La capacidad de comprometer a individuos que pueden desconfiar del sistema de atención médica, utilizando técnicas de comunicación basadas en evidencia, es esencial para cada rol de ECM desde alcance hasta gestión.",
        },
        {
          type: "paragraph",
          boldText: "Competencia bilingüe.",
          text: " Los candidatos bilingües español-inglés están en una demanda excepcionalmente alta en los FQHCs de California. Mandarín, vietnamita, tagalo y armenio también son altamente valorados dependiendo del área de servicio. Si eres bilingüe, asegúrate de que sea prominente en tu currículum — puede ser el factor decisivo.",
        },
        {
          type: "paragraph",
          boldText: "Desarrollo de plan de atención y documentación.",
          text: " ECM requiere documentación exhaustiva de cada interacción con miembros, evaluación y actualización de plan de atención. Los gerentes de contratación quieren ver que puedes mantener registros precisos y oportunos que cumplan tanto con requisitos de FQHC como de plan de atención administrada.",
        },
        {
          type: "paragraph",
          boldText: "Conocimiento de determinantes sociales de la salud (SDOH).",
          text: " ECM se trata inherentemente de abordar los factores sociales que impulsan pobres resultados de salud — inestabilidad de vivienda, inseguridad alimentaria, falta de transporte, aislamiento social. Los candidatos que entienden marcos de SDOH y pueden conectar miembros a recursos comunitarios son exactamente lo que los FQHCs necesitan.",
        },
        {
          type: "paragraph",
          boldText: "Certificación de CHW.",
          text: " La certificación de Trabajador de Salud Comunitaria de California, aunque no siempre requerida, fortalece significativamente tu candidatura. Señala a los empleadores que tienes capacitación formalizada en principios de salud comunitaria, competencia cultural y educación en salud — todo lo cual es fundamental para la entrega de ECM.",
        },
      ],
    },
    {
      heading: "Sistemas de EHR Utilizados en ECM",
      content: [
        {
          type: "paragraph",
          text: "Uno de los factores más subestimados en la contratación de FQHC es la experiencia del sistema EHR. Los FQHCs invierten mucho en sus sistemas de registros de salud electrónicos, y los candidatos que ya conocen el sistema ahorran semanas de tiempo de incorporación. Para funciones de ECM específicamente, tu competencia en EHR importa porque los requisitos de documentación de ECM son extensos y específicos del sistema.",
        },
        {
          type: "paragraph",
          boldText: "OCHIN Epic",
          text: " es el EHR más ampliamente utilizado entre los FQHCs de California, particularmente aquellos que son parte de la red OCHIN. Si has trabajado en Epic — especialmente los módulos de gestión de atención y salud de la población — eres inmediatamente competitivo en una gran parte de empleadores de FQHC.",
        },
        {
          type: "paragraph",
          boldText: "NextGen",
          text: " es el segundo EHR más común en el espacio de FQHC. Muchos FQHCs de tamaño mediano y más grandes usan NextGen para flujos de trabajo clínicos y de gestión de atención. La experiencia con herramientas de coordinación de atención y salud de la población de NextGen es un diferenciador fuerte.",
        },
        {
          type: "paragraph",
          boldText: "eClinicalWorks (eCW)",
          text: " y Athenahealth son utilizados por un segmento más pequeño pero notable de FQHCs. Otras plataformas que puedes encontrar incluyen OCHIN Epic para reportes de salud de la población y Unite Us o Aunt Bertha (findhelp) para gestión de referencias de atención social — ambas frecuentemente utilizadas junto con el EHR primario en programas de ECM.",
        },
        {
          type: "paragraph",
          text: "En tu currículum y en tu perfil de FQHC Talent Exchange, siempre enumera cada sistema de EHR que hayas usado, incluyendo los módulos específicos con los que eres competente. Este es uno de los primeros filtros que aplican los gerentes de contratación.",
        },
      ],
    },
    {
      heading: "Cómo Posicionarte para Trabajos de ECM",
      content: [
        {
          type: "paragraph",
          text: "Conseguir un rol de ECM en un FQHC requiere más que solo tener experiencia relevante — necesitas presentar esa experiencia en el lenguaje que los gerentes de contratación de FQHC reconocen y buscan. Aquí están las formas más efectivas de posicionarte.",
        },
      ],
    },
    {
      heading: "Donde los Trabajos de ECM Están Creciendo Más Rápidamente",
      content: [
        {
          type: "paragraph",
          text: "La contratación de ECM está sucediendo en toda California, pero varias regiones están viendo un crecimiento particularmente fuerte debido a la alta inscripción en Medi-Cal, grandes redes de FQHC y objetivos de expansión agresiva de ECM de planes de salud.",
        },
        {
          type: "paragraph",
          boldText: "Condado de Los Ángeles",
          text: " tiene la mayor concentración de posiciones de ECM en el estado, impulsada por su masiva población de Medi-Cal y densa red de FQHCs incluyendo AltaMed, JWCH, Northeast Valley Health Corporation y docenas más. Los FQHCs del Condado de LA están contratando en todos los tipos de funciones de ECM, con demanda particular de gerentes de atención y especialistas de alcance bilingües en español.",
        },
        {
          type: "paragraph",
          boldText: "El Área de la Bahía de San Francisco",
          text: " es otro centro importante de contratación de ECM, con organizaciones como LifeLong Medical Care, La Clínica de La Raza y Ravenswood Family Health Network expandiendo sus equipos de ECM. Los salarios de ECM del Área de la Bahía tienden a ser 10–15% más altos que promedios estatales para contabilizar el costo de vida.",
        },
        {
          type: "paragraph",
          boldText: "El Inland Empire (Condados de Riverside y San Bernardino)",
          text: " está experimentando algunos de los crecimientos más rápidos de ECM en términos porcentuales. Los FQHCs en esta región están escalando rápidamente para servir una población de Medi-Cal grande y creciente, y muchos están reclutando activamente personal de ECM de otras partes del estado. El costo de vida es menor que la California costera, haciendo que las proporciones salario-costo sean particularmente atractivas.",
        },
        {
          type: "paragraph",
          boldText: "La región de Sacramento",
          text: " y el Valle Central (incluyendo Fresno, Bakersfield y Stockton) también están viendo crecimiento constante de contratación de ECM, particularmente para roles bilingües sirviendo comunidades agrícolas e inmigrantes. Estas regiones a menudo tienen menos aplicantes compitiendo por cada posición, haciéndolas una excelente opción para candidatos dispuestos a reubicarse.",
        },
      ],
    },
    {
      heading: "El Resultado Final",
      content: [
        {
          type: "paragraph",
          text: "La Gestión de Atención Mejorada está redefiniendo la fuerza laboral de salud comunitaria en California. Está creando más posiciones, financiamiento más sostenible y una ruta de carrera más clara para trabajadores de salud comunitaria, coordinadores de atención y profesionales de alcance que cualquier programa anterior. Si estás trabajando en salud comunitaria — o quieres hacerlo — entender ECM y posicionarte para funciones de ECM es uno de los movimientos de carrera más inteligentes que puedes hacer en este momento.",
        },
        {
          type: "paragraph",
          text: "Los FQHCs que están contratando hoy necesitan personas que entiendan las comunidades a las que sirven, que puedan navegar sistemas sociales y clínicos complejos, y que estén comprometidas con la misión de equidad en salud. Si eso te describe a ti, las oportunidades son reales y están creciendo.",
        },
      ],
    },
  ],
  ctaTitle: "¿Listo para Encontrar Tu Rol en ECM?",
  ctaDescription:
    "Únete a FQHC Talent Exchange y obten coincidencias con FQHCs que están contratando activamente para posiciones de Gestión de Atención Mejorada en toda California.",
  ctaButtonText: "Crea Tu CV Gratis",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title: "Cortes de Financiamiento de Medi-Cal: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber",
    },
    {
      href: "/blog/how-to-write-fqhc-resume",
      title: "Cómo Escribir un Currículum de FQHC que Destaque",
    },
  ],
};

export default function WhatIsECMArticle() {
  const locale = useLocale();
  const content = locale === "es" ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title={content.title}
        description={content.description}
        datePublished={content.datePublished}
        slug="what-is-enhanced-care-management-ecm"
      />
      <BreadcrumbJsonLd
        items={[
          { name: locale === "es" ? "Inicio" : "Home", url: "https://www.fqhctalent.com" },
          { name: "Blog", url: "https://www.fqhctalent.com/blog" },
          {
            name: content.breadcrumbTitle,
            url: "https://www.fqhctalent.com/blog/what-is-enhanced-care-management-ecm",
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
            →{" "}
            <Link href="/blog" className="hover:text-stone-700">
              Blog
            </Link>{" "}
            → {content.breadcrumbTitle}
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
              <span>·</span>
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
                        {item.boldText && (
                          <strong className="text-stone-900">{item.boldText}</strong>
                        )}
                        {item.text}
                      </p>
                    );
                  } else if (item.type === "roleCards" && item.roles) {
                    return (
                      <div key={itemIdx} className="bg-stone-50 rounded-xl p-6 my-8">
                        <div className="space-y-6">
                          {item.roles.map((role, roleIdx) => (
                            <div
                              key={roleIdx}
                              className={
                                roleIdx < item.roles!.length - 1
                                  ? "border-b border-stone-200 pb-4"
                                  : ""
                              }
                            >
                              <h3 className="text-lg font-semibold text-stone-900">
                                {role.title}
                              </h3>
                              <p className="text-teal-700 font-semibold mt-1">
                                {role.salary}
                              </p>
                              <p className="text-stone-600 mt-2 text-sm leading-relaxed">
                                {role.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
                {section.subHeading && (
                  <h3 className="text-xl font-semibold text-stone-800 mt-8 mb-3">
                    {section.subHeading}
                  </h3>
                )}
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
