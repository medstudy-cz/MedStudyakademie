import "server-only";
import sgMail, { type MailDataRequired } from "@sendgrid/mail";

export type SendEmailParams = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  category?: string;
  sandbox?: boolean;
};

function getApiKey(): string {
  const key = process.env.SENDGRID_API_KEY?.trim();
  if (!key) throw new Error("SENDGRID_API_KEY is not set");
  return key;
}

const FROM_EMAIL = () =>
  process.env.EMAIL_FROM?.trim() || "noreply@medstudy.cz";
const FROM_NAME = () =>
  process.env.EMAIL_FROM_NAME?.trim() || "MedStudy Akademie | Quiz";
const DEFAULT_REPLY_TO = () =>
  process.env.EMAIL_REPLY_TO?.trim() || "sales@medstudy.cz";

async function sendWithRetry(
  message: MailDataRequired,
  attempts = 3,
): Promise<void> {
  for (let i = 1; i <= attempts; i++) {
    try {
      await sgMail.send(message);
      return;
    } catch (err: any) {
      console.error(
        `[email] SendGrid attempt ${i} failed`,
        err?.response?.body || err,
      );
      if (i === attempts) throw err;
      await new Promise((r) => setTimeout(r, 300 * i * i));
    }
  }
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
  category = "quiz",
}: SendEmailParams): Promise<boolean> {
  sgMail.setApiKey(getApiKey());

  const recipients = Array.isArray(to) ? to : [to];
  if (!recipients.length) throw new Error("Invalid recipient email");

  const msg: MailDataRequired = {
    to: recipients,
    from: { email: FROM_EMAIL(), name: FROM_NAME() },
    replyTo: replyTo || DEFAULT_REPLY_TO(),
    subject,
    html,
    ...(text ? { text } : {}),
    categories: [category],
    mailSettings: { sandboxMode: { enable: false } },
    trackingSettings: {
      clickTracking: { enable: true, enableText: true },
      openTracking: { enable: true },
    },
  };

  try {
    await sendWithRetry(msg);
    return true;
  } catch (err: any) {
    console.error("[email] sendEmail failed:", {
      to: recipients,
      subject,
      from: FROM_EMAIL(),
      error: err?.response?.body || err?.message || err,
    });
    return false;
  }
}
