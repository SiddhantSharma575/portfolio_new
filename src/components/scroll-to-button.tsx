"use client";

import type * as React from "react";
import { Button } from "@/components/ui/button";
import { useScrollTo } from "@/hooks/use-scroll-to";

export function ScrollToButton({
  target,
  ...props
}: { target: string } & Omit<React.ComponentProps<typeof Button>, "onClick" | "asChild">) {
  const scrollTo = useScrollTo();
  return <Button {...props} onClick={() => scrollTo(target)} />;
}
