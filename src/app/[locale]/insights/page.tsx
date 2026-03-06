// Redirect /insights → / (intelligence dashboard is now the homepage)
"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

export default function InsightsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
