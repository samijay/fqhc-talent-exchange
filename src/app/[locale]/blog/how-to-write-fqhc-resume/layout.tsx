import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("how-to-write-fqhc-resume");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
