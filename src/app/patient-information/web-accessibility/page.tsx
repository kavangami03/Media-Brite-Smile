import { webAccessibility, legalMetadata } from "@/content/legal";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata = legalMetadata(webAccessibility);

export default function Page() {
  return <LegalPage doc={webAccessibility} />;
}
