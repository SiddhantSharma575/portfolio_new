"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRightIcon, CommandIcon, MenuIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCommandMenu } from "@/components/providers";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { navItems, sectionIds } from "@/lib/site";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const sectionToNav: Record<string, string> = {
  work: "work",
  ai: "work",
  services: "services",
  process: "services",
  about: "about",
  stack: "about",
  faq: "contact",
  contact: "contact",
};

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useScrollSpy(sectionIds, isHome);
  const active = isHome
    ? activeSection
      ? sectionToNav[activeSection]
      : null
    : pathname.startsWith("/work")
      ? "work"
      : null;
  const scrollTo = useScrollTo();
  const { setOpen } = useCommandMenu();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(id);
  };

  // Wait for the sheet to close and release its scroll lock before scrolling.
  const goAfterSheet = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => scrollTo(id), 350);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 transition-[background-color,border-color,box-shadow] duration-300 sm:px-4",
          scrolled
            ? "border-border bg-background/75 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          onClick={isHome ? go("top") : undefined}
          className="group flex items-center gap-2.5"
          aria-label="Siddhant Sharma, home"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-foreground font-mono text-xs font-bold text-background transition-transform group-hover:rotate-[-6deg]">
            SS
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              onClick={go(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active === item.id ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-muted"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="hidden gap-2 text-muted-foreground lg:inline-flex"
            aria-label="Open command menu"
          >
            <SearchIcon className="size-3.5" />
            <span className="text-xs">Search</span>
            <kbd className="flex items-center gap-0.5 rounded border bg-muted px-1 font-mono text-[10px]">
              <CommandIcon className="size-2.5" />K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open command menu"
          >
            <SearchIcon className="size-4" />
          </Button>
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden h-8 bg-brand px-3 text-brand-foreground hover:bg-brand/90 sm:inline-flex"
          >
            <Link href="/#contact" onClick={go("contact")}>
              Get in touch
              <ArrowUpRightIcon />
            </Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Jump to a section or get in touch.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={goAfterSheet(item.id)}
                    className={cn(
                      "rounded-xl px-3 py-3 text-lg font-medium transition-colors hover:bg-muted",
                      active === item.id && "bg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button asChild size="lg" className="h-11 bg-brand text-brand-foreground hover:bg-brand/90">
                  <Link href="/#contact" onClick={goAfterSheet("contact")}>
                    Get in touch
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11">
                  <a href={profile.cvPath} download>
                    Download CV
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
