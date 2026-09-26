import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // The panel decides who runs every gym on the platform, so no other site
  // may put it in a frame: a click on what looks like their own page would
  // otherwise land on a button in here. `frame-ancestors` is what modern
  // browsers honour; X-Frame-Options covers the older ones.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  // The sign-in pages used to live under /super-admin; old links and
  // password-reset emails still work.
  async redirects() {
    return [
      { source: "/super-admin/login", destination: "/login", permanent: true },
      { source: "/super-admin/forgot", destination: "/forgot", permanent: true },
      { source: "/super-admin/reset", destination: "/reset", permanent: true },
    ];
  },
};

export default nextConfig;
