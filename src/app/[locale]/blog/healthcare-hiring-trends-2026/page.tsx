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
  category: "Data Report",
  title:
    "Healthcare Hiring Trends 2026: What the Jobs Data Tells Us About FQHC Careers",
  description:
    "Healthcare added 82,000 jobs in January 2026 — 63% of all U.S. job growth. We break down the BLS data, HRSA workforce projections, and what it means for community health center careers in California.",
  breadcrumbTitle: "Healthcare Hiring Trends 2026",
  datePublished: "2026-02-16",
  dateDisplay: "February 16, 2026",
  readTime: "10 min read",
  openingParagraph:
    "In January 2026, the U.S. economy added 130,000 jobs — and healthcare accounted for 82,000 of them. That means the healthcare sector drove 63% of all new employment in the country. For community health professionals, this isn't just a headline — it's a career signal. Here's what the latest jobs data tells us about where the opportunities are, what roles are growing fastest, and why FQHCs are at the center of this hiring surge.",
  sections: [
    {
      heading: "The Big Picture: Healthcare Is the Economy's Engine",
      content: [
        {
          type: "paragraph",
          text: "The January 2026 BLS Employment Situation report confirmed what workforce analysts have been watching for months: healthcare is the only sector consistently creating jobs at scale. While the broader economy has slowed — 2025 payroll gains were revised down by 400,000, leaving a monthly average of just 15,000 jobs — healthcare has accelerated.",
        },
        {
          type: "paragraph",
          text: "In January alone, the healthcare sector added 82,000 jobs — more than double its 2025 monthly average of 33,000. The combined Health Care and Social Assistance supersector added 123,500 jobs. This makes healthcare the undisputed leader in U.S. employment growth, and the trend shows no signs of slowing down.",
        },
      ],
    },
    {
      heading: "Where the Jobs Are: Subsector Breakdown",
      content: [
        {
          type: "paragraph",
          text: "Not all healthcare jobs are created equal. The BLS data reveals a clear pattern — the fastest growth is in outpatient, community-based care, exactly where FQHCs operate:",
        },
        {
          type: "list",
          items: [
            "Ambulatory Healthcare Services: +50,300 jobs (61% of healthcare gains) — This includes outpatient clinics, physician offices, home health agencies, and community health centers. This is the FQHC sector.",
            "Hospitals: +18,300 jobs (22% of healthcare gains) — Modest growth compared to outpatient settings, reflecting the ongoing shift toward community-based care models.",
            "Nursing & Residential Care: +13,300 jobs (16% of healthcare gains) — Continued recovery from pandemic-era staffing losses.",
          ],
        },
        {
          type: "paragraph",
          text: "The dominance of ambulatory care hiring — with over 50,000 new positions — is a direct indicator that community health centers, outpatient clinics, and primary care settings are where the growth is happening. If you're a community health worker, care coordinator, medical assistant, or nurse working in (or transitioning to) the outpatient space, the macro trends are firmly in your favor.",
        },
      ],
    },
    {
      heading: "The FQHC Workforce Paradox: Growing Demand, Funding Pressure",
      content: [
        {
          type: "paragraph",
          text: "Here's the tension: while healthcare hiring is booming nationally, many FQHCs in California are simultaneously laying off workers due to Medi-Cal funding cuts and federal reductions under H.R. 1. California WARN Act filings show 3,477+ displaced healthcare workers across 11 organizations statewide.",
        },
        {
          type: "paragraph",
          text: "This creates what we call the FQHC Workforce Paradox — the same types of roles being eliminated at one health center are urgently needed at another. An experienced ECM care coordinator laid off in Los Angeles may be the exact candidate an expanding FQHC in the Central Valley is desperately searching for.",
        },
        {
          type: "paragraph",
          text: "The national data supports this: HRSA reports that over 70% of FQHCs face critical shortages in physicians, nurses, and mental health providers, with vacancy rates exceeding 20% in many core roles. Meanwhile, NACHC data shows health centers now serve over 32.5 million patients — the highest in the program's 60-year history — with over 326,000 staff across 16,000+ sites nationally.",
        },
      ],
    },
    {
      heading: "California: 134,000 Jobs and a $25.5 Billion Impact",
      content: [
        {
          type: "paragraph",
          text: "California's community health centers are economic engines in their own right. According to CPCA's 2025 California State Profile, the state's CHCs generated over 134,000 jobs and produced $25.5 billion in economic output in 2023, contributing $3.1 billion in tax revenue.",
        },
        {
          type: "paragraph",
          text: "A major development: as of December 2024, Community Health Worker (CHW) services became a Medi-Cal benefit through a state plan amendment. This means CHW roles at FQHCs can now generate direct revenue through Medi-Cal billing — a structural change that should sustain and grow CHW positions even as other funding streams face pressure.",
        },
        {
          type: "paragraph",
          text: "California has approximately 270+ community health centers (including FQHCs, FQHC look-alikes, and free clinics) serving millions of residents. Our directory tracks 220 FQHCs across the state with detailed workforce and funding data.",
        },
      ],
    },
    {
      heading: "The Roles Growing Fastest",
      content: [
        {
          type: "paragraph",
          text: "Based on BLS Occupational Outlook projections (2024-2034) and our own job listings data, these community health roles are seeing the strongest demand:",
        },
        {
          type: "list",
          items: [
            "Community Health Workers (SOC 21-1094): BLS projects 11% growth from 2024–2034 — nearly four times the 3% average for all occupations. California has the highest concentration of CHW positions in the country.",
            "Medical Assistants: Consistently one of the most-posted roles at FQHCs, with 620+ active listings in our database. High turnover (32%+) drives constant hiring demand.",
            "Care Coordinators / Case Managers: Fueled by ECM, CCM, and CalAIM programs. These roles are revenue-generating for FQHCs and increasingly protected from budget cuts.",
            "Nurse Practitioners & Physician Assistants: FQHCs are aggressively hiring mid-level providers to expand access. NHSC loan repayment makes these roles especially attractive.",
            "Behavioral Health Specialists (LCSWs, LMFTs, Psychologists): HRSA projects a shortage of 136,350 psychologists nationally by 2038. Over 122 million Americans live in a Mental Health HPSA.",
            "Dental Hygienists & Dentists: A projected 46% shortage in non-metropolitan areas by 2038. FQHCs with dental programs are actively competing for this talent.",
          ],
        },
      ],
    },
    {
      heading: "What This Means for Your Career",
      content: [
        {
          type: "paragraph",
          text: "If you're a community health professional — whether you're currently employed, recently displaced, or considering a career transition — here's what the data tells us:",
        },
        {
          type: "list",
          items: [
            "The macro trend is your friend. Healthcare is the only sector consistently creating jobs at scale. Community-based care (where FQHCs operate) is growing faster than hospitals.",
            "Revenue-generating skills are your safety net. ECM, CCM, CalAIM, and Community Supports experience makes you harder to lay off and easier to hire. These programs generate direct revenue for FQHCs.",
            "Geography matters. The FQHC job market is regional and uneven. While some LA-area organizations are cutting, Central Valley, Sacramento, and Inland Empire FQHCs are expanding.",
            "Bilingual skills are premium. California's FQHCs serve predominantly Spanish-speaking communities. Bilingual candidates command 8-15% salary premiums and are always in demand.",
            "The CHW Medi-Cal benefit is a game-changer. Now that CHW services can bill Medi-Cal directly, these positions have a sustainable funding mechanism independent of grant cycles.",
          ],
        },
      ],
    },
    {
      heading: "Key Trends to Watch",
      content: [
        {
          type: "paragraph",
          text: "Based on data from California FQHC job postings, public BLS/HRSA reports, and WARN Act filings, here are the key trends shaping FQHC hiring in Q1 2026:",
        },
        {
          type: "list",
          items: [
            "Monthly BLS healthcare employment figures — will the 82,000-job January surge sustain into February/March?",
            "California FQHC layoff activity — WARN Act filings show 3,477+ displaced workers so far, with new filings possible as funding cuts take effect",
            "Medi-Cal funding cliff dates — PPS rate elimination (Oct 2026), dental reimbursement cuts (Jul 2026), and CalAIM waiver renewal (Dec 2026)",
            "CHW Medi-Cal billing adoption — how many FQHCs are implementing the new CHW billing codes, and what's the impact on hiring?",
            "SB 525 healthcare minimum wage implementation — phased $25/hr minimum by 2027 for FQHCs will restructure compensation across the sector",
          ],
        },
        {
          type: "paragraph",
          text: "Staying informed on these trends can help you make better career decisions — whether you're currently employed, job searching, or considering a move into community health.",
        },
      ],
    },
  ],
  ctaTitle: "Stay Ahead of the Trends",
  ctaDescription:
    "Navigate the healthcare hiring landscape with free tools designed for community health professionals: FQHC job listings, a bilingual resume builder, career assessment, and market intelligence.",
  ctaButtonText: "Build Your Free Resume",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Medi-Cal Funding Cuts: What Community Health Workers Need to Know",
    },
    {
      href: "/blog/fqhc-salary-negotiation-guide",
      title: "How to Negotiate Your FQHC Salary",
    },
    {
      href: "/blog/fqhc-career-ladder-ma-rn-provider",
      title: "The MA, RN & Provider Career Ladder at FQHCs",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Informe de Datos",
  title:
    "Tendencias de Contratación en Salud 2026: Lo Que los Datos Revelan Sobre Carreras en FQHCs",
  description:
    "El sector de salud añadió 82,000 empleos en enero 2026 — el 63% de todo el crecimiento laboral en EE.UU. Analizamos los datos del BLS, proyecciones de HRSA, y qué significa para carreras en centros de salud comunitarios en California.",
  breadcrumbTitle: "Tendencias de Contratación 2026",
  datePublished: "2026-02-16",
  dateDisplay: "16 de Febrero de 2026",
  readTime: "10 min",
  openingParagraph:
    "En enero de 2026, la economía de EE.UU. creó 130,000 empleos — y el sector de salud representó 82,000 de ellos. Eso significa que el sector de salud impulsó el 63% de todo el nuevo empleo en el país. Para profesionales de salud comunitaria, esto no es solo un titular — es una señal de carrera. Aquí te explicamos qué dicen los últimos datos sobre dónde están las oportunidades, qué roles crecen más rápido, y por qué los FQHCs están en el centro de esta ola de contratación.",
  sections: [
    {
      heading: "El Panorama: El Sector Salud Es el Motor de la Economía",
      content: [
        {
          type: "paragraph",
          text: "El informe de empleo del BLS de enero 2026 confirmó lo que analistas han estado observando durante meses: el sector salud es el único que crea empleos de forma consistente a gran escala. Mientras la economía en general se ha desacelerado — las ganancias de nómina de 2025 se revisaron a la baja en 400,000, dejando un promedio mensual de solo 15,000 empleos — el sector salud se ha acelerado.",
        },
        {
          type: "paragraph",
          text: "Solo en enero, el sector de salud añadió 82,000 empleos — más del doble de su promedio mensual de 33,000 en 2025. El supersector combinado de Salud y Asistencia Social añadió 123,500 empleos. Esto hace del sector salud el líder indiscutible en crecimiento de empleo en EE.UU., y la tendencia no muestra señales de desaceleración.",
        },
      ],
    },
    {
      heading: "Dónde Están los Empleos: Desglose por Subsector",
      content: [
        {
          type: "paragraph",
          text: "No todos los empleos de salud son iguales. Los datos del BLS revelan un patrón claro — el crecimiento más rápido está en atención ambulatoria basada en la comunidad, exactamente donde operan los FQHCs:",
        },
        {
          type: "list",
          items: [
            "Servicios de Salud Ambulatoria: +50,300 empleos (61% de las ganancias en salud) — Esto incluye clínicas ambulatorias, consultorios médicos, agencias de salud en el hogar y centros de salud comunitarios. Este es el sector FQHC.",
            "Hospitales: +18,300 empleos (22% de las ganancias) — Crecimiento modesto comparado con entornos ambulatorios, reflejando el cambio continuo hacia modelos de atención comunitaria.",
            "Enfermería y Atención Residencial: +13,300 empleos (16% de las ganancias) — Recuperación continua de las pérdidas de personal durante la pandemia.",
          ],
        },
        {
          type: "paragraph",
          text: "El dominio de la contratación en atención ambulatoria — con más de 50,000 nuevas posiciones — es un indicador directo de que los centros de salud comunitarios, clínicas ambulatorias y entornos de atención primaria son donde está ocurriendo el crecimiento.",
        },
      ],
    },
    {
      heading:
        "La Paradoja de la Fuerza Laboral FQHC: Demanda Creciente, Presión de Financiamiento",
      content: [
        {
          type: "paragraph",
          text: "Aquí está la tensión: mientras la contratación en salud está en auge a nivel nacional, muchos FQHCs en California están simultáneamente despidiendo trabajadores debido a recortes de fondos de Medi-Cal y reducciones federales bajo H.R. 1. Los avisos WARN Act de California muestran 3,477+ trabajadores de salud desplazados en 11 organizaciones en todo el estado.",
        },
        {
          type: "paragraph",
          text: "Esto crea lo que llamamos la Paradoja de la Fuerza Laboral FQHC — los mismos tipos de roles que se eliminan en un centro de salud se necesitan urgentemente en otro. Un coordinador de atención ECM experimentado despedido en Los Ángeles puede ser exactamente el candidato que un FQHC en expansión en el Valle Central está buscando desesperadamente.",
        },
        {
          type: "paragraph",
          text: "Los datos nacionales respaldan esto: HRSA reporta que más del 70% de los FQHCs enfrentan escasez crítica de médicos, enfermeras y proveedores de salud mental, con tasas de vacantes superiores al 20% en muchos roles clave. Mientras tanto, datos de NACHC muestran que los centros de salud ahora atienden a más de 32.5 millones de pacientes — el número más alto en los 60 años del programa — con más de 326,000 empleados en más de 16,000 sitios a nivel nacional.",
        },
      ],
    },
    {
      heading: "California: 134,000 Empleos y un Impacto de $25.5 Mil Millones",
      content: [
        {
          type: "paragraph",
          text: "Los centros de salud comunitarios de California son motores económicos por derecho propio. Según el Perfil Estatal 2025 de CPCA, los CHCs del estado generaron más de 134,000 empleos y produjeron $25.5 mil millones en producción económica en 2023, contribuyendo $3.1 mil millones en ingresos fiscales.",
        },
        {
          type: "paragraph",
          text: "Un desarrollo importante: a partir de diciembre de 2024, los servicios de Trabajador de Salud Comunitaria (CHW) se convirtieron en un beneficio de Medi-Cal a través de una enmienda al plan estatal. Esto significa que los roles de CHW en FQHCs ahora pueden generar ingresos directos a través de facturación de Medi-Cal — un cambio estructural que debería sostener y hacer crecer las posiciones de CHW.",
        },
        {
          type: "paragraph",
          text: "California tiene aproximadamente 270+ centros de salud comunitarios (incluyendo FQHCs, FQHC look-alikes y clínicas gratuitas). Nuestro directorio rastrea 220 FQHCs en todo el estado con datos detallados de fuerza laboral y financiamiento.",
        },
      ],
    },
    {
      heading: "Los Roles de Mayor Crecimiento",
      content: [
        {
          type: "paragraph",
          text: "Basándonos en proyecciones del BLS (2024-2034) y nuestros propios datos de empleo, estos roles de salud comunitaria están viendo la mayor demanda:",
        },
        {
          type: "list",
          items: [
            "Trabajadores de Salud Comunitaria (SOC 21-1094): El BLS proyecta un crecimiento del 11% de 2024 a 2034 — casi cuatro veces el promedio del 3% para todas las ocupaciones. California tiene la mayor concentración de posiciones CHW en el país.",
            "Asistentes Médicos: Consistentemente uno de los roles más publicados en FQHCs, con 620+ listados activos en nuestra base de datos. Alta rotación (32%+) impulsa la demanda constante.",
            "Coordinadores de Atención / Gestores de Casos: Impulsados por programas ECM, CCM y CalAIM. Estos roles generan ingresos para FQHCs y están cada vez más protegidos de recortes.",
            "Enfermeras Practicantes y Asistentes Médicos (NP/PA): Los FQHCs están contratando agresivamente proveedores de nivel medio. El programa NHSC de pago de préstamos hace estos roles especialmente atractivos.",
            "Especialistas en Salud Conductual (LCSWs, LMFTs, Psicólogos): HRSA proyecta una escasez de 136,350 psicólogos a nivel nacional para 2038. Más de 122 millones de estadounidenses viven en un HPSA de Salud Mental.",
            "Higienistas y Dentistas: Una escasez proyectada del 46% en áreas no metropolitanas para 2038. FQHCs con programas dentales están compitiendo activamente por este talento.",
          ],
        },
      ],
    },
    {
      heading: "Qué Significa para Tu Carrera",
      content: [
        {
          type: "paragraph",
          text: "Si eres un profesional de salud comunitaria — ya sea que estés empleado, recientemente desplazado, o considerando una transición de carrera — esto es lo que dicen los datos:",
        },
        {
          type: "list",
          items: [
            "La tendencia macro es tu aliada. El sector salud es el único que crea empleos de forma consistente a gran escala. La atención comunitaria (donde operan los FQHCs) crece más rápido que los hospitales.",
            "Las habilidades que generan ingresos son tu red de seguridad. Experiencia en ECM, CCM, CalAIM y Apoyos Comunitarios te hace más difícil de despedir y más fácil de contratar.",
            "La geografía importa. El mercado laboral de FQHCs es regional y desigual. Mientras algunas organizaciones de LA recortan, los FQHCs del Valle Central, Sacramento e Inland Empire se expanden.",
            "Las habilidades bilingües son premium. Los FQHCs de California atienden comunidades predominantemente hispanohablantes. Los candidatos bilingües obtienen primas salariales del 8-15%.",
            "El beneficio Medi-Cal de CHW es un cambio de juego. Ahora que los servicios de CHW pueden facturar Medi-Cal directamente, estas posiciones tienen un mecanismo de financiamiento sostenible.",
          ],
        },
      ],
    },
    {
      heading: "Tendencias Clave a Observar",
      content: [
        {
          type: "paragraph",
          text: "Basado en datos de empleos de FQHCs en California, informes públicos del BLS/HRSA, y avisos WARN Act, estas son las tendencias clave que están formando la contratación en FQHCs en Q1 2026:",
        },
        {
          type: "list",
          items: [
            "Cifras mensuales de empleo en salud del BLS — ¿se mantendrá el auge de 82,000 empleos de enero en febrero/marzo?",
            "Actividad de despidos en FQHCs de California — los avisos WARN Act muestran 3,477+ trabajadores desplazados, con nuevos avisos posibles a medida que los recortes de fondos tomen efecto",
            "Fechas de riesgos de financiamiento de Medi-Cal — eliminación de tasas PPS (Oct 2026), recortes de reembolso dental (Jul 2026), y renovación de exención CalAIM (Dic 2026)",
            "Adopción de facturación Medi-Cal de CHW — ¿cuántos FQHCs están implementando los nuevos códigos de facturación CHW?",
            "Implementación del salario mínimo SB 525 — mínimo de $25/hr para 2027 para FQHCs reestructurará la compensación en todo el sector",
          ],
        },
        {
          type: "paragraph",
          text: "Mantenerse informado/a sobre estas tendencias puede ayudarte a tomar mejores decisiones de carrera — ya sea que estés empleado/a, buscando trabajo, o considerando un cambio a salud comunitaria.",
        },
      ],
    },
  ],
  ctaTitle: "Mantente Adelante de las Tendencias",
  ctaDescription:
    "Navega el panorama de contratación con herramientas gratuitas diseñadas para profesionales de salud comunitaria: empleos FQHC, constructor de CV bilingüe, evaluación profesional, e inteligencia de mercado.",
  ctaButtonText: "Crea Tu CV Gratis",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Recortes de Medi-Cal: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber",
    },
    {
      href: "/blog/fqhc-salary-negotiation-guide",
      title: "Cómo Negociar Tu Salario en un FQHC",
    },
    {
      href: "/blog/fqhc-career-ladder-ma-rn-provider",
      title: "La Escalera Profesional de MA, RN y Proveedores en FQHC",
    },
  ],
};

