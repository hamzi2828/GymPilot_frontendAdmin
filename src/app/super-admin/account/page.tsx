"use client";

import { useEffect, useState } from "react";
import { FiShield, FiKey } from "react-icons/fi";
import { PageHeader, Panel, Button, Field, Input, Alert, Avatar, Pill, formatLastLogin } from "../_shared/ui";
import { platformFetch, type PlatformAdmin } from "../_shared/api";

export default function SuperAdminAccountPage() {
  const [admin, setAdmin] = useState<PlatformAdmin | null>(null);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const load = () => platformFetch<{ admin: PlatformAdmin }>("/auth/me").then((r) => setAdmin(r.admin));
  useEffect(() => {
    load().catch(() => setAdmin(null));
  }, []);

  const run = async (key: string, fn: () => Promise<string>) => {
    setBusy(key);
    setNotice(null);
    try {
      setNotice({ tone: "success", text: await fn() });
      await load();
    } catch (e) {
      setNotice({ tone: "error", text: e instanceof Error ? e.message : "Request failed" });
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <PageHeader eyebrow="System" title="My account" description="Your platform sign-in: two-factor and password." />
      {notice && <Alert tone={notice.tone} onDismiss={() => setNotice(null)}>{notice.text}</Alert>}

      <Panel className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name={admin?.name || admin?.email || "?"} size="xl" />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold text-slate-900">{admin?.name || "Super admin"}</p>
            <p className="text-sm text-slate-500">{admin?.email}</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <Pill tone={admin?.two_factor ? "good" : "neutral"}>{admin?.two_factor ? "2FA on" : "2FA off"}</Pill>
            <p className="mt-1">Last sign-in {formatLastLogin(admin?.last_login)}</p>
          </div>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title={
            <span className="flex items-center gap-2">
              <FiShield className="h-4 w-4 text-indigo-600" /> Two-factor sign-in
            </span>
          }
          description={admin?.two_factor ? "On — a 6-digit code is emailed to you at every sign-in." : "Off — add an emailed 6-digit code to every sign-in. Needs working platform email (SMTP)."}
        >
          <Button
            variant={admin?.two_factor ? "secondary" : "primary"}
            disabled={busy === "2fa" || !admin}
            onClick={() =>
              run("2fa", async () => {
                const r = await platformFetch<{ admin: { two_factor: boolean } }>("/auth/two-factor", { method: "PUT", body: { enabled: !admin?.two_factor } });
                return r.admin.two_factor ? "Two-factor sign-in is on." : "Two-factor sign-in is off.";
              })
            }
          >
            {admin?.two_factor ? "Turn off" : "Turn on"}
          </Button>
        </Panel>

        <Panel
          title={
            <span className="flex items-center gap-2">
              <FiKey className="h-4 w-4 text-indigo-600" /> Change password
            </span>
          }
          description="At least 10 characters. Changing it does not sign out other sessions."
        >
          <div className="space-y-4">
            <Field label="Current password">
              <Input type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
            </Field>
            <Field label="New password">
              <Input type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} />
            </Field>
            <div className="flex justify-end">
              <Button
                disabled={busy === "pw" || next.length < 10 || !current}
                onClick={() =>
                  run("pw", async () => {
                    await platformFetch("/auth/password", { method: "PUT", body: { currentPassword: current, newPassword: next } });
                    setCurrent("");
                    setNext("");
                    return "Password updated.";
                  })
                }
              >
                Update password
              </Button>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}
