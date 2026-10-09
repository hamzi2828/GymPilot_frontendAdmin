// Everything the marketing site says, in one place. Edit copy here; the
// components only lay it out. Nothing in this file is fetched -- prices come
// live from the API (see components/marketing/Pricing.tsx). The features
// themselves are in content/features.ts; a `feature` here links to its page.

import type { FeatureKey } from "./features";

/** A line of copy that can lead to a feature's own page. */
export type Linked = string | { text: string; feature: FeatureKey };

// The WhatsApp number people message us on, digits only, country code first
// (923001234567): the form wa.me links need.
const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[^\d]/g, "").replace(/^0+/, "");

export const SITE = {
  name: "GymPilot",
  tagline: "Run your whole gym from one place",
  description:
    "Memberships, billing, class booking, personal training, front desk, shop, messaging and your own website — with a private database for every gym. GymPilot is the gym management platform you can sell on your own domain.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001").replace(/\/+$/, ""),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  whatsapp: WHATSAPP,
  /** Opens a WhatsApp chat with us, the first message started. Empty when no number is set. */
  whatsappUrl: WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi GymPilot, I would like to know more for my gym.")}` : "",
  demoGymUrl: process.env.NEXT_PUBLIC_DEMO_GYM_URL || "",
  heroPills: ["Memberships & billing", "Class booking", "Personal training", "Your own domain"],
};

// Who sells GymPilot, for the legal pages (/terms, /privacy, /refund-policy).
// Every line is read from the environment and shown only when it is set, so
// nothing invented ever appears as the seller's name or address. See
// .env.example for what each one is.
export const LEGAL = {
  /** The person or company that sells GymPilot, as registered. */
  name: process.env.NEXT_PUBLIC_LEGAL_NAME || "",
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "",
  /** Where legal and privacy questions go; the contact email when not set. */
  email: process.env.NEXT_PUBLIC_LEGAL_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** The country whose law the terms follow, as it should read after "the laws of". */
  governingLaw: process.env.NEXT_PUBLIC_LEGAL_GOVERNING_LAW || "",
  /** The city or district whose courts hear a dispute, as it should read after "the courts of". */
  jurisdiction: process.env.NEXT_PUBLIC_LEGAL_JURISDICTION || "",
  /** Where the servers are, in plain words ("Singapore", "the European Union"). */
  hostingRegion: process.env.NEXT_PUBLIC_LEGAL_HOSTING_REGION || "",
  /** The date the legal pages were last changed, as it should be read ("9 October 2026"). */
  updated: process.env.NEXT_PUBLIC_LEGAL_UPDATED || "",
};

// The header's menu. A "#…" target is a section of the landing page (the
// header and footer prefix it with "/" everywhere else). Features opens the
// features menu; `spy` is the landing-page section that lights it up.
export const NAV: { label: string; href: string; menu?: "features"; spy?: string }[] = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "/features", menu: "features", spy: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  eyebrow: "Website + member portal + management system",
  title: ["Not just gym software.", "Your gym's", "complete setup."],
  lead:
    "GymPilot gives your gym its own website on its own web address, a member portal your members add to their phone's home screen, and the system that runs everything behind the desk — memberships, payments, classes, staff and messages. One setup, live in a day, built to take your gym to the next level.",
  primary: { label: "Book a demo", href: "#demo" },
  secondary: { label: "See what's included", href: "#included" },
  trust: ["Your own website included", "Member portal in every plan", "Everything set up for you"],
};

export const WHAT_YOU_GET: {
  eyebrow: string;
  title: string;
  text: string;
  parts: { kicker: string; title: string; text: string; points: Linked[] }[];
  banner: { strong: string; rest: string; cta: string };
} = {
  eyebrow: "What you get",
  title: "Three things every gym needs. One setup.",
  text: "Most gyms buy a website from one company, an app from another and a spreadsheet for the rest. GymPilot is all of it, made to work together, under your own name.",
  parts: [
    {
      kicker: "For people finding you",
      title: "Your own website",
      text: "A fast, good-looking website on your own web address, with your logo and colours. People see your classes, trainers and prices, and join online.",
      points: ["yourgym.com, connected for you", "Classes, trainers, prices, blog, map, hours", "Join and pay online", "Found on Google"],
    },
    {
      kicker: "For your members",
      title: "A member portal",
      text: "Members book classes and PT, pay, check in at the door and get reminders — from a portal that opens in their browser and sits on their home screen like an app. No app store.",
      points: ["Book classes and PT", "Pay and see receipts", "Check in with a QR code", "Reminders by email, push, SMS or WhatsApp"],
    },
    {
      kicker: "For you and your staff",
      title: "The management system",
      text: "Everything behind the desk in one place: sign-ups and fees, check-in, the timetable, the till, staff, payroll and the books.",
      points: [
        { text: "Sign-up and fee collection, each on one screen", feature: "feedesk" },
        { text: "Fee expiry lists and dues", feature: "renewals" },
        { text: "Check-in that says “Fee expired” out loud", feature: "alerts" },
        { text: "A till with thermal receipts", feature: "receipts" },
        { text: "Daily sales and profit & loss", feature: "dailysales" },
      ],
    },
  ],
  banner: {
    strong: "You are not buying software.",
    rest: "You are getting the complete setup to take your gym to the next level.",
    cta: "See it on your gym",
  },
};

