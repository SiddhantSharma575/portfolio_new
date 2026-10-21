"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDownIcon, ArrowUpRightIcon, DownloadIcon, SparklesIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { PhoneFrame, StoreShot } from "@/components/phone-frame";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { profile } from "@/content/profile";
import { getProject } from "@/content/projects";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export function Hero() {
  const scrollTo = useScrollTo();
  const orbit = getProject("suiteify-orbit")!;
  const people = getProject("infoniqa-people")!;
  const furthr = getProject("furthr")!;

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-30"
        style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div>
          <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Open to: {profile.availability.join(" · ")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              {profile.location} · US / EU / any timezone
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-6 text-[2.35rem] leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]"
          >
            {profile.headline.lead}{" "}
            <span className="font-serif font-normal italic text-brand">{profile.headline.accent}</span>
            <span className="text-muted-foreground"> {profile.headline.tail}</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            {profile.subline}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button
                size="lg"
                className="h-12 rounded-xl bg-brand px-5 text-base text-brand-foreground shadow-lg shadow-brand/25 hover:bg-brand/90"
                onClick={() => scrollTo("contact")}
              >
                Get in touch
                <ArrowUpRightIcon className="size-4 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </Button>
            </Magnetic>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl px-5 text-base"
              onClick={() => scrollTo("work")}
            >
              See my work
              <ArrowDownIcon className="size-4" />
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 rounded-xl px-4 text-base text-muted-foreground">
              <a href={profile.cvPath} download>
                <DownloadIcon className="size-4" />
                CV
              </a>
            </Button>
          </motion.div>

          <motion.ul {...fadeUp(0.32)} className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {profile.proof.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                {i === profile.proof.length - 1 ? (
                  <SparklesIcon className="size-3.5 text-brand" />
                ) : (
                  <span className="size-1 rounded-full bg-brand" />
                )}
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative mx-auto h-[440px] w-full max-w-[420px] sm:h-[520px]"
        >
          <div className="absolute top-10 left-0 w-[44%] -rotate-[8deg] opacity-90 sm:left-2">
            <StoreShot shot={people.screenshots[0]} sizes="200px" />
          </div>
          <div className="absolute top-14 right-0 w-[44%] rotate-[8deg] opacity-90 sm:right-2">
            <StoreShot shot={furthr.screenshots[0]} sizes="200px" />
          </div>
          <div className="absolute top-0 left-1/2 z-10 w-[52%] -translate-x-1/2">
            <PhoneFrame shot={orbit.screenshots[0]} sizes="(max-width: 640px) 50vw, 230px" priority />
          </div>

          <FloatingChip
            className="bottom-16 -left-1 sm:bottom-24 sm:-left-4"
            delay={0.7}
            icon={people.icon}
            title="iOS · Android · Web"
            subtitle="Infoniqa People · live in stores"
          />
          <FloatingChip
            className="right-0 bottom-4 sm:-right-4 sm:bottom-10"
            delay={0.85}
            icon={furthr.icon}
            title={
              <span className="inline-flex items-center gap-1">
                4.7 <StarIcon className="size-3 fill-amber-400 text-amber-400" /> rating
              </span>
            }
            subtitle="Furthr · App Store"
          />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingChip({
  className,
  delay,
  icon,
  title,
  subtitle,
}: {
  className: string;
  delay: number;
  icon: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { duration: 5, delay, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute z-20 flex items-center gap-3 rounded-2xl border bg-background/85 p-2.5 pr-4 shadow-xl shadow-black/10 backdrop-blur-xl ${className}`}
    >
      <Image src={icon} alt="" width={36} height={36} className="rounded-[10px]" />
      <div className="leading-tight">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </motion.div>
  );
}
