// Redirect /insights → /intelligence (intelligence dashboard is now a standalone page)
"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

export default function InsightsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/intelligence");
  }, [router]);
  return null;
}
