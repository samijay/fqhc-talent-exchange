import Link from "next/link";
import { setRequestLocale } from "next-intl/server";

interface Section {
  heading: string;
  paragraphs: string[];
}

interface TermsContent {
  title: string;
  lastUpdated: string;
  breadcrumbHome: string;
  breadcrumbTerms: string;
  sections: Section[];
}

const enContent: TermsContent = {
  title: "Terms of Service",
  lastUpdated: "Last updated: March 10, 2026",
  breadcrumbHome: "Home",
  breadcrumbTerms: "Terms of Service",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      paragraphs: [
        "By accessing or using FQHC Talent (fqhctalent.com), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, please do not use our website or services.",
        "These Terms constitute a legally binding agreement between you and FQHC Talent. We may update these Terms from time to time. When we make material changes, we will update the \"Last updated\" date at the top of this page and, where possible, notify registered users by email. Continued use of the site after changes are posted constitutes your acceptance of the revised Terms.",
        "If any provision of these Terms is found to be unenforceable by a court of competent jurisdiction, the remaining provisions will continue in full force and effect.",
      ],
    },
    {
      heading: "2. Description of Service",
      paragraphs: [
        "FQHC Talent is a free online platform that serves community health professionals and FQHC leaders across California. Our services include: a job listings directory with 600+ FQHC positions; an FQHC directory with 220+ organizational profiles and strategic reports; a resume builder tool; career assessment and interview preparation tools; a job posting builder tool; career resources and blog content; an intelligence dashboard with policy, legislative, AI, layoff, and salary tracking; an FQHC Academy with interactive courses (including OKR training, masterclass modules, and learning pathways); a clinic operations simulator; newsletter publications (Intel Brief for leaders, The Pulse for job seekers); locum tenens provider matching; and waitlist registration for candidates and employers.",
        "Important: We are a career resource, workforce intelligence, and professional development platform. We are not a staffing agency, employment agency, employer, recruiter, or placement service. We do not directly employ, hire, fire, manage, supervise, or place candidates at any FQHC or other organization. We do not make hiring decisions, conduct background checks, verify credentials, or guarantee employment outcomes.",
        "All employment relationships are solely between the candidate and the hiring FQHC. We provide free career tools, aggregated job postings, educational courses, and strategic resources but have no involvement in or control over the terms, conditions, or decisions of employment.",
      ],
    },
    {
      heading: "3. User Eligibility",
      paragraphs: [
        "FQHC Talent is intended for use by adults aged 18 and older who are seeking employment or hiring talent in the community health sector. By using our platform, you represent that you are at least 18 years of age.",
        "If you are using the platform on behalf of an organization (such as an FQHC or healthcare employer), you represent that you have the authority to bind that organization to these Terms.",
      ],
    },
    {
      heading: "4. User Accounts and Registration",
      paragraphs: [
        "FQHC Talent offers both account-based and anonymous access. You may create an account using email/password or Google OAuth authentication. Many features (including courses, career tools, and the resume builder) are available without creating an account. When you sign up for our candidate or employer waitlist, subscribe to our newsletter, or use our tools, you provide information voluntarily.",
        "If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized access to or use of your account.",
        "You are responsible for ensuring that any information you provide — including your name, email address, professional experience, certifications, licensure status, and other details — is accurate, complete, and up to date. You agree not to register using false, misleading, or another person's information.",
        "You agree not to create multiple accounts or registrations for the purpose of circumventing platform rules, rate limits, or for any deceptive purpose.",
      ],
    },
    {
      heading: "5. User Responsibilities and Prohibited Conduct",
      paragraphs: [
        "When using FQHC Talent, you agree to the following:",
        "You will provide accurate, truthful information about your qualifications, experience, and professional background. You will not misrepresent your credentials, certifications, licensure status, education, or work history. Misrepresentation of professional qualifications in the healthcare field can have serious consequences, and you bear sole responsibility for the accuracy of the information you provide.",
        "You will use the platform for its intended purpose: exploring career opportunities at FQHCs, building your resume, taking career assessments, completing training courses, using strategic tools and simulators, subscribing to newsletters, creating job postings, or connecting with community health talent as an employer.",
        "You will not use the platform for any unlawful purpose, to harass, threaten, or harm others, to distribute spam, malware, or unsolicited communications, to scrape or harvest data from our platform, or to attempt to gain unauthorized access to our systems, databases, or other users' information.",
        "You will not attempt to reverse engineer, decompile, or disassemble any part of our platform, or use automated tools (bots, crawlers, scrapers) to access our services without our written consent.",
        "You will maintain professional conduct in all interactions facilitated by or related to the platform.",
        "Violation of these rules may result in immediate termination of your access to the platform without notice.",
      ],
    },
    {
      heading: "6. Intellectual Property",
      paragraphs: [
        "All content on FQHC Talent — including text, graphics, logos, page layouts, blog articles, career guides, resume templates, assessment questions, job posting templates, salary benchmarks, data compilations, and the overall design and structure of the site — is the property of FQHC Talent or its content contributors and is protected by applicable intellectual property laws, including copyright and trademark laws.",
        "You may not copy, reproduce, distribute, publish, display, create derivative works from, or commercially exploit our content without prior written permission. Personal, non-commercial use of the site (such as reading articles, building your own resume, or taking the career assessment) is permitted under normal use.",
        "You retain ownership of the personal and professional information you submit to our platform (such as your resume data, work history, and profile information). By submitting this information, you grant FQHC Talent a non-exclusive, worldwide, royalty-free license to use, store, and process this information for the purposes described in our Privacy Policy — specifically, to provide our career tools and resume building services.",
        "This license does not give us the right to sell your personal information or use it for purposes unrelated to our platform services.",
      ],
    },
    {
      heading: "7. Job Listings, FQHC Information, and Salary Data",
      paragraphs: [
        "FQHC Talent displays job listings, organizational information, and salary benchmarks about Federally Qualified Health Centers across California. While we make every effort to keep this information accurate and current, we do not guarantee the accuracy, completeness, timeliness, or availability of any job listing, FQHC data, salary range, or other information displayed on our platform.",
        "Job listings may reflect positions that have been filled, modified, or removed since they were last updated. Salary ranges, benefits, and other compensation details are provided as estimates based on publicly available information and general market data. They may not reflect the exact terms offered by any specific employer and should not be relied upon as the basis for employment negotiations or financial decisions.",
        "FQHC profiles, including Glassdoor ratings, program information, and organizational data, are compiled from public sources and may not reflect the most current information. We are not affiliated with or endorsed by any FQHC listed on our platform unless explicitly stated.",
        "We encourage all users to verify job details, salary information, and organizational data directly with the hiring FQHC before making career decisions based on information found on our platform.",
      ],
    },
    {
      heading: "8. Career Tools, Academy Courses, and Simulators",
      paragraphs: [
        "Our career tools (resume builder, career assessment, interview prep, learning pathway, career roadmap, certifications guide), Academy courses (OKR Course, Masterclass), and strategic simulators (Clinic Operations Simulator, Schedule Planner) are provided as free resources. These tools generate content based on templates, your inputs, and general professional guidance principles.",
        "The resume content, career recommendations, assessment results, simulation outputs, course content, and compliance checklists provided by our tools are for informational, educational, and guidance purposes only. They do not constitute professional career counseling, employment advice, legal advice, financial advice, medical advice, or a guarantee of any specific outcome. Your use of these tools and the resulting documents is at your own discretion and risk.",
        "You are solely responsible for reviewing, editing, and verifying the accuracy of any resume, cover letter, job posting, financial simulation, staffing plan, or compliance checklist generated using our tools before using them in a professional context. We are not responsible for errors, omissions, or misrepresentations in documents or outputs you create using our platform.",
        "Career assessment and team readiness results are based on self-reported responses and provide general guidance about professional strengths and development areas. They are not clinical assessments, psychological evaluations, or certifications of any kind.",
        "Clinic simulator and schedule planner outputs are hypothetical models based on general industry data and the parameters you input. They should not be relied upon as the sole basis for staffing, budgeting, or operational decisions. Always consult qualified professionals for critical business decisions.",
        "Academy course content, including compliance and regulatory modules, is educational in nature and does not replace professional training, legal compliance programs, or official certifications required by regulatory bodies (HRSA, OSHA, etc.).",
      ],
    },
    {
      heading: "9. AI-Generated Content",
      paragraphs: [
        "All editorial content on FQHC Talent — including blog articles, operational guides, strategic guides, salary benchmarks, career assessment questions, OKR templates, case studies, masterclass modules, intelligence summaries, and newsletter content — is generated by artificial intelligence (Anthropic's Claude language models) and curated by our team.",
        "While we strive for accuracy, AI-generated content may contain errors, outdated information, misinterpretations, or biases. You should not rely solely on AI-generated content for legal, financial, medical, regulatory, or employment decisions.",
        "Specifically: regulatory information (such as scope-of-practice, delegation rules, and Business and Professions Code citations) is for educational purposes only and does not constitute legal advice. Salary data are estimates based on publicly available market data and may not reflect actual compensation at any specific employer. Policy intelligence and forecasts are analysis of public sources and do not constitute professional policy, legal, or financial advice.",
        "Always verify critical information with qualified professionals (attorneys, accountants, physicians, HR consultants) and primary sources before acting on any content found on our platform.",
      ],
    },
    {
      heading: "10. Job Posting Builder Tool",
      paragraphs: [
        "Our job posting builder tool is provided as a free resource to help FQHCs and healthcare employers create job postings. Salary benchmarks and compensation data included in the tool are estimates based on publicly available market data.",
        "Employers are solely responsible for ensuring that their job postings comply with all applicable federal, state, and local laws, including but not limited to equal employment opportunity laws, the California Fair Employment and Housing Act (FEHA), California pay transparency requirements (SB 1162), and the Americans with Disabilities Act (ADA).",
        "FQHC Talent does not review, approve, or endorse any job posting created using our tool. We are not liable for the content of job postings, hiring decisions, or employment terms established by employers using our platform.",
      ],
    },
    {
      heading: "11. Newsletter and Email Communications",
      paragraphs: [
        "FQHC Talent operates two newsletter publications: Intel Brief (strategic intelligence for FQHC leaders, delivered weekly) and The Pulse (career updates and job market insights for job seekers, delivered weekly). Subscribing to our newsletters is voluntary and free.",
        "By subscribing to our newsletter, you consent to receive periodic email communications from FQHC Talent including: your selected newsletter track(s), a short automated welcome sequence (typically 3-4 emails over 2-3 weeks), and occasional platform update announcements. We will not send you unsolicited marketing emails beyond these categories.",
        "Every email we send includes a one-click unsubscribe link at the bottom. You may unsubscribe at any time, and we will honor your request immediately. Unsubscribe is processed via a secure token — we do not require you to log in or confirm by email to unsubscribe.",
        "Newsletter content is generated using AI (Anthropic's Claude) and curated by our team. While we strive for accuracy, newsletter content (including policy updates, funding alerts, job market analysis, and regulatory information) is for informational purposes only and does not constitute professional, legal, financial, or medical advice. Always verify critical information with qualified professionals and primary sources.",
        "We comply with the CAN-SPAM Act (15 U.S.C. § 7701 et seq.) and California commercial email requirements. Our emails include: our physical mailing address or valid contact information, a clear identification of the message as a commercial communication, and a functioning opt-out mechanism.",
        "We do not sell, rent, or share our subscriber email list with any third party for marketing purposes. Your email address is shared only with our email delivery provider (Resend) for the sole purpose of delivering your subscribed newsletters.",
      ],
    },
    {
      heading: "12. Data Use and Privacy",
      paragraphs: [
        "Your use of FQHC Talent is also governed by our Privacy Policy, which explains how we collect, use, share, and protect your personal information. By using our platform, you acknowledge that you have read and understood our Privacy Policy.",
        "By submitting your information through our platform (including waitlist signups, resume profiles, and employer registrations), you consent to our collection and use of that information as described in our Privacy Policy. This includes sharing your professional profile with FQHC employers when you have opted in to be considered for job opportunities.",
        "You may request deletion of your data at any time by contacting us at privacy@fqhctalent.com. We will process your request within 45 days as required by California law.",
      ],
    },
    {
      heading: "13. Disclaimer of Warranties",
      paragraphs: [
        "FQHC TALENT EXCHANGE IS PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:",
        "IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
        "ANY WARRANTY THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.",
        "ANY WARRANTY REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY CONTENT, JOB LISTINGS, SALARY DATA, FQHC INFORMATION, CAREER ASSESSMENT RESULTS, OR OTHER INFORMATION PROVIDED THROUGH THE PLATFORM.",
        "ANY WARRANTY THAT YOU WILL FIND EMPLOYMENT, RECEIVE JOB OFFERS, OR BE HIRED THROUGH THE USE OF OUR PLATFORM.",
        "ANY WARRANTY THAT EMPLOYERS WILL FIND SUITABLE CANDIDATES THROUGH THE USE OF OUR PLATFORM.",
        "WE DO NOT WARRANT THAT THE PLATFORM MEETS YOUR SPECIFIC REQUIREMENTS OR EXPECTATIONS. YOUR USE OF THE PLATFORM IS AT YOUR SOLE RISK.",
      ],
    },
    {
      heading: "14. Limitation of Liability",
      paragraphs: [
        "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, FQHC TALENT EXCHANGE, ITS OWNER(S), OPERATOR(S), OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, CONTRACTORS, AND CONTENT CONTRIBUTORS (COLLECTIVELY, THE \"FQHC TALENT EXCHANGE PARTIES\") SHALL NOT BE LIABLE FOR ANY OF THE FOLLOWING ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THE PLATFORM:",
        "ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES.",
        "ANY DAMAGES ARISING FROM: (A) YOUR RELIANCE ON ANY INFORMATION PROVIDED THROUGH THE PLATFORM, INCLUDING JOB LISTINGS, SALARY DATA, OR CAREER RECOMMENDATIONS; (B) ANY EMPLOYMENT DECISIONS, HIRING OUTCOMES, OR CAREER CHANGES MADE BASED ON INFORMATION FOUND ON THE PLATFORM; (C) ANY INTERACTIONS, COMMUNICATIONS, OR RELATIONSHIPS BETWEEN CANDIDATES AND EMPLOYERS FACILITATED THROUGH THE PLATFORM; (D) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA OR TRANSMISSIONS; (E) CONDUCT OF ANY THIRD PARTY ON OR RELATED TO THE PLATFORM.",
        "IN NO EVENT SHALL THE TOTAL LIABILITY OF THE FQHC TALENT EXCHANGE PARTIES TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE PLATFORM EXCEED ONE HUNDRED DOLLARS ($100.00) OR THE AMOUNT YOU PAID TO USE THE PLATFORM IN THE TWELVE MONTHS PRECEDING THE CLAIM, WHICHEVER IS GREATER.",
        "SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF YOU RESIDE IN SUCH A JURISDICTION, SOME OR ALL OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU, BUT THEY WILL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW.",
      ],
    },
    {
      heading: "15. Indemnification",
      paragraphs: [
        "You agree to defend, indemnify, and hold harmless the FQHC Talent Parties from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from or related to:",
        "(a) Your use of or access to the platform; (b) Your violation of these Terms; (c) Your violation of any third-party rights, including intellectual property rights or privacy rights; (d) Any content or information you submit to the platform, including but not limited to resume data, professional claims, and employer information; (e) Any misrepresentation of your qualifications, credentials, or professional background; (f) Any employment disputes between you and an employer connected through the platform.",
        "This indemnification obligation will survive the termination of these Terms and your use of the platform.",
      ],
    },
    {
      heading: "16. Dispute Resolution",
      paragraphs: [
        "Any dispute, controversy, or claim arising out of or relating to these Terms or your use of the platform shall first be addressed through good-faith negotiation between the parties. If the dispute cannot be resolved through negotiation within thirty (30) days, either party may proceed with the remedies described below.",
        "For disputes that cannot be resolved through negotiation, both parties agree to attempt mediation before a mutually agreed-upon mediator in the State of California before pursuing litigation.",
        "If mediation is unsuccessful, any remaining dispute shall be resolved exclusively in the state or federal courts located in the State of California. Both parties consent to the personal jurisdiction of these courts and waive any objections to venue.",
        "CLASS ACTION WAIVER: TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. IF THIS CLASS ACTION WAIVER IS FOUND TO BE UNENFORCEABLE, THEN THE ENTIRETY OF THIS DISPUTE RESOLUTION SECTION SHALL BE NULL AND VOID.",
        "Nothing in this section prevents either party from seeking injunctive or other equitable relief in court for matters related to data security, intellectual property, or unauthorized access to the platform.",
      ],
    },
    {
      heading: "17. No Employment Relationship",
      paragraphs: [
        "Nothing in these Terms or your use of FQHC Talent creates an employment, agency, partnership, joint venture, or franchise relationship between you and FQHC Talent.",
        "We are not a party to any employment contract between candidates and employers. We do not control or have any obligation with respect to: job offers or hiring decisions made by employers, the terms and conditions of any employment, workplace conduct or workplace safety, compensation, benefits, or employment disputes, compliance with employment laws by any employer.",
        "Candidates are solely responsible for evaluating the suitability and legitimacy of any job opportunity. Employers are solely responsible for compliance with all applicable employment laws, including but not limited to equal employment opportunity laws, wage and hour laws, immigration laws, and workplace safety regulations.",
      ],
    },
    {
      heading: "18. Third-Party Content and Links",
      paragraphs: [
        "Our platform may contain links to third-party websites, including FQHC careers pages, job application portals, and external resources. These links are provided for convenience only and do not constitute an endorsement, sponsorship, or recommendation by FQHC Talent.",
        "We have no control over and are not responsible for the content, privacy practices, terms of service, or availability of any third-party website. Your interactions with third-party websites are governed by those sites' own terms and policies.",
        "If you encounter a link on our platform that you believe is inappropriate, broken, or potentially harmful, please report it to info@fqhctalent.com.",
      ],
    },
    {
      heading: "19. Termination",
      paragraphs: [
        "We reserve the right to suspend or terminate your access to FQHC Talent at any time, with or without notice, for conduct that we determine, in our sole discretion, violates these Terms, is harmful to other users, third parties, or the platform, or is otherwise objectionable.",
        "This includes, but is not limited to: providing false or misleading information, misrepresenting qualifications or credentials, engaging in abusive, harassing, or discriminatory behavior, scraping or harvesting data, distributing spam, and attempting to circumvent security measures or rate limits.",
        "Upon termination, your right to use the platform ceases immediately. Provisions of these Terms that by their nature should survive termination (including but not limited to Sections 12-15, 16, and 20) will continue in effect after termination.",
      ],
    },
    {
      heading: "20. Force Majeure",
      paragraphs: [
        "FQHC Talent shall not be liable for any failure or delay in performing its obligations under these Terms due to circumstances beyond its reasonable control, including but not limited to: natural disasters, pandemics, acts of government, internet service disruptions, power outages, cyberattacks, or failures of third-party service providers.",
      ],
    },
    {
      heading: "21. Governing Law",
      paragraphs: [
        "These Terms of Service are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. To the extent any dispute is litigated in court (as provided in Section 16), both parties agree to the exclusive jurisdiction of the state and federal courts located in the State of California.",
        "If you are a California resident, you also have specific rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA) as described in our Privacy Policy.",
      ],
    },
    {
      heading: "22. Entire Agreement and Severability",
      paragraphs: [
        "These Terms, together with our Privacy Policy, constitute the entire agreement between you and FQHC Talent regarding your use of the platform and supersede any prior agreements or understandings.",
        "If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the validity, legality, and enforceability of the remaining provisions shall not be affected or impaired. The unenforceable provision will be modified to the minimum extent necessary to make it enforceable while preserving the original intent.",
        "Our failure to enforce any right or provision of these Terms shall not be considered a waiver of that right or provision.",
      ],
    },
    {
      heading: "23. Contact",
      paragraphs: [
        "If you have questions about these Terms of Service, please contact us:",
        "General inquiries: info@fqhctalent.com",
        "Privacy and data requests: privacy@fqhctalent.com",
        "We aim to respond to all inquiries within 10 business days.",
      ],
    },
  ],
};

