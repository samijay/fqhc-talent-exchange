import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { TLDRCard, StatCallout } from "@/components/blog/BlogDataViz";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { ContentViewTracker } from "@/components/content/ContentViewTracker";
import { BlogArticleToolbar } from "@/components/blog/BlogArticleToolbar";

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
  category: "Policy & Strategy",
  title:
    "The FQHC Copay Advantage: Why Community Health Centers May See a Patient Surge",
  description:
    "H.R. 1 lets states charge Medicaid copays up to $35 — but FQHCs are exempt. Learn how this copay advantage could drive a patient surge to community health centers.",
  breadcrumbTitle: "FQHC Copay Advantage",
  datePublished: "2026-03-09",
  dateDisplay: "March 9, 2026",
  readTime: "8 min read",
  openingParagraph:
    "A little-noticed provision in H.R. 1 could reshape where millions of Americans get their healthcare. The law allows states to impose copays of up to $35 on Medicaid expansion enrollees — but Federally Qualified Health Centers, behavioral health centers, and rural health clinics are exempt by statute. That means patients will face new out-of-pocket costs at hospitals and private clinics, but not at FQHCs. For community health centers already stretched thin, this creates both an enormous opportunity and a serious staffing challenge.",
  sections: [
    {
      heading: "The Copay Exemption: What It Means",
      content: [
        {
          type: "paragraph",
          text: "Under H.R. 1, states can now require Medicaid expansion enrollees to pay copays of up to $35 per visit at most healthcare facilities. This is a significant shift — Medicaid has historically kept cost-sharing minimal to ensure low-income patients can access care without financial barriers.",
        },
        {
          type: "paragraph",
          text: "But the law carves out a critical exemption: visits to FQHCs, behavioral health centers, and rural health clinics remain copay-free. This exemption is written into federal statute, meaning states cannot override it even if they adopt the maximum allowable copay. For a patient choosing between a $35 visit at a hospital-based clinic and a $0 visit at a community health center, the math is simple.",
        },
        {
          type: "paragraph",
          text: "This creates what economists call a price signal — a direct financial incentive for patients to shift their care to FQHCs. And the scale is massive. FQHCs already serve 34 million patients nationally, and that number could climb significantly as copays push cost-sensitive patients toward the safety net.",
        },
      ],
    },
    {
      heading: "The Patient Flow Opportunity",
      content: [
        {
          type: "paragraph",
          text: "The copay exemption arrives at a moment when multiple forces are already driving patients toward FQHCs. In California alone, the convergence of policy changes is creating a perfect storm of increased demand:",
        },
        {
          type: "list",
          items: [
            "1.7 million undocumented Californians are currently enrolled in Medi-Cal, but the enrollment freeze that took effect January 1, 2026 blocks new enrollees from joining — pushing uninsured patients directly to FQHCs as their only affordable option.",
            "Dental coverage for undocumented adults ends in July 2026, and PPS rate elimination for undocumented patient services takes effect in October 2026 — both changes that will strain FQHC budgets while simultaneously increasing the number of patients who need them.",
            "The CalAIM waiver expires in December 2026, putting $1.2 billion per year in Enhanced Care Management and Community Supports funding at risk — programs that FQHCs depend on for both revenue and patient care.",
          ],
        },
        {
          type: "paragraph",
          text: "Now add the copay exemption on top of these trends. Patients who previously received care at private clinics or hospital outpatient departments may redirect to FQHCs to avoid the new $35 charges. For health centers, this means more patients walking through the door — but the same (or fewer) staff to serve them.",
        },
      ],
    },
    {
      heading: "Clinic Closures Are Already Creating Demand",
      content: [
        {
          type: "paragraph",
          text: "The patient surge is not theoretical — it is already happening in parts of California. LA County closed 7 of its 13 public health clinics due to a $50 million budget shortfall. Those displaced patients are now flowing to FQHCs and other safety-net providers in the region.",
        },
        {
          type: "paragraph",
          text: "Sacramento County is losing $26 million in health funding, further reducing the capacity of the public health system to absorb demand. When public clinics close, the patients do not disappear — they show up at the nearest community health center.",
        },
        {
          type: "paragraph",
          text: "This pattern is repeating across the state. County health departments, already under fiscal pressure from reduced federal funding, are contracting their services. FQHCs are becoming the last remaining access point for primary care, dental, and behavioral health in many communities. The copay exemption will only accelerate this shift.",
        },
      ],
    },
    {
      heading: "The Workforce Challenge: More Patients, Not Enough Staff",
      content: [
        {
          type: "paragraph",
          text: "Here is the hard truth: FQHCs cannot absorb a patient surge without the workforce to match. And the workforce picture is deeply strained. According to NACHC, 55% of community health centers cannot fill critical positions. Medicaid pays 25% less than private insurance, yet 43% of CHC revenue comes from Medicaid — creating a structural funding gap that makes it difficult to offer competitive salaries.",
        },
        {
          type: "paragraph",
          text: "The numbers in California tell the story. Across just four major FQHCs, there are 620 open positions right now: AltaMed has 259 openings, La Clinica de La Raza has 187, Family Health Centers of San Diego has 154, and Asian Health Services has 20. And these are only the organizations we actively track — the true number of vacancies across all 220 California FQHCs is far higher.",
        },
        {
          type: "paragraph",
          text: "The CHC program posted a -2% margin in 2025, meaning health centers are already operating at a loss before any patient surge arrives. More patients generating Medicaid-level reimbursement (25% below commercial rates) will not solve the financial equation without operational changes.",
        },
      ],
    },
    {
      heading: "What FQHCs Should Do Now",
      content: [
        {
          type: "paragraph",
          text: "The copay advantage is real, but capitalizing on it requires deliberate planning. Community health centers that act now will be positioned to serve the incoming patients and strengthen their long-term sustainability. Here is what we recommend:",
        },
        {
          type: "list",
          items: [
            "Quantify your capacity gap. Model how many additional patients your sites can absorb at current staffing levels. Use your EHR scheduling data to identify underutilized appointment slots and calculate the staff needed to fill them.",
            "Accelerate hiring for high-demand roles. Medical assistants, care coordinators, and community health workers are the roles that scale access fastest. Prioritize bilingual candidates — California's FQHCs serve predominantly Spanish-speaking communities.",
            "Market the copay advantage to your community. Many patients do not know that FQHCs are copay-exempt. Update your website, waiting room materials, and outreach messaging to make this benefit clear. Partner with local social service agencies who are fielding questions about the new copays.",
            "Diversify revenue beyond Medicaid. With 43% of CHC revenue from Medicaid and reimbursement rates 25% below commercial, FQHCs need additional revenue streams. Explore 340B savings optimization, sliding-fee-scale adjustments, grant funding, and philanthropy.",
            "Prepare for the CalAIM cliff. The waiver expiration in December 2026 threatens $1.2 billion in annual funding. Build scenarios now for what happens if ECM and Community Supports reimbursement changes. Advocate through CPCA and NACHC for waiver renewal.",
          ],
        },
      ],
    },
    {
      heading: "The Bottom Line",
      content: [
        {
          type: "paragraph",
          text: "The FQHC copay exemption is one of the few bright spots in a policy landscape that has been punishing for community health. For the first time, FQHCs have a clear, built-in competitive advantage over hospitals and private clinics when it comes to cost to the patient. Combined with clinic closures, enrollment freezes, and coverage reductions, the conditions are set for a meaningful shift in patient volume toward community health centers.",
        },
        {
          type: "paragraph",
          text: "But opportunity without capacity is just pressure. FQHCs that invest in workforce development, operational efficiency, and community outreach will be the ones that turn this policy moment into lasting growth. Those that do not risk being overwhelmed by the very patients they exist to serve.",
        },
      ],
    },
  ],
  ctaTitle: "Prepare Your Organization",
  ctaDescription:
    "Use our free tools to navigate the policy landscape, track workforce trends, and find the talent your FQHC needs to meet rising demand.",
  ctaButtonText: "Browse FQHC Jobs",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Medi-Cal Funding Cuts: What Community Health Workers Need to Know",
    },
    {
      href: "/blog/laid-off-fqhc-fast-track-job-search",
      title: "Laid Off from an FQHC? How to Fast-Track Your Job Search",
    },
    {
      href: "/blog/what-is-enhanced-care-management-ecm",
      title: "What Is Enhanced Care Management (ECM)?",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Politica y Estrategia",
  title:
    "La Ventaja de Copago de los FQHCs: Por Que los Centros de Salud Comunitarios Podrian Ver un Aumento de Pacientes",
  description:
    "H.R. 1 permite copagos de Medicaid de hasta $35 — pero los FQHCs estan exentos. Descubre como esta ventaja podria generar un aumento de pacientes.",
  breadcrumbTitle: "Ventaja de Copago FQHC",
  datePublished: "2026-03-09",
  dateDisplay: "9 de Marzo de 2026",
  readTime: "8 min de lectura",
  openingParagraph:
    "Una disposicion poco conocida en H.R. 1 podria transformar donde millones de estadounidenses reciben atencion medica. La ley permite a los estados imponer copagos de hasta $35 a los afiliados de la expansion de Medicaid — pero los Centros de Salud Federalmente Calificados (FQHCs), centros de salud conductual y clinicas rurales estan exentos por ley. Esto significa que los pacientes enfrentaran nuevos costos de bolsillo en hospitales y clinicas privadas, pero no en los FQHCs. Para los centros de salud comunitarios que ya operan al limite, esto crea tanto una enorme oportunidad como un serio desafio de personal.",
  sections: [
    {
      heading: "La Exencion de Copago: Que Significa",
      content: [
        {
          type: "paragraph",
          text: "Bajo H.R. 1, los estados ahora pueden exigir que los afiliados de la expansion de Medicaid paguen copagos de hasta $35 por visita en la mayoria de las instalaciones de salud. Este es un cambio significativo — Medicaid historicamente ha mantenido los costos compartidos al minimo para asegurar que los pacientes de bajos ingresos puedan acceder a la atencion sin barreras financieras.",
        },
        {
          type: "paragraph",
          text: "Pero la ley establece una exencion critica: las visitas a FQHCs, centros de salud conductual y clinicas rurales siguen siendo gratuitas de copago. Esta exencion esta escrita en la ley federal, lo que significa que los estados no pueden anularla aunque adopten el copago maximo permitido. Para un paciente que elige entre una visita de $35 en una clinica hospitalaria y una visita de $0 en un centro de salud comunitario, la cuenta es simple.",
        },
        {
          type: "paragraph",
          text: "Esto crea lo que los economistas llaman una senal de precio — un incentivo financiero directo para que los pacientes trasladen su atencion a los FQHCs. Y la escala es enorme. Los FQHCs ya atienden a 34 millones de pacientes a nivel nacional, y ese numero podria crecer significativamente a medida que los copagos empujen a los pacientes sensibles al costo hacia la red de seguridad.",
        },
      ],
    },
    {
      heading: "La Oportunidad del Flujo de Pacientes",
      content: [
        {
          type: "paragraph",
          text: "La exencion de copago llega en un momento en que multiples fuerzas ya estan impulsando pacientes hacia los FQHCs. Solo en California, la convergencia de cambios de politica esta creando una tormenta perfecta de demanda creciente:",
        },
        {
          type: "list",
          items: [
            "1.7 millones de californianos indocumentados estan actualmente inscritos en Medi-Cal, pero el congelamiento de inscripciones que entro en vigor el 1 de enero de 2026 impide que nuevos afiliados se unan — empujando a los pacientes sin seguro directamente a los FQHCs como su unica opcion accesible.",
            "La cobertura dental para adultos indocumentados termina en julio de 2026, y la eliminacion de las tarifas PPS para servicios a pacientes indocumentados entra en vigor en octubre de 2026 — ambos cambios que presionaran los presupuestos de los FQHCs mientras aumentan simultaneamente el numero de pacientes que los necesitan.",
            "La exencion CalAIM vence en diciembre de 2026, poniendo en riesgo $1.2 mil millones anuales en fondos de Manejo de Cuidado Mejorado (ECM) y Apoyos Comunitarios — programas de los que los FQHCs dependen tanto para ingresos como para atencion al paciente.",
          ],
        },
        {
          type: "paragraph",
          text: "Ahora agrega la exencion de copago sobre estas tendencias. Los pacientes que antes recibian atencion en clinicas privadas o departamentos ambulatorios hospitalarios podrian redirigirse a los FQHCs para evitar los nuevos cargos de $35. Para los centros de salud, esto significa mas pacientes entrando — pero el mismo personal (o menos) para atenderlos.",
        },
      ],
    },
    {
      heading: "Los Cierres de Clinicas Ya Estan Creando Demanda",
      content: [
        {
          type: "paragraph",
          text: "El aumento de pacientes no es teorico — ya esta ocurriendo en partes de California. El condado de Los Angeles cerro 7 de sus 13 clinicas de salud publica debido a un deficit presupuestario de $50 millones. Esos pacientes desplazados ahora fluyen hacia los FQHCs y otros proveedores de la red de seguridad en la region.",
        },
        {
          type: "paragraph",
          text: "El condado de Sacramento esta perdiendo $26 millones en fondos de salud, reduciendo aun mas la capacidad del sistema de salud publica para absorber la demanda. Cuando las clinicas publicas cierran, los pacientes no desaparecen — se presentan en el centro de salud comunitario mas cercano.",
        },
        {
          type: "paragraph",
          text: "Este patron se repite en todo el estado. Los departamentos de salud de los condados, ya bajo presion fiscal por la reduccion de fondos federales, estan contrayendo sus servicios. Los FQHCs se estan convirtiendo en el ultimo punto de acceso para atencion primaria, dental y salud conductual en muchas comunidades. La exencion de copago solo acelerara este cambio.",
        },
      ],
    },
    {
      heading:
        "El Desafio de Personal: Mas Pacientes, No Suficiente Personal",
      content: [
        {
          type: "paragraph",
          text: "Esta es la verdad dificil: los FQHCs no pueden absorber un aumento de pacientes sin la fuerza laboral correspondiente. Y el panorama laboral esta profundamente tenso. Segun NACHC, el 55% de los centros de salud comunitarios no pueden cubrir posiciones criticas. Medicaid paga un 25% menos que el seguro privado, pero el 43% de los ingresos de los CHCs proviene de Medicaid — creando una brecha de financiamiento estructural que dificulta ofrecer salarios competitivos.",
        },
        {
          type: "paragraph",
          text: "Los numeros en California cuentan la historia. En solo cuatro FQHCs principales, hay 620 posiciones abiertas ahora mismo: AltaMed tiene 259 vacantes, La Clinica de La Raza tiene 187, Family Health Centers of San Diego tiene 154 y Asian Health Services tiene 20. Y estas son solo las organizaciones que rastreamos activamente — el numero real de vacantes en los 220 FQHCs de California es mucho mayor.",
        },
        {
          type: "paragraph",
          text: "El programa CHC registro un margen de -2% en 2025, lo que significa que los centros de salud ya operan con perdidas antes de que llegue cualquier aumento de pacientes. Mas pacientes generando reembolsos a nivel de Medicaid (25% por debajo de las tarifas comerciales) no resolveran la ecuacion financiera sin cambios operativos.",
        },
      ],
    },
    {
      heading: "Lo Que los FQHCs Deben Hacer Ahora",
      content: [
        {
          type: "paragraph",
          text: "La ventaja de copago es real, pero capitalizarla requiere planificacion deliberada. Los centros de salud comunitarios que actuen ahora estaran posicionados para atender a los pacientes entrantes y fortalecer su sostenibilidad a largo plazo. Esto es lo que recomendamos:",
        },
        {
          type: "list",
          items: [
            "Cuantifica tu brecha de capacidad. Modela cuantos pacientes adicionales pueden absorber tus sitios con los niveles actuales de personal. Usa los datos de programacion de tu EHR para identificar citas subutilizadas y calcular el personal necesario para cubrirlas.",
            "Acelera la contratacion para roles de alta demanda. Asistentes medicos, coordinadores de atencion y trabajadores de salud comunitaria son los roles que escalan el acceso mas rapidamente. Prioriza candidatos bilingues — los FQHCs de California atienden comunidades predominantemente hispanohablantes.",
            "Comunica la ventaja de copago a tu comunidad. Muchos pacientes no saben que los FQHCs estan exentos de copago. Actualiza tu sitio web, materiales de sala de espera y mensajes de alcance para dejar este beneficio claro. Colabora con agencias locales de servicios sociales que estan respondiendo preguntas sobre los nuevos copagos.",
            "Diversifica los ingresos mas alla de Medicaid. Con el 43% de los ingresos de los CHCs provenientes de Medicaid y tasas de reembolso un 25% por debajo de las comerciales, los FQHCs necesitan fuentes de ingresos adicionales. Explora la optimizacion de ahorros 340B, ajustes de escala de tarifas deslizantes, financiamiento por subvenciones y filantropia.",
            "Preparate para el precipicio de CalAIM. El vencimiento de la exencion en diciembre de 2026 amenaza $1.2 mil millones en fondos anuales. Construye escenarios ahora para lo que sucede si cambia el reembolso de ECM y Apoyos Comunitarios. Aboga a traves de CPCA y NACHC por la renovacion de la exencion.",
          ],
        },
      ],
    },
    {
      heading: "La Conclusion",
      content: [
        {
          type: "paragraph",
          text: "La exencion de copago de los FQHCs es uno de los pocos puntos positivos en un panorama de politicas que ha sido castigador para la salud comunitaria. Por primera vez, los FQHCs tienen una ventaja competitiva clara e incorporada sobre hospitales y clinicas privadas en cuanto al costo para el paciente. Combinado con cierres de clinicas, congelamientos de inscripcion y reducciones de cobertura, las condiciones estan dadas para un cambio significativo en el volumen de pacientes hacia los centros de salud comunitarios.",
        },
        {
          type: "paragraph",
          text: "Pero oportunidad sin capacidad es solo presion. Los FQHCs que inviertan en desarrollo de la fuerza laboral, eficiencia operativa y alcance comunitario seran los que conviertan este momento de politica en crecimiento duradero. Los que no lo hagan corren el riesgo de verse abrumados por los mismos pacientes a los que existen para servir.",
        },
      ],
    },
  ],
  ctaTitle: "Prepara Tu Organizacion",
  ctaDescription:
    "Usa nuestras herramientas gratuitas para navegar el panorama de politicas, rastrear tendencias laborales y encontrar el talento que tu FQHC necesita para enfrentar la demanda creciente.",
  ctaButtonText: "Ver Empleos FQHC",
  relatedArticles: [
    {
      href: "/blog/medi-cal-funding-cuts-community-health-workers",
      title:
        "Recortes de Medi-Cal: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber",
    },
    {
      href: "/blog/laid-off-fqhc-fast-track-job-search",
      title:
        "Despedido de un FQHC? Como Acelerar Tu Busqueda de Empleo",
    },
    {
      href: "/blog/what-is-enhanced-care-management-ecm",
      title: "Que Es el Manejo de Cuidado Mejorado (ECM)?",
    },
  ],
};

