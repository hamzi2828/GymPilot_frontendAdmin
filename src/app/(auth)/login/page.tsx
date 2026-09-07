"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiZap } from "react-icons/fi";
import { platformFetch, setPlatformToken } from "@/app/super-admin/_shared/api";
import AuthShell, { AuthButton, authInput } from "@/app/super-admin/_shared/AuthShell";

// One-tap sign-in for the super admin account, taken from the environment
// so no credentials sit in the code. Both variables must be set for the
// shortcut to appear -- leave them unset on a public deployment.
const QUICK_EMAIL = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL || "";
const QUICK_PASSWORD = process.env.NEXT_PUBLIC_SUPER_ADMIN_PASSWORD || "";
const HAS_QUICK = !!(QUICK_EMAIL && QUICK_PASSWORD);

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [challenge, setChallenge] = useState<{ challengeId: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Arriving with ?quick=1 pre-fills the account, when one is configured.
  useEffect(() => {
    if (HAS_QUICK && params.get("quick") === "1") {
      setEmail(QUICK_EMAIL);
      setPassword(QUICK_PASSWORD);
    }
  }, [params]);

  const finish = (token: string) => {
    setPlatformToken(token);
    router.replace("/super-admin");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (challenge) {
        const res = await platformFetch<{ token: string }>("/auth/login/2fa", { method: "POST", body: { challengeId: challenge.challengeId, code: code.replace(/\D/g, "") } });
        finish(res.token);
        return;
      }
      const res = await platformFetch<{ token?: string; requires2fa?: boolean; challengeId?: string; message?: string }>("/auth/login", { method: "POST", body: { email, password } });
      if (res.requires2fa && res.challengeId) {
        setChallenge({ challengeId: res.challengeId, message: res.message || "Enter the code we emailed you." });
        setPassword("");
        return;
      }
      if (res.token) finish(res.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title={challenge ? "Check your email" : "Sign in"}
      subtitle={challenge ? challenge.message : "Platform administrators only."}
      footer={
        challenge ? (
          <button
            type="button"
            onClick={() => {
              setChallenge(null);
              setCode("");
              setError(null);
            }}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to sign in
          </button>
        ) : (
          <>
            <Link href="/forgot" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
            <Link href="/" className="hover:text-slate-800">
              Back to the website
            </Link>
          </>
        )
      }
    >
      <form onSubmit={submit} className="space-y-4">
        {challenge ? (
          <label className="block">
            <span className="text-xs font-semibold text-slate-700">6-digit code</span>
            <input autoFocus inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} className={`${authInput} mt-1.5 text-center text-2xl tracking-[0.4em]`} placeholder="••••••" />
          </label>
        ) : (
          <>
            <label className="block">
              <span className="text-xs font-semibold text-slate-700">Email</span>
              <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={`${authInput} mt-1.5`} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-700">Password</span>
              <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${authInput} mt-1.5`} />
            </label>
            {HAS_QUICK && (
              <button
                type="button"
                onClick={() => {
                  setEmail(QUICK_EMAIL);
                  setPassword(QUICK_PASSWORD);
                  setError(null);
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/60 px-3.5 py-2.5 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <FiZap className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-slate-900">Super admin · quick sign in</span>
                  <span className="block truncate text-[11px] text-slate-500">{QUICK_EMAIL} · tap to fill, then Sign in</span>
                </span>
              </button>
            )}
          </>
        )}

        {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}

        <AuthButton disabled={busy || (challenge ? code.replace(/\D/g, "").length !== 6 : false)}>{busy ? "Please wait…" : challenge ? "Verify" : "Sign in"}</AuthButton>
      </form>
    </AuthShell>
  );
}

export default function SuperAdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
