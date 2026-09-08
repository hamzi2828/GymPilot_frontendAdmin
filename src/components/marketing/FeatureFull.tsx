import { FiCheck } from "react-icons/fi";
import type { Feature } from "@/content/features";
import { stagger } from "@/lib/motion";
import { FEATURE_ICONS, FEATURE_PICTURES, FEATURE_TINTS } from "./FeaturePictures";
import Reveal from "./Reveal";

// One feature, told properly: what it is, what it means for the gym in plain
// words, what you get, and the screens it actually lives on. Sides alternate
// down the page so the eye keeps moving.
export default function FeatureFull({ feature, index }: { feature: Feature; index: number }) {
  const Icon = FEATURE_ICONS[feature.key];
  const Picture = FEATURE_PICTURES[feature.key];
  const flip = index % 2 === 1;

  return (
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <span className={`v-pop inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset ${FEATURE_TINTS[feature.key]}`} style={stagger(0)}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="v-rise mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl" style={stagger(1)}>
          {feature.title}
        </h3>
        <p className="v-rise mt-3 text-base font-medium leading-relaxed text-slate-800" style={stagger(2)}>
          {feature.text}
        </p>
        <p className="v-rise mt-3 text-base leading-relaxed text-slate-600" style={stagger(3)}>
          {feature.detail}
        </p>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {feature.points.map((p, i) => (
            <li key={p} className="v-rise flex items-start gap-2.5 text-sm text-slate-700" style={stagger(4 + i)}>
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <FiCheck className="h-3 w-3" />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <div className="v-rise mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4" style={stagger(9)}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Where you find it</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {feature.screens.map((s) => (
              <span key={s} className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120} className={flip ? "lg:order-1" : ""}>
        {Picture && <Picture />}
      </Reveal>
    </article>
  );
}
