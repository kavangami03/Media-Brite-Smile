import type { Metadata } from "next";
import { termsOfUse } from "@/content/legal";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: termsOfUse.title,
  description: termsOfUse.description,
  alternates: { canonical: "/terms-of-use" },
};

export default function Page() {
  return <LegalPage doc={termsOfUse} />;
}
