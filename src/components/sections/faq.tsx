import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { faq } from "@/content/faq";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions clients usually ask"
          description="Something else on your mind? Ask in the form below and I'll answer it directly."
        />
        <Reveal>
          <Accordion type="single" collapsible defaultValue="item-0" className="rounded-2xl border bg-card/40 px-5">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="py-5 text-base">{item.q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
