import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { TLDRCard, FundingCliffCard, StatCallout } from "@/components/blog/BlogDataViz";
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
    subHeading?: string;
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
  category: "Career Resources",
  title: "Medi-Cal Funding Cuts: What Community Health Workers Need to Know",
  description:
    "California's Medi-Cal funding cuts are displacing thousands of community health workers at FQHCs statewide. Here's what happened, what it means for your career, and how to find your next role quickly.",
  breadcrumbTitle: "Medi-Cal Funding Cuts",
  datePublished: "2026-02-01",
  dateDisplay: "February 1, 2026",
  readTime: "8 min read",
  openingParagraph:
    "If you're a community health worker, care coordinator, or outreach specialist who has been laid off — or is worried about being laid off — due to California's Medi-Cal funding cuts, you're not alone. Thousands of community health professionals across the state are facing the same uncertainty. Here's what you need to know, and what you can do right now.",
  sections: [
    {
      heading: "What Happened",
      content: [
        {
          type: "paragraph",
          text: "California's Medi-Cal program — which covers over 15 million residents — has undergone significant funding adjustments that directly impact Federally Qualified Health Centers (FQHCs) and other safety-net providers. These changes have reduced revenue for programs that many FQHCs depended on to fund community health worker positions, care coordination teams, and outreach programs.",
        },
        {
          type: "paragraph",
          text: "The result: layoffs at community health organizations across the state, disproportionately affecting frontline workers — the community health workers, promotoras, patient navigators, and care coordinators who serve as the bridge between clinics and the communities they serve.",
        },
      ],
    },
    {
      heading: "Who Is Being Affected",
      content: [
        {
          type: "paragraph",
          text: "The workers most impacted are those in grant-funded or program-specific positions — particularly roles tied to Enhanced Care Management (ECM), Community Supports, and other CalAIM initiatives where funding flows through managed care plans. When a health plan reduces its contracted rates or an FQHC loses a managed care contract, the positions funded by that revenue are often the first to go.",
        },
        {
          type: "paragraph",
          text: "This workforce is predominantly Latino, bilingual, and community-rooted. Many community health workers come from the same neighborhoods as their patients. When they lose their positions, the impact extends far beyond one job — it disrupts trust-based relationships that took years to build.",
        },
      ],
    },
    {
      heading: "The Disconnect: Layoffs and Open Positions Exist Simultaneously",
      content: [
        {
          type: "paragraph",
          text: "Here's what most people don't realize: while some FQHCs are cutting staff, others are actively hiring for the exact same roles. The community health workforce is not shrinking — it's being displaced. An experienced ECM care coordinator who gets laid off in one county may be exactly what an FQHC two counties over is desperately searching for.",
        },
        {
          type: "paragraph",
          text: "The problem is that these workers and these opportunities aren't finding each other. Generic career sites don't understand the specificity of FQHC roles. They don't filter by EHR system (OCHIN Epic vs. NextGen vs. eClinicalWorks), by program experience (ECM, CCM, Community Supports), or by the cultural and linguistic competencies that are essential in community health.",
        },
      ],
    },
    {
      heading: "What You Can Do Right Now",
      content: [
        {
          type: "paragraph",
          text: "1. Update Your Resume with FQHC-Specific Language",
        },
        {
          type: "paragraph",
          text: "Your experience with ECM, CCM, Community Supports, OCHIN Epic, PPS billing, UDS reporting, and other FQHC-specific competencies is incredibly valuable — but only if hiring managers can see it on your resume. Use the specific program names and acronyms that FQHC HR teams search for. List the EHR systems you've used. Quantify your panel size, outreach numbers, and any outcomes you contributed to.",
        },
        {
          type: "paragraph",
          text: "2. Look Beyond Your Current County",
        },
        {
          type: "paragraph",
          text: "FQHC hiring is regional and uneven. A county that's cutting positions may border a county that's expanding. Be open to opportunities across California — many FQHCs in the Central Valley, Inland Empire, and Sacramento region are actively growing their community health teams.",
        },
        {
          type: "paragraph",
          text: "3. Highlight Revenue-Generating Program Experience",
        },
        {
          type: "paragraph",
          text: "FQHCs that are hiring right now are often doing so because they have revenue-generating programs that need staff. If you have experience with ECM, CCM, Transitional Care Management (TCM), Behavioral Health – Administrative Services Organization (BH-ASO), or Community Supports, that experience is your strongest selling point. These programs generate direct revenue for FQHCs, and candidates who can contribute to them from day one are in high demand.",
        },
        {
          type: "paragraph",
          text: "4. Use Free Career Tools and Resources",
        },
        {
          type: "paragraph",
          text: "This is exactly why FQHC Talent exists. We provide free career tools, aggregated job postings from 220+ California FQHCs, salary intelligence, and strategic resources — all designed specifically for community health professionals. We understand the roles, the programs, and the EHR systems. Our resume builder, career assessment, and FQHC directory help you compare opportunities and find the right fit.",
        },
      ],
    },
    {
      heading: "Looking Ahead",
      content: [
        {
          type: "paragraph",
          text: "The demand for community health workers isn't going away. California continues to invest in CalAIM, population health, and whole-person care models that depend on community-based workforces. The current disruption is painful, but the long-term trajectory for community health careers is strong. The challenge right now is bridging the gap — getting displaced workers connected with the organizations that need them, as quickly as possible.",
        },
        {
          type: "paragraph",
          text: "That's what we're here for.",
        },
      ],
    },
  ],
  ctaTitle: "Were You Affected by FQHC Layoffs?",
  ctaDescription:
    "Join FQHC Talent — completely free career tools, job listings, and salary data for community health professionals.",
  ctaButtonText: "Build Your Free Resume",
  relatedArticles: [
    {
      href: "/blog/what-is-enhanced-care-management-ecm",
      title: "What Is Enhanced Care Management (ECM)? A Career Guide",
    },
    {
      href: "/blog/how-to-write-fqhc-resume",
      title: "How to Write an FQHC Resume That Gets Noticed",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Recursos de Carrera",
  title: "Cortes de Financiamiento de Medi-Cal: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber",
  description:
    "Los cortes de financiamiento de Medi-Cal de California están desplazando a miles de trabajadores de salud comunitaria en FQHCs en todo el estado. Aquí está lo que sucedió, qué significa para tu carrera y cómo encontrar tu próximo rol rápidamente.",
  breadcrumbTitle: "Cortes de Financiamiento de Medi-Cal",
  datePublished: "2026-02-01",
  dateDisplay: "1 de Febrero de 2026",
  readTime: "8 min",
  openingParagraph:
    "Si eres un trabajador de salud comunitaria, coordinador de atención o especialista de alcance que ha sido despedido — o está preocupado de ser despedido — debido a los cortes de financiamiento de Medi-Cal de California, no estás solo. Miles de profesionales de salud comunitaria en todo el estado están enfrentando la misma incertidumbre. Aquí está lo que necesitas saber y qué puedes hacer en este momento.",
  sections: [
    {
      heading: "¿Qué Sucedió?",
      content: [
        {
          type: "paragraph",
          text: "El programa Medi-Cal de California — que cubre a más de 15 millones de residentes — ha sufrido ajustes significativos de financiamiento que impactan directamente los Centros de Salud Calificados Federalmente (FQHCs) y otros proveedores de red de seguridad. Estos cambios han reducido ingresos para programas en los que muchos FQHCs dependían para financiar posiciones de trabajadores de salud comunitaria, equipos de coordinación de atención y programas de alcance.",
        },
        {
          type: "paragraph",
          text: "El resultado: despidos en organizaciones de salud comunitaria en todo el estado, afectando desproporcionadamente a trabajadores de primera línea — los trabajadores de salud comunitaria, promotoras, navegantes de pacientes y coordinadores de atención que sirven como el puente entre clínicas y las comunidades a las que sirven.",
        },
      ],
    },
    {
      heading: "¿Quién Está Siendo Afectado?",
      content: [
        {
          type: "paragraph",
          text: "Los trabajadores más impactados son aquellos en posiciones financiadas por subvenciones o específicas del programa — particularmente roles vinculados a Gestión de Atención Mejorada (ECM), Servicios Comunitarios y otras iniciativas de CalAIM donde el financiamiento fluye a través de planes de atención administrada. Cuando un plan de salud reduce sus tasas contratadas o un FQHC pierde un contrato de atención administrada, las posiciones financiadas por esos ingresos a menudo son las primeras en desaparecer.",
        },
        {
          type: "paragraph",
          text: "Esta fuerza laboral es predominantemente latina, bilingüe y arraigada en la comunidad. Muchos trabajadores de salud comunitaria vienen de los mismos vecindarios que sus pacientes. Cuando pierden sus posiciones, el impacto se extiende más allá de un solo trabajo — interrumpe relaciones basadas en confianza que tardaron años en construirse.",
        },
      ],
    },
    {
      heading: "La Desconexión: Los Despidos y Posiciones Abiertas Existen Simultáneamente",
      content: [
        {
          type: "paragraph",
          text: "Aquí está lo que la mayoría de las personas no se dan cuenta: mientras algunos FQHCs están reduciendo personal, otros están contratando activamente para los mismos roles. La fuerza laboral de salud comunitaria no está encogiendo — está siendo desplazada. Un coordinador de atención de ECM experimentado que es despedido en un condado puede ser exactamente lo que un FQHC dos condados más allá está buscando desesperadamente.",
        },
        {
          type: "paragraph",
          text: "El problema es que estos trabajadores y estas oportunidades no se están encontrando entre sí. Los tableros de trabajo genéricos no entienden la especificidad de los roles de FQHC. No filtran por sistema de EHR (OCHIN Epic vs. NextGen vs. eClinicalWorks), por experiencia de programa (ECM, CCM, Servicios Comunitarios), o por las competencias culturales y lingüísticas que son esenciales en salud comunitaria.",
        },
      ],
    },
    {
      heading: "¿Qué Puedes Hacer Ahora Mismo?",
      content: [
        {
          type: "paragraph",
          text: "1. Actualiza Tu Currículum con Lenguaje Específico de FQHC",
        },
        {
          type: "paragraph",
          text: "Tu experiencia con ECM, CCM, Servicios Comunitarios, OCHIN Epic, facturación PPS, informes de UDS y otras competencias específicas de FQHC es increíblemente valiosa — pero solo si los gerentes de contratación pueden verla en tu currículum. Usa los nombres de programa específicos y acrónimos que los equipos de RRHH de FQHC buscan. Enumera los sistemas de EHR que has usado. Cuantifica el tamaño de tu panel, números de alcance y cualquier resultado al que contribuiste.",
        },
        {
          type: "paragraph",
          text: "2. Mira Más Allá de Tu Condado Actual",
        },
        {
          type: "paragraph",
          text: "La contratación de FQHC es regional e desigual. Un condado que está reduciendo posiciones puede estar limitando con un condado que se está expandiendo. Sé abierto a oportunidades en toda California — muchos FQHCs en el Valle Central, Inland Empire y región de Sacramento están activamente creciendo sus equipos de salud comunitaria.",
        },
        {
          type: "paragraph",
          text: "3. Destaca la Experiencia del Programa Generador de Ingresos",
        },
        {
          type: "paragraph",
          text: "Los FQHCs que están contratando en este momento a menudo lo hacen porque tienen programas que generan ingresos que necesitan personal. Si tienes experiencia con ECM, CCM, Gestión de Atención Transicional (TCM), Servicios de Salud Conductual – Organización de Servicios Administrativos (BH-ASO), o Servicios Comunitarios, esa experiencia es tu punto de venta más fuerte. Estos programas generan ingresos directos para FQHCs, y los candidatos que pueden contribuir a ellos desde el primer día están en alta demanda.",
        },
        {
          type: "paragraph",
          text: "4. Usa Herramientas de Carrera Gratuitas",
        },
        {
          type: "paragraph",
          text: "Es exactamente por esto que FQHC Talent existe. Ofrecemos herramientas de carrera gratuitas para trabajadores de salud comunitaria — incluyendo un creador de currículum específico para FQHCs, evaluaciones de carrera, hojas de ruta profesionales y datos salariales de toda California. Entendemos los roles, los programas y los sistemas de EHR. Explora nuestro directorio de más de 220 FQHCs y listados de empleo agregados para encontrar tu próxima oportunidad.",
        },
      ],
    },
    {
      heading: "Mirando Hacia Adelante",
      content: [
        {
          type: "paragraph",
          text: "La demanda de trabajadores de salud comunitaria no se va a desaparecer. California continúa invirtiendo en CalAIM, salud de la población y modelos de atención de persona integral que dependen de fuerzas laborales basadas en la comunidad. La disrupción actual es dolorosa, pero la trayectoria a largo plazo para carreras de salud comunitaria es fuerte. El desafío en este momento es cerrar la brecha — ayudar a los trabajadores desplazados a encontrar las organizaciones que los necesitan, con las herramientas y datos correctos.",
        },
        {
          type: "paragraph",
          text: "Eso es para lo que estamos aquí.",
        },
      ],
    },
  ],
  ctaTitle: "¿Fuiste Afectado por Despidos de FQHC?",
  ctaDescription:
    "Únete a FQHC Talent — completamente gratuito para buscadores de trabajo. Obten coincidencias con FQHCs que están activamente contratando para tus habilidades exactas.",
  ctaButtonText: "Crea Tu CV Gratis",
  relatedArticles: [
    {
      href: "/blog/what-is-enhanced-care-management-ecm",
      title: "¿Qué Es la Gestión de Atención Mejorada (ECM)? Una Guía de Carrera",
    },
    {
      href: "/blog/how-to-write-fqhc-resume",
      title: "Cómo Escribir un Currículum de FQHC que Destaque",
    },
  ],
};

export default async function MediCalFundingCutsArticle() {
  const locale = await getLocale();
  const isEs = locale === "es";
  const content = isEs ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title="Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026"
        description="California's Medi-Cal funding cuts are displacing thousands of community health workers at FQHCs statewide. Here's what happened, what it means for your career, and how to find your next role quickly."
        datePublished="2026-02-01"
        slug="medi-cal-funding-cuts-community-health-workers"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.fqhctalent.com" },
          { name: "Blog", url: "https://www.fqhctalent.com/blog" },
          {
            name: "Medi-Cal Funding Cuts",
            url: "https://www.fqhctalent.com/blog/medi-cal-funding-cuts-community-health-workers",
          },
        ]}
      />
      <ContentViewTracker contentType="blog" contentId="medi-cal-funding-cuts-community-health-workers" />
      <BlogArticleToolbar slug="medi-cal-funding-cuts-community-health-workers" />

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
            <AuthorByline />
            <InlineShareButtons slug="medi-cal-funding-cuts-community-health-workers" title="Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026" />
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed">
              {content.openingParagraph}
            </p>

            {/* TL;DR Card */}
            <TLDRCard
              items={[
                "Three major Medi-Cal funding changes are hitting FQHCs: PPS rate elimination (Oct 2026), dental reimbursement cuts (Jul 2026), and CalAIM waiver uncertainty (Dec 2026)",
                "CHWs and care coordinators are most at risk — these roles are often funded by the grants being cut",
                "Take action now: build your FQHC resume, diversify your skills into ECM/CalAIM, and track openings at stable organizations",
              ]}
              esItems={[
                "Tres cambios importantes de financiamiento Medi-Cal están afectando a los FQHCs: eliminación de tasas PPS (Oct 2026), recortes de reembolso dental (Jul 2026), e incertidumbre de la exención CalAIM (Dic 2026)",
                "Los CHWs y coordinadores de atención están en mayor riesgo — estos roles frecuentemente son financiados por las subvenciones que se están recortando",
                "Actúa ahora: crea tu CV FQHC, diversifica tus habilidades en ECM/CalAIM, y rastrea vacantes en organizaciones estables",
              ]}
            />

            {/* Funding Cliff Countdown */}
            <FundingCliffCard
              cliffs={[
                {
                  title: { en: "Medi-Cal Dental Reimbursement Cuts", es: "Recortes de Reembolso Dental Medi-Cal" },
                  date: "2026-07-01",
                  impact: { en: "Reduced reimbursement rates for dental services — may force FQHCs to cut dental staff", es: "Tasas de reembolso reducidas para servicios dentales — puede forzar a FQHCs a recortar personal dental" },
                  urgency: "high",
                },
                {
                  title: { en: "PPS Rate Elimination", es: "Eliminación de Tasas PPS" },
                  date: "2026-10-01",
                  impact: { en: "Prospective Payment System rate structure ends — FQHCs lose guaranteed per-visit reimbursement floor", es: "La estructura de tasas del Sistema de Pago Prospectivo termina — FQHCs pierden piso garantizado de reembolso por visita" },
                  urgency: "critical",
                },
                {
                  title: { en: "CalAIM 1115 Waiver Expiration", es: "Expiración de Exención CalAIM 1115" },
                  date: "2026-12-31",
                  impact: { en: "CalAIM waiver renewal uncertain — ECM and Community Supports funding at risk", es: "Renovación de exención CalAIM incierta — financiamiento de ECM y Apoyos Comunitarios en riesgo" },
                  urgency: "critical",
                },
              ]}
            />

            {/* Stat callout */}
            <StatCallout
              stat="220"
              label="California FQHCs tracked in our directory"
              esLabel="FQHCs de California rastreados en nuestro directorio"
              detail="See which FQHCs have high, moderate, or low funding vulnerability at fqhctalent.com"
              esDetail="Ve qué FQHCs tienen vulnerabilidad de financiamiento alta, moderada o baja en fqhctalent.com"
            />

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
                  }
                  return null;
                })}
                {/* Inline tool callout after "Who Is Being Affected" section */}
                {idx === 1 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa el <Link href="/" className="text-teal-700 font-medium underline">Panel de Inteligencia</Link> para rastrear despidos, precipicios de financiamiento y cambios de políticas que afectan a los trabajadores de salud comunitaria.</>
                      ) : (
                        <>Use the <Link href="/" className="text-teal-700 font-medium underline">Intelligence Dashboard</Link> to track layoffs, funding cliffs, and policy changes affecting community health workers.</>
                      )}
                    </p>
                  </div>
                )}
                {/* Inline tool callout after "The Disconnect" section */}
                {idx === 2 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa las <Link href="/strategy/okrs" className="text-teal-700 font-medium underline">Plantillas OKR</Link> para planificar la retención de la fuerza laboral y navegar los precipicios de financiamiento de Medi-Cal.</>
                      ) : (
                        <>Use the <Link href="/strategy/okrs" className="text-teal-700 font-medium underline">OKR Templates</Link> to plan workforce retention and navigate Medi-Cal funding cliffs.</>
                      )}
                    </p>
                  </div>
                )}
                {/* Inline tool callout after "What You Can Do Right Now" section */}
                {idx === 3 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa el <Link href="/strategy/clinic-simulator" className="text-teal-700 font-medium underline">Simulador de Clínica</Link> para modelar el impacto de los recortes de financiamiento en el personal y los ingresos de tu FQHC.</>
                      ) : (
                        <>Use the <Link href="/strategy/clinic-simulator" className="text-teal-700 font-medium underline">Clinic Simulator</Link> to model how funding cuts impact your FQHC&apos;s staffing and revenue.</>
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
                  <a href="https://www.dhcs.ca.gov/dataandstats/Pages/Medi-Cal-Eligibility-Statistics.aspx" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">{locale === "es" ? "Estadísticas de Elegibilidad de Medi-Cal" : "Medi-Cal Eligibility Statistics"}</a> — DHCS, 2025. {locale === "es" ? "Más de 15 millones de residentes cubiertos por Medi-Cal." : "Over 15 million California residents covered by Medi-Cal."}
                </li>
                <li>
                  <a href="https://www.dhcs.ca.gov/provgovpart/Pages/CalAIM-1115-and-1915b-Waiver-Renewals.aspx" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">{locale === "es" ? "Renovación de Exención CalAIM 1115 y 1915(b)" : "CalAIM 1115 and 1915(b) Waiver Renewals"}</a> — DHCS, 2026. {locale === "es" ? "Exención CalAIM vence 31 de diciembre de 2026; ECM y Apoyos Comunitarios autorizados bajo esta exención." : "CalAIM waiver expires December 31, 2026; ECM and Community Supports authorized under this waiver."}
                </li>
                <li>
                  <a href="https://lao.ca.gov/Publications/Report/5003" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">{locale === "es" ? "Actualización de Implementación de CalAIM ECM y Apoyos Comunitarios" : "CalAIM ECM and Community Supports Implementation Update"}</a> — California LAO, 2025. {locale === "es" ? "Gasto de ECM propuesto en $956M; Apoyos Comunitarios en $231M para 2025-26." : "ECM spending proposed at $956M; Community Supports at $231M for 2025-26."}
                </li>
                <li>
                  <a href="https://www.dhcs.ca.gov/federal-impacts/Documents/DHCS-HR1-Implementation-Plan.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">{locale === "es" ? "Plan de Implementación de H.R. 1" : "H.R. 1 Implementation Plan"}</a> — DHCS, January 2026. {locale === "es" ? "Eliminación de tasas PPS (Oct 2026), recortes dentales (Jul 2026), congelamiento de inscripciones (Ene 2026)." : "PPS rate elimination (Oct 2026), dental cuts (Jul 2026), enrollment freeze (Jan 2026)."}
                </li>
                <li>
                  <a href="https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">{locale === "es" ? "Cómo Recortes Federales Masivos Crearán Desafíos sin Precedentes para Medi-Cal" : "How Massive Federal Cuts Will Create Unprecedented Challenges for Medi-Cal"}</a> — CHCF, 2026. {locale === "es" ? "H.R. 1 recorta casi $1 billón de Medicaid; impacto de $30 mil millones anuales en Medi-Cal." : "H.R. 1 cuts nearly $1 trillion from Medicaid; $30 billion/year impact on Medi-Cal."}
                </li>
                <li>
                  <a href="https://www.nachc.org/wp-content/uploads/2025/09/NACHC-Policy-Papers_CHC-Workforce_Sept2025.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">{locale === "es" ? "Documento de Política de la Fuerza Laboral de CHCs" : "CHC Workforce Policy Paper"}</a> — NACHC, September 2025. {locale === "es" ? "55% de CHCs no pueden cubrir posiciones críticas; trabajadores de primera línea desproporcionadamente afectados." : "55% of CHCs cannot fill critical positions; frontline workers disproportionately affected."}
                </li>
                <li>
                  <a href="https://www.dhcs.ca.gov/services/medi-cal/Documents/CHW-FAQs.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">{locale === "es" ? "Preguntas Frecuentes sobre el Beneficio Medi-Cal de CHW" : "CHW Medi-Cal Benefit FAQs"}</a> — DHCS, 2024. {locale === "es" ? "Servicios de CHW como beneficio facturable por Medi-Cal bajo SPA 22-0001." : "CHW services as a billable Medi-Cal benefit under SPA 22-0001."}
                </li>
                <li>
                  <a href="https://calbudgetcenter.org/resources/timeline-of-funding-cuts-to-medi-cal-and-calfresh-in-california/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">{locale === "es" ? "Cronología de Recortes de Fondos a Medi-Cal y CalFresh" : "Timeline of Funding Cuts to Medi-Cal and CalFresh in California"}</a> — California Budget &amp; Policy Center, 2025. {locale === "es" ? "Cronología de recortes de financiamiento federales y estatales que afectan a Medi-Cal." : "Timeline of federal and state funding cuts affecting Medi-Cal."}
                </li>
              </ol>
            </div>
          </div>
          {/* Bottom share */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <InlineShareButtons slug="medi-cal-funding-cuts-community-health-workers" title="Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026" />
          </div>

          <BlogPrevNext slug="medi-cal-funding-cuts-community-health-workers" locale={locale} />

          {/* CTA */}
          <ArticleCTA
            audience="both"
            relatedArticles={[
              { slug: "february-2026-jobs-report-healthcare-crisis", title: "The February 2026 Jobs Report: Healthcare Is Carrying the Entire Economy", esTitle: "El Informe de Empleos de Febrero 2026: El Sector Salud Carga Toda la Economía", category: "Data Report", esCategory: "Informe de Datos" },
              { slug: "laid-off-fqhc-fast-track-job-search", title: "Laid Off from an FQHC? How to Fast-Track Your Job Search", esTitle: "¿Despedido de un FQHC? Cómo Acelerar Tu Búsqueda de Empleo", category: "Career Resources", esCategory: "Recursos de Carrera" },
              { slug: "fqhc-copay-advantage-patient-surge", title: "The FQHC Copay Advantage: Why Community Health Centers May See a Patient Surge", esTitle: "La Ventaja de Copago de los FQHCs: Por Qué los Centros de Salud Podrían Ver un Aumento de Pacientes", category: "Policy & Strategy", esCategory: "Política y Estrategia" },
            ]}
          />
        </div>
      </article>
    </main>
  );
}
