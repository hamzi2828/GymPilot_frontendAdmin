import type { CSSProperties } from "react";
import { FiBell, FiCheck, FiVolume2 } from "react-icons/fi";
import type { FeatureKey } from "@/content/features";

// A small looping scene for each card in "What changes for your gym": the
// outcome happening, in a second or two, rather than a static icon. They share
// the 6s loop of "What you get" (globals.css), are decorative only, and hold
// still for anyone who has asked for reduced motion.
const at = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

// Get paid on time: each "Due" turns "Paid", then the reminder bell rings.
function PaidScene() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-1.5 px-4">
      <FiBell className="a-bn-ring absolute right-3 top-2.5 h-4 w-4 text-amber-500" style={at(2.2)} />
      {["Ali Raza", "Sara Khan", "Usman Ali"].map((name, i) => (
        <div key={name} className="flex items-center justify-between rounded-md bg-white px-2.5 py-1 text-[11px] text-slate-600 shadow-sm ring-1 ring-slate-200">
          {name}
          <span className="relative">
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Due</span>
            <span className="a-wyg-build absolute inset-0 inline-flex items-center justify-center gap-0.5 rounded-full bg-emerald-500 text-[10px] font-semibold text-white" style={at(0.4 + i * 0.6)}>
              <FiCheck className="h-2.5 w-2.5" /> Paid
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

// No more unpaid visits: a scan line sweeps the member's QR code, and the
// desk calls out "Fee expired".
function ScanScene() {
  const cells = [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1];
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <div className="relative grid h-[68px] w-[68px] grid-cols-5 gap-0.5 overflow-hidden rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
        {cells.map((on, i) => (
          <span key={i} className={`rounded-[1px] ${on ? "bg-slate-800" : "bg-transparent"}`} />
        ))}
        <span className="a-bn-scan absolute inset-x-0 h-0.5 bg-rose-500 shadow-[0_0_8px_2px_rgba(244,63,94,0.6)]" />
      </div>
      <span className="a-wyg-tick inline-flex items-center gap-1.5 rounded-xl rounded-bl-none bg-rose-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg" style={at(1.6)}>
        <FiVolume2 className="h-3.5 w-3.5" /> Fee expired
      </span>
    </div>
  );
}

// Win new members: new faces join from the website, a "+1" for each.
function JoinScene() {
  const people = [
    ["AR", "from-emerald-400 to-teal-500"],
    ["SK", "from-orange-400 to-rose-500"],
    ["UA", "from-brand-400 to-purple-500"],
    ["MH", "from-sky-400 to-blue-500"],
  ];
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex -space-x-2">
        {people.map(([initials, tint], i) => (
          <span key={initials} className="relative">
            <span className={`a-wyg-build inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${tint} text-[11px] font-bold text-white ring-2 ring-white`} style={at(0.3 + i * 0.5)}>
              {initials}
            </span>
            <span className="a-bn-up absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold text-emerald-600" style={at(0.3 + i * 0.5)}>
              +1
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Fill your classes: the spots of tonight's class are taken one by one,
// until it says Full.
function ClassScene() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-4">
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
        HIIT · 18:00
        <span className="a-wyg-tick rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white" style={at(3.4)}>
          Full
        </span>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="a-bn-seat h-3.5 rounded-full bg-slate-200" style={at(0.2 + i * 0.27)} />
        ))}
      </div>
    </div>
  );
}

// Bring members back: the reminder lands on their phone, and they renew.
function ComebackScene() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
      <div className="a-bn-slide flex w-full max-w-[220px] items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 text-left shadow-md ring-1 ring-slate-200" style={at(0.3)}>
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 text-white">
          <FiBell className="h-3 w-3" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold text-slate-800">Your fee is due</span>
          <span className="block text-[10px] text-slate-500">Tap to renew in a minute</span>
        </span>
      </div>
      <span className="a-wyg-tick inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-semibold text-white" style={at(2.2)}>
        <FiCheck className="h-3 w-3" /> Renewed
      </span>
    </div>
  );
}

// Know your numbers: the day's sales line draws itself, then the total.
function NumbersScene() {
  return (
    <div className="relative h-full px-3 pb-2 pt-3">
      <span className="a-wyg-build absolute left-3 top-2 rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-slate-800 shadow-sm ring-1 ring-slate-200" style={at(2)}>
        Today <span className="text-emerald-600">Rs 48,500</span>
      </span>
      <svg viewBox="0 0 200 60" className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bn-sales" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#10b981" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <polyline
          className="a-bn-draw"
          pathLength={1}
          points="4,52 34,44 62,48 92,30 122,36 152,18 196,8"
          fill="none"
          stroke="url(#bn-sales)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export const BENEFIT_SCENES: Partial<Record<FeatureKey, () => React.JSX.Element>> = {
  renewals: PaidScene,
  alerts: ScanScene,
  website: JoinScene,
  booking: ClassScene,
  messaging: ComebackScene,
  dailysales: NumbersScene,
};