export default async function HealthcareHiringTrendsArticle() {
  const locale = await getLocale();
  const isEs = locale === "es";
  const content = isEs ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title="Healthcare Hiring Trends 2026: What the Jobs Data Tells Us About FQHC Careers"
        description="Healthcare added 82,000 jobs in January 2026 — 63% of all U.S. job growth. We break down the BLS data, HRSA workforce projections, and what it means for community health center careers in California."
        datePublished="2026-02-16"
        slug="healthcare-hiring-trends-2026"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.fqhctalent.com" },
          { name: "Blog", url: "https://www.fqhctalent.com/blog" },
          {
            name: "Healthcare Hiring Trends 2026",
            url: "https://www.fqhctalent.com/blog/healthcare-hiring-trends-2026",
          },
        ]}
      />
      <ContentViewTracker contentType="blog" contentId="healthcare-hiring-trends-2026" />
      <BlogArticleToolbar slug="healthcare-hiring-trends-2026" />

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
            <InlineShareButtons slug="healthcare-hiring-trends-2026" title="Healthcare Hiring Trends 2026: What the Jobs Data Tells Us About FQHC Careers" />
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl leading-relaxed text-stone-600">
              {content.openingParagraph}
            </p>

            {/* TL;DR Card */}
            <TLDRCard
              items={[
                "Healthcare added 82,000 jobs in January 2026 — 63% of all U.S. job growth. Ambulatory care (where FQHCs operate) led with 50,300 new positions.",
                "The FQHC Workforce Paradox: 70%+ of FQHCs face staffing shortages while California tracks 3,477+ displaced workers — the same roles are being cut at one center and hired at another.",
                "California CHCs generate 134,000 jobs and $25.5B in economic output. CHW services are now a Medi-Cal billing benefit — a structural shift for sustainable hiring.",
                "What to do now: tailor your resume for FQHC roles, highlight ECM/CalAIM experience, consider opportunities beyond your county, and stay informed on funding changes that could affect hiring.",
              ]}
              esItems={[
                "El sector salud añadió 82,000 empleos en enero 2026 — 63% de todo el crecimiento laboral. Atención ambulatoria (donde operan FQHCs) lideró con 50,300 nuevas posiciones.",
                "La Paradoja FQHC: 70%+ de FQHCs enfrentan escasez de personal mientras California rastrea 3,477+ trabajadores desplazados — los mismos roles se eliminan en un centro y se contratan en otro.",
                "Los CHCs de California generan 134,000 empleos y $25.5 mil millones. Los servicios de CHW ahora son un beneficio facturable por Medi-Cal — un cambio estructural.",
                "Qué hacer ahora: adapta tu CV para roles FQHC, destaca experiencia en ECM/CalAIM, considera oportunidades fuera de tu condado, y mantente informado/a sobre cambios de financiamiento que podrían afectar la contratación.",
              ]}
            />

            {/* Key Stat Callout */}
            <StatCallout
              stat="82,000"
              label="Healthcare jobs added in January 2026 — 63% of total U.S. employment growth"
              esLabel="Empleos de salud añadidos en enero 2026 — 63% del crecimiento total de empleo en EE.UU."
              detail="Source: BLS Employment Situation Report, January 2026"
              esDetail="Fuente: Informe de Situación del Empleo del BLS, enero 2026"
            />

            {/* Jobs Breakdown Visual */}
            <div className="my-8 rounded-xl border border-stone-200 bg-stone-50 p-6">
              <h3 className="mb-4 text-lg font-bold text-stone-900">
                {locale === "es"
                  ? "Empleos de Salud en Enero 2026 por Subsector"
                  : "January 2026 Healthcare Jobs by Subsector"}
              </h3>
              <div className="space-y-4">
                {/* Ambulatory */}
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-stone-700">
                      {locale === "es"
                        ? "Ambulatoria (incl. FQHCs)"
                        : "Ambulatory (incl. FQHCs)"}
                    </span>
                    <span className="font-bold text-teal-700">+50,300</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-stone-200">
                    <div
                      className="h-4 rounded-full bg-teal-600"
                      style={{ width: "61%" }}
                    />
                  </div>
                </div>
                {/* Hospitals */}
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-stone-700">
                      {locale === "es" ? "Hospitales" : "Hospitals"}
                    </span>
                    <span className="font-bold text-blue-700">+18,300</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-stone-200">
                    <div
                      className="h-4 rounded-full bg-blue-500"
                      style={{ width: "22%" }}
                    />
                  </div>
                </div>
                {/* Nursing */}
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-stone-700">
                      {locale === "es"
                        ? "Enfermería y Atención Residencial"
                        : "Nursing & Residential Care"}
                    </span>
                    <span className="font-bold text-amber-700">+13,300</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-stone-200">
                    <div
                      className="h-4 rounded-full bg-amber-500"
                      style={{ width: "16%" }}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-stone-500">
                {locale === "es"
                  ? "Fuente: BLS, Informe de Situación del Empleo, enero 2026"
                  : "Source: BLS, Employment Situation Report, January 2026"}
              </p>
            </div>

            {/* Paradox Stat */}
            <StatCallout
              stat="70%+"
              label="of FQHCs face critical staffing shortages — yet 3,477+ CA workers displaced"
              esLabel="de FQHCs enfrentan escasez crítica — mientras 3,477+ trabajadores de CA desplazados"
              detail="Sources: HRSA HPSA Data, FQHC Talent Layoff Tracker"
              esDetail="Fuentes: Datos HPSA de HRSA, Rastreador de Despidos de FQHC Talent"
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
                {/* Inline tool callout after "Where the Jobs Are" section */}
                {idx === 1 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa el <Link href="/" className="text-teal-700 font-medium underline">Panel de Inteligencia</Link> para rastrear datos de empleo en salud, precipicios de financiamiento y tendencias de la fuerza laboral en tiempo real.</>
                      ) : (
                        <>Use the <Link href="/" className="text-teal-700 font-medium underline">Intelligence Dashboard</Link> to track healthcare employment data, funding cliffs, and workforce trends in real time.</>
                      )}
                    </p>
                  </div>
                )}
                {/* Inline tool callout after "California" section */}
                {idx === 3 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa la <Link href="/career-insights" className="text-teal-700 font-medium underline">Evaluación de Carrera</Link> para descubrir qué roles FQHC se alinean con tus habilidades y experiencia.</>
                      ) : (
                        <>Use the <Link href="/career-insights" className="text-teal-700 font-medium underline">Career Assessment</Link> to discover which FQHC roles align with your skills and experience.</>
                      )}
                    </p>
                  </div>
                )}
                {/* Inline tool callout after "What This Means for Your Career" section */}
                {idx === 5 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa <Link href="/compare" className="text-teal-700 font-medium underline">Comparar FQHCs</Link> para evaluar programas, resiliencia y datos salariales de diferentes centros de salud.</>
                      ) : (
                        <>Use <Link href="/compare" className="text-teal-700 font-medium underline">Compare FQHCs</Link> to evaluate programs, resilience, and salary data across different health centers.</>
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
                  <a href="https://www.bls.gov/news.release/archives/empsit_02112026.htm" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Employment Situation Report, January 2026</a> — U.S. Bureau of Labor Statistics, February 2026. {locale === "es" ? "Sector salud añadió 82,000 empleos; ambulatoria +50,300, hospitales +18,300, enfermería +13,300. Total nómina: 130,000." : "Healthcare added 82,000 jobs; ambulatory +50,300, hospitals +18,300, nursing +13,300. Total nonfarm: 130,000."}
                </li>
                <li>
                  <a href="https://www.bls.gov/news.release/pdf/ecopro.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Employment Projections 2024-2034</a> — U.S. Bureau of Labor Statistics, 2025. {locale === "es" ? "Proyecciones de empleo por ocupación incluyendo trabajadores de salud comunitaria." : "Occupational employment projections including community health workers."}
                </li>
                <li>
                  <a href="https://www.bls.gov/ooh/community-and-social-service/community-health-workers.htm" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Community Health Workers: Occupational Outlook Handbook</a> — BLS, 2025. {locale === "es" ? "Crecimiento proyectado del 11% (2024-2034), mucho más rápido que el promedio de 3% para todas las ocupaciones." : "Projected 11% growth (2024-2034), much faster than the 3% average for all occupations."}
                </li>
                <li>
                  <a href="https://bhw.hrsa.gov/data-research/projecting-health-workforce-supply-demand" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Health Workforce Projections 2023-2038</a> — HRSA NCHWA, December 2025. {locale === "es" ? "Escasez proyectada de 136,350 psicólogos para 2038; 46% de escasez de dentistas en áreas no metropolitanas." : "Projected shortage of 136,350 psychologists by 2038; 46% dentist shortage in nonmetro areas."}
                </li>
                <li>
                  <a href="https://data.hrsa.gov/topics/health-workforce/shortage-areas" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Health Workforce Shortage Areas (HPSA Data)</a> — HRSA, 2025. {locale === "es" ? "137 millones de estadounidenses (40%) viven en un Área de Escasez de Profesionales de Salud Mental." : "137 million Americans (40%) live in a Mental Health HPSA."}
                </li>
                <li>
                  <a href="https://www.nachc.org/wp-content/uploads/2025/09/NACHC-Policy-Papers_CHC-Workforce_Sept2025.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">CHC Workforce Policy Paper</a> — NACHC, September 2025. {locale === "es" ? "70%+ de FQHCs enfrentan escasez crítica de personal; 55% no pueden cubrir posiciones." : "70%+ of FQHCs face critical staffing shortages; 55% cannot fill positions."}
                </li>
                <li>
                  <a href="https://www.nachc.org/community-health-centers-provide-primary-care-to-nearly-34-million-patients" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Community Health Centers Provide Primary Care to Nearly 34 Million Patients</a> — NACHC, 2025. {locale === "es" ? "326,000+ empleados en 16,000+ sitios a nivel nacional." : "326,000+ staff across 16,000+ sites nationally."}
                </li>
                <li>
                  <a href="https://www.cpca.org/CPCA/About/Publications_and_Reports/CHC_Data/CPCA/About/CHC_Data.aspx" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">California State Profile 2025</a> — CPCA, 2025. {locale === "es" ? "CHCs de CA generaron 134,000 empleos, $25.5 mil millones en producción económica, $3.1 mil millones en ingresos fiscales." : "CA CHCs generated 134,000 jobs, $25.5B in economic output, $3.1B in tax revenue."}
                </li>
                <li>
                  <a href="https://www.dhcs.ca.gov/services/medi-cal/Documents/CHW-FAQs.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">CHW Medi-Cal Benefit FAQs</a> — DHCS, 2024. {locale === "es" ? "Servicios de CHW se convirtieron en beneficio facturable por Medi-Cal (SPA 22-0001, ampliado con SPA 24-0016)." : "CHW services became a billable Medi-Cal benefit (SPA 22-0001, expanded with SPA 24-0016)."}
                </li>
                <li>
                  <a href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">SB 525: Health Care Worker Minimum Wage</a> — California Legislature, 2023. {locale === "es" ? "Salario mínimo de $25/hr para 2027 para clínicas comunitarias y FQHCs." : "$25/hr minimum wage by 2027 for community clinics and FQHCs."}
                </li>
                <li>
                  <a href="https://www.nachc.org/2024-uds-early-takeaways-community-health-center-growth-under-pressure/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">2024 UDS Early Takeaways: CHC Growth Under Pressure</a> — NACHC, 2025. {locale === "es" ? "Avisos WARN Act de CA muestran 3,477+ trabajadores desplazados. Margen de CHCs -2%." : "CA WARN Act filings show 3,477+ displaced workers. CHC margin -2%."}
                </li>
              </ol>
            </div>
          </div>
          {/* Bottom share */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <InlineShareButtons slug="healthcare-hiring-trends-2026" title="Healthcare Hiring Trends 2026: What the Jobs Data Tells Us About FQHC Careers" />
          </div>

          <BlogPrevNext slug="healthcare-hiring-trends-2026" locale={locale} />

          {/* CTA */}
          <ArticleCTA
            audience="intel-brief"
            relatedArticles={[
              { slug: "february-2026-jobs-report-healthcare-crisis", title: "The February 2026 Jobs Report: Healthcare Is Carrying the Entire Economy", esTitle: "El Informe de Empleos de Febrero 2026: El Sector Salud Carga Toda la Economía", category: "Data Report", esCategory: "Informe de Datos" },
              { slug: "fqhc-career-ladder-ma-rn-provider", title: "The FQHC MA, RN & Provider Career Ladder", esTitle: "La Escalera Profesional de MA, RN y Proveedores en FQHC", category: "Career Growth", esCategory: "Crecimiento Profesional" },
              { slug: "laid-off-fqhc-fast-track-job-search", title: "Laid Off from an FQHC? How to Fast-Track Your Job Search", esTitle: "¿Despedido de un FQHC? Cómo Acelerar Tu Búsqueda de Empleo", category: "Career Resources", esCategory: "Recursos de Carrera" },
            ]}
          />
        </div>
      </article>
    </main>
  );
}
