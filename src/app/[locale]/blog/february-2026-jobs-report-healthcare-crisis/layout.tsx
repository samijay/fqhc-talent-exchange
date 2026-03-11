import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("february-2026-jobs-report-healthcare-crisis");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
