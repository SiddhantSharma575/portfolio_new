export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Suiteify (formerly Infoniqa)",
    location: "Rostock, Germany · Remote",
    period: "Sep 2024 – Present",
    points: [
      "Own two products end to end, Infoniqa People and Suiteify Orbit, across iOS, Android and Web.",
      "Built AI-powered expense calculation for Suiteify Orbit, automating a manual, error-prone step.",
      "Lead the Infoniqa People web re-architecture into a micro-frontend monorepo, and build native modules in Kotlin and Swift.",
      "Drive the team's agentic AI workflow with Cursor Agent Mode and GitHub Copilot.",
    ],
    tags: ["Expo", "React Native", "GraphQL", "Kotlin", "Swift"],
  },
  {
    role: "Software Engineer",
    company: "Deqode",
    location: "Indore, India",
    period: "May 2023 – Sep 2024",
    points: [
      "Led development of Furthr, building its Next.js web app and React Native app in parallel.",
      "Implemented secure web and mobile auth with Firebase, and shipped to production on Vercel with continuous deployment.",
      "Worked in an Agile/Scrum team across planning, stand-ups and retrospectives.",
    ],
    tags: ["Next.js", "React Native", "Firebase", "Vercel"],
  },
];

export const education = {
  degree: "B.Tech in Computer Science",
  school: "Acropolis Institute of Technology and Research (RGPV)",
  location: "Indore, India",
  period: "2019 – 2023",
  detail: "CGPA 8.39 / 10",
};
