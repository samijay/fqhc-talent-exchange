"use client";

import { useState } from "react";
import { Link2, Check, Linkedin } from "lucide-react";

interface ShareInsightProps {
  /** The headline text used for social sharing */
  headline: string;
  /** Full URL to the insight's source (used as the shared link) */
  url: string;
}

export function ShareInsight({ headline, url }: ShareInsightProps) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(headline)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
        title="Copy link"
      >
        {copied ? (
          <>
            <Check className="size-3.5 text-teal-500" />
            <span className="text-teal-600">Copied</span>
          </>
        ) : (
          <>
            <Link2 className="size-3.5" />
            <span>Share</span>
          </>
        )}
      </button>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-blue-600 dark:hover:bg-stone-800"
        title="Share on LinkedIn"
      >
        <Linkedin className="size-3.5" />
      </a>
    </div>
  );
}
