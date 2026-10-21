"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneFrame, StoreShot } from "@/components/phone-frame";
import type { Project } from "@/content/projects";

export function ScreenshotGallery({ project }: { project: Project }) {
  const [index, setIndex] = React.useState<number | null>(null);
  const shots = project.screenshots;
  const open = index !== null;
  const current = index !== null ? shots[index] : null;

  const step = React.useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <>
      <div
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pt-2 pb-6"
        data-lenis-prevent-wheel
      >
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative w-[62vw] max-w-[250px] shrink-0 snap-center rounded-[2.4rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-[240px]"
            aria-label={`Enlarge screenshot: ${shot.alt}`}
          >
            {project.screenshotStyle === "flat" ? (
              <PhoneFrame
                shot={shot}
                sizes="250px"
                className="transition-transform duration-300 group-hover:-translate-y-1.5"
              />
            ) : (
              <StoreShot
                shot={shot}
                sizes="250px"
                className="transition-transform duration-300 group-hover:-translate-y-1.5"
              />
            )}
            <span className="absolute top-4 right-4 grid size-8 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <ExpandIcon className="size-3.5" />
            </span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-[min(92vw,460px)] border-none bg-transparent p-0 shadow-none sm:max-w-[460px]">
          <DialogTitle className="sr-only">{project.name} screenshots</DialogTitle>
          <DialogDescription className="sr-only">{current?.alt}</DialogDescription>
          {current ? (
            <div className="flex flex-col items-center gap-4">
              <div
                className="relative max-h-[78vh] w-full overflow-hidden rounded-3xl bg-white"
                style={{ aspectRatio: `${current.width} / ${current.height}` }}
              >
                <Image src={current.src} alt={current.alt} fill sizes="460px" className="object-contain" />
              </div>
              <div className="flex w-full items-center justify-between gap-3 rounded-2xl bg-background/90 p-2 backdrop-blur">
                <Button variant="ghost" size="icon" onClick={() => step(-1)} aria-label="Previous screenshot">
                  <ChevronLeftIcon />
                </Button>
                <p className="line-clamp-2 flex-1 text-center text-sm text-muted-foreground">{current.alt}</p>
                <Button variant="ghost" size="icon" onClick={() => step(1)} aria-label="Next screenshot">
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
