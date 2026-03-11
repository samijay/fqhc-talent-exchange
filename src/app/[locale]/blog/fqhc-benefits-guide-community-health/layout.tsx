import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("fqhc-benefits-guide-community-health");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
