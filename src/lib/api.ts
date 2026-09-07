// Where the GymPilot API lives. The marketing site uses the public routes
// under /api/platform/public; the panel uses the rest with a platform token.

export const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");
export const PLATFORM_API = `${API_BASE}/api/platform`;

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/** fetch() against a public platform route: no session, JSON in and out. */
export async function publicFetch<T>(path: string, init: { method?: "GET" | "POST"; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`${PLATFORM_API}/public${path}`, {
    method: init.method || "GET",
    headers: init.body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  let json: { success?: boolean; message?: string; code?: string } & Record<string, unknown> = {};
  try {
    json = await res.json();
  } catch {
    /* no body */
  }
  if (!res.ok) throw new ApiError(json.message || `Request failed (${res.status})`, res.status, json.code);
  return json as T;
}

export interface PublicPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: { monthly: number; yearly: number; currency: string };
  limits: { maxMembers: number; maxStaff: number; maxTrainers: number; maxClasses: number };
  features: string[];
  trialDays: number;
  order: number;
}

export function formatMoney(amount: number, currency: string, fractionDigits = 0): string {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: currency || "USD", maximumFractionDigits: fractionDigits, minimumFractionDigits: 0 }).format(amount || 0);
  } catch {
    return `${currency} ${amount}`;
  }
}
