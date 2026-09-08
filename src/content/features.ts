// What GymPilot does, in the buyer's words.
//
// One list, used twice: the landing page shows the six marked `highlight`
// and links to /features, which shows all of them grouped, with a line of
// detail and the screens each one actually lives on. `screens` mirrors the
// real product (GymPilot_frontend and the member app), so nothing here
// promises a screen that does not exist.
//
// House style: `text` is one sentence a busy owner reads in a glance,
// `points` are three to five short phrases, `detail` is at most two short
// sentences. If it needs a paragraph, it is not written plainly enough.

export interface Feature {
  key: string;
  group: GroupKey;
  /** On the landing page too. */
  highlight?: boolean;
  title: string;
  /** One sentence. Used in both places. */
  text: string;
  points: string[];
  /** One or two short sentences, only on /features. */
  detail: string;
  /** Where it lives in the product. */
  screens: string[];
  /** Bought alongside a plan rather than included in it. */
  addon?: boolean;
}

export type GroupKey = "money" | "classes" | "gym" | "reach" | "control";

export const FEATURE_GROUPS: { key: GroupKey; label: string; title: string; text: string }[] = [
  { key: "money", label: "Members & money", title: "Members and money", text: "Who trains with you, what they pay, and getting paid without chasing anyone." },
  { key: "classes", label: "Classes & training", title: "Classes and training", text: "Your timetable, your trainers, and members booking themselves in." },
  { key: "gym", label: "In the gym", title: "Day to day in the gym", text: "The front desk, the shop and your team — the parts that run while you are on the floor." },
  { key: "reach", label: "Reaching members", title: "Reaching your members", text: "Your website, your app, and the messages that bring people back." },
  { key: "control", label: "Where you stand", title: "Knowing where you stand", text: "The numbers, the switches, and the promise that your gym's data is only ever yours." },
];

export const FEATURES_INTRO = {
  eyebrow: "What's inside",
  title: "Everything a gym needs, in one app",
  text: "The six gyms buy us for. The rest are one click away, and every plan gets all of them.",
  cta: "See all features",
};

export const FEATURES_PAGE = {
  eyebrow: "Every feature",
  title: "What you get with GymPilot",
  lead: "Every feature, in plain English. All of them are in every plan — plans differ only by how many members, staff and classes you have.",
  note: "Nothing on this page is an add-on, an upgrade or an extra monthly fee.",
};

