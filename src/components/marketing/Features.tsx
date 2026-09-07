import { FiBarChart2, FiBell, FiCalendar, FiCheck, FiCreditCard, FiDatabase, FiGlobe, FiMessageCircle, FiShoppingBag, FiSmartphone, FiTarget, FiTrendingUp, FiUserCheck, FiUserPlus, FiUsers, FiZap } from "react-icons/fi";
import { FEATURES, FEATURES_INTRO } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/* ------------------------------------------------------------------------
   A bento grid: six columns on desktop, every row full. Three of the twelve
   cards are wide (text beside the picture); the rest stack picture over
   text. Each picture is a small piece of the real product drawn in markup.
   ------------------------------------------------------------------------ */

const LAYOUT: Record<string, { span: string; wide?: boolean }> = {
  billing: { span: "md:col-span-2 lg:col-span-4", wide: true },
  booking: { span: "lg:col-span-2" },
  pt: { span: "lg:col-span-2" },
  frontdesk: { span: "lg:col-span-2" },
  pos: { span: "lg:col-span-2" },
  messaging: { span: "md:col-span-2 lg:col-span-4", wide: true },
  staff: { span: "lg:col-span-2" },
  members: { span: "lg:col-span-2" },
  leads: { span: "lg:col-span-2" },
  reports: { span: "lg:col-span-2" },
  website: { span: "md:col-span-2 lg:col-span-4", wide: true },
  data: { span: "lg:col-span-2" },
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  billing: FiCreditCard,
  booking: FiCalendar,
  pt: FiTarget,
  frontdesk: FiZap,
  messaging: FiMessageCircle,
  pos: FiShoppingBag,
  staff: FiUsers,
  members: FiUserCheck,
  leads: FiUserPlus,
  reports: FiBarChart2,
  website: FiGlobe,
  data: FiDatabase,
};

const ICON_TINT: Record<string, string> = {
  billing: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  booking: "bg-brand-50 text-brand-600 ring-brand-100",
  pt: "bg-amber-50 text-amber-600 ring-amber-100",
  frontdesk: "bg-sky-50 text-sky-600 ring-sky-100",
  messaging: "bg-fuchsia-50 text-fuchsia-600 ring-fuchsia-100",
  pos: "bg-rose-50 text-rose-600 ring-rose-100",
  staff: "bg-violet-50 text-violet-600 ring-violet-100",
  members: "bg-teal-50 text-teal-600 ring-teal-100",
  leads: "bg-orange-50 text-orange-600 ring-orange-100",
  reports: "bg-cyan-50 text-cyan-600 ring-cyan-100",
  website: "bg-indigo-50 text-indigo-600 ring-indigo-100",
  data: "bg-slate-100 text-slate-700 ring-slate-200",
};

