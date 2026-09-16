import { NextResponse } from "next/server";

/** Normalize Bitrix webhook base URL (no method suffix). */
function normalizeWebhookUrl(raw: string): string {
  let trimmed = raw.trim().replace(/^["']|["']$/g, "");
  if (!trimmed) return "";
  return trimmed
    .replace(/crm\.lead\.add(\.json)?\/?$/i, "")
    .replace(/\/?$/, "/");
}

function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Quiz lead → Bitrix via SEND_LEADS_QUIZ.
 * Uses JSON POST body (not query string) to avoid 414 Request-URI Too Large.
 */
export async function POST(req: Request) {
  try {
    const webhookUrl = normalizeWebhookUrl(process.env.SEND_LEADS_QUIZ ?? "");
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "Bitrix is not configured (SEND_LEADS_QUIZ)" },
        { status: 500 },
      );
    }

    if (!isValidHttpUrl(webhookUrl)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "SEND_LEADS_QUIZ is not a valid URL. Use Bitrix incoming webhook base, e.g. https://xxx.bitrix24.com/rest/1/xxxxx/",
        },
        { status: 500 },
      );
    }

    const body = await req.json();
    const fields: Record<string, unknown> = {
      TITLE: body.title || "Quiz Lead",
      NAME: body.name,
      HAS_EMAIL: "Y",
      EMAIL: [{ VALUE_TYPE: "WORK", VALUE: body.email }],
      HAS_PHONE: "Y",
      PHONE: [{ VALUE_TYPE: "WORK", VALUE: body.phone }],
      COMMENTS: body.answers || "",
      SOURCE_ID: String(body.source_id ?? "WEB"),
      UTM_SOURCE: body.utm?.source || "",
      UTM_MEDIUM: body.utm?.medium || "",
      UTM_CAMPAIGN: body.utm?.campaign || "",
      UTM_CONTENT: body.utm?.content || "",
      UTM_TERM: body.utm?.term || "",
    };

    const endpoint = `${webhookUrl}crm.lead.add.json`;
    const bitrixRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ fields }),
    });

    const bitrixJson = await bitrixRes.json().catch(() => null);

    if (!bitrixRes.ok || bitrixJson?.error) {
      console.error("❌ Bitrix quiz API error:", bitrixJson || bitrixRes.statusText);
      return NextResponse.json(
        {
          success: false,
          error:
            bitrixJson?.error_description ||
            bitrixJson?.error ||
            `Bitrix HTTP ${bitrixRes.status}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, lead: bitrixJson });
  } catch (err: any) {
    console.error("❌ Bitrix quiz API error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unknown error" },
      { status: 500 },
    );
  }
}
