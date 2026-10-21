import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { LocalTime } from "@/components/local-time";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">{profile.name}</p>
          <p>
            Building for iOS, Android and the web from {profile.location} · <LocalTime />
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-foreground">
            Email
          </a>
          <a href={profile.cvPath} download className="transition-colors hover:text-foreground">
            CV
          </a>
          <Link href="/#work" className="transition-colors hover:text-foreground">
            Work
          </Link>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
