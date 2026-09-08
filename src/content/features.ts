// What GymPilot does, in the buyer's words.
//
// One list, used twice: the landing page shows the six marked `highlight`
// and links to /features, which shows all of them grouped, with the longer
// explanation and the screens each one actually lives on. `screens` mirrors
// the real product (GymPilot_frontend), so nothing here promises a screen
// that does not exist.

export interface Feature {
  key: string;
  group: GroupKey;
  /** On the landing page too. */
  highlight?: boolean;
  title: string;
  /** One or two sentences. Used in both places. */
  text: string;
  points: string[];
  /** The longer, plainer explanation, only on /features. */
  detail: string;
  /** Where it lives in the product. */
  screens: string[];
}

export type GroupKey = "money" | "classes" | "gym" | "reach" | "control";

export const FEATURE_GROUPS: { key: GroupKey; label: string; title: string; text: string }[] = [
  { key: "money", label: "Members & money", title: "Members and money", text: "Who trains with you, what they pay, and getting paid without chasing anyone." },
  { key: "classes", label: "Classes & training", title: "Classes and training", text: "Your timetable, your trainers, and members booking themselves in." },
  { key: "gym", label: "In the gym", title: "Day to day in the gym", text: "The front desk, the shop and your team — the parts that run while you are on the floor." },
  { key: "reach", label: "Reaching members", title: "Reaching your members", text: "Your website, your app, and the messages that bring people back." },
  { key: "control", label: "Where you stand", title: "Knowing where you stand", text: "The numbers, and the promise that your gym's data is only ever yours." },
];

export const FEATURES_INTRO = {
  eyebrow: "What's inside",
  title: "Everything a gym needs, in one app",
  text: "No extra apps to buy and nothing to bolt on. Here are the six gyms notice first — every plan has these and everything else from day one.",
  cta: "See all features",
};

export const FEATURES_PAGE = {
  eyebrow: "Every feature",
  title: "What you get with GymPilot",
  lead: "The whole product, explained in plain English — no jargon, no add-ons, nothing held back for a higher plan. Each one lists the screens it lives on, so you can see exactly what your gym is getting.",
  note: "Every feature on this page is in every plan. Plans differ only by how many members, staff, trainers and classes you have.",
};