export const AUDIENCES = ["Boutique studios", "24/7 gyms", "CrossFit boxes", "Martial arts & boxing", "Yoga & pilates", "Personal training teams", "Ladies-only gyms", "Multi-trainer clubs"];

export const PROOF = [
  { value: "1", label: "private online presence per gym", hint: "Your own website, member portal and database." },
  { value: "4", label: "messaging channels", hint: "Email, push, SMS and WhatsApp. SMS and WhatsApp send through your own provider account, which you pay for. Email sends through your own mailbox." },
  { value: "5", label: "website languages", hint: "Your public website in English, Arabic, Urdu, Spanish or French. The screens your staff use are in English." },
  { value: "1", label: "optional add-on", hint: "Billing, booking, POS, payroll, reports — every plan is the full product. The native member app is the one thing sold on top." },
];

// The feature list moved to content/features.ts: the landing page shows the
// six marked `highlight`, /features shows all of them.

export const HOW_IT_WORKS = {
  eyebrow: "How it works",
  title: "Up and running in a day",
  text: "Three steps. We do the technical part.",
  note: "No web address yet? We give you one when we set your gym up, and connect your own later.",
};

export const STEPS = [
  {
    title: "We set up your gym",
    text: "Tell us your gym's name and pick a plan. Within one working day you have your own website, member portal and admin area.",
  },
  {
    title: "We connect your web address",
    text: "Have a domain like yourgym.com? Tell us after you sign up. Our team connects it for you, padlock included.",
  },
  {
    title: "Start selling",
    text: "Add your classes and prices, bring in your members, and take your first payment.",
  },
];

export const SHOWCASES = [
  {
    eyebrow: "Own brand, own domain",
    title: "A website members actually find — and it is yours",
    text: "Every gym on GymPilot gets a public website on its own domain: classes, trainers, memberships, blog, contact, opening hours and a map, with the colours and logo of the business. Search engines see a real business, not a subpage of someone else's platform.",
    points: ["Your own domain, connected by our team", "SEO title, description and structured data", "Themes, logo, social links, WhatsApp button", "Public website in 5 languages"],
    visual: "website",
  },
  {
    eyebrow: "Billing",
    title: "Money that arrives without chasing",
    text: "At the desk, record each fee as cash, bank transfer, JazzCash or Easypaisa, take part payments and track the balance. Members can pay by bank transfer and upload the receipt for you to check. Renewal reminders and invoices go out by themselves. When a membership lapses the member is told, and the desk sees it — and hears it — the next time they check in. Card payments online work where Stripe is available to your business.",
    points: ["Cash, bank transfer, JazzCash, Easypaisa", "Bank transfer with receipt review", "Part payments and dues", "Sales, expenses and assets in one ledger"],
    visual: "billing",
  },
  {
    eyebrow: "Members",
    title: "A portal they keep on their phone",
    text: "Members book classes and PT, see their attendance, download receipts, manage notifications and sign the waiver — from a portal they add to their home screen straight from the browser. Push notifications, and SMS or WhatsApp through your own provider, bring them back when they drift.",
    points: ["Class & PT booking with credits", "Health questionnaire and signed agreement", "Receipts, invoices and locker", "Absent-member nudges and win-back campaigns"],
    visual: "members",
  },
];

export const PRICING = {
  eyebrow: "Pricing",
  title: "One price. The whole product.",
  text: "Every plan is the whole product: fee collection, check-in, classes, the shop, messaging, reports and your website. Plans differ only by size. Every plan starts with a free trial and includes the member portal. The native member app is an add-on on Starter and Growth, and comes with Pro.",
  included: [
    { text: "Own domain & website", feature: "website" },
    { text: "Desk, bank transfer & card payments", feature: "billing" },
    { text: "Fee collection, expiry lists & dues", feature: "feedesk" },
    { text: "Check-in with spoken fee alerts", feature: "alerts" },
    { text: "Class & PT booking", feature: "booking" },
    { text: "Email & push; SMS & WhatsApp via your provider", feature: "messaging" },
    { text: "POS with 80 / 58 mm thermal receipts", feature: "receipts" },
    { text: "Staff, trainer pay & payslips", feature: "trainerpay" },
    { text: "Daily sales & profit and loss", feature: "dailysales" },
    { text: "Reports in Excel & CSV", feature: "reports" },
    { text: "Public website in 5 languages", feature: "setup" },
    { text: "Daily encrypted backups & private database", feature: "backups" },
  ] as Linked[],
  // Under the plans, wherever the native app is sold or given away.
  appNote: "The native member app is not in the App Store or Google Play yet. Ask us where it stands before you add it. Every plan includes the member portal in the browser.",
  fallback: "Plans are being set up. Book a demo and we will send you a quote the same day.",
};

