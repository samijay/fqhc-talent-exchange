// fqhc-movement-history.ts
// History of the FQHC/community health center movement in California and the U.S.
// Farmworker origins, civil rights connections, cross-cultural alliances, legislative milestones
// Every claim backed by primary source URL — no unsourced claims
// All user-facing text is bilingual (EN/ES)
// Types re-exported from MovementTimeline component for consistency

import type {
  MovementCategory,
  TimelinePerson,
  TimelineEvent,
  TimelineEra,
} from "@/components/viz/MovementTimeline";

export type { MovementCategory, TimelinePerson, TimelineEvent, TimelineEra };

/** Exported for display on pages — updated when new events are added */
export const MOVEMENT_LAST_UPDATED = "2026-03-06";

/* ------------------------------------------------------------------ */
/*  Cross-Cultural Alliance type (not in MovementTimeline)             */
/* ------------------------------------------------------------------ */

export interface CrossCulturalAlliance {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  communities: string[];
  period: string;
  keyFigures: {
    name: string;
    background: string;
    contribution: { en: string; es: string };
  }[];
  relevanceToFQHC: { en: string; es: string };
  primarySourceUrl: string;
  primarySourceOrg: string;
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

export const MOVEMENT_CATEGORIES: {
  id: MovementCategory;
  en: string;
  es: string;
  color: string;
  icon: string;
}[] = [
  { id: "farmworker", en: "Farmworker Movement", es: "Movimiento Campesino", color: "emerald", icon: "Wheat" },
  { id: "civil-rights", en: "Civil Rights & Health", es: "Derechos Civiles y Salud", color: "purple", icon: "Scale" },
  { id: "legislation", en: "Legislation", es: "Legislacion", color: "blue", icon: "Landmark" },
  { id: "founding", en: "Clinic Founding", es: "Fundacion de Clinicas", color: "teal", icon: "Building2" },
  { id: "expansion", en: "Expansion", es: "Expansion", color: "amber", icon: "TrendingUp" },
  { id: "alliance", en: "Cross-Cultural Alliance", es: "Alianza Intercultural", color: "rose", icon: "Handshake" },
  { id: "crisis", en: "Crisis & Threat", es: "Crisis y Amenaza", color: "red", icon: "AlertTriangle" },
  { id: "undocumented", en: "Undocumented Access", es: "Acceso para Indocumentados", color: "indigo", icon: "Shield" },
];

/* ------------------------------------------------------------------ */
/*  Era metadata                                                       */
/* ------------------------------------------------------------------ */

export const MOVEMENT_ERAS: TimelineEra[] = [
  {
    id: "farmworker-roots",
    en: "Farmworker Health Clinics",
    es: "Clinicas de Salud para Campesinos",
    yearRange: "1960-1972",
    description: {
      en: "Farmworkers in California's Central Valley faced pesticide exposure, no running water, and zero healthcare. Their fight for dignity — led by Filipino, Mexican, and Chicano organizers — created the first community clinics and proved that health is a labor right.",
      es: "Los campesinos del Valle Central de California enfrentaban exposicion a pesticidas, falta de agua potable y cero atencion medica. Su lucha por la dignidad — liderada por organizadores filipinos, mexicanos y chicanos — creo las primeras clinicas comunitarias y demostro que la salud es un derecho laboral.",
    },
  },
  {
    id: "community-health",
    en: "The Community Health Center Movement",
    es: "Movimiento de Centros de Salud Comunitarios",
    yearRange: "1973-1988",
    description: {
      en: "Black Panthers opened free clinics. Chicano activists demanded community control. Asian immigrants built mutual aid networks. A white Jewish physician in Mississippi proved that poverty was a medical condition. These movements converged to create the community health center model we know today.",
      es: "Los Panteras Negras abrieron clinicas gratuitas. Activistas chicanos exigieron control comunitario. Inmigrantes asiaticos construyeron redes de ayuda mutua. Un medico judio blanco en Mississippi demostro que la pobreza era una condicion medica. Estos movimientos convergieron para crear el modelo de centro de salud comunitario que conocemos hoy.",
    },
  },
  {
    id: "fqhc-era",
    en: "The FQHC Designation & Expansion",
    es: "Designacion y Expansion de FQHCs",
    yearRange: "1989-2009",
    description: {
      en: "Grassroots clinics became federally recognized FQHCs. The 340B drug program transformed finances. Anti-immigrant legislation made FQHCs the last resort for millions. Then a Republican president doubled their funding — proving FQHCs transcend politics.",
      es: "Las clinicas de base se convirtieron en FQHCs reconocidos federalmente. El programa de medicamentos 340B transformo las finanzas. La legislacion antiinmigrante convirtio a los FQHCs en el ultimo recurso para millones. Luego un presidente republicano duplico su financiamiento — demostrando que los FQHCs trascienden la politica.",
    },
  },
  {
    id: "aca-expansion",
    en: "ACA & Unprecedented Growth",
    es: "ACA y Crecimiento Sin Precedentes",
    yearRange: "2010-2019",
    description: {
      en: "The ACA invested $11 billion. Medi-Cal expanded to millions of new patients. California led the nation in extending coverage to undocumented residents. FQHCs transformed from scrappy safety-net clinics into the backbone of primary care for one in three Californians.",
      es: "La ACA invirtio $11 mil millones. Medi-Cal se expandio a millones de nuevos pacientes. California lidero la nacion en extender cobertura a residentes indocumentados. Los FQHCs se transformaron de modestas clinicas de red de seguridad a la columna vertebral de la atencion primaria para uno de cada tres californianos.",
    },
  },
  {
    id: "crisis-resilience",
    en: "Crisis, Resilience & New Threats",
    es: "Crisis, Resiliencia y Nuevas Amenazas",
    yearRange: "2020-2026",
    description: {
      en: "COVID proved FQHCs are essential infrastructure. California became the first state with Medi-Cal for all undocumented adults. Then H.R. 1 proposed the largest Medicaid cuts in history. Sixty years of progress — from farmworker clinics to a $30B safety net — now faces an existential threat.",
      es: "COVID demostro que los FQHCs son infraestructura esencial. California se convirtio en el primer estado con Medi-Cal para todos los adultos indocumentados. Luego H.R. 1 propuso los mayores recortes a Medicaid en la historia. Sesenta anos de progreso — desde clinicas campesinas hasta una red de seguridad de $30 mil millones — ahora enfrenta una amenaza existencial.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Movement Events                                                    */
/* ------------------------------------------------------------------ */

export const MOVEMENT_EVENTS: TimelineEvent[] = [
  /* ============================================================== */
  /*  ERA 1: FARMWORKER ROOTS (1960-1972)                           */
  /* ============================================================== */
  {
    id: "nfwa-founded",
    year: 1962,
    title: {
      en: "Cesar Chavez Founds the NFWA — Health as a Labor Issue",
      es: "Cesar Chavez Funda la NFWA — La Salud como Tema Laboral",
    },
    description: {
      en: "Cesar Chavez and Dolores Huerta founded the National Farm Workers Association (NFWA) in Delano, California. Healthcare was central to their demands from day one — farmworkers faced pesticide poisoning, heat stroke, and no access to doctors. Entire families worked the fields without health insurance, drinking from irrigation ditches, and breathing in chemicals. Chavez understood that you couldn't organize workers who were too sick to show up. The NFWA's first mutual aid programs included a credit union and a cooperative buying program — but healthcare was always the ultimate demand.",
      es: "Cesar Chavez y Dolores Huerta fundaron la Asociacion Nacional de Trabajadores Agricolas (NFWA) en Delano, California. La atencion medica fue central en sus demandas desde el primer dia — los campesinos enfrentaban envenenamiento por pesticidas, golpes de calor y ningun acceso a medicos. Familias enteras trabajaban los campos sin seguro medico, bebiendo de acequias de riego y respirando quimicos. Chavez entendia que no se podia organizar a trabajadores demasiado enfermos para presentarse. Los primeros programas de ayuda mutua de la NFWA incluian una cooperativa de credito y un programa de compras cooperativas — pero la atencion medica siempre fue la demanda fundamental.",
    },
    impact: {
      en: "Created the organizational foundation for farmworker health advocacy. The NFWA would merge with AWOC to form the United Farm Workers, making healthcare a core labor demand that led to the first farmworker health clinics in California.",
      es: "Creo la base organizativa para la defensa de la salud de los campesinos. La NFWA se fusionaria con AWOC para formar United Farm Workers, haciendo de la salud una demanda laboral central que llevo a las primeras clinicas de salud campesinas en California.",
    },
    category: "farmworker",
    people: [
      {
        name: "Cesar Chavez",
        role: { en: "Co-Founder, NFWA", es: "Co-Fundador, NFWA" },
        background: "Latino/Chicano",
      },
      {
        name: "Dolores Huerta",
        role: { en: "Co-Founder, NFWA", es: "Co-Fundadora, NFWA" },
        background: "Latino/Chicano",
      },
    ],
    organizations: ["National Farm Workers Association"],
    location: "Delano, California",
    primarySourceUrl: "https://www.nps.gov/cech/learn/historyculture/the-beginning.htm",
    primarySourceOrg: "National Park Service — Cesar E. Chavez National Monument",
    era: "farmworker-roots",
    videoUrl: "https://www.youtube.com/embed/Vb93EX94q1w",
    videoTitle: {
      en: "Cesar Chavez — The Fight for Farmworker Rights",
      es: "Cesar Chavez — La Lucha por los Derechos de los Campesinos",
    },
  },
  {
    id: "delano-grape-strike",
    year: 1965,
    endYear: 1970,
    title: {
      en: "Delano Grape Strike — Filipino & Mexican Farmworkers Unite",
      es: "Huelga de Uvas de Delano — Campesinos Filipinos y Mexicanos Se Unen",
    },
    description: {
      en: "Larry Itliong and the Agricultural Workers Organizing Committee (AWOC), a majority-Filipino union, launched a strike against Delano grape growers on September 8, 1965. Eight days later, Cesar Chavez's NFWA joined them — forming one of the most powerful multiracial labor alliances in American history. Healthcare demands were central: workers had no health insurance, no access to clinics, and suffered chronic pesticide exposure. The growers had long exploited ethnic divisions to break strikes, pitting Filipino workers against Mexican workers. Itliong and Chavez refused to play that game.",
      es: "Larry Itliong y el Comite Organizador de Trabajadores Agricolas (AWOC), un sindicato de mayoria filipina, lanzaron una huelga contra los productores de uva de Delano el 8 de septiembre de 1965. Ocho dias despues, la NFWA de Cesar Chavez se unio — formando una de las alianzas laborales multirraciales mas poderosas en la historia de Estados Unidos. Las demandas de salud eran centrales: los trabajadores no tenian seguro medico, ni acceso a clinicas, y sufrian exposicion cronica a pesticidas. Los productores habian explotado durante mucho tiempo las divisiones etnicas para romper huelgas, enfrentando a trabajadores filipinos contra mexicanos. Itliong y Chavez se negaron a jugar ese juego.",
    },
    impact: {
      en: "The five-year strike and international boycott won union contracts that included health benefits — a first for farmworkers. This multiracial alliance proved that cross-cultural solidarity could win healthcare access for the most exploited workers in America.",
      es: "La huelga de cinco anos y el boicot internacional ganaron contratos sindicales que incluian beneficios de salud — una primicia para los campesinos. Esta alianza multirracial demostro que la solidaridad intercultural podia lograr acceso a la atencion medica para los trabajadores mas explotados de Estados Unidos.",
    },
    category: "alliance",
    people: [
      {
        name: "Larry Itliong",
        role: { en: "Leader, AWOC", es: "Lider, AWOC" },
        background: "Filipino American",
      },
      {
        name: "Cesar Chavez",
        role: { en: "Leader, NFWA", es: "Lider, NFWA" },
        background: "Latino/Chicano",
      },
      {
        name: "Philip Vera Cruz",
        role: { en: "Vice President, UFW", es: "Vicepresidente, UFW" },
        background: "Filipino American",
      },
    ],
    organizations: [
      "Agricultural Workers Organizing Committee (AWOC)",
      "National Farm Workers Association",
      "United Farm Workers",
    ],
    location: "Delano, Kern County, California",
    primarySourceUrl: "https://ufw.org/research/history/ufw-history/",
    primarySourceOrg: "United Farm Workers",
    era: "farmworker-roots",
    videoUrl: "https://www.youtube.com/embed/Rx175JNdflI",
    videoTitle: {
      en: "The Delano Manongs — Forgotten Heroes of the UFW",
      es: "Los Manongs de Delano — Héroes Olvidados de la UFW",
    },
  },
  {
    id: "la-clinica-planning",
    year: 1965,
    endYear: 1971,
    title: {
      en: "La Clinica de la Raza — Born from the Chicano Health Movement",
      es: "La Clinica de la Raza — Nacida del Movimiento Chicano de Salud",
    },
    description: {
      en: "In Oakland's Fruitvale district, Chicano activists connected to the Brown Berets, MEChA, and La Raza Unida began organizing for a community-controlled health clinic. They demanded healthcare that was culturally competent, Spanish-speaking, and governed by the community it served — not by white hospital administrators who didn't understand their patients. Planning began in the mid-1960s, and La Clinica de la Raza officially opened in 1971 in a storefront with volunteer staff. It embodied the Chicano movement's insistence that communities should control their own institutions.",
      es: "En el distrito Fruitvale de Oakland, activistas chicanos conectados con los Brown Berets, MEChA y La Raza Unida comenzaron a organizar una clinica de salud controlada por la comunidad. Exigian atencion medica culturalmente competente, hispanohablante y gobernada por la comunidad a la que servia — no por administradores hospitalarios blancos que no entendian a sus pacientes. La planificacion comenzo a mediados de los anos 1960, y La Clinica de la Raza abrio oficialmente en 1971 en un local comercial con personal voluntario. Encarnaba la insistencia del movimiento chicano en que las comunidades deben controlar sus propias instituciones.",
    },
    impact: {
      en: "La Clinica de la Raza now serves over 90,000 patients across 35+ sites in Alameda, Contra Costa, and Solano counties. One of the largest Latino-serving FQHCs in California, it remains rooted in its Chicano movement origins.",
      es: "La Clinica de la Raza ahora atiende a mas de 90,000 pacientes en mas de 35 sitios en los condados de Alameda, Contra Costa y Solano. Uno de los FQHCs mas grandes que sirven a la comunidad latina en California, sigue arraigada en sus origenes del movimiento chicano.",
    },
    category: "founding",
    people: [],
    organizations: ["La Clinica de la Raza", "Brown Berets", "MEChA"],
    location: "Fruitvale, Oakland, California",
    primarySourceUrl: "https://www.laclinica.org/about-us/our-history/",
    primarySourceOrg: "La Clinica de la Raza",
    era: "farmworker-roots",
  },
  {
    id: "oeo-neighborhood-health-centers",
    year: 1966,
    endYear: 1967,
    title: {
      en: "OEO Funds First Neighborhood Health Centers",
      es: "La OEO Financia los Primeros Centros de Salud Comunitarios",
    },
    description: {
      en: "The Office of Economic Opportunity (OEO), as part of President Johnson's War on Poverty, funded the first neighborhood health centers. Dr. H. Jack Geiger and Dr. Count Gibson of Tufts University designed the model: community-governed clinics providing comprehensive care regardless of ability to pay. The first two opened in 1967 — Columbia Point in Boston and the Delta Health Center in Mound Bayou, Mississippi. When OEO officials questioned why Geiger was using clinic funds to buy food for starving patients, he replied: 'The last time I checked, hunger was a medical condition.' The model would be replicated across California.",
      es: "La Oficina de Oportunidad Economica (OEO), como parte de la Guerra contra la Pobreza del Presidente Johnson, financio los primeros centros de salud comunitarios. El Dr. H. Jack Geiger y el Dr. Count Gibson de la Universidad Tufts disenaron el modelo: clinicas gobernadas por la comunidad que brindan atencion integral sin importar la capacidad de pago. Los dos primeros abrieron en 1967 — Columbia Point en Boston y el Delta Health Center en Mound Bayou, Mississippi. Cuando funcionarios de la OEO cuestionaron por que Geiger usaba fondos de la clinica para comprar alimentos para pacientes hambrientos, respondio: 'La ultima vez que revise, el hambre era una condicion medica.' El modelo seria replicado en toda California.",
    },
    impact: {
      en: "Created the template for every community health center and FQHC in America. The principle of community governance — patients on the board of directors — remains a federal requirement for FQHCs today.",
      es: "Creo la plantilla para cada centro de salud comunitario y FQHC en Estados Unidos. El principio de gobernanza comunitaria — pacientes en la junta directiva — sigue siendo un requisito federal para los FQHCs hoy.",
    },
    category: "founding",
    people: [
      {
        name: "Dr. H. Jack Geiger",
        role: { en: "Co-Designer, Community Health Center Model", es: "Co-Disenador, Modelo de Centro de Salud Comunitario" },
        background: "Jewish American",
      },
      {
        name: "Dr. Count Gibson",
        role: { en: "Co-Designer, Community Health Center Model", es: "Co-Disenador, Modelo de Centro de Salud Comunitario" },
        background: "African American",
      },
    ],
    organizations: ["Office of Economic Opportunity", "Tufts University School of Medicine"],
    location: "Boston, MA & Mound Bayou, MS (national model for CA clinics)",
    primarySourceUrl: "https://www.rchnfoundation.org/wp-content/uploads/2016/11/George-Washington-University-The-Origins-of-Community-Health-Centers.pdf",
    primarySourceOrg: "RCHN Community Health Foundation / George Washington University",
    era: "farmworker-roots",
    videoUrl: "https://www.youtube.com/embed/EvdqLud9498",
    videoTitle: {
      en: "Dr. Jack Geiger: History of Community Health Centers",
      es: "Dr. Jack Geiger: Historia de los Centros de Salud Comunitarios",
    },
  },
  {
    id: "mnhc-founded",
    year: 1967,
    title: {
      en: "Mission Neighborhood Health Center Opens in San Francisco's Mission District",
      es: "Centro de Salud del Barrio de la Misión Abre en el Distrito Misión de San Francisco",
    },
    description: {
      en: "Mission Neighborhood Health Center was established in 1967 in San Francisco's Mission District, one of the earliest neighborhood health centers in California. Born from the same War on Poverty funding that created community health centers nationwide, MNHC was rooted in the predominantly Latino immigrant community of the Mission — a neighborhood facing overcrowded housing, language barriers, and near-total exclusion from the city's hospital system. Local community organizers, many connected to the Chicano movement, insisted the clinic be governed by the community it served. MNHC became a pioneer in bilingual healthcare delivery and culturally responsive care long before these became federal requirements.",
      es: "El Centro de Salud del Barrio de la Misión fue establecido en 1967 en el Distrito Misión de San Francisco, uno de los primeros centros de salud comunitarios en California. Nacido del mismo financiamiento de la Guerra contra la Pobreza que creó centros de salud comunitarios a nivel nacional, MNHC estaba arraigado en la comunidad predominantemente latina inmigrante de la Misión — un vecindario que enfrentaba vivienda hacinada, barreras idiomáticas y exclusión casi total del sistema hospitalario de la ciudad. Organizadores comunitarios locales, muchos conectados al movimiento chicano, insistieron en que la clínica fuera gobernada por la comunidad a la que servía. MNHC fue pionero en la prestación de atención médica bilingüe y culturalmente apropiada mucho antes de que estos se convirtieran en requisitos federales.",
    },
    impact: {
      en: "MNHC now serves over 12,000 patients annually with comprehensive primary care, behavioral health, and enabling services. It remains one of the oldest continuously operating community health centers in San Francisco and a model for culturally and linguistically responsive care in urban immigrant communities.",
      es: "MNHC ahora atiende a más de 12,000 pacientes anualmente con atención primaria integral, salud conductual y servicios habilitadores. Sigue siendo uno de los centros de salud comunitarios más antiguos en operación continua en San Francisco y un modelo para la atención culturalmente apropiada en comunidades urbanas inmigrantes.",
    },
    category: "founding",
    people: [],
    organizations: ["Mission Neighborhood Health Center", "OEO"],
    location: "San Francisco, California",
    primarySourceUrl: "https://www.mnhc.org/about",
    primarySourceOrg: "Mission Neighborhood Health Center",
    era: "farmworker-roots",
    videoUrl: "https://www.youtube.com/embed/1a5y963TjNU",
    videoTitle: {
      en: "Celebrating 50 Years at Mission Neighborhood Health Center",
      es: "Celebrando 50 Años en el Centro de Salud del Barrio de la Misión",
    },
  },
  {
    id: "clinica-del-pueblo-founded",
    year: 1969,
    title: {
      en: "Clinica de Salud del Pueblo Founded in the Imperial Valley",
      es: "Se Funda la Clinica de Salud del Pueblo en el Valle Imperial",
    },
    description: {
      en: "Clinica de Salud del Pueblo opened in Brawley, in California's Imperial Valley, to serve farmworkers and their families. The Imperial Valley — one of the hottest, most impoverished regions in the state — had virtually no healthcare for its largely Mexican and Mexican-American farmworker population. Founded during the height of the farmworker movement, it was one of the first clinics in California built by and for agricultural workers. Community members who had organized alongside the UFW channeled that energy into creating permanent health infrastructure.",
      es: "La Clinica de Salud del Pueblo abrio en Brawley, en el Valle Imperial de California, para atender a campesinos y sus familias. El Valle Imperial — una de las regiones mas calientes y empobrecidas del estado — practicamente no tenia atencion medica para su poblacion campesina mayoritariamente mexicana y mexicoamericana. Fundada durante el apogeo del movimiento campesino, fue una de las primeras clinicas en California construida por y para trabajadores agricolas. Miembros de la comunidad que habian organizado junto al UFW canalizaron esa energia en la creacion de infraestructura de salud permanente.",
    },
    impact: {
      en: "Now serves over 75,000 patients annually across 13 sites in the Imperial Valley. One of the oldest continuously operating farmworker health clinics in California, it became a model for rural FQHC development throughout the state.",
      es: "Ahora atiende a mas de 75,000 pacientes anualmente en 13 sitios en el Valle Imperial. Una de las clinicas de salud campesina mas antiguas en operacion continua en California, se convirtio en modelo para el desarrollo de FQHCs rurales en todo el estado.",
    },
    category: "founding",
    people: [],
    organizations: ["Clinica de Salud del Pueblo"],
    location: "Brawley, Imperial Valley, California",
    primarySourceUrl: "https://www.cdsdp.org/about-us/",
    primarySourceOrg: "Clinica de Salud del Pueblo",
    era: "farmworker-roots",
  },
  {
    id: "national-farmworker-health-program",
    year: 1970,
    title: {
      en: "National Farmworker Health Program Established",
      es: "Se Establece el Programa Nacional de Salud para Campesinos",
    },
    description: {
      en: "Building on the 1962 Migrant Health Act, the federal government expanded funding for migrant health centers throughout the early 1970s. California, with the nation's largest farmworker population, received significant funding. Clinics opened in the Central Valley, Salinas Valley, Imperial Valley, and other agricultural regions — often in the same communities where Chavez and the UFW had organized. The National Farmworker Health Program formalized what grassroots organizers had been doing: creating healthcare infrastructure where none existed, in the fields where people worked and the towns where they lived.",
      es: "Basandose en la Ley de Salud Migratoria de 1962, el gobierno federal expandio el financiamiento para centros de salud migratoria a principios de los anos 1970. California, con la poblacion campesina mas grande de la nacion, recibio financiamiento significativo. Se abrieron clinicas en el Valle Central, Valle de Salinas, Valle Imperial y otras regiones agricolas — a menudo en las mismas comunidades donde Chavez y el UFW habian organizado. El Programa Nacional de Salud para Campesinos formalizo lo que los organizadores de base habian estado haciendo: crear infraestructura de salud donde no existia, en los campos donde la gente trabajaba y los pueblos donde vivia.",
    },
    impact: {
      en: "Established the migrant health center network across rural California that would later become some of the state's largest FQHCs, including Clinica de Salud del Valle de Salinas, United Health Centers, and others serving hundreds of thousands of patients.",
      es: "Establecio la red de centros de salud migratoria en todo el California rural que luego se convertiria en algunos de los FQHCs mas grandes del estado, incluyendo la Clinica de Salud del Valle de Salinas, United Health Centers y otros que atienden a cientos de miles de pacientes.",
    },
    category: "farmworker",
    people: [],
    organizations: ["U.S. Department of Health, Education, and Welfare", "United Farm Workers"],
    location: "Central Valley, Salinas Valley, Imperial Valley, California",
    primarySourceUrl: "https://bphc.hrsa.gov/about-health-center-program/history",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
    era: "farmworker-roots",
  },

  /* ============================================================== */
  /*  ERA 2: COMMUNITY HEALTH CENTER MOVEMENT (1973-1988)           */
  /* ============================================================== */
  {
    id: "asian-health-services-founded",
    year: 1974,
    title: {
      en: "Asian Health Services Founded in Oakland Chinatown",
      es: "Se Funda Asian Health Services en el Chinatown de Oakland",
    },
    description: {
      en: "Asian Health Services was founded in Oakland's Chinatown by community members who saw that Asian immigrants were being turned away from hospitals and clinics due to language barriers. Volunteer interpreters and community health workers created a clinic where patients could receive care in Cantonese, Mandarin, Vietnamese, Korean, and other Asian languages. The clinic embodied the immigrant mutual aid tradition — communities taking care of their own when no one else would. What started as volunteers in a storefront became a national model for culturally and linguistically competent care.",
      es: "Asian Health Services fue fundada en el Chinatown de Oakland por miembros de la comunidad que veian como los inmigrantes asiaticos eran rechazados en hospitales y clinicas debido a barreras linguisticas. Interpretes voluntarios y trabajadores comunitarios de salud crearon una clinica donde los pacientes podian recibir atencion en cantones, mandarin, vietnamita, coreano y otros idiomas asiaticos. La clinica encarnaba la tradicion de ayuda mutua inmigrante — comunidades cuidando de los suyos cuando nadie mas lo hacia. Lo que comenzo como voluntarios en un local comercial se convirtio en un modelo nacional para la atencion cultural y linguisticamente competente.",
    },
    impact: {
      en: "Now serves over 50,000 patients in 14+ languages. AHS demonstrated that language access is a health equity issue — a principle now embedded in federal FQHC requirements and replicated by community health centers nationwide.",
      es: "Ahora atiende a mas de 50,000 pacientes en mas de 14 idiomas. AHS demostro que el acceso linguistico es un tema de equidad en salud — un principio ahora incorporado en los requisitos federales de FQHC y replicado por centros de salud comunitarios a nivel nacional.",
    },
    category: "founding",
    people: [],
    organizations: ["Asian Health Services"],
    location: "Oakland Chinatown, California",
    primarySourceUrl: "https://www.asianhealthservices.org/who-we-are",
    primarySourceOrg: "Asian Health Services",
    era: "community-health",
    videoUrl: "https://www.youtube.com/embed/bIOgDqWEGHc",
    videoTitle: {
      en: "Civil Rights History Project: H. Jack Geiger — Library of Congress",
      es: "Proyecto de Historia de Derechos Civiles: H. Jack Geiger — Biblioteca del Congreso",
    },
  },
  {
    id: "la-clinica-opens",
    year: 1975,
    title: {
      en: "La Clinica de la Raza Officially Opens",
      es: "La Clinica de la Raza Abre Oficialmente",
    },
    description: {
      en: "After years of community organizing in Oakland's Fruitvale district, La Clinica de la Raza expanded from its storefront origins into a fully operational community health center. Serving the growing Latino population of the East Bay, the clinic offered bilingual care, community health education, and culturally appropriate services. It was one of several clinics born from the Chicano movement that treated healthcare as a community right — not charity from outsiders. La Clinica's board was community-controlled, its staff reflected the neighborhoods it served, and its philosophy was rooted in the principle that health and justice were inseparable.",
      es: "Despues de anos de organizacion comunitaria en el distrito Fruitvale de Oakland, La Clinica de la Raza se expandio de sus origenes en un local comercial a un centro de salud comunitario completamente operativo. Sirviendo a la creciente poblacion latina del East Bay, la clinica ofrecia atencion bilingue, educacion de salud comunitaria y servicios culturalmente apropiados. Era una de varias clinicas nacidas del movimiento chicano que trataban la atencion medica como un derecho comunitario — no caridad de foraneos. La junta de La Clinica estaba controlada por la comunidad, su personal reflejaba los vecindarios que servia, y su filosofia estaba arraigada en el principio de que la salud y la justicia eran inseparables.",
    },
    impact: {
      en: "La Clinica's model of community-governed, culturally competent, bilingual healthcare became the template for Latino-serving FQHCs across California. It proved that clinics designed by and for communities of color could deliver world-class care.",
      es: "El modelo de La Clinica de atencion medica comunitaria, culturalmente competente y bilingue se convirtio en la plantilla para los FQHCs que sirven a latinos en toda California. Demostro que las clinicas disenadas por y para comunidades de color podian brindar atencion de clase mundial.",
    },
    category: "founding",
    people: [],
    organizations: ["La Clinica de la Raza"],
    location: "Fruitvale, Oakland, California",
    primarySourceUrl: "https://www.laclinica.org/about-us/our-history/",
    primarySourceOrg: "La Clinica de la Raza",
    era: "community-health",
  },
  {
    id: "community-health-center-act",
    year: 1978,
    title: {
      en: "Community Health Center Act Consolidates Section 330",
      es: "La Ley de Centros de Salud Comunitarios Consolida la Seccion 330",
    },
    description: {
      en: "Congress passed the Health Centers Consolidation Act, bringing together the various community health center, migrant health, and homeless healthcare programs under a unified Section 330 of the Public Health Service Act. This gave the scattered network of community clinics — from Oakland's Chicano clinics to Mississippi's civil rights health centers — a single legal framework and funding stream. The law codified the principles that grassroots organizers had been fighting for: community governance (51% patient board), care regardless of ability to pay, sliding fee scales, and comprehensive services in medically underserved areas.",
      es: "El Congreso aprobo la Ley de Consolidacion de Centros de Salud, reuniendo los diversos programas de centros de salud comunitarios, salud migratoria y atencion medica para personas sin hogar bajo una Seccion 330 unificada de la Ley de Servicios de Salud Publica. Esto dio a la red dispersa de clinicas comunitarias — desde las clinicas chicanas de Oakland hasta los centros de salud de derechos civiles de Mississippi — un marco legal unico y un flujo de financiamiento. La ley codifico los principios por los que los organizadores de base habian luchado: gobernanza comunitaria (51% pacientes en la junta), atencion sin importar capacidad de pago, escalas de tarifas deslizantes y servicios integrales en areas medicamente desatendidas.",
    },
    impact: {
      en: "Created the unified legal and funding framework that all FQHCs operate under today. Section 330 remains the foundation of the $30+ billion community health center system serving 30 million Americans.",
      es: "Creo el marco legal y de financiamiento unificado bajo el cual operan todos los FQHCs hoy. La Seccion 330 sigue siendo la base del sistema de centros de salud comunitarios de mas de $30 mil millones que atiende a 30 millones de estadounidenses.",
    },
    category: "legislation",
    people: [],
    organizations: ["U.S. Congress", "NACHC"],
    location: "Federal (consolidating CA clinics under one framework)",
    primarySourceUrl: "https://bphc.hrsa.gov/about-health-center-program/history",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
    era: "community-health",
  },
  {
    id: "altamed-east-la",
    year: 1979,
    title: {
      en: "AltaMed Begins Serving East Los Angeles",
      es: "AltaMed Comienza a Servir al Este de Los Angeles",
    },
    description: {
      en: "AltaMed Health Services began operations in East Los Angeles, growing from a small community clinic serving the Mexican-American population of the Eastside into what would become one of the largest FQHCs in the nation. East LA — a predominantly Latino community with deep ties to the Chicano movement — needed healthcare providers who understood its culture, spoke its language, and stayed when others left. AltaMed's founder, Dr. Castulo de la Rocha, built the organization around the idea that healthcare was a tool for community empowerment, not just disease treatment.",
      es: "AltaMed Health Services comenzo operaciones en el este de Los Angeles, creciendo de una pequena clinica comunitaria que servia a la poblacion mexicoamericana del Eastside hasta convertirse en uno de los FQHCs mas grandes de la nacion. El este de LA — una comunidad predominantemente latina con lazos profundos al movimiento chicano — necesitaba proveedores de salud que entendieran su cultura, hablaran su idioma y se quedaran cuando otros se iban. El fundador de AltaMed, Dr. Castulo de la Rocha, construyo la organizacion alrededor de la idea de que la atencion medica era una herramienta para el empoderamiento comunitario, no solo para el tratamiento de enfermedades.",
    },
    impact: {
      en: "AltaMed now serves over 300,000 patients annually with 2,500+ employees across 50+ sites — the largest FQHC in Southern California. It posts 230+ job openings at any given time and has become one of the region's largest healthcare employers.",
      es: "AltaMed ahora atiende a mas de 300,000 pacientes anualmente con mas de 2,500 empleados en mas de 50 sitios — el FQHC mas grande del sur de California. Publica mas de 230 ofertas de empleo en cualquier momento y se ha convertido en uno de los mayores empleadores de salud de la region.",
    },
    category: "founding",
    people: [
      {
        name: "Dr. Castulo de la Rocha",
        role: { en: "Founder & CEO, AltaMed", es: "Fundador y CEO, AltaMed" },
        background: "Latino/Chicano",
      },
    ],
    organizations: ["AltaMed Health Services"],
    location: "East Los Angeles, California",
    primarySourceUrl: "https://www.altamed.org/about-us/",
    primarySourceOrg: "AltaMed Health Services",
    era: "community-health",
  },
  {
    id: "northeast-valley-established",
    year: 1980,
    title: {
      en: "Northeast Valley Health Corporation Established",
      es: "Se Establece Northeast Valley Health Corporation",
    },
    description: {
      en: "Northeast Valley Health Corporation (NEVHC) was established in the San Fernando Valley to serve the growing immigrant and low-income populations of northeast Los Angeles. The Valley's demographics were shifting rapidly — waves of Central American refugees fleeing civil wars in El Salvador, Guatemala, and Nicaragua were settling in neighborhoods where established healthcare providers were leaving. NEVHC filled the gap, building a network of clinics in communities that had been abandoned by the private healthcare system.",
      es: "Northeast Valley Health Corporation (NEVHC) se establecio en el Valle de San Fernando para servir a las crecientes poblaciones inmigrantes y de bajos ingresos del noreste de Los Angeles. La demografia del Valle estaba cambiando rapidamente — oleadas de refugiados centroamericanos que huian de guerras civiles en El Salvador, Guatemala y Nicaragua se establecian en vecindarios donde los proveedores de salud establecidos se estaban yendo. NEVHC lleno el vacio, construyendo una red de clinicas en comunidades que habian sido abandonadas por el sistema privado de salud.",
    },
    impact: {
      en: "NEVHC grew to serve over 85,000 patients across multiple sites in the San Fernando and Santa Clarita Valleys, becoming a critical safety-net provider for one of LA's most underserved regions.",
      es: "NEVHC crecio para atender a mas de 85,000 pacientes en multiples sitios en los Valles de San Fernando y Santa Clarita, convirtiendose en un proveedor de red de seguridad critico para una de las regiones mas desatendidas de LA.",
    },
    category: "founding",
    people: [],
    organizations: ["Northeast Valley Health Corporation"],
    location: "San Fernando Valley, Los Angeles, California",
    primarySourceUrl: "https://www.nevhc.org/about-us/",
    primarySourceOrg: "Northeast Valley Health Corporation",
    era: "community-health",
  },
  {
    id: "hiv-aids-fqhc-frontline",
    year: 1985,
    endYear: 1990,
    title: {
      en: "HIV/AIDS Crisis — FQHCs Become Frontline Response",
      es: "Crisis del VIH/SIDA — Los FQHCs Se Convierten en Respuesta de Primera Linea",
    },
    description: {
      en: "As the HIV/AIDS epidemic devastated communities across California, community health centers stepped up when other providers would not. In San Francisco, Los Angeles, and Oakland, FQHCs became some of the first providers willing to treat AIDS patients — at a time when many hospitals and private physicians refused to touch them. These clinics served the gay community, IV drug users, and communities of color who were disproportionately affected. The epidemic forced FQHCs to expand into infectious disease care, behavioral health, and harm reduction — services that would later become core FQHC capabilities.",
      es: "Mientras la epidemia del VIH/SIDA devastaba comunidades en toda California, los centros de salud comunitarios dieron un paso al frente cuando otros proveedores no lo hicieron. En San Francisco, Los Angeles y Oakland, los FQHCs se convirtieron en algunos de los primeros proveedores dispuestos a tratar pacientes con SIDA — en un momento en que muchos hospitales y medicos privados se negaban a tocarlos. Estas clinicas sirvieron a la comunidad gay, usuarios de drogas intravenosas y comunidades de color que fueron afectadas desproporcionadamente. La epidemia obligo a los FQHCs a expandirse hacia la atencion de enfermedades infecciosas, salud conductual y reduccion de danos — servicios que luego se convertiran en capacidades centrales de los FQHCs.",
    },
    impact: {
      en: "FQHCs' willingness to serve AIDS patients when others wouldn't cemented their role as providers of last resort for stigmatized populations. The Ryan White CARE Act (1990) later formalized FQHC involvement in HIV/AIDS care infrastructure.",
      es: "La disposicion de los FQHCs de atender a pacientes con SIDA cuando otros no lo hacian consolido su papel como proveedores de ultimo recurso para poblaciones estigmatizadas. La Ley Ryan White CARE (1990) luego formalizo la participacion de los FQHCs en la infraestructura de atencion del VIH/SIDA.",
    },
    category: "crisis",
    people: [],
    organizations: ["San Francisco Community Health Centers", "California Primary Care Association"],
    location: "San Francisco, Los Angeles, Oakland, California",
    primarySourceUrl: "https://www.hrsa.gov/about/organization/bureaus/hab",
    primarySourceOrg: "HRSA HIV/AIDS Bureau",
    era: "community-health",
  },
  {
    id: "irca-immigration-reform",
    year: 1986,
    title: {
      en: "IRCA — Immigration Reform Brings Healthcare Access Questions",
      es: "IRCA — La Reforma Migratoria Plantea Preguntas sobre Acceso a la Salud",
    },
    description: {
      en: "The Immigration Reform and Control Act (IRCA) of 1986 granted amnesty to approximately 2.7 million undocumented immigrants nationwide — including an estimated 1.6 million in California, many of them farmworkers. While IRCA provided a path to legalization, it also raised critical questions about healthcare access for those who didn't qualify or were still in the process. Community health centers became the bridge: providing care to both newly legalized immigrants navigating a complex system and those who remained undocumented. FQHCs helped families understand their new eligibility for Medicaid and other programs.",
      es: "La Ley de Reforma y Control de Inmigracion (IRCA) de 1986 otorgo amnistia a aproximadamente 2.7 millones de inmigrantes indocumentados a nivel nacional — incluyendo un estimado de 1.6 millones en California, muchos de ellos campesinos. Mientras que IRCA proporciono un camino hacia la legalizacion, tambien planteo preguntas criticas sobre el acceso a la salud para aquellos que no calificaban o aun estaban en proceso. Los centros de salud comunitarios se convirtieron en el puente: proporcionando atencion tanto a inmigrantes recien legalizados que navegaban un sistema complejo como a aquellos que permanecian indocumentados. Los FQHCs ayudaron a las familias a entender su nueva elegibilidad para Medicaid y otros programas.",
    },
    impact: {
      en: "IRCA deepened the relationship between immigrant communities and FQHCs. For farmworkers who gained legal status, FQHCs helped them access Medicaid for the first time. For those who remained undocumented, FQHCs were the only healthcare option.",
      es: "IRCA profundizo la relacion entre las comunidades inmigrantes y los FQHCs. Para los campesinos que obtuvieron estatus legal, los FQHCs les ayudaron a acceder a Medicaid por primera vez. Para aquellos que permanecieron indocumentados, los FQHCs eran la unica opcion de atencion medica.",
    },
    category: "undocumented",
    people: [],
    organizations: ["U.S. Congress", "California FQHCs"],
    location: "California (statewide — largest beneficiary state)",
    primarySourceUrl: "https://www.uscis.gov/about-us/our-history/history-office-and-library/featured-stories-from-the-uscis-history-office-and-library/immigration-reform-and-control-act-of-1986-irca",
    primarySourceOrg: "USCIS History Office",
    era: "community-health",
  },

  /* ============================================================== */
  /*  ERA 3: FQHC DESIGNATION & EXPANSION (1989-2009)               */
  /* ============================================================== */
  {
    id: "fqhc-designation-created",
    year: 1989,
    title: {
      en: "FQHC Designation Created Under OBRA '89",
      es: "Se Crea la Designacion FQHC Bajo OBRA '89",
    },
    description: {
      en: "The Omnibus Budget Reconciliation Act of 1989 (OBRA '89) created the Federally Qualified Health Center (FQHC) designation under Section 330 of the Public Health Service Act. This gave community health centers a permanent legal identity, enhanced Medicaid reimbursement, and established federal requirements: community board governance (51% patients), sliding fee scale, care regardless of ability to pay, and location in a medically underserved area. The grassroots clinics born from farmworker organizing, the Chicano movement, and the Black Panther survival programs now had a federal home.",
      es: "La Ley de Reconciliacion Presupuestaria Omnibus de 1989 (OBRA '89) creo la designacion de Centro de Salud Federalmente Calificado (FQHC) bajo la Seccion 330 de la Ley de Servicios de Salud Publica. Esto dio a los centros de salud comunitarios una identidad legal permanente, reembolso mejorado de Medicaid y requisitos federales: gobernanza por junta comunitaria (51% pacientes), escala de tarifas deslizante, atencion sin importar capacidad de pago y ubicacion en un area medicamente desatendida. Las clinicas de base nacidas de la organizacion campesina, el movimiento chicano y los programas de supervivencia de los Panteras Negras ahora tenian un hogar federal.",
    },
    impact: {
      en: "Transformed grassroots clinics into a recognized healthcare delivery system. The FQHC designation gave clinics financial stability through enhanced Medicaid rates — the foundation of the $30+ billion system serving 30 million patients today.",
      es: "Transformo clinicas de base en un sistema de prestacion de atencion medica reconocido. La designacion FQHC dio a las clinicas estabilidad financiera a traves de tarifas mejoradas de Medicaid — la base del sistema de mas de $30 mil millones que atiende a 30 millones de pacientes hoy.",
    },
    category: "legislation",
    people: [],
    organizations: ["U.S. Congress", "NACHC"],
    location: "Federal (CA had one of the largest FQHC networks nationally)",
    primarySourceUrl: "https://bphc.hrsa.gov/about-health-center-program/what-health-center",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
    era: "fqhc-era",
  },
  {
    id: "ryan-white-care-act",
    year: 1990,
    title: {
      en: "Ryan White CARE Act — FQHCs as HIV/AIDS Care Infrastructure",
      es: "Ley Ryan White CARE — Los FQHCs como Infraestructura de Atencion del VIH/SIDA",
    },
    description: {
      en: "Congress passed the Ryan White Comprehensive AIDS Resources Emergency (CARE) Act, directing federal funding to metropolitan areas hardest hit by HIV/AIDS. FQHCs, which had been treating AIDS patients since the mid-1980s when other providers refused, became a cornerstone of the Ryan White care delivery system. In San Francisco, Los Angeles, and other California cities, FQHCs used Ryan White funding to build out primary care, case management, mental health, and substance use treatment for people living with HIV — creating the integrated care model that defines FQHCs today.",
      es: "El Congreso aprobo la Ley de Recursos de Emergencia Integral para el SIDA Ryan White (CARE), dirigiendo financiamiento federal a areas metropolitanas mas afectadas por el VIH/SIDA. Los FQHCs, que habian estado tratando pacientes con SIDA desde mediados de los anos 1980 cuando otros proveedores se negaban, se convirtieron en pieza angular del sistema de prestacion de atencion Ryan White. En San Francisco, Los Angeles y otras ciudades de California, los FQHCs usaron financiamiento Ryan White para construir atencion primaria, manejo de casos, salud mental y tratamiento de trastornos por uso de sustancias para personas con VIH — creando el modelo de atencion integrada que define a los FQHCs hoy.",
    },
    impact: {
      en: "The Ryan White CARE Act validated FQHCs as comprehensive care providers — not just primary care clinics. It funded the behavioral health and case management infrastructure that FQHCs now use for ECM, CalAIM, and other whole-person care programs.",
      es: "La Ley Ryan White CARE valido a los FQHCs como proveedores de atencion integral — no solo clinicas de atencion primaria. Financio la infraestructura de salud conductual y manejo de casos que los FQHCs ahora usan para ECM, CalAIM y otros programas de atencion integral.",
    },
    category: "legislation",
    people: [],
    organizations: ["U.S. Congress", "HRSA HIV/AIDS Bureau"],
    location: "Federal (San Francisco, LA critical early implementers)",
    primarySourceUrl: "https://www.hrsa.gov/about/organization/bureaus/hab/about/legislation",
    primarySourceOrg: "HRSA HIV/AIDS Bureau",
    era: "fqhc-era",
  },
  {
    id: "prop-187-fqhc-last-resort",
    year: 1994,
    title: {
      en: "Proposition 187 — FQHCs Become Last Resort for Undocumented Californians",
      es: "Proposicion 187 — Los FQHCs Se Convierten en el Ultimo Recurso para Californianos Indocumentados",
    },
    description: {
      en: "California voters passed Proposition 187, which sought to deny public services — including non-emergency healthcare — to undocumented immigrants. Though largely blocked by federal courts and never fully implemented, Prop 187 sent a chilling message: undocumented Californians were not welcome in hospitals and public clinics. FQHCs, with their federal mandate to serve everyone regardless of immigration status, became the last healthcare option for millions. Immigrant communities stopped going to emergency rooms out of fear. Families with mixed-status members — a U.S.-citizen child with undocumented parents — relied on FQHCs as the only institution they could trust.",
      es: "Los votantes de California aprobaron la Proposicion 187, que buscaba negar servicios publicos — incluyendo atencion medica no de emergencia — a inmigrantes indocumentados. Aunque fue en gran parte bloqueada por tribunales federales y nunca se implemento completamente, la Prop 187 envio un mensaje escalofriante: los californianos indocumentados no eran bienvenidos en hospitales y clinicas publicas. Los FQHCs, con su mandato federal de servir a todos sin importar el estatus migratorio, se convirtieron en la ultima opcion de atencion medica para millones. Las comunidades inmigrantes dejaron de ir a las salas de emergencia por miedo. Las familias con miembros de estatus mixto — un nino ciudadano con padres indocumentados — dependian de los FQHCs como la unica institucion en la que podian confiar.",
    },
    impact: {
      en: "Cemented FQHCs as the healthcare safety net for undocumented communities in California. Many FQHCs expanded their bilingual capacity in response, deepening their role as trusted institutions in immigrant communities — a role they still hold today.",
      es: "Consolido a los FQHCs como la red de seguridad de salud para comunidades indocumentadas en California. Muchos FQHCs expandieron su capacidad bilingue en respuesta, profundizando su papel como instituciones de confianza en comunidades inmigrantes — un papel que aun mantienen hoy.",
    },
    category: "undocumented",
    people: [],
    organizations: ["California FQHCs"],
    location: "California (statewide)",
    primarySourceUrl: "https://www.uscis.gov/about-us/our-history/history-office-and-library/featured-stories-from-the-uscis-history-office-and-library/proposition-187",
    primarySourceOrg: "USCIS History Office",
    era: "fqhc-era",
  },
  {
    id: "welfare-reform-prwora",
    year: 1996,
    title: {
      en: "Welfare Reform & PRWORA — Immigrants Lose Benefits, FQHCs Fill Gaps",
      es: "Reforma de Bienestar y PRWORA — Los Inmigrantes Pierden Beneficios, los FQHCs Llenan los Vacios",
    },
    description: {
      en: "The Personal Responsibility and Work Opportunity Reconciliation Act of 1996 barred undocumented immigrants from virtually all federal public benefits, including Medicaid. Even many legal immigrants lost access to benefits during their first five years in the country. This made FQHCs — which receive Section 330 grants specifically to serve uninsured patients regardless of immigration status — the primary healthcare access point for immigrant families nationwide. In California, with an estimated 2+ million undocumented residents, FQHCs absorbed enormous demand as the only providers who would see patients regardless of documentation.",
      es: "La Ley de Reconciliacion de Responsabilidad Personal y Oportunidad Laboral de 1996 excluyo a los inmigrantes indocumentados de practicamente todos los beneficios publicos federales, incluyendo Medicaid. Incluso muchos inmigrantes legales perdieron acceso a beneficios durante sus primeros cinco anos en el pais. Esto convirtio a los FQHCs — que reciben subvenciones de la Seccion 330 especificamente para atender a pacientes sin seguro sin importar estatus migratorio — en el principal punto de acceso a la atencion medica para familias inmigrantes a nivel nacional. En California, con un estimado de mas de 2 millones de residentes indocumentados, los FQHCs absorbieron una demanda enorme como los unicos proveedores que veian pacientes sin importar la documentacion.",
    },
    impact: {
      en: "FQHCs became the de facto healthcare system for undocumented Americans. In California, this deepened FQHCs' mission as institutions serving the most marginalized — and made their federal funding even more critical to the state's public health.",
      es: "Los FQHCs se convirtieron en el sistema de salud de facto para estadounidenses indocumentados. En California, esto profundizo la mision de los FQHCs como instituciones que sirven a los mas marginados — e hizo su financiamiento federal aun mas critico para la salud publica del estado.",
    },
    category: "undocumented",
    people: [],
    organizations: ["U.S. Congress"],
    location: "Federal (massive impact in California)",
    primarySourceUrl: "https://www.congress.gov/bill/104th-congress/house-bill/3734",
    primarySourceOrg: "U.S. Congress",
    era: "fqhc-era",
  },
  {
    id: "bush-doubles-fqhc-funding",
    year: 2001,
    endYear: 2008,
    title: {
      en: "President Bush Doubles FQHC Funding — Building a Bipartisan Coalition for Community Health",
      es: "El Presidente Bush Duplica el Financiamiento de FQHC — Construyendo una Coalicion Bipartidista para la Salud Comunitaria",
    },
    description: {
      en: "President George W. Bush, a Republican, launched the Health Center Growth Initiative in 2002, pledging to open or expand 1,200 health center sites and double the number of patients served. By 2008, federal FQHC funding had more than doubled — from $1.2 billion to over $2 billion annually. Bush said: 'Health care ought to be affordable, available and accessible for all our citizens.' His support was driven partly by FQHCs' presence in rural, conservative districts where they were often the only healthcare provider. The irony was stark: a president who opposed universal healthcare became the biggest champion of the safety net that provided it.",
      es: "El Presidente George W. Bush, un republicano, lanzo la Iniciativa de Crecimiento de Centros de Salud en 2002, comprometiendose a abrir o expandir 1,200 sitios de centros de salud y duplicar el numero de pacientes atendidos. Para 2008, el financiamiento federal de FQHC se habia mas que duplicado — de $1.2 mil millones a mas de $2 mil millones anuales. Bush dijo: 'La atencion medica debe ser accesible, disponible y asequible para todos nuestros ciudadanos.' Su apoyo fue impulsado en parte por la presencia de FQHCs en distritos rurales conservadores donde a menudo eran el unico proveedor de salud. La ironia era fuerte: un presidente que se oponia a la cobertura de salud universal se convirtio en el mayor defensor de la red de seguridad que la proporcionaba.",
    },
    impact: {
      en: "Made FQHC funding one of the few truly bipartisan budget items in American politics. Bush's initiative served 6.1 million new patients and established FQHCs as essential infrastructure in both red and blue districts across the nation.",
      es: "Hizo del financiamiento de FQHC uno de los pocos items presupuestarios verdaderamente bipartidistas en la politica estadounidense. La iniciativa de Bush atendio a 6.1 millones de nuevos pacientes y establecio a los FQHCs como infraestructura esencial en distritos rojos y azules de toda la nacion.",
    },
    category: "expansion",
    people: [
      {
        name: "George W. Bush",
        role: { en: "43rd President of the United States", es: "43o Presidente de los Estados Unidos" },
        background: "White",
      },
    ],
    organizations: ["White House", "HRSA"],
    location: "Federal (CA received significant expansion funding)",
    primarySourceUrl: "https://georgewbush-whitehouse.archives.gov/infocus/healthcare/",
    primarySourceOrg: "George W. Bush White House Archives",
    era: "fqhc-era",
  },
  {
    id: "great-recession-demand-surge",
    year: 2008,
    endYear: 2009,
    title: {
      en: "Great Recession — Demand Surges at FQHCs",
      es: "Gran Recesion — La Demanda Se Dispara en los FQHCs",
    },
    description: {
      en: "The 2008 financial crisis devastated California communities. Millions lost jobs, health insurance, and homes. FQHC patient volume surged as newly uninsured families — many of whom had never used safety-net services — turned to community health centers for the first time. In the Central Valley and Inland Empire, where the housing crisis hit hardest, FQHCs saw 20-30% increases in patient volume. The recession proved what advocates had long argued: FQHCs aren't just for the permanently poor — they're the infrastructure that catches everyone when the economy fails.",
      es: "La crisis financiera de 2008 devasto a las comunidades de California. Millones perdieron empleos, seguro medico y hogares. El volumen de pacientes de FQHC se disparo cuando familias recien sin seguro — muchas de las cuales nunca habian usado servicios de red de seguridad — acudieron a los centros de salud comunitarios por primera vez. En el Valle Central y el Inland Empire, donde la crisis de vivienda golpeo mas fuerte, los FQHCs vieron aumentos del 20-30% en volumen de pacientes. La recesion demostro lo que los defensores habian argumentado por mucho tiempo: los FQHCs no son solo para los permanentemente pobres — son la infraestructura que atrapa a todos cuando la economia falla.",
    },
    impact: {
      en: "The recession-driven surge demonstrated FQHCs' critical role as economic shock absorbers. This evidence was used to justify the ACA's $11 billion investment in community health centers just two years later.",
      es: "El aumento impulsado por la recesion demostro el papel critico de los FQHCs como amortiguadores de choques economicos. Esta evidencia se uso para justificar la inversion de $11 mil millones de la ACA en centros de salud comunitarios solo dos anos despues.",
    },
    category: "crisis",
    people: [],
    organizations: ["California Primary Care Association", "NACHC"],
    location: "California (statewide — Central Valley, Inland Empire hardest hit)",
    primarySourceUrl: "https://www.kff.org/uninsured/issue-brief/community-health-centers-the-challenge-of-growing-to-meet-the-need-for-primary-care-in-medically-underserved-communities/",
    primarySourceOrg: "Kaiser Family Foundation",
    era: "fqhc-era",
  },

  /* ============================================================== */
  /*  ERA 4: ACA & UNPRECEDENTED GROWTH (2010-2019)                 */
  /* ============================================================== */
  {
    id: "aca-fqhc-fund",
    year: 2010,
    title: {
      en: "ACA Creates $11B Community Health Center Fund",
      es: "La ACA Crea un Fondo de $11 Mil Millones para Centros de Salud Comunitarios",
    },
    description: {
      en: "The Affordable Care Act created the Community Health Center Fund, investing $11 billion over five years in FQHCs — the largest expansion of community health center funding in history. The law recognized that expanding insurance coverage would be meaningless without enough providers to deliver care, and FQHCs were the infrastructure to do it. In California, the ACA funded new sites, expanded services, and enabled FQHCs to hire thousands of new providers. The Community Health Center Fund represented a historic bet: that the clinics born from farmworker organizing and civil rights activism were the right foundation for American primary care.",
      es: "La Ley de Cuidado de Salud Asequible creo el Fondo de Centros de Salud Comunitarios, invirtiendo $11 mil millones en cinco anos en FQHCs — la mayor expansion de financiamiento de centros de salud comunitarios en la historia. La ley reconocio que expandir la cobertura de seguro seria insignificante sin suficientes proveedores para brindar atencion, y los FQHCs eran la infraestructura para hacerlo. En California, la ACA financio nuevos sitios, expandio servicios y permitio a los FQHCs contratar miles de nuevos proveedores. El Fondo de Centros de Salud Comunitarios represento una apuesta historica: que las clinicas nacidas de la organizacion campesina y el activismo de derechos civiles eran la base correcta para la atencion primaria estadounidense.",
    },
    impact: {
      en: "FQHCs went from serving 18 million patients in 2008 to over 30 million by 2023. In California, the number of FQHC patients nearly doubled. The ACA transformed FQHCs from scrappy safety-net clinics into the backbone of primary care for low-income Americans.",
      es: "Los FQHCs pasaron de atender 18 millones de pacientes en 2008 a mas de 30 millones para 2023. En California, el numero de pacientes de FQHC casi se duplico. La ACA transformo a los FQHCs de modestas clinicas de red de seguridad a la columna vertebral de la atencion primaria para estadounidenses de bajos ingresos.",
    },
    category: "expansion",
    people: [],
    organizations: ["U.S. Congress", "White House"],
    location: "Federal (CA largest beneficiary state)",
    primarySourceUrl: "https://www.kff.org/medicaid/issue-brief/community-health-centers-and-the-aca/",
    primarySourceOrg: "Kaiser Family Foundation",
    era: "aca-expansion",
  },
  {
    id: "medi-cal-expansion",
    year: 2012,
    endYear: 2014,
    title: {
      en: "Medi-Cal Expansion Begins Under ACA",
      es: "Comienza la Expansion de Medi-Cal Bajo la ACA",
    },
    description: {
      en: "California began early expansion of Medi-Cal (Medicaid) under the ACA, eventually covering adults up to 138% of the federal poverty level and adding an estimated 3.4 million newly eligible Californians. Many of these new enrollees were directed to FQHCs as their primary care home. In some regions, FQHCs were the only providers accepting new Medi-Cal patients. This massive influx transformed FQHCs from clinics serving primarily uninsured patients to major Medicaid providers — stabilizing revenue but also creating deep dependency on Medi-Cal reimbursement rates.",
      es: "California comenzo la expansion temprana de Medi-Cal (Medicaid) bajo la ACA, eventualmente cubriendo a adultos hasta el 138% del nivel federal de pobreza y agregando un estimado de 3.4 millones de californianos recien elegibles. Muchos de estos nuevos inscritos fueron dirigidos a los FQHCs como su hogar de atencion primaria. En algunas regiones, los FQHCs eran los unicos proveedores que aceptaban nuevos pacientes de Medi-Cal. Esta enorme afluencia transformo a los FQHCs de clinicas que servian principalmente a pacientes sin seguro a importantes proveedores de Medicaid — estabilizando los ingresos pero tambien creando una profunda dependencia de las tarifas de reembolso de Medi-Cal.",
    },
    impact: {
      en: "California's Medi-Cal enrollment surged to over 15 million — roughly one in three Californians. FQHCs became the primary care backbone for Medi-Cal, which is why the Medicaid cuts in H.R. 1 are so threatening to California's health infrastructure.",
      es: "La inscripcion en Medi-Cal de California se disparo a mas de 15 millones — aproximadamente uno de cada tres californianos. Los FQHCs se convirtieron en la columna vertebral de atencion primaria para Medi-Cal, por lo que los recortes a Medicaid en H.R. 1 son tan amenazantes para la infraestructura de salud de California.",
    },
    category: "expansion",
    people: [],
    organizations: ["California Department of Health Care Services (DHCS)"],
    location: "California (statewide)",
    primarySourceUrl: "https://www.dhcs.ca.gov/services/medi-cal",
    primarySourceOrg: "California Department of Health Care Services",
    era: "aca-expansion",
  },
  {
    id: "medi-cal-undocumented-children",
    year: 2015,
    title: {
      en: "CA Extends Medi-Cal to Undocumented Children (SB 75)",
      es: "CA Extiende Medi-Cal a Ninos Indocumentados (SB 75)",
    },
    description: {
      en: "California became the first state to extend full-scope Medi-Cal benefits to undocumented children under 19, through SB 75 (Health4All Kids). Signed by Governor Jerry Brown in 2015, the law recognized that children's health shouldn't depend on their parents' immigration status. Over 250,000 undocumented children gained healthcare coverage, with many receiving care at FQHCs that had been treating them without insurance for years. For these clinics, Health4All Kids meant their youngest patients finally had coverage — and FQHCs finally got reimbursed for care they'd been providing for free.",
      es: "California se convirtio en el primer estado en extender beneficios de Medi-Cal de alcance completo a ninos indocumentados menores de 19 anos, a traves de SB 75 (Health4All Kids). Firmada por el Gobernador Jerry Brown en 2015, la ley reconocio que la salud de los ninos no deberia depender del estatus migratorio de sus padres. Mas de 250,000 ninos indocumentados obtuvieron cobertura de salud, y muchos recibian atencion en FQHCs que los habian estado tratando sin seguro durante anos. Para estas clinicas, Health4All Kids significo que sus pacientes mas jovenes finalmente tenian cobertura — y los FQHCs finalmente fueron reembolsados por la atencion que habian estado proporcionando gratuitamente.",
    },
    impact: {
      en: "Set the precedent for California's step-by-step expansion of Medi-Cal to all undocumented residents. It proved that extending coverage to undocumented populations was politically viable and fiscally manageable.",
      es: "Establecio el precedente para la expansion paso a paso de California de Medi-Cal a todos los residentes indocumentados. Demostro que extender la cobertura a poblaciones indocumentadas era politicamente viable y fiscalmente manejable.",
    },
    category: "undocumented",
    people: [],
    organizations: ["California Legislature", "Department of Health Care Services"],
    location: "California (statewide)",
    primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201520160SB75",
    primarySourceOrg: "California Legislature",
    era: "aca-expansion",
  },
  {
    id: "340b-expansion",
    year: 2016,
    title: {
      en: "340B Drug Pricing Expansion Boosts FQHC Revenue",
      es: "La Expansion de Precios de Medicamentos 340B Impulsa los Ingresos de los FQHCs",
    },
    description: {
      en: "By 2016, the 340B Drug Pricing Program — created in 1992 to allow safety-net providers to purchase outpatient drugs at steep discounts — had become a critical revenue stream for FQHCs. As FQHC networks grew under the ACA, more clinics qualified for 340B, and many opened in-house pharmacies to capture the full margin. For California FQHCs, 340B revenue often meant the difference between expanding services and cutting them. The program allowed clinics to buy drugs at deep discounts and generate margin that funded patient services, behavioral health, and community programs that Medicaid reimbursement alone couldn't sustain.",
      es: "Para 2016, el Programa de Precios de Medicamentos 340B — creado en 1992 para permitir a los proveedores de red de seguridad comprar medicamentos ambulatorios con grandes descuentos — se habia convertido en un flujo de ingresos critico para los FQHCs. A medida que las redes de FQHC crecieron bajo la ACA, mas clinicas calificaron para 340B, y muchas abrieron farmacias internas para capturar el margen completo. Para los FQHCs de California, los ingresos de 340B a menudo significaban la diferencia entre expandir servicios y recortarlos. El programa permitia a las clinicas comprar medicamentos con grandes descuentos y generar margenes que financiaban servicios a pacientes, salud conductual y programas comunitarios que el reembolso de Medicaid por si solo no podia sostener.",
    },
    impact: {
      en: "340B revenue became a lifeline for FQHCs, often generating the margin that keeps clinics open. Today, threats to 340B are nearly as dangerous to FQHCs as Medicaid cuts — it's the second pillar holding the system up.",
      es: "Los ingresos de 340B se convirtieron en un salvavidas para los FQHCs, a menudo generando el margen que mantiene las clinicas abiertas. Hoy, las amenazas a 340B son casi tan peligrosas para los FQHCs como los recortes a Medicaid — es el segundo pilar que sostiene el sistema.",
    },
    category: "expansion",
    people: [],
    organizations: ["HRSA Office of Pharmacy Affairs", "California FQHCs"],
    location: "Federal (major impact on CA FQHC finances)",
    primarySourceUrl: "https://www.hrsa.gov/opa/340b-drug-pricing-program",
    primarySourceOrg: "HRSA Office of Pharmacy Affairs",
    era: "aca-expansion",
  },
  {
    id: "fqhc-funding-cliff-avoided",
    year: 2019,
    title: {
      en: "FQHC Funding Cliff Avoided — Bipartisan Reauthorization",
      es: "Se Evita el Precipicio de Financiamiento de FQHC — Reautorizacion Bipartidista",
    },
    description: {
      en: "The Community Health Center Fund faced a funding cliff in 2019, with bipartisan reauthorization required to continue the mandatory $4+ billion in annual Section 330 funding. After months of uncertainty and short-term continuing resolutions, Congress passed a two-year bipartisan reauthorization. The debate previewed the dynamics that would play out again in 2025-2026: FQHC funding has broad bipartisan support because health centers operate in nearly every Congressional district — urban and rural, red and blue. Even members of Congress who oppose the ACA generally support FQHC funding because there are health centers in their districts.",
      es: "El Fondo de Centros de Salud Comunitarios enfrento un precipicio de financiamiento en 2019, con una reautorizacion bipartidista requerida para continuar los mas de $4 mil millones en financiamiento obligatorio anual de la Seccion 330. Despues de meses de incertidumbre y resoluciones continuas a corto plazo, el Congreso aprobo una reautorizacion bipartidista de dos anos. El debate anticipo las dinamicas que se repetirian en 2025-2026: el financiamiento de FQHC tiene amplio apoyo bipartidista porque los centros de salud operan en casi todos los distritos del Congreso — urbanos y rurales, rojos y azules. Incluso miembros del Congreso que se oponen a la ACA generalmente apoyan el financiamiento de FQHC porque hay centros de salud en sus distritos.",
    },
    impact: {
      en: "The reauthorization preserved funding for over 1,400 health centers serving 30 million patients. But the near-miss underscored the fragility of depending on Congress for periodic reauthorization — a vulnerability that the 2025-2026 expiration now threatens again.",
      es: "La reautorizacion preservo el financiamiento para mas de 1,400 centros de salud que atienden a 30 millones de pacientes. Pero el casi-fallo subrayo la fragilidad de depender del Congreso para reautorizaciones periodicas — una vulnerabilidad que la expiracion de 2025-2026 ahora amenaza nuevamente.",
    },
    category: "legislation",
    people: [],
    organizations: ["U.S. Congress", "NACHC", "California Primary Care Association"],
    location: "Federal",
    primarySourceUrl: "https://www.nachc.org/advocacy/community-health-center-fund/",
    primarySourceOrg: "NACHC",
    era: "aca-expansion",
  },

  /* ============================================================== */
  /*  ERA 5: CRISIS, RESILIENCE & NEW THREATS (2020-2026)           */
  /* ============================================================== */
  {
    id: "covid-fqhc-infrastructure",
    year: 2020,
    endYear: 2021,
    title: {
      en: "COVID-19 — FQHCs Become Vaccination Infrastructure",
      es: "COVID-19 — Los FQHCs Se Convierten en Infraestructura de Vacunacion",
    },
    description: {
      en: "When COVID-19 hit, FQHCs were on the frontlines — testing, treating, and eventually vaccinating the communities most impacted by the pandemic: low-income, immigrant, Black, Latino, and Asian communities. In California, FQHCs administered millions of vaccine doses in the hardest-hit neighborhoods, often operating drive-through and walk-up clinics in parking lots, churches, and community centers. They reached people that hospitals and pharmacies couldn't — or wouldn't. Bilingual staff, trusted community relationships built over decades, and locations in underserved neighborhoods made FQHCs the critical infrastructure for equitable vaccine distribution.",
      es: "Cuando llego el COVID-19, los FQHCs estaban en la primera linea — realizando pruebas, tratando y eventualmente vacunando a las comunidades mas impactadas por la pandemia: comunidades de bajos ingresos, inmigrantes, negras, latinas y asiaticas. En California, los FQHCs administraron millones de dosis de vacunas en los vecindarios mas afectados, a menudo operando clinicas en estacionamientos, iglesias y centros comunitarios. Llegaron a personas que los hospitales y farmacias no podian — o no querian — alcanzar. Personal bilingue, relaciones comunitarias de confianza construidas durante decadas y ubicaciones en vecindarios desatendidos hicieron de los FQHCs la infraestructura critica para la distribucion equitativa de vacunas.",
    },
    impact: {
      en: "COVID proved that FQHCs are essential public health infrastructure, not just primary care clinics. HRSA invested $6.1 billion in health centers through the American Rescue Plan, recognizing their irreplaceable role in reaching underserved communities during a crisis.",
      es: "COVID demostro que los FQHCs son infraestructura esencial de salud publica, no solo clinicas de atencion primaria. HRSA invirtio $6.1 mil millones en centros de salud a traves del Plan de Rescate Americano, reconociendo su papel irremplazable en alcanzar comunidades desatendidas durante una crisis.",
    },
    category: "expansion",
    people: [],
    organizations: ["California Primary Care Association (CPCA)", "HRSA", "California FQHCs"],
    location: "California (statewide)",
    primarySourceUrl: "https://bphc.hrsa.gov/emergency-response/coronavirus-health-center-data",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
    era: "crisis-resilience",
  },
  {
    id: "medi-cal-undocumented-adults-26-49",
    year: 2022,
    endYear: 2024,
    title: {
      en: "CA Extends Full Medi-Cal to Undocumented Adults 26-49 (First State)",
      es: "CA Extiende Medi-Cal Completo a Adultos Indocumentados 26-49 (Primer Estado)",
    },
    description: {
      en: "In a series of historic expansions, California extended full-scope Medi-Cal to undocumented adults aged 50 and older (May 2022), then to all remaining adults aged 26-49 (January 2024). California became the first state in the nation to offer full-scope Medicaid coverage to all income-eligible adults regardless of immigration status, completing the Health4All expansion that began with children in 2016. An estimated 700,000 undocumented adults in the final age group became eligible. This was the culmination of a decade-long grassroots campaign — and for FQHCs, it converted hundreds of thousands of uninsured patients to Medi-Cal.",
      es: "En una serie de expansiones historicas, California extendio Medi-Cal de alcance completo a adultos indocumentados de 50 anos o mas (mayo 2022), luego a todos los adultos restantes de 26 a 49 anos (enero 2024). California se convirtio en el primer estado de la nacion en ofrecer cobertura de Medi-Cal de alcance completo a todos los adultos elegibles por ingresos sin importar su estatus migratorio, completando la expansion Health4All que comenzo con ninos en 2016. Un estimado de 700,000 adultos indocumentados en el grupo de edad final se volvieron elegibles. Esta fue la culminacion de una campana de base de una decada — y para los FQHCs, convirtio a cientos de miles de pacientes sin seguro en pacientes de Medi-Cal.",
    },
    impact: {
      en: "The largest expansion of healthcare to undocumented immigrants in U.S. history. For FQHCs, it improved revenue while expanding access — but it also made the Medicaid cuts in H.R. 1 even more devastating for California, where newly covered patients could lose coverage.",
      es: "La mayor expansion de atencion medica a inmigrantes indocumentados en la historia de EE.UU. Para los FQHCs, mejoro los ingresos mientras expandia el acceso — pero tambien hizo que los recortes a Medicaid en H.R. 1 fueran aun mas devastadores para California, donde pacientes recien cubiertos podrian perder cobertura.",
    },
    category: "undocumented",
    people: [],
    organizations: ["California Legislature", "Health4All Coalition", "California Primary Care Association"],
    location: "California (statewide)",
    primarySourceUrl: "https://www.dhcs.ca.gov/services/medi-cal/eligibility/Pages/Medi-Cal-for-All.aspx",
    primarySourceOrg: "California Department of Health Care Services",
    era: "crisis-resilience",
  },
  {
    id: "medi-cal-all-ages",
    year: 2024,
    title: {
      en: "Full Medi-Cal to All Undocumented Adults Regardless of Age (SB 274/AB 4)",
      es: "Medi-Cal Completo para Todos los Adultos Indocumentados Sin Importar la Edad (SB 274/AB 4)",
    },
    description: {
      en: "With the final phase of expansion effective January 2024, California completed what no other state had done: full-scope Medicaid for every income-eligible adult regardless of immigration status. The remaining gap — adults 26 to 49 — was the largest cohort, with an estimated 700,000 newly eligible individuals. Many were longtime California workers: farmworkers in the Central Valley, restaurant and hotel employees in Los Angeles, construction workers in the Bay Area. They had worked in California for years or decades, paying taxes, raising families, and receiving no healthcare. FQHCs — the clinics born from farmworker organizing 60 years earlier — were finally able to serve these patients with full Medi-Cal coverage.",
      es: "Con la fase final de expansion efectiva en enero de 2024, California completo lo que ningun otro estado habia hecho: Medicaid de alcance completo para cada adulto elegible por ingresos sin importar su estatus migratorio. La brecha restante — adultos de 26 a 49 — era la cohorte mas grande, con un estimado de 700,000 individuos recien elegibles. Muchos eran trabajadores de larga data en California: campesinos en el Valle Central, empleados de restaurantes y hoteles en Los Angeles, trabajadores de construccion en el Bay Area. Habian trabajado en California por anos o decadas, pagando impuestos, criando familias y sin recibir atencion medica. Los FQHCs — las clinicas nacidas de la organizacion campesina 60 anos antes — finalmente podian servir a estos pacientes con cobertura completa de Medi-Cal.",
    },
    impact: {
      en: "Completed a 60-year arc from farmworker clinics serving undocumented patients for free to a state system covering every resident. But this progress now faces reversal: H.R. 1's Medicaid cuts could strip coverage from the very communities FQHCs were built to serve.",
      es: "Completo un arco de 60 anos desde las clinicas campesinas que atendian a pacientes indocumentados gratuitamente hasta un sistema estatal que cubre a cada residente. Pero este progreso ahora enfrenta una reversion: los recortes a Medicaid de H.R. 1 podrian quitar la cobertura a las mismas comunidades para las que se construyeron los FQHCs.",
    },
    category: "undocumented",
    people: [],
    organizations: ["California Legislature", "Department of Health Care Services"],
    location: "California (statewide)",
    primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB274",
    primarySourceOrg: "California Legislature",
    era: "crisis-resilience",
  },
  {
    id: "hr1-medicaid-cuts",
    year: 2025,
    title: {
      en: "H.R. 1 'One Big Beautiful Bill' Threatens Medicaid Work Requirements",
      es: "H.R. 1 'Un Gran Proyecto de Ley Hermoso' Amenaza con Requisitos de Trabajo en Medicaid",
    },
    description: {
      en: "The House passed H.R. 1, the 'One Big Beautiful Bill Act,' containing an estimated $880 billion in Medicaid cuts over 10 years — the largest cuts to the program in its 60-year history. The bill includes work requirements, increased verification burdens, restrictions on presumptive eligibility, and per capita cap provisions that would reduce federal funding to states. For California, with 15+ million Medi-Cal enrollees, the impact could be catastrophic. FQHCs, which derive over 40% of revenue from Medicaid, face an existential threat — the very funding model created by OBRA '89 and expanded by the ACA is at stake.",
      es: "La Camara aprobo H.R. 1, la 'Ley de un Gran Proyecto de Ley Hermoso,' conteniendo un estimado de $880 mil millones en recortes a Medicaid durante 10 anos — los mayores recortes al programa en sus 60 anos de historia. El proyecto incluye requisitos de trabajo, mayores cargas de verificacion, restricciones a la elegibilidad presunta y provisiones de limite per capita que reducirian el financiamiento federal a los estados. Para California, con mas de 15 millones de inscritos en Medi-Cal, el impacto podria ser catastrofico. Los FQHCs, que obtienen mas del 40% de sus ingresos de Medicaid, enfrentan una amenaza existencial — el mismo modelo de financiamiento creado por OBRA '89 y expandido por la ACA esta en juego.",
    },
    impact: {
      en: "If enacted, H.R. 1 could cause millions of Californians to lose Medi-Cal coverage. FQHCs would see massive revenue losses while absorbing newly uninsured patients. Sixty years of progress — from Cesar Chavez's farmworker clinics to the largest safety net in the nation — is at stake.",
      es: "Si se promulga, H.R. 1 podria causar que millones de californianos pierdan cobertura de Medi-Cal. Los FQHCs verian perdidas masivas de ingresos mientras absorben a pacientes recien sin seguro. Sesenta anos de progreso — desde las clinicas campesinas de Cesar Chavez hasta la red de seguridad mas grande de la nacion — estan en juego.",
    },
    category: "crisis",
    people: [],
    organizations: ["U.S. House of Representatives"],
    location: "Federal (California most impacted state)",
    primarySourceUrl: "https://www.cbo.gov/publication/61537",
    primarySourceOrg: "Congressional Budget Office",
    era: "crisis-resilience",
  },
  {
    id: "sb-525-healthcare-minimum-wage",
    year: 2025,
    title: {
      en: "SB 525 — $25/hr Healthcare Minimum Wage for FQHCs by 2027",
      es: "SB 525 — Salario Minimo de $25/hr para Trabajadores de Salud en FQHCs para 2027",
    },
    description: {
      en: "California's SB 525 established a phased healthcare worker minimum wage, with FQHCs reaching $25 per hour by June 2027. While the law aims to address healthcare worker shortages and improve retention, it creates a financial squeeze for FQHCs whose Medicaid reimbursement rates don't automatically increase to match higher labor costs. FQHCs must balance a mandate to pay workers more with revenue that's largely controlled by government reimbursement formulas. For the workers — many of them the same bilingual, mission-driven community members the FQHC movement was built by — the wage increase is overdue recognition of their essential role.",
      es: "La SB 525 de California establecio un salario minimo escalonado para trabajadores de salud, con los FQHCs alcanzando $25 por hora para junio de 2027. Mientras la ley busca abordar la escasez de trabajadores de salud y mejorar la retencion, crea una presion financiera para los FQHCs cuyas tarifas de reembolso de Medicaid no aumentan automaticamente para igualar los costos laborales mas altos. Los FQHCs deben equilibrar un mandato de pagar mas a los trabajadores con ingresos que estan en gran parte controlados por formulas de reembolso gubernamentales. Para los trabajadores — muchos de ellos los mismos miembros bilingues y orientados a la mision por los que se construyo el movimiento FQHC — el aumento salarial es un reconocimiento atrasado de su papel esencial.",
    },
    impact: {
      en: "SB 525 raises labor costs for FQHCs by an estimated 15-25% for support staff — at the same time that Medicaid cuts threaten revenue. The combination creates a financial vise that FQHCs must navigate through revenue diversification and operational efficiency.",
      es: "SB 525 aumenta los costos laborales para los FQHCs en un estimado de 15-25% para personal de apoyo — al mismo tiempo que los recortes a Medicaid amenazan los ingresos. La combinacion crea una prensa financiera que los FQHCs deben navegar a traves de la diversificacion de ingresos y la eficiencia operativa.",
    },
    category: "legislation",
    people: [],
    organizations: ["California Legislature", "California Primary Care Association"],
    location: "California (statewide)",
    primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525",
    primarySourceOrg: "California Legislature",
    era: "crisis-resilience",
  },
  {
    id: "chcf-authorization-expires",
    year: 2026,
    title: {
      en: "FQHC Community Health Center Fund Expires December 2026",
      es: "El Fondo de Centros de Salud Comunitarios Expira en Diciembre 2026",
    },
    description: {
      en: "The Community Health Center Fund (CHCF), which provides approximately $4.6 billion annually in mandatory funding to FQHCs through Section 330 grants, is set to expire in December 2026. This funding accounts for roughly 70% of all federal FQHC grant funding. Without reauthorization, health centers nationwide would face devastating cuts — NACHC estimates that over 2,400 sites could close, 60,000+ jobs could be lost, and 30+ million patients could lose access to care. Combined with the Medicaid cuts in H.R. 1, the CHCF expiration represents the gravest threat to community health centers since their founding in the 1960s.",
      es: "El Fondo de Centros de Salud Comunitarios (CHCF), que proporciona aproximadamente $4.6 mil millones anuales en financiamiento obligatorio a los FQHCs a traves de subvenciones de la Seccion 330, esta programado para expirar en diciembre de 2026. Este financiamiento representa aproximadamente el 70% de todo el financiamiento federal de subvenciones para FQHC. Sin reautorizacion, los centros de salud a nivel nacional enfrentarian recortes devastadores — NACHC estima que mas de 2,400 sitios podrian cerrar, mas de 60,000 empleos podrian perderse y mas de 30 millones de pacientes podrian perder acceso a la atencion. Combinado con los recortes a Medicaid en H.R. 1, la expiracion del CHCF representa la mayor amenaza para los centros de salud comunitarios desde su fundacion en los anos 1960.",
    },
    impact: {
      en: "The CHCF expiration and H.R. 1 Medicaid cuts together create a dual existential threat. If both materialize, the community health center system built over 60 years — from farmworker clinics to a $30B national infrastructure — could collapse in the states that need it most, starting with California.",
      es: "La expiracion del CHCF y los recortes a Medicaid de H.R. 1 juntos crean una doble amenaza existencial. Si ambas se materializan, el sistema de centros de salud comunitarios construido durante 60 anos — desde clinicas campesinas hasta una infraestructura nacional de $30 mil millones — podria colapsar en los estados que mas lo necesitan, empezando por California.",
    },
    category: "crisis",
    people: [],
    organizations: ["NACHC", "U.S. Congress"],
    location: "Federal (California most impacted state)",
    primarySourceUrl: "https://www.nachc.org/advocacy/community-health-center-fund/",
    primarySourceOrg: "NACHC",
    era: "crisis-resilience",
  },
];

/* ------------------------------------------------------------------ */
/*  Cross-Cultural Alliances                                           */
/* ------------------------------------------------------------------ */

export const CROSS_CULTURAL_ALLIANCES: CrossCulturalAlliance[] = [
  {
    id: "chavez-itliong",
    title: {
      en: "Cesar Chavez + Larry Itliong: Multiracial Farmworker Health",
      es: "Cesar Chavez + Larry Itliong: Salud Campesina Multirracial",
    },
    description: {
      en: "In September 1965, Larry Itliong — a Filipino labor leader who had been organizing since the 1930s — led his mostly Filipino AWOC members out on strike against Delano table grape growers. Eight days later, Cesar Chavez's predominantly Mexican NFWA voted to join. This Filipino-Latino alliance was radical: the growers had long exploited ethnic divisions to break strikes, pitting Filipino workers against Mexican workers. Itliong and Chavez refused to play that game. Healthcare was a core demand — farmworkers had no insurance, no access to clinics, and suffered chronic pesticide exposure. The eventual UFW contracts included health benefits for the first time.",
      es: "En septiembre de 1965, Larry Itliong — un lider laboral filipino que habia estado organizando desde la decada de 1930 — lidero a sus miembros de AWOC, mayoritariamente filipinos, a una huelga contra los productores de uva de mesa de Delano. Ocho dias despues, la NFWA predominantemente mexicana de Cesar Chavez voto unirse. Esta alianza filipino-latina fue radical: los productores habian explotado durante mucho tiempo las divisiones etnicas para romper huelgas. Itliong y Chavez se negaron a jugar ese juego. La atencion medica fue una demanda central — los campesinos no tenian seguro, ni acceso a clinicas, y sufrian exposicion cronica a pesticidas. Los contratos del UFW incluyeron beneficios de salud por primera vez.",
    },
    communities: ["Latino/Mexican", "Filipino American"],
    period: "1965-1975",
    keyFigures: [
      {
        name: "Larry Itliong",
        background: "Filipino American",
        contribution: {
          en: "Organized Filipino farmworkers and initiated the strike that created the multiracial farmworker movement. His insistence on unity broke the growers' divide-and-conquer strategy.",
          es: "Organizo a los campesinos filipinos e inicio la huelga que creo el movimiento campesino multirracial. Su insistencia en la unidad rompio la estrategia de dividir y conquistar de los productores.",
        },
      },
      {
        name: "Cesar Chavez",
        background: "Latino/Chicano",
        contribution: {
          en: "Joined Itliong's strike and led the combined movement through five years of boycotts to win the first farmworker contracts with health benefits.",
          es: "Se unio a la huelga de Itliong y lidero el movimiento combinado a traves de cinco anos de boicots para ganar los primeros contratos campesinos con beneficios de salud.",
        },
      },
      {
        name: "Philip Vera Cruz",
        background: "Filipino American",
        contribution: {
          en: "Served as UFW vice president for 14 years, ensuring Filipino workers' health and elder care needs were represented in the movement.",
          es: "Sirvio como vicepresidente del UFW por 14 anos, asegurando que las necesidades de salud de los trabajadores filipinos estuvieran representadas en el movimiento.",
        },
      },
    ],
    relevanceToFQHC: {
      en: "The farmworker health demands that emerged from this alliance led directly to farmworker health clinics across California — including Clinica de Salud del Pueblo (1969) and others that became some of the state's first FQHCs. The principle that health is a labor right continues to drive FQHC advocacy.",
      es: "Las demandas de salud campesina que surgieron de esta alianza llevaron directamente a clinicas de salud campesinas en toda California — incluyendo la Clinica de Salud del Pueblo (1969) y otras que se convirtieron en algunos de los primeros FQHCs del estado.",
    },
    primarySourceUrl: "https://www.nps.gov/articles/000/larry-itliong.htm",
    primarySourceOrg: "National Park Service",
  },
  {
    id: "black-panther-clinics",
    title: {
      en: "Black Panther Free Clinics: Community Control as Healthcare Policy",
      es: "Clinicas Gratuitas de los Panteras Negras: Control Comunitario como Politica de Salud",
    },
    description: {
      en: "The Black Panther Party's People's Free Medical Clinics, launched in Oakland in 1969, were a political statement that communities had the right to control their own healthcare. The Panthers recruited volunteer doctors and nurses, ran sickle cell testing (which the government had neglected), and provided care in neighborhoods abandoned by the medical establishment. Their model — healthcare governed by the community it serves — directly influenced the federal requirement that FQHC boards must be at least 51% patients.",
      es: "Las Clinicas Medicas Gratuitas del Pueblo del Partido Pantera Negra, lanzadas en Oakland en 1969, fueron una declaracion politica de que las comunidades tenian derecho a controlar su propia atencion medica. Los Panteras reclutaron medicos y enfermeras voluntarios, realizaron pruebas de celulas falciformes (que el gobierno habia descuidado) y proporcionaron atencion en vecindarios abandonados por el establecimiento medico. Su modelo — atencion medica gobernada por la comunidad a la que sirve — influyo directamente en el requisito federal de que las juntas de FQHC deben ser al menos 51% pacientes.",
    },
    communities: ["African American"],
    period: "1969-1975",
    keyFigures: [
      {
        name: "Bobby Seale",
        background: "African American",
        contribution: {
          en: "Established the Survival Programs framework that positioned healthcare as a community right, not a government benefit.",
          es: "Establecio el marco de Programas de Supervivencia que posiciono la atencion medica como un derecho comunitario, no un beneficio gubernamental.",
        },
      },
      {
        name: "Huey P. Newton",
        background: "African American",
        contribution: {
          en: "Articulated the connection between systemic racism, poverty, and health outcomes — ideas later codified as 'social determinants of health.'",
          es: "Articulo la conexion entre racismo sistemico, pobreza y resultados de salud — ideas luego codificadas como 'determinantes sociales de la salud.'",
        },
      },
    ],
    relevanceToFQHC: {
      en: "The Panthers' insistence on community control became federal law: every FQHC must have a patient-majority board. Their sickle cell program led to the National Sickle Cell Anemia Control Act of 1972. The free clinic model demonstrated that community-driven healthcare delivery was viable — the core principle of every FQHC.",
      es: "La insistencia de los Panteras en el control comunitario se convirtio en ley federal: cada FQHC debe tener una junta con mayoria de pacientes. Su programa de celulas falciformes llevo a la Ley Nacional de Control de Anemia de Celulas Falciformes de 1972. El modelo de clinica gratuita demostro que la prestacion de salud impulsada por la comunidad era viable.",
    },
    primarySourceUrl: "https://www.nlm.nih.gov/exhibition/forallthepeople/exhibition-community-health-centers.html",
    primarySourceOrg: "National Library of Medicine",
  },
  {
    id: "geiger-mound-bayou",
    title: {
      en: "Dr. Jack Geiger: A White Physician Who Changed American Healthcare",
      es: "Dr. Jack Geiger: Un Medico Blanco Que Cambio la Atencion Medica Estadounidense",
    },
    description: {
      en: "H. Jack Geiger was a white Jewish physician from New York who, as a teenager, snuck into Harlem jazz clubs and was mentored by African American intellectuals. He studied community medicine in apartheid-era South Africa under Dr. Sidney Kark at the Pholela Health Centre, where he learned that treating poverty and racism was as important as treating disease. In 1965, he convinced the OEO to fund two health centers. At Mound Bayou, Mississippi — the poorest Black community in America — he used clinic funds to buy food for starving patients, telling federal auditors: 'The last time I checked, hunger was a medical condition.' His model became the template for every community health center in America.",
      es: "H. Jack Geiger fue un medico judio blanco de Nueva York que, de adolescente, se colaba en clubes de jazz de Harlem y fue mentoreado por intelectuales afroamericanos. Estudio medicina comunitaria en Sudafrica durante el apartheid bajo el Dr. Sidney Kark en el Centro de Salud Pholela, donde aprendio que tratar la pobreza y el racismo era tan importante como tratar la enfermedad. En 1965, convencio a la OEO de financiar dos centros de salud. En Mound Bayou, Mississippi — la comunidad negra mas pobre de Estados Unidos — uso fondos de la clinica para comprar alimentos para pacientes hambrientos, diciendole a los auditores federales: 'La ultima vez que revise, el hambre era una condicion medica.' Su modelo se convirtio en la plantilla para cada centro de salud comunitario en Estados Unidos.",
    },
    communities: ["Jewish American", "African American"],
    period: "1964-1990",
    keyFigures: [
      {
        name: "Dr. H. Jack Geiger",
        background: "Jewish American",
        contribution: {
          en: "Designed and built the community health center model from his experience in apartheid South Africa, proving that clinics could address social determinants of health decades before the term existed.",
          es: "Diseno y construyo el modelo de centro de salud comunitario a partir de su experiencia en Sudafrica durante el apartheid, demostrando que las clinicas podian abordar los determinantes sociales de la salud decadas antes de que existiera el termino.",
        },
      },
      {
        name: "Dr. Aaron Shirley",
        background: "African American",
        contribution: {
          en: "First Black physician to complete residency in Mississippi, partnered with Geiger to build Delta health infrastructure.",
          es: "Primer medico negro en completar la residencia en Mississippi, se asocio con Geiger para construir la infraestructura de salud del Delta.",
        },
      },
      {
        name: "Dr. Sidney Kark",
        background: "Jewish South African",
        contribution: {
          en: "Created the community-oriented primary care model in apartheid-era South Africa that Geiger adapted for America.",
          es: "Creo el modelo de atencion primaria orientada a la comunidad en Sudafrica durante el apartheid que Geiger adapto para Estados Unidos.",
        },
      },
    ],
    relevanceToFQHC: {
      en: "Every FQHC in America operates on Geiger's model: community governance, sliding fee scale, comprehensive care, care regardless of ability to pay. His phrase 'hunger is a medical condition' anticipated the social determinants of health framework by 50 years.",
      es: "Cada FQHC en Estados Unidos opera bajo el modelo de Geiger: gobernanza comunitaria, escala de tarifas deslizante, atencion integral, atencion sin importar la capacidad de pago. Su frase 'el hambre es una condicion medica' anticipo el marco de determinantes sociales de la salud por 50 anos.",
    },
    primarySourceUrl: "https://www.milbank.org/quarterly/articles/the-first-community-health-centers-a-model-of-enduring-value/",
    primarySourceOrg: "Milbank Memorial Fund",
  },
  {
    id: "rfk-delano",
    title: {
      en: "Robert Kennedy's Delano Visit: When a Senator Saw the Crisis",
      es: "La Visita de Robert Kennedy a Delano: Cuando un Senador Vio la Crisis",
    },
    description: {
      en: "In March 1966, Senator Robert F. Kennedy traveled to Delano, California, as part of the Senate Subcommittee on Migratory Labor hearings. He witnessed firsthand the health conditions farmworkers endured — pesticide exposure without protective equipment, contaminated drinking water, children with untreated illnesses, pregnant women with no prenatal care. His nationally televised exchange with the Kern County Sheriff — 'Can I suggest that in the interim period of time... that the Sheriff and the District Attorney read the Constitution of the United States?' — brought the farmworkers' plight to millions of American living rooms. Kennedy broke bread with Cesar Chavez and built a political alliance that would secure federal attention for migrant health.",
      es: "En marzo de 1966, el Senador Robert F. Kennedy viajo a Delano, California, como parte de las audiencias del Subcomite del Senado sobre Trabajo Migratorio. Fue testigo directo de las condiciones de salud que sufrian los campesinos — exposicion a pesticidas sin equipo protector, agua potable contaminada, ninos con enfermedades no tratadas, mujeres embarazadas sin atencion prenatal. Su intercambio televisado a nivel nacional con el Sheriff del Condado de Kern — 'Puedo sugerir que en el periodo intermedio... el Sheriff y el Fiscal del Distrito lean la Constitucion de los Estados Unidos?' — llevo la situacion de los campesinos a millones de hogares estadounidenses.",
    },
    communities: ["Latino/Mexican", "White (political ally)"],
    period: "1966-1968",
    keyFigures: [
      {
        name: "Robert F. Kennedy",
        background: "White",
        contribution: {
          en: "Used his political platform to amplify farmworker health conditions to a national audience, building political will for federal migrant health funding.",
          es: "Uso su plataforma politica para amplificar las condiciones de salud de los campesinos a una audiencia nacional, construyendo la voluntad politica para el financiamiento federal de salud migratoria.",
        },
      },
      {
        name: "Cesar Chavez",
        background: "Latino/Chicano",
        contribution: {
          en: "Leveraged Kennedy's visit to build the political coalition that would secure federal support for farmworker health programs.",
          es: "Aprovecho la visita de Kennedy para construir la coalicion politica que aseguraria el apoyo federal para programas de salud campesinos.",
        },
      },
    ],
    relevanceToFQHC: {
      en: "Kennedy's advocacy helped build bipartisan support for Migrant Health Act funding that created farmworker health clinics across California. His framing of farmworker health as a moral issue set the tone for how FQHCs would be defended in Congress for decades.",
      es: "La defensa de Kennedy ayudo a construir apoyo bipartidista para el financiamiento de la Ley de Salud Migratoria que creo clinicas de salud campesinas en toda California. Su enfoque de la salud campesina como un tema moral establecio el tono de como se defenderian los FQHCs en el Congreso.",
    },
    primarySourceUrl: "https://www.senate.gov/about/powers-procedures/investigations/20th-century/migrant-labor.htm",
    primarySourceOrg: "United States Senate Historical Office",
  },
  {
    id: "asian-mutual-aid",
    title: {
      en: "Asian Immigrant Mutual Aid Societies Become Asian Health Services",
      es: "Las Sociedades de Ayuda Mutua de Inmigrantes Asiaticos Se Convierten en Asian Health Services",
    },
    description: {
      en: "When Asian Health Services opened in Oakland's Chinatown in 1974, it emerged from a tradition older than America itself: immigrant mutual aid. Chinese, Vietnamese, Korean, and other Asian communities had always organized to take care of their own — burial societies, rotating credit associations, language classes, and informal healthcare. When the formal medical system turned immigrants away because no one spoke their language, community volunteers organized interpretation services and eventually a clinic. AHS pioneered the use of community health workers from the communities they served and demonstrated that language access was a health equity issue.",
      es: "Cuando Asian Health Services abrio en el Chinatown de Oakland en 1974, surgio de una tradicion mas antigua que Estados Unidos: la ayuda mutua inmigrante. Las comunidades chinas, vietnamitas, coreanas y otras comunidades asiaticas siempre se habian organizado para cuidar de los suyos — sociedades funerarias, asociaciones de credito rotativo, clases de idioma y atencion medica informal. Cuando el sistema medico formal rechazaba a los inmigrantes porque nadie hablaba su idioma, voluntarios comunitarios organizaron servicios de interpretacion y eventualmente una clinica. AHS fue pionera en el uso de trabajadores comunitarios de salud de las comunidades que servian y demostro que el acceso linguistico era un tema de equidad en salud.",
    },
    communities: ["Chinese American", "Vietnamese American", "Korean American", "Other Asian/Pacific Islander"],
    period: "1974-present",
    keyFigures: [],
    relevanceToFQHC: {
      en: "AHS proved that culturally competent, multilingual healthcare isn't a luxury — it's essential for health equity. Their model influenced federal FQHC requirements for language access and cultural competency. Today AHS serves 50,000+ patients in 14+ languages.",
      es: "AHS demostro que la atencion medica cultural y multilingue no es un lujo — es esencial para la equidad en salud. Su modelo influyo en los requisitos federales de FQHC para acceso linguistico y competencia cultural. Hoy AHS atiende a mas de 50,000 pacientes en mas de 14 idiomas.",
    },
    primarySourceUrl: "https://www.asianhealthservices.org/who-we-are",
    primarySourceOrg: "Asian Health Services",
  },
  {
    id: "bush-fqhc",
    title: {
      en: "George W. Bush: A Conservative Voice in a Bipartisan Coalition for Community Health",
      es: "George W. Bush: Una Voz Conservadora en una Coalicion Bipartidista para la Salud Comunitaria",
    },
    description: {
      en: "In 2002, President George W. Bush — a conservative Republican who opposed universal healthcare — launched the most ambitious expansion of community health centers since their creation. His Health Center Growth Initiative pledged 1,200 new or expanded sites and served 6.1 million new patients. By the end of his presidency, FQHC funding had more than doubled. Bush's motivation was partly pragmatic: FQHCs operate in rural districts that vote Republican, where they're often the only healthcare option. But he also genuinely argued that 'healthcare should be affordable, available, and accessible to all.' The irony is powerful: the president most associated with conservative healthcare policy became the biggest champion of the safety net.",
      es: "En 2002, el Presidente George W. Bush — un republicano conservador que se oponia a la cobertura de salud universal — lanzo la expansion mas ambiciosa de centros de salud comunitarios desde su creacion. Su Iniciativa de Crecimiento de Centros de Salud se comprometio a 1,200 sitios nuevos o expandidos y atendio a 6.1 millones de nuevos pacientes. Al final de su presidencia, el financiamiento de FQHC se habia mas que duplicado. La motivacion de Bush fue en parte pragmatica: los FQHCs operan en distritos rurales que votan republicano, donde a menudo son la unica opcion de salud. Pero tambien argumento genuinamente que 'la atencion medica debe ser accesible, disponible y asequible para todos.'",
    },
    communities: ["Rural conservative communities", "Urban underserved communities"],
    period: "2001-2008",
    keyFigures: [
      {
        name: "George W. Bush",
        background: "White",
        contribution: {
          en: "Doubled FQHC funding, making community health centers one of the few bipartisan priorities in healthcare. His initiative served 6.1 million new patients.",
          es: "Duplico el financiamiento de FQHC, haciendo de los centros de salud comunitarios una de las pocas prioridades bipartidistas en salud. Su iniciativa atendio a 6.1 millones de nuevos pacientes.",
        },
      },
    ],
    relevanceToFQHC: {
      en: "Bush's expansion proved that FQHCs transcend partisan politics. This bipartisan legacy is what FQHC advocates invoke when fighting H.R. 1 cuts: FQHCs were built by both parties, and both parties' constituents depend on them.",
      es: "La expansion de Bush demostro que los FQHCs trascienden la politica partidista. Este legado bipartidista es lo que los defensores de FQHC invocan al luchar contra los recortes de H.R. 1: los FQHCs fueron construidos por ambos partidos.",
    },
    primarySourceUrl: "https://georgewbush-whitehouse.archives.gov/infocus/healthcare/",
    primarySourceOrg: "George W. Bush White House Archives",
  },
  {
    id: "jewish-physicians-freedom",
    title: {
      en: "Jewish Physicians in the Civil Rights Health Movement",
      es: "Medicos Judios en el Movimiento de Salud de los Derechos Civiles",
    },
    description: {
      en: "Jewish American physicians played a disproportionate role in founding the community health center movement. Dr. H. Jack Geiger — inspired by both the civil rights movement and the Jewish tradition of tikkun olam (repairing the world) — designed the CHC model. During Freedom Summer in 1964, Jewish medical students and physicians volunteered at health clinics for civil rights workers in Mississippi. Many early community health center medical directors were Jewish physicians who left prestigious positions to work in underserved communities. This alliance between Jewish and African American communities, forged in the civil rights era, built the healthcare infrastructure that serves millions today.",
      es: "Los medicos judios estadounidenses jugaron un papel desproporcionado en la fundacion del movimiento de centros de salud comunitarios. El Dr. H. Jack Geiger — inspirado tanto por el movimiento de derechos civiles como por la tradicion judia de tikkun olam (reparar el mundo) — diseno el modelo CHC. Durante el Verano de la Libertad en 1964, estudiantes de medicina y medicos judios se ofrecieron como voluntarios en clinicas de salud para trabajadores de derechos civiles en Mississippi. Muchos directores medicos tempranos de centros de salud comunitarios eran medicos judios que dejaron posiciones prestigiosas para trabajar en comunidades desatendidas.",
    },
    communities: ["Jewish American", "African American"],
    period: "1964-1980",
    keyFigures: [
      {
        name: "Dr. H. Jack Geiger",
        background: "Jewish American",
        contribution: {
          en: "Applied the Jewish tradition of tikkun olam and his South African community health training to create the CHC model in the American Deep South.",
          es: "Aplico la tradicion judia de tikkun olam y su formacion en salud comunitaria sudafricana para crear el modelo CHC en el sur profundo de Estados Unidos.",
        },
      },
    ],
    relevanceToFQHC: {
      en: "The Jewish-Black alliance in the civil rights health movement produced the community health center model itself. The tikkun olam principle aligns directly with the FQHC mission of serving everyone regardless of ability to pay, immigration status, or insurance.",
      es: "La alianza judio-afroamericana en el movimiento de salud de derechos civiles produjo el modelo mismo de centro de salud comunitario. El principio de tikkun olam se alinea directamente con la mision del FQHC de servir a todos sin importar la capacidad de pago o el estatus migratorio.",
    },
    primarySourceUrl: "https://www.rchnfoundation.org/wp-content/uploads/2016/11/George-Washington-University-The-Origins-of-Community-Health-Centers.pdf",
    primarySourceOrg: "RCHN Community Health Foundation / George Washington University",
  },
  {
    id: "rural-conservatives",
    title: {
      en: "Rural Conservatives Who Defend FQHCs Against Their Own Party",
      es: "Conservadores Rurales Que Defienden los FQHCs Contra Su Propio Partido",
    },
    description: {
      en: "In the H.R. 1 debates of 2025, something surprising emerged: Republican House members from rural districts pushed back against the deepest Medicaid cuts, because FQHCs are often the only healthcare in their districts. In rural areas from California's Central Valley to Appalachia, FQHCs serve communities where the nearest hospital may be 50+ miles away. These are heavily Republican districts with large agricultural economies and significant uninsured populations. The coalition defending FQHCs now includes rural hospitals, farm bureaus, conservative churches, and Republican representatives who know that cutting FQHC funding means cutting healthcare for their own voters.",
      es: "En los debates de H.R. 1 de 2025, algo sorprendente surgio: miembros republicanos de la Camara de distritos rurales resistieron los recortes mas profundos a Medicaid, porque los FQHCs son a menudo la unica atencion medica en sus distritos. En areas rurales desde el Valle Central de California hasta los Apalaches, los FQHCs sirven a comunidades donde el hospital mas cercano puede estar a mas de 80 km. Estos son distritos fuertemente republicanos con grandes economias agricolas y poblaciones significativas sin seguro. La coalicion que defiende a los FQHCs ahora incluye hospitales rurales, oficinas agricolas, iglesias conservadoras y representantes republicanos que saben que recortar el financiamiento de FQHC significa recortar la atencion medica para sus propios votantes.",
    },
    communities: ["Rural conservative communities", "Agricultural workers", "Urban underserved communities"],
    period: "2025-present",
    keyFigures: [],
    relevanceToFQHC: {
      en: "The cross-partisan defense of FQHCs during H.R. 1 demonstrates that community health centers have become essential infrastructure that transcends ideology. FQHCs serve 30+ million Americans in red and blue districts alike — the farmworker clinics that Chavez and Itliong fought for now serve everyone.",
      es: "La defensa transpartidista de los FQHCs durante H.R. 1 demuestra que los centros de salud comunitarios se han convertido en infraestructura esencial que trasciende la ideologia. Los FQHCs atienden a mas de 30 millones de estadounidenses en distritos rojos y azules por igual.",
    },
    primarySourceUrl: "https://www.nachc.org/advocacy/",
    primarySourceOrg: "NACHC",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                   */
/* ------------------------------------------------------------------ */

export function getEventsByEra(eraId: string): TimelineEvent[] {
  return MOVEMENT_EVENTS.filter((event) => event.era === eraId);
}

export function getEventsByCategory(category: MovementCategory): TimelineEvent[] {
  return MOVEMENT_EVENTS.filter((event) => event.category === category);
}

export function getEventById(id: string): TimelineEvent | undefined {
  return MOVEMENT_EVENTS.find((event) => event.id === id);
}

export function getAllPeople(): TimelinePerson[] {
  const peopleMap = new Map<string, TimelinePerson>();

  for (const event of MOVEMENT_EVENTS) {
    for (const person of event.people) {
      if (!peopleMap.has(person.name)) {
        peopleMap.set(person.name, person);
      }
    }
  }

  return Array.from(peopleMap.values());
}

export function getAllianceById(id: string): CrossCulturalAlliance | undefined {
  return CROSS_CULTURAL_ALLIANCES.find((alliance) => alliance.id === id);
}

export function getTimelineRange(): { minYear: number; maxYear: number } {
  const years = MOVEMENT_EVENTS.map((e) => e.year);
  const endYears = MOVEMENT_EVENTS.filter((e) => e.endYear).map((e) => e.endYear!);
  return {
    minYear: Math.min(...years),
    maxYear: Math.max(...years, ...endYears),
  };
}
