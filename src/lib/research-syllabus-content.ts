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
      en: "FQHCs don't just provide care to communities that deserve better resources — they provide quality care. Comparable outcomes with sicker patients and fewer resources is not parity; it's excellence.",
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

// ── TRACK 3: PUBLIC HEALTH — POPULATION & POLICY ─────────

const publicHealthFoundationalLessons: SyllabusLesson[] = [
  {
    entryId: "starfield-primary-care-1994",
    narrative: {
      en: "If you study public health and don't read Starfield, you're building on sand. Barbara Starfield's 1994 work established the framework that connects primary care supply to population health outcomes — and it remains the most cited evidence for why primary care investment matters more than specialty expansion.\n\nHer four pillars — first contact, longitudinality, comprehensiveness, and coordination — aren't just clinical concepts. They're population health architecture. Nations with strong primary care infrastructure have lower infant mortality, longer life expectancy, and smaller health disparities, independent of GDP or total health spending. This finding has been replicated across 18 countries and 30 years of data.\n\nFor public health students, the implication is profound: the most effective population health intervention isn't a vaccine or a screening program — it's a well-functioning primary care system. And in America, FQHCs are the closest thing we have to a deliberate primary care infrastructure for under-resourced populations.",
      es: "Starfield estableció el marco que conecta la atención primaria con resultados de salud poblacional. Naciones con atención primaria fuerte tienen menor mortalidad infantil e menor disparidades, independiente del PIB. Para salud pública, la intervención más efectiva es un sistema de atención primaria funcional."
    },
    keyInsight: { en: "Primary care infrastructure is a population health intervention. Every FQHC that stays open is an epidemiological event — its closure measurably worsens community health outcomes.", es: "La infraestructura de atención primaria es una intervención de salud poblacional. Cada FQHC que permanece abierto es un evento epidemiológico." },
    quotes: [{ text: { en: "Countries with a stronger primary care orientation tend to have lower rates of all-cause mortality, all-cause premature mortality, and cause-specific premature mortality from asthma, bronchitis, emphysema, pneumonia, and cardiovascular disease.", es: "Países con orientación más fuerte hacia atención primaria tienden a tener menores tasas de mortalidad por todas las causas." }, attribution: "— Barbara Starfield, Primary Care: Balancing Health Needs, Services, and Technology, 1994" }],
    transitionNote: { en: "Starfield gives you the theory. Braveman gives you the framework for why primary care alone isn't enough — social determinants shape health before patients ever reach a clinic.", es: "Starfield da la teoría. Braveman da el marco de por qué la atención primaria sola no es suficiente." },
    readingMinutes: 5,
  },
  {
    entryId: "braveman-sdoh-framework-2011",
    narrative: {
      en: "Paula Braveman's 2011 paper didn't invent the concept of social determinants — that goes back to Rudolf Virchow in the 1840s — but it organized decades of fragmented evidence into a coherent, actionable framework. Her five domains (economic stability, education, social context, healthcare access, neighborhood environment) gave public health a common language and a measurement strategy.\n\nThe paper's most powerful contribution was quantifying the gradient: health disparities aren't just about poverty vs. wealth. They follow a gradient where each step up the socioeconomic ladder correlates with better health outcomes. This means interventions at every level — not just for the poorest — produce population health gains.\n\nFor FQHC-focused public health work, Braveman's framework explains why FQHCs that screen for SDOH and connect patients to resources aren't doing \"extra\" work — they're doing the core work of population health.",
      es: "Braveman organizó décadas de evidencia en un marco coherente. Las disparidades siguen un gradiente — cada escalón socioeconómico se correlaciona con mejores resultados. Para salud pública, los FQHCs que tamizán DSDS están haciendo el trabajo central de salud poblacional."
    },
    keyInsight: { en: "Health disparities follow a gradient, not a threshold. This means population health interventions need to reach across the socioeconomic spectrum, not just target the poorest — and FQHCs serve patients across this gradient.", es: "Las disparidades siguen un gradiente. Las intervenciones deben alcanzar todo el espectro socioeconómico." },
    quotes: [{ text: { en: "The gradient means that health disparities affect not only the poor but also middle-income groups. Each step up in socioeconomic position is associated with better health.", es: "El gradiente significa que las disparidades afectan no solo a los pobres sino también a grupos de ingreso medio." }, attribution: "— Braveman et al., Annual Review of Public Health, 2011" }],
    transitionNote: { en: "SDOH gives you the 'what' of health disparities. Healthy People 2030 gives you the 'how much' — measurable national targets that shape FQHC accountability.", es: "DSDS da el 'qué'. Healthy People 2030 da el 'cuánto' — metas medibles que moldean la rendición de cuentas de FQHCs." },
    readingMinutes: 4,
  },
  {
    entryId: "healthy-people-2030-sdoh",
    narrative: {
      en: "Healthy People is the federal government's decadal exercise in setting national health objectives — and the 2030 edition is the first to make SDOH a core organizing framework rather than a side topic. For public health professionals, this matters because Healthy People targets flow downstream into everything: HRSA grant requirements, UDS quality measures, state health department priorities, and Medicaid managed care quality incentives.\n\nThe practical effect for FQHCs: when Healthy People 2030 sets a target to 'reduce the proportion of people living in food deserts,' HRSA eventually builds that into grant reporting. When it targets 'increase the proportion of adults who receive a colorectal cancer screening,' that becomes a HEDIS measure FQHCs are scored on.\n\nUnderstanding this pipeline — from national objective to grant requirement to clinic workflow — is essential for anyone designing population health interventions in the safety net.",
      es: "Healthy People 2030 es el primer ciclo que hace DSDS un marco central. Las metas fluyen hacia requisitos HRSA, medidas UDS, prioridades estatales e incentivos de calidad de Medicaid. Entender esta cadena es esencial para diseñar intervenciones de salud poblacional."
    },
    keyInsight: { en: "Healthy People targets aren't aspirational — they cascade into HRSA grant requirements, UDS measures, and Medicaid quality incentives. They're the architecture of FQHC accountability.", es: "Las metas de Healthy People no son aspiracionales — se convierten en requisitos de HRSA, medidas UDS e incentivos de calidad." },
    quotes: [{ text: { en: "Healthy People 2030 sets data-driven national objectives with an overarching goal of eliminating health disparities, achieving health equity, and attaining health literacy to improve the health and well-being of all.", es: "Healthy People 2030 establece objetivos nacionales basados en datos con la meta de eliminar disparidades y lograr equidad." }, attribution: "— HHS Office of Disease Prevention and Health Promotion, 2020" }],
    transitionNote: { en: "National objectives set the 'what.' Section 330 of the Public Health Service Act sets the 'who' — defining which organizations can be FQHCs and what they must do.", es: "Los objetivos nacionales establecen el 'qué'. La Sección 330 establece el 'quién' — qué organizaciones pueden ser FQHCs." },
    readingMinutes: 4,
  },
  {
    entryId: "taylor-section-330-history-2004",
    narrative: {
      en: "Section 330 of the Public Health Service Act is the legal DNA of every FQHC in America. Jessamy Taylor's NHPF background paper explains the five requirements that define FQHCs: located in a medically underserved area, provide comprehensive primary care, use a sliding fee scale, have a community-majority governing board (51% patients), and serve all patients regardless of ability to pay.\n\nThese aren't bureaucratic requirements — they're the legislative embodiment of Jack Geiger's original vision. The patient-majority board requirement ensures community accountability. The sliding fee scale ensures access. The comprehensive services requirement (medical, dental, behavioral health, pharmacy, enabling services) prevents the fragmented care model that fails vulnerable populations.\n\nFor public health students, Section 330 is a case study in how legislation can encode population health principles into organizational structure.",
      es: "La Sección 330 define el ADN legal de cada FQHC: ubicación en área desatendida, atención integral, escala de tarifas, junta comunitaria (51% pacientes), servir a todos sin importar capacidad de pago. Es un estudio de caso de cómo la legislación puede codificar principios de salud poblacional."
    },
    keyInsight: { en: "Section 330 is population health encoded in law. The patient-majority board, sliding fee scale, and open-door requirements aren't red tape — they're the mechanism that makes FQHCs accountable to the communities they serve.", es: "La Sección 330 es salud poblacional codificada en ley." },
    quotes: [{ text: { en: "Health centers must serve all residents of their service area regardless of their ability to pay for services, and charges must be adjusted based on patients' ability to pay.", es: "Los centros de salud deben servir a todos los residentes independientemente de su capacidad de pago." }, attribution: "— Public Health Service Act, Section 330" }],
    transitionNote: { en: "Section 330 creates FQHCs. Medicaid pays for them — and Jennifer Tolbert's unwinding tracker shows what happens when that coverage erodes.", es: "La Sección 330 crea FQHCs. Medicaid los paga — y el rastreador de Tolbert muestra qué pasa cuando esa cobertura se erosiona." },
    readingMinutes: 4,
  },
  {
    entryId: "tolbert-medicaid-unwinding-2024",
    narrative: {
      en: "KFF's Medicaid unwinding tracker documents the largest health coverage disruption since the ACA: over 25 million people disenrolled from Medicaid between April 2023 and December 2024 after the end of the COVID continuous enrollment provision. The most devastating finding: over 70% of disenrollments were procedural — meaning people lost coverage not because they were ineligible, but because they didn't complete paperwork, didn't receive renewal notices, or encountered administrative barriers.\n\nFor FQHCs, this is a double hit: patients lose Medicaid coverage AND the FQHC loses revenue for those visits. The patients don't stop needing care — they just become uninsured patients that FQHCs serve at a loss.\n\nThis is the essential context for the 2026 H.R. 1 threat. If 25 million people were disenrolled through administrative churn alone, the policy-driven Medicaid cuts in H.R. 1 could be catastrophic for FQHC patient panels and revenue.",
      es: "El rastreador de KFF documenta la mayor disrupción de cobertura desde el ACA: 25+ millones desinscriptos, 70%+ por razones procedimentales. Para FQHCs, los pacientes no dejan de necesitar cuidado — se convierten en pacientes no asegurados atendidos a pérdida."
    },
    keyInsight: { en: "70% of Medicaid disenrollments were procedural, not because people became ineligible. Administrative churn is a public health crisis that FQHCs absorb — in lost revenue and increased uncompensated care.", es: "70% de las desinscripciones fueron procedimentales. La rotación administrativa es una crisis que los FQHCs absorben." },
    quotes: [{ text: { en: "Procedural disenrollments — cases where coverage was terminated for reasons other than a determination that the individual is ineligible — accounted for more than 70% of all Medicaid disenrollments during the unwinding period.", es: "Las desinscripciones procedimentales representaron más del 70% de todas las desinscripciones de Medicaid." }, attribution: "— Tolbert, Drake, Damico; KFF Medicaid Enrollment and Unwinding Tracker, 2024" }],
    transitionNote: { en: "You've completed the foundational level — the architecture of primary care, SDOH, national objectives, FQHC law, and coverage dynamics. Next: the evidence that proves FQHCs deliver results.", es: "Has completado el nivel fundamental. Siguiente: la evidencia de que los FQHCs entregan resultados." },
    readingMinutes: 5,
  },
]

