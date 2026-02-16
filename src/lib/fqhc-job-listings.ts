// fqhc-job-listings.ts
// Realistic job listing data for California FQHCs
// Used to populate the directory's job listings section

export interface FQHCJobListing {
  id: string;
  fqhcSlug: string;      // matches the FQHC slug in california-fqhcs.ts
  title: string;
  roleType: string;       // e.g., "CHW", "Care Coordinator", "RN", "Medical Assistant", etc.
  department: string;     // e.g., "ECM Program", "Primary Care", "Behavioral Health", "Administration"
  salaryMin: number;
  salaryMax: number;
  type: "Full-time" | "Part-time" | "Per Diem";
  location: string;       // city name
  bilingual: boolean;     // Spanish/English preferred
  ehrSystem: string;      // matches the FQHC's EHR
  programs: string[];     // relevant programs (ECM, CCM, etc.)
  postedDate: string;     // ISO date string
  description: string;    // 1-2 sentence description
  requirements: string[]; // 3-4 bullet points
  languageRequired?: string | null;   // e.g., "Spanish" — language required for the role
  languagePreferred?: string[] | null; // e.g., ["Spanish", "Vietnamese"] — preferred languages
}

export const fqhcJobListings: FQHCJobListing[] = [
  // ─────────────────────────────────────────────
  // ALTAMED HEALTH SERVICES (8 listings - major FQHC)
  // ─────────────────────────────────────────────
  {
    id: "altamed-001",
    fqhcSlug: "altamed-health-services",
    title: "Community Health Worker - ECM Program",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 48000,
    salaryMax: 58000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Join AltaMed's ECM Program as a Community Health Worker, providing patient engagement and care coordination for complex patients with multiple chronic conditions.",
    requirements: [
      "High school diploma or GED required; some college preferred",
      "Fluent in Spanish and English",
      "Proven ability to build trust with diverse populations",
      "Valid driver's license with reliable transportation"
    ]
  },
  {
    id: "altamed-002",
    fqhcSlug: "altamed-health-services",
    title: "Care Coordinator - Behavioral Health",
    roleType: "Care Coordinator",
    department: "Behavioral Health",
    salaryMin: 50000,
    salaryMax: 65000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-07",
    description: "Support patients with mental health needs and substance use disorders in coordinating their care across multiple providers and services.",
    requirements: [
      "Bachelor's degree in social work, psychology, or health sciences",
      "Experience with care coordination or patient navigation",
      "Strong organizational and communication skills",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "altamed-003",
    fqhcSlug: "altamed-health-services",
    title: "Registered Nurse - Primary Care",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 85000,
    salaryMax: 105000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-06",
    description: "Provide nursing care in our busy primary care clinic, conducting assessments, patient education, and chronic disease management.",
    requirements: [
      "Current California RN license",
      "BSN preferred; ADN with plan to complete BSN within 2 years",
      "Experience in primary care or community health setting",
      "Knowledge of EPIC EHR system preferred"
    ]
  },
  {
    id: "altamed-004",
    fqhcSlug: "altamed-health-services",
    title: "Program Manager - Community Supports",
    roleType: "Program Manager",
    department: "Administration",
    salaryMin: 78000,
    salaryMax: 98000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["Community Supports"],
    postedDate: "2026-02-05",
    description: "Oversee AltaMed's Community Supports program, managing staff, budget, and program outcomes for services addressing social determinants of health.",
    requirements: [
      "Master's degree in public health, business administration, or related field",
      "3+ years of experience in program management",
      "Strong leadership and fiscal management skills",
      "Experience with grants management and evaluation"
    ]
  },
  {
    id: "altamed-005",
    fqhcSlug: "altamed-health-services",
    title: "Medical Assistant - Multi-Site",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 42000,
    salaryMax: 54000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-04",
    description: "Support clinical staff at AltaMed's primary care clinics by assisting with patient care, vital signs, and EHR documentation.",
    requirements: [
      "High school diploma or GED",
      "CMA certification preferred or willingness to obtain within 1 year",
      "Phlebotomy certification preferred",
      "Bilingual Spanish/English strongly preferred"
    ]
  },
  {
    id: "altamed-006",
    fqhcSlug: "altamed-health-services",
    title: "Behavioral Health Specialist",
    roleType: "Behavioral Health Specialist",
    department: "Behavioral Health",
    salaryMin: 58000,
    salaryMax: 78000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-03",
    description: "Deliver mental health counseling and treatment services to AltaMed patients in a culturally competent, compassionate manner.",
    requirements: [
      "Master's degree in mental health field or equivalent experience",
      "LMFT, LPCC, or LCSW licensure in California",
      "Experience in community mental health settings",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "altamed-007",
    fqhcSlug: "altamed-health-services",
    title: "Nurse Practitioner - Senior Health",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 128000,
    salaryMax: 155000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-02",
    description: "Serve as lead provider for AltaMed's senior health services, managing complex patients and building strong team relationships.",
    requirements: [
      "Current California NP license with prescribing authority",
      "Master's or DNP degree required",
      "Experience in primary care, geriatrics, or community health",
      "Strong clinical and leadership capabilities"
    ]
  },
  {
    id: "altamed-008",
    fqhcSlug: "altamed-health-services",
    title: "EHR Analyst",
    roleType: "EHR Analyst",
    department: "Administration",
    salaryMin: 62000,
    salaryMax: 76000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-01",
    description: "Support OCHIN Epic implementation and optimization across AltaMed sites, providing training and troubleshooting to clinical and administrative staff.",
    requirements: [
      "2+ years of EHR support or analyst experience",
      "EPIC experience required; OCHIN experience preferred",
      "Strong problem-solving and technical skills",
      "Excellent communication and training abilities"
    ]
  },

  // ─────────────────────────────────────────────
  // NORTHEAST VALLEY HEALTH CORPORATION (7 listings)
  // ─────────────────────────────────────────────
  {
    id: "nevhc-001",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Community Health Worker - Care Coordination",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 56000,
    type: "Full-time",
    location: "San Fernando",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Work with high-risk patients in the San Fernando Valley to coordinate care, manage medications, and support lifestyle changes.",
    requirements: [
      "High school diploma or equivalent",
      "Spanish/English bilingual required",
      "Experience in community outreach preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "nevhc-002",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Medical Assistant - Multi-Clinic",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 41000,
    salaryMax: 52000,
    type: "Full-time",
    location: "Santa Clarita",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-07",
    description: "Assist with patient intake, vital signs, and clinical support across NEVHC's Santa Clarita Valley clinics.",
    requirements: [
      "CMA certification or equivalent",
      "Phlebotomy experience preferred",
      "Spanish language skills preferred",
      "Ability to manage multiple patients efficiently"
    ]
  },
  {
    id: "nevhc-003",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Licensed Clinical Social Worker",
    roleType: "Licensed Clinical Social Worker",
    department: "Behavioral Health",
    salaryMin: 82000,
    salaryMax: 102000,
    type: "Full-time",
    location: "San Fernando",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-06",
    description: "Provide clinical social work services to NEVHC patients addressing mental health, substance use, and psychosocial issues.",
    requirements: [
      "Current California LCSW license",
      "Master's degree in social work",
      "3+ years of clinical experience",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "nevhc-004",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Case Manager - CCM Program",
    roleType: "Case Manager",
    department: "CCM Program",
    salaryMin: 52000,
    salaryMax: 68000,
    type: "Full-time",
    location: "San Fernando",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["CCM"],
    postedDate: "2026-02-05",
    description: "Manage Chronic Care Management cases for NEVHC patients, coordinating multidisciplinary care teams and tracking outcomes.",
    requirements: [
      "Bachelor's degree or equivalent work experience",
      "RN licensure or Master's degree in related field preferred",
      "2+ years care management experience",
      "Knowledge of CCM/TCM billing preferred"
    ]
  },
  {
    id: "nevhc-005",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Registered Nurse - Behavioral Health",
    roleType: "Registered Nurse",
    department: "Behavioral Health",
    salaryMin: 88000,
    salaryMax: 108000,
    type: "Full-time",
    location: "San Fernando",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-04",
    description: "Lead nursing care for NEVHC's behavioral health clinic, conducting assessments and collaborating with mental health specialists.",
    requirements: [
      "Current California RN license",
      "BSN preferred; ADN acceptable with experience",
      "Experience in behavioral health nursing",
      "Knowledge of psychiatric medications and crisis intervention"
    ]
  },
  {
    id: "nevhc-006",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Health Educator",
    roleType: "Health Educator",
    department: "Community Supports",
    salaryMin: 48000,
    salaryMax: 62000,
    type: "Full-time",
    location: "Santa Clarita",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["Community Supports"],
    postedDate: "2026-02-03",
    description: "Develop and deliver health education programs for NEVHC patients focusing on chronic disease management and prevention.",
    requirements: [
      "Bachelor's degree in health education or public health",
      "Experience developing educational materials",
      "Excellent presentation and facilitation skills",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "nevhc-007",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Nurse Practitioner - Primary Care",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 130000,
    salaryMax: 160000,
    type: "Full-time",
    location: "San Fernando",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-02",
    description: "Provide comprehensive primary care services to diverse San Fernando Valley communities as part of NEVHC's care team.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "Minimum 2 years primary care experience",
      "Strong communication and cultural competency skills"
    ]
  },

  // ─────────────────────────────────────────────
  // ST. JOHN'S COMMUNITY HEALTH (6 listings)
  // ─────────────────────────────────────────────
  {
    id: "stjohns-001",
    fqhcSlug: "st-johns-community-health",
    title: "Community Health Worker - TCM",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "TCM"],
    postedDate: "2026-02-08",
    description: "Support transitional care management for St. John's patients moving between hospital and community settings.",
    requirements: [
      "High school diploma or GED",
      "Bilingual Spanish/English preferred",
      "Experience with patient advocacy",
      "Valid driver's license and reliable transportation"
    ]
  },
  {
    id: "stjohns-002",
    fqhcSlug: "st-johns-community-health",
    title: "Medical Assistant",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 43000,
    salaryMax: 55000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-07",
    description: "Provide direct patient care support at St. John's primary care clinics across Los Angeles.",
    requirements: [
      "CMA or RMA certification",
      "Phlebotomy and EHR experience",
      "Spanish language skills preferred",
      "Commitment to serving underserved populations"
    ]
  },
  {
    id: "stjohns-003",
    fqhcSlug: "st-johns-community-health",
    title: "Care Coordinator - Complex Cases",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 51000,
    salaryMax: 67000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-06",
    description: "Coordinate care for St. John's most complex patients with multiple chronic conditions and psychosocial needs.",
    requirements: [
      "Bachelor's degree in healthcare field or equivalent experience",
      "Certification in care coordination or case management preferred",
      "3+ years in similar role",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "stjohns-004",
    fqhcSlug: "st-johns-community-health",
    title: "Registered Nurse - Chronic Disease",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 87000,
    salaryMax: 107000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-05",
    description: "Lead care for patients with multiple chronic diseases at St. John's Community Health centers.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with experience",
      "Experience with chronic disease management",
      "Knowledge of community resources"
    ]
  },
  {
    id: "stjohns-005",
    fqhcSlug: "st-johns-community-health",
    title: "Program Manager - Community Supports",
    roleType: "Program Manager",
    department: "Community Supports",
    salaryMin: 76000,
    salaryMax: 96000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "OCHIN Epic",
    programs: ["Community Supports"],
    postedDate: "2026-02-04",
    description: "Oversee St. John's community support services addressing social determinants of health.",
    requirements: [
      "Master's degree in public health or related field",
      "3+ years program management experience",
      "Strong organizational and fiscal skills",
      "Experience with vulnerable populations"
    ]
  },
  {
    id: "stjohns-006",
    fqhcSlug: "st-johns-community-health",
    title: "Nurse Practitioner",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 132000,
    salaryMax: 162000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-03",
    description: "Provide comprehensive primary care services as part of St. John's clinical team.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "Minimum 1-2 years primary care experience",
      "Commitment to serving homeless and underserved populations"
    ]
  },

  // ─────────────────────────────────────────────
  // FAMILY HEALTH CENTERS OF SAN DIEGO (6 listings)
  // ─────────────────────────────────────────────
  {
    id: "fhcsd-001",
    fqhcSlug: "family-health-centers-of-san-diego",
    title: "Community Health Worker - Housing Support",
    roleType: "Community Health Worker",
    department: "Community Supports",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "San Diego",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "NextGen",
    programs: ["Community Supports"],
    postedDate: "2026-02-08",
    description: "Support homeless and unstably housed patients in accessing housing, benefits, and other social services through Family Health Centers.",
    requirements: [
      "High school diploma or equivalent",
      "Lived experience with housing insecurity preferred",
      "Spanish/English bilingual preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "fhcsd-002",
    fqhcSlug: "family-health-centers-of-san-diego",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "San Diego",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "NextGen",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for FHCSD patients with complex medical and social needs.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Strong cultural competency skills",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "fhcsd-003",
    fqhcSlug: "family-health-centers-of-san-diego",
    title: "Medical Assistant",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 42000,
    salaryMax: 53000,
    type: "Full-time",
    location: "San Diego",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "NextGen",
    programs: [],
    postedDate: "2026-02-06",
    description: "Provide clinical support across FHCSD's 47 San Diego County sites.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy experience",
      "Spanish language skills preferred",
      "Ability to work in fast-paced environment"
    ]
  },
  {
    id: "fhcsd-004",
    fqhcSlug: "family-health-centers-of-san-diego",
    title: "Registered Nurse - Primary Care",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 86000,
    salaryMax: 106000,
    type: "Full-time",
    location: "San Diego",
    bilingual: false,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-05",
    description: "Provide nursing care across Family Health Centers' primary care clinics.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with experience",
      "Experience in community health settings",
      "Knowledge of NextGen EHR preferred"
    ]
  },
  {
    id: "fhcsd-005",
    fqhcSlug: "family-health-centers-of-san-diego",
    title: "Behavioral Health Specialist",
    roleType: "Behavioral Health Specialist",
    department: "Behavioral Health",
    salaryMin: 57000,
    salaryMax: 76000,
    type: "Full-time",
    location: "San Diego",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "NextGen",
    programs: ["BH Integration"],
    postedDate: "2026-02-04",
    description: "Deliver mental health services to diverse San Diego communities through FHCSD.",
    requirements: [
      "Master's degree in mental health field",
      "LMFT, LPCC, or LCSW license",
      "Experience in community mental health",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "fhcsd-006",
    fqhcSlug: "family-health-centers-of-san-diego",
    title: "Nurse Practitioner - Primary Care",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 131000,
    salaryMax: 161000,
    type: "Full-time",
    location: "San Diego",
    bilingual: false,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-03",
    description: "Serve as lead provider for FHCSD's comprehensive primary care services.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "2+ years primary care experience",
      "Strong clinical decision-making abilities"
    ]
  },

  // ─────────────────────────────────────────────
  // SAN YSIDRO HEALTH (6 listings)
  // ─────────────────────────────────────────────
  {
    id: "syhealth-001",
    fqhcSlug: "san-ysidro-health",
    title: "Community Health Worker - Border Health",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "San Ysidro",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Serve border communities in San Ysidro and surrounding areas, providing community outreach and care coordination.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Knowledge of border health issues preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "syhealth-002",
    fqhcSlug: "san-ysidro-health",
    title: "Care Coordinator - CCM",
    roleType: "Care Coordinator",
    department: "CCM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "San Ysidro",
    bilingual: true,
    languageRequired: "Spanish",
    ehrSystem: "NextGen",
    programs: ["CCM"],
    postedDate: "2026-02-07",
    description: "Manage chronic care cases for San Ysidro Health patients with a focus on medication management and disease outcomes.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination or case management experience",
      "Knowledge of CCM billing preferred",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "syhealth-003",
    fqhcSlug: "san-ysidro-health",
    title: "Medical Assistant - Multi-Site",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 41000,
    salaryMax: 52000,
    type: "Full-time",
    location: "San Ysidro",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: [],
    postedDate: "2026-02-06",
    description: "Support clinical operations across San Ysidro Health's 35 locations.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy experience",
      "Spanish language skills strongly preferred",
      "Ability to manage multiple patients"
    ]
  },
  {
    id: "syhealth-004",
    fqhcSlug: "san-ysidro-health",
    title: "Registered Nurse - Women's Health",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 87000,
    salaryMax: 108000,
    type: "Full-time",
    location: "San Ysidro",
    bilingual: false,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-05",
    description: "Provide nursing care for San Ysidro Health's women's health and prenatal services.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with experience",
      "Experience in obstetrics or women's health preferred",
      "Knowledge of prenatal care"
    ]
  },
  {
    id: "syhealth-005",
    fqhcSlug: "san-ysidro-health",
    title: "Behavioral Health Specialist",
    roleType: "Behavioral Health Specialist",
    department: "Behavioral Health",
    salaryMin: 59000,
    salaryMax: 79000,
    type: "Full-time",
    location: "San Ysidro",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["BH Integration"],
    postedDate: "2026-02-04",
    description: "Deliver mental health and substance abuse treatment services to San Ysidro's diverse communities.",
    requirements: [
      "Master's degree in mental health field",
      "LMFT, LPCC, or LCSW license",
      "Experience with substance use disorders",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "syhealth-006",
    fqhcSlug: "san-ysidro-health",
    title: "Nurse Practitioner - Primary Care",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 130000,
    salaryMax: 160000,
    type: "Full-time",
    location: "San Ysidro",
    bilingual: false,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-03",
    description: "Provide comprehensive primary care as part of San Ysidro Health's clinical leadership.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "Experience in primary care or urgent care",
      "Commitment to border health populations"
    ]
  },

  // ─────────────────────────────────────────────
  // LA CLINICA DE LA RAZA (6 listings)
  // ─────────────────────────────────────────────
  {
    id: "laclinica-001",
    fqhcSlug: "la-clinica-de-la-raza",
    title: "Community Health Worker - ECM",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support La Clinica's ECM program serving low-income families in the East Bay with care coordination.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Community advocacy experience preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "laclinica-002",
    fqhcSlug: "la-clinica-de-la-raza",
    title: "Care Coordinator - Complex Cases",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 51000,
    salaryMax: 68000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for La Clinica's most complex patients addressing medical and social needs.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "3+ years care coordination experience",
      "Strong communication skills",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "laclinica-003",
    fqhcSlug: "la-clinica-de-la-raza",
    title: "Medical Assistant",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 42000,
    salaryMax: 54000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-06",
    description: "Provide clinical support across La Clinica's East Bay primary care sites.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy and EHR experience",
      "Spanish language skills preferred",
      "Patient-centered care orientation"
    ]
  },
  {
    id: "laclinica-004",
    fqhcSlug: "la-clinica-de-la-raza",
    title: "Registered Nurse - Primary Care",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 87000,
    salaryMax: 107000,
    type: "Full-time",
    location: "Oakland",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-05",
    description: "Lead nursing care at La Clinica's primary care clinics across the East Bay.",
    requirements: [
      "Current California RN license",
      "BSN preferred; ADN acceptable with experience",
      "Community health experience",
      "Knowledge of EPIC EHR preferred"
    ]
  },
  {
    id: "laclinica-005",
    fqhcSlug: "la-clinica-de-la-raza",
    title: "Behavioral Health Specialist",
    roleType: "Behavioral Health Specialist",
    department: "Behavioral Health",
    salaryMin: 58000,
    salaryMax: 77000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-04",
    description: "Deliver mental health services to La Clinica's diverse East Bay communities.",
    requirements: [
      "Master's degree in mental health field",
      "LMFT, LPCC, or LCSW license",
      "Community mental health experience",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "laclinica-006",
    fqhcSlug: "la-clinica-de-la-raza",
    title: "Nurse Practitioner - Primary Care",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 132000,
    salaryMax: 162000,
    type: "Full-time",
    location: "Oakland",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-03",
    description: "Serve as primary care provider for La Clinica's East Bay communities.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "Primary care or community health experience",
      "Commitment to serving low-income families"
    ]
  },

  // ─────────────────────────────────────────────
  // CLINICA SIERRA VISTA (7 listings - major Central Valley FQHC)
  // ─────────────────────────────────────────────
  {
    id: "csv-001",
    fqhcSlug: "clinica-sierra-vista",
    title: "Community Health Worker - Farmworker Program",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 58000,
    type: "Full-time",
    location: "Bakersfield",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Engage farmworker families in Kern County through Clinica Sierra Vista's health outreach and education.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Experience with farmworker communities preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "csv-002",
    fqhcSlug: "clinica-sierra-vista",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 65000,
    type: "Full-time",
    location: "Bakersfield",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for Clinica Sierra Vista patients across Kern County's agricultural communities.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience",
      "Bilingual Spanish/English preferred",
      "Understanding of agricultural health concerns"
    ]
  },
  {
    id: "csv-003",
    fqhcSlug: "clinica-sierra-vista",
    title: "Medical Assistant",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 41000,
    salaryMax: 53000,
    type: "Full-time",
    location: "Bakersfield",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-06",
    description: "Provide clinical support at Clinica Sierra Vista's 38 Kern County sites.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy experience",
      "Spanish language skills strongly preferred",
      "Ability to manage multiple patients"
    ]
  },
  {
    id: "csv-004",
    fqhcSlug: "clinica-sierra-vista",
    title: "Registered Nurse - Maternal Health",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 86000,
    salaryMax: 107000,
    type: "Full-time",
    location: "Bakersfield",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-05",
    description: "Provide nursing care for Clinica Sierra Vista's prenatal and maternal health services.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with experience",
      "Obstetric nursing experience preferred",
      "Knowledge of health disparities in farmworker populations"
    ]
  },
  {
    id: "csv-005",
    fqhcSlug: "clinica-sierra-vista",
    title: "Behavioral Health Specialist",
    roleType: "Behavioral Health Specialist",
    department: "Behavioral Health",
    salaryMin: 57000,
    salaryMax: 76000,
    type: "Full-time",
    location: "Bakersfield",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-04",
    description: "Deliver mental health services to Clinica Sierra Vista's Kern County communities.",
    requirements: [
      "Master's degree in mental health field",
      "LMFT, LPCC, or LCSW license",
      "Community mental health experience",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "csv-006",
    fqhcSlug: "clinica-sierra-vista",
    title: "Program Manager - WIC Services",
    roleType: "Program Manager",
    department: "Community Supports",
    salaryMin: 75000,
    salaryMax: 95000,
    type: "Full-time",
    location: "Bakersfield",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["Community Supports"],
    postedDate: "2026-02-03",
    description: "Oversee Clinica Sierra Vista's WIC and nutrition services across Kern County.",
    requirements: [
      "Bachelor's degree in public health or nutrition preferred",
      "3+ years program management experience",
      "WIC program knowledge preferred",
      "Strong organizational skills"
    ]
  },
  {
    id: "csv-007",
    fqhcSlug: "clinica-sierra-vista",
    title: "Nurse Practitioner - Primary Care",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 130000,
    salaryMax: 160000,
    type: "Full-time",
    location: "Bakersfield",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-02",
    description: "Provide comprehensive primary care to Clinica Sierra Vista's diverse Kern County population.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "Primary care experience required",
      "Commitment to serving agricultural communities"
    ]
  },

  // ─────────────────────────────────────────────
  // FAMILY HEALTHCARE NETWORK (6 listings)
  // ─────────────────────────────────────────────
  {
    id: "fhcn-001",
    fqhcSlug: "family-healthcare-network",
    title: "Community Health Worker - Farmworker Health",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Visalia",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support farmworker families across Tulare and Kings counties through FHCN's community outreach.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Agricultural community experience preferred",
      "Valid driver's license and reliable transportation"
    ]
  },
  {
    id: "fhcn-002",
    fqhcSlug: "family-healthcare-network",
    title: "Care Coordinator - CCM Program",
    roleType: "Care Coordinator",
    department: "CCM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "Visalia",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["CCM"],
    postedDate: "2026-02-07",
    description: "Manage chronic care for FHCN patients across Tulare and Kings counties.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination or case management background",
      "Knowledge of CCM billing preferred",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "fhcn-003",
    fqhcSlug: "family-healthcare-network",
    title: "Medical Assistant - Multi-Clinic",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 41000,
    salaryMax: 52000,
    type: "Full-time",
    location: "Visalia",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-06",
    description: "Provide clinical support across FHCN's 45 primary care sites.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy experience",
      "Spanish language skills strongly preferred",
      "Experience with EHR systems"
    ]
  },
  {
    id: "fhcn-004",
    fqhcSlug: "family-healthcare-network",
    title: "Registered Nurse - Chronic Disease",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 86000,
    salaryMax: 106000,
    type: "Full-time",
    location: "Visalia",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-05",
    description: "Lead nursing care for FHCN's chronic disease management programs.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with community health experience",
      "Chronic disease management knowledge",
      "Understanding of farmworker health issues"
    ]
  },
  {
    id: "fhcn-005",
    fqhcSlug: "family-healthcare-network",
    title: "Behavioral Health Specialist",
    roleType: "Behavioral Health Specialist",
    department: "Behavioral Health",
    salaryMin: 58000,
    salaryMax: 77000,
    type: "Full-time",
    location: "Visalia",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-04",
    description: "Deliver mental health services to FHCN's Tulare and Kings County communities.",
    requirements: [
      "Master's degree in mental health field",
      "LMFT, LPCC, or LCSW license",
      "Community mental health experience",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "fhcn-006",
    fqhcSlug: "family-healthcare-network",
    title: "Nurse Practitioner - Primary Care",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 131000,
    salaryMax: 161000,
    type: "Full-time",
    location: "Visalia",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-03",
    description: "Provide primary care leadership for FHCN's farmworker-serving clinics.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "Primary care experience",
      "Commitment to serving farmworker populations"
    ]
  },

  // ─────────────────────────────────────────────
  // UNITED HEALTH CENTERS (5 listings)
  // ─────────────────────────────────────────────
  {
    id: "uhc-001",
    fqhcSlug: "united-health-centers",
    title: "Community Health Worker - Agricultural Health",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 58000,
    type: "Full-time",
    location: "Parlier",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Engage farmworker families across the San Joaquin Valley through UHC's community health programs.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Experience with agricultural communities preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "uhc-002",
    fqhcSlug: "united-health-centers",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "Parlier",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for UHC patients across Fresno, Kings, and Tulare counties.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Bilingual Spanish/English preferred",
      "Knowledge of San Joaquin Valley health issues"
    ]
  },
  {
    id: "uhc-003",
    fqhcSlug: "united-health-centers",
    title: "Medical Assistant",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 41000,
    salaryMax: 52000,
    type: "Full-time",
    location: "Parlier",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: [],
    postedDate: "2026-02-06",
    description: "Provide clinical support across UHC's 22 San Joaquin Valley sites.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy experience",
      "Spanish language skills strongly preferred",
      "Multi-site experience helpful"
    ]
  },
  {
    id: "uhc-004",
    fqhcSlug: "united-health-centers",
    title: "Registered Nurse - Optometry Services",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 86000,
    salaryMax: 106000,
    type: "Full-time",
    location: "Parlier",
    bilingual: false,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-05",
    description: "Provide nursing support for UHC's comprehensive optometry and vision services.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with experience",
      "Optometry clinic experience preferred",
      "Patient education skills"
    ]
  },
  {
    id: "uhc-005",
    fqhcSlug: "united-health-centers",
    title: "Behavioral Health Specialist",
    roleType: "Behavioral Health Specialist",
    department: "Behavioral Health",
    salaryMin: 57000,
    salaryMax: 76000,
    type: "Full-time",
    location: "Parlier",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["BH Integration"],
    postedDate: "2026-02-04",
    description: "Deliver mental health services across UHC's San Joaquin Valley communities.",
    requirements: [
      "Master's degree in mental health field",
      "LMFT, LPCC, or LCSW license",
      "Community mental health experience",
      "Bilingual Spanish/English preferred"
    ]
  },

  // ─────────────────────────────────────────────
  // WELLSPACE HEALTH (5 listings)
  // ─────────────────────────────────────────────
  {
    id: "wellspace-001",
    fqhcSlug: "wellspace-health",
    title: "Community Health Worker - Behavioral Health",
    roleType: "Community Health Worker",
    department: "BH Integration",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-08",
    description: "Support WellSpace Health's behavioral health initiatives in Sacramento communities.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Experience with mental health or substance use preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "wellspace-002",
    fqhcSlug: "wellspace-health",
    title: "Care Coordinator - Addiction Services",
    roleType: "Care Coordinator",
    department: "Behavioral Health",
    salaryMin: 51000,
    salaryMax: 68000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-07",
    description: "Coordinate care for WellSpace Health's addiction medicine and substance use treatment patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience",
      "Experience with substance use disorders preferred",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "wellspace-003",
    fqhcSlug: "wellspace-health",
    title: "Medical Assistant",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 42000,
    salaryMax: 54000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-06",
    description: "Provide clinical support across WellSpace Health's Sacramento sites.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy experience",
      "Spanish language skills preferred",
      "Experience with behavioral health settings helpful"
    ]
  },
  {
    id: "wellspace-004",
    fqhcSlug: "wellspace-health",
    title: "Licensed Clinical Social Worker - Crisis Services",
    roleType: "Licensed Clinical Social Worker",
    department: "Behavioral Health",
    salaryMin: 83000,
    salaryMax: 103000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-05",
    description: "Provide clinical social work services for WellSpace Health's crisis intervention and stabilization programs.",
    requirements: [
      "Current California LCSW license",
      "Master's degree in social work",
      "Experience in crisis intervention",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "wellspace-005",
    fqhcSlug: "wellspace-health",
    title: "Nurse Practitioner - Addiction Medicine",
    roleType: "Nurse Practitioner",
    department: "Behavioral Health",
    salaryMin: 135000,
    salaryMax: 165000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-04",
    description: "Lead clinical care for WellSpace Health's addiction medicine programs.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "Experience in addiction medicine preferred",
      "Knowledge of medication-assisted treatment"
    ]
  },

  // ─────────────────────────────────────────────
  // BORREGO HEALTH (5 listings - Inland Empire)
  // ─────────────────────────────────────────────
  {
    id: "borrego-001",
    fqhcSlug: "borrego-health",
    title: "Community Health Worker - Desert Health",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Brawley",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support Borrego Health's ECM program serving Imperial Valley and Coachella Valley communities.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Experience with underserved populations preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "borrego-002",
    fqhcSlug: "borrego-health",
    title: "Care Coordinator - Complex Cases",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "Brawley",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for Borrego Health's most complex patients across multiple counties.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "3+ years care coordination experience",
      "Bilingual Spanish/English preferred",
      "Ability to manage high-risk populations"
    ]
  },
  {
    id: "borrego-003",
    fqhcSlug: "borrego-health",
    title: "Medical Assistant",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 41000,
    salaryMax: 52000,
    type: "Full-time",
    location: "Brawley",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: [],
    postedDate: "2026-02-06",
    description: "Provide clinical support across Borrego Health's 28 sites.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy experience",
      "Spanish language skills strongly preferred",
      "Ability to work in fast-paced environment"
    ]
  },
  {
    id: "borrego-004",
    fqhcSlug: "borrego-health",
    title: "Registered Nurse - Primary Care",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 86000,
    salaryMax: 106000,
    type: "Full-time",
    location: "Brawley",
    bilingual: false,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-05",
    description: "Provide nursing care at Borrego Health's primary care clinics.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with experience",
      "Community health setting experience",
      "Patient education skills"
    ]
  },
  {
    id: "borrego-005",
    fqhcSlug: "borrego-health",
    title: "Behavioral Health Specialist",
    roleType: "Behavioral Health Specialist",
    department: "Behavioral Health",
    salaryMin: 57000,
    salaryMax: 76000,
    type: "Full-time",
    location: "Brawley",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["BH Integration"],
    postedDate: "2026-02-04",
    description: "Deliver mental health services across Borrego Health's Desert and Coachella Valley communities.",
    requirements: [
      "Master's degree in mental health field",
      "LMFT, LPCC, or LCSW license",
      "Community mental health experience",
      "Bilingual Spanish/English preferred"
    ]
  },

  // ─────────────────────────────────────────────
  // LIFELONG MEDICAL CARE (4 listings)
  // ─────────────────────────────────────────────
  {
    id: "lifelong-001",
    fqhcSlug: "lifelong-medical-care",
    title: "Community Health Worker - Homeless Services",
    roleType: "Community Health Worker",
    department: "Community Supports",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "Berkeley",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["Community Supports"],
    postedDate: "2026-02-08",
    description: "Support LifeLong's services for homeless and unstably housed populations across the East Bay.",
    requirements: [
      "High school diploma or equivalent",
      "Lived experience with homelessness preferred",
      "Bilingual Spanish/English preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "lifelong-002",
    fqhcSlug: "lifelong-medical-care",
    title: "Care Coordinator - TCM Program",
    roleType: "Care Coordinator",
    department: "TCM Program",
    salaryMin: 51000,
    salaryMax: 68000,
    type: "Full-time",
    location: "Berkeley",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["TCM"],
    postedDate: "2026-02-07",
    description: "Manage transitional care for LifeLong patients moving between hospital and community settings.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "TCM or care coordination experience preferred",
      "Knowledge of health equity issues",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "lifelong-003",
    fqhcSlug: "lifelong-medical-care",
    title: "Registered Nurse - Behavioral Health",
    roleType: "Registered Nurse",
    department: "Behavioral Health",
    salaryMin: 87000,
    salaryMax: 108000,
    type: "Full-time",
    location: "Berkeley",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-06",
    description: "Provide nursing care for LifeLong's behavioral health and substance use services.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with psychiatric nursing experience",
      "Knowledge of trauma-informed care",
      "Commitment to serving vulnerable populations"
    ]
  },
  {
    id: "lifelong-004",
    fqhcSlug: "lifelong-medical-care",
    title: "Nurse Practitioner - Primary Care",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 131000,
    salaryMax: 161000,
    type: "Full-time",
    location: "Berkeley",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-05",
    description: "Provide primary care to LifeLong's East Bay communities.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "Primary care or community health experience",
      "Commitment to health equity"
    ]
  },

  // ─────────────────────────────────────────────
  // ASIAN HEALTH SERVICES (4 listings)
  // ─────────────────────────────────────────────
  {
    id: "ahs-001",
    fqhcSlug: "asian-health-services",
    title: "Community Health Worker - Multilingual",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Serve Asian Health Services' diverse communities in Oakland with multilingual health outreach.",
    requirements: [
      "High school diploma or equivalent",
      "Fluency in Asian language preferred (Cantonese, Mandarin, Vietnamese, etc.)",
      "Community outreach experience",
      "Valid driver's license"
    ]
  },
  {
    id: "ahs-002",
    fqhcSlug: "asian-health-services",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for Asian Health Services' Asian American patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Cultural competency with Asian populations",
      "Multilingual capabilities preferred"
    ]
  },
  {
    id: "ahs-003",
    fqhcSlug: "asian-health-services",
    title: "Medical Assistant",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 42000,
    salaryMax: 54000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-06",
    description: "Provide clinical support at Asian Health Services' Oakland sites.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy experience",
      "Multilingual skills preferred",
      "Experience with diverse populations"
    ]
  },
  {
    id: "ahs-004",
    fqhcSlug: "asian-health-services",
    title: "Registered Nurse - Primary Care",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 87000,
    salaryMax: 107000,
    type: "Full-time",
    location: "Oakland",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-05",
    description: "Provide nursing care at Asian Health Services' primary care clinics.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with experience",
      "Community health experience",
      "Cultural humility and competency skills"
    ]
  },

  // ─────────────────────────────────────────────
  // APLA HEALTH (3 listings)
  // ─────────────────────────────────────────────
  {
    id: "apla-001",
    fqhcSlug: "apla-health",
    title: "Community Health Worker - LGBTQ+",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Serve APLA Health's LGBTQ+ communities with health outreach and care coordination.",
    requirements: [
      "High school diploma or equivalent",
      "Experience with LGBTQ+ populations preferred",
      "Bilingual Spanish/English preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "apla-002",
    fqhcSlug: "apla-health",
    title: "Care Coordinator - HIV Specialty",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 51000,
    salaryMax: 68000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for APLA Health's HIV-positive patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "HIV/AIDS care experience preferred",
      "Compassionate and non-judgmental care approach",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "apla-003",
    fqhcSlug: "apla-health",
    title: "Registered Nurse - Behavioral Health",
    roleType: "Registered Nurse",
    department: "Behavioral Health",
    salaryMin: 87000,
    salaryMax: 107000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "eClinicalWorks",
    programs: ["BH Integration"],
    postedDate: "2026-02-06",
    description: "Provide nursing care for APLA Health's mental health and substance use services.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with psychiatric nursing experience",
      "LGBTQ+ cultural competency",
      "Experience with substance use disorders"
    ]
  },

  // ─────────────────────────────────────────────
  // VENICE FAMILY CLINIC (4 listings)
  // ─────────────────────────────────────────────
  {
    id: "vfc-001",
    fqhcSlug: "venice-family-clinic",
    title: "Community Health Worker - Homeless Outreach",
    roleType: "Community Health Worker",
    department: "Community Supports",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["Community Supports"],
    postedDate: "2026-02-08",
    description: "Provide community outreach for Venice Family Clinic's homeless and precariously housed populations.",
    requirements: [
      "High school diploma or equivalent",
      "Experience with homeless populations preferred",
      "Bilingual Spanish/English preferred",
      "Valid driver's license and reliable transportation"
    ]
  },
  {
    id: "vfc-002",
    fqhcSlug: "venice-family-clinic",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for Venice Family Clinic's complex and vulnerable patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination in free clinic setting preferred",
      "Compassion for vulnerable populations",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "vfc-003",
    fqhcSlug: "venice-family-clinic",
    title: "Registered Nurse - Dental Support",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 86000,
    salaryMax: 106000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-06",
    description: "Provide nursing support for Venice Family Clinic's dental and primary care services.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with experience",
      "Dental nursing experience preferred",
      "Commitment to serving vulnerable populations"
    ]
  },
  {
    id: "vfc-004",
    fqhcSlug: "venice-family-clinic",
    title: "Nurse Practitioner - Primary Care",
    roleType: "Nurse Practitioner",
    department: "Primary Care",
    salaryMin: 130000,
    salaryMax: 160000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-05",
    description: "Provide primary care services as part of Venice Family Clinic's medical team.",
    requirements: [
      "California NP license with prescribing authority",
      "Master's or DNP degree",
      "Free clinic or safety-net experience preferred",
      "Passion for serving homeless and low-income populations"
    ]
  },

  // ─────────────────────────────────────────────
  // CHAPCARE (3 listings)
  // ─────────────────────────────────────────────
  {
    id: "chapcare-001",
    fqhcSlug: "chapcare",
    title: "Community Health Worker",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Pasadena",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support ChapCare's health outreach in the San Gabriel Valley communities.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Community engagement experience",
      "Valid driver's license"
    ]
  },
  {
    id: "chapcare-002",
    fqhcSlug: "chapcare",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "Pasadena",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for ChapCare's San Gabriel Valley patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination background preferred",
      "Bilingual Spanish/English preferred",
      "Understanding of diverse cultural populations"
    ]
  },
  {
    id: "chapcare-003",
    fqhcSlug: "chapcare",
    title: "Registered Nurse",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 86000,
    salaryMax: 106000,
    type: "Full-time",
    location: "Pasadena",
    bilingual: false,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-06",
    description: "Provide nursing care at ChapCare's San Gabriel Valley clinics.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with community health experience",
      "Primary care nursing background",
      "Patient education skills"
    ]
  },

  // ─────────────────────────────────────────────
  // EISNER HEALTH (3 listings)
  // ─────────────────────────────────────────────
  {
    id: "eisner-001",
    fqhcSlug: "eisner-health",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 50000,
    salaryMax: 65000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-08",
    description: "Coordinate care for Eisner Health's downtown Los Angeles patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "3+ years care coordination experience",
      "Bilingual Spanish/English preferred",
      "Experience with vulnerable populations"
    ]
  },
  {
    id: "eisner-002",
    fqhcSlug: "eisner-health",
    title: "Medical Assistant",
    roleType: "Medical Assistant",
    department: "Primary Care",
    salaryMin: 42000,
    salaryMax: 53000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: [],
    postedDate: "2026-02-07",
    description: "Provide clinical support at Eisner Health's Los Angeles sites.",
    requirements: [
      "CMA certification preferred",
      "Phlebotomy experience",
      "Spanish language skills preferred",
      "Experience in busy clinic environment"
    ]
  },
  {
    id: "eisner-003",
    fqhcSlug: "eisner-health",
    title: "Registered Nurse - Women's Health",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 87000,
    salaryMax: 107000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM"],
    postedDate: "2026-02-06",
    description: "Provide nursing care for Eisner Health's women's health and pediatrics services.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with women's health experience",
      "Pediatric nursing knowledge preferred",
      "Cultural competency and communication skills"
    ]
  },

  // ─────────────────────────────────────────────
  // JWCH INSTITUTE (3 listings)
  // ─────────────────────────────────────────────
  {
    id: "jwch-001",
    fqhcSlug: "jwch-institute",
    title: "Community Health Worker - Homeless Health",
    roleType: "Community Health Worker",
    department: "Community Supports",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["Community Supports"],
    postedDate: "2026-02-08",
    description: "Support JWCH Institute's outreach to homeless populations in Los Angeles County.",
    requirements: [
      "High school diploma or equivalent",
      "Lived experience with homelessness preferred",
      "Bilingual Spanish/English preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "jwch-002",
    fqhcSlug: "jwch-institute",
    title: "Care Coordinator - HIV Services",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 51000,
    salaryMax: 68000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for JWCH's HIV-positive homeless and unstably housed patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "HIV/AIDS care experience preferred",
      "Experience with homelessness issues",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "jwch-003",
    fqhcSlug: "jwch-institute",
    title: "Registered Nurse - Substance Use Services",
    roleType: "Registered Nurse",
    department: "Behavioral Health",
    salaryMin: 87000,
    salaryMax: 108000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "eClinicalWorks",
    programs: ["BH Integration"],
    postedDate: "2026-02-06",
    description: "Provide nursing care for JWCH's substance use treatment and harm reduction programs.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with substance use disorder nursing experience",
      "Experience with homeless populations",
      "Knowledge of harm reduction approaches"
    ]
  },

  // ─────────────────────────────────────────────
  // MISSION NEIGHBORHOOD HEALTH CENTER (3 listings)
  // ─────────────────────────────────────────────
  {
    id: "mnhc-001",
    fqhcSlug: "mission-neighborhood-health-center",
    title: "Community Health Worker - Latino Health",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "San Francisco",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support MNHC's Mission District communities through health outreach and care coordination.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Community advocacy experience preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "mnhc-002",
    fqhcSlug: "mission-neighborhood-health-center",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "San Francisco",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for MNHC's diverse immigrant and Latino patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Cultural competency with immigrant populations",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "mnhc-003",
    fqhcSlug: "mission-neighborhood-health-center",
    title: "Registered Nurse - Chronic Disease",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 87000,
    salaryMax: 107000,
    type: "Full-time",
    location: "San Francisco",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-06",
    description: "Provide nursing care for MNHC's chronic disease management programs.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with community health experience",
      "Chronic disease management knowledge",
      "Ability to work with diverse populations"
    ]
  },

  // ─────────────────────────────────────────────
  // NORTH EAST MEDICAL SERVICES (2 listings)
  // ─────────────────────────────────────────────
  {
    id: "nems-001",
    fqhcSlug: "north-east-medical-services",
    title: "Community Health Worker - Multilingual",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "San Francisco",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support NEMS' Asian American communities with multilingual health outreach.",
    requirements: [
      "High school diploma or equivalent",
      "Fluency in Asian language preferred",
      "Community outreach experience",
      "Valid driver's license"
    ]
  },
  {
    id: "nems-002",
    fqhcSlug: "north-east-medical-services",
    title: "Registered Nurse",
    roleType: "Registered Nurse",
    department: "Primary Care",
    salaryMin: 87000,
    salaryMax: 107000,
    type: "Full-time",
    location: "San Francisco",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-07",
    description: "Provide nursing care for NEMS' primary care clinics serving Asian American communities.",
    requirements: [
      "Current California RN license",
      "BSN or ADN with experience",
      "Cultural humility and competency skills",
      "Commitment to serving underserved populations"
    ]
  },

  // ─────────────────────────────────────────────
  // HEALTHRIGHT 360 (2 listings)
  // ─────────────────────────────────────────────
  {
    id: "hr360-001",
    fqhcSlug: "healthright-360",
    title: "Care Coordinator - Homeless Health",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 51000,
    salaryMax: 68000,
    type: "Full-time",
    location: "San Francisco",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Coordinate care for HealthRIGHT 360's homeless and vulnerable populations.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Homelessness and health equity experience",
      "Trauma-informed care knowledge",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "hr360-002",
    fqhcSlug: "healthright-360",
    title: "Licensed Clinical Social Worker",
    roleType: "Licensed Clinical Social Worker",
    department: "Behavioral Health",
    salaryMin: 83000,
    salaryMax: 103000,
    type: "Full-time",
    location: "San Francisco",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-07",
    description: "Provide clinical social work services for HealthRIGHT 360's vulnerable populations.",
    requirements: [
      "Current California LCSW license",
      "Master's degree in social work",
      "Experience with homeless/vulnerable populations",
      "Bilingual Spanish/English preferred"
    ]
  },

  // ─────────────────────────────────────────────
  // RAVENSWOOD FAMILY HEALTH NETWORK (2 listings)
  // ─────────────────────────────────────────────
  {
    id: "ravenswood-001",
    fqhcSlug: "ravenswood-family-health-network",
    title: "Community Health Worker",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "East Palo Alto",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support Ravenswood's East Palo Alto and Peninsula communities with health outreach.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Community engagement experience",
      "Valid driver's license"
    ]
  },
  {
    id: "ravenswood-002",
    fqhcSlug: "ravenswood-family-health-network",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "East Palo Alto",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for Ravenswood's underserved Peninsula communities.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Bilingual Spanish/English preferred",
      "Understanding of economic inequality in health"
    ]
  },

  // ─────────────────────────────────────────────
  // GARDNER HEALTH SERVICES (2 listings)
  // ─────────────────────────────────────────────
  {
    id: "gardner-001",
    fqhcSlug: "gardner-health-services",
    title: "Community Health Worker - Farmworker Health",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "San Jose",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support Gardner Health's farmworker communities in Santa Clara County.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Agricultural worker health knowledge",
      "Valid driver's license"
    ]
  },
  {
    id: "gardner-002",
    fqhcSlug: "gardner-health-services",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "San Jose",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for Gardner Health's Santa Clara County farmworker patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Bilingual Spanish/English preferred",
      "Understanding of migrant farmworker health"
    ]
  },

  // ─────────────────────────────────────────────
  // NEIGHBORHOOD HEALTHCARE (2 listings)
  // ─────────────────────────────────────────────
  {
    id: "nhcare-001",
    fqhcSlug: "neighborhood-healthcare",
    title: "Community Health Worker",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Escondido",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support Neighborhood Healthcare's North County San Diego communities.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Community outreach experience",
      "Valid driver's license"
    ]
  },
  {
    id: "nhcare-002",
    fqhcSlug: "neighborhood-healthcare",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "Escondido",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for Neighborhood Healthcare's North County patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Bilingual Spanish/English preferred",
      "Commitment to health equity"
    ]
  },

  // ─────────────────────────────────────────────
  // VISTA COMMUNITY CLINIC (2 listings)
  // ─────────────────────────────────────────────
  {
    id: "vista-001",
    fqhcSlug: "vista-community-clinic",
    title: "Community Health Worker",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Vista",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support Vista Community Clinic's North San Diego County health outreach.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Community engagement experience",
      "Valid driver's license"
    ]
  },
  {
    id: "vista-002",
    fqhcSlug: "vista-community-clinic",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "Vista",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for Vista Community Clinic's North County patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Bilingual Spanish/English preferred",
      "Understanding of prenatal and pediatric populations"
    ]
  },

  // ─────────────────────────────────────────────
  // LA MAESTRA COMMUNITY HEALTH CENTERS (2 listings)
  // ─────────────────────────────────────────────
  {
    id: "lamaestra-001",
    fqhcSlug: "la-maestra-community-health-centers",
    title: "Community Health Worker - Refugee Health",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "San Diego",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support La Maestra's refugee and immigrant communities in San Diego.",
    requirements: [
      "High school diploma or equivalent",
      "Refugee/immigrant community experience preferred",
      "Bilingual capabilities preferred",
      "Valid driver's license"
    ]
  },
  {
    id: "lamaestra-002",
    fqhcSlug: "la-maestra-community-health-centers",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "San Diego",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for La Maestra's City Heights and refugee communities.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Refugee/immigrant health experience preferred",
      "Multilingual capabilities preferred",
      "Cultural competency with diverse populations"
    ]
  },

  // ─────────────────────────────────────────────
  // ELICA HEALTH CENTERS (2 listings)
  // ─────────────────────────────────────────────
  {
    id: "elica-001",
    fqhcSlug: "elica-health-centers",
    title: "Community Health Worker - Multilingual",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 47000,
    salaryMax: 59000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support Elica Health's diverse refugee and immigrant communities in Sacramento.",
    requirements: [
      "High school diploma or equivalent",
      "Multilingual (40+ languages served) preferred",
      "Refugee/immigrant community experience",
      "Valid driver's license"
    ]
  },
  {
    id: "elica-002",
    fqhcSlug: "elica-health-centers",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for Elica Health's refugee and immigrant patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Multilingual background preferred",
      "Experience with diverse populations",
      "Cultural humility and competency"
    ]
  },

  // ─────────────────────────────────────────────
  // TIBURCIO VASQUEZ HEALTH CENTER (2 listings)
  // ─────────────────────────────────────────────
  {
    id: "tvhc-001",
    fqhcSlug: "tiburcio-vasquez-health-center",
    title: "Community Health Worker",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Hayward",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support TVHC's South Alameda County communities with health outreach.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Community engagement experience",
      "Valid driver's license"
    ]
  },
  {
    id: "tvhc-002",
    fqhcSlug: "tiburcio-vasquez-health-center",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "Hayward",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-07",
    description: "Coordinate care for TVHC's Hayward and South Alameda County patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Bilingual Spanish/English preferred",
      "Commitment to underserved populations"
    ]
  },

  // ─────────────────────────────────────────────
  // ADDITIONAL MEDIUM/SMALL FQHC LISTINGS (distributed across regions)
  // ─────────────────────────────────────────────
  {
    id: "south-central-001",
    fqhcSlug: "south-central-family-health-center",
    title: "Community Health Worker",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support South Central FHC's South Los Angeles communities.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Community advocacy experience",
      "Valid driver's license"
    ]
  },
  {
    id: "queenscare-001",
    fqhcSlug: "queenscare-health-centers",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-08",
    description: "Coordinate care for QueensCare's low-income families across Los Angeles.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience",
      "Bilingual Spanish/English preferred",
      "Commitment to health equity"
    ]
  },
  {
    id: "kedren-001",
    fqhcSlug: "kedren-community-health-center",
    title: "Behavioral Health Specialist",
    roleType: "Behavioral Health Specialist",
    department: "Behavioral Health",
    salaryMin: 57000,
    salaryMax: 76000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["BH Integration"],
    postedDate: "2026-02-08",
    description: "Deliver behavioral health and substance abuse treatment services at Kedren.",
    requirements: [
      "Master's degree in mental health field",
      "LMFT, LPCC, or LCSW license",
      "Substance abuse disorder experience",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "watts-001",
    fqhcSlug: "watts-healthcare-corporation",
    title: "Community Health Worker",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support Watts Healthcare's Watts community health outreach.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Community roots in Watts area helpful",
      "Valid driver's license"
    ]
  },
  {
    id: "sac-health-001",
    fqhcSlug: "sac-health",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 50000,
    salaryMax: 66000,
    type: "Full-time",
    location: "San Bernardino",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-08",
    description: "Coordinate care for SAC Health's San Bernardino County communities.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience",
      "Bilingual Spanish/English preferred",
      "Understanding of Inland Empire health disparities"
    ]
  },
  {
    id: "community-health-centers-central-coast-001",
    fqhcSlug: "community-health-centers-central-coast",
    title: "Community Health Worker - Farmworker",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Santa Maria",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support CHCCC's farmworker communities in Central Coast.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Agricultural community experience",
      "Valid driver's license"
    ]
  },
  {
    id: "open-door-001",
    fqhcSlug: "open-door-community-health-centers",
    title: "Community Health Worker - Rural",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Arcata",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support Open Door's rural North Coast communities.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English preferred",
      "Rural health experience",
      "Valid driver's license and reliable transportation"
    ]
  },
  {
    id: "marin-001",
    fqhcSlug: "marin-community-clinics",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "San Rafael",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-08",
    description: "Coordinate care for Marin Community Clinics' underserved populations.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Bilingual Spanish/English preferred",
      "Knowledge of Marin health disparities"
    ]
  },
  {
    id: "camarena-001",
    fqhcSlug: "camarena-health",
    title: "Community Health Worker - Farmworker",
    roleType: "Community Health Worker",
    department: "ECM Program",
    salaryMin: 46000,
    salaryMax: 57000,
    type: "Full-time",
    location: "Madera",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-08",
    description: "Support Camarena Health's Madera County farmworker communities.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Agricultural health knowledge",
      "Valid driver's license"
    ]
  },
  {
    id: "golden-valley-001",
    fqhcSlug: "golden-valley-health-centers",
    title: "Care Coordinator",
    roleType: "Care Coordinator",
    department: "ECM Program",
    salaryMin: 49000,
    salaryMax: 64000,
    type: "Full-time",
    location: "Merced",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-08",
    description: "Coordinate care for Golden Valley's Merced and Stanislaus County patients.",
    requirements: [
      "Bachelor's degree or equivalent experience",
      "Care coordination experience preferred",
      "Bilingual Spanish/English preferred",
      "Central Valley health knowledge"
    ]
  },

  // ─────────────────────────────────────────────
  // NEW ROLE TYPES — Patient Services, Revenue Cycle, Clinical, Dental, Pharmacy, etc.
  // ─────────────────────────────────────────────

  // --- Patient Services Representative (3 listings) ---
  {
    id: "fqhc-166",
    fqhcSlug: "altamed-health-services",
    title: "Patient Services Representative - Front Desk",
    roleType: "Patient Services Representative",
    department: "Patient Services",
    salaryMin: 38000,
    salaryMax: 50000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["Community Supports"],
    postedDate: "2026-02-10",
    description: "Greet and check in patients, verify insurance eligibility, schedule appointments, and provide excellent front desk support at one of AltaMed's high-volume clinic sites.",
    requirements: [
      "High school diploma or equivalent required",
      "1+ year of front desk or customer service experience in a healthcare setting",
      "Bilingual Spanish/English required",
      "Proficiency with OCHIN Epic or similar EHR preferred"
    ]
  },
  {
    id: "fqhc-167",
    fqhcSlug: "neighborhood-healthcare",
    title: "Patient Services Representative",
    roleType: "Patient Services Representative",
    department: "Administration",
    salaryMin: 36000,
    salaryMax: 48000,
    type: "Full-time",
    location: "Escondido",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: [],
    postedDate: "2026-01-28",
    description: "Serve as the first point of contact for patients at Neighborhood Healthcare's Escondido clinic, handling check-in, scheduling, and insurance verification.",
    requirements: [
      "High school diploma or GED",
      "Customer service experience preferred",
      "Bilingual Spanish/English strongly preferred",
      "Ability to multitask in a fast-paced clinic environment"
    ]
  },
  {
    id: "fqhc-168",
    fqhcSlug: "asian-health-services",
    title: "Patient Services Representative - Bilingual",
    roleType: "Patient Services Representative",
    department: "Patient Services",
    salaryMin: 40000,
    salaryMax: 52000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-03",
    description: "Provide culturally competent front desk services for Asian Health Services' diverse patient population, including appointment scheduling, registration, and referral coordination.",
    requirements: [
      "High school diploma required; associate degree preferred",
      "Bilingual in English and Cantonese, Mandarin, Vietnamese, or Korean",
      "Experience in a community health or medical office setting",
      "Strong attention to detail and data entry skills"
    ]
  },

  // --- Call Center Specialist (2 listings) ---
  {
    id: "fqhc-169",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Call Center Specialist",
    roleType: "Call Center Specialist",
    department: "Patient Services",
    salaryMin: 36000,
    salaryMax: 46000,
    type: "Full-time",
    location: "San Fernando",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: [],
    postedDate: "2026-02-05",
    description: "Handle high-volume inbound and outbound patient calls for scheduling, appointment reminders, prescription refill requests, and general clinic inquiries.",
    requirements: [
      "High school diploma or equivalent",
      "1+ year of call center or customer service experience",
      "Bilingual Spanish/English required",
      "Comfortable with multi-line phone systems and EHR data entry"
    ]
  },
  {
    id: "fqhc-170",
    fqhcSlug: "sacramento-covered",
    title: "Call Center Specialist - Patient Scheduling",
    roleType: "Call Center Specialist",
    department: "Patient Services",
    salaryMin: 34000,
    salaryMax: 48000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-01-22",
    description: "Schedule patient appointments across multiple Sacramento Covered clinic sites, triage incoming calls, and ensure patients are connected to the right services.",
    requirements: [
      "High school diploma or equivalent",
      "Experience in healthcare scheduling or call center environment",
      "Strong communication and organizational skills",
      "Familiarity with Epic scheduling modules preferred"
    ]
  },

  // --- Health Enrollment Navigator (3 listings) ---
  {
    id: "fqhc-171",
    fqhcSlug: "la-clinica-de-la-raza",
    title: "Health Enrollment Navigator - Medi-Cal",
    roleType: "Health Enrollment Navigator",
    department: "Enrollment Services",
    salaryMin: 42000,
    salaryMax: 55000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["Community Supports"],
    postedDate: "2026-02-12",
    description: "Assist uninsured and underinsured patients with Medi-Cal enrollment, Covered California applications, and sliding-fee eligibility determinations at La Clinica's Oakland sites.",
    requirements: [
      "High school diploma required; bachelor's degree preferred",
      "Certified Enrollment Counselor (CEC) certification or willingness to obtain",
      "Bilingual Spanish/English required",
      "Knowledge of Medi-Cal, Covered California, and FQHC sliding fee programs"
    ]
  },
  {
    id: "fqhc-172",
    fqhcSlug: "clinica-de-salud-del-valle",
    title: "Health Enrollment Navigator",
    roleType: "Health Enrollment Navigator",
    department: "Community Supports",
    salaryMin: 38000,
    salaryMax: 50000,
    type: "Full-time",
    location: "Calexico",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["Community Supports"],
    postedDate: "2026-01-30",
    description: "Guide Imperial Valley residents through Medi-Cal enrollment and renewal processes, conduct community outreach, and help patients maintain continuous health coverage.",
    requirements: [
      "High school diploma or equivalent",
      "Bilingual Spanish/English required",
      "Experience with public benefits enrollment or community outreach",
      "Valid California driver's license and reliable transportation"
    ]
  },
  {
    id: "fqhc-173",
    fqhcSlug: "borrego-health",
    title: "Health Enrollment Navigator - Eligibility Specialist",
    roleType: "Health Enrollment Navigator",
    department: "Enrollment Services",
    salaryMin: 40000,
    salaryMax: 54000,
    type: "Full-time",
    location: "San Bernardino",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["Community Supports"],
    postedDate: "2026-02-08",
    description: "Screen patients for Medi-Cal eligibility, assist with enrollment applications, and coordinate with county social services to ensure coverage for Borrego Health's Inland Empire patient population.",
    requirements: [
      "Associate degree or 2+ years of enrollment/eligibility experience",
      "Bilingual Spanish/English strongly preferred",
      "Familiarity with Medi-Cal managed care plans in San Bernardino County",
      "Strong interpersonal skills and ability to work with vulnerable populations"
    ]
  },

  // --- Revenue Cycle Specialist (2 listings) ---
  {
    id: "fqhc-174",
    fqhcSlug: "community-health-center-network",
    title: "Revenue Cycle Specialist",
    roleType: "Revenue Cycle Specialist",
    department: "Revenue Cycle",
    salaryMin: 55000,
    salaryMax: 72000,
    type: "Full-time",
    location: "Fremont",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-01",
    description: "Manage the full revenue cycle for CHCN member clinics, including claims submission, denial management, accounts receivable follow-up, and payer contract analysis.",
    requirements: [
      "Bachelor's degree in healthcare administration, finance, or related field",
      "3+ years of revenue cycle experience, preferably in an FQHC or community health setting",
      "Proficiency with OCHIN Epic billing modules",
      "Knowledge of Medi-Cal, Medicare, and managed care billing"
    ]
  },
  {
    id: "fqhc-175",
    fqhcSlug: "altamed-health-services",
    title: "Revenue Cycle Specialist - Claims & Denials",
    roleType: "Revenue Cycle Specialist",
    department: "Finance",
    salaryMin: 52000,
    salaryMax: 75000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-01-25",
    description: "Analyze and resolve denied claims, monitor A/R aging, and work cross-functionally with clinical teams to reduce claim rejection rates across AltaMed's multi-site network.",
    requirements: [
      "Associate degree required; bachelor's preferred",
      "2+ years of claims and denial management experience",
      "Experience with FQHC PPS and wrap-around billing preferred",
      "Proficiency in Excel and EHR-based billing systems"
    ]
  },

  // --- Billing Specialist (2 listings) ---
  {
    id: "fqhc-176",
    fqhcSlug: "wellspace-health",
    title: "Billing Specialist",
    roleType: "Billing Specialist",
    department: "Revenue Cycle",
    salaryMin: 48000,
    salaryMax: 62000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-06",
    description: "Process and submit medical claims to Medi-Cal, Medicare, and commercial payers, resolve billing discrepancies, and ensure timely reimbursement for WellSpace Health clinic services.",
    requirements: [
      "High school diploma required; associate degree in health information or billing preferred",
      "2+ years of medical billing experience",
      "Knowledge of CPT, ICD-10, and HCPCS coding",
      "Experience with Medi-Cal billing and FQHC PPS rates preferred"
    ]
  },
  {
    id: "fqhc-177",
    fqhcSlug: "golden-valley-health-centers",
    title: "Billing Specialist - Medi-Cal",
    roleType: "Billing Specialist",
    department: "Revenue Cycle",
    salaryMin: 45000,
    salaryMax: 60000,
    type: "Full-time",
    location: "Merced",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-01-20",
    description: "Handle Medi-Cal claims submissions, follow up on unpaid claims, post payments, and support the revenue cycle team at Golden Valley Health Centers.",
    requirements: [
      "High school diploma with billing certification or equivalent experience",
      "1+ year of medical billing experience, Medi-Cal preferred",
      "Familiarity with FQHC billing practices",
      "Detail-oriented with strong analytical skills"
    ]
  },

  // --- Medical Coder (2 listings) ---
  {
    id: "fqhc-178",
    fqhcSlug: "apla-health",
    title: "Certified Medical Coder",
    roleType: "Medical Coder",
    department: "Revenue Cycle",
    salaryMin: 52000,
    salaryMax: 68000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: false,
    ehrSystem: "eClinicalWorks",
    programs: [],
    postedDate: "2026-02-11",
    description: "Review clinical documentation and assign accurate CPT, ICD-10, and HCPCS codes for APLA Health's primary care, behavioral health, and dental encounters.",
    requirements: [
      "CPC, CCS, or equivalent coding certification required",
      "2+ years of medical coding experience in an outpatient or FQHC setting",
      "Proficiency with ICD-10-CM and CPT coding guidelines",
      "Experience coding for behavioral health and HIV services preferred"
    ]
  },
  {
    id: "fqhc-179",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Medical Coder - Outpatient",
    roleType: "Medical Coder",
    department: "Revenue Cycle",
    salaryMin: 48000,
    salaryMax: 65000,
    type: "Full-time",
    location: "San Fernando",
    bilingual: false,
    ehrSystem: "eClinicalWorks",
    programs: [],
    postedDate: "2026-01-27",
    description: "Assign diagnosis and procedure codes for outpatient visits, conduct coding audits, and educate providers on documentation improvement to optimize reimbursement.",
    requirements: [
      "CPC or CCS-P certification required",
      "2+ years of outpatient medical coding experience",
      "Knowledge of Medi-Cal and Medicare coding requirements",
      "Strong attention to detail and ability to meet productivity standards"
    ]
  },

  // --- Licensed Vocational Nurse (3 listings) ---
  {
    id: "fqhc-180",
    fqhcSlug: "borrego-health",
    title: "Licensed Vocational Nurse - Primary Care",
    roleType: "Licensed Vocational Nurse",
    department: "Primary Care",
    salaryMin: 55000,
    salaryMax: 68000,
    type: "Full-time",
    location: "Brawley",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-09",
    description: "Provide clinical nursing support in Borrego Health's primary care clinic, including medication administration, patient assessments, wound care, and assisting providers with procedures.",
    requirements: [
      "Active California LVN license in good standing",
      "1+ year of clinical experience, community health preferred",
      "Bilingual Spanish/English preferred",
      "BLS/CPR certification required"
    ]
  },
  {
    id: "fqhc-181",
    fqhcSlug: "altamed-health-services",
    title: "Licensed Vocational Nurse - Pediatrics",
    roleType: "Licensed Vocational Nurse",
    department: "Primary Care",
    salaryMin: 56000,
    salaryMax: 70000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-01-31",
    description: "Support AltaMed's pediatric care team by administering immunizations, conducting patient intake, assisting with well-child exams, and providing patient education to families.",
    requirements: [
      "Active California LVN license required",
      "Pediatric experience strongly preferred",
      "Bilingual Spanish/English required",
      "IV certification preferred"
    ]
  },
  {
    id: "fqhc-182",
    fqhcSlug: "shasta-community-health-center",
    title: "Licensed Vocational Nurse",
    roleType: "Licensed Vocational Nurse",
    department: "Nursing",
    salaryMin: 52000,
    salaryMax: 65000,
    type: "Full-time",
    location: "Redding",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-04",
    description: "Deliver direct nursing care to patients at Shasta Community Health Center, including vitals, injections, lab draws, and care coordination with the primary care team.",
    requirements: [
      "Active California LVN license in good standing",
      "Experience in primary care or community health setting preferred",
      "BLS/CPR certification required",
      "Strong clinical assessment and documentation skills"
    ]
  },

  // --- Physician (2 listings) ---
  {
    id: "fqhc-183",
    fqhcSlug: "la-clinica-de-la-raza",
    title: "Family Medicine Physician",
    roleType: "Physician",
    department: "Primary Care",
    salaryMin: 220000,
    salaryMax: 310000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-13",
    description: "Provide comprehensive family medicine services to a diverse, predominantly Latino patient population at La Clinica de La Raza. NHSC loan repayment eligible.",
    requirements: [
      "MD or DO with active California medical license",
      "Board certified or board eligible in Family Medicine",
      "Bilingual Spanish/English strongly preferred",
      "Commitment to serving underserved communities; FQHC experience preferred"
    ]
  },
  {
    id: "fqhc-184",
    fqhcSlug: "wellspace-health",
    title: "Internal Medicine Physician",
    roleType: "Physician",
    department: "Primary Care",
    salaryMin: 230000,
    salaryMax: 350000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM", "CCM"],
    postedDate: "2026-01-18",
    description: "Join WellSpace Health's primary care team providing internal medicine services to Sacramento's underserved populations. Competitive salary with NHSC loan repayment eligibility.",
    requirements: [
      "MD or DO with active California medical license",
      "Board certified in Internal Medicine",
      "Experience managing complex, multi-morbid patients",
      "Passion for community health and health equity"
    ]
  },

  // --- Physician Assistant (2 listings) ---
  {
    id: "fqhc-185",
    fqhcSlug: "neighborhood-healthcare",
    title: "Physician Assistant - Primary Care",
    roleType: "Physician Assistant",
    department: "Primary Care",
    salaryMin: 120000,
    salaryMax: 165000,
    type: "Full-time",
    location: "Escondido",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM"],
    postedDate: "2026-02-07",
    description: "Provide primary care services including diagnosis, treatment, and preventive care for patients across the lifespan at Neighborhood Healthcare's Escondido clinic.",
    requirements: [
      "Graduate of accredited PA program with active California PA license",
      "NCCPA certification required",
      "1+ year of primary care experience preferred",
      "Bilingual Spanish/English preferred; DEA license required"
    ]
  },
  {
    id: "fqhc-186",
    fqhcSlug: "clinica-de-salud-del-valle",
    title: "Physician Assistant - Family Medicine",
    roleType: "Physician Assistant",
    department: "Primary Care",
    salaryMin: 115000,
    salaryMax: 155000,
    type: "Full-time",
    location: "El Centro",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM", "CCM"],
    postedDate: "2026-01-24",
    description: "Deliver family medicine services to Imperial Valley communities, managing acute and chronic conditions for a predominantly Spanish-speaking patient population.",
    requirements: [
      "Active California PA license and NCCPA certification",
      "Bilingual Spanish/English required",
      "Experience in community health or rural health preferred",
      "NHSC loan repayment eligible site"
    ]
  },

  // --- Dental Hygienist (2 listings) ---
  {
    id: "fqhc-187",
    fqhcSlug: "community-health-center-network",
    title: "Registered Dental Hygienist",
    roleType: "Dental Hygienist",
    department: "Dental",
    salaryMin: 80000,
    salaryMax: 105000,
    type: "Full-time",
    location: "San Leandro",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-10",
    description: "Perform dental prophylaxis, periodontal assessments, fluoride treatments, sealants, and patient education at CHCN member dental clinics serving East Bay communities.",
    requirements: [
      "Active California RDH license in good standing",
      "Current CPR/BLS certification",
      "Experience with Denti-Cal billing and documentation preferred",
      "Commitment to preventive dental care for underserved populations"
    ]
  },
  {
    id: "fqhc-188",
    fqhcSlug: "central-coast-community-health",
    title: "Dental Hygienist",
    roleType: "Dental Hygienist",
    department: "Dental",
    salaryMin: 75000,
    salaryMax: 100000,
    type: "Part-time",
    location: "Santa Maria",
    bilingual: true,
    ehrSystem: "Cerner",
    programs: [],
    postedDate: "2026-01-29",
    description: "Provide preventive dental hygiene services at Central Coast Community Health's Santa Maria dental clinic, with a focus on pediatric and adult prophylaxis.",
    requirements: [
      "Active California RDH license required",
      "Bilingual Spanish/English preferred",
      "1+ year of clinical dental hygiene experience",
      "Familiarity with FQHC dental workflows preferred"
    ]
  },

  // --- Dental Assistant (2 listings) ---
  {
    id: "fqhc-189",
    fqhcSlug: "golden-valley-health-centers",
    title: "Dental Assistant",
    roleType: "Dental Assistant",
    department: "Dental",
    salaryMin: 38000,
    salaryMax: 50000,
    type: "Full-time",
    location: "Merced",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-02-02",
    description: "Assist dentists with clinical procedures, prepare treatment rooms, take dental radiographs, and provide chairside support at Golden Valley's Merced dental clinic.",
    requirements: [
      "Dental Assistant certificate from accredited program",
      "X-ray and coronal polishing certificates required",
      "Bilingual Spanish/English preferred",
      "Experience with four-handed dentistry techniques"
    ]
  },
  {
    id: "fqhc-190",
    fqhcSlug: "altamed-health-services",
    title: "Registered Dental Assistant",
    roleType: "Dental Assistant",
    department: "Dental",
    salaryMin: 40000,
    salaryMax: 52000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-01-21",
    description: "Provide chairside assistance during dental procedures, sterilize instruments, manage patient flow, and take digital radiographs at AltaMed's Los Angeles dental sites.",
    requirements: [
      "Active California RDA license required",
      "1+ year of dental assisting experience preferred",
      "Bilingual Spanish/English required",
      "Current BLS/CPR certification"
    ]
  },

  // --- Pharmacist (2 listings) ---
  {
    id: "fqhc-191",
    fqhcSlug: "northeast-valley-health-corporation",
    title: "Clinical Pharmacist",
    roleType: "Pharmacist",
    department: "Pharmacy",
    salaryMin: 140000,
    salaryMax: 175000,
    type: "Full-time",
    location: "San Fernando",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: ["ECM", "CCM"],
    postedDate: "2026-02-14",
    description: "Provide clinical pharmacy services including medication therapy management, chronic disease consultations, and 340B program oversight at NEVHC's on-site pharmacy.",
    requirements: [
      "PharmD from accredited school of pharmacy",
      "Active California pharmacist license in good standing",
      "Experience with 340B Drug Pricing Program required",
      "Bilingual Spanish/English preferred; PGY-1 residency preferred"
    ]
  },
  {
    id: "fqhc-192",
    fqhcSlug: "sacramento-covered",
    title: "Pharmacist - 340B Program",
    roleType: "Pharmacist",
    department: "Pharmacy",
    salaryMin: 130000,
    salaryMax: 168000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: [],
    postedDate: "2026-01-15",
    description: "Manage Sacramento Covered's 340B pharmacy program, dispense medications, counsel patients on drug therapy, and collaborate with care teams to optimize medication outcomes.",
    requirements: [
      "PharmD with active California pharmacist license",
      "340B program management experience strongly preferred",
      "Knowledge of Medi-Cal pharmacy billing",
      "Experience in ambulatory care or community health pharmacy"
    ]
  },

  // --- Pharmacy Technician (2 listings) ---
  {
    id: "fqhc-193",
    fqhcSlug: "apla-health",
    title: "Pharmacy Technician",
    roleType: "Pharmacy Technician",
    department: "Pharmacy",
    salaryMin: 40000,
    salaryMax: 52000,
    type: "Full-time",
    location: "Los Angeles",
    bilingual: true,
    ehrSystem: "eClinicalWorks",
    programs: [],
    postedDate: "2026-02-03",
    description: "Support APLA Health's pharmacy operations by filling prescriptions, managing inventory, processing 340B claims, and assisting patients at the pharmacy window.",
    requirements: [
      "Active California Pharmacy Technician license",
      "CPhT certification preferred",
      "Experience with 340B split-billing or contract pharmacy preferred",
      "Bilingual Spanish/English preferred"
    ]
  },
  {
    id: "fqhc-194",
    fqhcSlug: "borrego-health",
    title: "Pharmacy Technician - Bilingual",
    roleType: "Pharmacy Technician",
    department: "Pharmacy",
    salaryMin: 38000,
    salaryMax: 50000,
    type: "Full-time",
    location: "San Bernardino",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: [],
    postedDate: "2026-01-19",
    description: "Assist pharmacists with prescription processing, patient intake, medication packaging, and inventory management at Borrego Health's Inland Empire pharmacy locations.",
    requirements: [
      "Active California Pharmacy Technician license required",
      "Bilingual Spanish/English required",
      "1+ year of pharmacy technician experience preferred",
      "Familiarity with Medi-Cal pharmacy claims processing"
    ]
  },

  // --- Licensed Marriage & Family Therapist (2 listings) ---
  {
    id: "fqhc-195",
    fqhcSlug: "la-clinica-de-la-raza",
    title: "Licensed Marriage & Family Therapist",
    roleType: "Licensed Marriage & Family Therapist",
    department: "Behavioral Health",
    salaryMin: 78000,
    salaryMax: 102000,
    type: "Full-time",
    location: "Oakland",
    bilingual: true,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration"],
    postedDate: "2026-02-11",
    description: "Provide individual, couples, and family therapy services integrated into La Clinica's primary care model, focusing on trauma-informed care for Latino and immigrant communities.",
    requirements: [
      "Active California LMFT license in good standing",
      "2+ years of post-licensure clinical experience",
      "Bilingual Spanish/English required",
      "Experience with integrated behavioral health in a primary care setting preferred"
    ]
  },
  {
    id: "fqhc-196",
    fqhcSlug: "wellspace-health",
    title: "Licensed Marriage & Family Therapist - Integrated Care",
    roleType: "Licensed Marriage & Family Therapist",
    department: "Behavioral Health",
    salaryMin: 72000,
    salaryMax: 98000,
    type: "Full-time",
    location: "Sacramento",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["BH Integration", "CCM"],
    postedDate: "2026-01-26",
    description: "Deliver brief therapy and crisis intervention as part of WellSpace Health's integrated behavioral health team, supporting patients with anxiety, depression, substance use, and family conflict.",
    requirements: [
      "Active California LMFT license required",
      "Experience in brief, solution-focused therapy models",
      "Familiarity with SBIRT and warm handoff workflows",
      "Comfort working in a fast-paced, team-based primary care environment"
    ]
  },

  // --- Referral Coordinator (2 listings) ---
  {
    id: "fqhc-197",
    fqhcSlug: "community-health-center-network",
    title: "Referral Coordinator",
    roleType: "Referral Coordinator",
    department: "Patient Services",
    salaryMin: 44000,
    salaryMax: 56000,
    type: "Full-time",
    location: "Fremont",
    bilingual: false,
    ehrSystem: "OCHIN Epic",
    programs: ["ECM"],
    postedDate: "2026-02-05",
    description: "Coordinate specialist referrals, track authorization statuses, schedule follow-up appointments, and ensure timely care transitions for CHCN patients across the East Bay.",
    requirements: [
      "High school diploma required; associate degree preferred",
      "2+ years of referral coordination or medical office experience",
      "Experience with prior authorizations and insurance verification",
      "Proficiency with EHR referral management modules"
    ]
  },
  {
    id: "fqhc-198",
    fqhcSlug: "clinica-de-salud-del-valle",
    title: "Referral Coordinator - Bilingual",
    roleType: "Referral Coordinator",
    department: "Administration",
    salaryMin: 40000,
    salaryMax: 54000,
    type: "Full-time",
    location: "El Centro",
    bilingual: true,
    ehrSystem: "NextGen",
    programs: ["ECM", "TCM"],
    postedDate: "2026-01-23",
    description: "Manage patient referrals to specialty providers, obtain authorizations from Medi-Cal managed care plans, and follow up to ensure Imperial Valley patients receive timely specialty care.",
    requirements: [
      "High school diploma or equivalent required",
      "Bilingual Spanish/English required",
      "Experience with Medi-Cal managed care authorization processes",
      "Strong organizational skills and attention to follow-through"
    ]
  }
];

export function getJobsForFqhc(slug: string): FQHCJobListing[] {
  return fqhcJobListings.filter(j => j.fqhcSlug === slug);
}
