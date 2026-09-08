// Everything the marketing site says, in one place. Edit copy here; the
// components only lay it out. Nothing in this file is fetched -- prices come
// live from the API (see components/marketing/Pricing.tsx).

export const SITE = {
  name: "GymPilot",
  tagline: "Run your whole gym from one place",
  description:
    "Memberships, billing, class booking, personal training, front desk, shop, messaging and your own website — with a private database for every gym. GymPilot is the gym management platform you can sell on your own domain.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001").replace(/\/+$/, ""),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[^\d]/g, ""),
  demoGymUrl: process.env.NEXT_PUBLIC_DEMO_GYM_URL || "",
  heroPills: ["Memberships & billing", "Class booking", "Personal training", "Your own domain"],
};

export const NAV = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  eyebrow: "Website + member app + management system",
  title: ["Not just gym software.", "Your gym's", "complete setup."],
  lead:
    "GymPilot gives your gym its own website on its own web address, an app your members keep on their phone, and the system that runs everything behind the desk — memberships, payments, classes, staff and messages. One setup, live in a day, built to take your gym to the next level.",
  primary: { label: "Book a demo", href: "#demo" },
  secondary: { label: "See what's included", href: "#included" },
  trust: ["Your own website included", "Member app included", "Everything set up for you"],
};

export const WHAT_YOU_GET = {
  eyebrow: "What you get",
  title: "Three things every gym needs. One setup.",
  text: "Most gyms buy a website from one company, an app from another and a spreadsheet for the rest. GymPilot is all of it, made to work together, under your own name.",
  parts: [
    {
      kicker: "For people finding you",
      title: "Your own website",
      text: "A fast, good-looking website on your own web address, with your logo and colours. People see your classes, trainers and prices, and join online.",
      points: ["yourgym.com, with the padlock", "Classes, trainers, prices, blog, map, hours", "Join and pay online", "Found on Google"],
    },
    {
      kicker: "For your members",
      title: "A member app",
      text: "Members book classes and PT, pay, check in at the door and get reminders — from an app they install on their phone in one tap.",
      points: ["Book classes and PT", "Pay and see receipts", "Check in with a QR code", "Reminders by WhatsApp, SMS, email and push"],
    },
    {
      kicker: "For you and your staff",
      title: "The management system",
      text: "Everything behind the desk in one place: memberships, payments, timetable, front desk, shop, staff, payroll and reports.",
      points: ["Memberships and automatic billing", "Timetable, waitlists and PT", "Front desk, shop and lockers", "Staff, payslips and reports"],
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
  { value: "1", label: "private online presence per gym", hint: "Your own website, member app and database. Your members, payments and records are never mixed with anyone else's." },
  { value: "4", label: "messaging channels", hint: "Email, SMS, WhatsApp and push — with automations that run themselves." },
  { value: "5", label: "languages, RTL included", hint: "English, Arabic, Urdu, Spanish and French out of the box." },
  { value: "0", label: "add-ons to buy", hint: "Billing, booking, POS, payroll, reports — every plan is the full product." },
];

// The feature list moved to content/features.ts: the landing page shows the
// six marked `highlight`, /features shows all of them.

export const HOW_IT_WORKS = {
  eyebrow: "How it works",
  title: "Up and running in a day",
  text: "Three steps. We do the technical part.",
  note: "No web address yet? Start on a free GymPilot address and add your own later.",
};

export const STEPS = [
  {
    title: "We set up your gym",
    text: "Tell us your gym's name. Within minutes you have your own website, member app and admin area.",
  },
  {
    title: "Connect your web address",
    text: "Point your domain (like yourgym.com) at GymPilot. We handle the rest, padlock included.",
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
    points: ["Custom domain with automatic SSL", "SEO title, description and structured data", "Themes, logo, social links, WhatsApp button", "Five languages including right-to-left"],
    visual: "website",
  },
  {
    eyebrow: "Billing",
    title: "Money that arrives without chasing",
    text: "Stripe recurring billing through the gym's own account, renewal reminders, failed-payment recovery, bank transfer with receipt review, and invoices that go out by themselves. When a membership lapses the member is told, the front desk sees it, and access stops.",
    points: ["Cards, wallets and bank transfer", "Freezes, upgrades and pro-rata", "Coupons and session packs", "Sales, expenses and assets in one ledger"],
    visual: "billing",
  },
  {
    eyebrow: "Members",
    title: "An app they keep on their phone",
    text: "Members book classes and PT, see their attendance, download receipts, manage notifications and sign the waiver — from an installable app that works offline. Push, WhatsApp and SMS bring them back when they drift.",
    points: ["Class & PT booking with credits", "Health questionnaire and signed agreement", "Receipts, invoices and locker", "Absent-member nudges and win-back campaigns"],
    visual: "members",
  },
];

export const PRICING = {
  eyebrow: "Pricing",
  title: "One price. The whole product.",
  text: "Every plan includes billing, booking, PT, front desk, shop, messaging, staff, reports and the website. Plans differ only by size. Prices below come straight from your GymPilot account.",
  included: ["Own domain & website", "Member phone app, in your colours", "Stripe & bank transfer billing", "Class & PT booking", "Messaging: email, SMS, WhatsApp, push", "POS, stock & lockers", "Staff roles, leave & payslips", "Reports & CSV exports", "5 languages", "Daily backups & private database"],
  fallback: "Plans are being set up. Book a demo and we will send you a quote the same day.",
};

// Replace these with real customer quotes before launch. Attributed to roles
// on purpose: no invented names.
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
    a: "Yes. Point your domain at GymPilot and it is verified with SSL issued automatically. Your website, member portal and admin panel all live on it.",
  },
  {
    q: "How do payments work?",
    a: "Card and wallet payments run through your own Stripe account, so the money goes straight to you. Bank transfer with receipt upload and cash at the desk are supported too, with invoices for everything.",
  },
  {
    q: "Can I bring my existing members across?",
    a: "Yes. Import members, memberships and expiry dates from a CSV. Existing plans keep their renewal dates.",
  },
  {
    q: "Do members need to download an app?",
    a: "No app store. The member portal installs as an app from the browser on iPhone, Android and desktop, works offline and receives push notifications.",
  },
  {
    q: "What about the front desk hardware?",
    a: "Any tablet becomes a QR check-in kiosk. For fingerprint access there is a Windows desktop app that talks to the same account.",
  },
  {
    q: "Which languages are supported?",
    a: "English, Arabic, Urdu, Spanish and French, including right-to-left layout. The gym picks its default; visitors can switch.",
  },
  {
    q: "Is there a contract?",
    a: "Plans are monthly or yearly and can be cancelled any time. Every plan starts with a free trial and there are no add-ons to buy.",
  },
];

export const DEMO_FORM = {
  eyebrow: "Book a demo",
  title: "See GymPilot running on a gym like yours",
  text: "Tell us a little about the gym and we will set up a walkthrough on your numbers — memberships, timetable, billing and the website.",
  sizes: ["Under 100 members", "100 – 500 members", "500 – 2,000 members", "2,000+ members"],
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
        { label: "Pricing", href: "#pricing" },
        { label: "Member app", href: "#product" },
      ],
    },
    {
      title: "Platform",
      links: [{ label: "Platform sign in", href: "/login" }],
    },
  ],
};
