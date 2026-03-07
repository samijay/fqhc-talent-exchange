import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";

export const metadata: Metadata = pageMetadata.workforceResilience;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
