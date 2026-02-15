"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface TableRow {
  factor: string;
  fqhc: string;
  privatePractice: string;
}

interface FitBox {
  variant: "teal" | "stone";
  title: string;
  items: string[];
}

interface ArticleContent {
  category: string;
  title: string;
  description: string;
  ogDescription: string;
  breadcrumbTitle: string;
  datePublished: string;
  dateDisplay: string;
  readTime: string;
  openingParagraph: string;
  sections: Array<{
    heading: string;
    content: Array<{
      type: "paragraph" | "list" | "ordered-list" | "box" | "link-paragraph";
      text?: string;
      items?: string[];
      linkText?: string;
      linkHref?: string;
      textAfterLink?: string;
    }>;
  }>;
  comparisonHeading: string;
  comparisonTableHeaders: {
    factor: string;
    fqhc: string;
    privatePractice: string;
  };
  comparisonRows: TableRow[];
  fitBoxes: FitBox[];
  fitBoxIntro: string;
  fitBoxOutro: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryButtonText: string;
  ctaSecondaryButtonText: string;
  relatedArticlesHeading: string;
  relatedArticles: Array<{
    href: string;
    categoryLabel: string;
    title: string;
  }>;
}

const enContent: ArticleContent = {
  category: "Career Guidance",
  title:
    "FQHC vs Private Practice: Which Is Right for Your Healthcare Career in California?",
  description:
    "Compare working at a Federally Qualified Health Center vs private practice or hospitals. Explore compensation, benefits, loan repayment, scope of practice, career growth, and cultural fit to find the right path for your community health career in California.",
  ogDescription:
    "A detailed comparison of FQHCs and private practice for healthcare professionals in California. Learn about NHSC loan repayment, benefits, scope of practice, and which setting fits your career goals.",
  breadcrumbTitle: "FQHC vs Private Practice",
  datePublished: "2026-02-15",
  dateDisplay: "February 15, 2026",
  readTime: "10 min read",
  openingParagraph:
    "If you\u2019re a healthcare professional in California \u2014 whether you\u2019re a medical assistant, registered nurse, community health worker, care coordinator, or provider \u2014 you\u2019ve probably asked yourself this question: should I work at an FQHC or go the private practice and hospital route? It\u2019s not a trivial decision. The two settings offer fundamentally different work environments, compensation structures, career trajectories, and day-to-day experiences. And the right answer depends on who you are, what you value, and where you want your career to go. This guide breaks down the comparison honestly so you can make an informed choice.",
  sections: [
    {
      heading: "Why This Comparison Matters Right Now",
      content: [
        {
          type: "paragraph",
          text: "California\u2019s healthcare landscape is shifting. CalAIM expansion, Enhanced Care Management (ECM), and Community Supports programs are creating thousands of new positions at FQHCs across the state. At the same time, hospitals and private practices are consolidating, automating, and in some cases cutting staff. Community health professionals have more options than ever \u2014 but making the wrong choice can mean years of frustration in a setting that doesn\u2019t match your strengths or values.",
        },
        {
          type: "paragraph",
          text: "The truth is that neither setting is universally \u201Cbetter.\u201D FQHCs are mission-driven organizations that serve underserved communities with federal support. Private practices and hospitals operate on revenue-driven models that prioritize throughput and profitability. Both need talented people. But they attract different kinds of professionals, and understanding the differences will help you find the right fit.",
        },
      ],
    },
    {
      heading: "Mission and Impact",
      content: [
        {
          type: "paragraph",
          text: "This is the most fundamental difference. FQHCs exist to serve everyone regardless of ability to pay. They receive federal Section 330 funding specifically to provide care to underserved populations \u2014 Medi-Cal recipients, uninsured individuals, immigrants, farmworkers, people experiencing homelessness, and low-income families. Every patient who walks through the door receives care on a sliding-scale fee basis, and no one is turned away.",
        },
        {
          type: "paragraph",
          text: "Private practices and hospitals, by contrast, are primarily revenue-driven. They serve patients who can pay \u2014 through private insurance, Medicare, or out-of-pocket. While many hospitals maintain charity care programs, their operational model is fundamentally different. Profitability drives staffing decisions, service offerings, and patient volume targets.",
        },
        {
          type: "paragraph",
          text: "If you entered healthcare because you want to make a direct impact on communities that need it most, FQHCs offer that in a way that private practice simply cannot. You\u2019ll work with patients who have nowhere else to go. You\u2019ll see the difference your work makes every single day. And you\u2019ll be part of an organization whose entire reason for existing is to close health disparities.",
        },
      ],
    },
    {
      heading: "Compensation: It\u2019s Closer Than You Think",
      content: [
        {
          type: "paragraph",
          text: "One of the biggest misconceptions about FQHCs is that they pay significantly less than private practice. While base salaries at FQHCs are sometimes modestly lower than large hospital systems, the total compensation picture is more nuanced \u2014 and in many cases, FQHCs come out ahead.",
        },
        {
          type: "link-paragraph",
          text: "National Health Service Corps (NHSC) Loan Repayment: This is the single biggest financial advantage of working at an FQHC. The NHSC program offers up to $50,000 in student loan repayment for a two-year service commitment at an approved FQHC site, with the option to extend for additional loan repayment. For providers, nurses, and behavioral health professionals carrying student debt, this benefit alone can be worth more than any salary difference. You can learn more in our ",
          linkText: "complete NHSC loan repayment guide",
          linkHref: "/blog/nhsc-loan-repayment-guide",
          textAfterLink: ".",
        },
        {
          type: "paragraph",
          text: "340B Drug Pricing: FQHCs participate in the federal 340B Drug Pricing Program, which generates revenue that supports staff compensation and benefits. This program allows FQHCs to purchase outpatient drugs at significantly reduced prices, and the savings are reinvested into the organization \u2014 including competitive salaries.",
        },
        {
          type: "paragraph",
          text: "Bilingual Pay Differentials: Many California FQHCs offer bilingual stipends of $2,000\u2013$5,000 per year for staff who speak Spanish, Hmong, Vietnamese, Tagalog, or other languages common in their patient populations. This benefit is far less common in private practice settings.",
        },
      ],
    },
    {
      heading: "Benefits Packages: FQHCs Often Win",
      content: [
        {
          type: "paragraph",
          text: "While small private practices may offer limited benefits, FQHCs consistently provide comprehensive benefits packages that rival or exceed what large hospital systems offer. Most California FQHCs provide:",
        },
        {
          type: "list",
          items: [
            "Retirement plans: Many FQHCs offer pension plans or generous 403(b) matching \u2014 often 3\u20136% of salary. Some FQHCs are part of CalPERS (California Public Employees\u2019 Retirement System), providing defined-benefit pensions.",
            "Paid time off: FQHCs typically offer 15\u201325 days of PTO in the first year, with increases based on tenure. Many also offer separate sick leave and personal days.",
            "Health insurance: Comprehensive medical, dental, and vision coverage, often with the FQHC covering 80\u2013100% of employee premiums.",
            "Continuing education: CME/CEU stipends of $500\u2013$2,000 per year, plus paid time off for conferences and training.",
            "Tuition reimbursement: Many FQHCs offer partial or full tuition reimbursement for staff pursuing advanced degrees or certifications.",
          ],
        },
        {
          type: "paragraph",
          text: "When you add NHSC loan repayment on top of these benefits, the total compensation at an FQHC can actually exceed what you\u2019d earn in private practice \u2014 especially for early- and mid-career professionals carrying student debt.",
        },
      ],
    },
    {
      heading: "Scope of Practice: Room to Grow at FQHCs",
      content: [
        {
          type: "paragraph",
          text: "One of the most underappreciated advantages of working at an FQHC is the scope of practice you\u2019ll enjoy. FQHCs encourage \u201Ctop of scope\u201D work \u2014 meaning every team member operates at the upper edge of their credential and training. Medical assistants conduct expanded rooming with medication reconciliation and care gap identification. RNs conduct annual wellness visits and manage patient panels. Community health workers lead outreach programs and social determinants of health interventions.",
        },
        {
          type: "link-paragraph",
          text: "In private practice and hospital settings, roles are often more rigidly defined. MAs may be limited to taking vital signs. RNs may primarily execute physician orders. The hierarchy is more traditional and less flexible. If you want to grow your clinical skills and take on meaningful responsibility, FQHCs give you that opportunity. Read more about this in our guide to ",
          linkText: "working at top of scope at FQHCs",
          linkHref: "/blog/working-at-top-of-scope-fqhc",
          textAfterLink: ".",
        },
      ],
    },
    {
      heading: "Career Growth and Advancement",
      content: [
        {
          type: "link-paragraph",
          text: "FQHCs offer some of the clearest career ladders in healthcare. Medical assistants can advance to lead MA, clinical operations coordinator, and clinic manager. RNs can move into care management, ECM lead, and director of nursing roles. Providers can progress from staff clinician to medical director and chief medical officer. The key advantage is that FQHCs actively promote from within and invest in staff development. You can explore the full advancement pathways in our ",
          linkText: "FQHC career ladder guide",
          linkHref: "/blog/fqhc-career-ladder-ma-rn-provider",
          textAfterLink: ".",
        },
        {
          type: "link-paragraph",
          text: "California\u2019s ECM and CCM programs are creating entirely new career tracks that didn\u2019t exist five years ago. Care coordinators, ECM RNs, community supports specialists, and program managers are in high demand. These are roles that offer meaningful work, competitive pay, and clear advancement \u2014 and they\u2019re almost exclusively available at FQHCs. Learn how ECM is shaping new career opportunities in our ",
          linkText: "ECM career guide",
          linkHref: "/blog/what-is-enhanced-care-management-ecm",
          textAfterLink: ".",
        },
        {
          type: "paragraph",
          text: "In private practice, advancement often hits a ceiling. Small practices have few supervisory positions. Hospital systems have advancement paths, but they\u2019re competitive, and the hierarchy is well-established. FQHCs, because they\u2019re growing and launching new programs, create new roles regularly \u2014 giving ambitious staff more opportunities to move up.",
        },
      ],
    },
    {
      heading: "Work-Life Balance: An Honest Assessment",
      content: [
        {
          type: "paragraph",
          text: "This is where the FQHC story gets more nuanced, and it\u2019s important to be honest about the challenges. FQHCs serve high-need populations with complex medical, behavioral, and social issues. Patient volumes can be demanding. Resources are sometimes constrained. You may feel the weight of caring for patients who face housing instability, food insecurity, substance use, and chronic disease \u2014 all at once.",
        },
        {
          type: "paragraph",
          text: "Burnout is real in community health. The work is emotionally demanding, and you won\u2019t always have the resources you wish you had. But there are important counterbalances: FQHCs typically do not require the overnight shifts, weekend rotations, and on-call demands that hospitals do. Most FQHCs operate on regular business hours (Monday through Friday, 8 AM to 5 PM), with some offering extended evening or Saturday hours. Compared to hospital shift work, the schedule predictability at an FQHC can be a significant quality-of-life advantage.",
        },
        {
          type: "paragraph",
          text: "And many FQHC professionals report that the mission-driven nature of the work provides a sense of fulfillment that offsets the challenges. When you know that your work directly improves access to care for people who have no other options, that purpose sustains you through difficult days.",
        },
      ],
    },
    {
      heading: "Patient Populations: Diversity and Community Connection",
      content: [
        {
          type: "paragraph",
          text: "If you want to work with diverse patient populations, FQHCs are unmatched. California\u2019s FQHCs serve communities that reflect the full spectrum of the state\u2019s diversity: Medi-Cal recipients, uninsured individuals, recent immigrants, farmworker families, individuals experiencing homelessness, and LGBTQ+ communities. You\u2019ll encounter health conditions driven by social determinants \u2014 poverty, immigration stress, occupational hazards, food deserts \u2014 that you simply won\u2019t see in a typical private practice.",
        },
        {
          type: "paragraph",
          text: "Bilingual skills are highly valued. If you speak Spanish, Mandarin, Vietnamese, Tagalog, Hmong, or another language spoken by your community, you\u2019ll be in high demand at FQHCs. Bilingual staff don\u2019t just translate \u2014 they bridge cultural gaps, build trust, and improve health outcomes. Many FQHCs pay bilingual stipends and prioritize bilingual candidates for leadership roles.",
        },
        {
          type: "paragraph",
          text: "In private practice and hospital settings, patient populations tend to be more homogeneous and are typically insured. The clinical complexity is different \u2014 you may see more elective procedures and specialist referrals, but fewer of the social determinants challenges that define community health.",
        },
      ],
    },
    {
      heading: "Job Security: FQHCs Offer Stability",
      content: [
        {
          type: "paragraph",
          text: "FQHCs benefit from multiple, diversified funding streams that provide genuine job security. Federal Section 330 grants, Medi-Cal managed care contracts, 340B program revenue, and state and local grants combine to create a stable financial foundation. Even during economic downturns, demand for FQHC services increases because more people lose insurance and need safety-net care.",
        },
        {
          type: "paragraph",
          text: "California\u2019s CalAIM transformation is driving significant new investment into FQHCs through ECM, Community Supports, and population health management programs. This expansion is creating new positions, not eliminating them. While individual FQHCs can face financial challenges \u2014 especially when Medi-Cal rates are cut or federal funding is delayed \u2014 the sector as a whole is growing.",
        },
        {
          type: "paragraph",
          text: "Private practice and hospital employment is more subject to market forces. Hospital systems have undertaken significant layoffs in recent years due to declining reimbursements, rising labor costs, and post-pandemic financial pressure. Small private practices are consolidating or closing as the economics of independent medicine become more challenging. For healthcare workers prioritizing stability, FQHCs offer a strong foundation.",
        },
      ],
    },
    {
      heading: "Making Your Decision",
      content: [
        {
          type: "paragraph",
          text: "If you\u2019re weighing your options, here are three steps to help you decide:",
        },
        {
          type: "ordered-list",
          items: [
            "Calculate your total compensation. Don\u2019t compare base salaries alone. Factor in NHSC loan repayment, benefits, retirement contributions, bilingual stipends, and continuing education support. An FQHC position paying $5,000 less in base salary but offering $25,000 per year in loan repayment is the clear financial winner.",
            "Assess your career goals. Where do you want to be in five years? If you want to advance into leadership, program management, or care coordination, FQHCs offer clearer pathways. If you want to specialize in a clinical niche or pursue private ownership, a different setting may be better aligned.",
            "Visit both settings. Shadow a professional at an FQHC and at a private practice or hospital. See the patient populations, observe the team dynamics, and feel the culture. You\u2019ll know quickly which environment resonates with you.",
          ],
        },
        {
          type: "paragraph",
          text: "For many healthcare professionals in California \u2014 especially bilingual community health workers, medical assistants, nurses, and care coordinators \u2014 FQHCs offer the most compelling combination of meaningful work, competitive total compensation, career growth, and job security. The work is demanding, but the impact is real. And the healthcare system needs people who choose this path.",
        },
      ],
    },
  ],
  comparisonHeading: "Side-by-Side Comparison",
  comparisonTableHeaders: {
    factor: "Factor",
    fqhc: "FQHC",
    privatePractice: "Private Practice / Hospital",
  },
  comparisonRows: [
    {
      factor: "Mission",
      fqhc: "Serve underserved communities regardless of ability to pay",
      privatePractice: "Revenue-driven; serve insured and paying patients",
    },
    {
      factor: "Base Salary",
      fqhc: "Competitive; sometimes 5\u201315% lower for specialists",
      privatePractice:
        "Often higher base for specialists and hospital roles",
    },
    {
      factor: "Loan Repayment",
      fqhc: "NHSC: up to $50K for 2-year commitment",
      privatePractice:
        "Rarely available; some hospital sign-on bonuses",
    },
    {
      factor: "Benefits",
      fqhc: "Strong: pension/retirement, generous PTO, health insurance, CME stipends",
      privatePractice:
        "Variable; large hospitals strong, small practices often minimal",
    },
    {
      factor: "Scope of Practice",
      fqhc: "Encourages top-of-scope work; more clinical autonomy",
      privatePractice: "Often more restricted; rigid role boundaries",
    },
    {
      factor: "Career Growth",
      fqhc: "Clear ladders; promote from within; new programs create roles",
      privatePractice:
        "Advancement possible but competitive; fewer pathways in small practices",
    },
    {
      factor: "Patient Volume",
      fqhc: "High; can be demanding with complex populations",
      privatePractice:
        "Variable; hospitals high-volume, private practice more controlled",
    },
    {
      factor: "Job Security",
      fqhc: "Strong: federal funding, growing demand, CalAIM expansion",
      privatePractice:
        "Market-dependent; consolidation and layoffs more common",
    },
    {
      factor: "Bilingual Value",
      fqhc: "Highly valued; bilingual stipends common",
      privatePractice:
        "Valued but less likely to offer pay differential",
    },
    {
      factor: "Work Culture",
      fqhc: "Mission-driven; community-focused; team-based",
      privatePractice:
        "Productivity-focused; individual performance metrics",
    },
  ],
  fitBoxIntro:
    "Not everyone is the right fit for an FQHC \u2014 and that\u2019s okay. Understanding what makes someone thrive in community health will help you make the right decision.",
  fitBoxes: [
    {
      variant: "teal",
      title: "You\u2019ll likely thrive at an FQHC if you:",
      items: [
        "Are motivated by mission and community impact more than maximizing income",
        "Enjoy working with diverse, complex patient populations",
        "Want to work at the top of your scope with meaningful clinical autonomy",
        "Are comfortable with resource constraints and creative problem-solving",
        "Value team-based care and collaboration over individual achievement",
        "Want clear career advancement pathways and mentorship",
        "Speak a second language or come from the community you serve",
        "Prefer a regular weekday schedule over shift work",
      ],
    },
    {
      variant: "stone",
      title: "Private practice or hospital may be a better fit if you:",
      items: [
        "Prioritize maximizing base salary above other factors",
        "Prefer working with a narrower clinical specialty",
        "Want access to the latest medical technology and equipment",
        "Prefer clearly defined role boundaries and structured workflows",
        "Are interested in surgical, procedural, or acute care specialties",
        "Want to build or own your own practice long-term",
      ],
    },
  ],
  fitBoxOutro:
    "The best healthcare professionals are self-aware about what drives them. There is no shame in choosing private practice because you want higher specialty pay or access to advanced technology. And there is no shame in choosing an FQHC because you want to serve communities that need you most. The important thing is choosing intentionally rather than defaulting into a setting that doesn\u2019t match your values.",
  ctaTitle: "Ready to Start Your FQHC Career?",
  ctaDescription:
    "Build a free resume tailored to FQHC hiring managers, or take our Career Insights Assessment to find the community health role that fits your skills and experience.",
  ctaPrimaryButtonText: "Build Your Free Resume",
  ctaSecondaryButtonText: "Take the Career Assessment",
  relatedArticlesHeading: "Related Articles",
  relatedArticles: [
    {
      href: "/blog/nhsc-loan-repayment-guide",
      categoryLabel: "Benefits & Compensation",
      title: "NHSC Loan Repayment for FQHC Workers: Complete Guide",
    },
    {
      href: "/blog/fqhc-career-ladder-ma-rn-provider",
      categoryLabel: "Career Growth",
      title:
        "The FQHC MA, RN & Provider Career Ladder: How to Advance in Community Health",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Gu\u00eda de Carrera",
  title:
    "FQHC vs Pr\u00e1ctica Privada: \u00bfCu\u00e1l Es la Mejor Opci\u00f3n para Tu Carrera de Salud en California?",
  description:
    "Compara trabajar en un Centro de Salud Calificado Federalmente (FQHC) vs pr\u00e1ctica privada u hospitales. Explora compensaci\u00f3n, beneficios, pago de pr\u00e9stamos estudiantiles, alcance de pr\u00e1ctica, crecimiento profesional y afinidad cultural para encontrar el camino correcto para tu carrera en salud comunitaria en California.",
  ogDescription:
    "Una comparaci\u00f3n detallada de FQHCs y pr\u00e1ctica privada para profesionales de salud en California. Aprende sobre el programa de pago de pr\u00e9stamos NHSC, beneficios, alcance de pr\u00e1ctica y qu\u00e9 entorno se ajusta a tus metas profesionales.",
  breadcrumbTitle: "FQHC vs Pr\u00e1ctica Privada",
  datePublished: "2026-02-15",
  dateDisplay: "15 de Febrero de 2026",
  readTime: "10 min",
  openingParagraph:
    "Si eres un profesional de salud en California \u2014 ya seas asistente m\u00e9dico, enfermero/a registrado/a, trabajador/a de salud comunitaria, coordinador/a de atenci\u00f3n o proveedor \u2014 probablemente te has hecho esta pregunta: \u00bfdeber\u00eda trabajar en un FQHC o seguir la ruta de pr\u00e1ctica privada y hospitales? No es una decisi\u00f3n trivial. Los dos entornos ofrecen ambientes de trabajo, estructuras de compensaci\u00f3n, trayectorias profesionales y experiencias diarias fundamentalmente diferentes. Y la respuesta correcta depende de qui\u00e9n eres, qu\u00e9 valoras y hacia d\u00f3nde quieres llevar tu carrera. Esta gu\u00eda desglosa la comparaci\u00f3n honestamente para que puedas tomar una decisi\u00f3n informada.",
  sections: [
    {
      heading: "Por Qu\u00e9 Esta Comparaci\u00f3n Importa Ahora",
      content: [
        {
          type: "paragraph",
          text: "El panorama de salud de California est\u00e1 cambiando. La expansi\u00f3n de CalAIM, la Gesti\u00f3n de Atenci\u00f3n Mejorada (ECM) y los programas de Apoyos Comunitarios est\u00e1n creando miles de nuevas posiciones en FQHCs en todo el estado. Al mismo tiempo, los hospitales y las pr\u00e1cticas privadas se est\u00e1n consolidando, automatizando y, en algunos casos, reduciendo personal. Los profesionales de salud comunitaria tienen m\u00e1s opciones que nunca \u2014 pero tomar la decisi\u00f3n equivocada puede significar a\u00f1os de frustraci\u00f3n en un entorno que no coincide con tus fortalezas o valores.",
        },
        {
          type: "paragraph",
          text: "La verdad es que ning\u00fan entorno es universalmente \u201Cmejor.\u201D Los FQHCs son organizaciones impulsadas por la misi\u00f3n que sirven a comunidades desatendidas con apoyo federal. Las pr\u00e1cticas privadas y los hospitales operan con modelos impulsados por ingresos que priorizan el rendimiento y la rentabilidad. Ambos necesitan personas talentosas. Pero atraen a diferentes tipos de profesionales, y comprender las diferencias te ayudar\u00e1 a encontrar el ajuste correcto.",
        },
      ],
    },
    {
      heading: "Misi\u00f3n e Impacto",
      content: [
        {
          type: "paragraph",
          text: "Esta es la diferencia m\u00e1s fundamental. Los FQHCs existen para servir a todos independientemente de su capacidad de pago. Reciben financiamiento federal de la Secci\u00f3n 330 espec\u00edficamente para proporcionar atenci\u00f3n a poblaciones desatendidas \u2014 beneficiarios de Medi-Cal, personas sin seguro, inmigrantes, trabajadores agr\u00edcolas, personas en situaci\u00f3n de calle y familias de bajos ingresos. Cada paciente que entra por la puerta recibe atenci\u00f3n con tarifas en escala m\u00f3vil, y nadie es rechazado.",
        },
        {
          type: "paragraph",
          text: "Las pr\u00e1cticas privadas y los hospitales, por el contrario, est\u00e1n impulsados principalmente por los ingresos. Atienden a pacientes que pueden pagar \u2014 a trav\u00e9s de seguros privados, Medicare o pago directo. Aunque muchos hospitales mantienen programas de atenci\u00f3n caritativa, su modelo operativo es fundamentalmente diferente. La rentabilidad impulsa las decisiones de personal, las ofertas de servicios y los objetivos de volumen de pacientes.",
        },
        {
          type: "paragraph",
          text: "Si entraste a la salud porque quieres generar un impacto directo en las comunidades que m\u00e1s lo necesitan, los FQHCs ofrecen eso de una manera que la pr\u00e1ctica privada simplemente no puede. Trabajar\u00e1s con pacientes que no tienen otro lugar a d\u00f3nde ir. Ver\u00e1s la diferencia que tu trabajo hace cada d\u00eda. Y ser\u00e1s parte de una organizaci\u00f3n cuya raz\u00f3n de existir es cerrar las disparidades de salud.",
        },
      ],
    },
    {
      heading: "Compensaci\u00f3n: Est\u00e1 M\u00e1s Cerca de lo que Piensas",
      content: [
        {
          type: "paragraph",
          text: "Uno de los mayores conceptos err\u00f3neos sobre los FQHCs es que pagan significativamente menos que la pr\u00e1ctica privada. Mientras que los salarios base en los FQHCs a veces son modestamente m\u00e1s bajos que los grandes sistemas hospitalarios, el panorama total de compensaci\u00f3n es m\u00e1s matizado \u2014 y en muchos casos, los FQHCs salen adelante.",
        },
        {
          type: "link-paragraph",
          text: "Pago de Pr\u00e9stamos del Cuerpo Nacional de Servicio de Salud (NHSC): Esta es la mayor ventaja financiera de trabajar en un FQHC. El programa NHSC ofrece hasta $50,000 en pago de pr\u00e9stamos estudiantiles por un compromiso de servicio de dos a\u00f1os en un sitio FQHC aprobado, con la opci\u00f3n de extender para pago adicional de pr\u00e9stamos. Para proveedores, enfermeros y profesionales de salud conductual con deuda estudiantil, este beneficio por s\u00ed solo puede valer m\u00e1s que cualquier diferencia salarial. Puedes aprender m\u00e1s en nuestra ",
          linkText: "gu\u00eda completa de pago de pr\u00e9stamos NHSC",
          linkHref: "/blog/nhsc-loan-repayment-guide",
          textAfterLink: ".",
        },
        {
          type: "paragraph",
          text: "Precios de Medicamentos 340B: Los FQHCs participan en el Programa Federal de Precios de Medicamentos 340B, que genera ingresos que apoyan la compensaci\u00f3n y los beneficios del personal. Este programa permite a los FQHCs comprar medicamentos ambulatorios a precios significativamente reducidos, y los ahorros se reinvierten en la organizaci\u00f3n \u2014 incluyendo salarios competitivos.",
        },
        {
          type: "paragraph",
          text: "Diferenciales de Pago Biling\u00fce: Muchos FQHCs de California ofrecen estipendios biling\u00fces de $2,000 a $5,000 por a\u00f1o para personal que habla espa\u00f1ol, hmong, vietnamita, tagalo u otros idiomas comunes en sus poblaciones de pacientes. Este beneficio es mucho menos com\u00fan en entornos de pr\u00e1ctica privada.",
        },
      ],
    },
    {
      heading: "Paquetes de Beneficios: Los FQHCs Frecuentemente Ganan",
      content: [
        {
          type: "paragraph",
          text: "Mientras que las pr\u00e1cticas privadas peque\u00f1as pueden ofrecer beneficios limitados, los FQHCs proporcionan consistentemente paquetes de beneficios integrales que rivalizan o superan lo que ofrecen los grandes sistemas hospitalarios. La mayor\u00eda de los FQHCs de California proporcionan:",
        },
        {
          type: "list",
          items: [
            "Planes de jubilaci\u00f3n: Muchos FQHCs ofrecen planes de pensi\u00f3n o generosos aportes equivalentes 403(b) \u2014 a menudo del 3 al 6% del salario. Algunos FQHCs son parte de CalPERS (Sistema de Jubilaci\u00f3n de Empleados P\u00fablicos de California), proporcionando pensiones de beneficio definido.",
            "Tiempo libre pagado: Los FQHCs t\u00edpicamente ofrecen de 15 a 25 d\u00edas de PTO en el primer a\u00f1o, con aumentos basados en la antig\u00fcedad. Muchos tambi\u00e9n ofrecen licencia por enfermedad y d\u00edas personales separados.",
            "Seguro de salud: Cobertura m\u00e9dica, dental y de visi\u00f3n integral, a menudo con el FQHC cubriendo del 80 al 100% de las primas del empleado.",
            "Educaci\u00f3n continua: Estipendios de CME/CEU de $500 a $2,000 por a\u00f1o, m\u00e1s tiempo libre pagado para conferencias y capacitaciones.",
            "Reembolso de matr\u00edcula: Muchos FQHCs ofrecen reembolso parcial o total de matr\u00edcula para personal que busca t\u00edtulos avanzados o certificaciones.",
          ],
        },
        {
          type: "paragraph",
          text: "Cuando a\u00f1ades el pago de pr\u00e9stamos NHSC sobre estos beneficios, la compensaci\u00f3n total en un FQHC puede realmente superar lo que ganar\u00edas en pr\u00e1ctica privada \u2014 especialmente para profesionales en etapa temprana y media de su carrera con deuda estudiantil.",
        },
      ],
    },
    {
      heading: "Alcance de Pr\u00e1ctica: Espacio para Crecer en los FQHCs",
      content: [
        {
          type: "paragraph",
          text: "Una de las ventajas m\u00e1s subestimadas de trabajar en un FQHC es el alcance de pr\u00e1ctica que disfrutar\u00e1s. Los FQHCs fomentan el trabajo \u201Cal m\u00e1ximo del alcance\u201D \u2014 lo que significa que cada miembro del equipo opera en el l\u00edmite superior de su credencial y capacitaci\u00f3n. Los asistentes m\u00e9dicos realizan admisiones ampliadas con reconciliaci\u00f3n de medicamentos e identificaci\u00f3n de brechas en la atenci\u00f3n. Los enfermeros registrados realizan visitas anuales de bienestar y gestionan paneles de pacientes. Los trabajadores de salud comunitaria lideran programas de alcance e intervenciones sobre determinantes sociales de la salud.",
        },
        {
          type: "link-paragraph",
          text: "En entornos de pr\u00e1ctica privada y hospitales, los roles a menudo est\u00e1n m\u00e1s r\u00edgidamente definidos. Los asistentes m\u00e9dicos pueden estar limitados a tomar signos vitales. Los enfermeros pueden ejecutar principalmente \u00f3rdenes m\u00e9dicas. La jerarqu\u00eda es m\u00e1s tradicional y menos flexible. Si quieres desarrollar tus habilidades cl\u00ednicas y asumir responsabilidades significativas, los FQHCs te dan esa oportunidad. Lee m\u00e1s sobre esto en nuestra gu\u00eda sobre ",
          linkText: "trabajar al m\u00e1ximo del alcance en FQHCs",
          linkHref: "/blog/working-at-top-of-scope-fqhc",
          textAfterLink: ".",
        },
      ],
    },
    {
      heading: "Crecimiento Profesional y Avance",
      content: [
        {
          type: "link-paragraph",
          text: "Los FQHCs ofrecen algunas de las escalas profesionales m\u00e1s claras en salud. Los asistentes m\u00e9dicos pueden avanzar a asistente m\u00e9dico l\u00edder, coordinador de operaciones cl\u00ednicas y gerente de cl\u00ednica. Los enfermeros pueden pasar a gesti\u00f3n de atenci\u00f3n, l\u00edder de ECM y director de enfermer\u00eda. Los proveedores pueden progresar de cl\u00ednico de personal a director m\u00e9dico y director m\u00e9dico principal. La ventaja clave es que los FQHCs promueven activamente desde adentro e invierten en el desarrollo del personal. Puedes explorar las trayectorias completas de avance en nuestra ",
          linkText: "gu\u00eda de escalera profesional de FQHC",
          linkHref: "/blog/fqhc-career-ladder-ma-rn-provider",
          textAfterLink: ".",
        },
        {
          type: "link-paragraph",
          text: "Los programas ECM y CCM de California est\u00e1n creando trayectorias profesionales completamente nuevas que no exist\u00edan hace cinco a\u00f1os. Coordinadores de atenci\u00f3n, enfermeros de ECM, especialistas en apoyos comunitarios y gerentes de programas tienen alta demanda. Estos son roles que ofrecen trabajo significativo, pago competitivo y avance claro \u2014 y est\u00e1n disponibles casi exclusivamente en FQHCs. Aprende c\u00f3mo ECM est\u00e1 dando forma a nuevas oportunidades profesionales en nuestra ",
          linkText: "gu\u00eda de carrera de ECM",
          linkHref: "/blog/what-is-enhanced-care-management-ecm",
          textAfterLink: ".",
        },
        {
          type: "paragraph",
          text: "En la pr\u00e1ctica privada, el avance a menudo llega a un techo. Las pr\u00e1cticas peque\u00f1as tienen pocos puestos de supervisi\u00f3n. Los sistemas hospitalarios tienen trayectorias de avance, pero son competitivas y la jerarqu\u00eda est\u00e1 bien establecida. Los FQHCs, porque est\u00e1n creciendo y lanzando nuevos programas, crean nuevos roles regularmente \u2014 dando al personal ambicioso m\u00e1s oportunidades para ascender.",
        },
      ],
    },
    {
      heading: "Equilibrio Trabajo-Vida: Una Evaluaci\u00f3n Honesta",
      content: [
        {
          type: "paragraph",
          text: "Aqu\u00ed es donde la historia del FQHC se vuelve m\u00e1s matizada, y es importante ser honesto sobre los desaf\u00edos. Los FQHCs atienden a poblaciones de alta necesidad con problemas m\u00e9dicos, conductuales y sociales complejos. Los vol\u00famenes de pacientes pueden ser exigentes. Los recursos a veces est\u00e1n limitados. Puedes sentir el peso de cuidar a pacientes que enfrentan inestabilidad de vivienda, inseguridad alimentaria, uso de sustancias y enfermedades cr\u00f3nicas \u2014 todo a la vez.",
        },
        {
          type: "paragraph",
          text: "El agotamiento es real en la salud comunitaria. El trabajo es emocionalmente exigente, y no siempre tendr\u00e1s los recursos que desear\u00edas. Pero hay contrapesos importantes: los FQHCs t\u00edpicamente no requieren turnos nocturnos, rotaciones de fin de semana ni demandas de guardia como los hospitales. La mayor\u00eda de los FQHCs operan en horario laboral regular (lunes a viernes, 8 AM a 5 PM), con algunos ofreciendo horarios extendidos por la tarde o los s\u00e1bados. Comparado con el trabajo por turnos hospitalario, la predictibilidad del horario en un FQHC puede ser una ventaja significativa para la calidad de vida.",
        },
        {
          type: "paragraph",
          text: "Y muchos profesionales de FQHC reportan que la naturaleza del trabajo impulsada por la misi\u00f3n proporciona un sentido de realizaci\u00f3n que compensa los desaf\u00edos. Cuando sabes que tu trabajo mejora directamente el acceso a la atenci\u00f3n para personas que no tienen otras opciones, ese prop\u00f3sito te sostiene a trav\u00e9s de los d\u00edas dif\u00edciles.",
        },
      ],
    },
    {
      heading: "Poblaciones de Pacientes: Diversidad y Conexi\u00f3n Comunitaria",
      content: [
        {
          type: "paragraph",
          text: "Si quieres trabajar con poblaciones diversas de pacientes, los FQHCs son incomparables. Los FQHCs de California sirven a comunidades que reflejan el espectro completo de la diversidad del estado: beneficiarios de Medi-Cal, personas sin seguro, inmigrantes recientes, familias de trabajadores agr\u00edcolas, personas en situaci\u00f3n de calle y comunidades LGBTQ+. Encontrar\u00e1s condiciones de salud impulsadas por determinantes sociales \u2014 pobreza, estr\u00e9s migratorio, riesgos ocupacionales, desiertos alimentarios \u2014 que simplemente no ver\u00e1s en una pr\u00e1ctica privada t\u00edpica.",
        },
        {
          type: "paragraph",
          text: "Las habilidades biling\u00fces son altamente valoradas. Si hablas espa\u00f1ol, mandar\u00edn, vietnamita, tagalo, hmong u otro idioma hablado por tu comunidad, tendr\u00e1s alta demanda en los FQHCs. El personal biling\u00fce no solo traduce \u2014 tiende puentes culturales, construye confianza y mejora los resultados de salud. Muchos FQHCs pagan estipendios biling\u00fces y priorizan a los candidatos biling\u00fces para roles de liderazgo.",
        },
        {
          type: "paragraph",
          text: "En entornos de pr\u00e1ctica privada y hospitales, las poblaciones de pacientes tienden a ser m\u00e1s homog\u00e9neas y t\u00edpicamente est\u00e1n aseguradas. La complejidad cl\u00ednica es diferente \u2014 puedes ver m\u00e1s procedimientos electivos y derivaciones a especialistas, pero menos de los desaf\u00edos de determinantes sociales que definen la salud comunitaria.",
        },
      ],
    },
    {
      heading: "Seguridad Laboral: Los FQHCs Ofrecen Estabilidad",
      content: [
        {
          type: "paragraph",
          text: "Los FQHCs se benefician de m\u00faltiples fuentes de financiamiento diversificadas que proporcionan genuina seguridad laboral. Las subvenciones federales de la Secci\u00f3n 330, los contratos de atenci\u00f3n administrada de Medi-Cal, los ingresos del programa 340B y las subvenciones estatales y locales se combinan para crear una base financiera estable. Incluso durante recesiones econ\u00f3micas, la demanda de servicios de FQHC aumenta porque m\u00e1s personas pierden su seguro y necesitan atenci\u00f3n de red de seguridad.",
        },
        {
          type: "paragraph",
          text: "La transformaci\u00f3n CalAIM de California est\u00e1 impulsando una inversi\u00f3n nueva significativa en FQHCs a trav\u00e9s de ECM, Apoyos Comunitarios y programas de gesti\u00f3n de salud poblacional. Esta expansi\u00f3n est\u00e1 creando nuevas posiciones, no elimin\u00e1ndolas. Aunque los FQHCs individuales pueden enfrentar desaf\u00edos financieros \u2014 especialmente cuando se recortan las tarifas de Medi-Cal o se retrasa el financiamiento federal \u2014 el sector en su conjunto est\u00e1 creciendo.",
        },
        {
          type: "paragraph",
          text: "El empleo en pr\u00e1ctica privada y hospitales est\u00e1 m\u00e1s sujeto a las fuerzas del mercado. Los sistemas hospitalarios han realizado despidos significativos en a\u00f1os recientes debido a la disminuci\u00f3n de reembolsos, el aumento de costos laborales y la presi\u00f3n financiera pospand\u00e9mica. Las pr\u00e1cticas privadas peque\u00f1as se est\u00e1n consolidando o cerrando a medida que la econom\u00eda de la medicina independiente se vuelve m\u00e1s desafiante. Para los trabajadores de salud que priorizan la estabilidad, los FQHCs ofrecen una base s\u00f3lida.",
        },
      ],
    },
    {
      heading: "Tomando Tu Decisi\u00f3n",
      content: [
        {
          type: "paragraph",
          text: "Si est\u00e1s evaluando tus opciones, aqu\u00ed hay tres pasos para ayudarte a decidir:",
        },
        {
          type: "ordered-list",
          items: [
            "Calcula tu compensaci\u00f3n total. No compares solo salarios base. Incluye el pago de pr\u00e9stamos NHSC, beneficios, contribuciones de jubilaci\u00f3n, estipendios biling\u00fces y apoyo de educaci\u00f3n continua. Una posici\u00f3n en FQHC que paga $5,000 menos en salario base pero ofrece $25,000 por a\u00f1o en pago de pr\u00e9stamos es el claro ganador financiero.",
            "Eval\u00faa tus metas profesionales. \u00bfD\u00f3nde quieres estar en cinco a\u00f1os? Si quieres avanzar hacia liderazgo, gesti\u00f3n de programas o coordinaci\u00f3n de atenci\u00f3n, los FQHCs ofrecen trayectorias m\u00e1s claras. Si quieres especializarte en un nicho cl\u00ednico o buscar propiedad privada, un entorno diferente puede estar mejor alineado.",
            "Visita ambos entornos. Sigue a un profesional en un FQHC y en una pr\u00e1ctica privada u hospital. Observa las poblaciones de pacientes, las din\u00e1micas del equipo y siente la cultura. Sabr\u00e1s r\u00e1pidamente qu\u00e9 ambiente resuena contigo.",
          ],
        },
        {
          type: "paragraph",
          text: "Para muchos profesionales de salud en California \u2014 especialmente trabajadores de salud comunitaria biling\u00fces, asistentes m\u00e9dicos, enfermeros y coordinadores de atenci\u00f3n \u2014 los FQHCs ofrecen la combinaci\u00f3n m\u00e1s convincente de trabajo significativo, compensaci\u00f3n total competitiva, crecimiento profesional y seguridad laboral. El trabajo es exigente, pero el impacto es real. Y el sistema de salud necesita personas que elijan este camino.",
        },
      ],
    },
  ],
  comparisonHeading: "Comparaci\u00f3n Lado a Lado",
  comparisonTableHeaders: {
    factor: "Factor",
    fqhc: "FQHC",
    privatePractice: "Pr\u00e1ctica Privada / Hospital",
  },
  comparisonRows: [
    {
      factor: "Misi\u00f3n",
      fqhc: "Servir a comunidades desatendidas sin importar la capacidad de pago",
      privatePractice:
        "Impulsado por ingresos; atiende a pacientes asegurados y que pagan",
    },
    {
      factor: "Salario Base",
      fqhc: "Competitivo; a veces 5\u201315% menor para especialistas",
      privatePractice:
        "A menudo mayor para especialistas y roles hospitalarios",
    },
    {
      factor: "Pago de Pr\u00e9stamos",
      fqhc: "NHSC: hasta $50K por compromiso de 2 a\u00f1os",
      privatePractice:
        "Raramente disponible; algunos bonos de incorporaci\u00f3n hospitalaria",
    },
    {
      factor: "Beneficios",
      fqhc: "Fuertes: pensi\u00f3n/jubilaci\u00f3n, PTO generoso, seguro de salud, estipendios CME",
      privatePractice:
        "Variable; hospitales grandes fuertes, pr\u00e1cticas peque\u00f1as a menudo m\u00ednimos",
    },
    {
      factor: "Alcance de Pr\u00e1ctica",
      fqhc: "Fomenta el trabajo al m\u00e1ximo del alcance; m\u00e1s autonom\u00eda cl\u00ednica",
      privatePractice:
        "A menudo m\u00e1s restringido; l\u00edmites de rol r\u00edgidos",
    },
    {
      factor: "Crecimiento Profesional",
      fqhc: "Escalas claras; promoci\u00f3n interna; nuevos programas crean roles",
      privatePractice:
        "Avance posible pero competitivo; menos trayectorias en pr\u00e1cticas peque\u00f1as",
    },
    {
      factor: "Volumen de Pacientes",
      fqhc: "Alto; puede ser exigente con poblaciones complejas",
      privatePractice:
        "Variable; hospitales alto volumen, pr\u00e1ctica privada m\u00e1s controlado",
    },
    {
      factor: "Seguridad Laboral",
      fqhc: "Fuerte: financiamiento federal, demanda creciente, expansi\u00f3n de CalAIM",
      privatePractice:
        "Dependiente del mercado; consolidaci\u00f3n y despidos m\u00e1s comunes",
    },
    {
      factor: "Valor Biling\u00fce",
      fqhc: "Altamente valorado; estipendios biling\u00fces comunes",
      privatePractice:
        "Valorado pero menos probable que ofrezca diferencial de pago",
    },
    {
      factor: "Cultura Laboral",
      fqhc: "Impulsada por la misi\u00f3n; enfocada en la comunidad; basada en equipo",
      privatePractice:
        "Enfocada en productividad; m\u00e9tricas de rendimiento individual",
    },
  ],
  fitBoxIntro:
    "No todos son el ajuste correcto para un FQHC \u2014 y eso est\u00e1 bien. Comprender qu\u00e9 hace que alguien prospere en la salud comunitaria te ayudar\u00e1 a tomar la decisi\u00f3n correcta.",
  fitBoxes: [
    {
      variant: "teal",
      title: "Probablemente prosperar\u00e1s en un FQHC si:",
      items: [
        "Est\u00e1s motivado/a por la misi\u00f3n y el impacto comunitario m\u00e1s que por maximizar ingresos",
        "Disfrutas trabajar con poblaciones de pacientes diversas y complejas",
        "Quieres trabajar al m\u00e1ximo de tu alcance con autonom\u00eda cl\u00ednica significativa",
        "Te sientes c\u00f3modo/a con limitaciones de recursos y resoluci\u00f3n creativa de problemas",
        "Valoras la atenci\u00f3n en equipo y la colaboraci\u00f3n sobre el logro individual",
        "Quieres trayectorias claras de avance profesional y mentor\u00eda",
        "Hablas un segundo idioma o vienes de la comunidad a la que sirves",
        "Prefieres un horario regular entre semana sobre trabajo por turnos",
      ],
    },
    {
      variant: "stone",
      title:
        "La pr\u00e1ctica privada u hospital puede ser un mejor ajuste si:",
      items: [
        "Priorizas maximizar el salario base sobre otros factores",
        "Prefieres trabajar con una especialidad cl\u00ednica m\u00e1s reducida",
        "Quieres acceso a la tecnolog\u00eda y equipo m\u00e9dico m\u00e1s reciente",
        "Prefieres l\u00edmites de rol claramente definidos y flujos de trabajo estructurados",
        "Est\u00e1s interesado/a en especialidades quir\u00fargicas, de procedimientos o atenci\u00f3n aguda",
        "Quieres construir o ser due\u00f1o/a de tu propia pr\u00e1ctica a largo plazo",
      ],
    },
  ],
  fitBoxOutro:
    "Los mejores profesionales de salud son conscientes de s\u00ed mismos sobre lo que los motiva. No hay verg\u00fcenza en elegir la pr\u00e1ctica privada porque quieres un pago de especialidad m\u00e1s alto o acceso a tecnolog\u00eda avanzada. Y no hay verg\u00fcenza en elegir un FQHC porque quieres servir a las comunidades que m\u00e1s te necesitan. Lo importante es elegir intencionalmente en lugar de caer por defecto en un entorno que no coincide con tus valores.",
  ctaTitle: "\u00bfListo/a para Comenzar Tu Carrera en FQHC?",
  ctaDescription:
    "Crea un curr\u00edculum gratuito adaptado para gerentes de contrataci\u00f3n de FQHC, o toma nuestra Evaluaci\u00f3n de Perspectivas de Carrera para encontrar el rol de salud comunitaria que se ajuste a tus habilidades y experiencia.",
  ctaPrimaryButtonText: "Crea Tu CV Gratis",
  ctaSecondaryButtonText: "Toma la Evaluaci\u00f3n de Carrera",
  relatedArticlesHeading: "Art\u00edculos Relacionados",
  relatedArticles: [
    {
      href: "/blog/nhsc-loan-repayment-guide",
      categoryLabel: "Beneficios y Compensaci\u00f3n",
      title:
        "Pago de Pr\u00e9stamos NHSC para Trabajadores de FQHC: Gu\u00eda Completa",
    },
    {
      href: "/blog/fqhc-career-ladder-ma-rn-provider",
      categoryLabel: "Crecimiento Profesional",
      title:
        "La Escalera Profesional de FQHC para AM, Enfermeros y Proveedores: C\u00f3mo Avanzar en Salud Comunitaria",
    },
  ],
};

export default function FqhcVsPrivatePracticeArticle() {
  const locale = useLocale();
  const content = locale === "es" ? esContent : enContent;

  // Find the index of the "Compensation" section to insert comparison table after it
  // The comparison table goes between section index 2 (Compensation) and section 3 (Benefits)
  const compensationSectionIndex = 2;
  // The cultural fit section heading in EN is "Cultural Fit: Who Thrives at an FQHC?"
  // In our data structure, the fit boxes are separate from sections, placed between
  // sections index 8 (Job Security) and index 9 (Making Your Decision)
  const fitSectionIndex = 9;

  const sectionsBeforeTable = content.sections.slice(
    0,
    compensationSectionIndex + 1
  );
  const sectionsBetweenTableAndFit = content.sections.slice(
    compensationSectionIndex + 1,
    fitSectionIndex
  );
  const sectionsAfterFit = content.sections.slice(fitSectionIndex);

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title={content.title}
        description={content.description}
        datePublished={content.datePublished}
        slug="fqhc-vs-private-practice"
      />
      <BreadcrumbJsonLd
        items={[
          {
            name: locale === "es" ? "Inicio" : "Home",
            url: "https://fqhctalent.com",
          },
          { name: "Blog", url: "https://fqhctalent.com/blog" },
          {
            name: content.breadcrumbTitle,
            url: "https://fqhctalent.com/blog/fqhc-vs-private-practice",
          },
        ]}
      />

      <article className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-stone-500 mb-6">
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
            <p className="text-amber-600 font-semibold mb-3">
              {content.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
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
            <p className="text-xl text-stone-600 leading-relaxed">
              {content.openingParagraph}
            </p>

            {/* Sections before comparison table */}
            {sectionsBeforeTable.map((section, idx) => (
              <div key={`pre-table-${idx}`}>
                <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
                  {section.heading}
                </h2>
                {section.content.map((item, itemIdx) =>
                  renderContentItem(item, itemIdx)
                )}
              </div>
            ))}

            {/* Comparison Table */}
            <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
              {content.comparisonHeading}
            </h2>
            <div className="overflow-x-auto my-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-teal-700 text-white">
                    <th className="p-4 font-semibold rounded-tl-lg">
                      {content.comparisonTableHeaders.factor}
                    </th>
                    <th className="p-4 font-semibold">
                      {content.comparisonTableHeaders.fqhc}
                    </th>
                    <th className="p-4 font-semibold rounded-tr-lg">
                      {content.comparisonTableHeaders.privatePractice}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-stone-700">
                  {content.comparisonRows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className={`${
                        rowIdx < content.comparisonRows.length - 1
                          ? "border-b border-stone-200"
                          : ""
                      } ${rowIdx % 2 === 0 ? "bg-stone-50" : ""}`}
                    >
                      <td
                        className={`p-4 font-semibold${
                          rowIdx === content.comparisonRows.length - 1
                            ? " rounded-bl-lg"
                            : ""
                        }`}
                      >
                        {row.factor}
                      </td>
                      <td className="p-4">{row.fqhc}</td>
                      <td
                        className={`p-4${
                          rowIdx === content.comparisonRows.length - 1
                            ? " rounded-br-lg"
                            : ""
                        }`}
                      >
                        {row.privatePractice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sections between table and cultural fit */}
            {sectionsBetweenTableAndFit.map((section, idx) => (
              <div key={`mid-${idx}`}>
                <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
                  {section.heading}
                </h2>
                {section.content.map((item, itemIdx) =>
                  renderContentItem(item, itemIdx)
                )}
              </div>
            ))}

            {/* Cultural Fit Section */}
            <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
              {locale === "es"
                ? "Afinidad Cultural: \u00bfQui\u00e9n Prospera en un FQHC?"
                : "Cultural Fit: Who Thrives at an FQHC?"}
            </h2>
            <p className="text-stone-700 leading-relaxed">
              {content.fitBoxIntro}
            </p>

            {content.fitBoxes.map((box, boxIdx) => (
              <div
                key={boxIdx}
                className={`${
                  box.variant === "teal" ? "bg-teal-50" : "bg-stone-50"
                } rounded-lg p-6 my-6`}
              >
                <p className="text-stone-700 font-semibold mb-4">
                  {box.title}
                </p>
                <ul className="text-stone-700 space-y-2">
                  {box.items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="text-stone-700 leading-relaxed">
              {content.fitBoxOutro}
            </p>

            {/* Sections after cultural fit (Making Your Decision) */}
            {sectionsAfterFit.map((section, idx) => (
              <div key={`post-fit-${idx}`}>
                <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
                  {section.heading}
                </h2>
                {section.content.map((item, itemIdx) =>
                  renderContentItem(item, itemIdx)
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              {content.ctaTitle}
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              {content.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/resume-builder"
                className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-800 transition-colors"
              >
                {content.ctaPrimaryButtonText}
              </a>
              <a
                href="/join"
                className="inline-flex items-center justify-center rounded-lg border-2 border-amber-600 px-8 py-4 text-lg font-semibold text-amber-600 hover:bg-amber-50 transition-colors"
              >
                {content.ctaSecondaryButtonText}
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-stone-900 mb-6">
              {content.relatedArticlesHeading}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content.relatedArticles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.href}
                  className="bg-stone-50 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <p className="text-sm text-amber-600 mb-2">
                    {article.categoryLabel}
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

function renderContentItem(
  item: {
    type: "paragraph" | "list" | "ordered-list" | "box" | "link-paragraph";
    text?: string;
    items?: string[];
    linkText?: string;
    linkHref?: string;
    textAfterLink?: string;
  },
  key: number
) {
  if (item.type === "paragraph") {
    return (
      <p key={key} className="text-stone-700 leading-relaxed">
        {item.text}
      </p>
    );
  } else if (item.type === "link-paragraph") {
    // Split text at first colon to make the leading phrase bold
    const colonIndex = item.text?.indexOf(":") ?? -1;
    const hasBoldPrefix = colonIndex > 0 && colonIndex < 80;
    return (
      <p key={key} className="text-stone-700 leading-relaxed">
        {hasBoldPrefix ? (
          <>
            <strong>{item.text?.slice(0, colonIndex + 1)}</strong>{" "}
            {item.text?.slice(colonIndex + 2)}
          </>
        ) : (
          item.text
        )}
        <Link
          href={item.linkHref ?? "#"}
          className="text-teal-700 hover:text-teal-800 underline"
        >
          {item.linkText}
        </Link>
        {item.textAfterLink}
      </p>
    );
  } else if (item.type === "list") {
    return (
      <ul key={key} className="text-stone-700 leading-relaxed space-y-2">
        {item.items?.map((listItem, listIdx) => {
          // Make text before the first colon bold
          const colonIdx = listItem.indexOf(":");
          if (colonIdx > 0 && colonIdx < 40) {
            return (
              <li key={listIdx}>
                <strong>{listItem.slice(0, colonIdx + 1)}</strong>
                {listItem.slice(colonIdx + 1)}
              </li>
            );
          }
          return <li key={listIdx}>{listItem}</li>;
        })}
      </ul>
    );
  } else if (item.type === "ordered-list") {
    return (
      <ol key={key} className="text-stone-700 leading-relaxed space-y-3">
        {item.items?.map((listItem, listIdx) => {
          // Make text before the first period bold (for "Calculate your total compensation." style)
          const periodIdx = listItem.indexOf(".");
          if (periodIdx > 0 && periodIdx < 60) {
            return (
              <li key={listIdx}>
                <strong>{listItem.slice(0, periodIdx + 1)}</strong>
                {listItem.slice(periodIdx + 1)}
              </li>
            );
          }
          return <li key={listIdx}>{listItem}</li>;
        })}
      </ol>
    );
  } else if (item.type === "box") {
    return (
      <div
        key={key}
        className="bg-teal-50 border border-teal-200 rounded-lg p-6 my-6"
      >
        <p className="text-stone-700 leading-relaxed">{item.text}</p>
      </div>
    );
  }
  return null;
}
