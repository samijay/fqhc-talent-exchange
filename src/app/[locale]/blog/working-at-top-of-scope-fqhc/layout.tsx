import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("working-at-top-of-scope-fqhc");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
