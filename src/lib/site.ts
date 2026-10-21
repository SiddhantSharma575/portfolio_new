function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  // Set automatically by Vercel on every deploy (e.g. your-app.vercel.app).
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:4321";
}

export const siteUrl = resolveSiteUrl();

export const navItems = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const sectionIds = ["top", "work", "ai", "services", "process", "about", "stack", "faq", "contact"] as const;
