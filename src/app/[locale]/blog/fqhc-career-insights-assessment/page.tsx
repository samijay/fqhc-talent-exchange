"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

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
      type: "paragraph" | "list" | "box";
      text?: string;
      items?: string[];
      gridItems?: string[];
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
  category: "Assessment Tools",
  title: "Career Insights Assessment: A Behavioral Assessment Built for Community Health",
  description:
    "Discover the FQHC Talent Exchange Career Insights Assessment — a scenario-based behavioral evaluation across 4 domains adapted from the TPB Universal Assessment framework. Understand your strengths, growth areas, and biggest opportunity for rapid improvement in community health careers.",
  breadcrumbTitle: "Career Insights Assessment",
  datePublished: "2026-02-15",
  dateDisplay: "February 15, 2026",
  readTime: "9 min read",
  openingParagraph:
    "Most hiring tools in healthcare ask the wrong questions. They check whether you have a certification, whether you have used a specific EHR, whether you have a certain number of years of experience. Those things matter — but they do not predict whether someone will thrive in the demanding, mission-driven environment of a Federally Qualified Health Center. The Career Insights Assessment, integrated directly into the FQHC Talent Exchange resume builder, takes a fundamentally different approach. Instead of checking boxes, it evaluates the behavioral traits that actually determine success in community health — your motivation, your communication instincts, your ability to adapt under pressure, and your orientation toward growth. It is a 12-question, scenario-based assessment that generates personalized insights you can use immediately, whether you are preparing for an interview, building your resume, or planning your next career move.",
  sections: [
    {
      heading: "Why Behavioral Traits Matter More Than Checkboxes",
      content: [
        {
          type: "paragraph",
          text: "If you have spent any time working at an FQHC, you have seen it firsthand: the colleague with a perfect resume who lasted three months because they could not handle the complexity, and the colleague with a nontraditional background who became the backbone of the team because they showed up every day with grit, empathy, and a bias toward action.",
        },
        {
          type: "paragraph",
          text: "Traditional hiring screens — years of experience, degree type, certification status — are necessary but insufficient. They tell you what someone has done, not how they will perform when a patient in crisis walks through the door, when a managed care plan changes its documentation requirements overnight, or when the team is short-staffed and caseloads spike. Behavioral traits are what separate the people who survive in community health from the people who thrive in it.",
        },
        {
          type: "paragraph",
          text: "The Career Insights Assessment was designed to surface these traits. It is adapted from the TPB Universal Assessment framework, a behavioral evaluation methodology built around the principle that observable behavioral patterns — how people respond to real-world scenarios — are the strongest predictors of on-the-job performance. We adapted this framework specifically for the FQHC environment, calibrating every question to the situations that community health professionals actually encounter.",
        },
      ],
    },
    {
      heading: "The 4 Domains: What the Assessment Measures",
      content: [
        {
          type: "paragraph",
          text: "The Career Insights Assessment evaluates candidates across four behavioral domains. Each domain captures a distinct cluster of traits that are essential for success in community health roles — from frontline Community Health Workers to care coordinators, medical assistants, case managers, and behavioral health professionals.",
        },
        {
          type: "paragraph",
          text: "Domain 1: Mission and Motivation. This domain measures your sense of purpose, your grit, and the depth of your conviction about the work. FQHCs operate in one of the most challenging corners of healthcare. The patients are complex, the resources are limited, and the work is emotionally demanding. People who thrive in this environment are not just doing a job — they are driven by a genuine belief that every person deserves access to quality care, regardless of their insurance status, language, or housing situation. This domain evaluates whether your motivation is deep enough to sustain you through the hard days, or whether it is surface-level and likely to erode under pressure.",
        },
        {
          type: "paragraph",
          text: "Domain 2: People and Communication. This domain measures your empathy, your cultural competency, and your ability to collaborate with a team. FQHC work is inherently relational. You are building trust with patients who have been failed by institutions. You are navigating cultural differences with humility. You are coordinating across disciplines — medical, behavioral health, social services, community organizations — where miscommunication can directly harm patient outcomes. This domain evaluates whether you instinctively lead with empathy and adapt your communication style to different audiences, or whether you default to a one-size-fits-all approach.",
        },
        {
          type: "paragraph",
          text: "Domain 3: Execution and Adaptability. This domain measures your ability to triage complexity, adapt to change, and maintain a bias toward action. FQHC environments are unpredictable. A patient scheduled for a diabetes follow-up walks in with a housing crisis. A managed care plan updates its ECM documentation requirements with two weeks' notice. Your caseload increases by 30% because a colleague leaves. This domain evaluates whether you can prioritize effectively under pressure, whether you adapt quickly when circumstances change, and whether you default to action rather than paralysis when facing ambiguity.",
        },
        {
          type: "paragraph",
          text: "Domain 4: Growth Mindset. This domain measures your learning orientation, your resilience in the face of setbacks, and your career ambition. Community health is not a static field. CalAIM is evolving. New programs are launching. EHR systems are updating. The candidates who build long, impactful careers in FQHCs are the ones who treat every challenge as a learning opportunity, who actively seek out new skills and certifications, and who have a clear vision for where they want to go professionally. This domain evaluates whether you approach your career with a growth orientation or a fixed one.",
        },
      ],
    },
    {
      heading: "How the Scenario-Based Questions Work",
      content: [
        {
          type: "paragraph",
          text: "The Career Insights Assessment uses 12 scenario-based questions — three per domain. Unlike traditional self-assessment questionnaires that ask you to rate statements like “I am a good communicator” on a scale, scenario-based questions present you with realistic situations and ask you to choose the response that best reflects how you would actually behave. This format reduces the tendency to give socially desirable answers and instead reveals your authentic behavioral instincts.",
        },
        {
          type: "paragraph",
          text: "Each question presents four response options, scored from 1 to 4, where higher scores reflect behaviors more strongly associated with success in FQHC environments. There are no trick questions, and there are no “wrong” answers in the traditional sense — every option represents a legitimate approach. But the assessment is designed to distinguish between responses that reflect surface-level engagement and responses that reflect the depth of behavioral competency that FQHCs need.",
        },
        {
          type: "paragraph",
          text: "Here are two examples of what the questions look like, without revealing the scoring:",
        },
        {
          type: "box",
          text: "Example scenario (Mission and Motivation): Your FQHC announces budget cuts that will reduce staffing in your department. Some colleagues begin looking for jobs elsewhere. How do you respond? The options range from immediately updating your own resume, to expressing frustration but continuing as normal, to proactively asking leadership how you can help the team adapt, to volunteering to take on additional responsibilities to fill gaps while advocating for long-term solutions.",
        },
        {
          type: "box",
          text: "Example scenario (People and Communication): A patient arrives visibly upset and begins speaking rapidly in a mix of English and Spanish. They are frustrated because they feel no one at the clinic has listened to their concerns about a medication side effect. How do you respond? The options range from directing them to the provider's schedule, to acknowledging their frustration and offering a callback, to sitting with them, switching to their preferred language, validating their experience, and personally coordinating a same-day follow-up with the care team.",
        },
        {
          type: "paragraph",
          text: "Each scenario is grounded in real situations that FQHC professionals face. The questions are designed to feel familiar if you have community health experience, and to be accessible and understandable even if you are new to the field.",
        },
      ],
    },
    {
      heading: "What Your Results Look Like",
      content: [
        {
          type: "paragraph",
          text: "After completing the 12 questions, you receive a personalized Career Insights Report with four components:",
        },
        {
          type: "list",
          items: [
            "Domain Scores: A score for each of the four domains (Mission and Motivation, People and Communication, Execution and Adaptability, Growth Mindset), showing where your behavioral strengths concentrate and where there is room for development. Scores are presented on a clear scale so you can see at a glance which areas are strongest.",
            "Strengths Summary: A narrative description of your top behavioral strengths, written in language you can use directly in interviews and on your resume. This is not generic praise — it is specific to the patterns your responses revealed. If you scored highest in People and Communication, for example, your strengths summary will describe your instinct for empathy-first engagement, your cultural adaptability, and your collaborative approach to team-based care.",
            "Growth Areas: An honest assessment of the domains where your responses suggest the most room for improvement. This section is designed to be constructive, not discouraging. It identifies specific behavioral patterns you can work on and explains why developing those areas will make you more effective in FQHC roles.",
            "Actionable Next Steps: Concrete recommendations for professional development based on your results. These are not vague suggestions like “work on your communication skills.” They are specific and practical — recommending particular trainings, certifications, or experiences that directly address your growth areas. For example, if your Execution and Adaptability score suggests room for improvement in triaging competing priorities, the next steps might recommend panel stratification techniques or time-blocking strategies used by high-performing care managers.",
          ],
        },
      ],
    },
    {
      heading: "The Biggest Opportunity: The Most Valuable Part of Your Report",
      content: [
        {
          type: "paragraph",
          text: "Every Career Insights Report includes a section called “Your Biggest Opportunity.” This is, by design, the most important part of the entire assessment — and it is what makes this tool fundamentally different from a standard skills evaluation.",
        },
        {
          type: "paragraph",
          text: "Your Biggest Opportunity identifies the single behavioral area where focused improvement has the greatest chance of producing rapid, large, and sustained results. It is not necessarily your lowest-scoring domain. Instead, it is the domain where the gap between your current behavioral patterns and the optimal patterns is most actionable — meaning it is the area where a relatively small investment of effort can produce a disproportionately large improvement in your overall effectiveness.",
        },
        {
          type: "paragraph",
          text: "Here is why this matters: most professional development advice tells you to “work on your weaknesses,” but that guidance is too broad to be useful. If you have five areas to improve and limited time, where do you start? The Biggest Opportunity insight answers that question with precision. It tells you exactly where to focus your energy for maximum return.",
        },
        {
          type: "paragraph",
          text: "For example, a candidate might score well in Mission and Motivation and People and Communication, but show a pattern of hesitation in Execution and Adaptability — not because they lack the ability to act, but because they tend to over-deliberate before making decisions. Their Biggest Opportunity would highlight this pattern and recommend specific strategies for developing faster decision-making instincts in high-pressure situations, such as practicing structured triage frameworks or shadowing experienced care managers who model decisive action under uncertainty.",
        },
        {
          type: "paragraph",
          text: "This single insight — knowing exactly where to focus — can accelerate professional growth in a way that broad, unfocused self-improvement cannot. It turns the assessment from a passive evaluation into an active career development tool.",
        },
      ],
    },
    {
      heading: "How FQHCs Can Use This to Find Candidates Who Thrive",
      content: [
        {
          type: "paragraph",
          text: "The Career Insights Assessment is not just valuable for candidates — it is a powerful signal for the FQHCs that hire them. Community health centers face one of the highest staff turnover rates in healthcare, and the cost of a bad hire is measured not just in recruiting expenses but in disrupted patient care, overburdened remaining staff, and lost institutional knowledge.",
        },
        {
          type: "paragraph",
          text: "Traditional screening processes — resume review, credential checks, structured interviews — can verify what a candidate has done. But they struggle to predict how that candidate will perform under the specific pressures of FQHC work. A candidate who excelled in a well-resourced hospital system may struggle in a community health center where caseloads are higher, resources are thinner, and the patient population presents with overlapping medical and social needs that require a completely different skill set.",
        },
        {
          type: "paragraph",
          text: "The Career Insights Assessment gives FQHCs a behavioral lens that complements their existing hiring process. When a candidate's assessment shows high scores in Mission and Motivation and Execution and Adaptability, that is a strong signal that they will not only survive the demands of FQHC work but will actively contribute to the resilience and effectiveness of the team. When a candidate shows a growth area in People and Communication but a high Growth Mindset score, that signals someone who may need initial coaching on cultural competency but who has the learning orientation to develop quickly.",
        },
        {
          type: "paragraph",
          text: "This is the difference between hiring for credentials and hiring for fit. FQHCs that screen for behavioral alignment — in addition to technical qualifications — build teams that are more cohesive, more resilient, and more effective at delivering the whole-person care that their patients need.",
        },
      ],
    },
    {
      heading: "Built Into the Resume Builder: No Extra Steps Required",
      content: [
        {
          type: "paragraph",
          text: "The Career Insights Assessment is integrated directly into the FQHC Talent Exchange resume builder. When you build your free resume on our platform, the assessment is offered as part of the process — you can complete it in under 10 minutes while you are already focused on your professional profile. Your results are saved alongside your resume, giving you a complete picture of both your qualifications and your behavioral strengths.",
        },
        {
          type: "paragraph",
          text: "There is no account required, no paywall, and no hidden upsell. The assessment is completely free because we believe that every community health professional deserves to understand their strengths, their growth areas, and the single most impactful thing they can do to advance their career. Whether you are a seasoned care coordinator with a decade of FQHC experience or a Community Health Worker exploring your first role, the Career Insights Assessment meets you where you are and gives you actionable information you can use today.",
        },
        {
          type: "paragraph",
          text: "The assessment is available in English and is designed to be accessible to professionals at all career stages. The scenario-based questions use clear, straightforward language — no jargon, no trick questions, no academic abstractions. If you have lived experience in community health, the scenarios will feel immediately recognizable. If you are new to the field, they will give you a realistic preview of the situations you will encounter.",
        },
      ],
    },
    {
      heading: "What Makes This Different From Other Assessments",
      content: [
        {
          type: "paragraph",
          text: "The healthcare industry is not short on assessment tools. But most of them fall into two categories: clinical competency exams that test technical knowledge, and generic personality assessments that were designed for corporate environments and then superficially adapted for healthcare. Neither of those tools answers the question that FQHC hiring managers actually care about: will this person thrive in our specific environment?",
        },
        {
          type: "paragraph",
          text: "The Career Insights Assessment was built from the ground up for community health. Every scenario, every response option, and every scoring rubric was calibrated against the behavioral patterns that predict success specifically in FQHC settings. The four domains — Mission and Motivation, People and Communication, Execution and Adaptability, and Growth Mindset — were chosen because they map directly to the challenges that FQHC professionals face every day. This is not a generic tool with an FQHC label. It is an FQHC tool, designed by people who understand what it takes to do this work well.",
        },
        {
          type: "list",
          items: [
            "Scenario-based, not self-report: You respond to realistic situations, not vague self-ratings. This produces more accurate and actionable results.",
            "FQHC-calibrated: Every question reflects the actual challenges of community health work — from managing complex caseloads to navigating cultural differences to adapting when programs change.",
            "Strengths and growth areas: The results tell you what you are already good at and where you have the most room to improve — with specific recommendations for each.",
            "Biggest Opportunity insight: No other assessment in healthcare identifies the single behavioral area where improvement will produce the fastest, largest, and most sustained results.",
            "Free and integrated: Built directly into the resume builder with no additional cost, no accounts, and no friction.",
          ],
        },
      ],
    },
  ],
  ctaTitle: "Discover Your Behavioral Strengths in Community Health",
  ctaDescription:
    "Take the Career Insights Assessment as part of the free FQHC resume builder. In under 10 minutes, you will understand your strengths, your growth areas, and the single most impactful step you can take to advance your career.",
  ctaButtonText: "Build Your Free Resume",
  relatedArticles: [
    {
      href: "/blog/how-to-write-fqhc-resume",
      title: "How to Write an FQHC Resume That Gets Noticed",
    },
    {
      href: "/blog/top-10-fqhc-interview-questions",
      title: "Top 10 FQHC Interview Questions and How to Answer Them",
    },
  ],
};

