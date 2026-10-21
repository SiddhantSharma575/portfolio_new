"use client";

import * as React from "react";
import { profile } from "@/content/profile";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.timezone,
});

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 15_000);
  return () => window.clearInterval(id);
}

export function LocalTime({ className }: { className?: string }) {
  const time = React.useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => null,
  );

  return (
    <span className={className} suppressHydrationWarning>
      <span className="tabular-nums">{time ?? "--:--"}</span> {profile.timezoneLabel}
    </span>
  );
}
