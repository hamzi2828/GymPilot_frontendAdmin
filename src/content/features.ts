// What GymPilot does, in the buyer's words.
//
// One list, used in three places: the landing page shows the six marked
// `highlight`, /features shows all of them grouped, and every feature has a
// page of its own at /features/<slug>. `screens` mirrors the real product
// (GymPilot_frontend, the member app and the Windows desk app), so nothing
// here promises a screen that does not exist.
//
// Honesty rule: every claim here is something the product does today. Money
// taken at the desk (cash, card terminal, bank transfer, JazzCash, Easypaisa,
// other wallets) is *recorded* as how the member paid -- GymPilot is not a
// payment gateway for those. Only cards online go through Stripe.
//
// House style: `text` is one sentence a busy owner reads in a glance,
// `points` are three to five short phrases, and `body` is two or three short
// paragraphs for the feature's own page. If a paragraph needs a second
// breath, it is not written plainly enough.
//
// `slug` is the feature's web address. Changing one breaks every link and
// search result that points at it, so add new features rather than renaming.

export type GroupKey = "desk" | "checkin" | "money" | "shop" | "classes" | "team" | "reach" | "control";

export type FeatureKey =
  | "members"
  | "desksale"
  | "dues"
  | "renewals"
  | "logins"
  | "import"
  | "frontdesk"
  | "alerts"
  | "attendance"
  | "billing"
  | "offers"
  | "reports"
  | "dailysales"
  | "books"
  | "assets"
  | "pos"
  | "receipts"
  | "booking"
  | "pt"
  | "staff"
  | "trainerpay"
  | "website"
  | "content"
  | "app"
  | "selfservice"
  | "messaging"
  | "leads"
  | "setup"
  | "security"
  | "data"
  | "backups";

export interface Feature {
  /** Internal name: pictures, icons and related links are keyed by it. */
  key: FeatureKey;
  /** The page's address, /features/<slug>. Never change a published one. */
  slug: string;
  group: GroupKey;
  /** On the landing page too. */
  highlight?: boolean;
  /** Two or three words, for menus, breadcrumbs and cards. */
  name: string;
  /** The headline on its own page. */
  title: string;
  /** One sentence: the short summary everywhere it appears. */
  text: string;
  /** Two or three short paragraphs, on the feature's own page. */
  body: string[];
  /** What it does, three to five short phrases. */
  points: string[];
  /** Where it lives in the product. */
  screens: string[];
  /** Features a reader of this one usually wants next. */
  related?: FeatureKey[];
  /** Bought alongside a plan rather than included in it. */
  addon?: boolean;
}

export const FEATURE_GROUPS: { key: GroupKey; label: string; title: string; text: string }[] = [
  { key: "desk", label: "Front desk & fees", title: "The front desk and the fees", text: "Signing people up, taking the money and knowing who owes what — without a ledger behind the counter." },
  { key: "checkin", label: "Check-in", title: "Checking people in", text: "Fingerprint, QR code or member ID — and the desk told, out loud, when a fee needs paying." },
  { key: "money", label: "Money & reports", title: "Money and reports", text: "Getting paid, and knowing to the day what came in, what went out and what is left." },
  { key: "shop", label: "Shop & receipts", title: "The shop and the till", text: "Drinks, supplements, kit and lockers sold over the counter, with a receipt from your own receipt printer." },
  { key: "classes", label: "Classes & PT", title: "Classes and personal training", text: "Your timetable, your trainers' diaries, and members booking themselves in." },
  { key: "team", label: "Staff & trainers", title: "Your staff and trainers", text: "Rotas, leave and payslips for the team — and trainers paid a salary, a commission or both." },
  { key: "reach", label: "Website, app & messages", title: "Reaching your members", text: "Your website, your app, and the messages that bring people back." },
  { key: "control", label: "Data & security", title: "Set up, locked down, backed up", text: "Your settings, who sees what, and data that is only ever yours — with a fresh copy every night." },
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
  lead: "Every feature, in plain English. All of them are in every plan — plans differ only by how many members, staff and classes you have. The member app is the one thing you can add on top.",
  note: "Nothing on this page is an upgrade or an extra monthly fee — except the member app, which goes on any plan for a price of its own.",
};

