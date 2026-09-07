"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiAlertCircle, FiArrowRight, FiClock, FiGrid, FiPlus, FiTrendingUp } from "react-icons/fi";
import { PageHeader, Panel, StatCard, SegmentBar, Spinner, Alert, Button, Pill, Avatar } from "./_shared/ui";
import { platformFetch, formatMoney, formatDate, type Overview } from "./_shared/api";
import GymsTable from "./gyms/GymsTable";

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export default function SuperAdminOverviewPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    platformFetch<{ data: Overview }>("/overview")
      .then((res) => setOverview(res.data))
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load overview"));
  }, []);

  if (error) return <Alert tone="error">{error}</Alert>;
  if (!overview) return <Spinner />;

  const subs = overview.subscriptions;
  const attention = overview.attention || { renewing: [], past_due: [], suspended: [] };
  const attentionCount = attention.renewing.length + attention.past_due.length + attention.suspended.length;
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

  return (
    <>
      <PageHeader
        eyebrow={today}
        title={`${greeting()}`}
        description="Every gym on the platform, how they are paying, and what needs a look."
        actions={
          <Button href="/super-admin/gyms/new">
            <FiPlus className="h-4 w-4" /> New gym
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Gyms" value={overview.gyms.total} hint={`${overview.gyms.active} active · ${overview.gyms.suspended} suspended`} icon={<FiGrid className="h-4.5 w-4.5" />} tone="accent" />
        <StatCard label="Renewing within 30 days" value={overview.expiring_within_30_days} hint={`${subs.trialing || 0} on trial`} icon={<FiClock className="h-4.5 w-4.5" />} tone="warn" />
        <StatCard label="Need attention" value={attentionCount} hint={`${subs.past_due || 0} past due · ${subs.expired || 0} expired · ${overview.gyms.suspended} suspended`} icon={<FiAlertCircle className="h-4.5 w-4.5" />} tone={attentionCount ? "bad" : "good"} />
        <StatCard
          label="Monthly recurring"
          value={overview.mrr.length ? overview.mrr.map((row) => formatMoney(row.amount, row.currency)).join(" · ") : formatMoney(0, "USD")}
          hint="Active subscriptions; yearly plans divided by 12"
          icon={<FiTrendingUp className="h-4.5 w-4.5" />}
          tone="good"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Panel title="Subscription mix" description="Where every gym sits in its billing life." className="lg:col-span-2">
          <SegmentBar
            segments={[
              { label: "Active", value: subs.active || 0, className: "bg-emerald-500" },
              { label: "Trialing", value: subs.trialing || 0, className: "bg-sky-500" },
              { label: "Past due", value: subs.past_due || 0, className: "bg-amber-500" },
              { label: "Expired", value: subs.expired || 0, className: "bg-rose-500" },
              { label: "Cancelled", value: subs.cancelled || 0, className: "bg-slate-400" },
            ]}
          />
        </Panel>

        <Panel
          title="Needs attention"
          description="Renewals due soon, payments overdue, gyms switched off."
          className="lg:col-span-3"
          actions={
            <Link href="/super-admin/gyms" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500">
              All gyms <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
          padded={false}
        >
          {attentionCount === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-slate-500">Nothing needs a look right now.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {attention.past_due.map((g) => (
                <AttentionRow key={`pd-${g.id}`} gym={g} tone="past_due" label="Past due" detail={g.currentPeriodEnd ? `period ended ${formatDate(g.currentPeriodEnd)}` : "no period end"} />
              ))}
              {attention.renewing.map((g) => (
                <AttentionRow key={`rn-${g.id}`} gym={g} tone="warn" label="Renews" detail={g.currentPeriodEnd ? formatDate(g.currentPeriodEnd) : ""} />
              ))}
              {attention.suspended.map((g) => (
                <AttentionRow key={`su-${g.id}`} gym={g} tone="suspended" label="Suspended" detail="not being served" />
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="mt-8">
        <GymsTable title="Gyms" compact />
      </div>
    </>
  );
}

function AttentionRow({ gym, tone, label, detail }: { gym: { id: string; name: string; slug: string; plan?: string | null }; tone: string; label: string; detail: string }) {
  return (
    <li>
      <Link href={`/super-admin/gyms/${gym.id}`} className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-slate-50">
        <Avatar name={gym.name} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-slate-900">{gym.name}</span>
          <span className="block truncate text-xs text-slate-500">
            {gym.slug}
            {gym.plan ? ` · ${gym.plan}` : ""}
          </span>
        </span>
        <span className="text-right">
          <Pill tone={tone}>{label}</Pill>
          {detail && <span className="mt-1 block text-[11px] text-slate-500">{detail}</span>}
        </span>
      </Link>
    </li>
  );
}
