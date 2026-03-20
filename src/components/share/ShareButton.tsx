"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Share2, Linkedin, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "next-intl";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ShareButtonProps {
  /** Absolute URL to share */
  url: string;
  /** Title text used in social share */
  title: string;
  /** Optional longer description */
  description?: string;
  /** Size variant */
  size?: "sm" | "md";
}

/* ------------------------------------------------------------------ */
/*  i18n                                                               */
/* ------------------------------------------------------------------ */

const LABELS = {
  share: { en: "Share", es: "Compartir" },
  copyLink: { en: "Copy Link", es: "Copiar enlace" },
  copied: { en: "Link copied!", es: "¡Enlace copiado!" },
  copyFailed: { en: "Could not copy link", es: "No se pudo copiar el enlace" },
};

/* ------------------------------------------------------------------ */
/*  X (Twitter) icon — Lucide doesn't have the new X logo             */
/* ------------------------------------------------------------------ */

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ShareButton({
  url,
  title,
  description,
  size = "sm",
}: ShareButtonProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const shareText = description
    ? `${title} — ${description}`
    : title;

  const handleLinkedIn = useCallback(() => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=600,height=600"
    );
    setOpen(false);
  }, [url]);

  const handleX = useCallback(() => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
    setOpen(false);
  }, [shareText, url]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(isEs ? LABELS.copied.es : LABELS.copied.en);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(isEs ? LABELS.copyFailed.es : LABELS.copyFailed.en);
    }
    setOpen(false);
  }, [url, isEs]);

  const iconSize = size === "sm" ? "size-3.5" : "size-4";
  const btnPad = size === "sm" ? "p-1.5" : "p-2";

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className={`rounded-md ${btnPad} text-stone-400 transition-colors hover:bg-stone-100 hover:text-teal-700`}
        aria-label={isEs ? LABELS.share.es : LABELS.share.en}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Share2 className={iconSize} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-20 mt-1 min-w-[160px] rounded-lg border border-stone-200 bg-white py-1 shadow-lg"
          role="menu"
        >
          <button
            onClick={handleLinkedIn}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-stone-700 hover:bg-stone-50"
            role="menuitem"
          >
            <Linkedin className="size-4 text-[#0A66C2]" />
            LinkedIn
          </button>
          <button
            onClick={handleX}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-stone-700 hover:bg-stone-50"
            role="menuitem"
          >
            <XIcon className="size-4" />
            X (Twitter)
          </button>
          <button
            onClick={handleCopy}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-stone-700 hover:bg-stone-50"
            role="menuitem"
          >
            {copied ? (
              <Check className="size-4 text-teal-600" />
            ) : (
              <Copy className="size-4 text-stone-400" />
            )}
            {isEs ? LABELS.copyLink.es : LABELS.copyLink.en}
          </button>
        </div>
      )}
    </div>
  );
}
