import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { TLDRCard, StatCallout, FundingCliffCard, SalaryRangeChart } from "@/components/blog/BlogDataViz";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { ContentViewTracker } from "@/components/content/ContentViewTracker";
import { BlogArticleToolbar } from "@/components/blog/BlogArticleToolbar";
import { AuthorByline } from "@/components/blog/AuthorByline";
import { InlineShareButtons } from "@/components/blog/InlineShareButtons";

interface ArticleContent {
  category: string;
  title: string;
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
  relatedArticles: Array<{
    href: string;
    title: string;
  }>;
}

const enContent: ArticleContent = {
  category: "Data Report",
  title:
    "March 2026 Jobs Report: Healthcare Added 76,000 Jobs \u2014 But Which Roles, and for How Long?",
  breadcrumbTitle: "March 2026 Jobs Report",
  datePublished: "2026-04-06",
  dateDisplay: "April 6, 2026",
  readTime: "10 min read",
  openingParagraph:
    "Healthcare dominated the March 2026 jobs report, adding 76,000 positions and accounting for 43% of all nonfarm job growth. But the sector\u2019s role as the economy\u2019s primary engine raises uncomfortable questions: How much of this growth is real, which roles are actually expanding, and what happens when the Medicaid cuts start hitting revenue? Here\u2019s what the BLS data, NACHC workforce surveys, and labor market research tell us \u2014 broken down by subcategory, role, and region.",
  sections: [
    {
      heading: "The March Numbers: Healthcare Carries the Economy \u2014 Again",
      content: [
        {
          type: "paragraph",
          text: "The U.S. economy added 178,000 nonfarm jobs in March, rebounding from February\u2019s revised loss of 133,000. Unemployment held at 4.3%. Average hourly earnings rose 3.5% year-over-year to $37.38. But the three-month average tells a slower story: just 68,000 jobs per month, well below the 150,000\u2013200,000 pace of 2023\u20132024.",
        },
        {
          type: "paragraph",
          text: "Healthcare\u2019s dominance is now structural. ADP\u2019s March report found that education and health services added 58,000 of 62,000 total private-sector jobs \u2014 93.5% of all private-sector gains. Indeed\u2019s Hiring Lab reports healthcare accounted for approximately 72% of all net U.S. job growth in 2025. The San Francisco Fed found that education and health services drove \u201Calmost all sustained job growth in 2025.\u201D When one sector carries the entire labor market, any disruption to that sector\u2019s funding becomes a national economic event.",
        },
      ],
    },
    {
      heading: "Where the 76,000 Healthcare Jobs Were: Subcategory Breakdown",
      content: [
        {
          type: "paragraph",
          text: "The BLS breaks healthcare employment into three major subcategories. March\u2019s gains were concentrated in ambulatory care \u2014 but with a significant caveat:",
        },
        {
          type: "list",
          items: [
            "Ambulatory health care services: +54,000 \u2014 This includes physician offices (+35,000, largely from Kaiser Permanente workers returning after a February strike), outpatient care centers, and home health agencies.",
            "Hospitals: +15,000 \u2014 Continued steady hiring, consistent with recent months.",
            "Nursing and residential care facilities: +7,200 \u2014 Modest growth in a subsector that has been shrinking relative to ambulatory care for years.",
          ],
        },
        {
          type: "paragraph",
          text: "The Kaiser strike return inflates the ambulatory number. In February, healthcare lost 28,000 jobs \u2014 the first decline in over four years, driven by the same 31,000-worker strike. Neither month in isolation tells the full story. The underlying trend, accounting for the strike, is approximately 29,000\u201341,000 healthcare jobs per month \u2014 solid but nowhere near the 76,000 headline.",
        },
        {
          type: "paragraph",
          text: "The bigger structural shift: ADP Research notes that ambulatory care has grown from 34% to 40% of total healthcare employment since 2000, while hospitals and nursing facilities have declining shares. This matters for FQHCs \u2014 they sit squarely in the ambulatory care category where growth is concentrated.",
        },
      ],
    },
    {
      heading: "Which Healthcare Roles Are Growing Fastest?",
      content: [
        {
          type: "paragraph",
          text: "BLS 2024\u20132034 projections identify the healthcare roles with the strongest growth trajectory. These align closely with roles FQHCs are struggling to fill:",
        },
        {
          type: "list",
          items: [
            "Nurse Practitioners: +35\u201340% projected growth (fastest of any healthcare role, #3 fastest in the entire economy). 382,700 positions in 2024, with 32,700 annual openings. Median wage: $129,210.",
            "Home Health and Personal Care Aides: +17% growth, with 765,800 annual openings \u2014 the most of any occupation in the country. Median wage: $34,900.",
            "Medical Assistants: +12% growth, 112,300 annual openings. Critical frontline role at FQHCs.",
            "Community Health Workers: +11% growth, 7,800 annual openings. California\u2019s CHW certification remains stalled since November 2023, creating a credentialing gap even as demand accelerates.",
            "Healthcare support occupations overall: +12.4% growth \u2014 faster than healthcare practitioners (+7.2%).",
          ],
        },
        {
          type: "paragraph",
          text: "The pattern is clear: the fastest-growing roles are the ones FQHCs depend on most \u2014 NPs, MAs, CHWs, and home health aides. And these are exactly the roles with the highest vacancy and turnover rates.",
        },
      ],
    },
    {
      heading: "The FQHC Workforce Crisis: NACHC\u2019s 2025 Data",
      content: [
        {
          type: "paragraph",
          text: "The national jobs report captures the macro picture. NACHC\u2019s workforce surveys reveal what\u2019s happening inside community health centers specifically. The 2025 NACHC staffing survey shows a sector that\u2019s hiring and hemorrhaging at the same time:",
        },
        {
          type: "list",
          items: [
            "310,000+ staff across 16,000+ sites serving 52 million patients (1 in 7 Americans; 1 in 3 in rural areas).",
            "Behavioral health providers: ~5,300 vacancies (largest absolute shortfall) with ~20% vacancy rate.",
            "Physicians: ~2,000 vacancies with ~20\u201321% vacancy rate.",
            "NPs and PAs: ~2,800 vacancies.",
            "Certified Nurse Midwives: ~26% vacancy rate (~300 unfilled positions).",
            "Dental hygienists and assistants: ~20\u201321% vacancy rate each.",
            "Over 70% of FQHCs report critical shortages in physicians, nurses, and mental health providers.",
          ],
        },
        {
          type: "paragraph",
          text: "Turnover compounds the vacancy problem. Medical assistants turn over at 24% annually \u2014 the highest of any FQHC role. Dental hygienists and assistants at 18%. Administrative staff and RNs at 15% each. FQHCs aren\u2019t just struggling to hire \u2014 they\u2019re struggling to keep the people they have.",
        },
        {
          type: "paragraph",
          text: "The math behind the crisis: BLS projects healthcare needs 2 million new workers by 2034. FQHCs are competing for those workers against hospital systems and private practices that can offer higher base salaries \u2014 though FQHCs counter with NHSC loan repayment, schedule flexibility, and mission alignment.",
        },
      ],
    },
    {
      heading: "Signing Bonuses: Healthcare\u2019s Canary for Labor Market Tightness",
      content: [
        {
          type: "paragraph",
          text: "Indeed\u2019s February 2026 analysis of signing bonuses offers a window into which healthcare roles are hardest to fill. While signing bonuses have declined from their 2022 peak (5.6% of postings) to 3% overall, healthcare dominates the practice:",
        },
        {
          type: "list",
          items: [
            "Physicians and Surgeons: 10.6% of postings offer signing bonuses.",
            "Nursing: 8.4% of postings (down from 13.5% a year earlier \u2014 easing but still elevated).",
            "7 of the top 10 occupations using signing bonuses are healthcare roles.",
            "7 of Indeed\u2019s 2026 Best Jobs rankings are in medical/therapeutic fields.",
          ],
        },
        {
          type: "paragraph",
          text: "For FQHC HR directors: the decline in nursing signing bonuses suggests the acute post-pandemic nursing shortage is easing. But physician and behavioral health bonuses remain elevated \u2014 these are the roles where FQHCs compete most directly with better-funded systems.",
        },
      ],
    },
    {
      heading: "The Funding Collision: 5 Revenue Threats Before January 2027",
      content: [
        {
          type: "paragraph",
          text: "The jobs data shows a healthcare sector that\u2019s still hiring. But the revenue threats converging on FQHCs could reshape that trajectory in the second half of 2026:",
        },
        {
          type: "list",
          items: [
            "$1 billion Medi-Cal Dental cut (July 1, 2026): Governor Newsom proposed slashing reimbursement rates by 40\u201380%. A California Dental Association survey found 49% of Medi-Cal dentists would leave the program. A 70+ group coalition is fighting it before the May Revise.",
            "Undocumented patient PPS elimination (July 1, 2026): FQHCs lose per-visit reimbursement for UIS patients. Estimated statewide impact: ~$1 billion (CHCF).",
            "Work requirement documentation (December 31, 2026): UC Berkeley estimates 8.2 million California adults (56% of Medi-Cal enrollees) will be subject to 80-hour/month activity requirements. 63% already work. FQHCs become the front line for patient navigation.",
            "Work requirement enforcement (January 1, 2027): Nebraska begins May 1 \u2014 the first real-world test. KFF projects 5.3 million will lose coverage nationally.",
            "340B rebate model uncertainty (HRSA RFI due April 20): A potential shift from upfront discounts to delayed rebates would disrupt cash flow at small FQHCs.",
          ],
        },
        {
          type: "paragraph",
          text: "UC Berkeley Labor Center projects California could lose 109,000 to 217,000 jobs from Medicaid cuts \u2014 67% in healthcare. Economic impact: $18.5 to $37 billion in reduced output. For rural FQHCs where 82% of patient visits are Medi-Cal, one North State CEO warned CHCF: \u201C30% revenue loss means 30% staff cuts.\u201D",
        },
      ],
    },
    {
      heading: "The Federal Infrastructure Is Eroding",
      content: [
        {
          type: "paragraph",
          text: "The federal government has shed 355,000 jobs since October 2024 \u2014 11.8% of the workforce. HRSA alone has lost approximately 25% of its 2,700-person staff (KFF Health News). Grant processing is delayed, Project Officer response times have gone from days to weeks. The CMS Office of Minority Health (~40 employees) has been eliminated, threatening the CLAS Standards training FQHCs use for staff development.",
        },
        {
          type: "paragraph",
          text: "The paradox: the same administration is ramping up compliance enforcement. HRSA is conducting 30% more operational site visits. The OIG launched a CCM billing audit running through FY2028. The Ninth Circuit opened the door to False Claims Act liability for 340B overcharges. FQHCs face more scrutiny with less federal support to navigate it.",
        },
      ],
    },
    {
      heading: "What This Means for FQHC Workers and Leaders",
      content: [
        {
          type: "list",
          items: [
            "For job seekers: Healthcare is still the only sector creating jobs at scale. BLS projects 2 million new healthcare jobs by 2034. NP is the #1 fastest-growing healthcare role. CalAIM-funded positions (ECM, Community Supports) have the most durable revenue backing.",
            "For FQHC finance teams: Model your July 1 revenue impact now. The dental cut and UIS PPS elimination hit the same day. Run scenarios for 20%, 40%, and 60% dental volume reduction.",
            "For HR directors: MA turnover at 24% is your most expensive workforce problem. The NP pipeline is growing 35\u201340% \u2014 but so is competition for those graduates. NHSC loan repayment and mission alignment remain your strongest differentiators.",
            "For compliance teams: The HRSA 340B RFI comment period closes April 20. If you haven\u2019t filed, coordinate with CPCA and NACHC.",
            "For everyone: Watch Nebraska starting May 1. It\u2019s the 8-month preview of how work requirements affect CHC patient panels and revenue before California\u2019s January 2027 deadline.",
          ],
        },
      ],
    },
    {
      heading: "The Bottom Line",
      content: [
        {
          type: "paragraph",
          text: "Healthcare added 76,000 jobs in March and remains the backbone of the U.S. labor market. ADP says education and health services drove 93.5% of all private-sector job gains. BLS projects 2 million new healthcare jobs by 2034. The demand is structural and growing \u2014 driven by an aging population, behavioral health expansion, and the shift to ambulatory care where FQHCs operate.",
        },
        {
          type: "paragraph",
          text: "But NACHC data shows over 70% of FQHCs already can\u2019t fill critical roles. 24% annual MA turnover. 5,300 behavioral health vacancies. And the funding that supports these positions is about to face the most compressed crisis in FQHC history: a $1 billion dental cut, PPS elimination for undocumented patients, work requirements driving coverage loss, and 340B uncertainty \u2014 all within 7 months. The healthcare sector is creating jobs. The question is whether FQHCs can keep funding them.",
        },
      ],
    },
  ],
  relatedArticles: [
    {
      href: "/blog/february-2026-jobs-report-healthcare-crisis",
      title:
        "February 2026 Jobs Report: Healthcare Lost 28K Jobs for First Time in 4 Years",
    },
    {
      href: "/blog/healthcare-hiring-trends-2026",
      title:
        "Healthcare Hiring Trends 2026: What the Data Says",
    },
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Medi-Cal Cuts: What Community Health Workers Need to Know",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Informe de Datos",
  title:
    "Informe de Empleos Marzo 2026: Salud Agreg\u00f3 76,000 Empleos \u2014 Pero \u00bfQu\u00e9 Roles, y Por Cu\u00e1nto Tiempo?",
  breadcrumbTitle: "Informe de Empleos Marzo 2026",
  datePublished: "2026-04-06",
  dateDisplay: "6 de abril de 2026",
  readTime: "10 min de lectura",
  openingParagraph:
    "El sector salud domin\u00f3 el informe de empleos de marzo 2026, agregando 76,000 posiciones y representando el 43% de todo el crecimiento laboral no agr\u00edcola. Pero el papel del sector como motor principal de la econom\u00eda plantea preguntas inc\u00f3modas: \u00bfCu\u00e1nto de este crecimiento es real, qu\u00e9 roles est\u00e1n expandiendo realmente, y qu\u00e9 pasa cuando los recortes de Medicaid comiencen a afectar los ingresos? Aqu\u00ed est\u00e1 lo que los datos del BLS, las encuestas de fuerza laboral de NACHC y la investigaci\u00f3n del mercado laboral nos dicen.",
  sections: [
    {
      heading: "Los N\u00fameros de Marzo: Salud Carga la Econom\u00eda \u2014 Otra Vez",
      content: [
        {
          type: "paragraph",
          text: "EE.UU. agreg\u00f3 178,000 empleos no agr\u00edcolas en marzo, rebotando de la p\u00e9rdida revisada de 133,000 en febrero. Desempleo estable en 4.3%. Ingresos promedio por hora: $37.38 (+3.5% interanual). El promedio de tres meses: solo 68,000 empleos/mes, muy por debajo del ritmo de 150,000\u2013200,000 de 2023\u20132024.",
        },
        {
          type: "paragraph",
          text: "La dominancia de salud es ahora estructural. ADP encontr\u00f3 que educaci\u00f3n y servicios de salud agregaron 58,000 de 62,000 empleos privados totales \u2014 93.5%. Indeed reporta que salud represent\u00f3 aproximadamente 72% de todo el crecimiento neto de empleo en 2025. Cuando un sector carga todo el mercado laboral, cualquier disrupci\u00f3n a su financiamiento se convierte en un evento econ\u00f3mico nacional.",
        },
      ],
    },
    {
      heading: "D\u00f3nde Fueron los 76,000 Empleos de Salud: Desglose por Subcategor\u00eda",
      content: [
        {
          type: "list",
          items: [
            "Servicios de salud ambulatoria: +54,000 \u2014 Incluye consultorios m\u00e9dicos (+35,000, mayormente regresos de la huelga de Kaiser), centros de atenci\u00f3n ambulatoria y agencias de salud domiciliaria.",
            "Hospitales: +15,000 \u2014 Contrataci\u00f3n constante.",
            "Centros de enfermer\u00eda y residenciales: +7,200 \u2014 Crecimiento modesto en un subsector que ha ido disminuyendo respecto a la atenci\u00f3n ambulatoria.",
          ],
        },
        {
          type: "paragraph",
          text: "La tendencia subyacente, contabilizando la huelga, es de 29,000\u201341,000 empleos de salud por mes. La atenci\u00f3n ambulatoria ha crecido del 34% al 40% del empleo total de salud desde 2000 (ADP Research) \u2014 los FQHCs est\u00e1n exactamente en este segmento de crecimiento.",
        },
      ],
    },
    {
      heading: "\u00bfQu\u00e9 Roles de Salud Crecen M\u00e1s R\u00e1pido?",
      content: [
        {
          type: "list",
          items: [
            "Enfermeros Practicantes (NP): +35\u201340% de crecimiento proyectado, el #1 m\u00e1s r\u00e1pido en salud. Salario medio: $129,210.",
            "Auxiliares de Salud Domiciliaria: +17% de crecimiento, 765,800 aperturas anuales \u2014 m\u00e1s que cualquier otra ocupaci\u00f3n.",
            "Asistentes M\u00e9dicos (MA): +12% de crecimiento, 112,300 aperturas anuales.",
            "Trabajadores de Salud Comunitaria (CHW): +11% de crecimiento. La certificaci\u00f3n CHW de California sigue paralizada desde noviembre 2023.",
            "Ocupaciones de apoyo en salud: +12.4% de crecimiento \u2014 m\u00e1s r\u00e1pido que los profesionales (+7.2%).",
          ],
        },
        {
          type: "paragraph",
          text: "Los roles de m\u00e1s r\u00e1pido crecimiento son exactamente los que los FQHCs m\u00e1s necesitan \u2014 y los que tienen las tasas m\u00e1s altas de vacantes y rotaci\u00f3n.",
        },
      ],
    },
    {
      heading: "La Crisis de Fuerza Laboral FQHC: Datos NACHC 2025",
      content: [
        {
          type: "list",
          items: [
            "310,000+ empleados en 16,000+ sitios atendiendo 52 millones de pacientes.",
            "Proveedores de salud conductual: ~5,300 vacantes (mayor d\u00e9ficit absoluto), ~20% tasa de vacantes.",
            "M\u00e9dicos: ~2,000 vacantes, ~20\u201321% tasa de vacantes.",
            "NPs y PAs: ~2,800 vacantes.",
            "Parteras Certificadas: ~26% tasa de vacantes.",
            "El 70%+ de FQHCs reportan escasez cr\u00edtica en m\u00e9dicos, enfermeros y proveedores de salud mental.",
          ],
        },
        {
          type: "paragraph",
          text: "La rotaci\u00f3n agrava el problema: Asistentes m\u00e9dicos rotan al 24% anual \u2014 la m\u00e1s alta de cualquier rol FQHC. Higienistas y asistentes dentales al 18%. Personal administrativo y enfermeros registrados al 15%.",
        },
      ],
    },
    {
      heading: "La Colisi\u00f3n de Financiamiento: 5 Amenazas Antes de Enero 2027",
      content: [
        {
          type: "list",
          items: [
            "Recorte de $1B en Dental de Medi-Cal (1 de julio, 2026): Reducci\u00f3n de tasas del 40\u201380%. El 49% de dentistas abandonar\u00edan el programa (CDA).",
            "Eliminaci\u00f3n de PPS para pacientes indocumentados (1 de julio, 2026): ~$1B de impacto estatal (CHCF).",
            "Documentaci\u00f3n de requisitos laborales (31 dic, 2026): 8.2 millones de adultos de CA sujetos a 80 horas/mes (UC Berkeley).",
            "Aplicaci\u00f3n de requisitos laborales (1 de enero, 2027): Nebraska comienza mayo 1 \u2014 el canario nacional (KFF).",
            "Incertidumbre del modelo de reembolso 340B (RFI vence 20 abril): Posible cambio a reembolsos diferidos.",
          ],
        },
        {
          type: "paragraph",
          text: "UC Berkeley proyecta 109,000 a 217,000 empleos de California en riesgo \u2014 67% en salud. Para FQHCs rurales: 82% de visitas son Medi-Cal. \u201C30% de p\u00e9rdida de ingresos significa 30% de recortes de personal.\u201D",
        },
      ],
    },
    {
      heading: "Lo Que Significa para Trabajadores y L\u00edderes de FQHCs",
      content: [
        {
          type: "list",
          items: [
            "Para buscadores de empleo: Salud sigue siendo el \u00fanico sector creando empleos a escala. NP es el rol #1 de mayor crecimiento. Posiciones CalAIM tienen el respaldo de ingresos m\u00e1s duradero.",
            "Para equipos financieros: Modele el impacto del 1 de julio ahora. El recorte dental y la eliminaci\u00f3n PPS golpean el mismo d\u00eda.",
            "Para directores de RH: La rotaci\u00f3n de MA al 24% es su problema m\u00e1s costoso. NHSC y la misi\u00f3n siguen siendo sus diferenciadores m\u00e1s fuertes.",
            "Para todos: Observe Nebraska a partir del 1 de mayo \u2014 vista previa de 8 meses antes de la fecha l\u00edmite de California.",
          ],
        },
      ],
    },
    {
      heading: "La Conclusi\u00f3n",
      content: [
        {
          type: "paragraph",
          text: "Salud agreg\u00f3 76,000 empleos en marzo y sigue siendo el pilar del mercado laboral. ADP dice que salud impuls\u00f3 93.5% de las ganancias privadas. BLS proyecta 2 millones de nuevos empleos de salud para 2034. La demanda es estructural. Pero NACHC muestra que el 70%+ de FQHCs ya no pueden llenar roles cr\u00edticos. Rotaci\u00f3n de MA al 24%. 5,300 vacantes de salud conductual. Y el financiamiento est\u00e1 a punto de enfrentar la crisis m\u00e1s comprimida en la historia de FQHCs. El sector salud est\u00e1 creando empleos. La pregunta es si los FQHCs pueden seguir financi\u00e1ndolos.",
        },
      ],
    },
  ],
  relatedArticles: [
    {
      href: "/blog/february-2026-jobs-report-healthcare-crisis",
      title:
        "Informe de Empleos de Febrero 2026: Salud Perdi\u00f3 28K Empleos por Primera Vez en 4 A\u00f1os",
    },
    {
      href: "/blog/healthcare-hiring-trends-2026",
      title:
        "Tendencias de Contrataci\u00f3n en Salud 2026: Lo Que Dicen los Datos",
    },
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Recortes de Medi-Cal: Lo Que los Trabajadores de Salud Necesitan Saber",
    },
  ],
};

