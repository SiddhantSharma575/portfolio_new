import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page didn&apos;t ship</h1>
      <p className="mt-3 text-muted-foreground">
        The link may be old, or the page moved. The work and contact form are one click away.
      </p>
      <Button asChild className="mt-8 rounded-xl">
        <Link href="/">
          <ArrowLeftIcon /> Back to the homepage
        </Link>
      </Button>
    </section>
  );
}
