import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { companies, metrics } from "@/content/profile";

export function Metrics() {
  return (
    <section aria-label="Track record" className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Reveal className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">Shipped production apps for</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {companies.map((c) => (
              <li
                key={c}
                className="text-xl font-semibold tracking-tight text-foreground/70 transition-colors hover:text-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06} className="bg-background p-6">
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
                <Counter value={m.value} decimals={"decimals" in m ? m.decimals : 0} suffix={m.suffix} />
              </dd>
              <p aria-hidden className="mt-1 text-sm text-muted-foreground">
                {m.label}
              </p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