const publicHealthIntermediateLessons: SyllabusLesson[] = [
  {
    entryId: "starfield-primary-care-specialty-2005",
    narrative: {
      en: "This 2005 Milbank Quarterly review is Starfield's masterwork — the paper that turned her 1994 framework into quantified, cross-national evidence. Synthesizing data from 18 countries, she demonstrated that each additional primary care physician per 10,000 population was associated with a 5.3% reduction in all-cause mortality. No specialty showed a comparable population-level effect.\n\nThe policy implication is clear: investing in primary care workforce produces measurable population health gains. But the US has consistently underinvested in primary care relative to specialty care — only 30% of US physicians are in primary care, compared to 50%+ in countries with better health outcomes.\n\nFQHCs are the exception: they are purpose-built primary care organizations. Every dollar cut from FQHC funding is a dollar removed from the most effective population health intervention we have.",
      es: "La revisión de 2005 de Starfield: cada médico de atención primaria adicional por 10,000 habitantes se asocia con 5.3% de reducción en mortalidad. Ninguna especialidad muestra efecto comparable. Los FQHCs son organizaciones de atención primaria por diseño."
    },
    keyInsight: { en: "Each additional primary care physician per 10,000 population reduces all-cause mortality by 5.3%. No specialty achieves this. FQHCs are the US system's primary care infrastructure — cutting their funding directly increases mortality.", es: "Cada médico de atención primaria adicional por 10,000 reduce mortalidad 5.3%. Recortar financiamiento de FQHCs aumenta la mortalidad." },
    quotes: [{ text: { en: "Primary care physician supply was associated with lower all-cause mortality, lower infant mortality, lower low birth weight, and lower self-rated fair/poor health — even after controlling for socioeconomic and lifestyle factors.", es: "La oferta de médicos de atención primaria se asoció con menor mortalidad, independiente de factores socioeconómicos." }, attribution: "— Starfield, Shi, Macinko; Milbank Quarterly, 2005" }],
    transitionNote: { en: "Starfield proves primary care reduces mortality. Sommers proves that Medicaid coverage — the funding mechanism for FQHC care — independently saves lives.", es: "Starfield demuestra que la atención primaria reduce mortalidad. Sommers demuestra que Medicaid salva vidas." },
    readingMinutes: 4,
  },
  {
    entryId: "sommers-medicaid-expansion-mortality-2017",
    narrative: {
      en: "Benjamin Sommers and colleagues at Harvard provided the most rigorous answer to a politically charged question: does Medicaid expansion actually save lives? Using quasi-experimental methods comparing expansion and non-expansion states, they found that Medicaid expansion was associated with a 0.13 percentage point decline in annual mortality among near-elderly adults — roughly 1 life saved per 239-316 coverage gains.\n\nThis isn't a theoretical projection. It's a measured reduction in death among real people who gained coverage. The mechanism: increased outpatient visits and prescription drug use (people managing chronic disease rather than waiting for emergencies).\n\nFor public health professionals tracking H.R. 1's proposed Medicaid cuts: if 1 life is saved per 300 coverage gains, then 3.4 million Californians losing Medicaid could mean over 11,000 excess deaths. That's the scale of the public health emergency we're measuring.",
      es: "Sommers demostró que la expansión de Medicaid salva 1 vida por cada 239-316 personas cubiertas. Si 3.4 millones de californianos pierden Medicaid bajo H.R. 1, podrían haber más de 11,000 muertes adicionales."
    },
    keyInsight: { en: "Medicaid expansion saves 1 life per 239-316 coverage gains. Apply that ratio to H.R. 1's projected 3.4M California coverage losses, and you're looking at 11,000+ excess deaths. That's the number policymakers need to hear.", es: "La expansión de Medicaid salva 1 vida por cada 300 personas cubiertas. H.R. 1 podría causar 11,000+ muertes adicionales en California." },
    quotes: [{ text: { en: "Medicaid expansion was associated with a significant reduction in all-cause mortality of 0.13 percentage points, driven by reductions in disease-related deaths and corresponding to approximately 1 life saved per 239 to 316 adults gaining coverage.", es: "La expansión de Medicaid se asoció con reducción significativa en mortalidad, salvando aprox. 1 vida por cada 239-316 adultos." }, attribution: "— Sommers, Gawande, Baicker; JAMA Internal Medicine, 2017" }],
    transitionNote: { en: "Sommers quantified what coverage does. Shin and Rosenbaum quantified what happens to FQHCs when that coverage shifts — the financial dependency that makes Medicaid cuts existential.", es: "Sommers cuantificó lo que hace la cobertura. Shin y Rosenbaum cuantificaron la dependencia financiera que hace los recortes existenciales." },
    readingMinutes: 4,
  },
  {
    entryId: "shin-fqhc-medicaid-dependence-2020",
    narrative: {
      en: "Peter Shin and Sara Rosenbaum at GWU's Geiger Gibson Program have been tracking FQHC finances for two decades. Their central finding: Medicaid's share of FQHC revenue grew from 37% pre-ACA to 44% nationally after expansion — and in California, many FQHCs derive 65%+ of revenue from Medi-Cal.\n\nThis concentration creates what financial analysts call a 'single payer risk.' When your largest customer is a government program subject to political negotiation, your financial stability depends on political outcomes, not market performance. This is exactly the vulnerability H.R. 1 exploits.\n\nThe Geiger Gibson program's data is the most authoritative source on FQHC finances. They track revenue mix, patient demographics, and operational metrics across all 1,400+ FQHCs nationally — making their analyses the evidence base for congressional testimony and appropriations arguments.",
      es: "Shin y Rosenbaum documentan: Medicaid representa 44% de ingresos de FQHCs nacionalmente, 65%+ en California. Esta concentración crea 'riesgo de pagador único' — la estabilidad depende de resultados políticos, no de mercado."
    },
    keyInsight: { en: "When 65% of your revenue comes from one payer that's subject to congressional negotiation, your financial model is a political bet. The Geiger Gibson data quantifies this vulnerability for every FQHC in America.", es: "Cuando 65% de tus ingresos vienen de un pagador sujeto a negociación, tu modelo financiero es una apuesta política." },
    quotes: [{ text: { en: "Medicaid revenue accounted for 44% of total health center revenue in 2019, up from 37% in 2010, making community health centers more financially dependent on Medicaid than at any point in their history.", es: "Medicaid representó 44% de los ingresos totales de centros de salud en 2019, desde 37% en 2010." }, attribution: "— Shin, Rosenbaum; Geiger Gibson/RCHN Community Health Foundation, 2020" }],
    transitionNote: { en: "Financial vulnerability is quantified. But are FQHCs actually delivering quality care? Bruce Landon's NEJM study answered that definitively.", es: "La vulnerabilidad está cuantificada. ¿Pero entregan calidad? El estudio de Landon en NEJM respondió definitivamente." },
    readingMinutes: 4,
  },
  {
    entryId: "landon-fqhc-quality-comparison-2007",
    narrative: {
      en: "This NEJM study settled a debate that had simmered for decades: do FQHCs deliver quality care, or are they just cheap care for poor people? Bruce Landon compared FQHC performance on 9 HEDIS measures to national Medicaid benchmarks and found that FQHCs scored at or above average on 8 of 9 measures — including diabetes care, cancer screening, and prenatal care.\n\nThe significance is amplified by context: FQHCs achieve these results while serving the most complex, highest-acuity patients in the healthcare system — uninsured, undocumented, homeless, non-English-speaking, multiply-comorbid. They're not just 'as good as' well-resourced practices serving healthy populations. They're achieving quality parity with a fraction of the resources.\n\nFor public health researchers, this evidence transforms the FQHC narrative from 'charity care' to 'high-value care' — a critical distinction for policy advocacy.",
      es: "Landon comparó FQHCs con benchmarks HEDIS nacionales: puntuaciones iguales o superiores en 8 de 9 medidas, sirviendo a los pacientes más complejos. Esto transforma la narrativa de 'caridad' a 'atención de alto valor'."
    },
    keyInsight: { en: "FQHCs achieve quality parity with well-resourced practices while serving the sickest, poorest patients in America. They're not cheap care — they're high-value care. This distinction is essential for policy advocacy.", es: "Los FQHCs logran paridad de calidad sirviendo a los pacientes más enfermos y pobres. No es atención barata — es atención de alto valor." },
    quotes: [{ text: { en: "Health centers performed as well as or better than national Medicaid benchmarks on 8 of 9 quality measures, despite serving a substantially more disadvantaged patient population.", es: "Los centros de salud tuvieron desempeño igual o mejor que benchmarks nacionales de Medicaid en 8 de 9 medidas." }, attribution: "— Landon et al., New England Journal of Medicine, 2007" }],
    transitionNote: { en: "Quality is proven. The final reading examines what happens when safety-net access fails — the devastating health outcomes among people experiencing homelessness.", es: "La calidad está probada. La última lectura examina qué pasa cuando el acceso a la red de seguridad falla." },
    readingMinutes: 4,
  },
  {
    entryId: "baggett-homeless-health-disparities-2010",
    narrative: {
      en: "Travis Baggett's AJPH analysis documents the health catastrophe of homelessness with devastating precision: people experiencing homelessness have 3-4x higher rates of chronic disease, 5x higher emergency department utilization, and an average life expectancy 17 years shorter than the general population.\n\nHCH (Health Care for the Homeless) FQHCs — designated under Section 330(h) — are the primary healthcare home for this population. They combine medical care with the 'enabling services' (case management, housing navigation, transportation, outreach) that Geiger pioneered in 1965. Without HCH FQHCs, hospital emergency departments become the default primary care — at 10x the cost and a fraction of the effectiveness.\n\nCalifornia's homeless population is the largest in the US (over 180,000 in 2024). CalAIM's ECM program targets this population specifically — but only works if FQHCs have the capacity to deliver care.",
      es: "Las personas sin hogar tienen 3-4x más enfermedad crónica, 5x más uso de urgencias, y 17 años menos de esperanza de vida. Los FQHCs HCH son su hogar de atención primaria. Sin ellos, las urgencias hospitalarias se convierten en atención primaria a 10x el costo."
    },
    keyInsight: { en: "Homelessness shortens life expectancy by 17 years. HCH FQHCs are the only healthcare model that works for this population — combining clinical care with housing, case management, and outreach in a single system.", es: "La falta de hogar acorta la esperanza de vida 17 años. Los FQHCs HCH son el único modelo que funciona para esta población." },
    quotes: [{ text: { en: "Homeless adults experience a staggering burden of disease, with age-adjusted mortality rates 3 to 4 times higher than the general population and average life expectancy approximately 17 years shorter.", es: "Los adultos sin hogar experimentan tasas de mortalidad 3-4 veces mayores y esperanza de vida 17 años menor." }, attribution: "— Baggett et al., American Journal of Public Health, 2010" }],
    transitionNote: { en: "You've completed the intermediate level — from Starfield's mortality evidence to Sommers' coverage impact to Landon's quality proof to Baggett's access crisis. The advanced level covers policy architecture: how to change systems, not just study them.", es: "Has completado el nivel intermedio. El nivel avanzado cubre arquitectura de políticas: cómo cambiar sistemas." },
    readingMinutes: 4,
  },
]

