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
  ctaPrimaryButtonText: string;
  ctaSecondaryButtonText: string;
  relatedArticles: Array<{
    href: string;
    title: string;
    category: string;
  }>;
}

const enContent: ArticleContent = {
  category: "Career Resources",
  title:
    "Laid Off from an FQHC? Here&apos;s How to Get Rehired in 48 Hours",
  description:
    "Thousands of community health workers in California are being displaced by Medi-Cal funding cuts and FQHC restructuring. But many FQHCs are still hiring. Learn how the FQHC Talent Exchange Fast-Track program can connect you to your next role in 48 hours &mdash; completely free.",
  breadcrumbTitle: "Laid Off? Get Rehired in 48 Hours",
  datePublished: "2026-02-15",
  dateDisplay: "February 15, 2026",
  readTime: "8 min read",
  openingParagraph:
    "If you have recently been laid off from a Federally Qualified Health Center, you are not alone. Across California, thousands of community health workers, care coordinators, medical assistants, and case managers are being displaced as FQHCs navigate Medi-Cal funding cuts, program restructuring, and tightening budgets. It is a painful situation &mdash; but here is the paradox that most people miss: many FQHCs are simultaneously hiring. The demand for experienced community health professionals has not disappeared. It has shifted. Programs are closing in some organizations while expanding in others. If you know where to look and how to position yourself, your FQHC experience is not a liability &mdash; it is the most valuable credential you have. The FQHC Talent Exchange built the Fast-Track program specifically for this moment: to help displaced FQHC workers get connected to their next role in as little as 48 hours.",
  sections: [
    {
      heading: "The Reality: Why So Many FQHC Workers Are Being Displaced",
      content: [
        {
          type: "paragraph",
          text: "The wave of layoffs hitting California FQHCs is not random. It is the result of several converging forces that have been building for months. Medi-Cal reimbursement rates have failed to keep pace with rising operational costs. Some CalAIM programs that were expected to bring new revenue have been delayed or restructured. Federal grant cycles have created funding gaps that smaller FQHCs cannot bridge. And in some cases, organizational restructuring and mergers have eliminated positions even as the underlying demand for community health services continues to grow.",
        },
        {
          type: "paragraph",
          text: "The result is a labor market that feels contradictory. You see layoff announcements from one FQHC in the same week that another FQHC in the same region posts a dozen open positions. A Community Health Worker loses their position at one clinic because an ECM contract was not renewed, while three other clinics are scrambling to hire ECM staff because their programs are expanding. A bilingual care coordinator gets a reduction-in-force notice on Monday while a nearby health center has had an identical position open for six weeks with no qualified applicants.",
        },
        {
          type: "paragraph",
          text: "This is not a market where there are no jobs. It is a market where the connections between displaced workers and open positions are broken. The FQHC Talent Exchange exists to fix that connection &mdash; and the Fast-Track program was built to fix it fast.",
        },
      ],
    },
    {
      heading:
        "Why Your FQHC Experience Is Gold",
      content: [
        {
          type: "paragraph",
          text: "Before you start doubting your career trajectory, understand something important: your FQHC experience is not generic healthcare experience. It is highly specialized, deeply valuable, and increasingly difficult for health centers to find. The skills you developed working in community health do not transfer one-to-one from hospital systems or private practice settings. FQHCs need people who have already done this work &mdash; and that is you.",
        },
        {
          type: "paragraph",
          text: "Consider what you bring to the table. If you have worked in Enhanced Care Management or Complex Care Management, you understand panel stratification, care plan documentation, and the nuances of coordinating services for high-acuity patients with overlapping medical and social needs. If you are proficient in OCHIN Epic, you already know the EHR system that the majority of California FQHCs use &mdash; and training someone on Epic from scratch takes months. If you are bilingual in English and Spanish, you possess a skill that is in extraordinarily high demand across every region in the state. If you have experience navigating Medi-Cal managed care plans, understanding authorization requirements, and documenting to meet compliance standards, you have institutional knowledge that cannot be learned from a textbook.",
        },
        {
          type: "list",
          items: [
            "ECM and CCM program experience &mdash; understanding care coordination, panel management, and CalAIM documentation requirements",
            "OCHIN Epic proficiency &mdash; the most common EHR system across California FQHCs, with a steep learning curve for new users",
            "Bilingual communication skills &mdash; critical for serving California&apos;s diverse, predominantly Spanish-speaking patient populations",
            "Medi-Cal managed care navigation &mdash; authorization workflows, compliance documentation, and plan-specific requirements",
            "Community health competency &mdash; understanding SDOH screening, warm handoffs, motivational interviewing, and trauma-informed care",
            "Team-based care experience &mdash; working within integrated care teams alongside providers, behavioral health, and social services",
          ],
        },
        {
          type: "paragraph",
          text: "You are not starting from zero. You are one of the most qualified candidates on the market. The challenge is not your skills &mdash; it is getting in front of the right hiring manager at the right FQHC at the right time. That is exactly what Fast-Track does.",
        },
      ],
    },
    {
      heading:
        "The 48-Hour Fast-Track Process",
      content: [
        {
          type: "paragraph",
          text: "The FQHC Talent Exchange Fast-Track program was designed specifically for displaced community health workers who need to move quickly. It is not a job board where you post a resume and wait. It is an active placement process with a dedicated advocate who works on your behalf to connect you with FQHCs that are hiring right now.",
        },
        {
          type: "paragraph",
          text: "Here is how it works:",
        },
        {
          type: "box",
          text: "Step 1: Fill out the Fast-Track form. It takes under 3 minutes. You will share your role, your experience level, your location, your key skills (ECM, Epic, bilingual, etc.), and your availability. No account creation required. No lengthy registration process. Just the essential information we need to start working for you immediately.",
        },
        {
          type: "box",
          text: "Step 2: A placement advocate reviews your profile within 24 hours. This is not an algorithm. It is a real person who understands the FQHC landscape in California, knows which organizations are hiring, and can identify the best matches based on your experience, location, and preferences. Your advocate will reach out to confirm your details and discuss your priorities.",
        },
        {
          type: "box",
          text: "Step 3: Your first FQHC introduction within 48 hours. Your advocate connects you directly with hiring managers at FQHCs that match your profile. This is not a cold application through an ATS. It is a warm introduction from a trusted source, which means your resume gets seen by a decision-maker &mdash; not filtered out by a keyword scanner.",
        },
        {
          type: "paragraph",
          text: "The entire process is completely free for candidates. There is no paywall, no premium tier, and no hidden fees. We built Fast-Track because displaced FQHC workers should not have to wait weeks or months to find their next role when health centers need them right now.",
        },
      ],
    },
    {
      heading: "5 Things to Do Right Now If You Have Been Laid Off",
      content: [
        {
          type: "paragraph",
          text: "Whether you just received your notice today or you have been searching for a few weeks, these five steps will put you in the strongest possible position to land your next FQHC role quickly:",
        },
        {
          type: "list",
          items: [
            "Fill out the Fast-Track form at /fast-track. This is the single highest-impact action you can take. It puts a dedicated placement advocate in your corner who will actively work to connect you with hiring FQHCs. It takes under 3 minutes and costs nothing.",
            "Build a free FQHC-optimized resume at /resume-builder. Our resume builder is designed specifically for community health roles. It uses templates that highlight the exact skills, programs, and competencies that FQHC hiring managers search for. Do not send out a generic resume when you can send one that speaks their language.",
            "Take the Career Insights Assessment. Integrated into the resume builder, this 12-question behavioral assessment identifies your strengths across four domains: Mission and Motivation, People and Communication, Execution and Adaptability, and Growth Mindset. Use the results to prepare for interviews and understand your competitive advantages.",
            "Update your LinkedIn profile with FQHC-specific keywords. Add terms like Enhanced Care Management, CalAIM, OCHIN Epic, Community Health Worker, care coordination, SDOH screening, and panel management. Many FQHC recruiters search LinkedIn for these exact terms, and having them in your profile increases your visibility dramatically.",
            "Browse open positions at /jobs. Our job board features 165 active listings across California FQHCs. Filter by region, role type, and program area to see what is available in your area right now. Even if you are using Fast-Track, browsing open positions helps you understand the current market and identify organizations you are interested in.",
          ],
        },
      ],
    },
    {
      heading:
        "Programs That Are Still Hiring",
      content: [
        {
          type: "paragraph",
          text: "While some FQHC programs are contracting, others are actively expanding &mdash; and they need experienced staff urgently. Understanding where the growth is happening helps you target your search and position yourself for roles with long-term stability.",
        },
        {
          type: "list",
          items: [
            "Enhanced Care Management (ECM) expansion under CalAIM: Despite some delays and restructuring, ECM remains one of the largest growth areas in California community health. Many FQHCs are still building out their ECM teams and need care coordinators, Community Health Workers, and case managers who already understand CalAIM documentation and panel management.",
            "Community Supports programs: The Community Supports benefit under CalAIM is creating new roles across housing navigation, medically tailored meals, recuperative care, and other social determinant interventions. FQHCs that have been approved as Community Supports providers are actively hiring staff to deliver these services.",
            "Behavioral Health Administrative Services Organization (BH-ASO) programs: As California expands behavioral health integration, FQHCs with BH-ASO contracts are hiring behavioral health specialists, substance use counselors, and care navigators to serve Medi-Cal members.",
            "Dental program expansion: Several FQHCs are expanding dental services under the Medi-Cal Dental program (formerly Denti-Cal), creating demand for dental assistants, dental hygienists, and front office staff with FQHC experience.",
            "Targeted Case Management (TCM): FQHCs providing TCM services continue to need experienced case managers who can document to Medi-Cal standards and navigate complex patient needs across multiple service systems.",
          ],
        },
        {
          type: "paragraph",
          text: "If you have experience in any of these program areas, you are positioned for roles that are not only available today but are likely to grow over the next several years as CalAIM implementation continues across the state.",
        },
      ],
    },
    {
      heading:
        "Your Rights as a Displaced Worker",
      content: [
        {
          type: "paragraph",
          text: "Being laid off is stressful, and it is easy to overlook the protections and benefits that are available to you. While this is not legal advice &mdash; and you should consult with an employment attorney or your local legal aid organization for guidance specific to your situation &mdash; here are some important things to be aware of as a displaced worker in California:",
        },
        {
          type: "list",
          items: [
            "WARN Act protections: Under California&apos;s Worker Adjustment and Retraining Notification Act, employers with 75 or more employees are generally required to provide 60 days&apos; advance notice of mass layoffs or plant closings. If your employer did not provide adequate notice, you may be entitled to back pay and benefits for the notice period.",
            "COBRA continuation coverage: If you had employer-sponsored health insurance, you are generally eligible to continue your coverage under COBRA for up to 18 months. While COBRA premiums can be expensive because you pay the full cost, it provides continuity of coverage while you transition to a new role. California also offers Cal-COBRA for employees of smaller employers.",
            "Unemployment insurance: You are likely eligible for California unemployment insurance benefits through the Employment Development Department (EDD). File your claim as soon as possible after your last day of work &mdash; there is a one-week unpaid waiting period before benefits begin.",
            "Medi-Cal coverage: If you lose your employer-sponsored insurance and your income drops, you may qualify for Medi-Cal coverage. As a community health professional, you understand the system &mdash; do not hesitate to use it for yourself and your family during this transition.",
            "Final paycheck and PTO payout: California law requires that your employer pay all wages earned through your last day of work, including accrued and unused vacation time, at the time of termination or within 72 hours if you resigned.",
          ],
        },
        {
          type: "paragraph",
          text: "Knowing your rights helps you navigate this transition with confidence and ensures you receive everything you are entitled to while you focus on finding your next role.",
        },
      ],
    },
    {
      heading: "Why We Built Fast-Track",
      content: [
        {
          type: "paragraph",
          text: "The FQHC Talent Exchange was built to connect community health professionals with the FQHCs that need them. But as we watched the wave of layoffs sweep across California in late 2025 and into 2026, we realized that our standard platform &mdash; as useful as it is &mdash; was not fast enough for workers who were suddenly without income and needed to find their next role immediately.",
        },
        {
          type: "paragraph",
          text: "That is why we built Fast-Track. It is a direct response to the displacement crisis happening right now in California community health. We talked to dozens of laid-off FQHC workers and heard the same frustrations over and over: they were applying to dozens of positions through generic job boards and hearing nothing back. They were watching their specialized experience get ignored by applicant tracking systems that could not distinguish an ECM care coordinator from a hospital discharge planner. They were spending weeks in hiring pipelines while their savings dwindled.",
        },
        {
          type: "paragraph",
          text: "Fast-Track cuts through all of that. It replaces the broken application process with a direct connection: a real person who knows the FQHC landscape, who has relationships with hiring managers across California, and who can make a warm introduction on your behalf within 48 hours. It is the tool we wish had existed when we first started hearing from displaced workers &mdash; and now it does.",
        },
        {
          type: "paragraph",
          text: "If you are reading this article because you have been laid off, or because you know someone who has, do not wait. Fill out the Fast-Track form today. It takes under 3 minutes, it costs nothing, and it could be the fastest path to your next chapter in community health.",
        },
      ],
    },
  ],
  ctaTitle: "Get Connected to Hiring FQHCs in 48 Hours",
  ctaDescription:
    "The Fast-Track program is free, takes under 3 minutes, and puts a dedicated placement advocate in your corner. Do not wait &mdash; start your Fast-Track profile now and get your first FQHC introduction within 48 hours.",
  ctaPrimaryButtonText: "Start Your Fast-Track Profile",
  ctaSecondaryButtonText: "Build Your Free Resume",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026",
      category: "Career Resources",
    },
    {
      href: "/blog/fqhc-vs-private-practice",
      title:
        "FQHC vs Private Practice: Which Is Right for Your Healthcare Career?",
      category: "Career Guidance",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Recursos Profesionales",
  title:
    "Te Despidieron de un FQHC? As&iacute; Puedes Ser Recontratado en 48 Horas",
  description:
    "Miles de trabajadores de salud comunitaria en California est&aacute;n siendo desplazados por recortes de fondos de Medi-Cal y reestructuraci&oacute;n de FQHCs. Pero muchos FQHCs a&uacute;n est&aacute;n contratando. Descubre c&oacute;mo el programa Fast-Track de FQHC Talent Exchange puede conectarte con tu pr&oacute;ximo puesto en 48 horas &mdash; completamente gratis.",
  breadcrumbTitle: "Despedido? Recontratado en 48 Horas",
  datePublished: "2026-02-15",
  dateDisplay: "15 de Febrero de 2026",
  readTime: "8 min",
  openingParagraph:
    "Si te despidieron recientemente de un Centro de Salud Calificado Federalmente, no est&aacute;s solo. En toda California, miles de trabajadores de salud comunitaria, coordinadores de atenci&oacute;n, asistentes m&eacute;dicos y gerentes de casos est&aacute;n siendo desplazados mientras los FQHCs navegan recortes de fondos de Medi-Cal, reestructuraci&oacute;n de programas y presupuestos m&aacute;s ajustados. Es una situaci&oacute;n dolorosa &mdash; pero aqu&iacute; est&aacute; la paradoja que la mayor&iacute;a de la gente no ve: muchos FQHCs est&aacute;n contratando simult&aacute;neamente. La demanda de profesionales experimentados en salud comunitaria no ha desaparecido. Se ha desplazado. Los programas est&aacute;n cerrando en algunas organizaciones mientras se expanden en otras. Si sabes d&oacute;nde buscar y c&oacute;mo posicionarte, tu experiencia en FQHC no es una desventaja &mdash; es la credencial m&aacute;s valiosa que tienes. FQHC Talent Exchange construy&oacute; el programa Fast-Track espec&iacute;ficamente para este momento: para ayudar a los trabajadores desplazados de FQHC a conectarse con su pr&oacute;ximo puesto en tan solo 48 horas.",
  sections: [
    {
      heading: "La Realidad: Por Qu&eacute; Tantos Trabajadores de FQHC Est&aacute;n Siendo Desplazados",
      content: [
        {
          type: "paragraph",
          text: "La ola de despidos que afecta a los FQHCs de California no es aleatoria. Es el resultado de varias fuerzas convergentes que se han estado acumulando durante meses. Las tasas de reembolso de Medi-Cal no han seguido el ritmo de los costos operativos en aumento. Algunos programas de CalAIM que se esperaba trajeran nuevos ingresos han sido retrasados o reestructurados. Los ciclos de subvenciones federales han creado brechas de financiamiento que los FQHCs m&aacute;s peque&ntilde;os no pueden cubrir. Y en algunos casos, la reestructuraci&oacute;n organizacional y las fusiones han eliminado puestos incluso cuando la demanda subyacente de servicios de salud comunitaria contin&uacute;a creciendo.",
        },
        {
          type: "paragraph",
          text: "El resultado es un mercado laboral que se siente contradictorio. Ves anuncios de despidos de un FQHC en la misma semana que otro FQHC en la misma regi&oacute;n publica una docena de posiciones abiertas. Un Trabajador de Salud Comunitaria pierde su puesto en una cl&iacute;nica porque no se renov&oacute; un contrato de ECM, mientras que tres otras cl&iacute;nicas est&aacute;n luchando por contratar personal de ECM porque sus programas se est&aacute;n expandiendo.",
        },
        {
          type: "paragraph",
          text: "Este no es un mercado donde no hay trabajos. Es un mercado donde las conexiones entre los trabajadores desplazados y las posiciones abiertas est&aacute;n rotas. FQHC Talent Exchange existe para arreglar esa conexi&oacute;n &mdash; y el programa Fast-Track fue construido para arreglarla r&aacute;pido.",
        },
      ],
    },
    {
      heading: "Por Qu&eacute; Tu Experiencia en FQHC Vale Oro",
      content: [
        {
          type: "paragraph",
          text: "Antes de empezar a dudar de tu trayectoria profesional, entiende algo importante: tu experiencia en FQHC no es experiencia gen&eacute;rica en salud. Es altamente especializada, profundamente valiosa y cada vez m&aacute;s dif&iacute;cil de encontrar para los centros de salud. Las habilidades que desarrollaste trabajando en salud comunitaria no se transfieren directamente desde sistemas hospitalarios o pr&aacute;cticas privadas. Los FQHCs necesitan personas que ya hayan hecho este trabajo &mdash; y esa persona eres t&uacute;.",
        },
        {
          type: "paragraph",
          text: "Considera lo que aportas. Si has trabajado en Enhanced Care Management o Complex Care Management, entiendes la estratificaci&oacute;n de panel, la documentaci&oacute;n de planes de atenci&oacute;n y los matices de coordinar servicios para pacientes de alta agudeza con necesidades m&eacute;dicas y sociales superpuestas. Si dominas OCHIN Epic, ya conoces el sistema de EHR que usa la mayor&iacute;a de los FQHCs de California &mdash; y capacitar a alguien en Epic desde cero toma meses. Si eres biling&uuml;e en ingl&eacute;s y espa&ntilde;ol, posees una habilidad que tiene una demanda extraordinariamente alta en todas las regiones del estado.",
        },
        {
          type: "list",
          items: [
            "Experiencia en programas ECM y CCM &mdash; entendiendo coordinaci&oacute;n de atenci&oacute;n, gesti&oacute;n de panel y requisitos de documentaci&oacute;n de CalAIM",
            "Dominio de OCHIN Epic &mdash; el sistema de EHR m&aacute;s com&uacute;n en los FQHCs de California, con una curva de aprendizaje pronunciada para nuevos usuarios",
            "Habilidades de comunicaci&oacute;n biling&uuml;e &mdash; cr&iacute;ticas para servir a las poblaciones de pacientes diversas y predominantemente hispanohablantes de California",
            "Navegaci&oacute;n de atenci&oacute;n administrada de Medi-Cal &mdash; flujos de trabajo de autorizaci&oacute;n, documentaci&oacute;n de cumplimiento y requisitos espec&iacute;ficos de planes",
            "Competencia en salud comunitaria &mdash; entendiendo evaluaci&oacute;n de SDOH, transferencias c&aacute;lidas, entrevista motivacional y atenci&oacute;n informada por trauma",
            "Experiencia en atenci&oacute;n en equipo &mdash; trabajando dentro de equipos de atenci&oacute;n integrados junto a proveedores, salud conductual y servicios sociales",
          ],
        },
        {
          type: "paragraph",
          text: "No est&aacute;s empezando desde cero. Eres uno de los candidatos m&aacute;s calificados del mercado. El desaf&iacute;o no son tus habilidades &mdash; es llegar al gerente de contrataci&oacute;n correcto en el FQHC correcto en el momento correcto. Eso es exactamente lo que hace Fast-Track.",
        },
      ],
    },
    {
      heading: "El Proceso Fast-Track de 48 Horas",
      content: [
        {
          type: "paragraph",
          text: "El programa Fast-Track de FQHC Talent Exchange fue dise&ntilde;ado espec&iacute;ficamente para trabajadores de salud comunitaria desplazados que necesitan moverse r&aacute;pido. No es una bolsa de trabajo donde publicas un curr&iacute;culum y esperas. Es un proceso activo de colocaci&oacute;n con un defensor dedicado que trabaja en tu nombre para conectarte con FQHCs que est&aacute;n contratando ahora mismo.",
        },
        {
          type: "paragraph",
          text: "As&iacute; es como funciona:",
        },
        {
          type: "box",
          text: "Paso 1: Llena el formulario Fast-Track. Toma menos de 3 minutos. Compartir&aacute;s tu rol, tu nivel de experiencia, tu ubicaci&oacute;n, tus habilidades clave (ECM, Epic, biling&uuml;e, etc.) y tu disponibilidad. No se requiere crear una cuenta. Sin proceso de registro largo. Solo la informaci&oacute;n esencial que necesitamos para empezar a trabajar para ti de inmediato.",
        },
        {
          type: "box",
          text: "Paso 2: Un defensor de colocaci&oacute;n revisa tu perfil dentro de 24 horas. Esto no es un algoritmo. Es una persona real que entiende el panorama de los FQHCs en California, sabe qu&eacute; organizaciones est&aacute;n contratando y puede identificar las mejores coincidencias basadas en tu experiencia, ubicaci&oacute;n y preferencias.",
        },
        {
          type: "box",
          text: "Paso 3: Tu primera introducci&oacute;n a un FQHC dentro de 48 horas. Tu defensor te conecta directamente con gerentes de contrataci&oacute;n en FQHCs que coinciden con tu perfil. Esta no es una solicitud fr&iacute;a a trav&eacute;s de un ATS. Es una introducci&oacute;n c&aacute;lida de una fuente confiable, lo que significa que tu curr&iacute;culum es visto por un tomador de decisiones &mdash; no filtrado por un esc&aacute;ner de palabras clave.",
        },
        {
          type: "paragraph",
          text: "Todo el proceso es completamente gratuito para los candidatos. No hay muro de pago, no hay nivel premium y no hay tarifas ocultas. Construimos Fast-Track porque los trabajadores desplazados de FQHC no deber&iacute;an tener que esperar semanas o meses para encontrar su pr&oacute;ximo puesto cuando los centros de salud los necesitan ahora mismo.",
        },
      ],
    },
    {
      heading: "5 Cosas que Hacer Ahora Mismo si Te Han Despedido",
      content: [
        {
          type: "paragraph",
          text: "Ya sea que recibiste tu aviso hoy o hayas estado buscando durante algunas semanas, estos cinco pasos te pondr&aacute;n en la posici&oacute;n m&aacute;s fuerte posible para conseguir tu pr&oacute;ximo puesto en un FQHC r&aacute;pidamente:",
        },
        {
          type: "list",
          items: [
            "Llena el formulario Fast-Track en /fast-track. Esta es la acci&oacute;n de mayor impacto que puedes tomar. Pone a un defensor de colocaci&oacute;n dedicado a tu lado que trabajar&aacute; activamente para conectarte con FQHCs que est&aacute;n contratando. Toma menos de 3 minutos y no cuesta nada.",
            "Crea un curr&iacute;culum optimizado para FQHC gratis en /resume-builder. Nuestro constructor de curr&iacute;culum est&aacute; dise&ntilde;ado espec&iacute;ficamente para roles de salud comunitaria. Usa plantillas que destacan las habilidades, programas y competencias exactas que buscan los gerentes de contrataci&oacute;n de FQHC.",
            "Toma la Evaluaci&oacute;n de Perspectivas de Carrera. Integrada en el constructor de curr&iacute;culum, esta evaluaci&oacute;n conductual de 12 preguntas identifica tus fortalezas en cuatro dominios: Misi&oacute;n y Motivaci&oacute;n, Personas y Comunicaci&oacute;n, Ejecuci&oacute;n y Adaptabilidad, y Mentalidad de Crecimiento.",
            "Actualiza tu perfil de LinkedIn con palabras clave espec&iacute;ficas de FQHC. Agrega t&eacute;rminos como Enhanced Care Management, CalAIM, OCHIN Epic, Community Health Worker, coordinaci&oacute;n de atenci&oacute;n, evaluaci&oacute;n de SDOH y gesti&oacute;n de panel.",
            "Explora posiciones abiertas en /jobs. Nuestra bolsa de trabajo presenta 165 listados activos en FQHCs de California. Filtra por regi&oacute;n, tipo de rol y &aacute;rea de programa para ver qu&eacute; est&aacute; disponible en tu zona ahora mismo.",
          ],
        },
      ],
    },
    {
      heading: "Programas que A&uacute;n Est&aacute;n Contratando",
      content: [
        {
          type: "paragraph",
          text: "Mientras algunos programas de FQHC se est&aacute;n contrayendo, otros se est&aacute;n expandiendo activamente &mdash; y necesitan personal experimentado con urgencia. Entender d&oacute;nde est&aacute; ocurriendo el crecimiento te ayuda a dirigir tu b&uacute;squeda y posicionarte para roles con estabilidad a largo plazo.",
        },
        {
          type: "list",
          items: [
            "Expansi&oacute;n de Enhanced Care Management (ECM) bajo CalAIM: A pesar de algunos retrasos y reestructuraciones, ECM sigue siendo una de las mayores &aacute;reas de crecimiento en salud comunitaria de California. Muchos FQHCs a&uacute;n est&aacute;n construyendo sus equipos de ECM.",
            "Programas de Community Supports: El beneficio de Community Supports bajo CalAIM est&aacute; creando nuevos roles en navegaci&oacute;n de vivienda, comidas m&eacute;dicamente adaptadas, atenci&oacute;n de recuperaci&oacute;n y otras intervenciones de determinantes sociales.",
            "Programas de Behavioral Health Administrative Services Organization (BH-ASO): A medida que California expande la integraci&oacute;n de salud conductual, los FQHCs con contratos BH-ASO est&aacute;n contratando especialistas en salud conductual y consejeros de uso de sustancias.",
            "Expansi&oacute;n de programas dentales: Varios FQHCs est&aacute;n expandiendo servicios dentales bajo el programa Medi-Cal Dental, creando demanda de asistentes dentales, higienistas y personal de recepci&oacute;n con experiencia en FQHC.",
            "Targeted Case Management (TCM): Los FQHCs que proporcionan servicios de TCM contin&uacute;an necesitando gerentes de casos experimentados que puedan documentar seg&uacute;n los est&aacute;ndares de Medi-Cal.",
          ],
        },
        {
          type: "paragraph",
          text: "Si tienes experiencia en cualquiera de estas &aacute;reas de programa, est&aacute;s posicionado para roles que no solo est&aacute;n disponibles hoy sino que probablemente crecer&aacute;n en los pr&oacute;ximos a&ntilde;os a medida que la implementaci&oacute;n de CalAIM contin&uacute;e en todo el estado.",
        },
      ],
    },
    {
      heading: "Tus Derechos como Trabajador Desplazado",
      content: [
        {
          type: "paragraph",
          text: "Ser despedido es estresante, y es f&aacute;cil pasar por alto las protecciones y beneficios que est&aacute;n disponibles para ti. Aunque esto no es asesor&iacute;a legal &mdash; y deber&iacute;as consultar con un abogado laboral o tu organizaci&oacute;n local de asistencia legal para orientaci&oacute;n espec&iacute;fica a tu situaci&oacute;n &mdash; aqu&iacute; hay algunas cosas importantes a tener en cuenta como trabajador desplazado en California:",
        },
        {
          type: "list",
          items: [
            "Protecciones de la Ley WARN: Bajo la Ley de Notificaci&oacute;n de Ajuste y Recapacitaci&oacute;n del Trabajador de California, los empleadores con 75 o m&aacute;s empleados generalmente deben proporcionar 60 d&iacute;as de aviso anticipado de despidos masivos o cierres de plantas.",
            "Cobertura de continuaci&oacute;n COBRA: Si ten&iacute;as seguro m&eacute;dico patrocinado por el empleador, generalmente eres elegible para continuar tu cobertura bajo COBRA por hasta 18 meses. California tambi&eacute;n ofrece Cal-COBRA para empleados de empleadores m&aacute;s peque&ntilde;os.",
            "Seguro de desempleo: Probablemente eres elegible para beneficios de seguro de desempleo de California a trav&eacute;s del Departamento de Desarrollo del Empleo (EDD). Presenta tu reclamo lo antes posible despu&eacute;s de tu &uacute;ltimo d&iacute;a de trabajo.",
            "Cobertura de Medi-Cal: Si pierdes tu seguro patrocinado por el empleador y tus ingresos bajan, puedes calificar para cobertura de Medi-Cal. Como profesional de salud comunitaria, entiendes el sistema &mdash; no dudes en usarlo para ti y tu familia durante esta transici&oacute;n.",
            "Pago final y pago de PTO: La ley de California requiere que tu empleador pague todos los salarios ganados hasta tu &uacute;ltimo d&iacute;a de trabajo, incluyendo el tiempo de vacaciones acumulado y no utilizado, al momento del despido.",
          ],
        },
        {
          type: "paragraph",
          text: "Conocer tus derechos te ayuda a navegar esta transici&oacute;n con confianza y asegura que recibas todo a lo que tienes derecho mientras te enfocas en encontrar tu pr&oacute;ximo puesto.",
        },
      ],
    },
    {
      heading: "Por Qu&eacute; Construimos Fast-Track",
      content: [
        {
          type: "paragraph",
          text: "FQHC Talent Exchange fue construido para conectar a profesionales de salud comunitaria con los FQHCs que los necesitan. Pero al ver la ola de despidos barrer California a fines de 2025 y en 2026, nos dimos cuenta de que nuestra plataforma est&aacute;ndar &mdash; tan &uacute;til como es &mdash; no era lo suficientemente r&aacute;pida para trabajadores que de repente estaban sin ingresos y necesitaban encontrar su pr&oacute;ximo puesto de inmediato.",
        },
        {
          type: "paragraph",
          text: "Por eso construimos Fast-Track. Es una respuesta directa a la crisis de desplazamiento que est&aacute; ocurriendo ahora mismo en la salud comunitaria de California. Hablamos con docenas de trabajadores despedidos de FQHCs y escuchamos las mismas frustraciones una y otra vez: estaban aplicando a docenas de posiciones a trav&eacute;s de bolsas de trabajo gen&eacute;ricas y no escuchaban nada. Estaban viendo c&oacute;mo su experiencia especializada era ignorada por sistemas de seguimiento de candidatos que no pod&iacute;an distinguir un coordinador de atenci&oacute;n de ECM de un planificador de altas hospitalarias.",
        },
        {
          type: "paragraph",
          text: "Fast-Track corta todo eso. Reemplaza el proceso de aplicaci&oacute;n roto con una conexi&oacute;n directa: una persona real que conoce el panorama de los FQHCs, que tiene relaciones con gerentes de contrataci&oacute;n en toda California y que puede hacer una introducci&oacute;n c&aacute;lida en tu nombre dentro de 48 horas.",
        },
        {
          type: "paragraph",
          text: "Si est&aacute;s leyendo este art&iacute;culo porque te han despedido, o porque conoces a alguien que lo fue, no esperes. Llena el formulario Fast-Track hoy. Toma menos de 3 minutos, no cuesta nada y podr&iacute;a ser el camino m&aacute;s r&aacute;pido a tu pr&oacute;ximo cap&iacute;tulo en salud comunitaria.",
        },
      ],
    },
  ],
  ctaTitle: "Con&eacute;ctate con FQHCs que Est&aacute;n Contratando en 48 Horas",
  ctaDescription:
    "El programa Fast-Track es gratuito, toma menos de 3 minutos y pone a un defensor de colocaci&oacute;n dedicado a tu lado. No esperes &mdash; comienza tu perfil Fast-Track ahora y recibe tu primera introducci&oacute;n a un FQHC dentro de 48 horas.",
  ctaPrimaryButtonText: "Comienza Tu Perfil Fast-Track",
  ctaSecondaryButtonText: "Crea Tu CV Gratis",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Recortes de Fondos de Medi-Cal: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber en 2026",
      category: "Recursos Profesionales",
    },
    {
      href: "/blog/fqhc-vs-private-practice",
      title:
        "FQHC vs Pr&aacute;ctica Privada: Cu&aacute;l Es la Mejor Opci&oacute;n para Tu Carrera en Salud?",
      category: "Gu&iacute;a Profesional",
    },
  ],
};

