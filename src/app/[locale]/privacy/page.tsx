"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

interface PolicySection {
  heading: string;
  paragraphs: string[];
}

interface PolicyContent {
  title: string;
  lastUpdated: string;
  breadcrumbHome: string;
  breadcrumbPrivacy: string;
  intro: string;
  sections: PolicySection[];
}

const enContent: PolicyContent = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: March 10, 2026",
  breadcrumbHome: "Home",
  breadcrumbPrivacy: "Privacy Policy",
  intro:
    "FQHC Talent (\"we,\" \"us,\" or \"our\") operates the fqhctalent.com website. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform. We are committed to being transparent and direct about our data practices. Your trust matters to us, and we take reasonable steps to protect the information you share with us.",
  sections: [
    {
      heading: "1. Information We Collect",
      paragraphs: [
        "We collect the following categories of personal information when you use FQHC Talent:",
        "Identifiers: Your name, email address, phone number, and city/region. This is collected when you sign up for our candidate waitlist, employer waitlist, displaced worker fast-track program, or early access list.",
        "Professional information: Job titles, work history, employer names, education history, skills, EHR system experience, certifications, language abilities, and professional objectives. This is collected when you use our resume builder tool.",
        "Resume files: If you upload a resume (PDF or DOCX format), we store the file and extract text from it to help pre-fill your profile. Uploaded resumes are stored securely in a private storage bucket and are not publicly accessible. Temporary access links expire after one hour.",
        "Employer information: Organization name, website, contact person details, EHR system, and job opening details. This is collected when employers submit hiring interest or use our offboarding intake and locum tenens request forms.",
        "Career assessment responses: Your answers to our career insights assessment questions and the resulting scores. This helps us understand your professional strengths and recommend suitable roles.",
        "Manager and team assessment data: If you use our Team Readiness or OKR assessment tools, we may collect your responses, resulting scores, domain assessments, and session identifiers to provide personalized results and track team readiness over time.",
        "Newsletter subscription data: When you subscribe to our newsletters (Intel Brief for FQHC leaders and/or The Pulse for job seekers), we collect your email address, audience preference, and optionally your region, role type, primary challenge, organization size, and content preferences. We also track your subscription status (active or unsubscribed) and your position in any automated email drip sequences.",
        "Learning and course progress: When you use our Academy courses (such as the OKR Course), your progress, completed modules, and earned XP are stored locally in your browser (localStorage). This data stays on your device and is not transmitted to our servers unless you choose to save it to your account.",
        "Feedback: If you use our feedback widget, we collect the page URL, feedback type, your message, and optionally your email address.",
        "Locum tenens information: If you register as a locum provider, we collect your name, email, professional role, license number, availability, region, and EHR experience. If you request locum coverage as a facility, we collect your facility name, contact information, roles needed, timeline, and budget.",
        "Account information: If you create an account using our authentication system (email/password or Google OAuth), we store your user ID, display name, professional role, organization, region, and onboarding status. Supabase manages authentication tokens and session cookies.",
        "Saved content: If you are logged in, we may store your bookmarked content (favorites) and saved job listings (watchlist) linked to your user account.",
        "Usage data: We use Google Analytics 4 to collect anonymized data about how visitors interact with our site, including pages visited, time on site, general geographic region, device type, and referral source. This data is aggregated and does not personally identify you.",
        "Technical data: IP addresses are temporarily processed for rate limiting and abuse prevention. We do not store IP addresses in our database or associate them with your profile.",
      ],
    },
    {
      heading: "2. How We Use Your Information",
      paragraphs: [
        "We use the information we collect for these specific purposes:",
        "Career tools and resources: To provide free career tools, aggregated job postings, salary intelligence, and strategic resources for community health professionals exploring opportunities at Federally Qualified Health Centers (FQHCs) in California.",
        "Resume generation: To generate a formatted resume document (PDF) based on the information you provide in our resume builder. The resume is generated locally in your browser — your resume PDF is not stored on our servers.",
        "Newsletter delivery: To send you our newsletter publications based on your subscription preferences. We operate two newsletter tracks: Intel Brief (strategic intelligence for FQHC leaders) and The Pulse (career updates for job seekers). We may also send you a short automated welcome sequence (drip emails) over 2-3 weeks after you subscribe to help you get the most value from the platform. Every email includes a one-click unsubscribe link.",
        "Academy and learning tools: To provide interactive courses, simulators, and educational content through our FQHC Academy. Course progress is tracked locally in your browser. Assessment results from tools like Career Insights and Team Readiness may be stored to provide personalized recommendations.",
        "Communications: To send you a confirmation email when you sign up, and to send relevant job opportunities, platform updates, and career resources. Every email includes an unsubscribe option.",
        "Employer notifications: To notify our team when a new employer or candidate signs up, so we can follow up and facilitate introductions.",
        "Locum tenens matching: To connect healthcare facilities needing temporary providers with available locum professionals. Provider and facility information is used solely for this matching purpose.",
        "Platform improvement: To understand how people use our site so we can make it more helpful. We analyze aggregated usage patterns, not individual behavior.",
        "Abuse prevention: To enforce rate limits and prevent spam or automated abuse of our forms.",
      ],
    },
    {
      heading: "3. Information Sharing and Disclosure",
      paragraphs: [
        "We do not sell your personal information. We have never sold personal information, and we have no plans to do so.",
        "We do not share your data with advertisers, data brokers, or any third parties for marketing purposes.",
        "We do not share candidate profiles with employers. The information you provide through our career tools (resume builder, assessments) is used solely to generate your career documents and insights. Your data stays with you.",
        "We use the following third-party service providers to operate our platform. These providers process data on our behalf and are contractually obligated to protect it:",
        "Supabase: Database hosting and file storage (servers located in the United States). Stores your profile information and uploaded resumes.",
        "Resend: Email delivery service. Processes your email address and name to send confirmation and notification emails.",
        "Vercel: Website hosting and server-side processing. Processes requests to our site including form submissions.",
        "Google Analytics 4: Anonymized website analytics. Collects aggregated usage data via cookies. Does not receive your name, email, or any personally identifiable information from us.",
        "We may disclose your information if required by law — for example, in response to a valid court order, subpoena, or government request — or if we believe disclosure is necessary to protect the safety of our users, the public, or our platform.",
      ],
    },
    {
      heading: "4. Your Rights Under California Law (CCPA/CPRA)",
      paragraphs: [
        "If you are a California resident, the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA) give you specific rights regarding your personal information:",
        "Right to know: You can request that we disclose what personal information we have collected about you, the categories of sources, the purpose for collecting it, and the categories of third parties we have shared it with.",
        "Right to delete: You can request that we delete the personal information we have collected from you. Upon receiving a verified request, we will delete your information from our systems within 45 days, except where we are required by law to retain it.",
        "Right to correct: You can request that we correct inaccurate personal information we have about you.",
        "Right to opt out of sale or sharing: We do not sell or share your personal information for cross-context behavioral advertising. There is nothing to opt out of in this regard.",
        "Right to non-discrimination: We will not discriminate against you for exercising any of your privacy rights. You will receive the same quality of service regardless of whether you exercise your rights.",
        "Right to limit use of sensitive personal information: We do not collect sensitive personal information as defined by the CPRA (such as Social Security numbers, financial account numbers, precise geolocation, racial/ethnic origin, or health information beyond professional certifications).",
        "To exercise any of these rights, email us at privacy@fqhctalent.com with the subject line \"Privacy Rights Request.\" We will verify your identity by confirming the email address associated with your account. We will respond to your request within 45 days as required by California law. You may also designate an authorized agent to make a request on your behalf.",
      ],
    },
    {
      heading: "5. Do Not Sell My Personal Information",
      paragraphs: [
        "We do not sell your personal information to third parties. This includes both traditional sales for money and \"sharing\" personal information for cross-context behavioral advertising as defined by the CPRA.",
        "We do not use your data for targeted advertising, retargeting, or to build advertising profiles. We do not participate in data broker networks.",
        "If our practices ever change, we will update this policy and provide you with the opportunity to opt out before any sale or sharing occurs.",
      ],
    },
    {
      heading: "6. Data Retention",
      paragraphs: [
        "We retain your personal information only as long as necessary for the purposes described in this policy:",
        "Candidate and employer profiles: Retained for as long as you wish to remain active on our platform. You may request deletion at any time.",
        "Resume files: Uploaded resume files are retained for as long as your profile exists. When you request deletion of your profile, your uploaded resume file will also be deleted.",
        "Newsletter subscriptions: Your email address and subscription preferences are retained while your subscription is active. When you unsubscribe, we update your status to \"unsubscribed\" and retain only the email and status for suppression purposes (to prevent re-sending). You may request full deletion of your subscriber record at any time.",
        "Assessment and course data: Career assessment results, team readiness assessments, and other tool-generated data are retained as long as your profile exists. Locally stored course progress (in your browser) persists until you clear your browser data.",
        "Locum tenens registrations: Provider availability and facility requests are retained as long as they remain relevant. You may request deletion at any time.",
        "Feedback submissions: Feedback you submit through our feedback widget is retained indefinitely to help us improve the platform. If you included your email, you may request deletion.",
        "Email communications: Transactional email logs (confirmations, notifications, newsletter sends) are retained by our email provider (Resend) for up to 30 days for delivery troubleshooting. We also maintain an internal log of newsletter sends (date, recipient count, track) for operational purposes.",
        "Analytics data: Google Analytics data is retained for 14 months in aggregated, anonymized form. This data cannot be used to identify you individually.",
        "Rate limiting data: IP-based rate limiting data is stored in temporary server memory and is automatically cleared within minutes. It is never written to a database.",
        "If you request deletion of your account and data, we will remove your information from our active databases within 45 days. Some information may persist in encrypted backups for up to 90 days before being permanently deleted.",
      ],
    },
    {
      heading: "7. Data Security",
      paragraphs: [
        "We take the security of your personal information seriously and implement the following measures:",
        "All data transmitted between your browser and our servers is encrypted using TLS/HTTPS.",
        "Our database uses row-level security policies to restrict access. API routes that handle your data use a secure server-side key that is never exposed to browsers.",
        "Form inputs are validated and sanitized on both the client and server to prevent injection attacks.",
        "We implement rate limiting on all form submission endpoints to prevent automated abuse.",
        "Security headers are configured on all pages (including protections against clickjacking, content sniffing, and cross-site scripting).",
        "Access to our production database and hosting infrastructure is restricted to authorized personnel only.",
        "While no system is 100% secure, we take reasonable and appropriate measures to protect your data from unauthorized access, loss, misuse, or alteration. If we become aware of a data breach that affects your personal information, we will notify you and the appropriate authorities as required by California law (Cal. Civ. Code § 1798.82) within 72 hours of confirming the breach.",
      ],
    },
    {
      heading: "8. Cookies and Tracking Technologies",
      paragraphs: [
        "We use the following cookies and tracking technologies:",
        "Google Analytics 4: Uses first-party cookies to collect anonymized usage statistics. These cookies do not contain personal information and are not used for advertising. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on (https://tools.google.com/dlpage/gaoptout). You can also decline analytics cookies via our cookie consent banner.",
        "Authentication cookies: If you create an account or log in, our authentication provider (Supabase) sets secure session cookies to keep you logged in. These are strictly necessary for account functionality and are not used for tracking.",
        "Essential cookies: We use minimal cookies necessary for site functionality, including language preference (English/Spanish) and cookie consent status. These are strictly necessary and cannot be disabled.",
        "Local storage: We use your browser's localStorage to save your learning progress (e.g., OKR course completion, learning pathway steps), cookie consent preferences, and analytics opt-out preferences. This data stays on your device and is not transmitted to our servers.",
        "We do not use: Third-party advertising cookies, cross-site tracking pixels, social media tracking widgets, fingerprinting technologies, or any form of behavioral advertising technology.",
        "We respect Do Not Track (DNT) browser signals. When we detect a DNT signal, no analytics tracking is initiated for that session.",
      ],
    },
    {
      heading: "9. Children's Privacy",
      paragraphs: [
        "FQHC Talent is a professional career platform intended for adults (18 years of age and older). We do not knowingly collect personal information from children under 13 years of age as defined by the Children's Online Privacy Protection Act (COPPA), or from minors under 16 as defined by the CCPA.",
        "If we discover that we have inadvertently collected information from a child under 13, we will promptly delete that information from our systems. If you believe that a child under 13 has provided us with personal information, please contact us at privacy@fqhctalent.com.",
      ],
    },
    {
      heading: "10. International Users",
      paragraphs: [
        "FQHC Talent is operated in the United States and is intended for users in the United States, primarily in California. Our servers and data storage are located in the United States.",
        "If you access our platform from outside the United States, please be aware that your information will be transferred to, stored, and processed in the United States. By using our platform, you consent to this transfer. The data protection laws in the United States may differ from those in your country of residence.",
      ],
    },
    {
      heading: "11. Third-Party Links",
      paragraphs: [
        "Our platform may contain links to external websites, including FQHC careers pages, job application portals, and professional resources. These third-party sites have their own privacy policies, and we are not responsible for their content or data practices.",
        "When you click a link to an external site, you are leaving FQHC Talent. We encourage you to review the privacy policy of any third-party site before providing your personal information.",
      ],
    },
    {
      heading: "12. Contact Us",
      paragraphs: [
        "If you have questions about this Privacy Policy, want to exercise your data rights, or have a concern about how we handle your information, please contact us:",
        "Privacy requests: privacy@fqhctalent.com",
        "General inquiries: info@fqhctalent.com",
        "Please include \"Privacy\" in the subject line so we can route your request promptly. We aim to respond to all privacy-related inquiries within 10 business days.",
      ],
    },
    {
      heading: "13. Updates to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. When we make material changes, we will update the \"Last updated\" date at the top of this page.",
        "For significant changes that affect how we use or share your personal information, we will make reasonable efforts to notify you in advance — for example, by posting a notice on our website or sending an email to the address associated with your account.",
        "We encourage you to review this page periodically to stay informed about how we protect your information.",
      ],
    },
  ],
};

