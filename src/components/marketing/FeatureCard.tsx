import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { Feature } from "@/content/features";
import { stagger } from "@/lib/motion";
import { FEATURE_ICONS, FEATURE_TINTS } from "./featureIcons";

// One feature as a card that leads to its own page: its name and a few
// plain words, nothing more -- the detail is one tap away. The whole card
// is the target (the heading's link is stretched over it), so a tap
// anywhere lands, but screen readers still hear only the feature's name.
// `anchored` gives the card the feature's slug as its id, so /features#<slug>
// slides straight to it (and it glows for a moment) -- used on /features only.
export default function FeatureCard({ feature, index = 0, headingLevel = "h3", anchored = false }: { feature: Feature; index?: number; headingLevel?: "h2" | "h3"; anchored?: boolean }) {
  const Icon = FEATURE_ICONS[feature.key];
  const Heading = headingLevel;

  return (
    <article
      id={anchored ? feature.slug : undefined}
      className="feature-anchor v-rise group relative scroll-mt-24 flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={stagger(index % 6)}
    >
      {/* Icon and name on one line keeps the card short. */}
      <div className="flex items-center gap-3">
        <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none ${FEATURE_TINTS[feature.key]}`}>
          <Icon className="h-5 w-5" />
        </span>
        <Heading className="min-w-0 font-display text-lg font-semibold leading-snug tracking-tight text-slate-900">
          <Link href={`/features/${feature.slug}`} className="outline-none before:absolute before:inset-0 before:rounded-2xl before:content-['']">
            {feature.name}
          </Link>
        </Heading>
        {feature.addon && <span className="ml-auto shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-700">Add-on</span>}
      </div>
      <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{feature.short}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brand-600" aria-hidden="true">
        Read more <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
      </span>
    </article>
  );
}
