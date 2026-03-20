"use client";

import { useContentReads } from "@/hooks/useContentReads";
import { FavoriteButton } from "@/components/dashboard/FavoriteButton";
import { Check, Clock, Bookmark } from "lucide-react";
import { useLocale } from "next-intl";

interface BlogArticleToolbarProps {
  slug: string;
}

export function BlogArticleToolbar({ slug }: BlogArticleToolbarProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const { reads, markAsRead, toggleWantToRead } = useContentReads("blog");

  const read = reads.get(slug);
  const isRead = read?.status === "read";
  const isSaved = read?.status === "want_to_read";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => markAsRead(slug)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          isRead
            ? "bg-teal-100 text-teal-700"
            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
        }`}
        title={isEs ? "Marcar como leido" : "Mark as read"}
      >
        {isRead ? <Check className="size-3.5" /> : <Clock className="size-3.5" />}
        {isRead
          ? isEs ? "Leido" : "Read"
          : isEs ? "Marcar como leido" : "Mark as read"}
      </button>

      <button
        onClick={() => toggleWantToRead(slug)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          isSaved
            ? "bg-amber-100 text-amber-700"
            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
        }`}
        title={isEs ? "Guardar para despues" : "Save for later"}
      >
        <Bookmark className={`size-3.5 ${isSaved ? "fill-current" : ""}`} />
        {isSaved
          ? isEs ? "Guardado" : "Saved"
          : isEs ? "Guardar" : "Save"}
      </button>

      <FavoriteButton contentType="blog" contentId={slug} size="sm" />
    </div>
  );
}
