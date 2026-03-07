"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { TLDRCard, StatCallout } from "@/components/blog/BlogDataViz";

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
    "The February 2026 Jobs Report: Healthcare Was Holding Up the Economy. Now It's Cracking.",
  description:
    "The U.S. lost 92,000 jobs in February 2026. Healthcare — which had been creating 121% of all job growth — went negative for the first time in years. What the BLS data, the Kaiser strike, and looming Medicaid cuts mean for FQHCs.",
  breadcrumbTitle: "February 2026 Jobs Report",
  datePublished: "2026-03-06",
  dateDisplay: "March 6, 2026",
  readTime: "12 min read",
  openingParagraph:
    "One month ago, we reported that healthcare was driving 63% of all U.S. job growth. Today, the Bureau of Labor Statistics released the February 2026 Employment Situation report, and the picture has shifted dramatically: the U.S. economy lost 92,000 jobs, healthcare employment fell by 28,000, and the unemployment rate rose to 4.4%. This is the third negative payroll month in five. The economy has created essentially zero net jobs over the past six months.",
  sections: [
    {
      heading: "The Numbers: A Sharp Reversal",
      content: [
        {
          type: "paragraph",
          text: "The February 2026 BLS report was far worse than expected. Economists had forecasted +59,000 jobs; instead, the economy shed 92,000 positions. Private payrolls fell by 86,000. The labor force participation rate dropped to 62.0%, its lowest level since December 2021. The average duration of unemployment hit 25.7 weeks — also the longest since December 2021.",
        },
        {
          type: "paragraph",
          text: "Perhaps most alarming: December 2025 was revised from +48,000 jobs to -17,000 — a 65,000-job swing that transforms what seemed like a modest gain into another loss. Combined revisions to December and January erased 69,000 jobs from previous estimates. As Navy Federal Credit Union's Heather Long put it, the U.S. economy has now lost jobs on net since April 2025.",
        },
      ],
    },
    {
      heading: "Healthcare: The One Pillar That Was Holding Up the Economy",
      content: [
        {
          type: "paragraph",
          text: "To understand why this report is so significant for FQHCs, you need to understand a structural fact about the U.S. labor market: healthcare has been carrying the entire economy.",
        },
        {
          type: "list",
          items: [
            "In 2025, healthcare and social assistance added 693,000 jobs while the total economy added only 181,000 — meaning all other industries combined lost over 500,000 jobs (Glassdoor, Daniel Zhao).",
            "In January 2026, healthcare added 82,000 jobs — 63% of all 130,000 jobs created that month.",
            "Over the 12 months ending January 2026, healthcare created 436,000 jobs — representing 121% of all net job growth. Every other major sector was flat or negative (CEPR, Dean Baker).",
            "A San Francisco Fed analysis found that education and health services had driven 'almost all sustained job growth in 2025,' while every other major sector sat flat or declined.",
          ],
        },
        {
          type: "paragraph",
          text: "When one sector carries the entire economy, any disruption to that sector becomes a national crisis. That's exactly what happened in February.",
        },
      ],
    },
    {
      heading: "The Kaiser Strike: 31,000 Workers, 30 Days, National Impact",
      content: [
        {
          type: "paragraph",
          text: "Healthcare lost 28,000 jobs in February after adding 77,000 in January. The primary driver: 31,000 UNAC/UHCP nurses and healthcare professionals at Kaiser Permanente in California and Hawaii went on strike from January 26 to February 24 — the largest open-ended nurses strike in U.S. history.",
        },
        {
          type: "paragraph",
          text: "The BLS noted that healthcare employment 'decreased, reflecting strike activity.' Physicians' offices alone lost 37,400 jobs; hospitals actually added 11,600. The strike ended with a tentative agreement including a 21.5% wage increase over four years — a settlement that will set a new compensation benchmark for California healthcare workers, including those at FQHCs.",
        },
        {
          type: "paragraph",
          text: "As Omair Sharif of Inflation Insights observed: 'This is about a labor market so soft that it cannot withstand a strike of 31,000 healthcare workers, because no one else is hiring.' The Kaiser strike didn't cause the underlying weakness — it revealed it.",
        },
      ],
    },
    {
      heading: "February 2026 Healthcare Jobs by Subsector",
      content: [
        {
          type: "list",
          items: [
            "Physicians' Offices: -37,400 (strike-driven decline)",
            "Hospitals: +11,600 (continued hiring)",
            "Social Assistance: +9,000 (driven by individual & family services +12,000)",
            "Healthcare overall: -28,000 (after +77,000 in January)",
          ],
        },
        {
          type: "paragraph",
          text: "The February numbers will likely bounce back in March as striking workers return. But the underlying question raised by Marketplace's reporting is the one that matters for FQHCs: 'Healthcare jobs are growing. Can it last?'",
        },
      ],
    },
    {
      heading: "Why This Matters for FQHCs: The Structural Threat",
      content: [
        {
          type: "paragraph",
          text: "The Kaiser strike is temporary. The Medicaid funding cuts are not. H.R. 1 ('One Big Beautiful Bill') cuts $911 billion from Medicaid over 10 years, with California projected to lose approximately $30 billion annually. Work requirements, enrollment freezes, and PPS rate changes will directly reduce FQHC revenue — and with it, their ability to hire and retain staff.",
        },
        {
          type: "paragraph",
          text: "The paradox is staggering: healthcare is the only sector creating jobs at scale, the economy is structurally dependent on it, and Congress just enacted the largest Medicaid cuts in history targeting the very healthcare organizations — FQHCs, safety-net hospitals, community clinics — doing most of the hiring.",
        },
        {
          type: "list",
          items: [
            "70%+ of FQHCs already face critical staffing shortages, with vacancy rates over 20% in core roles (NACHC).",
            "Community health centers operated on a -2% average margin in 2024 (Azara Healthcare).",
            "Medi-Cal accounts for 82% of patient visits at some FQHCs and 40%+ of revenue sector-wide.",
            "65% of community health centers report employees leaving for better financial opportunities (NACHC).",
            "CHCF reauthorization expires December 2026, creating uncertainty that dampens long-term workforce commitments.",
          ],
        },
      ],
    },
    {
      heading: "The Government Employment Collapse",
      content: [
        {
          type: "paragraph",
          text: "Federal government employment fell by 10,000 in February. Since October 2024, federal government employment is down 330,000 jobs — 11% of the total federal workforce and the lowest level on record. While FQHCs are not direct government employers, they depend heavily on federal HRSA Section 330 grants, Medi-Cal/Medicaid reimbursement, and state/local government contracts. As the federal workforce contracts, so does the administrative capacity to process grants, manage reimbursements, and maintain the programs FQHCs rely on.",
        },
      ],
    },
    {
      heading: "California Is Ground Zero",
      content: [
        {
          type: "paragraph",
          text: "California sits at the intersection of every force shaping this crisis:",
        },
        {
          type: "list",
          items: [
            "The Kaiser strike was centered in California, directly affecting 31,000 workers.",
            "Alameda Health System announced 296 layoffs in January — then deferred 183 of them on March 4 while a working group addresses a $91.7M deficit.",
            "LA County faces $1.5 billion in federal cuts and is closing 7 DPH clinics.",
            "San Francisco is cutting $40M from public health and eliminating 500 city positions.",
            "San Diego County voted to overhaul its safety net, putting 400,000 residents at risk.",
            "UCLA Anderson Forecast projects California unemployment could hit 6.2% before recovering late 2026.",
            "WellSpace Health CEO Jonathan Porteus warned his clinics would 'not be able to hire as many medical staff,' forcing 'people waiting longer for care and more patients into emergency rooms.'",
          ],
        },
      ],
    },
    {
      heading: "What This Means for Community Health Workers",
      content: [
        {
          type: "paragraph",
          text: "The February jobs report underscores a dynamic we've been tracking on our Intelligence Dashboard: healthcare demand is structural and persistent, but funding to meet that demand is under unprecedented political attack. For community health professionals, the practical implications are:",
        },
        {
          type: "list",
          items: [
            "The FQHC Workforce Paradox persists: Some FQHCs are laying off while others are desperately hiring. The same role being cut at one center is being posted at another. Workers who can move across county lines or regions have the most options.",
            "The Kaiser settlement (21.5% over 4 years) will ripple across California healthcare compensation. FQHCs competing for nurses and clinical staff should expect wage pressure.",
            "CalAIM services (ECM, Community Supports) and CHW billing codes represent the most durable revenue streams — roles funded by these programs have the most job security.",
            "Grant-funded positions carry more risk than revenue-funded positions. Ask about funding sources during interviews.",
            "Healthcare will almost certainly rebound in March as Kaiser workers return. But the 6-month trend of zero net job creation nationally means the broader economy can't absorb displaced healthcare workers.",
          ],
        },
      ],
    },
    {
      heading: "The Bottom Line",
      content: [
        {
          type: "paragraph",
          text: "Healthcare has been the last pillar holding up the U.S. labor market. In February, it cracked — temporarily, because of a strike, but the crack revealed the fragility underneath. The economy is so dependent on healthcare job creation that a single labor action involving 31,000 workers produced a national payroll decline of 92,000. With Medicaid cuts now law, CHCF expiring in December, and California's safety net under unprecedented stress, the question is no longer whether healthcare can keep carrying the economy. It's what happens when it can't.",
        },
      ],
    },
  ],
  ctaTitle: "Stay Informed. Stay Ahead.",
  ctaDescription:
    "Our Intelligence Dashboard tracks funding cliffs, layoffs, policy changes, and workforce data updated daily — everything FQHC professionals need to navigate the 2026 crisis.",
  ctaButtonText: "Build Your Resume",
  relatedArticles: [
    {
      href: "/blog/healthcare-hiring-trends-2026",
      title:
        "Healthcare Hiring Trends 2026: What the Jobs Data Tells Us About FQHC Careers",
    },
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title: "Medi-Cal Funding Cuts: What Community Health Workers Need to Know",
    },
    {
      href: "/blog/laid-off-fqhc-fast-track-job-search",
      title: "Laid Off from an FQHC? How to Fast-Track Your Job Search",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Informe de Datos",
  title:
    "El Informe de Empleos de Febrero 2026: El Sector Salud Sostenía la Economía. Ahora Se Está Fracturando.",
  description:
    "EE.UU. perdió 92,000 empleos en febrero 2026. El sector salud — que había creado el 121% de todo el crecimiento laboral — se volvió negativo por primera vez en años. Lo que significan los datos del BLS, la huelga de Kaiser y los recortes de Medicaid para los FQHCs.",
  breadcrumbTitle: "Informe de Empleos Febrero 2026",
  datePublished: "2026-03-06",
  dateDisplay: "6 de marzo de 2026",
  readTime: "12 min de lectura",
  openingParagraph:
    "Hace un mes, reportamos que el sector salud impulsaba el 63% de todo el crecimiento laboral de EE.UU. Hoy, el Bureau of Labor Statistics publicó el informe de Situación del Empleo de febrero 2026, y el panorama cambió dramáticamente: la economía de EE.UU. perdió 92,000 empleos, el empleo en salud cayó 28,000, y la tasa de desempleo subió a 4.4%. Este es el tercer mes negativo en cinco. La economía ha creado esencialmente cero empleos netos en los últimos seis meses.",
  sections: [
    {
      heading: "Los Números: Una Reversión Abrupta",
      content: [
        {
          type: "paragraph",
          text: "El informe del BLS de febrero 2026 fue mucho peor de lo esperado. Los economistas habían pronosticado +59,000 empleos; en cambio, la economía eliminó 92,000 posiciones. Las nóminas privadas cayeron 86,000. La tasa de participación laboral bajó a 62.0%, su nivel más bajo desde diciembre 2021. La duración promedio del desempleo alcanzó 25.7 semanas — también la más larga desde diciembre 2021.",
        },
        {
          type: "paragraph",
          text: "Quizás lo más alarmante: diciembre 2025 fue revisado de +48,000 a -17,000 — un cambio de 65,000 empleos que transforma lo que parecía una ganancia modesta en otra pérdida. Las revisiones combinadas a diciembre y enero borraron 69,000 empleos de estimaciones anteriores. La economía de EE.UU. ha perdido empleos netos desde abril 2025.",
        },
      ],
    },
    {
      heading:
        "Sector Salud: El Único Pilar Que Sostenía la Economía",
      content: [
        {
          type: "paragraph",
          text: "Para entender por qué este informe es tan significativo para los FQHCs, hay que entender un hecho estructural del mercado laboral: el sector salud ha estado cargando toda la economía.",
        },
        {
          type: "list",
          items: [
            "En 2025, salud y asistencia social agregaron 693,000 empleos mientras la economía total agregó solo 181,000 — todas las demás industrias combinadas perdieron más de 500,000 empleos (Glassdoor, Daniel Zhao).",
            "En enero 2026, salud agregó 82,000 empleos — 63% de los 130,000 creados ese mes.",
            "En 12 meses hasta enero 2026, salud creó 436,000 empleos — 121% de todo el crecimiento neto. Todos los demás sectores fueron planos o negativos (CEPR, Dean Baker).",
            "Un análisis del Fed de San Francisco encontró que educación y servicios de salud impulsaron 'casi todo el crecimiento laboral sostenido en 2025.'",
          ],
        },
        {
          type: "paragraph",
          text: "Cuando un solo sector carga toda la economía, cualquier disrupción se convierte en una crisis nacional. Eso es exactamente lo que pasó en febrero.",
        },
      ],
    },
    {
      heading:
        "La Huelga de Kaiser: 31,000 Trabajadores, 30 Días, Impacto Nacional",
      content: [
        {
          type: "paragraph",
          text: "El sector salud perdió 28,000 empleos en febrero después de agregar 77,000 en enero. El impulsor principal: 31,000 enfermeros y profesionales de salud de UNAC/UHCP en Kaiser Permanente en California y Hawái hicieron huelga del 26 de enero al 24 de febrero — la mayor huelga abierta de enfermeras en la historia de EE.UU.",
        },
        {
          type: "paragraph",
          text: "El BLS señaló que el empleo en salud 'disminuyó, reflejando actividad de huelga.' Las oficinas de médicos perdieron 37,400 empleos; los hospitales agregaron 11,600. La huelga terminó con un acuerdo tentativo que incluye un aumento salarial de 21.5% en cuatro años — un acuerdo que establecerá un nuevo punto de referencia de compensación para trabajadores de salud de California.",
        },
        {
          type: "paragraph",
          text: "Como observó Omair Sharif de Inflation Insights: 'Se trata de un mercado laboral tan débil que no puede soportar una huelga de 31,000 trabajadores de salud, porque nadie más está contratando.' La huelga de Kaiser no causó la debilidad subyacente — la reveló.",
        },
      ],
    },
    {
      heading: "Empleos de Salud de Febrero 2026 por Subsector",
      content: [
        {
          type: "list",
          items: [
            "Consultorios Médicos: -37,400 (caída impulsada por huelga)",
            "Hospitales: +11,600 (contratación continua)",
            "Asistencia Social: +9,000 (impulsada por servicios individuales y familiares +12,000)",
            "Salud en general: -28,000 (después de +77,000 en enero)",
          ],
        },
        {
          type: "paragraph",
          text: "Los números de febrero probablemente se recuperarán en marzo cuando los trabajadores en huelga regresen. Pero la pregunta subyacente es la que importa para los FQHCs: 'Los empleos de salud están creciendo. ¿Puede durar?'",
        },
      ],
    },
    {
      heading:
        "Por Qué Esto Importa para FQHCs: La Amenaza Estructural",
      content: [
        {
          type: "paragraph",
          text: "La huelga de Kaiser es temporal. Los recortes de Medicaid no lo son. H.R. 1 recorta $911 mil millones de Medicaid en 10 años, con California proyectado a perder $30 mil millones anuales. Requisitos de trabajo, congelamientos de inscripción y cambios en tarifas PPS reducirán directamente los ingresos de FQHCs — y con ello, su capacidad de contratar y retener personal.",
        },
        {
          type: "paragraph",
          text: "La paradoja es asombrosa: el sector salud es el único creando empleos a escala, la economía depende estructuralmente de él, y el Congreso acaba de promulgar los mayores recortes de Medicaid de la historia dirigidos a las organizaciones de salud — FQHCs, hospitales de red de seguridad, clínicas comunitarias — que hacen la mayor parte de la contratación.",
        },
        {
          type: "list",
          items: [
            "70%+ de FQHCs ya enfrentan escasez crítica de personal, con tasas de vacantes superiores al 20% en roles centrales (NACHC).",
            "Los centros de salud comunitarios operaron con un margen promedio de -2% en 2024 (Azara Healthcare).",
            "Medi-Cal representa el 82% de las visitas de pacientes en algunos FQHCs y 40%+ de los ingresos del sector.",
            "65% de los centros de salud comunitarios reportan empleados que se van por mejores oportunidades financieras (NACHC).",
            "La reautorización de CHCF expira en diciembre 2026, creando incertidumbre que frena compromisos de fuerza laboral.",
          ],
        },
      ],
    },
    {
      heading: "El Colapso del Empleo Gubernamental",
      content: [
        {
          type: "paragraph",
          text: "El empleo del gobierno federal cayó 10,000 en febrero. Desde octubre 2024, el empleo federal ha caído 330,000 — 11% de la fuerza laboral federal total y el nivel más bajo registrado. Aunque los FQHCs no son empleadores gubernamentales directos, dependen de subvenciones HRSA Sección 330, reembolsos de Medi-Cal/Medicaid y contratos gubernamentales estatales/locales. A medida que la fuerza laboral federal se contrae, también se reduce la capacidad para procesar subvenciones, gestionar reembolsos y mantener los programas de los que dependen los FQHCs.",
        },
      ],
    },
    {
      heading: "California Está en el Epicentro",
      content: [
        {
          type: "paragraph",
          text: "California está en la intersección de cada fuerza que da forma a esta crisis:",
        },
        {
          type: "list",
          items: [
            "La huelga de Kaiser se centró en California, afectando directamente a 31,000 trabajadores.",
            "Alameda Health System anunció 296 despidos en enero — luego difirió 183 el 4 de marzo mientras un grupo de trabajo aborda un déficit de $91.7M.",
            "El condado de LA enfrenta $1.5 mil millones en recortes federales y está cerrando 7 clínicas del DPH.",
            "San Francisco está recortando $40M de salud pública y eliminando 500 puestos de la ciudad.",
            "El condado de San Diego votó para reformar su red de seguridad, poniendo en riesgo a 400,000 residentes.",
            "El pronóstico de UCLA Anderson proyecta que el desempleo de California podría alcanzar 6.2%.",
            "El CEO de WellSpace Health advirtió que sus clínicas 'no podrían contratar tanto personal médico,' forzando 'a la gente a esperar más por atención y más pacientes a las salas de emergencia.'",
          ],
        },
      ],
    },
    {
      heading:
        "Lo Que Esto Significa para los Trabajadores de Salud Comunitaria",
      content: [
        {
          type: "paragraph",
          text: "El informe de empleos de febrero subraya una dinámica que hemos estado rastreando en nuestro Dashboard: la demanda de salud es estructural y persistente, pero el financiamiento para satisfacerla está bajo un ataque político sin precedentes. Las implicaciones prácticas son:",
        },
        {
          type: "list",
          items: [
            "La Paradoja FQHC persiste: Algunos FQHCs despiden mientras otros contratan desesperadamente. El mismo rol eliminado en un centro se publica en otro. Trabajadores que pueden moverse entre condados o regiones tienen más opciones.",
            "El acuerdo de Kaiser (21.5% en 4 años) repercutirá en la compensación de salud de California. FQHCs compitiendo por enfermeras deben esperar presión salarial.",
            "Los servicios CalAIM (ECM, Community Supports) y códigos de facturación CHW representan los flujos de ingresos más duraderos — los roles financiados por estos programas tienen la mayor seguridad laboral.",
            "Las posiciones financiadas por subvenciones tienen más riesgo que las financiadas por ingresos. Pregunte sobre fuentes de financiamiento en las entrevistas.",
            "El sector salud casi seguramente se recuperará en marzo cuando los trabajadores de Kaiser regresen. Pero la tendencia de seis meses de cero creación neta de empleos significa que la economía general no puede absorber trabajadores de salud desplazados.",
          ],
        },
      ],
    },
    {
      heading: "La Conclusión",
      content: [
        {
          type: "paragraph",
          text: "El sector salud ha sido el último pilar sosteniendo el mercado laboral de EE.UU. En febrero, se fracturó — temporalmente, por una huelga, pero la fractura reveló la fragilidad debajo. La economía es tan dependiente de la creación de empleo en salud que una sola acción laboral de 31,000 trabajadores produjo una caída nacional de 92,000. Con los recortes de Medicaid ahora ley, CHCF expirando en diciembre y la red de seguridad de California bajo estrés sin precedentes, la pregunta ya no es si el sector salud puede seguir cargando la economía. Es qué pasa cuando no pueda.",
        },
      ],
    },
  ],
  ctaTitle: "Mantente Informado. Mantente Adelante.",
  ctaDescription:
    "Nuestro Dashboard rastrea precipicios de financiamiento, despidos, cambios de política y datos laborales actualizados diariamente — todo lo que los profesionales de FQHC necesitan para navegar la crisis de 2026.",
  ctaButtonText: "Construye Tu CV",
  relatedArticles: [
    {
      href: "/blog/healthcare-hiring-trends-2026",
      title:
        "Tendencias de Contratación en Salud 2026: Lo Que Dicen los Datos",
    },
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Recortes de Medi-Cal: Lo Que los Trabajadores de Salud Necesitan Saber",
    },
    {
      href: "/blog/laid-off-fqhc-fast-track-job-search",
      title: "Despedido de un FQHC? Cómo Acelerar Tu Búsqueda",
    },
  ],
};

