import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/content/projects";

export function PhoneFrame({
  shot,
  className,
  sizes = "280px",
  priority,
}: {
  shot: Screenshot;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] rounded-[2.4rem] border border-white/10 bg-neutral-950 p-[7px] shadow-2xl shadow-black/40 ring-1 ring-black/40",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
        <div className="absolute top-1.5 left-1/2 h-[4.5%] w-[30%] -translate-x-1/2 rounded-full bg-neutral-950" />
      </div>
    </div>
  );
}

/** Store marketing shots already contain a device, so they get a card instead of a second bezel. */
export function StoreShot({
  shot,
  className,
  sizes = "280px",
  priority,
}: {
  shot: Screenshot;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl shadow-black/20 dark:border-white/10",
        className,
      )}
      style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
    >
      <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
