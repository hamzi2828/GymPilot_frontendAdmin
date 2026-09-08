"use client";

// Demo requests from the marketing site: who asked, what gym, and where the
// conversation is. Status and notes are the only things edited here.

import { useCallback, useEffect, useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { PageHeader, DataTable, Spinner, Alert, Avatar, Pill, Button, Modal, Field, Select, Textarea, relativeTime, cx } from "../_shared/ui";
import { platformFetch, formatMoney, DEMO_REQUEST_STATUSES, type DemoRequest, type DemoRequestStatus } from "../_shared/api";

const TONE: Record<DemoRequestStatus, string> = { new: "primary", contacted: "warn", converted: "good", closed: "neutral" };

export default function DemoRequestsPage() {
  const [rows, setRows] = useState<DemoRequest[] | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<"" | DemoRequestStatus>("new");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<DemoRequest | null>(null);
  const [draft, setDraft] = useState({ status: "new" as DemoRequestStatus, notes: "" });
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await platformFetch<{ data: DemoRequest[]; counts: Record<string, number> }>(`/demo-requests${filter ? `?status=${filter}` : ""}`);
      setRows(res.data);
      setCounts(res.counts || {});
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load demo requests");
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const openRow = (r: DemoRequest) => {
    setOpen(r);
    setDraft({ status: r.status, notes: r.notes || "" });
  };

  const save = async () => {
    if (!open) return;
    setBusy(true);
    try {
      await platformFetch(`/demo-requests/${open.id}`, { method: "PATCH", body: draft });
      setOpen(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!open || !window.confirm(`Delete the request from ${open.name}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await platformFetch(`/demo-requests/${open.id}`, { method: "DELETE" });
      setOpen(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete");
    } finally {
      setBusy(false);
    }
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <PageHeader eyebrow="Platform" title="Demo requests" description="Gyms that asked for a walkthrough on the website. Open one to record where the conversation is." />
      {error && <Alert tone="error" onDismiss={() => setError(null)}>{error}</Alert>}

      <div className="mb-4 flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-card sm:inline-flex">
        {[["", "All", total], ...DEMO_REQUEST_STATUSES.map((s) => [s, s[0].toUpperCase() + s.slice(1), counts[s] || 0])].map(([key, label, n]) => (
          <button key={String(key)} type="button" onClick={() => setFilter(key as "" | DemoRequestStatus)} className={cx("inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", filter === key ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100")}>
            {label}
            <span className={cx("rounded-full px-1.5 text-[11px] font-semibold", filter === key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500")}>{n as number}</span>
          </button>
        ))}
      </div>

      {!rows ? (
        <Spinner />
      ) : (
        <DataTable
          columns={["When", "Contact", "Gym", "Message", "Status"]}
          empty={filter === "new" ? "No new requests" : "Nothing here"}
          onRowClick={(i) => openRow(rows[i])}
          rows={rows.map((r) => [
            <div key="w">
              <p className="text-sm text-slate-800">{relativeTime(r.createdAt)}</p>
              <p className="text-[11px] text-slate-400">{new Date(r.createdAt).toLocaleString()}</p>
            </div>,
            <div key="c" className="flex items-center gap-2.5">
              <Avatar name={r.name} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">{r.name}</p>
                <p className="truncate text-xs text-slate-500">{r.email}</p>
                {r.phone && <p className="truncate text-xs text-slate-500">{r.phone}</p>}
              </div>
            </div>,
            <div key="g" className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {r.gymName || "—"}
                {r.kind === "trial" && (
                  <span className="ml-2 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                    checkout
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-slate-500">
                {r.plan
                  ? `${r.plan.name} · ${formatMoney(r.plan.amount, r.plan.currency)} / ${r.plan.billingCycle === "yearly" ? "yr" : "mo"}${
                      r.plan.addonNames.length ? ` · ${r.plan.addonNames.join(", ")}` : ""
                    }`
                  : [r.gymSize, r.country].filter(Boolean).join(" · ")}
              </p>
            </div>,
            <p key="m" className="max-w-md truncate text-xs text-slate-600" title={r.message}>
              {r.message || <span className="text-slate-300">—</span>}
            </p>,
            <Pill key="s" tone={TONE[r.status] || "neutral"}>
              {r.status}
            </Pill>,
          ])}
        />
      )}

      <Modal open={!!open} onClose={() => setOpen(null)} title={open ? `${open.name} · ${open.gymName || "demo request"}` : ""} size="md">
        {open && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${open.email}`} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                <FiMail className="h-3.5 w-3.5" /> {open.email}
              </a>
              {open.phone && (
                <a href={`tel:${open.phone}`} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                  <FiPhone className="h-3.5 w-3.5" /> {open.phone}
                </a>
              )}
            </div>
            {open.plan && (
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700">Chose at checkout</p>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Plan</span>
                    <span className="font-semibold text-slate-900">
                      {open.plan.name} · {open.plan.billingCycle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Add-ons</span>
                    <span className="font-medium text-slate-900">{open.plan.addonNames.join(", ") || "none"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Trial</span>
                    <span className="font-medium text-slate-900">{open.plan.trialDays ? `${open.plan.trialDays} days` : "none"}</span>
                  </div>
                  <div className="flex justify-between border-t border-indigo-200 pt-1.5">
                    <span className="font-semibold text-slate-900">Then</span>
                    <span className="font-semibold text-slate-900">
                      {formatMoney(open.plan.amount, open.plan.currency)} / {open.plan.billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </div>
                  {open.preferredSlug && (
                    <div className="flex justify-between pt-1.5">
                      <span className="text-slate-600">Web address wanted</span>
                      <span className="font-mono text-xs text-slate-900">{open.preferredSlug}</span>
                    </div>
                  )}
                </div>
                <Button href={`/super-admin/gyms/new?name=${encodeURIComponent(open.gymName)}&slug=${open.preferredSlug}`} size="sm" className="mt-3">
                  Set this gym up
                </Button>
              </div>
            )}

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Gym size</dt>
                <dd className="text-slate-800">{open.gymSize || "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Country / city</dt>
                <dd className="text-slate-800">{open.country || "—"}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Message</dt>
                <dd className="whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-slate-800">{open.message || "—"}</dd>
              </div>
              <div className="col-span-2 text-xs text-slate-500">
                Received {new Date(open.createdAt).toLocaleString()}
                {open.source ? ` · from ${open.source}` : ""}
              </div>
            </dl>
            <Field label="Status">
              <Select value={draft.status} onChange={(e) => setDraft((x) => ({ ...x, status: e.target.value as DemoRequestStatus }))}>
                {DEMO_REQUEST_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Notes">
              <Textarea value={draft.notes} onChange={(e) => setDraft((x) => ({ ...x, notes: e.target.value }))} placeholder="Call booked for Tuesday, wants Stripe + bank transfer…" />
            </Field>
            <div className="flex items-center justify-between gap-2">
              <Button variant="danger" size="sm" onClick={remove} disabled={busy}>
                Delete
              </Button>
              <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setOpen(null)} disabled={busy}>
                Cancel
              </Button>
              <Button onClick={save} disabled={busy}>
                {busy ? "Saving…" : "Save"}
              </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
