"use client";

import { useEffect, useState, useCallback } from "react";
import { createAuthClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ReadStatus = "read" | "reading" | "want_to_read";

export interface ContentRead {
  status: ReadStatus;
  progress: number;
  lastReadAt: string;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

/**
 * Hook for managing content reading progress.
 * Batch-fetches all reads on mount (one query, not per card).
 * Optimistic updates with rollback on error.
 * Returns empty state for unauthenticated users.
 */
export function useContentReads(contentType?: string) {
  const { user } = useAuth();
  const [reads, setReads] = useState<Map<string, ContentRead>>(new Map());
  const [loading, setLoading] = useState(true);
  const [supabase] = useState(() => createAuthClient());

  // Fetch all reads on mount (optionally filtered by content type)
  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReads(new Map());
      setLoading(false);
      return;
    }

    let query = supabase
      .from("content_reads")
      .select("content_type, content_id, status, progress, last_read_at")
      .eq("user_id", user.id);

    if (contentType) {
      query = query.eq("content_type", contentType);
    }

    void query.then(({ data, error }) => {
      if (error) {
        console.warn("[useContentReads] fetch failed:", error.message);
        setLoading(false);
        return;
      }
      const map = new Map<string, ContentRead>();
      for (const row of data ?? []) {
        const key = contentType
          ? row.content_id
          : `${row.content_type}:${row.content_id}`;
        map.set(key, {
          status: row.status as ReadStatus,
          progress: row.progress,
          lastReadAt: row.last_read_at,
        });
      }
      setReads(map);
      setLoading(false);
    });
  }, [user, contentType, supabase]);

  // Upsert a content read
  const upsertRead = useCallback(
    async (
      type: string,
      contentId: string,
      status: ReadStatus,
      progress?: number
    ) => {
      if (!user) return;

      const key = contentType ? contentId : `${type}:${contentId}`;
      const prev = reads.get(key);

      // Optimistic update
      setReads((old) => {
        const next = new Map(old);
        next.set(key, {
          status,
          progress: progress ?? prev?.progress ?? 0,
          lastReadAt: new Date().toISOString(),
        });
        return next;
      });

      const { error } = await supabase.from("content_reads").upsert(
        {
          user_id: user.id,
          content_type: type,
          content_id: contentId,
          status,
          progress: progress ?? prev?.progress ?? 0,
          last_read_at: new Date().toISOString(),
        },
        { onConflict: "user_id,content_type,content_id" }
      );

      if (error) {
        // Rollback
        setReads((old) => {
          const next = new Map(old);
          if (prev) {
            next.set(key, prev);
          } else {
            next.delete(key);
          }
          return next;
        });
      }
    },
    [user, reads, contentType, supabase]
  );

  const markAsRead = useCallback(
    (contentId: string, type?: string) =>
      upsertRead(type ?? contentType ?? "", contentId, "read", 100),
    [upsertRead, contentType]
  );

  const markAsReading = useCallback(
    (contentId: string, progress?: number, type?: string) =>
      upsertRead(type ?? contentType ?? "", contentId, "reading", progress),
    [upsertRead, contentType]
  );

  const toggleWantToRead = useCallback(
    (contentId: string, type?: string) => {
      const key = contentType ? contentId : `${type ?? contentType}:${contentId}`;
      const current = reads.get(key);
      if (current?.status === "want_to_read") {
        // Remove it
        if (!user) return Promise.resolve();
        setReads((old) => {
          const next = new Map(old);
          next.delete(key);
          return next;
        });
        return supabase
          .from("content_reads")
          .delete()
          .eq("user_id", user.id)
          .eq("content_type", type ?? contentType ?? "")
          .eq("content_id", contentId)
          .then(() => {});
      }
      return upsertRead(type ?? contentType ?? "", contentId, "want_to_read", 0);
    },
    [user, reads, contentType, supabase, upsertRead]
  );

  return {
    reads,
    markAsRead,
    markAsReading,
    toggleWantToRead,
    loading,
    isAuthenticated: !!user,
  };
}
