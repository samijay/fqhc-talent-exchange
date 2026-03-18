// Research Syllabus Content — Expert-curated lesson narratives, quotes, and insights
// for the 4 curriculum tracks in the Academic Research Archive
// Each lesson wraps a ResearchEntry with contextual narrative + primary source quotes

import type { SyllabusLesson, CurriculumTrack } from "./fqhc-research-archive"

// ── TRACK 1: CLINICIAN — PRIMARY CARE FOUNDATIONS ────────

const clinicianFoundationalLessons: SyllabusLesson[] = [
  {
    entryId: "starfield-primary-care-1994",
    narrative: {
      en: "In 1994, Barbara Starfield — a pediatrician and health services researcher at Johns Hopkins — published what would become the most cited work in primary care research. Her book established four pillars that define effective primary care: first contact (being the entry point to the health system), longitudinality (an ongoing relationship over time), comprehensiveness (handling the majority of health needs), and coordination (connecting patients to specialists and community resources when needed).\n\nStarfield's framework wasn't theoretical. She analyzed health systems across 18 countries and demonstrated that nations with stronger primary care infrastructure had lower all-cause mortality, lower infant death rates, and smaller health disparities — all at lower total cost. The implications were profound: investing in comprehensive primary care produces better outcomes than investing in specialty care.\n\nFor FQHC clinicians, this work is the intellectual bedrock of everything you do. When you manage a panel of patients with diabetes, hypertension, and depression simultaneously — rather than referring each condition to a specialist — you're practicing Starfield's model. The FQHC model, with its comprehensive services under one roof, is the purest expression of what Starfield proved works.",
      es: "En 1994, Barbara Starfield — pediatra e investigadora en Johns Hopkins — publicó lo que se convertiría en el trabajo más citado en investigación de atención primaria. Su libro estableció cuatro pilares: primer contacto, longitudinalidad, integralidad y coordinación.\n\nStarfield analizó sistemas de salud en 18 países y demostró que las naciones con atención primaria más fuerte tenían menor mortalidad y menos disparidades en salud — todo a menor costo.\n\nPara clínicos de FQHCs, este trabajo es la base de todo lo que hacen. El modelo FQHC es la expresión más pura de lo que Starfield demostró que funciona."
    },
    keyInsight: {
      en: "Primary care is not \"basic\" care — it is the most complex and impactful form of healthcare delivery, and FQHCs are its purest expression.",
      es: "La atención primaria no es cuidado \"básico\" — es la forma más compleja e impactante de atención médica, y los FQHCs son su expresión más pura."
    },
    quotes: [
      {
        text: {
          en: "The evidence is overwhelming that countries with the strongest primary care systems have better population health outcomes at lower costs, with less inequality in health across socioeconomic groups.",
          es: "La evidencia es abrumadora de que los países con los sistemas de atención primaria más fuertes tienen mejores resultados de salud a menor costo, con menos desigualdad."
        },
        attribution: "— Barbara Starfield, Primary Care: Balancing Health Needs, Services, and Technology, 1994"
      }
    ],
    transitionNote: {
      en: "Starfield gave us the theory. Next, we'll meet the physician who put it into practice in the most unlikely of places — turning the theory of community health into reality during the civil rights movement.",
      es: "Starfield nos dio la teoría. A continuación, conoceremos al médico que la puso en práctica en los lugares más improbables — convirtiendo la teoría en realidad durante el movimiento de derechos civiles."
    },
    readingMinutes: 5,
  },
  {
    entryId: "geiger-first-chcs-2005",
    narrative: {
      en: "H. Jack Geiger was a medical student at Case Western Reserve when he spent time at a community health center in South Africa — a clinic that treated poverty itself as a cause of illness. Inspired, he returned to the US and in 1965, with funding from the Office of Economic Opportunity (the agency behind the War on Poverty), he opened the first two community health centers in the nation: one in Mound Bayou, Mississippi, and one in Columbia Point, Boston.\n\nThe Mound Bayou clinic was revolutionary. In a county where Black sharecroppers had no access to healthcare, Geiger didn't just treat disease — he prescribed food through the clinic's pharmacy (writing prescriptions for groceries that the clinic budget covered), organized community members to dig wells for clean water, and trained local residents as health workers. When questioned about prescribing food, Geiger replied: \"The last time I checked my textbook, the treatment for malnutrition was food.\"\n\nThis model — treating the social determinants of health as medical interventions — is the DNA of every FQHC operating today. When your clinic screens for food insecurity, connects patients to housing resources, or employs CHWs from the community, you're practicing Geiger's 1965 vision.",
      es: "H. Jack Geiger era estudiante de medicina cuando visitó un centro de salud comunitario en Sudáfrica que trataba la pobreza como causa de enfermedad. En 1965, abrió los primeros centros en EE.UU.: Mound Bayou, Mississippi y Columbia Point, Boston.\n\nEl centro de Mound Bayou fue revolucionario. Geiger prescribía comida a través de la farmacia y organizó pozos de agua limpia. Cuando lo cuestionaron, respondió: \"La última vez que revisé mi libro de texto, el tratamiento para la desnutrición era comida.\"\n\nEste modelo — tratar los determinantes sociales como intervenciones médicas — es el ADN de cada FQHC hoy."
    },
    keyInsight: {
      en: "FQHCs were born from the civil rights movement, not from healthcare reform. Their mission to treat poverty as a cause of illness — not just its consequence — remains radical and relevant 60 years later.",
      es: "Los FQHCs nacieron del movimiento de derechos civiles. Su misión de tratar la pobreza como causa de enfermedad sigue siendo radical y relevante 60 años después."
    },
    quotes: [
      {
        text: {
          en: "The last time I checked my textbook, the treatment for malnutrition was food.",
          es: "La última vez que revisé mi libro de texto, el tratamiento para la desnutrición era comida."
        },
        attribution: "— H. Jack Geiger, MD, founder of the first US community health centers, 1967"
      }
    ],
    transitionNote: {
      en: "Geiger proved the model worked on the ground. Next, we'll see how the Institute of Medicine formalized the definition of primary care that HRSA now uses to designate every FQHC in the country.",
      es: "Geiger demostró que el modelo funcionaba. A continuación, veremos cómo el IOM formalizó la definición que HRSA usa para designar cada FQHC."
    },
    readingMinutes: 5,
  },
  {
    entryId: "institute-medicine-primary-care-1996",
    narrative: {
      en: "In 1996, the Institute of Medicine published a landmark report that gave the United States its official definition of primary care: \"the provision of integrated, accessible health care services by clinicians who are accountable for addressing a large majority of personal health care needs, developing a sustained partnership with patients, and practicing in the context of family and community.\" This definition became the standard that HRSA uses to designate FQHCs.\n\nThe IOM report went beyond definition. It argued that the US was over-investing in specialty care at the expense of primary care — a pattern that drove up costs without improving population health. The committee called for medical education reform, payment restructuring, and infrastructure investment in community-based primary care.\n\nFor FQHC clinicians, every word of this definition matters operationally. \"Integrated\" means you treat the whole person. \"Accessible\" means sliding fee scales and open doors. \"Sustained partnership\" means longitudinal relationships. \"Family and community\" means CHWs and community health workers are part of the care team, not afterthoughts.",
      es: "En 1996, el IOM publicó un informe que dio a EE.UU. su definición oficial de atención primaria: servicios integrados, accesibles, con asociación sostenida con pacientes, en el contexto de familia y comunidad. Esta definición es la que HRSA usa para designar FQHCs.\n\nEl informe argumentó que EE.UU. sobre-invertía en especialidades a expensas de la atención primaria. Para clínicos de FQHCs, cada palabra de esta definición importa operacionalmente."
    },
    keyInsight: {
      en: "The IOM definition of primary care is not abstract — it is the legal and operational standard that makes your FQHC an FQHC. Understanding it explains your sliding fee scale, your open-door policy, and why community health workers are on your team.",
      es: "La definición del IOM no es abstracta — es el estándar legal que hace que tu FQHC sea un FQHC."
    },
    quotes: [
      {
        text: {
          en: "Primary care is the provision of integrated, accessible health care services by clinicians who are accountable for addressing a large majority of personal health care needs, developing a sustained partnership with patients, and practicing in the context of family and community.",
          es: "La atención primaria es la provisión de servicios integrados y accesibles por clínicos responsables de abordar la mayoría de necesidades de salud, desarrollando una asociación sostenida con pacientes en el contexto de familia y comunidad."
        },
        attribution: "— Institute of Medicine, Primary Care: America's Health in a New Era, 1996"
      }
    ],
    transitionNote: {
      en: "With the definition established, the next question was: how do you actually organize care delivery within a primary care practice? Edward Wagner's Chronic Care Model answered that question — and it shapes every FQHC workflow you use today.",
      es: "Con la definición establecida, la siguiente pregunta fue: ¿cómo organizas la atención? El Modelo de Cuidado Crónico de Wagner respondió esa pregunta."
    },
    readingMinutes: 4,
  },
  {
    entryId: "wagner-chronic-care-model-2001",
    narrative: {
      en: "Edward Wagner noticed a fundamental problem in primary care: clinics were designed for acute illness (sore throats, infections) but their patients increasingly had chronic diseases (diabetes, hypertension, depression) that required ongoing management. The traditional 15-minute visit model couldn't handle this reality.\n\nHis response was the Chronic Care Model (CCM) — a framework of six interacting system changes: self-management support (helping patients manage their own conditions), clinical information systems (EHR-based registries and reminders), delivery system redesign (team-based care with defined roles), decision support (evidence-based protocols), health care organization (leadership commitment), and community resources (connecting patients to external support).\n\nThe CCM is the intellectual backbone of every modern FQHC care team. When your MA does a medication reconciliation, your CHW follows up on missed appointments, your RN runs the diabetes group visit, and your provider reviews the panel report — that's Wagner's model in action. It's why FQHCs don't just have doctors; they have teams.",
      es: "Edward Wagner notó un problema fundamental: las clínicas estaban diseñadas para enfermedades agudas pero sus pacientes tenían enfermedades crónicas. Su Modelo de Cuidado Crónico (CCM) propuso 6 cambios: autogestión, sistemas de información, rediseño de equipos, soporte de decisiones, organización y recursos comunitarios.\n\nEl CCM es la columna vertebral de cada equipo de FQHC moderno. Cuando tu AM hace reconciliación de medicamentos y tu TSC sigue pacientes — eso es el modelo de Wagner."
    },
    keyInsight: {
      en: "Your role on the FQHC care team — whether MA, CHW, RN, or provider — exists because of Wagner's insight that chronic disease requires a system, not just a clinician.",
      es: "Tu rol en el equipo de FQHC existe gracias a la idea de Wagner de que la enfermedad crónica requiere un sistema, no solo un clínico."
    },
    quotes: [
      {
        text: {
          en: "Improving chronic illness care requires transforming a system that is essentially reactive — responding mainly when a person is sick — to one that is proactive and focused on keeping a person as healthy as possible.",
          es: "Mejorar la atención de enfermedades crónicas requiere transformar un sistema esencialmente reactivo en uno proactivo enfocado en mantener a la persona lo más sana posible."
        },
        attribution: "— Edward Wagner, Improving Chronic Illness Care, Health Affairs, 2001"
      }
    ],
    transitionNote: {
      en: "Wagner gave us the system for organizing care. But what about the patients who carry invisible wounds that affect every health outcome? SAMHSA's trauma-informed care framework addresses what no chronic disease protocol can.",
      es: "Wagner nos dio el sistema. ¿Pero qué pasa con los pacientes que cargan heridas invisibles? El marco de SAMHSA aborda lo que ningún protocolo puede."
    },
    readingMinutes: 5,
  },
  {
    entryId: "substance-abuse-tic-guide-2014",
    narrative: {
      en: "In 2014, SAMHSA published a framework that would quietly transform how safety-net organizations interact with patients. The Trauma-Informed Care (TIC) framework starts with a simple recognition: most people seeking care at FQHCs have experienced trauma — poverty, immigration, violence, racism, childhood adversity — and this trauma affects their health, their behavior, and their ability to engage with the healthcare system.\n\nSAMHSA defined six principles: safety (physical and psychological), trustworthiness and transparency, peer support, collaboration and mutuality, empowerment and choice, and attention to cultural, historical, and gender issues. Critically, TIC is not a program or a treatment — it's an organizational approach that should shape every interaction, from how the front desk greets patients to how providers ask sensitive questions.\n\nFor FQHC clinicians, this means understanding that the patient who misses appointments may be avoiding a trigger, the one who seems \"non-compliant\" may have a survival strategy that conflicts with medical advice, and the patient who struggles to trust may have learned that trust is dangerous. TIC doesn't excuse harmful behavior — it contextualizes it, so you can respond effectively rather than reactively.",
      es: "En 2014, SAMHSA publicó un marco que transformaría cómo las organizaciones interactúan con pacientes. El cuidado informado por trauma reconoce que la mayoría de pacientes de FQHCs han experimentado trauma que afecta su salud y comportamiento.\n\nSeis principios: seguridad, confianza, apoyo entre pares, colaboración, empoderamiento y atención cultural. Para clínicos, esto significa entender que el paciente que falta a citas puede estar evitando un disparador."
    },
    keyInsight: {
      en: "Trauma-informed care is not a program — it's a lens. Every patient interaction, from the waiting room to the exam room, is an opportunity to either re-traumatize or begin healing.",
      es: "El cuidado informado por trauma no es un programa — es un lente. Cada interacción es una oportunidad de re-traumatizar o comenzar a sanar."
    },
    quotes: [
      {
        text: {
          en: "A program, organization, or system that is trauma-informed realizes the widespread impact of trauma and understands potential paths for recovery; recognizes the signs and symptoms of trauma in clients, families, staff, and others; and responds by fully integrating knowledge about trauma into policies, procedures, and practices.",
          es: "Una organización informada por trauma comprende el impacto del trauma, reconoce sus signos en clientes y personal, y responde integrando ese conocimiento en políticas y prácticas."
        },
        attribution: "— SAMHSA, Concept of Trauma and Guidance for a Trauma-Informed Approach, 2014"
      }
    ],
    transitionNote: {
      en: "You've now completed the foundational level. You understand the four pillars of primary care, the civil rights origins of FQHCs, the legal definition that shapes your organization, the system model for chronic disease, and the trauma lens for patient interaction. Next: the clinical evidence that proves these models work.",
      es: "Has completado el nivel fundamental. Entiendes los pilares, los orígenes, la definición, el modelo de sistemas y el lente de trauma. Siguiente: la evidencia clínica."
    },
    readingMinutes: 5,
  },
]

