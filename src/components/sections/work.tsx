import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { PhoneFrame, StoreShot } from "@/components/phone-frame";
import { GitHubIcon } from "@/components/icons";
import { projects, sideProjects, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function Work() {
  const [people, orbit, furthr] = projects;

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="Apps people use every day"
        description="Three products I've built and shipped to the App Store, Google Play and the web, from NFC check-in to AI expense handling."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Reveal className="min-w-0 lg:col-span-7">
          <ProjectCard project={people} className="h-full">
            <div className="relative mt-8 flex h-64 justify-center gap-3 overflow-hidden sm:h-80">
              {people.screenshots.slice(0, 3).map((s, i) => (
                <StoreShot
                  key={s.src}
                  shot={s}
                  sizes="180px"
                  className={cn(
                    "w-[30%] max-w-[170px] shrink-0 transition-transform duration-500 group-hover/spot:-translate-y-2",
                    i === 1 && "translate-y-6 group-hover/spot:translate-y-3",
                  )}
                />
              ))}
            </div>
          </ProjectCard>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0 lg:col-span-5">
          <ProjectCard project={orbit} className="h-full">
            <div className="relative mt-8 flex h-64 justify-center overflow-hidden sm:h-80">
              <PhoneFrame
                shot={orbit.screenshots[1]}
                sizes="220px"
                className="absolute top-0 w-[52%] max-w-[210px] transition-transform duration-500 group-hover/spot:-translate-y-2"
              />
            </div>
          </ProjectCard>
        </Reveal>

        <Reveal delay={0.04} className="min-w-0 lg:col-span-12">
          <ProjectCard project={furthr} horizontal>
            <div className="no-scrollbar mask-fade-x relative mt-8 flex gap-3 overflow-x-auto pb-1 lg:mt-0 lg:overflow-hidden">
              {furthr.screenshots.slice(0, 5).map((s, i) => (
                <StoreShot
                  key={s.src}
                  shot={s}
                  sizes="150px"
                  className={cn(
                    "w-32 shrink-0 transition-transform duration-500 group-hover/spot:-translate-y-1.5 sm:w-36",
                    i % 2 === 1 && "delay-75",
                  )}
                />
              ))}
            </div>
          </ProjectCard>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Side projects</h3>
            <p className="mt-1 text-sm text-muted-foreground">Where I try new stacks before they reach client work.</p>
          </div>
          <a
            href="https://github.com/SiddhantSharma575"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <GitHubIcon className="size-4" /> All repositories
          </a>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sideProjects.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-xl border bg-card/40 p-4 transition-colors hover:border-foreground/20 hover:bg-card"
              >
                <span className="flex items-center justify-between font-mono text-sm font-medium">
                  {p.name}
                  <ArrowUpRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.pitch}</span>
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function ProjectCard({
  project,
  children,
  className,
  horizontal,
}: {
  project: Project;
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
}) {
  return (
    <SpotlightCard className={cn("h-full", className)}>
      <Link
        href={`/work/${project.slug}`}
        className={cn(
          "relative flex h-full flex-col overflow-hidden p-6 sm:p-8",
          horizontal && "lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10",
        )}
      >
        <div
          aria-hidden
          className={cn("pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-70", project.accent)}
        />
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src={project.icon} alt="" width={44} height={44} className="rounded-xl shadow-sm" />
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.tagline}</p>
              </div>
            </div>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border bg-background/60 transition-all duration-300 group-hover/spot:rotate-45 group-hover/spot:bg-foreground group-hover/spot:text-background">
              <ArrowUpRightIcon className="size-4" />
            </span>
          </div>
          <p className="mt-5 text-pretty text-foreground/90">{project.outcome}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.highlights.slice(0, 2).map((h) => (
              <Badge key={h.label} variant="secondary" className="h-6 gap-1.5 rounded-full px-2.5">
                <span className="font-semibold">{h.value}</span>
                <span className="text-muted-foreground">{h.label}</span>
              </Badge>
            ))}
            {project.aiAssisted ? (
              <Badge variant="outline" className="h-6 gap-1 rounded-full border-brand/40 px-2.5 text-brand">
                <SparklesIcon className="size-3" /> Built AI-first
              </Badge>
            ) : null}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            {project.client} · {project.platforms.join(", ")}
          </p>
        </div>
        {children}
      </Link>
    </SpotlightCard>
  );
}