/* ------------------------------- pictures ------------------------------- */

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-4 ${className}`}>{children}</div>;
}

function BillingPicture() {
  return (
    <Frame className="flex h-full flex-col justify-center">
      <div className="rounded-xl bg-slate-950 p-4 text-white shadow-lift">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Membership</p>
            <p className="font-display text-base font-semibold">Unlimited monthly</p>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30">Active</span>
        </div>
        <p className="mt-3 font-display text-2xl font-bold">
          $59<span className="text-sm font-normal text-slate-400"> / month</span>
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-brand-400 to-purple-400" />
        </div>
        <p className="mt-1.5 text-[11px] text-slate-400">Renews 4 Nov · card •••• 4242</p>
        <div className="mt-3 flex gap-2 text-[11px] font-semibold">
          <span className="rounded-lg bg-white/10 px-2.5 py-1">Pause</span>
          <span className="rounded-lg bg-white/10 px-2.5 py-1">Upgrade</span>
          <span className="rounded-lg bg-white/10 px-2.5 py-1">Invoice PDF</span>
        </div>
      </div>
      <div className="mt-3 space-y-1.5 text-[11px]">
        {[
          ["Invoice #1042 emailed", "Paid by card", "text-emerald-600"],
          ["Bank transfer receipt uploaded", "Waiting for a check", "text-amber-600"],
          ["Renewal reminder", "Sent 3 days before", "text-slate-500"],
        ].map(([a, b, c]) => (
          <div key={a} className="flex items-center justify-between rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-100">
            <span className="font-medium text-slate-700">{a}</span>
            <span className={`font-semibold ${c}`}>{b}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function BookingPicture() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const blocks: Record<string, { t: string; c: string; s?: string }[]> = {
    Mon: [{ t: "HIIT", c: "bg-brand-500" }, { t: "Yoga", c: "bg-emerald-500" }],
    Tue: [{ t: "Boxing", c: "bg-rose-500", s: "Full" }],
    Wed: [{ t: "HIIT", c: "bg-brand-500" }, { t: "Pilates", c: "bg-amber-500", s: "Waitlist 3" }],
    Thu: [{ t: "Spin", c: "bg-sky-500" }],
    Fri: [{ t: "HIIT", c: "bg-brand-500" }, { t: "Yoga", c: "bg-emerald-500" }],
  };
  return (
    <Frame>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d) => (
          <div key={d}>
            <p className="mb-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">{d}</p>
            <div className="space-y-1.5">
              {blocks[d].map((b) => (
                <div key={b.t + d} className={`rounded-md ${b.c} px-1.5 py-1.5 text-[10px] font-semibold text-white`}>
                  {b.t}
                  {b.s && <span className="block text-[9px] font-medium opacity-90">{b.s}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
        <FiBell className="h-3.5 w-3.5 text-brand-500" /> “A spot opened in Pilates — you&apos;re in!”
      </p>
    </Frame>
  );
}

function PtPicture() {
  const slots = [
    ["07:00", "free"],
    ["08:00", "booked"],
    ["09:00", "free"],
    ["17:00", "free"],
    ["18:00", "booked"],
    ["19:00", "class"],
  ];
  return (
    <Frame>
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[11px] font-bold text-white">MJ</span>
        <div>
          <p className="text-xs font-semibold text-slate-900">Coach Marcus · today</p>
          <p className="text-[10px] text-slate-500">$45 a session · keeps 20%</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {slots.map(([t, s]) => (
          <div key={t} className={`rounded-md px-2 py-1.5 text-center text-[11px] font-semibold ${s === "free" ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200" : s === "booked" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400 line-through"}`}>
            {t}
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-slate-500">
        Sara M. · <span className="font-semibold text-slate-800">8 of 10</span> sessions left
      </p>
    </Frame>
  );
}

function FrontDeskPicture() {
  // A QR-ish pattern; purely decorative.
  const cells = "1101101011010110101011001101101011010110101011001101101011010110".split("");
  return (
    <Frame>
      <div className="flex items-center gap-4">
        <div className="grid shrink-0 grid-cols-8 gap-[2px] rounded-lg bg-white p-2 ring-1 ring-slate-200">
          {cells.map((c, i) => (
            <span key={i} className={`h-2 w-2 ${c === "1" ? "bg-slate-900" : "bg-transparent"}`} />
          ))}
        </div>
        <div className="min-w-0 text-[11px]">
          <p className="flex items-center gap-1.5 font-semibold text-emerald-700">
            <FiCheck className="h-3.5 w-3.5" /> Sara M. checked in 07:42
          </p>
          <p className="mt-0.5 text-slate-500">Visit 14 this month</p>
          <p className="mt-2 flex items-center gap-1.5 text-rose-600">
            <FiZap className="h-3.5 w-3.5" /> Omar A. · membership ended · not let in
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2 text-[10px] font-semibold text-slate-600">
        <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">QR kiosk</span>
        <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">Fingerprint app</span>
        <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">312 inside now</span>
      </div>
    </Frame>
  );
}

function MessagingPicture() {
  return (
    <Frame className="flex h-full flex-col justify-center">
      <div className="space-y-2.5">
        <div className="flex items-end gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">W</span>
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-emerald-500 px-3 py-2 text-[11px] text-white">Hi Sara, HIIT Blast is tonight at 18:00 in Studio A. See you there!</div>
        </div>
        <div className="flex items-end justify-end gap-2">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-900 px-3 py-2 text-[11px] text-white">Your membership renews tomorrow. Nothing to do — your card •••• 4242 will be charged $59.</div>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold text-white">S</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <FiBell className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 text-[11px]">
            <p className="font-semibold text-slate-900">You&apos;re off the waitlist 🎉</p>
            <p className="truncate text-slate-500">Reformer Pilates · Wed 09:00 · app notification</p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-semibold">
        {["Not been in for 2 weeks → “we miss you”", "Membership ended → “come back” offer", "Birthday → a treat"].map((a) => (
          <span key={a} className="rounded-full bg-fuchsia-50 px-2 py-0.5 text-fuchsia-700 ring-1 ring-inset ring-fuchsia-100">
            {a}
          </span>
        ))}
      </div>
    </Frame>
  );
}

function PosPicture() {
  return (
    <Frame>
      <div className="mx-auto max-w-[220px] rounded-lg bg-white px-3 py-3 font-mono text-[11px] text-slate-700 shadow-card ring-1 ring-slate-200">
        <p className="text-center text-[10px] font-semibold tracking-widest text-slate-400">RECEIPT 00418</p>
        <div className="mt-2 space-y-1">
          <p className="flex justify-between">
            <span>Protein shake</span>
            <span>$6.00</span>
          </p>
          <p className="flex justify-between">
            <span>Whey 1kg</span>
            <span>$42.00</span>
          </p>
          <p className="flex justify-between">
            <span>Locker · Sep</span>
            <span>$10.00</span>
          </p>
        </div>
        <p className="mt-2 flex justify-between border-t border-dashed border-slate-200 pt-2 font-semibold text-slate-900">
          <span>Total</span>
          <span>$58.00</span>
        </p>
        <p className="mt-1 text-center text-[10px] text-emerald-600">Paid by card · stock updated</p>
      </div>
    </Frame>
  );
}

function StaffPicture() {
  const roles = [
    ["Manager", "bg-violet-500"],
    ["Front desk", "bg-sky-500"],
    ["Trainer", "bg-amber-500"],
    ["Accountant", "bg-emerald-500"],
  ];
  return (
    <Frame>
      <div className="flex flex-wrap gap-1.5">
        {roles.map(([r, c]) => (
          <span key={r} className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
            <span className={`h-2 w-2 rounded-full ${c}`} /> {r}
          </span>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-white p-3 ring-1 ring-slate-200">
        <div className="flex items-center justify-between text-[11px]">
          <p className="font-semibold text-slate-900">Payslip · September</p>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Paid</span>
        </div>
        <div className="mt-2 space-y-1 text-[11px] text-slate-600">
          <p className="flex justify-between">
            <span>Salary</span>
            <span>$1,800</span>
          </p>
          <p className="flex justify-between">
            <span>PT commission · 17 sessions</span>
            <span>$340</span>
          </p>
          <p className="flex justify-between text-rose-600">
            <span>Unpaid day off</span>
            <span>−$82</span>
          </p>
          <p className="flex justify-between border-t border-slate-100 pt-1 font-semibold text-slate-900">
            <span>Take home</span>
            <span>$2,058</span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

function MembersPicture() {
  return (
    <Frame>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-sm font-bold text-white">SM</span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">Sara Malik</p>
          <p className="truncate text-[11px] text-slate-500">Unlimited monthly · member since Mar 2025</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
        {[
          ["Health form", "Done", "text-emerald-600"],
          ["Agreement", "Signed", "text-emerald-600"],
          ["Emergency contact", "Added", "text-emerald-600"],
          ["ID document", "Missing", "text-amber-600"],
        ].map(([l, v, c]) => (
          <div key={l} className="flex items-center justify-between rounded-md bg-white px-2.5 py-1.5 ring-1 ring-slate-200">
            <span className="text-slate-600">{l}</span>
            <span className={`font-semibold ${c}`}>{v}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-slate-500">
        Imported <span className="font-semibold text-slate-800">312 members</span> from members.csv
      </p>
    </Frame>
  );
}

function LeadsPicture() {
  const leads = [
    ["Daniel K.", "Asked about PT", "New", "bg-brand-50 text-brand-700"],
    ["Priya R.", "Free trial booked", "Trial", "bg-amber-50 text-amber-700"],
    ["Omar A.", "Joined · Unlimited", "Member", "bg-emerald-50 text-emerald-700"],
  ];
  return (
    <Frame>
      <ul className="space-y-1.5">
        {leads.map(([n, s, st, c]) => (
          <li key={n} className="flex items-center gap-2.5 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">{n[0]}</span>
            <div className="min-w-0 flex-1 text-[11px]">
              <p className="font-semibold text-slate-900">{n}</p>
              <p className="truncate text-slate-500">{s}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${c}`}>{st}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
        <FiUserPlus className="h-3.5 w-3.5 text-orange-500" /> From your website&apos;s contact form
      </p>
    </Frame>
  );
}