const clinicianIntermediateLessons: SyllabusLesson[] = [
  {
    entryId: "starfield-primary-care-specialty-2005",
    narrative: {
      en: "A decade after her foundational book, Starfield and colleagues published the definitive systematic review in the Milbank Quarterly, synthesizing evidence from 18 countries. The findings were staggering: each additional primary care physician per 10,000 population was associated with a 5.3% reduction in all-cause mortality. Countries with strong primary care had 3-5% lower mortality rates, even after controlling for income, education, and lifestyle factors.\n\nThe review also found that primary care's impact on health equity was as powerful as its impact on outcomes. Areas with better primary care supply had smaller disparities in health outcomes between rich and poor, between racial groups, and between urban and rural populations. This wasn't because primary care clinicians were better doctors — it was because the primary care model (continuity, coordination, comprehensiveness) naturally reduces the barriers that create disparities.",
      es: "Una década después, Starfield publicó la revisión sistemática definitiva en Milbank Quarterly: cada médico de atención primaria adicional por 10,000 se asoció con 5.3% menos mortalidad. Los países con atención primaria fuerte tenían 3-5% menos mortalidad y menores disparidades."
    },
    keyInsight: {
      en: "Each additional primary care physician per 10,000 population reduces mortality by 5.3%. This single statistic is why FQHC funding matters — it's not charity, it's the most efficient way to save lives.",
      es: "Cada médico de AP adicional por 10,000 reduce la mortalidad 5.3%. Esta estadística es por qué importa el financiamiento de FQHCs."
    },
    quotes: [
      {
        text: {
          en: "Primary care is the only component of health care systems consistently associated with better population health, more equitable distribution of health, and lower health care costs.",
          es: "La atención primaria es el único componente de los sistemas de salud consistentemente asociado con mejor salud poblacional, distribución más equitativa y menores costos."
        },
        attribution: "— Starfield, Shi, Macinko, Milbank Quarterly, 2005"
      }
    ],
    transitionNote: {
      en: "Starfield proved primary care works at the population level. But what about the most common mental health condition your patients face? Jürgen Unützer's IMPACT trial revolutionized how primary care treats depression — and it's why your FQHC has a co-located LCSW.",
      es: "Starfield demostró que la AP funciona a nivel poblacional. El ensayo IMPACT de Unützer revolucionó cómo la AP trata la depresión."
    },
    readingMinutes: 4,
  },
  {
    entryId: "unuetzer-collaborative-care-2002",
    narrative: {
      en: "Before the IMPACT trial, depression in primary care was a black hole — recognized in only half of cases, and even when recognized, treated effectively in fewer than a quarter. Jürgen Unützer's team at the University of Washington asked: what if depression treatment in primary care looked like chronic disease management instead of a simple prescription?\n\nThey enrolled 1,801 older adults with depression across 18 primary care clinics and randomly assigned them to usual care or collaborative care. The collaborative care model added two roles: a depression care manager (often an RN or social worker) who tracked symptoms and adjusted care plans, and a consulting psychiatrist who reviewed cases weekly but rarely saw patients directly. The results were transformative: 50% of collaborative care patients achieved meaningful improvement versus 19% in usual care. Effects lasted through 12-month follow-up.\n\nThis trial is the reason your FQHC has behavioral health integrated into primary care. The IMPACT model spawned the Collaborative Care Model (CoCM) billing codes, and it's the evidence base behind CalAIM's behavioral health integration requirements.",
      es: "Antes de IMPACT, la depresión en AP se reconocía en solo la mitad de casos. Unützer preguntó: ¿qué si el tratamiento de depresión se pareciera al manejo de enfermedades crónicas? 1,801 adultos mayores: 50% mejoraron con cuidado colaborativo vs 19% con cuidado usual.\n\nEste ensayo es la razón por la que tu FQHC tiene salud conductual integrada."
    },
    keyInsight: {
      en: "You don't need a psychiatrist in every clinic to treat depression effectively. A care manager tracking symptoms + a psychiatrist reviewing cases remotely = 2.5x better outcomes than usual care.",
      es: "No necesitas un psiquiatra en cada clínica. Un gestor de cuidado + un psiquiatra revisando casos remotamente = 2.5x mejores resultados."
    },
    quotes: [
      {
        text: {
          en: "In our study, adding a depression care manager and a consulting psychiatrist to the primary care team more than doubled the effectiveness of depression treatment, and these gains were maintained over 12 months.",
          es: "Agregar un gestor de depresión y un psiquiatra consultor al equipo de AP más que duplicó la efectividad del tratamiento, manteniéndose por 12 meses."
        },
        attribution: "— Jürgen Unützer, JAMA, 2002"
      }
    ],
    transitionNote: {
      en: "IMPACT showed that team-based care transforms mental health outcomes. But does the broader PCMH model — team-based care for everything — actually improve outcomes? The evidence is more nuanced than you might expect.",
      es: "IMPACT mostró que el cuidado en equipo transforma resultados de salud mental. ¿Pero el modelo PCMH más amplio realmente mejora resultados?"
    },
    readingMinutes: 5,
  },
  {
    entryId: "jackson-pcmh-systematic-review-2013",
    narrative: {
      en: "The Patient-Centered Medical Home became the dominant primary care reform model in the 2010s, with NCQA recognizing thousands of practices. But did it actually work? This AHRQ-funded systematic review of 19 comparative studies found: small-to-moderate improvements in preventive care delivery and patient experience, but mixed results on cost and utilization.\n\nThe honest finding was that implementation fidelity varied wildly. Practices that fully transformed — hiring care coordinators, implementing team-based workflows, using population health registries — saw meaningful improvements. Those that treated PCMH as a paperwork exercise (\"check the boxes for NCQA\") saw little change.\n\nFor FQHC clinicians, the lesson is that PCMH recognition is valuable (it unlocks PMPM payments from many payers) but only if you actually practice the model. The evidence supports investing in care coordination staff, huddles, and panel management — not just earning a plaque.",
      es: "La revisión de AHRQ encontró mejoras moderadas en prevención y experiencia del paciente, pero resultados mixtos en costos. Las prácticas que realmente se transformaron vieron mejoras; las que solo completaron formularios no.\n\nPara clínicos de FQHCs: el reconocimiento PCMH es valioso pero solo si practicas el modelo."
    },
    keyInsight: {
      en: "PCMH is not a certificate — it's a practice transformation. The evidence supports the investment, but only for organizations willing to genuinely change how they deliver care.",
      es: "PCMH no es un certificado — es una transformación de práctica. La evidencia apoya la inversión, pero solo para organizaciones dispuestas a cambiar genuinamente."
    },
    quotes: [
      {
        text: {
          en: "The evidence suggests that PCMH transformation is associated with improvements in preventive care delivery and patient experience, though effects on cost and utilization are less consistent and likely depend on the extent of implementation.",
          es: "La evidencia sugiere que la transformación PCMH se asocia con mejoras en prevención y experiencia, aunque los efectos en costos dependen del grado de implementación."
        },
        attribution: "— Jackson et al., Journal of General Internal Medicine, 2013"
      }
    ],
    transitionNote: {
      en: "PCMH gave us the transformation framework. Now let's look at the clinical outcomes — do FQHCs actually deliver quality care for chronic disease? The diabetes evidence may surprise you.",
      es: "PCMH nos dio el marco de transformación. Veamos los resultados clínicos — ¿los FQHCs realmente brindan calidad en enfermedades crónicas?"
    },
    readingMinutes: 4,
  },
  {
    entryId: "shi-fqhc-diabetes-outcomes-2012",
    narrative: {
      en: "This Johns Hopkins study asked a question that FQHC critics assume they know the answer to: do FQHCs provide good care? Comparing diabetes outcomes between FQHCs and non-FQHC practices, the researchers found that FQHCs achieved comparable HbA1c control despite serving poorer, sicker patients with fewer resources. Even more striking: FQHC patients had better completion rates for preventive care (foot exams, eye exams, lipid panels) than patients at non-FQHC practices.\n\nThe finding challenged the narrative that safety-net care is inferior care. FQHCs weren't just matching quality benchmarks — they were exceeding them on preventive measures, likely because their comprehensive care model (everything under one roof) and their CHW/outreach programs ensured patients actually received recommended screenings.",
      es: "Este estudio de Johns Hopkins preguntó: ¿los FQHCs brindan buena atención? Comparando resultados de diabetes, los FQHCs lograron control de HbA1c comparable a pesar de servir pacientes más enfermos. Los pacientes de FQHCs tuvieron mejores tasas de cuidado preventivo."
    },
    keyInsight: {
      en: "FQHCs don't just provide care to the underserved — they provide quality care. Comparable outcomes with sicker patients and fewer resources is not parity; it's excellence.",
      es: "Los FQHCs no solo proveen cuidado a poblaciones desatendidas — proveen cuidado de calidad. Resultados comparables con pacientes más enfermos es excelencia."
    },
    quotes: [
      {
        text: {
          en: "Health centers achieved comparable quality of care for diabetes despite serving populations with significantly greater socioeconomic disadvantage, suggesting that the health center model effectively mitigates the negative effects of poverty on care quality.",
          es: "Los centros de salud lograron calidad comparable para diabetes a pesar de servir poblaciones con mayor desventaja socioeconómica."
        },
        attribution: "— Shi, Tsai, Higgins, Public Health Reports, 2012"
      }
    ],
    transitionNote: {
      en: "Diabetes is just one chronic disease. Next, we'll see how team-based hypertension management — with MAs, pharmacists, CHWs, and providers each playing defined roles — drove dramatic improvement in blood pressure control.",
      es: "La diabetes es solo una enfermedad crónica. Veamos cómo el manejo de hipertensión en equipo generó mejoras dramáticas."
    },
    readingMinutes: 4,
  },
  {
    entryId: "peek-fqhc-hypertension-control-2019",
    narrative: {
      en: "Hypertension control is the single most important UDS clinical quality measure for FQHCs — and one of the hardest to improve. This multi-site trial showed that the answer isn't better medications or more provider visits; it's better teamwork. The intervention assigned specific roles: MAs conducted blood pressure checks at every visit using standardized protocols, pharmacists reviewed medications for optimization opportunities, CHWs provided lifestyle coaching and appointment reminders, and providers followed evidence-based titration protocols.\n\nThe results: blood pressure control rates jumped from 48% to 67% in 12 months, at a cost of just $14 per mmHg reduction — making it one of the most cost-effective chronic disease interventions ever studied in primary care. The key insight was that most of the improvement came from consistent measurement and follow-up by non-provider team members, not from provider visits themselves.",
      es: "El control de hipertensión es la medida UDS más importante. Este ensayo demostró que la respuesta no es mejores medicamentos sino mejor trabajo en equipo. AM, farmacéuticos, TSC y proveedores con roles definidos: control saltó de 48% a 67% en 12 meses, a solo $14 por mmHg."
    },
    keyInsight: {
      en: "Most hypertension improvement comes from consistent measurement and follow-up by MAs and CHWs — not from provider visits. Team-based care isn't just a philosophy; it's the most cost-effective clinical intervention.",
      es: "La mayoría de la mejora viene de medición consistente por AM y TSC. El cuidado en equipo no es filosofía; es la intervención más costo-efectiva."
    },
    quotes: [
      {
        text: {
          en: "The greatest gains in blood pressure control came not from changes in prescribing, but from systematic team-based measurement, follow-up, and patient engagement between provider visits.",
          es: "Las mayores ganancias en control de presión arterial no vinieron de cambios en prescripción, sino de medición sistemática y seguimiento entre visitas."
        },
        attribution: "— Peek, Chin et al., Hypertension, 2019"
      }
    ],
    transitionNote: {
      en: "Team-based care works for chronic disease. But California has built an entirely new care coordination infrastructure — Enhanced Care Management under CalAIM — that takes this model to a new level. Let's understand the policy that's reshaping CA FQHC operations right now.",
      es: "El cuidado en equipo funciona. Pero California ha construido una nueva infraestructura — ECM bajo CalAIM — que lleva este modelo a otro nivel."
    },
    readingMinutes: 4,
  },
  {
    entryId: "dhcs-calaims-ecm-2022",
    narrative: {
      en: "Enhanced Care Management (ECM) is CalAIM's flagship care coordination program, and it represents the single largest new revenue opportunity for CA FQHCs in 2024-2026. ECM targets Medi-Cal's highest-need beneficiaries — people experiencing homelessness, individuals with serious mental illness, high utilizers of emergency services, and those transitioning from incarceration.\n\nThe ECM model requires dedicated care teams (typically a CHW or care coordinator paired with clinical oversight) who develop individualized care plans, coordinate across medical, behavioral health, and social services, and maintain regular contact with enrolled members. FQHCs bill monthly PMPM rates for ECM services, creating a predictable revenue stream that doesn't depend on face-to-face visits.\n\nUnderstanding this policy is essential because it's changing the FQHC business model. Traditional PPS pays per visit — incentivizing volume. ECM pays per member per month — incentivizing outcomes and engagement. It's the bridge between fee-for-service and value-based care.",
      es: "ECM es el programa estrella de CalAIM y la mayor oportunidad de ingresos para FQHCs de CA. Dirigido a los beneficiarios de Medi-Cal con mayores necesidades, ECM paga por miembro por mes — creando ingresos predecibles que no dependen de visitas presenciales.\n\nECM está cambiando el modelo de negocio de FQHCs: de pago por visita a pago por resultados."
    },
    keyInsight: {
      en: "ECM is not just a program — it's a preview of the FQHC future. Monthly per-member payments for care coordination reward outcomes and engagement, not just visit volume.",
      es: "ECM no es solo un programa — es una vista previa del futuro de los FQHCs."
    },
    quotes: [
      {
        text: {
          en: "ECM provides comprehensive, whole-person care coordination for Medi-Cal members with the most complex medical and social needs, addressing the full spectrum of clinical and non-clinical factors that affect health outcomes.",
          es: "ECM proporciona coordinación integral para miembros de Medi-Cal con las necesidades más complejas, abordando factores clínicos y no clínicos."
        },
        attribution: "— DHCS, Enhanced Care Management Policy Guide, 2022"
      }
    ],
    transitionNote: {
      en: "You've now completed the intermediate level — clinical evidence showing what works in FQHC practice, from collaborative care for depression to team-based hypertension management to CalAIM ECM. Next: the innovations that are changing FQHC practice right now.",
      es: "Has completado el nivel intermedio. Siguiente: las innovaciones que están cambiando la práctica de FQHCs ahora."
    },
    readingMinutes: 5,
  },
]

