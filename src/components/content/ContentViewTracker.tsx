"use client";

import { useTrackContentView } from "@/hooks/useTrackContentView";

/**
 * Invisible client component that tracks content views.
 * Drop into server components (e.g. blog articles) to auto-track reads.
 */
export function ContentViewTracker({
  contentType,
  contentId,
}: {
  contentType: string;
  contentId: string;
}) {
  useTrackContentView(contentType, contentId);
  return null;
}
