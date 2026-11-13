import type { Metadata } from "next";
import { privacyPolicy } from "@/content/legal";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <LegalPage doc={privacyPolicy} />;
}
