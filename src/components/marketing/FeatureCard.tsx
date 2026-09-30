import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import type { Feature } from "@/content/features";
import { stagger } from "@/lib/motion";
import { FEATURE_ICONS, FEATURE_TINTS } from "./featureIcons";

// One feature as a card that leads to its own page: what it is in a line,
// three things it does, and the way in. The whole card is the target (the
// heading's link is stretched over it), so a tap anywhere lands, but screen
// readers still hear only the feature's name as the link.
export default function FeatureCard({ feature, index = 0, headingLevel = "h3" }: { feature: Feature; index?: number; headingLevel?: "h2" | "h3" }) {
  const Icon = FEATURE_ICONS[feature.key];
  const Heading = headingLevel;

  return (
    <article
      className="v-rise group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={stagger(index % 6)}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none ${FEATURE_TINTS[feature.key]}`}>
          <Icon className="h-5 w-5" />
        </span>
        {feature.addon && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-700">Add-on</span>}
      </div>
      <Heading className="mt-4 font-display text-lg font-semibold tracking-tight text-slate-900">
        <Link href={`/features/${feature.slug}`} className="outline-none before:absolute before:inset-0 before:rounded-2xl before:content-['']">
          {feature.name}
        </Link>
      </Heading>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.text}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
        {feature.points.slice(0, 3).map((p) => (
          <li key={p} className="flex items-start gap-2">
            <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" /> {p}
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-600" aria-hidden="true">
        Read more <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
      </span>
    </article>
  );
}
