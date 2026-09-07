import { NextRequest, NextResponse } from "next/server";

// The platform panel needs a platform session. The token is issued by
// /api/platform on the API and mirrored into a cookie by the panel's API
// client, so the edge can turn a signed-out visitor away before the page
// loads. Coarse on purpose: the API re-verifies the token on every request.
export function middleware(req: NextRequest) {
  if (req.cookies.get("platform_token")?.value) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/super-admin", "/super-admin/:path*"],
};
