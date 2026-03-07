import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FQHC Resume Guide 2026 — What California FQHCs Actually Want to See",
  description:
    "Exactly what CA FQHCs look for: ECM programs, OCHIN Epic, CHW certification, bilingual skills. Step-by-step resume guide with free templates for community health workers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
