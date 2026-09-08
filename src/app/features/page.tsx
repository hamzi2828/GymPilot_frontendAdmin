import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FEATURES, FEATURE_GROUPS, FEATURES_PAGE, FEATURE_STATS } from "@/content/features";
import { stagger } from "@/lib/motion";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import CtaBand from "@/components/marketing/CtaBand";
import ScrollProgress from "@/components/marketing/ScrollProgress";
import CountUp from "@/components/marketing/CountUp";
import FeatureFull from "@/components/marketing/FeatureFull";
import FeatureIndex from "@/components/marketing/FeatureIndex";
import Reveal from "@/components/marketing/Reveal";
import Glow from "@/components/marketing/Glow";

export const metadata: Metadata = {
  title: "Features",
  description:
    "All 18 features in GymPilot, in plain English: memberships and billing, discount codes, class booking, personal training, front desk, shop, staff, messaging, your own website and member app, reports, the books, security and a private database per gym.",
  alternates: { canonical: "/features" },
};

// The running number down the page (01 … 18), independent of the groups.
const NUMBER_OF = new Map(FEATURES.map((f, i) => [f.key, i + 1]));

export default function FeaturesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden bg-slate-950 pb-16 pt-32 text-white sm:pt-36">
          <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
          <Glow className="left-1/2 top-0 h-[620px] w-[1100px] -translate-x-1/2 -translate-y-1/2" color="rgba(79,70,229,0.38)" drift="a" />
          <Glow className="-right-32 top-40 h-[420px] w-[520px]" color="rgba(217,70,239,0.22)" drift="b" />
          <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
            <p className="a-rise text-xs font-semibold uppercase tracking-[0.18em] text-brand-300" style={stagger(0)}>
              {FEATURES_PAGE.eyebrow}
            </p>
            <h1 className="a-rise mt-3 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl" style={stagger(1)}>
              {FEATURES_PAGE.title}
            </h1>
            <p className="a-rise mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300" style={stagger(2)}>
              {FEATURES_PAGE.lead}
            </p>
            <div className="a-rise mt-8 flex flex-col justify-center gap-3 sm:flex-row" style={stagger(3)}>
              <Link href="/#demo" className="btn-shine btn-shine-dark group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5">
                Book a demo <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/#pricing" className="btn-shine inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                See pricing
              </Link>
            </div>

            {/* Four numbers that say what kind of product this is. */}
            <dl className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {FEATURE_STATS.map((s, i) => (
                <div key={s.label} className="a-pop rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-sm" style={stagger(4 + i)}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      <CountUp value={s.value} />
                    </span>
                    <span className="mt-1 block text-[11px] font-medium leading-snug text-slate-400">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Everything on one screen, then the long read. */}
        <FeatureIndex />

        {/* Every feature, by group */}
        {FEATURE_GROUPS.map((group, gi) => {
          const items = FEATURES.filter((f) => f.group === group.key);
          return (
            <section key={group.key} id={group.key} className={`scroll-mt-32 py-20 sm:py-24 ${gi % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <Reveal className="max-w-2xl">
                  <p className="v-rise flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600" style={stagger(0)}>
                    <span className="v-pop inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white" style={stagger(0)}>
                      {gi + 1}
                    </span>
                    {group.label}
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold tracking-normal text-slate-500">
                      {items.length} features
                    </span>
                  </p>
                  <h2 className="v-rise mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-slate-900 sm:text-4xl" style={stagger(1)}>
                    {group.title}
                  </h2>
                  <span className="v-fill mt-4 block h-1 w-12 origin-left rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500" style={stagger(2)} aria-hidden="true" />
                  <p className="v-rise mt-4 text-base leading-relaxed text-slate-600 sm:text-lg" style={stagger(3)}>
                    {group.text}
                  </p>
                </Reveal>

                <div className="mt-14 space-y-20 lg:space-y-24">
                  {items.map((feature, i) => (
                    <FeatureFull key={feature.key} feature={feature} index={i} number={NUMBER_OF.get(feature.key) || i + 1} />
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
