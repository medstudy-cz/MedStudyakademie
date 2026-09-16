import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/features/quiz/integrations/email";

const ADMIN_EMAIL =
  process.env.QUIZ_ADMIN_EMAIL?.trim() || "adm.cur.medstudy@gmail.com";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SENDGRID_API_KEY?.trim()) {
      return NextResponse.json(
        { error: "SENDGRID_API_KEY is not set" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { name, email, phone, subject, html, adminAnswersHtml } = body;

    if (!name || !email || !html || !subject) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const text = html.replace(/<\/?[^>]+(>|$)/g, "");
    const adminSubject = `${String(name).toUpperCase()} ${phone || ""}`.trim();

    const adminHtml = `
${typeof adminAnswersHtml === "string" ? adminAnswersHtml : ""}
<hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
<section style="font-family:sans-serif;color:#153060;">
  <h2 style="font-size:18px;margin:0 0 12px;">Письмо, отправленное клиенту</h2>
  ${html}
</section>
`.trim();

    const adminText = `${
      typeof adminAnswersHtml === "string"
        ? adminAnswersHtml.replace(/<\/?[^>]+(>|$)/g, "")
        : ""
    }\n\n---\nПисьмо клиенту:\n${text}`;

    const [clientSent, adminSent] = await Promise.all([
      sendEmail({
        to: email,
        subject,
        html,
        text,
      }),
      sendEmail({
        to: ADMIN_EMAIL,
        subject: adminSubject,
        html: adminHtml,
        text: adminText,
        category: "quiz-admin",
      }),
    ]);

    if (!clientSent) {
      return NextResponse.json(
        {
          error: "Failed to send email",
          hint: "Check SENDGRID_API_KEY and that EMAIL_FROM is a verified sender in SendGrid",
          from: process.env.EMAIL_FROM?.trim() || "noreply@medstudy.cz",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      adminSent: Boolean(adminSent),
    });
  } catch (err: any) {
    console.error("SendEmail API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