function ReportsPicture() {
  const points = [12, 18, 15, 22, 26, 24, 31, 29, 36, 34, 41, 45];
  const max = Math.max(...points);
  const d = points.map((p, i) => `${(i / (points.length - 1)) * 100},${40 - (p / max) * 36}`).join(" ");
  return (
    <Frame>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">This month</p>
          <p className="font-display text-xl font-bold text-slate-900">$38,420</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
          <FiTrendingUp className="h-3 w-3" /> +4.2%
        </span>
      </div>
      <svg viewBox="0 0 100 42" className="mt-2 h-16 w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,42 ${d} 100,42`} fill="url(#spark)" />
        <polyline points={d} fill="none" stroke="#4f46e5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[10px]">
        {[
          ["Members", "1,248"],
          ["Came in", "92%"],
          ["New leads", "37"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-md bg-white py-1.5 ring-1 ring-slate-200">
            <p className="font-semibold text-slate-900">{v}</p>
            <p className="text-slate-500">{l}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function WebsitePicture() {
  return (
    <Frame className="flex h-full flex-col justify-center">
      <div className="overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-slate-200">
        <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="ml-2 flex-1 rounded bg-white px-2 py-0.5 text-[10px] text-slate-500 ring-1 ring-slate-200">
            <span className="text-emerald-500">🔒</span> ironworks.fit
          </span>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-display font-bold text-slate-900">IRON WORKS</span>
            <span className="rounded-full bg-orange-500 px-2 py-0.5 font-semibold text-white">Join</span>
          </div>
          <div className="mt-2 rounded-md bg-gradient-to-br from-slate-900 to-orange-900 p-3 text-white">
            <p className="font-display text-xs font-bold">Train with coaches who know your name</p>
            <p className="mt-1 text-[9px] text-orange-200">Classes · trainers · prices · blog · map</p>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {["bg-orange-400", "bg-emerald-400", "bg-slate-700"].map((c) => (
              <div key={c} className={`h-6 rounded ${c}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] font-semibold">
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-slate-700 ring-1 ring-slate-200">
          <FiSmartphone className="h-3 w-3" /> Installs as an app
        </span>
        <span className="rounded-full bg-white px-2 py-0.5 text-slate-700 ring-1 ring-slate-200">Padlock (SSL) automatic</span>
        <span className="rounded-full bg-white px-2 py-0.5 text-slate-700 ring-1 ring-slate-200">Found on Google</span>
      </div>
    </Frame>
  );
}

function DataPicture() {
  return (
    <Frame>
      <div className="flex items-center gap-3 rounded-lg bg-slate-950 px-3 py-2.5 text-white">
        <FiDatabase className="h-5 w-5 text-brand-300" />
        <div className="min-w-0 text-[11px]">
          <p className="font-semibold">ironworks · private database</p>
          <p className="text-slate-400">Only your gym. Nobody else&apos;s data inside.</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["English", "العربية", "اردو", "Español", "Français"].map((l) => (
          <span key={l} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
            {l}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-slate-500">Download everything as a spreadsheet whenever you like.</p>
    </Frame>
  );
}

const PICTURES: Record<string, React.ComponentType> = {
  billing: BillingPicture,
  booking: BookingPicture,
  pt: PtPicture,
  frontdesk: FrontDeskPicture,
  messaging: MessagingPicture,
  pos: PosPicture,
  staff: StaffPicture,
  members: MembersPicture,
  leads: LeadsPicture,
  reports: ReportsPicture,
  website: WebsitePicture,
  data: DataPicture,
};

/* -------------------------------- section -------------------------------- */

export default function Features() {
  return (
    <section id="features" className="relative bg-slate-50 py-24 sm:py-28">
      <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={FEATURES_INTRO.eyebrow} title={FEATURES_INTRO.title} text={FEATURES_INTRO.text} />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.key] || FiZap;
            const Picture = PICTURES[f.key];
            const layout = LAYOUT[f.key] || { span: "lg:col-span-2" };
            const text = (
              <div className={layout.wide ? "flex flex-col justify-center" : ""}>
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset ${ICON_TINT[f.key]}`}>
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
            return (
              <Reveal key={f.key} delay={(i % 3) * 80} className={layout.span} as="article">
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                  {layout.wide ? (
                    <div className="grid h-full gap-6 lg:grid-cols-[1fr_1.1fr]">
                      {text}
                      {Picture && <Picture />}
                    </div>
                  ) : (
                    <div className="flex h-full flex-col gap-5">
                      {Picture && <Picture />}
                      {text}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
