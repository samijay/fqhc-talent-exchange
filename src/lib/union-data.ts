// union-data.ts
// Comprehensive union data for California FQHCs, union directory, and healthcare labor history
// Sources cited inline — all data from public records, union websites, NLRB filings, and news coverage
// Last updated: 2026-04-08

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface UnionProfile {
  id: string;
  name: string;
  abbreviation: string;
  esName: string;
  website: string;
  organizeUrl: string | null;
  description: { en: string; es: string };
  membership: string; // approximate
  headquartersCity: string;
  parentOrg: string | null;
  rolesRepresented: string[];
  fqhcsRepresented: string[]; // slugs from california-fqhcs.ts
  recentNews: UnionNewsItem[];
  contactPhone: string | null;
  contactEmail: string | null;
  logoColor: string; // tailwind color for badges
}

export interface UnionNewsItem {
  date: string; // ISO date
  title: { en: string; es: string };
  summary: { en: string; es: string };
  sourceUrl: string;
  sourceTitle: string;
  /** True for positive outcomes: ratifications, organizing wins, pay raises */
  isWin?: boolean;
}

export interface LaborTimelineEvent {
  id: string;
  year: number;
  date: string | null; // ISO date or null for year-only
  title: { en: string; es: string };
  description: { en: string; es: string };
  significance: { en: string; es: string };
  category: "founding" | "strike" | "legislation" | "organizing" | "civil_rights" | "milestone";
  region: "national" | "california" | "fqhc";
  sources: { title: string; url: string }[];
}

export interface CuratedResource {
  id: string;
  title: string;
  author: string;
  type: "book" | "article" | "documentary" | "podcast" | "report" | "website" | "archive";
  year: number | string;
  url: string | null;
  publisher: string;
  description: { en: string; es: string };
  topics: string[]; // e.g., ["labor history", "community health centers", "civil rights"]
  featured: boolean;
}

/* ------------------------------------------------------------------ */
/*  Union Directory — Unions Active at California FQHCs                */
/* ------------------------------------------------------------------ */

