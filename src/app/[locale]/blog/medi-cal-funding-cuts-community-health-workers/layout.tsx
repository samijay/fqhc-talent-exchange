import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("medi-cal-funding-cuts-community-health-workers");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
