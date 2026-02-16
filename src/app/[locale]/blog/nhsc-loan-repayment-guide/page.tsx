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
  category: "Benefits & Compensation",
  title: "NHSC Loan Repayment for FQHC Workers: Complete Guide",
  description:
    "Learn how the National Health Service Corps Loan Repayment Program can eliminate up to $50,000 or more of student loan debt for healthcare workers at California FQHCs. Eligibility, award amounts, application tips, and more.",
  breadcrumbTitle: "NHSC Loan Repayment Guide",
  datePublished: "2026-02-14",
  dateDisplay: "February 14, 2026",
  readTime: "10 min read",
  openingParagraph:
    "Student loan debt is one of the biggest barriers to entering community health. The NHSC Loan Repayment Program can eliminate up to $50,000 or more of that burden. If you're considering working at a California FQHC, understanding how this program works could be one of the most important career decisions you make.",
  sections: [
    {
      heading: "What Is the NHSC Loan Repayment Program?",
      content: [
        {
          type: "paragraph",
          text: "The National Health Service Corps (NHSC) is a federal program administered by the Health Resources and Services Administration (HRSA) that helps healthcare professionals repay their student loans in exchange for working in underserved communities. The program has been placing providers in high-need areas since 1972, and today it supports over 20,000 clinicians across the country — many of them working at Federally Qualified Health Centers.",
        },
        {
          type: "paragraph",
          text: "Through the NHSC Loan Repayment Program (LRP), eligible healthcare workers can receive up to $50,000 in tax-free loan repayment for an initial two-year service commitment at an NHSC-approved site. For those working in the Substance Use Disorder (SUD) workforce, awards can reach up to $75,000 for a three-year commitment. These payments go directly toward your qualifying student loans and — critically — they are not treated as taxable income.",
        },
        {
          type: "paragraph",
          text: "The program is available for both clinical and non-clinical roles at approved NHSC sites, which includes the vast majority of FQHCs in California. Whether you're a physician, nurse practitioner, licensed clinical social worker, dentist, or community health worker, the NHSC may have a pathway that helps you reduce or eliminate your student loan debt while doing meaningful work in community health.",
        },
      ],
    },
    {
      heading: "Who Is Eligible?",
      content: [
        {
          type: "paragraph",
          text: "Eligibility for the NHSC Loan Repayment Program depends on several factors, including where you work, how much you work, what discipline you practice, and the type of loans you carry. Here are the key requirements:",
        },
        {
          type: "list",
          items: [
            "You must work at an NHSC-approved site. Most FQHCs in California qualify, but you should verify your specific site's approval status through the NHSC Site Search tool on the HRSA website.",
            "You must be employed full-time (minimum 40 hours per week, with at least 32 hours in clinical practice) or half-time (minimum 20 hours per week, with at least 16 hours in clinical practice).",
            "You must have qualifying student loans — either federal or commercial loans used to pay for your health professions education. Parent PLUS loans, personal loans, and credit card debt do not qualify.",
            "You must be a U.S. citizen or U.S. national. Permanent residents and visa holders are not eligible.",
            "You must not have any existing service obligations to federal, state, or local governments (unless compatible with NHSC requirements).",
          ],
        },
        {
          type: "paragraph",
          text: "Eligible disciplines include a wide range of healthcare professions. The following roles are commonly approved for NHSC loan repayment:",
        },
        {
          type: "box",
          gridItems: [
            "Physicians (MD/DO)",
            "Nurse Practitioners (NPs)",
            "Physician Assistants (PAs)",
            "Certified Nurse Midwives (CNMs)",
            "Dentists",
            "Dental Hygienists",
            "Psychologists (PhD/PsyD)",
            "Licensed Clinical Social Workers (LCSWs)",
            "Marriage & Family Therapists (MFTs)",
            "Licensed Professional Counselors (LPCs)",
            "Psychiatric Nurse Practitioners",
            "Pharmacists",
            "Community Health Workers (select programs)",
            "Registered Nurses (select programs)",
            "Substance Use Disorder Counselors",
          ],
        },
        {
          type: "paragraph",
          text: "Note that eligibility can vary between the standard LRP, the SUD Workforce LRP, and the Students-to-Service program. Always check the most current NHSC guidelines to confirm your discipline qualifies under the specific program you're applying to.",
        },
      ],
    },
    {
      heading: "How Much Can You Receive?",
      content: [
        {
          type: "paragraph",
          text: "The NHSC offers several loan repayment tracks, each with different award amounts and service commitments. Understanding the differences can help you choose the right path based on your career plans and financial situation.",
        },
        {
          type: "list",
          items: [
            "Full-Time Loan Repayment Program (LRP): Up to $50,000 in loan repayment for an initial two-year full-time service commitment. This is the most common track and is available to a broad range of eligible disciplines.",
            "Half-Time Loan Repayment Program (LRP): Up to $25,000 in loan repayment for a two-year half-time service commitment (minimum 20 hours per week). This option works well for providers who split their time between multiple sites or have other professional commitments.",
            "Continuation Awards: After completing your initial service commitment, you can apply for additional years of service with continued loan repayment. Continuation awards vary but can add significantly to your total benefit — many providers receive $30,000–$50,000 per additional year of full-time service.",
            "Students-to-Service (S2S) Program: For students in their final year of health professions school, the S2S program offers up to $120,000 in loan repayment in exchange for a three-year service commitment at an NHSC site after graduation. This is one of the most generous tracks available.",
            "Substance Use Disorder (SUD) Workforce LRP: Designed for providers who spend at least 40% of their clinical time treating substance use disorders, this track offers up to $75,000 for a three-year full-time commitment. Given the growing demand for SUD services at California FQHCs, this is an increasingly relevant option.",
          ],
        },
        {
          type: "paragraph",
          text: "All NHSC loan repayment awards are tax-free under federal law, which means the full amount goes toward your loan balance. This is a significant advantage compared to other employer-based loan repayment benefits, which are often treated as taxable income. For a provider with $150,000 in student loan debt, a combination of initial and continuation NHSC awards could eliminate the majority of that balance over a 4–6 year career at an FQHC.",
        },
      ],
    },
    {
      heading: "How to Apply",
      content: [
        {
          type: "paragraph",
          text: "The NHSC Loan Repayment Program application cycle typically opens once per year, usually in the spring (March–May). The exact dates vary annually, so it's important to monitor the NHSC website and sign up for email alerts well in advance. The application window is usually only open for 4–6 weeks, and late applications are not accepted.",
        },
        {
          type: "paragraph",
          text: "When you're ready to apply, you'll need the following documentation:",
        },
        {
          type: "list",
          items: [
            "Proof of employment at an NHSC-approved site (offer letter or employment verification from your FQHC)",
            "Student loan documentation showing current balances, lender information, and disbursement dates",
            "Professional license or certification for your discipline",
            "Transcripts from your health professions training program",
            "Proof of U.S. citizenship (passport or birth certificate)",
            "A signed NHSC service agreement",
          ],
        },
        {
          type: "paragraph",
          text: "Tips for a strong application: Start gathering your documentation months before the application window opens. Make sure your student loan servicer can provide detailed statements quickly — delays in documentation are one of the most common reasons applications are incomplete. If you're still job searching, prioritize NHSC-approved sites and aim to have your employment confirmed before the application opens.",
        },
        {
          type: "paragraph",
          text: "To verify that your FQHC is an approved NHSC site, use the NHSC Site Search tool at nhsc.hrsa.gov. You can search by organization name, address, or site type. Most FQHCs in California are listed, but approval status can change, so always confirm with both the NHSC database and your employer's HR department.",
        },
      ],
    },
    {
      heading: "Which California FQHCs Qualify?",
      content: [
        {
          type: "paragraph",
          text: "The good news for California community health workers: the vast majority of the 87 FQHCs in our directory qualify as NHSC-approved sites. FQHCs are, by definition, located in or serving medically underserved areas and populations, which aligns directly with the NHSC's mission of placing providers where they're needed most.",
        },
        {
          type: "paragraph",
          text: "However, not all NHSC-approved sites are created equal. Your chances of receiving a loan repayment award are heavily influenced by your site's Health Professional Shortage Area (HPSA) score. HPSA scores range from 0 to 25 (for primary care and mental health) or 0 to 26 (for dental), with higher scores indicating greater shortage and need. Sites with higher HPSA scores receive priority in the NHSC selection process, meaning providers at high-scoring sites have a significantly better chance of being approved for loan repayment.",
        },
        {
          type: "paragraph",
          text: "You can check HPSA scores through the HRSA Data Warehouse or the NHSC Site Search tool. When evaluating FQHC job opportunities, consider the HPSA score as a factor alongside salary, benefits, and culture. A site in a rural area or a highly underserved urban neighborhood may have a HPSA score of 18–25, making NHSC approval almost certain, while a site in a less underserved area may score 10–14, making the process more competitive.",
        },
        {
          type: "paragraph",
          text: "Our directory at fqhctalent.com/directory lists all 87 California FQHCs, including information about their locations, programs, and job openings. Use it as a starting point to identify FQHCs in regions where HPSA scores are likely to be high — particularly in the Central Valley, Inland Empire, and rural Northern California.",
        },
      ],
    },
    {
      heading: "Tips for Maximizing Your NHSC Experience",
      content: [
        {
          type: "paragraph",
          text: "Getting accepted into the NHSC Loan Repayment Program is a significant financial win. But with some strategic planning, you can maximize the total benefit you receive over the course of your FQHC career.",
        },
        {
          type: "list",
          items: [
            "Choose high-HPSA-score sites for better approval chances. If you're flexible on location, prioritize FQHCs in areas with the highest shortage designations. Rural health centers and those in deeply underserved urban communities tend to have the highest scores — and the highest approval rates for NHSC awards.",
            "Start the application process before your start date. Don't wait until you've been on the job for six months to begin thinking about NHSC. Ideally, you should verify your site's NHSC approval status during the interview process and begin gathering loan documentation as soon as you accept an offer.",
            "Keep meticulous records of your service dates. The NHSC tracks your service obligation down to the day. Make sure you document your start date, any approved leave, and your hours worked per week. If you take extended leave (such as parental leave or FMLA), understand how it affects your service timeline.",
            "Consider extending for additional loan repayment. After your initial two-year commitment, you can apply for continuation awards that provide additional loan repayment for each extra year of service. Many providers find that staying for 4–6 years at an FQHC allows them to eliminate their entire loan balance.",
            "Combine NHSC with Public Service Loan Forgiveness (PSLF). Because FQHCs are nonprofit organizations, your time working at an FQHC counts toward the 120 qualifying payments required for PSLF. You can receive NHSC loan repayment while simultaneously making progress toward PSLF — a powerful combination that can accelerate your path to being debt-free.",
          ],
        },
      ],
    },
    {
      heading: "Common Questions About NHSC",
      content: [
        {
          type: "paragraph",
          text: "Even after understanding the basics, many healthcare workers have specific questions about how the NHSC program works in practice. Here are answers to the most common ones:",
        },
        {
          type: "list",
          items: [
            "What if I leave early? If you fail to complete your service commitment, you will be required to repay a pro-rated portion of the loan repayment you received, plus interest and penalties. The penalty can be substantial — in some cases, you may owe more than you received. This is why it's important to be genuinely committed to your service site before accepting an NHSC award.",
            "Can I work at multiple sites? Yes, in some cases. The NHSC allows providers to split their time between approved sites, as long as the combined hours meet the minimum requirement (40 hours for full-time, 20 hours for half-time) and all sites are NHSC-approved. You'll need to report all practice sites on your application.",
            "Does moonlighting count? Hours spent moonlighting at a non-NHSC site generally do not count toward your service obligation. However, the NHSC does allow some outside practice under specific conditions. The key is that your primary commitment must be at your approved NHSC site, and any outside work cannot interfere with meeting your minimum hours at the approved site.",
            "Can I combine NHSC with PSLF? Yes, and this is one of the most powerful financial strategies available to FQHC workers. While your NHSC payments reduce your loan principal, your monthly payments to your remaining balance can count toward PSLF's 120-payment requirement — as long as you're on an income-driven repayment plan and your employer qualifies as a public service organization (which virtually all FQHCs do). After 10 years of qualifying payments, any remaining balance is forgiven through PSLF.",
          ],
        },
        {
          type: "paragraph",
          text: "If you have questions specific to your situation, the NHSC has a dedicated helpline and support staff who can walk you through eligibility, application requirements, and service obligations. You can reach them through the NHSC website at nhsc.hrsa.gov or by calling the NHSC support line.",
        },
      ],
    },
  ],
  ctaTitle: "Find NHSC-Eligible FQHC Jobs in California",
  ctaDescription:
    "Browse job openings at California FQHCs — many of which are NHSC-approved sites where you can qualify for up to $50,000 or more in tax-free student loan repayment.",
  ctaButtonText: "Build Your Free Resume",
  relatedArticles: [
    {
      href: "/blog/fqhc-community-health-worker-salary-california",
      title: "FQHC Community Health Worker Salary in California",
    },
    {
      href: "/blog/fqhc-career-ladder-ma-rn-provider",
      title: "The FQHC Career Ladder: How to Advance in Community Health",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Beneficios y Compensación",
  title: "Pago de Préstamos del NHSC para Trabajadores de FQHC: Guía Completa",
  description:
    "Aprende cómo el Programa de Pago de Préstamos del Cuerpo Nacional de Servicios de Salud puede eliminar hasta $50,000 o más de deuda estudiantil para trabajadores de salud en FQHCs de California. Elegibilidad, montos de becas, consejos para la solicitud y más.",
  breadcrumbTitle: "Guía de Pago de Préstamos del NHSC",
  datePublished: "2026-02-14",
  dateDisplay: "14 de Febrero de 2026",
  readTime: "10 min",
  openingParagraph:
    "La deuda de préstamos estudiantiles es una de las mayores barreras para ingresar a la salud comunitaria. El Programa de Pago de Préstamos del NHSC puede eliminar hasta $50,000 o más de esa carga. Si estás considerando trabajar en un FQHC de California, comprender cómo funciona este programa podría ser una de las decisiones profesionales más importantes que tomes.",
  sections: [
    {
      heading: "¿Qué Es el Programa de Pago de Préstamos del NHSC?",
      content: [
        {
          type: "paragraph",
          text: "El Cuerpo Nacional de Servicios de Salud (NHSC) es un programa federal administrado por la Administración de Recursos y Servicios de Salud (HRSA) que ayuda a los profesionales de la salud a pagar sus préstamos estudiantiles a cambio de trabajar en comunidades desatendidas. El programa ha estado colocando proveedores en áreas de alta necesidad desde 1972, y hoy apoya a más de 20,000 clínicos en todo el país — muchos de ellos trabajando en Centros de Salud Calificados Federalmente.",
        },
        {
          type: "paragraph",
          text: "A través del Programa de Pago de Préstamos (LRP) del NHSC, los trabajadores de salud elegibles pueden recibir hasta $50,000 en pago de préstamos libre de impuestos por un compromiso de servicio inicial de dos años en un sitio aprobado por el NHSC. Para aquellos que trabajan en la fuerza laboral de Trastornos por Uso de Sustancias (SUD), las becas pueden alcanzar hasta $75,000 por un compromiso de tres años. Estos pagos se destinan directamente a tus préstamos estudiantiles calificados y — de manera crucial — no se tratan como ingreso sujeto a impuestos.",
        },
        {
          type: "paragraph",
          text: "El programa está disponible tanto para roles clínicos como no clínicos en sitios aprobados por el NHSC, lo que incluye la gran mayoría de los FQHCs en California. Ya seas médico, enfermero practicante, trabajador social clínico licenciado, dentista o trabajador de salud comunitaria, el NHSC puede tener un camino que te ayude a reducir o eliminar tu deuda de préstamos estudiantiles mientras realizas un trabajo significativo en la salud comunitaria.",
        },
      ],
    },
    {
      heading: "¿Quién Es Elegible?",
      content: [
        {
          type: "paragraph",
          text: "La elegibilidad para el Programa de Pago de Préstamos del NHSC depende de varios factores, incluyendo dónde trabajas, cuánto trabajas, qué disciplina practicas y el tipo de préstamos que tienes. Aquí están los requisitos clave:",
        },
        {
          type: "list",
          items: [
            "Debes trabajar en un sitio aprobado por el NHSC. La mayoría de los FQHCs en California califican, pero debes verificar el estado de aprobación de tu sitio específico a través de la herramienta de búsqueda de sitios del NHSC en el sitio web de HRSA.",
            "Debes estar empleado a tiempo completo (mínimo 40 horas por semana, con al menos 32 horas en práctica clínica) o a medio tiempo (mínimo 20 horas por semana, con al menos 16 horas en práctica clínica).",
            "Debes tener préstamos estudiantiles calificados — ya sean préstamos federales o comerciales utilizados para pagar tu educación en profesiones de salud. Los préstamos Parent PLUS, préstamos personales y deudas de tarjetas de crédito no califican.",
            "Debes ser ciudadano de los EE. UU. o nacional de los EE. UU. Los residentes permanentes y titulares de visa no son elegibles.",
            "No debes tener obligaciones de servicio existentes con gobiernos federales, estatales o locales (a menos que sean compatibles con los requisitos del NHSC).",
          ],
        },
        {
          type: "paragraph",
          text: "Las disciplinas elegibles incluyen una amplia gama de profesiones de la salud. Los siguientes roles son comúnmente aprobados para el pago de préstamos del NHSC:",
        },
        {
          type: "box",
          gridItems: [
            "Médicos (MD/DO)",
            "Enfermeros Practicantes (NPs)",
            "Asistentes Médicos (PAs)",
            "Enfermeras Parteras Certificadas (CNMs)",
            "Dentistas",
            "Higienistas Dentales",
            "Psicólogos (PhD/PsyD)",
            "Trabajadores Sociales Clínicos Licenciados (LCSWs)",
            "Terapeutas Matrimoniales y Familiares (MFTs)",
            "Consejeros Profesionales Licenciados (LPCs)",
            "Enfermeros Practicantes Psiquiátricos",
            "Farmacéuticos",
            "Trabajadores de Salud Comunitaria (programas selectos)",
            "Enfermeros Registrados (programas selectos)",
            "Consejeros de Trastornos por Uso de Sustancias",
          ],
        },
        {
          type: "paragraph",
          text: "Ten en cuenta que la elegibilidad puede variar entre el LRP estándar, el LRP de la Fuerza Laboral SUD y el programa Students-to-Service. Siempre consulta las directrices más actuales del NHSC para confirmar que tu disciplina califica bajo el programa específico al que estás aplicando.",
        },
      ],
    },
    {
      heading: "¿Cuánto Puedes Recibir?",
      content: [
        {
          type: "paragraph",
          text: "El NHSC ofrece varias opciones de pago de préstamos, cada una con diferentes montos de becas y compromisos de servicio. Comprender las diferencias puede ayudarte a elegir el camino correcto según tus planes de carrera y tu situación financiera.",
        },
        {
          type: "list",
          items: [
            "Programa de Pago de Préstamos (LRP) a Tiempo Completo: Hasta $50,000 en pago de préstamos por un compromiso inicial de servicio a tiempo completo de dos años. Esta es la opción más común y está disponible para una amplia gama de disciplinas elegibles.",
            "Programa de Pago de Préstamos (LRP) a Medio Tiempo: Hasta $25,000 en pago de préstamos por un compromiso de servicio a medio tiempo de dos años (mínimo 20 horas por semana). Esta opción funciona bien para proveedores que dividen su tiempo entre múltiples sitios u otras obligaciones profesionales.",
            "Becas de Continuación: Después de completar tu compromiso de servicio inicial, puedes solicitar años adicionales de servicio con pago continuo de préstamos. Las becas de continuación varían pero pueden agregar significativamente a tu beneficio total — muchos proveedores reciben $30,000–$50,000 por cada año adicional de servicio a tiempo completo.",
            "Programa Students-to-Service (S2S): Para estudiantes en su último año de la escuela de profesiones de salud, el programa S2S ofrece hasta $120,000 en pago de préstamos a cambio de un compromiso de servicio de tres años en un sitio del NHSC después de la graduación. Esta es una de las opciones más generosas disponibles.",
            "LRP de la Fuerza Laboral de Trastornos por Uso de Sustancias (SUD): Diseñado para proveedores que dedican al menos el 40% de su tiempo clínico al tratamiento de trastornos por uso de sustancias, esta opción ofrece hasta $75,000 por un compromiso de tres años a tiempo completo. Dada la creciente demanda de servicios de SUD en los FQHCs de California, esta es una opción cada vez más relevante.",
          ],
        },
        {
          type: "paragraph",
          text: "Todas las becas de pago de préstamos del NHSC están libres de impuestos bajo la ley federal, lo que significa que el monto completo se destina al saldo de tu préstamo. Esta es una ventaja significativa en comparación con otros beneficios de pago de préstamos del empleador, que a menudo se tratan como ingreso sujeto a impuestos. Para un proveedor con $150,000 en deuda estudiantil, una combinación de becas iniciales y de continuación del NHSC podría eliminar la mayor parte de ese saldo durante una carrera de 4 a 6 años en un FQHC.",
        },
      ],
    },
    {
      heading: "Cómo Aplicar",
      content: [
        {
          type: "paragraph",
          text: "El ciclo de solicitud del Programa de Pago de Préstamos del NHSC generalmente se abre una vez al año, usualmente en la primavera (marzo–mayo). Las fechas exactas varían anualmente, por lo que es importante monitorear el sitio web del NHSC e inscribirse para alertas por correo electrónico con mucha anticipación. La ventana de solicitud generalmente solo está abierta durante 4 a 6 semanas, y no se aceptan solicitudes tardías.",
        },
        {
          type: "paragraph",
          text: "Cuando estés listo para aplicar, necesitarás la siguiente documentación:",
        },
        {
          type: "list",
          items: [
            "Prueba de empleo en un sitio aprobado por el NHSC (carta de oferta o verificación de empleo de tu FQHC)",
            "Documentación de préstamos estudiantiles que muestre los saldos actuales, información del prestamista y fechas de desembolso",
            "Licencia o certificación profesional para tu disciplina",
            "Transcripciones de tu programa de formación en profesiones de la salud",
            "Prueba de ciudadanía estadounidense (pasaporte o certificado de nacimiento)",
            "Un acuerdo de servicio del NHSC firmado",
          ],
        },
        {
          type: "paragraph",
          text: "Consejos para una solicitud sólida: Comienza a reunir tu documentación meses antes de que se abra la ventana de solicitud. Asegúrate de que tu administrador de préstamos estudiantiles pueda proporcionar estados de cuenta detallados rápidamente — los retrasos en la documentación son una de las razones más comunes por las que las solicitudes quedan incompletas. Si todavía estás buscando empleo, prioriza los sitios aprobados por el NHSC y procura tener tu empleo confirmado antes de que se abra la solicitud.",
        },
        {
          type: "paragraph",
          text: "Para verificar que tu FQHC es un sitio aprobado por el NHSC, usa la herramienta de búsqueda de sitios del NHSC en nhsc.hrsa.gov. Puedes buscar por nombre de la organización, dirección o tipo de sitio. La mayoría de los FQHCs en California están listados, pero el estado de aprobación puede cambiar, así que siempre confirma tanto con la base de datos del NHSC como con el departamento de recursos humanos de tu empleador.",
        },
      ],
    },
    {
      heading: "¿Cuáles FQHCs de California Califican?",
      content: [
        {
          type: "paragraph",
          text: "La buena noticia para los trabajadores de salud comunitaria de California: la gran mayoría de los 87 FQHCs en nuestro directorio califican como sitios aprobados por el NHSC. Los FQHCs están, por definición, ubicados en o sirviendo a áreas y poblaciones médicamente desatendidas, lo que se alinea directamente con la misión del NHSC de colocar proveedores donde más se necesitan.",
        },
        {
          type: "paragraph",
          text: "Sin embargo, no todos los sitios aprobados por el NHSC son iguales. Tus posibilidades de recibir una beca de pago de préstamos están fuertemente influenciadas por la puntuación del Área de Escasez de Profesionales de Salud (HPSA) de tu sitio. Las puntuaciones HPSA van de 0 a 25 (para atención primaria y salud mental) o de 0 a 26 (para dental), donde las puntuaciones más altas indican mayor escasez y necesidad. Los sitios con puntuaciones HPSA más altas reciben prioridad en el proceso de selección del NHSC, lo que significa que los proveedores en sitios con puntuaciones altas tienen una probabilidad significativamente mayor de ser aprobados para el pago de préstamos.",
        },
        {
          type: "paragraph",
          text: "Puedes verificar las puntuaciones HPSA a través del Almacén de Datos de HRSA o la herramienta de búsqueda de sitios del NHSC. Al evaluar oportunidades de trabajo en FQHCs, considera la puntuación HPSA como un factor junto con el salario, los beneficios y la cultura laboral. Un sitio en un área rural o un vecindario urbano altamente desatendido puede tener una puntuación HPSA de 18–25, haciendo la aprobación del NHSC casi segura, mientras que un sitio en un área menos desatendida puede puntuar 10–14, haciendo el proceso más competitivo.",
        },
        {
          type: "paragraph",
          text: "Nuestro directorio en fqhctalent.com/directory lista los 87 FQHCs de California, incluyendo información sobre sus ubicaciones, programas y ofertas de trabajo. Úsalo como punto de partida para identificar FQHCs en regiones donde las puntuaciones HPSA probablemente sean altas — particularmente en el Valle Central, el Inland Empire y el norte rural de California.",
        },
      ],
    },
    {
      heading: "Consejos para Maximizar Tu Experiencia con el NHSC",
      content: [
        {
          type: "paragraph",
          text: "Ser aceptado en el Programa de Pago de Préstamos del NHSC es una ganancia financiera significativa. Pero con algo de planificación estratégica, puedes maximizar el beneficio total que recibes a lo largo de tu carrera en un FQHC.",
        },
        {
          type: "list",
          items: [
            "Elige sitios con puntuaciones HPSA altas para mejores posibilidades de aprobación. Si tienes flexibilidad de ubicación, prioriza los FQHCs en áreas con las designaciones de escasez más altas. Los centros de salud rurales y aquellos en comunidades urbanas profundamente desatendidas tienden a tener las puntuaciones más altas — y las tasas de aprobación más altas para becas del NHSC.",
            "Comienza el proceso de solicitud antes de tu fecha de inicio. No esperes hasta que hayas estado en el trabajo durante seis meses para comenzar a pensar en el NHSC. Idealmente, debes verificar el estado de aprobación del NHSC de tu sitio durante el proceso de entrevista y comenzar a reunir la documentación de préstamos tan pronto como aceptes una oferta.",
            "Mantén registros meticulosos de tus fechas de servicio. El NHSC rastrea tu obligación de servicio hasta el día exacto. Asegúrate de documentar tu fecha de inicio, cualquier licencia aprobada y tus horas trabajadas por semana. Si tomas una licencia extendida (como licencia parental o FMLA), entiende cómo afecta tu cronograma de servicio.",
            "Considera extenderte para pago adicional de préstamos. Después de tu compromiso inicial de dos años, puedes solicitar becas de continuación que proporcionan pago adicional de préstamos por cada año extra de servicio. Muchos proveedores descubren que quedarse 4 a 6 años en un FQHC les permite eliminar completamente su saldo de préstamos.",
            "Combina el NHSC con la Condonación de Préstamos por Servicio Público (PSLF). Debido a que los FQHCs son organizaciones sin fines de lucro, tu tiempo trabajando en un FQHC cuenta para los 120 pagos calificados requeridos para el PSLF. Puedes recibir el pago de préstamos del NHSC mientras simultáneamente avanzas hacia el PSLF — una combinación poderosa que puede acelerar tu camino para estar libre de deudas.",
          ],
        },
      ],
    },
    {
      heading: "Preguntas Frecuentes Sobre el NHSC",
      content: [
        {
          type: "paragraph",
          text: "Incluso después de comprender los conceptos básicos, muchos trabajadores de salud tienen preguntas específicas sobre cómo funciona el programa NHSC en la práctica. Aquí están las respuestas a las más comunes:",
        },
        {
          type: "list",
          items: [
            "¿Qué pasa si me voy antes de tiempo? Si no completas tu compromiso de servicio, se te requerirá devolver una porción prorrateada del pago de préstamos que recibiste, más intereses y penalidades. La penalidad puede ser sustancial — en algunos casos, podrías deber más de lo que recibiste. Por eso es importante estar genuinamente comprometido con tu sitio de servicio antes de aceptar una beca del NHSC.",
            "¿Puedo trabajar en múltiples sitios? Sí, en algunos casos. El NHSC permite que los proveedores dividan su tiempo entre sitios aprobados, siempre y cuando las horas combinadas cumplan con el requisito mínimo (40 horas para tiempo completo, 20 horas para medio tiempo) y todos los sitios estén aprobados por el NHSC. Necesitarás reportar todos los sitios de práctica en tu solicitud.",
            "¿Cuenta el trabajo adicional (moonlighting)? Las horas dedicadas a trabajo adicional en un sitio no aprobado por el NHSC generalmente no cuentan para tu obligación de servicio. Sin embargo, el NHSC permite cierta práctica externa bajo condiciones específicas. Lo clave es que tu compromiso principal debe ser en tu sitio aprobado por el NHSC, y cualquier trabajo externo no puede interferir con el cumplimiento de tus horas mínimas en el sitio aprobado.",
            "¿Puedo combinar el NHSC con PSLF? Sí, y esta es una de las estrategias financieras más poderosas disponibles para los trabajadores de FQHC. Mientras los pagos del NHSC reducen tu capital de préstamo, tus pagos mensuales al saldo restante pueden contar para el requisito de 120 pagos del PSLF — siempre y cuando estés en un plan de pago basado en ingresos y tu empleador califique como una organización de servicio público (lo cual aplica virtualmente a todos los FQHCs). Después de 10 años de pagos calificados, cualquier saldo restante es condonado a través del PSLF.",
          ],
        },
        {
          type: "paragraph",
          text: "Si tienes preguntas específicas a tu situación, el NHSC tiene una línea de ayuda dedicada y personal de apoyo que pueden guiarte a través de la elegibilidad, los requisitos de solicitud y las obligaciones de servicio. Puedes contactarlos a través del sitio web del NHSC en nhsc.hrsa.gov o llamando a la línea de soporte del NHSC.",
        },
      ],
    },
  ],
  ctaTitle: "Encuentra Trabajos de FQHC Elegibles para el NHSC en California",
  ctaDescription:
    "Explora ofertas de trabajo en FQHCs de California — muchos de los cuales son sitios aprobados por el NHSC donde puedes calificar para hasta $50,000 o más en pago de préstamos estudiantiles libre de impuestos.",
  ctaButtonText: "Crea Tu CV Gratis",
  relatedArticles: [
    {
      href: "/blog/fqhc-community-health-worker-salary-california",
      title: "Salario de Trabajadores de Salud Comunitaria en FQHCs de California",
    },
    {
      href: "/blog/fqhc-career-ladder-ma-rn-provider",
      title: "La Escalera Profesional en FQHC: Cómo Avanzar en Salud Comunitaria",
    },
  ],
};

export default function NhscLoanRepaymentGuideArticle() {
  const locale = useLocale();
  const content = locale === "es" ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title={content.title}
        description={content.description}
        datePublished={content.datePublished}
        slug="nhsc-loan-repayment-guide"
      />
      <BreadcrumbJsonLd
        items={[
          { name: locale === "es" ? "Inicio" : "Home", url: "https://www.fqhctalent.com" },
          { name: locale === "es" ? "Blog" : "Blog", url: "https://www.fqhctalent.com/blog" },
          {
            name: content.breadcrumbTitle,
            url: "https://www.fqhctalent.com/blog/nhsc-loan-repayment-guide",
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
