"use client";

// One gym: what it is, what it is on, whether it is being served, and the
// numbers from inside its own database.

import { Suspense, useCallback, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FiAlertTriangle, FiCalendar, FiCreditCard, FiExternalLink, FiGlobe, FiLayers, FiMail, FiShield, FiUsers } from "react-icons/fi";
import { PageHeader, Crumbs, Panel, StatCard, KeyValue, Button, Field, Input, Select, Textarea, Modal, Spinner, Alert, Pill, StatusPill, Avatar } from "../../_shared/ui";
import { platformFetch, formatDate, formatMoney, SUBSCRIPTION_STATUSES, BILLING_CYCLES, type Addon, type DomainStatus, type Gym, type GymStats, type Plan } from "../../_shared/api";

type Detail = Gym & { plan: Plan | null; stats: GymStats };
type Admin = { id: string; name: string; email: string; is_active: boolean; last_login: string | null };
type Hosting = {
  connected: boolean;
  added: { host: string; added: boolean; verified?: boolean; error?: string; skipped?: string; verification?: { type: string; domain: string; value: string }[]; dns: { type: string; name: string; value: string; note: string } }[];
};
type InviteResult = { data: { created: boolean; email: string; passwordSet: boolean; inviteSent: boolean }; warnings?: string[] };

/** A plan's price for a cycle, as the amount field shows it. */
function planPrice(plan: Plan | undefined, cycle: string): string {
  if (!plan) return "";
  return String(cycle === "yearly" ? plan.price.yearly : plan.price.monthly);
}

