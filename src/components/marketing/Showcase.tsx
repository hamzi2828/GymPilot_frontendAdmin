import { FiBell, FiCalendar, FiCheck, FiCheckCircle, FiClock, FiCreditCard, FiFileText, FiGlobe, FiMapPin, FiRefreshCw, FiStar } from "react-icons/fi";
import { SHOWCASES } from "@/content/site";
import { stagger } from "@/lib/motion";
import Reveal from "./Reveal";

function WebsiteVisual() {
  return (
    <div className="relative">
      <div className="v-rise overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift" style={stagger(0)}>
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="ml-3 flex flex-1 items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] text-slate-500 ring-1 ring-slate-200">
            <FiGlobe className="h-3 w-3 text-emerald-500" /> ironworks.fit
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-display text-sm font-bold text-slate-900">IRON WORKS</span>
            <div className="flex gap-3 text-slate-500">
              <span>Classes</span>
              <span>Trainers</span>
              <span>Memberships</span>
              <span className="v-pop rounded-full bg-orange-500 px-2 py-0.5 font-semibold text-white" style={stagger(6)}>
                Join
              </span>
            </div>
          </div>
          <div className="v-rise mt-3 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 p-5 text-white" style={stagger(2)}>
            <p className="text-[10px] uppercase tracking-wider text-orange-300">Strength · conditioning · community</p>
            <p className="mt-1 font-display text-xl font-bold leading-tight">Train with coaches who know your name</p>
            <p className="mt-2 inline-block rounded-full bg-orange-500 px-3 py-1 text-[11px] font-semibold">Start your 7-day trial</p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["HIIT Blast", "Reformer Pilates", "Boxing"].map((c, i) => (
              <div key={c} className="v-pop rounded-lg border border-slate-100 bg-slate-50 p-2.5" style={stagger(3 + i)}>
                <div className={`h-10 rounded-md bg-gradient-to-br ${["from-orange-400 to-rose-400", "from-emerald-400 to-teal-500", "from-slate-700 to-slate-900"][i]}`} />
                <p className="mt-2 text-[11px] font-semibold text-slate-800">{c}</p>
                <p className="text-[10px] text-slate-500">Mon · Wed · Fri</p>
              </div>
            ))}
          </div>
          <div className="v-rise mt-3 flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-[11px] text-slate-600" style={stagger(6)}>
            <span className="flex items-center gap-1.5">
              <FiMapPin className="h-3.5 w-3.5 text-orange-500" /> 12 Foundry Lane · Open 06:00 – 22:00
            </span>
            <span className="flex items-center gap-1 text-amber-500">
              {[0, 1, 2, 3, 4].map((i) => (
                <FiStar key={i} className="v-pop h-3 w-3 fill-current" style={stagger(7 + i)} />
              ))}
            </span>
          </div>
        </div>
      </div>
      <div className="v-pop absolute -bottom-6 -right-4 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-lift sm:block" style={stagger(10)}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Google result</p>
        <p className="mt-1 text-xs font-semibold text-brand-700">Iron Works Fitness — Gym, Classes &amp; Personal Training</p>
        <p className="text-[11px] text-slate-500">ironworks.fit · LocalBusiness · Open now</p>
      </div>
    </div>
  );
}

