"use client";

// GymPilot's own Stripe account -- the one gyms are charged into, not the one
// a gym charges its members into. Keys are typed here rather than deployed,
// so they can be rotated without a release, and the "Test connection" button
// is what proves a key reaches the account you meant.

import { useCallback, useEffect, useState } from "react";
import { FiCheckCircle, FiCopy, FiExternalLink, FiZap } from "react-icons/fi";
import { Alert, Button, Field, Input, PageHeader, Panel, Pill, Spinner, Toggle } from "../_shared/ui";
import { platformFetch, formatDate } from "../_shared/api";

interface StripeSettings {
  stripe: {
    enabled: boolean;
    publishableKey: string;
    secretKey: string;
    webhookSecret: string;
    secretKeySet: boolean;
    webhookSecretSet: boolean;
    mode: "" | "test" | "live";
    accountName: string;
    accountId: string;
    livemode: boolean;
    checkedAt: string | null;
  };
  webhookUrl: string;
  updatedByEmail: string;
  updatedAt: string | null;
}

/** The events worth sending here once the platform starts charging gyms. */
const EVENTS = [
  "checkout.session.completed",
  "invoice.paid",
  "invoice.payment_failed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
];

export default function PlatformStripePage() {
  const [data, setData] = useState<StripeSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [testing, setTesting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({ enabled: false, publishableKey: "", secretKey: "", webhookSecret: "" });

  const hydrate = (d: StripeSettings) => {
    setData(d);
    setForm({
      enabled: d.stripe.enabled,
      publishableKey: d.stripe.publishableKey,
      // The masked value is sent back untouched unless it is retyped; the
      // API knows to leave the stored secret alone when it sees the dots.
      secretKey: d.stripe.secretKey,
      webhookSecret: d.stripe.webhookSecret,
    });
  };

  const load = useCallback(async () => {
    try {
      const res = await platformFetch<{ data: StripeSettings }>("/settings");
      hydrate(res.data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the settings");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await platformFetch<{ data: StripeSettings; message?: string }>("/settings", {
        method: "PUT",
        body: { stripe: form },
      });
      hydrate(res.data);
      setNotice("Saved.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
    } finally {
      setBusy(false);
    }
  };

  const test = async () => {
    setTesting(true);
    setError(null);
    setNotice(null);
    try {
      const res = await platformFetch<{ message: string }>("/settings/stripe/test", { method: "POST" });
      setNotice(res.message);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Stripe refused those keys");
    } finally {
      setTesting(false);
    }
  };

  const copyWebhook = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(data.webhookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Your browser would not let the page copy. Select the address and copy it by hand.");
    }
  };

  if (!data) return <Spinner />;

  const s = data.stripe;

  return (
    <>
      <PageHeader
        eyebrow="System"
        title="Stripe"
        description="GymPilot's own Stripe account — where gyms pay for their plan. A gym's own keys, for taking its members' money, live in that gym's admin instead."
        actions={
          <Button variant="secondary" onClick={test} disabled={testing || !s.secretKeySet}>
            <FiZap className="h-4 w-4" /> {testing ? "Testing…" : "Test connection"}
          </Button>
        }
      />

      {error && (
        <Alert tone="error" onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}
      {notice && (
        <Alert tone="success" onDismiss={() => setNotice(null)}>
          {notice}
        </Alert>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Keys"
          description="Paste them from Stripe → Developers → API keys. Secrets are stored, never shown again."
          footer={
            <>
              <span className="text-xs text-slate-500">
                {data.updatedAt ? `Last saved ${formatDate(data.updatedAt)}${data.updatedByEmail ? ` by ${data.updatedByEmail}` : ""}` : "Never saved"}
              </span>
              <Button onClick={save} disabled={busy}>
                {busy ? "Saving…" : "Save keys"}
              </Button>
            </>
          }
        >
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Toggle
                label="Charge gyms through Stripe"
                checked={form.enabled}
                onChange={(v) => setForm((f) => ({ ...f, enabled: v }))}
              />
              {s.mode === "live" && <Pill tone="success">live keys</Pill>}
              {s.mode === "test" && <Pill tone="neutral">test keys</Pill>}
            </div>

            <Field label="Publishable key" hint="pk_test_… or pk_live_…">
              <Input
                value={form.publishableKey}
                onChange={(e) => setForm((f) => ({ ...f, publishableKey: e.target.value }))}
                placeholder="pk_live_…"
                spellCheck={false}
              />
            </Field>

            <Field label="Secret key" hint={s.secretKeySet ? "Stored. Type a new one to replace it." : "sk_test_… or sk_live_…"}>
              <Input
                value={form.secretKey}
                onChange={(e) => setForm((f) => ({ ...f, secretKey: e.target.value }))}
                placeholder="sk_live_…"
                spellCheck={false}
                autoComplete="off"
              />
            </Field>

            <Field
              label="Webhook signing secret"
              hint={s.webhookSecretSet ? "Stored. Type a new one to replace it." : "whsec_… — Stripe shows it when you add the endpoint below."}
            >
              <Input
                value={form.webhookSecret}
                onChange={(e) => setForm((f) => ({ ...f, webhookSecret: e.target.value }))}
                placeholder="whsec_…"
                spellCheck={false}
                autoComplete="off"
              />
            </Field>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Webhook" description="Add this endpoint in Stripe → Developers → Webhooks, then paste the signing secret it gives you.">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="break-all font-mono text-xs text-slate-700">{data.webhookUrl}</p>
              <Button variant="secondary" size="sm" onClick={copyWebhook} className="mt-3">
                <FiCopy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy address"}
              </Button>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Events to send</p>
            <ul className="mt-2 space-y-1">
              {EVENTS.map((event) => (
                <li key={event} className="font-mono text-[11px] text-slate-600">
                  {event}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Anything that arrives is checked against the signing secret and written to the audit log, so you can see it landed.
            </p>
            <a
              href="https://dashboard.stripe.com/webhooks"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Open Stripe webhooks <FiExternalLink className="h-3.5 w-3.5" />
            </a>
          </Panel>

          <Panel title="Connection">
            {s.accountId ? (
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 font-medium text-emerald-700">
                  <FiCheckCircle className="h-4 w-4" /> {s.accountName}
                </p>
                <p className="font-mono text-xs text-slate-500">{s.accountId}</p>
                {s.checkedAt && <p className="text-xs text-slate-500">Checked {formatDate(s.checkedAt)}</p>}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                {s.secretKeySet ? "Not tested yet. Press Test connection to see which account these keys reach." : "No secret key saved yet."}
              </p>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
