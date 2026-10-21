import { DownloadIcon, GraduationCapIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { LocalTime } from "@/components/local-time";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { education, experience } from "@/content/experience";
import { profile } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="About" title="Product-minded engineer across mobile, web, and backend" />
          <Reveal className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              I&apos;m Siddhant, a software engineer who likes owning a product end to end: React Native screens,
              Next.js web apps, NestJS APIs, and the Kotlin or Swift module when JavaScript can&apos;t reach the
              hardware.
            </p>
            <p>
              Today I build Infoniqa People and Suiteify Orbit remotely at Suiteify with a team in Germany. Before that
              I led Furthr&apos;s web and mobile apps at Deqode. I care about apps that feel native, APIs teams can
              trust, and shipping on a steady rhythm — whether that&apos;s a contract project or a full-time seat.
            </p>
          </Reveal>
          <Reveal className="mt-8 grid gap-3 text-sm">
            <p className="flex items-center gap-2.5">
              <MapPinIcon className="size-4 text-brand" />
              Remote · flexible for US, EU &amp; other timezones · <LocalTime className="text-muted-foreground" />
            </p>
            <p className="flex items-center gap-2.5">
              <GraduationCapIcon className="size-4 text-brand" />
              {education.degree}, {education.detail}
            </p>
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-2">
            <Button asChild className="h-10 rounded-xl px-4">
              <a href={profile.cvPath} download>
                <DownloadIcon /> Download CV
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="size-10 rounded-xl">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <LinkedInIcon className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="size-10 rounded-xl">
              <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <GitHubIcon className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">Experience</h3>
          <ol className="relative mt-6 space-y-4 border-l pl-6 sm:pl-8">
            {experience.map((job, i) => (
              <li key={job.company} className="relative">
                <span
                  aria-hidden
                  className={
                    i === 0
                      ? "absolute top-7 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-brand ring-4 ring-brand/20 sm:-left-[calc(2rem+5px)]"
                      : "absolute top-7 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-muted-foreground/40 sm:-left-[calc(2rem+5px)]"
                  }
                />
                <Reveal delay={i * 0.06} className="rounded-2xl border bg-card/50 p-6 transition-colors hover:bg-card">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-semibold">
                      {job.role} · <span className="text-brand">{job.company}</span>
                    </h4>
                    <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{job.location}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tags.map((t) => (
                      <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
            <li className="relative">
              <span
                aria-hidden
                className="absolute top-7 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-muted-foreground/40 sm:-left-[calc(2rem+5px)]"
              />
              <Reveal className="rounded-2xl border border-dashed p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-semibold">{education.degree}</h4>
                  <span className="font-mono text-xs text-muted-foreground">{education.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {education.school}, {education.location} · {education.detail}
                </p>
              </Reveal>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
