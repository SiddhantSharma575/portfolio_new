import { CheckIcon, LayersIcon, RocketIcon, UsersIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ScrollToButton } from "@/components/scroll-to-button";
import { services } from "@/content/services";

const icons = { mvp: RocketIcon, mobile: LayersIcon, augmentation: UsersIcon } as const;

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Engagements"
        title="Three ways to work together"
        description="A fixed-scope build, focused mobile or API work, or a full-time seat on your team. Every conversation starts with a short call and a clear plan."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.id as keyof typeof icons];
          return (
            <Reveal key={s.id} delay={i * 0.08}>
              <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex h-full flex-col">
                  <span className="grid size-10 place-items-center rounded-xl border bg-background text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-sm text-brand">{s.forWho}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <div className="flex items-center justify-between border-t pt-5 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">{s.shape}</p>
                        <p className="font-medium">Let&apos;s scope it</p>
                      </div>
                      <ScrollToButton target="contact" variant="outline" size="sm">
                        Get in touch
                      </ScrollToButton>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground sm:flex-row">
        <span>You own the code from day one</span>
        <span className="hidden size-1 rounded-full bg-border sm:block" />
        <span>Post-launch support included</span>
        <span className="hidden size-1 rounded-full bg-border sm:block" />
        <span>Weekly demos, no surprises</span>
      </Reveal>
    </section>
  );
}
