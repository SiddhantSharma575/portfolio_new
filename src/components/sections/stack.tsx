import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { stack } from "@/content/profile";

export function Stack() {
  return (
    <section id="stack" className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <SectionHeading
          eyebrow="Stack"
          title="Tools I reach for"
          description="Chosen because they let a small team ship to three platforms without three codebases."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((group, i) => (
            <Reveal key={group.area} delay={(i % 3) * 0.06} className="bg-background p-6 sm:p-7">
              <h3 className="font-mono text-xs tracking-[0.2em] text-brand uppercase">{group.area}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border bg-card/60 px-2.5 py-1 text-sm transition-colors hover:border-foreground/20 hover:bg-card"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
