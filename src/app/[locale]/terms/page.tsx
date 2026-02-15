"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

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
  lastUpdated: "Last updated: February 2026",
  breadcrumbHome: "Home",
  breadcrumbTerms: "Terms of Service",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      paragraphs: [
        "By accessing or using FQHC Talent Exchange (fqhctalent.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.",
        "We may update these terms from time to time. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.",
      ],
    },
    {
      heading: "2. Description of Service",
      paragraphs: [
        "FQHC Talent Exchange is a free online platform that connects community health professionals with job opportunities at Federally Qualified Health Centers (FQHCs) across California. Our services include a job listings directory, an FQHC directory, a resume builder tool, career resources, and waitlist registration for candidates and employers.",
        "We are a job matching and career resource platform. We are not a staffing agency, employer, or recruiter. We do not directly employ, hire, or place candidates at any FQHC.",
      ],
    },
    {
      heading: "3. User Accounts and Registration",
      paragraphs: [
        "FQHC Talent Exchange currently operates with waitlist-based registration for both candidates and employers. There are no formal user accounts at this time. When you sign up for our candidate or employer waitlist, or use our resume builder, you provide information voluntarily.",
        "You are responsible for ensuring that any information you provide — including your name, email address, professional experience, and other details — is accurate and up to date. You agree not to register using false or misleading information.",
      ],
    },
    {
      heading: "4. User Responsibilities",
      paragraphs: [
        "When using FQHC Talent Exchange, you agree to the following:",
        "You will provide accurate, truthful information about your qualifications, experience, and professional background. You will not misrepresent your credentials, certifications, licensure status, or work history.",
        "You will use the platform for its intended purpose: exploring career opportunities at FQHCs, building your resume, or connecting with community health talent as an employer.",
        "You will not use the platform for any unlawful purpose, to harass or harm others, to distribute spam or unsolicited communications, or to attempt to gain unauthorized access to our systems.",
        "You will maintain professional conduct in all interactions facilitated by or related to the platform.",
      ],
    },
    {
      heading: "5. Intellectual Property",
      paragraphs: [
        "All content on FQHC Talent Exchange — including text, graphics, logos, page layouts, blog articles, career guides, resume templates, and data compilations — is the property of FQHC Talent Exchange or its content contributors and is protected by applicable intellectual property laws.",
        "You may not copy, reproduce, distribute, or create derivative works from our content without prior written permission. Personal, non-commercial use of the site (such as reading articles or building your own resume) is permitted under normal use.",
      ],
    },
    {
      heading: "6. Job Listings and FQHC Information",
      paragraphs: [
        "FQHC Talent Exchange displays job listings and organizational information about Federally Qualified Health Centers across California. While we make every effort to keep this information accurate and current, we do not guarantee the accuracy, completeness, or availability of any job listing or FQHC data displayed on our platform.",
        "Job listings may reflect positions that have been filled, modified, or removed since they were last updated. Salary ranges, benefits, and other details are provided as estimates based on publicly available information and may not reflect the exact terms offered by any specific employer.",
        "We encourage all users to verify job details directly with the hiring FQHC before making career decisions based on information found on our platform.",
      ],
    },
    {
      heading: "7. Limitation of Liability",
      paragraphs: [
        "FQHC Talent Exchange is provided on an \"as is\" and \"as available\" basis. We make no warranties, express or implied, regarding the operation of the platform, the accuracy of its content, or the outcomes of using our services.",
        "We are a job matching and career resource platform — not an employer. We do not guarantee that you will find employment, receive job offers, or be contacted by any FQHC through our platform. Similarly, we do not guarantee that employers will find suitable candidates.",
        "To the fullest extent permitted by law, FQHC Talent Exchange and its owners, operators, and contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the platform.",
      ],
    },
    {
      heading: "8. Termination",
      paragraphs: [
        "We reserve the right to suspend or terminate your access to FQHC Talent Exchange at any time, without prior notice, for conduct that we determine, in our sole discretion, violates these Terms of Service, is harmful to other users or third parties, or is otherwise objectionable.",
        "This includes, but is not limited to, providing false information, misrepresenting qualifications, engaging in abusive behavior, or attempting to misuse the platform in any way.",
      ],
    },
    {
      heading: "9. Governing Law",
      paragraphs: [
        "These Terms of Service are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any disputes arising from these terms or your use of the platform shall be resolved in the courts located in the State of California.",
      ],
    },
    {
      heading: "10. Contact",
      paragraphs: [
        "If you have questions about these Terms of Service, please contact us at info@fqhctalent.com.",
      ],
    },
    {
      heading: "11. Changes to These Terms",
      paragraphs: [
        "We may revise these Terms of Service at any time by updating this page. The \"Last updated\" date at the top of this page indicates when the terms were most recently revised. We encourage you to review this page periodically to stay informed of any changes.",
      ],
    },
  ],
};