export const FEATURES: Feature[] = [
  /* ------------------------------ money ------------------------------ */
  {
    key: "billing",
    group: "money",
    highlight: true,
    title: "Get paid on time, every time",
    text: "Card, bank transfer or cash — and renewals happen without you asking.",
    points: ["Monthly, yearly and class packs", "Renews and retries by itself", "Invoices sent automatically", "Pause, upgrade or cancel in a tap", "Card money into your own Stripe"],
    detail: "Set your prices once. Members join on your website and pay, and the next payment looks after itself. Card money goes straight into your Stripe account, never through us.",
    screens: ["Admin → Packages", "Admin → Package Orders", "Admin → Registrations", "Settings → Stripe & Banks", "Member app → Membership"],
  },
  {
    key: "offers",
    group: "money",
    title: "Discount codes and joining offers",
    text: "Make a code, choose what it takes off, and set when it stops working.",
    points: ["Percent off or a fixed amount", "Start and end dates", "Limit how many can use it", "One package or all of them", "First payment or every renewal"],
    detail: "Members type the code at checkout. It stops working on the date you set, or after the number of uses you allow.",
    screens: ["Admin → Coupons", "Website → Packages & Checkout"],
  },
  {
    key: "members",
    group: "money",
    title: "Every member in one place",
    text: "Contact details, health form, signed agreement, documents and private notes.",
    points: ["Health questionnaire (PAR-Q)", "Agreement signed on screen", "Emergency contact on file", "Import from a spreadsheet"],
    detail: "One page per member instead of a folder behind the desk. Coming from another system? Your members arrive with their join and expiry dates intact.",
    screens: ["Admin → Users", "Admin → Users → Profile", "Settings → Memberships", "Member app → Profile"],
  },
  {
    key: "leads",
    group: "money",
    title: "Turn enquiries into members",
    text: "Every website enquiry becomes a lead you can follow up and convert.",
    points: ["Contact form becomes a lead", "New, contacted, trial, joined", "Notes from every call", "One click to make them a member"],
    detail: "Nothing gets lost in an inbox. Move a lead along as you talk to them, and turn them into a member without retyping anything.",
    screens: ["Admin → Leads", "Admin → Contact Queries", "Website → Contact"],
  },

  /* ----------------------------- classes ----------------------------- */
  {
    key: "booking",
    group: "classes",
    highlight: true,
    title: "Members book classes from their phone",
    text: "Your timetable goes up once; members tap to book and waitlists fill themselves.",
    points: ["Repeats every week", "Waitlist moves up on its own", "Rules for late cancels and no-shows", "Holidays and cover instructors"],
    detail: "Nobody texts you at 6am. You decide how far ahead people book, when booking closes, and how late is too late to cancel.",
    screens: ["Admin → Classes", "Admin → Bookings", "Admin → Timetable changes", "Website → Timetable", "Member app → Classes"],
  },
  {
    key: "pt",
    group: "classes",
    title: "Sell personal training",
    text: "Trainers set their free hours; members buy a pack and book the slots.",
    points: ["Trainer's own calendar", "Packs of 5 or 10 sessions", "Only genuinely free times shown", "Commission lands on the payslip"],
    detail: "Classes and booked sessions are taken out automatically, so a member can only pick a time the trainer is really free.",
    screens: ["Admin → Personal Training", "Admin → Trainers", "Settings → Bookings & PT", "Member app → Personal training"],
  },

  /* ------------------------------- gym ------------------------------- */
  {
    key: "frontdesk",
    group: "gym",
    highlight: true,
    title: "Know who is in the gym",
    text: "QR code or fingerprint at the door — an expired membership is turned away.",
    points: ["QR check-in on any tablet", "Fingerprint app for the desk", "See who is inside right now", "Spot who stopped coming"],
    detail: "Any tablet becomes a kiosk. You get an honest record of who came and when — for fire safety, staffing, and win-backs.",
    screens: ["Admin → Attendance", "Kiosk (any tablet)", "Windows desktop app", "Member app → Check in"],
  },
  {
    key: "pos",
    group: "gym",
    title: "Sell drinks, kit and lockers",
    text: "Ring up sales at the desk, keep count of stock, and rent out lockers.",
    points: ["Receipts and refunds", "Stock counted for you", "Warned before it runs out", "Lockers given to members"],
    detail: "The desk becomes a till. Take the money there and then or add it to a member's tab; the receipt is emailed and the stock count drops by one.",
    screens: ["Admin → Shop / POS", "Admin → Inventory", "Admin → Lockers", "Website → My account (their receipts)"],
  },
  {
    key: "staff",
    group: "gym",
    title: "Run your team",
    text: "Rotas, time off and payslips — and everyone sees only their own part.",
    points: ["Manager, front desk, trainer, accountant", "Shift rota everyone can see", "Time-off requests to approve", "Payslips with PT commission", "Staff see their own shifts online"],
    detail: "Your receptionist does not need the books and your accountant does not need the timetable. Roles decide who sees what, and you can make your own.",
    screens: ["Admin → Staff", "Admin → Staff → Roster, Leave, Payslips", "Admin → Roles & Access", "Website → My account → My work"],
  },

  /* ------------------------------ reach ------------------------------ */
  {
    key: "website",
    group: "reach",
    highlight: true,
    title: "Your own website, on your own address",
    text: "A real website at yourgym.com — classes, prices, trainers, blog, map — in your colours.",
    points: ["Your domain, logo and colours", "People join and pay on it", "Change a price, the site follows", "Found on Google"],
    detail: "Home, classes, trainers, prices, blog, opening hours, a map and a contact form. Nothing to email us about and nothing to redeploy.",
    screens: ["Website → Home, Classes, Trainers, Memberships", "Website → Blog, About, Contact, FAQs", "Settings → Website, Logo, Colour scheme"],
  },
  {
    key: "app",
    group: "reach",
    addon: true,
    title: "A phone app for your members",
    text: "They sign in with a username you issue, and your gym is in their pocket.",
    points: ["Your logo and colours", "Book classes and check in", "Pause or cancel a membership", "Every visit and payment", "No sign-up: you issue the login"],
    detail: "One app, every gym — and it becomes yours the moment a member signs in. Only people on your books can get in. It goes on any plan for a price of its own.",
    screens: ["Member app → Home, Classes, Membership, Profile", "Member app → Check in (QR)", "Admin → Users (issues the username)"],
  },
  {
    key: "selfservice",
    group: "reach",
    title: "Members look after themselves",
    text: "Bookings, invoices, details and their check-in code — all on their own account page.",
    points: ["Their classes and PT sessions", "Every payment and invoice", "Change their own details", "Two-step sign-in and privacy", "Check-in QR in the browser too"],
    detail: "Every question a member would ask at the desk is answered on their own page. That is a quieter front desk.",
    screens: ["Website → My account → Profile", "Website → My account → My classes, Personal training", "Website → My account → History, Recent visits", "Website → My account → Check-in QR"],
  },
  {
    key: "content",
    group: "reach",
    title: "Change your website yourself",
    text: "Edit the home page, slides, blog and FAQs without waiting on a developer.",
    points: ["Home page sections and hero slides", "Blog posts and pages", "Testimonials and FAQs", "Privacy policy and terms", "Timetable you can embed anywhere"],
    detail: "Everything on the public site is edited in the admin. Drop your timetable onto another website with an embed and it stays in step.",
    screens: ["Admin → Homepage", "Admin → Hero slides", "Admin → Blogs, Blog Settings", "Admin → Pages (FAQs, privacy, terms)", "Admin → Testimonials", "Website → Embedded timetable"],
  },
  {
    key: "messaging",
    group: "reach",
    highlight: true,
    title: "Talk to members where they already are",
    text: "Email, SMS, WhatsApp and app notifications — most of it sent for you.",
    points: ["Class and renewal reminders", "Missed-you and win-back nudges", "Birthday messages", "Everyone, or just one group", "Members can opt out any time"],
    detail: "Write the wording once and GymPilot sends it on time, every time. When you want to say something yourself, you choose who hears it.",
    screens: ["Admin → Messaging", "Admin → Messaging → Campaigns & Wording", "Settings → Messaging", "Member app → Notifications"],
  },

  /* ----------------------------- control ----------------------------- */
  {
    key: "reports",
    group: "control",
    highlight: true,
    title: "See how the business is doing",
    text: "Money in, members joined, who came, which classes fill — on one screen.",
    points: ["Revenue and memberships", "Attendance and bookings", "Busy hours and quiet ones", "Download as a spreadsheet"],
    detail: "Open one screen and know how the month is going. Anything you can see, your accountant can download.",
    screens: ["Admin → Dashboard", "Admin → Reports"],
  },
  {
    key: "books",
    group: "control",
    title: "Keep the books",
    text: "Sales, expenses and equipment in one place, ready for your accountant.",
    points: ["Sales and expenses by month", "Equipment and service dates", "Filter by date or category", "CSV for the accountant"],
    detail: "What came in, what went out, and what you own. No spreadsheet to keep up to date on the side.",
    screens: ["Admin → Accounts → Overview", "Admin → Accounts → Sales, Expenses, Assets"],
  },
  {
    key: "security",
    group: "control",
    title: "Locked down by default",
    text: "Two-step sign-in, roles for staff, and a record of every change.",
    points: ["Two-factor sign-in by email", "Sign out every device at once", "Roles decide who sees what", "Audit log of every change", "Members download their own data"],
    detail: "Staff see only their part of the gym, and anything that changes is written down with who did it.",
    screens: ["Admin → Roles & Access", "Admin → Audit log", "Member → Privacy & security"],
  },
  {
    key: "setup",
    group: "control",
    title: "Set it up your way",
    text: "Country, currency, language, colours and opening hours are all switches.",
    points: ["Guided setup on day one", "Country and currency", "5 languages, right-to-left too", "8 colour schemes", "Your logo, email and bank details"],
    detail: "No code and no support ticket. Pick a currency and every price follows; pick a colour scheme and the website and the app both change.",
    screens: ["Admin → Setup (first run)", "Settings → General (Business, Money & time, Website)", "Settings → Logo, Colour Scheme", "Settings → Stripe, SMTP, Banks, Messaging"],
  },
  {
    key: "data",
    group: "control",
    title: "Your private online presence",
    text: "Your gym gets its own website, its own app and its own private database.",
    points: ["A database per gym", "Never mixed with another gym", "Export everything any time", "Still yours if you leave"],
    detail: "That is unusual, and it is why we can promise nobody else's data is ever a query away from yours.",
    screens: ["A database per gym", "Downloads from every report"],
  },
];

export const HIGHLIGHTS = FEATURES.filter((f) => f.highlight);

/** Numbers on the features page. The first is counted, never typed. */
export const FEATURE_STATS: { value: number; label: string }[] = [
  { value: FEATURES.length, label: "features, all included" },
  { value: 5, label: "languages, 2 right-to-left" },
  { value: 8, label: "colour schemes" },
  { value: 0, label: "add-ons to buy" },
];
