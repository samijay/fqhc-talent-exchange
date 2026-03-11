import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("top-10-fqhc-interview-questions");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