export const UNION_DIRECTORY: UnionProfile[] = [
  {
    id: "seiu-uhw",
    name: "SEIU United Healthcare Workers West",
    abbreviation: "SEIU-UHW",
    esName: "SEIU Trabajadores Unidos de Salud del Oeste",
    website: "https://www.seiu-uhw.org",
    organizeUrl: "https://www.seiu-uhw.org/contact/",
    description: {
      en: "The largest healthcare union in the western United States, representing over 95,000 healthcare workers across California — including hospital workers, clinic staff, nursing home employees, and home health aides. SEIU-UHW has been a driving force behind California's $25/hour healthcare minimum wage (SB 525) and the Community Clinic Accountability ballot initiative.",
      es: "El sindicato de salud más grande del oeste de Estados Unidos, representando a más de 95,000 trabajadores de salud en toda California — incluyendo trabajadores de hospitales, personal de clínicas, empleados de hogares de ancianos y asistentes de salud a domicilio.",
    },
    membership: "95,000+",
    headquartersCity: "Oakland, CA",
    parentOrg: "SEIU International",
    rolesRepresented: [
      "Medical Assistants",
      "Nursing Assistants (CNAs)",
      "Dietary & Environmental Services",
      "Respiratory Care Practitioners",
      "Lab Technicians",
      "Pharmacy Technicians",
      "Patient Services Representatives",
      "Administrative Staff",
      "Home Health Aides",
    ],
    fqhcsRepresented: ["altamed-health-services", "baywell-health"], // AltaMed: frontline staff unionized, but management funds Protect Patients CA opposing ballot initiatives. Baywell: confirmed LMCC member.
    recentNews: [
      {
        date: "2026-04-03",
        title: {
          en: "SEIU-UHW Submits Signatures for 90% Mission Spend + $450K Exec Pay Cap Ballot Measures",
          es: "SEIU-UHW Presenta Firmas para Medidas Electorales de 90% Gasto en Misión + Tope de $450K",
        },
        summary: {
          en: "SEIU-UHW submitted signatures for both California ballot initiatives: #25-0008 (requiring FQHCs to spend 90% of revenue on patient care) and #25-0009 (capping healthcare executive pay at $450K). Signature verification deadline: June 25, 2026. CMA, CPCA, and CCALAC oppose, warning of clinic closures.",
          es: "SEIU-UHW presentó firmas para ambas iniciativas: #25-0008 (90% de ingresos en atención al paciente) y #25-0009 (tope salarial de $450K). Fecha límite de verificación: 25 de junio. CMA, CPCA y CCALAC se oponen.",
        },
        sourceUrl: "https://news.ballotpedia.org/2026/04/03/seiu-uhw-submits-signatures-for-california-ballot-initiatives-capping-executive-pay-and-requiring-clinics-to-spend-90-on-patient-care/",
        sourceTitle: "Ballotpedia",
      },
      {
        date: "2026-03-17",
        title: {
          en: "NLRB ALJ Hearing Begins in Innercare Forced Recognition Case",
          es: "Audiencia del Juez Administrativo Comienza en Caso de Reconocimiento Forzado de Innercare",
        },
        summary: {
          en: "Administrative law judge hearing began in San Diego for the NLRB case against Innercare (Clinicas de Salud del Pueblo). NLRB seeks forced union recognition based on 30+ ULP charges and 11 terminated workers during the 2024 organizing campaign. SEIU-UHW alleges Innercare spent $500K+ on anti-union consultants (Reliant Labor Consultants).",
          es: "Audiencia del juez administrativo comenzó en San Diego para el caso del NLRB contra Innercare. El NLRB busca reconocimiento sindical forzado basado en 30+ cargos de prácticas laborales injustas y 11 trabajadores despedidos.",
        },
        sourceUrl: "https://www.thedesertreview.com/business/nlrb-complaint-against-innercare-sets-stage-for-2026-hearing-as-organization-denies-allegations/article_c29d43e5-c7fe-4095-8749-f7f4839010f8.html",
        sourceTitle: "The Desert Review",
      },
      {
        date: "2025-11-11",
        title: {
          en: "Community Clinic Accountability Ballot Measure Reaches 25% of Required Signatures",
          es: "Medida de Responsabilidad de Clínicas Comunitarias Alcanza 25% de Firmas Requeridas",
        },
        summary: {
          en: "The Clinic Funding Accountability and Transparency Act, backed by SEIU-UHW, would require FQHCs to devote at least 90% of revenue to direct patient care. The initiative is heading toward the November 2026 ballot.",
          es: "La Ley de Responsabilidad y Transparencia de Financiamiento de Clínicas requeriría que los FQHCs dediquen al menos el 90% de los ingresos a la atención directa al paciente.",
        },
        sourceUrl: "https://www.seiu-uhw.org/press/community-clinic-accountability-ballot-measure-reaches-25-of-required-signatures-as-statewide-support-builds/",
        sourceTitle: "SEIU-UHW Press Release",
      },
    ],
    contactPhone: "(510) 251-1250",
    contactEmail: null,
    logoColor: "purple",
  },
  {
    id: "seiu-1021",
    name: "SEIU Local 1021",
    abbreviation: "SEIU 1021",
    esName: "SEIU Local 1021",
    website: "https://www.seiu1021.org",
    organizeUrl: "https://www.seiu1021.org/join",
    description: {
      en: "Represents nearly 60,000 employees in local governments, non-profit agencies, healthcare programs, and schools throughout Northern California. SEIU 1021 has a strong presence at Bay Area community health centers, including La Clinica de la Raza and Asian Health Services, where members have won significant contract victories.",
      es: "Representa a casi 60,000 empleados en gobiernos locales, agencias sin fines de lucro, programas de salud y escuelas en todo el norte de California. SEIU 1021 tiene una fuerte presencia en centros de salud comunitarios del Área de la Bahía.",
    },
    membership: "60,000+",
    headquartersCity: "Oakland, CA",
    parentOrg: "SEIU International",
    rolesRepresented: [
      "Medical Assistants",
      "Nursing Staff",
      "Mental Health Counselors",
      "Dental Staff",
      "Patient Services Representatives",
      "Case Managers",
      "Community Health Workers",
      "Administrative Staff",
      "Medical Clinic Technicians",
    ],
    fqhcsRepresented: [
      "la-clinica-de-la-raza",
      "asian-health-services",
      "west-oakland-health-council",
      "healthright-360", // 850+ workers organized Dec 2023, first contract ratified 2024 (Bay Area portion — also SEIU 721 in LA, SEIU 221 in SD)
    ],
    recentNews: [
      {
        date: "2024-06-01",
        title: {
          en: "HealthRIGHT 360 Workers Ratify First Union Contract by 98% — 13%+ Raises",
          es: "Trabajadores de HealthRIGHT 360 Ratifican Primer Contrato Sindical por 98% — Aumentos de 13%+",
        },
        summary: {
          en: "850+ workers at HealthRIGHT 360 (100+ clinics statewide) ratified their first CBA with 98% approval. The contract includes 13%+ raises and a $20/hr minimum rising to $21. Workers joined SEIU 1021 (Bay Area), 721 (LA), and 221 (San Diego).",
          es: "Más de 850 trabajadores en HealthRIGHT 360 (100+ clínicas) ratificaron su primer contrato con 98% de aprobación. Incluye aumentos de 13%+ y mínimo de $20→$21/hora.",
        },
        sourceUrl: "https://www.seiu1021.org/article/healthright-360-members-ratify-strong-statewide-contract",
        sourceTitle: "SEIU 1021",
      },
      {
        date: "2023-09-25",
        title: {
          en: "Asian Health Services Workers Win Historic Contract with 21% Average Raise",
          es: "Trabajadores de Asian Health Services Ganan Contrato Histórico con Aumento Promedio del 21%",
        },
        summary: {
          en: "After voting unanimously to authorize a strike, over 300 SEIU 1021 members at Asian Health Services in Oakland's Chinatown won a three-year contract raising wages by an average of 21%, with a $25/hour minimum by July 2024.",
          es: "Después de votar unánimemente para autorizar una huelga, más de 300 miembros de SEIU 1021 en Asian Health Services ganaron un contrato de tres años con aumentos salariales promedio del 21%.",
        },
        sourceUrl: "https://oaklandside.org/2023/09/25/asian-health-services-oakland-new-contract-higher-pay-strike/",
        sourceTitle: "The Oaklandside",
      },
      {
        date: "2023-12-16",
        title: {
          en: "La Clinica de la Raza Workers Picket Across East Bay Over Understaffing",
          es: "Trabajadores de La Clínica de la Raza Protestan en el Este de la Bahía por Falta de Personal",
        },
        summary: {
          en: "Hundreds of La Clínica workers picketed across nearly a dozen sites, protesting 189 unfilled positions (15% vacancy rate), executive pay exceeding $250K, and use of $34M in pandemic funds for management positions rather than frontline staff.",
          es: "Cientos de trabajadores de La Clínica protestaron en casi una docena de sitios, denunciando 189 posiciones vacantes, salarios ejecutivos que superan $250K, y uso de fondos de pandemia para puestos gerenciales.",
        },
        sourceUrl: "https://www.seiu1021.org/article/la-clinica-de-la-raza-workers-will-picket-across-east-bay-during-lunchtime-monday-december",
        sourceTitle: "SEIU 1021",
      },
    ],
    contactPhone: "(510) 350-1021",
    contactEmail: null,
    logoColor: "blue",
  },
  {
    id: "seiu-521",
    name: "SEIU Local 521",
    abbreviation: "SEIU 521",
    esName: "SEIU Local 521",
    website: "https://www.seiu521.org",
    organizeUrl: null,
    description: {
      en: "Represents nearly 53,000 public and non-profit workers on the Central Coast, in the Central Valley, and throughout Silicon Valley. SEIU 521 partners with community health centers like Gardner Health Services to advocate for clinic worker retention and state funding.",
      es: "Representa a casi 53,000 trabajadores públicos y sin fines de lucro en la Costa Central, el Valle Central y Silicon Valley. SEIU 521 se asocia con centros de salud comunitarios como Gardner Health Services.",
    },
    membership: "53,000+",
    headquartersCity: "San Jose, CA",
    parentOrg: "SEIU International",
    rolesRepresented: [
      "Community Health Workers",
      "Medical Assistants",
      "Patient Services Representatives",
      "Case Managers",
      "Administrative Staff",
    ],
    fqhcsRepresented: [
      "gardner-health-services",
      "clinica-de-salud-del-valle-de-salinas", // ~150 workers, neutrality agreement, farmworker families
      "salud-para-la-gente", // Santa Cruz/Watsonville, LMCC member
    ],
    recentNews: [
      {
        date: "2024-01-01",
        title: {
          en: "Clinica de Salud del Valle de Salinas Workers Organize via Neutrality Agreement",
          es: "Trabajadores de Clínica de Salud del Valle de Salinas se Organizan vía Acuerdo de Neutralidad",
        },
        summary: {
          en: "Approximately 150 medical assistants, dental assistants, and medical records clerks at Clinica de Salud del Valle de Salinas (Monterey County) organized with SEIU 521 through a neutrality agreement. The clinic serves farmworker families in the Salinas Valley.",
          es: "Aproximadamente 150 asistentes médicos, asistentes dentales y archivistas médicos en la Clínica de Salud del Valle de Salinas se organizaron con SEIU 521 a través de un acuerdo de neutralidad.",
        },
        sourceUrl: "https://www.seiu521.org/521-news/clinica-de-salud/",
        sourceTitle: "SEIU Local 521",
      },
      {
        date: "2023-09-01",
        title: {
          en: "SEIU Clinic Workers Secure $1,000 Retention Bonuses for 70,000 Frontline Workers",
          es: "Trabajadores de Clínicas SEIU Aseguran Bonos de Retención de $1,000 para 70,000 Trabajadores",
        },
        summary: {
          en: "Through AB 204 and SB 121, SEIU community clinic workers won $1,000 retention bonuses for an estimated 70,000 frontline workers at California's community clinics, addressing the workforce crisis.",
          es: "A través de AB 204 y SB 121, los trabajadores de clínicas comunitarias del SEIU ganaron bonos de retención de $1,000 para 70,000 trabajadores de primera línea en las clínicas comunitarias de California.",
        },
        sourceUrl: "https://www.seiu521.org/press-release/seiu-community-clinic-workers-secure-historic-state-investment-to-address-health-workforce-crisis/",
        sourceTitle: "SEIU Local 521",
      },
    ],
    contactPhone: "(408) 678-3300",
    contactEmail: null,
    logoColor: "green",
  },
  {
    id: "seiu-721",
    name: "SEIU Local 721",
    abbreviation: "SEIU 721",
    esName: "SEIU Local 721",
    website: "https://www.seiu721.org",
    organizeUrl: null,
    description: {
      en: "Represents over 95,000 workers in cities, counties, special districts, public health systems, and nonprofit organizations across Southern California. SEIU 721 is part of SEIU Community Clinic Workers United, the statewide campaign to improve conditions at FQHCs.",
      es: "Representa a más de 95,000 trabajadores en ciudades, condados, distritos especiales, sistemas de salud pública y organizaciones sin fines de lucro en el sur de California.",
    },
    membership: "95,000+",
    headquartersCity: "Los Angeles, CA",
    parentOrg: "SEIU International",
    rolesRepresented: [
      "Community Health Workers",
      "Patient Services Representatives",
      "Administrative Staff",
      "Case Managers",
      "Public Health Workers",
    ],
    fqhcsRepresented: [
      "st-johns-community-health", // Management invited SEIU in 15+ years ago. 2026 bargaining team elected.
      "clinica-romero", // Clinica Monseñor Oscar A. Romero — 3-year contract, 10% raises, full healthcare by 2025
    ],
    recentNews: [
      {
        date: "2025-04-02",
        title: {
          en: "St. John's Community Health Workers Vote on New 3-Year Contract with $30/hr Minimum",
          es: "Trabajadores de St. John's Community Health Votan Nuevo Contrato de 3 Años con Mínimo de $30/hr",
        },
        summary: {
          en: "SEIU 721 members at St. John's Community Health voted on a new 3-year tentative agreement featuring an industry-leading $30/hr minimum wage (up from $25 — a 20% increase), a new longevity tier, Juneteenth recognition, and increased vacation flexibility. The bargaining team unanimously recommended ratification.",
          es: "Miembros de SEIU 721 en St. John's votaron un nuevo acuerdo tentativo de 3 años con salario mínimo de $30/hr (aumento del 20% desde $25), nuevo nivel de antigüedad y mayor flexibilidad de vacaciones.",
        },
        sourceUrl: "https://www.seiu721.org/2026/03/2026-st-johns-community-health-contract-vote.php",
        sourceTitle: "SEIU 721",
      },
      {
        date: "2025-01-15",
        title: {
          en: "St. John's Community Health Elects 2026 Bargaining Team",
          es: "St. John's Community Health Elige Equipo de Negociación 2026",
        },
        summary: {
          en: "SEIU 721 members at St. John's Community Health (24 sites + 4 mobile clinics in LA) elected their 2026 bargaining team. St. John's has had a cooperative union relationship for over 15 years — management originally invited SEIU in.",
          es: "Los miembros de SEIU 721 en St. John's Community Health eligieron su equipo de negociación 2026. St. John's ha tenido una relación sindical cooperativa por más de 15 años.",
        },
        sourceUrl: "https://www.seiu721.org/presidents-report/january-2025.php",
        sourceTitle: "SEIU 721 President's Report",
      },
      {
        date: "2019-10-01",
        title: {
          en: "Clinica Romero Scores 3-Year Contract Victory with 10% Raises",
          es: "Clínica Romero Logra Victoria Contractual de 3 Años con Aumentos del 10%",
        },
        summary: {
          en: "SEIU 721 members at Clinica Monseñor Oscar A. Romero in LA's Pico-Union and Boyle Heights won a 3-year contract with 10% base wage increases, improved health benefit reimbursements, and skills training funds. Members will have healthcare fully covered.",
          es: "Miembros de SEIU 721 en Clínica Romero ganaron contrato de 3 años con aumentos del 10%, mejores reembolsos de beneficios de salud y fondos de capacitación.",
        },
        sourceUrl: "https://www.seiu721.org/2019/10/clinica-romero-scores-contract-victory.php",
        sourceTitle: "SEIU 721",
      },
    ],
    contactPhone: "(877) 721-7348",
    contactEmail: null,
    logoColor: "red",
  },
  {
    id: "seiu-221",
    name: "SEIU Local 221",
    abbreviation: "SEIU 221",
    esName: "SEIU Local 221",
    website: "https://www.seiu221.org",
    organizeUrl: null,
    description: {
      en: "Represents over 12,000 workers in San Diego and Imperial counties, including county employees, clinics, and school district workers. Part of SEIU Community Clinic Workers United, the statewide effort to improve pay and conditions at community health centers.",
      es: "Representa a más de 12,000 trabajadores en los condados de San Diego e Imperial, incluyendo empleados del condado, clínicas y distritos escolares.",
    },
    membership: "12,000+",
    headquartersCity: "San Diego, CA",
    parentOrg: "SEIU International",
    rolesRepresented: [
      "Community Health Workers",
      "Medical Assistants",
      "Administrative Staff",
      "Patient Services Representatives",
    ],
    fqhcsRepresented: [
      "healthright-360", // San Diego portion of statewide organizing (also SEIU 1021 in Bay Area, SEIU 721 in LA)
    ],
    recentNews: [
      {
        date: "2023-12-01",
        title: {
          en: "HealthRIGHT 360 San Diego Workers Join SEIU 221 in Statewide Organizing Win",
          es: "Trabajadores de HealthRIGHT 360 en San Diego se Unen a SEIU 221 en Victoria de Organización Estatal",
        },
        summary: {
          en: "As part of the statewide organizing win at HealthRIGHT 360 (850+ workers, 100+ clinics), San Diego-based workers joined SEIU Local 221. The statewide effort achieved 73% card check authorization.",
          es: "Como parte de la victoria de organización estatal en HealthRIGHT 360 (850+ trabajadores, 100+ clínicas), los trabajadores de San Diego se unieron a SEIU Local 221.",
        },
        sourceUrl: "https://www.seiu1021.org/post/over-850-behavioral-health-and-clinic-workers-join-seiu",
        sourceTitle: "SEIU 1021",
      },
    ],
    contactPhone: "(619) 640-7200",
    contactEmail: null,
    logoColor: "orange",
  },
  {
    id: "nuhw",
    name: "National Union of Healthcare Workers",
    abbreviation: "NUHW",
    esName: "Sindicato Nacional de Trabajadores de Salud",
    website: "https://nuhw.org",
    organizeUrl: "https://nuhw.org/get-involved/",
    description: {
      en: "Founded in 2009 by Sal Rosselli after a split from SEIU-UHW, NUHW represents approximately 19,000 healthcare workers across California. Led by President Sophia Mendoza (elected 2024, succeeding Rosselli). NUHW organizes at community health centers, hospitals, and clinics, with a particular focus on mental health professionals at Kaiser Permanente. NUHW's FQHC presence is growing — workers at Imperial Beach Community Clinic organized in January 2026.",
      es: "Fundado en 2009 por Sal Rosselli después de una separación de SEIU-UHW, NUHW representa aproximadamente 19,000 trabajadores de salud en toda California. Liderado por la Presidenta Sophia Mendoza (elegida 2024). La presencia de NUHW en FQHCs está creciendo.",
    },
    membership: "~18,752 (FY2025)",
    headquartersCity: "Emeryville, CA",
    parentOrg: null, // independent
    rolesRepresented: [
      "Psychologists",
      "Licensed Clinical Social Workers (LCSWs)",
      "Licensed Marriage & Family Therapists (LMFTs)",
      "Substance Abuse Counselors",
      "Nursing Assistants (CNAs)",
      "Medical Assistants",
      "Service & Technical Workers",
    ],
    fqhcsRepresented: [
      "mission-neighborhood-health-center", // SF, ~70 workers, organized 2012, contract extension Jan 2024 (10% + 4%/yr through 2028)
      "imperial-beach-community-clinic", // San Diego, physicians/NPs/therapists/social workers, organized Jan 2026
      // Also: LA LGBT Center (FQHC Look-Alike, organized 2019), Lyon-Martin Community Health (SF, organized 2022), RAMS (SF mental health, 77-3 vote 2017)
    ],
    recentNews: [
      {
        date: "2026-03-18",
        title: {
          en: "2,400 NUHW Mental Health Clinicians Strike Kaiser Permanente Over AI Triage Changes",
          es: "2,400 Clínicos de Salud Mental de NUHW Hacen Huelga en Kaiser Permanente por Cambios de Triaje con IA",
        },
        summary: {
          en: "One-day ULP strike across 5 CA cities (Sacramento, Fresno, Santa Rosa, Santa Clara, Oakland), joined by 23,000 CNA/NNU nurses and IFPTE engineers in solidarity. Workers oppose Kaiser replacing licensed clinicians with AI questionnaires and telephone operators for mental health triage. Contract expired Sept 2025; sides remain far apart. Followed by 5-day hunger strike in LA (April 7-11).",
          es: "Huelga de un día en 5 ciudades de CA, unida por 23,000 enfermeras CNA/NNU e ingenieros IFPTE. Trabajadores se oponen a que Kaiser reemplace clínicos con cuestionarios de IA para triaje de salud mental. Seguida por huelga de hambre de 5 días en LA (abril 7-11).",
        },
        sourceUrl: "https://home.nuhw.org/2026/03/23/mental-health-clinicians-hold-major-strike-with-support-from-kaiser-permanente-nurses-engineers/",
        sourceTitle: "NUHW",
      },
      {
        date: "2026-01-27",
        title: {
          en: "Imperial Beach Community Clinic Workers Vote to Join NUHW",
          es: "Trabajadores de Imperial Beach Community Clinic Votan para Unirse a NUHW",
        },
        summary: {
          en: "Physicians, nurse practitioners, therapists, and social workers at Imperial Beach Community Clinic voted to join NUHW. Workers cited constant CEO turnover, chronic understaffing causing burnout, and management retaliation against providers who published an op-ed in Voice of San Diego.",
          es: "Médicos, enfermeros practicantes, terapeutas y trabajadores sociales en Imperial Beach Community Clinic votaron para unirse a NUHW. Los trabajadores citaron rotación constante de CEO, falta de personal crónica y represalias contra proveedores.",
        },
        sourceUrl: "https://home.nuhw.org/2026/01/27/workers-at-imperial-beach-community-clinic-vote-to-join-nuhw/",
        sourceTitle: "NUHW",
      },
      {
        date: "2024-07-01",
        title: {
          en: "NUHW Leadership Transition: Sophia Mendoza Elected President, Rosselli Steps Down",
          es: "Transición de Liderazgo NUHW: Sophia Mendoza Elegida Presidenta, Rosselli Se Retira",
        },
        summary: {
          en: "Sal Rosselli, who founded NUHW in 2009 after the split from SEIU-UHW, stepped down as president. Sophia Mendoza was elected as the new president. Rosselli continues as president emeritus focused on political and legislative work.",
          es: "Sal Rosselli, quien fundó NUHW en 2009, se retiró como presidente. Sophia Mendoza fue elegida como nueva presidenta. Rosselli continúa como presidente emérito enfocado en trabajo político y legislativo.",
        },
        sourceUrl: "https://labornotes.org/blogs/2024/07/militant-health-care-union-leader-sal-rosselli-retires",
        sourceTitle: "Labor Notes",
      },
      {
        date: "2024-01-25",
        title: {
          en: "Mission Neighborhood Health Center Workers Win 10% Raise + 4%/Year Through 2028",
          es: "Trabajadores de Mission Neighborhood Health Center Ganan Aumento de 10% + 4%/Año Hasta 2028",
        },
        summary: {
          en: "~70 medical assistants, pharmacy techs, and support staff at Mission Neighborhood Health Center (SF FQHC) ratified a contract extension with a 10% raise in 2024 plus 4% annual increases through 2028, plus an additional floating holiday.",
          es: "~70 asistentes médicos, técnicos de farmacia y personal de apoyo ratificaron extensión de contrato con aumento del 10% en 2024 más 4% anual hasta 2028.",
        },
        sourceUrl: "https://home.nuhw.org/2024/01/25/mission-neighborhood-health-center-workers-get-big-raises-with-contract-extension/",
        sourceTitle: "NUHW",
      },
    ],
    contactPhone: "(510) 834-6894",
    contactEmail: null,
    logoColor: "teal",
  },
  {
    id: "cna-nnu",
    name: "California Nurses Association / National Nurses United",
    abbreviation: "CNA/NNU",
    esName: "Asociación de Enfermeras de California / Enfermeras Unidas Nacionales",
    website: "https://www.nationalnursesunited.org",
    organizeUrl: "https://www.nationalnursesunited.org/organize",
    description: {
      en: "The nation's largest union of registered nurses, with over 225,000 members including 100,000+ in California. CNA led the successful fight for California's landmark nurse-to-patient staffing ratio law (AB 394, 2004) — the first in the nation. While primarily active in hospitals, CNA represents RNs at some community health settings.",
      es: "El sindicato de enfermeras registradas más grande del país, con más de 225,000 miembros incluyendo más de 100,000 en California. CNA lideró la lucha exitosa por la ley de ratios de personal de enfermería de California (AB 394, 2004).",
    },
    membership: "225,000+ (100,000+ in CA)",
    headquartersCity: "Oakland, CA",
    parentOrg: null, // CNA is a founding affiliate of NNU
    rolesRepresented: [
      "Registered Nurses (RNs)",
      "Nurse Practitioners (NPs)",
      "Clinical Nurse Specialists",
    ],
    fqhcsRepresented: [],
    recentNews: [],
    contactPhone: "(510) 273-2200",
    contactEmail: null,
    logoColor: "red",
  },
  {
    id: "1199seiu",
    name: "1199SEIU United Healthcare Workers East",
    abbreviation: "1199SEIU",
    esName: "1199SEIU Trabajadores de Salud Unidos del Este",
    website: "https://www.1199seiu.org",
    organizeUrl: null,
    description: {
      en: "The largest healthcare union in the nation with over 450,000 members, primarily in New York and the East Coast. Founded in 1932 by Leon Davis as a pharmacists' union, 1199 became the pioneering force in hospital worker organizing. Its 1959 New York hospital strike and 1969 Charleston strike — supported by Martin Luther King Jr. and Coretta Scott King — are landmark moments in both labor and civil rights history. While not active in California FQHCs, 1199's legacy is foundational to the healthcare labor movement nationwide.",
      es: "El sindicato de salud más grande del país con más de 450,000 miembros. Fundado en 1932, la huelga hospitalaria de 1959 en Nueva York y la huelga de Charleston de 1969 — apoyadas por Martin Luther King Jr. y Coretta Scott King — son momentos fundamentales en la historia laboral y de derechos civiles.",
    },
    membership: "450,000+",
    headquartersCity: "New York, NY",
    parentOrg: "SEIU International",
    rolesRepresented: [
      "Hospital Workers (all classifications)",
      "Nursing Home Workers",
      "Home Care Workers",
      "Pharmacy Workers",
    ],
    fqhcsRepresented: [], // Not active in CA FQHCs — included for labor history context
    recentNews: [],
    contactPhone: "(212) 582-1890",
    contactEmail: null,
    logoColor: "purple",
  },
];

