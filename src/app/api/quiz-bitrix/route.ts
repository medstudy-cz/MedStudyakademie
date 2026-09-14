import { NextResponse } from "next/server";
import Bitrix from "@2bad/bitrix";

/** Normalize Bitrix webhook base URL (no method suffix). */
function normalizeWebhookUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return trimmed
    .replace(/crm\.lead\.add(\.json)?\/?$/i, "")
    .replace(/\/?$/, "/");
}

/** Quiz lead → Bitrix via SEND_LEADS_QUIZ (separate from akademie SEND_LEADS). */
export async function POST(req: Request) {
  try {
    const webhookUrl = normalizeWebhookUrl(process.env.SEND_LEADS_QUIZ ?? "");
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "Bitrix is not configured (SEND_LEADS_QUIZ)" },
        { status: 500 },
      );
    }

    const bitrix = Bitrix(webhookUrl);
    const body = await req.json();
    const leadData: Record<string, unknown> = {
      TITLE: body.title || "Quiz Lead",
      NAME: body.name,
      HAS_EMAIL: "Y",
      EMAIL: [{ VALUE_TYPE: "WORK", VALUE: body.email }],
      HAS_PHONE: "Y",
      PHONE: [{ VALUE_TYPE: "WORK", VALUE: body.phone }],
      COMMENTS: body.answers || "",
      SOURCE_ID: body.source_id ?? "WEB",
      UTM_SOURCE: body.utm?.source || "",
      UTM_MEDIUM: body.utm?.medium || "",
      UTM_CAMPAIGN: body.utm?.campaign || "",
      UTM_CONTENT: body.utm?.content || "",
      UTM_TERM: body.utm?.term || "",
    };

    const lead = await bitrix.leads.create(leadData as any);

    return NextResponse.json({ success: true, lead });
  } catch (err: any) {
    console.error("❌ Bitrix quiz API error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unknown error" },
      { status: 500 },
    );
  }
}
