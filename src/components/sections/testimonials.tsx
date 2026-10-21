import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/content/profile";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Kind words" title="What people say about working with me" />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <figure className="h-full rounded-2xl border bg-card/50 p-7">
              <blockquote className="text-pretty text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="text-muted-foreground">
                  {" "}
                  · {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