export const FEATURES: Feature[] = [
  /* ------------------------------- desk ------------------------------- */
  {
    key: "members",
    slug: "member-records",
    group: "desk",
    name: "Member records",
    title: "Every member in one place",
    text: "Contact details, member ID, health form, signed agreement, documents and private notes on one page.",
    body: [
      "One page per member instead of a folder behind the desk: phone, address, date of birth, emergency contact, the health questionnaire, the agreement they signed on screen, their documents, and notes only staff can see.",
      "Every member gets an ID the moment their account is made — GP-0001, GP-0002 and on — so the desk finds anyone by name, phone number or member ID, and a member whose phone is flat can still be checked in by number.",
    ],
    points: ["Member ID from day one (GP-0001)", "Find anyone by name, phone or ID", "Health questionnaire (PAR-Q)", "Agreement signed on screen", "Staff-only notes and documents"],
    screens: ["Admin → Users", "Admin → Users → Profile", "Settings → Memberships", "Member app → Profile"],
    related: ["desksale", "import", "frontdesk"],
  },
  {
    key: "desksale",
    slug: "desk-sign-up",
    group: "desk",
    name: "Desk sign-up",
    title: "Sign members up at the desk",
    text: "Pick the package, set the start date, take off a discount, add a trainer and record how they paid.",
    body: [
      "Someone walks in and wants to join. Add them — an email address is optional, a phone number will do — choose their package and take the money. They have a member ID straight away, and an invoice as soon as they have paid.",
      "Start them today or in a few days' time. Take a discount off the package with a note of why, add the admission fee — charged once, on a member's first membership, and yours to waive — and sell a personal trainer with it, with the trainer's fee and commission on the same sale.",
      "Record how they paid: cash, a card on your own terminal, bank transfer, JazzCash, Easypaisa or another mobile wallet. These are payment methods you record, not a payment gateway — the money reaches you as it always has. Taking only part of it today? Record what they gave, and the rest is a balance due.",
    ],
    points: ["Start today or after a set number of days", "Discount with a note", "Admission fee once, or waived", "Trainer, fee and commission in the same sale", "Cash, card, bank, JazzCash, Easypaisa, wallets"],
    screens: ["Admin → Users → New User", "Admin → Package Orders → Assign Package", "Admin → Packages"],
    related: ["dues", "renewals", "trainerpay"],
  },
  {
    key: "dues",
    slug: "part-payments-and-dues",
    group: "desk",
    name: "Part payments & dues",
    title: "Part payments, and who still owes",
    text: "Take part of the fee today, record the rest as it comes in, and always know who owes what.",
    body: [
      "Plenty of members pay in instalments. Sell the membership with what they paid today and it starts at once; the rest is a balance due, on the membership and on their invoice.",
      "When they bring the next part, record it against the balance — cash, card, bank transfer or wallet — and the invoice lists every payment received. One tick on Package Orders shows only the members who still owe.",
      "The desk is reminded too. A member with money owing is checked in as normal, with an amber “Balance due” warning and, if you want it, a spoken “Please clear your balance”.",
    ],
    points: ["Pay part now, the rest later", "Every instalment recorded with its method", "Balance shown on the invoice", "Filter to members who owe", "Balance due flagged at check-in"],
    screens: ["Admin → Package Orders → Record payment", "Admin → Package Orders → Has dues", "Admin → Dashboard", "Windows desk app and kiosk"],
    related: ["desksale", "alerts", "dailysales"],
  },
  {
    key: "renewals",
    slug: "renewals-and-fees-due",
    group: "desk",
    name: "Renewals & fees due",
    title: "Fees due, renewals and changes",
    text: "See whose fee runs out this week, renew at the desk, and change a membership's dates with a record of every change.",
    body: [
      "The dashboard lists the members whose fee runs out in the next seven days, and GymPilot reminds them before it does. Send a campaign to everyone whose membership is ending soon, or has ended, in a couple of clicks.",
      "Renew at the desk and the new term starts when the current one ends, so nobody loses days by paying early — and nobody pays the admission fee twice.",
      "Got a date wrong, or agreed a discount after the sale? Change the dates on a membership — or its discount, when it was paid at the desk. The total and the balance follow, the invoice keeps its number, and every change is kept with who made it and when.",
    ],
    points: ["Fees due in the next 7 days, on the dashboard", "Renew without losing days", "Edit dates and discount after the sale", "A history of every change", "Messages to members ending soon or lapsed"],
    screens: ["Admin → Dashboard", "Admin → Package Orders → Renew, Edit terms", "Admin → Messaging → Campaigns"],
    related: ["dues", "messaging", "desksale"],
  },
  {
    key: "logins",
    slug: "members-without-email",
    group: "desk",
    name: "Members without email",
    title: "Members without an email address",
    text: "Add members with just a phone number, and give them a username and password yourself.",
    body: [
      "Not every member has an email address, or wants to hand one over. A phone number is enough to add them, at the desk or in an import.",
      "They sign in with a username instead. Staff type a password for them, or have GymPilot make a strong one — shown once, with a copy button, to hand over there and then. No reset email needed, and any session they already had is signed out.",
      "Staff accounts work the same way: sign in with an email or a username, and a manager can set a password without anyone waiting for an email.",
    ],
    points: ["A phone number is enough", "Sign in with a username", "Set or generate a password", "Shown once, never emailed", "Old sessions signed out"],
    screens: ["Admin → Users → New User", "Admin → Users → Set password", "Admin → Staff → Set password", "Sign-in page"],
    related: ["members", "import", "security"],
  },
  {
    key: "import",
    slug: "switch-from-other-software",
    group: "desk",
    name: "Switch from other software",
    title: "Bring your members across",
    text: "Import members and their memberships from a spreadsheet, and check the result before anything is saved.",
    body: [
      "Export a CSV from the system you use now and import it into GymPilot. Column names are matched loosely — “First Name”, “firstname” and “first_name” all work — and there is a template to download if you are starting from a blank sheet.",
      "A preview comes first: how many members will be created, which columns were recognised, and every row with a problem, by line number. Nothing is saved until you say so.",
      "Members arrive with their joining date, their member number from the old system if it is free, and their package with its start and end dates — so renewals fall where they did before. Nobody is charged an admission fee for a gym they already belong to.",
    ],
    points: ["Loose column matching, template included", "Preview before anything is saved", "Keeps joining dates and old member numbers", "Memberships with their dates", "Rows without an email are fine"],
    screens: ["Admin → Users → Import CSV"],
    related: ["members", "logins", "desksale"],
  },

  /* ----------------------------- check-in ----------------------------- */
  {
    key: "frontdesk",
    slug: "check-in",
    group: "checkin",
    highlight: true,
    name: "Check-in",
    title: "Know who is in the gym",
    text: "Fingerprint, QR code or member ID at the desk — and a lapsed fee is flagged the moment they arrive.",
    body: [
      "Three ways in, all writing to the same register. At the counter, the GymPilot desk app for Windows reads fingerprints on a DigitalPersona USB reader. Any tablet or PC with a browser becomes a kiosk that scans a member's QR code with its camera, takes a typed member ID, or lets staff pick a name. And members carry their own QR code on their phone.",
      "A member whose fee has run out is still checked in — so you know the visit happened — but the desk sees it in red and hears it, and can have a word there and then. Staff clock in on the same reader, against their rota.",
      "Fingerprints are only linked with the member's consent, and are stored encrypted.",
    ],
    points: ["Fingerprint on the Windows desk app", "QR kiosk on any tablet", "Member ID when a phone is flat", "Member QR that refreshes itself", "Staff clock in on the same reader"],
    screens: ["Windows desk app", "Kiosk (any tablet)", "Website → My account → Check-in QR", "Admin → Fingerprints"],
    related: ["alerts", "attendance", "members"],
  },
  {
    key: "alerts",
    slug: "check-in-alerts",
    group: "checkin",
    name: "Voice alerts",
    title: "It says “Fee expired” out loud",
    text: "A different sound for each kind of check-in, then your own words spoken: “Fee expired, please renew”.",
    body: [
      "The desk is busy, and nobody reads every screen. So every check-in has a sound, and no two kinds share one: all is well, a fee running out or money owed, and a problem such as an expired membership each sound different — and on the desk app, so does a finger nobody recognises.",
      "Then the desk speaks. Out of the box it says “Fee expired, please renew” for a lapsed or unpaid membership, “Your fee expires soon” for one running out, and “Please clear your balance” when money is owed. Change the words, or turn the voice off, under Attendance → Desk settings; the next scan uses them.",
      "The Windows desk app and the web kiosk play the same alerts, because the server decides which one each check-in gets — so the two never disagree.",
    ],
    points: ["A distinct sound for each kind of check-in", "Your own words, spoken", "“Balance due” warning in amber", "Same on the desk app and the kiosk", "Voice can be switched off"],
    screens: ["Admin → Attendance → Desk settings", "Windows desk app", "Kiosk (any tablet)"],
    related: ["frontdesk", "attendance", "dues"],
  },
  {
    key: "attendance",
    slug: "live-attendance",
    group: "checkin",
    name: "Live attendance",
    title: "Today's attendance, live",
    text: "Everyone who came in today, who is still inside, and who walked in paid or unpaid — updating as you watch.",
    body: [
      "Attendance → Today is the desk's view of the day. Every visit, newest first: arrival number, member ID, name, phone, package, when it runs out, time in and out, and a status — Paid, Unpaid, Expiring, Balance due or Frozen. It refreshes itself every 15 seconds.",
      "Across the top are the day's counts: visits, members, staff, who is in now, and how many came in paid, unpaid or still owing. The dashboard shows the same paid and unpaid numbers, counted the same way.",
      "Mistakes happen. Fix a check-in or check-out time with a note, or void a visit that should not count — the history is kept. Visits nobody checked out of are closed overnight and marked “No check-out”, without inventing a time.",
    ],
    points: ["Refreshes every 15 seconds", "Paid, unpaid and balance-due counts", "Member ID, phone and expiry on every row", "Fix times or void visits, with history", "Staff early, on time or late"],
    screens: ["Admin → Attendance → Today · live", "Admin → Dashboard", "Windows desk app → live board"],
    related: ["frontdesk", "alerts", "reports"],
  },

  /* ------------------------------- money ------------------------------ */
  {
    key: "billing",
    slug: "online-payments",
    group: "money",
    highlight: true,
    name: "Online payments",
    title: "Get paid on time, every time",
    text: "Cards online through your own Stripe, bank transfer with a receipt, and renewals that happen without you asking.",
    body: [
      "Set your prices once. Members join on your website and pay by card; recurring memberships renew by themselves, failed payments are retried, and the member is emailed a link to update their card. Card money goes straight into your own Stripe account, never through us.",
      "Prefer bank transfer? Members see your bank details at checkout and upload their receipt; you confirm it or reject it. Invoices go out by themselves, with the tax shown.",
      "Members can pause or cancel within the rules you set, and a change of package is priced fairly for the days that are left.",
    ],
    points: ["Monthly, yearly and class packs", "Renews and retries by itself", "Invoices sent automatically", "Pause, upgrade or cancel in a tap", "Card money into your own Stripe"],
    screens: ["Admin → Packages", "Admin → Package Orders", "Admin → Registrations", "Settings → Stripe & Banks", "Member app → Membership"],
    related: ["dues", "offers", "desksale"],
  },
  {
    key: "offers",
    slug: "discount-codes",
    group: "money",
    name: "Discount codes",
    title: "Discount codes and joining offers",
    text: "Make a code, choose what it takes off, and set when it stops working.",
    body: [
      "Make a code, choose whether it takes off a percentage or a fixed amount, and pick the packages it works on. Members type it at checkout, whichever way they pay.",
      "It stops working on the date you set, or after the number of uses you allow — and you decide whether it counts once or on every renewal.",
    ],
    points: ["Percent off or a fixed amount", "Start and end dates", "Limit how many can use it", "One package or all of them", "First payment or every renewal"],
    screens: ["Admin → Coupons", "Website → Packages & Checkout"],
    related: ["billing", "leads", "messaging"],
  },
  {
    key: "reports",
    slug: "dashboard-and-reports",
    group: "money",
    highlight: true,
    name: "Dashboard & reports",
    title: "See how the business is doing",
    text: "Today's money and visitors on the dashboard; any period, and every download, in Reports.",
    body: [
      "Open the dashboard and today is on one screen: money in, expenses paid, who came in paid or unpaid, and the fees due in the next seven days. Below it, the month so far — revenue, expenses and new members.",
      "Reports go further: revenue, memberships, new registrations per day, attendance, bookings, and your busy hours and quiet ones — for any dates you pick. The net figure is the same profit and loss the Accounts screen shows, so the two never argue.",
      "Anything you can see, your accountant can have. Every export downloads as CSV or as a real Excel workbook, and every report prints — or saves as a PDF — as a tidy A4 page with your gym's name and the dates on it.",
    ],
    points: ["Today's money and visitors", "Fees due this week", "Any date range", "CSV or Excel (.xlsx)", "Print or save as PDF"],
    screens: ["Admin → Dashboard", "Admin → Reports", "Admin → Reports → Print / PDF"],
    related: ["dailysales", "books", "attendance"],
  },
  {
    key: "dailysales",
    slug: "daily-sales-report",
    group: "money",
    name: "Daily sales report",
    title: "What each day took, and how it was paid",
    text: "Every day's takings split into sign-ups, renewals, admission, trainer fees, dues and the shop — and by payment method.",
    body: [
      "Close the day knowing exactly what came in. For every day in the range: new sign-ups, renewals, admission fees, trainer fees, dues collected, refunds and shop sales, adding up to the day's total — the same figure the Accounts screen has for that day.",
      "Underneath, the totals by payment method: cash, card at the desk, card online, bank transfer, JazzCash, Easypaisa and other mobile wallets. Count the drawer against the cash line and you are done.",
      "Download it as a CSV with a totals row, or as an Excel workbook with a second sheet by payment method — or print it.",
    ],
    points: ["Sign-ups, renewals, admission, trainer fees", "Dues collected and refunds", "Shop sales in the same table", "Totals by payment method", "CSV, Excel or print"],
    screens: ["Admin → Reports → Daily sales"],
    related: ["books", "dues", "pos"],
  },
  {
    key: "books",
    slug: "profit-and-loss",
    group: "money",
    name: "Profit & loss",
    title: "Profit and loss, line by line",
    text: "Membership, admission, trainer fees and the shop, set against commission, expenses, equipment and salaries.",
    body: [
      "Accounts → Overview is your profit and loss for any period — today, this month, or dates you choose. Money in: membership fees, admission fees, trainer fees and shop sales, less refunds. Money out: trainer commission, expenses, equipment bought and salaries.",
      "Each cost is counted once, so a payslip or an equipment purchase is never taken off twice. Expenses go under heads — rent, utilities, maintenance and the rest — and you can add your own, rename them, or retire one without losing the old entries.",
      "Find any sale by order number, name, phone or member ID, and hand your accountant the CSV.",
    ],
    points: ["Money in: membership, admission, trainers, shop", "Money out: commission, expenses, equipment, salaries", "Each cost counted once", "Your own expense heads", "CSV for the accountant"],
    screens: ["Admin → Accounts → Overview", "Admin → Accounts → Sales, Expenses", "Admin → Accounts → Manage heads"],
    related: ["dailysales", "assets", "trainerpay"],
  },
  {
    key: "assets",
    slug: "asset-register",
    group: "money",
    name: "Asset register",
    title: "Know what you own, and when it is due a service",
    text: "Every machine with its price, warranty and service dates — and a reminder before either comes round.",
    body: [
      "Put every treadmill, rack and air conditioner on the register: what it cost, when you bought it, the invoice number, when the warranty ends and when it is next due a service. File them under your own asset heads.",
      "The bell in the admin tells you when a service is due within seven days or is overdue, and when a warranty ends within 30 days — one click lands on exactly those items.",
      "Filter the register by purchase date; equipment bought in a period counts in that period's profit and loss.",
    ],
    points: ["Cost, purchase date and invoice number", "Warranty end date", "Service due dates", "Reminders in the admin bell", "Your own asset heads"],
    screens: ["Admin → Accounts → Assets", "Admin header → bell"],
    related: ["books", "reports", "dailysales"],
  },

  /* ------------------------------- shop ------------------------------- */
  {
    key: "pos",
    slug: "point-of-sale",
    group: "shop",
    name: "Shop & till",
    title: "Sell drinks, kit and lockers",
    text: "Ring up a basket at the desk, see the tax and the change before you take payment, and know what each sale made.",
    body: [
      "The desk becomes a till. Add products to a basket and see each line, the discount, the tax included and the total before you take the money. On cash, type what they handed over and the change is worked out for you.",
      "Record how they paid — cash, card, bank transfer, JazzCash, Easypaisa or another mobile wallet — or put it on the member's account. Stock counts drop by themselves and you are warned before something runs out. Lockers are rented out from the same place.",
      "Managers see what each sale cost and what it made, for any dates, and can export the lot as a CSV.",
    ],
    points: ["Basket with tax and discount", "Change worked out on cash", "Stock counted, low stock warned", "Profit per sale for managers", "Sales export (CSV)"],
    screens: ["Admin → Shop / POS", "Admin → Inventory", "Admin → Lockers", "Website → My account (their receipts)"],
    related: ["receipts", "dailysales", "books"],
  },
  {
    key: "receipts",
    slug: "thermal-receipts",
    group: "shop",
    name: "Thermal receipts",
    title: "Receipts from your receipt printer",
    text: "Till receipts sized for 80 mm or 58 mm thermal rolls, with your logo, address and tax number on them.",
    body: [
      "Press Print and the receipt goes to your thermal printer on its own — not the whole page — one receipt as long as the sale and as wide as the roll, 80 mm or 58 mm.",
      "It carries your letterhead: the gym's name and logo, address, phone and email, your tax label and number, and a footer you write — a returns policy, opening hours, a thank-you. Preview it in Receipt settings before the first one prints.",
    ],
    points: ["80 mm or 58 mm rolls", "Your logo and details", "Tax label and number", "Your own footer line", "Prints the receipt alone"],
    screens: ["Admin → Shop / POS → Receipt settings", "Admin → Shop / POS → Print"],
    related: ["pos", "dailysales", "setup"],
  },

  /* ------------------------------ classes ----------------------------- */
  {
    key: "booking",
    slug: "class-booking",
    group: "classes",
    highlight: true,
    name: "Class booking",
    title: "Members book classes from their phone",
    text: "Your timetable goes up once; members tap to book and waitlists fill themselves.",
    body: [
      "Put your timetable up once and it repeats every week. Members book from their phone or your website, and when a class is full they join the waitlist — which moves up on its own when someone drops out.",
      "Nobody texts you at 6am. You decide how far ahead people can book, when booking closes, how late is too late to cancel and what happens to no-shows. Holidays and cover instructors are a change to one date, not the whole timetable.",
    ],
    points: ["Repeats every week", "Waitlist moves up on its own", "Rules for late cancels and no-shows", "Holidays and cover instructors"],
    screens: ["Admin → Classes", "Admin → Bookings", "Admin → Timetable changes", "Website → Timetable", "Member app → Classes"],
    related: ["pt", "app", "messaging"],
  },
  {
    key: "pt",
    slug: "personal-training",
    group: "classes",
    name: "Personal training",
    title: "Sell personal training",
    text: "Trainers set their free hours; members buy a pack and book the slots.",
    body: [
      "Each trainer has their own calendar and sets the hours they take clients. Members buy a pack of sessions and book straight into a free slot.",
      "Classes and sessions already booked are taken out automatically, so a member can only pick a time the trainer is really free. Every completed session carries the trainer's commission.",
    ],
    points: ["Trainer's own calendar", "Packs of 5 or 10 sessions", "Only genuinely free times shown", "Commission on every session"],
    screens: ["Admin → Personal Training", "Admin → Trainers", "Settings → Bookings & PT", "Member app → Personal training"],
    related: ["trainerpay", "booking", "app"],
  },

  /* ------------------------------- team ------------------------------- */
  {
    key: "staff",
    slug: "staff-and-payroll",
    group: "team",
    name: "Staff & payslips",
    title: "Run your team",
    text: "Rotas, time off and payslips — and everyone sees only their own part.",
    body: [
      "Put the rota up where everyone can see it, approve time off, and run payslips with personal training commission already on them. Staff see their own shifts and payslips from their account.",
      "Your receptionist does not need the books and your accountant does not need the timetable. Roles decide who sees what — manager, front desk, trainer, accountant — and you can make your own.",
    ],
    points: ["Manager, front desk, trainer, accountant", "Shift rota everyone can see", "Time-off requests to approve", "Payslips with PT commission", "Staff see their own shifts online"],
    screens: ["Admin → Staff", "Admin → Staff → Roster, Leave, Payslips", "Admin → Roles & Access", "Website → My account → My work"],
    related: ["trainerpay", "security", "attendance"],
  },
  {
    key: "trainerpay",
    slug: "trainer-pay",
    group: "team",
    name: "Trainer pay",
    title: "Trainers paid by salary, commission or both",
    text: "Give each trainer a salary, a commission per session — a percentage or a fixed amount — or both.",
    body: [
      "Every trainer can have a salary, commission only, or both. Commission is a percentage of the session or a fixed amount per session, set for each trainer — or left alone, so your gym's default percentage applies.",
      "Sell a trainer with a membership at the desk and their fee and commission are recorded on the sale. Completed personal training sessions carry the commission they earned.",
      "Trainers with a staff account are paid through payslips, commission included; for the rest, GymPilot shows what they are owed so you can pay them by hand. Either way it lands in your profit and loss.",
    ],
    points: ["A salary, or commission only", "Percent or fixed commission per session", "Trainer sold with a membership", "Commission on every completed session", "Counted in profit and loss"],
    screens: ["Admin → Trainers", "Admin → Personal Training", "Admin → Staff → Payslips"],
    related: ["pt", "staff", "books"],
  },

  /* ------------------------------- reach ------------------------------ */
  {
    key: "website",
    slug: "gym-website",
    group: "reach",
    highlight: true,
    name: "Your own website",
    title: "Your own website, on your own address",
    text: "A real website at yourgym.com — classes, prices, trainers, blog, map — in your colours.",
    body: [
      "Home, classes, trainers, prices, blog, opening hours, a map and a contact form, on your own web address with the padlock. People join and pay on it.",
      "Change a price in the admin and the website follows. Nothing to email us about and nothing to redeploy — and search engines see a real business, not a page on someone else's platform.",
    ],
    points: ["Your domain, logo and colours", "People join and pay on it", "Change a price, the site follows", "Found on Google"],
    screens: ["Website → Home, Classes, Trainers, Memberships", "Website → Blog, About, Contact, FAQs", "Settings → Website, Logo, Colour scheme"],
    related: ["content", "app", "leads"],
  },
  {
    key: "content",
    slug: "website-editor",
    group: "reach",
    name: "Website editor",
    title: "Change your website yourself",
    text: "Edit the home page, slides, blog and FAQs without waiting on a developer.",
    body: [
      "Everything on the public site is edited in the admin: the home page sections and hero slides, blog posts, testimonials, FAQs, your privacy policy and terms.",
      "Want your timetable on another website too? Drop it in with an embed and it stays in step with the real one.",
    ],
    points: ["Home page sections and hero slides", "Blog posts and pages", "Testimonials and FAQs", "Privacy policy and terms", "Timetable you can embed anywhere"],
    screens: ["Admin → Homepage", "Admin → Hero slides", "Admin → Blogs, Blog Settings", "Admin → Pages (FAQs, privacy, terms)", "Admin → Testimonials", "Website → Embedded timetable"],
    related: ["website", "setup", "messaging"],
  },
  {
    key: "app",
    slug: "member-app",
    group: "reach",
    addon: true,
    name: "Member app",
    title: "A phone app for your members",
    text: "They sign in with a username you issue, and your gym is in their pocket.",
    body: [
      "One app, every gym — and it becomes yours the moment a member signs in: your logo, your colours, your classes. Members book, check in with their QR code, pause or cancel, and see every visit and payment.",
      "Only people on your books can get in, because you issue the login. It goes on any plan for a price of its own.",
    ],
    points: ["Your logo and colours", "Book classes and check in", "Pause or cancel a membership", "Every visit and payment", "No sign-up: you issue the login"],
    screens: ["Member app → Home, Classes, Membership, Profile", "Member app → Check in (QR)", "Admin → Users (issues the username)"],
    related: ["selfservice", "booking", "frontdesk"],
  },
  {
    key: "selfservice",
    slug: "member-accounts",
    group: "reach",
    name: "Member self-service",
    title: "Members look after themselves",
    text: "Bookings, invoices, details and their check-in code — all on their own account page.",
    body: [
      "Every question a member would ask at the desk is answered on their own page: their classes and PT sessions, every payment and invoice, their visits, and their check-in QR code.",
      "They change their own details, switch on two-step sign-in and download a copy of their data. That is a quieter front desk.",
    ],
    points: ["Their classes and PT sessions", "Every payment and invoice", "Change their own details", "Two-step sign-in and privacy", "Check-in QR in the browser too"],
    screens: ["Website → My account → Profile", "Website → My account → My classes, Personal training", "Website → My account → History, Recent visits", "Website → My account → Check-in QR"],
    related: ["app", "billing", "frontdesk"],
  },
  {
    key: "messaging",
    slug: "messaging",
    group: "reach",
    highlight: true,
    name: "Email, SMS & WhatsApp",
    title: "Talk to members where they already are",
    text: "Email, SMS, WhatsApp and app notifications — most of it sent for you.",
    body: [
      "Class reminders, renewal reminders, missed-you nudges, win-back offers and birthday messages go out by themselves. Write the wording once and GymPilot sends it on time, every time.",
      "When you want to say something yourself, choose who hears it — everyone, members ending soon, lapsed members or one group — and members can opt out whenever they like.",
    ],
    points: ["Class and renewal reminders", "Missed-you and win-back nudges", "Birthday messages", "Everyone, or just one group", "Members can opt out any time"],
    screens: ["Admin → Messaging", "Admin → Messaging → Campaigns & Wording", "Settings → Messaging", "Member app → Notifications"],
    related: ["renewals", "leads", "app"],
  },
  {
    key: "leads",
    slug: "leads",
    group: "reach",
    name: "Leads & enquiries",
    title: "Turn enquiries into members",
    text: "Every website enquiry becomes a lead you can follow up and convert.",
    body: [
      "Nothing gets lost in an inbox. Every enquiry from your website becomes a lead, due for a follow-up the same day.",
      "Move a lead along as you talk to them — new, contacted, trial, joined — with notes from every call, and turn them into a member without retyping anything.",
    ],
    points: ["Contact form becomes a lead", "New, contacted, trial, joined", "Notes from every call", "One click to make them a member"],
    screens: ["Admin → Leads", "Admin → Contact Queries", "Website → Contact"],
    related: ["website", "offers", "messaging"],
  },

  /* ------------------------------ control ----------------------------- */
  {
    key: "setup",
    slug: "setup-and-settings",
    group: "control",
    name: "Setup & settings",
    title: "Set it up your way",
    text: "Country, currency, language, colours and opening hours are all switches.",
    body: [
      "A guided setup on day one, then everything is a setting: country, currency, time zone, language, opening hours, your logo, email and bank details.",
      "No code and no support ticket. Pick a currency and every price follows; pick a colour scheme and the website and the app both change.",
    ],
    points: ["Guided setup on day one", "Country and currency", "5 languages, right-to-left too", "8 colour schemes", "Your logo, email and bank details"],
    screens: ["Admin → Setup (first run)", "Settings → General (Business, Money & time, Website)", "Settings → Logo, Colour Scheme", "Settings → Stripe, SMTP, Banks, Messaging"],
    related: ["website", "security", "backups"],
  },
  {
    key: "security",
    slug: "security",
    group: "control",
    name: "Security & roles",
    title: "Locked down by default",
    text: "Two-step sign-in, roles for staff, and a record of every change.",
    body: [
      "Staff see only their part of the gym: roles decide who sees what, and you can make your own. Two-step sign-in sends a code by email, and you can sign out every device at once.",
      "Anything that changes is written down with who did it, in an audit log that even a restore leaves alone. Members can download a copy of their own data.",
    ],
    points: ["Two-factor sign-in by email", "Sign out every device at once", "Roles decide who sees what", "Audit log of every change", "Members download their own data"],
    screens: ["Admin → Roles & Access", "Admin → Audit log", "Member → Privacy & security"],
    related: ["backups", "data", "staff"],
  },
  {
    key: "data",
    slug: "private-database",
    group: "control",
    name: "Private database",
    title: "Your private online presence",
    text: "Your gym gets its own website, its own app and its own private database.",
    body: [
      "Every gym on GymPilot has a database of its own, never mixed with another gym's. That is unusual, and it is why we can promise nobody else's data is ever a query away from yours.",
      "Export everything any time, and it is still yours if you leave.",
    ],
    points: ["A database per gym", "Never mixed with another gym", "Export everything any time", "Still yours if you leave"],
    screens: ["A database per gym", "Downloads from every report", "Settings → Data & backup"],
    related: ["backups", "security", "import"],
  },
  {
    key: "backups",
    slug: "backups",
    group: "control",
    name: "Backups & restore",
    title: "A backup every night, and a restore that is safe",
    text: "Download the whole gym whenever you like; every night an encrypted copy is kept, the last seven at a time.",
    body: [
      "Every night GymPilot makes a backup of your gym, encrypts it before it is stored, and keeps the last seven. Need one right now — before a big import, say? Press Back up now.",
      "The whole gym is yours to download too, as one file any archive tool opens: members, memberships, payments, attendance, settings — everything. Keys for Stripe, email and messaging stay sealed inside it.",
      "Restoring is careful. GymPilot reads the whole backup and shows you what is in it first, you confirm by typing your gym's short name, and a backup of the gym as it is now is taken before anything changes. If anything goes wrong on the way, the gym is left exactly as it was. Only administrators can do it, and the audit log keeps every step.",
    ],
    points: ["Nightly encrypted backup, 7 kept", "Back up now, any time", "Download the whole gym", "Preview before restoring", "Safety copy before every restore"],
    screens: ["Settings → Data & backup"],
    related: ["data", "security", "import"],
  },
];