const clinicianAdvancedLessons: SyllabusLesson[] = [
  {
    entryId: "lin-ambient-ai-documentation-2024",
    narrative: {
      en: "Ambient AI documentation is the hottest technology trend in FQHC care delivery — and it comes with both enormous promise and real risks. This Stanford study evaluated DAX Copilot (an ambient AI scribe) in primary care and found that it reduced documentation time by 40% and improved note completeness. For FQHC clinicians drowning in documentation burden, this felt like a lifeline.\n\nBut the study also raised critical concerns. The AI system showed a tendency toward HCC (Hierarchical Condition Category) and wRVU upcoding — essentially documenting conditions more aggressively than the clinician intended, which can inflate billing codes. The researchers also documented instances of \"hallucinated\" clinical details — findings or symptoms that appeared in the AI-generated note but were never discussed in the visit.\n\nFor FQHC clinicians, the key distinction is that FQHCs bill PPS (a flat per-visit rate), not fee-for-service. This means the upcoding risk is different — you don't get paid more for higher HCC scores per visit. But accuracy still matters for quality reporting, risk adjustment, and patient safety.",
      es: "La documentación ambiental con IA es la tendencia más fuerte en FQHCs. El estudio de Stanford encontró 40% menos tiempo de documentación pero también riesgos: codificación excesiva y detalles clínicos \"alucinados\" por la IA.\n\nPara FQHCs, la distinción clave es que facturan PPS (tarifa plana), no servicio por servicio. Pero la precisión importa para calidad y seguridad."
    },
    keyInsight: {
      en: "AI scribes save time but require verification. FQHCs' PPS billing reduces upcoding financial risk, but clinicians must still review every AI-generated note for accuracy — hallucinated clinical details are a patient safety issue.",
      es: "Los escribas IA ahorran tiempo pero requieren verificación. Los detalles clínicos alucinados son un problema de seguridad del paciente."
    },
    quotes: [
      {
        text: {
          en: "While ambient AI documentation consistently reduced clinician documentation burden, it also introduced new risks including documentation of undiscussed findings and systematic upcoding of condition severity.",
          es: "Aunque la documentación ambiental redujo la carga, también introdujo riesgos como documentación de hallazgos no discutidos y codificación excesiva."
        },
        attribution: "— Lin et al., NEJM AI, 2024"
      }
    ],
    transitionNote: {
      en: "Understanding the risks is essential. But which AI scribe is actually being adopted by FQHCs? AltaMed — the largest FQHC in the nation — chose Abridge, and their deployment tells us where the field is heading.",
      es: "¿Cuál IA están adoptando los FQHCs? AltaMed eligió Abridge, y su implementación nos dice hacia dónde va el sector."
    },
    readingMinutes: 5,
  },
  {
    entryId: "abridge-best-in-klas-2026",
    narrative: {
      en: "Abridge won Best in KLAS 2026 for ambient AI, and its adoption by AltaMed — the largest FQHC in the United States — represents the most significant AI deployment in FQHC history. AltaMed rolled Abridge out across 60+ sites, covering 500,000+ patients in 28 languages. The multilingual capability is what sets it apart for FQHCs: in a health system where 60%+ of patients speak Spanish and many speak Vietnamese, Mandarin, or other languages, English-only AI tools are non-starters.\n\nThe deployment data is promising: provider burnout dropped from 51.9% to 38.8% in a health system study, and Abridge integrates natively with Epic (the dominant FQHC EHR via OCHIN). But this is still early — long-term quality and safety data are limited.",
      es: "Abridge ganó Best in KLAS 2026 y su adopción por AltaMed — el FQHC más grande de EE.UU. — es la implementación de IA más significativa. 60+ sitios, 500K+ pacientes, 28 idiomas. El burnout de proveedores bajó de 51.9% a 38.8%."
    },
    keyInsight: {
      en: "Multilingual AI is the table stakes for FQHCs. An AI scribe that only works in English excludes the majority of FQHC patients. Abridge's 28-language support is why it's winning in the safety net.",
      es: "La IA multilingüe es requisito mínimo para FQHCs. Un escriba que solo funciona en inglés excluye a la mayoría de pacientes."
    },
    quotes: [
      {
        text: {
          en: "AltaMed's deployment of Abridge across 60+ sites and 28 languages represents the largest-scale AI implementation in a community health center, demonstrating that ambient AI can work for multilingual safety-net populations.",
          es: "La implementación de AltaMed en 60+ sitios y 28 idiomas representa la mayor implementación de IA en un centro de salud comunitario."
        },
        attribution: "— KLAS Research, Best in KLAS Rankings, 2026"
      }
    ],
    transitionNote: {
      en: "AI is one innovation frontier. Another is the future of behavioral health funding — CCBHCs offer a fundamentally different payment model that could transform how FQHCs deliver mental health and substance use services.",
      es: "La IA es una frontera de innovación. Otra es el futuro del financiamiento de salud conductual — los CCBHCs ofrecen un modelo de pago diferente."
    },
    readingMinutes: 3,
  },
  {
    entryId: "samhsa-ccbhc-certification-2024",
    narrative: {
      en: "Certified Community Behavioral Health Clinics (CCBHCs) represent potentially the most important new federal designation for FQHCs since Section 330 itself. The CCBHC model requires 24/7 crisis services, nine core evidence-based practices, integrated care coordination, and robust quality reporting — but in exchange, it provides PPS-like cost-based reimbursement for all behavioral health services, regardless of payer.\n\nFor FQHCs, CCBHC certification means you can finally get adequately reimbursed for the behavioral health services you're already providing (or struggling to fund). Over 500 organizations have earned CCBHC designation nationally, and the model is expanding. The Bipartisan Safer Communities Act of 2022 created new CCBHC grant opportunities, and several states now include CCBHCs in their Medicaid state plans.\n\nThe strategic question for FQHC leaders: should you pursue CCBHC designation? If behavioral health demand is growing (it is everywhere), and if your current BH services are under-reimbursed (they almost certainly are), CCBHC is the strongest revenue diversification strategy available.",
      es: "Los CCBHCs pueden ser la designación federal más importante para FQHCs desde la Sección 330. Requieren servicios de crisis 24/7 y prácticas basadas en evidencia, pero proporcionan reembolso basado en costos para todos los servicios de salud conductual.\n\nLa pregunta estratégica: ¿deberías buscar la designación CCBHC? Si la demanda de BH está creciendo y tus servicios están sub-reembolsados, CCBHC es la mejor estrategia de diversificación."
    },
    keyInsight: {
      en: "CCBHC = cost-based reimbursement for behavioral health, regardless of payer. It's the financial model that behavioral health integration has always needed.",
      es: "CCBHC = reembolso basado en costos para salud conductual. Es el modelo financiero que la integración de BH siempre necesitó."
    },
    quotes: [
      {
        text: {
          en: "CCBHCs are required to serve anyone who requests care regardless of ability to pay, provide the full range of services directly or through formal referral relationships, and maintain care coordination agreements with a range of community partners.",
          es: "Los CCBHCs deben servir a cualquiera sin importar capacidad de pago, proveer servicios completos y mantener acuerdos de coordinación con socios comunitarios."
        },
        attribution: "— SAMHSA, CCBHC Certification Criteria, 2024"
      }
    ],
    transitionNote: {
      en: "We've covered AI documentation and behavioral health funding innovation. Our final lesson examines telehealth equity — because the way FQHCs deliver virtual care is fundamentally different from how the rest of healthcare does it, and that difference matters.",
      es: "Hemos cubierto IA y financiamiento de BH. Nuestra última lección examina la equidad en telesalud."
    },
    readingMinutes: 5,
  },
  {
    entryId: "jacobs-telehealth-equity-fqhc-2021",
    narrative: {
      en: "When telehealth exploded during COVID-19, an uncomfortable truth emerged: the digital divide mapped almost perfectly onto the health equity divide. FQHC patients — disproportionately older, lower-income, and Spanish-speaking — often lacked the broadband connectivity, devices, and digital literacy needed for video visits. Many FQHCs responded by leaning into audio-only telehealth (phone visits), and this study validated that choice.\n\nThe multi-state analysis found that audio-only telehealth achieved equivalent clinical outcomes to video visits for both diabetes management (HbA1c changes) and depression treatment (PHQ-9 scores). Older adults, Spanish-speaking patients, and those without broadband overwhelmingly preferred phone visits — not because they were technophobic, but because phone calls were familiar, private, and didn't require a data plan.\n\nThe policy implication is enormous: California's Medi-Cal audio-only payment parity (paying the same rate for phone visits as video visits) is not a concession to inferior care — it's an evidence-based equity strategy. FQHCs that defend audio-only telehealth aren't settling for less; they're meeting patients where they are.",
      es: "Cuando la telesalud explotó durante COVID, surgió una verdad incómoda: la brecha digital coincidía con la brecha de equidad. Este estudio encontró que la telesalud solo audio logró resultados equivalentes a video para diabetes y depresión.\n\nLa paridad de pago de audio en Medi-Cal no es una concesión a cuidado inferior — es una estrategia de equidad basada en evidencia."
    },
    keyInsight: {
      en: "Audio-only telehealth is not second-class care — it's an equity strategy backed by clinical evidence. Defending phone visit reimbursement is defending patient access.",
      es: "La telesalud solo audio no es cuidado de segunda clase — es una estrategia de equidad respaldada por evidencia clínica."
    },
    quotes: [
      {
        text: {
          en: "Audio-only visits achieved equivalent clinical outcomes and higher patient satisfaction among older, lower-income, and Spanish-speaking patients — the populations FQHCs serve most.",
          es: "Las visitas solo audio lograron resultados clínicos equivalentes y mayor satisfacción entre pacientes mayores, de bajos ingresos y hispanohablantes."
        },
        attribution: "— Jacobs et al., Health Affairs, 2021"
      }
    ],
    transitionNote: {
      en: "Congratulations — you've completed the Clinician: Primary Care Foundations curriculum. From Starfield's theory to Geiger's civil rights origins, from Wagner's chronic care model to AI-assisted documentation, you now have the evidence base that shapes modern FQHC practice. These aren't just historical artifacts — they're the tools and frameworks you use every day.",
      es: "Felicitaciones — has completado el currículo de Clínico. Desde la teoría de Starfield hasta la documentación con IA, ahora tienes la base de evidencia que moldea la práctica moderna de FQHCs."
    },
    readingMinutes: 5,
  },
]

