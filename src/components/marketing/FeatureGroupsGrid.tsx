import Link from "next/link";
import { FEATURE_GROUPS, featuresIn } from "@/content/features";
import { stagger } from "@/lib/motion";

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

// Every group, numbered, with how many features it has and each feature under
// it, numbered within its group (1, 1.1, 1.2 … 2, 2.1) -- for a dark
// background. A feature leads to its card on /features (the page slides to
// it); the card's Read more opens the feature's own page. The header's Features menu and the top of /features show
// exactly this, so the two always match. The groups come in one after
// another (a-rise), whenever the grid is shown.
export default function FeatureGroupsGrid({ onNavigate, currentPath = "", className = "" }: { onNavigate?: () => void; currentPath?: string; className?: string }) {
  return (
    <div className={`grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {FEATURE_GROUPS.map((group, gi) => {
        const items = featuresIn(group.key);
        return (
          <div key={group.key} className="a-rise" style={stagger(gi)}>
            <Link href={`/features#${group.key}`} onClick={onNavigate} className={`group/head -mx-2 flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/5 ${FOCUS}`}>
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-slate-200 transition-colors group-hover/head:bg-brand-600 group-hover/head:text-white">{gi + 1}</span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-snug text-white">{group.label}</span>
                <span className="block text-[11px] text-slate-400">{items.length} features</span>
              </span>
            </Link>
            <ul className="ml-[22px] mt-2 space-y-0.5 border-l border-white/10 pl-3">
              {items.map((f, fi) => {
                const here = currentPath === `/features/${f.slug}`;
                return (
                  <li key={f.key}>
                    <Link
                      href={`/features#${f.slug}`}
                      onClick={onNavigate}
                      aria-current={here ? "page" : undefined}
                      className={`group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${FOCUS} ${here ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
                    >
                      <span className="w-7 shrink-0 font-mono text-[11px] font-semibold tabular-nums text-slate-500 transition-colors group-hover:text-brand-300">
                        {gi + 1}.{fi + 1}
                      </span>
                      {f.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