export const HIGHLIGHTS = FEATURES.filter((f) => f.highlight);

const BY_KEY = new Map(FEATURES.map((f) => [f.key, f]));
const BY_SLUG = new Map(FEATURES.map((f) => [f.slug, f]));

export function featureByKey(key: FeatureKey): Feature {
  const feature = BY_KEY.get(key);
  if (!feature) throw new Error(`No feature called "${key}"`);
  return feature;
}

export function featureBySlug(slug: string): Feature | undefined {
  return BY_SLUG.get(slug);
}

/** Where a feature's own page lives. */
export function featureHref(key: FeatureKey): string {
  return `/features/${featureByKey(key).slug}`;
}

export function featuresIn(group: GroupKey): Feature[] {
  return FEATURES.filter((f) => f.group === group);
}

export function groupOf(feature: Feature) {
  return FEATURE_GROUPS.find((g) => g.key === feature.group)!;
}

/** The features a page points onwards to: its own picks, else its group. */
export function relatedTo(feature: Feature): Feature[] {
  const picks = feature.related?.length ? feature.related.map(featureByKey) : featuresIn(feature.group).filter((f) => f.key !== feature.key);
  return picks.slice(0, 3);
}

/** Numbers on the features page. The first is counted, never typed. */
export const FEATURE_STATS: { value: number; label: string }[] = [
  { value: FEATURES.filter((f) => !f.addon).length, label: "features in every plan" },
  { value: 5, label: "languages, 2 right-to-left" },
  { value: 8, label: "colour schemes" },
  { value: FEATURES.filter((f) => f.addon).length, label: "optional add-on: the member app" },
];