const publicHealthAdvancedLessons: SyllabusLesson[] = [
  {
    entryId: "rosenbaum-fqhc-policy-evolution-2017",
    narrative: {
      en: "Sara Rosenbaum is the most important FQHC policy scholar alive. Her KFF brief traces the entire arc of FQHC policy — from Jack Geiger's OEO-funded experiments in 1965, through Nixon's attempts to defund them, Carter's expansion, Reagan's budget cuts, Clinton's FQHC growth initiative, Bush's dramatic doubling of health centers (adding 1,200 new sites), and Obama's ACA investment ($11B Health Center Trust Fund).\n\nWhat emerges is a remarkable pattern: FQHCs have survived and grown under every president since Johnson, regardless of party. They enjoy rare bipartisan support because they serve red and blue districts alike — 1 in 11 Americans gets care at a health center. The current H.R. 1 threat is the first time this bipartisan consensus has been seriously challenged.\n\nRosenbaum's analysis helps public health advocates understand the political dynamics: FQHCs aren't just a health program — they're a jobs program, an economic development engine, and a community anchor. Arguments for FQHC funding need to speak all three languages.",
      es: "Rosenbaum traza el arco completo de la política de FQHCs — desde Geiger en 1965, a través de cada presidente. Los FQHCs han sobrevivido bajo todos los partidos porque 1 de 11 americanos recibe cuidado en un centro de salud. H.R. 1 es la primera amenaza seria al consenso bipartidista."
    },
    keyInsight: { en: "FQHCs have survived every president since Johnson because they serve 1 in 11 Americans across red and blue districts. The H.R. 1 threat is the first real challenge to this bipartisan consensus — understanding the political history helps design effective advocacy.", es: "Los FQHCs han sobrevivido a todos los presidentes porque sirven a 1 de 11 americanos. H.R. 1 es el primer desafío real al consenso bipartidista." },
    quotes: [{ text: { en: "Health centers have experienced growth under virtually every president since their creation, reflecting a rare and enduring bipartisan investment in community-based primary care for medically underserved populations.", es: "Los centros de salud han crecido bajo virtualmente cada presidente, reflejando una inversión bipartidista rara y duradera." }, attribution: "— Sara Rosenbaum, KFF Issue Brief, 2017" }],
    transitionNote: { en: "Rosenbaum maps the political landscape. Pinto examines the structural inequities that persist within that landscape — the ways racism shapes FQHC funding, staffing, and quality measurement.", es: "Rosenbaum mapea el paisaje político. Pinto examina las inequidades estructurales que persisten dentro de ese paisaje." },
    readingMinutes: 5,
  },
  {
    entryId: "pinto-structural-racism-fqhcs-2022",
    narrative: {
      en: "This Commonwealth Fund analysis confronts an uncomfortable truth: even within the safety net, structural racism operates. FQHCs in predominantly Black and Latino communities receive less per-patient funding, face more regulatory scrutiny, and experience higher staff turnover than FQHCs in whiter communities — even when controlling for patient volume and complexity.\n\nThe report goes beyond diagnosis to propose solutions: equity-adjusted quality metrics that measure disparities within FQHC populations (not just FQHC-vs-national comparisons), targeted funding for FQHCs serving the highest-disparity communities, and workforce development specifically for underrepresented providers.\n\nFor public health researchers, this is a call to examine our own measurement systems. If our quality metrics don't capture racial disparities within FQHCs, we can't address them. If our funding formulas don't account for structural disadvantage, we're perpetuating it.",
      es: "Los FQHCs en comunidades negras y latinas reciben menos financiamiento por paciente y tienen mayor rotación de personal. El informe propone métricas ajustadas por equidad y financiamiento dirigido. Si nuestras métricas no capturan disparidades raciales, no podemos abordarlas."
    },
    keyInsight: { en: "Structural racism operates within the safety net itself. FQHCs in Black and Latino communities are systematically under-resourced — and our quality metrics are designed in ways that can obscure this inequity.", es: "El racismo estructural opera dentro de la red de seguridad misma. Los FQHCs en comunidades negras y latinas están sistemáticamente sub-financiados." },
    quotes: [{ text: { en: "Addressing structural racism in health centers requires moving beyond diversity statements to examining how racism shapes funding formulas, staffing patterns, and the quality measurement systems we use to evaluate performance.", es: "Abordar el racismo estructural requiere examinar cómo moldea las fórmulas de financiamiento, patrones de personal y sistemas de medición." }, attribution: "— Pinto et al., Commonwealth Fund, 2022" }],
    transitionNote: { en: "Pinto shows the equity gaps. McWilliams shows one possible future — value-based payment models that could realign incentives. But are FQHCs ready for that transition?", es: "Pinto muestra las brechas de equidad. McWilliams muestra un futuro posible — modelos de pago basados en valor." },
    readingMinutes: 4,
  },
  {
    entryId: "mcwilliams-aco-savings-2016",
    narrative: {
      en: "Michael McWilliams' NEJM study of Medicare ACOs found that physician-led ACOs achieved nearly 3x the savings of hospital-led ACOs (1.9% vs 0.7%). The savings came from reducing post-acute care and emergency visits — not from stinting on services. This finding has profound implications for FQHCs considering the transition from PPS (cost-based, per-visit) to value-based payment.\n\nCalifornia launched its FQHC APM (Alternative Payment Model) in January 2026, offering global capitation as an alternative to PPS. The ACO evidence suggests that physician-group organizations like FQHCs may actually thrive under value-based models — they're already doing the population health management, care coordination, and prevention that generate savings.\n\nThe risk, however, is real: FQHCs serving the most complex patients may be penalized by risk-adjustment models that don't fully capture social complexity. Getting value-based payment right for FQHCs requires models that account for SDOH, not just clinical acuity.",
      es: "Las ACOs lideradas por médicos lograron 3x más ahorros que las hospitalarias. California lanzó su APM para FQHCs en enero 2026. Los FQHCs pueden prosperar bajo pago basado en valor — pero los modelos de ajuste por riesgo deben capturar complejidad social."
    },
    keyInsight: { en: "Physician-led organizations like FQHCs may actually be better positioned for value-based payment than hospitals — but only if risk-adjustment models account for social determinants, not just clinical diagnosis codes.", es: "Organizaciones lideradas por médicos como FQHCs pueden estar mejor posicionadas para pago basado en valor — si los modelos ajustan por determinantes sociales." },
    quotes: [{ text: { en: "Physician group-led ACOs generated estimated savings of 1.9% per beneficiary, approximately triple the savings of hospital-integrated ACOs, with reductions concentrated in post-acute care and emergency utilization.", es: "Las ACOs lideradas por grupos médicos generaron ahorros de 1.9%, triple que las ACOs hospitalarias." }, attribution: "— McWilliams et al., New England Journal of Medicine, 2016" }],
    transitionNote: { en: "ACO evidence shows the opportunity. The final reading covers the data system that underpins everything — UDS, the measurement infrastructure that makes FQHC research, accountability, and advocacy possible.", es: "La evidencia de ACOs muestra la oportunidad. La última lectura cubre UDS — la infraestructura que hace posible toda la investigación de FQHCs." },
    readingMinutes: 5,
  },
  {
    entryId: "hrsa-uds-reporting-2024",
    narrative: {
      en: "The Uniform Data System is the unsung hero of FQHC research. Every year, all 1,400+ FQHCs report 800+ data elements to HRSA: patient demographics, service utilization, staffing ratios, financial metrics, and clinical quality measures. This creates one of the richest datasets in American healthcare — and it's publicly available.\n\nUDS data powers everything in the FQHC world: NACHC's advocacy uses UDS to demonstrate national impact (30M+ patients served). Researchers use UDS to study quality, access, and disparities. HRSA uses UDS for grant monitoring and renewal decisions. State associations use UDS for benchmarking.\n\nFor public health researchers, UDS is a gold mine — but one that requires careful interpretation. UDS measures what's reported, not what's happening. FQHCs with better data infrastructure appear to have 'worse' outcomes because they're actually documenting conditions that other FQHCs are missing. Understanding this measurement artifact is essential for honest research.\n\nCongratulations — you've completed the Public Health: Population & Policy curriculum. You now understand the evidence architecture from Starfield's primary care theory through Section 330's legal framework to UDS's measurement infrastructure. You're equipped to research, advocate, and shape policy for the safety net.",
      es: "UDS es el héroe anónimo de la investigación de FQHCs. 1,400+ FQHCs reportan 800+ datos anualmente — creando uno de los conjuntos de datos más ricos en salud de EE.UU. Felicitaciones — has completado el currículo de Salud Pública."
    },
    keyInsight: { en: "UDS is the measurement infrastructure that makes FQHC research possible — 800+ data elements from 1,400+ health centers, publicly available. But UDS measures what's reported, not what's real. Better data infrastructure can make FQHCs look 'worse' because they're actually documenting more.", es: "UDS es la infraestructura que hace posible la investigación de FQHCs — pero mide lo reportado, no lo real." },
    quotes: [{ text: { en: "UDS is the primary source of comprehensive data on the demographic characteristics, services provided, clinical processes, and health outcomes of health center patients, submitted annually by all HRSA-funded health centers.", es: "UDS es la fuente principal de datos integrales sobre características, servicios, procesos clínicos y resultados de pacientes de centros de salud." }, attribution: "— HRSA Bureau of Primary Health Care, 2024" }],
    transitionNote: { en: "You've completed the Public Health curriculum. From Starfield's theory to Rosenbaum's policy to UDS's measurement — you now have the evidence architecture to research, advocate, and shape FQHC policy.", es: "Has completado el currículo de Salud Pública." },
    readingMinutes: 5,
  },
]