function GymDetail() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const id = params.id;
  // Set by the New gym form right after creating this gym: did the owner's
  // invite go, and what else did not go to plan.
  const inviteParam = search.get("invite");
  const creationWarnings = search.getAll("warning");

  const [gym, setGym] = useState<Detail | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [admins, setAdmins] = useState<Admin[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  // What the website host said when domains were saved: added to Vercel,
  // or the DNS record the owner has to create.
  const [hosting, setHosting] = useState<Hosting | null>(null);
  // Where each registered domain stands on the website host right now.
  const [domainStatus, setDomainStatus] = useState<{ connected: boolean; data: DomainStatus[] } | null>(null);
  const [busy, setBusy] = useState(false);

  // Editors
  const [details, setDetails] = useState({ name: "", ownerFirstName: "", ownerLastName: "", ownerEmail: "", ownerPhone: "", timezone: "", currency: "", country: "", notes: "" });
  const [domainsText, setDomainsText] = useState("");
  const [sub, setSub] = useState({ planId: "", status: "trialing", billingCycle: "monthly", amount: "", currency: "", currentPeriodEnd: "", notes: "" });
  const [addons, setAddons] = useState<Addon[]>([]);
  const [addonSlugs, setAddonSlugs] = useState<string[]>([]);
  const [resetOpen, setResetOpen] = useState(false);
  const [reset, setReset] = useState({ email: "", password: "" });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmSlug, setConfirmSlug] = useState("");
  const [dropDatabase, setDropDatabase] = useState(false);

  const hydrate = useCallback((g: Detail) => {
    setGym(g);
    setDetails({
      name: g.name,
      ownerFirstName: g.owner.firstName || "",
      ownerLastName: g.owner.lastName || "",
      ownerEmail: g.owner.email || "",
      ownerPhone: g.owner.phone || "",
      timezone: g.locale.timezone || "UTC",
      currency: g.locale.currency || "USD",
      country: g.locale.country || "",
      notes: g.notes || "",
    });
    setDomainsText(g.domains.map((d) => d.host).join("\n"));
    setSub({
      planId: g.plan ? g.plan.id || g.plan._id || "" : "",
      status: g.subscription.status,
      billingCycle: g.subscription.billingCycle,
      amount: String(g.subscription.planAmount ?? g.subscription.amount ?? ""),
      currency: g.subscription.currency || "USD",
      currentPeriodEnd: g.subscription.currentPeriodEnd ? String(g.subscription.currentPeriodEnd).slice(0, 10) : "",
      notes: g.subscription.notes || "",
    });
    setAddonSlugs((g.subscription.addons || []).map((a) => a.slug));
    setReset((r) => ({ ...r, email: g.owner.email || "" }));
  }, []);

  const load = useCallback(async () => {
    try {
      const [detail, planList, addonList] = await Promise.all([
        platformFetch<{ data: Detail }>(`/gyms/${id}`),
        platformFetch<{ data: Plan[] }>("/plans"),
        platformFetch<{ data: Addon[] }>("/addons"),
      ]);
      hydrate(detail.data);
      setPlans(planList.data);
      setAddons(addonList.data);
      setError(null);
      // Best effort: the page is complete without it.
      platformFetch<{ connected: boolean; data: DomainStatus[] }>(`/gyms/${id}/domains/status`)
        .then((res) => setDomainStatus({ connected: res.connected, data: res.data }))
        .catch(() => setDomainStatus(null));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load this gym");
    }
  }, [id, hydrate]);

  useEffect(() => {
    load();
  }, [load]);

  // What this plan comes with for nothing, and what can be sold on top of it
  // -- in the plan's currency only; the API refuses the rest.
  const chosenPlan = plans.find((p) => p.id === sub.planId);
  const includedSlugs = chosenPlan?.includedAddons || [];
  const includedAddons = addons.filter((addon) => addon.isActive && includedSlugs.includes(addon.slug));
  const sellableAddons = addons.filter(
    (addon) =>
      addon.isActive &&
      !includedSlugs.includes(addon.slug) &&
      (!addon.planSlugs.length || addon.planSlugs.includes(chosenPlan?.slug || "")) &&
      (!chosenPlan || addon.price.currency === chosenPlan.price.currency)
  );

  // Picking a plan (or a cycle) resets the amount to that plan's price for
  // the cycle, so a price typed for the old plan is never sent for the new.
  const choosePlan = (planId: string) =>
    setSub((x) => {
      const plan = plans.find((p) => p.id === planId);
      return { ...x, planId, amount: planPrice(plan, x.billingCycle), currency: plan ? plan.price.currency : x.currency };
    });
  const chooseCycle = (billingCycle: string) =>
    setSub((x) => {
      const plan = plans.find((p) => p.id === x.planId);
      return { ...x, billingCycle, amount: plan ? planPrice(plan, billingCycle) : x.amount };
    });

  // "Resend owner invite": a set-password link, nothing about the password
  // itself changes. The answer says whether the email went.
  const sendInvite = async (email: string, password?: string) => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await platformFetch<InviteResult>(`/gyms/${id}/reset-owner-password`, { method: "POST", body: password ? { email, password } : { email } });
      if (res.data.inviteSent) {
        setNotice(`${password ? "Password set. " : ""}A set-password link was emailed to ${res.data.email}.`);
      } else {
        setError(`${password ? "Password set, but the" : "The"} email to ${res.data.email} could not be sent${res.warnings?.length ? ` (${res.warnings[0]})` : ""}. Check the API's SMTP settings and try again.`);
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  };
  const chosenAddons = sellableAddons.filter((addon) => addonSlugs.includes(addon.slug));
  const priceOf = (addon: Addon) => (sub.billingCycle === "yearly" ? addon.price.yearly : addon.price.monthly);
  const planShare = Number(sub.amount) || 0;
  const billTotal = chosenAddons.reduce((total, addon) => total + priceOf(addon), planShare);

  useEffect(() => {
    platformFetch<{ data: Admin[] }>(`/gyms/${id}/admins`)
      .then((res) => setAdmins(res.data))
      .catch(() => setAdmins([]));
  }, [id, gym?.updatedAt]);

  const run = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await fn();
      await load();
      setNotice(label);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  };

  if (error && !gym) return <Alert tone="error">{error}</Alert>;
  if (!gym) return <Spinner />;

  const stats = gym.stats || {};
  // Primary domain, else the platform subdomain, else the API's fallback --
  // computed by the API so it matches the links in the gym's emails.
  const siteUrl = gym.siteUrl || (gym.domains[0]?.host ? `https://${gym.domains[0].host}` : "");
  const siteHost = siteUrl.replace(/^https?:\/\//, "");
  const d = (key: keyof typeof details) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails((x) => ({ ...x, [key]: e.target.value }));
  const s = (key: keyof typeof sub) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setSub((x) => ({ ...x, [key]: e.target.value }));

  return (
    <>
      <PageHeader
        eyebrow={<Crumbs items={[{ label: "Gyms", href: "/super-admin/gyms" }, { label: gym.name }]} />}
        title={
          <span className="flex flex-wrap items-center gap-3">
            <Avatar name={gym.name} size="lg" />
            {gym.name}
            <StatusPill status={gym.subscription.status} />
            {gym.status === "suspended" && <Pill tone="suspended">suspended</Pill>}
          </span>
        }
        description={
          <span className="font-mono text-xs">
            {gym.slug} · {gym.database.name}
          </span>
        }
        actions={
          <>
            {siteUrl && (
              <Button variant="secondary" href={siteUrl}>
                <FiExternalLink className="h-4 w-4" /> Open website
              </Button>
            )}
            {gym.status === "suspended" ? (
              <Button disabled={busy} onClick={() => run("Gym reactivated", () => platformFetch(`/gyms/${id}/status`, { method: "PATCH", body: { status: "active" } }))}>
                Reactivate
              </Button>
            ) : (
              <Button variant="danger" disabled={busy} onClick={() => run("Gym suspended", () => platformFetch(`/gyms/${id}/status`, { method: "PATCH", body: { status: "suspended" } }))}>
                Suspend
              </Button>
            )}
          </>
        }
      />

      {gym.access_block && (
        <Alert tone="warning">
          <span className="flex items-center gap-2">
            <FiAlertTriangle className="h-4 w-4" /> Not being served: {gym.access_block.message}
          </span>
        </Alert>
      )}
      {inviteParam === "sent" && (
        <Alert tone="success">
          <span className="flex items-center gap-2">
            <FiMail className="h-4 w-4" /> The owner has been emailed a link to set their password at <span className="font-mono">{siteHost}/authentication</span>.
          </span>
        </Alert>
      )}
      {inviteParam === "failed" && (
        <Alert tone="warning">
          <span className="flex items-center gap-2">
            <FiAlertTriangle className="h-4 w-4" /> The owner&apos;s invite email could not be sent. Check the API&apos;s SMTP settings, then use &quot;Resend owner invite&quot; below.
          </span>
        </Alert>
      )}
      {creationWarnings
        .filter((w) => w !== "Owner email could not be sent")
        .map((w) => (
          <Alert key={w} tone="warning">
            {w}
          </Alert>
        ))}
      {error && <Alert tone="error" onDismiss={() => setError(null)}>{error}</Alert>}
      {notice && <Alert tone="success" onDismiss={() => setNotice(null)}>{notice}</Alert>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard label="Members" value={stats.error ? "—" : stats.members ?? "—"} tone="accent" icon={<FiUsers className="h-4 w-4" />} />
        <StatCard label="Active memberships" value={stats.error ? "—" : stats.active_memberships ?? "—"} tone="good" icon={<FiCreditCard className="h-4 w-4" />} />
        <StatCard label="Staff" value={stats.error ? "—" : stats.staff ?? "—"} />
        <StatCard label="Trainers" value={stats.error ? "—" : stats.trainers ?? "—"} />
        <StatCard label="Classes" value={stats.error ? "—" : stats.classes ?? "—"} icon={<FiCalendar className="h-4 w-4" />} />
        <StatCard label="Revenue this month" value={stats.revenue_this_month && stats.revenue_this_month.length ? stats.revenue_this_month.map((r) => formatMoney(r.total, r.currency)).join(" · ") : "—"} hint={stats.pending_orders ? `${stats.pending_orders} pending orders` : undefined} />
      </div>
      {stats.error && <p className="mt-2 text-xs text-rose-600">Could not read the gym&apos;s database: {stats.error}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Identity */}
        <Panel
          title="Gym & owner"
          footer={
            <>
              <span className="text-xs text-slate-500">Created {formatDate(gym.createdAt)} · last login inside the gym {formatDate(stats.last_login_at)}</span>
              <Button
                disabled={busy}
                onClick={() =>
                  run("Details saved", () =>
                    platformFetch(`/gyms/${id}`, {
                      method: "PUT",
                      body: {
                        name: details.name,
                        owner: { firstName: details.ownerFirstName, lastName: details.ownerLastName, email: details.ownerEmail, phone: details.ownerPhone },
                        locale: { timezone: details.timezone, currency: details.currency, country: details.country },
                        notes: details.notes,
                      },
                    })
                  )
                }
              >
                Save details
              </Button>
            </>
          }
        >
          <KeyValue
            items={[
              { label: "Slug", value: <span className="font-mono">{gym.slug}</span> },
              { label: "Database", value: <span className="font-mono">{gym.database.name}</span> },
              { label: "Provisioned", value: formatDate(gym.provisionedAt) },
              { label: "Last visit", value: formatDate(stats.last_visit_at) },
            ]}
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Gym name">
              <Input value={details.name} onChange={d("name")} />
            </Field>
            <Field label="Owner email">
              <Input type="email" value={details.ownerEmail} onChange={d("ownerEmail")} />
            </Field>
            <Field label="Owner first name">
              <Input value={details.ownerFirstName} onChange={d("ownerFirstName")} />
            </Field>
            <Field label="Owner last name">
              <Input value={details.ownerLastName} onChange={d("ownerLastName")} />
            </Field>
            <Field label="Owner phone">
              <Input value={details.ownerPhone} onChange={d("ownerPhone")} />
            </Field>
            <Field label="Timezone (IANA)">
              <Input value={details.timezone} onChange={d("timezone")} />
            </Field>
            <Field label="Currency">
              <Input value={details.currency} onChange={(e) => setDetails((x) => ({ ...x, currency: e.target.value.toUpperCase() }))} maxLength={3} />
            </Field>
            <Field label="Country">
              <Input value={details.country} onChange={d("country")} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Internal notes">
                <Textarea value={details.notes} onChange={d("notes")} />
              </Field>
            </div>
          </div>
        </Panel>

        {/* Domains */}
        <Panel
          title={
            <span className="flex items-center gap-2">
              <FiGlobe className="h-4 w-4 text-indigo-600" /> Domains
            </span>
          }
          description="Every domain that should show this gym's website. The first line is the primary, used in emails and redirects."
          footer={
            <>
              <div className="flex flex-wrap gap-1.5">
                {gym.domains.map((dom) => (
                  <Pill key={dom.host} tone={dom.isPrimary ? "primary" : "neutral"} dot={false}>
                    <span className="font-mono normal-case">{dom.host}</span>
                    {dom.isPrimary ? " · primary" : ""}
                  </Pill>
                ))}
                {!gym.domains.length && <span className="text-xs text-slate-500">No domain yet</span>}
              </div>
              <Button
                disabled={busy}
                onClick={() =>
                  run("Domains saved", async () => {
                    const res = await platformFetch<{ hosting?: Hosting }>(`/gyms/${id}/domains`, {
                      method: "PUT",
                      body: {
                        domains: domainsText
                          .split(/[\s,]+/)
                          .map((h) => h.trim())
                          .filter(Boolean)
                          .map((host, i) => ({ host, isPrimary: i === 0 })),
                      },
                    });
                    setHosting(res.hosting || null);
                  })
                }
              >
                Save domains
              </Button>
            </>
          }
        >
          <Field label="One domain per line">
            <Textarea value={domainsText} onChange={(e) => setDomainsText(e.target.value)} placeholder={"ironworks.com\nwww.ironworks.com"} className="font-mono" />
          </Field>
          {hosting && hosting.added.length > 0 && (
            <div className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
              {hosting.added.map((h) => (
                <div key={h.host}>
                  <p className="flex flex-wrap items-center gap-2 font-semibold text-slate-900">
                    <span className="font-mono">{h.host}</span>
                    <Pill tone={h.added ? (h.verified === false ? "warn" : "good") : h.skipped ? "neutral" : "bad"} dot={false}>
                      {h.added ? (h.verified === false ? "awaiting verification" : "added to the website host") : h.skipped ? "not added automatically" : `could not be added`}
                    </Pill>
                    {h.error && <span className="text-rose-600">{h.error}</span>}
                  </p>
                  <p className="mt-1.5">
                    DNS: add a <span className="rounded bg-white px-1 font-mono ring-1 ring-slate-200">{h.dns.type}</span> record for <span className="rounded bg-white px-1 font-mono ring-1 ring-slate-200">{h.dns.name}</span> pointing to <span className="rounded bg-white px-1 font-mono ring-1 ring-slate-200">{h.dns.value}</span>. {h.dns.note}
                  </p>
                  {(h.verification || []).map((v, i) => (
                    <p key={i} className="mt-1">
                      Verification: <span className="font-mono">{v.type}</span> record <span className="font-mono">{v.domain}</span> = <span className="break-all font-mono">{v.value}</span>
                    </p>
                  ))}
                </div>
              ))}
              {!hosting.connected && <p className="text-slate-500">Connect Vercel on the API (VERCEL_TOKEN, VERCEL_PROJECT_ID) to add domains to the website project automatically.</p>}
            </div>
          )}

          {/* Where each domain stands on the website host: is DNS pointing
              here yet, and what to add if not. */}
          {domainStatus && domainStatus.data.length > 0 && (
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">DNS &amp; verification</p>
              <ul className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 text-xs">
                {domainStatus.data.map((st) => {
                  const tone = !domainStatus.connected ? "neutral" : st.error ? "bad" : !st.on_project ? "warn" : st.misconfigured ? "warn" : st.verified === false ? "warn" : "good";
                  const label = !domainStatus.connected
                    ? "not checked"
                    : st.error
                    ? "could not check"
                    : !st.on_project
                    ? "not on the website host"
                    : st.verified === false
                    ? "awaiting verification"
                    : st.misconfigured
                    ? "DNS not pointing here"
                    : "live";
                  return (
                    <li key={st.host} className="px-3 py-2.5">
                      <p className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-slate-900">{st.host}</span>
                        <Pill tone={tone} dot={false}>
                          {label}
                        </Pill>
                        {st.error && <span className="text-rose-600">{st.error}</span>}
                      </p>
                      {domainStatus.connected && label !== "live" && (
                        <p className="mt-1 text-slate-600">
                          Add a <span className="rounded bg-white px-1 font-mono ring-1 ring-slate-200">{st.dns.type}</span> record for <span className="rounded bg-white px-1 font-mono ring-1 ring-slate-200">{st.dns.name}</span> pointing to <span className="rounded bg-white px-1 font-mono ring-1 ring-slate-200">{st.dns.value}</span>.
                        </p>
                      )}
                      {(st.verification || []).map((v, i) => (
                        <p key={i} className="mt-1 text-slate-600">
                          Verification: <span className="font-mono">{v.type}</span> record <span className="font-mono">{v.domain}</span> = <span className="break-all font-mono">{v.value}</span>
                        </p>
                      ))}
                    </li>
                  );
                })}
              </ul>
              {!domainStatus.connected && <p className="mt-2 text-xs text-slate-500">Vercel is not connected on the API, so DNS cannot be checked from here.</p>}
            </div>
          )}
        </Panel>

        {/* Subscription */}
        {/* What the gym will pay once this is saved: the plan, plus whatever
            add-ons are ticked. The server works out the same total. */}
        <Panel
          title={
            <span className="flex items-center gap-2">
              <FiLayers className="h-4 w-4 text-indigo-600" /> Plan &amp; subscription
            </span>
          }
          description="Renewals are recorded here. When the period end passes the gym goes past due, and after the grace period it stops being served."
          footer={
            <>
              <span className="text-xs text-slate-500">
                Currently {gym.subscription.status.replace("_", " ")}
                {gym.subscription.currentPeriodEnd ? ` until ${formatDate(gym.subscription.currentPeriodEnd)}` : ""} · {formatMoney(gym.subscription.amount, gym.subscription.currency)} / {gym.subscription.billingCycle}
                {(gym.subscription.addons || []).length > 0 && (
                  <> · {formatMoney(gym.subscription.planAmount ?? 0, gym.subscription.currency)} plan + {(gym.subscription.addons || []).map((a) => a.name).join(", ")}</>
                )}
                {gym.subscription.stripeSubscriptionId && (
                  <span className="block">
                    Paid by card through Stripe{gym.subscription.stripePriceSummary ? ` · ${gym.subscription.stripePriceSummary}` : ""} · <span className="font-mono">{gym.subscription.stripeSubscriptionId}</span>
                  </span>
                )}
              </span>
              <Button
                disabled={busy}
                onClick={() =>
                  run("Subscription saved", () =>
                    platformFetch(`/gyms/${id}/subscription`, {
                      method: "PUT",
                      body: {
                        planId: sub.planId,
                        status: sub.status,
                        billingCycle: sub.billingCycle,
                        amount: sub.amount === "" ? undefined : Number(sub.amount),
                        addonSlugs,
                        currency: sub.currency,
                        currentPeriodEnd: sub.currentPeriodEnd || null,
                        notes: sub.notes,
                      },
                    })
                  )
                }
              >
                Save subscription
              </Button>
            </>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Plan">
              <Select value={sub.planId} onChange={(e) => choosePlan(e.target.value)}>
                <option value="">No plan (unlimited)</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.price.currency} {p.price.monthly}/mo
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Status">
              <Select value={sub.status} onChange={s("status")}>
                {SUBSCRIPTION_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st.replace("_", " ")}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Billing cycle">
              <Select value={sub.billingCycle} onChange={(e) => chooseCycle(e.target.value)}>
                {BILLING_CYCLES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Period ends">
              <Input type="date" value={sub.currentPeriodEnd} onChange={s("currentPeriodEnd")} />
            </Field>
            <Field label="Plan price per cycle" hint="Leave as the plan's own price unless this gym agreed something else.">
              <Input type="number" value={sub.amount} onChange={s("amount")} />
            </Field>
            <Field label="Currency">
              <Input value={sub.currency} onChange={(e) => setSub((x) => ({ ...x, currency: e.target.value.toUpperCase() }))} maxLength={3} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Add-ons" hint="Charged on top of the plan. Manage the list and its prices under Plans.">
                <div className="flex flex-wrap gap-2 pt-1">
                  {includedAddons.map((addon) => (
                    <span
                      key={addon.slug}
                      title={`${chosenPlan?.name || "This plan"} comes with it`}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-sm font-medium text-emerald-700"
                    >
                      {addon.name} · included
                    </span>
                  ))}
                  {sellableAddons.map((addon) => {
                    const on = addonSlugs.includes(addon.slug);
                    return (
                      <button
                        key={addon.slug}
                        type="button"
                        onClick={() => setAddonSlugs((list) => (on ? list.filter((sl) => sl !== addon.slug) : [...list, addon.slug]))}
                        className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                          on ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {addon.name} +{formatMoney(priceOf(addon), addon.price.currency)}
                      </button>
                    );
                  })}
                  {includedAddons.length === 0 && sellableAddons.length === 0 && (
                    <p className="text-sm text-slate-500">Nothing is sold with this plan.</p>
                  )}
                </div>
              </Field>
            </div>

            <div className="md:col-span-2 rounded-xl bg-slate-50 px-4 py-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Plan</span>
                <span className="font-medium text-slate-900">{formatMoney(planShare, sub.currency || "PKR")}</span>
              </div>
              {includedAddons.map((addon) => (
                <div key={addon.slug} className="mt-1 flex justify-between text-slate-600">
                  <span>{addon.name}</span>
                  <span className="font-medium text-emerald-700">included</span>
                </div>
              ))}
              {chosenAddons.map((addon) => (
                <div key={addon.slug} className="mt-1 flex justify-between text-slate-600">
                  <span>{addon.name}</span>
                  <span className="font-medium text-slate-900">+{formatMoney(priceOf(addon), addon.price.currency)}</span>
                </div>
              ))}
              <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 font-semibold text-slate-900">
                <span>Total per {sub.billingCycle === "yearly" ? "year" : "month"}</span>
                <span>{formatMoney(billTotal, sub.currency || "PKR")}</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <Field label="Billing notes">
                <Textarea value={sub.notes} onChange={s("notes")} />
              </Field>
            </div>
          </div>
        </Panel>

        {/* Administrators */}
        <Panel
          title={
            <span className="flex items-center gap-2">
              <FiShield className="h-4 w-4 text-indigo-600" /> Administrators inside the gym
            </span>
          }
          actions={
            <>
              <Button variant="secondary" size="sm" disabled={busy || !gym.owner.email} onClick={() => sendInvite(gym.owner.email)}>
                <FiMail className="h-3.5 w-3.5" /> Resend owner invite
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setResetOpen(true)}>
                Reset owner password
              </Button>
            </>
          }
          footer={
            <span className="text-xs text-slate-500">
              The owner signs in at <span className="font-mono">{siteHost ? `${siteHost}/authentication` : "<domain>/authentication"}</span> and manages the gym at <span className="font-mono">/admin</span>. &quot;Resend owner invite&quot; emails {gym.owner.email || "the owner"} a link to set their password.
            </span>
          }
          padded={false}
        >
          {admins === null ? (
            <p className="px-6 py-6 text-xs text-slate-500">Loading…</p>
          ) : !admins.length ? (
            <p className="px-6 py-6 text-xs text-slate-500">No administrator account yet. Use &quot;Reset owner password&quot; to create one.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {admins.map((a) => (
                <li key={a.id} className="flex items-center gap-3 px-6 py-3 text-sm">
                  <Avatar name={a.name || a.email} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-900">{a.name || a.email}</p>
                    <p className="truncate text-xs text-slate-500">{a.email}</p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    {a.is_active ? <Pill tone="good">active</Pill> : <Pill tone="bad">disabled</Pill>}
                    <p className="mt-1">last login {formatDate(a.last_login)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* Danger zone */}
      <Panel tone="danger" className="mt-6" title="Danger zone" description="Removing the gym takes it off the platform. Its database is kept unless you choose to drop it, in which case every member, payment and attendance record is gone for good.">
        <Button variant="danger" onClick={() => setDeleteOpen(true)}>
          Delete this gym
        </Button>
      </Panel>

      <Modal open={resetOpen} onClose={() => setResetOpen(false)} title="Reset owner password" size="sm">
        <p className="text-xs text-slate-500">
          Emails this administrator a link to set their own password (creating the account inside the gym if the address is new). Type a password only if you need to set one by hand as well; the password itself is never emailed.
        </p>
        <div className="mt-4 space-y-4">
          <Field label="Email">
            <Input type="email" value={reset.email} onChange={(e) => setReset((r) => ({ ...r, email: e.target.value }))} />
          </Field>
          <Field label="New password (optional, min 8 characters)">
            <Input type="password" value={reset.password} onChange={(e) => setReset((r) => ({ ...r, password: e.target.value }))} autoComplete="new-password" />
          </Field>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setResetOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={busy || !reset.email || (reset.password.length > 0 && reset.password.length < 8)}
            onClick={async () => {
              await sendInvite(reset.email, reset.password || undefined);
              setResetOpen(false);
              setReset((r) => ({ ...r, password: "" }));
            }}
          >
            {reset.password ? "Set password & email link" : "Email set-password link"}
          </Button>
        </div>
      </Modal>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title={`Delete ${gym.name}`} size="sm">
        <p className="text-sm text-slate-700">
          Type <span className="font-mono font-semibold">{gym.slug}</span> to confirm.
        </p>
        <div className="mt-4 space-y-4">
          <Field label="Slug">
            <Input value={confirmSlug} onChange={(e) => setConfirmSlug(e.target.value)} className="font-mono" />
          </Field>
          <label className="flex items-start gap-2 text-sm text-rose-700">
            <input type="checkbox" checked={dropDatabase} onChange={(e) => setDropDatabase(e.target.checked)} className="mt-0.5 h-4 w-4 accent-rose-600" />
            <span>
              Also drop the database <span className="font-mono text-xs">{gym.database.name}</span> (irreversible)
            </span>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            disabled={busy || confirmSlug !== gym.slug}
            onClick={async () => {
              setBusy(true);
              try {
                await platformFetch(`/gyms/${id}`, { method: "DELETE", body: { confirmSlug, dropDatabase } });
                router.replace("/super-admin/gyms");
              } catch (e) {
                setError(e instanceof Error ? e.message : "Could not delete the gym");
                setBusy(false);
                setDeleteOpen(false);
              }
            }}
          >
            Delete gym
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default function GymDetailPage() {
  // The page reads ?invite= from the New gym form, and useSearchParams needs
  // a boundary around it.
  return (
    <Suspense fallback={<Spinner />}>
      <GymDetail />
    </Suspense>
  );
}
