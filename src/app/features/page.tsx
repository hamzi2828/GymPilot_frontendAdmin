import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FEATURES, FEATURE_GROUPS, FEATURES_PAGE } from "@/content/features";
import { stagger } from "@/lib/motion";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import CtaBand from "@/components/marketing/CtaBand";
import ScrollProgress from "@/components/marketing/ScrollProgress";
import FeatureFull from "@/components/marketing/FeatureFull";
import Reveal from "@/components/marketing/Reveal";
import Glow from "@/components/marketing/Glow";

export const metadata: Metadata = {
  title: "Features",
  description: "Every feature in GymPilot, in plain English: memberships and billing, class booking, personal training, front desk, shop, staff, messaging, your own website and member app, reports, and a private database per gym.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden bg-slate-950 pb-16 pt-32 text-white sm:pt-36">
          <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
          <Glow className="left-1/2 top-0 h-[620px] w-[1100px] -translate-x-1/2 -translate-y-1/2" color="rgba(79,70,229,0.38)" drift="a" />
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
          </div>
        </section>

        {/* Jump to a group. Sits under the fixed header. */}
        <nav aria-label="Feature groups" className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">
            {FEATURE_GROUPS.map((g) => (
              <a key={g.key} href={`#${g.key}`} className="whitespace-nowrap rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700">
                {g.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Every feature, by group */}
        {FEATURE_GROUPS.map((group, gi) => {
          const items = FEATURES.filter((f) => f.group === group.key);
          return (
            <section key={group.key} id={group.key} className={`scroll-mt-32 py-20 sm:py-24 ${gi % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <Reveal className="max-w-2xl">
                  <p className="v-rise flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600" style={stagger(0)}>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">{gi + 1}</span>
                    {group.label}
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
                    <FeatureFull key={feature.key} feature={feature} index={i} />
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
