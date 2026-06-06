import { NextRequest, NextResponse } from "next/server";
import parsePhoneNumber, { type CountryCode } from "libphonenumber-js";
import validator from "email-validator";
import { sendToBitrix } from "@/lib/bitrix";
import {
  backupLeadWebhook,
  logLeadEvent,
  normalizeUtm,
  type LeadPayload,
} from "@/lib/lead-server";

const LOCALE_TO_COUNTRY: Record<string, CountryCode> = {
  cz: "CZ",
  ua: "UA",
  ru: "RU",
  en: "CZ",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(
      "[LEAD_REQUEST]",
      JSON.stringify({
        name: body?.name,
        email: body?.email,
        phone: body?.phone,
        subject: body?.subject,
        messageLength: typeof body?.message === "string" ? body.message.length : 0,
        locale: body?.locale,
        country: body?.country,
        utm: body?.utm,
      }),
    );

    const country =
      (body?.country as CountryCode | undefined) ??
      LOCALE_TO_COUNTRY[String(body?.locale ?? "cz")] ??
      "CZ";

    const phoneNumber = parsePhoneNumber(body?.phone, country);
    const numberIsValid = phoneNumber?.isValid();
    const emailIsValid = validator.validate(body?.email);

    if (
      numberIsValid !== true ||
      !emailIsValid ||
      typeof body?.name !== "string" ||
      body.name.trim().length < 2 ||
      typeof body?.subject !== "string" ||
      !body.subject.trim() ||
      typeof body?.message !== "string" ||
      body.message.trim().length < 10
    ) {
      logLeadEvent("LEAD_VALIDATION_FAIL", {
        phoneValid: numberIsValid,
        emailValid: emailIsValid,
        nameLength: typeof body?.name === "string" ? body.name.trim().length : 0,
        subjectPresent: Boolean(body?.subject?.trim?.()),
        messageLength:
          typeof body?.message === "string" ? body.message.trim().length : 0,
      });
      return NextResponse.json(
        {
          message:
            "Validation error. Please check that your information is correct",
        },
        { status: 401 },
      );
    }

    const title = body.subject.trim();
    const leadPayload: LeadPayload = {
      email: body.email.trim(),
      name: body.name.trim(),
      phone: body.phone.trim(),
      subject: body.subject.trim(),
      message: body.message.trim(),
      locale: typeof body.locale === "string" ? body.locale : "cz",
      title,
      utm: normalizeUtm(body?.utm),
    };

    try {
      const bitrixResponse = await sendToBitrix(
        title,
        leadPayload,
        leadPayload.utm,
      );

      logLeadEvent("LEAD_OK", {
        leadId: bitrixResponse.result,
        title,
        email: leadPayload.email,
        name: leadPayload.name,
        phone: leadPayload.phone,
        subject: leadPayload.subject,
        locale: leadPayload.locale,
        utm: leadPayload.utm,
      });

      return NextResponse.json({
        message: "DONE",
        leadId: bitrixResponse.result,
      });
    } catch (bitrixError) {
      logLeadEvent("LEAD_BITRIX_FAIL", {
        title,
        email: leadPayload.email,
        name: leadPayload.name,
        phone: leadPayload.phone,
        subject: leadPayload.subject,
        error:
          bitrixError instanceof Error
            ? bitrixError.message
            : String(bitrixError),
      });
      await backupLeadWebhook(leadPayload);
      return NextResponse.json(
        { message: "Could not save lead. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    logLeadEvent("LEAD_ERROR", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 },
    );
  }
}