const esContent: TermsContent = {
  title: "Terminos de Servicio",
  lastUpdated: "Ultima actualizacion: Febrero 2026",
  breadcrumbHome: "Inicio",
  breadcrumbTerms: "Terminos de Servicio",
  sections: [
    {
      heading: "1. Aceptacion de los Terminos",
      paragraphs: [
        "Al acceder o utilizar FQHC Talent Exchange (fqhctalent.com), usted acepta estar sujeto a estos Terminos de Servicio. Si no esta de acuerdo con estos terminos, por favor no utilice nuestro sitio web ni nuestros servicios.",
        "Podemos actualizar estos terminos de vez en cuando. El uso continuado del sitio despues de que se publiquen cambios constituye su aceptacion de los terminos revisados.",
      ],
    },
    {
      heading: "2. Descripcion del Servicio",
      paragraphs: [
        "FQHC Talent Exchange es una plataforma en linea gratuita que conecta a profesionales de salud comunitaria con oportunidades de empleo en Centros de Salud Calificados Federalmente (FQHCs) en toda California. Nuestros servicios incluyen un directorio de ofertas de trabajo, un directorio de FQHCs, una herramienta para crear curriculos, recursos de carrera y registro en lista de espera para candidatos y empleadores.",
        "Somos una plataforma de conexion laboral y recursos de carrera. No somos una agencia de personal, empleador ni reclutador. No empleamos, contratamos ni colocamos directamente a candidatos en ningun FQHC.",
      ],
    },
    {
      heading: "3. Cuentas de Usuario y Registro",
      paragraphs: [
        "FQHC Talent Exchange actualmente opera con registro basado en lista de espera tanto para candidatos como para empleadores. No hay cuentas de usuario formales en este momento. Cuando se registra en nuestra lista de espera de candidatos o empleadores, o utiliza nuestro creador de curriculos, usted proporciona informacion voluntariamente.",
        "Usted es responsable de asegurar que cualquier informacion que proporcione — incluyendo su nombre, direccion de correo electronico, experiencia profesional y otros detalles — sea precisa y este actualizada. Usted acepta no registrarse utilizando informacion falsa o enganosa.",
      ],
    },
    {
      heading: "4. Responsabilidades del Usuario",
      paragraphs: [
        "Al utilizar FQHC Talent Exchange, usted acepta lo siguiente:",
        "Proporcionara informacion precisa y veraz sobre sus calificaciones, experiencia y antecedentes profesionales. No tergiversara sus credenciales, certificaciones, estado de licencia ni historial laboral.",
        "Utilizara la plataforma para su proposito previsto: explorar oportunidades de carrera en FQHCs, crear su curriculo o conectarse con talento de salud comunitaria como empleador.",
        "No utilizara la plataforma para ningun proposito ilegal, para acosar o danar a otros, para distribuir spam o comunicaciones no solicitadas, ni para intentar obtener acceso no autorizado a nuestros sistemas.",
        "Mantendra una conducta profesional en todas las interacciones facilitadas por o relacionadas con la plataforma.",
      ],
    },
    {
      heading: "5. Propiedad Intelectual",
      paragraphs: [
        "Todo el contenido en FQHC Talent Exchange — incluyendo texto, graficos, logotipos, disenos de pagina, articulos de blog, guias de carrera, plantillas de curriculo y compilaciones de datos — es propiedad de FQHC Talent Exchange o sus colaboradores de contenido y esta protegido por las leyes de propiedad intelectual aplicables.",
        "No puede copiar, reproducir, distribuir ni crear obras derivadas de nuestro contenido sin permiso previo por escrito. El uso personal y no comercial del sitio (como leer articulos o crear su propio curriculo) esta permitido bajo uso normal.",
      ],
    },
    {
      heading: "6. Ofertas de Trabajo e Informacion de FQHCs",
      paragraphs: [
        "FQHC Talent Exchange muestra ofertas de trabajo e informacion organizacional sobre Centros de Salud Calificados Federalmente en toda California. Aunque hacemos todo lo posible por mantener esta informacion precisa y actualizada, no garantizamos la exactitud, integridad o disponibilidad de ninguna oferta de trabajo ni datos de FQHC mostrados en nuestra plataforma.",
        "Las ofertas de trabajo pueden reflejar posiciones que se han cubierto, modificado o eliminado desde su ultima actualizacion. Los rangos salariales, beneficios y otros detalles se proporcionan como estimaciones basadas en informacion disponible publicamente y pueden no reflejar los terminos exactos ofrecidos por ningun empleador especifico.",
        "Animamos a todos los usuarios a verificar los detalles del trabajo directamente con el FQHC contratante antes de tomar decisiones de carrera basadas en informacion encontrada en nuestra plataforma.",
      ],
    },
    {
      heading: "7. Limitacion de Responsabilidad",
      paragraphs: [
        "FQHC Talent Exchange se proporciona \"tal cual\" y \"segun disponibilidad\". No hacemos garantias, expresas ni implicitas, con respecto a la operacion de la plataforma, la exactitud de su contenido o los resultados de utilizar nuestros servicios.",
        "Somos una plataforma de conexion laboral y recursos de carrera — no un empleador. No garantizamos que encontrara empleo, recibira ofertas de trabajo ni sera contactado por ningun FQHC a traves de nuestra plataforma. De igual manera, no garantizamos que los empleadores encontraran candidatos adecuados.",
        "En la maxima medida permitida por la ley, FQHC Talent Exchange y sus propietarios, operadores y colaboradores no seran responsables de ningun dano directo, indirecto, incidental, consecuente o punitivo que surja de su uso o incapacidad de usar la plataforma.",
      ],
    },
    {
      heading: "8. Terminacion",
      paragraphs: [
        "Nos reservamos el derecho de suspender o terminar su acceso a FQHC Talent Exchange en cualquier momento, sin previo aviso, por conducta que determinemos, a nuestra sola discrecion, que viole estos Terminos de Servicio, sea danina para otros usuarios o terceros, o sea de otra manera objetable.",
        "Esto incluye, pero no se limita a, proporcionar informacion falsa, tergiversar calificaciones, participar en comportamiento abusivo o intentar usar indebidamente la plataforma de cualquier manera.",
      ],
    },
    {
      heading: "9. Ley Aplicable",
      paragraphs: [
        "Estos Terminos de Servicio se rigen e interpretan de acuerdo con las leyes del Estado de California, sin considerar sus principios de conflicto de leyes. Cualquier disputa que surja de estos terminos o su uso de la plataforma sera resuelta en los tribunales ubicados en el Estado de California.",
      ],
    },
    {
      heading: "10. Contacto",
      paragraphs: [
        "Si tiene preguntas sobre estos Terminos de Servicio, por favor contactenos en info@fqhctalent.com.",
      ],
    },
    {
      heading: "11. Cambios a Estos Terminos",
      paragraphs: [
        "Podemos revisar estos Terminos de Servicio en cualquier momento actualizando esta pagina. La fecha de \"Ultima actualizacion\" en la parte superior de esta pagina indica cuando los terminos fueron revisados mas recientemente. Le animamos a revisar esta pagina periodicamente para mantenerse informado de cualquier cambio.",
      ],
    },
  ],
};

export default function TermsPage() {
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
              {locale === "es" ? "Preguntas?" : "Questions?"}
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              {locale === "es"
                ? "Si tiene alguna pregunta sobre estos terminos, no dude en contactarnos."
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
