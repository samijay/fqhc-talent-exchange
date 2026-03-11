import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("fqhc-career-ladder-ma-rn-provider");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
