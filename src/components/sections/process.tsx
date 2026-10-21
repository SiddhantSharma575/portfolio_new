import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { process } from "@/content/services";

export function Process() {
  return (
    <section id="process" className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <SectionHeading
          eyebrow="Process"
          title="How a project runs"
          description="Clear steps, working software every week, and no long silences between kickoff and launch."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.step} className="group relative bg-background">
              <Reveal delay={i * 0.08} className="h-full p-6 sm:p-7">
                <span className="font-mono text-sm text-brand">{p.step}</span>
                <h3 className="mt-8 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
