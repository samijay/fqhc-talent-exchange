import type { Metadata } from "next";
import { ResumeBuilder } from "@/components/resume-builder";

export const metadata: Metadata = {
  title: "Free FQHC Resume Builder | FQHC Talent Exchange",
  description:
    "Build a professional resume optimized for Federally Qualified Health Center jobs. Pre-written bullet points for CHWs, Care Coordinators, Medical Assistants, and more.",
};

export default function ResumeBuilderPage() {
  return <ResumeBuilder />;
}