// ── TRACK 1 ASSEMBLED ────────────────────────────────────

export const CLINICIAN_TRACK: CurriculumTrack = {
  id: "clinician-primary-care",
  name: { en: "Clinician: Primary Care Foundations", es: "Clínico: Fundamentos de Atención Primaria" },
  audience: "clinician",
  description: { en: "Evidence-based curriculum for MDs, NPs, PAs, and RNs working in FQHCs — from Starfield's pillars to AI-assisted documentation.", es: "Currículo basado en evidencia para MDs, NPs, PAs y RNs en FQHCs — desde los pilares de Starfield hasta documentación asistida por IA." },
  levels: [
    {
      level: "foundational",
      label: { en: "Foundations of FQHC Care", es: "Fundamentos de Atención en FQHCs" },
      overview: { en: "Every FQHC clinician should understand these five foundational works. They explain why FQHCs exist, how primary care saves lives, how care teams are organized, and how trauma shapes patient encounters. This is the intellectual bedrock of your daily practice.", es: "Cada clínico de FQHC debe entender estas cinco obras fundamentales. Explican por qué existen los FQHCs, cómo la atención primaria salva vidas, y cómo el trauma moldea los encuentros con pacientes." },
      entryIds: ["starfield-primary-care-1994", "geiger-first-chcs-2005", "institute-medicine-primary-care-1996", "wagner-chronic-care-model-2001", "substance-abuse-tic-guide-2014"],
      lessons: clinicianFoundationalLessons,
    },
    {
      level: "intermediate",
      label: { en: "Clinical Evidence & Integration", es: "Evidencia Clínica e Integración" },
      overview: { en: "Now that you understand the foundations, let's examine the clinical evidence. These six studies and policy documents prove that the FQHC model works — from population-level mortality reduction to diabetes quality metrics to CalAIM's new care coordination infrastructure.", es: "Ahora que entiendes los fundamentos, examinemos la evidencia clínica. Estos estudios demuestran que el modelo FQHC funciona — desde reducción de mortalidad hasta métricas de calidad de diabetes." },
      entryIds: ["starfield-primary-care-specialty-2005", "unuetzer-collaborative-care-2002", "jackson-pcmh-systematic-review-2013", "shi-fqhc-diabetes-outcomes-2012", "peek-fqhc-hypertension-control-2019", "dhcs-calaims-ecm-2022"],
      lessons: clinicianIntermediateLessons,
    },
    {
      level: "advanced",
      label: { en: "Innovation & Emerging Practice", es: "Innovación y Práctica Emergente" },
      overview: { en: "The FQHC landscape is being reshaped by three forces: AI-assisted documentation, new behavioral health funding models, and telehealth equity. These four readings cover the innovations that will define FQHC practice over the next 5 years.", es: "El panorama de FQHCs está siendo remodelado por tres fuerzas: IA, nuevos modelos de financiamiento de salud conductual, y equidad en telesalud." },
      entryIds: ["lin-ambient-ai-documentation-2024", "abridge-best-in-klas-2026", "samhsa-ccbhc-certification-2024", "jacobs-telehealth-equity-fqhc-2021"],
      lessons: clinicianAdvancedLessons,
    },
  ],
}