export default async function MarchJobsReportArticle() {
  const locale = await getLocale();
  const isEs = locale === "es";
  const content = isEs ? esContent : enContent;
  const slug = "march-2026-jobs-report-fqhc-hiring-slowdown";

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title={enContent.title}
        description="Healthcare added 76,000 jobs in March 2026. BLS subcategory breakdown, NACHC vacancy data, fastest-growing roles, and the 5 revenue threats converging on FQHCs before January 2027."
        datePublished="2026-04-06"
        slug={slug}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.fqhctalent.com" },
          { name: "Blog", url: "https://www.fqhctalent.com/blog" },
          {
            name: "March 2026 Jobs Report",
            url: `https://www.fqhctalent.com/blog/${slug}`,
          },
        ]}
      />
      <ContentViewTracker contentType="blog" contentId={slug} />
      <BlogArticleToolbar slug={slug} />

      <article className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-stone-500">
            <Link href="/" className="hover:text-stone-700">
              {isEs ? "Inicio" : "Home"}
            </Link>{" "}
            &rarr;{" "}
            <Link href="/blog" className="hover:text-stone-700">
              Blog
            </Link>{" "}
            &rarr; {content.breadcrumbTitle}
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
              <span>&middot;</span>
              <span>{content.readTime}</span>
            </div>
            <AuthorByline />
            <InlineShareButtons slug={slug} title={enContent.title} />
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl leading-relaxed text-stone-600">
              {content.openingParagraph}
            </p>

            {/* TL;DR Card */}
            <TLDRCard
              items={[
                "Healthcare added 76,000 jobs in March (43% of all nonfarm gains). But 35,000 were Kaiser strike returns \u2014 underlying trend is ~29,000\u201341,000/month.",
                "ADP: Education and health services drove 93.5% of all private-sector job gains. Indeed: Healthcare = ~72% of all 2025 net job growth. One sector is carrying the entire economy.",
                "NACHC: 70%+ of FQHCs report critical staffing shortages. 5,300 behavioral health vacancies. 24% annual MA turnover. NPs are the fastest-growing role (+35\u201340%).",
                "5 revenue threats converge before Jan 2027: $1B dental cut + UIS PPS elimination (July 1), work requirements (Dec 31 \u2192 Jan 1), 340B uncertainty (RFI April 20). UC Berkeley: up to 217,000 CA jobs at risk.",
              ]}
              esItems={[
                "Salud agreg\u00f3 76,000 empleos en marzo (43% del total). Pero 35,000 fueron regresos de huelga de Kaiser \u2014 tendencia subyacente: ~29,000\u201341,000/mes.",
                "ADP: Educaci\u00f3n y salud impulsaron 93.5% de ganancias del sector privado. Indeed: Salud = ~72% del crecimiento neto de empleo en 2025.",
                "NACHC: 70%+ de FQHCs reportan escasez cr\u00edtica. 5,300 vacantes de salud conductual. 24% rotaci\u00f3n anual de MA. NPs son el rol de m\u00e1s r\u00e1pido crecimiento (+35\u201340%).",
                "5 amenazas convergen antes de enero 2027: recorte dental + eliminaci\u00f3n PPS (1 julio), requisitos laborales (31 dic \u2192 1 enero), incertidumbre 340B. UC Berkeley: hasta 217,000 empleos de CA en riesgo.",
              ]}
            />

            {/* Stat Callouts */}
            <div className="my-8 grid gap-4 sm:grid-cols-3">
              <StatCallout
                stat="76K"
                label="Healthcare jobs added (March)"
                esLabel="Empleos de salud agregados (marzo)"
              />
              <StatCallout
                stat="5,300"
                label="FQHC behavioral health vacancies"
                esLabel="Vacantes de salud conductual FQHC"
              />
              <StatCallout
                stat="24%"
                label="Annual MA turnover at FQHCs"
                esLabel="Rotaci\u00f3n anual de MA en FQHCs"
              />
            </div>

            {content.sections.map((section, i) => (
              <div key={i}>
                <h2 className="mt-12 text-2xl font-bold text-stone-900">
                  {section.heading}
                </h2>
                {section.content.map((block, j) =>
                  block.type === "paragraph" ? (
                    <p key={j} className="mt-4 text-stone-700">
                      {block.text}
                    </p>
                  ) : (
                    <ul
                      key={j}
                      className="mt-4 list-disc space-y-2 pl-6 text-stone-700"
                    >
                      {block.items?.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}

                {/* Visual: BLS subcategory bar chart after section 1 */}
                {i === 1 && (
                  <div className="my-8 space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500">
                      {isEs ? "Desglose de Empleos de Salud de Marzo" : "March Healthcare Jobs Breakdown"}
                    </h4>
                    {[
                      { label: isEs ? "Atenci\u00f3n ambulatoria" : "Ambulatory Care", value: 54000, pct: 71, note: isEs ? "35K = regresos de huelga Kaiser" : "35K = Kaiser strike returns" },
                      { label: isEs ? "Hospitales" : "Hospitals", value: 15000, pct: 20, note: isEs ? "Contrataci\u00f3n constante" : "Steady hiring" },
                      { label: isEs ? "Enfermer\u00eda/Residencial" : "Nursing/Residential", value: 7200, pct: 9, note: isEs ? "Crecimiento modesto" : "Modest growth" },
                    ].map((row, idx) => (
                      <div key={idx} className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm font-semibold text-stone-800">{row.label}</span>
                          <span className="text-lg font-bold text-teal-700">+{row.value.toLocaleString()}</span>
                        </div>
                        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-stone-200">
                          <div className="h-full rounded-full bg-teal-600" style={{ width: `${row.pct}%` }} />
                        </div>
                        <p className="mt-1 text-xs text-stone-500">{row.note}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Visual: Role growth cards after section 2 */}
                {i === 2 && (
                  <div className="my-8 grid gap-3 sm:grid-cols-2">
                    {[
                      { role: isEs ? "Enfermeros Practicantes" : "Nurse Practitioners", growth: "+35\u201340%", wage: "$129,210", openings: "32,700/yr", color: "bg-teal-50 border-teal-200" },
                      { role: isEs ? "Auxiliares de Salud" : "Home Health Aides", growth: "+17%", wage: "$34,900", openings: "765,800/yr", color: "bg-amber-50 border-amber-200" },
                      { role: isEs ? "Asistentes M\u00e9dicos" : "Medical Assistants", growth: "+12%", wage: isEs ? "Entrada a RN/NP" : "Entry to RN/NP", openings: "112,300/yr", color: "bg-stone-50 border-stone-200" },
                      { role: isEs ? "Trabajadores de Salud Comunitaria" : "Community Health Workers", growth: "+11%", wage: isEs ? "Cert. CA paralizada" : "CA cert stalled", openings: "7,800/yr", color: "bg-stone-50 border-stone-200" },
                    ].map((r, idx) => (
                      <div key={idx} className={`rounded-xl border-2 p-4 ${r.color}`}>
                        <p className="text-2xl font-extrabold text-teal-800">{r.growth}</p>
                        <p className="mt-1 font-semibold text-stone-800">{r.role}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-stone-600">
                          <span>{r.wage}</span>
                          <span className="text-stone-300">|</span>
                          <span>{r.openings} {isEs ? "aperturas" : "openings"}</span>
                        </div>
                      </div>
                    ))}
                    <p className="col-span-full mt-1 text-xs text-stone-400">{isEs ? "Fuente: Proyecciones de Empleo BLS 2024\u20132034" : "Source: BLS Employment Projections 2024\u20132034"}</p>
                  </div>
                )}

                {/* Visual: Funding cliff countdown after section 5 (revenue threats) */}
                {i === 5 && (
                  <FundingCliffCard
                    cliffs={[
                      { title: { en: "$1B Medi-Cal Dental Cut", es: "Recorte de $1B en Dental Medi-Cal" }, date: "2026-07-01", impact: { en: "40\u201380% rate reduction \u2014 49% of dentists would leave (CDA)", es: "Reducci\u00f3n del 40\u201380% \u2014 49% de dentistas abandonar\u00edan (CDA)" }, urgency: "critical" },
                      { title: { en: "UIS Patient PPS Elimination", es: "Eliminaci\u00f3n de PPS para Pacientes UIS" }, date: "2026-07-01", impact: { en: "~$1B statewide revenue impact (CHCF)", es: "~$1B de impacto estatal (CHCF)" }, urgency: "critical" },
                      { title: { en: "Work Requirement Documentation", es: "Documentaci\u00f3n de Requisitos Laborales" }, date: "2026-12-31", impact: { en: "8.2M CA adults in scope; 63% already work (UC Berkeley)", es: "8.2M adultos de CA; 63% ya trabajan (UC Berkeley)" }, urgency: "high" },
                      { title: { en: "Work Requirement Enforcement", es: "Aplicaci\u00f3n de Requisitos Laborales" }, date: "2027-01-01", impact: { en: "Nebraska starts May 1 \u2014 national canary (KFF)", es: "Nebraska comienza 1 de mayo \u2014 canario nacional (KFF)" }, urgency: "high" },
                      { title: { en: "340B RFI Comment Deadline", es: "Fecha L\u00edmite de Comentarios RFI 340B" }, date: "2026-04-20", impact: { en: "Potential shift to delayed rebates (Federal Register)", es: "Posible cambio a reembolsos diferidos (Federal Register)" }, urgency: "moderate" },
                    ]}
                  />
                )}

                {/* Pull quote after section 3 (NACHC data) */}
                {i === 3 && (
                  <blockquote className="my-8 border-l-4 border-amber-500 bg-amber-50 py-4 pl-6 pr-4">
                    <p className="text-lg font-semibold text-stone-800">
                      {isEs
                        ? "Los FQHCs no solo luchan por contratar. Luchan por retener a la gente que ya tienen."
                        : "FQHCs aren\u2019t just struggling to hire. They\u2019re struggling to keep the people they have."}
                    </p>
                    <p className="mt-2 text-sm text-stone-500">\u2014 NACHC 2025 Staffing Survey</p>
                  </blockquote>
                )}
              </div>
            ))}

            {/* Sources */}
            <div className="mt-12 rounded-lg border border-stone-200 bg-stone-50 p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-500">
                {isEs ? "Fuentes" : "Sources"}
              </h3>
              <ul className="space-y-1 text-sm text-stone-600">
                <li><a href="https://www.bls.gov/news.release/empsit.nr0.htm" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">BLS Employment Situation \u2014 March 2026</a></li>
                <li><a href="https://mediacenter.adp.com/2026-04-01-ADP-National-Employment-Report-Private-Sector-Employment-Increased-by-62,000-Jobs-in-March-Annual-Pay-was-Up-4-5" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">ADP National Employment Report \u2014 March 2026</a></li>
                <li><a href="https://www.adpresearch.com/health-care-is-reshaping-the-labor-market/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">ADP Research: Health Care Is Reshaping the Labor Market</a></li>
                <li><a href="https://www.hiringlab.org/2026/04/03/march-2026-jobs-report-a-bumpy-road-and-a-moving-finish-line/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Indeed Hiring Lab: March 2026 Jobs Report</a></li>
                <li><a href="https://www.hiringlab.org/2026/02/26/healthcare-hiring-keeps-signing-bonuses-alive-in-a-cooling-labor-market/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Indeed: Healthcare Signing Bonuses \u2014 February 2026</a></li>
                <li><a href="https://www.nachc.org/looming-medicaid-changes-threaten-to-deepen-the-community-health-center-workforce-crisis/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">NACHC: Medicaid Changes Threaten CHC Workforce</a></li>
                <li><a href="https://www.nachc.org/investing-in-the-primary-care-front-line-why-chcs-need-workforce-investment-now/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">NACHC: 2025 Staffing Survey \u2014 Primary Care Workforce</a></li>
                <li><a href="https://www.bls.gov/news.release/pdf/ecopro.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">BLS Employment Projections 2024\u20132034</a></li>
                <li><a href="https://laborcenter.berkeley.edu/california-could-lose-up-to-217000-jobs-if-congress-cuts-medicaid/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">UC Berkeley: California Could Lose Up to 217,000 Jobs</a></li>
                <li><a href="https://www.cda.org/newsroom/advocacy/cda-convened-coalition-of-70-plus-groups-fights-to-stop-1b-cuts-to-medi-cal-dental/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">CDA: Save Our Dental Care Coalition</a></li>
                <li><a href="https://www.kff.org/medicaid/a-closer-look-at-nebraska-the-first-state-planning-to-implement-a-medicaid-work-requirement/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">KFF: Nebraska Work Requirements Analysis</a></li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <ArticleCTA audience="both" />

          {/* Related Articles */}
          <div className="mt-16 border-t border-stone-200 pt-8">
            <h3 className="mb-4 text-lg font-semibold text-stone-900">
              {isEs ? "Art\u00edculos Relacionados" : "Related Articles"}
            </h3>
            <div className="space-y-3">
              {content.relatedArticles.map((article, i) => (
                <Link
                  key={i}
                  href={article.href}
                  className="block text-teal-700 hover:text-teal-900 hover:underline"
                >
                  {article.title} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
