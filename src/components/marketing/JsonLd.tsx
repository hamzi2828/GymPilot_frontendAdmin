import { FAQ, LEGAL, SITE } from "@/content/site";

// Structured data so search results show the product, who is behind it and
// the FAQ. Static content from content/site.ts only, so it is safe to inline.
export default function JsonLd() {
  // Only what is known: a contact detail or legal line that is not set is
  // left out rather than guessed.
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    ...(LEGAL.name ? { legalName: LEGAL.name } : {}),
    ...(LEGAL.address ? { address: LEGAL.address } : {}),
    ...(SITE.contactEmail ? { email: SITE.contactEmail } : {}),
    ...(SITE.contactPhone ? { telephone: SITE.contactPhone } : {}),
  };
  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: SITE.description,
    url: SITE.url,
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", url: `${SITE.url}#pricing` },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
