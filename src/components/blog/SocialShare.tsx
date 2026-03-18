"use client";

import { useState } from "react";
import { Share2, Link2, Linkedin, Mail, Check } from "lucide-react";

export function SocialShare() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = window.location.href;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    // Use native share on mobile if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or error — fall through to toggle menu
      }
    }
    setIsOpen(!isOpen);
  };

  const title = typeof document !== "undefined" ? document.title : "";
  const url = typeof window !== "undefined" ? window.location.href : "";

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Share menu */}
      {isOpen && (
        <div className="flex flex-col gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 rounded-full bg-white border border-stone-200 shadow-lg px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            title="Copy link"
          >
            {copied ? (
              <Check className="h-4 w-4 text-teal-600" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy link"}
          </button>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white border border-stone-200 shadow-lg px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={emailUrl}
            className="flex items-center gap-2 rounded-full bg-white border border-stone-200 shadow-lg px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
      )}

      {/* Share FAB button */}
      <button
        onClick={handleShare}
        className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-colors"
        aria-label="Share this article"
      >
        <Share2 className="h-5 w-5" />
      </button>
    </div>
  );
}
