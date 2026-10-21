"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CopyIcon,
  DownloadIcon,
  MailIcon,
  MoonIcon,
  SmartphoneIcon,
} from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { useCommandMenu } from "@/components/providers";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

const sections = [
  { id: "work", label: "Selected work" },
  { id: "ai", label: "Agentic AI workflow" },
  { id: "services", label: "Engagements" },
  { id: "process", label: "Process" },
  { id: "about", label: "About & experience" },
  { id: "stack", label: "Tech stack" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export function CommandMenu() {
  const { open, setOpen } = useCommandMenu();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const scrollTo = useScrollTo();

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);

  const run = (fn: () => void) => {
    setOpen(false);
    // Let the dialog close before scrolling so focus restoration doesn't fight the scroll.
    window.setTimeout(fn, 60);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied", { description: profile.email });
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command menu"
      description="Jump to a section or run an action"
    >
      <Command>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>Nothing matches that. Try “work” or “email”.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => run(copyEmail)}>
              <CopyIcon />
              Copy email address
            </CommandItem>
            <CommandItem onSelect={() => run(() => scrollTo("contact"))}>
              <MailIcon />
              Get in touch
            </CommandItem>
            <CommandItem
              onSelect={() =>
                run(() => {
                  const a = document.createElement("a");
                  a.href = profile.cvPath;
                  a.download = "";
                  a.click();
                })
              }
            >
              <DownloadIcon />
              Download CV
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}>
              <MoonIcon />
              Toggle theme
              <CommandShortcut>{resolvedTheme === "dark" ? "Light" : "Dark"}</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Jump to">
            {sections.map((s) => (
              <CommandItem key={s.id} onSelect={() => run(() => scrollTo(s.id))}>
                <ArrowRightIcon />
                {s.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Case studies">
            {projects.map((p) => (
              <CommandItem
                key={p.slug}
                value={`${p.name} ${p.tagline}`}
                onSelect={() => run(() => router.push(`/work/${p.slug}`))}
              >
                <SmartphoneIcon />
                {p.name}
                <CommandShortcut>{p.tagline}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Elsewhere">
            <CommandItem onSelect={() => run(() => window.open(profile.links.linkedin, "_blank", "noopener"))}>
              <LinkedInIcon />
              LinkedIn
            </CommandItem>
            <CommandItem onSelect={() => run(() => window.open(profile.links.github, "_blank", "noopener"))}>
              <GitHubIcon />
              GitHub
            </CommandItem>
            <CommandItem onSelect={() => run(() => scrollTo("about"))}>
              <BriefcaseIcon />
              Experience
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
