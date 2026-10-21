import { Resend } from "resend";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function render(data: ContactInput) {
  const rows: [string, string | undefined][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Project", data.projectType],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
  ];
  const filled = rows.filter(([, v]) => v);
  const text = [...filled.map(([k, v]) => `${k}: ${v}`), "", data.message].join("\n");
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <h2 style="margin:0 0 16px">New portfolio inquiry</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">
        ${filled
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${escape(v!)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="white-space:pre-wrap;margin:0;padding:16px;background:#f5f5f7;border-radius:8px">${escape(data.message)}</p>
    </div>`;
  return { text, html };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots that fill the hidden field get a fake success so they don't retry.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return Response.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many messages in a short time. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Please check the highlighted fields and try again." }, { status: 422 });
  }

  const data = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || "siddhantsharma909@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const subject = `New inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`;
  const { text, html } = render(data);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(
      "[contact] RESEND_API_KEY is not set, so this message was logged instead of emailed:\n" +
        `To: ${to}\nSubject: ${subject}\n\n${text}`,
    );
    return Response.json({ ok: true, mock: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, replyTo: data.email, subject, text, html });
    if (error) {
      console.error("[contact] Resend error", error);
      return Response.json({ error: "The message couldn't be sent right now." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return Response.json({ error: "The message couldn't be sent right now." }, { status: 500 });
  }
}
