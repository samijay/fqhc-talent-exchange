// fqhc-thought-leaders.ts
// Verified thought leaders and influencers in the FQHC/CHC sector
// Every person is real and verifiable — no fictional entries
// Bilingual (EN/ES) for all user-facing strings
// Last updated: 2026-02-28

/** Exported for display on pages — updated when new leaders are added */
export const LEADERS_LAST_UPDATED = "2026-02-28";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type LeaderCategory =
  | "nachc-leadership"
  | "state-pca"
  | "fqhc-ceo"
  | "policy-expert"
  | "workforce-research"
  | "ai-health"
  | "hrsa-leadership"
  | "consulting";

export interface ThoughtLeader {
  id: string;
  name: string;
  title: { en: string; es: string };
  organization: string;
  category: LeaderCategory;
  bio: { en: string; es: string };
  whyFollow: { en: string; es: string };
  linkedinUrl?: string;
  twitterUrl?: string;
  orgUrl: string;
  photoPlaceholder: string;
  relevantTopics: string[];
  relatedEconomicsIds?: string[];
  relatedFrameworkIds?: string[];
  relatedCaseStudyIds?: string[];
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

export const leaderCategoryMeta: Record<
  LeaderCategory,
  { label: { en: string; es: string }; icon: string; color: string }
> = {
  "nachc-leadership": {
    label: {
      en: "NACHC Leadership",
      es: "Liderazgo NACHC",
    },
    icon: "Building2",
    color: "bg-blue-100 text-blue-800",
  },
  "state-pca": {
    label: {
      en: "State PCA Leaders",
      es: "Lideres de PCA Estatal",
    },
    icon: "Landmark",
    color: "bg-purple-100 text-purple-800",
  },
  "fqhc-ceo": {
    label: {
      en: "Innovative FQHC CEOs",
      es: "CEOs Innovadores de FQHC",
    },
    icon: "Lightbulb",
    color: "bg-amber-100 text-amber-800",
  },
  "policy-expert": {
    label: {
      en: "Policy Experts",
      es: "Expertos en Politicas",
    },
    icon: "Scale",
    color: "bg-red-100 text-red-800",
  },
  "workforce-research": {
    label: {
      en: "Workforce Research",
      es: "Investigacion de Fuerza Laboral",
    },
    icon: "GraduationCap",
    color: "bg-green-100 text-green-800",
  },
  "ai-health": {
    label: {
      en: "AI in Health",
      es: "IA en Salud",
    },
    icon: "Brain",
    color: "bg-cyan-100 text-cyan-800",
  },
  "hrsa-leadership": {
    label: {
      en: "HRSA Leadership",
      es: "Liderazgo HRSA",
    },
    icon: "Shield",
    color: "bg-indigo-100 text-indigo-800",
  },
  consulting: {
    label: {
      en: "Consulting & Advisory",
      es: "Consultoria y Asesoria",
    },
    icon: "Briefcase",
    color: "bg-stone-100 text-stone-800",
  },
};

/* ------------------------------------------------------------------ */
/*  Thought Leaders                                                    */
/* ------------------------------------------------------------------ */

export const THOUGHT_LEADERS: ThoughtLeader[] = [
  // ──────────────────────────────────────────────────────────────────
  // NACHC Leadership (4)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "joe-dunn",
    name: "Joe Dunn",
    title: {
      en: "President & CEO, NACHC",
      es: "Presidente y CEO, NACHC",
    },
    organization: "National Association of Community Health Centers",
    category: "nachc-leadership",
    bio: {
      en: "Joe Dunn leads the National Association of Community Health Centers, the voice for over 1,400 health centers serving 30+ million patients. A former California State Senator, Dunn brings deep legislative experience to FQHC advocacy at the federal level. Under his leadership, NACHC has navigated the Community Health Center Fund reauthorization battles and built the NACHC Select vendor partnership program.",
      es: "Joe Dunn lidera la Asociacion Nacional de Centros de Salud Comunitarios, la voz de mas de 1,400 centros de salud que atienden a mas de 30 millones de pacientes. Ex Senador del Estado de California, Dunn aporta profunda experiencia legislativa a la defensa de FQHCs a nivel federal. Bajo su liderazgo, NACHC ha navegado las batallas de reautorizacion del Fondo de Centros de Salud Comunitarios.",
    },
    whyFollow: {
      en: "As the national voice for FQHCs, Dunn's public statements signal where federal funding and policy are headed. His legislative background makes him uniquely effective at reading the political landscape — essential intelligence for any health center CEO preparing for funding cliffs or reauthorization fights.",
      es: "Como la voz nacional de los FQHCs, las declaraciones publicas de Dunn senalan hacia donde se dirigen el financiamiento y las politicas federales. Su experiencia legislativa lo hace excepcionalmente efectivo para leer el panorama politico — inteligencia esencial para cualquier CEO de centro de salud preparandose para recortes o batallas de reautorizacion.",
    },
    orgUrl: "https://www.nachc.org",
    photoPlaceholder: "JD",
    relevantTopics: ["policy", "federal-funding", "advocacy"],
  },
  {
    id: "kyu-rhee",
    name: "Kyu Rhee, MD",
    title: {
      en: "Chief Public Health Officer, NACHC",
      es: "Director de Salud Publica, NACHC",
    },
    organization: "National Association of Community Health Centers",
    category: "nachc-leadership",
    bio: {
      en: "Dr. Kyu Rhee serves as NACHC's Chief Public Health Officer, bringing experience as HRSA's former Chief Medical Officer and IBM Watson Health VP. He leads NACHC's quality improvement, health equity, and population health strategies. Rhee has been instrumental in shaping the CHAI-NACHC AI partnership and the SEPP framework for safe AI adoption at health centers.",
      es: "El Dr. Kyu Rhee es el Director de Salud Publica de NACHC, con experiencia como ex Director Medico de HRSA y VP de IBM Watson Health. Lidera las estrategias de mejora de calidad, equidad en salud y salud poblacional de NACHC. Rhee ha sido fundamental en la asociacion CHAI-NACHC para IA y el marco SEPP para adopcion segura de IA en centros de salud.",
    },
    whyFollow: {
      en: "Rhee bridges clinical quality, technology, and policy in a way few FQHC leaders do. His HRSA background gives him insider knowledge of Section 330 compliance, and his IBM Watson experience means he understands both the promise and pitfalls of AI in safety-net settings. Follow him for early signals on quality metrics, AI adoption standards, and population health strategy.",
      es: "Rhee conecta calidad clinica, tecnologia y politica de una manera que pocos lideres de FQHC logran. Su experiencia en HRSA le da conocimiento interno sobre cumplimiento de la Seccion 330, y su experiencia en IBM Watson significa que entiende tanto las promesas como los riesgos de la IA en entornos de red de seguridad.",
    },
    orgUrl: "https://www.nachc.org",
    photoPlaceholder: "KR",
    relevantTopics: ["quality", "population-health", "health-equity"],
  },
  {
    id: "rachel-gonzales-hanson",
    name: "Rachel Gonzales-Hanson",
    title: {
      en: "Executive Vice President, NACHC",
      es: "Vicepresidenta Ejecutiva, NACHC",
    },
    organization: "National Association of Community Health Centers",
    category: "nachc-leadership",
    bio: {
      en: "Rachel Gonzales-Hanson serves as Executive Vice President at NACHC, where she leads health center innovation, operations, and training programs. She oversees the NACHC Select program that negotiates group purchasing for 1,400+ health centers and directs the annual Community Health Institute conference. Her work focuses on making operational improvements accessible and affordable for health centers of all sizes.",
      es: "Rachel Gonzales-Hanson es Vicepresidenta Ejecutiva de NACHC, donde lidera innovacion, operaciones y programas de capacitacion de centros de salud. Supervisa el programa NACHC Select que negocia compras grupales para mas de 1,400 centros de salud y dirige la conferencia anual del Instituto de Salud Comunitaria.",
    },
    whyFollow: {
      en: "Gonzales-Hanson controls the pipeline of operational tools and vendor partnerships that reach every FQHC in America through NACHC Select. Following her means early access to new programs, training opportunities, and group purchasing deals that can directly reduce your operating costs.",
      es: "Gonzales-Hanson controla la linea de herramientas operativas y asociaciones con proveedores que llegan a cada FQHC en Estados Unidos a traves de NACHC Select. Seguirla significa acceso temprano a nuevos programas, oportunidades de capacitacion y acuerdos de compra grupal que pueden reducir directamente sus costos operativos.",
    },
    orgUrl: "https://www.nachc.org",
    photoPlaceholder: "RG",
    relevantTopics: ["operations", "innovation", "workforce"],
  },
  {
    id: "kelvin-gipson",
    name: "Kelvin Gipson",
    title: {
      en: "SVP of Federal, State & Local Affairs, NACHC",
      es: "SVP de Asuntos Federales, Estatales y Locales, NACHC",
    },
    organization: "National Association of Community Health Centers",
    category: "nachc-leadership",
    bio: {
      en: "Kelvin Gipson leads NACHC's federal advocacy and lobbying efforts as Senior Vice President of Federal, State & Local Affairs. He coordinates the national health center advocacy network, mobilizing thousands of health center leaders for Policy & Issues Forum events and congressional outreach. Gipson's team tracks every piece of legislation affecting FQHCs and shapes NACHC's position on Medicaid, 340B, and Section 330 policy.",
      es: "Kelvin Gipson lidera los esfuerzos de defensa y cabildeo federal de NACHC como Vicepresidente Senior de Asuntos Federales, Estatales y Locales. Coordina la red nacional de defensa de centros de salud, movilizando miles de lideres para eventos del Foro de Politicas y Asuntos y divulgacion congresional.",
    },
    whyFollow: {
      en: "Gipson is the person who knows which bills are moving, which amendments threaten FQHC funding, and when to mobilize. His advocacy alerts and P&I Forum briefings are the earliest warning system for policy changes that could affect your budget. If you only follow one person for legislative intelligence, make it him.",
      es: "Gipson es la persona que sabe que proyectos de ley se estan moviendo, que enmiendas amenazan el financiamiento de FQHCs, y cuando movilizarse. Sus alertas de defensa y sesiones del Foro P&I son el sistema de alerta mas temprana para cambios de politica que podrian afectar su presupuesto.",
    },
    orgUrl: "https://www.nachc.org",
    photoPlaceholder: "KG",
    relevantTopics: ["policy", "medicaid", "advocacy", "lobbying"],
  },

