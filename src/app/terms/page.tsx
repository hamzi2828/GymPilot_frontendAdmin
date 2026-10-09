import LegalPage, { legalMetadata } from "@/components/marketing/LegalPage";
import { legalDoc } from "@/content/legal";

const doc = legalDoc("terms");

export const metadata = legalMetadata(doc);

export default function TermsPage() {
  return <LegalPage doc={doc} />;
}