// ── TRACK 2: NON-CLINICIAN — COMMUNITY HEALTH ESSENTIALS ─

const nonClinicianFoundationalLessons: SyllabusLesson[] = [
  {
    entryId: "geiger-first-chcs-2005",
    narrative: {
      en: "Before there were FQHCs, before there was Medicaid, before there was any organized safety net — there was a doctor named Jack Geiger who believed that poverty itself was a disease, and that a clinic could treat it. In 1965, he opened two community health centers: one in Mound Bayou, Mississippi (one of the poorest places in America) and one in Columbia Point, Boston (a public housing project). These were the first community health centers in the United States.\n\nWhat made Geiger's clinics revolutionary wasn't the medical care — it was everything else. He hired community members as health workers (the first CHWs). He prescribed food through the pharmacy. He organized clean water infrastructure. When administrators questioned why a medical clinic was buying groceries, Geiger famously replied: \"The last time I checked my textbook, the treatment for malnutrition was food.\"\n\nThis is YOUR origin story. If you're a CHW, an MA, an outreach worker, or a front desk coordinator at an FQHC — your role exists because Jack Geiger proved that healthcare is about more than what happens in the exam room. Every time you screen a patient for food insecurity, connect someone to housing, or translate for a family — you're continuing what he started.",
      es: "Antes de los FQHCs, antes de Medicaid — un médico llamado Jack Geiger creía que la pobreza era una enfermedad que una clínica podía tratar. En 1965 abrió los primeros centros en Mississippi y Boston. Contrató miembros de la comunidad como trabajadores de salud — los primeros TSC. Prescribía comida por la farmacia.\n\nEsta es TU historia de origen. Si eres TSC, AM o coordinador — tu rol existe porque Geiger demostró que la atención médica va más allá del consultorio."
    },
    keyInsight: { en: "You are not an afterthought in the care team — you are the original innovation. Community health workers existed before nurse practitioners, before physician assistants, before any other \"extender\" role.", es: "No eres un complemento del equipo — eres la innovación original. Los TSC existieron antes que NPs, PAs o cualquier otro rol." },
    quotes: [{ text: { en: "The last time I checked my textbook, the treatment for malnutrition was food.", es: "La última vez que revisé mi libro de texto, el tratamiento para la desnutrición era comida." }, attribution: "— H. Jack Geiger, MD, 1967" }],
    transitionNote: { en: "Geiger showed that health is shaped by where you live, what you eat, and how much money you have. Paula Braveman's SDOH framework put a name to this — and it's the framework behind every screening you do.", es: "Geiger mostró que la salud la moldea dónde vives. El marco DSDS de Braveman le puso nombre — y es el marco detrás de cada tamizaje que haces." },
    readingMinutes: 5,
  },
  {
    entryId: "braveman-sdoh-framework-2011",
    narrative: {
      en: "In 2011, Paula Braveman and colleagues published a landmark paper in the Annual Review of Public Health that organized decades of evidence into a single, clear framework: the Social Determinants of Health. SDOH encompasses five domains — economic stability, education, social and community context, health and healthcare access, and neighborhood and built environment.\n\nThe most powerful finding: your zip code is a stronger predictor of your health than your genetic code. In California, life expectancy can vary by 15 years between neighborhoods just miles apart. The reasons aren't medical — they're structural: access to healthy food, exposure to pollution, availability of safe housing, proximity to violence.\n\nFor CHWs and outreach workers, this framework validates what you already know from experience. When you help a patient apply for CalFresh, find stable housing, or navigate a domestic violence situation — you're not doing \"social work instead of healthcare.\" You ARE doing healthcare. The SDOH framework proves that these interventions are as medically important as any prescription.",
      es: "Braveman organizó décadas de evidencia en un marco claro: los Determinantes Sociales de la Salud. Cinco dominios: estabilidad económica, educación, contexto social, acceso a salud, y vecindario. Tu código postal predice mejor tu salud que tu código genético.\n\nPara TSC: cuando ayudas con CalFresh o vivienda, no estás haciendo \"trabajo social\" — ESTÁS haciendo atención médica."
    },
    keyInsight: { en: "When you help a patient apply for CalFresh, find housing, or escape violence — you are practicing evidence-based medicine. The SDOH framework proves it.", es: "Cuando ayudas con CalFresh, vivienda o seguridad — estás practicando medicina basada en evidencia." },
    quotes: [{ text: { en: "Where we live, learn, work, and play profoundly affects our health — in ways that are often more powerful than medical care.", es: "Donde vivimos, aprendemos, trabajamos y jugamos afecta profundamente nuestra salud — a menudo más que la atención médica." }, attribution: "— Paula Braveman, Annual Review of Public Health, 2011" }],
    transitionNote: { en: "The SDOH framework tells us what matters. Healthy People 2030 turns that into measurable goals — including the ones your FQHC reports on.", es: "El marco DSDS nos dice qué importa. Healthy People 2030 lo convierte en metas medibles." },
    readingMinutes: 4,
  },
  {
    entryId: "healthy-people-2030-sdoh",
    narrative: {
      en: "Healthy People 2030 is the federal government's roadmap for improving health — and it puts SDOH at the center. This isn't abstract: HRSA uses Healthy People targets to set the quality measures your FQHC reports on every year in UDS (Uniform Data System) reporting. When your clinic screens for food insecurity, housing instability, or transportation barriers — you're generating the data that feeds these national objectives.\n\nThe framework organizes SDOH into five domains with specific, measurable targets. For example: reduce the proportion of people who are food insecure, increase the proportion of adults who can obtain health information they need, reduce emergency department visits for conditions treatable in primary care.\n\nAs a non-clinician, you may be the person actually doing these screenings. Understanding that this work connects to national health objectives — and to your FQHC's grant funding — helps you see why that \"one more form\" matters.",
      es: "Healthy People 2030 es la hoja de ruta federal para mejorar la salud. HRSA usa estas metas para las medidas de calidad que tu FQHC reporta en UDS. Cuando tu clínica evalúa inseguridad alimentaria o inestabilidad de vivienda — estás generando datos para estos objetivos nacionales.\n\nComo no clínico, puedes ser quien hace estos tamizajes. Entender la conexión con los objetivos nacionales te ayuda a ver por qué cada formulario importa."
    },
    keyInsight: { en: "The SDOH screenings you administer aren't busy work — they generate the data that justifies your FQHC's federal funding and shapes national health policy.", es: "Los tamizajes DSDS que administras no son trabajo burocrático — generan los datos que justifican el financiamiento federal." },
    quotes: [{ text: { en: "Healthy People 2030 sets data-driven national objectives to improve health and well-being over the next decade, with an overarching goal of eliminating health disparities and achieving health equity.", es: "Healthy People 2030 establece objetivos nacionales basados en datos con la meta de eliminar disparidades y lograr equidad en salud." }, attribution: "— HHS Office of Disease Prevention and Health Promotion, 2020" }],
    transitionNote: { en: "Screenings and frameworks are important — but how do you interact with patients who carry invisible wounds? SAMHSA's trauma-informed care framework changes how you approach every patient encounter.", es: "Los tamizajes son importantes — pero ¿cómo interactúas con pacientes que cargan heridas invisibles?" },
    readingMinutes: 4,
  },
  {
    entryId: "substance-abuse-tic-guide-2014",
    narrative: {
      en: "Many FQHC patients have experienced trauma — poverty, immigration, violence, childhood abuse, racism, homelessness. SAMHSA's trauma-informed care framework recognizes that this trauma affects how patients interact with your clinic at every touchpoint — from the waiting room to the checkout desk.\n\nThe six TIC principles are: safety (does your clinic feel physically and emotionally safe?), trustworthiness and transparency (do patients know what to expect?), peer support (are people with lived experience part of the team?), collaboration (do patients have a voice in their care?), empowerment (do interactions build capability?), and cultural/historical/gender awareness.\n\nFor front desk staff, MAs, and CHWs, this means understanding that the patient who arrives angry may be anxious, the one who misses appointments may be avoiding a trigger in the building, and the one who refuses to fill out forms may have literacy challenges or a history of information being used against them. TIC doesn't mean accepting harmful behavior — it means responding with curiosity instead of judgment.",
      es: "Muchos pacientes de FQHCs han experimentado trauma. El marco de SAMHSA reconoce que esto afecta cada interacción. Seis principios: seguridad, confianza, apoyo entre pares, colaboración, empoderamiento y conciencia cultural.\n\nPara personal de recepción, AM y TSC: el paciente enojado puede estar ansioso. TIC significa responder con curiosidad en vez de juicio."
    },
    keyInsight: { en: "You are often the first person a patient sees. Your greeting, your tone, your patience at the front desk — these are clinical interventions, whether you realize it or not.", es: "A menudo eres la primera persona que un paciente ve. Tu saludo, tu tono — son intervenciones clínicas." },
    quotes: [{ text: { en: "Trauma-informed care is not about what is wrong with you — it is about what happened to you.", es: "El cuidado informado por trauma no es sobre qué está mal contigo — es sobre qué te pasó." }, attribution: "— SAMHSA, 2014" }],
    transitionNote: { en: "TIC helps you understand patient behavior. Next: health literacy research explains why the way you communicate matters as much as what you communicate.", es: "TIC te ayuda a entender el comportamiento. Siguiente: la alfabetización en salud explica por qué cómo comunicas importa tanto como qué comunicas." },
    readingMinutes: 4,
  },
  {
    entryId: "berkman-health-literacy-systematic-2011",
    narrative: {
      en: "This AHRQ systematic review of 96 studies found that 36% of US adults have basic or below-basic health literacy — meaning they struggle to understand medication instructions, appointment reminders, or discharge summaries. Among FQHC populations, rates are even higher: 58% of Hispanic adults scored at basic or below-basic levels.\n\nThe health consequences are severe: low health literacy is associated with more hospitalizations, greater emergency department use, lower use of preventive services, poorer medication adherence, and higher mortality. Patients aren't \"non-compliant\" — they may not understand what they're supposed to do.\n\nFor MAs, CHWs, and outreach workers, this evidence supports using plain language, teach-back methods (asking patients to repeat instructions in their own words), visual aids, and translated materials. When you take the extra 30 seconds to make sure a patient understands their medications, you're not being slow — you're preventing a hospitalization.",
      es: "Esta revisión de 96 estudios encontró que 36% de adultos de EE.UU. tienen alfabetización en salud básica o inferior. Entre poblaciones de FQHCs, las tasas son aún más altas: 58% de adultos hispanos.\n\nPara AM y TSC: usar lenguaje simple y teach-back no es ser lento — es prevenir hospitalizaciones."
    },
    keyInsight: { en: "When a patient doesn't follow instructions, the first question should be: did they understand? Teach-back — asking patients to explain in their own words — is one of the most powerful tools in community health.", es: "Cuando un paciente no sigue instrucciones, la primera pregunta es: ¿entendió? Teach-back es una de las herramientas más poderosas." },
    quotes: [{ text: { en: "Low health literacy is consistently associated with more hospitalizations, greater emergency department use, lower mammography screening, lower influenza immunization, poorer ability to take medications appropriately, and higher mortality among the elderly.", es: "La baja alfabetización en salud se asocia con más hospitalizaciones, mayor uso de urgencias, menor adherencia a medicamentos y mayor mortalidad." }, attribution: "— Berkman et al., Annals of Internal Medicine, 2011" }],
    transitionNote: { en: "You've completed the foundational level. You understand the origins of community health, the social determinants framework, trauma-informed care, and health literacy. Next: the evidence that proves CHW interventions work — the research that justifies your job.", es: "Has completado el nivel fundamental. Siguiente: la evidencia que demuestra que las intervenciones de TSC funcionan." },
    readingMinutes: 4,
  },
]

