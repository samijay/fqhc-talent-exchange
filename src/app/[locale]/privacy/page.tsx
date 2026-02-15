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
  lastUpdated: "Last updated: February 2026",
  breadcrumbHome: "Home",
  breadcrumbPrivacy: "Privacy Policy",
  intro:
    "FQHC Talent Exchange (\"we,\" \"us,\" or \"our\") operates the fqhctalent.com website. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform.",
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: [
        "When you use FQHC Talent Exchange, we may collect the following types of information:",
        "Account and profile information: Your name, email address, phone number, and professional details you provide when signing up for our candidate or employer waitlists.",
        "Resume data: Job titles, work history, skills, certifications, language abilities, and other professional information you enter into our resume builder tool.",
        "Usage information: We collect basic analytics data about how you interact with our site, including pages visited, time spent on pages, and general location (city or region level). We do not track your activity across other websites.",
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: [
        "We use the information we collect for the following purposes:",
        "Job matching: To connect you with relevant job opportunities at Federally Qualified Health Centers (FQHCs) across California based on your skills, experience, and preferences.",
        "Employer introductions: When you opt in, we share your professional profile with FQHCs that are hiring for roles that match your background.",
        "Platform improvement: To understand how people use our site so we can make it more helpful and easier to navigate.",
        "Communications: To send you relevant job opportunities, platform updates, and career resources by email. You can unsubscribe from these communications at any time.",
      ],
    },
    {
      heading: "Information Sharing",
      paragraphs: [
        "We share candidate profiles with FQHC employers only when candidates have explicitly opted in to be considered for job opportunities. We share only the professional information relevant to the job match — never more than what is needed.",
        "We do not sell, rent, or trade your personal information to third parties. We do not share your data with advertisers or data brokers.",
        "We may share information if required by law, such as in response to a court order or legal process, or to protect the rights and safety of our users and our platform.",
      ],
    },
    {
      heading: "Data Storage",
      paragraphs: [
        "Your data is stored securely using Supabase, a PostgreSQL-based database platform. Our database is hosted in the United States.",
        "We use industry-standard security measures to protect your information, including encrypted connections (HTTPS) and secure database access controls. While no system is perfectly secure, we take reasonable steps to protect your data from unauthorized access, loss, or misuse.",
      ],
    },
    {
      heading: "Cookies & Analytics",
      paragraphs: [
        "We use basic analytics to understand how visitors use our site. This helps us improve the experience for job seekers and employers.",
        "We do not use invasive tracking technologies, behavioral advertising cookies, or cross-site tracking. We do not build advertising profiles based on your browsing activity.",
      ],
    },
    {
      heading: "Your Rights",
      paragraphs: [
        "You have the following rights regarding your personal information:",
        "Access your data: You can request a copy of the personal information we have about you.",
        "Delete your data: You can request that we delete your account and all associated personal information from our systems.",
        "Opt out of emails: Every email we send includes an unsubscribe link. You can also contact us directly to opt out of all communications.",
        "Correct your data: If any information we have about you is inaccurate, you can request that we update it.",
        "To exercise any of these rights, contact us at the email address listed below.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "If you have questions about this Privacy Policy or want to exercise your data rights, please contact us at:",
        "Email: info@fqhctalent.com",
      ],
    },
    {
      heading: "Updates to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. When we make changes, we will update the \"Last updated\" date at the top of this page. We encourage you to review this page periodically to stay informed about how we protect your information.",
      ],
    },
  ],
};

