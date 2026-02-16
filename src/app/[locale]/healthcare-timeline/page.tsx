"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Globe,
  Handshake,
  Heart,
  Landmark,
  MapPin,
  Megaphone,
  Scale,
  Shield,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  legislationSources,
  implementationTimeline,
  type LegislationSource,
} from "@/lib/funding-impact-data";

/* ------------------------------------------------------------------ */
/*  Extended timeline data — US Healthcare History                      */
/*  From founding through present, with academic sources                */
/* ------------------------------------------------------------------ */

interface HealthcareEra {
  id: string;
  era: { en: string; es: string };
  yearRange: string;
  events: HealthcareTimelineEvent[];
}

interface HealthcareTimelineEvent {
  year: number;
  title: { en: string; es: string };
  description: { en: string; es: string };
  impact: { en: string; es: string };
  category: "legislation" | "institution" | "movement" | "expansion" | "crisis" | "california";
  sources: { title: string; url: string }[];
}

const categoryColors: Record<string, string> = {
  legislation: "bg-teal-100 text-teal-800",
  institution: "bg-blue-100 text-blue-800",
  movement: "bg-purple-100 text-purple-800",
  expansion: "bg-green-100 text-green-800",
  crisis: "bg-red-100 text-red-800",
  california: "bg-amber-100 text-amber-800",
};

const categoryLabels: Record<string, { en: string; es: string }> = {
  legislation: { en: "Legislation", es: "Legislación" },
  institution: { en: "Institution", es: "Institución" },
  movement: { en: "Movement", es: "Movimiento" },
  expansion: { en: "Expansion", es: "Expansión" },
  crisis: { en: "Crisis", es: "Crisis" },
  california: { en: "California", es: "California" },
};

const categoryIcons: Record<string, typeof Scale> = {
  legislation: Scale,
  institution: Building2,
  movement: Megaphone,
  expansion: TrendingUp,
  crisis: Heart,
  california: MapPin,
};

