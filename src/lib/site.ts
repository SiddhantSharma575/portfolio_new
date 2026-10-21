export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4321").replace(/\/$/, "");

export const navItems = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const sectionIds = ["top", "work", "ai", "services", "process", "about", "stack", "faq", "contact"] as const;
