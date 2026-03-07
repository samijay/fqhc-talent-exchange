import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-config";

export const metadata: Metadata = pageMetadata.locumTenens;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
