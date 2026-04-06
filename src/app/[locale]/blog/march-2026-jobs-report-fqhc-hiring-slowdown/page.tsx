import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { TLDRCard, StatCallout } from "@/components/blog/BlogDataViz";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { ContentViewTracker } from "@/components/content/ContentViewTracker";
import { BlogArticleToolbar } from "@/components/blog/BlogArticleToolbar";
import { AuthorByline } from "@/components/blog/AuthorByline";
import { InlineShareButtons } from "@/components/blog/InlineShareButtons";

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
  category: "Data Report",
  title:
    "The March 2026 Jobs Report Looks Great on Paper. The Real Story Is in What\u2019s Coming Next.",
  description:
    "Healthcare added 76,000 jobs in March \u2014 but 35,000 were Kaiser strike returns, not new hiring. Meanwhile, our data shows a 34-job decline across 4 major California FQHCs. UC Berkeley projects up to 217,000 CA job losses from Medicaid cuts. The March BLS data, what our FQHC job tracker reveals, and the compound revenue crisis hitting July 1.",
  breadcrumbTitle: "March 2026 Jobs Report",
  datePublished: "2026-04-06",
  dateDisplay: "April 6, 2026",
  readTime: "10 min read",
  openingParagraph:
    "The March 2026 jobs report looks like a recovery story: +178,000 nonfarm jobs, healthcare adding 76,000, unemployment steady at 4.3%. Headlines called it a rebound after February\u2019s -133,000 shock. But look closer and a different picture emerges. Over a third of those healthcare gains were Kaiser strike workers returning to their desks \u2014 not new positions created. Strip that out, and underlying healthcare hiring averaged about 29,000 per month. Meanwhile, our own data tracking 4 major California FQHCs shows the sharpest hiring decline we\u2019ve recorded: -34 jobs in a single scan period. The national jobs report tells you where healthcare has been. Our data tells you where it\u2019s going.",
  sections: [
    {
      heading: "The Headline Numbers: Better Than Expected, but Read the Fine Print",
      content: [
        {
          type: "paragraph",
          text: "The U.S. economy added 178,000 nonfarm jobs in March 2026, rebounding from February\u2019s revised -133,000. Economists had expected just 60,000 \u2014 so the beat was significant. The unemployment rate held at 4.3%. Average hourly earnings rose 3.5% year-over-year to $37.38, slightly above inflation.",
        },
        {
          type: "paragraph",
          text: "But the three-month average tells the real story: just 68,000 jobs per month \u2014 well below the 150,000\u2013200,000 pace that characterized 2023\u20132024. The labor force participation rate fell to 61.9%, its lowest since fall 2021. The labor force shrank by nearly 400,000. The U-6 underemployment rate rose to 8%. The federal government has shed 355,000 jobs since October 2024 \u2014 an 11.8% decline that is historically unprecedented.",
        },
      ],
    },
    {
      heading: "Healthcare: Half the Story Is a Strike Bounce",
      content: [
        {
          type: "paragraph",
          text: "Healthcare added 76,000 jobs in March, making it the largest contributor to overall job growth \u2014 nearly half of all gains. But the details matter enormously for anyone trying to understand the actual trajectory of healthcare hiring:",
        },
        {
          type: "list",
          items: [
            "Ambulatory health care services: +54,000 \u2014 but 35,000 were physician office workers returning from the Kaiser Permanente strike.",
            "Hospitals: +15,000 \u2014 continued steady hiring.",
            "Other healthcare (nursing, residential, home health): +7,000.",
            "Adjusted for strike returns, underlying healthcare hiring was ~41,000 in March.",
          ],
        },
        {
          type: "paragraph",
          text: "In February 2026, healthcare lost 28,000 jobs \u2014 the first decline in over four years. That was the Kaiser strike. March\u2019s 76,000 includes the same workers coming back. Neither month tells the full story alone. The underlying trend is roughly 29,000\u201341,000 healthcare jobs per month \u2014 solid but nowhere near the 76,000 headline. As one analysis noted: this is \u201Ca one-time recovery rather than organic growth.\u201D",
        },
      ],
    },
    {
      heading: "What Our FQHC Job Tracker Shows: A 34-Job Drop Across 4 Major California FQHCs",
      content: [
        {
          type: "paragraph",
          text: "While the BLS reports national aggregates, we track real-time hiring at specific California FQHCs through their career page APIs. Our April 6 scan found the sharpest decline since we began tracking in February:",
        },
        {
          type: "list",
          items: [
            "Family Health Centers of San Diego: 128 jobs (\u221217 from 145) \u2014 biggest single-FQHC drop we\u2019ve tracked.",
            "La Clinica de La Raza: 174 jobs (\u221213 from 187) \u2014 sustained multi-week decline.",
            "AltaMed Health Services: 266 jobs (\u22124 from 270) \u2014 mild pullback after a hiring surge.",
            "Asian Health Services: 19 jobs (stable).",
            "Total API-scrapeable jobs: 587 (previous: 621, \u221234).",
          ],
        },
        {
          type: "paragraph",
          text: "This could be seasonal \u2014 Q2 budget recalibration is common. Or it could be an early signal. What makes it worth watching: FHCSD and La Clinica are both large, well-established FQHCs that serve as bellwethers for safety-net hiring in California. A simultaneous decline at both is unusual.",
        },
      ],
    },
    {
      heading: "The Compound Crisis: 5 Revenue Threats Converging Before 2027",
      content: [
        {
          type: "paragraph",
          text: "The March jobs report captures a snapshot. But the revenue threats accumulating for California FQHCs tell a story the jobs data can\u2019t:",
        },
        {
          type: "list",
          items: [
            "$1B Medi-Cal Dental cut (July 1, 2026): Governor Newsom proposed cutting reimbursement rates by 40\u201380%. 49% of Medi-Cal dentists say they\u2019d leave the program. A 70+ group coalition is fighting it before the May Revise.",
            "Undocumented patient PPS elimination (July 1, 2026): FQHCs lose per-visit reimbursement for UIS patients \u2014 ~$1B statewide impact.",
            "Work requirement documentation burden (Dec 31, 2026): 8.2 million California adults subject to 80-hour/month requirements. FQHCs become the front line for patient navigation.",
            "Work requirement enforcement (Jan 1, 2027): Patient panel shrinkage as procedural disenrollment begins. Nebraska starts May 1 \u2014 the national canary.",
            "340B rebate model uncertainty (HRSA RFI due April 20): Potential shift from upfront discounts to delayed rebates would devastate small FQHC cash flow.",
          ],
        },
        {
          type: "paragraph",
          text: "Each of these alone would be a major challenge. Together, they represent the most compressed revenue crisis California FQHCs have ever faced. The jobs report shows a healthy-looking healthcare sector. The policy calendar shows a sector about to be structurally reshaped.",
        },
      ],
    },
    {
      heading: "UC Berkeley: Up to 217,000 California Jobs at Risk from Medicaid Cuts",
      content: [
        {
          type: "paragraph",
          text: "The UC Berkeley Labor Center projects California could lose 109,000 to 217,000 jobs from $10\u2013$20 billion in annual Medi-Cal funding cuts. Two-thirds (67%) of those losses would be in healthcare \u2014 hospitals, clinics, nursing homes, home care. The economic impact extends to $18.5\u2013$37 billion in reduced output and $860 million to $1.7 billion in lost state and local tax revenue.",
        },
        {
          type: "paragraph",
          text: "Separately, Berkeley estimates 8.2 million California adults (56% of Medi-Cal enrollees, 35% of working-age adults statewide) would be subject to work requirements. Of these, 63% already work \u2014 42% full-time, 21% part-time. Another 29% can\u2019t work due to school, caregiving, illness, or disability. Only 8% are the \u201Ctarget\u201D population \u2014 but the documentation burden falls on everyone, and administrative churn will push coverage losses far beyond that 8%.",
        },
        {
          type: "paragraph",
          text: "For rural California FQHCs, the math is devastating: 82% of patient visits are paid by Medi-Cal, accounting for 60% of revenue. As one North State FQHC CEO warned: \u201C30% revenue loss means 30% staff cuts.\u201D",
        },
      ],
    },
    {
      heading: "The Federal Infrastructure Is Eroding Too",
      content: [
        {
          type: "paragraph",
          text: "The federal government has lost 355,000 jobs since October 2024 \u2014 11.8% of the workforce. HRSA alone has lost approximately 25% of its 2,700-person staff. Grant processing is delayed, Project Officer response times have gone from days to weeks, and data modernization efforts have halted. The CMS Office of Minority Health (~40 employees) has been eliminated, threatening the free CLAS Standards training that FQHCs rely on for cultural competency education.",
        },
        {
          type: "paragraph",
          text: "The paradox: the same administration cutting HRSA\u2019s capacity is also ramping up 340B audits and compliance enforcement. HRSA is conducting 30% more operational site visits, the OIG just launched a CCM billing audit running through FY2028, and the Ninth Circuit opened the door to False Claims Act liability for 340B overcharges. FQHCs face more compliance scrutiny with less federal support to navigate it.",
        },
      ],
    },
    {
      heading: "What This Means for FQHC Workers and Leaders",
      content: [
        {
          type: "paragraph",
          text: "The March jobs report paints a picture of healthcare as the economy\u2019s backbone \u2014 and it is. But for people working in or leading FQHCs, the actionable takeaways are more nuanced:",
        },
        {
          type: "list",
          items: [
            "For job seekers: The sector is still hiring \u2014 our tracker shows 1,885+ positions across 30+ FQHCs. But watch for roles funded by programs rather than grants. ECM, CCM, and CalAIM-funded positions have the most durable revenue backing.",
            "For FQHC finance teams: Model your July 1 revenue impact now. The dental cut and UIS PPS elimination hit the same day. Run scenarios for 20%, 40%, and 60% dental volume reduction.",
            "For HR directors: The 587-to-621 swing in our tracker suggests some FQHCs are entering a hiring pause. If your organization is still actively recruiting, you\u2019re competing for a smaller candidate pool against fewer competitors \u2014 that\u2019s an advantage.",
            "For compliance teams: The HRSA 340B RFI comment period closes April 20. If you haven\u2019t filed comments, coordinate with CPCA and NACHC. The rebate model would fundamentally change cash flow for 340B-dependent FQHCs.",
            "For everyone: Nebraska\u2019s May 1 work requirement enforcement is the canary in the coal mine. Watch what happens to CHC patient panels and revenue in Nebraska over the next 90 days \u2014 it\u2019s a preview of California\u2019s January 2027.",
          ],
        },
      ],
    },
    {
      heading: "The Bottom Line",
      content: [
        {
          type: "paragraph",
          text: "The March 2026 jobs report shows healthcare adding 76,000 jobs \u2014 but strip out the Kaiser strike bounce and the real pace is about 29,000\u201341,000 per month. Our FQHC job tracker recorded its sharpest decline yet: -34 jobs across 4 major California FQHCs. UC Berkeley projects up to 217,000 California jobs at risk from Medicaid cuts. A $1 billion dental reimbursement cut takes effect July 1, the same day FQHCs lose PPS payments for undocumented patients. Work requirements start generating documentation burden this summer and enforcement in January 2027.",
        },
        {
          type: "paragraph",
          text: "The jobs report tells you where healthcare was. Our data tells you where it\u2019s going. The numbers still look good on paper today. But the compound crisis hitting California\u2019s safety net between July 2026 and January 2027 will reshape FQHC employment in ways the BLS hasn\u2019t captured yet. The question isn\u2019t whether FQHCs will be affected \u2014 it\u2019s whether they prepare now or react later.",
        },
      ],
    },
  ],
  ctaTitle: "Stay Ahead of the Data",
  ctaDescription:
    "Our Intelligence Dashboard tracks funding cliffs, layoffs, policy changes, and job data updated daily \u2014 everything FQHC professionals need to navigate the 2026 crisis.",
  ctaButtonText: "Build Your Resume",
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
    "El Informe de Empleos de Marzo 2026 Se Ve Bien en Papel. La Verdadera Historia Est\u00e1 en Lo Que Viene.",
  description:
    "Salud agreg\u00f3 76,000 empleos en marzo \u2014 pero 35,000 fueron regresos de la huelga de Kaiser, no nuevas contrataciones. Mientras tanto, nuestros datos muestran una ca\u00edda de 34 empleos en 4 grandes FQHCs de California. UC Berkeley proyecta hasta 217,000 p\u00e9rdidas de empleo en CA por recortes de Medicaid.",
  breadcrumbTitle: "Informe de Empleos Marzo 2026",
  datePublished: "2026-04-06",
  dateDisplay: "6 de abril de 2026",
  readTime: "10 min de lectura",
  openingParagraph:
    "El informe de empleos de marzo 2026 parece una historia de recuperaci\u00f3n: +178,000 empleos no agr\u00edcolas, salud agregando 76,000, desempleo estable en 4.3%. Los titulares lo llamaron un rebote despu\u00e9s del shock de -133,000 en febrero. Pero mire m\u00e1s de cerca y emerge un panorama diferente. M\u00e1s de un tercio de esos empleos de salud fueron trabajadores de Kaiser regresando de la huelga \u2014 no nuevos puestos creados. Elimine eso, y la contrataci\u00f3n subyacente de salud promedi\u00f3 unos 29,000 por mes. Mientras tanto, nuestros propios datos que rastrean 4 FQHCs principales de California muestran la ca\u00edda de contrataci\u00f3n m\u00e1s aguda que hemos registrado: -34 empleos en un solo per\u00edodo de escaneo.",
  sections: [
    {
      heading: "Los N\u00fameros del Titular: Mejor de lo Esperado, Pero Lea la Letra Peque\u00f1a",
      content: [
        {
          type: "paragraph",
          text: "La econom\u00eda de EE.UU. agreg\u00f3 178,000 empleos no agr\u00edcolas en marzo 2026, rebotando del revisado -133,000 de febrero. Los economistas esperaban solo 60,000. La tasa de desempleo se mantuvo en 4.3%. Los ingresos promedio por hora crecieron 3.5% interanual a $37.38.",
        },
        {
          type: "paragraph",
          text: "Pero el promedio de tres meses cuenta la verdadera historia: solo 68,000 empleos por mes \u2014 muy por debajo del ritmo de 150,000\u2013200,000 de 2023\u20132024. La tasa de participaci\u00f3n laboral cay\u00f3 a 61.9%. La fuerza laboral se redujo en casi 400,000. El gobierno federal ha perdido 355,000 empleos desde octubre 2024 \u2014 una ca\u00edda del 11.8%.",
        },
      ],
    },
    {
      heading: "Salud: La Mitad de la Historia Es un Rebote de Huelga",
      content: [
        {
          type: "paragraph",
          text: "Salud agreg\u00f3 76,000 empleos en marzo \u2014 casi la mitad de todo el crecimiento laboral. Pero los detalles importan:",
        },
        {
          type: "list",
          items: [
            "Servicios de salud ambulatoria: +54,000 \u2014 pero 35,000 fueron trabajadores de consultorios m\u00e9dicos regresando de la huelga de Kaiser.",
            "Hospitales: +15,000 \u2014 contrataci\u00f3n constante.",
            "Otros servicios de salud: +7,000.",
            "Ajustado por regresos de huelga, la contrataci\u00f3n subyacente de salud fue ~41,000.",
          ],
        },
        {
          type: "paragraph",
          text: "En febrero 2026, salud perdi\u00f3 28,000 empleos \u2014 la primera ca\u00edda en m\u00e1s de cuatro a\u00f1os. Eso fue la huelga de Kaiser. Los 76,000 de marzo incluyen a los mismos trabajadores regresando. La tendencia subyacente es aproximadamente 29,000\u201341,000 empleos de salud por mes.",
        },
      ],
    },
    {
      heading: "Lo Que Muestra Nuestro Rastreador de Empleos FQHC: Ca\u00edda de 34 Empleos en 4 FQHCs de California",
      content: [
        {
          type: "paragraph",
          text: "Mientras el BLS reporta agregados nacionales, nosotros rastreamos contrataci\u00f3n en tiempo real en FQHCs espec\u00edficos de California. Nuestro escaneo del 6 de abril encontr\u00f3 la ca\u00edda m\u00e1s aguda desde que comenzamos a rastrear:",
        },
        {
          type: "list",
          items: [
            "Family Health Centers of San Diego: 128 empleos (\u221217 desde 145) \u2014 la mayor ca\u00edda por FQHC individual.",
            "La Cl\u00ednica de La Raza: 174 empleos (\u221213 desde 187) \u2014 declive sostenido.",
            "AltaMed Health Services: 266 empleos (\u22124 desde 270) \u2014 retroceso leve.",
            "Asian Health Services: 19 empleos (estable).",
            "Total de empleos API: 587 (anterior: 621, \u221234).",
          ],
        },
        {
          type: "paragraph",
          text: "Esto podr\u00eda ser estacional \u2014 la recalibraci\u00f3n presupuestaria del Q2 es com\u00fan. O podr\u00eda ser una se\u00f1al temprana. FHCSD y La Cl\u00ednica son FQHCs grandes y bien establecidos que sirven como barom\u00e9tros para la contrataci\u00f3n de red de seguridad en California.",
        },
      ],
    },
    {
      heading: "La Crisis Compuesta: 5 Amenazas de Ingresos Convergiendo Antes de 2027",
      content: [
        {
          type: "paragraph",
          text: "El informe de empleos captura una instant\u00e1nea. Pero las amenazas de ingresos acumul\u00e1ndose cuentan la historia que los datos de empleo no pueden:",
        },
        {
          type: "list",
          items: [
            "Recorte de $1B en Dental de Medi-Cal (1 de julio, 2026): Reducci\u00f3n de tasas del 40\u201380%. El 49% de los dentistas abandonar\u00edan el programa.",
            "Eliminaci\u00f3n de PPS para pacientes indocumentados (1 de julio, 2026): ~$1B de impacto estatal.",
            "Carga de documentaci\u00f3n de requisitos laborales (31 de dic, 2026): 8.2 millones de adultos de California sujetos a requisitos de 80 horas/mes.",
            "Aplicaci\u00f3n de requisitos laborales (1 de enero, 2027): Nebraska comienza el 1 de mayo \u2014 el canario nacional.",
            "Incertidumbre del modelo de reembolso 340B (RFI vence 20 de abril): Posible cambio de descuentos anticipados a reembolsos diferidos.",
          ],
        },
      ],
    },
    {
      heading: "UC Berkeley: Hasta 217,000 Empleos de California en Riesgo",
      content: [
        {
          type: "paragraph",
          text: "El Centro Laboral de UC Berkeley proyecta que California podr\u00eda perder entre 109,000 y 217,000 empleos por $10\u2013$20 mil millones en recortes anuales de Medi-Cal. Dos tercios (67%) de esas p\u00e9rdidas ser\u00edan en salud. El impacto econ\u00f3mico se extiende a $18.5\u2013$37 mil millones en producci\u00f3n reducida.",
        },
        {
          type: "paragraph",
          text: "Berkeley estima que 8.2 millones de adultos de California (56% de inscritos en Medi-Cal) estar\u00edan sujetos a requisitos laborales. De estos, el 63% ya trabaja. Solo el 8% es la poblaci\u00f3n \u201Cobjetivo\u201D \u2014 pero la carga administrativa afecta a todos. Para FQHCs rurales, el 82% de las visitas son pagadas por Medi-Cal. Como advirti\u00f3 un CEO de FQHC: \u201C30% de p\u00e9rdida de ingresos significa 30% de recortes de personal.\u201D",
        },
      ],
    },
    {
      heading: "La Infraestructura Federal Tambi\u00e9n Se Erosiona",
      content: [
        {
          type: "paragraph",
          text: "El gobierno federal ha perdido 355,000 empleos desde octubre 2024. HRSA ha perdido aproximadamente el 25% de su personal. La Oficina de Salud de Minor\u00edas de CMS (~40 empleados) ha sido eliminada, amenazando la capacitaci\u00f3n gratuita de Est\u00e1ndares CLAS. La paradoja: la misma administraci\u00f3n que recorta la capacidad de HRSA est\u00e1 intensificando auditor\u00edas de 340B y cumplimiento. Los FQHCs enfrentan m\u00e1s escrutinio con menos apoyo federal para navegarlo.",
        },
      ],
    },
    {
      heading: "Lo Que Esto Significa para Trabajadores y L\u00edderes de FQHCs",
      content: [
        {
          type: "list",
          items: [
            "Para buscadores de empleo: El sector sigue contratando \u2014 1,885+ posiciones. Busque roles financiados por programas (ECM, CCM, CalAIM) para mayor estabilidad.",
            "Para equipos financieros: Modele el impacto de ingresos del 1 de julio ahora. El recorte dental y la eliminaci\u00f3n de PPS golpean el mismo d\u00eda.",
            "Para directores de RH: La ca\u00edda de 587 a 621 en nuestro rastreador sugiere pausas de contrataci\u00f3n. Si est\u00e1 reclutando activamente, tiene ventaja competitiva.",
            "Para equipos de cumplimiento: El per\u00edodo de comentarios del RFI 340B cierra el 20 de abril. Coordine con CPCA y NACHC.",
            "Para todos: La aplicaci\u00f3n de requisitos laborales en Nebraska el 1 de mayo es el canario. Observe qu\u00e9 pasa con los paneles de pacientes de CHCs en Nebraska los pr\u00f3ximos 90 d\u00edas.",
          ],
        },
      ],
    },
    {
      heading: "La Conclusi\u00f3n",
      content: [
        {
          type: "paragraph",
          text: "El informe de empleos de marzo muestra salud agregando 76,000 empleos \u2014 pero elimine el rebote de huelga de Kaiser y el ritmo real es de 29,000\u201341,000. Nuestro rastreador de empleos FQHC registr\u00f3 su ca\u00edda m\u00e1s aguda: -34 empleos en 4 FQHCs principales. UC Berkeley proyecta hasta 217,000 empleos de California en riesgo. Un recorte dental de $1 mil millones entra en vigor el 1 de julio, el mismo d\u00eda que los FQHCs pierden pagos PPS para pacientes indocumentados. La crisis compuesta que golpear\u00e1 la red de seguridad de California entre julio 2026 y enero 2027 remodelar\u00e1 el empleo de FQHCs de maneras que el BLS a\u00fan no ha capturado. La pregunta no es si los FQHCs ser\u00e1n afectados \u2014 es si se preparan ahora o reaccionan despu\u00e9s.",
        },
      ],
    },
  ],
  ctaTitle: "Mantente Adelante de los Datos",
  ctaDescription:
    "Nuestro Dashboard de Inteligencia rastrea precipicios de financiamiento, despidos, cambios de pol\u00edtica y datos laborales actualizados diariamente.",
  ctaButtonText: "Construye Tu CV",
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
        description={enContent.description}
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
                "Healthcare added 76,000 jobs in March, but 35,000 were Kaiser strike workers returning \u2014 not new positions. Underlying healthcare hiring is 29,000\u201341,000/month.",
                "Our FQHC job tracker shows -34 jobs across 4 major CA FQHCs: FHCSD -17, La Clinica -13, AltaMed -4 \u2014 the sharpest decline we\u2019ve recorded.",
                "UC Berkeley projects 109,000\u2013217,000 California jobs at risk from Medicaid cuts. 67% would be in healthcare.",
                "5 revenue threats converge before Jan 2027: $1B dental cut (July 1), UIS PPS elimination (July 1), work requirement documentation (Dec 31), work requirement enforcement (Jan 1), and 340B rebate model uncertainty (RFI April 20).",
              ]}
              esItems={[
                "Salud agreg\u00f3 76,000 empleos en marzo, pero 35,000 fueron regresos de huelga de Kaiser \u2014 no nuevos puestos. Contrataci\u00f3n subyacente: 29,000\u201341,000/mes.",
                "Nuestro rastreador de empleos FQHC muestra -34 empleos en 4 FQHCs principales de CA: FHCSD -17, La Cl\u00ednica -13, AltaMed -4 \u2014 la ca\u00edda m\u00e1s aguda registrada.",
                "UC Berkeley proyecta 109,000\u2013217,000 empleos de California en riesgo por recortes de Medicaid. El 67% ser\u00edan en salud.",
                "5 amenazas de ingresos convergen antes de enero 2027: recorte dental de $1B (1 julio), eliminaci\u00f3n PPS (1 julio), documentaci\u00f3n de requisitos laborales (31 dic), aplicaci\u00f3n (1 enero), e incertidumbre 340B.",
              ]}
            />

            {/* Stat Callouts */}
            <div className="my-8 grid gap-4 sm:grid-cols-2">
              <StatCallout
                stat="587"
                label="FQHC API jobs (prev 621, \u221234)"
                esLabel="Empleos API de FQHC (prev 621, \u221234)"
              />
              <StatCallout
                stat="217K"
                label="CA jobs at risk (UC Berkeley)"
                esLabel="Empleos de CA en riesgo (UC Berkeley)"
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
              </div>
            ))}

            {/* Sources */}
            <div className="mt-12 rounded-lg border border-stone-200 bg-stone-50 p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-500">
                {isEs ? "Fuentes" : "Sources"}
              </h3>
              <ul className="space-y-1 text-sm text-stone-600">
                <li>
                  <a href="https://www.bls.gov/news.release/empsit.nr0.htm" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
                    BLS Employment Situation \u2014 March 2026
                  </a>
                </li>
                <li>
                  <a href="https://laborcenter.berkeley.edu/california-could-lose-up-to-217000-jobs-if-congress-cuts-medicaid/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
                    UC Berkeley Labor Center: California Job Loss Projections
                  </a>
                </li>
                <li>
                  <a href="https://laborcenter.berkeley.edu/eight-million-medi-cal-enrollees-at-risk-of-losing-health-coverage-if-congress-imposes-work-requirements/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
                    UC Berkeley: 8 Million Medi-Cal Enrollees at Risk
                  </a>
                </li>
                <li>
                  <a href="https://www.cda.org/newsroom/advocacy/cda-convened-coalition-of-70-plus-groups-fights-to-stop-1b-cuts-to-medi-cal-dental/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
                    CDA: Save Our Dental Care Coalition
                  </a>
                </li>
                <li>
                  <a href="https://www.kff.org/medicaid/a-closer-look-at-nebraska-the-first-state-planning-to-implement-a-medicaid-work-requirement/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
                    KFF: Nebraska Work Requirements Analysis
                  </a>
                </li>
                <li>
                  <a href="https://www.chcf.org/resource/federal-medicaid-cuts-would-devastate-health-care-systems-californias-vast-rural-north/" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
                    CHCF: Federal Cuts Would Devastate Rural CA
                  </a>
                </li>
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
