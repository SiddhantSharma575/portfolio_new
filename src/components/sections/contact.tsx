import { ClockIcon, MessageSquareReplyIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { LocalTime } from "@/components/local-time";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Project or full-time role —{" "}
                <span className="font-serif font-normal italic text-brand">I&apos;ll reply within 24 hours.</span>
              </>
            }
            description="You'll get an honest answer on whether I'm the right fit, and if I'm not, I'll try to point you to someone who is."
          />
          <Reveal className="mt-10 space-y-4">
            <CopyEmail />
            <div className="grid grid-cols-2 gap-3">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border bg-card/50 px-4 py-3 text-sm transition-colors hover:border-foreground/20 hover:bg-card"
              >
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border bg-card/50 px-4 py-3 text-sm transition-colors hover:border-foreground/20 hover:bg-card"
              >
                <GitHubIcon className="size-4" /> GitHub
              </a>
            </div>
          </Reveal>
          <Reveal className="mt-8 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-2.5">
              <MessageSquareReplyIcon className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>{profile.replyPromise}, with a straight answer on fit.</span>
            </p>
            <p className="flex items-start gap-2.5">
              <ClockIcon className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>
                It&apos;s <LocalTime className="text-foreground" /> for me. {profile.timezoneNote}.
              </span>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