export default async function FQHCCopayAdvantageArticle() {
  const locale = await getLocale();
  const isEs = locale === "es";
  const content = isEs ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title="The FQHC Copay Advantage: Why Community Health Centers May See a Patient Surge"
        description="H.R. 1 lets states charge Medicaid copays up to $35 — but FQHCs are exempt. Learn how this copay advantage could drive a patient surge to community health centers."
        datePublished="2026-03-09"
        slug="fqhc-copay-advantage-patient-surge"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.fqhctalent.com" },
          { name: "Blog", url: "https://www.fqhctalent.com/blog" },
          {
            name: "FQHC Copay Advantage",
            url: "https://www.fqhctalent.com/blog/fqhc-copay-advantage-patient-surge",
          },
        ]}
      />
      <ContentViewTracker contentType="blog" contentId="fqhc-copay-advantage-patient-surge" />
      <BlogArticleToolbar slug="fqhc-copay-advantage-patient-surge" />

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
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl leading-relaxed text-stone-600">
              {content.openingParagraph}
            </p>

            {/* TL;DR Card */}
            <TLDRCard
              items={[
                "H.R. 1 allows states to impose up to $35 copays on Medicaid expansion enrollees — but FQHCs, behavioral health centers, and rural health clinics are exempt by statute. Patients pay $0 at community health centers.",
                "Clinic closures are already driving patients to FQHCs. LA County closed 7 of 13 public health clinics ($50M shortfall), and Sacramento County is losing $26M in health funding.",
                "The workforce is not ready for a surge. 55% of CHCs can't fill critical positions, and 620 jobs are open across just 4 major California FQHCs — while the program posted a -2% margin in 2025.",
                "FQHCs that act now — quantifying capacity, accelerating hiring, and marketing the copay advantage — will turn this policy moment into lasting growth.",
              ]}
              esItems={[
                "H.R. 1 permite a los estados imponer copagos de hasta $35 a los afiliados de Medicaid — pero los FQHCs, centros de salud conductual y clinicas rurales estan exentos por ley. Los pacientes pagan $0 en centros de salud comunitarios.",
                "Los cierres de clinicas ya estan impulsando pacientes a los FQHCs. El condado de LA cerro 7 de 13 clinicas publicas (deficit de $50M), y el condado de Sacramento esta perdiendo $26M en fondos de salud.",
                "La fuerza laboral no esta lista para un aumento. El 55% de los CHCs no puede cubrir posiciones criticas, y hay 620 empleos abiertos en solo 4 FQHCs principales de California — mientras el programa registro un margen de -2% en 2025.",
                "Los FQHCs que actuen ahora — cuantificando capacidad, acelerando contrataciones y comunicando la ventaja de copago — convertiran este momento de politica en crecimiento duradero.",
              ]}
            />

            {/* Key Stat Callout */}
            <StatCallout
              stat="$35"
              label="Maximum Medicaid copay under H.R. 1 — but $0 at FQHCs. The copay exemption is a built-in competitive advantage."
              esLabel="Copago maximo de Medicaid bajo H.R. 1 — pero $0 en FQHCs. La exencion de copago es una ventaja competitiva incorporada."
              detail="Source: H.R. 1 (One Big Beautiful Bill), Medicaid cost-sharing provisions"
              esDetail="Fuente: H.R. 1 (One Big Beautiful Bill), disposiciones de costos compartidos de Medicaid"
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
                {/* Inline tool callout after "Patient Flow Opportunity" section */}
                {idx === 1 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa las <Link href="/strategy/okrs" className="text-teal-700 font-medium underline">Plantillas OKR</Link> para establecer objetivos de capacidad de pacientes y alinear la contratación con la demanda proyectada.</>
                      ) : (
                        <>Use the <Link href="/strategy/okrs" className="text-teal-700 font-medium underline">OKR Templates</Link> to set patient capacity goals and align hiring with projected demand.</>
                      )}
                    </p>
                  </div>
                )}
                {/* Inline tool callout after "Workforce Challenge" section */}
                {idx === 3 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa el <Link href="/strategy/clinic-simulator" className="text-teal-700 font-medium underline">Simulador de Clínica</Link> para modelar cuántos pacientes adicionales tu FQHC puede absorber con el personal actual.</>
                      ) : (
                        <>Use the <Link href="/strategy/clinic-simulator" className="text-teal-700 font-medium underline">Clinic Simulator</Link> to model how many additional patients your FQHC can absorb at current staffing levels.</>
                      )}
                    </p>
                  </div>
                )}
                {/* Inline tool callout after "What FQHCs Should Do Now" section */}
                {idx === 4 && (
                  <div className="my-8 rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <p className="text-sm font-semibold text-teal-800">
                      {isEs ? "Prueba nuestra herramienta gratuita" : "Try our free tool"}
                    </p>
                    <p className="text-sm text-stone-600">
                      {isEs ? (
                        <>Usa el <Link href="/" className="text-teal-700 font-medium underline">Panel de Inteligencia</Link> para monitorear precipicios de financiamiento, cierres de clínicas y cambios de políticas que afectan el flujo de pacientes.</>
                      ) : (
                        <>Use the <Link href="/" className="text-teal-700 font-medium underline">Intelligence Dashboard</Link> to monitor funding cliffs, clinic closures, and policy changes affecting patient flow.</>
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
                  <a href="https://www.congress.gov/bill/119th-congress/house-bill/1/text" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">H.R. 1 — One Big Beautiful Bill Act, Section 71120: Cost-Sharing Requirements</a> — U.S. Congress, 2025. {locale === "es" ? "Copagos de hasta $35 para afiliados de expansión de Medicaid; exención para FQHCs, CCBHCs y clínicas rurales." : "Up to $35 copays for Medicaid expansion enrollees; exemption for FQHCs, CCBHCs, and rural health clinics."}
                </li>
                <li>
                  <a href="https://www.healthmanagement.com/blog/h-r-1-signed-into-law-what-it-means-for-medicaid-and-public-coverage/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">H.R. 1 Signed Into Law: Impact on Medicaid and Coverage</a> — Health Management Associates, 2025. {locale === "es" ? "Análisis de la exención de copago para FQHCs y disposiciones clave." : "Analysis of FQHC copay exemption and key provisions."}
                </li>
                <li>
                  <a href="https://www.hrsa.gov/about/news/press-releases/new-data-health-center-patients" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Health Centers Serve Record Number of Patients</a> — HRSA, 2025. {locale === "es" ? "32.5 millones de pacientes atendidos en centros de salud financiados por HRSA (récord histórico del programa de 60 años)." : "32.5 million patients served at HRSA-funded health centers (60-year program record)."}
                </li>
                <li>
                  <a href="https://www.nachc.org/wp-content/uploads/2025/09/NACHC-Policy-Papers_CHC-Workforce_Sept2025.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">CHC Workforce Policy Paper</a> — NACHC, September 2025. {locale === "es" ? "55% de CHCs no pueden cubrir posiciones críticas; 86% no pueden ofrecer salarios competitivos." : "55% of CHCs cannot fill critical positions; 86% cannot offer competitive salaries."}
                </li>
                <li>
                  <a href="https://www.nachc.org/2024-uds-early-takeaways-community-health-center-growth-under-pressure/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">2024 UDS Early Takeaways: CHC Growth Under Pressure</a> — NACHC, 2025. {locale === "es" ? "Margen operativo promedio de CHCs cayó a -2.1%; 1 de cada 4 CHCs con márgenes por debajo de -5%." : "Average CHC operating margin fell to -2.1%; 1 in 4 CHCs operating below -5%."}
                </li>
                <li>
                  <a href="https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">How Massive Federal Cuts Will Create Unprecedented Challenges for Medi-Cal</a> — California Health Care Foundation, 2026. {locale === "es" ? "Impacto de H.R. 1 en Medi-Cal: $30 mil millones anuales en recortes federales." : "H.R. 1 impact on Medi-Cal: $30 billion/year in federal funding cuts."}
                </li>
                <li>
                  <a href="https://www.dhcs.ca.gov/federal-impacts/Documents/DHCS-HR1-Implementation-Plan.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">H.R. 1 Implementation Plan</a> — DHCS, January 2026. {locale === "es" ? "Cronograma de implementación: congelamiento de inscripciones (Ene 2026), dental (Jul 2026), PPS (Oct 2026)." : "Implementation timeline: enrollment freeze (Jan 2026), dental (Jul 2026), PPS (Oct 2026)."}
                </li>
                <li>
                  <a href="https://www.dhcs.ca.gov/provgovpart/Pages/CalAIM-1115-and-1915b-Waiver-Renewals.aspx" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">CalAIM 1115 and 1915(b) Waiver Renewals</a> — DHCS, 2026. {locale === "es" ? "Exención CalAIM vence el 31 de diciembre de 2026; proceso de renovación en curso." : "CalAIM waiver expires December 31, 2026; renewal process underway."}
                </li>
                <li>
                  <a href="https://lacounty.gov/2026/02/13/public-health-ending-clinic-services-at-seven-locations-due-to-significant-funding-cuts/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Public Health Ending Clinic Services at Seven Locations</a> — LA County, February 2026. {locale === "es" ? "7 de 13 clínicas de salud pública cerradas por déficit de $50 millones." : "7 of 13 public health clinics closed due to $50M funding shortfall."}
                </li>
                <li>
                  <a href="https://www.abc10.com/article/news/local/sacramento-county-health-funding-cut-rfk-california-doge/103-b1e53d57-777f-462c-becd-67bfebb4c89e" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">Sacramento County Faces $26M Funding Cut</a> — ABC10, 2025. {locale === "es" ? "Sacramento pierde $26M en fondos de salud por rescisión de subvenciones federales de HHS." : "Sacramento loses $26M in health funding from HHS federal grant rescission."}
                </li>
                <li>
                  <a href="https://www.commonwealthfund.org/blog/2022/how-differences-medicaid-medicare-and-commercial-health-insurance-payment-rates-impact" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">How Differences in Medicaid, Medicare, and Commercial Payment Rates Impact Access</a> — Commonwealth Fund, 2022. {locale === "es" ? "Medicaid paga ~30% menos que Medicare; Medicaid representa 43% de ingresos de CHCs." : "Medicaid pays ~30% less than Medicare; Medicaid accounts for 43% of CHC revenue."}
                </li>
              </ol>
            </div>
          </div>

          {/* CTA */}
          <ArticleCTA
            audience="intel-brief"
            relatedArticles={[
              { slug: "february-2026-jobs-report-healthcare-crisis", title: "The February 2026 Jobs Report: Healthcare Is Carrying the Entire Economy", esTitle: "El Informe de Empleos de Febrero 2026: El Sector Salud Carga Toda la Economía", category: "Data Report", esCategory: "Informe de Datos" },
              { slug: "medi-cal-funding-cuts-community-health-workers", title: "Medi-Cal Funding Cuts: What Community Health Workers Need to Know", esTitle: "Recortes de Medi-Cal: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber", category: "Career Resources", esCategory: "Recursos de Carrera" },
              { slug: "fqhc-ai-scribes-what-workers-need-to-know", title: "AI Scribes at FQHCs: What Community Health Workers Need to Know", esTitle: "Escribas de IA en los FQHCs: Lo Que los Trabajadores de Salud Comunitaria Necesitan Saber", category: "Technology & AI", esCategory: "Tecnología e IA" },
            ]}
          />
        </div>
      </article>
    </main>
  );
}
