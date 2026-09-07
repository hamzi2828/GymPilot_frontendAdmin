// The product, drawn in markup: a gym's admin dashboard in a browser frame
// with a few live-looking events floating around it. No screenshots to go
// stale, and it renders crisp at any size. Everything inside animates in on
// page load, staggered, so the dashboard looks like it is waking up.

import { FiActivity, FiBarChart2, FiCalendar, FiCheckCircle, FiCreditCard, FiGrid, FiMessageSquare, FiSettings, FiUsers, FiUserPlus } from "react-icons/fi";
import { stagger } from "@/lib/motion";

const BARS = [42, 58, 51, 66, 72, 64, 80, 74, 88, 83, 92, 97];
const CLASSES = [
  { name: "HIIT Blast", time: "06:30", booked: 18, cap: 20, room: "Studio A" },
  { name: "Reformer Pilates", time: "09:00", booked: 10, cap: 12, room: "Studio B" },
  { name: "Boxing Fundamentals", time: "18:00", booked: 24, cap: 24, room: "Main floor" },
];
const CHECKINS = ["AR", "MK", "SJ", "DL", "PT", "+9"];

function Stat({ label, value, delta, index, up = true }: { label: string; value: string; delta: string; index: number; up?: boolean }) {
  return (
    <div className="a-pop rounded-xl border border-white/[0.06] bg-white/[0.03] p-3" style={stagger(index)}>
      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-white">{value}</p>
      <p className={`mt-0.5 text-[10px] font-semibold ${up ? "text-emerald-400" : "text-rose-400"}`}>{delta}</p>
    </div>
  );
}

function Event({ icon, tint, title, text, className, style, index }: { icon: React.ReactNode; tint: string; title: string; text: string; className: string; style?: React.CSSProperties; index: number }) {
  return (
    <div className={`absolute hidden rounded-xl border border-white/10 bg-slate-900/95 p-3 shadow-lift ring-1 ring-white/5 md:block ${className}`} style={style}>
      <div className="a-pop flex items-center gap-2.5" style={stagger(index)}>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tint}`}>{icon}</span>
        <div>
          <p className="text-xs font-semibold text-white">{title}</p>
          <p className="text-[11px] text-slate-400">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProductMock() {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* glow */}
      <div className="absolute -inset-16 -z-10 rounded-[3rem]" style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.35), rgba(168,85,247,0.15) 60%, transparent 100%)" }} aria-hidden="true" />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-lift ring-1 ring-white/5">
        {/* browser bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-slate-950/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 flex-1 rounded-md bg-white/[0.05] px-3 py-1 text-[11px] text-slate-400">
            <span className="text-emerald-400">https://</span>ironworks.fit/admin
          </span>
        </div>

        <div className="flex">
          {/* sidebar */}
          <aside className="hidden w-12 flex-col items-center gap-1 border-r border-white/[0.06] bg-slate-950/40 py-3 sm:flex">
            {[FiGrid, FiUsers, FiCalendar, FiCreditCard, FiMessageSquare, FiBarChart2, FiSettings].map((Icon, i) => (
              <span key={i} className={`a-pop flex h-8 w-8 items-center justify-center rounded-lg ${i === 0 ? "bg-brand-500/20 text-brand-300" : "text-slate-500"}`} style={stagger(i, 200)}>
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </aside>

          <div className="flex-1 p-4">
            <div className="a-rise flex items-center justify-between" style={stagger(2)}>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Iron Works Fitness</p>
                <p className="font-display text-sm font-semibold text-white">Good morning, Aisha</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                <span className="a-blink mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                312 in today
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat label="Active members" value="1,248" delta="+4.2% this month" index={3} />
              <Stat label="MRR" value="$38,420" delta="+$1,960" index={4} />
              <Stat label="Bookings today" value="186" delta="94% capacity" index={5} />
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-5">
              {/* chart */}
              <div className="a-rise rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 sm:col-span-3" style={stagger(6)}>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Revenue · 12 months</p>
                  <FiActivity className="h-3.5 w-3.5 text-brand-300" />
                </div>
                <div className="mt-3 flex h-24 items-end gap-1.5">
                  {BARS.map((h, i) => (
                    <div key={i} className="flex-1 origin-bottom animate-grow rounded-sm bg-gradient-to-t from-brand-600 to-purple-400" style={{ height: `${h}%`, animationDelay: `${700 + i * 60}ms` }} />
                  ))}
                </div>
              </div>
              {/* check-ins */}
              <div className="a-rise rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 sm:col-span-2" style={stagger(7)}>
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Checked in now</p>
                <div className="mt-3 flex -space-x-2">
                  {CHECKINS.map((c, i) => (
                    <span key={c} className={`a-pop flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold ring-2 ring-slate-900 ${i === CHECKINS.length - 1 ? "bg-slate-700 text-slate-200" : "bg-gradient-to-br from-brand-400 to-purple-500 text-white"}`} style={stagger(i, 900)}>
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-slate-400">
                  Peak <span className="font-semibold text-white">18:00 – 20:00</span>
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="a-fill h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-400 to-brand-400" style={stagger(0, 1200)} />
                </div>
              </div>
            </div>

            {/* classes */}
            <div className="a-rise mt-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3" style={stagger(8)}>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Today&apos;s classes</p>
              <ul className="mt-2 space-y-1.5">
                {CLASSES.map((c, i) => (
                  <li key={c.name} className="a-rise flex items-center gap-3 text-[11px]" style={stagger(i, 900)}>
                    <span className="w-10 font-mono text-slate-400">{c.time}</span>
                    <span className="flex-1 truncate font-medium text-slate-200">
                      {c.name} <span className="text-slate-500">· {c.room}</span>
                    </span>
                    <span className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-white/10 sm:block">
                      <span className={`a-fill block h-full rounded-full ${c.booked >= c.cap ? "bg-amber-400" : "bg-brand-400"}`} style={{ width: `${(c.booked / c.cap) * 100}%`, ...stagger(i, 1300) }} />
                    </span>
                    <span className={`w-12 text-right font-semibold ${c.booked >= c.cap ? "text-amber-300" : "text-slate-300"}`}>
                      {c.booked}/{c.cap}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* floating events: appear one after another, then float */}
      <Event index={0} className="-right-3 top-10 animate-float lg:-right-10" style={{ animationDelay: "0.6s" }} tint="bg-emerald-500/15 text-emerald-300" icon={<FiCheckCircle className="h-4 w-4" />} title="Payment received" text="Sara M. · Unlimited monthly · $59" />
      <Event index={0} className="-left-3 bottom-16 animate-float-slow lg:-left-12" tint="bg-brand-500/15 text-brand-300" icon={<FiUserPlus className="h-4 w-4" />} title="New member from the website" text="Signed the waiver · booked HIIT Blast" />
      <Event index={0} className="-bottom-5 right-8 animate-float" style={{ animationDelay: "1.4s" }} tint="bg-fuchsia-500/15 text-fuchsia-300" icon={<FiMessageSquare className="h-4 w-4" />} title="WhatsApp reminder sent" text="Boxing Fundamentals · 24 members" />
    </div>
  );
}
