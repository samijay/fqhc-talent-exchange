"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface FavoriteButtonProps {
  contentType: string;
  contentId: string;
  size?: "sm" | "md";
}

/**
 * Reusable favorite/bookmark button.
 *
 * - If not authenticated: shows a toast prompting sign-in
 * - If authenticated: toggles the favorite with optimistic updates
 * - Uses Lucide Bookmark/BookmarkCheck icons
 */
export function FavoriteButton({
  contentType,
  contentId,
  size = "sm",
}: FavoriteButtonProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const { user } = useAuth();
  const { favoriteIds, toggleFavorite } = useFavorites(contentType);

  const isFavorited = favoriteIds.has(contentId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast(
        locale === "es"
          ? "Inicia sesión para guardar elementos"
          : "Sign in to save items",
        {
          action: {
            label: locale === "es" ? "Iniciar sesión" : "Sign in",
            onClick: () => {
              window.location.href = `/login?next=${encodeURIComponent(pathname)}`;
            },
          },
        }
      );
      return;
    }

    const success = await toggleFavorite(contentId);
    if (!success) {
      toast.error(
        locale === "es"
          ? "No se pudo guardar. Intenta de nuevo."
          : "Failed to save. Try again."
      );
    }
  };

  const iconSize = size === "sm" ? "size-4" : "size-5";
  const padding = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      onClick={handleClick}
      className={`${padding} rounded-md transition-colors ${
        isFavorited
          ? "text-amber-500 hover:text-amber-600"
          : "text-stone-400 hover:text-stone-600"
      }`}
      title={
        isFavorited
          ? locale === "es"
            ? "Quitar de favoritos"
            : "Remove from favorites"
          : locale === "es"
            ? "Guardar en favoritos"
            : "Save to favorites"
      }
    >
      {isFavorited ? (
        <BookmarkCheck className={`${iconSize} fill-current`} />
      ) : (
        <Bookmark className={iconSize} />
      )}
    </button>
  );
}
