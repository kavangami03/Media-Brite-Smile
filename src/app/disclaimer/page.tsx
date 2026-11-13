import type { Metadata } from "next";
import { disclaimer } from "@/content/legal";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: disclaimer.title,
  description: disclaimer.description,
  alternates: { canonical: "/disclaimer" },
};

export default function Page() {
  return <LegalPage doc={disclaimer} />;
}