export default function FebruaryJobsReportArticle() {
  const locale = useLocale();
  const content = locale === "es" ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title="The February 2026 Jobs Report: Healthcare Was Holding Up the Economy. Now It's Cracking."
        description="The U.S. lost 92,000 jobs in February 2026. Healthcare went negative for the first time in years. What the BLS data, Kaiser strike, and Medicaid cuts mean for FQHCs."
        datePublished="2026-03-06"
        slug="february-2026-jobs-report-healthcare-crisis"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.fqhctalent.com" },
          { name: "Blog", url: "https://www.fqhctalent.com/blog" },
          {
            name: "February 2026 Jobs Report",
            url: "https://www.fqhctalent.com/blog/february-2026-jobs-report-healthcare-crisis",
          },
        ]}
      />

      <article className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-stone-500">
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
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl leading-relaxed text-stone-600">
              {content.openingParagraph}
            </p>

            {/* TL;DR Card */}
            <TLDRCard
              items={[
                "The U.S. economy lost 92,000 jobs in February 2026 (expected: +59,000). Unemployment rose to 4.4%. This is the third negative payroll month in five.",
                "Healthcare lost 28,000 jobs — the first negative month in years. The 31,000-worker Kaiser Permanente strike (largest nurses strike in history) drove most of the decline.",
                "Healthcare has been carrying the entire labor market: 121% of net job growth over 12 months. All other sectors combined have been net negative.",
                "With H.R. 1 Medicaid cuts now law, CHCF expiring Dec 2026, and California safety-net systems under unprecedented stress, the sector propping up the economy is the same one being defunded.",
              ]}
              esItems={[
                "EE.UU. perdió 92,000 empleos en febrero 2026 (esperado: +59,000). Desempleo subió a 4.4%. Es el tercer mes negativo en cinco.",
                "Salud perdió 28,000 empleos — primer mes negativo en años. La huelga de 31,000 trabajadores de Kaiser (la mayor huelga de enfermeras de la historia) impulsó la caída.",
                "El sector salud ha cargado todo el mercado laboral: 121% del crecimiento neto en 12 meses. Todos los demás sectores combinados han sido negativos netos.",
                "Con los recortes de Medicaid de H.R. 1 ahora ley, CHCF expirando dic 2026, y los sistemas de red de seguridad de California bajo estrés, el sector que sostiene la economía es el mismo que está siendo desfinanciado.",
              ]}
            />

            {/* Key Stat: Jobs Lost */}
            <StatCallout
              stat="-92,000"
              label="Jobs lost in February 2026 — third negative month in five. Zero net job creation over 6 months."
              esLabel="Empleos perdidos en febrero 2026 — tercer mes negativo en cinco. Cero creación neta en 6 meses."
              detail="Source: BLS Employment Situation Report, February 2026 (released March 6, 2026)"
              esDetail="Fuente: Informe de Situación del Empleo del BLS, febrero 2026 (publicado 6 de marzo de 2026)"
            />

            {/* February Healthcare Jobs Viz */}
            <div className="my-8 rounded-xl border border-stone-200 bg-stone-50 p-6">
              <h3 className="mb-4 text-lg font-bold text-stone-900">
                {locale === "es"
                  ? "Empleos de Salud: Enero vs Febrero 2026"
                  : "Healthcare Jobs: January vs February 2026"}
              </h3>
              <div className="space-y-4">
                {/* January */}
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-stone-700">
                      {locale === "es" ? "Enero 2026" : "January 2026"}
                    </span>
                    <span className="font-bold text-teal-700">+77,000</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-stone-200">
                    <div
                      className="h-4 rounded-full bg-teal-600"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                {/* February */}
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-stone-700">
                      {locale === "es" ? "Febrero 2026" : "February 2026"}
                    </span>
                    <span className="font-bold text-red-700">-28,000</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-stone-200">
                    <div
                      className="h-4 rounded-full bg-red-500"
                      style={{ width: "36%" }}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-stone-400">
                {locale === "es"
                  ? "Nota: La caída de febrero refleja la huelga de 31,000 trabajadores de Kaiser Permanente (26 ene - 24 feb). Fuente: BLS"
                  : "Note: February decline reflects 31,000-worker Kaiser Permanente strike (Jan 26 - Feb 24). Source: BLS"}
              </p>
            </div>

            {/* Healthcare as % of economy stat */}
            <StatCallout
              stat="121%"
              label="of all U.S. net job growth over 12 months was in healthcare — every other sector was flat or negative"
              esLabel="de todo el crecimiento neto de empleo de EE.UU. en 12 meses fue en salud — todos los demás sectores fueron planos o negativos"
              detail="Source: CEPR analysis of BLS data (Dean Baker); Glassdoor (Daniel Zhao); SF Fed"
              esDetail="Fuente: Análisis CEPR de datos BLS (Dean Baker); Glassdoor (Daniel Zhao); Fed de SF"
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
              </div>
            ))}

            {/* Sources Section */}
            <div className="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6">
              <h3 className="mb-3 text-lg font-bold text-stone-900">
                {locale === "es" ? "Fuentes" : "Sources"}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-1.5 text-sm font-semibold text-stone-700">
                    {locale === "es" ? "Fuentes Primarias" : "Primary Sources"}
                  </h4>
                  <ul className="space-y-1 text-sm text-stone-600">
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.bls.gov/news.release/empsit.nr0.htm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        BLS Employment Situation Summary, February 2026
                      </a>{" "}
                      &mdash; bls.gov
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.dol.gov/newsroom/releases/osec/osec20260306"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        DOL Secretary Statement on February 2026 Jobs Report
                      </a>{" "}
                      &mdash; dol.gov
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        CHCF: How Massive Federal Cuts Will Create Unprecedented Challenges
                      </a>{" "}
                      &mdash; chcf.org
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.kff.org/medicaid/the-impact-of-h-r-1-on-two-medicaid-eligibility-rules/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        KFF: The Impact of H.R. 1 on Medicaid Eligibility Rules
                      </a>{" "}
                      &mdash; kff.org
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-1.5 text-sm font-semibold text-stone-700">
                    {locale === "es" ? "Análisis y Reportajes" : "Analysis & Reporting"}
                  </h4>
                  <ul className="space-y-1 text-sm text-stone-600">
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.washingtonpost.com/business/2026/03/06/february-jobs-unemployment/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        Washington Post: &quot;The U.S. labor market lost 92,000 jobs in February&quot;
                      </a>
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.npr.org/2026/03/06/nx-s1-5737603/jobs-labor-market-economy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        NPR: &quot;The U.S. unexpectedly loses 92,000 jobs&quot;
                      </a>
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.marketplace.org/story/2026/03/05/health-care-jobs-are-growing-can-it-last"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        Marketplace: &quot;Health care jobs are growing. Can it last?&quot;
                      </a>
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.hiringlab.org/2026/03/06/february-2026-jobs-report-overwhelmingly-disappointing/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        Indeed Hiring Lab: &quot;An Overwhelmingly Disappointing Report&quot;
                      </a>
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.epi.org/blog/u-s-economy-lost-an-alarming-92000-jobs-in-february-private-sector-experienced-vast-majority-of-losses-one-third-were-due-to-temporary-strikes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        EPI: &quot;U.S. economy lost an alarming 92,000 jobs in February&quot;
                      </a>
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://nurse.org/news/kaiser-strike-california-hawaii/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        Nurse.Org: Kaiser Strike Ends With 21.5% Raise
                      </a>
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.advisory.com/daily-briefing/2026/02/19/healthcare-jobs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        Advisory Board: Healthcare Leads Job Growth in January
                      </a>
                    </li>
                    <li>
                      &bull;{" "}
                      <a
                        href="https://www.chcf.org/resource/federal-funds-expand-support-california-health-workforce-explainer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        CHCF: Federal Funds Expand and Support California&apos;s Health Workforce
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-1.5 text-sm font-semibold text-stone-700">
                    {locale === "es" ? "Datos de FQHC Talent" : "FQHC Talent Data"}
                  </h4>
                  <ul className="space-y-1 text-sm text-stone-600">
                    <li>
                      &bull;{" "}
                      <a href="/layoffs" className="text-teal-700 underline hover:text-teal-900">
                        {locale === "es" ? "Rastreador de Despidos" : "Layoff Tracker"}
                      </a>{" "}
                      &mdash; 20 {locale === "es" ? "eventos" : "events"}, 3,477+ {locale === "es" ? "trabajadores" : "workers"}
                    </li>
                    <li>
                      &bull;{" "}
                      <a href="/" className="text-teal-700 underline hover:text-teal-900">
                        {locale === "es" ? "Dashboard de Inteligencia" : "Intelligence Dashboard"}
                      </a>{" "}
                      &mdash; {locale === "es" ? "actualizado diariamente" : "updated daily"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-xl border border-teal-200 bg-teal-50 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-stone-900">
              {content.ctaTitle}
            </h3>
            <p className="mb-6 text-lg text-stone-600">
              {content.ctaDescription}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-700 to-teal-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg"
              >
                {locale === "es"
                  ? "Ver Dashboard"
                  : "View Intelligence Dashboard"}
              </a>
              <a
                href="/resume-builder"
                className="inline-flex items-center justify-center rounded-lg border-2 border-teal-700 px-8 py-4 text-lg font-semibold text-teal-700 transition-colors hover:bg-teal-100"
              >
                {content.ctaButtonText}
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="mb-6 text-xl font-bold text-stone-900">
              {locale === "es" ? "Artículos Relacionados" : "Related Articles"}
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {content.relatedArticles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.href}
                  className="rounded-lg bg-stone-50 p-6 transition-all hover:shadow-md"
                >
                  <p className="mb-2 text-sm text-teal-700">
                    {content.category}
                  </p>
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
