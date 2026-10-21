"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";

export function useScrollTo() {
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (id: string) => {
      if (pathname !== "/") {
        router.push(id === "top" ? "/" : `/#${id}`);
        return;
      }
      const target = id === "top" ? 0 : document.getElementById(id);
      if (target === null) return;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.1 });
      } else if (target === 0) {
        window.scrollTo({ top: 0 });
      } else {
        target.scrollIntoView({ block: "start" });
      }
      window.history.replaceState(null, "", id === "top" ? "/" : `#${id}`);
    },
    [lenis, pathname, router],
  );
}
