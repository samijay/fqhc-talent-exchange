import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { TLDRCard, StatCallout } from "@/components/blog/BlogDataViz";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { ContentViewTracker } from "@/components/content/ContentViewTracker";
import { BlogArticleToolbar } from "@/components/blog/BlogArticleToolbar";
import { AuthorByline } from "@/components/blog/AuthorByline";
import { InlineShareButtons } from "@/components/blog/InlineShareButtons";
import { BlogPrevNext } from "@/components/blog/BlogPrevNext";

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
      type: "paragraph" | "list";
      text?: string;
      items?: string[];
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
  category: "Technology & AI",
  title:
    "AI Scribes at FQHCs: What Community Health Workers Need to Know in 2026",
  description:
    "66% of physicians now use AI scribes. Learn how ambient AI documentation is changing FQHC workflows, reducing burnout, and what it means for your role.",
  breadcrumbTitle: "AI Scribes at FQHCs",
  datePublished: "2026-03-09",
  dateDisplay: "March 9, 2026",
  readTime: "9 min read",
  openingParagraph:
    "If you work at a community health center, you have probably heard the buzz about AI scribes. Maybe your clinic just rolled one out, or maybe your provider is suddenly finishing charts in real time instead of staying late. AI-powered documentation tools are spreading fast across FQHCs — and whether you are a medical assistant, care coordinator, nurse, or provider, this shift will affect your daily work. Here is a plain-language guide to what is happening, why it matters, and how to prepare.",
  sections: [
    {
      heading: "What Are AI Scribes and Why Are FQHCs Adopting Them?",
      content: [
        {
          type: "paragraph",
          text: "An AI scribe is software that listens to a patient visit and automatically writes the clinical note. It uses ambient listening — meaning it runs in the background during the conversation, captures what is said, and drafts a structured note for the provider to review and sign. No typing during the visit. No staying late to finish charts.",
        },
        {
          type: "paragraph",
          text: "The adoption rate has been dramatic. According to the American Medical Association, the share of physicians using AI in clinical practice jumped from 38% in 2023 to 66% in 2024 — nearly doubling in a single year. For FQHCs, this is not a luxury upgrade. It is a burnout solution. Community health providers carry heavy patient panels, serve complex populations, and spend hours on documentation that does not generate revenue. AI scribes promise to give that time back.",
        },
        {
          type: "paragraph",
          text: "In November 2025, the National Association of Community Health Centers (NACHC) partnered with eClinicalWorks to bring AI-powered tools directly to community health centers nationwide. That partnership sent a clear signal: AI documentation is no longer optional for the safety net — it is becoming standard.",
        },
      ],
    },
    {
      heading: "Which FQHCs Are Already Using AI Scribes?",
      content: [
        {
          type: "paragraph",
          text: "AI scribe adoption at FQHCs is moving faster than many workers realize. Here are real examples from the community health sector:",
        },
        {
          type: "list",
          items: [
            "AltaMed Health Services (Los Angeles) deployed Abridge, the AI scribe that won Best in KLAS 2026 for ambient AI. Abridge supports 28 languages and serves AltaMed's 500,000+ patients across 60+ sites.",
            "Imperial Beach Community Clinic (San Diego) adopted eClinicalWorks with the Sunoh.ai ambient scribe — a smaller California FQHC embracing the same technology as large systems.",
            "Sun River Health (New York) reported that one provider documented 26 patient encounters in just 30 minutes using AI-assisted tools, compared to hours of manual charting.",
            "athenahealth launched athenaAmbient in February 2026 — a free ambient AI scribe available to all athenahealth customers. Any FQHC on athenahealth now has access at no extra cost.",
            "NextGen Healthcare's Ambient Assist has eliminated what rural FQHC providers call 'pajama time' — the hours spent finishing charts at home after clinic hours.",
          ],
        },
        {
          type: "paragraph",
          text: "Newer entrants are also expanding options. Anthropic launched Claude for Healthcare in January 2026, offering a HIPAA-ready AI platform. Elation Health integrated Claude and reported a 61% reduction in chart review time. The NACHC AI Action Guide, published in September 2025, gives health centers a step-by-step framework for evaluating and adopting these tools.",
        },
      ],
    },
    {
      heading: "How AI Scribes Change Daily Workflows",
      content: [
        {
          type: "paragraph",
          text: "For providers, the change is immediate and measurable. A study of 263 physicians found that burnout rates dropped from 51.9% to 38.8% after adopting ambient AI documentation. Providers spend less time on screens and more time looking at patients. Charts get closed the same day instead of piling up over the weekend.",
        },
        {
          type: "paragraph",
          text: "But providers are not the only ones affected. If you are a medical assistant, your rooming workflow may change. Some clinics are training MAs to start the AI recording during intake and pause it during transitions. If you are a care coordinator, AI-generated notes can actually make your job easier — visit summaries are more complete, making follow-up tasks and referrals clearer. If you are a nurse or LVN, you may see providers finishing visits faster, which changes patient flow and scheduling.",
        },
        {
          type: "paragraph",
          text: "The key point: AI scribes do not replace people. They change how people spend their time. The note-writing shrinks. The patient care, coordination, and follow-up stay — and often grow because providers now have capacity for more visits.",
        },
      ],
    },
    {
      heading: "The Cost Barrier — and Who Is Closing the Gap",
      content: [
        {
          type: "paragraph",
          text: "The biggest obstacle for FQHCs is cost. About 60% of community health centers cite cost as the primary barrier to AI adoption, and that number rises to 70% for rural health centers. AI scribe subscriptions typically run $200-500 per provider per month — a real stretch for safety-net clinics operating on thin PPS margins.",
        },
        {
          type: "paragraph",
          text: "Several developments are closing this gap. The NACHC-eClinicalWorks partnership aims to make AI tools more affordable for CHCs. athenahealth's decision to offer ambient AI for free removes the cost barrier entirely for its customers. And vendors like Abridge and Sunoh.ai are competing on FQHC-specific pricing, recognizing that community health centers are the fastest-growing segment of the ambulatory care market.",
        },
        {
          type: "paragraph",
          text: "If your FQHC has not adopted an AI scribe yet, it is likely a matter of when, not if. The economics are shifting fast — especially as EHR vendors bundle AI into their existing contracts rather than charging extra.",
        },
      ],
    },
    {
      heading: "What Workers Should Watch Out For",
      content: [
        {
          type: "paragraph",
          text: "AI scribes are not without concerns. One issue getting attention from researchers is the risk of a coding arms race. When AI generates notes, those notes tend to capture more detail — which can lead to higher billing codes. Riverside Health, a large health system, saw an 11% increase in work relative value units (wRVUs) and a 14% increase in hierarchical condition category (HCC) diagnoses after implementing ambient AI. While more accurate coding is legitimate, the concern is that AI could push documentation toward upcoding — billing for more than what was clinically justified.",
        },
        {
          type: "paragraph",
          text: "For FQHC workers, here is what to keep in mind:",
        },
        {
          type: "list",
          items: [
            "Your job is safe — AI scribes reduce documentation burden, they do not replace clinical staff, MAs, or care coordinators. FQHCs are already understaffed; AI helps the existing team do more, not less.",
            "Your role may shift — expect new tasks like managing AI recording devices, reviewing AI-generated note accuracy, or helping patients understand why a device is in the room.",
            "Privacy matters — patients need to consent to AI listening. Know your clinic's consent workflow. Some patients, especially undocumented communities, may have concerns about recordings.",
            "Push for training — if your FQHC adopts an AI scribe, ask for formal training. The best implementations include all staff, not just providers.",
            "Watch the coding — if you work in billing or revenue cycle, pay attention to whether AI-generated notes are changing coding patterns. Accurate coding is good. Systematic upcoding is a compliance risk.",
          ],
        },
      ],
    },
    {
      heading: "How to Prepare for AI at Your FQHC",
      content: [
        {
          type: "paragraph",
          text: "Whether your clinic has already adopted AI or is still evaluating options, you can take steps now to be ready:",
        },
        {
          type: "list",
          items: [
            "Learn the basics — understand what ambient AI does and does not do. The NACHC AI Action Guide (September 2025) is a free, plain-language resource designed for community health centers.",
            "Ask your leadership — find out where your FQHC stands on AI adoption. Is it in the budget? Is there a pilot planned? Which EHR vendor's AI tool is being considered?",
            "Highlight your adaptability — on your resume and in interviews, mention experience with EHR systems, workflow optimization, and technology adoption. These skills are increasingly valued.",
            "Track the landscape — our AI Tracker page monitors which vendors, EHR systems, and FQHCs are adopting AI tools. Stay informed so you are not caught off guard.",
            "Talk to your team — the most successful AI implementations happen when the whole care team is involved in planning, not just IT and leadership. Share what you learn with coworkers.",
          ],
        },
        {
          type: "paragraph",
          text: "AI scribes are not a passing trend. They are becoming part of the standard FQHC toolkit alongside your EHR, your patient portal, and your care coordination workflows. The workers who engage early — who learn, ask questions, and adapt — will be the ones best positioned as community health centers continue to evolve.",
        },
      ],
    },
  ],
  ctaTitle: "Stay Ahead of AI in Community Health",
  ctaDescription:
    "Track AI adoption across FQHCs, find your next role at a forward-thinking health center, and build a resume that highlights your technology skills.",
  ctaButtonText: "Build Your Free Resume",
  relatedArticles: [
    {
      href: "/blog/healthcare-hiring-trends-2026",
      title:
        "Healthcare Hiring Trends 2026: What the Jobs Data Tells Us About FQHC Careers",
    },
    {
      href: "/blog/fqhc-salary-negotiation-guide",
      title: "How to Negotiate Your FQHC Salary",
    },
    {
      href: "/blog/working-at-top-of-scope-fqhc",
      title: "Working at Top of Scope: What It Means at an FQHC",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Tecnología e IA",
  title:
    "Escribas de IA en los FQHCs: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber en 2026",
  description:
    "El 66% de los médicos ya usan escribas de IA. Conoce cómo la documentación ambiental con IA está cambiando los flujos de trabajo en FQHCs y qué significa para tu rol.",
  breadcrumbTitle: "Escribas de IA en FQHCs",
  datePublished: "2026-03-09",
  dateDisplay: "9 de Marzo de 2026",
  readTime: "9 min de lectura",
  openingParagraph:
    "Si trabajas en un centro de salud comunitario, probablemente ya escuchaste hablar de los escribas de inteligencia artificial. Quizás tu clínica acaba de implementar uno, o tu proveedor de repente termina las notas clínicas en tiempo real en lugar de quedarse tarde. Las herramientas de documentación con IA se están expandiendo rápidamente en los FQHCs — y ya seas asistente médico, coordinador de atención, enfermera o proveedor, este cambio va a afectar tu trabajo diario. Esta es una guía en lenguaje sencillo sobre lo que está pasando, por qué importa, y cómo prepararte.",
  sections: [
    {
      heading: "¿Qué Son los Escribas de IA y Por Qué los FQHCs los Están Adoptando?",
      content: [
        {
          type: "paragraph",
          text: "Un escriba de IA es un software que escucha la visita del paciente y automáticamente redacta la nota clínica. Usa escucha ambiental — es decir, funciona en segundo plano durante la conversación, captura lo que se dice, y redacta una nota estructurada para que el proveedor la revise y firme. Sin teclear durante la visita. Sin quedarse tarde para terminar notas.",
        },
        {
          type: "paragraph",
          text: "La velocidad de adopción ha sido impresionante. Según la Asociación Médica Americana (AMA), el porcentaje de médicos usando IA en la práctica clínica saltó del 38% en 2023 al 66% en 2024 — casi se duplicó en un solo año. Para los FQHCs, esto no es un lujo. Es una solución contra el agotamiento laboral. Los proveedores de salud comunitaria manejan paneles de pacientes pesados, atienden poblaciones complejas, y pasan horas documentando actividades que no generan ingresos. Los escribas de IA prometen devolver ese tiempo.",
        },
        {
          type: "paragraph",
          text: "En noviembre de 2025, la Asociación Nacional de Centros de Salud Comunitarios (NACHC) se asoció con eClinicalWorks para llevar herramientas de IA directamente a los centros de salud comunitarios a nivel nacional. Esa alianza envió un mensaje claro: la documentación con IA ya no es opcional para la red de seguridad — se está convirtiendo en estándar.",
        },
      ],
    },
    {
      heading: "¿Cuáles FQHCs Ya Están Usando Escribas de IA?",
      content: [
        {
          type: "paragraph",
          text: "La adopción de escribas de IA en FQHCs avanza más rápido de lo que muchos trabajadores creen. Estos son ejemplos reales del sector de salud comunitaria:",
        },
        {
          type: "list",
          items: [
            "AltaMed Health Services (Los Ángeles) implementó Abridge, el escriba de IA que ganó Best in KLAS 2026 para IA ambiental. Abridge soporta 28 idiomas y atiende a los más de 500,000 pacientes de AltaMed en más de 60 sitios.",
            "Imperial Beach Community Clinic (San Diego) adoptó eClinicalWorks con el escriba ambiental Sunoh.ai — un FQHC pequeño de California adoptando la misma tecnología que los grandes sistemas.",
            "Sun River Health (Nueva York) reportó que un proveedor documentó 26 encuentros con pacientes en solo 30 minutos usando herramientas asistidas por IA, comparado con horas de documentación manual.",
            "athenahealth lanzó athenaAmbient en febrero de 2026 — un escriba de IA ambiental gratuito disponible para todos los clientes de athenahealth. Cualquier FQHC con athenahealth ahora tiene acceso sin costo adicional.",
            "Ambient Assist de NextGen Healthcare ha eliminado lo que los proveedores rurales llaman 'tiempo en pijama' — las horas que pasan terminando notas en casa después del horario de clínica.",
          ],
        },
        {
          type: "paragraph",
          text: "Nuevos actores también están ampliando las opciones. Anthropic lanzó Claude for Healthcare en enero de 2026, ofreciendo una plataforma de IA lista para HIPAA. Elation Health integró Claude y reportó una reducción del 61% en el tiempo de revisión de expedientes. La Guía de Acción de IA de NACHC, publicada en septiembre de 2025, ofrece a los centros de salud un marco paso a paso para evaluar y adoptar estas herramientas.",
        },
      ],
    },
    {
      heading: "Cómo los Escribas de IA Cambian los Flujos de Trabajo Diarios",
      content: [
        {
          type: "paragraph",
          text: "Para los proveedores, el cambio es inmediato y medible. Un estudio con 263 médicos encontró que las tasas de agotamiento laboral bajaron del 51.9% al 38.8% después de adoptar documentación ambiental con IA. Los proveedores pasan menos tiempo frente a pantallas y más tiempo mirando a sus pacientes. Las notas se cierran el mismo día en lugar de acumularse durante el fin de semana.",
        },
        {
          type: "paragraph",
          text: "Pero los proveedores no son los únicos afectados. Si eres asistente médico, tu flujo de trabajo al preparar el cuarto puede cambiar. Algunas clínicas están entrenando a los MAs para iniciar la grabación de IA durante la toma de signos vitales y pausarla durante transiciones. Si eres coordinador de atención, las notas generadas por IA pueden facilitar tu trabajo — los resúmenes de visita son más completos, lo que hace más claras las tareas de seguimiento y las referencias. Si eres enfermera o LVN, puedes notar que los proveedores terminan las visitas más rápido, lo que cambia el flujo de pacientes y la programación.",
        },
        {
          type: "paragraph",
          text: "El punto clave: los escribas de IA no reemplazan personas. Cambian cómo las personas usan su tiempo. La escritura de notas se reduce. La atención al paciente, la coordinación y el seguimiento permanecen — y a menudo crecen porque los proveedores ahora tienen capacidad para más visitas.",
        },
      ],
    },
    {
      heading: "La Barrera del Costo — y Quién la Está Cerrando",
      content: [
        {
          type: "paragraph",
          text: "El mayor obstáculo para los FQHCs es el costo. Aproximadamente el 60% de los centros de salud comunitarios citan el costo como la barrera principal para adoptar IA, y ese número sube al 70% en centros de salud rurales. Las suscripciones de escribas de IA cuestan típicamente entre $200 y $500 por proveedor al mes — un esfuerzo real para clínicas de red de seguridad que operan con márgenes PPS ajustados.",
        },
        {
          type: "paragraph",
          text: "Varios desarrollos están cerrando esta brecha. La alianza NACHC-eClinicalWorks busca hacer las herramientas de IA más accesibles para los CHCs. La decisión de athenahealth de ofrecer IA ambiental gratis elimina la barrera de costo por completo para sus clientes. Y proveedores como Abridge y Sunoh.ai están compitiendo con precios específicos para FQHCs, reconociendo que los centros de salud comunitarios son el segmento de más rápido crecimiento del mercado de atención ambulatoria.",
        },
        {
          type: "paragraph",
          text: "Si tu FQHC aún no ha adoptado un escriba de IA, probablemente sea cuestión de cuándo, no de si lo hará. La economía está cambiando rápido — especialmente a medida que los proveedores de EHR incluyen IA en sus contratos existentes en lugar de cobrar extra.",
        },
      ],
    },
    {
      heading: "Lo Que los Trabajadores Deben Vigilar",
      content: [
        {
          type: "paragraph",
          text: "Los escribas de IA no están libres de preocupaciones. Un tema que está recibiendo atención de investigadores es el riesgo de una carrera armamentista de codificación. Cuando la IA genera notas, esas notas tienden a capturar más detalle — lo que puede llevar a códigos de facturación más altos. Riverside Health, un sistema de salud grande, vio un aumento del 11% en unidades de valor relativo de trabajo (wRVUs) y un aumento del 14% en diagnósticos de categorías de condiciones jerárquicas (HCC) después de implementar IA ambiental. Aunque una codificación más precisa es legítima, la preocupación es que la IA podría empujar la documentación hacia la sobrecodificación — facturar por más de lo que clínicamente se justificó.",
        },
        {
          type: "paragraph",
          text: "Para los trabajadores de FQHCs, esto es lo que deben tener en cuenta:",
        },
        {
          type: "list",
          items: [
            "Tu trabajo está seguro — los escribas de IA reducen la carga de documentación, no reemplazan al personal clínico, MAs ni coordinadores de atención. Los FQHCs ya están cortos de personal; la IA ayuda al equipo existente a hacer más, no menos.",
            "Tu rol puede cambiar — espera nuevas tareas como manejar dispositivos de grabación de IA, revisar la precisión de notas generadas por IA, o ayudar a los pacientes a entender por qué hay un dispositivo en el cuarto.",
            "La privacidad importa — los pacientes necesitan dar consentimiento para que la IA escuche. Conoce el proceso de consentimiento de tu clínica. Algunos pacientes, especialmente comunidades indocumentadas, pueden tener preocupaciones sobre las grabaciones.",
            "Pide capacitación — si tu FQHC adopta un escriba de IA, pide entrenamiento formal. Las mejores implementaciones incluyen a todo el personal, no solo a los proveedores.",
            "Vigila la codificación — si trabajas en facturación o ciclo de ingresos, presta atención a si las notas generadas por IA están cambiando los patrones de codificación. La codificación precisa es buena. La sobrecodificación sistemática es un riesgo de cumplimiento.",
          ],
        },
      ],
    },
    {
      heading: "Cómo Prepararte para la IA en Tu FQHC",
      content: [
        {
          type: "paragraph",
          text: "Ya sea que tu clínica haya adoptado IA o todavía esté evaluando opciones, puedes tomar pasos ahora para estar listo/a:",
        },
        {
          type: "list",
          items: [
            "Aprende lo básico — entiende qué hace y qué no hace la IA ambiental. La Guía de Acción de IA de NACHC (septiembre 2025) es un recurso gratuito y en lenguaje sencillo diseñado para centros de salud comunitarios.",
            "Pregunta a tu liderazgo — averigua dónde está tu FQHC en cuanto a la adopción de IA. ¿Está en el presupuesto? ¿Hay un piloto planeado? ¿Qué herramienta de IA del proveedor de EHR se está considerando?",
            "Destaca tu adaptabilidad — en tu currículum y en entrevistas, menciona experiencia con sistemas EHR, optimización de flujos de trabajo, y adopción de tecnología. Estas habilidades son cada vez más valoradas.",
            "Monitorea el panorama — nuestra página de Rastreador de IA monitorea qué proveedores, sistemas EHR y FQHCs están adoptando herramientas de IA. Mantente informado/a para no ser tomado/a por sorpresa.",
            "Habla con tu equipo — las implementaciones de IA más exitosas ocurren cuando todo el equipo de atención participa en la planificación, no solo TI y el liderazgo. Comparte lo que aprendas con tus compañeros.",
          ],
        },
        {
          type: "paragraph",
          text: "Los escribas de IA no son una moda pasajera. Se están convirtiendo en parte del kit de herramientas estándar del FQHC junto a tu EHR, tu portal de pacientes y tus flujos de coordinación de atención. Los trabajadores que se involucren temprano — que aprendan, hagan preguntas y se adapten — serán los mejor posicionados a medida que los centros de salud comunitarios continúen evolucionando.",
        },
      ],
    },
  ],
  ctaTitle: "Mantente al Día con la IA en Salud Comunitaria",
  ctaDescription:
    "Monitorea la adopción de IA en FQHCs, encuentra tu próximo rol en un centro de salud innovador, y construye un currículum que destaque tus habilidades tecnológicas.",
  ctaButtonText: "Crea Tu CV Gratis",
  relatedArticles: [
    {
      href: "/blog/healthcare-hiring-trends-2026",
      title:
        "Tendencias de Contratación en Salud 2026: Lo Que los Datos Revelan Sobre Carreras en FQHCs",
    },
    {
      href: "/blog/fqhc-salary-negotiation-guide",
      title: "Cómo Negociar Tu Salario en un FQHC",
    },
    {
      href: "/blog/working-at-top-of-scope-fqhc",
      title: "Trabajar al Máximo de Tu Alcance Profesional en un FQHC",
    },
  ],
};

export default async function FQHCAIScribesArticle() {
  const locale = await getLocale();
  const isEs = locale === "es";
  const content = isEs ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title="AI Scribes at FQHCs: What Community Health Workers Need to Know in 2026"
        description="66% of physicians now use AI scribes. Learn how ambient AI documentation is changing FQHC workflows, reducing burnout, and what it means for your role."
        datePublished="2026-03-09"
        slug="fqhc-ai-scribes-what-workers-need-to-know"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.fqhctalent.com" },
          { name: "Blog", url: "https://www.fqhctalent.com/blog" },
          {
            name: "AI Scribes at FQHCs",
            url: "https://www.fqhctalent.com/blog/fqhc-ai-scribes-what-workers-need-to-know",
          },
        ]}
      />
      <ContentViewTracker contentType="blog" contentId="fqhc-ai-scribes-what-workers-need-to-know" />
      <BlogArticleToolbar slug="fqhc-ai-scribes-what-workers-need-to-know" />

      <article className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-stone-500">
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
            <p className="mb-3 font-semibold text-teal-700">
              {content.category}
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
              {content.title}
            </h1>
            <div className="flex items-center gap-4 text-stone-500">
              <time dateTime={content.datePublished}>
                {content.dateDisplay}
              </time>
              <span>·</span>
              <span>{content.readTime}</span>
            </div>
            <AuthorByline />
            <InlineShareButtons slug="fqhc-ai-scribes-what-workers-need-to-know" title="AI Scribes at FQHCs: What Community Health Workers Need to Know in 2026" />
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl leading-relaxed text-stone-600">
              {content.openingParagraph}
            </p>

            {/* TL;DR Card */}
            <TLDRCard
              items={[
                "AI scribe adoption among physicians nearly doubled — from 38% to 66% — in one year. NACHC's partnership with eClinicalWorks is bringing these tools directly to community health centers.",
                "Real FQHCs are already using AI scribes: AltaMed (Abridge), Imperial Beach (Sunoh.ai), athenahealth customers (free athenaAmbient), and rural clinics (NextGen Ambient Assist).",
                "AI scribes reduce burnout (51.9% to 38.8% in a 263-physician study) and speed up documentation — but they do not replace clinical staff. Your role may shift, not disappear.",
                "Prepare now: learn the basics from NACHC's AI Action Guide, ask your leadership about adoption plans, highlight tech skills on your resume, and track developments on our AI Tracker.",
              ]}
              esItems={[
                "La adopción de escribas de IA entre médicos casi se duplicó — del 38% al 66% — en un año. La alianza de NACHC con eClinicalWorks está llevando estas herramientas directamente a los centros de salud comunitarios.",
                "FQHCs reales ya están usando escribas de IA: AltaMed (Abridge), Imperial Beach (Sunoh.ai), clientes de athenahealth (athenaAmbient gratis), y clínicas rurales (NextGen Ambient Assist).",
                "Los escribas de IA reducen el agotamiento (del 51.9% al 38.8% en un estudio de 263 médicos) y aceleran la documentación — pero no reemplazan al personal clínico. Tu rol puede cambiar, no desaparecer.",
                "Prepárate ahora: aprende lo básico con la Guía de IA de NACHC, pregunta a tu liderazgo sobre planes de adopción, destaca habilidades tecnológicas en tu CV, y monitorea los desarrollos en nuestro Rastreador de IA.",
              ]}
            />

            {/* Key Stat Callout */}
            <StatCallout
              stat="66%"
              label="of U.S. physicians now use AI in clinical practice — up from 38% just one year earlier"
              esLabel="de los médicos en EE.UU. ahora usan IA en la práctica clínica — comparado con el 38% solo un año antes"
              detail="Source: American Medical Association Physician Survey, 2024"
              esDetail="Fuente: Encuesta de Médicos de la AMA, 2024"
            />

            {content.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="mb-4 mt-12 text-2xl font-bold text-stone-900">
                  {section.heading}
                </h2>
                {section.content.map((item, itemIdx) => {
                  if (item.type === "paragraph") {
                    return (
                      <p
                        key={itemIdx}
                        className="leading-relaxed text-stone-700"
                      >
                        {item.text}
                      </p>
                    );
                  } else if (item.type === "list") {
                    return (
                      <ul
                        key={itemIdx}
                        className="space-y-2 leading-relaxed text-stone-700"
                      >
                        {item.items?.map((listItem, listIdx) => (
                          <li key={listIdx}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
                {/* Inline tool callout after "How AI Scribes Change Daily Workflows" section */}
                {idx === 2 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa la <Link href="/pathway" className="text-teal-700 font-medium underline">Ruta de Aprendizaje</Link> para encontrar cursos y certificaciones que te preparen para flujos de trabajo con IA en tu FQHC.</>
                      ) : (
                        <>Use the <Link href="/pathway" className="text-teal-700 font-medium underline">Learning Pathway</Link> to find courses and certifications that prepare you for AI-enabled workflows at your FQHC.</>
                      )}
                    </p>
                  </div>
                )}
                {/* Inline tool callout after "What Workers Should Watch Out For" section */}
                {idx === 4 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa la <Link href="/career-insights" className="text-teal-700 font-medium underline">Evaluación de Carrera</Link> para identificar tus fortalezas y descubrir cómo posicionarte en un FQHC que adopta IA.</>
                      ) : (
                        <>Use the <Link href="/career-insights" className="text-teal-700 font-medium underline">Career Assessment</Link> to identify your strengths and discover how to position yourself at an AI-adopting FQHC.</>
                      )}
                    </p>
                  </div>
                )}
                {/* Inline tool callout after "How to Prepare for AI" section */}
                {idx === 5 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa el <Link href="/" className="text-teal-700 font-medium underline">Panel de Inteligencia</Link> para monitorear qué FQHCs están adoptando herramientas de IA y cómo está evolucionando el sector.</>
                      ) : (
                        <>Use the <Link href="/" className="text-teal-700 font-medium underline">Intelligence Dashboard</Link> to monitor which FQHCs are adopting AI tools and how the sector is evolving.</>
                      )}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Sources */}
            <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                {locale === "es" ? "Fuentes" : "Sources"}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-stone-600 dark:text-stone-500">
                <li>
                  <a href="https://www.ama-assn.org/practice-management/digital-health/2-3-physicians-are-using-health-ai-78-2023" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">2 in 3 Physicians Are Using Health AI — Up 78% from 2023</a> — American Medical Association, 2025. {locale === "es" ? "Adopción de IA saltó del 38% (2023) al 66% (2024); encuesta de ~1,200 médicos." : "AI adoption jumped from 38% (2023) to 66% (2024); survey of ~1,200 physicians."}
                </li>
                <li>
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12492056/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Use of Ambient AI Scribes to Reduce Administrative Burden and Professional Burnout</a> — JAMA Network Open (Olson et al.), 2025. {locale === "es" ? "Estudio de 263 médicos en 6 sistemas de salud: agotamiento bajó de 51.9% a 38.8% con Abridge." : "263-physician study across 6 health systems: burnout dropped from 51.9% to 38.8% with Abridge."}
                </li>
                <li>
                  <a href="https://www.nachc.org/nachc-and-eclinicalworks-partner-to-advance-health-it-and-ai-innovations-at-community-health-centers/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">NACHC and eClinicalWorks Partner to Advance Health IT and AI at CHCs</a> — NACHC, November 2025. {locale === "es" ? "Alianza para llevar herramientas de IA a CHCs; eClinicalWorks atiende 850 CHCs." : "Partnership to bring AI tools to CHCs; eClinicalWorks serves 850 CHCs."}
                </li>
                <li>
                  <a href="https://www.nachc.org/wp-content/uploads/2025/11/NACHC-AI-Action-Guide_September-2025.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Action Guide: Artificial Intelligence (AI)</a> — NACHC, September 2025. {locale === "es" ? "Guía paso a paso para evaluar y adoptar herramientas de IA en centros de salud comunitarios." : "Step-by-step framework for evaluating and adopting AI tools at community health centers."}
                </li>
                <li>
                  <a href="https://www.abridge.com/blog/riverside-data" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Riverside Health: 11% wRVU Increase and Improved Patient Experience with Abridge</a> — Abridge, 2025. {locale === "es" ? "Aumento del 11% en wRVUs y 14% en diagnósticos HCC tras implementar IA ambiental." : "11% increase in wRVUs and 14% increase in HCC diagnoses after ambient AI implementation."}
                </li>
                <li>
                  <a href="https://www.nature.com/articles/s41746-025-02272-z" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Policy Brief: Ambient AI Scribes and the Coding Arms Race</a> — npj Digital Medicine, December 2025. {locale === "es" ? "Análisis de riesgos de sobrecodificación con IA ambiental; implicaciones de wRVU y HCC." : "Analysis of upcoding risks with ambient AI; wRVU and HCC implications."}
                </li>
                <li>
                  <a href="https://www.athenahealth.com/solutions/ambient-notes" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">athenaAmbient: Ambient AI Scribe</a> — athenahealth, February 2026. {locale === "es" ? "Escriba de IA ambiental gratuito para todos los clientes de athenahealth; sin costo adicional." : "Free ambient AI scribe for all athenahealth customers; no additional cost."}
                </li>
                <li>
                  <a href="https://www.elationhealth.com/resources/blogs/elation-health-and-anthropic-team-to-power-clinical-insights-for-primary-care" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Elation Health and Anthropic Team to Power Clinical Insights</a> — Elation Health, January 2026. {locale === "es" ? "Reducción del 61% en tiempo de revisión de expedientes con Claude de Anthropic." : "61% reduction in chart review time with Anthropic's Claude."}
                </li>
                <li>
                  <a href="https://www.nachc.org/looming-medicaid-changes-threaten-to-deepen-the-community-health-center-workforce-crisis/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Looming Medicaid Changes Threaten to Deepen the CHC Workforce Crisis</a> — NACHC, 2025. {locale === "es" ? "60% de CHCs y 70% de CHCs rurales citan el costo como barrera principal para adoptar IA." : "60% of CHCs and 70% of rural CHCs cite cost as the primary barrier to AI adoption."}
                </li>
              </ol>
            </div>
          </div>
          {/* Bottom share */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <InlineShareButtons slug="fqhc-ai-scribes-what-workers-need-to-know" title="AI Scribes at FQHCs: What Community Health Workers Need to Know in 2026" />
          </div>

          <BlogPrevNext slug="fqhc-ai-scribes-what-workers-need-to-know" locale={locale} />

          {/* CTA */}
          <ArticleCTA
            audience="both"
            relatedArticles={[
              { slug: "healthcare-hiring-trends-2026", title: "Healthcare Hiring Trends 2026: What the Jobs Data Tells Us About FQHC Careers", esTitle: "Tendencias de Contratación en Salud 2026: Lo Que los Datos Revelan Sobre Carreras en FQHCs", category: "Data Report", esCategory: "Informe de Datos" },
              { slug: "working-at-top-of-scope-fqhc", title: "Working at Top of Scope: How FQHCs Are Revolutionizing Patient Access", esTitle: "Trabajar al Máximo de Tu Alcance Profesional en un FQHC", category: "Clinical Operations", esCategory: "Operaciones Clínicas" },
              { slug: "fqhc-copay-advantage-patient-surge", title: "The FQHC Copay Advantage: Why Community Health Centers May See a Patient Surge", esTitle: "La Ventaja de Copago de los FQHCs: Por Qué los Centros de Salud Podrían Ver un Aumento de Pacientes", category: "Policy & Strategy", esCategory: "Política y Estrategia" },
            ]}
          />
        </div>
      </article>
    </main>
  );
}
