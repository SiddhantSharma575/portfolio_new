# Siddhant Sharma · Portfolio

Personal site for Siddhant Sharma, a React Native and Next.js engineer. It leads with three shipped apps (Infoniqa People, Suiteify Orbit, Furthr), explains the agentic AI workflow behind them, and routes project inquiries to email through a contact form.

Built with Next.js (App Router, Cache Components), TypeScript, Tailwind CSS v4, shadcn/ui, Motion, Lenis, next-themes, cmdk, react-hook-form + zod, and Resend.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                   # http://localhost:4321
```

Other scripts:

| Command             | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run build`     | Production build                     |
| `npm start`         | Serve the production build on :4321  |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | TypeScript, no emit                  |

## Environment variables

All of them are optional locally. See `.env.example`.

| Variable               | Purpose                                                                                                             | Default                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `RESEND_API_KEY`       | Sends contact-form messages through [Resend](https://resend.com). If unset, the form runs in **mock mode**: messages are logged to the server console and the visitor still sees the success state. | unset (mock mode)                   |
| `CONTACT_TO_EMAIL`     | Inbox that receives inquiries.                                                                                      | `siddhantsharma909@gmail.com`       |
| `CONTACT_FROM_EMAIL`   | Sender address. Must be on a domain you've verified in Resend.                                                      | `Portfolio <onboarding@resend.dev>` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for canonical links, the sitemap, Open Graph and JSON-LD.                                           | `http://localhost:4321`             |

Resend's shared `onboarding@resend.dev` sender only delivers to the email address that owns the Resend account. To send from your own address, verify a domain in Resend and set `CONTACT_FROM_EMAIL`, for example `Siddhant Sharma <hello@yourdomain.com>`. Replies go straight to the sender because every email sets `replyTo` to the visitor's address.

## Editing content

Copy lives in typed files, so you can change text without touching components:

| File                        | Contents                                                        |
| --------------------------- | --------------------------------------------------------------- |
| `src/content/profile.ts`    | Name, headline, availability, links, metrics, stack, testimonials |
| `src/content/projects.ts`   | Case studies, screenshots, store links, side projects           |
| `src/content/experience.ts` | Work history and education                                      |
| `src/content/services.ts`   | Engagements, process steps, AI workflow                         |
| `src/content/faq.ts`        | FAQ                                                             |

The testimonials section stays hidden until you add entries to `testimonials` in `profile.ts`.

App screenshots and icons live in `public/work/<slug>/`, and the downloadable CV is `public/Siddhant_Sharma_Resume.pdf`.

## Project structure

```
src/
  app/
    page.tsx                 Home page, section order, JSON-LD
    work/[slug]/page.tsx     Case study pages (statically generated)
    api/contact/route.ts     Contact form handler: validation, honeypot, rate limit, Resend
    opengraph-image.tsx      Generated Open Graph image
    sitemap.ts, robots.ts, icon.tsx
  components/
    sections/                One file per home page section
    ui/                      shadcn/ui primitives
    motion/                  Reveal, spotlight card, magnetic button, counters
    contact-form.tsx, command-menu.tsx, site-header.tsx, ...
  content/                   Typed site copy
  lib/                       Contact schema, site config
```

## Features

- Dark-first design with a light theme, no flash on load
- Command palette on ⌘K / Ctrl+K: jump to sections, copy email, download CV, toggle theme
- Scroll-spy navigation and a mobile menu sheet
- Smooth scrolling, reveal animations, animated counters, magnetic call to action and cursor spotlight cards, all of which respect `prefers-reduced-motion`
- Contact form with zod validation, a honeypot, per-IP rate limiting, loading, success and error states, and a `mailto:` fallback if sending fails
- Metadata, generated Open Graph image, sitemap, robots.txt and JSON-LD `Person` schema

## Deploy

The site is ready for Vercel: import the repository, add the environment variables above, and deploy.
