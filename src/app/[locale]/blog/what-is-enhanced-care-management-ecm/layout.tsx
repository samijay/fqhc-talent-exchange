import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("what-is-enhanced-care-management-ecm");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
