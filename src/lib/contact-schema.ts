import { z } from "zod";

export const projectTypes = [
  "New app or MVP",
  "React Native / Expo app",
  "Next.js web app",
  "NestJS / Node API",
  "Take over an existing app",
  "Team augmentation",
  "Full-time or long-term role",
  "Something else",
] as const;

export const budgets = ["Under €5k", "€5k – €15k", "€15k – €30k", "€30k+", "Not sure yet"] as const;

export const timelines = ["As soon as possible", "Within 1–3 months", "3+ months out", "Flexible"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.enum(projectTypes).optional().or(z.literal("")),
  budget: z.enum(budgets).optional().or(z.literal("")),
  timeline: z.enum(timelines).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "A couple of sentences helps me reply with something useful (20+ characters)")
    .max(5000),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
