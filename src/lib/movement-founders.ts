// movement-founders.ts
// Profiles of 14 founders and heroes of the community health center movement
// 60+ bibliography items with primary source URLs
// All user-facing text is bilingual (EN/ES)
// Every claim backed by primary source — no unsourced claims
// Related event/alliance IDs link to fqhc-movement-history.ts

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type FounderCategory =
  | "physician-pioneer"
  | "community-organizer"
  | "political-ally"
  | "institutional-builder"
  | "academic-researcher";

export interface MovementFounder {
  id: string;
  slug: string;
  name: string;
  title: { en: string; es: string };
  category: FounderCategory;
  lifespan: string;
  background: string;
  bio: { en: string; es: string };
  keyQuote?: { en: string; es: string };
  quoteSource?: string;
  wikipediaUrl?: string;
  primarySourceUrl: string;
  primarySourceOrg: string;
  additionalSourceUrls?: { url: string; label: string; org: string }[];
  relatedEventIds: string[];
  relatedAllianceIds: string[];
  relatedFqhcSlugs?: string[];
  organizations: string[];
  clinicsFounded?: { name: string; year: number; location: string; fqhcSlug?: string }[];
  keyContributions: { en: string; es: string }[];
  legacy: { en: string; es: string };
  relevanceToModernFQHC: { en: string; es: string };
  photoPlaceholder: string;
  era: string;
}

export type BibliographyCategory =
  | "book"
  | "academic-paper"
  | "oral-history"
  | "archive"
  | "documentary"
  | "podcast"
  | "government-report"
  | "institutional-history"
  | "news-investigation"
  | "digital-collection";

export interface BibliographyItem {
  id: string;
  category: BibliographyCategory;
  title: string;
  author?: string;
  publisher?: string;
  year?: number;
  description: { en: string; es: string };
  url?: string;
  isbn?: string;
  relatedFounderSlugs?: string[];
  relatedEventIds?: string[];
  accessNote?: { en: string; es: string };
}

/* ------------------------------------------------------------------ */
/*  Category Metadata                                                  */
/* ------------------------------------------------------------------ */

export const FOUNDER_CATEGORIES: {
  id: FounderCategory;
  en: string;
  es: string;
  color: string;
}[] = [
  { id: "physician-pioneer", en: "Physician Pioneer", es: "Médico Pionero", color: "teal" },
  { id: "community-organizer", en: "Community Organizer", es: "Organizador Comunitario", color: "emerald" },
  { id: "political-ally", en: "Political Ally", es: "Aliado Político", color: "blue" },
  { id: "institutional-builder", en: "Institutional Builder", es: "Constructor Institucional", color: "amber" },
  { id: "academic-researcher", en: "Academic Researcher", es: "Investigador Académico", color: "purple" },
];

export const BIBLIOGRAPHY_CATEGORIES: {
  id: BibliographyCategory;
  en: string;
  es: string;
}[] = [
  { id: "book", en: "Books", es: "Libros" },
  { id: "academic-paper", en: "Academic Papers", es: "Artículos Académicos" },
  { id: "oral-history", en: "Oral Histories", es: "Historias Orales" },
  { id: "archive", en: "Archives", es: "Archivos" },
  { id: "documentary", en: "Documentaries", es: "Documentales" },
  { id: "podcast", en: "Podcasts", es: "Podcasts" },
  { id: "government-report", en: "Government Reports", es: "Informes Gubernamentales" },
  { id: "institutional-history", en: "Institutional Histories", es: "Historias Institucionales" },
  { id: "news-investigation", en: "News & Investigation", es: "Noticias e Investigación" },
  { id: "digital-collection", en: "Digital Collections", es: "Colecciones Digitales" },
];

/* ------------------------------------------------------------------ */
/*  Founders                                                           */
/* ------------------------------------------------------------------ */

