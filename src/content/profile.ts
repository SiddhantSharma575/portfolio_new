export const profile = {
  name: "Siddhant Sharma",
  shortName: "Siddhant",
  role: "Software Engineer",
  headline: {
    lead: "I build fast, native-feeling",
    accent: "apps and APIs",
    tail: "with React Native, Next.js, NestJS, and the Kotlin/Swift modules in between.",
  },
  subline:
    "Software Engineer at Suiteify (Germany · Remote). 4+ years shipping production apps and backends to iOS, Android and Web.",
  availability: ["contract projects", "full-time roles"],
  location: "Remote",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  timezoneNote: "Flexible across US, EU, and other timezones",
  replyPromise: "I reply within 24 hours",
  email: "siddhantsharma909@gmail.com",
  cvPath: "/Siddhant_Sharma_Resume.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/siddhant-sharma-9588611a9",
    github: "https://github.com/SiddhantSharma575",
  },
  proof: [
    "4+ years in production",
    "3 apps live on iOS, Android & Web",
    "NestJS · Node backends",
    "AI-native workflow",
  ],
  description:
    "Software engineer building React Native, Expo, Next.js and NestJS products for iOS, Android and Web. Currently at Suiteify. Open to contract projects and full-time roles.",
} as const;

export const metrics = [
  { value: 4, suffix: "+", label: "Years shipping production apps" },
  { value: 3, suffix: "", label: "Apps live in the stores" },
  { value: 4.7, suffix: "★", decimals: 1, label: "Furthr on the App Store" },
] as const;

export const companies = ["Suiteify", "Infoniqa", "Furthr", "Deqode"] as const;

export const stack = [
  {
    area: "Mobile",
    items: ["React Native", "Expo", "Expo Router", "Reanimated", "NativeWind", "Gluestack UI"],
  },
  {
    area: "Native",
    items: ["Kotlin", "Swift", "NFC native modules", "Home-screen widgets"],
  },
  {
    area: "Web",
    items: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Micro-frontends"],
  },
  {
    area: "Backend & APIs",
    items: ["NestJS", "Node.js", "Express", "REST", "GraphQL", "MongoDB"],
  },
  {
    area: "Data & state",
    items: ["TanStack Query", "Redux Toolkit", "Firebase", "AWS", "Vercel"],
  },
  {
    area: "AI & quality",
    items: ["Cursor Agent Mode", "GitHub Copilot", "AI-assisted review", "Jest", "Docker", "Agile / Scrum"],
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

// Section stays hidden until real quotes are added here.
export const testimonials: Testimonial[] = [];
