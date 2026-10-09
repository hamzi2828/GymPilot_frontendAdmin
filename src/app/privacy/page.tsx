import LegalPage, { legalMetadata } from "@/components/marketing/LegalPage";
import { legalDoc } from "@/content/legal";

const doc = legalDoc("privacy");

export const metadata = legalMetadata(doc);

export default function PrivacyPage() {
  return <LegalPage doc={doc} />;
}