/* ------------------------------------------------------------------ */
/*  SEIU Community Clinic Workers United (statewide coalition)         */
/* ------------------------------------------------------------------ */

export const SEIU_CLINIC_WORKERS_UNITED = {
  name: "SEIU Community Clinic Workers United",
  esName: "Trabajadores de Clínicas Comunitarias Unidos de SEIU",
  website: "https://seiuclinicworkers.org",
  description: {
    en: "A statewide coalition of SEIU Locals 521, 721, 1021, and UHW representing tens of thousands of frontline workers at Federally Qualified Health Centers across California. The coalition fights for higher wages, better benefits, improved patient care, and a voice at work for community clinic workers. In 2023, they won $13.3 million in High-Road Training Partnership funding and $1,000 retention bonuses for 70,000 clinic workers.",
    es: "Una coalición estatal de los Locales SEIU 521, 721, 1021 y UHW que representa a decenas de miles de trabajadores de primera línea en Centros de Salud Comunitarios en toda California.",
  },
  memberLocals: ["SEIU Local 521", "SEIU Local 721", "SEIU Local 1021", "SEIU-UHW"],
  partnerFqhcs: [
    "Asian Health Services",
    "Clínica Monseñor Oscar A. Romero",
    "Gardner Health Services",
    "HealthRIGHT 360",
    "St. John's Community Health",
    "Baywell Health (fka West Oakland Health Center)",
    "Salud Para La Gente",
  ],
  achievements: [
    {
      year: 2023,
      title: { en: "$13.3M High-Road Training Partnership", es: "Asociación de Capacitación de $13.3M" },
      description: {
        en: "Awarded $13.3 million from California's Workforce Development Board for recruitment, retention, and training of healthcare workers at community clinics.",
        es: "Premiado con $13.3 millones de la Junta de Desarrollo de la Fuerza Laboral de California para reclutamiento, retención y capacitación de trabajadores de salud.",
      },
    },
    {
      year: 2023,
      title: { en: "SB 525: $25/Hour Healthcare Minimum Wage", es: "SB 525: Salario Mínimo de Salud de $25/Hora" },
      description: {
        en: "SEIU-backed SB 525 raised the minimum wage for all healthcare workers in California to $25/hour, with community clinics on a phased timeline reaching $25 by 2027.",
        es: "SB 525 respaldado por SEIU aumentó el salario mínimo para todos los trabajadores de salud en California a $25/hora, con clínicas comunitarias alcanzando $25 para 2027.",
      },
    },
    {
      year: 2023,
      title: { en: "AB 204 & SB 121: $1,000 Retention Bonuses", es: "AB 204 y SB 121: Bonos de Retención de $1,000" },
      description: {
        en: "Won $1,000 retention bonuses for an estimated 70,000 frontline community clinic workers across California.",
        es: "Ganó bonos de retención de $1,000 para aproximadamente 70,000 trabajadores de clínicas comunitarias en California.",
      },
    },
    {
      year: 2024,
      title: { en: "HealthRIGHT 360: 850+ Workers Organize & Ratify First Contract", es: "HealthRIGHT 360: 850+ Trabajadores se Organizan y Ratifican Primer Contrato" },
      description: {
        en: "850+ workers at HealthRIGHT 360 (100+ clinics statewide) organized via 73% card check across SEIU 1021, 721, and 221, then ratified their first CBA with 98% approval — 13%+ raises and a $20→$21/hr minimum. The largest single FQHC organizing win in California.",
        es: "Más de 850 trabajadores en HealthRIGHT 360 (100+ clínicas) se organizaron vía verificación de tarjetas y ratificaron su primer contrato con 98% de aprobación — la mayor victoria de organización en un solo FQHC de California.",
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Healthcare Labor Movement Timeline                                 */
/* ------------------------------------------------------------------ */

export const LABOR_TIMELINE: LaborTimelineEvent[] = [
  // ── Pre-1900s ──
  {
    id: "marine-hospital-1798",
    year: 1798,
    date: "1798-07-16",
    title: { en: "Marine Hospital Service Act", es: "Ley del Servicio de Hospitales de la Marina" },
    description: {
      en: "President John Adams signs the Act for the Relief of Sick and Disabled Seamen, creating the Marine Hospital Service — the first federal healthcare program. A tax on sailors' wages funded hospitals in port cities.",
      es: "El presidente John Adams firma la Ley para el Alivio de Marineros Enfermos y Discapacitados, creando el Servicio de Hospitales de la Marina — el primer programa federal de salud.",
    },
    significance: {
      en: "Established the principle of federal responsibility for healthcare — the seed that would eventually grow into the Public Health Service and HRSA.",
      es: "Estableció el principio de responsabilidad federal para la atención médica.",
    },
    category: "legislation",
    region: "national",
    sources: [{ title: "HRSA History", url: "https://www.hrsa.gov/about/history" }],
  },
  {
    id: "flexner-report-1910",
    year: 1910,
    date: "1910-01-01",
    title: { en: "The Flexner Report", es: "El Informe Flexner" },
    description: {
      en: "Abraham Flexner publishes his landmark report on medical education in the US and Canada, leading to the closure of many medical schools — disproportionately those serving Black students — and the standardization of physician training.",
      es: "Abraham Flexner publica su informe histórico sobre la educación médica, llevando al cierre de muchas escuelas de medicina — desproporcionadamente las que servían a estudiantes negros.",
    },
    significance: {
      en: "Professionalized medicine but reduced access to medical education for communities of color, contributing to healthcare workforce disparities that FQHCs address today.",
      es: "Profesionalizó la medicina pero redujo el acceso a la educación médica para comunidades de color.",
    },
    category: "milestone",
    region: "national",
    sources: [{ title: "Flexner Report — Carnegie Foundation", url: "https://archive.carnegiefoundation.org/publications/pdfs/elibrary/Carnegie_Flexner_Report.pdf" }],
  },
  {
    id: "1199-founded-1932",
    year: 1932,
    date: null,
    title: { en: "Local 1199 Founded in New York City", es: "Local 1199 Fundado en Nueva York" },
    description: {
      en: "Leon Davis and a group of New York City pharmacy workers found Local 1199, a small union of mostly white and Jewish pharmacists. They would soon begin the groundbreaking work of organizing the largely Black workforce of the city's drug store soda fountains.",
      es: "Leon Davis y un grupo de trabajadores de farmacias de Nueva York fundan el Local 1199, un pequeño sindicato de farmacéuticos que pronto comenzaría a organizar a la fuerza laboral mayoritariamente negra.",
    },
    significance: {
      en: "The union that would become the largest healthcare union in America started with a radical commitment to interracial solidarity.",
      es: "El sindicato que se convertiría en el más grande de salud en América comenzó con un compromiso radical de solidaridad interracial.",
    },
    category: "founding",
    region: "national",
    sources: [{ title: "1199SEIU History", url: "https://www.1199seiu.org/history" }],
  },
  {
    id: "hill-burton-1946",
    year: 1946,
    date: "1946-08-13",
    title: { en: "Hill-Burton Act", es: "Ley Hill-Burton" },
    description: {
      en: "The Hospital Survey and Construction Act provides federal grants and loans for building and modernizing hospitals. While it expanded access, the law included a 'separate but equal' provision allowing federally-funded hospitals to discriminate by race.",
      es: "La Ley de Encuesta y Construcción de Hospitales proporciona subvenciones y préstamos federales para construir y modernizar hospitales. Aunque expandió el acceso, la ley incluía una disposición de 'separados pero iguales'.",
    },
    significance: {
      en: "Built much of America's hospital infrastructure but codified racial segregation in healthcare facilities — a legacy that community health centers were created to address.",
      es: "Construyó gran parte de la infraestructura hospitalaria pero codificó la segregación racial en instalaciones de salud.",
    },
    category: "legislation",
    region: "national",
    sources: [{ title: "HRSA Hill-Burton History", url: "https://www.hrsa.gov/get-health-care/affordable/hill-burton" }],
  },
  {
    id: "1199-hospital-strike-1959",
    year: 1959,
    date: "1959-05-08",
    title: { en: "1199 New York Hospital Workers Strike", es: "Huelga de Trabajadores Hospitalarios de 1199 en Nueva York" },
    description: {
      en: "3,500 workers at seven voluntary hospitals in New York City — predominantly Black and Latina women — walk off the job for 46 days. Dr. Martin Luther King Jr. calls the strike 'more than a fight for union rights, it is a fight for human rights and human dignity.'",
      es: "3,500 trabajadores en siete hospitales voluntarios de Nueva York — predominantemente mujeres negras y latinas — se declaran en huelga por 46 días. Dr. Martin Luther King Jr. llama la huelga 'más que una lucha por derechos sindicales, es una lucha por los derechos humanos y la dignidad humana.'",
    },
    significance: {
      en: "The first major hospital workers' strike in American history, fusing labor organizing with the civil rights movement and setting the template for healthcare unionization nationwide.",
      es: "La primera huelga importante de trabajadores hospitalarios en la historia americana, fusionando la organización laboral con el movimiento de derechos civiles.",
    },
    category: "strike",
    region: "national",
    sources: [
      { title: "1199SEIU History", url: "https://www.1199seiu.org/history" },
      { title: "Cornell Kheel LatinX Labor Collections", url: "https://guides.library.cornell.edu/latinxlabor/1199" },
    ],
  },
  {
    id: "medicare-medicaid-1965",
    year: 1965,
    date: "1965-07-30",
    title: { en: "Medicare & Medicaid Signed into Law", es: "Medicare y Medicaid se Convierten en Ley" },
    description: {
      en: "President Lyndon B. Johnson signs the Social Security Amendments of 1965, creating Medicare (Title XVIII) for Americans 65+ and Medicaid (Title XIX) for low-income Americans. The same year, the Office of Economic Opportunity funds the first two neighborhood health centers.",
      es: "El presidente Lyndon B. Johnson firma las Enmiendas de Seguridad Social de 1965, creando Medicare para mayores de 65 y Medicaid para estadounidenses de bajos ingresos.",
    },
    significance: {
      en: "The twin pillars of public healthcare in America — and the funding mechanism that would make FQHCs financially viable.",
      es: "Los dos pilares de la salud pública en América — y el mecanismo de financiamiento que haría viables a los FQHCs.",
    },
    category: "legislation",
    region: "national",
    sources: [
      { title: "CMS Medicare & Medicaid History", url: "https://www.cms.gov/about-cms/agency-information/history" },
      { title: "Medicaid.gov Program History", url: "https://www.medicaid.gov/about-us/program-history" },
    ],
  },
  {
    id: "first-chcs-1965",
    year: 1965,
    date: "1965-12-01",
    title: { en: "First Community Health Centers Founded", es: "Primeros Centros de Salud Comunitarios Fundados" },
    description: {
      en: "Dr. H. Jack Geiger and Dr. Count Gibson, supported by the Office of Economic Opportunity, open the Columbia Point Health Center in a Boston housing project basement and the Delta Health Center in Mound Bayou, Mississippi. Geiger, inspired by South African community health models, writes food prescriptions for malnourished patients, famously saying: 'The most effective therapy for malnutrition is food.'",
      es: "Dr. H. Jack Geiger y Dr. Count Gibson abren el Centro de Salud de Columbia Point en un sótano de vivienda pública en Boston y el Centro de Salud Delta en Mound Bayou, Mississippi. Geiger escribe recetas de alimentos para pacientes desnutridos.",
    },
    significance: {
      en: "The birth of the community health center movement — rooted in civil rights, anti-poverty activism, and the belief that healthcare is a human right. These two centers inspired the creation of over 1,400 health centers serving 30+ million people today.",
      es: "El nacimiento del movimiento de centros de salud comunitarios — arraigado en derechos civiles, activismo contra la pobreza y la creencia de que la salud es un derecho humano.",
    },
    category: "founding",
    region: "fqhc",
    sources: [
      { title: "HRSA — Foundation and Early Years of the Health Center Program", url: "https://bphc.hrsa.gov/about-health-center-program/health-center-program-history/foundation-early-years" },
      { title: "NACHC — Dr. H. Jack Geiger Memorial", url: "https://www.nachc.org/in-memoriam-the-passing-of-civil-rights-activist-co-founder-of-community-health-center-movement-h-jack-geiger-md/" },
      { title: "Milbank Memorial Fund — Geiger Tribute", url: "https://www.milbank.org/2021/02/h-jack-geiger-and-the-power-of-health-care-to-transform-lives-and-communities/" },
    ],
  },
  {
    id: "medi-cal-1966",
    year: 1966,
    date: "1966-03-01",
    title: { en: "Medi-Cal Program Launches in California", es: "Programa Medi-Cal se Lanza en California" },
    description: {
      en: "California implements its Medicaid program under the name 'Medi-Cal,' becoming one of the first states to participate. The program would grow to become the largest Medicaid program in the nation, covering over 15 million Californians.",
      es: "California implementa su programa Medicaid bajo el nombre 'Medi-Cal,' convirtiéndose en uno de los primeros estados en participar. El programa se convertiría en el programa Medicaid más grande del país.",
    },
    significance: {
      en: "Medi-Cal provides the primary revenue source for California's FQHCs, making community health center employment possible at scale.",
      es: "Medi-Cal proporciona la principal fuente de ingresos para los FQHCs de California.",
    },
    category: "legislation",
    region: "california",
    sources: [{ title: "PPIC — How Has Medi-Cal Changed?", url: "https://www.ppic.org/blog/how-has-the-medi-cal-program-changed-over-the-past-three-decades/" }],
  },
  {
    id: "charleston-strike-1969",
    year: 1969,
    date: "1969-03-20",
    title: { en: "Charleston Hospital Workers' Strike", es: "Huelga de Trabajadores Hospitalarios de Charleston" },
    description: {
      en: "400 Black women workers at two Charleston, SC hospitals strike for 113 days. Led by nurse's aide Mary Moultrie, the strike becomes a national civil rights cause. Coretta Scott King serves as honorary chair of the 'Union Power, Soul Power' campaign. A Mother's Day march of 10,000 includes Walter Reuther and national labor leaders.",
      es: "400 mujeres negras trabajadoras en dos hospitales de Charleston hacen huelga por 113 días. Liderada por la auxiliar de enfermería Mary Moultrie, la huelga se convierte en causa nacional de derechos civiles.",
    },
    significance: {
      en: "The last great campaign of the civil rights era, demonstrating that labor rights and civil rights are inseparable. Black voter registration surged after the strike.",
      es: "La última gran campaña de la era de derechos civiles, demostrando que los derechos laborales y civiles son inseparables.",
    },
    category: "civil_rights",
    region: "national",
    sources: [
      { title: "SC Encyclopedia — Charleston Hospital Workers' Strike", url: "https://www.scencyclopedia.org/sce/entries/charleston-hospital-workers-strike/" },
      { title: "AFL-CIO — Pathway to Progress", url: "https://aflcio.org/2021/2/19/pathway-progress-charleston-hospital-strike" },
    ],
  },
  {
    id: "section-330-1975",
    year: 1975,
    date: null,
    title: { en: "Section 330 of the Public Health Service Act", es: "Sección 330 de la Ley de Servicio de Salud Pública" },
    description: {
      en: "Congress authorizes Section 330, consolidating the community health center program under the Public Health Service Act. This establishes the legal framework for FQHCs: required to serve all patients regardless of ability to pay, governed by community boards, and eligible for enhanced Medicaid reimbursement.",
      es: "El Congreso autoriza la Sección 330, consolidando el programa de centros de salud comunitarios. Esto establece el marco legal para los FQHCs.",
    },
    significance: {
      en: "The legal foundation of every FQHC operating today — Section 330 defines what a community health center is and what it must do.",
      es: "El fundamento legal de cada FQHC en operación hoy — la Sección 330 define qué es un centro de salud comunitario.",
    },
    category: "legislation",
    region: "fqhc",
    sources: [{ title: "HRSA — Health Center Program History", url: "https://bphc.hrsa.gov/about-health-center-program/health-center-program-history" }],
  },
  {
    id: "cna-staffing-ratios-1999",
    year: 1999,
    date: null,
    title: { en: "California Passes First-in-Nation Nurse Staffing Ratio Law", es: "California Aprueba Primera Ley Nacional de Ratios de Enfermería" },
    description: {
      en: "After years of campaigning by the California Nurses Association (CNA), Governor Gray Davis signs AB 394 establishing minimum nurse-to-patient ratios — the first such law in the United States. The law takes effect in 2004.",
      es: "Después de años de campaña por parte de la Asociación de Enfermeras de California, el Gobernador Davis firma AB 394 estableciendo ratios mínimos de enfermera-por-paciente — la primera ley de este tipo en Estados Unidos.",
    },
    significance: {
      en: "A landmark victory for the nursing profession that improved patient safety and established CNA/NNU as one of the most powerful healthcare unions in America.",
      es: "Una victoria histórica para la profesión de enfermería que mejoró la seguridad del paciente.",
    },
    category: "legislation",
    region: "california",
    sources: [{ title: "CNA — History of Safe Staffing", url: "https://www.nationalnursesunited.org/ratios" }],
  },
  {
    id: "nuhw-founded-2009",
    year: 2009,
    date: "2009-01-01",
    title: { en: "National Union of Healthcare Workers (NUHW) Founded", es: "Sindicato Nacional de Trabajadores de Salud (NUHW) Fundado" },
    description: {
      en: "After SEIU International places a trusteeship over SEIU-UHW and removes president Sal Rosselli, thousands of members break away to form NUHW as an independent healthcare workers' union. The split triggers years of rival organizing campaigns, particularly at Kaiser Permanente.",
      es: "Después de que SEIU Internacional coloca una tutela sobre SEIU-UHW y remueve al presidente Sal Rosselli, miles de miembros se separan para formar NUHW como sindicato independiente.",
    },
    significance: {
      en: "Created competition in healthcare organizing that has driven both unions to fight harder for workers' interests across California.",
      es: "Creó competencia en la organización de salud que ha impulsado a ambos sindicatos a luchar más por los intereses de los trabajadores.",
    },
    category: "founding",
    region: "california",
    sources: [{ title: "NUHW — About", url: "https://nuhw.org/about/" }],
  },
  {
    id: "aca-signed-2010",
    year: 2010,
    date: "2010-03-23",
    title: { en: "Affordable Care Act Signed into Law", es: "Ley de Atención Asequible se Convierte en Ley" },
    description: {
      en: "President Obama signs the Patient Protection and Affordable Care Act, the most significant healthcare reform since Medicare/Medicaid. The ACA expands Medicaid to 138% FPL, creates the Community Health Center Fund ($11B over 5 years), and establishes insurance marketplaces.",
      es: "El presidente Obama firma la Ley de Protección al Paciente y Atención Asequible. La ACA expande Medicaid, crea el Fondo de Centros de Salud Comunitarios ($11B), y establece mercados de seguros.",
    },
    significance: {
      en: "The Community Health Center Fund provided the largest investment in FQHC history, enabling the creation of thousands of new sites and jobs across the country.",
      es: "El Fondo de Centros de Salud Comunitarios proporcionó la mayor inversión en la historia de los FQHCs.",
    },
    category: "legislation",
    region: "national",
    sources: [{ title: "Congress.gov — ACA Full Text", url: "https://www.congress.gov/bill/111th-congress/house-bill/3590" }],
  },
  {
    id: "medi-cal-undocumented-expansion-2024",
    year: 2024,
    date: "2024-01-01",
    title: { en: "California Completes Medi-Cal Expansion to All Low-Income Adults", es: "California Completa Expansión de Medi-Cal a Todos los Adultos de Bajos Ingresos" },
    description: {
      en: "California becomes the first state to offer full-scope Medicaid coverage to all low-income adults regardless of immigration status. The final phase covers 700,000 undocumented Californians aged 26-49, completing a decade of incremental expansions.",
      es: "California se convierte en el primer estado en ofrecer cobertura completa de Medicaid a todos los adultos de bajos ingresos sin importar estatus migratorio.",
    },
    significance: {
      en: "A historic achievement for health equity — and a major driver of FQHC revenue and workforce demand across California.",
      es: "Un logro histórico para la equidad en salud — y un impulsor importante de ingresos y demanda laboral en los FQHCs de California.",
    },
    category: "legislation",
    region: "california",
    sources: [
      { title: "UC Berkeley Labor Center — A Historic Achievement", url: "https://laborcenter.berkeley.edu/a-historic-achievement/" },
      { title: "Governor's Office Press Release", url: "https://www.gov.ca.gov/2022/10/19/medi-cal-expansion-provided-286000-undocumented-californians-with-comprehensive-health-care/" },
    ],
  },
  {
    id: "sb-525-healthcare-minimum-wage-2024",
    year: 2024,
    date: "2024-10-01",
    title: { en: "California Healthcare Minimum Wage Begins ($25/Hour)", es: "Salario Mínimo de Salud de California Comienza ($25/Hora)" },
    description: {
      en: "California's SB 525 takes effect, raising the minimum wage for healthcare workers to $25/hour at large hospitals. Community clinics (including FQHCs) are on a phased schedule: $21/hour in July 2024, $22 in 2026, $25 by 2027.",
      es: "SB 525 de California entra en vigencia, aumentando el salario mínimo para trabajadores de salud a $25/hora en hospitales grandes. Las clínicas comunitarias están en un calendario escalonado.",
    },
    significance: {
      en: "The result of years of SEIU organizing, this law addresses the wage gap that causes clinic workers to leave for better-paying hospital jobs — directly impacting FQHC recruitment and retention.",
      es: "El resultado de años de organización de SEIU, esta ley aborda la brecha salarial que causa que los trabajadores de clínicas se vayan a empleos hospitalarios mejor pagados.",
    },
    category: "legislation",
    region: "california",
    sources: [{ title: "SEIU 1021 — Clinic Workers Win $25 Minimum Wage", url: "https://www.seiu1021.org/article/clinic-workers-win-senate-support-25-healthcare-minimum-wage-and-stronger-community-clinics" }],
  },
  {
    id: "hr1-medicaid-cuts-2025",
    year: 2025,
    date: "2025-07-04",
    title: { en: "H.R. 1 Enacts Largest Medicaid Cuts in History", es: "H.R. 1 Promulga los Mayores Recortes a Medicaid en la Historia" },
    description: {
      en: "Congress enacts the 'One Big Beautiful Bill,' cutting nearly $1 trillion from Medicaid nationwide. California faces $30 billion/year in Medi-Cal funding cuts. Work requirements of 80 hours/month are imposed on most able-bodied adults starting 2027.",
      es: "El Congreso promulga la ley, recortando casi $1 billón de Medicaid a nivel nacional. California enfrenta recortes de $30 mil millones/año en Medi-Cal.",
    },
    significance: {
      en: "The funding crisis threatening the survival of FQHCs and the jobs of tens of thousands of community health workers across California.",
      es: "La crisis de financiamiento que amenaza la supervivencia de los FQHCs y los empleos de decenas de miles de trabajadores de salud comunitaria.",
    },
    category: "legislation",
    region: "national",
    sources: [{ title: "CHCF — How Massive Federal Cuts Will Challenge Medi-Cal", url: "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/" }],
  },
  {
    id: "ahs-296-layoff-notices-christmas-eve-2025",
    year: 2025,
    date: "2025-12-24",
    title: { en: "Alameda Health System Delivers 296 Layoff Notices on Christmas Eve", es: "Sistema de Salud de Alameda Entrega 296 Notificaciones de Despido en Nochebuena" },
    description: {
      en: "AHS delivers 296 SEIU 1021 layoff notices, later reduced to 188. SEIU 1021, CNA, and CIR interns begin joint bargaining. A $91.7M deficit and projected August 2026 cash runout threaten the Bay Area's largest public safety-net system. County supervisors defer layoffs March 4 and create a working group.",
      es: "AHS entrega 296 notificaciones de despido a miembros de SEIU 1021, luego reducidas a 188. SEIU 1021, CNA e internos de CIR comienzan negociación conjunta. Un déficit de $91.7M amenaza el sistema más grande de red de seguridad del Área de la Bahía.",
    },
    significance: {
      en: "The AHS crisis is the most acute union-FQHC confrontation in California, testing whether public safety-net systems can survive simultaneous federal cuts, labor disputes, and financial insolvency.",
      es: "La crisis de AHS es la confrontación sindicato-FQHC más aguda en California, probando si los sistemas públicos de red de seguridad pueden sobrevivir recortes federales, disputas laborales e insolvencia financiera simultáneamente.",
    },
    category: "organizing",
    region: "california",
    sources: [{ title: "Oaklandside — AHS Layoffs Deferred", url: "https://oaklandside.org/2026/03/04/alameda-health-system-layoffs-deferred-county-supervisors/" }],
  },
  {
    id: "imperial-beach-nuhw-providers-organize-2026",
    year: 2026,
    date: "2026-01-27",
    title: { en: "Imperial Beach Community Clinic Providers Vote to Join NUHW", es: "Proveedores de Clínica Comunitaria de Imperial Beach Votan para Unirse a NUHW" },
    description: {
      en: "Physicians, therapists, and nurse practitioners at Imperial Beach Community Clinic vote to join NUHW — a rare provider-led organizing effort at an FQHC. Driven by 6 CEOs in 4 years, 28 layoffs, and 18 provider departures in 2 years.",
      es: "Médicos, terapeutas y enfermeros practicantes de la Clínica Comunitaria de Imperial Beach votan para unirse a NUHW — una organización liderada por proveedores rara en un FQHC.",
    },
    significance: {
      en: "Signals that FQHC labor organizing is expanding beyond support staff to clinical providers — a new frontier that could reshape provider retention and governance across the sector.",
      es: "Señala que la organización laboral en FQHCs se expande más allá del personal de apoyo a proveedores clínicos — una nueva frontera que podría redefinir la retención de proveedores y la gobernanza en todo el sector.",
    },
    category: "organizing",
    region: "california",
    sources: [{ title: "NUHW — Workers at Imperial Beach Community Clinic Vote to Join", url: "https://home.nuhw.org/2026/01/27/workers-at-imperial-beach-community-clinic-vote-to-join-nuhw/" }],
  },
  {
    id: "innercare-nlrb-forced-recognition-hearing-2026",
    year: 2026,
    date: "2026-03-17",
    title: { en: "NLRB Hearing Begins on Forced Recognition at Innercare", es: "Audiencia del NLRB Comienza sobre Reconocimiento Forzado en Innercare" },
    description: {
      en: "NLRB administrative law judge hearing begins in San Diego on 30+ unfair labor practice charges against Innercare (Clinicas de Salud del Pueblo). The NLRB seeks a bargaining order — forced SEIU-UHW recognition without a new election — the most serious enforcement action against a CA FQHC.",
      es: "La audiencia del juez administrativo del NLRB comienza en San Diego sobre 30+ cargos de prácticas laborales injustas contra Innercare. El NLRB busca un mandato de negociación — reconocimiento forzado del SEIU-UHW sin nueva elección.",
    },
    significance: {
      en: "The outcome will set precedent for FQHC labor relations statewide. A bargaining order would be one of the strongest NLRB remedies ever imposed on a community health center.",
      es: "El resultado sentará precedente para las relaciones laborales de FQHCs en todo el estado. Un mandato de negociación sería uno de los remedios más fuertes del NLRB jamás impuestos a un centro de salud comunitario.",
    },
    category: "organizing",
    region: "california",
    sources: [{ title: "Desert Review — NLRB Complaint Against Innercare", url: "https://www.thedesertreview.com/business/nlrb-complaint-against-innercare-sets-stage-for-2026-hearing-as-organization-denies-allegations/article_c29d43e5-c7fe-4095-8749-f7f4839010f8.html" }],
  },
  {
    id: "seiu-uhw-90-percent-ballot-signatures-2026",
    year: 2026,
    date: "2026-04-03",
    title: { en: "SEIU-UHW Submits Signatures for 90% FQHC Spending Mandate", es: "SEIU-UHW Presenta Firmas para Mandato de 90% de Gasto en FQHCs" },
    description: {
      en: "SEIU-UHW submits signatures for two ballot measures: one requiring FQHCs to spend 90% of revenue on patient care, another capping executive pay at $450K. CPCA, CCALAC, CMA, AltaMed, and FHCSD form the 'Protect Patients' opposition coalition. A Berkeley Research Group study estimates the measure would redirect $1.7B from FQHCs and push two-thirds into operating deficits.",
      es: "SEIU-UHW presenta firmas para dos medidas electorales: una requiriendo que FQHCs gasten el 90% de ingresos en atención al paciente, otra limitando salarios ejecutivos a $450K. CPCA, CCALAC, CMA, AltaMed y FHCSD forman la coalición de oposición 'Protect Patients'.",
    },
    significance: {
      en: "The most consequential labor-FQHC fight in California history. If passed, the 90% mandate would fundamentally restructure FQHC budgets during the worst funding crisis since the creation of the program.",
      es: "La lucha sindicato-FQHC más importante en la historia de California. Si se aprueba, el mandato del 90% reestructuraría fundamentalmente los presupuestos de FQHCs durante la peor crisis de financiamiento desde la creación del programa.",
    },
    category: "organizing",
    region: "california",
    sources: [{ title: "Ballotpedia — SEIU-UHW Signatures Submitted", url: "https://news.ballotpedia.org/2026/04/03/seiu-uhw-submits-signatures-for-california-ballot-initiatives-capping-executive-pay-and-requiring-clinics-to-spend-90-on-patient-care/" }],
  },
];

/* ------------------------------------------------------------------ */
/*  Curated Resource Library                                           */
/* ------------------------------------------------------------------ */

export const CURATED_RESOURCES: CuratedResource[] = [
  // ── Books ──
  {
    id: "starr-social-transformation",
    title: "The Social Transformation of American Medicine",
    author: "Paul Starr",
    type: "book",
    year: "1982 (2nd ed. 2017)",
    url: "https://www.amazon.com/Social-Transformation-American-Medicine-Profession/dp/0465093027",
    publisher: "Basic Books",
    description: {
      en: "The definitive social history of the medical profession in America. Winner of the Pulitzer Prize. Traces the rise of physician authority, the growth of hospitals, and the corporatization of healthcare from the colonial era to the modern day.",
      es: "La historia social definitiva de la profesión médica en América. Ganador del Premio Pulitzer. Traza el ascenso de la autoridad médica desde la era colonial hasta hoy.",
    },
    topics: ["US healthcare history", "medical profession", "hospitals"],
    featured: true,
  },
  {
    id: "lefkowitz-community-health-centers",
    title: "Community Health Centers: A Movement and the People Who Made It Happen",
    author: "Bonnie Lefkowitz",
    type: "book",
    year: 2007,
    url: "https://www.amazon.com/Community-Health-Centers-Movement-Critical/dp/0813539129",
    publisher: "Rutgers University Press",
    description: {
      en: "Tells the story of the community health center movement through personal accounts and interviews with national leaders, healthcare workers, patients, and activists in five communities. Essential reading for anyone working in FQHCs.",
      es: "Cuenta la historia del movimiento de centros de salud comunitarios a través de relatos personales y entrevistas con líderes nacionales, trabajadores de salud, pacientes y activistas.",
    },
    topics: ["community health centers", "FQHC history", "civil rights"],
    featured: true,
  },
  {
    id: "sardell-us-experiment",
    title: "The US Experiment in Social Medicine: The Community Health Center Program, 1965–86",
    author: "Alice Sardell",
    type: "book",
    year: 1988,
    url: null,
    publisher: "University of Pittsburgh Press",
    description: {
      en: "An academic history of the first two decades of the Community Health Center Program, from its origins in the War on Poverty through the Reagan era. Widely cited in health policy research.",
      es: "Una historia académica de las primeras dos décadas del Programa de Centros de Salud Comunitarios.",
    },
    topics: ["community health centers", "health policy", "War on Poverty"],
    featured: false,
  },
  {
    id: "starr-remedy-reaction",
    title: "Remedy and Reaction: The Peculiar American Struggle Over Health Care Reform",
    author: "Paul Starr",
    type: "book",
    year: 2011,
    url: null,
    publisher: "Yale University Press",
    description: {
      en: "A companion to Starr's Pulitzer-winning work, tracing the political battles over healthcare reform from Truman through the passage of the ACA.",
      es: "Un complemento a la obra ganadora del Pulitzer de Starr, trazando las batallas políticas por la reforma de salud desde Truman hasta la ACA.",
    },
    topics: ["health reform", "ACA", "political history"],
    featured: false,
  },
  {
    id: "rosenthal-american-sickness",
    title: "An American Sickness: How Healthcare Became Big Business and How You Can Take It Back",
    author: "Elisabeth Rosenthal",
    type: "book",
    year: 2017,
    url: null,
    publisher: "Penguin Press",
    description: {
      en: "A former New York Times correspondent exposes the financial forces driving American healthcare, from hospital consolidation to pharmaceutical pricing. Accessible and eye-opening.",
      es: "Una ex corresponsal del New York Times expone las fuerzas financieras que impulsan la atención médica estadounidense.",
    },
    topics: ["healthcare costs", "health industry", "patient advocacy"],
    featured: true,
  },
  {
    id: "reid-healing-america",
    title: "The Healing of America: A Global Quest for Better, Cheaper, and Fairer Health Care",
    author: "T.R. Reid",
    type: "book",
    year: 2009,
    url: null,
    publisher: "Penguin Press",
    description: {
      en: "A Washington Post correspondent travels to democracies around the world to understand how other countries provide healthcare to all their citizens, revealing what America could learn.",
      es: "Un corresponsal del Washington Post viaja a democracias alrededor del mundo para entender cómo otros países proporcionan atención médica a todos sus ciudadanos.",
    },
    topics: ["comparative healthcare", "health systems", "universal coverage"],
    featured: false,
  },
  {
    id: "seiu-stronger-together",
    title: "Stronger Together: The Story of SEIU",
    author: "SEIU",
    type: "book",
    year: 2010,
    url: null,
    publisher: "SEIU",
    description: {
      en: "The story of how SEIU grew from a small group of Chicago janitors in 1921 to 2.2 million members, winning gains for janitors, healthcare workers, and public employees — many of whom are women, immigrants, and people of color.",
      es: "La historia de cómo SEIU creció de un pequeño grupo de conserjes de Chicago en 1921 a 2.2 millones de miembros.",
    },
    topics: ["SEIU", "labor history", "organizing"],
    featured: false,
  },

  // ── Academic Articles ──
  {
    id: "ajph-social-movements-healthcare",
    title: "Health Care Reform and Social Movements in the United States",
    author: "American Journal of Public Health",
    type: "article",
    year: 2003,
    url: "https://ajph.aphapublications.org/doi/10.2105/AJPH.93.1.75",
    publisher: "AJPH, Vol. 93, Issue 1",
    description: {
      en: "Examines how social movements — labor, civil rights, women's, AIDS — have shaped (and failed to shape) healthcare reform in the US. Essential for understanding why the US never adopted universal healthcare.",
      es: "Examina cómo los movimientos sociales han formado la reforma de salud en los EE.UU.",
    },
    topics: ["social movements", "health reform", "labor"],
    featured: true,
  },
  {
    id: "pmc-labor-struggle-benefits",
    title: "The Struggle over Employee Benefits: The Role of Labor in Influencing Modern Health Policy",
    author: "David Rosner (Columbia University)",
    type: "article",
    year: 2005,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2690201/",
    publisher: "Milbank Quarterly",
    description: {
      en: "Explores how organized labor shaped the employer-sponsored health insurance system, from Blue Cross in the 1930s through the post-war era. Shows how union bargaining created the health benefits system Americans know today.",
      es: "Explora cómo el trabajo organizado formó el sistema de seguro de salud patrocinado por el empleador.",
    },
    topics: ["labor history", "health insurance", "employee benefits"],
    featured: false,
  },
  {
    id: "pmc-unions-public-health",
    title: "Labor Unions: A Public Health Institution",
    author: "PMC/American Journal of Industrial Medicine",
    type: "article",
    year: 2015,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4318309/",
    publisher: "American Journal of Industrial Medicine",
    description: {
      en: "Uses a social-ecological framework to show how unions address physical and psychosocial conditions of work, concluding that unions are uniquely situated to reduce health inequalities by empowering workers.",
      es: "Utiliza un marco socio-ecológico para mostrar cómo los sindicatos abordan condiciones laborales, concluyendo que los sindicatos están en posición única para reducir desigualdades de salud.",
    },
    topics: ["unions", "public health", "worker health"],
    featured: false,
  },
  {
    id: "pmc-geiger-tribute",
    title: "Dr. H. Jack Geiger, a Towering Public Health Leader",
    author: "AJPH / PMC",
    type: "article",
    year: 2021,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8034010/",
    publisher: "American Journal of Public Health",
    description: {
      en: "Tribute to the founder of the community health center movement, documenting his journey from Harlem to South Africa to Columbia Point and Mound Bayou. Essential reading for FQHC professionals.",
      es: "Tributo al fundador del movimiento de centros de salud comunitarios, documentando su trayectoria desde Harlem hasta Sudáfrica y los primeros centros de salud.",
    },
    topics: ["Jack Geiger", "community health centers", "civil rights"],
    featured: true,
  },
  {
    id: "urban-institute-chw-evolution",
    title: "The Evolution, Expansion, and Effectiveness of Community Health Workers",
    author: "Urban Institute",
    type: "report",
    year: 2012,
    url: "https://www.urban.org/sites/default/files/publication/32556/413072-The-Evolution-Expansion-and-Effectiveness-of-Community-Health-Workers.PDF",
    publisher: "Urban Institute",
    description: {
      en: "Comprehensive report on how community health workers evolved from informal community helpers to recognized public health professionals, including the push for certification and integration into healthcare systems.",
      es: "Informe comprehensivo sobre cómo los trabajadores de salud comunitaria evolucionaron de ayudantes informales a profesionales de salud pública reconocidos.",
    },
    topics: ["community health workers", "CHW certification", "workforce"],
    featured: false,
  },

  // ── Documentaries ──
  {
    id: "sicko-2007",
    title: "Sicko",
    author: "Michael Moore (Director)",
    type: "documentary",
    year: 2007,
    url: "https://www.imdb.com/title/tt0386032/",
    publisher: "Lionsgate / The Weinstein Company",
    description: {
      en: "The landmark documentary that brought America's healthcare crisis into mainstream conversation, comparing the US system to universal healthcare in Canada, the UK, France, and Cuba.",
      es: "El documental emblemático que llevó la crisis de salud de América a la conversación pública, comparando el sistema de EE.UU. con la cobertura universal en Canadá, Reino Unido, Francia y Cuba.",
    },
    topics: ["healthcare system", "insurance", "comparative healthcare"],
    featured: true,
  },
  {
    id: "the-waiting-room-2012",
    title: "The Waiting Room",
    author: "Peter Nicks (Director)",
    type: "documentary",
    year: 2012,
    url: null,
    publisher: "International Film Circuit",
    description: {
      en: "A fly-on-the-wall documentary set in the emergency room of Oakland's Highland Hospital, revealing the human stories behind America's healthcare safety net. Powerful for anyone working in community health.",
      es: "Un documental ambientado en la sala de emergencias del Hospital Highland de Oakland, revelando las historias humanas detrás de la red de seguridad de salud de América.",
    },
    topics: ["safety net", "emergency room", "Oakland"],
    featured: true,
  },
  {
    id: "escape-fire-2012",
    title: "Escape Fire: The Fight to Rescue American Healthcare",
    author: "Matthew Heineman & Susan Froemke (Directors)",
    type: "documentary",
    year: 2012,
    url: null,
    publisher: "Lionsgate / Roadside Attractions",
    description: {
      en: "Official Sundance selection exploring misaligned incentives in fee-for-service medicine and the innovators working to fix it. Examines the fundamental structural problems in American healthcare.",
      es: "Selección oficial de Sundance que explora los incentivos desalineados en la medicina de pago por servicio y los innovadores que trabajan para arreglarlo.",
    },
    topics: ["healthcare reform", "fee-for-service", "innovation"],
    featured: false,
  },
  {
    id: "code-black-2013",
    title: "Code Black",
    author: "Ryan McGarry (Director)",
    type: "documentary",
    year: 2013,
    url: null,
    publisher: "Long Shot Factory",
    description: {
      en: "Winner of the Los Angeles Film Festival Best Documentary, this film follows young doctors in LA County Hospital's emergency department — the busiest in the nation — grappling with bureaucracy, burnout, and the realities of safety-net medicine.",
      es: "Ganador del Mejor Documental del Festival de Cine de Los Ángeles, sigue a jóvenes médicos en el departamento de emergencias del Hospital del Condado de LA.",
    },
    topics: ["emergency medicine", "LA County", "safety net"],
    featured: false,
  },

  // ── Websites & Data Portals ──
  {
    id: "nachc",
    title: "National Association of Community Health Centers (NACHC)",
    author: "NACHC",
    type: "website",
    year: "Ongoing",
    url: "https://www.nachc.org",
    publisher: "NACHC",
    description: {
      en: "The national membership organization for FQHCs, providing advocacy, data, research, and training. Their community health center history archives are the best primary source on the CHC movement.",
      es: "La organización nacional de membresía para FQHCs, proporcionando abogacía, datos, investigación y capacitación.",
    },
    topics: ["FQHC advocacy", "data", "policy"],
    featured: true,
  },
  {
    id: "hrsa-data",
    title: "HRSA Health Center Program Data",
    author: "Health Resources & Services Administration",
    type: "website",
    year: "Ongoing",
    url: "https://data.hrsa.gov/topics/health-centers",
    publisher: "US Department of Health and Human Services",
    description: {
      en: "The official data warehouse for all FQHC program data — including UDS (Uniform Data System) reports, funding levels, patient demographics, and service statistics for every health center in the country.",
      es: "El almacén de datos oficial para todos los datos del programa FQHC — incluyendo informes UDS, niveles de financiamiento y estadísticas de servicio.",
    },
    topics: ["FQHC data", "government", "statistics"],
    featured: false,
  },
  {
    id: "kff-medicaid",
    title: "Kaiser Family Foundation — Medicaid",
    author: "KFF",
    type: "website",
    year: "Ongoing",
    url: "https://www.kff.org/medicaid/",
    publisher: "Kaiser Family Foundation",
    description: {
      en: "The most comprehensive and accessible resource for understanding Medicaid policy, enrollment data, state-by-state comparisons, and the impact of policy changes. Essential for anyone working in Medi-Cal-funded healthcare.",
      es: "El recurso más completo y accesible para entender la política de Medicaid, datos de inscripción, comparaciones estatales y el impacto de cambios de política.",
    },
    topics: ["Medicaid", "policy", "data"],
    featured: true,
  },
  {
    id: "chcf",
    title: "California Health Care Foundation (CHCF)",
    author: "CHCF",
    type: "website",
    year: "Ongoing",
    url: "https://www.chcf.org",
    publisher: "CHCF",
    description: {
      en: "California's leading independent health policy foundation, providing research, data, and analysis on Medi-Cal, community health, and the state's healthcare system. Their reports on Medi-Cal funding cuts are essential reading.",
      es: "La fundación independiente de política de salud líder de California, proporcionando investigación, datos y análisis sobre Medi-Cal y el sistema de salud del estado.",
    },
    topics: ["California health policy", "Medi-Cal", "research"],
    featured: true,
  },
  {
    id: "macpac-medicaid-milestones",
    title: "Federal Legislative Milestones in Medicaid and CHIP",
    author: "MACPAC (Medicaid and CHIP Payment and Access Commission)",
    type: "report",
    year: "Ongoing",
    url: "https://www.macpac.gov/reference-materials/federal-legislative-milestones-in-medicaid-and-chip/",
    publisher: "MACPAC",
    description: {
      en: "The definitive government reference for every major federal legislative change to Medicaid and CHIP from 1965 to the present. Updated regularly.",
      es: "La referencia gubernamental definitiva para cada cambio legislativo federal importante a Medicaid y CHIP desde 1965 hasta el presente.",
    },
    topics: ["Medicaid legislation", "CHIP", "policy history"],
    featured: false,
  },
  {
    id: "geiger-gibson-program",
    title: "Geiger Gibson Program in Community Health",
    author: "George Washington University Milken Institute School of Public Health",
    type: "website",
    year: "Ongoing",
    url: "https://geigergibson.publichealth.gwu.edu/",
    publisher: "GW University",
    description: {
      en: "Named after the founders of the first community health centers, this program at GW University is the leading academic center for research and policy analysis on community health centers.",
      es: "Nombrado en honor a los fundadores de los primeros centros de salud comunitarios, este programa es el centro académico líder para investigación y análisis de políticas sobre centros de salud comunitarios.",
    },
    topics: ["FQHC research", "academic", "policy"],
    featured: false,
  },
  {
    id: "mhp-salud-chw-history",
    title: "History of Community Health Workers (CHWs) in America",
    author: "MHP Salud",
    type: "website",
    year: "Ongoing",
    url: "https://mhpsalud.org/programs/who-are-promotoresas-chws/the-chw-landscape/",
    publisher: "MHP Salud",
    description: {
      en: "Overview of the CHW/promotora landscape in America, including history, certification, and the evolution of CHWs as a recognized profession.",
      es: "Panorama del paisaje CHW/promotora en América, incluyendo historia, certificación y evolución de los CHWs como profesión reconocida.",
    },
    topics: ["community health workers", "promotoras", "CHW history"],
    featured: false,
  },

  // ── Archives ──
  {
    id: "nlm-films-videos",
    title: "National Library of Medicine — Films & Videos Collection",
    author: "National Library of Medicine",
    type: "archive",
    year: "Ongoing",
    url: "https://www.nlm.nih.gov/hmd/collections/films.html",
    publisher: "NLM / NIH",
    description: {
      en: "Over 900 historical medical films from before 1950, including instructional, public health, military, and documentary films. Available on the NLM YouTube channel.",
      es: "Más de 900 películas médicas históricas de antes de 1950, incluyendo películas instructivas, de salud pública, militares y documentales.",
    },
    topics: ["medical history", "film archive", "public health"],
    featured: false,
  },
  {
    id: "cornell-labor-archives",
    title: "Cornell Kheel Center — 1199 & Healthcare Labor Archives",
    author: "Cornell University ILR School",
    type: "archive",
    year: "Ongoing",
    url: "https://guides.library.cornell.edu/latinxlabor/1199",
    publisher: "Cornell University",
    description: {
      en: "Primary source archives of Local 1199's photographs, documents, and oral histories from the 1959 hospital strike, Charleston strike, and decades of healthcare labor organizing. Includes the Moe Foner photographs collection.",
      es: "Archivos de fuentes primarias de las fotografías, documentos e historias orales del Local 1199 de las huelgas hospitalarias y décadas de organización laboral de salud.",
    },
    topics: ["1199", "labor archives", "primary sources"],
    featured: false,
  },

  // ── Labor Relations Training: Management Track ──
  {
    id: "fisher-getting-to-yes",
    title: "Getting to Yes: Negotiating Agreement Without Giving In",
    author: "Roger Fisher, William Ury, Bruce Patton",
    type: "book",
    year: "2011 (3rd ed.)",
    url: "https://www.amazon.com/Getting-Yes-Negotiating-Agreement-Without/dp/0143118757",
    publisher: "Penguin Books",
    description: {
      en: "The foundational text on principled negotiation from the Harvard Negotiation Project. 'Separate people from the problem, focus on interests not positions.' Every manager going into bargaining should read this first. 15 million copies sold.",
      es: "El texto fundacional sobre negociación basada en principios del Proyecto de Negociación de Harvard. 15 millones de copias vendidas.",
    },
    topics: ["negotiation", "bargaining", "management", "labor relations"],
    featured: true,
  },
  {
    id: "kochan-healing-together",
    title: "Healing Together: The Labor-Management Partnership at Kaiser Permanente",
    author: "Thomas A. Kochan, Adrienne E. Eaton, Robert B. McKersie, Paul S. Adler",
    type: "book",
    year: 2009,
    url: "https://www.amazon.com/Healing-Together-Labor-Management-Partnership-Permanente/dp/0801475465",
    publisher: "Cornell University Press",
    description: {
      en: "The definitive case study of the largest healthcare labor-management partnership in U.S. history (27 unions, 8.6M-member Kaiser). Required reading for any FQHC leader considering a collaborative vs. adversarial approach to union relations. Written by MIT and Rutgers labor scholars.",
      es: "El estudio de caso definitivo de la asociación laboral-gerencial más grande en la historia de la salud de EE.UU. Lectura obligatoria para cualquier líder de FQHC considerando un enfoque colaborativo.",
    },
    topics: ["Kaiser Permanente", "labor-management partnership", "healthcare", "management"],
    featured: true,
  },
  {
    id: "allan-healthcare-managers-guide",
    title: "The Healthcare Manager's Guide to Labor Relations",
    author: "Scott Allan, JD",
    type: "book",
    year: 2020,
    url: "https://healthcarelaborlaw.com/product/book-1/",
    publisher: "Independent",
    description: {
      en: "Written specifically for healthcare managers — covers union activity recognition, daily management of unionized staff, and practical examples from real healthcare scenarios. By the founder of The Allan Labor Group (25+ years representing healthcare employers).",
      es: "Escrito específicamente para gerentes de salud — cubre reconocimiento de actividad sindical, gestión diaria de personal sindicalizado y ejemplos prácticos de escenarios reales de salud.",
    },
    topics: ["management", "labor relations", "healthcare", "practical guide"],
    featured: false,
  },
  {
    id: "fmcs-ibb-training",
    title: "FMCS Interest-Based Bargaining Training (Free)",
    author: "Federal Mediation and Conciliation Service",
    type: "website",
    year: "Ongoing",
    url: "https://www.fmcs.gov/services/resolving-labor-management-disputes/collective-bargaining-mediation/",
    publisher: "U.S. Government",
    description: {
      en: "FMCS mediators will come to your organization, train both management and union, and facilitate negotiations — all at no cost. They teach multiple collaborative bargaining models. Healthcare organizations get extended notice periods. The most underutilized free resource available to FQHCs.",
      es: "Los mediadores de FMCS vendrán a su organización, capacitarán tanto a gerencia como al sindicato, y facilitarán negociaciones — todo sin costo. El recurso gratuito más subutilizado disponible para FQHCs.",
    },
    topics: ["mediation", "interest-based bargaining", "free training", "management", "union"],
    featured: true,
  },
  {
    id: "cornell-ilr-lr-certificate",
    title: "eCornell Labor Relations Certificate",
    author: "Cornell University ILR School",
    type: "website",
    year: "Ongoing",
    url: "https://ecornell.cornell.edu/certificates/human-resources/labor-relations/",
    publisher: "Cornell University",
    description: {
      en: "Comprehensive online certificate from the nation's premier labor relations school — 5 courses covering the full collective bargaining process. $3,900, earns 50 professional development hours. The gold standard credential for FQHC HR directors managing union relationships.",
      es: "Certificado integral en línea de la escuela de relaciones laborales más prestigiosa del país — 5 cursos cubriendo el proceso completo de negociación colectiva. $3,900.",
    },
    topics: ["certification", "labor relations", "management", "Cornell"],
    featured: false,
  },
  {
    id: "kaiser-lmp-resources",
    title: "Kaiser Permanente Labor Management Partnership — Free Training Library",
    author: "Kaiser Permanente / Coalition of KP Unions",
    type: "website",
    year: "Ongoing",
    url: "https://www.lmpartnership.org/",
    publisher: "LMPartnership.org",
    description: {
      en: "Free online training materials from the largest healthcare labor-management partnership in U.S. history. Includes interest-based conversation guides, unit-based team toolkits, and the Value Compass framework. The benchmark model FQHCs should study for collaborative union relations.",
      es: "Materiales de capacitación gratuitos de la asociación laboral-gerencial de salud más grande de la historia de EE.UU. Incluye guías de conversación basadas en intereses y herramientas de equipos de unidad.",
    },
    topics: ["Kaiser Permanente", "labor-management partnership", "free training", "management", "union"],
    featured: true,
  },
  {
    id: "john-august-healthcare-blog",
    title: "John August Healthcare Insights Blog",
    author: "John August (former Executive Director, Coalition of KP Unions)",
    type: "website",
    year: "Ongoing",
    url: "https://www.ilr.cornell.edu/scheinman-institute/blog/john-august-healthcare",
    publisher: "Cornell ILR Scheinman Institute",
    description: {
      en: "Ongoing expert analysis of healthcare labor relations trends from someone with 40 years of experience who ran the Kaiser partnership (2006-2013). Covers physician unionization, labor-management partnerships in crisis, and what makes healthcare partnerships succeed or fail. Free.",
      es: "Análisis experto continuo de tendencias en relaciones laborales de salud de alguien con 40 años de experiencia que dirigió la asociación Kaiser. Cubre sindicalización de médicos y asociaciones laborales-gerenciales en crisis. Gratuito.",
    },
    topics: ["healthcare", "labor relations", "expert analysis", "management", "free"],
    featured: false,
  },
  {
    id: "nlrb-employer-rights-guide",
    title: "NLRB Employer/Union Rights and Obligations Guide",
    author: "National Labor Relations Board",
    type: "website",
    year: "Ongoing",
    url: "https://www.nlrb.gov/about-nlrb/rights-we-protect/your-rights/employer-union-rights-and-obligations",
    publisher: "U.S. Government",
    description: {
      en: "Official guide to what employers can and cannot do during organizing, bargaining, and contract administration. Covers mandatory vs. permissive bargaining subjects, good faith requirements, and unfair labor practices. Every FQHC manager needs to read this. Free.",
      es: "Guía oficial sobre lo que los empleadores pueden y no pueden hacer durante organización, negociación y administración de contratos. Cada gerente de FQHC necesita leer esto. Gratuito.",
    },
    topics: ["NLRB", "employer rights", "legal guide", "management", "free"],
    featured: false,
  },
  {
    id: "penn-state-hpi",
    title: "Healthcare Labor-Management Partnership Initiative",
    author: "Penn State School of Labor and Employment Relations",
    type: "website",
    year: "Ongoing",
    url: "https://ler.la.psu.edu/labor-school/healthcare-labor-management-partnership-work/",
    publisher: "Penn State University",
    description: {
      en: "Learning collaborative connecting existing healthcare labor-management partnerships. Virtual networking 3-4 times/year with peer organizations. If your FQHC is considering or already in a labor-management partnership, this network provides peer learning. Free sessions.",
      es: "Colaborativa de aprendizaje que conecta asociaciones laborales-gerenciales de salud existentes. Redes virtuales 3-4 veces al año con organizaciones pares. Sesiones gratuitas.",
    },
    topics: ["partnership", "peer learning", "healthcare", "management", "free"],
    featured: false,
  },

  // ── Labor Relations Training: Worker/Union Track ──
  {
    id: "labornotes-secrets-organizer",
    title: "Secrets of a Successful Organizer (English + Spanish)",
    author: "Alexandra Bradbury, Mark Brenner, Jane Slaughter",
    type: "book",
    year: 2016,
    url: "https://labornotes.org/secrets",
    publisher: "Labor Notes",
    description: {
      en: "The essential step-by-step guide to building power on the job — 47 organizing 'secrets' from identifying issues to designing campaigns. Free downloadable handouts. Full Spanish edition: 'Secretos de un organizador exitoso' at labornotes.org/secretos.",
      es: "La guía esencial paso a paso para construir poder en el trabajo — 47 'secretos' de organización. Folletos descargables gratuitos. Edición completa en español: labornotes.org/secretos.",
    },
    topics: ["organizing", "union", "worker", "bilingual"],
    featured: true,
  },
  {
    id: "mcalevey-no-shortcuts",
    title: "No Shortcuts: Organizing for Power in the New Gilded Age",
    author: "Jane McAlevey",
    type: "book",
    year: 2016,
    url: "https://www.amazon.com/No-Shortcuts-Organizing-Power-Gilded/dp/0190868651",
    publisher: "Oxford University Press",
    description: {
      en: "The definitive argument for deep organizing with mass participation — case studies of successful strike campaigns since 2000 proving that shortcuts don't build lasting power. Essential for any healthcare worker serious about organizing.",
      es: "El argumento definitivo para la organización profunda con participación masiva — estudios de caso de campañas de huelga exitosas demostrando que los atajos no construyen poder duradero.",
    },
    topics: ["organizing", "union", "worker", "strategy"],
    featured: true,
  },
  {
    id: "mcalevey-raising-expectations",
    title: "Raising Expectations (and Raising Hell): My Decade Fighting for the Labor Movement",
    author: "Jane McAlevey & Bob Ostertag",
    type: "book",
    year: 2012,
    url: "https://www.amazon.com/Raising-Expectations-Hell-Fighting-Movement/dp/1781683158",
    publisher: "Verso Books",
    description: {
      en: "McAlevey's account of organizing healthcare workers — nurses, nursing home workers, home health aides — in Las Vegas and beyond. The most directly relevant book for FQHC healthcare worker organizing. Develops the 'whole worker' organizing theory.",
      es: "La crónica de McAlevey sobre la organización de trabajadores de salud — enfermeras, trabajadores de hogares de ancianos, asistentes de salud a domicilio. El libro más relevante para organización de trabajadores de FQHC.",
    },
    topics: ["healthcare organizing", "union", "worker", "memoir"],
    featured: false,
  },
  {
    id: "schwartz-legal-rights-stewards",
    title: "The Legal Rights of Union Stewards (7th Edition)",
    author: "Robert M. Schwartz",
    type: "book",
    year: "2025 (7th ed.)",
    url: "https://labornotes.org/store/legal-rights-union-stewards",
    publisher: "Labor Notes / Work Rights Press",
    description: {
      en: "The most popular union steward legal guide (1M+ copies in print). Covers the NLRA, grievance process, Weingarten rights, challenging unilateral changes, and protections for pregnant/breastfeeding workers. Updated 7th edition 2025.",
      es: "La guía legal para delegados sindicales más popular (1M+ copias). Cubre la NLRA, proceso de quejas, derechos Weingarten y protecciones para trabajadoras embarazadas. 7a edición 2025.",
    },
    topics: ["steward", "legal rights", "union", "worker"],
    featured: false,
  },
  {
    id: "nlrb-your-rights",
    title: "NLRB 'Your Rights' Guide + Know Your Rights Cards (17 Languages)",
    author: "National Labor Relations Board",
    type: "website",
    year: "Ongoing",
    url: "https://www.nlrb.gov/about-nlrb/rights-we-protect/your-rights",
    publisher: "U.S. Government",
    description: {
      en: "Official Section 7 rights guide — the right to organize, form/join unions, bargain collectively, and engage in concerted activity. Know Your Rights pocket cards available in Spanish and 16 other languages. NLRB hotline: 844-762-6572 (English/Spanish). Free.",
      es: "Guía oficial de derechos Sección 7. Tarjetas de 'Conozca sus Derechos' disponibles en español y 16 idiomas más. Línea directa: 844-762-6572 (español/inglés). Gratuito.",
    },
    topics: ["rights", "NLRB", "worker", "bilingual", "free"],
    featured: true,
  },
  {
    id: "ewoc-fundamentals",
    title: "EWOC Fundamentals of Workplace Organizing (Free Online)",
    author: "Emergency Workplace Organizing Committee (DSA + UE)",
    type: "website",
    year: "Ongoing",
    url: "https://workerorganizing.org/training/",
    publisher: "EWOC",
    description: {
      en: "Free 4-session online workshop series (90 min/week) covering fundamental shop-floor organizing: uniting coworkers, addressing issues, building an organizing committee. Also offers the free 'Unite & Win' handbook.",
      es: "Serie de 4 talleres gratuitos en línea (90 min/semana) cubriendo organización fundamental: unir compañeros, abordar problemas, construir un comité organizador.",
    },
    topics: ["organizing", "free training", "worker", "online"],
    featured: false,
  },
  {
    id: "seiu-steward-manual",
    title: "SEIU Complete Stewards Manual (Free Online)",
    author: "SEIU International",
    type: "website",
    year: "Ongoing",
    url: "https://www.seiu.org/cards/the-complete-stewards-manual/",
    publisher: "SEIU",
    description: {
      en: "Comprehensive online manual covering all aspects of union steward representation — including a dedicated Weingarten rights chapter. Free. The essential reference for SEIU stewards at FQHCs.",
      es: "Manual integral en línea cubriendo todos los aspectos de representación sindical — incluyendo un capítulo dedicado a derechos Weingarten. Gratuito.",
    },
    topics: ["steward", "SEIU", "worker", "free"],
    featured: false,
  },
  {
    id: "labornotes-troublemakers-school",
    title: "Labor Notes Troublemakers Schools + Biennial Conference",
    author: "Labor Notes",
    type: "website",
    year: "Ongoing",
    url: "https://labornotes.org/events",
    publisher: "Labor Notes",
    description: {
      en: "Day-long workshops held across the US teaching organizing skills ($20-40 sliding scale). Bay Area sessions in Oakland. The big Labor Notes Conference (June 2026, Chicago) has 200+ workshops. The most energizing training available for rank-and-file healthcare workers.",
      es: "Talleres de un día en todo EE.UU. enseñando habilidades de organización ($20-40 escala deslizante). Sesiones del Área de la Bahía en Oakland. Conferencia bienal con 200+ talleres.",
    },
    topics: ["organizing", "training", "worker", "conference"],
    featured: false,
  },
  {
    id: "ucla-losh-bilingual",
    title: "UCLA LOSH Bilingual Worker Health & Safety Training (Free)",
    author: "UCLA Labor Occupational Safety and Health Program",
    type: "website",
    year: "Ongoing",
    url: "https://losh.ucla.edu/community-based-worker-education/",
    publisher: "UCLA",
    description: {
      en: "All health and safety training courses offered in both English and Spanish, free of charge. Uses bilingual promotores to reach immigrant workers across Southern California. Trains ~2,000 workers/year. The best free bilingual safety training in California.",
      es: "Todos los cursos de capacitación en salud y seguridad ofrecidos en inglés y español, sin costo. Usa promotores bilingües. Capacita ~2,000 trabajadores/año. La mejor capacitación bilingüe gratuita en California.",
    },
    topics: ["safety", "bilingual", "worker", "free", "Spanish"],
    featured: false,
  },
  {
    id: "ca-dir-sb525-faq",
    title: "SB 525 Healthcare Worker Minimum Wage FAQ",
    author: "California DIR / DLSE",
    type: "website",
    year: "Ongoing",
    url: "https://www.dir.ca.gov/dlse/Health-Care-Worker-Minimum-Wage-FAQ.htm",
    publisher: "CA Department of Industrial Relations",
    description: {
      en: "Official guide to SB 525 healthcare minimum wage. Key FQHC rates: $21/hr now, $23/hr July 2026, $25/hr July 2028. Covers who qualifies, exempt employee thresholds, and enforcement. Free. Every FQHC worker and manager should bookmark this.",
      es: "Guía oficial del salario mínimo de salud SB 525. Tarifas clave de FQHC: $21/hr ahora, $23/hr julio 2026, $25/hr julio 2028. Gratuito. Cada trabajador y gerente de FQHC debe marcar esto.",
    },
    topics: ["SB 525", "minimum wage", "worker", "management", "free"],
    featured: true,
  },
  {
    id: "uc-berkeley-know-your-rights",
    title: "Know Your Rights at Work (6 Languages)",
    author: "UC Berkeley Labor Center",
    type: "website",
    year: "Ongoing",
    url: "https://laborcenter.berkeley.edu/knowyourrights/",
    publisher: "UC Berkeley",
    description: {
      en: "Basic California labor rights guide available in English, Spanish, Korean, Mandarin, Tagalog, and Vietnamese. Covers wages, overtime, breaks, sick leave, safe workplace, and union rights. Free printable flyer.",
      es: "Guía de derechos laborales de California en español, inglés, coreano, mandarín, tagalo y vietnamita. Cubre salarios, horas extra, descansos, licencia por enfermedad y derechos sindicales. Gratuito.",
    },
    topics: ["rights", "bilingual", "worker", "free", "multilingual"],
    featured: false,
  },
  {
    id: "nuhw-organizer-program",
    title: "NUHW Organizer-in-Training Program",
    author: "National Union of Healthcare Workers",
    type: "website",
    year: "Ongoing",
    url: "https://home.nuhw.org/members/education-and-training/organizer-in-training-program/",
    publisher: "NUHW",
    description: {
      en: "3-day intensive training followed by a 3-month paid apprenticeship providing skills to be effective healthcare organizers. For NUHW members interested in moving from steward to organizer. Travel and accommodation reimbursed.",
      es: "Capacitación intensiva de 3 días seguida de aprendizaje remunerado de 3 meses. Para miembros de NUHW interesados en pasar de delegado a organizador.",
    },
    topics: ["organizing", "training", "NUHW", "worker", "healthcare"],
    featured: false,
  },
  {
    id: "uc-berkeley-collective-bargaining-safety",
    title: "Collective Bargaining for Health and Safety (2024 Edition)",
    author: "UC Berkeley Labor Occupational Health Program",
    type: "report",
    year: 2024,
    url: "https://lohp.berkeley.edu/collective-bargaining/",
    publisher: "UC Berkeley",
    description: {
      en: "Practical guide with real contract language examples covering infectious disease (critical for FQHCs), workplace violence, hazardous materials, ergonomics, and new technology introduction. Updated 2024 with climate change and AI sections. Free.",
      es: "Guía práctica con ejemplos reales de lenguaje contractual cubriendo enfermedades infecciosas, violencia laboral y nuevas tecnologías. Actualizado 2024. Gratuito.",
    },
    topics: ["collective bargaining", "safety", "contract language", "worker", "management", "free"],
    featured: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

export function getUnionById(id: string): UnionProfile | undefined {
  return UNION_DIRECTORY.find((u) => u.id === id);
}

export function getUnionsForFqhc(fqhcSlug: string): UnionProfile[] {
  return UNION_DIRECTORY.filter((u) => u.fqhcsRepresented.includes(fqhcSlug));
}

export function getResourcesByType(type: CuratedResource["type"]): CuratedResource[] {
  return CURATED_RESOURCES.filter((r) => r.type === type);
}

export function getFeaturedResources(): CuratedResource[] {
  return CURATED_RESOURCES.filter((r) => r.featured);
}

export function getTimelineByRegion(region: LaborTimelineEvent["region"]): LaborTimelineEvent[] {
  return LABOR_TIMELINE.filter((e) => e.region === region);
}

export function getTimelineByCategory(category: LaborTimelineEvent["category"]): LaborTimelineEvent[] {
  return LABOR_TIMELINE.filter((e) => e.category === category);
}

/** Get all news items marked as wins across all unions, sorted by date desc */
export function getLaborWins(): (UnionNewsItem & { unionName: string; unionAbbr: string })[] {
  const wins: (UnionNewsItem & { unionName: string; unionAbbr: string })[] = [];
  for (const union of UNION_DIRECTORY) {
    for (const news of union.recentNews) {
      if (news.isWin) {
        wins.push({ ...news, unionName: union.name, unionAbbr: union.abbreviation });
      }
    }
  }
  return wins.sort((a, b) => b.date.localeCompare(a.date));
}

/** Check if a specific FQHC slug has union representation */
export function isUnionWorkplace(fqhcSlug: string): boolean {
  return UNION_DIRECTORY.some((u) =>
    u.fqhcsRepresented.includes(fqhcSlug)
  );
}

/* ------------------------------------------------------------------ */
/*  Common Interest Framework — Labor-Management Partnership            */
/* ------------------------------------------------------------------ */

export interface CommonInterestItem {
  id: string;
  category: "patients" | "staff" | "organization";
  title: { en: string; es: string };
  description: { en: string; es: string };
  examples: { en: string; es: string }[];
  icon: string; // emoji
}

export const COMMON_INTEREST_INTRO = {
  en: "In mission-driven healthcare, labor and management share a fundamental goal: better outcomes for patients, staff, and the organization. Unlike adversarial bargaining, the common interest approach recognizes that when staff are supported, patients get better care — and when patients get better care, the FQHC hits its quality metrics and secures its funding. Everyone wins.",
  es: "En la atención médica impulsada por la misión, el trabajo y la administración comparten un objetivo fundamental: mejores resultados para pacientes, personal y la organización. A diferencia de la negociación adversarial, el enfoque de interés común reconoce que cuando el personal está apoyado, los pacientes reciben mejor atención — y cuando los pacientes reciben mejor atención, el FQHC cumple sus métricas de calidad y asegura su financiamiento. Todos ganan.",
};

export const COMMON_INTEREST_FRAMEWORK: CommonInterestItem[] = [
  // ── Patient Outcomes ──
  {
    id: "ci-patient-continuity",
    category: "patients",
    title: {
      en: "Care Continuity & Trust",
      es: "Continuidad de Atención y Confianza",
    },
    description: {
      en: "When staff are retained through fair contracts and working conditions, patients see the same CHW, nurse, or care coordinator visit after visit. This continuity builds the deep trust that makes community health work effective — especially in under-resourced populations with historical distrust of healthcare systems.",
      es: "Cuando el personal es retenido mediante contratos justos y condiciones de trabajo, los pacientes ven al mismo promotor, enfermera o coordinador de atención visita tras visita. Esta continuidad construye la confianza profunda que hace efectivo el trabajo de salud comunitaria — especialmente en poblaciones con acceso limitado a la atenci\u00f3n con desconfianza hist\u00f3rica del sistema de salud.",
    },
    examples: [
      { en: "Union contracts that include retention bonuses reduce turnover by 15-25%", es: "Los contratos sindicales que incluyen bonos de retención reducen la rotación en 15-25%" },
      { en: "Patients in continuity-of-care models show 30% better chronic disease management", es: "Los pacientes en modelos de continuidad de atención muestran 30% mejor manejo de enfermedades crónicas" },
      { en: "SEIU-UHW's $1,000 retention bonus at California FQHCs directly supports care continuity", es: "El bono de retención de $1,000 de SEIU-UHW en FQHCs de California apoya directamente la continuidad de atención" },
    ],
    icon: "🤝",
  },
  {
    id: "ci-patient-language",
    category: "patients",
    title: {
      en: "Language-Concordant Care",
      es: "Atención Concordante con el Idioma",
    },
    description: {
      en: "Union advocacy for bilingual pay differentials and culturally competent staffing directly improves patient outcomes. When a Spanish-speaking patient can communicate directly with their CHW, medication adherence improves, emergency visits decrease, and preventive care utilization increases.",
      es: "La defensa sindical por diferenciales salariales bilingües y personal culturalmente competente mejora directamente los resultados de los pacientes. Cuando un paciente hispanohablante puede comunicarse directamente con su promotor, la adherencia a medicamentos mejora, las visitas de emergencia disminuyen y la utilización de atención preventiva aumenta.",
    },
    examples: [
      { en: "Language-concordant care reduces 30-day hospital readmissions by 25%", es: "La atención concordante con el idioma reduce las rehospitalizaciones a 30 días en un 25%" },
      { en: "Bilingual CHWs typically earn $2,000-$5,000 more through union-negotiated differentials", es: "Los promotores bilingües típicamente ganan $2,000-$5,000 más a través de diferenciales negociados por sindicatos" },
    ],
    icon: "🗣️",
  },
  // ── Staff Wellbeing ──
  {
    id: "ci-staff-wages",
    category: "staff",
    title: {
      en: "Fair Wages & SB 525",
      es: "Salarios Justos y SB 525",
    },
    description: {
      en: "SB 525 established a $25/hour minimum wage for healthcare workers at FQHCs (phased by 2027). This landmark legislation — championed by SEIU-UHW — creates a wage floor that reduces turnover, improves financial stability for workers, and ensures FQHCs can compete with hospitals for talent.",
      es: "SB 525 estableció un salario mínimo de $25/hora para trabajadores de salud en FQHCs (gradual hasta 2027). Esta legislación histórica — liderada por SEIU-UHW — crea un piso salarial que reduce la rotación, mejora la estabilidad financiera de los trabajadores y asegura que los FQHCs puedan competir con hospitales por talento.",
    },
    examples: [
      { en: "SB 525 will raise wages for an estimated 400,000+ healthcare workers in California", es: "SB 525 aumentará los salarios de un estimado de 400,000+ trabajadores de salud en California" },
      { en: "For FQHCs, the $25/hr floor phases to $25 by June 2027 — with annual increases thereafter", es: "Para los FQHCs, el piso de $25/hr llega a $25 para junio de 2027 — con aumentos anuales después" },
      { en: "Union-negotiated wages already exceed SB 525 minimums at many FQHCs", es: "Los salarios negociados por sindicatos ya superan los mínimos de SB 525 en muchos FQHCs" },
    ],
    icon: "💰",
  },
  {
    id: "ci-staff-training",
    category: "staff",
    title: {
      en: "Professional Development & Career Ladders",
      es: "Desarrollo Profesional y Escaleras de Carrera",
    },
    description: {
      en: "The SEIU-UHW High-Road Training Partnership secured $13.3 million for community health worker training and upskilling. Union-negotiated training funds allow CHWs to earn certifications, care coordinators to advance to supervisory roles, and MAs to pursue nursing degrees — all while staying employed at FQHCs.",
      es: "La Asociación de Capacitación High-Road de SEIU-UHW aseguró $13.3 millones para la capacitación y mejora de habilidades de promotores de salud. Los fondos de capacitación negociados por sindicatos permiten a los promotores obtener certificaciones, a los coordinadores avanzar a roles de supervisión y a los asistentes médicos buscar títulos de enfermería — todo mientras permanecen empleados en FQHCs.",
    },
    examples: [
      { en: "$13.3 million SEIU-UHW High-Road Training Partnership for community health workers", es: "$13.3 millones de la Asociación de Capacitación High-Road de SEIU-UHW para promotores de salud" },
      { en: "Asian Health Services' 2023 union contract included 21% raises over 3 years", es: "El contrato sindical 2023 de Asian Health Services incluyó aumentos del 21% en 3 años" },
      { en: "Union contracts often include tuition reimbursement ($1,500-$5,000/year)", es: "Los contratos sindicales a menudo incluyen reembolso de matrícula ($1,500-$5,000/año)" },
    ],
    icon: "📈",
  },
  {
    id: "ci-staff-burnout",
    category: "staff",
    title: {
      en: "Burnout Prevention & Manageable Caseloads",
      es: "Prevención del Agotamiento y Cargas de Trabajo Manejables",
    },
    description: {
      en: "Community health workers carry some of the heaviest emotional loads in healthcare — serving patients experiencing homelessness, addiction, domestic violence, and immigration trauma. Union contracts that cap caseloads and guarantee mental health support days protect workers from the burnout that destroys FQHC workforce stability.",
      es: "Los promotores de salud llevan algunas de las cargas emocionales más pesadas en atención médica — sirviendo a pacientes que experimentan falta de vivienda, adicción, violencia doméstica y trauma migratorio. Los contratos sindicales que limitan las cargas de trabajo y garantizan días de apoyo de salud mental protegen a los trabajadores del agotamiento que destruye la estabilidad de la fuerza laboral de los FQHCs.",
    },
    examples: [
      { en: "Union-negotiated caseload caps: CHW 40-60 patients (vs. 80-100 without contract)", es: "Límites de caseload negociados por sindicatos: promotor 40-60 pacientes (vs. 80-100 sin contrato)" },
      { en: "Mental health days and EAP (Employee Assistance Program) access in union contracts", es: "Días de salud mental y acceso a EAP en contratos sindicales" },
    ],
    icon: "🛡️",
  },
  // ── Organizational Sustainability ──
  {
    id: "ci-org-retention",
    category: "organization",
    title: {
      en: "Workforce Retention Reduces Costs",
      es: "La Retención de Personal Reduce Costos",
    },
    description: {
      en: "Replacing a single CHW costs $8,000-$15,000 (recruiting, onboarding, training, lost productivity). For an RN, that number is $40,000-$60,000. Union contracts that improve retention through fair wages, career ladders, and working conditions directly save FQHCs money — and protect the institutional knowledge that takes years to build.",
      es: "Reemplazar a un solo promotor cuesta $8,000-$15,000 (reclutamiento, incorporación, capacitación, productividad perdida). Para una enfermera, ese número es $40,000-$60,000. Los contratos sindicales que mejoran la retención a través de salarios justos, escaleras de carrera y condiciones de trabajo directamente ahorran dinero a los FQHCs — y protegen el conocimiento institucional que toma años construir.",
    },
    examples: [
      { en: "FQHC average turnover: 25-35% annually; unionized FQHCs report 15-20%", es: "Rotación promedio en FQHCs: 25-35% anual; FQHCs sindicalizados reportan 15-20%" },
      { en: "Cost of turnover per CHW: $8,000-$15,000; per RN: $40,000-$60,000", es: "Costo de rotación por promotor: $8,000-$15,000; por enfermera: $40,000-$60,000" },
      { en: "Stable teams score 15-20% higher on HEDIS quality measures", es: "Equipos estables obtienen 15-20% más en medidas de calidad HEDIS" },
    ],
    icon: "📊",
  },
  {
    id: "ci-org-quality",
    category: "organization",
    title: {
      en: "Quality Metrics & Funding Compliance",
      es: "Métricas de Calidad y Cumplimiento de Fondos",
    },
    description: {
      en: "FQHCs that maintain stable, well-trained workforces consistently perform better on UDS (Uniform Data System) reporting, HEDIS measures, and managed care contract performance benchmarks. These metrics directly affect grant renewals, managed care capitation rates, and CalAIM ECM contract awards. Labor-management partnership is a strategy for financial sustainability.",
      es: "Los FQHCs que mantienen fuerzas laborales estables y bien capacitadas consistentemente tienen mejor desempeño en reportes UDS (Sistema Uniforme de Datos), medidas HEDIS y benchmarks de desempeño de contratos de atención administrada. Estas métricas afectan directamente las renovaciones de subvenciones, las tasas de capitación de atención administrada y la adjudicación de contratos CalAIM ECM. La asociación laboral-administrativa es una estrategia para la sostenibilidad financiera.",
    },
    examples: [
      { en: "HRSA Section 330 grant renewals require strong UDS performance — driven by stable teams", es: "Las renovaciones de subvenciones HRSA Sección 330 requieren buen desempeño UDS — impulsado por equipos estables" },
      { en: "Managed care plans increasingly tie capitation bonuses to quality metrics", es: "Los planes de atención administrada cada vez más vinculan bonos de capitación a métricas de calidad" },
      { en: "CalAIM ECM contracts award to FQHCs that demonstrate 85%+ member engagement rates", es: "Los contratos CalAIM ECM se otorgan a FQHCs que demuestran tasas de compromiso de miembros del 85%+" },
    ],
    icon: "✅",
  },
];
