import Link from "next/link";
import type { IconType } from "react-icons";
import { FiBarChart2, FiCalendar, FiCreditCard, FiGlobe, FiShield, FiShoppingBag, FiUsers, FiZap } from "react-icons/fi";
import { FEATURE_GROUPS, featuresIn, type GroupKey } from "@/content/features";
import { stagger } from "@/lib/motion";

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

// Each group's own colour and icon, for the card look on /features.
const LOOK: Record<GroupKey, { icon: IconType; badge: string; edge: string; glow: string }> = {
  desk: { icon: FiCreditCard, badge: "from-emerald-400 to-teal-500", edge: "from-emerald-400/70", glow: "hover:shadow-emerald-500/15" },
  checkin: { icon: FiZap, badge: "from-sky-400 to-blue-500", edge: "from-sky-400/70", glow: "hover:shadow-sky-500/15" },
  money: { icon: FiBarChart2, badge: "from-amber-400 to-orange-500", edge: "from-amber-400/70", glow: "hover:shadow-amber-500/15" },
  shop: { icon: FiShoppingBag, badge: "from-rose-400 to-pink-500", edge: "from-rose-400/70", glow: "hover:shadow-rose-500/15" },
  classes: { icon: FiCalendar, badge: "from-violet-400 to-purple-500", edge: "from-violet-400/70", glow: "hover:shadow-violet-500/15" },
  team: { icon: FiUsers, badge: "from-orange-400 to-red-500", edge: "from-orange-400/70", glow: "hover:shadow-orange-500/15" },
  reach: { icon: FiGlobe, badge: "from-fuchsia-400 to-pink-500", edge: "from-fuchsia-400/70", glow: "hover:shadow-fuchsia-500/15" },
  control: { icon: FiShield, badge: "from-indigo-400 to-brand-500", edge: "from-indigo-400/70", glow: "hover:shadow-indigo-500/15" },
};

// Every group, numbered, with how many features it has and each feature under
// it, numbered within its group (1, 1.1, 1.2 … 2, 2.1) -- for a dark
// background. A feature leads to its card on /features (the page slides to
// it); the card's Read more opens the feature's own page. The header's
// Features menu shows the plain list; the top of /features shows the same
// list as a card per group (`variant="cards"`), each in its own colour. The
// groups come in one after another (a-rise), whenever the grid is shown.
export default function FeatureGroupsGrid({ onNavigate, currentPath = "", className = "", variant = "plain" }: { onNavigate?: () => void; currentPath?: string; className?: string; variant?: "plain" | "cards" }) {
  const cards = variant === "cards";
  return (
    <div className={`grid sm:grid-cols-2 lg:grid-cols-4 ${cards ? "gap-4" : "gap-x-8 gap-y-8"} ${className}`}>
      {FEATURE_GROUPS.map((group, gi) => {
        const items = featuresIn(group.key);
        const look = LOOK[group.key];
        const Icon = look.icon;
        return (
          <div
            key={group.key}
            className={`a-rise ${cards ? `group/card relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-2xl ${look.glow} motion-reduce:transition-none motion-reduce:hover:translate-y-0` : ""}`}
            style={stagger(gi)}
          >
            {/* A thin line in the group's colour across the top of its card. */}
            {cards && <span className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${look.edge} via-white/30 to-transparent`} aria-hidden="true" />}
            <Link href={`/features#${group.key}`} onClick={onNavigate} className={`group/head flex items-center gap-3 rounded-xl transition-colors ${cards ? "" : "-mx-2 px-2 py-1.5 hover:bg-white/5"} ${FOCUS}`}>
              {cards ? (
                <span className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${look.badge} text-white shadow-lg transition-transform duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110 motion-reduce:transition-none`}>
                  <Icon className="h-5 w-5" />
                  <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-white ring-2 ring-slate-950">{gi + 1}</span>
                </span>
              ) : (
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-slate-200 transition-colors group-hover/head:bg-brand-600 group-hover/head:text-white">{gi + 1}</span>
              )}
              <span className="min-w-0 flex-1">
                <span className={`block font-semibold leading-snug text-white ${cards ? "text-[15px]" : "text-sm"}`}>{group.label}</span>
                {cards ? (
                  <span className="mt-0.5 inline-block rounded-full bg-white/10 px-2 py-px text-[10px] font-semibold text-slate-300">{items.length} features</span>
                ) : (
                  <span className="block text-[11px] text-slate-400">{items.length} features</span>
                )}
              </span>
            </Link>
            <ul className={`space-y-0.5 ${cards ? "mt-3 border-t border-white/10 pt-2" : "ml-[22px] mt-2 border-l border-white/10 pl-3"}`}>
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
                      <span className="min-w-0 flex-1">{f.name}</span>
                      {cards && <span className="text-slate-600 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-300 group-hover:opacity-100" aria-hidden="true">→</span>}
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
