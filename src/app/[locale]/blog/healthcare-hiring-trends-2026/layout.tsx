import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("healthcare-hiring-trends-2026");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
