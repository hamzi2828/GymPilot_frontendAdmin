import LegalPage, { legalMetadata } from "@/components/marketing/LegalPage";
import { legalDoc } from "@/content/legal";

const doc = legalDoc("refund-policy");

export const metadata = legalMetadata(doc);

export default function RefundPolicyPage() {
  return <LegalPage doc={doc} />;
}
