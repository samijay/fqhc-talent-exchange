import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FQHC Interview Prep 2026 — Top Questions, STAR Answers & Salary Tips for CA Community Health Jobs",
  description:
    "Practice 10 real FQHC interview questions with STAR framework, strong answer examples, and red flags. Role-specific guides for CHWs, RNs, and Care Coordinators. Free for California community health job seekers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