export const PUBLIC_HEALTH_TRACK: CurriculumTrack = {
  id: "public-health-population",
  name: { en: "Public Health: Population & Policy", es: "Salud Pública: Población y Política" },
  audience: "public-health",
  description: { en: "For MPH students, researchers, and public health professionals — the evidence base connecting FQHCs to population health outcomes.", es: "Para estudiantes de MPH, investigadores y profesionales de salud pública — la evidencia que conecta FQHCs con resultados de salud poblacional." },
  levels: [
    {
      level: "foundational", label: { en: "Health Systems & Equity", es: "Sistemas de Salud y Equidad" },
      overview: { en: "Five readings that establish the intellectual architecture of FQHC-based population health: Starfield's primary care theory, Braveman's SDOH framework, Healthy People's national objectives, Section 330's legal structure, and the Medicaid unwinding crisis.", es: "Cinco lecturas que establecen la arquitectura intelectual de la salud poblacional basada en FQHCs." },
      entryIds: ["starfield-primary-care-1994", "braveman-sdoh-framework-2011", "healthy-people-2030-sdoh", "taylor-section-330-history-2004", "tolbert-medicaid-unwinding-2024"],
      lessons: publicHealthFoundationalLessons,
    },
    {
      level: "intermediate", label: { en: "Evidence & Outcomes", es: "Evidencia y Resultados" },
      overview: { en: "Five landmark studies proving that primary care investment, Medicaid coverage, and FQHC care delivery produce measurable population health improvements — and what happens when access fails.", es: "Cinco estudios de referencia que demuestran que la inversión en atención primaria y cobertura de Medicaid produce mejoras medibles en salud poblacional." },
      entryIds: ["starfield-primary-care-specialty-2005", "sommers-medicaid-expansion-mortality-2017", "shin-fqhc-medicaid-dependence-2020", "landon-fqhc-quality-comparison-2007", "baggett-homeless-health-disparities-2010"],
      lessons: publicHealthIntermediateLessons,
    },
    {
      level: "advanced", label: { en: "Policy & Systems Change", es: "Política y Cambio Sistémico" },
      overview: { en: "Four readings on policy architecture: Rosenbaum's 50-year legislative history, structural racism in the safety net, value-based payment evidence, and the UDS measurement system that underpins all FQHC research.", es: "Cuatro lecturas sobre arquitectura de políticas: historia legislativa de Rosenbaum, racismo estructural, pago basado en valor, y el sistema UDS." },
      entryIds: ["rosenbaum-fqhc-policy-evolution-2017", "pinto-structural-racism-fqhcs-2022", "mcwilliams-aco-savings-2016", "hrsa-uds-reporting-2024"],
      lessons: publicHealthAdvancedLessons,
    },
  ],
}