const esContent: PolicyContent = {
  title: "Política de Privacidad",
  lastUpdated: "Última actualización: 10 de marzo de 2026",
  breadcrumbHome: "Inicio",
  breadcrumbPrivacy: "Política de Privacidad",
  intro:
    "FQHC Talent (\"nosotros\" o \"nuestro\") opera el sitio web fqhctalent.com. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información personal cuando utiliza nuestra plataforma. Estamos comprometidos con ser transparentes y directos sobre nuestras prácticas de datos. Su confianza es importante para nosotros, y tomamos medidas razonables para proteger la información que comparte con nosotros.",
  sections: [
    {
      heading: "1. Información que Recopilamos",
      paragraphs: [
        "Recopilamos las siguientes categorías de información personal cuando utiliza FQHC Talent:",
        "Identificadores: Su nombre, dirección de correo electrónico, número de teléfono y ciudad/región. Esto se recopila cuando se registra en nuestra lista de espera de candidatos, lista de espera de empleadores, programa de vía rápida para trabajadores desplazados o lista de acceso anticipado.",
        "Información profesional: Títulos de trabajo, historial laboral, nombres de empleadores, historial educativo, habilidades, experiencia con sistemas EHR, certificaciones, habilidades lingüísticas y objetivos profesionales. Esto se recopila cuando utiliza nuestra herramienta de creación de currículum.",
        "Archivos de currículum: Si carga un currículum (formato PDF o DOCX), almacenamos el archivo y extraemos texto de él para ayudar a completar su perfil. Los currículos cargados se almacenan de forma segura en un depósito privado y no son accesibles públicamente. Los enlaces de acceso temporales expiran después de una hora.",
        "Información del empleador: Nombre de la organización, sitio web, detalles de la persona de contacto, sistema EHR e información de vacantes. Esto se recopila cuando los empleadores envían interés de contratación o utilizan nuestros formularios de incorporación de salida y solicitud de locum tenens.",
        "Respuestas de evaluación de carrera: Sus respuestas a nuestras preguntas de evaluación de perspectivas de carrera y las puntuaciones resultantes. Esto nos ayuda a comprender sus fortalezas profesionales y recomendar roles adecuados.",
        "Datos de evaluación gerencial y de equipo: Si utiliza nuestras herramientas de Preparación de Equipo o evaluación OKR, podemos recopilar sus respuestas, puntuaciones resultantes, evaluaciones por dominio e identificadores de sesión para proporcionar resultados personalizados y rastrear la preparación del equipo a lo largo del tiempo.",
        "Datos de suscripción al boletín: Cuando se suscribe a nuestros boletines (Intel Brief para líderes de FQHC y/o The Pulse para buscadores de empleo), recopilamos su dirección de correo electrónico, preferencia de audiencia y opcionalmente su región, tipo de rol, desafío principal, tamaño de organización y preferencias de contenido. También rastreamos su estado de suscripción (activa o cancelada) y su posición en cualquier secuencia automática de correos electrónicos de bienvenida.",
        "Progreso de aprendizaje y cursos: Cuando utiliza nuestros cursos de la Academia (como el Curso OKR), su progreso, módulos completados y XP ganados se almacenan localmente en su navegador (localStorage). Estos datos permanecen en su dispositivo y no se transmiten a nuestros servidores a menos que elija guardarlos en su cuenta.",
        "Comentarios: Si utiliza nuestro widget de comentarios, recopilamos la URL de la página, el tipo de comentario, su mensaje y opcionalmente su dirección de correo electrónico.",
        "Información de locum tenens: Si se registra como proveedor de locum, recopilamos su nombre, correo electrónico, rol profesional, número de licencia, disponibilidad, región y experiencia con EHR. Si solicita cobertura de locum como instalación, recopilamos el nombre de su instalación, información de contacto, roles necesarios, cronograma y presupuesto.",
        "Información de cuenta: Si crea una cuenta utilizando nuestro sistema de autenticación (correo electrónico/contraseña o Google OAuth), almacenamos su ID de usuario, nombre para mostrar, rol profesional, organización, región y estado de incorporación. Supabase gestiona los tokens de autenticación y las cookies de sesión.",
        "Contenido guardado: Si ha iniciado sesión, podemos almacenar su contenido marcado (favoritos) y ofertas de trabajo guardadas (lista de seguimiento) vinculadas a su cuenta de usuario.",
        "Datos de uso: Utilizamos Google Analytics 4 para recopilar datos anonimizados sobre cómo los visitantes interactúan con nuestro sitio, incluyendo páginas visitadas, tiempo en el sitio, región geográfica general, tipo de dispositivo y fuente de referencia. Estos datos son agregados y no lo identifican personalmente.",
        "Datos técnicos: Las direcciones IP se procesan temporalmente para limitación de velocidad y prevención de abuso. No almacenamos direcciones IP en nuestra base de datos ni las asociamos con su perfil.",
      ],
    },
    {
      heading: "2. Cómo Usamos Su Información",
      paragraphs: [
        "Utilizamos la información que recopilamos para estos propósitos específicos:",
        "Herramientas y recursos de carrera: Para proporcionar herramientas de carrera gratuitas, ofertas de empleo agregadas, inteligencia salarial y recursos estratégicos para profesionales de salud comunitaria que exploran oportunidades en Centros de Salud Calificados Federalmente (FQHCs) en California.",
        "Generación de currículum: Para generar un documento de currículum formateado (PDF) basado en la información que proporciona en nuestro creador de currículum. El currículum se genera localmente en su navegador — su currículum PDF no se almacena en nuestros servidores.",
        "Entrega de boletines: Para enviarle nuestras publicaciones de boletín según sus preferencias de suscripción. Operamos dos líneas de boletines: Intel Brief (inteligencia estratégica para líderes de FQHC) y The Pulse (actualizaciones de carrera para buscadores de empleo). También podemos enviarle una breve secuencia automatizada de bienvenida (correos de goteo) durante 2-3 semanas después de suscribirse para ayudarle a obtener el máximo valor de la plataforma. Cada correo electrónico incluye un enlace para cancelar la suscripción con un solo clic.",
        "Academia y herramientas de aprendizaje: Para proporcionar cursos interactivos, simuladores y contenido educativo a través de nuestra Academia FQHC. El progreso del curso se rastrea localmente en su navegador. Los resultados de evaluaciones de herramientas como Perspectivas de Carrera y Preparación de Equipo pueden almacenarse para proporcionar recomendaciones personalizadas.",
        "Comunicaciones: Para enviarle un correo electrónico de confirmación cuando se registra, y para enviarle oportunidades laborales relevantes, actualizaciones de la plataforma y recursos de carrera. Cada correo electrónico incluye una opción para darse de baja.",
        "Notificaciones a empleadores: Para notificar a nuestro equipo cuando un nuevo empleador o candidato se registra, para que podamos dar seguimiento y facilitar presentaciones.",
        "Conexión de locum tenens: Para conectar instalaciones de salud que necesitan proveedores temporales con profesionales de locum disponibles. La información de proveedores e instalaciones se utiliza únicamente para este propósito de conexión.",
        "Mejora de la plataforma: Para entender cómo las personas usan nuestro sitio y poder hacerlo más útil. Analizamos patrones de uso agregados, no comportamiento individual.",
        "Prevención de abuso: Para aplicar límites de velocidad y prevenir spam o abuso automatizado de nuestros formularios.",
      ],
    },
    {
      heading: "3. Compartir y Divulgación de Información",
      paragraphs: [
        "No vendemos su información personal. Nunca hemos vendido información personal y no tenemos planes de hacerlo.",
        "No compartimos sus datos con anunciantes, intermediarios de datos ni terceros con fines de marketing.",
        "No compartimos perfiles de candidatos con empleadores. La información que proporciona a través de nuestras herramientas de carrera (creador de currículum, evaluaciones) se utiliza únicamente para generar sus documentos de carrera e información. Sus datos se quedan con usted.",
        "Utilizamos los siguientes proveedores de servicios terceros para operar nuestra plataforma. Estos proveedores procesan datos en nuestro nombre y están obligados contractualmente a protegerlos:",
        "Supabase: Alojamiento de base de datos y almacenamiento de archivos (servidores ubicados en los Estados Unidos). Almacena su información de perfil y currículos cargados.",
        "Resend: Servicio de entrega de correo electrónico. Procesa su dirección de correo electrónico y nombre para enviar correos de confirmación y notificación.",
        "Vercel: Alojamiento web y procesamiento del lado del servidor. Procesa solicitudes a nuestro sitio incluyendo envíos de formularios.",
        "Google Analytics 4: Análisis web anonimizado. Recopila datos de uso agregados mediante cookies. No recibe su nombre, correo electrónico ni ninguna información de identificación personal de nuestra parte.",
        "Podemos divulgar su información si lo requiere la ley — por ejemplo, en respuesta a una orden judicial válida, citación o solicitud gubernamental — o si creemos que la divulgación es necesaria para proteger la seguridad de nuestros usuarios, el público o nuestra plataforma.",
      ],
    },
    {
      heading: "4. Sus Derechos Bajo la Ley de California (CCPA/CPRA)",
      paragraphs: [
        "Si usted es residente de California, la Ley de Privacidad del Consumidor de California (CCPA) y la Ley de Derechos de Privacidad de California (CPRA) le otorgan derechos específicos respecto a su información personal:",
        "Derecho a saber: Puede solicitar que revelemos qué información personal hemos recopilado sobre usted, las categorías de fuentes, el propósito de recopilarla y las categorías de terceros con quienes la hemos compartido.",
        "Derecho a eliminar: Puede solicitar que eliminemos la información personal que hemos recopilado de usted. Al recibir una solicitud verificada, eliminaremos su información de nuestros sistemas dentro de 45 días, excepto donde la ley nos requiera retenerla.",
        "Derecho a corregir: Puede solicitar que corrijamos información personal inexacta que tengamos sobre usted.",
        "Derecho a optar por no participar en la venta o compartir: No vendemos ni compartimos su información personal para publicidad conductual entre contextos. No hay nada de lo que optar por no participar en este sentido.",
        "Derecho a la no discriminación: No lo discriminaremos por ejercer cualquiera de sus derechos de privacidad. Recibirá la misma calidad de servicio independientemente de si ejerce sus derechos.",
        "Derecho a limitar el uso de información personal sensible: No recopilamos información personal sensible según la definición de la CPRA (como números de Seguro Social, números de cuentas financieras, geolocalización precisa, origen racial/étnico o información de salud más allá de certificaciones profesionales).",
        "Para ejercer cualquiera de estos derechos, envíenos un correo electrónico a privacy@fqhctalent.com con el asunto \"Solicitud de Derechos de Privacidad.\" Verificaremos su identidad confirmando la dirección de correo electrónico asociada con su cuenta. Responderemos a su solicitud dentro de 45 días según lo requiere la ley de California. También puede designar un agente autorizado para hacer una solicitud en su nombre.",
      ],
    },
    {
      heading: "5. No Vender Mi Información Personal",
      paragraphs: [
        "No vendemos su información personal a terceros. Esto incluye tanto ventas tradicionales por dinero como el \"compartir\" información personal para publicidad conductual entre contextos según la definición de la CPRA.",
        "No utilizamos sus datos para publicidad dirigida, retargeting ni para crear perfiles publicitarios. No participamos en redes de intermediarios de datos.",
        "Si nuestras prácticas alguna vez cambian, actualizaremos esta política y le brindaremos la oportunidad de optar por no participar antes de que ocurra cualquier venta o compartir.",
      ],
    },
    {
      heading: "6. Retención de Datos",
      paragraphs: [
        "Retenemos su información personal solo mientras sea necesaria para los propósitos descritos en esta política:",
        "Perfiles de candidatos y empleadores: Se retienen mientras desee permanecer activo en nuestra plataforma. Puede solicitar la eliminación en cualquier momento.",
        "Archivos de currículum: Los archivos de currículum cargados se retienen mientras su perfil exista. Cuando solicite la eliminación de su perfil, su archivo de currículum cargado también será eliminado.",
        "Suscripciones al boletín: Su dirección de correo electrónico y preferencias de suscripción se retienen mientras su suscripción esté activa. Cuando cancele su suscripción, actualizamos su estado a \"cancelada\" y retenemos solo el correo electrónico y el estado con fines de supresión (para evitar reenvíos). Puede solicitar la eliminación completa de su registro de suscriptor en cualquier momento.",
        "Datos de evaluación y cursos: Los resultados de evaluaciones de carrera, evaluaciones de preparación de equipo y otros datos generados por herramientas se retienen mientras su perfil exista. El progreso de cursos almacenado localmente (en su navegador) persiste hasta que borre los datos de su navegador.",
        "Registros de locum tenens: La disponibilidad de proveedores y las solicitudes de instalaciones se retienen mientras sigan siendo relevantes. Puede solicitar la eliminación en cualquier momento.",
        "Envíos de comentarios: Los comentarios que envíe a través de nuestro widget se retienen indefinidamente para ayudarnos a mejorar la plataforma. Si incluyó su correo electrónico, puede solicitar la eliminación.",
        "Comunicaciones por correo electrónico: Los registros de correos transaccionales (confirmaciones, notificaciones, envíos de boletines) son retenidos por nuestro proveedor de correo (Resend) hasta por 30 días para solución de problemas de entrega. También mantenemos un registro interno de envíos de boletines (fecha, cantidad de destinatarios, línea) con fines operativos.",
        "Datos analíticos: Los datos de Google Analytics se retienen por 14 meses en forma agregada y anonimizada. Estos datos no pueden usarse para identificarlo individualmente.",
        "Datos de limitación de velocidad: Los datos de limitación de velocidad basados en IP se almacenan en memoria temporal del servidor y se eliminan automáticamente en minutos. Nunca se escriben en una base de datos.",
        "Si solicita la eliminación de su cuenta y datos, eliminaremos su información de nuestras bases de datos activas dentro de 45 días. Alguna información puede persistir en copias de seguridad cifradas hasta por 90 días antes de ser eliminada permanentemente.",
      ],
    },
    {
      heading: "7. Seguridad de los Datos",
      paragraphs: [
        "Tomamos en serio la seguridad de su información personal e implementamos las siguientes medidas:",
        "Todos los datos transmitidos entre su navegador y nuestros servidores están cifrados usando TLS/HTTPS.",
        "Nuestra base de datos utiliza políticas de seguridad a nivel de fila para restringir el acceso. Las rutas de API que manejan sus datos usan una clave segura del lado del servidor que nunca se expone a los navegadores.",
        "Las entradas de formularios se validan y sanitizan tanto en el cliente como en el servidor para prevenir ataques de inyección.",
        "Implementamos limitación de velocidad en todos los puntos finales de envío de formularios para prevenir abuso automatizado.",
        "Los encabezados de seguridad están configurados en todas las páginas (incluyendo protecciones contra clickjacking, sniffing de contenido y scripts entre sitios).",
        "El acceso a nuestra base de datos de producción e infraestructura de alojamiento está restringido solo a personal autorizado.",
        "Aunque ningún sistema es 100% seguro, tomamos medidas razonables y apropiadas para proteger sus datos contra acceso no autorizado, pérdida, uso indebido o alteración. Si tenemos conocimiento de una violación de datos que afecte su información personal, le notificaremos a usted y a las autoridades correspondientes según lo requiere la ley de California (Cód. Civ. Cal. § 1798.82) dentro de las 72 horas posteriores a la confirmación de la violación.",
      ],
    },
    {
      heading: "8. Cookies y Tecnologías de Seguimiento",
      paragraphs: [
        "Utilizamos las siguientes cookies y tecnologías de seguimiento:",
        "Google Analytics 4: Utiliza cookies de primera parte para recopilar estadísticas de uso anonimizadas. Estas cookies no contienen información personal y no se utilizan para publicidad. Puede optar por no usar Google Analytics instalando el Complemento de Exclusión de Google Analytics (https://tools.google.com/dlpage/gaoptout). También puede rechazar las cookies de análisis a través de nuestro banner de consentimiento de cookies.",
        "Cookies de autenticación: Si crea una cuenta o inicia sesión, nuestro proveedor de autenticación (Supabase) establece cookies de sesión seguras para mantener su sesión iniciada. Estas son estrictamente necesarias para la funcionalidad de la cuenta y no se utilizan para seguimiento.",
        "Cookies esenciales: Usamos cookies mínimas necesarias para la funcionalidad del sitio, incluyendo preferencia de idioma (inglés/español) y estado de consentimiento de cookies. Estas son estrictamente necesarias y no se pueden desactivar.",
        "Almacenamiento local: Utilizamos el localStorage de su navegador para guardar su progreso de aprendizaje (por ejemplo, finalización del curso OKR, pasos de la ruta de aprendizaje), preferencias de consentimiento de cookies y preferencias de exclusión de análisis. Estos datos permanecen en su dispositivo y no se transmiten a nuestros servidores.",
        "No utilizamos: Cookies publicitarias de terceros, píxeles de seguimiento entre sitios, widgets de seguimiento de redes sociales, tecnologías de fingerprinting ni ninguna forma de tecnología de publicidad conductual.",
        "Respetamos las señales de No Rastrear (DNT) del navegador. Cuando detectamos una señal DNT, no se inicia ningún seguimiento analítico para esa sesión.",
      ],
    },
    {
      heading: "9. Privacidad de los Niños",
      paragraphs: [
        "FQHC Talent es una plataforma profesional de carrera destinada a adultos (mayores de 18 años). No recopilamos intencionalmente información personal de niños menores de 13 años según lo define la Ley de Protección de Privacidad en Línea de los Niños (COPPA), ni de menores de 16 años según lo define la CCPA.",
        "Si descubrimos que hemos recopilado inadvertidamente información de un niño menor de 13 años, eliminaremos esa información de nuestros sistemas de inmediato. Si cree que un niño menor de 13 años nos ha proporcionado información personal, contáctenos en privacy@fqhctalent.com.",
      ],
    },
    {
      heading: "10. Usuarios Internacionales",
      paragraphs: [
        "FQHC Talent opera en los Estados Unidos y está destinado a usuarios en los Estados Unidos, principalmente en California. Nuestros servidores y almacenamiento de datos se encuentran en los Estados Unidos.",
        "Si accede a nuestra plataforma desde fuera de los Estados Unidos, tenga en cuenta que su información será transferida, almacenada y procesada en los Estados Unidos. Al usar nuestra plataforma, usted consiente esta transferencia. Las leyes de protección de datos en los Estados Unidos pueden diferir de las de su país de residencia.",
      ],
    },
    {
      heading: "11. Enlaces a Terceros",
      paragraphs: [
        "Nuestra plataforma puede contener enlaces a sitios web externos, incluyendo páginas de carreras de FQHCs, portales de solicitud de empleo y recursos profesionales. Estos sitios de terceros tienen sus propias políticas de privacidad, y no somos responsables de su contenido o prácticas de datos.",
        "Cuando hace clic en un enlace a un sitio externo, está abandonando FQHC Talent. Le recomendamos revisar la política de privacidad de cualquier sitio de terceros antes de proporcionar su información personal.",
      ],
    },
    {
      heading: "12. Contáctenos",
      paragraphs: [
        "Si tiene preguntas sobre esta Política de Privacidad, desea ejercer sus derechos sobre sus datos o tiene alguna inquietud sobre cómo manejamos su información, contáctenos:",
        "Solicitudes de privacidad: privacy@fqhctalent.com",
        "Consultas generales: info@fqhctalent.com",
        "Por favor incluya \"Privacidad\" en la línea de asunto para que podamos dirigir su solicitud rápidamente. Nuestro objetivo es responder a todas las consultas relacionadas con la privacidad dentro de 10 días hábiles.",
      ],
    },
    {
      heading: "13. Actualizaciones de Esta Política",
      paragraphs: [
        "Podemos actualizar esta Política de Privacidad de vez en cuando para reflejar cambios en nuestras prácticas, tecnología, requisitos legales u otras razones operativas. Cuando realicemos cambios importantes, actualizaremos la fecha de \"Última actualización\" en la parte superior de esta página.",
        "Para cambios significativos que afecten cómo usamos o compartimos su información personal, haremos esfuerzos razonables para notificarle con anticipación — por ejemplo, publicando un aviso en nuestro sitio web o enviando un correo electrónico a la dirección asociada con su cuenta.",
        "Le recomendamos revisar esta página periódicamente para mantenerse informado sobre cómo protegemos su información.",
      ],
    },
  ],
};

export default function PrivacyPage() {
  const locale = useLocale();
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
            → {content.breadcrumbPrivacy}
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">
              {content.title}
            </h1>
            <p className="text-stone-500">{content.lastUpdated}</p>
          </header>

          {/* Intro */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed mb-12">
              {content.intro}
            </p>

            {/* Sections */}
            {content.sections.map((section, idx) => (
              <div key={idx} className="mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-stone-700 leading-relaxed mb-3"
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
              {locale === "es" ? "¿Preguntas sobre su privacidad?" : "Questions About Your Privacy?"}
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              {locale === "es"
                ? "Su privacidad es importante para nosotros. No dude en contactarnos con cualquier pregunta o solicitud."
                : "Your privacy matters to us. Don't hesitate to reach out with any questions or requests."}
            </p>
            <a
              href="mailto:privacy@fqhctalent.com"
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-800 transition-colors"
            >
              privacy@fqhctalent.com
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