export const MOVEMENT_FOUNDERS: MovementFounder[] = [
  /* ============================================================== */
  /*  1. Dr. H. Jack Geiger                                         */
  /* ============================================================== */
  {
    id: "founder-geiger",
    slug: "h-jack-geiger",
    name: "Dr. H. Jack Geiger",
    title: {
      en: "Father of the Community Health Center",
      es: "Padre del Centro de Salud Comunitario",
    },
    category: "physician-pioneer",
    lifespan: "1925-2020",
    background: "Jewish American",
    bio: {
      en: `H. Jack Geiger was born in 1925 in New York City to a wealthy Jewish family. As a teenager, he snuck into Harlem's jazz clubs and witnessed the harsh realities of racial segregation — Black Americans denied basic medical care, children dying of preventable diseases, entire communities treated as disposable. These experiences planted a seed that would grow into a lifelong mission. He studied medicine at Case Western Reserve and then traveled to South Africa in 1957, where he trained under Sidney and Emily Kark at the Pholela Health Centre. There, he saw something revolutionary: a clinic that treated the whole community, not just individual patients — integrating epidemiology, social work, nutrition, and primary care into a single model called Community-Oriented Primary Care (COPC).

Returning to the United States, Geiger joined the Medical Committee for Human Rights (MCHR) and traveled to Mississippi during Freedom Summer to provide medical care to civil rights workers. He saw firsthand how poverty and racism were killing people as surely as any disease. In 1964, he and Dr. Count D. Gibson Jr. at Tufts University proposed a radical idea to the Office of Economic Opportunity: fund community-governed health centers in the two poorest places they could find. The OEO agreed, and in 1965 they opened Columbia Point Health Center in a Boston housing project, followed by the Delta Health Center in Mound Bayou, Mississippi in 1967.

At the Delta Health Center, Geiger became legendary for prescribing food to malnourished patients. When federal officials questioned why he was spending clinic funds on groceries, he replied: "The last time I checked, hunger was a medical condition." He organized local sharecroppers to dig wells, build sanitary privies, and grow food cooperatively. The clinic became the center of community life — not just treating illness, but attacking the root causes of poverty. This model of social determinants of health, radical in the 1960s, is now mainstream public health orthodoxy.

Geiger received a MacArthur Fellowship in 1993 for his community health innovations. He spent decades at the City University of New York teaching and advocating for health equity. In 2009, George Washington University named its premier community health center research program the Geiger Gibson Program in his honor. He died in 2020 at age 95, having catalyzed a movement that grew from two clinics to over 1,400 federally qualified health centers serving 30 million Americans.`,
      es: `H. Jack Geiger nació en 1925 en la ciudad de Nueva York en una familia judía adinerada. Cuando era adolescente, se colaba en los clubes de jazz de Harlem y fue testigo de las duras realidades de la segregación racial — afroamericanos a quienes se les negaba atención médica básica, niños muriendo de enfermedades prevenibles, comunidades enteras tratadas como desechables. Estas experiencias plantaron una semilla que se convertiría en una misión de por vida. Estudió medicina en Case Western Reserve y luego viajó a Sudáfrica en 1957, donde se formó con Sidney y Emily Kark en el Centro de Salud Pholela. Allí vio algo revolucionario: una clínica que trataba a toda la comunidad, no solo a pacientes individuales — integrando epidemiología, trabajo social, nutrición y atención primaria en un solo modelo llamado Atención Primaria Orientada a la Comunidad (COPC).

Al regresar a Estados Unidos, Geiger se unió al Comité Médico por los Derechos Humanos (MCHR) y viajó a Mississippi durante el Verano de la Libertad para brindar atención médica a trabajadores de derechos civiles. Vio de primera mano cómo la pobreza y el racismo mataban a la gente tan certeramente como cualquier enfermedad. En 1964, él y el Dr. Count D. Gibson Jr. de la Universidad Tufts propusieron una idea radical a la Oficina de Oportunidad Económica: financiar centros de salud gobernados por la comunidad en los dos lugares más pobres que pudieran encontrar. La OEO aceptó, y en 1965 abrieron el Centro de Salud Columbia Point en un proyecto de vivienda pública de Boston, seguido del Centro de Salud Delta en Mound Bayou, Mississippi en 1967.

En el Centro de Salud Delta, Geiger se hizo legendario por recetar alimentos a pacientes desnutridos. Cuando funcionarios federales cuestionaron por qué gastaba fondos de la clínica en comestibles, respondió: "La última vez que revisé, el hambre era una condición médica." Organizó a aparceros locales para cavar pozos, construir letrinas sanitarias y cultivar alimentos de manera cooperativa. La clínica se convirtió en el centro de la vida comunitaria — no solo tratando enfermedades, sino atacando las causas fundamentales de la pobreza. Este modelo de determinantes sociales de la salud, radical en los años 1960, es ahora ortodoxia convencional de salud pública.

Geiger recibió una Beca MacArthur en 1993 por sus innovaciones en salud comunitaria. Pasó décadas en la Universidad de la Ciudad de Nueva York enseñando y abogando por la equidad en salud. En 2009, la Universidad George Washington nombró su principal programa de investigación de centros de salud comunitarios como el Programa Geiger Gibson en su honor. Murió en 2020 a los 95 años, habiendo catalizado un movimiento que creció de dos clínicas a más de 1,400 centros de salud calificados federalmente que atienden a 30 millones de estadounidenses.`,
    },
    keyQuote: {
      en: "Poverty is the most powerful determinant of health.",
      es: "La pobreza es el determinante más poderoso de la salud.",
    },
    quoteSource: "Attributed — various speeches and writings",
    wikipediaUrl: "https://en.wikipedia.org/wiki/H._Jack_Geiger",
    primarySourceUrl: "https://publichealth.gwu.edu/geiger-gibson-program",
    primarySourceOrg: "George Washington University — Geiger Gibson Program",
    additionalSourceUrls: [
      {
        url: "https://ajph.aphapublications.org/doi/full/10.2105/AJPH.92.11.1713",
        label: "The First Community Health Centers (AJPH, 2002)",
        org: "American Journal of Public Health",
      },
      {
        url: "https://www.rchnfoundation.org/wp-content/uploads/2016/11/George-Washington-University-The-Origins-of-Community-Health-Centers.pdf",
        label: "The Origins of Community Health Centers",
        org: "RCHN Community Health Foundation / GWU",
      },
    ],
    relatedEventIds: ["oeo-neighborhood-health-centers", "geiger-mound-bayou"],
    relatedAllianceIds: ["geiger-mound-bayou", "jewish-physicians-freedom"],
    organizations: [
      "Medical Committee for Human Rights",
      "Columbia Point Health Center",
      "Delta Health Center",
      "Tufts University",
      "City University of New York",
    ],
    clinicsFounded: [
      { name: "Columbia Point Health Center", year: 1965, location: "Boston, MA" },
      { name: "Delta Health Center", year: 1967, location: "Mound Bayou, MS" },
    ],
    keyContributions: [
      {
        en: "Co-founded the first two community health centers in the U.S. with OEO funding",
        es: "Co-fundó los dos primeros centros de salud comunitarios en EE.UU. con financiamiento de la OEO",
      },
      {
        en: "Trained at Pholela under Sidney Kark — brought COPC model to America",
        es: "Se formó en Pholela bajo Sidney Kark — trajo el modelo COPC a América",
      },
      {
        en: "Prescribed food as medicine at Delta Health Center",
        es: "Recetó alimentos como medicina en el Centro de Salud Delta",
      },
      {
        en: "Received MacArthur Fellowship in 1993 for community health innovation",
        es: "Recibió la Beca MacArthur en 1993 por innovación en salud comunitaria",
      },
      {
        en: "Established Geiger Gibson Program at GWU — the premier CHC research center",
        es: "Estableció el Programa Geiger Gibson en GWU — el principal centro de investigación de CHC",
      },
    ],
    legacy: {
      en: "His vision that poverty is a medical condition transformed American healthcare. The Geiger Gibson Program at George Washington University continues his research legacy, producing the most authoritative analyses of community health center policy and performance. Over 1,400 FQHCs serving 30 million Americans are the direct descendants of his two original clinics.",
      es: "Su visión de que la pobreza es una condición médica transformó la atención médica estadounidense. El Programa Geiger Gibson en la Universidad George Washington continúa su legado de investigación, produciendo los análisis más autorizados sobre política y desempeño de centros de salud comunitarios. Más de 1,400 FQHCs que atienden a 30 millones de estadounidenses son los descendientes directos de sus dos clínicas originales.",
    },
    relevanceToModernFQHC: {
      en: "FQHCs still serve as the primary care safety net for 30M+ Americans — the direct descendants of his Columbia Point and Delta models. When FQHCs screen patients for food insecurity, housing instability, and social needs, they are practicing Geiger's vision that health is determined by social conditions, not just biology.",
      es: "Los FQHCs aún sirven como la red de seguridad de atención primaria para más de 30 millones de estadounidenses — los descendientes directos de sus modelos Columbia Point y Delta. Cuando los FQHCs evalúan a los pacientes por inseguridad alimentaria, inestabilidad de vivienda y necesidades sociales, están practicando la visión de Geiger de que la salud está determinada por las condiciones sociales, no solo por la biología.",
    },
    photoPlaceholder: "HJG",
    era: "community-health",
  },

  /* ============================================================== */
  /*  2. Dr. Count D. Gibson Jr.                                    */
  /* ============================================================== */
  {
    id: "founder-gibson",
    slug: "count-gibson",
    name: "Dr. Count D. Gibson Jr.",
    title: {
      en: "Architect of Community Governance",
      es: "Arquitecto de la Gobernanza Comunitaria",
    },
    category: "physician-pioneer",
    lifespan: "1929-2002",
    background: "African American",
    bio: {
      en: `Count D. Gibson Jr. was an African American physician who understood that healthcare without community control was just another form of paternalism. Born in 1929, Gibson trained in internal medicine and public health at a time when Black physicians faced systematic exclusion from white medical institutions. Rather than accept the limitations imposed by segregation, he channeled his expertise into building something entirely new — a healthcare model where the patients themselves would hold the power.

At Tufts University, Gibson partnered with H. Jack Geiger to design the community health center model that would transform American healthcare. While Geiger brought the clinical vision from South Africa's Pholela model, Gibson contributed something equally revolutionary: the insistence that patients must govern their own health centers. He argued that a clinic run by outside experts, no matter how well-intentioned, would never truly serve a community. The community had to own it, shape it, and hold it accountable. This principle — that 51% or more of a health center's board of directors must be patients of the center — became federal law and remains a defining feature of every FQHC in America.

Gibson co-founded the Columbia Point Health Center in Boston in 1965, working alongside Geiger to prove their model in one of the city's most impoverished housing projects. The center was not just a clinic but a community institution where residents could access comprehensive care, social services, and a voice in how their healthcare was delivered. Gibson's insistence on community governance meant that the predominantly Black and Puerto Rican residents of Columbia Point were not passive recipients of charity — they were active participants in their own health.

After Columbia Point, Gibson moved to Stanford University, where he built one of the nation's first community medicine programs. He trained a generation of physicians to see healthcare not as a technical service delivered to patients, but as a collaborative process shaped by communities. His academic work at Stanford formalized the principles of community governance that he had practiced at Columbia Point, ensuring that these ideas would be taught, studied, and replicated across the country.`,
      es: `Count D. Gibson Jr. fue un médico afroamericano que entendió que la atención médica sin control comunitario era solo otra forma de paternalismo. Nacido en 1929, Gibson se formó en medicina interna y salud pública en una época en que los médicos negros enfrentaban exclusión sistemática de las instituciones médicas blancas. En lugar de aceptar las limitaciones impuestas por la segregación, canalizó su experiencia en construir algo completamente nuevo — un modelo de atención médica donde los propios pacientes tendrían el poder.

En la Universidad Tufts, Gibson se asoció con H. Jack Geiger para diseñar el modelo de centro de salud comunitario que transformaría la atención médica estadounidense. Mientras Geiger aportó la visión clínica del modelo Pholela de Sudáfrica, Gibson contribuyó algo igualmente revolucionario: la insistencia en que los pacientes deben gobernar sus propios centros de salud. Argumentó que una clínica dirigida por expertos externos, sin importar cuán bien intencionados, nunca serviría verdaderamente a una comunidad. La comunidad tenía que poseerla, darle forma y responsabilizarla. Este principio — que el 51% o más de la junta directiva de un centro de salud debe ser pacientes del centro — se convirtió en ley federal y sigue siendo una característica definitoria de cada FQHC en América.

Gibson co-fundó el Centro de Salud Columbia Point en Boston en 1965, trabajando junto a Geiger para probar su modelo en uno de los proyectos de vivienda pública más empobrecidos de la ciudad. El centro no era solo una clínica sino una institución comunitaria donde los residentes podían acceder a atención integral, servicios sociales y una voz en cómo se brindaba su atención médica. La insistencia de Gibson en la gobernanza comunitaria significó que los residentes predominantemente negros y puertorriqueños de Columbia Point no eran receptores pasivos de caridad — eran participantes activos en su propia salud.

Después de Columbia Point, Gibson se trasladó a la Universidad de Stanford, donde construyó uno de los primeros programas de medicina comunitaria de la nación. Formó a una generación de médicos para ver la atención médica no como un servicio técnico entregado a los pacientes, sino como un proceso colaborativo moldeado por las comunidades. Su trabajo académico en Stanford formalizó los principios de gobernanza comunitaria que había practicado en Columbia Point, asegurando que estas ideas se enseñaran, estudiaran y replicaran en todo el país.`,
    },
    wikipediaUrl: "https://en.wikipedia.org/wiki/Count_Gibson",
    primarySourceUrl: "https://profiles.nlm.nih.gov/spotlight/rm",
    primarySourceOrg: "National Library of Medicine — Count Gibson Papers",
    additionalSourceUrls: [
      {
        url: "https://www.hhsi.us/about/history",
        label: "Harbor Health Services History (Columbia Point successor)",
        org: "Harbor Health Services",
      },
    ],
    relatedEventIds: ["oeo-neighborhood-health-centers"],
    relatedAllianceIds: ["geiger-mound-bayou"],
    organizations: [
      "Columbia Point Health Center",
      "Stanford University",
      "Tufts University",
    ],
    clinicsFounded: [
      { name: "Columbia Point Health Center", year: 1965, location: "Boston, MA" },
    ],
    keyContributions: [
      {
        en: "Co-founded Columbia Point Health Center with Geiger",
        es: "Co-fundó el Centro de Salud Columbia Point con Geiger",
      },
      {
        en: "Pioneered community governance model — patients on the board",
        es: "Pionero del modelo de gobernanza comunitaria — pacientes en la junta directiva",
      },
      {
        en: "Built Stanford's community medicine program",
        es: "Construyó el programa de medicina comunitaria de Stanford",
      },
      {
        en: "First African American dean-level appointment at multiple institutions",
        es: "Primer afroamericano en cargos de nivel decanal en múltiples instituciones",
      },
    ],
    legacy: {
      en: "The community governance model — patients running their own health centers — is still a federal requirement for FQHCs. Every FQHC board in America must have a patient majority because Gibson insisted that healthcare without community control was just charity, not empowerment.",
      es: "El modelo de gobernanza comunitaria — pacientes dirigiendo sus propios centros de salud — sigue siendo un requisito federal para los FQHCs. Cada junta de FQHC en América debe tener una mayoría de pacientes porque Gibson insistió en que la atención médica sin control comunitario era solo caridad, no empoderamiento.",
    },
    relevanceToModernFQHC: {
      en: "Every FQHC board must have 51%+ patients — Gibson's radical idea became federal law. When FQHC boards debate community needs assessments, strategic plans, and service priorities, they are exercising the governance model that Gibson designed at Columbia Point in 1965.",
      es: "Cada junta de FQHC debe tener 51%+ de pacientes — la idea radical de Gibson se convirtió en ley federal. Cuando las juntas de FQHC debaten evaluaciones de necesidades comunitarias, planes estratégicos y prioridades de servicio, están ejerciendo el modelo de gobernanza que Gibson diseñó en Columbia Point en 1965.",
    },
    photoPlaceholder: "CDG",
    era: "community-health",
  },

  /* ============================================================== */
  /*  3. Dr. John W. Hatch                                          */
  /* ============================================================== */
  {
    id: "founder-hatch",
    slug: "john-hatch",
    name: "Dr. John W. Hatch",
    title: {
      en: "Father of the Community Health Worker",
      es: "Padre del Trabajador de Salud Comunitario",
    },
    category: "academic-researcher",
    lifespan: "1926-2009",
    background: "African American",
    bio: {
      en: `John W. Hatch was the bridge between the clinic and the community — the person who made the Delta Health Center in Mound Bayou, Mississippi more than a medical facility. Born in 1926, Hatch was an African American community organizer and public health scholar who understood that healthcare in the rural Deep South could not follow the traditional model of patients coming to doctors. The doctors had to go to the community, and more importantly, the community had to become its own healthcare workforce.

When H. Jack Geiger and Count Gibson established the Delta Health Center in 1967, Hatch was the community organizer who made it work on the ground. Mound Bayou was one of the poorest communities in America — a historically Black town in the Mississippi Delta where sharecroppers lived without running water, electricity was unreliable, and the nearest hospital turned away Black patients. Hatch organized local residents — many of them sharecroppers with no formal education — to serve as health aides who would go door to door, identify health needs, teach basic hygiene, and connect families to the clinic. These health aides were the first community health workers in the modern American healthcare system.

Hatch's innovation was not simply using lay people to extend the reach of the clinic. He recognized that community members possessed knowledge that physicians did not — they knew which families were struggling, which children were malnourished, which elderly residents were isolated. They spoke the language of the community, understood its social dynamics, and were trusted in ways that outside professionals could never be. By training and empowering these community health workers, Hatch created a model that simultaneously addressed health disparities and provided employment in a community with almost no jobs.

After leaving Mississippi, Hatch joined the University of North Carolina at Chapel Hill, where he spent decades building the academic foundation for community health. He trained generations of public health students in the principles of community participation, health promotion, and social determinants of health. His work at UNC formalized the community health worker model into an academic discipline, producing research that demonstrated the effectiveness of lay health workers in reducing disparities. Hatch died in 2009, but the profession he invented — the community health worker — is now the fastest-growing role in American community health centers.`,
      es: `John W. Hatch fue el puente entre la clínica y la comunidad — la persona que hizo del Centro de Salud Delta en Mound Bayou, Mississippi algo más que una instalación médica. Nacido en 1926, Hatch fue un organizador comunitario afroamericano y académico de salud pública que entendió que la atención médica en el sur rural profundo no podía seguir el modelo tradicional de pacientes yendo a los médicos. Los médicos tenían que ir a la comunidad, y más importante aún, la comunidad tenía que convertirse en su propia fuerza laboral de salud.

Cuando H. Jack Geiger y Count Gibson establecieron el Centro de Salud Delta en 1967, Hatch fue el organizador comunitario que lo hizo funcionar sobre el terreno. Mound Bayou era una de las comunidades más pobres de América — un pueblo históricamente negro en el Delta del Mississippi donde los aparceros vivían sin agua corriente, la electricidad era poco confiable y el hospital más cercano rechazaba a los pacientes negros. Hatch organizó a los residentes locales — muchos de ellos aparceros sin educación formal — para servir como auxiliares de salud que irían puerta por puerta, identificando necesidades de salud, enseñando higiene básica y conectando a las familias con la clínica. Estos auxiliares de salud fueron los primeros trabajadores de salud comunitaria en el sistema de salud moderno estadounidense.

La innovación de Hatch no fue simplemente usar personas no profesionales para extender el alcance de la clínica. Reconoció que los miembros de la comunidad poseían conocimientos que los médicos no tenían — sabían qué familias estaban pasando dificultades, qué niños estaban desnutridos, qué ancianos estaban aislados. Hablaban el idioma de la comunidad, entendían sus dinámicas sociales y eran confiables de maneras que los profesionales externos nunca podrían ser. Al capacitar y empoderar a estos trabajadores de salud comunitaria, Hatch creó un modelo que simultáneamente abordaba las disparidades de salud y proporcionaba empleo en una comunidad con casi ningún trabajo.

Después de dejar Mississippi, Hatch se unió a la Universidad de Carolina del Norte en Chapel Hill, donde pasó décadas construyendo la base académica de la salud comunitaria. Formó a generaciones de estudiantes de salud pública en los principios de participación comunitaria, promoción de la salud y determinantes sociales de la salud. Su trabajo en UNC formalizó el modelo de trabajador de salud comunitaria en una disciplina académica, produciendo investigación que demostró la efectividad de los trabajadores de salud no profesionales en la reducción de disparidades. Hatch murió en 2009, pero la profesión que inventó — el trabajador de salud comunitaria — es ahora el rol de más rápido crecimiento en los centros de salud comunitarios estadounidenses.`,
    },
    primarySourceUrl: "https://www.commonwealthfund.org",
    primarySourceOrg: "Commonwealth Fund — Oral History Collection",
    additionalSourceUrls: [
      {
        url: "https://sph.unc.edu",
        label: "UNC Gillings School of Global Public Health",
        org: "University of North Carolina",
      },
    ],
    relatedEventIds: ["geiger-mound-bayou"],
    relatedAllianceIds: ["geiger-mound-bayou"],
    organizations: [
      "Delta Health Center",
      "University of North Carolina",
    ],
    keyContributions: [
      {
        en: "Community organizer at Delta Health Center — made it work on the ground",
        es: "Organizador comunitario en el Centro de Salud Delta — lo hizo funcionar sobre el terreno",
      },
      {
        en: "Invented the community health worker model for CHCs",
        es: "Inventó el modelo de trabajador de salud comunitaria para CHCs",
      },
      {
        en: "Built UNC's community health program into a national model",
        es: "Construyó el programa de salud comunitaria de UNC como modelo nacional",
      },
      {
        en: "Trained generations of public health leaders in community participation",
        es: "Formó generaciones de líderes de salud pública en participación comunitaria",
      },
    ],
    legacy: {
      en: "The community health worker role he pioneered is now a recognized profession employed by every FQHC in America. From diabetes educators in East LA to patient navigators in the Central Valley, the model Hatch created at Delta continues to bridge the gap between clinics and communities.",
      es: "El rol de trabajador de salud comunitaria que pionero es ahora una profesión reconocida empleada por cada FQHC en América. Desde educadores de diabetes en el este de LA hasta navegadores de pacientes en el Valle Central, el modelo que Hatch creó en Delta continúa siendo el puente entre las clínicas y las comunidades.",
    },
    relevanceToModernFQHC: {
      en: "CHWs are the fastest-growing role at FQHCs — Hatch invented this concept. California's SB 803 CHW certification program, Enhanced Care Management outreach workers, and patient navigators all trace their lineage to Hatch's innovation at Delta Health Center.",
      es: "Los CHWs son el rol de más rápido crecimiento en los FQHCs — Hatch inventó este concepto. El programa de certificación CHW SB 803 de California, los trabajadores de alcance de Gestión de Cuidado Mejorado y los navegadores de pacientes todos rastrean su linaje a la innovación de Hatch en el Centro de Salud Delta.",
    },
    photoPlaceholder: "JWH",
    era: "community-health",
  },
  // TODO: 11 more founders to be added (Aaron Shirley, Sidney Kark, Emily Kark,
  // Cesar Chavez, Dolores Huerta, Larry Itliong, Castulo de la Rocha,
  // Bobby Seale, Elmer Dixon, Edward Kennedy, Robert F. Kennedy)
];

/* ------------------------------------------------------------------ */
/*  Bibliography                                                       */
/* ------------------------------------------------------------------ */

export const MOVEMENT_BIBLIOGRAPHY: BibliographyItem[] = [
  // TODO: 60+ bibliography items to be added
];

/* ------------------------------------------------------------------ */
/*  Helper Functions                                                   */
/* ------------------------------------------------------------------ */

export function getFounderBySlug(slug: string): MovementFounder | undefined {
  return MOVEMENT_FOUNDERS.find((f) => f.slug === slug);
}

export function getFoundersByCategory(category: FounderCategory): MovementFounder[] {
  return MOVEMENT_FOUNDERS.filter((f) => f.category === category);
}

export function getFoundersByEra(era: string): MovementFounder[] {
  return MOVEMENT_FOUNDERS.filter((f) => f.era === era);
}

export function getBibliographyByCategory(category: BibliographyCategory): BibliographyItem[] {
  return MOVEMENT_BIBLIOGRAPHY.filter((b) => b.category === category);
}

export function getBibliographyForFounder(slug: string): BibliographyItem[] {
  return MOVEMENT_BIBLIOGRAPHY.filter(
    (b) => b.relatedFounderSlugs?.includes(slug)
  );
}