// ── TRACK 4: EXECUTIVE — STRATEGY & FINANCE ──────────────

const executiveFoundationalLessons: SyllabusLesson[] = [
  {
    entryId: "taylor-section-330-history-2004",
    narrative: {
      en: "If you lead an FQHC and haven't read Section 330, you're managing a $10M+ organization without understanding its legal charter. This NHPF background paper covers what every executive must know: the five core requirements (medically underserved area, comprehensive services, sliding fee, patient-majority board, open-door policy), FTCA malpractice coverage (worth $500K+/year in saved insurance premiums), and the Health Center Trust Fund that provides your federal grant.\n\nThe governance requirement — 51% patient-majority board — is the most distinctive feature of the FQHC model and the one executives navigate most carefully. Your board members are your patients. They may not have healthcare management experience, but they have lived experience of your services. Managing this dynamic — educating board members on financial complexity while genuinely incorporating their community perspective — is the essential leadership skill for FQHC executives.",
      es: "Si lideras un FQHC sin haber leído la Sección 330, estás gestionando una organización de $10M+ sin entender su carta legal. Cinco requisitos básicos: área desatendida, servicios integrales, escala de tarifas, junta de pacientes, puerta abierta. Protección FTCA vale $500K+/año."
    },
    keyInsight: { en: "FTCA malpractice coverage alone is worth $500K+/year to your organization. Understanding Section 330 requirements isn't compliance — it's financial strategy.", es: "La cobertura FTCA vale $500K+/año. Entender la Sección 330 no es cumplimiento — es estrategia financiera." },
    quotes: [{ text: { en: "The governing board must be composed so that a majority of members are individuals being served by the health center, ensuring that the communities served have a direct voice in governance.", es: "La junta directiva debe tener mayoría de individuos servidos por el centro de salud." }, attribution: "— Public Health Service Act, Section 330" }],
    transitionNote: { en: "Section 330 is your legal charter. PPS is your revenue engine — understanding how you actually get paid.", es: "La Sección 330 es tu carta legal. PPS es tu motor de ingresos." },
    readingMinutes: 4,
  },
  {
    entryId: "rosenbaum-pps-fqhc-reimbursement-2010",
    narrative: {
      en: "PPS (Prospective Payment System) is the financial foundation of every FQHC in America, and most executives don't fully understand how it works. Sara Rosenbaum's primer explains the mechanics: your PPS rate is a per-visit, cost-based reimbursement established by BBA 1997, adjusted annually for inflation (MEI). It covers ALL Medicaid-covered services in a single encounter rate — medical, dental, behavioral health, pharmacy.\n\nThe critical concept is 'change-in-scope': when you add a new service (say, dental) or a new site, you can request a PPS rate adjustment to reflect the new costs. This is the mechanism for revenue growth within PPS — and it requires meticulous cost reporting.\n\nThe wrap-around payment is another essential concept: your state Medicaid agency pays managed care organizations, who pay you a negotiated rate. If that rate is below your PPS rate, the state owes you the difference (the 'wrap'). Many FQHCs leave money on the table by not aggressively pursuing wrap-around payments.",
      es: "PPS es el reembolso por visita basado en costos. Cambio de alcance permite ajustar la tasa cuando agregas servicios. El pago wrap-around: si las MCO pagan menos que tu tasa PPS, el estado te debe la diferencia. Muchos FQHCs dejan dinero en la mesa."
    },
    keyInsight: { en: "Change-in-scope adjustments and wrap-around payment reconciliation are where FQHCs leave money on the table. Every new service you add should trigger a change-in-scope request. Every MCO payment should be reconciled against your PPS rate.", es: "Los ajustes de cambio de alcance y el pago wrap-around son donde los FQHCs dejan dinero en la mesa." },
    quotes: [{ text: { en: "The FQHC PPS rate represents a per-visit payment based on reasonable costs, adjusted annually by the Medicare Economic Index, and covering the full scope of services provided during a qualifying encounter.", es: "La tasa PPS de FQHCs representa un pago por visita basado en costos razonables, ajustado anualmente." }, attribution: "— Rosenbaum, Shin; Geiger Gibson/RCHN, 2010" }],
    transitionNote: { en: "PPS is your Medicaid revenue. 340B is your second-largest revenue source — and it's under threat.", es: "PPS es tu ingreso de Medicaid. 340B es tu segunda fuente — y está bajo amenaza." },
    readingMinutes: 5,
  },
  {
    entryId: "340b-hrsa-program-overview-2024",
    narrative: {
      en: "The 340B Drug Pricing Program allows FQHCs to purchase outpatient drugs at 25-50% discounts from manufacturers. The program generated $43.9 billion in savings across all covered entities in 2022 — and for many FQHCs, 340B pharmacy revenue is the second-largest revenue source after Medicaid.\n\nHow it works: you buy a drug at the 340B price (say, $10), dispense it to a patient, and get reimbursed by their insurance at the commercial rate (say, $40). The $30 spread funds uncompensated care, expanded services, and pharmacy operations. Some FQHCs generate $1M+ annually from 340B alone.\n\nThe program is under intense political pressure from pharmaceutical manufacturers who argue it's grown beyond its original intent. H.R. 7391 (the 340B FQHC Protection Act, with 35 bipartisan cosponsors) is critical legislation to watch. If 340B is restricted, many FQHCs would need to close their pharmacies — eliminating both revenue and patient access to affordable medications.",
      es: "340B permite a FQHCs comprar medicamentos con 25-50% de descuento. Muchos FQHCs generan $1M+ anualmente de 340B. H.R. 7391 es legislación crítica para proteger este programa. Si se restringe, muchos FQHCs cerrarían sus farmacias."
    },
    keyInsight: { en: "340B pharmacy can generate $1M+ annually for your FQHC. If you don't have an in-house pharmacy, 340B contract pharmacy arrangements are available — but they're under legislative threat. H.R. 7391 is the bill to watch.", es: "La farmacia 340B puede generar $1M+ anualmente. H.R. 7391 es la legislación a vigilar." },
    quotes: [{ text: { en: "The 340B program generated $43.9 billion in savings for covered entities in 2022, enabling safety-net providers to stretch scarce federal resources to reach more eligible patients and provide more comprehensive services.", es: "El programa 340B generó $43.9 mil millones en ahorros en 2022, permitiendo a proveedores de red de seguridad extender recursos." }, attribution: "— HRSA, 340B Drug Pricing Program Overview, 2024" }],
    transitionNote: { en: "340B is your pharmacy strategy. NACHC's workforce data is your people strategy — the staffing crisis every executive is navigating.", es: "340B es tu estrategia de farmacia. Los datos de NACHC son tu estrategia de personas." },
    readingMinutes: 4,
  },
  {
    entryId: "nachc-workforce-study-2023",
    narrative: {
      en: "NACHC's workforce survey quantifies what every FQHC executive experiences daily: you can't hire fast enough. The national data shows FQHCs need 46,000+ additional staff to meet current demand. Vacancy rates are highest for psychiatrists (25%), dentists (20%), and family physicians (15%). Average time-to-fill for providers exceeds 120 days.\n\nThe workforce crisis compounds every other challenge: you can't grow revenue without providers to see patients, you can't meet quality metrics without adequate staffing ratios, and you can't comply with scope-of-practice regulations without proper supervision chains.\n\nNHSC loan repayment ($50K-$75K over 2 years) remains the most effective recruitment tool, but the program's funding is subject to annual appropriations. J-1 visa waivers bring international medical graduates to under-resourced areas — 15% of FQHC physicians are IMGs. Understanding these pipeline programs is essential executive knowledge.",
      es: "FQHCs necesitan 46,000+ empleados adicionales. Vacancia más alta: psiquiatras (25%), dentistas (20%), médicos familiares (15%). NHSC y visas J-1 son las herramientas de reclutamiento más efectivas."
    },
    keyInsight: { en: "You're competing with hospital systems that pay 20-40% more for the same providers. Your competitive advantages: NHSC loan repayment ($50-75K), mission alignment, work-life balance, and scope-of-practice autonomy. Lead with those.", es: "Compites con hospitales que pagan 20-40% más. Tus ventajas: NHSC, misión, equilibrio vida-trabajo y autonomía de práctica." },
    quotes: [{ text: { en: "Health centers reported needing more than 46,000 additional health care professionals to meet their communities' needs, with the most acute shortages in behavioral health, dental, and primary care providers.", es: "Los centros de salud reportaron necesitar más de 46,000 profesionales adicionales para satisfacer necesidades." }, attribution: "— NACHC Workforce Study, 2023" }],
    transitionNote: { en: "Workforce is your biggest constraint. SB 525 is your biggest cost driver — and it's just getting started.", es: "La fuerza laboral es tu mayor restricción. SB 525 es tu mayor impulsor de costos." },
    readingMinutes: 4,
  },
  {
    entryId: "ca-sb525-healthcare-minimum-wage-2023",
    narrative: {
      en: "SB 525 established California's phased healthcare minimum wage: $21/hour for FQHCs starting October 2024, rising to $25/hour by 2027. This applies to ALL healthcare facility employees — not just clinical staff. Your front desk coordinators, janitors, kitchen staff, and medical records clerks are all covered.\n\nThe direct budget impact is significant: our analysis found 8 entry-level FQHC roles with P25 salaries below the $43,680 annual floor. But the indirect impact is even larger: wage compression. When entry-level wages rise to $21/hr, experienced MAs who were making $22/hr expect raises too. The compression effect pushes all wages up by 5-15% across the organization.\n\nFor CFOs: model the full compression impact, not just the minimum wage floor. For CHROs: this is an opportunity to restructure pay bands and create clear career ladders. For CEOs: advocate for PPS rate adjustments that account for SB 525 cost increases.",
      es: "SB 525: $21/hr para FQHCs desde octubre 2024, subiendo a $25/hr para 2027. Aplica a TODO el personal. La compresión salarial empuja todos los salarios 5-15%. Modelen el impacto completo, no solo el piso."
    },
    keyInsight: { en: "SB 525's direct cost is manageable. The wage compression effect — experienced staff expecting raises when entry-level wages increase — is the real budget risk. Model it now, before 2027 arrives.", es: "El costo directo de SB 525 es manejable. La compresión salarial es el riesgo real. Modélenlo ahora." },
    quotes: [{ text: { en: "Beginning October 16, 2024, the minimum wage for health care facility employees is $21 per hour for clinics, with increases to $22 in 2025 and reaching $25 per hour by January 1, 2027.", es: "A partir del 16 de octubre de 2024, el salario mínimo para empleados de establecimientos de salud es $21/hr para clínicas." }, attribution: "— California DIR, SB 525 Healthcare Worker Minimum Wage FAQ, 2023" }],
    transitionNote: { en: "You've completed the foundational level — the legal, financial, workforce, and regulatory architecture of running an FQHC. Next: revenue strategy and sustainability.", es: "Has completado el nivel fundamental. Siguiente: estrategia de ingresos y sostenibilidad." },
    readingMinutes: 4,
  },
]