// Customer quotes. Only entries with `sample: false` are shown (see
// components/marketing/Testimonials.tsx); the samples below are placeholders
// for the layout and stay hidden until real quotes replace them. Attributed
// to roles on purpose: no invented names.
export const TESTIMONIALS: { quote: string; who: string; where: string; sample: boolean }[] = [
  {
    quote: "We stopped chasing renewals. Cards renew on their own, bank transfers land with a receipt, and the desk sees who has lapsed before they walk in.",
    who: "Owner",
    where: "Boutique strength studio",
    sample: true,
  },
  {
    quote: "Members book from their phone, the waitlist promotes itself and instructors see their list. Our front desk finally does front desk work.",
    who: "General manager",
    where: "Multi-room fitness club",
    sample: true,
  },
  {
    quote: "Our website is on our own domain with our colours, and it ranks for the town name. It looks like ours because it is.",
    who: "Marketing lead",
    where: "Yoga & pilates studio",
    sample: true,
  },
];

export const FAQ = [
  {
    q: "Is my data mixed with other gyms?",
    a: "No. Every gym gets its own database. Members, payments, attendance and messages live only there, and the platform can export or hand it back to you at any time.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes. Tell us your domain after you sign up and our team connects it for you, padlock (SSL) included. Your website, member portal and admin panel all live on it.",
  },
  {
    q: "How do payments work?",
    a: "At the desk you record cash, bank transfer, JazzCash, Easypaisa, other mobile-wallet and card-terminal payments — part payments too, with the balance tracked. These are recorded, not processed: the money reaches you as it always has. Members can also pay by bank transfer and upload the receipt for you to check. Every membership gets an invoice. Card payments online run through your own Stripe account, where Stripe is available to your business.",
  },
  {
    q: "Can I bring my existing members across?",
    a: "Yes. Import members, memberships and expiry dates from a CSV exported from your old software, and check the preview before anything is saved. Members without an email address come across too, and existing plans keep their renewal dates.",
  },
  {
    q: "Do members need to download an app?",
    a: "No. Every plan includes the member portal. It opens in the browser on iPhone, Android and desktop, members add it to their home screen like an app, and it receives push notifications. A native member app is a separate add-on on Starter and Growth, and comes with Pro. It is not in the App Store or Google Play yet.",
  },
  {
    q: "What about the front desk hardware?",
    a: "Any tablet or PC with a browser becomes a check-in kiosk: it scans members' QR codes with its camera or takes a typed member ID. For fingerprints there is a Windows desk app that works with DigitalPersona USB readers; our team installs it on your front-desk PC. Wall-mounted fingerprint machines are not supported, and check-in needs an internet connection. Both play a different sound for each kind of check-in and can say “Fee expired, please renew” out loud.",
  },
  {
    q: "Is my data backed up?",
    a: "Yes. Every night each gym gets an encrypted backup, and the last seven are kept. Owners can download the whole gym at any time, and restore from a backup after seeing what is in it — GymPilot takes a safety copy first.",
  },
  {
    q: "Which languages are supported?",
    a: "Your public website comes in English, Arabic, Urdu, Spanish and French, right-to-left included. You pick the default and visitors can switch. The screens your staff use are in English.",
  },
  {
    q: "Is there a contract?",
    a: "Plans are monthly or yearly and can be cancelled any time. Every plan starts with a free trial. The native member app is an add-on on Starter and Growth, and comes with Pro.",
  },
];

export const DEMO_FORM = {
  eyebrow: "Book a demo",
  title: "See GymPilot running on a gym like yours",
  text: "Tell us a little about the gym and we will set up a walkthrough on your numbers — memberships, timetable, billing and the website.",
  sizes: ["Under 100 members", "100 – 500 members", "500 – 2,000 members", "2,000+ members"],
};

// The contact page (/contact): the same form, asked as a question. It is the
// way to reach us that always works, whatever else is or is not set.
export const CONTACT = {
  eyebrow: "Contact us",
  title: "Talk to us",
  text: "Ask a question, book a demo or get help with a sign-up. Fill in the form and we reply by email or phone.",
  whatsapp: "Message us on WhatsApp",
  existing: "Already a customer? Sign in at your gym's own web address, not here. It is in your welcome email.",
};

export const FOOTER = {
  blurb: "Gym management software with a private database, your own domain and every feature included.",
  columns: [
    { title: "Product", links: NAV },
    {
      title: "For gyms",
      links: [
        { label: "All features", href: "/features" },
        { label: "Book a demo", href: "#demo" },
        { label: "Contact us", href: "/contact" },
        { label: "Pricing", href: "#pricing" },
        { label: "Member app", href: "/features/member-app" },
      ],
    },
    {
      title: "Platform",
      links: [{ label: "Platform sign in", href: "/login" }],
    },
  ],
  // The small print, on the footer's last line on every page.
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Members' data", href: "/privacy#members-data" },
    { label: "Refunds & cancelling", href: "/refund-policy" },
  ],
};