function BillingVisual() {
  const rows = [
    { who: "Sara M.", plan: "Unlimited monthly", amount: "$59.00", status: "Paid", tone: "text-emerald-600 bg-emerald-50", icon: FiCreditCard },
    { who: "Daniel K.", plan: "10-class pack", amount: "$120.00", status: "Bank transfer · receipt", tone: "text-sky-700 bg-sky-50", icon: FiFileText },
    { who: "Priya R.", plan: "Annual", amount: "$540.00", status: "Renews in 3 days", tone: "text-amber-700 bg-amber-50", icon: FiRefreshCw },
    { who: "Omar A.", plan: "Student monthly", amount: "$35.00", status: "Retry scheduled", tone: "text-rose-700 bg-rose-50", icon: FiClock },
  ];
  return (
    <div className="relative">
      <div className="v-rise overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift" style={stagger(0)}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <p className="text-sm font-semibold text-slate-900">Payments · this week</p>
          <span className="v-pop rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700" style={stagger(7)}>
            $9,410 collected
          </span>
        </div>
        <ul className="divide-y divide-slate-100">
          {rows.map((r, i) => (
            <li key={r.who} className="v-rise flex items-center gap-3 px-5 py-3" style={stagger(2 + i)}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${r.tone}`}>
                <r.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{r.who}</p>
                <p className="truncate text-xs text-slate-500">{r.plan}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{r.amount}</p>
                <p className={`text-[11px] font-medium ${r.tone.split(" ")[0]}`}>{r.status}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-500">Invoices emailed automatically · Stripe payouts to the gym&apos;s own account</div>
      </div>
      <div className="absolute -left-4 -top-5 hidden animate-float rounded-xl border border-slate-200 bg-white p-3 shadow-lift sm:block">
        <div className="v-pop flex items-center gap-2.5" style={stagger(8)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <FiCheckCircle className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-slate-900">Renewal reminder sent</p>
            <p className="text-[11px] text-slate-500">Email + WhatsApp · 3 days before</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MembersVisual() {
  return (
    <div className="relative flex justify-center">
      <div className="v-rise w-[280px] overflow-hidden rounded-[2.2rem] border-[6px] border-slate-900 bg-slate-950 shadow-lift" style={stagger(0)}>
        <div className="bg-slate-950 px-5 pb-5 pt-8 text-white">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Iron Works · member</p>
          <p className="font-display text-lg font-bold">Hi Sara 👋</p>
          <div className="v-rise mt-4 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 p-4" style={stagger(2)}>
            <p className="text-[10px] uppercase tracking-wider text-white/70">Next class</p>
            <p className="mt-1 font-display text-base font-semibold">HIIT Blast · Today 18:00</p>
            <p className="text-[11px] text-white/80">Studio A · Coach Marcus · 2 spots left</p>
            <span className="v-pop mt-3 inline-block rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-900" style={stagger(5)}>
              Check in with QR
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              ["8", "credits"],
              ["14", "visits · Sep"],
              ["Nov 4", "renews"],
            ].map(([v, l], i) => (
              <div key={l} className="v-pop rounded-xl bg-white/[0.05] p-2.5" style={stagger(3 + i)}>
                <p className="font-display text-base font-semibold">{v}</p>
                <p className="text-[10px] text-slate-400">{l}</p>
              </div>
            ))}
          </div>
          <ul className="mt-3 space-y-1.5">
            {[
              [FiCalendar, "Book a class", "Timetable & waitlists"],
              [FiCreditCard, "Receipts & invoices", "Download as PDF"],
              [FiBell, "Notifications", "Push, WhatsApp, SMS"],
            ].map(([Icon, t, s], i) => {
              const I = Icon as React.ComponentType<{ className?: string }>;
              return (
                <li key={t as string} className="v-rise flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2" style={stagger(6 + i)}>
                  <I className="h-4 w-4 text-brand-300" />
                  <div>
                    <p className="text-xs font-medium">{t as string}</p>
                    <p className="text-[10px] text-slate-500">{s as string}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="absolute -right-2 top-16 hidden animate-float-slow rounded-xl border border-slate-200 bg-white p-3 shadow-lift md:block lg:right-6">
        <div className="v-pop" style={stagger(9)}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Push notification</p>
          <p className="mt-1 text-xs font-semibold text-slate-900">You&apos;re off the waitlist 🎉</p>
          <p className="text-[11px] text-slate-500">HIIT Blast · today 18:00 · see you there</p>
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<string, React.ComponentType> = { website: WebsiteVisual, billing: BillingVisual, members: MembersVisual };

export default function Showcase() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl space-y-24 px-5 sm:px-8 lg:space-y-32">
        {SHOWCASES.map((s, i) => {
          const Visual = VISUALS[s.visual];
          const flip = i % 2 === 1;
          return (
            <div key={s.title} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className={flip ? "lg:order-2" : ""}>
                <p className="v-rise text-xs font-semibold uppercase tracking-[0.18em] text-brand-600" style={stagger(0)}>
                  {s.eyebrow}
                </p>
                <h3 className="v-rise mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-slate-900 sm:text-4xl" style={stagger(1)}>
                  {s.title}
                </h3>
                <p className="v-rise mt-4 text-base leading-relaxed text-slate-600 sm:text-lg" style={stagger(2)}>
                  {s.text}
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.points.map((p, j) => (
                    <li key={p} className="v-rise flex items-start gap-2.5 text-sm text-slate-700" style={stagger(3 + j)}>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <FiCheck className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120} className={flip ? "lg:order-1" : ""}>
                <Visual />
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