const esContent: ArticleContent = {
  category: "Herramientas de Evaluaci\u00f3n",
  title: "Evaluaci\u00f3n de Perspectivas de Carrera: Una Evaluaci\u00f3n Conductual Dise\u00f1ada para la Salud Comunitaria",
  description:
    "Descubre la Evaluaci\u00f3n de Perspectivas de Carrera de FQHC Talent Exchange — una evaluaci\u00f3n conductual basada en escenarios en 4 dominios adaptados del marco de Evaluaci\u00f3n Universal TPB. Comprende tus fortalezas, \u00e1reas de crecimiento y la mayor oportunidad para una mejora r\u00e1pida en carreras de salud comunitaria.",
  breadcrumbTitle: "Evaluaci\u00f3n de Perspectivas de Carrera",
  datePublished: "2026-02-15",
  dateDisplay: "15 de Febrero de 2026",
  readTime: "9 min",
  openingParagraph:
    "La mayor\u00eda de las herramientas de contrataci\u00f3n en salud hacen las preguntas equivocadas. Verifican si tienes una certificaci\u00f3n, si has usado un EHR espec\u00edfico, si tienes cierto n\u00famero de a\u00f1os de experiencia. Esas cosas importan — pero no predicen si alguien prosperar\u00e1 en el exigente entorno impulsado por la misi\u00f3n de un Centro de Salud Calificado Federalmente. La Evaluaci\u00f3n de Perspectivas de Carrera, integrada directamente en el constructor de curr\u00edculum de FQHC Talent Exchange, adopta un enfoque fundamentalmente diferente. En lugar de marcar casillas, eval\u00faa los rasgos conductuales que realmente determinan el \u00e9xito en la salud comunitaria — tu motivaci\u00f3n, tus instintos de comunicaci\u00f3n, tu capacidad de adaptarte bajo presi\u00f3n y tu orientaci\u00f3n hacia el crecimiento. Es una evaluaci\u00f3n de 12 preguntas basada en escenarios que genera perspectivas personalizadas que puedes usar de inmediato, ya sea que te est\u00e9s preparando para una entrevista, construyendo tu curr\u00edculum o planificando tu pr\u00f3ximo movimiento profesional.",
  sections: [
    {
      heading: "Por Qu\u00e9 los Rasgos Conductuales Importan M\u00e1s que las Casillas",
      content: [
        {
          type: "paragraph",
          text: "Si has pasado tiempo trabajando en un FQHC, lo has visto de primera mano: el colega con un curr\u00edculum perfecto que dur\u00f3 tres meses porque no pod\u00eda manejar la complejidad, y el colega con antecedentes no tradicionales que se convirti\u00f3 en el pilar del equipo porque se presentaba todos los d\u00edas con determinaci\u00f3n, empat\u00eda y una inclinaci\u00f3n hacia la acci\u00f3n.",
        },
        {
          type: "paragraph",
          text: "Las evaluaciones tradicionales de contrataci\u00f3n — a\u00f1os de experiencia, tipo de t\u00edtulo, estado de certificaci\u00f3n — son necesarias pero insuficientes. Te dicen lo que alguien ha hecho, no c\u00f3mo se desempe\u00f1ar\u00e1 cuando un paciente en crisis entra por la puerta, cuando un plan de atenci\u00f3n administrada cambia sus requisitos de documentaci\u00f3n de la noche a la ma\u00f1ana, o cuando el equipo tiene poco personal y las cargas de casos aumentan. Los rasgos conductuales son lo que separa a las personas que sobreviven en la salud comunitaria de las personas que prosperan en ella.",
        },
        {
          type: "paragraph",
          text: "La Evaluaci\u00f3n de Perspectivas de Carrera fue dise\u00f1ada para revelar estos rasgos. Est\u00e1 adaptada del marco de Evaluaci\u00f3n Universal TPB, una metodolog\u00eda de evaluaci\u00f3n conductual construida alrededor del principio de que los patrones conductuales observables — c\u00f3mo las personas responden a escenarios del mundo real — son los predictores m\u00e1s fuertes del rendimiento laboral. Adaptamos este marco espec\u00edficamente para el entorno FQHC, calibrando cada pregunta a las situaciones que los profesionales de salud comunitaria realmente encuentran.",
        },
      ],
    },
    {
      heading: "Los 4 Dominios: Qu\u00e9 Mide la Evaluaci\u00f3n",
      content: [
        {
          type: "paragraph",
          text: "La Evaluaci\u00f3n de Perspectivas de Carrera eval\u00faa a los candidatos en cuatro dominios conductuales. Cada dominio captura un grupo distinto de rasgos que son esenciales para el \u00e9xito en roles de salud comunitaria — desde Trabajadores de Salud Comunitaria de primera l\u00ednea hasta coordinadores de atenci\u00f3n, asistentes m\u00e9dicos, gerentes de casos y profesionales de salud conductual.",
        },
        {
          type: "paragraph",
          text: "Dominio 1: Misi\u00f3n y Motivaci\u00f3n. Este dominio mide tu sentido de prop\u00f3sito, tu determinaci\u00f3n y la profundidad de tu convicci\u00f3n sobre el trabajo. Los FQHCs operan en una de las esquinas m\u00e1s desafiantes de la atenci\u00f3n m\u00e9dica. Los pacientes son complejos, los recursos son limitados y el trabajo es emocionalmente exigente. Las personas que prosperan en este entorno no solo est\u00e1n haciendo un trabajo — est\u00e1n impulsadas por una creencia genuina de que toda persona merece acceso a atenci\u00f3n de calidad, independientemente de su estatus de seguro, idioma o situaci\u00f3n de vivienda. Este dominio eval\u00faa si tu motivaci\u00f3n es lo suficientemente profunda para sostenerte durante los d\u00edas dif\u00edciles, o si es superficial y probablemente se erosionar\u00e1 bajo presi\u00f3n.",
        },
        {
          type: "paragraph",
          text: "Dominio 2: Personas y Comunicaci\u00f3n. Este dominio mide tu empat\u00eda, tu competencia cultural y tu capacidad para colaborar con un equipo. El trabajo en FQHC es inherentemente relacional. Est\u00e1s construyendo confianza con pacientes que han sido fallados por las instituciones. Est\u00e1s navegando diferencias culturales con humildad. Est\u00e1s coordinando entre disciplinas — m\u00e9dica, salud conductual, servicios sociales, organizaciones comunitarias — donde la mala comunicaci\u00f3n puede da\u00f1ar directamente los resultados de los pacientes. Este dominio eval\u00faa si instintivamente lideras con empat\u00eda y adaptas tu estilo de comunicaci\u00f3n a diferentes audiencias, o si te inclinas por un enfoque \u00fanico para todos.",
        },
        {
          type: "paragraph",
          text: "Dominio 3: Ejecuci\u00f3n y Adaptabilidad. Este dominio mide tu capacidad para clasificar la complejidad, adaptarte al cambio y mantener una inclinaci\u00f3n hacia la acci\u00f3n. Los entornos de FQHC son impredecibles. Un paciente programado para un seguimiento de diabetes llega con una crisis de vivienda. Un plan de atenci\u00f3n administrada actualiza sus requisitos de documentaci\u00f3n de ECM con dos semanas de aviso. Tu carga de casos aumenta un 30% porque un colega se va. Este dominio eval\u00faa si puedes priorizar efectivamente bajo presi\u00f3n, si te adaptas r\u00e1pidamente cuando las circunstancias cambian y si tu reacci\u00f3n predeterminada es la acci\u00f3n en lugar de la par\u00e1lisis cuando enfrentas ambig\u00fcedad.",
        },
        {
          type: "paragraph",
          text: "Dominio 4: Mentalidad de Crecimiento. Este dominio mide tu orientaci\u00f3n al aprendizaje, tu resiliencia frente a los contratiempos y tu ambici\u00f3n profesional. La salud comunitaria no es un campo est\u00e1tico. CalAIM est\u00e1 evolucionando. Se est\u00e1n lanzando nuevos programas. Los sistemas de EHR se est\u00e1n actualizando. Los candidatos que construyen carreras largas e impactantes en FQHCs son aquellos que tratan cada desaf\u00edo como una oportunidad de aprendizaje, que buscan activamente nuevas habilidades y certificaciones, y que tienen una visi\u00f3n clara de hacia d\u00f3nde quieren ir profesionalmente. Este dominio eval\u00faa si abordas tu carrera con una orientaci\u00f3n de crecimiento o una fija.",
        },
      ],
    },
    {
      heading: "C\u00f3mo Funcionan las Preguntas Basadas en Escenarios",
      content: [
        {
          type: "paragraph",
          text: "La Evaluaci\u00f3n de Perspectivas de Carrera utiliza 12 preguntas basadas en escenarios — tres por dominio. A diferencia de los cuestionarios tradicionales de autoevaluaci\u00f3n que te piden calificar afirmaciones como “Soy un buen comunicador” en una escala, las preguntas basadas en escenarios te presentan situaciones realistas y te piden elegir la respuesta que mejor refleje c\u00f3mo te comportar\u00edas realmente. Este formato reduce la tendencia a dar respuestas socialmente deseables y en su lugar revela tus instintos conductuales aut\u00e9nticos.",
        },
        {
          type: "paragraph",
          text: "Cada pregunta presenta cuatro opciones de respuesta, puntuadas de 1 a 4, donde las puntuaciones m\u00e1s altas reflejan comportamientos m\u00e1s fuertemente asociados con el \u00e9xito en entornos de FQHC. No hay preguntas con trampa, y no hay respuestas “incorrectas” en el sentido tradicional — cada opci\u00f3n representa un enfoque leg\u00edtimo. Pero la evaluaci\u00f3n est\u00e1 dise\u00f1ada para distinguir entre respuestas que reflejan un compromiso superficial y respuestas que reflejan la profundidad de competencia conductual que los FQHCs necesitan.",
        },
        {
          type: "paragraph",
          text: "Aqu\u00ed hay dos ejemplos de c\u00f3mo se ven las preguntas, sin revelar la puntuaci\u00f3n:",
        },
        {
          type: "box",
          text: "Escenario de ejemplo (Misi\u00f3n y Motivaci\u00f3n): Tu FQHC anuncia recortes presupuestarios que reducir\u00e1n el personal en tu departamento. Algunos colegas comienzan a buscar trabajos en otros lugares. \u00bfC\u00f3mo respondes? Las opciones van desde actualizar inmediatamente tu propio curr\u00edculum, hasta expresar frustraci\u00f3n pero continuar como siempre, hasta preguntar proactivamente al liderazgo c\u00f3mo puedes ayudar al equipo a adaptarse, hasta ofrecerte como voluntario para asumir responsabilidades adicionales para llenar vac\u00edos mientras abogas por soluciones a largo plazo.",
        },
        {
          type: "box",
          text: "Escenario de ejemplo (Personas y Comunicaci\u00f3n): Un paciente llega visiblemente molesto y comienza a hablar r\u00e1pidamente en una mezcla de ingl\u00e9s y espa\u00f1ol. Est\u00e1 frustrado porque siente que nadie en la cl\u00ednica ha escuchado sus preocupaciones sobre un efecto secundario de la medicaci\u00f3n. \u00bfC\u00f3mo respondes? Las opciones van desde dirigirlo al horario del proveedor, hasta reconocer su frustraci\u00f3n y ofrecer una devoluci\u00f3n de llamada, hasta sentarte con \u00e9l, cambiar a su idioma preferido, validar su experiencia y coordinar personalmente un seguimiento el mismo d\u00eda con el equipo de atenci\u00f3n.",
        },
        {
          type: "paragraph",
          text: "Cada escenario est\u00e1 fundamentado en situaciones reales que enfrentan los profesionales de FQHC. Las preguntas est\u00e1n dise\u00f1adas para sentirse familiares si tienes experiencia en salud comunitaria, y para ser accesibles y comprensibles incluso si eres nuevo en el campo.",
        },
      ],
    },
    {
      heading: "C\u00f3mo Se Ven Tus Resultados",
      content: [
        {
          type: "paragraph",
          text: "Despu\u00e9s de completar las 12 preguntas, recibes un Informe Personalizado de Perspectivas de Carrera con cuatro componentes:",
        },
        {
          type: "list",
          items: [
            "Puntuaciones por Dominio: Una puntuaci\u00f3n para cada uno de los cuatro dominios (Misi\u00f3n y Motivaci\u00f3n, Personas y Comunicaci\u00f3n, Ejecuci\u00f3n y Adaptabilidad, Mentalidad de Crecimiento), mostrando d\u00f3nde se concentran tus fortalezas conductuales y d\u00f3nde hay espacio para el desarrollo. Las puntuaciones se presentan en una escala clara para que puedas ver de un vistazo qu\u00e9 \u00e1reas son las m\u00e1s fuertes.",
            "Resumen de Fortalezas: Una descripci\u00f3n narrativa de tus principales fortalezas conductuales, escrita en un lenguaje que puedes usar directamente en entrevistas y en tu curr\u00edculum. Esto no es un elogio gen\u00e9rico — es espec\u00edfico a los patrones que revelaron tus respuestas. Si obtuviste la puntuaci\u00f3n m\u00e1s alta en Personas y Comunicaci\u00f3n, por ejemplo, tu resumen de fortalezas describir\u00e1 tu instinto para el compromiso con empat\u00eda primero, tu adaptabilidad cultural y tu enfoque colaborativo para la atenci\u00f3n en equipo.",
            "\u00c1reas de Crecimiento: Una evaluaci\u00f3n honesta de los dominios donde tus respuestas sugieren m\u00e1s espacio para mejorar. Esta secci\u00f3n est\u00e1 dise\u00f1ada para ser constructiva, no desalentadora. Identifica patrones conductuales espec\u00edficos en los que puedes trabajar y explica por qu\u00e9 desarrollar esas \u00e1reas te har\u00e1 m\u00e1s efectivo en roles de FQHC.",
            "Pr\u00f3ximos Pasos Accionables: Recomendaciones concretas de desarrollo profesional basadas en tus resultados. No son sugerencias vagas como “trabaja en tus habilidades de comunicaci\u00f3n.” Son espec\u00edficas y pr\u00e1cticas — recomendando capacitaciones, certificaciones o experiencias particulares que abordan directamente tus \u00e1reas de crecimiento. Por ejemplo, si tu puntuaci\u00f3n en Ejecuci\u00f3n y Adaptabilidad sugiere espacio para mejorar en la clasificaci\u00f3n de prioridades competitivas, los pr\u00f3ximos pasos podr\u00edan recomendar t\u00e9cnicas de estratificaci\u00f3n de panel o estrategias de bloqueo de tiempo utilizadas por gerentes de atenci\u00f3n de alto rendimiento.",
          ],
        },
      ],
    },
    {
      heading: "La Mayor Oportunidad: La Parte M\u00e1s Valiosa de Tu Informe",
      content: [
        {
          type: "paragraph",
          text: "Cada Informe de Perspectivas de Carrera incluye una secci\u00f3n llamada “Tu Mayor Oportunidad.” Esta es, por dise\u00f1o, la parte m\u00e1s importante de toda la evaluaci\u00f3n — y es lo que hace que esta herramienta sea fundamentalmente diferente de una evaluaci\u00f3n de habilidades est\u00e1ndar.",
        },
        {
          type: "paragraph",
          text: "Tu Mayor Oportunidad identifica la \u00fanica \u00e1rea conductual donde la mejora enfocada tiene la mayor probabilidad de producir resultados r\u00e1pidos, grandes y sostenidos. No es necesariamente tu dominio con la puntuaci\u00f3n m\u00e1s baja. En cambio, es el dominio donde la brecha entre tus patrones conductuales actuales y los patrones \u00f3ptimos es m\u00e1s accionable — lo que significa que es el \u00e1rea donde una inversi\u00f3n relativamente peque\u00f1a de esfuerzo puede producir una mejora desproporcionadamente grande en tu efectividad general.",
        },
        {
          type: "paragraph",
          text: "Aqu\u00ed est\u00e1 por qu\u00e9 esto importa: la mayor\u00eda de los consejos de desarrollo profesional te dicen que “trabajes en tus debilidades,” pero esa gu\u00eda es demasiado amplia para ser \u00fatil. Si tienes cinco \u00e1reas para mejorar y tiempo limitado, \u00bfpor d\u00f3nde empiezas? La perspectiva de Mayor Oportunidad responde esa pregunta con precisi\u00f3n. Te dice exactamente d\u00f3nde enfocar tu energ\u00eda para el m\u00e1ximo retorno.",
        },
        {
          type: "paragraph",
          text: "Por ejemplo, un candidato podr\u00eda obtener buenas puntuaciones en Misi\u00f3n y Motivaci\u00f3n y Personas y Comunicaci\u00f3n, pero mostrar un patr\u00f3n de vacilaci\u00f3n en Ejecuci\u00f3n y Adaptabilidad — no porque carezcan de la capacidad de actuar, sino porque tienden a deliberar excesivamente antes de tomar decisiones. Su Mayor Oportunidad destacar\u00eda este patr\u00f3n y recomendar\u00eda estrategias espec\u00edficas para desarrollar instintos de toma de decisiones m\u00e1s r\u00e1pidos en situaciones de alta presi\u00f3n, como practicar marcos de clasificaci\u00f3n estructurados o seguir a gerentes de atenci\u00f3n experimentados que modelan la acci\u00f3n decisiva bajo incertidumbre.",
        },
        {
          type: "paragraph",
          text: "Esta \u00fanica perspectiva — saber exactamente d\u00f3nde enfocarte — puede acelerar el crecimiento profesional de una manera que la automejora amplia y sin enfoque no puede. Transforma la evaluaci\u00f3n de una evaluaci\u00f3n pasiva a una herramienta activa de desarrollo profesional.",
        },
      ],
    },
    {
      heading: "C\u00f3mo Pueden Usar Esto los FQHCs para Encontrar Candidatos que Prosperen",
      content: [
        {
          type: "paragraph",
          text: "La Evaluaci\u00f3n de Perspectivas de Carrera no solo es valiosa para los candidatos — es una se\u00f1al poderosa para los FQHCs que los contratan. Los centros de salud comunitarios enfrentan una de las tasas de rotaci\u00f3n de personal m\u00e1s altas en la atenci\u00f3n m\u00e9dica, y el costo de una mala contrataci\u00f3n se mide no solo en gastos de reclutamiento sino en atenci\u00f3n al paciente interrumpida, personal restante sobrecargado y conocimiento institucional perdido.",
        },
        {
          type: "paragraph",
          text: "Los procesos tradicionales de selecci\u00f3n — revisi\u00f3n de curr\u00edculum, verificaciones de credenciales, entrevistas estructuradas — pueden verificar lo que un candidato ha hecho. Pero tienen dificultades para predecir c\u00f3mo se desempe\u00f1ar\u00e1 ese candidato bajo las presiones espec\u00edficas del trabajo en FQHC. Un candidato que se destac\u00f3 en un sistema hospitalario bien equipado puede tener dificultades en un centro de salud comunitario donde las cargas de casos son m\u00e1s altas, los recursos son m\u00e1s escasos y la poblaci\u00f3n de pacientes presenta necesidades m\u00e9dicas y sociales superpuestas que requieren un conjunto de habilidades completamente diferente.",
        },
        {
          type: "paragraph",
          text: "La Evaluaci\u00f3n de Perspectivas de Carrera les da a los FQHCs una lente conductual que complementa su proceso de contrataci\u00f3n existente. Cuando la evaluaci\u00f3n de un candidato muestra puntuaciones altas en Misi\u00f3n y Motivaci\u00f3n y Ejecuci\u00f3n y Adaptabilidad, eso es una se\u00f1al fuerte de que no solo sobrevivir\u00e1n las demandas del trabajo en FQHC sino que contribuir\u00e1n activamente a la resiliencia y efectividad del equipo. Cuando un candidato muestra un \u00e1rea de crecimiento en Personas y Comunicaci\u00f3n pero una puntuaci\u00f3n alta en Mentalidad de Crecimiento, eso se\u00f1ala a alguien que puede necesitar entrenamiento inicial en competencia cultural pero que tiene la orientaci\u00f3n al aprendizaje para desarrollarse r\u00e1pidamente.",
        },
        {
          type: "paragraph",
          text: "Esta es la diferencia entre contratar por credenciales y contratar por ajuste. Los FQHCs que eval\u00faan la alineaci\u00f3n conductual — adem\u00e1s de las calificaciones t\u00e9cnicas — construyen equipos que son m\u00e1s cohesivos, m\u00e1s resilientes y m\u00e1s efectivos en la entrega de la atenci\u00f3n integral que sus pacientes necesitan.",
        },
      ],
    },
    {
      heading: "Integrada en el Constructor de Curr\u00edculum: Sin Pasos Adicionales",
      content: [
        {
          type: "paragraph",
          text: "La Evaluaci\u00f3n de Perspectivas de Carrera est\u00e1 integrada directamente en el constructor de curr\u00edculum de FQHC Talent Exchange. Cuando construyes tu curr\u00edculum gratuito en nuestra plataforma, la evaluaci\u00f3n se ofrece como parte del proceso — puedes completarla en menos de 10 minutos mientras ya est\u00e1s enfocado en tu perfil profesional. Tus resultados se guardan junto con tu curr\u00edculum, d\u00e1ndote una imagen completa tanto de tus calificaciones como de tus fortalezas conductuales.",
        },
        {
          type: "paragraph",
          text: "No se requiere cuenta, no hay muro de pago ni ventas ocultas. La evaluaci\u00f3n es completamente gratuita porque creemos que todo profesional de salud comunitaria merece comprender sus fortalezas, sus \u00e1reas de crecimiento y la acci\u00f3n m\u00e1s impactante que pueden tomar para avanzar en su carrera. Ya seas un coordinador de atenci\u00f3n experimentado con una d\u00e9cada de experiencia en FQHC o un Trabajador de Salud Comunitaria explorando tu primer rol, la Evaluaci\u00f3n de Perspectivas de Carrera te encuentra donde est\u00e1s y te da informaci\u00f3n accionable que puedes usar hoy.",
        },
        {
          type: "paragraph",
          text: "La evaluaci\u00f3n est\u00e1 disponible en ingl\u00e9s y est\u00e1 dise\u00f1ada para ser accesible a profesionales en todas las etapas de su carrera. Las preguntas basadas en escenarios usan un lenguaje claro y directo — sin jerga, sin preguntas con trampa, sin abstracciones acad\u00e9micas. Si tienes experiencia vivida en salud comunitaria, los escenarios te resultar\u00e1n inmediatamente reconocibles. Si eres nuevo en el campo, te dar\u00e1n una vista previa realista de las situaciones que encontrar\u00e1s.",
        },
      ],
    },
    {
      heading: "Qu\u00e9 Hace Diferente a Esta Evaluaci\u00f3n",
      content: [
        {
          type: "paragraph",
          text: "La industria de la salud no carece de herramientas de evaluaci\u00f3n. Pero la mayor\u00eda cae en dos categor\u00edas: ex\u00e1menes de competencia cl\u00ednica que prueban conocimientos t\u00e9cnicos, y evaluaciones de personalidad gen\u00e9ricas que fueron dise\u00f1adas para entornos corporativos y luego adaptadas superficialmente para la salud. Ninguna de esas herramientas responde la pregunta que realmente importa a los gerentes de contrataci\u00f3n de FQHC: \u00bfesta persona prosperar\u00e1 en nuestro entorno espec\u00edfico?",
        },
        {
          type: "paragraph",
          text: "La Evaluaci\u00f3n de Perspectivas de Carrera fue construida desde cero para la salud comunitaria. Cada escenario, cada opci\u00f3n de respuesta y cada r\u00fabrica de puntuaci\u00f3n fue calibrada contra los patrones conductuales que predicen el \u00e9xito espec\u00edficamente en entornos de FQHC. Los cuatro dominios — Misi\u00f3n y Motivaci\u00f3n, Personas y Comunicaci\u00f3n, Ejecuci\u00f3n y Adaptabilidad, y Mentalidad de Crecimiento — fueron elegidos porque se mapean directamente a los desaf\u00edos que los profesionales de FQHC enfrentan todos los d\u00edas. Esta no es una herramienta gen\u00e9rica con una etiqueta de FQHC. Es una herramienta de FQHC, dise\u00f1ada por personas que entienden lo que se necesita para hacer bien este trabajo.",
        },
        {
          type: "list",
          items: [
            "Basada en escenarios, no en auto-reporte: Respondes a situaciones realistas, no a autocalificaciones vagas. Esto produce resultados m\u00e1s precisos y accionables.",
            "Calibrada para FQHC: Cada pregunta refleja los desaf\u00edos reales del trabajo en salud comunitaria — desde manejar cargas de casos complejas hasta navegar diferencias culturales y adaptarse cuando los programas cambian.",
            "Fortalezas y \u00e1reas de crecimiento: Los resultados te dicen en qu\u00e9 ya eres bueno y d\u00f3nde tienes m\u00e1s espacio para mejorar — con recomendaciones espec\u00edficas para cada \u00e1rea.",
            "Perspectiva de Mayor Oportunidad: Ninguna otra evaluaci\u00f3n en salud identifica la \u00fanica \u00e1rea conductual donde la mejora producir\u00e1 los resultados m\u00e1s r\u00e1pidos, grandes y sostenidos.",
            "Gratuita e integrada: Construida directamente en el constructor de curr\u00edculum sin costo adicional, sin cuentas y sin fricci\u00f3n.",
          ],
        },
      ],
    },
  ],
  ctaTitle: "Descubre Tus Fortalezas Conductuales en Salud Comunitaria",
  ctaDescription:
    "Toma la Evaluaci\u00f3n de Perspectivas de Carrera como parte del constructor de curr\u00edculum gratuito de FQHC. En menos de 10 minutos, comprender\u00e1s tus fortalezas, tus \u00e1reas de crecimiento y el paso m\u00e1s impactante que puedes tomar para avanzar en tu carrera.",
  ctaButtonText: "Crea Tu CV Gratis",
  relatedArticles: [
    {
      href: "/blog/how-to-write-fqhc-resume",
      title: "C\u00f3mo Escribir un Curr\u00edculum de FQHC que Destaque",
    },
    {
      href: "/blog/top-10-fqhc-interview-questions",
      title: "Las 10 Preguntas M\u00e1s Comunes en Entrevistas de FQHC y C\u00f3mo Responderlas",
    },
  ],
};

