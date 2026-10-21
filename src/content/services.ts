export type Service = {
  id: string;
  title: string;
  forWho: string;
  description: string;
  deliverables: string[];
  shape: string;
};

export const services: Service[] = [
  {
    id: "mvp",
    title: "MVP build",
    forWho: "Founders and product teams with an idea to validate",
    description:
      "From a rough spec to a working product on iOS, Android and the web — with a NestJS or Node API when you need a real backend — on a stack your next hires will already know.",
    deliverables: [
      "Scoping call and written plan",
      "Expo app plus a Next.js web app where it helps",
      "NestJS / Node API, auth, data layer, analytics hooks",
      "App Store and Google Play submission",
    ],
    shape: "Fixed scope, weekly demos",
  },
  {
    id: "mobile",
    title: "Mobile app development",
    forWho: "Teams that need a React Native app built, rescued or extended",
    description:
      "New features, performance work, or the native piece your app is missing: NFC, widgets, background tasks, custom Kotlin and Swift modules.",
    deliverables: [
      "Feature work in an existing codebase",
      "Native modules in Kotlin and Swift",
      "Expo upgrades and store releases",
      "Code review and handover docs",
    ],
    shape: "Milestones or monthly retainer",
  },
  {
    id: "augmentation",
    title: "AI-native team augmentation",
    forWho: "Engineering teams hiring for contract or full-time help",
    description:
      "I join your team, your stand-ups and your repo — mobile, web, or NestJS backends — and bring an agentic workflow your team can keep using after I leave.",
    deliverables: [
      "Embedded in your sprints and tools",
      "Cursor and Copilot setup grounded in your rules",
      "Tests and refactors as part of the work",
      "Contract, part-time, or full-time",
    ],
    shape: "Ongoing, contract or full-time",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    body: "A short call about the problem, the users and the constraints. You get an honest answer on whether I'm the right fit.",
  },
  {
    step: "02",
    title: "Plan",
    body: "A written scope with milestones, the stack, and what's in or out, so we agree on the finish line before any code.",
  },
  {
    step: "03",
    title: "Build with weekly demos",
    body: "Working software every week on a real device or URL. You see progress, not status reports.",
  },
  {
    step: "04",
    title: "Ship and support",
    body: "Store submission, production deploy and handover docs. You own the code, and I stay around after launch.",
  },
];

export const aiWorkflow = [
  {
    title: "Context first",
    body: "Agents work from project rules, architecture notes and the real codebase, never a blank prompt.",
  },
  {
    title: "Agents draft",
    body: "Scaffolding, refactors across many files and test generation run in Cursor Agent Mode and Copilot.",
  },
  {
    title: "AI first-pass review",
    body: "Diffs get an automated review for bugs, edge cases and style before a human looks at them.",
  },
  {
    title: "I own the call",
    body: "Architecture, trade-offs and the final review stay with me. Nothing ships that I haven't read.",
  },
];