const esContent: TermsContent = {
  title: "Términos de Servicio",
  lastUpdated: "Última actualización: 10 de marzo de 2026",
  breadcrumbHome: "Inicio",
  breadcrumbTerms: "Términos de Servicio",
  sections: [
    {
      heading: "1. Aceptación de los Términos",
      paragraphs: [
        "Al acceder o utilizar FQHC Talent (fqhctalent.com), usted acepta estar sujeto a estos Términos de Servicio (\"Términos\"). Si no está de acuerdo con estos Términos, por favor no utilice nuestro sitio web ni nuestros servicios.",
        "Estos Términos constituyen un acuerdo legalmente vinculante entre usted y FQHC Talent. Podemos actualizar estos Términos de vez en cuando. Cuando realicemos cambios importantes, actualizaremos la fecha de \"Última actualización\" en la parte superior de esta página y, cuando sea posible, notificaremos a los usuarios registrados por correo electrónico. El uso continuado del sitio después de que se publiquen cambios constituye su aceptación de los Términos revisados.",
        "Si alguna disposición de estos Términos resulta inaplicable por un tribunal competente, las disposiciones restantes seguirán en pleno vigor y efecto.",
      ],
    },
    {
      heading: "2. Descripción del Servicio",
      paragraphs: [
        "FQHC Talent es una plataforma en línea gratuita que sirve a profesionales de salud comunitaria y líderes de FQHC en toda California. Nuestros servicios incluyen: un directorio de ofertas de trabajo con más de 600 posiciones en FQHCs; un directorio de FQHCs con más de 220 perfiles organizacionales e informes estratégicos; una herramienta para crear currículos; herramientas de evaluación de carrera y preparación para entrevistas; una herramienta para crear publicaciones de empleo; recursos de carrera y contenido de blog; un panel de inteligencia con seguimiento de políticas, legislación, IA, despidos y salarios; una Academia FQHC con cursos interactivos (incluyendo capacitación en OKR, módulos de masterclass y rutas de aprendizaje); un simulador de operaciones clínicas; publicaciones de boletín (Intel Brief para líderes, The Pulse para buscadores de empleo); conexión de proveedores locum tenens; y registro en lista de espera para candidatos y empleadores.",
        "Importante: Somos una plataforma de recursos de carrera, inteligencia laboral y desarrollo profesional. No somos una agencia de personal, agencia de empleo, empleador, reclutador ni servicio de colocación. No empleamos, contratamos, despedimos, gestionamos, supervisamos ni colocamos directamente a candidatos en ningún FQHC u otra organización. No tomamos decisiones de contratación, realizamos verificaciones de antecedentes, verificamos credenciales ni garantizamos resultados de empleo.",
        "Todas las relaciones laborales son exclusivamente entre el candidato y el FQHC contratante. Proporcionamos herramientas de carrera gratuitas, ofertas de empleo agregadas, cursos educativos y recursos estratégicos pero no tenemos participación ni control sobre los términos, condiciones o decisiones de empleo.",
      ],
    },
    {
      heading: "3. Elegibilidad del Usuario",
      paragraphs: [
        "FQHC Talent está destinado para uso por adultos de 18 años o más que buscan empleo o contratar talento en el sector de salud comunitaria. Al usar nuestra plataforma, usted declara que tiene al menos 18 años de edad.",
        "Si utiliza la plataforma en nombre de una organización (como un FQHC o empleador de salud), usted declara que tiene la autoridad para vincular a esa organización a estos Términos.",
      ],
    },
    {
      heading: "4. Cuentas de Usuario y Registro",
      paragraphs: [
        "FQHC Talent ofrece acceso basado en cuenta y anónimo. Puede crear una cuenta utilizando autenticación por correo electrónico/contraseña o Google OAuth. Muchas funciones (incluyendo cursos, herramientas de carrera y el creador de currículos) están disponibles sin crear una cuenta. Cuando se registra en nuestra lista de espera, se suscribe a nuestro boletín o utiliza nuestras herramientas, usted proporciona información voluntariamente.",
        "Si crea una cuenta, usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de toda la actividad que ocurra bajo su cuenta. Acepta notificarnos inmediatamente de cualquier acceso no autorizado o uso de su cuenta.",
        "Usted es responsable de asegurar que cualquier información que proporcione — incluyendo su nombre, dirección de correo electrónico, experiencia profesional, certificaciones, estado de licencia y otros detalles — sea precisa, completa y esté actualizada. Usted acepta no registrarse utilizando información falsa, engañosa o de otra persona.",
        "Usted acepta no crear múltiples cuentas o registros con el propósito de eludir las reglas de la plataforma, límites de velocidad o con cualquier propósito engañoso.",
      ],
    },
    {
      heading: "5. Responsabilidades del Usuario y Conducta Prohibida",
      paragraphs: [
        "Al utilizar FQHC Talent, usted acepta lo siguiente:",
        "Proporcionará información precisa y veraz sobre sus calificaciones, experiencia y antecedentes profesionales. No tergiversará sus credenciales, certificaciones, estado de licencia, educación ni historial laboral. La tergiversación de calificaciones profesionales en el campo de la salud puede tener consecuencias graves, y usted asume la responsabilidad exclusiva de la exactitud de la información que proporciona.",
        "Utilizará la plataforma para su propósito previsto: explorar oportunidades de carrera en FQHCs, crear su currículum, realizar evaluaciones de carrera, completar cursos de capacitación, usar herramientas estratégicas y simuladores, suscribirse a boletines, crear publicaciones de empleo o conectarse con talento de salud comunitaria como empleador.",
        "No utilizará la plataforma para ningún propósito ilegal, para acosar, amenazar o dañar a otros, para distribuir spam, malware o comunicaciones no solicitadas, para extraer o recopilar datos de nuestra plataforma, ni para intentar obtener acceso no autorizado a nuestros sistemas, bases de datos o información de otros usuarios.",
        "No intentará realizar ingeniería inversa, descompilar o desensamblar ninguna parte de nuestra plataforma, ni utilizar herramientas automatizadas (bots, rastreadores, extractores) para acceder a nuestros servicios sin nuestro consentimiento por escrito.",
        "Mantendrá una conducta profesional en todas las interacciones facilitadas por o relacionadas con la plataforma.",
        "La violación de estas reglas puede resultar en la terminación inmediata de su acceso a la plataforma sin previo aviso.",
      ],
    },
    {
      heading: "6. Propiedad Intelectual",
      paragraphs: [
        "Todo el contenido en FQHC Talent — incluyendo texto, gráficos, logotipos, diseños de página, artículos de blog, guías de carrera, plantillas de currículum, preguntas de evaluación, plantillas de publicación de empleo, datos salariales de referencia, compilaciones de datos y el diseño y estructura general del sitio — es propiedad de FQHC Talent o sus colaboradores de contenido y está protegido por las leyes de propiedad intelectual aplicables, incluyendo leyes de derechos de autor y marcas registradas.",
        "No puede copiar, reproducir, distribuir, publicar, mostrar, crear obras derivadas ni explotar comercialmente nuestro contenido sin permiso previo por escrito. El uso personal y no comercial del sitio (como leer artículos, crear su propio currículum o tomar la evaluación de carrera) está permitido bajo uso normal.",
        "Usted conserva la propiedad de la información personal y profesional que envía a nuestra plataforma (como datos de currículum, historial laboral e información de perfil). Al enviar esta información, usted otorga a FQHC Talent una licencia no exclusiva, mundial y libre de regalías para usar, almacenar y procesar esta información para los propósitos descritos en nuestra Política de Privacidad — específicamente, para proporcionar nuestros servicios de conexión laboral y creación de currículos.",
        "Esta licencia no nos da el derecho de vender su información personal ni usarla para propósitos no relacionados con los servicios de nuestra plataforma.",
      ],
    },
    {
      heading: "7. Ofertas de Trabajo, Información de FQHCs y Datos Salariales",
      paragraphs: [
        "FQHC Talent muestra ofertas de trabajo, información organizacional y datos salariales de referencia sobre Centros de Salud Calificados Federalmente en toda California. Aunque hacemos todo lo posible por mantener esta información precisa y actualizada, no garantizamos la exactitud, integridad, oportunidad o disponibilidad de ninguna oferta de trabajo, datos de FQHC, rango salarial u otra información mostrada en nuestra plataforma.",
        "Las ofertas de trabajo pueden reflejar posiciones que se han cubierto, modificado o eliminado desde su última actualización. Los rangos salariales, beneficios y otros detalles de compensación se proporcionan como estimaciones basadas en información disponible públicamente y datos generales del mercado. Pueden no reflejar los términos exactos ofrecidos por ningún empleador específico y no deben utilizarse como base para negociaciones de empleo o decisiones financieras.",
        "Los perfiles de FQHC, incluyendo calificaciones de Glassdoor, información de programas y datos organizacionales, se compilan de fuentes públicas y pueden no reflejar la información más actual. No estamos afiliados ni respaldados por ningún FQHC listado en nuestra plataforma a menos que se indique explícitamente.",
        "Animamos a todos los usuarios a verificar los detalles del trabajo, información salarial y datos organizacionales directamente con el FQHC contratante antes de tomar decisiones de carrera basadas en información encontrada en nuestra plataforma.",
      ],
    },
    {
      heading: "8. Herramientas de Carrera, Cursos de la Academia y Simuladores",
      paragraphs: [
        "Nuestras herramientas de carrera (creador de currículum, evaluación de carrera, preparación para entrevistas, ruta de aprendizaje, ruta profesional, guía de certificaciones), cursos de la Academia (Curso OKR, Masterclass) y simuladores estratégicos (Simulador de Operaciones Clínicas, Planificador de Horarios) se proporcionan como recursos gratuitos. Estas herramientas generan contenido basado en plantillas, sus entradas y principios generales de orientación profesional.",
        "El contenido del currículum, las recomendaciones de carrera, los resultados de evaluación, los resultados de simulación, el contenido de cursos y las listas de verificación de cumplimiento proporcionados por nuestras herramientas son solo para fines informativos, educativos y de orientación. No constituyen asesoramiento profesional de carrera, asesoramiento de empleo, asesoramiento legal, asesoramiento financiero, asesoramiento médico ni garantía de ningún resultado específico. Su uso de estas herramientas y los documentos resultantes es bajo su propia discreción y riesgo.",
        "Usted es el único responsable de revisar, editar y verificar la exactitud de cualquier currículum, carta de presentación, publicación de empleo, simulación financiera, plan de personal o lista de verificación de cumplimiento generada utilizando nuestras herramientas antes de usarlas en un contexto profesional. No somos responsables de errores, omisiones o tergiversaciones en documentos o resultados que cree utilizando nuestra plataforma.",
        "Los resultados de evaluaciones de carrera y preparación de equipo se basan en respuestas autoinformadas y proporcionan orientación general sobre fortalezas profesionales y áreas de desarrollo. No son evaluaciones clínicas, evaluaciones psicológicas ni certificaciones de ningún tipo.",
        "Los resultados del simulador clínico y el planificador de horarios son modelos hipotéticos basados en datos generales de la industria y los parámetros que usted ingrese. No deben utilizarse como la única base para decisiones de personal, presupuesto u operacionales. Siempre consulte a profesionales calificados para decisiones comerciales críticas.",
        "El contenido de cursos de la Academia, incluyendo módulos de cumplimiento y regulatorios, es de naturaleza educativa y no reemplaza la capacitación profesional, los programas de cumplimiento legal ni las certificaciones oficiales requeridas por organismos reguladores (HRSA, OSHA, etc.).",
      ],
    },
    {
      heading: "9. Contenido Generado por IA",
      paragraphs: [
        "Todo el contenido editorial en FQHC Talent — incluyendo artículos de blog, guías operativas, guías estratégicas, datos salariales de referencia, preguntas de evaluación de carrera, plantillas OKR, estudios de caso, módulos de masterclass, resúmenes de inteligencia, y contenido de boletines — es generado por inteligencia artificial (modelos de lenguaje Claude de Anthropic) y curado por nuestro equipo.",
        "Aunque nos esforzamos por lograr precisión, el contenido generado por IA puede contener errores, información desactualizada, interpretaciones incorrectas o sesgos. No debe confiar únicamente en el contenido generado por IA para decisiones legales, financieras, médicas, regulatorias o de empleo.",
        "Específicamente: la información regulatoria (como el ámbito de práctica, reglas de delegación y citas del Código de Negocios y Profesiones) es solo para fines educativos y no constituye asesoramiento legal. Los datos salariales son estimaciones basadas en datos públicos del mercado y pueden no reflejar la compensación real en ningún empleador específico. La inteligencia y las previsiones sobre políticas son análisis de fuentes públicas y no constituyen asesoramiento político, legal o financiero profesional.",
        "Siempre verifique la información crítica con profesionales calificados (abogados, contadores, médicos, consultores de RR.HH.) y fuentes primarias antes de actuar en base a cualquier contenido encontrado en nuestra plataforma.",
      ],
    },
    {
      heading: "10. Herramienta de Creación de Publicaciones de Empleo",
      paragraphs: [
        "Nuestra herramienta de creación de publicaciones de empleo se proporciona como un recurso gratuito para ayudar a los FQHCs y empleadores de salud a crear publicaciones de empleo. Los datos salariales de referencia y la información de compensación incluida en la herramienta son estimaciones basadas en datos de mercado disponibles públicamente.",
        "Los empleadores son los únicos responsables de asegurar que sus publicaciones de empleo cumplan con todas las leyes federales, estatales y locales aplicables, incluyendo pero sin limitarse a las leyes de igualdad de oportunidades de empleo, la Ley de Empleo y Vivienda Justa de California (FEHA), los requisitos de transparencia salarial de California (SB 1162) y la Ley de Estadounidenses con Discapacidades (ADA).",
        "FQHC Talent no revisa, aprueba ni respalda ninguna publicación de empleo creada utilizando nuestra herramienta. No somos responsables del contenido de las publicaciones de empleo, las decisiones de contratación ni los términos de empleo establecidos por los empleadores que utilizan nuestra plataforma.",
      ],
    },
    {
      heading: "11. Boletín y Comunicaciones por Correo Electrónico",
      paragraphs: [
        "FQHC Talent opera dos publicaciones de boletín: Intel Brief (inteligencia estratégica para líderes de FQHC, entregado semanalmente) y The Pulse (actualizaciones de carrera e información del mercado laboral para buscadores de empleo, entregado semanalmente). La suscripción a nuestros boletines es voluntaria y gratuita.",
        "Al suscribirse a nuestro boletín, usted consiente recibir comunicaciones periódicas por correo electrónico de FQHC Talent incluyendo: su(s) línea(s) de boletín seleccionada(s), una breve secuencia automatizada de bienvenida (típicamente 3-4 correos durante 2-3 semanas) y anuncios ocasionales de actualizaciones de la plataforma. No le enviaremos correos de marketing no solicitados más allá de estas categorías.",
        "Cada correo electrónico que enviamos incluye un enlace para cancelar la suscripción con un solo clic en la parte inferior. Puede cancelar su suscripción en cualquier momento y honraremos su solicitud inmediatamente. La cancelación se procesa mediante un token seguro — no requerimos que inicie sesión ni confirme por correo electrónico para cancelar su suscripción.",
        "El contenido del boletín es generado usando IA (Claude de Anthropic) y curado por nuestro equipo. Aunque nos esforzamos por lograr precisión, el contenido del boletín (incluyendo actualizaciones de políticas, alertas de financiamiento, análisis del mercado laboral e información regulatoria) es solo para fines informativos y no constituye asesoramiento profesional, legal, financiero o médico. Siempre verifique la información crítica con profesionales calificados y fuentes primarias.",
        "Cumplimos con la Ley CAN-SPAM (15 U.S.C. § 7701 et seq.) y los requisitos de correo electrónico comercial de California. Nuestros correos incluyen: nuestra dirección postal o información de contacto válida, una identificación clara del mensaje como comunicación comercial y un mecanismo de exclusión funcional.",
        "No vendemos, alquilamos ni compartimos nuestra lista de correo de suscriptores con ningún tercero con fines de marketing. Su dirección de correo electrónico se comparte solo con nuestro proveedor de entrega de correo (Resend) con el único propósito de entregar sus boletines suscritos.",
      ],
    },
    {
      heading: "12. Uso de Datos y Privacidad",
      paragraphs: [
        "Su uso de FQHC Talent también se rige por nuestra Política de Privacidad, que explica cómo recopilamos, usamos, compartimos y protegemos su información personal. Al utilizar nuestra plataforma, usted reconoce que ha leído y comprendido nuestra Política de Privacidad.",
        "Al enviar su información a través de nuestra plataforma (incluyendo registros en lista de espera, perfiles de currículum y registros de empleadores), usted consiente nuestra recopilación y uso de esa información según lo descrito en nuestra Política de Privacidad. Esto incluye compartir su perfil profesional con empleadores de FQHC cuando haya dado su consentimiento para ser considerado para oportunidades laborales.",
        "Puede solicitar la eliminación de sus datos en cualquier momento contactándonos en privacy@fqhctalent.com. Procesaremos su solicitud dentro de 45 días según lo requiere la ley de California.",
      ],
    },
    {
      heading: "13. Renuncia de Garantías",
      paragraphs: [
        "FQHC TALENT EXCHANGE SE PROPORCIONA \"TAL CUAL\" Y \"SEGÚN DISPONIBILIDAD\", SIN GARANTÍAS DE NINGÚN TIPO, YA SEAN EXPRESAS O IMPLÍCITAS. EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, RENUNCIAMOS A TODAS LAS GARANTÍAS, INCLUYENDO PERO SIN LIMITARSE A:",
        "GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN.",
        "CUALQUIER GARANTÍA DE QUE LA PLATAFORMA SERÁ ININTERRUMPIDA, LIBRE DE ERRORES, SEGURA O LIBRE DE VIRUS U OTROS COMPONENTES DAÑINOS.",
        "CUALQUIER GARANTÍA RESPECTO A LA EXACTITUD, CONFIABILIDAD O INTEGRIDAD DE CUALQUIER CONTENIDO, OFERTA DE TRABAJO, DATOS SALARIALES, INFORMACIÓN DE FQHC, RESULTADOS DE EVALUACIÓN DE CARRERA U OTRA INFORMACIÓN PROPORCIONADA A TRAVÉS DE LA PLATAFORMA.",
        "CUALQUIER GARANTÍA DE QUE ENCONTRARÁ EMPLEO, RECIBIRÁ OFERTAS DE TRABAJO O SERÁ CONTRATADO A TRAVÉS DEL USO DE NUESTRA PLATAFORMA.",
        "CUALQUIER GARANTÍA DE QUE LOS EMPLEADORES ENCONTRARÁN CANDIDATOS ADECUADOS A TRAVÉS DEL USO DE NUESTRA PLATAFORMA.",
        "NO GARANTIZAMOS QUE LA PLATAFORMA CUMPLA CON SUS REQUISITOS O EXPECTATIVAS ESPECÍFICOS. SU USO DE LA PLATAFORMA ES BAJO SU PROPIO RIESGO.",
      ],
    },
    {
      heading: "14. Limitación de Responsabilidad",
      paragraphs: [
        "EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY APLICABLE, FQHC TALENT EXCHANGE, SU(S) PROPIETARIO(S), OPERADOR(ES), FUNCIONARIOS, DIRECTORES, EMPLEADOS, AGENTES, CONTRATISTAS Y COLABORADORES DE CONTENIDO (COLECTIVAMENTE, LAS \"PARTES DE FQHC TALENT EXCHANGE\") NO SERÁN RESPONSABLES DE NINGUNO DE LOS SIGUIENTES DAÑOS QUE SURJAN DE O ESTÉN RELACIONADOS CON SU USO O INCAPACIDAD DE USAR LA PLATAFORMA:",
        "CUALQUIER DAÑO DIRECTO, INDIRECTO, INCIDENTAL, ESPECIAL, CONSECUENTE O PUNITIVO, INCLUYENDO PERO SIN LIMITARSE A DAÑOS POR PÉRDIDA DE GANANCIAS, INGRESOS, DATOS, BUENA VOLUNTAD U OTRAS PÉRDIDAS INTANGIBLES.",
        "CUALQUIER DAÑO QUE SURJA DE: (A) SU CONFIANZA EN CUALQUIER INFORMACIÓN PROPORCIONADA A TRAVÉS DE LA PLATAFORMA, INCLUYENDO OFERTAS DE TRABAJO, DATOS SALARIALES O RECOMENDACIONES DE CARRERA; (B) CUALQUIER DECISIÓN DE EMPLEO, RESULTADO DE CONTRATACIÓN O CAMBIO DE CARRERA REALIZADO BASÁNDOSE EN INFORMACIÓN ENCONTRADA EN LA PLATAFORMA; (C) CUALQUIER INTERACCIÓN, COMUNICACIÓN O RELACIÓN ENTRE CANDIDATOS Y EMPLEADORES FACILITADA A TRAVÉS DE LA PLATAFORMA; (D) ACCESO NO AUTORIZADO O ALTERACIÓN DE SUS DATOS O TRANSMISIONES; (E) CONDUCTA DE CUALQUIER TERCERO EN O RELACIONADA CON LA PLATAFORMA.",
        "EN NINGÚN CASO LA RESPONSABILIDAD TOTAL DE LAS PARTES DE FQHC TALENT EXCHANGE HACIA USTED POR TODAS LAS RECLAMACIONES QUE SURJAN DE O ESTÉN RELACIONADAS CON LA PLATAFORMA EXCEDERÁ CIEN DÓLARES ($100.00) O LA CANTIDAD QUE PAGÓ POR USAR LA PLATAFORMA EN LOS DOCE MESES ANTERIORES A LA RECLAMACIÓN, LO QUE SEA MAYOR.",
        "ALGUNAS JURISDICCIONES NO PERMITEN LA EXCLUSIÓN O LIMITACIÓN DE CIERTOS DAÑOS. SI RESIDE EN UNA DE ESTAS JURISDICCIONES, ALGUNAS O TODAS LAS LIMITACIONES ANTERIORES PUEDEN NO APLICARSE A USTED, PERO SE APLICARÁN EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY.",
      ],
    },
    {
      heading: "15. Indemnización",
      paragraphs: [
        "Usted acepta defender, indemnizar y mantener indemnes a las Partes de FQHC Talent de y contra cualquier y todas las reclamaciones, daños, pérdidas, responsabilidades, costos y gastos (incluyendo honorarios razonables de abogados) que surjan de o estén relacionados con:",
        "(a) Su uso o acceso a la plataforma; (b) Su violación de estos Términos; (c) Su violación de cualquier derecho de terceros, incluyendo derechos de propiedad intelectual o derechos de privacidad; (d) Cualquier contenido o información que envíe a la plataforma, incluyendo pero sin limitarse a datos de currículum, afirmaciones profesionales e información de empleadores; (e) Cualquier tergiversación de sus calificaciones, credenciales o antecedentes profesionales; (f) Cualquier disputa laboral entre usted y un empleador conectado a través de la plataforma.",
        "Esta obligación de indemnización sobrevivirá a la terminación de estos Términos y su uso de la plataforma.",
      ],
    },
    {
      heading: "16. Resolución de Disputas",
      paragraphs: [
        "Cualquier disputa, controversia o reclamación que surja de o esté relacionada con estos Términos o su uso de la plataforma se abordará primero mediante negociación de buena fe entre las partes. Si la disputa no puede resolverse mediante negociación dentro de treinta (30) días, cualquiera de las partes puede proceder con los remedios descritos a continuación.",
        "Para disputas que no puedan resolverse mediante negociación, ambas partes acuerdan intentar mediación ante un mediador mutuamente acordado en el Estado de California antes de iniciar un litigio.",
        "Si la mediación no tiene éxito, cualquier disputa restante se resolverá exclusivamente en los tribunales estatales o federales ubicados en el Estado de California. Ambas partes consienten a la jurisdicción personal de estos tribunales y renuncian a cualquier objeción sobre la competencia territorial.",
        "RENUNCIA A ACCIONES COLECTIVAS: EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, USTED ACEPTA QUE CUALQUIER PROCEDIMIENTO DE RESOLUCIÓN DE DISPUTAS SE LLEVARÁ A CABO SOLO DE FORMA INDIVIDUAL Y NO EN UNA ACCIÓN COLECTIVA, CONSOLIDADA O REPRESENTATIVA. SI ESTA RENUNCIA A ACCIONES COLECTIVAS SE CONSIDERA INAPLICABLE, ENTONCES LA TOTALIDAD DE ESTA SECCIÓN DE RESOLUCIÓN DE DISPUTAS SERÁ NULA Y SIN EFECTO.",
        "Nada en esta sección impide que cualquiera de las partes busque medidas cautelares u otros recursos de equidad en los tribunales para asuntos relacionados con la seguridad de datos, propiedad intelectual o acceso no autorizado a la plataforma.",
      ],
    },
    {
      heading: "17. Sin Relación Laboral",
      paragraphs: [
        "Nada en estos Términos ni su uso de FQHC Talent crea una relación de empleo, agencia, sociedad, empresa conjunta o franquicia entre usted y FQHC Talent.",
        "No somos parte de ningún contrato de empleo entre candidatos y empleadores. No controlamos ni tenemos ninguna obligación con respecto a: ofertas de trabajo o decisiones de contratación tomadas por empleadores, los términos y condiciones de cualquier empleo, conducta en el lugar de trabajo o seguridad laboral, compensación, beneficios o disputas laborales, cumplimiento de las leyes laborales por parte de cualquier empleador.",
        "Los candidatos son los únicos responsables de evaluar la idoneidad y legitimidad de cualquier oportunidad laboral. Los empleadores son los únicos responsables del cumplimiento de todas las leyes laborales aplicables, incluyendo pero sin limitarse a las leyes de igualdad de oportunidades de empleo, leyes de salarios y horas, leyes de inmigración y regulaciones de seguridad en el lugar de trabajo.",
      ],
    },
    {
      heading: "18. Contenido y Enlaces de Terceros",
      paragraphs: [
        "Nuestra plataforma puede contener enlaces a sitios web de terceros, incluyendo páginas de carreras de FQHCs, portales de solicitud de empleo y recursos externos. Estos enlaces se proporcionan solo por conveniencia y no constituyen un respaldo, patrocinio o recomendación por parte de FQHC Talent.",
        "No tenemos control y no somos responsables del contenido, prácticas de privacidad, términos de servicio o disponibilidad de ningún sitio web de terceros. Sus interacciones con sitios web de terceros se rigen por los propios términos y políticas de esos sitios.",
        "Si encuentra un enlace en nuestra plataforma que cree que es inapropiado, roto o potencialmente dañino, por favor repórtelo a info@fqhctalent.com.",
      ],
    },
    {
      heading: "19. Terminación",
      paragraphs: [
        "Nos reservamos el derecho de suspender o terminar su acceso a FQHC Talent en cualquier momento, con o sin previo aviso, por conducta que determinemos, a nuestra sola discreción, que viole estos Términos, sea dañina para otros usuarios, terceros o la plataforma, o sea de otra manera objetable.",
        "Esto incluye, pero no se limita a: proporcionar información falsa o engañosa, tergiversar calificaciones o credenciales, participar en comportamiento abusivo, acosador o discriminatorio, extraer o recopilar datos, distribuir spam e intentar eludir medidas de seguridad o límites de velocidad.",
        "Tras la terminación, su derecho a usar la plataforma cesa inmediatamente. Las disposiciones de estos Términos que por su naturaleza deban sobrevivir a la terminación (incluyendo pero sin limitarse a las Secciones 12-15, 16 y 20) continuarán en efecto después de la terminación.",
      ],
    },
    {
      heading: "20. Fuerza Mayor",
      paragraphs: [
        "FQHC Talent no será responsable de ningún incumplimiento o retraso en el cumplimiento de sus obligaciones bajo estos Términos debido a circunstancias fuera de su control razonable, incluyendo pero sin limitarse a: desastres naturales, pandemias, actos gubernamentales, interrupciones del servicio de internet, cortes de energía, ciberataques o fallas de proveedores de servicios terceros.",
      ],
    },
    {
      heading: "21. Ley Aplicable",
      paragraphs: [
        "Estos Términos de Servicio se rigen e interpretan de acuerdo con las leyes del Estado de California, sin considerar sus principios de conflicto de leyes. En la medida en que cualquier disputa se litigue en los tribunales (según lo dispuesto en la Sección 16), ambas partes acuerdan la jurisdicción exclusiva de los tribunales estatales y federales ubicados en el Estado de California.",
        "Si usted es residente de California, también tiene derechos específicos bajo la Ley de Privacidad del Consumidor de California (CCPA) y la Ley de Derechos de Privacidad de California (CPRA) como se describe en nuestra Política de Privacidad.",
      ],
    },
    {
      heading: "22. Acuerdo Completo y Divisibilidad",
      paragraphs: [
        "Estos Términos, junto con nuestra Política de Privacidad, constituyen el acuerdo completo entre usted y FQHC Talent respecto a su uso de la plataforma y reemplazan cualquier acuerdo o entendimiento previo.",
        "Si alguna disposición de estos Términos se considera inválida, ilegal o inaplicable por un tribunal competente, la validez, legalidad y aplicabilidad de las disposiciones restantes no se verán afectadas ni perjudicadas. La disposición inaplicable se modificará en la medida mínima necesaria para hacerla aplicable mientras se preserva la intención original.",
        "Nuestra falta de ejercicio de cualquier derecho o disposición de estos Términos no se considerará una renuncia a ese derecho o disposición.",
      ],
    },
    {
      heading: "23. Contacto",
      paragraphs: [
        "Si tiene preguntas sobre estos Términos de Servicio, contáctenos:",
        "Consultas generales: info@fqhctalent.com",
        "Solicitudes de privacidad y datos: privacy@fqhctalent.com",
        "Nuestro objetivo es responder a todas las consultas dentro de 10 días hábiles.",
      ],
    },
  ],
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = locale === "es" ? esContent : enContent;

  return (
    <main className="min-h-screen">
      <article className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-700">
              {content.breadcrumbHome}
            </Link>{" "}
            → {content.breadcrumbTerms}
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">
              {content.title}
            </h1>
            <p className="text-stone-500">{content.lastUpdated}</p>
          </header>

          {/* Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            {content.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-stone-700 leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              {locale === "es" ? "¿Preguntas?" : "Questions?"}
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              {locale === "es"
                ? "Si tiene alguna pregunta sobre estos términos, no dude en contactarnos."
                : "If you have any questions about these terms, don't hesitate to reach out."}
            </p>
            <a
              href="mailto:info@fqhctalent.com"
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-800 transition-colors"
            >
              info@fqhctalent.com
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