const nonClinicianIntermediateLessons: SyllabusLesson[] = [
  {
    entryId: "kim-chw-systematic-review-2016",
    narrative: {
      en: "If anyone ever questions whether CHW programs are worth the investment, this is the study to cite. This systematic review analyzed 37 randomized controlled trials — the gold standard of medical evidence — and found that CHW interventions significantly improved outcomes across three areas: chronic disease management (HbA1c reduction of 0.21% in diabetics), cancer screening (18% increase in mammography), and childhood immunization rates.\n\nThe evidence was strongest for chronic disease and preventive care — precisely the areas where FQHCs focus. CHWs were effective because they did things clinicians couldn't: home visits, culturally appropriate education, navigation through complex systems, and sustained follow-up between clinic visits.",
      es: "Si alguien cuestiona la inversión en programas de TSC, este es el estudio a citar. 37 ensayos aleatorizados: los TSC mejoraron significativamente el control de diabetes, el tamizaje de cáncer y las tasas de vacunación infantil.\n\nLos TSC fueron efectivos porque hicieron lo que los clínicos no podían: visitas domiciliarias, educación culturalmente apropiada y seguimiento sostenido."
    },
    keyInsight: { en: "CHW effectiveness isn't anecdotal — it's backed by 37 randomized trials. Your work has the same level of evidence as most medications.", es: "La efectividad de los TSC no es anecdótica — está respaldada por 37 ensayos aleatorizados." },
    quotes: [{ text: { en: "Community health worker interventions produced significant improvements in chronic disease management, preventive care completion, and health behaviors among low-income populations.", es: "Las intervenciones de TSC produjeron mejoras significativas en manejo de enfermedades crónicas, cuidado preventivo y conductas de salud." }, attribution: "— Kim et al., Journal of Public Health Management and Practice, 2016" }],
    transitionNote: { en: "This review showed CHWs work. The IMPaCT trial at Penn Medicine showed exactly how much — with the most rigorous evidence ever generated for a CHW model.", es: "Esta revisión mostró que los TSC funcionan. El ensayo IMPaCT mostró exactamente cuánto." },
    readingMinutes: 4,
  },
  {
    entryId: "kangovi-impress-trial-2020",
    narrative: {
      en: "Shreya Kangovi at Penn Medicine asked: what happens if you train CHWs using a standardized, evidence-based protocol and embed them in primary care teams? The IMPaCT (Individualized Management for Patient-Centered Targets) trial enrolled patients across 3 health systems and randomly assigned them to receive CHW support or usual care.\n\nThe results were dramatic: CHW-supported patients had a 65% reduction in hospitalizations, improved chronic disease control, and better mental health outcomes. The key to IMPaCT's success was its structured approach: CHWs didn't just \"help\" — they followed a specific protocol including goal-setting, action planning, social needs assessment, and care coordination.\n\nIMPaCT is now the model that many CA FQHCs use for their ECM (Enhanced Care Management) programs under CalAIM. If you're doing ECM work, you're building on this evidence base.",
      es: "Kangovi preguntó: ¿qué pasa si entrenas TSC con un protocolo estandarizado? El ensayo IMPaCT: pacientes con TSC tuvieron 65% menos hospitalizaciones y mejores resultados de salud mental.\n\nIMPaCT es el modelo que muchos FQHCs de CA usan para sus programas ECM bajo CalAIM."
    },
    keyInsight: { en: "The IMPaCT model proves that structured CHW programs — with clear protocols, not just good intentions — reduce hospitalizations by 65%. Structure is what separates effective CHW programs from well-meaning ones.", es: "IMPaCT demuestra que programas estructurados de TSC — con protocolos claros — reducen hospitalizaciones 65%." },
    quotes: [{ text: { en: "Standardized community health worker support reduced hospitalizations by 65% and improved chronic disease outcomes — not through clinical interventions, but through addressing the social and behavioral factors that drive poor health.", es: "El apoyo estandarizado de TSC redujo hospitalizaciones 65% — no por intervenciones clínicas, sino abordando factores sociales y conductuales." }, attribution: "— Kangovi et al., JAMA Internal Medicine, 2020" }],
    transitionNote: { en: "IMPaCT showed what's possible. NACHC's integration guide shows how to make it operational in your FQHC.", es: "IMPaCT mostró lo posible. La guía de NACHC muestra cómo hacerlo operativo." },
    readingMinutes: 4,
  },
  {
    entryId: "nachc-chw-integration-guide-2023",
    narrative: {
      en: "The NACHC guide is the operational playbook for building or expanding CHW programs within FQHCs. It covers the practical questions: How do you hire CHWs? (Recruit from the communities you serve.) How do you supervise them? (Clinical oversight + peer mentoring.) How do you document their work in the EHR? (Standardized templates.) How do you pay for them? (Medicaid billing codes, grant funding, ECM contracts.)\n\nThe guide is especially relevant now because CalAIM's ECM program has created new funded CHW roles across California. FQHCs that build strong CHW infrastructure aren't just improving care — they're building a sustainable revenue stream.",
      es: "La guía de NACHC es el manual operativo para programas de TSC en FQHCs. Cubre: contratación, supervisión, documentación en HCE, y financiamiento (códigos de Medicaid, subvenciones, contratos ECM).\n\nEspecialmente relevante ahora que CalAIM ECM ha creado nuevos roles financiados de TSC en California."
    },
    keyInsight: { en: "CHW programs are no longer grant-dependent passion projects. CalAIM ECM has created sustainable, Medicaid-funded CHW positions — but only for FQHCs that build the infrastructure to support them.", es: "Los programas de TSC ya no dependen de subvenciones. CalAIM ECM creó posiciones sostenibles financiadas por Medicaid." },
    quotes: [{ text: { en: "The most effective CHW programs recruit from the communities they serve, provide structured training, integrate CHWs into care teams as equal partners, and sustain positions through diversified funding.", es: "Los programas más efectivos reclutan de las comunidades, proveen entrenamiento estructurado e integran TSC como socios iguales." }, attribution: "— NACHC, Integrating Community Health Workers, 2023" }],
    transitionNote: { en: "Building programs is important. But what about YOUR career? SB 803 is creating a pathway to professional certification for CHWs in California.", es: "¿Pero qué hay de TU carrera? SB 803 está creando una vía de certificación profesional para TSC en California." },
    readingMinutes: 3,
  },
  {
    entryId: "ca-sb803-chw-certification-2021",
    narrative: {
      en: "SB 803 is the law that could transform the CHW profession in California. Signed in 2021, it creates a voluntary state certification for CHWs, defines their scope of practice, establishes training standards, and mandates a study of Medi-Cal reimbursement for CHW services.\n\nThe promise is significant: once fully implemented, certified CHWs could bill Medi-Cal directly for services like health education, care coordination, and social needs navigation. This would fundamentally change the economics of CHW employment — from grant-funded positions that disappear when funding ends, to billable roles with sustainable revenue.\n\nHowever, implementation has stalled. The HCAI Advisory Workgroup has been meeting since 2022 but certification guidance has been paused since November 2023. The CHW profession is in a holding pattern — the law exists, but the operational framework doesn't yet.",
      es: "SB 803 podría transformar la profesión de TSC en California: certificación voluntaria, definición de alcance, estándares de entrenamiento, y estudio de reembolso de Medi-Cal para servicios de TSC.\n\nSin embargo, la implementación está estancada desde noviembre 2023. La ley existe pero el marco operativo aún no."
    },
    keyInsight: { en: "SB 803 could let certified CHWs bill Medi-Cal directly — transforming CHW work from grant-dependent to revenue-generating. Watch for implementation updates from HCAI.", es: "SB 803 podría permitir que TSC certificados facturen Medi-Cal directamente — de dependientes de subvenciones a generadores de ingresos." },
    quotes: [{ text: { en: "This bill would establish a voluntary certification for community health workers, define their scope of services, and require the Department of Health Care Services to study Medi-Cal reimbursement mechanisms for CHW services.", es: "Este proyecto establece certificación voluntaria para TSC, define su alcance y requiere estudio de reembolso de Medi-Cal." }, attribution: "— California Legislature, SB 803, 2021" }],
    transitionNote: { en: "Your certification path is being built. Next: the care transitions model that shows exactly how CHWs and RNs prevent hospital readmissions — a fundable, measurable activity.", es: "Tu vía de certificación se está construyendo. Siguiente: el modelo de transiciones de cuidado que muestra cómo TSC previenen readmisiones." },
    readingMinutes: 4,
  },
  {
    entryId: "coleman-care-transitions-intervention-2006",
    narrative: {
      en: "Eric Coleman's Care Transitions Intervention is the evidence base behind one of the most impactful things CHWs and RNs do: preventing hospital readmissions. The model is simple but powerful: a transition coach (often a CHW or RN) visits the patient at home within 72 hours of hospital discharge, reviews medications, ensures follow-up appointments are scheduled, and provides a personal health record.\n\nThe trial reduced 30-day readmissions by 30% and 180-day readmissions by 17%. The cost per patient was minimal compared to the cost of a readmission ($15,000+). This is why ECM programs invest heavily in post-discharge follow-up.",
      es: "El modelo de Coleman: un coach de transición visita al paciente en casa dentro de 72 horas del alta, revisa medicamentos y asegura seguimiento. Redujo readmisiones a 30 días en 30%.\n\nPor esto los programas ECM invierten en seguimiento post-alta."
    },
    keyInsight: { en: "A single home visit within 72 hours of discharge reduces readmissions by 30%. This is one of the highest-value activities a CHW or care coordinator can perform.", es: "Una visita domiciliaria dentro de 72 horas del alta reduce readmisiones 30%. Una de las actividades de mayor valor que un TSC puede realizar." },
    quotes: [{ text: { en: "The Care Transitions Intervention reduced 30-day rehospitalization rates by 30% through a relatively low-cost model relying on a transition coach, medication self-management, and a personal health record.", es: "La Intervención de Transiciones redujo readmisiones 30% con un modelo de bajo costo." }, attribution: "— Coleman et al., Archives of Internal Medicine, 2006" }],
    transitionNote: { en: "You've seen how CHWs prevent readmissions. The final lesson in this level covers the California program that's creating funded CHW positions right now — CalAIM ECM.", es: "Has visto cómo los TSC previenen readmisiones. La última lección cubre el programa que está creando posiciones financiadas ahora — CalAIM ECM." },
    readingMinutes: 3,
  },
  {
    entryId: "dhcs-calaims-ecm-2022",
    narrative: {
      en: "Enhanced Care Management is California's biggest investment in community-based care coordination — and it's creating more CHW and care coordinator jobs than any program in FQHC history. ECM targets Medi-Cal's highest-need members: people experiencing homelessness, those with serious mental illness, high ED utilizers, and people transitioning from incarceration.\n\nFor non-clinicians, ECM means structured caseloads, individualized care plans, regular community outreach, and cross-system coordination (medical, behavioral health, housing, food, transportation). FQHCs bill monthly per-member rates for ECM — creating predictable, sustainable funding for these roles.\n\nIf you're a CHW or care coordinator in California, ECM is likely how your position is funded. Understanding the policy helps you understand your own job security and career trajectory.",
      es: "ECM es la mayor inversión de California en coordinación comunitaria — creando más empleos de TSC que cualquier programa en la historia de FQHCs. Para no clínicos: caseloads estructurados, planes individualizados y coordinación entre sistemas.\n\nSi eres TSC en California, ECM probablemente financia tu posición."
    },
    keyInsight: { en: "ECM isn't just a program — it's the economic engine that sustains CHW and care coordinator positions in CA FQHCs. Understanding ECM policy is understanding your career.", es: "ECM no es solo un programa — es el motor económico que sostiene posiciones de TSC en FQHCs de CA." },
    quotes: [{ text: { en: "ECM provides whole-person, comprehensive care management for the highest-need Medi-Cal members, addressing clinical and non-clinical needs through dedicated care teams embedded in communities.", es: "ECM proporciona gestión integral para los miembros de Medi-Cal con mayores necesidades, con equipos dedicados en las comunidades." }, attribution: "— DHCS, ECM Policy Guide, 2022" }],
    transitionNote: { en: "You've completed the intermediate level — the evidence that validates and funds community health work. The advanced level covers structural issues: racism in health systems, SDOH screening evidence, and the populations that need community health workers most.", es: "Has completado el nivel intermedio. El nivel avanzado cubre temas estructurales: racismo, tamizaje DSDS y las poblaciones que más necesitan TSC." },
    readingMinutes: 4,
  },
]

