import { NextResponse } from "next/server";

// One-tap super admin sign-in for LOCAL DEVELOPMENT only.
//
// The credentials come from non-public environment variables
// (DEV_SUPER_ADMIN_EMAIL / DEV_SUPER_ADMIN_PASSWORD), so they never end up in
// the client bundle, and this handler only answers under `next dev`. On any
// other build it is a 404 whatever the environment says.

export const dynamic = "force-dynamic";

export function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const email = process.env.DEV_SUPER_ADMIN_EMAIL || "";
  const password = process.env.DEV_SUPER_ADMIN_PASSWORD || "";
  if (!email || !password) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ email, password }, { headers: { "Cache-Control": "no-store" } });
}
