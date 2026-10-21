"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon, MailIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { budgets, contactSchema, projectTypes, timelines, type ContactInput } from "@/lib/contact-schema";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

type Status = { state: "idle" } | { state: "success"; name: string } | { state: "error"; message: string };

const defaultValues: ContactInput = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>({ state: "idle" });
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues, mode: "onTouched" });

  const projectType = watch("projectType");
  const isRoleInquiry = projectType === "Full-time or long-term role";

  const onSubmit = async (values: ContactInput) => {
    setStatus({ state: "idle" });
    const payload: ContactInput =
      values.projectType === "Full-time or long-term role" ? { ...values, budget: "" } : values;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong while sending.");
      setStatus({ state: "success", name: payload.name.split(" ")[0] });
      reset(defaultValues);
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Something went wrong while sending.",
      });
    }
  };

  const mailtoHref = () => {
    const v = getValues();
    const subject = encodeURIComponent(`Inquiry from ${v.name || "your portfolio"}`);
    const body = encodeURIComponent(
      [
        v.message,
        "",
        v.company && `Company: ${v.company}`,
        v.projectType && `Type: ${v.projectType}`,
        !isRoleInquiry && v.budget && `Budget: ${v.budget}`,
        v.timeline && `Timeline: ${v.timeline}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status.state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border bg-card/60 p-8 text-center"
            role="status"
          >
            <span className="grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
              <CheckCircle2Icon className="size-7" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">Thanks, {status.name}. Message received.</h3>
            <p className="mt-3 max-w-sm text-muted-foreground">
              I&apos;ll read it properly and reply within 24 hours, usually with a few questions or a first take on
              scope.
            </p>
            <Button variant="outline" className="mt-8" onClick={() => setStatus({ state: "idle" })}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5 rounded-3xl border bg-card/60 p-6 shadow-2xl shadow-black/5 backdrop-blur sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" htmlFor="name" error={errors.name?.message} required>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
              </Field>
              <Field label="Email" htmlFor="email" error={errors.email?.message} required>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company" htmlFor="company" optional>
                <Input id="company" autoComplete="organization" placeholder="Acme GmbH" {...register("company")} />
              </Field>
              <Field label="What do you need?" htmlFor="projectType" optional>
                <ControlledSelect
                  control={control}
                  name="projectType"
                  id="projectType"
                  placeholder="Pick one"
                  options={projectTypes}
                />
              </Field>
            </div>

            <div className={cn("grid gap-5", !isRoleInquiry && "sm:grid-cols-2")}>
              {!isRoleInquiry ? (
                <Field label="Budget" htmlFor="budget" optional>
                  <ControlledSelect
                    control={control}
                    name="budget"
                    id="budget"
                    placeholder="Rough range"
                    options={budgets}
                  />
                </Field>
              ) : null}
              <Field label="Timeline" htmlFor="timeline" optional>
                <ControlledSelect
                  control={control}
                  name="timeline"
                  id="timeline"
                  placeholder="When to start"
                  options={timelines}
                />
              </Field>
            </div>

            <Field
              label={isRoleInquiry ? "Tell me about the role" : "Tell me about the project or role"}
              htmlFor="message"
              error={errors.message?.message}
              required
            >
              <Textarea
                id="message"
                rows={5}
                placeholder={
                  isRoleInquiry
                    ? "Role title, stack, team, location or remote setup, and anything else that helps. Links welcome."
                    : "What you're building, who it's for, and where you're stuck — or the role you're hiring for. Links welcome."
                }
                className="min-h-32 resize-y"
                aria-invalid={!!errors.message}
                {...register("message")}
              />
            </Field>

            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <AnimatePresence>
              {status.state === "error" ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  className="overflow-hidden"
                >
                  <div className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
                    <AlertCircleIcon className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <div>
                      <p className="font-medium">{status.message}</p>
                      <p className="mt-1 text-muted-foreground">
                        Your message is still here.{" "}
                        <a href={mailtoHref()} className="font-medium text-foreground underline underline-offset-4">
                          Send it by email instead
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex flex-col-reverse items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <MailIcon className="size-3.5" />
                Goes straight to my inbox. No newsletters, ever.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-11 w-full rounded-xl bg-brand px-5 text-brand-foreground hover:bg-brand/90 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <SendIcon />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="flex items-center gap-1.5">
        {label}
        {required ? <span className="text-brand">*</span> : null}
        {optional ? <span className="text-xs font-normal text-muted-foreground">optional</span> : null}
      </Label>
      {children}
      <p className={cn("text-xs text-destructive", !error && "sr-only")} aria-live="polite">
        {error}
      </p>
    </div>
  );
}

function ControlledSelect({
  control,
  name,
  id,
  placeholder,
  options,
}: {
  control: ReturnType<typeof useForm<ContactInput>>["control"];
  name: "projectType" | "budget" | "timeline";
  id: string;
  placeholder: string;
  options: readonly string[];
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select value={field.value || undefined} onValueChange={field.onChange} key={field.value || "empty"}>
          <SelectTrigger id={id} className="w-full" onBlur={field.onBlur}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