const nonClinicianAdvancedLessons: SyllabusLesson[] = [
  {
    entryId: "pinto-structural-racism-fqhcs-2022",
    narrative: {
      en: "This Commonwealth Fund analysis asks a hard question: if FQHCs serve communities of color at disproportionate rates, are FQHCs themselves affected by structural racism? The answer is yes — in ways that go beyond patient demographics. FQHCs in predominantly Black and Latino neighborhoods receive less per-patient funding, face more regulatory burden, and have higher staff turnover than FQHCs in whiter communities.\n\nThe report proposes equity-centered quality metrics that go beyond traditional HEDIS measures — looking at disparities within FQHC patient populations, not just comparing FQHCs to national averages. For non-clinicians, this means the data you collect on patient demographics isn't just administrative — it's the foundation for measuring and addressing inequity.",
      es: "Este análisis pregunta: ¿los FQHCs mismos son afectados por el racismo estructural? Sí — los FQHCs en vecindarios negros y latinos reciben menos financiamiento por paciente y tienen mayor rotación de personal.\n\nPara no clínicos: los datos demográficos que recopilas son la base para medir y abordar la inequidad."
    },
    keyInsight: { en: "Structural racism doesn't stop at the FQHC door. The data you collect on race, ethnicity, and language isn't paperwork — it's the tool for measuring whether your clinic is actually reducing disparities or reproducing them.", es: "El racismo estructural no se detiene en la puerta del FQHC. Los datos que recopilas son la herramienta para medir si tu clínica reduce o reproduce disparidades." },
    quotes: [{ text: { en: "Addressing structural racism in health centers requires moving beyond diversity statements to examining how racism shapes funding, staffing, and quality measurement systems.", es: "Abordar el racismo estructural requiere ir más allá de declaraciones de diversidad para examinar cómo el racismo moldea sistemas de financiamiento, personal y calidad." }, attribution: "— Pinto et al., Commonwealth Fund, 2022" }],
    transitionNote: { en: "Structural issues require structural interventions. The next study shows which SDOH screening interventions actually improve outcomes — and which don't.", es: "Los problemas estructurales requieren intervenciones estructurales. El siguiente estudio muestra qué intervenciones de tamizaje DSDS realmente funcionan." },
    readingMinutes: 4,
  },
  {
    entryId: "gottlieb-sdoh-screening-fqhc-2016",
    narrative: {
      en: "HRSA now expects FQHCs to screen for social determinants — but does screening actually help patients? This UCSF systematic review of 39 SDOH interventions found: food insecurity screening plus referral reduced food insecurity by 25%, housing referrals reduced homelessness by 18%, and transportation assistance increased appointment adherence by 22%.\n\nBut here's the critical finding: screening WITHOUT referral resources was not only ineffective — it could increase patient frustration and erode trust. Asking a patient \"Are you food insecure?\" and then having nowhere to send them is worse than not asking at all.\n\nFor CHWs and outreach workers, this validates the importance of maintaining current referral directories, building relationships with community organizations, and closing the loop on every referral.",
      es: "La revisión de UCSF encontró que tamizaje + derivación funciona: inseguridad alimentaria -25%, falta de vivienda -18%, adherencia a citas +22%. Pero tamizaje SIN recursos de derivación puede aumentar la frustración del paciente.\n\nPara TSC: mantener directorios de derivación actualizados y cerrar el ciclo en cada referencia es esencial."
    },
    keyInsight: { en: "Screening without referral resources does more harm than good. Your community resource knowledge — knowing which food banks are open, which shelters have beds, which programs accept undocumented patients — is as clinically important as any screening tool.", es: "Tamizaje sin recursos de derivación hace más daño que bien. Tu conocimiento de recursos comunitarios es tan clínicamente importante como cualquier herramienta." },
    quotes: [{ text: { en: "Screening for social determinants without the capacity to address identified needs may increase patient frustration and erode trust in the health care system.", es: "El tamizaje sin capacidad de abordar necesidades identificadas puede aumentar la frustración y erosionar la confianza." }, attribution: "— Gottlieb et al., PLOS ONE, 2016" }],
    transitionNote: { en: "You understand screening. The next two readings cover the populations that most need your work — and why.", es: "Entiendes el tamizaje. Las siguientes lecturas cubren las poblaciones que más necesitan tu trabajo." },
    readingMinutes: 4,
  },
  {
    entryId: "ortega-undocumented-health-access-2015",
    narrative: {
      en: "This Health Affairs study documents what FQHC staff see every day: 71% of undocumented adults are uninsured, 52% have no usual source of care, and 40% report difficulty accessing care due to cost. But the key finding is this: 47% of undocumented adults who DO have a usual provider receive care at an FQHC or community clinic. FQHCs are the safety net for people who fall through every other safety net.\n\nWith California's July 2026 UIS PPS elimination threatening the financial model FQHCs use to serve this population, this evidence quantifies the access gap that will widen without FQHC care. For CHWs serving undocumented communities, this data supports advocacy for maintaining FQHC services.",
      es: "El estudio documenta: 71% de adultos indocumentados sin seguro, 52% sin fuente habitual de cuidado. Pero 47% de los que SÍ tienen proveedor reciben atención en un FQHC. Los FQHCs son la red de seguridad para quienes caen de todas las demás.\n\nCon la eliminación del PPS UIS en julio 2026, este dato cuantifica la brecha que se ampliará sin los FQHCs."
    },
    keyInsight: { en: "FQHCs are the last safety net — 47% of undocumented adults with a usual provider receive care at an FQHC. When politicians talk about cutting FQHC funding, they're talking about eliminating care for millions.", es: "Los FQHCs son la última red — 47% de adultos indocumentados con proveedor habitual reciben atención en un FQHC." },
    quotes: [{ text: { en: "Among undocumented immigrants who had a usual source of care, 47% received that care at a community health center or public clinic — making FQHCs the single largest provider of care to this population.", es: "Entre inmigrantes indocumentados con fuente habitual de cuidado, 47% lo recibían en un centro de salud comunitario." }, attribution: "— Ortega et al., Health Affairs, 2015" }],
    transitionNote: { en: "The final lesson covers another population that depends on community health infrastructure — California's farmworkers, who grow half the nation's produce but have almost no access to healthcare.", es: "La última lección cubre a los trabajadores agrícolas de California — producen la mitad de las frutas y verduras del país pero casi no tienen acceso a atención médica." },
    readingMinutes: 4,
  },
  {
    entryId: "villarejo-farmworker-health-2016",
    narrative: {
      en: "California's farmworkers feed the nation — the state produces over 50% of US fruits, vegetables, and nuts. Yet 70% of farmworkers lack health insurance, 50% report food insecurity (a bitter irony for people who harvest food), and they face occupational hazards including heat illness, pesticide exposure, and musculoskeletal injury. Only 20% have access to any form of health coverage.\n\nMigrant Health Centers — FQHCs designated under Section 330(g) specifically to serve migrant and seasonal farmworkers — are often the only healthcare these workers ever see. Organizations like Clinica de Salud del Valle de Salinas, Valley Health Team, and Borrego Health operate mobile clinics and evening hours to reach workers in the fields.\n\nFor community health workers serving agricultural communities, this research validates the importance of culturally specific outreach: understanding harvest seasons, knowing which crops correlate with which injuries, and building trust in communities where immigration status creates fear of any institutional contact.",
      es: "Los trabajadores agrícolas de CA alimentan la nación pero 70% no tienen seguro y enfrentan riesgos: calor, pesticidas, lesiones. Los Centros de Salud Migrante son a menudo la única atención que reciben.\n\nPara TSC sirviendo comunidades agrícolas: entender temporadas de cosecha y construir confianza es esencial."
    },
    keyInsight: { en: "The people who feed California can't afford to see a doctor. Migrant Health FQHCs exist to close this gap — and CHWs who understand agricultural communities are irreplaceable.", es: "Las personas que alimentan a California no pueden pagar un médico. Los FQHCs de Salud Migrante cierran esta brecha." },
    quotes: [{ text: { en: "California's farmworkers face a convergence of health risks — occupational exposure, poverty, food insecurity, housing instability, and lack of insurance — that no single intervention can address. Only comprehensive, community-based care can meet these intersecting needs.", es: "Los trabajadores agrícolas de CA enfrentan riesgos convergentes que ninguna intervención individual puede abordar." }, attribution: "— Villarejo et al., Journal of Rural Health, 2016" }],
    transitionNote: { en: "Congratulations — you've completed the Non-Clinician: Community Health Essentials curriculum. From Geiger's founding vision to the evidence behind CHW effectiveness to the populations that need you most, you now have the research foundation that validates your role. You're not support staff — you're the innovation that makes community health centers work.", es: "Felicitaciones — has completado el currículo de No Clínico. No eres personal de apoyo — eres la innovación que hace funcionar los centros de salud comunitarios." },
    readingMinutes: 5,
  },
]