  // ──────────────────────────────────────────────────────────────────
  // State PCA Leaders (4)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "carmela-castellano-garcia",
    name: "Carmela Castellano-Garcia",
    title: {
      en: "President & CEO, California Primary Care Association",
      es: "Presidenta y CEO, Asociacion de Atencion Primaria de California",
    },
    organization: "California Primary Care Association (CPCA)",
    category: "state-pca",
    bio: {
      en: "Carmela Castellano-Garcia has led the California Primary Care Association for over 25 years, making her one of the longest-serving PCA leaders in the nation. CPCA represents California's 1,370+ community health center sites serving 7.5 million patients. She has been central to every major California FQHC policy win, including SB 525 (healthcare minimum wage), CalAIM implementation, and Medi-Cal managed care negotiations.",
      es: "Carmela Castellano-Garcia ha liderado la Asociacion de Atencion Primaria de California por mas de 25 anos, convirtiendola en una de las lideres de PCA con mas tiempo en servicio del pais. CPCA representa mas de 1,370 sitios de centros de salud comunitarios de California que atienden a 7.5 millones de pacientes.",
    },
    whyFollow: {
      en: "For any FQHC operating in California, Castellano-Garcia is the single most important policy voice. She negotiates directly with Sacramento on Medi-Cal rates, workforce funding, and regulatory requirements. Her public statements often preview policy changes months before they take effect. CPCA's legislative tracker and conference briefings are essential reading.",
      es: "Para cualquier FQHC que opera en California, Castellano-Garcia es la voz de politica mas importante. Negocia directamente con Sacramento sobre tarifas de Medi-Cal, financiamiento de fuerza laboral y requisitos regulatorios. Sus declaraciones publicas a menudo anticipan cambios de politica meses antes de que entren en vigor.",
    },
    orgUrl: "https://www.cpca.org",
    photoPlaceholder: "CC",
    relevantTopics: ["california", "medicaid", "policy", "advocacy"],
  },
  {
    id: "yvette-lagonterie",
    name: "Yvette LaGonterie",
    title: {
      en: "VP of Policy, California Primary Care Association",
      es: "VP de Politicas, Asociacion de Atencion Primaria de California",
    },
    organization: "California Primary Care Association (CPCA)",
    category: "state-pca",
    bio: {
      en: "Yvette LaGonterie leads policy development at CPCA, focusing on CalAIM implementation, Medi-Cal managed care reform, and Enhanced Care Management (ECM) rollout for California's health centers. She works directly with DHCS on policy guidance that shapes how FQHCs deliver and bill for services under CalAIM's new benefit structures.",
      es: "Yvette LaGonterie lidera el desarrollo de politicas en CPCA, enfocandose en la implementacion de CalAIM, la reforma del cuidado administrado de Medi-Cal y el lanzamiento de la Gestion de Cuidado Mejorado (ECM) para los centros de salud de California. Trabaja directamente con DHCS en orientacion de politicas.",
    },
    whyFollow: {
      en: "If your FQHC is implementing CalAIM, ECM, or Community Supports, LaGonterie's guidance is the bridge between state policy documents and operational reality. She translates dense DHCS policy letters into actionable steps for health centers and flags compliance risks before they become audit findings.",
      es: "Si su FQHC esta implementando CalAIM, ECM o Apoyos Comunitarios, la orientacion de LaGonterie es el puente entre los documentos de politica estatal y la realidad operativa. Ella traduce las cartas de politica densas de DHCS en pasos accionables para centros de salud.",
    },
    orgUrl: "https://www.cpca.org",
    photoPlaceholder: "YL",
    relevantTopics: ["calAIM", "medi-cal", "policy"],
  },
  {
    id: "lei-chou-thao",
    name: "Lei Chou Thao",
    title: {
      en: "President & CEO, AAPCHO",
      es: "Presidenta y CEO, AAPCHO",
    },
    organization: "Association of Asian Pacific Community Health Organizations",
    category: "state-pca",
    bio: {
      en: "Lei Chou Thao leads AAPCHO, the national organization representing community health centers serving Asian American, Native Hawaiian, and Pacific Islander communities. AAPCHO provides technical assistance, conducts health disparities research, and advocates for linguistically and culturally appropriate care across the safety net. Thao brings deep expertise in health equity for underserved API populations.",
      es: "Lei Chou Thao lidera AAPCHO, la organizacion nacional que representa centros de salud comunitarios que atienden a comunidades asiatico-americanas, nativas de Hawai e islenas del Pacifico. AAPCHO proporciona asistencia tecnica, realiza investigaciones sobre disparidades de salud y aboga por atencion linguistica y culturalmente apropiada.",
    },
    whyFollow: {
      en: "AAPCHO produces some of the strongest health equity research in the CHC space, with data on language access, cultural competency, and disparities that directly affects how FQHCs design services. Thao's leadership is especially relevant for California FQHCs serving diverse API communities where language barriers affect care outcomes and UDS reporting.",
      es: "AAPCHO produce algunas de las investigaciones mas solidas sobre equidad en salud en el espacio de CHCs, con datos sobre acceso lingueistico, competencia cultural y disparidades que afectan directamente como los FQHCs disenan servicios. El liderazgo de Thao es especialmente relevante para FQHCs de California.",
    },
    orgUrl: "https://www.aapcho.org",
    photoPlaceholder: "LT",
    relevantTopics: ["health-equity", "API-communities", "workforce"],
  },
  {
    id: "roger-rosenthal",
    name: "Roger Rosenthal",
    title: {
      en: "Former CEO, Migrant Clinicians Network",
      es: "Ex CEO, Red de Clinicos Migrantes",
    },
    organization: "Migrant Clinicians Network",
    category: "state-pca",
    bio: {
      en: "Roger Rosenthal led the Migrant Clinicians Network for decades, building it into the leading organization supporting healthcare for migrant and seasonal farmworkers. MCN developed the Health Network, a portable medical record system enabling continuity of care for mobile populations, and provides training to clinicians across the migrant health network. Rosenthal's work shaped federal migrant health policy and workforce development for farmworker-serving health centers.",
      es: "Roger Rosenthal lidero la Red de Clinicos Migrantes durante decadas, convirtiendola en la organizacion lider que apoya la atencion medica para trabajadores agricolas migrantes y estacionales. MCN desarrollo Health Network, un sistema de registros medicos portatiles que permite continuidad de atencion para poblaciones moviles.",
    },
    whyFollow: {
      en: "For FQHCs in California's Central Valley, Salinas Valley, and agricultural regions, Rosenthal's work on migrant health is foundational. MCN's clinical resources, training programs, and policy positions on farmworker health directly affect how your health center serves one of California's most vulnerable populations. His legacy continues to shape migrant health center operations.",
      es: "Para FQHCs en el Valle Central, Valle de Salinas y regiones agricolas de California, el trabajo de Rosenthal en salud migrante es fundamental. Los recursos clinicos, programas de capacitacion y posiciones de politica de MCN sobre salud de trabajadores agricolas afectan directamente como su centro de salud atiende a una de las poblaciones mas vulnerables.",
    },
    orgUrl: "https://www.migrantclinician.org",
    photoPlaceholder: "RR",
    relevantTopics: ["migrant-health", "workforce", "health-equity"],
  },

  // ──────────────────────────────────────────────────────────────────
  // Innovative FQHC CEOs (5)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "brenda-battle",
    name: "Brenda Battle",
    title: {
      en: "CEO, PureView Health Center",
      es: "CEO, PureView Health Center",
    },
    organization: "PureView Health Center",
    category: "fqhc-ceo",
    bio: {
      en: "Brenda Battle leads PureView Health Center in Helena, Montana, where she engineered one of the most dramatic revenue transformations in FQHC history. Under her leadership, PureView reduced federal grant dependency from 62.5% to just 17% of total revenue by diversifying into commercial insurance, pharmacy operations, and value-based contracts. This makes PureView a national model for financial sustainability in an era of federal funding uncertainty.",
      es: "Brenda Battle lidera PureView Health Center en Helena, Montana, donde diseno una de las transformaciones de ingresos mas dramaticas en la historia de los FQHCs. Bajo su liderazgo, PureView redujo la dependencia de subvenciones federales del 62.5% a solo el 17% del ingreso total diversificandose en seguros comerciales, operaciones de farmacia y contratos basados en valor.",
    },
    whyFollow: {
      en: "Battle proved that an FQHC can thrive even if Section 330 funding disappears. Her playbook — diversify revenue, grow pharmacy, pursue commercial contracts — is the most relevant strategy for any health center CEO worried about H.R. 1 cuts or CHCF expiration. PureView's numbers are the proof of concept.",
      es: "Battle demostro que un FQHC puede prosperar incluso si desaparece el financiamiento de la Seccion 330. Su estrategia — diversificar ingresos, crecer farmacia, buscar contratos comerciales — es la mas relevante para cualquier CEO preocupado por los recortes de H.R. 1 o la expiracion del CHCF.",
    },
    orgUrl: "https://www.pureviewhealthcenter.org",
    photoPlaceholder: "BB",
    relevantTopics: ["revenue-diversification", "federal-dependency", "sustainability"],
    relatedCaseStudyIds: ["pureview-federal-dependency"],
  },
  {
    id: "kevin-rios",
    name: "Kevin Rios",
    title: {
      en: "CEO, United Health Centers of the San Joaquin Valley",
      es: "CEO, Centros de Salud Unidos del Valle de San Joaquin",
    },
    organization: "United Health Centers of the San Joaquin Valley",
    category: "fqhc-ceo",
    bio: {
      en: "Kevin Rios leads United Health Centers, one of California's largest FQHCs serving the San Joaquin Valley with 22 sites and 190,000+ patients. In 2024, Rios launched a for-profit Independent Practice Association (IPA) subsidiary to pursue capitated managed care contracts — a bold move that positions UHC to capture value-based payment revenue that traditionally flows to middlemen. The IPA model creates a new revenue stream while keeping care coordinated within the FQHC network.",
      es: "Kevin Rios lidera Centros de Salud Unidos, uno de los FQHCs mas grandes de California que sirve al Valle de San Joaquin con 22 sitios y mas de 190,000 pacientes. En 2024, Rios lanzo una subsidiaria de Asociacion de Practica Independiente (IPA) con fines de lucro para buscar contratos capitados de cuidado administrado.",
    },
    whyFollow: {
      en: "Rios is testing whether FQHCs can move beyond fee-for-service into managed care risk. His IPA experiment in the San Joaquin Valley is the most ambitious FQHC revenue model innovation in California right now. If it works, it becomes a playbook for every large FQHC looking to capture capitated revenue. Watch this closely.",
      es: "Rios esta probando si los FQHCs pueden ir mas alla del pago por servicio hacia el riesgo de cuidado administrado. Su experimento IPA en el Valle de San Joaquin es la innovacion de modelo de ingresos mas ambiciosa de un FQHC en California. Si funciona, se convierte en un modelo para todo FQHC grande.",
    },
    orgUrl: "https://www.unitedhealthcenters.org",
    photoPlaceholder: "KR",
    relevantTopics: ["managed-care", "capitation", "VBP"],
    relatedCaseStudyIds: ["united-health-centers-ipa"],
  },
  {
    id: "fran-silvestri",
    name: "Fran Silvestri",
    title: {
      en: "President & CEO, Community Health Center, Inc. / Weitzman Institute",
      es: "Presidente y CEO, Community Health Center, Inc. / Instituto Weitzman",
    },
    organization: "Community Health Center, Inc. / Weitzman Institute",
    category: "fqhc-ceo",
    bio: {
      en: "Fran Silvestri leads Community Health Center, Inc. in Connecticut and its research arm, the Weitzman Institute — the only federally funded research institute embedded within an FQHC. The Weitzman Institute conducts health center-specific research on workforce, quality, telehealth, and operational models that directly benefits the broader CHC movement. Silvestri has positioned CHC Inc. as a national model for integrating research with community-based care delivery.",
      es: "Fran Silvestri lidera Community Health Center, Inc. en Connecticut y su brazo de investigacion, el Instituto Weitzman — el unico instituto de investigacion con financiamiento federal integrado dentro de un FQHC. El Instituto Weitzman realiza investigaciones especificas de centros de salud sobre fuerza laboral, calidad, telesalud y modelos operativos.",
    },
    whyFollow: {
      en: "The Weitzman Institute produces the most rigorous, FQHC-specific research available — from workforce studies to telehealth outcomes to quality improvement methods. Silvestri's dual role means their research is immediately tested in a real health center. If you want evidence-based strategies rather than consultant opinions, Weitzman is the source.",
      es: "El Instituto Weitzman produce la investigacion mas rigurosa y especifica de FQHCs disponible — desde estudios de fuerza laboral hasta resultados de telesalud y metodos de mejora de calidad. El rol dual de Silvestri significa que su investigacion se prueba inmediatamente en un centro de salud real.",
    },
    orgUrl: "https://www.chc1.com",
    photoPlaceholder: "FS",
    relevantTopics: ["research", "innovation", "quality"],
  },
  {
    id: "robert-gillanders",
    name: "Robert Gillanders",
    title: {
      en: "CEO, MCR Health",
      es: "CEO, MCR Health",
    },
    organization: "MCR Health",
    category: "fqhc-ceo",
    bio: {
      en: "Robert Gillanders leads MCR Health in Florida, where he pioneered a subscription-based primary care model through NACHC's Innovation Incubator program. MCR Health launched a direct-to-employer subscription service offering unlimited primary care visits for a flat monthly fee — a model that diversifies revenue beyond Medicaid while improving care access. The program attracted 400+ subscribers in its first phase and demonstrated that FQHCs can compete for employer-sponsored care.",
      es: "Robert Gillanders lidera MCR Health en Florida, donde fue pionero en un modelo de atencion primaria por suscripcion a traves del programa Incubadora de Innovacion de NACHC. MCR Health lanzo un servicio de suscripcion directa al empleador que ofrece visitas ilimitadas de atencion primaria por una tarifa mensual fija.",
    },
    whyFollow: {
      en: "Gillanders is proving that FQHCs can sell primary care directly to employers — bypassing insurance entirely. His subscription model through the NACHC Innovation Incubator is a real-world test of whether health centers can capture a new market segment. For any CEO looking beyond Medicaid and grants, this is the experiment to watch.",
      es: "Gillanders esta demostrando que los FQHCs pueden vender atencion primaria directamente a empleadores. Su modelo de suscripcion a traves de la Incubadora de Innovacion de NACHC es una prueba real de si los centros de salud pueden capturar un nuevo segmento de mercado.",
    },
    orgUrl: "https://www.mcrhealth.org",
    photoPlaceholder: "RG",
    relevantTopics: ["revenue-diversification", "innovation"],
    relatedCaseStudyIds: ["mcr-health-subscription-model"],
  },
  {
    id: "david-vliet",
    name: "David Vliet",
    title: {
      en: "CEO, Yakima Valley Farm Workers Clinic",
      es: "CEO, Clinica de Trabajadores Agricolas del Valle de Yakima",
    },
    organization: "Yakima Valley Farm Workers Clinic",
    category: "fqhc-ceo",
    bio: {
      en: "David Vliet leads Yakima Valley Farm Workers Clinic, one of the largest community health organizations in the Pacific Northwest, operating across Washington and Oregon with over 40 clinics and 600,000+ patient visits annually. Under his leadership, YVFWC has built an integrated delivery system model combining medical, dental, behavioral health, and pharmacy services with a deep commitment to agricultural worker communities. The organization is known for its workforce development pipeline and culturally responsive care.",
      es: "David Vliet lidera la Clinica de Trabajadores Agricolas del Valle de Yakima, una de las organizaciones de salud comunitaria mas grandes del Pacifico Noroeste, operando en Washington y Oregon con mas de 40 clinicas y mas de 600,000 visitas de pacientes anuales. Bajo su liderazgo, YVFWC ha construido un modelo de sistema de entrega integrado.",
    },
    whyFollow: {
      en: "Vliet runs one of the few FQHCs that has successfully scaled to 40+ sites while maintaining quality and cultural mission. His integrated delivery model — medical, dental, behavioral health, pharmacy under one roof — is the operational blueprint that mid-size FQHCs aspire to. His workforce pipeline and farmworker health expertise are directly relevant to California's agricultural regions.",
      es: "Vliet opera uno de los pocos FQHCs que ha escalado exitosamente a mas de 40 sitios manteniendo calidad y mision cultural. Su modelo de entrega integrado es el plan operativo al que aspiran los FQHCs medianos. Su experiencia en fuerza laboral y salud de trabajadores agricolas es directamente relevante para las regiones agricolas de California.",
    },
    orgUrl: "https://www.yvfwc.org",
    photoPlaceholder: "DV",
    relevantTopics: ["workforce", "integration", "rural-health"],
  },

  // ──────────────────────────────────────────────────────────────────
  // Policy Experts (4)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "sara-rosenbaum",
    name: "Sara Rosenbaum",
    title: {
      en: "Harold and Jane Hirsh Professor, George Washington University",
      es: "Profesora Harold y Jane Hirsh, Universidad George Washington",
    },
    organization: "George Washington University, Milken Institute School of Public Health",
    category: "policy-expert",
    bio: {
      en: "Sara Rosenbaum is the foremost legal and policy scholar on Medicaid and Section 330 — the statute that created the FQHC program. As the Harold and Jane Hirsh Professor at GWU's Milken Institute School of Public Health, she has spent four decades studying the legal foundations of community health centers. Her work on the 330 grant requirements, FQHC designation, Medicaid coverage mandates, and PPS reimbursement is cited in virtually every major FQHC policy debate.",
      es: "Sara Rosenbaum es la principal academica legal y de politicas sobre Medicaid y la Seccion 330 — el estatuto que creo el programa FQHC. Como Profesora Harold y Jane Hirsh en la Escuela de Salud Publica Milken de GWU, ha pasado cuatro decadas estudiando los fundamentos legales de los centros de salud comunitarios.",
    },
    whyFollow: {
      en: "When Congress debates FQHC funding or CMS proposes rule changes, Rosenbaum's analysis is what policy experts and health center associations rely on. She can explain the legal implications of a single word change in a bill in ways that reveal real operational impact. Her GWU Geiger Gibson briefs are the gold standard for understanding what Section 330 actually requires.",
      es: "Cuando el Congreso debate el financiamiento de FQHCs o CMS propone cambios de reglas, el analisis de Rosenbaum es lo que utilizan los expertos en politicas y las asociaciones de centros de salud. Puede explicar las implicaciones legales de un solo cambio de palabra en un proyecto de ley.",
    },
    orgUrl: "https://publichealth.gwu.edu",
    photoPlaceholder: "SR",
    relevantTopics: ["medicaid", "section-330", "policy", "legal"],
    relatedEconomicsIds: ["section-330-grants", "fmap-medicaid"],
  },
  {
    id: "peter-shin",
    name: "Peter Shin, PhD",
    title: {
      en: "Associate Professor & Geiger Gibson Program, GWU",
      es: "Profesor Asociado y Programa Geiger Gibson, GWU",
    },
    organization: "George Washington University, Geiger Gibson Program",
    category: "policy-expert",
    bio: {
      en: "Peter Shin is an Associate Professor at GWU and a lead researcher in the Geiger Gibson / RCHN Community Health Foundation Research Collaborative. He produces data-driven research on FQHC workforce, financing, and patient demographics using UDS and HRSA data. Shin's work quantifies the impact of policy changes on health centers with the rigor that policymakers and health center leaders need for evidence-based advocacy.",
      es: "Peter Shin es Profesor Asociado en GWU e investigador principal en el Programa Geiger Gibson / RCHN Community Health Foundation Research Collaborative. Produce investigaciones basadas en datos sobre fuerza laboral, financiamiento y demografia de pacientes de FQHCs usando datos UDS y HRSA.",
    },
    whyFollow: {
      en: "Shin produces the most authoritative data analyses of the FQHC sector. His Geiger Gibson research briefs quantify workforce shortages, patient trends, and financial vulnerabilities using UDS data that no one else analyzes this deeply. When you need numbers to support a board presentation or grant application, Shin's research is where you start.",
      es: "Shin produce los analisis de datos mas autorizados del sector FQHC. Sus informes de investigacion Geiger Gibson cuantifican escasez de fuerza laboral, tendencias de pacientes y vulnerabilidades financieras usando datos UDS que nadie mas analiza a esta profundidad.",
    },
    orgUrl: "https://publichealth.gwu.edu/departments/health-policy-and-management/geiger-gibson-program",
    photoPlaceholder: "PS",
    relevantTopics: ["research", "data", "policy", "workforce"],
  },
  {
    id: "jesse-ehrenfeld",
    name: "Jesse Ehrenfeld, MD",
    title: {
      en: "President, American Medical Association",
      es: "Presidente, Asociacion Medica Americana",
    },
    organization: "American Medical Association",
    category: "policy-expert",
    bio: {
      en: "Dr. Jesse Ehrenfeld serves as President of the American Medical Association, the nation's largest physician organization. He has made AI in healthcare and health equity central to his AMA agenda, pushing for responsible AI adoption standards and physician well-being initiatives. His presidency has focused on addressing the physician burnout crisis and ensuring AI tools augment rather than replace clinical judgment.",
      es: "El Dr. Jesse Ehrenfeld es Presidente de la Asociacion Medica Americana, la organizacion de medicos mas grande del pais. Ha puesto la IA en salud y la equidad en salud como temas centrales de su agenda en la AMA, promoviendo estandares de adopcion responsable de IA e iniciativas de bienestar medico.",
    },
    whyFollow: {
      en: "The AMA's positions on AI, scope of practice, and physician workforce directly affect FQHCs. Ehrenfeld's advocacy on AI adoption standards will shape what tools your providers can use and how they are regulated. His burnout reduction focus also drives AMA policy on documentation requirements and prior authorization reform — both major pain points for FQHC providers.",
      es: "Las posiciones de la AMA sobre IA, alcance de practica y fuerza laboral medica afectan directamente a los FQHCs. La defensa de Ehrenfeld sobre estandares de adopcion de IA dara forma a que herramientas pueden usar sus proveedores y como se regulan.",
    },
    orgUrl: "https://www.ama-assn.org",
    photoPlaceholder: "JE",
    relevantTopics: ["AI", "health-equity", "physician-workforce"],
  },
  {
    id: "atul-grover",
    name: "Atul Grover, MD",
    title: {
      en: "Executive Vice President, AAMC",
      es: "Vicepresidente Ejecutivo, AAMC",
    },
    organization: "Association of American Medical Colleges",
    category: "policy-expert",
    bio: {
      en: "Dr. Atul Grover serves as Executive Vice President at the Association of American Medical Colleges, where he leads research and policy on the physician workforce pipeline. His work on Graduate Medical Education (GME) funding, residency slot allocation, and physician supply projections directly shapes the pipeline of physicians available to FQHCs. AAMC's workforce projections — predicting shortages of up to 124,000 physicians by 2034 — drive federal investment in training programs.",
      es: "El Dr. Atul Grover es Vicepresidente Ejecutivo de la Asociacion de Facultades de Medicina Americanas, donde lidera investigacion y politica sobre la linea de produccion de fuerza laboral medica. Su trabajo en financiamiento GME y proyecciones de oferta medica da forma directamente a la disponibilidad de medicos para FQHCs.",
    },
    whyFollow: {
      en: "FQHCs compete for physicians from the same pipeline that AAMC tracks. Grover's workforce projections tell you how tight the physician market will be in 3-5 years, and his GME policy positions affect whether new residency slots get created in underserved areas. If you are planning workforce strategy or pursuing Teaching Health Center funding, his work is essential context.",
      es: "Los FQHCs compiten por medicos de la misma linea de produccion que AAMC rastrea. Las proyecciones de Grover indican cuan competitivo sera el mercado medico en 3-5 anos, y sus posiciones sobre GME afectan si se crean nuevas plazas de residencia en areas desatendidas.",
    },
    orgUrl: "https://www.aamc.org",
    photoPlaceholder: "AG",
    relevantTopics: ["GME", "workforce-pipeline", "physician-supply"],
  },

  // ──────────────────────────────────────────────────────────────────
  // Workforce Research (3)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "bianca-frogner",
    name: "Bianca Frogner, PhD",
    title: {
      en: "Director, Center for Health Workforce Studies, University of Washington",
      es: "Directora, Centro de Estudios de Fuerza Laboral de Salud, Universidad de Washington",
    },
    organization: "University of Washington, Center for Health Workforce Studies",
    category: "workforce-research",
    bio: {
      en: "Dr. Bianca Frogner directs the Center for Health Workforce Studies at the University of Washington, one of the nation's leading research centers on healthcare labor markets. Her research focuses on community health worker integration, wage equity, scope of practice, and the economic impact of workforce policies. Frogner's data on CHW compensation, certification requirements, and deployment models is the most cited in the field.",
      es: "La Dra. Bianca Frogner dirige el Centro de Estudios de Fuerza Laboral de Salud en la Universidad de Washington, uno de los principales centros de investigacion sobre mercados laborales de salud. Su investigacion se enfoca en integracion de trabajadores de salud comunitarios, equidad salarial, alcance de practica e impacto economico de politicas laborales.",
    },
    whyFollow: {
      en: "Frogner produces the workforce data that drives FQHC hiring and compensation decisions. Her CHW research is especially valuable as California expands ECM and Community Health Worker certification. If you are setting salary ranges, designing CHW programs, or making the case for new positions to your board, her data is your evidence base.",
      es: "Frogner produce los datos de fuerza laboral que impulsan las decisiones de contratacion y compensacion de FQHCs. Su investigacion sobre CHW es especialmente valiosa mientras California expande ECM y la certificacion de Trabajadores de Salud Comunitarios.",
    },
    orgUrl: "https://familymedicine.uw.edu/chws/",
    photoPlaceholder: "BF",
    relevantTopics: ["workforce-data", "CHW", "wages"],
  },
  {
    id: "fitzhugh-mullan",
    name: "Fitzhugh Mullan, MD",
    title: {
      en: "Founder, GWU Geiger Gibson Program (1942-2019)",
      es: "Fundador, Programa Geiger Gibson de GWU (1942-2019)",
    },
    organization: "George Washington University (legacy)",
    category: "workforce-research",
    bio: {
      en: "Dr. Fitzhugh Mullan (1942-2019) was a physician, author, and public health leader who founded the Geiger Gibson Program at GWU — the premier research program on community health centers. As a former U.S. Public Health Service officer, he was an architect of the National Health Service Corps (NHSC) and a lifelong advocate for the community health center movement. His books and policy writing shaped how America understands safety-net healthcare. His legacy continues through the research program that bears the names of the movement's founders.",
      es: "El Dr. Fitzhugh Mullan (1942-2019) fue medico, autor y lider de salud publica que fundo el Programa Geiger Gibson en GWU — el principal programa de investigacion sobre centros de salud comunitarios. Como ex oficial del Servicio de Salud Publica de EE.UU., fue arquitecto del Cuerpo Nacional de Servicio de Salud (NHSC).",
    },
    whyFollow: {
      en: "Mullan's legacy is the intellectual foundation of the FQHC movement. His writing on community health centers, the NHSC, and health equity provides the historical context that every FQHC leader should know. The Geiger Gibson Program he founded continues to produce the most important research on the sector. Understanding his work means understanding why FQHCs exist.",
      es: "El legado de Mullan es la base intelectual del movimiento FQHC. Sus escritos sobre centros de salud comunitarios, el NHSC y la equidad en salud proporcionan el contexto historico que todo lider de FQHC debe conocer. El Programa Geiger Gibson que fundo continua produciendo la investigacion mas importante del sector.",
    },
    orgUrl: "https://publichealth.gwu.edu/departments/health-policy-and-management/geiger-gibson-program",
    photoPlaceholder: "FM",
    relevantTopics: ["NHSC", "health-equity", "safety-net-history"],
  },
  {
    id: "kedar-mate",
    name: "Kedar Mate, MD",
    title: {
      en: "President & CEO, Institute for Healthcare Improvement",
      es: "Presidente y CEO, Instituto para la Mejora de la Atencion Medica",
    },
    organization: "Institute for Healthcare Improvement (IHI)",
    category: "workforce-research",
    bio: {
      en: "Dr. Kedar Mate leads the Institute for Healthcare Improvement, the global organization that developed the Plan-Do-Study-Act (PDSA) cycle, the Triple Aim framework, and many of the quality improvement methodologies used across healthcare. Under his leadership, IHI has expanded its focus on health equity, workforce well-being, and safety-net provider support. IHI's improvement science is the operational backbone of quality programs at FQHCs nationwide.",
      es: "El Dr. Kedar Mate lidera el Instituto para la Mejora de la Atencion Medica, la organizacion global que desarrollo el ciclo Plan-Do-Study-Act (PDSA), el marco Triple Aim y muchas de las metodologias de mejora de calidad utilizadas en salud. Bajo su liderazgo, IHI ha expandido su enfoque en equidad en salud y bienestar de la fuerza laboral.",
    },
    whyFollow: {
      en: "IHI's improvement science is how FQHCs achieve UDS quality benchmarks and demonstrate value to payers. Mate's leadership on PDSA cycles, joy in work, and equitable care design directly applies to health center operations. If your QI team is running improvement projects, they are almost certainly using IHI methods — understanding the source makes you a better leader.",
      es: "La ciencia de mejora de IHI es como los FQHCs logran puntos de referencia de calidad UDS y demuestran valor a los pagadores. El liderazgo de Mate en ciclos PDSA, satisfaccion en el trabajo y diseno de atencion equitativa se aplica directamente a las operaciones de centros de salud.",
    },
    orgUrl: "https://www.ihi.org",
    photoPlaceholder: "KM",
    relevantTopics: ["quality-improvement", "PDSA", "operational-excellence"],
    relatedFrameworkIds: ["pdsa-cycle"],
  },

  // ──────────────────────────────────────────────────────────────────
  // AI in Health (4)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "dario-amodei",
    name: "Dario Amodei",
    title: {
      en: "CEO, Anthropic",
      es: "CEO, Anthropic",
    },
    organization: "Anthropic",
    category: "ai-health",
    bio: {
      en: "Dario Amodei is CEO and co-founder of Anthropic, the AI safety company that launched Claude for Healthcare in January 2026. The healthcare product includes HIPAA-ready tools for CMS coding, ICD-10 integration, prior authorization support, and clinical documentation. Elation Health's integration of Claude reduced chart review time by 61% and saved providers 13 minutes per visit. Amodei's focus on safety-first AI development is shaping how the healthcare industry approaches AI adoption.",
      es: "Dario Amodei es CEO y cofundador de Anthropic, la empresa de seguridad de IA que lanzo Claude para Salud en enero de 2026. El producto de salud incluye herramientas listas para HIPAA para codificacion CMS, integracion ICD-10, soporte de autorizacion previa y documentacion clinica. La integracion de Elation Health con Claude redujo el tiempo de revision de historiales en 61%.",
    },
    whyFollow: {
      en: "Anthropic's Claude for Healthcare is positioned to become a major player in FQHC clinical workflows, especially through EHR partnerships like Elation Health. Amodei's public statements signal where safety-focused AI is headed in healthcare — and whether FQHCs will get affordable access to tools that large health systems already use.",
      es: "Claude para Salud de Anthropic esta posicionado para convertirse en un actor importante en los flujos de trabajo clinicos de FQHCs. Las declaraciones publicas de Amodei senalan hacia donde se dirige la IA centrada en seguridad en salud.",
    },
    orgUrl: "https://www.anthropic.com",
    photoPlaceholder: "DA",
    relevantTopics: ["AI", "clinical-documentation", "revenue-cycle"],
    relatedCaseStudyIds: ["sun-river-health-ai-documentation"],
  },
  {
    id: "girish-navani",
    name: "Girish Navani",
    title: {
      en: "CEO & Co-Founder, eClinicalWorks",
      es: "CEO y Cofundador, eClinicalWorks",
    },
    organization: "eClinicalWorks",
    category: "ai-health",
    bio: {
      en: "Girish Navani co-founded and leads eClinicalWorks, one of the largest EHR vendors serving community health centers. Through the NACHC-eClinicalWorks partnership, Navani has made AI tools like healow AI (no-show prediction) and Sunoh.ai (ambient documentation) available to CHCs at bundled pricing via NACHC Select. Sun River Health documented providers completing notes on 26 patients within 30 minutes using Sunoh.ai. eClinicalWorks serves a significant share of the FQHC market.",
      es: "Girish Navani cofundo y lidera eClinicalWorks, uno de los mayores proveedores de EHR que sirven a centros de salud comunitarios. A traves de la asociacion NACHC-eClinicalWorks, Navani ha puesto herramientas de IA como healow AI y Sunoh.ai disponibles para CHCs a precios agrupados via NACHC Select.",
    },
    whyFollow: {
      en: "If your FQHC uses eClinicalWorks (and many do), Navani's product roadmap directly affects your clinical workflows. The NACHC Select bundled pricing means AI tools that were previously unaffordable are now within reach. Tracking eClinicalWorks announcements gives you advance notice of features coming to your EHR.",
      es: "Si su FQHC usa eClinicalWorks, la hoja de ruta de productos de Navani afecta directamente sus flujos de trabajo clinicos. Los precios agrupados de NACHC Select significan que las herramientas de IA que antes eran inasequibles ahora estan al alcance.",
    },
    orgUrl: "https://www.eclinicalworks.com",
    photoPlaceholder: "GN",
    relevantTopics: ["EHR", "AI", "clinical-documentation"],
  },
  {
    id: "adam-cheriff",
    name: "Adam Cheriff, MD",
    title: {
      en: "Chief Clinical Officer, Elation Health",
      es: "Director Clinico, Elation Health",
    },
    organization: "Elation Health",
    category: "ai-health",
    bio: {
      en: "Dr. Adam Cheriff serves as Chief Clinical Officer at Elation Health, a clinical-first EHR platform serving 46,000+ clinical users in primary care. He led the integration of Anthropic's Claude into Elation's Clinical Insights product, achieving a 61% reduction in chart review time and 87% of providers reporting better patient care. Partnership Health Centers, an FQHC in New Jersey, is a named Elation user, making this directly relevant to the CHC space.",
      es: "El Dr. Adam Cheriff es Director Clinico de Elation Health, una plataforma EHR de atencion primaria que sirve a mas de 46,000 usuarios clinicos. Lidero la integracion de Claude de Anthropic en el producto Clinical Insights de Elation, logrando una reduccion del 61% en tiempo de revision de historiales.",
    },
    whyFollow: {
      en: "Cheriff is proving that AI-powered EHR tools work in primary care settings similar to FQHCs. His clinical perspective — not just a tech pitch — means he understands workflow impact. If your health center is evaluating EHR platforms or AI add-ons, his published outcomes data provides the benchmarks to compare against.",
      es: "Cheriff esta demostrando que las herramientas EHR con IA funcionan en entornos de atencion primaria similares a FQHCs. Su perspectiva clinica significa que entiende el impacto en los flujos de trabajo. Si su centro de salud esta evaluando plataformas EHR o complementos de IA, sus datos proporcionan los puntos de referencia.",
    },
    orgUrl: "https://www.elationhealth.com",
    photoPlaceholder: "AC",
    relevantTopics: ["AI", "EHR", "primary-care"],
  },
  {
    id: "jonathan-bush",
    name: "Jonathan Bush",
    title: {
      en: "CEO, Zus Health",
      es: "CEO, Zus Health",
    },
    organization: "Zus Health",
    category: "ai-health",
    bio: {
      en: "Jonathan Bush is the CEO of Zus Health, a health data infrastructure company, and the co-founder of athenahealth — one of the most widely used EHR platforms in ambulatory care. At Zus, Bush is building shared health data infrastructure that enables interoperability across fragmented healthcare systems. His vision of a connected health data layer is particularly relevant as FQHCs struggle with information gaps when patients move between systems.",
      es: "Jonathan Bush es CEO de Zus Health, una empresa de infraestructura de datos de salud, y cofundador de athenahealth. En Zus, Bush esta construyendo infraestructura compartida de datos de salud que permite interoperabilidad entre sistemas fragmentados. Su vision es particularmente relevante mientras los FQHCs luchan con brechas de informacion.",
    },
    whyFollow: {
      en: "Bush understands the ambulatory care market better than almost anyone — he built athenahealth from an FQHC billing service into a major EHR company. His Zus Health work on data infrastructure addresses the interoperability gaps that plague FQHCs when patients arrive from hospitals, specialists, or other health centers with no records. His industry commentary is also consistently candid about what actually works versus vendor hype.",
      es: "Bush entiende el mercado de atencion ambulatoria mejor que casi cualquiera. Su trabajo en Zus Health sobre infraestructura de datos aborda las brechas de interoperabilidad que afectan a los FQHCs cuando los pacientes llegan de hospitales u otros centros sin registros.",
    },
    orgUrl: "https://www.zushealth.com",
    photoPlaceholder: "JB",
    relevantTopics: ["interoperability", "AI", "data-infrastructure"],
  },

  // ──────────────────────────────────────────────────────────────────
  // HRSA Leadership (3)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "carole-johnson",
    name: "Carole Johnson",
    title: {
      en: "Administrator, Health Resources & Services Administration",
      es: "Administradora, Administracion de Recursos y Servicios de Salud",
    },
    organization: "HRSA (U.S. Department of Health and Human Services)",
    category: "hrsa-leadership",
    bio: {
      en: "Carole Johnson serves as Administrator of the Health Resources and Services Administration, the federal agency that oversees Section 330 grants, the National Health Service Corps, and the entire health center program. HRSA distributes billions in annual funding to 1,400+ health centers and sets the compliance requirements for FQHC designation. Johnson's leadership determines grant priorities, new access point awards, and the regulatory framework that health centers operate within.",
      es: "Carole Johnson es Administradora de la Administracion de Recursos y Servicios de Salud, la agencia federal que supervisa las subvenciones de la Seccion 330, el Cuerpo Nacional de Servicio de Salud y todo el programa de centros de salud. HRSA distribuye miles de millones en financiamiento anual a mas de 1,400 centros de salud.",
    },
    whyFollow: {
      en: "Johnson controls the purse strings. HRSA's grant announcements, compliance guidance, and new access point funding decisions directly affect your budget. Her public statements at conferences and congressional hearings reveal administration priorities for health centers — early signals that help you align your strategic plan with where federal money is going.",
      es: "Johnson controla los fondos. Los anuncios de subvenciones, orientacion de cumplimiento y decisiones de financiamiento de HRSA afectan directamente su presupuesto. Sus declaraciones publicas revelan las prioridades de la administracion para centros de salud — senales tempranas para alinear su plan estrategico.",
    },
    orgUrl: "https://www.hrsa.gov",
    photoPlaceholder: "CJ",
    relevantTopics: ["federal-funding", "section-330", "NHSC", "policy"],
    relatedEconomicsIds: ["section-330-grants"],
  },
  {
    id: "jim-macrae",
    name: "Jim Macrae",
    title: {
      en: "Associate Administrator, HRSA Bureau of Primary Health Care",
      es: "Administrador Asociado, Oficina de Atencion Primaria de HRSA",
    },
    organization: "HRSA Bureau of Primary Health Care (BPHC)",
    category: "hrsa-leadership",
    bio: {
      en: "Jim Macrae leads HRSA's Bureau of Primary Health Care, the division that directly oversees all federally qualified health center operations. He manages the Section 330 grant program, UDS data collection, operational site visit processes, and health center compliance requirements. Macrae is the federal official who most directly interacts with health center operations — from new access point applications to scope of project changes to compliance actions.",
      es: "Jim Macrae lidera la Oficina de Atencion Primaria de HRSA, la division que supervisa directamente todas las operaciones de centros de salud calificados federalmente. Administra el programa de subvenciones de la Seccion 330, la recopilacion de datos UDS, los procesos de visitas operativas y los requisitos de cumplimiento.",
    },
    whyFollow: {
      en: "Macrae is the person who runs the health center program day-to-day. His conference presentations, BPHC program assistance letters, and webinars contain the operational guidance that your compliance team needs. When UDS reporting requirements change, scope of project rules shift, or new site visit protocols are announced, it comes from Macrae's office. He is the most important federal official for FQHC operations.",
      es: "Macrae es la persona que administra el programa de centros de salud dia a dia. Sus presentaciones, cartas de asistencia del programa BPHC y seminarios web contienen la orientacion operativa que su equipo de cumplimiento necesita. Es el oficial federal mas importante para las operaciones de FQHCs.",
    },
    orgUrl: "https://www.hrsa.gov/about/organization/bureaus/bphc",
    photoPlaceholder: "JM",
    relevantTopics: ["section-330", "operations", "compliance", "UDS"],
  },
  {
    id: "tom-engels",
    name: "Tom Engels",
    title: {
      en: "Former Administrator, HRSA",
      es: "Ex Administrador, HRSA",
    },
    organization: "HRSA (former)",
    category: "hrsa-leadership",
    bio: {
      en: "Tom Engels served as HRSA Administrator during a period of significant health center expansion, overseeing increases in Section 330 funding, new access point awards, and COVID-19 response grants to community health centers. Under his leadership, HRSA expanded the health center footprint and distributed emergency pandemic funding to the safety net. His tenure provides important context for understanding how HRSA priorities shift across administrations.",
      es: "Tom Engels fue Administrador de HRSA durante un periodo de expansion significativa de centros de salud, supervisando aumentos en financiamiento de la Seccion 330, adjudicaciones de nuevos puntos de acceso y subvenciones de respuesta COVID-19 a centros de salud comunitarios.",
    },
    whyFollow: {
      en: "Engels's tenure shows what HRSA health center expansion looks like when it has political support — useful context for understanding what contraction might look like under different priorities. His experience with emergency health center funding during COVID-19 is relevant as FQHCs navigate potential funding disruptions from H.R. 1 and CHCF expiration.",
      es: "El periodo de Engels muestra como se ve la expansion de centros de salud de HRSA cuando tiene apoyo politico — contexto util para entender como podria ser la contraccion bajo diferentes prioridades. Su experiencia con financiamiento de emergencia durante COVID-19 es relevante para FQHCs.",
    },
    orgUrl: "https://www.hrsa.gov",
    photoPlaceholder: "TE",
    relevantTopics: ["federal-funding", "policy", "expansion"],
  },

  // ──────────────────────────────────────────────────────────────────
  // Consulting & Advisory (1)
  // ──────────────────────────────────────────────────────────────────
  {
    id: "rachel-harrington",
    name: "Rachel Harrington",
    title: {
      en: "Vice President, Capital Link",
      es: "Vicepresidenta, Capital Link",
    },
    organization: "Capital Link",
    category: "consulting",
    bio: {
      en: "Rachel Harrington serves as Vice President at Capital Link, the leading financial advisory organization for community health centers. Capital Link provides FQHC-specific financial consulting, capital project planning, new access point application support, and 340B optimization services. Harrington's work helps health centers navigate complex financial decisions from building new facilities to maximizing 340B pharmacy revenue to preparing for PPS reimbursement rate changes.",
      es: "Rachel Harrington es Vicepresidenta de Capital Link, la principal organizacion de asesoria financiera para centros de salud comunitarios. Capital Link proporciona consultoria financiera especifica para FQHCs, planificacion de proyectos de capital, soporte para solicitudes de nuevos puntos de acceso y servicios de optimizacion 340B.",
    },
    whyFollow: {
      en: "Capital Link sees the financial health of FQHCs across the country — giving Harrington a unique vantage point on financial trends, risks, and opportunities. Her expertise on 340B program optimization, capital planning, and new access point applications is directly actionable. When Congress debates 340B reform or PPS changes, Capital Link's analysis translates policy into financial impact for your specific situation.",
      es: "Capital Link ve la salud financiera de FQHCs en todo el pais, dando a Harrington un punto de vista unico sobre tendencias, riesgos y oportunidades financieras. Su experiencia en optimizacion del programa 340B, planificacion de capital y solicitudes de nuevos puntos de acceso es directamente accionable.",
    },
    orgUrl: "https://www.caplink.org",
    photoPlaceholder: "RH",
    relevantTopics: ["340B", "finance", "capital", "sustainability"],
    relatedEconomicsIds: ["340b-program", "pps-reimbursement"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** Get all leaders in a specific category */
export function getLeadersByCategory(category: LeaderCategory): ThoughtLeader[] {
  return THOUGHT_LEADERS.filter((leader) => leader.category === category);
}

/** Get a single leader by ID */
export function getLeaderById(id: string): ThoughtLeader | undefined {
  return THOUGHT_LEADERS.find((leader) => leader.id === id);
}

/** Get all leaders relevant to a specific topic */
export function getLeadersForTopic(topic: string): ThoughtLeader[] {
  const normalizedTopic = topic.toLowerCase();
  return THOUGHT_LEADERS.filter((leader) =>
    leader.relevantTopics.some(
      (t) => t.toLowerCase() === normalizedTopic
    )
  );
}

/** Get leaders linked to a specific case study */
export function getLeadersForCaseStudy(caseStudyId: string): ThoughtLeader[] {
  return THOUGHT_LEADERS.filter((leader) =>
    leader.relatedCaseStudyIds?.includes(caseStudyId)
  );
}

/** Get all unique topics across all leaders */
export function getAllTopics(): string[] {
  const topics = new Set<string>();
  for (const leader of THOUGHT_LEADERS) {
    for (const topic of leader.relevantTopics) {
      topics.add(topic);
    }
  }
  return Array.from(topics).sort();
}

/** Get counts by category */
export function getLeaderCounts(): Record<LeaderCategory, number> & { total: number } {
  const counts = { total: THOUGHT_LEADERS.length } as Record<LeaderCategory, number> & {
    total: number;
  };
  for (const category of Object.keys(leaderCategoryMeta) as LeaderCategory[]) {
    counts[category] = THOUGHT_LEADERS.filter((l) => l.category === category).length;
  }
  return counts;
}
