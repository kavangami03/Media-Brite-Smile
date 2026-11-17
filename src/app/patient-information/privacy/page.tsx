import { privacyPolicy, legalMetadata } from "@/content/legal";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata = legalMetadata(privacyPolicy);

export default function Page() {
  return <LegalPage doc={privacyPolicy} />;
}