const esContent: PolicyContent = {
  title: "Política de Privacidad",
  lastUpdated: "Última actualización: febrero 2026",
  breadcrumbHome: "Inicio",
  breadcrumbPrivacy: "Política de Privacidad",
  intro:
    "FQHC Talent Exchange (\"nosotros\" o \"nuestro\") opera el sitio web fqhctalent.com. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información personal cuando utiliza nuestra plataforma.",
  sections: [
    {
      heading: "Información que Recopilamos",
      paragraphs: [
        "Cuando utiliza FQHC Talent Exchange, podemos recopilar los siguientes tipos de información:",
        "Información de cuenta y perfil: Su nombre, dirección de correo electrónico, número de teléfono y detalles profesionales que proporciona al registrarse en nuestras listas de espera para candidatos o empleadores.",
        "Datos del currículum: Títulos de trabajo, historial laboral, habilidades, certificaciones, capacidades lingüísticas y otra información profesional que ingresa en nuestra herramienta de creación de currículum.",
        "Información de uso: Recopilamos datos analíticos básicos sobre cómo interactúa con nuestro sitio, incluyendo páginas visitadas, tiempo en páginas y ubicación general (nivel de ciudad o región). No rastreamos su actividad en otros sitios web.",
      ],
    },
    {
      heading: "Cómo Usamos Su Información",
      paragraphs: [
        "Utilizamos la información que recopilamos para los siguientes propósitos:",
        "Coincidencia de empleo: Para conectarlo con oportunidades laborales relevantes en Centros de Salud Calificados Federalmente (FQHCs) en California según sus habilidades, experiencia y preferencias.",
        "Presentaciones con empleadores: Cuando usted opta por participar, compartimos su perfil profesional con FQHCs que están contratando para roles que coinciden con su experiencia.",
        "Mejora de la plataforma: Para entender cómo las personas usan nuestro sitio y poder hacerlo más útil y fácil de navegar.",
        "Comunicaciones: Para enviarle oportunidades de empleo relevantes, actualizaciones de la plataforma y recursos de carrera por correo electrónico. Puede darse de baja de estas comunicaciones en cualquier momento.",
      ],
    },
    {
      heading: "Compartir Información",
      paragraphs: [
        "Compartimos perfiles de candidatos con empleadores de FQHC solo cuando los candidatos han optado explícitamente por ser considerados para oportunidades laborales. Compartimos solo la información profesional relevante para la coincidencia laboral — nunca más de lo necesario.",
        "No vendemos, alquilamos ni intercambiamos su información personal con terceros. No compartimos sus datos con anunciantes ni intermediarios de datos.",
        "Podemos compartir información si la ley lo requiere, como en respuesta a una orden judicial o proceso legal, o para proteger los derechos y la seguridad de nuestros usuarios y nuestra plataforma.",
      ],
    },
    {
      heading: "Almacenamiento de Datos",
      paragraphs: [
        "Sus datos se almacenan de forma segura utilizando Supabase, una plataforma de base de datos basada en PostgreSQL. Nuestra base de datos está alojada en los Estados Unidos.",
        "Utilizamos medidas de seguridad estándar de la industria para proteger su información, incluyendo conexiones cifradas (HTTPS) y controles de acceso seguros a la base de datos. Aunque ningún sistema es perfectamente seguro, tomamos medidas razonables para proteger sus datos contra acceso no autorizado, pérdida o uso indebido.",
      ],
    },
    {
      heading: "Cookies y Analítica",
      paragraphs: [
        "Utilizamos analítica básica para entender cómo los visitantes usan nuestro sitio. Esto nos ayuda a mejorar la experiencia para los buscadores de empleo y los empleadores.",
        "No utilizamos tecnologías de rastreo invasivas, cookies de publicidad conductual ni rastreo entre sitios. No creamos perfiles publicitarios basados en su actividad de navegación.",
      ],
    },
    {
      heading: "Sus Derechos",
      paragraphs: [
        "Usted tiene los siguientes derechos con respecto a su información personal:",
        "Acceder a sus datos: Puede solicitar una copia de la información personal que tenemos sobre usted.",
        "Eliminar sus datos: Puede solicitar que eliminemos su cuenta y toda la información personal asociada de nuestros sistemas.",
        "Darse de baja de correos electrónicos: Cada correo que enviamos incluye un enlace para darse de baja. También puede contactarnos directamente para optar por no recibir comunicaciones.",
        "Corregir sus datos: Si alguna información que tenemos sobre usted es incorrecta, puede solicitar que la actualicemos.",
        "Para ejercer cualquiera de estos derechos, contáctenos en la dirección de correo electrónico que se indica a continuación.",
      ],
    },
    {
      heading: "Contáctenos",
      paragraphs: [
        "Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos sobre sus datos, contáctenos en:",
        "Correo electrónico: info@fqhctalent.com",
      ],
    },
    {
      heading: "Actualizaciones de Esta Política",
      paragraphs: [
        "Podemos actualizar esta Política de Privacidad de vez en cuando para reflejar cambios en nuestras prácticas o por razones legales. Cuando realicemos cambios, actualizaremos la fecha de \"Última actualización\" en la parte superior de esta página. Le recomendamos revisar esta página periódicamente para mantenerse informado sobre cómo protegemos su información.",
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
        </div>
      </article>
    </main>
  );
}
