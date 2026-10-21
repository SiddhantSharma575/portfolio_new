import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, CheckIcon, GlobeIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { AppleIcon, PlayIcon } from "@/components/icons";
import { getProject, projects, type StoreLink } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} case study`,
    description: project.outcome,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.name} · case study`, description: project.outcome },
  };
}

const storeIcon = (store: StoreLink["store"]) =>
  store === "App Store" ? AppleIcon : store === "Google Play" ? PlayIcon : GlobeIcon;

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

function CaseStudySkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-5 pt-28 sm:pt-36" aria-busy="true" aria-label="Loading case study">
      <div className="h-4 w-20 rounded bg-muted" />
      <div className="mt-8 flex items-center gap-4">
        <div className="size-16 rounded-2xl bg-muted" />
        <div className="space-y-2">
          <div className="h-7 w-48 rounded bg-muted" />
          <div className="h-4 w-32 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-8 h-8 w-full max-w-2xl rounded bg-muted" />
      <div className="mt-3 h-8 w-2/3 max-w-xl rounded bg-muted" />
      <div className="mt-12 h-24 rounded-2xl bg-muted" />
    </div>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="relative">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b ${project.accent}`}
      />
      <div
        aria-hidden
        className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] opacity-50"
      />

      <header className="mx-auto max-w-5xl px-5 pt-28 sm:pt-36">
        <Reveal>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" /> All work
          </Link>
        </Reveal>
        <Reveal delay={0.05} className="mt-8 flex items-center gap-4">
          <Image
            src={project.icon}
            alt={`${project.name} app icon`}
            width={64}
            height={64}
            className="rounded-2xl shadow-lg"
            priority
          />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
            <p className="text-muted-foreground">{project.tagline}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">
            {project.outcome}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.aiAssisted ? (
              <Badge variant="outline" className="h-7 gap-1.5 rounded-full border-brand/40 px-3 text-brand">
                <SparklesIcon className="size-3.5" /> Built with an agentic AI workflow
              </Badge>
            ) : null}
            {project.platforms.map((p) => (
              <Badge key={p} variant="secondary" className="h-7 rounded-full px-3">
                {p}
              </Badge>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
            {[
              ["Client", project.client],
              ["My role", project.role],
              ["Timeline", project.period],
            ].map(([k, v]) => (
              <div key={k} className="bg-background/80 p-5 backdrop-blur">
                <dt className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">{k}</dt>
                <dd className="mt-1.5 text-sm font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      <section aria-label="Screenshots" className="mx-auto mt-14 max-w-6xl px-5">
        <ScreenshotGallery project={project} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          {project.galleryNote ? <p className="text-xs text-muted-foreground">{project.galleryNote}</p> : <span />}
          <div className="flex flex-wrap gap-2">
            {project.links.map((l) => {
              const Icon = storeIcon(l.store);
              return (
                <Button key={l.href} asChild variant="outline" size="sm" className="h-9 rounded-xl px-3">
                  <a href={l.href} target="_blank" rel="noreferrer">
                    <Icon className="size-4" /> {l.store}
                    <ArrowUpRightIcon className="size-3.5 text-muted-foreground" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto mt-20 grid max-w-5xl gap-16 px-5 sm:mt-24">
        <section className="grid gap-6 md:grid-cols-[200px_1fr]">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] text-brand uppercase">The challenge</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lg leading-relaxed text-pretty">{project.challenge}</p>
          </Reveal>
        </section>

        <section className="grid gap-6 md:grid-cols-[200px_1fr]">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] text-brand uppercase">The approach</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05} className="rounded-2xl border bg-card/50 p-6">
                <h3 className="font-semibold tracking-tight">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[200px_1fr]">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] text-brand uppercase">Results</h2>
          </Reveal>
          <div>
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border bg-border">
              {project.highlights.map((h) => (
                <Reveal key={h.label} className="bg-background p-4 sm:p-6">
                  <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{h.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{h.label}</p>
                </Reveal>
              ))}
            </div>
            <ul className="mt-6 space-y-3">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[200px_1fr]">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] text-brand uppercase">Stack</h2>
          </Reveal>
          <Reveal delay={0.05} className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-lg border bg-card/60 px-3 py-1.5 text-sm">
                {s}
              </span>
            ))}
          </Reveal>
        </section>
      </div>

      <section className="mx-auto mt-24 max-w-5xl px-5">
        <Reveal className="relative overflow-hidden rounded-3xl border bg-card/60 p-8 text-center sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
          />
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">Need something similar?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Whether it&apos;s a contract build or a full-time role, tell me what you need and I&apos;ll reply within 24
            hours on fit.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 rounded-xl bg-brand px-6 text-base text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/#contact">
              Get in touch <ArrowUpRightIcon />
            </Link>
          </Button>
        </Reveal>
      </section>

      <nav aria-label="Next case study" className="mx-auto max-w-5xl px-5 py-16">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between gap-4 rounded-2xl border p-5 transition-colors hover:bg-card sm:p-6"
        >
          <div className="flex items-center gap-4">
            <Image src={next.icon} alt="" width={44} height={44} className="rounded-xl" />
            <div>
              <p className="text-xs text-muted-foreground">Next case study</p>
              <p className="font-semibold">{next.name}</p>
            </div>
          </div>
          <ArrowRightIcon className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
        </Link>
      </nav>
    </article>
  );
}