const HEALTHCARE_ERAS: HealthcareEra[] = [
  {
    id: "founding",
    era: { en: "Founding Era & Early Republic", es: "Era Fundacional y República Temprana" },
    yearRange: "1798–1900",
    events: [
      {
        year: 1798,
        title: { en: "Marine Hospital Service Act", es: "Ley del Servicio de Hospitales Marinos" },
        description: {
          en: "Congress creates the Marine Hospital Service — America's first federal healthcare program. Funded by a 20-cent/month tax on seamen's wages, it established hospitals in port cities to care for merchant sailors. This is the earliest example of government-sponsored healthcare in the United States.",
          es: "El Congreso crea el Servicio de Hospitales Marinos — el primer programa federal de salud de EE.UU. Financiado por un impuesto de 20 centavos/mes sobre los salarios de los marineros, estableció hospitales en ciudades portuarias para cuidar a los marineros mercantes.",
        },
        impact: {
          en: "Established the principle that the federal government has a role in providing healthcare. The Marine Hospital Service eventually became the U.S. Public Health Service in 1912.",
          es: "Estableció el principio de que el gobierno federal tiene un papel en proporcionar atención médica. El Servicio de Hospitales Marinos eventualmente se convirtió en el Servicio de Salud Pública de EE.UU. en 1912.",
        },
        category: "legislation",
        sources: [
          { title: "NLM History of Medicine — Marine Hospital Service", url: "https://www.nlm.nih.gov/hmd/about/exhibition/forallpeople-exhibition-marinehospitalservice.html" },
        ],
      },
      {
        year: 1847,
        title: { en: "American Medical Association Founded", es: "Fundación de la Asociación Médica Americana" },
        description: {
          en: "The AMA is founded in Philadelphia by Dr. Nathan Smith Davis to improve medical education standards and establish a code of medical ethics. It becomes the dominant voice in American medicine.",
          es: "La AMA es fundada en Filadelfia por el Dr. Nathan Smith Davis para mejorar los estándares de educación médica y establecer un código de ética médica.",
        },
        impact: {
          en: "The AMA would later become the primary opponent of national health insurance for over a century, successfully defeating proposals from Theodore Roosevelt through Harry Truman.",
          es: "La AMA luego se convertiría en el principal oponente del seguro nacional de salud por más de un siglo, derrotando con éxito propuestas desde Theodore Roosevelt hasta Harry Truman.",
        },
        category: "institution",
        sources: [
          { title: "Paul Starr, The Social Transformation of American Medicine (1982)", url: "https://www.basicbooks.com/titles/paul-starr/the-social-transformation-of-american-medicine/9780465093021/" },
        ],
      },
      {
        year: 1893,
        title: { en: "Johns Hopkins Hospital Opens", es: "Hospital Johns Hopkins Abre" },
        description: {
          en: "Johns Hopkins Hospital and School of Medicine opens in Baltimore, establishing the model for modern American medical education — combining clinical practice, research, and teaching.",
          es: "El Hospital y Escuela de Medicina Johns Hopkins abre en Baltimore, estableciendo el modelo para la educación médica americana moderna — combinando práctica clínica, investigación y enseñanza.",
        },
        impact: {
          en: "Transformed medicine from an apprenticeship trade into a science-based profession. The Flexner Report (1910) later used Hopkins as the gold standard, closing scores of schools that didn't meet its criteria.",
          es: "Transformó la medicina de un oficio de aprendizaje en una profesión basada en la ciencia. El Informe Flexner (1910) luego usó Hopkins como el estándar de oro.",
        },
        category: "institution",
        sources: [
          { title: "Abraham Flexner, Medical Education in the United States and Canada (1910)", url: "https://archive.carnegiefoundation.org/publications/pdfs/elibrary/Carnegie_Flexner_Report.pdf" },
        ],
      },
    ],
  },
  {
    id: "progressive",
    era: { en: "Progressive Era & New Deal", es: "Era Progresista y New Deal" },
    yearRange: "1900–1945",
    events: [
      {
        year: 1912,
        title: { en: "U.S. Public Health Service Established", es: "Servicio de Salud Pública de EE.UU. Establecido" },
        description: {
          en: "The Marine Hospital Service is reorganized and renamed the U.S. Public Health Service, with an expanded mandate to investigate diseases, sanitation, and public health.",
          es: "El Servicio de Hospitales Marinos es reorganizado y renombrado como el Servicio de Salud Pública de EE.UU., con un mandato expandido para investigar enfermedades, saneamiento y salud pública.",
        },
        impact: {
          en: "Created the institutional foundation for federal public health activities. Section 330 of the Public Health Service Act (1975) would later authorize FQHCs.",
          es: "Creó la base institucional para actividades federales de salud pública. La Sección 330 de la Ley del Servicio de Salud Pública (1975) luego autorizaría los FQHCs.",
        },
        category: "institution",
        sources: [
          { title: "USPHS History — HHS", url: "https://www.usphs.gov/history" },
        ],
      },
      {
        year: 1935,
        title: { en: "Social Security Act — Health Left Out", es: "Ley de Seguro Social — Salud Excluida" },
        description: {
          en: "FDR signs the Social Security Act, creating old-age pensions and unemployment insurance. National health insurance is deliberately excluded due to AMA opposition. The Committee on Economic Security initially included health insurance but dropped it to avoid killing the entire bill.",
          es: "FDR firma la Ley de Seguro Social, creando pensiones de vejez y seguro de desempleo. El seguro nacional de salud es deliberadamente excluido por oposición de la AMA.",
        },
        impact: {
          en: "The omission of health insurance from Social Security set the stage for America's employer-based insurance system — a path dependency that persists today.",
          es: "La omisión del seguro de salud de la Seguridad Social preparó el escenario para el sistema de seguro basado en el empleador de EE.UU. — una dependencia de trayectoria que persiste hoy.",
        },
        category: "legislation",
        sources: [
          { title: "Starr, The Social Transformation of American Medicine, pp. 266-289", url: "https://www.basicbooks.com/titles/paul-starr/the-social-transformation-of-american-medicine/9780465093021/" },
        ],
      },
      {
        year: 1946,
        title: { en: "Hill-Burton Act — Hospital Construction", es: "Ley Hill-Burton — Construcción de Hospitales" },
        description: {
          en: "The Hospital Survey and Construction Act (Hill-Burton) provides federal grants for hospital construction, especially in underserved areas. In exchange for funding, hospitals must provide a 'reasonable volume' of free care. Over 6,800 facilities are built or upgraded.",
          es: "La Ley de Encuestas y Construcción de Hospitales (Hill-Burton) proporciona subvenciones federales para construcción de hospitales, especialmente en áreas desatendidas.",
        },
        impact: {
          en: "Dramatically expanded hospital access in rural America. However, it allowed 'separate but equal' facilities in the South until the Civil Rights Act of 1964.",
          es: "Expandió dramáticamente el acceso hospitalario en la América rural. Sin embargo, permitió instalaciones 'separadas pero iguales' en el Sur hasta la Ley de Derechos Civiles de 1964.",
        },
        category: "legislation",
        sources: [
          { title: "HRSA Hill-Burton Free and Reduced-Cost Care", url: "https://www.hrsa.gov/get-health-care/affordable/hill-burton" },
        ],
      },
    ],
  },
  {
    id: "civil-rights",
    era: { en: "Civil Rights & Community Health Movement", es: "Derechos Civiles y Movimiento de Salud Comunitaria" },
    yearRange: "1945–1975",
    events: [
      {
        year: 1959,
        title: { en: "1199 Hospital Workers Strike — New York", es: "Huelga de Trabajadores Hospitalarios 1199 — Nueva York" },
        description: {
          en: "Under Leon Davis, Local 1199 leads 3,500 workers in a 46-day strike against seven New York City voluntary hospitals. Workers — predominantly Black and Puerto Rican women earning $30-40/week — demand union recognition, wage increases, and dignity. The strike is supported by Eleanor Roosevelt, A. Philip Randolph, and Martin Luther King Jr.",
          es: "Bajo Leon Davis, el Local 1199 lidera a 3,500 trabajadores en una huelga de 46 días contra siete hospitales voluntarios de la Ciudad de Nueva York. Los trabajadores — predominantemente mujeres negras y puertorriqueñas ganando $30-40/semana — demandan reconocimiento sindical, aumentos salariales y dignidad.",
        },
        impact: {
          en: "Won union recognition and established 1199 as 'the union of the civil rights movement.' Martin Luther King Jr. called 1199 'my favorite union.' Led directly to New York extending collective bargaining rights to nonprofit hospital workers.",
          es: "Ganó el reconocimiento sindical y estableció 1199 como 'el sindicato del movimiento de derechos civiles.' Martin Luther King Jr. llamó a 1199 'mi sindicato favorito.'",
        },
        category: "movement",
        sources: [
          { title: "Fink & Greenberg, Upheaval in the Quiet Zone: 1199 SEIU and the Politics of Health Care Unionism", url: "https://www.press.uillinois.edu/books/?id=p070398" },
        ],
      },
      {
        year: 1965,
        title: { en: "Medicare & Medicaid Enacted (Social Security Amendments)", es: "Medicare y Medicaid Promulgados (Enmiendas al Seguro Social)" },
        description: {
          en: "President Lyndon B. Johnson signs the Social Security Amendments of 1965 (P.L. 89-97) at the Harry S. Truman Library, creating Medicare (Title XVIII) for Americans 65+ and Medicaid (Title XIX) as a joint federal-state program for low-income individuals. Truman, who had proposed national health insurance in 1945, is enrolled as the first Medicare beneficiary.",
          es: "El Presidente Lyndon B. Johnson firma las Enmiendas al Seguro Social de 1965 (P.L. 89-97) en la Biblioteca Harry S. Truman, creando Medicare (Título XVIII) para estadounidenses de 65+ y Medicaid (Título XIX) como un programa federal-estatal conjunto para individuos de bajos ingresos.",
        },
        impact: {
          en: "The single most important healthcare legislation in U.S. history. Within one year, 19 million Americans enrolled in Medicare. Medicaid initially covered only welfare recipients but has expanded to serve 90+ million Americans today. FQHCs depend on Medicaid for 60-80% of their revenue.",
          es: "La legislación de salud más importante en la historia de EE.UU. En un año, 19 millones de estadounidenses se inscribieron en Medicare. Medicaid inicialmente cubría solo a beneficiarios de asistencia social pero se ha expandido para servir a más de 90 millones de estadounidenses hoy.",
        },
        category: "legislation",
        sources: [
          { title: "Social Security Amendments of 1965 (P.L. 89-97)", url: "https://www.govinfo.gov/content/pkg/STATUTE-79/pdf/STATUTE-79-Pg286.pdf" },
          { title: "CMS History — Medicare & Medicaid", url: "https://www.cms.gov/about-cms/agency-information/history" },
        ],
      },
      {
        year: 1965,
        title: { en: "First Community Health Centers — Columbia Point & Mound Bayou", es: "Primeros Centros de Salud Comunitaria — Columbia Point y Mound Bayou" },
        description: {
          en: "Dr. H. Jack Geiger and Dr. Count Gibson establish the nation's first two community health centers: Columbia Point in Boston (in a public housing project) and the Tufts-Delta Health Center in Mound Bayou, Mississippi (in the poorest county in America). Both are funded by the Office of Economic Opportunity as part of LBJ's War on Poverty.",
          es: "El Dr. H. Jack Geiger y el Dr. Count Gibson establecen los primeros dos centros de salud comunitaria: Columbia Point en Boston (en un proyecto de vivienda pública) y el Centro de Salud Tufts-Delta en Mound Bayou, Mississippi (en el condado más pobre de EE.UU.).",
        },
        impact: {
          en: "These two clinics became the model for every FQHC in the country — community-governed, comprehensive care, regardless of ability to pay. Geiger famously prescribed food as medicine in Mound Bayou. By 1971, 100 community health centers were operating nationwide.",
          es: "Estas dos clínicas se convirtieron en el modelo para cada FQHC en el país — gobernadas por la comunidad, atención integral, sin importar la capacidad de pago. Geiger famosamente recetó comida como medicina en Mound Bayou.",
        },
        category: "institution",
        sources: [
          { title: "Lefkowitz, Community Health Centers: A Movement and the People Who Made It Possible", url: "https://www.rutgersuniversitypress.org/community-health-centers/9780813541839/" },
          { title: "AJPH — Jack Geiger and Community Health Centers", url: "https://ajph.aphapublications.org/doi/full/10.2105/AJPH.2004.060020" },
        ],
      },
      {
        year: 1966,
        title: { en: "Medi-Cal Established in California", es: "Medi-Cal Establecido en California" },
        description: {
          en: "California implements Medicaid as 'Medi-Cal' — one of the first and largest state Medicaid programs. Initially covers welfare recipients and medically needy individuals.",
          es: "California implementa Medicaid como 'Medi-Cal' — uno de los primeros y más grandes programas estatales de Medicaid. Inicialmente cubre a beneficiarios de asistencia social e individuos médicamente necesitados.",
        },
        impact: {
          en: "Today Medi-Cal serves over 14 million Californians — more than one-third of the state's population. It is the single largest health insurance program in the United States.",
          es: "Hoy Medi-Cal sirve a más de 14 millones de californianos — más de un tercio de la población del estado. Es el programa de seguro de salud más grande de EE.UU.",
        },
        category: "california",
        sources: [
          { title: "CHCF — Medi-Cal Explained", url: "https://www.chcf.org/collection/medi-cal-explained/" },
        ],
      },
      {
        year: 1969,
        title: { en: "Charleston Hospital Workers' Strike", es: "Huelga de Trabajadores Hospitalarios de Charleston" },
        description: {
          en: "400 Black women workers at the Medical College Hospital in Charleston, South Carolina strike for union recognition and a $1.30/hour minimum wage. The 113-day strike becomes a national civil rights cause — Coretta Scott King, Ralph Abernathy, and Walter Reuther join the picket lines. The National Guard is deployed.",
          es: "400 mujeres trabajadoras negras del Hospital del Colegio Médico en Charleston, Carolina del Sur se declaran en huelga por reconocimiento sindical y un salario mínimo de $1.30/hora. La huelga de 113 días se convierte en una causa nacional de derechos civiles.",
        },
        impact: {
          en: "Demonstrated the inseparability of labor rights and civil rights in healthcare. Galvanized the hospital workers' union movement nationally. The workers won modest wage increases but union recognition was denied.",
          es: "Demostró la inseparabilidad de los derechos laborales y los derechos civiles en la salud. Galvanizó el movimiento sindical de trabajadores hospitalarios a nivel nacional.",
        },
        category: "movement",
        sources: [
          { title: "Fink, Upheaval in the Quiet Zone, Ch. 5", url: "https://www.press.uillinois.edu/books/?id=p070398" },
        ],
      },
      {
        year: 1975,
        title: { en: "Section 330 — FQHC Authorization", es: "Sección 330 — Autorización de FQHCs" },
        description: {
          en: "Congress codifies the community health center program under Section 330 of the Public Health Service Act, creating the statutory basis for FQHCs. Community health centers are defined as entities serving medically underserved populations, with required primary care services and community board governance.",
          es: "El Congreso codifica el programa de centros de salud comunitaria bajo la Sección 330 de la Ley del Servicio de Salud Pública, creando la base legal para los FQHCs.",
        },
        impact: {
          en: "Established the permanent federal authorization and funding mechanism for FQHCs. Every FQHC in the country traces its legal authority to this law. Today, 1,400+ health centers operate 15,000+ sites nationwide.",
          es: "Estableció la autorización federal permanente y el mecanismo de financiamiento para FQHCs. Cada FQHC en el país tiene su autoridad legal en esta ley.",
        },
        category: "legislation",
        sources: [
          { title: "42 U.S.C. §254b — Health Centers", url: "https://www.law.cornell.edu/uscode/text/42/254b" },
        ],
      },
    ],
  },
  {
    id: "reagan-clinton",
    era: { en: "From Reagan to Clinton: Managed Care & Expansion", es: "De Reagan a Clinton: Atención Administrada y Expansión" },
    yearRange: "1980–2008",
    events: [
      {
        year: 1986,
        title: { en: "EMTALA — Emergency Care for All", es: "EMTALA — Atención de Emergencia para Todos" },
        description: {
          en: "Congress passes the Emergency Medical Treatment and Labor Act (EMTALA), requiring hospitals that accept Medicare to provide emergency care regardless of insurance status, citizenship, or ability to pay.",
          es: "El Congreso aprueba la Ley de Tratamiento Médico de Emergencia y Trabajo de Parto (EMTALA), requiriendo que hospitales que aceptan Medicare proporcionen atención de emergencia sin importar estatus de seguro, ciudadanía o capacidad de pago.",
        },
        impact: {
          en: "Created a de facto right to emergency care in America. However, it also shifted enormous uncompensated care costs to hospitals — driving the need for better primary care access at FQHCs to prevent avoidable ER visits.",
          es: "Creó un derecho de facto a la atención de emergencia en EE.UU. Sin embargo, también trasladó enormes costos de atención no compensada a los hospitales.",
        },
        category: "legislation",
        sources: [
          { title: "42 U.S.C. §1395dd — EMTALA", url: "https://www.law.cornell.edu/uscode/text/42/1395dd" },
        ],
      },
      {
        year: 1989,
        title: { en: "FQHC Medicaid PPS Payment Established", es: "Pago PPS de Medicaid para FQHCs Establecido" },
        description: {
          en: "Congress mandates Medicaid cost-based reimbursement for FQHCs through the Omnibus Budget Reconciliation Act (OBRA 1989), later converted to the Prospective Payment System (PPS). This ensures FQHCs are reimbursed at rates that reflect their actual costs of providing care.",
          es: "El Congreso establece el reembolso basado en costos de Medicaid para FQHCs a través de la Ley de Reconciliación Presupuestaria Ómnibus (OBRA 1989), luego convertido al Sistema de Pago Prospectivo (PPS).",
        },
        impact: {
          en: "PPS rates ($200-400/visit) are the financial backbone of the FQHC model. Without them, FQHCs cannot sustain comprehensive care for underserved populations. This is what California's 2026 budget threatens to eliminate for undocumented patients.",
          es: "Las tasas PPS ($200-400/visita) son la columna financiera del modelo FQHC. Sin ellas, los FQHCs no pueden sostener atención integral para poblaciones desatendidas.",
        },
        category: "legislation",
        sources: [
          { title: "Medi-Cal Explained: How Health Centers Are Paid — CHCF", url: "https://www.chcf.org/resource/medi-cal-explained-how-health-centers-paid/" },
        ],
      },
      {
        year: 1997,
        title: { en: "CHIP — Children's Health Insurance Program", es: "CHIP — Programa de Seguro de Salud Infantil" },
        description: {
          en: "Congress creates the State Children's Health Insurance Program (SCHIP/CHIP) as part of the Balanced Budget Act of 1997, providing federal matching funds for states to cover uninsured children in families above Medicaid thresholds but unable to afford private insurance.",
          es: "El Congreso crea el Programa de Seguro de Salud para Niños del Estado (SCHIP/CHIP) como parte de la Ley de Presupuesto Equilibrado de 1997.",
        },
        impact: {
          en: "Expanded coverage to millions of children. California's CHIP program (Healthy Families, later folded into Medi-Cal) helped reduce the state's uninsured children rate dramatically.",
          es: "Expandió cobertura a millones de niños. El programa CHIP de California (Healthy Families, luego integrado a Medi-Cal) ayudó a reducir dramáticamente la tasa de niños sin seguro del estado.",
        },
        category: "expansion",
        sources: [
          { title: "CMS — CHIP Program History", url: "https://www.medicaid.gov/chip/index.html" },
        ],
      },
    ],
  },
  {
    id: "aca-era",
    era: { en: "ACA Era & Modern Expansion", es: "Era ACA y Expansión Moderna" },
    yearRange: "2010–2022",
    events: [
      {
        year: 2010,
        title: { en: "Affordable Care Act Signed", es: "Ley de Cuidado de Salud Asequible Firmada" },
        description: {
          en: "President Obama signs the Patient Protection and Affordable Care Act (P.L. 111-148). Section 2001 expands Medicaid to all non-elderly adults at or below 133% FPL. The law also includes $11 billion in new Section 330 funding for FQHCs over 5 years — the largest single investment in community health centers in history.",
          es: "El Presidente Obama firma la Ley de Protección al Paciente y Cuidado de Salud Asequible (P.L. 111-148). La Sección 2001 expande Medicaid a todos los adultos no ancianos con ingresos iguales o inferiores al 133% FPL.",
        },
        impact: {
          en: "Expanded coverage to 20+ million Americans. California was an early adopter of Medicaid expansion — Medi-Cal enrollment grew from 8.6M to 14.7M. FQHCs saw dramatic revenue increases as uninsured patients became insured.",
          es: "Expandió cobertura a más de 20 millones de estadounidenses. California fue un adoptador temprano de la expansión de Medicaid — la inscripción en Medi-Cal creció de 8.6M a 14.7M.",
        },
        category: "legislation",
        sources: [
          { title: "P.L. 111-148 Full Text", url: "https://www.govinfo.gov/content/pkg/PLAW-111publ148/html/PLAW-111publ148.htm" },
          { title: "KFF — ACA Medicaid Expansion", url: "https://www.kff.org/medicaid/issue-brief/status-of-state-medicaid-expansion-decisions-interactive-map/" },
        ],
      },
      {
        year: 2012,
        title: { en: "NFIB v. Sebelius — Medicaid Expansion Made Optional", es: "NFIB v. Sebelius — Expansión de Medicaid Voluntaria" },
        description: {
          en: "The Supreme Court upholds the ACA's individual mandate but rules that Congress cannot coerce states into expanding Medicaid by threatening to cut all existing Medicaid funding. Medicaid expansion becomes optional for states.",
          es: "La Corte Suprema sostiene el mandato individual del ACA pero dictamina que el Congreso no puede coaccionar a los estados para expandir Medicaid amenazando con cortar todo el financiamiento existente de Medicaid.",
        },
        impact: {
          en: "Created a patchwork of expansion and non-expansion states. As of 2024, 40 states and DC have expanded Medicaid. The remaining 10 non-expansion states leave approximately 2 million low-income adults in the 'coverage gap.'",
          es: "Creó un mosaico de estados con y sin expansión. Para 2024, 40 estados y DC han expandido Medicaid. Los 10 estados sin expansión restantes dejan aproximadamente 2 millones de adultos de bajos ingresos en la 'brecha de cobertura.'",
        },
        category: "legislation",
        sources: [
          { title: "National Federation of Independent Business v. Sebelius, 567 U.S. 519 (2012)", url: "https://supreme.justia.com/cases/federal/us/567/519/" },
        ],
      },
      {
        year: 2016,
        title: { en: "California Medi-Cal Expansion to Undocumented Children", es: "Expansión de Medi-Cal de California a Niños Indocumentados" },
        description: {
          en: "California begins providing full-scope Medi-Cal to undocumented children under 19 (SB 75, signed 2015). This is the first phase of California's groundbreaking expansion of healthcare to all income-eligible residents regardless of immigration status.",
          es: "California comienza a proporcionar Medi-Cal de alcance completo a niños indocumentados menores de 19 años (SB 75, firmada 2015). Esta es la primera fase de la expansión innovadora de California.",
        },
        impact: {
          en: "Opened the door for California's subsequent expansions to undocumented young adults (2020), older adults (2022), and all remaining adults (2024). Made California the national leader in immigrant healthcare access.",
          es: "Abrió la puerta para las expansiones subsecuentes de California a adultos jóvenes indocumentados (2020), adultos mayores (2022) y todos los adultos restantes (2024).",
        },
        category: "california",
        sources: [
          { title: "SB 75 (2015) — Full Text", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201520160SB75" },
        ],
      },
      {
        year: 2022,
        title: { en: "CalAIM Launches — Transforming Medi-Cal", es: "CalAIM se Lanza — Transformando Medi-Cal" },
        description: {
          en: "California Advancing and Innovating Medi-Cal (CalAIM) launches, establishing Enhanced Care Management (ECM) and Community Supports as Medi-Cal benefits. Authorized by AB 133 under a Section 1115 waiver, CalAIM represents California's vision for a whole-person-care Medicaid system.",
          es: "California Advancing and Innovating Medi-Cal (CalAIM) se lanza, estableciendo el Manejo Mejorado de Cuidados (ECM) y Apoyos Comunitarios como beneficios de Medi-Cal.",
        },
        impact: {
          en: "ECM ($956M/year) and Community Supports ($231M/year) fund CHWs, care coordinators, housing navigation, and medically tailored meals at FQHCs. The 1115 waiver expires December 2026 — renewal is uncertain.",
          es: "ECM ($956M/año) y Apoyos Comunitarios ($231M/año) financian CHWs, coordinadores de cuidados, navegación de vivienda y comidas adaptadas médicamente en FQHCs. El waiver 1115 expira en diciembre de 2026.",
        },
        category: "california",
        sources: [
          { title: "DHCS — CalAIM", url: "https://www.dhcs.ca.gov/CalAIM" },
          { title: "AB 133 (2021) — Full Text", url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202120220AB133" },
        ],
      },
    ],
  },
  {
    id: "crisis",
    era: { en: "The Current Crisis: 2024–Present", es: "La Crisis Actual: 2024–Presente" },
    yearRange: "2024–Present",
    events: [
      {
        year: 2024,
        title: { en: "California Expands Medi-Cal to All Income-Eligible Adults", es: "California Expande Medi-Cal a Todos los Adultos Elegibles por Ingresos" },
        description: {
          en: "California completes its historic expansion of full-scope Medi-Cal to all income-eligible adults ages 26-49 regardless of immigration status, making it the first state to achieve universal Medi-Cal eligibility by income alone. Approximately 700,000 undocumented adults gain full coverage.",
          es: "California completa su expansión histórica de Medi-Cal de alcance completo a todos los adultos elegibles por ingresos de 26-49 años sin importar su estatus migratorio. Aproximadamente 700,000 adultos indocumentados obtienen cobertura completa.",
        },
        impact: {
          en: "This achievement is now threatened by both federal (H.R. 1) and state (enrollment freeze, PPS cuts, dental elimination) policy changes in 2025-2026.",
          es: "Este logro ahora está amenazado por cambios de política tanto federales (H.R. 1) como estatales (congelamiento de inscripción, recortes PPS, eliminación dental) en 2025-2026.",
        },
        category: "california",
        sources: [
          { title: "CHCF — Medi-Cal Expansion to All Adults", url: "https://www.chcf.org/collection/medi-cal-explained/" },
        ],
      },
      {
        year: 2025,
        title: { en: "H.R. 1 — One Big Beautiful Bill Act (P.L. 119-21)", es: "H.R. 1 — Ley One Big Beautiful Bill (P.L. 119-21)" },
        description: {
          en: "Signed July 4, 2025, H.R. 1 enacts the largest Medicaid cuts in the program's 60-year history: $840 billion over 10 years. Key provisions include 6-month eligibility redeterminations (Sec. 71107), mandatory work requirements of 80 hours/month (Sec. 71119), reduced retroactive coverage (Sec. 71108), $35 copays for expansion adults (Sec. 71120, FQHCs exempt), and provider tax limits threatening California's MCO tax.",
          es: "Firmada el 4 de julio de 2025, H.R. 1 promulga los mayores recortes a Medicaid en los 60 años de historia del programa: $840 mil millones en 10 años.",
        },
        impact: {
          en: "CBO projects 10 million Americans will lose coverage by 2034. In California, 8.2 million adults are at risk from work requirements alone. FQHCs face cascading revenue losses from patient coverage churn, while copay exemption status may increase demand without additional funding.",
          es: "La CBO proyecta que 10 millones de estadounidenses perderán cobertura para 2034. En California, 8.2 millones de adultos están en riesgo solo por los requisitos de trabajo.",
        },
        category: "crisis",
        sources: [
          { title: "P.L. 119-21 Full Text", url: "https://www.congress.gov/119/plaws/publ21/PLAW-119publ21.pdf" },
          { title: "CRS Report R48569 — Health Coverage Provisions", url: "https://www.congress.gov/crs-product/R48569" },
          { title: "CHCF — Massive Federal Cuts and Medi-Cal", url: "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/" },
        ],
      },
      {
        year: 2026,
        title: { en: "California Budget Cuts to Undocumented Medi-Cal Coverage", es: "Recortes Presupuestarios de California a Cobertura de Medi-Cal para Indocumentados" },
        description: {
          en: "Governor Newsom's budget freezes new Medi-Cal enrollment for undocumented adults (Jan 2026), eliminates dental coverage for undocumented adults (Jul 2026), eliminates PPS reimbursement rates for undocumented patient services (Jul 2026), and introduces $30/month premiums for undocumented enrollees aged 19-59 (Jul 2027).",
          es: "El presupuesto del Gobernador Newsom congela la nueva inscripción en Medi-Cal para adultos indocumentados (ene 2026), elimina la cobertura dental para adultos indocumentados (jul 2026), elimina las tasas de reembolso PPS para servicios a pacientes indocumentados (jul 2026), e introduce primas de $30/mes para inscritos indocumentados de 19-59 años (jul 2027).",
        },
        impact: {
          en: "FQHCs face a 50-70% per-visit revenue cut for undocumented patients when PPS rates are eliminated. Combined with dental coverage loss ($308M/year) and enrollment freeze, FQHCs serving border and immigrant communities face existential financial pressure.",
          es: "Los FQHCs enfrentan un recorte de ingresos del 50-70% por visita para pacientes indocumentados cuando se eliminen las tasas PPS.",
        },
        category: "crisis",
        sources: [
          { title: "CalMatters — Medi-Cal Enrollment Freeze", url: "https://calmatters.org/health/2025/05/newsom-freeze-medi-cal-undocumented-immigrants/" },
          { title: "Cal Budget Center — May Revision", url: "https://calbudgetcenter.org/resources/first-look-understanding-the-governors-2025-26-may-revision/" },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper                                                              */
/* ------------------------------------------------------------------ */

function t(obj: { en: string; es: string }, locale: string): string {
  return locale === "es" ? obj.es : obj.en;
}

/* ------------------------------------------------------------------ */
/*  Timeline Event Component                                            */
/* ------------------------------------------------------------------ */

function TimelineEvent({
  event,
  locale,
}: {
  event: HealthcareTimelineEvent;
  locale: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = categoryIcons[event.category] || Calendar;

  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      <div className="absolute left-5 top-12 bottom-0 w-px bg-stone-200" />
      <div
        className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${categoryColors[event.category]}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-amber-600">{event.year}</span>
            <Badge variant="outline" className={`text-[10px] ${categoryColors[event.category]}`}>
              {t(categoryLabels[event.category], locale)}
            </Badge>
          </div>
          <h4 className="mt-1 font-semibold text-stone-800">
            {t(event.title, locale)}
          </h4>
          <p className="mt-1 text-sm text-stone-600">
            {t(event.description, locale)}
          </p>
        </button>

        {expanded && (
          <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-semibold text-teal-700">
              {locale === "es" ? "Impacto:" : "Impact:"}
            </p>
            <p className="mt-1 text-sm text-stone-700">{t(event.impact, locale)}</p>
            {event.sources.length > 0 && (
              <div className="mt-3 space-y-1">
                <p className="text-xs font-semibold text-stone-500">
                  {locale === "es" ? "Fuentes:" : "Sources:"}
                </p>
                {event.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800"
                  >
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                    {src.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Legislation Card                                                    */
/* ------------------------------------------------------------------ */

function LegislationCard({
  law,
  locale,
}: {
  law: LegislationSource;
  locale: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={
                law.level === "federal"
                  ? "bg-blue-50 text-blue-700"
                  : law.level === "state"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-stone-50 text-stone-700"
              }
            >
              {law.level === "federal"
                ? locale === "es" ? "Federal" : "Federal"
                : law.level === "state"
                  ? locale === "es" ? "Estatal" : "State"
                  : "Local"}
            </Badge>
            <Badge
              variant="outline"
              className={
                law.status === "enacted"
                  ? "bg-green-50 text-green-700"
                  : "bg-amber-50 text-amber-700"
              }
            >
              {law.status === "enacted"
                ? locale === "es" ? "Promulgada" : "Enacted"
                : law.status}
            </Badge>
          </div>
          <h3 className="mt-2 font-bold text-stone-800">{law.shortName}</h3>
          <p className="mt-0.5 text-xs text-stone-500">
            {locale === "es" ? law.esOfficialName : law.officialName}
          </p>
          {law.dateEnacted && (
            <p className="mt-1 text-xs text-stone-400">
              {locale === "es" ? "Promulgada:" : "Enacted:"}{" "}
              {new Date(law.dateEnacted + "T00:00:00").toLocaleDateString(
                locale === "es" ? "es-US" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </p>
          )}
        </div>
        <div className="mt-1 flex-shrink-0">
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-stone-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-stone-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-stone-100 px-5 pb-5 pt-4 space-y-4">
          {/* Key Provisions */}
          {law.keyProvisions.map((prov, i) => (
            <div key={i} className="rounded-lg bg-stone-50 p-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] bg-white">
                  {prov.sectionRef}
                </Badge>
              </div>
              <h4 className="mt-2 text-sm font-semibold text-stone-800">
                {t(prov.title, locale)}
              </h4>
              <p className="mt-1 text-xs text-stone-600">
                {t(prov.summary, locale)}
              </p>
              {prov.specificLanguage && (
                <blockquote className="mt-2 border-l-2 border-teal-300 pl-3 text-xs italic text-teal-800 bg-teal-50/50 py-2 pr-2 rounded-r">
                  {prov.specificLanguage}
                </blockquote>
              )}
              <div className="mt-2 rounded bg-amber-50 p-2">
                <p className="text-xs font-medium text-amber-800">
                  {locale === "es" ? "Impacto:" : "Impact:"}
                </p>
                <p className="text-xs text-amber-700">{t(prov.impact, locale)}</p>
              </div>
            </div>
          ))}

          {/* FQHC Impact */}
          <div className="rounded-lg bg-teal-50 p-4">
            <p className="text-xs font-semibold text-teal-800">
              {locale === "es" ? "Impacto en FQHCs:" : "FQHC Impact:"}
            </p>
            <p className="mt-1 text-xs text-teal-700">
              {t(law.fqhcImpact, locale)}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            <a
              href={law.billTextUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 hover:bg-teal-100"
            >
              <FileText className="h-3 w-3" />
              {locale === "es" ? "Texto de la Ley" : "Bill Text"}
            </a>
            {law.fullTextPdfUrl && (
              <a
                href={law.fullTextPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200"
              >
                <FileText className="h-3 w-3" />
                PDF
              </a>
            )}
            {law.summaryUrl && (
              <a
                href={law.summaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200"
              >
                <BookOpen className="h-3 w-3" />
                {locale === "es" ? "Resumen" : "Summary"}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function HealthcareTimelinePage() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<"timeline" | "legislation" | "milestones">("timeline");
  const [eraFilter, setEraFilter] = useState<string>("all");
  const [legislationLevel, setLegislationLevel] = useState<string>("all");

  const filteredEras =
    eraFilter === "all"
      ? HEALTHCARE_ERAS
      : HEALTHCARE_ERAS.filter((e) => e.id === eraFilter);

  const filteredLegislation =
    legislationLevel === "all"
      ? legislationSources
      : legislationSources.filter((l) => l.level === legislationLevel);

  const tabs = [
    { id: "timeline" as const, label: locale === "es" ? "Línea de Tiempo" : "Timeline", icon: Calendar },
    { id: "legislation" as const, label: locale === "es" ? "Legislación" : "Legislation", icon: Scale },
    { id: "milestones" as const, label: locale === "es" ? "Próximos Hitos" : "Upcoming", icon: Landmark },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-stone-900 py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <Badge className="mb-4 bg-amber-500/20 text-amber-300">
            <Stethoscope className="mr-1 h-3 w-3" />
            {locale === "es" ? "Historia y Política" : "History & Policy"}
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            {locale === "es"
              ? "Historia de la Salud en Estados Unidos"
              : "US Healthcare History & Policy Timeline"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            {locale === "es"
              ? "Desde el Servicio de Hospitales Marinos de 1798 hasta H.R. 1 en 2025 — la historia completa de la salud pública, Medicaid, y los centros de salud comunitarios, con fuentes legislativas primarias."
              : "From the 1798 Marine Hospital Service to H.R. 1 in 2025 — the full story of public health, Medicaid, and community health centers, with primary legislative sources."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-teal-100">
              <Calendar className="h-3.5 w-3.5" />
              {HEALTHCARE_ERAS.reduce((sum, era) => sum + era.events.length, 0)}{" "}
              {locale === "es" ? "eventos" : "events"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-teal-100">
              <Scale className="h-3.5 w-3.5" />
              {legislationSources.length}{" "}
              {locale === "es" ? "leyes documentadas" : "laws documented"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-teal-100">
              <Landmark className="h-3.5 w-3.5" />
              {implementationTimeline.length}{" "}
              {locale === "es" ? "próximos hitos" : "upcoming milestones"}
            </span>
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <div className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4">
          <nav className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-teal-50 text-teal-800"
                      : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* ══════════════════════════════════════════════════ */}
        {/*  TIMELINE TAB                                      */}
        {/* ══════════════════════════════════════════════════ */}
        {activeTab === "timeline" && (
          <div>
            {/* Era Filter */}
            <div className="mb-6 flex flex-wrap gap-1.5">
              <button
                onClick={() => setEraFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  eraFilter === "all"
                    ? "bg-teal-100 text-teal-800"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {locale === "es" ? "Todas las Eras" : "All Eras"}
              </button>
              {HEALTHCARE_ERAS.map((era) => (
                <button
                  key={era.id}
                  onClick={() => setEraFilter(era.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    eraFilter === era.id
                      ? "bg-teal-100 text-teal-800"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {era.yearRange}
                </button>
              ))}
            </div>

            {/* Timeline by Era */}
            {filteredEras.map((era) => (
              <div key={era.id} className="mb-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-stone-200" />
                  <h2 className="text-center text-lg font-bold text-stone-800">
                    {t(era.era, locale)}
                  </h2>
                  <Badge variant="outline" className="text-xs">
                    {era.yearRange}
                  </Badge>
                  <div className="h-px flex-1 bg-stone-200" />
                </div>
                <div className="ml-1">
                  {era.events.map((event, i) => (
                    <TimelineEvent key={i} event={event} locale={locale} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════ */}
        {/*  LEGISLATION TAB                                   */}
        {/* ══════════════════════════════════════════════════ */}
        {activeTab === "legislation" && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-stone-600">
                {locale === "es"
                  ? "Leyes primarias con enlaces directos al texto legislativo, lenguaje específico de las provisiones, e impacto en FQHCs."
                  : "Primary legislation with direct links to bill text, specific provision language, and FQHC impact analysis."}
              </p>
            </div>

            {/* Level Filter */}
            <div className="mb-6 flex flex-wrap gap-1.5">
              {[
                { value: "all", label: locale === "es" ? "Todas" : "All" },
                { value: "federal", label: "Federal" },
                { value: "state", label: locale === "es" ? "Estatal" : "State" },
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() => setLegislationLevel(level.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    legislationLevel === level.value
                      ? "bg-teal-100 text-teal-800"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>

            {/* Legislation Cards */}
            <div className="space-y-4">
              {filteredLegislation.map((law) => (
                <LegislationCard key={law.id} law={law} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════ */}
        {/*  MILESTONES TAB                                    */}
        {/* ══════════════════════════════════════════════════ */}
        {activeTab === "milestones" && (
          <div>
            <div className="mb-6">
              <p className="text-sm text-stone-600">
                {locale === "es"
                  ? "Fechas críticas de implementación para las que los FQHCs deben prepararse."
                  : "Critical implementation dates that FQHCs need to prepare for."}
              </p>
            </div>

            <div className="space-y-3">
              {implementationTimeline.map((milestone, i) => {
                const isPast = milestone.date < new Date().toISOString().split("T")[0];
                return (
                  <div
                    key={i}
                    className={`flex gap-4 rounded-xl border p-4 ${
                      isPast
                        ? "border-stone-200 bg-stone-50 opacity-60"
                        : "border-stone-200 bg-white shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className={`text-xs font-bold ${
                          isPast ? "text-stone-400" : "text-amber-600"
                        }`}
                      >
                        {new Date(milestone.date + "T00:00:00").toLocaleDateString(
                          locale === "es" ? "es-US" : "en-US",
                          { month: "short" }
                        )}
                      </span>
                      <span
                        className={`text-lg font-extrabold ${
                          isPast ? "text-stone-400" : "text-stone-800"
                        }`}
                      >
                        {new Date(milestone.date + "T00:00:00").getDate()}
                      </span>
                      <span
                        className={`text-xs ${
                          isPast ? "text-stone-400" : "text-stone-500"
                        }`}
                      >
                        {new Date(milestone.date + "T00:00:00").getFullYear()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            milestone.category === "federal"
                              ? "bg-blue-50 text-blue-700 text-[10px]"
                              : "bg-amber-50 text-amber-700 text-[10px]"
                          }
                        >
                          {milestone.category === "federal" ? "Federal" : locale === "es" ? "Estatal" : "State"}
                        </Badge>
                        {isPast && (
                          <Badge variant="outline" className="text-[10px] bg-stone-100 text-stone-500">
                            {locale === "es" ? "Pasado" : "Past"}
                          </Badge>
                        )}
                      </div>
                      <h4 className="mt-1 text-sm font-semibold text-stone-800">
                        {t(milestone.title, locale)}
                      </h4>
                      <p className="mt-0.5 text-xs text-stone-600">
                        {t(milestone.description, locale)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-stone-200 bg-stone-50 py-10">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-xl font-bold text-stone-800">
            {locale === "es"
              ? "Impacto en Tu Empleo en Salud Comunitaria"
              : "Impact on Your Community Health Career"}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-stone-600">
            {locale === "es"
              ? "Rastrea cómo estos cambios de política afectan a FQHCs y las oportunidades de empleo en salud comunitaria."
              : "Track how these policy changes affect FQHCs and community health employment opportunities."}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link href="/funding-impact">
              <Button className="bg-teal-700 text-white hover:bg-teal-800">
                {locale === "es" ? "Ver Panel de Impacto" : "View Impact Dashboard"}
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href="/unions">
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                {locale === "es" ? "Directorio de Sindicatos" : "Union Directory"}
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" className="border-stone-200 text-stone-700 hover:bg-stone-50">
                {locale === "es" ? "Ver Empleos" : "Browse Jobs"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
