import "server-only";
import type { LeadInfo, UTMArguments } from "@/lib/bitrix";

export type LeadPayload = LeadInfo & {
  title: string;
  utm: UTMArguments;
};

/** Accepts { source, medium... } or { utm_source, utm_medium... } */
export function normalizeUtm(raw: unknown): UTMArguments {
  const empty = { source: "", medium: "", campaign: "", content: "", term: "" };
  if (!raw || typeof raw !== "object") return empty;
  const u = raw as Record<string, unknown>;
  return {
    source: String(u.source ?? u.utm_source ?? ""),
    medium: String(u.medium ?? u.utm_medium ?? ""),
    campaign: String(u.campaign ?? u.utm_campaign ?? ""),
    content: String(u.content ?? u.utm_content ?? ""),
    term: String(u.term ?? u.utm_term ?? ""),
  };
}

export function logLeadEvent(
  event: "LEAD_OK" | "LEAD_VALIDATION_FAIL" | "LEAD_BITRIX_FAIL" | "LEAD_ERROR",
  data: Record<string, unknown>,
) {
  console.log(`[${event}]`, JSON.stringify(data));
}

export async function backupLeadWebhook(payload: LeadPayload): Promise<void> {
  const url = process.env.LEAD_BACKUP_WEBHOOK_URL?.trim();
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [
          `Lead backup: ${payload.title}`,
          `Name: ${payload.name}`,
          `Phone: ${payload.phone}`,
          `Email: ${payload.email}`,
          `Subject: ${payload.subject}`,
          payload.message ? `Message: ${payload.message}` : "",
          payload.locale ? `Locale: ${payload.locale}` : "",
          `UTM: ${JSON.stringify(payload.utm)}`,
        ]
          .filter(Boolean)
          .join("\n"),
        payload,
      }),
      signal: AbortSignal.timeout(8000),
    });
    console.log("[LEAD_BACKUP_OK]", JSON.stringify({ title: payload.title }));
  } catch (err) {
    console.error("[LEAD_BACKUP_FAIL]", err);
  }
}
