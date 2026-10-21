"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/content/profile";

export function CopyEmail() {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied", { description: profile.email });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-xl border bg-card/50 p-1.5 pl-4">
      <MailIcon className="size-4 shrink-0 text-brand" />
      <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 truncate text-sm font-medium hover:underline">
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? <CheckIcon className="size-4 text-emerald-500" /> : <CopyIcon className="size-4" />}
      </button>
    </div>
  );
}
