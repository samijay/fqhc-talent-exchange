/* ------------------------------------------------------------------ */
/*  Booking Configuration — Calendly Integration                       */
/*  Update CALENDLY_URL with your actual Calendly link                 */
/* ------------------------------------------------------------------ */

/**
 * Replace this with your real Calendly booking URL.
 * Format: https://calendly.com/your-username/event-type
 *
 * To set up:
 * 1. Create a Calendly account at calendly.com
 * 2. Create a 20-minute event type
 * 3. Set availability: Monday–Saturday, 11:00 AM – 1:00 PM PST
 * 4. Copy the event URL and paste it here
 */
export const CALENDLY_URL = "https://calendly.com/fqhctalent/20min";

/**
 * Score thresholds for showing booking CTAs.
 * Only candidates scoring at or above these thresholds see the option.
 */
export const BOOKING_THRESHOLDS = {
  /** Career Insights assessment (resume builder): show CTA at 60%+ */
  careerInsights: 60,
  /** Standalone Career Assessment (directory screener): show CTA at 60%+ */
  careerAssessment: 60,
} as const;

/**
 * Booking CTA variants for different contexts.
 */
export const BOOKING_VARIANTS = {
  candidate: {
    en: {
      heading: "Ready for Personalized Guidance?",
      description: "Book a free 20-minute career consultation. We'll review your assessment results and connect you with FQHC opportunities that match your strengths.",
      buttonText: "Book a Career Consultation",
    },
    es: {
      heading: "¿Listo/a para Orientación Personalizada?",
      description: "Reserva una consulta de carrera gratuita de 20 minutos. Revisaremos tus resultados de evaluación y te conectaremos con oportunidades FQHC que coincidan con tus fortalezas.",
      buttonText: "Reservar Consulta de Carrera",
    },
  },
  employer: {
    en: {
      heading: "See How We Can Help You Hire",
      description: "Book a free 20-minute intro call to learn how we connect you with pre-assessed, mission-driven FQHC talent.",
      buttonText: "Book an Intro Call",
    },
    es: {
      heading: "Descubre Cómo Podemos Ayudarte a Contratar",
      description: "Reserva una llamada introductoria gratuita de 20 minutos para conocer cómo te conectamos con talento FQHC evaluado y comprometido con su misión.",
      buttonText: "Reservar Llamada Introductoria",
    },
  },
  fastTrack: {
    en: {
      heading: "Get Priority Support",
      description: "Book a free 20-minute consultation. We'll review your background and fast-track you to matching FQHC employers in your region.",
      buttonText: "Book a Priority Consultation",
    },
    es: {
      heading: "Obtén Apoyo Prioritario",
      description: "Reserva una consulta gratuita de 20 minutos. Revisaremos tu experiencia y te conectaremos rápidamente con empleadores FQHC en tu región.",
      buttonText: "Reservar Consulta Prioritaria",
    },
  },
} as const;
