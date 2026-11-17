import { hipaaNotice, legalMetadata } from "@/content/legal";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata = legalMetadata(hipaaNotice);

export default function Page() {
  return <LegalPage doc={hipaaNotice} />;
}
