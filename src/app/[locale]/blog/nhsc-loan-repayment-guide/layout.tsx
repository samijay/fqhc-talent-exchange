import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/blog-posts";

export const metadata: Metadata = generateBlogMetadata("nhsc-loan-repayment-guide");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