export const NON_CLINICIAN_TRACK: CurriculumTrack = {
  id: "non-clinician-community-health",
  name: { en: "Non-Clinician: Community Health Essentials", es: "No Clínico: Fundamentos de Salud Comunitaria" },
  audience: "non-clinician",
  description: { en: "For CHWs, MAs, outreach workers, and admin staff — understanding the evidence behind community health work and your role in the care team.", es: "Para TSC, AM, trabajadores de extensión y personal administrativo — la evidencia detrás del trabajo de salud comunitaria." },
  levels: [
    {
      level: "foundational", label: { en: "Why Community Health Matters", es: "Por Qué Importa la Salud Comunitaria" },
      overview: { en: "These five readings explain the intellectual and moral foundations of community health work. You'll learn where FQHCs came from, why social determinants matter more than medical care, how trauma shapes patient encounters, and why health literacy is a clinical issue.", es: "Estas cinco lecturas explican los fundamentos del trabajo de salud comunitaria. Aprenderás de dónde vienen los FQHCs y por qué los determinantes sociales importan más que la atención médica." },
      entryIds: ["geiger-first-chcs-2005", "braveman-sdoh-framework-2011", "healthy-people-2030-sdoh", "substance-abuse-tic-guide-2014", "berkman-health-literacy-systematic-2011"],
      lessons: nonClinicianFoundationalLessons,
    },
    {
      level: "intermediate", label: { en: "Building Your Practice", es: "Construyendo Tu Práctica" },
      overview: { en: "Now let's look at the evidence that proves CHW and care coordination interventions work — and the California programs creating funded positions right now. These readings build your professional knowledge and career strategy.", es: "Veamos la evidencia que demuestra que las intervenciones de TSC funcionan — y los programas de California creando posiciones financiadas ahora." },
      entryIds: ["kim-chw-systematic-review-2016", "kangovi-impress-trial-2020", "nachc-chw-integration-guide-2023", "ca-sb803-chw-certification-2021", "coleman-care-transitions-intervention-2006", "dhcs-calaims-ecm-2022"],
      lessons: nonClinicianIntermediateLessons,
    },
    {
      level: "advanced", label: { en: "Research & Advocacy", es: "Investigación y Abogacía" },
      overview: { en: "The advanced level covers structural issues that shape the communities you serve: racism in health systems, the evidence for SDOH screening, and the populations that most depend on community health infrastructure.", es: "El nivel avanzado cubre temas estructurales: racismo en sistemas de salud, evidencia de tamizaje DSDS, y las poblaciones que más dependen de la infraestructura de salud comunitaria." },
      entryIds: ["pinto-structural-racism-fqhcs-2022", "gottlieb-sdoh-screening-fqhc-2016", "ortega-undocumented-health-access-2015", "villarejo-farmworker-health-2016"],
      lessons: nonClinicianAdvancedLessons,
    },
  ],
}

// ── ASSEMBLED TRACKS ARRAY ───────────────────────────────

export const SYLLABUS_TRACKS: CurriculumTrack[] = [
  CLINICIAN_TRACK,
  NON_CLINICIAN_TRACK,
]
