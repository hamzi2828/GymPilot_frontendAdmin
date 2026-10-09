import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { LEGAL_DOCS, type LegalDoc } from "@/content/legal";
import { LEGAL, SITE } from "@/content/site";
import { stagger } from "@/lib/motion";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Glow from "./Glow";

/** Title, description and canonical for a legal page, from its document. */
export function legalMetadata(doc: LegalDoc): Metadata {
  const url = `/${doc.slug}`;
  return {
    title: doc.name,
    description: doc.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url,
      title: `${doc.name} — ${SITE.name}`,
      description: doc.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
    },
  };
}

// One legal document as a page: what it is in a line, a list of its sections
// to jump to, then the sections in plain paragraphs and short lists. Built
// to be read on a phone -- one narrow column, large type, nothing to open.
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);
  const seller = [LEGAL.name, LEGAL.address].filter(Boolean);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-slate-950 pb-14 pt-32 text-white sm:pb-16 sm:pt-36">
          <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
          <Glow className="left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2" color="rgba(79,70,229,0.34)" drift="a" />
          <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
            <p className="a-rise text-xs font-semibold uppercase tracking-[0.18em] text-brand-300" style={stagger(0)}>
              Legal
            </p>
            <h1 className="a-rise mt-3 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl" style={stagger(1)}>
              {doc.title}
            </h1>
            <p className="a-rise mt-5 text-lg leading-relaxed text-slate-300" style={stagger(2)}>
              {doc.lead}
            </p>
            {LEGAL.updated && (
              <p className="a-rise mt-4 text-sm text-slate-400" style={stagger(3)}>
                Last updated {LEGAL.updated}
              </p>
            )}
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <nav aria-label="On this page" className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">On this page</p>
              <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                {doc.sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="inline-flex gap-2 rounded text-slate-700 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                      <span className="w-5 shrink-0 text-slate-400">{i + 1}.</span> {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact" className="inline-flex gap-2 rounded text-slate-700 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    <span className="w-5 shrink-0 text-slate-400">{doc.sections.length + 1}.</span> Contact us
                  </a>
                </li>
              </ol>
            </nav>

            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24 pt-10">
                {/* The label is shown where a new part of the page begins. */}
                {s.kicker && s.kicker !== doc.sections[i - 1]?.kicker && (
                  <p className="mb-6 border-t border-slate-200 pt-8 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{s.kicker}</p>
                )}
                <h2 id={`${s.id}-title`} className="font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-700">
                  {s.blocks.map((block, j) =>
                    typeof block === "string" ? (
                      <p key={j}>{block}</p>
                    ) : (
                      <ul key={j} className="list-disc space-y-1.5 pl-5 marker:text-slate-400">
                        {block.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}

            <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 pt-10">
              <h2 id="contact-title" className="font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {doc.sections.length + 1}. Contact us
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-700">
                <p>Questions about this page? Ask us. We answer in plain words.</p>
                {seller.length > 0 && <p>{seller.join(", ")}</p>}
                <div className="flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:flex-wrap sm:gap-x-6">
                  {LEGAL.email && (
                    <a href={`mailto:${LEGAL.email}`} className="inline-flex items-center gap-2 text-brand-700 hover:text-brand-800">
                      <FiMail className="h-4 w-4" /> {LEGAL.email}
                    </a>
                  )}
                  <Link href="/#demo" className="group inline-flex items-center gap-1.5 text-brand-700 hover:text-brand-800">
                    Send us a message <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </section>

            <nav aria-label="Other legal pages" className="mt-12 flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              <span className="text-slate-500">Also read:</span>
              {others.map((d) => (
                <Link key={d.slug} href={`/${d.slug}`} className="font-semibold text-brand-700 hover:text-brand-800">
                  {d.name}
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
