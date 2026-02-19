"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { toast } from "sonner";

const copy = {
  en: {
    feedback: "Feedback",
    title: "Help us improve!",
    subtitle:
      "This is a brand new website that is continuously improving — we appreciate all feedback!",
    typePlaceholder: "What kind of feedback?",
    typeBug: "Bug / Something broken",
    typeSuggestion: "Suggestion / Feature idea",
    typePraise: "Something I like",
    typeOther: "Other",
    messagePlaceholder: "Tell us what's on your mind...",
    emailPlaceholder: "Email (optional — if you want a reply)",
    submit: "Send Feedback",
    sending: "Sending...",
    successTitle: "Thank you!",
    successMessage: "Your feedback helps us build a better platform.",
    errorMessage: "Something went wrong. Please try again.",
  },
  es: {
    feedback: "Comentarios",
    title: "¡Ayúdanos a mejorar!",
    subtitle:
      "Este es un sitio web nuevo que mejora continuamente — ¡agradecemos todos los comentarios!",
    typePlaceholder: "¿Qué tipo de comentario?",
    typeBug: "Error / Algo no funciona",
    typeSuggestion: "Sugerencia / Idea",
    typePraise: "Algo que me gusta",
    typeOther: "Otro",
    messagePlaceholder: "Cuéntanos lo que piensas...",
    emailPlaceholder: "Correo electrónico (opcional)",
    submit: "Enviar comentario",
    sending: "Enviando...",
    successTitle: "¡Gracias!",
    successMessage: "Tu comentario nos ayuda a construir una mejor plataforma.",
    errorMessage: "Algo salió mal. Por favor, inténtalo de nuevo.",
  },
};

export default function FeedbackButton() {
  const locale = useLocale();
  const t = locale === "es" ? copy.es : copy.en;

  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !feedbackType) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_url: window.location.pathname,
          feedback_type: feedbackType,
          message: message.trim(),
          email: email.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t.errorMessage);
      }

      toast.success(t.successTitle, { description: t.successMessage });
      setIsOpen(false);
      setFeedbackType("");
      setMessage("");
      setEmail("");
    } catch (err) {
      toast.error(t.errorMessage, {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Collapsed button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-teal-700 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-teal-800 hover:shadow-xl"
          aria-label={t.feedback}
        >
          <MessageSquare className="size-4" />
          {t.feedback}
        </button>
      )}

      {/* Expanded form */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-40 w-80 rounded-xl border border-stone-200 bg-white shadow-2xl sm:w-96">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-stone-100 p-4">
            <div>
              <h3 className="text-sm font-semibold text-stone-900">
                {t.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-500">
                {t.subtitle}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 p-4">
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              required
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="" disabled>
                {t.typePlaceholder}
              </option>
              <option value="bug">{t.typeBug}</option>
              <option value="suggestion">{t.typeSuggestion}</option>
              <option value="praise">{t.typePraise}</option>
              <option value="other">{t.typeOther}</option>
            </select>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={2000}
              rows={3}
              placeholder={t.messagePlaceholder}
              className="w-full resize-none rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />

            <button
              type="submit"
              disabled={isSubmitting || !message.trim() || !feedbackType}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.sending}
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  {t.submit}
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
