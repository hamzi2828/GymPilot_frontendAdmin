import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FEATURES, FEATURE_GROUPS, FEATURES_PAGE, featuresIn } from "@/content/features";
import { SITE } from "@/content/site";
import { stagger } from "@/lib/motion";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import CtaBand from "@/components/marketing/CtaBand";
import ScrollProgress from "@/components/marketing/ScrollProgress";
import FeatureCard from "@/components/marketing/FeatureCard";
import Reveal from "@/components/marketing/Reveal";
import Glow from "@/components/marketing/Glow";
import FeatureGroupsGrid from "@/components/marketing/FeatureGroupsGrid";

// For search results: one sentence, under 160 characters.
const DESCRIPTION = `All ${FEATURES.length} ${SITE.name} features in plain English: fee collection, dues, check-in alerts, reports, the shop, classes, staff, messaging, your website and backups.`;

export const metadata: Metadata = {
  title: "Features",
  description: DESCRIPTION,
  alternates: { canonical: "/features" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/features",
    title: `Every feature — ${SITE.name}`,
    description: DESCRIPTION,
    // Setting openGraph here replaces the whole inherited block, image and
    // all, so the site's card is named again.
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
  },
};

// The overview: every feature, grouped the way an owner thinks about the
// gym, each one a card that leads to its own page. Groups have anchors
// (/features#desk …) so the header's menu can point straight at them.
export default function FeaturesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden bg-slate-950 pb-6 pt-28 text-white sm:pb-8 sm:pt-32">
          <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
          <Glow className="left-1/2 top-0 h-[620px] w-[1100px] -translate-x-1/2 -translate-y-1/2" color="rgba(79,70,229,0.38)" drift="a" />
          <Glow className="-right-32 top-40 h-[420px] w-[520px]" color="rgba(217,70,239,0.22)" drift="b" />
          <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
            <p className="a-rise text-xs font-semibold uppercase tracking-[0.18em] text-brand-300" style={stagger(0)}>
              {FEATURES_PAGE.eyebrow}
            </p>
            <h1 className="a-rise mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-5xl" style={stagger(1)}>
              {FEATURES_PAGE.title}
            </h1>
          </div>
        </section>

        {/* The groups on one screen, laid out like the header's Features
            menu: a buyer who wants one thing (do you do receipts?) jumps
            straight to its group or opens the feature itself. */}
        <nav aria-label="Feature groups" className="bg-slate-950 pb-10 pt-8 text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Jump to</p>
            <FeatureGroupsGrid className="mt-8" />
          </div>
        </nav>

        {/* After the list: the one thing to know about plans, and the way on. */}
        <section className="border-b border-white/10 bg-slate-950 pb-12 text-center text-white">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">{FEATURES_PAGE.lead}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#demo" className="btn-shine btn-shine-dark group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5">
                Book a demo <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/#pricing" className="btn-shine inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                See pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Every feature, by group */}
        {FEATURE_GROUPS.map((group, gi) => {
          const items = featuresIn(group.key);
          return (
            <section key={group.key} id={group.key} aria-labelledby={`${group.key}-title`} className={`scroll-mt-20 py-20 sm:py-24 ${gi % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <Reveal className="max-w-2xl">
                  <p className="v-rise flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600" style={stagger(0)}>
                    <span className="v-pop inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white" style={stagger(0)}>
                      {gi + 1}
                    </span>
                    {group.label}
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold tracking-normal text-slate-500">{items.length} features</span>
                  </p>
                  <h2 id={`${group.key}-title`} className="v-rise mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-slate-900 sm:text-4xl" style={stagger(1)}>
                    {group.title}
                  </h2>
                  <span className="v-fill mt-4 block h-1 w-12 origin-left rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500" style={stagger(2)} aria-hidden="true" />
                  <p className="v-rise mt-4 text-base leading-relaxed text-slate-600 sm:text-lg" style={stagger(3)}>
                    {group.text}
                  </p>
                </Reveal>

                {/* Each card comes in as its own row scrolls into view, the
                    cards of a row one after another, so a long group builds
                    up step by step instead of appearing as one block. */}
                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((feature, i) => (
                    <Reveal key={feature.key} className="h-full">
                      <FeatureCard feature={feature} index={i % 3} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Everything is in every plan */}
        <section className="bg-white pb-4 pt-12">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal>
              <p className="v-rise flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-relaxed text-emerald-900" style={stagger(0)}>
                <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                {FEATURES_PAGE.note}
              </p>
            </Reveal>
          </div>
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
      <ScrollProgress />
    </>
  );
}
