export type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type StoreLink = {
  store: "App Store" | "Google Play" | "Web";
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  outcome: string;
  summary: string;
  client: string;
  role: string;
  period: string;
  platforms: string[];
  aiAssisted: boolean;
  highlights: { value: string; label: string }[];
  challenge: string;
  approach: { title: string; body: string }[];
  results: string[];
  stack: string[];
  screenshots: Screenshot[];
  /** Flat UI captures can sit inside a phone frame; store marketing shots already include a device. */
  screenshotStyle: "flat" | "marketing";
  galleryNote?: string;
  links: StoreLink[];
  accent: string;
};

const shots = (slug: string, count: number, ext: string, w: number, h: number, alts: string[], prefix = "screen") =>
  Array.from({ length: count }, (_, i) => ({
    src: `/work/${slug}/${prefix}-0${i + 1}.${ext}`,
    alt: alts[i] ?? `${slug} screenshot ${i + 1}`,
    width: w,
    height: h,
  }));

export const projects: Project[] = [
  {
    slug: "infoniqa-people",
    name: "Infoniqa People",
    icon: "/work/infoniqa-people/icon.png",
    tagline: "Employee self-service HR app",
    outcome: "An HR app employees actually open: time tracking, absences and NFC check-in across iOS, Android and Web.",
    summary:
      "Employees track working time, check in and out, manage absences, complete license checks and submit expenses from one app.",
    client: "Suiteify (formerly Infoniqa)",
    role: "Software Engineer, product owner across iOS, Android and Web",
    period: "Sep 2024 – Present",
    platforms: ["iOS", "Android", "Web"],
    aiAssisted: true,
    highlights: [
      { value: "3", label: "Platforms from one codebase" },
      { value: "NFC", label: "Native Kotlin & Swift modules" },
      { value: "MFE", label: "Web micro-frontend monorepo" },
    ],
    challenge:
      "Clocking in had to be instant. Employees don't want to unlock a phone, open an app and dig through menus at the start of a shift. At the same time, the web platform had grown into a single large app where every feature waited on every other feature to ship.",
    approach: [
      {
        title: "NFC check-in with native modules",
        body: "Built card-based check-in and check-out with custom Kotlin and Swift native modules, bridged into the Expo app so employees tap a card and they're on the clock.",
      },
      {
        title: "Home-screen widget",
        body: "Added a widget that clocks in and out without opening the app, backed by the same typed GraphQL client the rest of the app uses.",
      },
      {
        title: "Micro-frontend monorepo",
        body: "Leading the web platform's re-architecture into a monorepo of micro-frontends, so features like time tracking and absences ship independently.",
      },
      {
        title: "AI-first development",
        body: "Day-to-day work runs through Cursor Agent Mode and GitHub Copilot, grounded in project rules, for scaffolding, refactors across many files, and test generation.",
      },
    ],
    results: [
      "Live on the App Store, Google Play and the web",
      "Check-in reduced to a single NFC tap or a widget press",
      "Web features ship independently instead of in one big release",
      "Native Kotlin and Swift modules bridged into Expo for hardware features",
    ],
    stack: ["Expo", "React Native", "TypeScript", "GraphQL", "Kotlin", "Swift", "Micro-frontends"],
    screenshots: shots("infoniqa-people", 4, "jpg", 1242, 2208, [
      "Infoniqa People home screen with the running time tracker and today's tasks",
      "Signing a document inside Infoniqa People",
      "Monthly time-tracking calendar in Infoniqa People",
      "Absence overview with remaining vacation days",
    ]),
    screenshotStyle: "marketing",
    galleryNote: "Official store screenshots from the German listing.",
    links: [
      { store: "App Store", href: "https://apps.apple.com/de/app/infoniqa-people/id1593372578" },
      { store: "Google Play", href: "https://play.google.com/store/apps/details?id=de.sawayo.work" },
      { store: "Web", href: "https://www.sawayo.de/mitarbeiter-app" },
    ],
    accent: "from-sky-500/25 via-cyan-400/10 to-transparent",
  },
  {
    slug: "suiteify-orbit",
    name: "Suiteify Orbit",
    icon: "/work/suiteify-orbit/icon.png",
    tagline: "AI expense and document app",
    outcome: "A new expense and document app, built from the ground up, where AI does the expense maths for you.",
    summary:
      "Employees capture expenses, let AI calculate them, scan payroll QR codes and keep personal documents secure in one place.",
    client: "Suiteify",
    role: "Software Engineer, built from the ground up",
    period: "2026 – Present",
    platforms: ["iOS", "Android"],
    aiAssisted: true,
    highlights: [
      { value: "AI", label: "Automatic expense calculation" },
      { value: "QR", label: "Payroll QR code scanner" },
      { value: "2026", label: "Launched on both stores" },
    ],
    challenge:
      "Expense submission was manual and error-prone: employees typed amounts, categories and totals by hand, and mistakes bounced back from finance. Personal documents like payslips lived in scattered places.",
    approach: [
      {
        title: "AI expense calculation",
        body: "Built AI-powered expense calculation so the app works out amounts automatically, removing the manual entry step where most errors crept in.",
      },
      {
        title: "Payroll QR scanner",
        body: "Added a QR code scanner that reads payment details straight from the document instead of having employees retype them.",
      },
      {
        title: "Secure document vault",
        body: "Gave employees one secure place to manage personal files and documents, next to their expenses.",
      },
      {
        title: "Greenfield on a modern Expo stack",
        body: "Started from an empty repo with Expo, React Native and TypeScript, using an agentic AI workflow to move from scaffolding to store release quickly.",
      },
    ],
    results: [
      "Released on the App Store and Google Play in April 2026",
      "Expense amounts are calculated automatically instead of typed in",
      "Payment details come from a QR scan, not manual entry",
      "Expenses and personal documents live in one app",
    ],
    stack: ["Expo", "React Native", "TypeScript", "AI", "QR scanning"],
    screenshots: shots(
      "suiteify-orbit",
      3,
      "jpg",
      958,
      2090,
      [
        "Creating an expense in Suiteify Orbit with date, vendor, category and project",
        "List of open expenses, folders and trips in Suiteify Orbit",
        "Submitted expenses with their approval status",
      ],
      "ui",
    ),
    screenshotStyle: "flat",
    galleryNote: "Official store screenshots from the German listing.",
    links: [
      { store: "App Store", href: "https://apps.apple.com/us/app/suiteify-orbit/id6760008540" },
      { store: "Google Play", href: "https://play.google.com/store/apps/details?id=cloud.infoniqa.orbit" },
    ],
    accent: "from-violet-500/30 via-indigo-400/10 to-transparent",
  },
  {
    slug: "furthr",
    name: "Furthr",
    icon: "/work/furthr/icon.png",
    tagline: "Carbon-footprint platform",
    outcome: "A carbon-footprint platform shipped on web and mobile in parallel, rated 4.7★ on the App Store.",
    summary:
      "Companies measure emissions from employees' daily activities, and each person gets personalised ways to reduce their footprint.",
    client: "Furthr, delivered at Deqode",
    role: "Software Engineer, led web and mobile development",
    period: "Jun 2023 – Sep 2024",
    platforms: ["Web", "iOS", "Android"],
    aiAssisted: false,
    highlights: [
      { value: "4.7★", label: "App Store rating" },
      { value: "2", label: "Apps built in parallel" },
      { value: "CD", label: "Continuous deployment on Vercel" },
    ],
    challenge:
      "Furthr needed a Next.js web app and a React Native mobile app at the same time, with the same features, the same data and the same sign-in, without doubling the work.",
    approach: [
      {
        title: "Two apps, one set of patterns",
        body: "Built the Next.js (App Router) web app and the React Native app in parallel, reusing API integration and server-state patterns so features reached both at once.",
      },
      {
        title: "Emissions dashboards",
        body: "Created dashboards with TanStack Query caching and react-chartjs-2 visualisations, wrapped in a responsive Tailwind CSS UI.",
      },
      {
        title: "Secure auth on web and mobile",
        body: "Implemented Firebase Authentication across both platforms so one account works everywhere.",
      },
      {
        title: "Production on Vercel",
        body: "Shipped the web app to production on Vercel with continuous deployment, inside an Agile/Scrum team.",
      },
    ],
    results: [
      "Rated 4.7★ on the App Store",
      "Web and mobile reached feature parity together",
      "Every merge deployed to production through Vercel",
      "Shared auth and API patterns across both platforms",
    ],
    stack: ["Next.js", "React Native", "TanStack Query", "Tailwind CSS", "Firebase", "Vercel", "Chart.js"],
    screenshots: shots("furthr", 6, "jpg", 1242, 2208, [
      "Furthr impact screen showing a personal carbon reduction",
      "Footprint breakdown by category in Furthr",
      "News and updates from climate projects",
      "Archive of eco tips",
      "A curated eco tip with details",
      "Monthly prize draw for reducing your footprint",
    ]),
    screenshotStyle: "marketing",
    galleryNote: "Official App Store screenshots.",
    links: [
      { store: "App Store", href: "https://apps.apple.com/gb/app/furthr/id1632228464" },
      { store: "Google Play", href: "https://play.google.com/store/apps/details?id=cz.pixelfield.furthr" },
    ],
    accent: "from-emerald-500/25 via-teal-400/10 to-transparent",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const sideProjects = [
  {
    name: "rn-apps",
    pitch: "A Threads clone on the latest Expo stack: Supabase auth and data, TanStack Query, NativeWind.",
    stack: ["Expo SDK 55", "Supabase", "Reanimated 4"],
    href: "https://github.com/SiddhantSharma575/rn-apps",
  },
  {
    name: "Time_tracker",
    pitch: "Offline-first time tracking in Expo with persisted Redux state.",
    stack: ["Expo Router", "Redux Toolkit", "redux-persist"],
    href: "https://github.com/SiddhantSharma575/Time_tracker",
  },
  {
    name: "real_time_chat_app",
    pitch: "Real-time MERN chat with Socket.io, JWT auth and group conversations.",
    stack: ["Socket.io", "Express", "MongoDB"],
    href: "https://github.com/SiddhantSharma575/real_time_chat_app",
  },
  {
    name: "cross_share",
    pitch: "Send files and text between phone and browser instantly, synced through Firebase.",
    stack: ["React Native", "React", "Firestore"],
    href: "https://github.com/SiddhantSharma575/cross_share",
  },
] as const;
