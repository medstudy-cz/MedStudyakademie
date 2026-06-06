"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { postLeadWithRetry } from "@/lib/post-lead-client";
import {
  createContactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact-form";

const LOCALE_TO_COUNTRY: Record<string, string> = {
  cz: "CZ",
  ua: "UA",
  ru: "RU",
  en: "CZ",
};

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tv = useTranslations("contact.validation");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const schema = useMemo(
    () =>
      createContactSchema({
        nameRequired: tv("nameRequired"),
        emailInvalid: tv("emailInvalid"),
        phoneRequired: tv("phoneRequired"),
        subjectRequired: tv("subjectRequired"),
        messageMin: tv("messageMin"),
      }),
    [tv],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("idle");

    try {
      await postLeadWithRetry<{ message: string; leadId?: number }>("/lead", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        locale,
        country: LOCALE_TO_COUNTRY[locale] ?? "CZ",
        utm: Object.fromEntries(searchParams.entries()),
      });

      // Analytics (GTM / Meta / TikTok) — fire only after successful API response
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="name">{t("name")}</Label>
        <Input id="name" autoComplete="name" {...register("name")} />
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">{t("phone")}</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">{t("subject")}</Label>
        <Input id="subject" {...register("subject")} />
        {errors.subject && (
          <p className="text-xs text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" rows={5} {...register("message")} />
        {errors.message && (
          <p className="text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      {status === "success" && (
        <p
          className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800"
          role="status"
        >
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {t("error")}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
