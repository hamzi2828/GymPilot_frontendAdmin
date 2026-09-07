"use client";

// Provisioning a gym: platform record, its own database, system roles,
// settings, homepage, legal pages and the owner's administrator account --
// one form, one request.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiDatabase, FiGlobe, FiUser } from "react-icons/fi";
import { PageHeader, Crumbs, Panel, Button, Field, Input, Select, Textarea, Alert } from "../../_shared/ui";
import { platformFetch, type Plan, type Gym, type PlatformConfig } from "../../_shared/api";

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

export default function NewGymPage() {
  const router = useRouter();
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
    platformFetch<{ data: Plan[] }>("/plans")
      .then((res) => setPlans(res.data.filter((p) => p.isActive)))
      .catch(() => setPlans([]));
    platformFetch<{ data: PlatformConfig }>("/config")
      .then((res) => setConfig(res.data))
      .catch(() => setConfig(null));
  }, []);

  const suggestedSlug = form.slug || form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  // Mirrors databaseNameFor() on the server: <prefix><slug>, unsafe characters replaced.
  const suggestedDatabase = `${config?.tenant_database_prefix ?? ""}${suggestedSlug.replace(/[^a-z0-9_-]/gi, "_")}`;
  const selectedPlan = plans.find((p) => p.id === form.planId);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await platformFetch<{ data: Gym }>("/gyms", {
        method: "POST",
        body: {
          name: form.name,
          slug: suggestedSlug,
          database: form.databaseName.trim() ? { name: form.databaseName.trim() } : undefined,
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

      {error && <Alert tone="error" onDismiss={() => setError(null)}>{error}</Alert>}

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Panel
            title={
              <span className="flex items-center gap-2">
                <FiDatabase className="h-4 w-4 text-indigo-600" /> Gym
              </span>
            }
            description="The slug names the gym's database and can be used as slug.yourplatform.com. It cannot be changed later."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Gym name">
                <Input value={form.name} onChange={on("name")} required placeholder="Iron Works Fitness" />
              </Field>
              <Field label="Slug">
                <Input value={form.slug} onChange={on("slug")} placeholder={suggestedSlug || "iron-works"} className="font-mono" />
              </Field>
              <div className="md:col-span-2">
                <Field
                  label="Database name (optional)"
                  hint={
                    <>
                      Leave empty to use <span className="font-mono">{suggestedDatabase || `${config?.tenant_database_prefix ?? ""}<slug>`}</span> — a new database beside <span className="font-mono">{config?.platform_database || "the main database"}</span> on the same cluster.
                    </>
                  }
                >
                  <Input value={form.databaseName} onChange={on("databaseName")} placeholder={suggestedDatabase || `${config?.tenant_database_prefix ?? ""}iron-works`} className="font-mono" />
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
              <Field label="Email">
                <Input type="email" value={form.ownerEmail} onChange={on("ownerEmail")} required autoComplete="off" />
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
              <Field label="Platform plan" hint={selectedPlan ? `Starts on a ${selectedPlan.trialDays}-day trial, then ${selectedPlan.price.currency} ${selectedPlan.price.monthly}/month.` : "Without a plan the gym is unlimited and not billed."}>
                <Select value={form.planId} onChange={on("planId")}>
                  <option value="">No plan (unlimited, no billing)</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.price.currency} {p.price.monthly}/mo
                    </option>
                  ))}
                </Select>
              </Field>
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
