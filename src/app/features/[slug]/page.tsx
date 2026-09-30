import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiCheck, FiChevronRight } from "react-icons/fi";
import { FEATURES, featureBySlug, groupOf, relatedTo } from "@/content/features";
import { SITE } from "@/content/site";
import { stagger } from "@/lib/motion";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import CtaBand from "@/components/marketing/CtaBand";
import ScrollProgress from "@/components/marketing/ScrollProgress";
import FeatureCard from "@/components/marketing/FeatureCard";
import { FEATURE_PICTURES } from "@/components/marketing/FeaturePictures";
import { FEATURE_ICONS, FEATURE_TINTS } from "@/components/marketing/featureIcons";
import Reveal from "@/components/marketing/Reveal";
import Glow from "@/components/marketing/Glow";

type Params = { slug: string };

// One page per feature, built at deploy time from content/features.ts. Any
// other address under /features/ is a 404 rather than an empty page.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const feature = featureBySlug(slug);
  if (!feature) return {};
  const url = `/features/${feature.slug}`;
  const title = `${feature.title} — ${SITE.name}`;
  return {
    title: `${feature.name} · Features`,
    description: feature.text,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: SITE.name, url, title, description: feature.text },
    twitter: { card: "summary_large_image", title, description: feature.text },
  };
}

export default async function FeaturePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const feature = featureBySlug(slug);
  if (!feature) notFound();

  const group = groupOf(feature);
  const related = relatedTo(feature);
  const Icon = FEATURE_ICONS[feature.key];
  const Picture = FEATURE_PICTURES[feature.key];

  // Breadcrumbs for search results. Static content only, so safe to inline.
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Features", item: `${SITE.url}/features` },
      { "@type": "ListItem", position: 2, name: group.label, item: `${SITE.url}/features#${group.key}` },
      { "@type": "ListItem", position: 3, name: feature.name, item: `${SITE.url}/features/${feature.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <SiteHeader />
      <main>
        {/* What it is, in one breath, beside a piece of the real screen. */}
        <section className="relative overflow-hidden bg-slate-950 pb-16 pt-28 text-white sm:pb-20 sm:pt-32">
          <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
          <Glow className="left-1/3 top-0 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2" color="rgba(79,70,229,0.36)" drift="a" />
          <Glow className="-right-40 top-32 h-[420px] w-[520px]" color="rgba(217,70,239,0.2)" drift="b" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="a-rise" style={stagger(0)}>
              <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-400">
                <li>
                  <Link href="/features" className="rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                    Features
                  </Link>
                </li>
                <li aria-hidden="true">
                  <FiChevronRight className="h-3.5 w-3.5 text-slate-600" />
                </li>
                <li>
                  <Link href={`/features#${group.key}`} className="rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                    {group.label}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <FiChevronRight className="h-3.5 w-3.5 text-slate-600" />
                </li>
                <li aria-current="page" className="text-slate-200">
                  {feature.name}
                </li>
              </ol>
            </nav>

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              <div>
                <div className="a-rise flex flex-wrap items-center gap-3" style={stagger(1)}>
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset ${FEATURE_TINTS[feature.key]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">{feature.name}</span>
                  {feature.addon && <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-200 ring-1 ring-inset ring-white/15">Add-on</span>}
                </div>
                <h1 className="a-rise mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl" style={stagger(2)}>
                  {feature.title}
                </h1>
                <p className="a-rise mt-5 max-w-xl text-lg leading-relaxed text-slate-300" style={stagger(3)}>
                  {feature.text}
                </p>
                <div className="a-rise mt-8 flex flex-col gap-3 sm:flex-row" style={stagger(4)}>
                  <Link href="/#demo" className="btn-shine btn-shine-dark group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5">
                    Book a demo <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link href="/#pricing" className="btn-shine inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                    See pricing
                  </Link>
                </div>
              </div>

              {Picture && (
                <Reveal className="relative">
                  <div className="v-tilt rounded-2xl bg-white p-2 shadow-lift ring-1 ring-white/10">
                    <Picture />
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* The longer story, then the list. */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="v-rise font-display text-2xl font-bold tracking-[-0.02em] text-slate-900 sm:text-3xl" style={stagger(0)}>
                How it works
              </h2>
              <span className="v-fill mt-4 block h-1 w-12 origin-left rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500" style={stagger(1)} aria-hidden="true" />
              <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700 sm:text-lg">
                {feature.body.map((paragraph, i) => (
                  <p key={i} className="v-rise" style={stagger(2 + i)}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h2 className="v-rise text-xs font-semibold uppercase tracking-[0.16em] text-slate-500" style={stagger(0)}>
                  What it does
                </h2>
                <ul className="mt-5 space-y-3">
                  {feature.points.map((p, i) => (
                    <li key={p} className="v-rise flex items-start gap-3 text-[15px] text-slate-800" style={stagger(1 + i)}>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <FiCheck className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="v-rise mt-7 border-t border-slate-200 pt-5" style={stagger(7)}>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Where you find it</h3>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {feature.screens.map((s) => (
                      <li key={s} className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Where to go next. */}
        {related.length > 0 && (
          <section aria-labelledby="related-title" className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="v-rise text-xs font-semibold uppercase tracking-[0.18em] text-brand-600" style={stagger(0)}>
                    Goes well with
                  </p>
                  <h2 id="related-title" className="v-rise mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-slate-900 sm:text-3xl" style={stagger(1)}>
                    Related features
                  </h2>
                </div>
                <div className="v-rise flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold" style={stagger(2)}>
                  <Link href={`/features#${group.key}`} className="inline-flex items-center gap-1.5 rounded text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    More in {group.label}
                  </Link>
                  <Link href="/features" className="group inline-flex items-center gap-1.5 rounded text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    All features <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={80} className="mt-8">
                <div className="grid gap-5 md:grid-cols-3">
                  {related.map((f, i) => (
                    <FeatureCard key={f.key} feature={f} index={i} />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        <CtaBand />
      </main>
      <SiteFooter />
      <ScrollProgress />
    </>
  );
}