export default function LaidOffFqhcFastTrackArticle() {
  const locale = useLocale();
  const content = locale === "es" ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title={content.title}
        description={content.description}
        datePublished={content.datePublished}
        slug="laid-off-fqhc-fast-track-job-search"
      />
      <BreadcrumbJsonLd
        items={[
          { name: locale === "es" ? "Inicio" : "Home", url: "https://fqhctalent.com" },
          { name: "Blog", url: "https://fqhctalent.com/blog" },
          {
            name: content.breadcrumbTitle,
            url: "https://fqhctalent.com/blog/laid-off-fqhc-fast-track-job-search",
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
                      <div key={itemIdx} className="bg-teal-50 border border-teal-200 rounded-lg p-6 my-6">
                        <p className="text-stone-700 leading-relaxed">{item.text}</p>
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/fast-track"
                className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-800 transition-colors"
              >
                {content.ctaPrimaryButtonText}
              </a>
              <a
                href="/resume-builder"
                className="inline-flex items-center justify-center rounded-lg border-2 border-teal-700 px-8 py-4 text-lg font-semibold text-teal-700 hover:bg-teal-100 transition-colors"
              >
                {content.ctaSecondaryButtonText}
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-stone-900 mb-6">
              {locale === "es" ? "Art&iacute;culos Relacionados" : "Related Articles"}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content.relatedArticles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.href}
                  className="bg-stone-50 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <p className="text-sm text-teal-700 mb-2">{article.category}</p>
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
