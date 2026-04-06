import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("march-2026-jobs-report-fqhc-hiring-slowdown");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