const executiveIntermediateLessons: SyllabusLesson[] = [
  {
    entryId: "shin-fqhc-medicaid-dependence-2020",
    narrative: {
      en: "Peter Shin's analysis is the financial vulnerability assessment every FQHC board should see. Nationally, Medicaid accounts for 44% of FQHC revenue — up from 37% pre-ACA. In California, many FQHCs exceed 65%. This concentration creates existential risk: when your largest payer is a government program subject to political whims, you need a diversification strategy.\n\nThe strategic response to Medicaid dependence is revenue diversification across five pillars: (1) 340B pharmacy expansion, (2) dental program growth via Denti-Cal, (3) behavioral health integration via CCBHC or ECM, (4) Medicare enrollment growth (aging population + AltaMed PACE model), and (5) philanthropic development. FQHCs that pursue all five can reduce Medicaid dependence below 50% — a critical resilience threshold.",
      es: "Medicaid representa 44% de ingresos nacionalmente, 65%+ en CA. La respuesta estratégica: diversificación en 5 pilares — farmacia 340B, dental, salud conductual, Medicare y filantropía. Reducir dependencia debajo de 50% es un umbral crítico de resiliencia."
    },
    keyInsight: { en: "65% Medicaid dependence is a strategic vulnerability, not just a financial metric. Your goal: reduce Medicaid share below 50% through 5 diversification pillars — 340B, dental, BH/CCBHC, Medicare, and philanthropy.", es: "65% de dependencia de Medicaid es una vulnerabilidad estratégica. Meta: reducir debajo de 50% con 5 pilares de diversificación." },
    quotes: [{ text: { en: "The growing share of Medicaid revenue creates a financial dependency that leaves health centers increasingly vulnerable to federal and state budget decisions over which they have limited control.", es: "La creciente participación de Medicaid crea una dependencia financiera que deja a los centros de salud vulnerables a decisiones presupuestarias." }, attribution: "— Shin, Rosenbaum; Geiger Gibson/RCHN, 2020" }],
    transitionNote: { en: "Medicaid dependence is the risk. Rosenbaum's policy evolution shows you which political levers to pull.", es: "La dependencia de Medicaid es el riesgo. La evolución de políticas de Rosenbaum muestra qué palancas políticas usar." },
    readingMinutes: 4,
  },
  {
    entryId: "rosenbaum-fqhc-policy-evolution-2017",
    narrative: {
      en: "Every FQHC executive should understand the political dynamics that determine their funding. Rosenbaum's historical analysis reveals the pattern: FQHCs grow when they have bipartisan champions (Bush doubled health centers; Obama invested $11B), and they face risk when they become politically associated with one party.\n\nThe current threat is unprecedented: H.R. 1 proposes Medicaid cuts of $880B-$2.3T over 10 years while simultaneously threatening the CHCF Trust Fund reauthorization due December 2026. This is the first time both FQHC revenue streams (Medicaid payments + federal grants) face simultaneous political risk.\n\nFor executives: your advocacy strategy needs to speak three languages. To fiscal conservatives: FQHCs save money (every $1 in FQHC funding saves $3-$4 in averted ED visits). To healthcare reformers: FQHCs deliver quality parity at lower cost. To community leaders: FQHCs are the largest employer in many under-resourced communities.",
      es: "Los FQHCs crecen con campeones bipartidistas. La amenaza actual es sin precedentes: H.R. 1 recorta Medicaid mientras el CHCF expira en diciembre 2026. Su estrategia de abogacía necesita hablar tres idiomas: fiscal, calidad y empleo comunitario."
    },
    keyInsight: { en: "Your advocacy pitch has three versions: (1) fiscal conservative — FQHCs save $3-4 per $1 invested, (2) healthcare reformer — quality parity at lower cost, (3) community leader — largest employer in under-resourced communities. Know your audience.", es: "Tu discurso de abogacía tiene 3 versiones: fiscal ($3-4 por $1), reformista (calidad a menor costo), comunitario (mayor empleador)." },
    quotes: [{ text: { en: "Health centers have experienced growth under virtually every president since their creation, reflecting an enduring bipartisan consensus that is now, for the first time, seriously threatened.", es: "Los centros de salud han crecido bajo cada presidente, reflejando un consenso bipartidista ahora seriamente amenazado." }, attribution: "— Sara Rosenbaum, KFF, 2017" }],
    transitionNote: { en: "Political strategy protects existing revenue. PCMH recognition creates new revenue — and demonstrates quality to payers.", es: "La estrategia política protege ingresos existentes. PCMH crea nuevos ingresos." },
    readingMinutes: 4,
  },
  {
    entryId: "ncqa-pcmh-standards-2023",
    narrative: {
      en: "NCQA's Patient-Centered Medical Home recognition is the quality credential that unlocks per-member-per-month (PMPM) payments from many managed care organizations. Level 3 recognition (the highest) demonstrates that your FQHC has formalized team-based care, population health management, care coordination, and quality measurement systems.\n\nThe financial case is straightforward: PMPM payments of $3-8 per attributed member per month can generate $200K-$500K annually for a mid-size FQHC. Combined with improved quality metrics that affect managed care contract rates, the ROI on PCMH recognition typically exceeds the investment within 12-18 months.\n\nThe operational investment is significant: EHR template standardization, care management workflows, patient registry implementation, and quality reporting infrastructure. But these are capabilities you need regardless — PCMH just provides the external accountability framework and the financial incentive to build them.",
      es: "El reconocimiento PCMH desbloquea pagos PMPM de $3-8 por miembro por mes, generando $200K-$500K anuales. El ROI típicamente excede la inversión en 12-18 meses. Las capacidades que necesitas para PCMH son las que necesitas de todos modos."
    },
    keyInsight: { en: "PCMH Level 3 recognition can generate $200K-$500K annually in PMPM payments. The ROI exceeds the investment within 12-18 months — and the operational capabilities it builds are ones you need anyway.", es: "PCMH Nivel 3 puede generar $200K-$500K anuales. El ROI excede la inversión en 12-18 meses." },
    quotes: [{ text: { en: "PCMH recognition demonstrates a health center's commitment to team-based, coordinated, data-driven care — and increasingly unlocks value-based payment arrangements with managed care organizations.", es: "El reconocimiento PCMH demuestra compromiso con cuidado en equipo y coordinado — desbloqueando pagos basados en valor." }, attribution: "— NCQA, PCMH Standards, 2023" }],
    transitionNote: { en: "PCMH is your quality credential. UDS is your accountability system — and the data that proves your impact to funders, policymakers, and boards.", es: "PCMH es tu credencial de calidad. UDS es tu sistema de rendición de cuentas." },
    readingMinutes: 4,
  },
  {
    entryId: "hrsa-uds-reporting-2024",
    narrative: {
      en: "UDS isn't just a reporting obligation — it's your performance management system, your board dashboard, and your advocacy ammunition. The 800+ data elements you report annually to HRSA create the most comprehensive picture of your organization's performance available anywhere.\n\nSmart executives use UDS strategically: benchmark against peer FQHCs (by size, region, patient demographics), identify quality improvement targets that will affect grant renewals, and build board presentations around UDS trend data. HRSA's own data tools let you compare your performance against state and national medians.\n\nThe quality measures that matter most for grant renewal: diabetes HbA1c control, depression screening and follow-up, hypertension control, cancer screening rates, and prenatal care timing. If any of these falls below the 33rd percentile nationally, expect HRSA scrutiny. If they fall below the 10th percentile, expect conditions on your award.",
      es: "UDS no es solo una obligación — es tu sistema de gestión. Usa UDS estratégicamente: benchmark contra pares, identificar metas de mejora, construir presentaciones para la junta. Si las métricas caen debajo del percentil 33, espera escrutinio de HRSA."
    },
    keyInsight: { en: "UDS is your early warning system. If diabetes HbA1c control, depression screening, or hypertension management falls below the 33rd percentile nationally, HRSA will notice. Monitor these metrics quarterly, not just at UDS submission time.", es: "UDS es tu sistema de alerta temprana. Si las métricas caen debajo del percentil 33, HRSA notará." },
    quotes: [{ text: { en: "UDS data serves multiple purposes: grant accountability, national advocacy, quality improvement benchmarking, and congressional reporting on health center impact.", es: "Los datos UDS sirven múltiples propósitos: rendición de cuentas, abogacía, benchmarking de calidad y reportes al Congreso." }, attribution: "— HRSA Bureau of Primary Health Care, 2024" }],
    transitionNote: { en: "You've mastered the revenue and accountability landscape. The advanced level covers the transformation ahead: value-based payment, AI, and new behavioral health funding models.", es: "Has dominado el panorama de ingresos y rendición de cuentas. El nivel avanzado cubre la transformación por venir." },
    readingMinutes: 4,
  },
]

