"use client";

import { Linkedin, Twitter, Mail } from "lucide-react";

interface InlineShareButtonsProps {
  slug: string;
  title: string;
}

export function InlineShareButtons({ slug, title }: InlineShareButtonsProps) {
  const url = `https://www.fqhctalent.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-stone-500">Share:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-blue-700 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="size-3.5" />
        <span>LinkedIn</span>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-sky-500 transition-colors"
        aria-label="Share on X"
      >
        <Twitter className="size-3.5" />
        <span>X</span>
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-700 transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="size-3.5" />
        <span>Email</span>
      </a>
    </div>
  );
}
