"use client";

import { useEffect, useState, useCallback } from "react";
import { createAuthClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

/**
 * Hook for managing favorites for a specific content type.
 *
 * Batch-fetches all favorites on mount (one query per page, not per card).
 * Returns a Set of favorited content IDs and a toggle function
 * with optimistic updates + rollback on error.
 */
export function useFavorites(contentType: string) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [supabase] = useState(() => createAuthClient());

  // Fetch all favorites for this content type on mount
  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavoriteIds(new Set());
      setLoading(false);
      return;
    }

    supabase
      .from("user_favorites")
      .select("content_id")
      .eq("user_id", user.id)
      .eq("content_type", contentType)
      .then(({ data }: { data: { content_id: string }[] | null }) => {
        setFavoriteIds(new Set(data?.map((f) => f.content_id) ?? []));
        setLoading(false);
      });
  }, [user, contentType, supabase]);

  // Toggle a favorite (optimistic update with rollback)
  const toggleFavorite = useCallback(
    async (contentId: string): Promise<boolean> => {
      if (!user) return false;

      const isFavorited = favoriteIds.has(contentId);

      // Optimistic update — toggle immediately in UI
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (isFavorited) {
          next.delete(contentId);
        } else {
          next.add(contentId);
        }
        return next;
      });

      // Persist to database
      if (isFavorited) {
        const { error } = await supabase
          .from("user_favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("content_type", contentType)
          .eq("content_id", contentId);

        if (error) {
          // Rollback — add it back
          setFavoriteIds((prev) => new Set([...prev, contentId]));
          return false;
        }
      } else {
        const { error } = await supabase.from("user_favorites").insert({
          user_id: user.id,
          content_type: contentType,
          content_id: contentId,
        });

        if (error) {
          // Rollback — remove it
          setFavoriteIds((prev) => {
            const next = new Set(prev);
            next.delete(contentId);
            return next;
          });
          return false;
        }
      }

      return true;
    },
    [user, favoriteIds, contentType, supabase]
  );

  return {
    favoriteIds,
    toggleFavorite,
    loading,
    isAuthenticated: !!user,
  };
}
