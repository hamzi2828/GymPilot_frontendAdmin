"use client";

// Provisioning a gym: platform record, its own database, system roles,
// settings, homepage, legal pages and the owner's administrator account --
// one form, one request.

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiDatabase, FiGlobe, FiUser } from "react-icons/fi";
import { PageHeader, Crumbs, Panel, Button, Field, Input, Select, Textarea, Alert } from "../../_shared/ui";
import { platformFetch, type Addon, type DemoRequest, type Plan, type Gym, type PlatformConfig } from "../../_shared/api";

const COMMON_TIMEZONES = [
  "UTC",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Istanbul",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Dhaka",
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Manila",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Africa/Lagos",
  "Africa/Nairobi",
  "Africa/Johannesburg",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Sao_Paulo",
];

function NewGymForm() {
  const router = useRouter();
  const params = useSearchParams();
  // Where this gym came from: a checkout or a demo request, if any.
  const fromId = params.get("from") || "";
  const [request, setRequest] = useState<DemoRequest | null>(null);
  // The address they signed up with is not ours to retype; it is where the
  // sign-in details go.
  const [emailLocked, setEmailLocked] = useState(false);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [addonSlugs, setAddonSlugs] = useState<string[]>([]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  // The tail of the database name. Fixed for as long as the form is open.
  const [databaseId, setDatabaseId] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [config, setConfig] = useState<PlatformConfig | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    databaseName: "",
    domains: "",
    ownerFirstName: "",
    ownerLastName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerPassword: "",
    planId: "",
    timezone: "UTC",
    currency: "USD",
    country: "",
    notes: "",
  });

  const set = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }));
  const on = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => set(key)(e.target.value);

  useEffect(() => {
    setDatabaseId(
      Array.from(crypto.getRandomValues(new Uint8Array(3)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
  }, []);

  useEffect(() => {
    platformFetch<{ data: Plan[] }>("/plans")
      .then((res) => setPlans(res.data.filter((p) => p.isActive)))
      .catch(() => setPlans([]));
    platformFetch<{ data: Addon[] }>("/addons")
      .then((res) => setAddons(res.data.filter((a) => a.isActive)))
      .catch(() => setAddons([]));
    platformFetch<{ data: PlatformConfig }>("/config")
      .then((res) => setConfig(res.data))
      .catch(() => setConfig(null));
  }, []);

  // Filling the form in from the request they sent. Waits for the plans,
  // because the plan is stored as a slug and the form wants its id.
  const prefill = useCallback(
    (r: DemoRequest, planList: Plan[]) => {
      const [first, ...rest] = (r.name || "").trim().split(/\s+/);
      const plan = r.plan ? planList.find((p) => p.slug === r.plan!.slug) : undefined;
      setForm((f) => ({
        ...f,
        name: r.gymName || f.name,
        slug: r.preferredSlug || f.slug,
        ownerFirstName: first || f.ownerFirstName,
        ownerLastName: rest.join(" ") || f.ownerLastName,
        ownerEmail: r.email || f.ownerEmail,
        ownerPhone: r.phone || f.ownerPhone,
        planId: plan ? plan.id : f.planId,
        currency: plan ? plan.price.currency : f.currency,
        notes: [
          `${r.kind === "trial" ? "Checkout" : "Demo request"} on ${new Date(r.createdAt).toLocaleDateString()}.`,
          r.country ? `Where: ${r.country}` : "",
          r.gymSize ? `Size: ${r.gymSize}` : "",
          r.message ? `They said: ${r.message}` : "",
          f.notes,
        ]
          .filter(Boolean)
          .join("\n"),
      }));
      if (r.email) setEmailLocked(true);
      if (r.plan) {
        setBillingCycle(r.plan.billingCycle);
        setAddonSlugs(r.plan.addonSlugs || []);
      }
    },
    []
  );

  useEffect(() => {
    if (!fromId || !plans.length || request) return;
    platformFetch<{ data: DemoRequest }>(`/demo-requests/${fromId}`)
      .then((res) => {
        setRequest(res.data);
        prefill(res.data, plans);
      })
      .catch(() => setRequest(null));
  }, [fromId, plans, request, prefill]);

  // A plain link can still say what to call it.
  useEffect(() => {
    const name = params.get("name");
    const slug = params.get("slug");
    if (!fromId && (name || slug)) {
      setForm((f) => ({ ...f, name: name || f.name, slug: slug || f.slug }));
    }
  }, [params, fromId]);

  const suggestedSlug = form.slug || form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  // Mirrors the server: <prefix><slug>_<id>. The id is settled when the form
  // opens rather than as you type, so the name shown is the name created.
  const databaseName = suggestedSlug
    ? `${config?.tenant_database_prefix ?? ""}${suggestedSlug.replace(/[^a-z0-9_-]/gi, "_")}_${databaseId}`
    : "";
  const selectedPlan = plans.find((p) => p.id === form.planId);
  const includedSlugs = selectedPlan?.includedAddons || [];
  const sellableAddons = addons.filter(
    (a) => !includedSlugs.includes(a.slug) && (!a.planSlugs.length || a.planSlugs.includes(selectedPlan?.slug || ""))
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await platformFetch<{ data: Gym }>("/gyms", {
        method: "POST",
        body: {
          name: form.name,
          // A preference, not a decision: the address they asked for at
          // checkout if there was one, otherwise the name decides, and a
          // clash only adds a number.
          preferredSlug: form.slug || undefined,
          database: databaseName ? { name: databaseName } : undefined,
          domains: form.domains
            .split(/[\s,]+/)
            .map((d) => d.trim())
            .filter(Boolean),
          owner: {
            firstName: form.ownerFirstName,
            lastName: form.ownerLastName,
            email: form.ownerEmail,
            phone: form.ownerPhone,
            password: form.ownerPassword,
          },
          planId: form.planId || undefined,
          subscription: form.planId ? { billingCycle, addonSlugs } : undefined,
          locale: { timezone: form.timezone, currency: form.currency, country: form.country },
          notes: form.notes,
        },
      });
      router.replace(`/super-admin/gyms/${res.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the gym");
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow={<Crumbs items={[{ label: "Gyms", href: "/super-admin/gyms" }, { label: "New gym" }]} />} title="New gym" description="Creates the platform record, a private database, default roles, settings, homepage, legal pages and the owner's administrator account." />

      {request && (
        <Alert tone="info">
          Filled in from {request.kind === "trial" ? "the checkout" : "the demo request"} sent by{" "}
          <span className="font-semibold">{request.name}</span> ({request.email})
          {request.plan ? ` — ${request.plan.name}, ${request.plan.billingCycle}${request.plan.addonNames.length ? ` with ${request.plan.addonNames.join(", ")}` : ""}` : ""}. Check
          it over before you create the gym.
        </Alert>
      )}

      {error && <Alert tone="error" onDismiss={() => setError(null)}>{error}</Alert>}

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Panel
            title={
              <span className="flex items-center gap-2">
                <FiDatabase className="h-4 w-4 text-indigo-600" /> Gym
              </span>
            }
            description="The name is the only thing to decide. The web address and the database follow from it, and neither can be changed later."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field
                  label="Gym name"
                  hint={
                    suggestedSlug ? (
                      <>
                        Its web address will be <span className="font-mono">{suggestedSlug}</span>, and a number is added if that name is already
                        taken.
                      </>
                    ) : undefined
                  }
                >
                  <Input value={form.name} onChange={on("name")} required placeholder="Iron Works Fitness" />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field
                  label="Database name"
                  hint={
                    <>
                      Its own database beside <span className="font-mono">{config?.platform_database || "the main database"}</span> on the same
                      cluster. Named after the gym with an id on the end, so no two gyms can ever share one.
                    </>
                  }
                >
                  <Input value={databaseName} readOnly tabIndex={-1} className="cursor-not-allowed bg-slate-50 font-mono text-slate-500" />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Domains (one per line or comma separated)" hint="The first is the primary. Point each domain at the website deployment; the gym is served there as soon as it is saved here.">
                  <Textarea value={form.domains} onChange={on("domains")} placeholder={"ironworks.com\nwww.ironworks.com"} className="font-mono" />
                </Field>
              </div>
            </div>
          </Panel>

          <Panel
            title={
              <span className="flex items-center gap-2">
                <FiUser className="h-4 w-4 text-indigo-600" /> Owner account
              </span>
            }
            description="Created as an administrator inside the gym. Share the password with them; it is not emailed."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="First name">
                <Input value={form.ownerFirstName} onChange={on("ownerFirstName")} autoComplete="off" />
              </Field>
              <Field label="Last name">
                <Input value={form.ownerLastName} onChange={on("ownerLastName")} autoComplete="off" />
              </Field>
              <Field
                label="Email"
                hint={
                  emailLocked ? (
                    <>
                      From their signup.{" "}
                      <button type="button" onClick={() => setEmailLocked(false)} className="font-semibold text-indigo-600 hover:text-indigo-700">
                        Change it
                      </button>
                    </>
                  ) : undefined
                }
              >
                <Input
                  type="email"
                  value={form.ownerEmail}
                  onChange={on("ownerEmail")}
                  required
                  readOnly={emailLocked}
                  autoComplete="off"
                  className={emailLocked ? "cursor-not-allowed bg-slate-50 text-slate-500" : undefined}
                />
              </Field>
              <Field label="Phone">
                <Input value={form.ownerPhone} onChange={on("ownerPhone")} autoComplete="off" />
              </Field>
              <div className="md:col-span-2">
                <Field label="Password (min 8 characters)">
                  <Input type="password" value={form.ownerPassword} onChange={on("ownerPassword")} required autoComplete="new-password" />
                </Field>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel
            title={
              <span className="flex items-center gap-2">
                <FiGlobe className="h-4 w-4 text-indigo-600" /> Plan &amp; locale
              </span>
            }
          >
            <div className="space-y-4">
              <Field
                label="Platform plan"
                hint={
                  selectedPlan
                    ? `Starts on a ${selectedPlan.trialDays}-day trial, then ${selectedPlan.price.currency} ${
                        billingCycle === "yearly" ? selectedPlan.price.yearly : selectedPlan.price.monthly
                      }/${billingCycle === "yearly" ? "year" : "month"}.`
                    : "For a gym you host without charging: no limits, no renewal date, nothing to bill. Pick a plan to put it on the price list."
                }
              >
                <Select value={form.planId} onChange={on("planId")}>
                  <option value="">No plan (unlimited, no billing)</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.price.currency} {p.price.monthly}/mo
                    </option>
                  ))}
                </Select>
              </Field>

              {form.planId && (
                <>
                  <Field label="Billing cycle">
                    <Select value={billingCycle} onChange={(e) => setBillingCycle(e.target.value as "monthly" | "yearly")}>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </Select>
                  </Field>

                  {sellableAddons.length > 0 && (
                    <Field label="Add-ons" hint="Charged on top of the plan. Included ones are added by the plan itself.">
                      <div className="flex flex-wrap gap-2 pt-1">
                        {sellableAddons.map((addon) => {
                          const on = addonSlugs.includes(addon.slug);
                          const price = billingCycle === "yearly" ? addon.price.yearly : addon.price.monthly;
                          return (
                            <button
                              key={addon.slug}
                              type="button"
                              onClick={() => setAddonSlugs((list) => (on ? list.filter((s) => s !== addon.slug) : [...list, addon.slug]))}
                              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                                on ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 text-slate-600 hover:border-slate-300"
                              }`}
                            >
                              {addon.name} +{addon.price.currency} {price}
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  )}
                </>
              )}
              <Field label="Timezone" hint="IANA name. Attendance, timetables and reminders run on this clock.">
                <Input list="tz-list" value={form.timezone} onChange={on("timezone")} />
                <datalist id="tz-list">
                  {COMMON_TIMEZONES.map((tz) => (
                    <option key={tz} value={tz} />
                  ))}
                </datalist>
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Currency">
                  <Input value={form.currency} onChange={(e) => set("currency")(e.target.value.toUpperCase())} placeholder="USD" maxLength={3} />
                </Field>
                <Field label="Country">
                  <Input value={form.country} onChange={on("country")} placeholder="GB" />
                </Field>
              </div>
            </div>
          </Panel>

          <Panel title="Internal notes">
            <Textarea value={form.notes} onChange={on("notes")} placeholder="Contract details, contacts…" />
          </Panel>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={busy}>
              {busy ? "Creating…" : "Create gym"}
            </Button>
            <Button variant="secondary" onClick={() => router.push("/super-admin/gyms")} disabled={busy}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default function NewGymPage() {
  // The form reads ?from= to fill itself in from a request, and
  // useSearchParams needs a boundary around it.
  return (
    <Suspense fallback={null}>
      <NewGymForm />
    </Suspense>
  );
}