export default function FqhcCareerInsightsAssessmentArticle() {
  const locale = useLocale();
  const content = locale === "es" ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title={content.title}
        description={content.description}
        datePublished={content.datePublished}
        slug="fqhc-career-insights-assessment"
      />
      <BreadcrumbJsonLd
        items={[
          { name: locale === "es" ? "Inicio" : "Home", url: "https://fqhctalent.com" },
          { name: "Blog", url: "https://fqhctalent.com/blog" },
          {
            name: content.breadcrumbTitle,
            url: "https://fqhctalent.com/blog/fqhc-career-insights-assessment",
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
            →{" "}
            <Link href="/blog" className="hover:text-stone-700">
              Blog
            </Link>{" "}
            → {content.breadcrumbTitle}
          </nav>

          {/* Header */}
          <header className="mb-12">
            <p className="text-teal-700 font-semibold mb-3">
              {content.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              {content.title}
            </h1>
            <div className="flex items-center gap-4 text-stone-500">
              <time dateTime={content.datePublished}>{content.dateDisplay}</time>
              <span>·</span>
              <span>{content.readTime}</span>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed">
              {content.openingParagraph}
            </p>

            {content.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
                  {section.heading}
                </h2>
                {section.content.map((item, itemIdx) => {
                  if (item.type === "paragraph") {
                    return (
                      <p key={itemIdx} className="text-stone-700 leading-relaxed">
                        {item.text}
                      </p>
                    );
                  } else if (item.type === "list") {
                    return (
                      <ul key={itemIdx} className="text-stone-700 leading-relaxed space-y-2">
                        {item.items?.map((listItem, listIdx) => (
                          <li key={listIdx}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  } else if (item.type === "box") {
                    return (
                      <div key={itemIdx} className="bg-teal-50 border border-teal-200 rounded-lg p-6 my-6">
                        <p className="text-stone-700 leading-relaxed">{item.text}</p>
                      </div>
                    );
                  }
                  return null;
                })}
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
            <a
              href="/resume-builder"
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-800 transition-colors"
            >
              {content.ctaButtonText}
            </a>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-stone-900 mb-6">
              {locale === "es" ? "Art\u00edculos Relacionados" : "Related Articles"}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content.relatedArticles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.href}
                  className="bg-stone-50 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <p className="text-sm text-teal-700 mb-2">{content.category}</p>
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
