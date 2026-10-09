# GymPilot — marketing site & platform panel

The public face of GymPilot as a product, and the panel that runs it:

| Path | What |
|---|---|
| `/` | Marketing landing page: product, features, how it works, live pricing, FAQ, demo request form. |
| `/features`, `/features/<slug>` | Every feature, and a page for each. |
| `/checkout` | Pick a plan and sign up (`/checkout/success` after paying). |
| `/contact` | The contact form, with WhatsApp, email and phone when they are set. |
| `/terms`, `/privacy`, `/refund-policy` | The legal pages. Drafts in `src/content/legal.ts`: have them reviewed, and set the `NEXT_PUBLIC_LEGAL_*` variables. |
| `/login` | Platform sign-in (also `/forgot`, `/reset`). |
| `/super-admin` | Platform (super admin) panel: gyms, plans, demo requests, audit log, account. |

Both talk to the same API, `GymPilot_backend`, under `/api/platform`. The
panel needs a super admin session; the landing page only uses the public
routes (`GET /api/platform/public/plans`, `POST /api/platform/public/demo-requests`).

A gym's own website, member portal and admin panel live in
`GymPilot_frontend`, on the gym's domain. Old `/super-admin` links there
redirect here.

## Run it

```bash
cp .env.example .env      # set NEXT_PUBLIC_BACKEND_URL and NEXT_PUBLIC_SITE_URL
npm install
npm run dev               # http://localhost:3001
```

On the API, set `PLATFORM_ADMIN_ORIGIN` to this site's origin so it accepts
the panel's requests (CORS) and points password-reset links and demo-request
emails here.

## Editing the marketing copy

Everything the landing page says is in `src/content/site.ts`: headline,
features, steps, FAQ, testimonials, footer. Prices are not there — they come
from the plans you manage in the panel.

Replace the sample testimonials before launch (they are marked `sample: true`).

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