const executiveAdvancedLessons: SyllabusLesson[] = [
  {
    entryId: "mcwilliams-aco-savings-2016",
    narrative: {
      en: "The transition from fee-for-service/PPS to value-based payment is coming — and McWilliams' NEJM evidence suggests FQHCs may actually be well-positioned for it. Physician-led ACOs achieved 1.9% savings per beneficiary (nearly 3x hospital-led ACOs), with savings concentrated in reduced post-acute care and ED visits.\n\nFQHCs already do the work that generates ACO savings: care coordination, chronic disease management, prevention, and SDOH intervention. The challenge is infrastructure: risk stratification analytics, real-time quality dashboards, and actuarial capacity to model global capitation risk.\n\nCalifornia's FQHC APM (launched January 2026) offers an optional path to global payment. The early adopters will be FQHCs with strong data teams, established PCMH infrastructure, and patient panels large enough to absorb actuarial risk. For smaller FQHCs, joining an FQHC-led ACO (like C3) provides the collective scale needed for value-based contracts.",
      es: "ACOs lideradas por médicos logran 3x más ahorros. Los FQHCs ya hacen el trabajo que genera ahorros. California lanzó su APM en enero 2026. FQHCs más pequeños pueden unirse a ACOs como C3 para escala colectiva."
    },
    keyInsight: { en: "FQHCs already do the work that generates value-based savings — care coordination, prevention, SDOH intervention. The gap is infrastructure: analytics, dashboards, and actuarial capacity. Invest there before signing value-based contracts.", es: "Los FQHCs ya hacen el trabajo que genera ahorros basados en valor. La brecha es infraestructura: analítica y capacidad actuarial." },
    quotes: [{ text: { en: "Physician group-led ACOs generated savings nearly three times those of hospital-integrated systems, suggesting that primary care-oriented organizations may be better positioned for value-based payment success.", es: "Las ACOs lideradas por grupos médicos generaron ahorros 3 veces mayores, sugiriendo que organizaciones de atención primaria pueden estar mejor posicionadas." }, attribution: "— McWilliams et al., NEJM, 2016" }],
    transitionNote: { en: "Value-based payment is the revenue future. AI-assisted documentation is the operational future — and it's arriving faster than most executives expect.", es: "El pago basado en valor es el futuro de ingresos. La documentación asistida por IA es el futuro operativo." },
    readingMinutes: 5,
  },
  {
    entryId: "lin-ambient-ai-documentation-2024",
    narrative: {
      en: "Stanford's study of ambient AI scribing found 40% documentation time reduction and improved note completeness — but also raised concerns about HCC/wRVU upcoding and hallucinated clinical details. For FQHC executives, the PPS billing model creates a different risk profile than fee-for-service: upcoding doesn't directly increase your per-visit payment (PPS is a flat rate), so the financial incentive to upcode is lower.\n\nBut the quality risks remain: AI-generated notes may include clinical details that didn't occur in the visit, creating malpractice liability and quality measurement distortion. FQHC executives implementing AI scribing need: provider-level note review protocols, quality auditing procedures, and clear vendor accountability frameworks.\n\nAltaMed's deployment of Abridge across 60+ sites (500K+ patients, 28 languages) is the largest FQHC AI implementation in the US and the most relevant case study for other FQHCs considering adoption. Their selection criteria — multilingual support, Epic integration, clinician burnout reduction — represent the key decision factors.",
      es: "IA de documentación reduce tiempo 40% pero tiene riesgos: detalles alucinados y responsabilidad legal. El modelo PPS de FQHCs reduce el riesgo de sobrecodificación. AltaMed desplegó Abridge en 60+ sitios — el mayor caso de estudio para FQHCs."
    },
    keyInsight: { en: "PPS billing means FQHCs face lower upcoding risk from AI scribing than fee-for-service practices. But quality risks (hallucinated details, malpractice liability) remain. Implement with provider review protocols and quality auditing.", es: "El PPS significa menor riesgo de sobrecodificación con IA. Pero los riesgos de calidad permanecen. Implementar con protocolos de revisión." },
    quotes: [{ text: { en: "Ambient AI documentation reduced physician documentation time by approximately 40% while maintaining or improving note completeness — but also introduced risks of coding inflation and clinical detail fabrication that require institutional safeguards.", es: "La documentación ambiental con IA redujo tiempo de documentación 40% pero introdujo riesgos que requieren salvaguardas institucionales." }, attribution: "— Lin et al., NEJM AI, 2024" }],
    transitionNote: { en: "AI handles documentation. CCBHC certification handles behavioral health funding — a critical diversification strategy as Medicaid revenue contracts.", es: "La IA maneja documentación. La certificación CCBHC maneja financiamiento de salud conductual — una estrategia crítica de diversificación." },
    readingMinutes: 5,
  },
  {
    entryId: "samhsa-ccbhc-certification-2024",
    narrative: {
      en: "CCBHC (Certified Community Behavioral Health Clinic) certification is the most significant behavioral health funding opportunity since the ACA. The CCBHC model provides PPS-like cost-based reimbursement for ALL behavioral health services — including crisis services, substance use treatment, and psychiatric care — regardless of payer.\n\nFor FQHC executives, CCBHC certification serves two strategic purposes: (1) revenue diversification — behavioral health services become cost-based rather than dependent on inadequate fee-for-service rates, and (2) competitive positioning — CCBHCs must provide 24/7 crisis services, evidence-based practices, and integrated care coordination, creating a quality differentiation from standalone BH providers.\n\nThe operational requirements are substantial: 24/7 crisis services (can be via contract), evidence-based practices for designated conditions, care coordination with physical health, and quality reporting. But for FQHCs already providing integrated behavioral health, the incremental investment is manageable — and the revenue upside is significant.\n\nCongratulations — you've completed the Executive: Strategy & Finance curriculum. From Section 330's legal architecture through PPS mechanics, 340B strategy, workforce navigation, and value-based transformation — you now have the evidence base to lead your FQHC through the 2026 crisis with strategic clarity.",
      es: "CCBHC proporciona reembolso basado en costos para TODOS los servicios de salud conductual. Para ejecutivos: diversificación de ingresos + diferenciación competitiva. Los requisitos operativos son sustanciales pero manejables para FQHCs que ya integran salud conductual.\n\nFelicitaciones — has completado el currículo Ejecutivo."
    },
    keyInsight: { en: "CCBHC certification is the biggest behavioral health revenue opportunity in a decade. If you already provide integrated BH, the incremental investment to meet CCBHC requirements is smaller than you think — and the cost-based reimbursement model fundamentally changes BH economics.", es: "La certificación CCBHC es la mayor oportunidad de ingresos de salud conductual en una década." },
    quotes: [{ text: { en: "CCBHCs receive a cost-based, per-diem reimbursement rate that covers the full scope of behavioral health services, creating financial sustainability for comprehensive crisis, treatment, and recovery services.", es: "Los CCBHCs reciben reembolso basado en costos que cubre el alcance completo de servicios de salud conductual." }, attribution: "— SAMHSA, CCBHC Certification Criteria, 2024" }],
    transitionNote: { en: "You've completed the Executive curriculum. Section 330 → PPS → 340B → Workforce → SB 525 → Medicaid dependence → Policy advocacy → PCMH → UDS → Value-based payment → AI → CCBHC. You have the evidence base to lead.", es: "Has completado el currículo Ejecutivo. Tienes la base de evidencia para liderar." },
    readingMinutes: 5,
  },
]

