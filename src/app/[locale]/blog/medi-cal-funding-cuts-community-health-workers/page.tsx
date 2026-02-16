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
          text: "The problem is that these workers and these opportunities aren't finding each other. Generic job boards don't understand the specificity of FQHC roles. They don't filter by EHR system (OCHIN Epic vs. NextGen vs. eClinicalWorks), by program experience (ECM, CCM, Community Supports), or by the cultural and linguistic competencies that are essential in community health.",
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
          text: "4. Get Specialized Placement Support",
        },
        {
          type: "paragraph",
          text: "This is exactly why FQHC Talent Exchange exists. We connect displaced community health workers with FQHCs that are actively hiring — for free. We understand the roles, the programs, and the EHR systems. We don't just list jobs — we advocate for candidates and make direct introductions to hiring managers. Our goal is to get you in front of the right employer within 5 days.",
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
    "Join FQHC Talent Exchange — completely free for job seekers. Get matched with FQHCs that are actively hiring for your exact skills.",
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
          text: "4. Obtén Apoyo de Colocación Especializado",
        },
        {
          type: "paragraph",
          text: "Es exactamente por esto que FQHC Talent Exchange existe. Conectamos trabajadores de salud comunitaria desplazados con FQHCs que están contratando activamente — de forma gratuita. Entendemos los roles, los programas y los sistemas de EHR. No solo listamos trabajos — abogamos por candidatos y hacemos presentaciones directas a gerentes de contratación. Nuestro objetivo es ponerte frente al empleador correcto dentro de 5 días.",
        },
      ],
    },
    {
      heading: "Mirando Hacia Adelante",
      content: [
        {
          type: "paragraph",
          text: "La demanda de trabajadores de salud comunitaria no se va a desaparecer. California continúa invirtiendo en CalAIM, salud de la población y modelos de atención de persona integral que dependen de fuerzas laborales basadas en la comunidad. La disrupción actual es dolorosa, pero la trayectoria a largo plazo para carreras de salud comunitaria es fuerte. El desafío en este momento es cerrar la brecha — conseguir que los trabajadores desplazados se conecten con las organizaciones que los necesitan, tan rápidamente como sea posible.",
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
    "Únete a FQHC Talent Exchange — completamente gratuito para buscadores de trabajo. Obten coincidencias con FQHCs que están activamente contratando para tus habilidades exactas.",
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

export default function MediCalFundingCutsArticle() {
  const locale = useLocale();
  const content = locale === "es" ? esContent : enContent;

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
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-700 to-amber-600 px-8 py-4 text-lg font-semibold text-white hover:shadow-lg transition-all"
              >
                {locale === "es" ? "Fast-Track Mi B\u00fasqueda" : "Fast-Track My Job Search"}
              </a>
              <a
                href="/resume-builder"
                className="inline-flex items-center justify-center rounded-lg border-2 border-teal-700 px-8 py-4 text-lg font-semibold text-teal-700 hover:bg-teal-100 transition-colors"
              >
                {content.ctaButtonText}
              </a>
            </div>
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
