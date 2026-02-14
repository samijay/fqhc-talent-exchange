export interface BulletTemplate {
  id: string;
  text: string;
  keywords: string[];
}

export interface RoleTemplate {
  roleId: string;
  roleLabel: string;
  objectiveTemplate: string;
  bullets: BulletTemplate[];
}

export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    roleId: "chw",
    roleLabel: "Community Health Worker",
    objectiveTemplate:
      "Dedicated Community Health Worker with experience serving underserved populations at Federally Qualified Health Centers. Skilled in community outreach, SDOH screenings, and patient navigation for Medi-Cal members.",
    bullets: [
      {
        id: "chw-1",
        text: "Conducted community outreach and engagement for ECM/CCM program members, building trust with hard-to-reach populations",
        keywords: ["ECM", "CCM", "community outreach", "CalAIM"],
      },
      {
        id: "chw-2",
        text: "Performed Social Determinants of Health (SDOH) screenings and connected patients to community resources including housing, food, and transportation",
        keywords: ["SDOH", "social determinants", "community resources"],
      },
      {
        id: "chw-3",
        text: "Maintained caseload of patients with complex needs including chronic conditions, behavioral health, and housing instability",
        keywords: ["caseload management", "chronic conditions", "patient engagement"],
      },
      {
        id: "chw-4",
        text: "Documented patient interactions and care coordination activities in electronic health record (EHR) system",
        keywords: ["EHR", "documentation", "care coordination"],
      },
      {
        id: "chw-5",
        text: "Provided culturally and linguistically appropriate health education to diverse patient populations",
        keywords: ["cultural competency", "health education", "bilingual"],
      },
      {
        id: "chw-6",
        text: "Assisted patients with Medi-Cal enrollment, benefits navigation, and appointment scheduling",
        keywords: ["Medi-Cal", "benefits navigation", "enrollment"],
      },
      {
        id: "chw-7",
        text: "Collaborated with multidisciplinary care team including providers, nurses, and behavioral health specialists to coordinate whole-person care",
        keywords: ["multidisciplinary", "care team", "whole-person care"],
      },
      {
        id: "chw-8",
        text: "Conducted home visits and field-based outreach to engage high-risk, hard-to-reach populations",
        keywords: ["home visits", "field-based", "high-risk", "outreach"],
      },
    ],
  },
  {
    roleId: "care_coordinator",
    roleLabel: "Care Coordinator",
    objectiveTemplate:
      "Experienced Care Coordinator specializing in Enhanced Care Management (ECM) and chronic disease management for Medi-Cal populations at Federally Qualified Health Centers.",
    bullets: [
      {
        id: "cc-1",
        text: "Coordinated care for ECM/CCM patients, ensuring timely follow-up, care plan adherence, and engagement tracking",
        keywords: ["ECM", "CCM", "care coordination", "CalAIM"],
      },
      {
        id: "cc-2",
        text: "Developed and maintained individualized care plans in collaboration with primary care providers and specialists",
        keywords: ["care plans", "individualized", "primary care"],
      },
      {
        id: "cc-3",
        text: "Tracked and reported on clinical quality measures including HEDIS and UDS metrics",
        keywords: ["HEDIS", "UDS", "quality measures", "reporting"],
      },
      {
        id: "cc-4",
        text: "Managed care transitions and hospital discharge follow-up to prevent readmissions",
        keywords: ["care transitions", "discharge follow-up", "readmission prevention"],
      },
      {
        id: "cc-5",
        text: "Facilitated referrals to Community Supports services including housing navigation, medically tailored meals, and recuperative care",
        keywords: ["Community Supports", "CalAIM", "housing navigation"],
      },
      {
        id: "cc-6",
        text: "Utilized EHR system for documentation, scheduling, and population health reporting",
        keywords: ["EHR", "population health", "documentation"],
      },
      {
        id: "cc-7",
        text: "Conducted motivational interviewing and patient engagement strategies to improve health outcomes",
        keywords: ["motivational interviewing", "patient engagement", "outcomes"],
      },
    ],
  },
  {
    roleId: "medical_assistant",
    roleLabel: "Medical Assistant",
    objectiveTemplate:
      "Certified Medical Assistant with FQHC experience supporting clinical operations, patient intake, and EHR documentation in high-volume community health settings.",
    bullets: [
      {
        id: "ma-1",
        text: "Performed patient intake including vitals, medication reconciliation, and pre-visit planning",
        keywords: ["patient intake", "vitals", "medication reconciliation"],
      },
      {
        id: "ma-2",
        text: "Administered vaccinations, injections, and point-of-care testing per provider orders",
        keywords: ["vaccinations", "injections", "point-of-care testing"],
      },
      {
        id: "ma-3",
        text: "Managed provider schedules and maintained efficient patient flow in multi-provider clinic",
        keywords: ["scheduling", "patient flow", "clinic operations"],
      },
      {
        id: "ma-4",
        text: "Documented clinical encounters and assisted with referral processing in EHR system",
        keywords: ["EHR", "clinical documentation", "referrals"],
      },
      {
        id: "ma-5",
        text: "Provided bilingual patient communication and translation services for Spanish-speaking patients",
        keywords: ["bilingual", "Spanish", "patient communication"],
      },
      {
        id: "ma-6",
        text: "Assisted with quality improvement initiatives including HEDIS measures and patient satisfaction surveys",
        keywords: ["quality improvement", "HEDIS", "patient satisfaction"],
      },
    ],
  },
  {
    roleId: "case_manager",
    roleLabel: "Case Manager",
    objectiveTemplate:
      "Experienced Case Manager specializing in CalAIM programs, behavioral health integration, and complex care management for underserved populations at Federally Qualified Health Centers.",
    bullets: [
      {
        id: "cm-1",
        text: "Managed complex caseload of patients with co-occurring behavioral health, substance use, and chronic medical conditions",
        keywords: ["complex care", "behavioral health", "substance use"],
      },
      {
        id: "cm-2",
        text: "Conducted comprehensive biopsychosocial assessments and developed individualized treatment plans",
        keywords: ["biopsychosocial assessment", "treatment plans"],
      },
      {
        id: "cm-3",
        text: "Facilitated care coordination across medical, behavioral health, and social service providers",
        keywords: ["care coordination", "behavioral health integration"],
      },
      {
        id: "cm-4",
        text: "Supported Enhanced Care Management (ECM) enrollment, engagement, and reporting requirements under CalAIM",
        keywords: ["ECM", "CalAIM", "enrollment", "reporting"],
      },
      {
        id: "cm-5",
        text: "Advocated for patient access to community resources including housing, legal aid, and benefits enrollment",
        keywords: ["patient advocacy", "community resources", "housing"],
      },
      {
        id: "cm-6",
        text: "Documented all case management activities and maintained compliance with Medi-Cal billing and HIPAA standards",
        keywords: ["Medi-Cal", "billing", "HIPAA", "compliance"],
      },
    ],
  },
  {
    roleId: "behavioral_health",
    roleLabel: "Behavioral Health Specialist",
    objectiveTemplate:
      "Licensed behavioral health professional with experience providing integrated care in FQHC settings, specializing in trauma-informed care and crisis intervention for underserved populations.",
    bullets: [
      {
        id: "bh-1",
        text: "Provided individual and group therapy for patients with depression, anxiety, PTSD, and substance use disorders",
        keywords: ["therapy", "behavioral health", "substance use"],
      },
      {
        id: "bh-2",
        text: "Delivered integrated behavioral health services in primary care setting using warm handoff model",
        keywords: ["integrated care", "BH integration", "warm handoff"],
      },
      {
        id: "bh-3",
        text: "Conducted crisis assessments and safety planning for high-risk patients",
        keywords: ["crisis assessment", "safety planning", "high-risk"],
      },
      {
        id: "bh-4",
        text: "Participated in BH-ASO program delivery and compliance reporting",
        keywords: ["BH-ASO", "compliance", "behavioral health"],
      },
      {
        id: "bh-5",
        text: "Maintained clinical documentation meeting Medi-Cal billing requirements and HIPAA standards",
        keywords: ["Medi-Cal", "billing", "HIPAA", "documentation"],
      },
      {
        id: "bh-6",
        text: "Provided culturally responsive, trauma-informed care to diverse populations including SMI, SUD, and homeless individuals",
        keywords: ["trauma-informed", "SMI", "SUD", "cultural competency"],
      },
    ],
  },
  // Additional role templates can be added here (nursing, provider, administrative, etc.)
];

export const COMMON_CERTIFICATIONS = [
  "CHW Certification (CA)",
  "Certified Medical Assistant (CMA)",
  "BLS/CPR",
  "HIPAA Compliance",
  "Motivational Interviewing",
  "Mental Health First Aid",
  "Trauma-Informed Care",
  "ECM/CCM Training",
  "Phlebotomy",
  "Case Management Certification (CCM)",
  "LCSW",
  "LMFT",
  "ASW/AMFT",
  "LVN",
  "RN",
] as const;

export const LANGUAGE_OPTIONS = [
  "English",
  "Spanish",
  "Mandarin",
  "Cantonese",
  "Vietnamese",
  "Tagalog",
  "Korean",
  "Other",
] as const;
