"use client";

import { useCallback, useEffect, useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import { PageHeader, Panel, Button, Field, Input, Textarea, Toggle, Modal, Spinner, EmptyState, Alert, Pill } from "../_shared/ui";
import { platformFetch, formatMoney, type Plan } from "../_shared/api";

type Draft = {
  name: string;
  slug: string;
  description: string;
  monthly: string;
  yearly: string;
  currency: string;
  maxMembers: string;
  maxStaff: string;
  maxTrainers: string;
  maxClasses: string;
  features: string;
  trialDays: string;
  isActive: boolean;
  order: string;
};

const emptyDraft: Draft = {
  name: "",
  slug: "",
  description: "",
  monthly: "0",
  yearly: "0",
  currency: "USD",
  maxMembers: "0",
  maxStaff: "0",
  maxTrainers: "0",
  maxClasses: "0",
  features: "",
  trialDays: "14",
  isActive: true,
  order: "0",
};

function toDraft(plan: Plan): Draft {
  return {
    name: plan.name,
    slug: plan.slug,
    description: plan.description || "",
    monthly: String(plan.price.monthly),
    yearly: String(plan.price.yearly),
    currency: plan.price.currency,
    maxMembers: String(plan.limits.maxMembers),
    maxStaff: String(plan.limits.maxStaff),
    maxTrainers: String(plan.limits.maxTrainers),
    maxClasses: String(plan.limits.maxClasses),
    features: (plan.features || []).join("\n"),
    trialDays: String(plan.trialDays),
    isActive: plan.isActive,
    order: String(plan.order),
  };
}

function limit(n: number) {
  return n ? n.toLocaleString() : "Unlimited";
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await platformFetch<{ data: Plan[] }>("/plans");
      setPlans(res.data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load plans");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    setEditing(null);
    setDraft(emptyDraft);
    setOpen(true);
  };
  const openEdit = (plan: Plan) => {
    setEditing(plan);
    setDraft(toDraft(plan));
    setOpen(true);
  };

  const save = async () => {
    setBusy(true);
    setError(null);
    const body = {
      name: draft.name,
      slug: draft.slug || undefined,
      description: draft.description,
      price: { monthly: Number(draft.monthly) || 0, yearly: Number(draft.yearly) || 0, currency: draft.currency },
      limits: {
        maxMembers: Number(draft.maxMembers) || 0,
        maxStaff: Number(draft.maxStaff) || 0,
        maxTrainers: Number(draft.maxTrainers) || 0,
        maxClasses: Number(draft.maxClasses) || 0,
      },
      features: draft.features,
      trialDays: Number(draft.trialDays) || 0,
      isActive: draft.isActive,
      order: Number(draft.order) || 0,
    };
    try {
      if (editing) await platformFetch(`/plans/${editing.id}`, { method: "PUT", body });
      else await platformFetch("/plans", { method: "POST", body });
      setOpen(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save plan");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (plan: Plan) => {
    if (!window.confirm(`Delete the "${plan.name}" plan?`)) return;
    try {
      await platformFetch(`/plans/${plan.id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete plan");
    }
  };

  const set = (key: keyof Draft) => (value: string) => setDraft((d) => ({ ...d, [key]: value }));
  const field = (label: string, key: keyof Draft, type = "text", placeholder?: string) => (
    <Field label={label}>
      <Input type={type} value={String(draft[key])} onChange={(e) => set(key)(e.target.value)} placeholder={placeholder} />
    </Field>
  );

  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Plans"
        description="What you sell to gyms: price, trial length and the limits each tier gets. A limit of 0 means unlimited."
        actions={
          <Button onClick={openNew}>
            <FiPlus className="h-4 w-4" /> New plan
          </Button>
        }
      />

      {error && <Alert tone="error" onDismiss={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <Spinner />
      ) : !plans.length ? (
        <EmptyState title="No plans yet" hint="Create the plans you sell to gyms. New gyms start on a plan's trial period." action={<Button onClick={openNew}>Create the first plan</Button>} />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <Panel
              key={plan.id}
              className="flex flex-col"
              footer={
                <>
                  <span className="text-xs text-slate-500">
                    {plan.gym_count || 0} gym{plan.gym_count === 1 ? "" : "s"} on this plan
                  </span>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => openEdit(plan)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => remove(plan)} disabled={!!plan.gym_count}>
                      Delete
                    </Button>
                  </div>
                </>
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">{plan.name}</h2>
                  <p className="font-mono text-xs text-slate-400">{plan.slug}</p>
                </div>
                {!plan.isActive && <Pill tone="neutral">inactive</Pill>}
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
                {formatMoney(plan.price.monthly, plan.price.currency)}
                <span className="text-sm font-normal text-slate-500"> /month</span>
              </p>
              <p className="text-xs text-slate-500">
                {formatMoney(plan.price.yearly, plan.price.currency)} /year · {plan.trialDays}-day trial
              </p>
              {plan.description && <p className="mt-3 text-sm text-slate-600">{plan.description}</p>}
              <dl className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ["Members", plan.limits.maxMembers],
                  ["Staff", plan.limits.maxStaff],
                  ["Trainers", plan.limits.maxTrainers],
                  ["Classes", plan.limits.maxClasses],
                ].map(([label, n]) => (
                  <div key={String(label)} className="rounded-lg bg-slate-50 px-3 py-2">
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{label}</dt>
                    <dd className="text-sm font-semibold text-slate-900">{limit(Number(n))}</dd>
                  </div>
                ))}
              </dl>
              {plan.features.length > 0 && (
                <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {f}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? `Edit ${editing.name}` : "New plan"} size="lg">
        <div className="grid gap-4 md:grid-cols-2">
          {field("Name", "name")}
          {field("Slug", "slug", "text", "starter")}
          <div className="md:col-span-2">
            <Field label="Description">
              <Textarea value={draft.description} onChange={(e) => set("description")(e.target.value)} />
            </Field>
          </div>
          {field("Monthly price", "monthly", "number")}
          {field("Yearly price", "yearly", "number")}
          <Field label="Currency">
            <Input value={draft.currency} onChange={(e) => set("currency")(e.target.value.toUpperCase())} />
          </Field>
          {field("Trial days", "trialDays", "number")}
          {field("Max members (0 = unlimited)", "maxMembers", "number")}
          {field("Max staff (0 = unlimited)", "maxStaff", "number")}
          {field("Max trainers (0 = unlimited)", "maxTrainers", "number")}
          {field("Max classes (0 = unlimited)", "maxClasses", "number")}
          <div className="md:col-span-2">
            <Field label="Features (one per line)">
              <Textarea value={draft.features} onChange={(e) => set("features")(e.target.value)} />
            </Field>
          </div>
          {field("Sort order", "order", "number")}
          <div className="flex items-end pb-2">
            <Toggle label="Active (offered to new gyms)" checked={draft.isActive} onChange={(v) => setDraft((d) => ({ ...d, isActive: v }))} />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={save} disabled={busy || !draft.name.trim()}>
            {busy ? "Saving…" : "Save plan"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
