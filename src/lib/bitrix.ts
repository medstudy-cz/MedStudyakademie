import "server-only";
import Bitrix from "@2bad/bitrix";

/**
 * Required env: SEND_LEADS — Bitrix24 incoming webhook base URL (no method suffix).
 * Example: https://medstudy.bitrix24.com/rest/2452/xxxxxxxxxx/
 * Optional: LEAD_BACKUP_WEBHOOK_URL — Slack/Telegram backup when Bitrix fails.
 */

function normalizeWebhookUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return trimmed
    .replace(/crm\.lead\.add(\.json)?\/?$/i, "")
    .replace(/\/?$/, "/");
}

const webhookUrl = normalizeWebhookUrl(process.env.SEND_LEADS ?? "");

export const bitrix = webhookUrl ? Bitrix(webhookUrl) : null;

export type UTMArguments = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
};

export type LeadInfo = {
  email: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  locale?: string;
};

export type BitrixLeadFields = {
  TITLE: string;
  NAME: string;
  HAS_PHONE: "Y";
  HAS_EMAIL: "Y";
  PHONE: Array<{ VALUE_TYPE: "WORK"; VALUE: string }>;
  EMAIL: Array<{ VALUE_TYPE: "WORK"; VALUE: string }>;
  COMMENTS: string;
  SOURCE_ID: string;
  SOURCE_DESCRIPTION: string;
  UTM_SOURCE: string;
  UTM_MEDIUM: string;
  UTM_CAMPAIGN: string;
  UTM_CONTENT: string;
  UTM_TERM: string;
};

export function buildBitrixLeadFields(
  title: string,
  { email, name, phone, subject, message, locale }: LeadInfo,
  utm?: Partial<UTMArguments>,
): BitrixLeadFields {
  const u = utm ?? {};
  const localeTag = locale ?? "cz";

  return {
    TITLE: title,
    NAME: name,
    HAS_PHONE: "Y",
    HAS_EMAIL: "Y",
    PHONE: [{ VALUE_TYPE: "WORK", VALUE: phone }],
    EMAIL: [{ VALUE_TYPE: "WORK", VALUE: email }],
    COMMENTS: [
      `Subject: ${subject}`,
      `Message:\n${message}`,
      `Locale: ${localeTag}`,
    ].join("\n\n"),
    SOURCE_ID: "WEB",
    SOURCE_DESCRIPTION: `MedStudy Akademie landing (${localeTag})`,
    UTM_SOURCE: u.source ?? "",
    UTM_MEDIUM: u.medium ?? "",
    UTM_CAMPAIGN: u.campaign ?? "",
    UTM_CONTENT: u.content ?? "",
    UTM_TERM: u.term ?? "",
  };
}

export async function sendToBitrix(
  title: string,
  lead: LeadInfo,
  utm?: Partial<UTMArguments>,
) {
  if (!bitrix) {
    throw new Error("SEND_LEADS webhook URL is not configured");
  }

  const fields = buildBitrixLeadFields(title, lead, utm);

  console.log(
    "[BITRIX_SEND_START]",
    JSON.stringify({
      title,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      subject: lead.subject,
      messageLength: lead.message.length,
      locale: lead.locale ?? "cz",
      utm: utm ?? {},
      bitrixFields: {
        ...fields,
        COMMENTS: fields.COMMENTS.slice(0, 200),
      },
    }),
  );

  const response = await bitrix.leads.create(
    fields as unknown as Parameters<typeof bitrix.leads.create>[0],
  );

  console.log(
    "[BITRIX_SEND_OK]",
    JSON.stringify({
      leadId: response.result,
      durationMs: response.time?.duration,
      title,
      email: lead.email,
      phone: lead.phone,
    }),
  );

  return response;
}