export const EXECUTIVE_TRACK: CurriculumTrack = {
  id: "executive-strategy",
  name: { en: "Executive: Strategy & Finance", es: "Ejecutivo: Estrategia y Finanzas" },
  audience: "executive",
  description: { en: "For CEOs, CFOs, COOs, and board members — the policy, financial, and strategic evidence that shapes FQHC decision-making.", es: "Para CEOs, CFOs, COOs y miembros de junta — la evidencia de políticas, finanzas y estrategia." },
  levels: [
    {
      level: "foundational", label: { en: "FQHC Business Model", es: "Modelo de Negocio de FQHCs" },
      overview: { en: "Five readings that cover the legal, financial, and regulatory architecture of running an FQHC: Section 330 requirements, PPS reimbursement mechanics, 340B pharmacy strategy, workforce crisis data, and SB 525 cost impact.", es: "Cinco lecturas sobre la arquitectura legal, financiera y regulatoria de administrar un FQHC." },
      entryIds: ["taylor-section-330-history-2004", "rosenbaum-pps-fqhc-reimbursement-2010", "340b-hrsa-program-overview-2024", "nachc-workforce-study-2023", "ca-sb525-healthcare-minimum-wage-2023"],
      lessons: executiveFoundationalLessons,
    },
    {
      level: "intermediate", label: { en: "Revenue & Sustainability", es: "Ingresos y Sostenibilidad" },
      overview: { en: "Four readings on financial sustainability: Medicaid dependence risk, political advocacy strategy, PCMH revenue opportunities, and UDS performance management.", es: "Cuatro lecturas sobre sostenibilidad financiera: riesgo de dependencia de Medicaid, abogacía política, PCMH y gestión de desempeño UDS." },
      entryIds: ["shin-fqhc-medicaid-dependence-2020", "rosenbaum-fqhc-policy-evolution-2017", "ncqa-pcmh-standards-2023", "hrsa-uds-reporting-2024"],
      lessons: executiveIntermediateLessons,
    },
    {
      level: "advanced", label: { en: "Innovation & Transformation", es: "Innovación y Transformación" },
      overview: { en: "Three readings on the forces reshaping FQHC operations: value-based payment models, AI-assisted documentation, and CCBHC behavioral health funding.", es: "Tres lecturas sobre las fuerzas que remodelan las operaciones de FQHCs: pago basado en valor, IA y financiamiento CCBHC." },
      entryIds: ["mcwilliams-aco-savings-2016", "lin-ambient-ai-documentation-2024", "samhsa-ccbhc-certification-2024"],
      lessons: executiveAdvancedLessons,
    },
  ],
}

// ── ASSEMBLED TRACKS ARRAY ───────────────────────────────

export const SYLLABUS_TRACKS: CurriculumTrack[] = [
  CLINICIAN_TRACK,
  NON_CLINICIAN_TRACK,
  PUBLIC_HEALTH_TRACK,
  EXECUTIVE_TRACK,
]