export const FEATURES: Feature[] = [
  /* ------------------------------ money ------------------------------ */
  {
    key: "billing",
    group: "money",
    highlight: true,
    title: "Get paid on time, every time",
    text: "Members pay by card, bank transfer or cash. Renewals happen by themselves, invoices go out by themselves, and if a card fails GymPilot tries again and lets the member know.",
    points: ["Monthly and yearly memberships", "Class packs and PT packs", "Pause, upgrade or cancel in a tap", "Bank transfer with a photo of the receipt", "Invoices sent automatically"],
    detail:
      "You set up your memberships once — the price, how long they last, what they include. After that a member joins on your website, pays, and the next payment takes care of itself. If someone wants to pause for a holiday or move up a plan, they can do it themselves or you can do it for them, and the money is worked out to the day. Card money goes straight into your own Stripe account, never through us.",
    screens: ["Admin → Packages", "Admin → Package Orders", "Admin → Registrations", "Admin → Coupons", "Settings → Stripe & Banks", "Member app → Membership"],
  },
  {
    key: "members",
    group: "money",
    title: "Every member in one place",
    text: "Photo, contact details, emergency contact, health form, signed agreement, documents and notes. Bring your existing members in from a spreadsheet.",
    points: ["Health questionnaire (PAR-Q)", "Agreement signed on screen", "Import members from CSV"],
    detail:
      "No more folders behind the desk. Each member has one page with everything on it: who to call in an emergency, what they told you about their health, the agreement they signed and when, any documents you scanned, and your own private notes that only staff can see. Moving from another system? Send us your spreadsheet and your members arrive with their join dates and expiry dates intact.",
    screens: ["Admin → Users", "Admin → Users → Profile", "Settings → Memberships", "Member app → Profile"],
  },
  {
    key: "leads",
    group: "money",
    title: "Turn visitors into members",
    text: "Every enquiry from your website becomes a lead. Follow up, add notes, and turn them into a member with one click.",
    points: ["Website contact form → lead", "Follow-up notes and status", "Convert to member"],
    detail:
      "Someone fills in the form on your website asking about prices. Instead of an email you might miss, it lands in a list with a status you can move along: new, contacted, trial booked, joined. Write down what you agreed on the phone. When they sign up, one click turns the lead into a real member — no retyping.",
    screens: ["Admin → Leads", "Admin → Contact Queries", "Website → Contact"],
  },

  /* ----------------------------- classes ----------------------------- */
  {
    key: "booking",
    group: "classes",
    highlight: true,
    title: "Members book classes from their phone",
    text: "Put your classes on the timetable. Members tap to book. When a class is full they join the waitlist and get a message the moment a spot opens.",
    points: ["Waitlists that fill themselves", "Rules for late cancels and no-shows", "Holidays and cover instructors"],
    detail:
      "Your timetable goes up once and repeats every week. Members see it on your website and in the app and book themselves in, so nobody is texting you at 6am. You decide the rules: how far ahead people can book, when booking closes, how late is too late to cancel, and what happens to somebody who books and never turns up. Closing for a holiday or swapping an instructor for one day changes that day only.",
    screens: ["Admin → Classes", "Admin → Bookings", "Admin → Timetable changes", "Website → Timetable", "Member app → Bookings"],
  },
  {
    key: "pt",
    group: "classes",
    title: "Sell personal training",
    text: "Trainers set the hours they are free. Members buy a pack of sessions and book them. Each trainer's share is worked out for you.",
    points: ["Trainer calendar", "Packs of 5 or 10 sessions", "Trainer commission on the payslip"],
    detail:
      "Each trainer says which hours they are available. GymPilot takes out the classes they are already teaching and the sessions already booked, and shows members only the times that are genuinely free. Members buy a pack of sessions up front and spend them one at a time. When a session is marked done, the trainer's cut is calculated and carried through to their payslip.",
    screens: ["Admin → Personal Training", "Admin → Trainers", "Settings → Bookings & PT", "Member app → Personal training"],
  },

  /* ------------------------------- gym ------------------------------- */
  {
    key: "frontdesk",
    group: "gym",
    highlight: true,
    title: "Know who is in the gym",
    text: "Members scan a QR code or use a fingerprint at the door. If their membership has run out, the door says no and the desk sees why.",
    points: ["QR check-in on any tablet", "Fingerprint app for the front desk", "See who is inside right now"],
    detail:
      "Stand any tablet at the door and it becomes a check-in kiosk: the member shows the QR code in their app and they are in. Prefer fingerprints? There is a Windows app for the front desk that does the same thing. Either way you get an honest record of who came and when — useful for fire safety, for staffing the quiet hours, and for spotting the member who has not been in for a month.",
    screens: ["Admin → Attendance", "Kiosk (any tablet)", "Windows desktop app", "Member app → Check in"],
  },
  {
    key: "pos",
    group: "gym",
    title: "Sell drinks, supplements and lockers",
    text: "Ring up sales at the desk, keep count of stock, print or email receipts, and rent out lockers.",
    points: ["Receipts and refunds", "Stock counted for you", "Lockers given to members"],
    detail:
      "The desk becomes a till. Add a shake or a pair of gloves to a member's tab or take the money there and then; the receipt goes out by email and the stock count drops by one. When something runs low you can see it before a member does. Lockers work the same way: assign one to a member for the month, and release it when they are done.",
    screens: ["Admin → Shop / POS", "Admin → Inventory", "Admin → Lockers", "Member app → Receipts"],
  },
  {
    key: "staff",
    group: "gym",
    title: "Run your team",
    text: "Give each staff member only what they may see. Plan shifts, approve time off and create payslips in one click.",
    points: ["Manager, front desk, trainer, accountant", "Rota and time-off requests", "Payslips with PT commission"],
    detail:
      "Your receptionist does not need to see the books and your accountant does not need to edit the timetable. Roles decide who sees what, and you can make your own. Shifts go on a rota everyone can see, time-off requests come to you to approve, and at the end of the month payslips are worked out from salary or hours, minus unpaid days, plus each trainer's PT commission.",
    screens: ["Admin → Staff", "Admin → Staff → Roster, Leave, Payslips", "Admin → Roles & Access", "Member app → My work"],
  },

  /* ------------------------------ reach ------------------------------ */
  {
    key: "messaging",
    group: "reach",
    highlight: true,
    title: "Talk to members where they already are",
    text: "Send emails, texts, WhatsApp messages and app notifications. Set it up once and GymPilot reminds people about classes, renewals and birthdays by itself.",
    points: ["Email, SMS, WhatsApp and push", "Send to everyone or just a group", "Notices on your website and app", "Automatic: missed you, come back, happy birthday", "Members can opt out any time"],
    detail:
      "Most of what a gym sends is the same every week, so GymPilot sends it for you: the class reminder the evening before, the renewal notice three days out, the nudge to someone who has not been in for a fortnight, the offer to someone whose membership lapsed last month. You write the wording once. When you do want to say something yourself — a bank holiday timetable, a new class — you can send it to everyone or just to one group, and put a notice on your website at the same time.",
    screens: ["Admin → Messaging", "Admin → Messaging → Campaigns & Wording", "Settings → Messaging", "Member app → Notifications"],
  },
  {
    key: "website",
    group: "reach",
    highlight: true,
    title: "Your own website and member app",
    text: "A good-looking website on your own web address, with your logo and colours. Members install it as an app on their phone, and Google can find you.",
    points: ["Your own domain, like yourgym.com", "Your logo, colours and photos", "Works as an app on any phone", "Classes, trainers, prices, blog, map and hours"],
    detail:
      "This is the part most gym software leaves out. You get a real website at your own address — home page, classes, trainers, prices, blog, opening hours, a map and a contact form — with your logo and a colour scheme you pick. People join and pay on it. Members add it to their phone's home screen and from then on it behaves like an app, notifications and all. Change your prices in the admin and the website changes with them; there is nobody to email and nothing to redeploy.",
    screens: ["Website → Home, Classes, Trainers, Memberships", "Website → Blog, About, Contact, FAQs", "Admin → Homepage, Hero slides, Testimonials", "Admin → Blogs & Pages", "Settings → Website, Logo, Colour scheme"],
  },

  /* ----------------------------- control ----------------------------- */
  {
    key: "reports",
    group: "control",
    highlight: true,
    title: "See how the business is doing",
    text: "Money in, members joined, who came in, which classes are full — on one screen, with a download for your accountant.",
    points: ["Revenue and memberships", "Attendance and bookings", "Expenses and downloads (CSV)"],
    detail:
      "Open one screen and know how the month is going: what came in, how many joined, how many left, which hours are busy and which classes never fill. The books add up your sales, your expenses and your equipment in one place. Anything you can see, your accountant can download as a spreadsheet.",
    screens: ["Admin → Dashboard", "Admin → Reports", "Admin → Accounts (books)", "Admin → Audit log"],
  },
  {
    key: "data",
    group: "control",
    title: "Your private online presence",
    text: "Your gym gets its own website, its own app and its own private database — never mixed with another gym. Use it in English, Arabic, Urdu, Spanish or French.",
    points: ["Your own website, app and database", "Never mixed with anyone else's", "5 languages, right-to-left too", "Export your data any time"],
    detail:
      "Your members, payments and attendance live in a database of your own, not in a shared pile with every other gym. That is unusual, and it is the reason we can promise that nobody else's data is ever a query away from yours. Everything is in your language — including Arabic and Urdu, which read right to left — and you can download the lot whenever you want. It is your business; it should be your data.",
    screens: ["A database per gym", "5 languages across website, app and admin", "Downloads from every report"],
  },
];

export const HIGHLIGHTS = FEATURES.filter((f) => f.highlight);
