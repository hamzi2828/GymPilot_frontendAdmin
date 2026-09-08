import { FEATURES, FEATURE_GROUPS } from "@/content/features";
import { stagger } from "@/lib/motion";
import { FEATURE_ICONS, FEATURE_TINTS } from "./FeaturePictures";
import Reveal from "./Reveal";

// All eighteen on one screen, before the long read starts. A buyer who wants
// one thing (do you do lockers?) can find it in a second and jump straight to
// it; everyone else gets a sense of the size of the thing.
export default function FeatureIndex() {
  const groupLabel = Object.fromEntries(FEATURE_GROUPS.map((g) => [g.key, g.label]));

  return (
    <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="v-rise font-display text-2xl font-bold tracking-[-0.02em] text-slate-900 sm:text-3xl" style={stagger(0)}>
            All of it, at a glance
          </h2>
          <p className="v-rise mt-3 text-base text-slate-600" style={stagger(1)}>
            Tap any one to jump to it.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {FEATURES.map((f, i) => {
              const Icon = FEATURE_ICONS[f.key];
              return (
                <li key={f.key} className="v-pop" style={stagger(i, 60)}>
                  <a
                    href={`#f-${f.key}`}
                    className="group flex h-full flex-col gap-2.5 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                  >
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${FEATURE_TINTS[f.key]}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-display text-sm font-semibold leading-snug text-slate-900">{f.title}</span>
                    <span className="mt-auto text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400">{groupLabel[f.group]}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
