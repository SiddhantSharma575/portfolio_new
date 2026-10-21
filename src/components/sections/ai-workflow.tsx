"use client";

import { motion } from "motion/react";
import { BotIcon, FileCodeIcon, ScanSearchIcon, ShieldCheckIcon, UserCheckIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { aiWorkflow } from "@/content/services";

const icons = [FileCodeIcon, BotIcon, ScanSearchIcon, UserCheckIcon];

const benefits = [
  {
    title: "Faster delivery",
    body: "Boilerplate and wide refactors take hours, not days, so more of the budget goes to the product.",
  },
  {
    title: "Tests come included",
    body: "Agents draft tests alongside features, so coverage grows with the code instead of trailing it.",
  },
  {
    title: "Same quality bar",
    body: "Every change still passes my review and your CI. AI speeds up the work; it doesn't lower the standard.",
  },
];

export function AiWorkflow() {
  return (
    <section id="ai" className="relative overflow-hidden border-y bg-muted/30">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
      />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:py-32 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Agentic AI-driven development"
            title={
              <>
                AI agents do the legwork.{" "}
                <span className="font-serif font-normal italic text-brand">I own the judgment.</span>
              </>
            }
            description="I run my day-to-day engineering through Cursor Agent Mode and GitHub Copilot. The agents are grounded in project rules and the real codebase, and they handle scaffolding, refactors across many files, test generation and first-pass review. Architecture and the final review stay with me."
          />
          <div className="mt-10 space-y-5">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} className="flex gap-4">
                <ShieldCheckIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-medium">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap gap-2">
            {["Cursor Agent Mode", "GitHub Copilot", "Project rules", "AI-assisted review", "Prompt engineering"].map(
              (t) => (
                <span key={t} className="rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                  {t}
                </span>
              ),
            )}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="rounded-3xl border bg-background/70 p-5 shadow-2xl shadow-black/5 backdrop-blur sm:p-7">
            <div className="flex items-center justify-between border-b pb-4">
              <p className="font-mono text-xs text-muted-foreground">workflow.md</p>
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              </span>
            </div>
            <ol className="relative mt-6 space-y-2">
              <motion.span
                aria-hidden
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="absolute top-6 bottom-6 left-[1.4rem] w-px origin-top bg-gradient-to-b from-brand via-brand/50 to-emerald-500"
              />
              {aiWorkflow.map((step, i) => {
                const Icon = icons[i];
                const human = i === aiWorkflow.length - 1;
                return (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.25 }}
                    className="relative flex gap-4 rounded-2xl p-3 transition-colors hover:bg-muted/60"
                  >
                    <span
                      className={
                        human
                          ? "relative z-10 grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white"
                          : "relative z-10 grid size-9 shrink-0 place-items-center rounded-xl border bg-background text-brand"
                      }
                    >
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="flex items-center gap-2 text-sm font-medium">
                        {step.title}
                        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground uppercase">
                          {human ? "human" : "agent"}
                        </span>
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
            <div className="mt-6 flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3 font-mono text-xs">
              <span className="text-muted-foreground">→ ship</span>
              <span className="text-emerald-500">reviewed · tested · merged</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
