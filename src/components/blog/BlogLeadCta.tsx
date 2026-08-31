"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postLeadWithRetry } from "@/lib/post-lead-client";
import {
  createContactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact-form";
import { MessageSquareText, CheckCircle2 } from "lucide-react";

interface BlogLeadCtaProps {
  customTitle?: string;
  customDescription?: string;
  customButtonText?: string;
  articleTitle?: string;
}

export function BlogLeadCta({
  customTitle,
  customDescription,
  customButtonText,
  articleTitle,
}: BlogLeadCtaProps) {
  const t = useTranslations("blog");
  const tf = useTranslations("contact.form");
  const tv = useTranslations("contact.validation");
  const locale = useLocale();
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
    [tv]
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
      subject: `НКО Блог: ${articleTitle || "Консультация"}`,
      message: `НКО: Заявка со статьи блога: "${articleTitle || "Блог"}" (${locale})`,
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("idle");
    try {
      const formattedMessage = data.message?.startsWith("НКО")
        ? data.message
        : `НКО: ${data.message || `Заявка со статьи блога "${articleTitle || "Блог"}"`}`;

      const formattedSubject = data.subject?.startsWith("НКО")
        ? data.subject
        : `НКО ${data.subject || `Блог: ${articleTitle || "Консультация"}`}`;

      await postLeadWithRetry<{ message: string; leadId?: number }>("/lead", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: formattedSubject,
        message: formattedMessage,
        country: locale === "ua" ? "UA" : locale === "ru" ? "RU" : "CZ",
        locale,
        form: "blog-article-cta",
      });

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="my-12 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-sky-50 p-6 sm:p-10 shadow-xs">
      <div className="max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
          <MessageSquareText className="h-3.5 w-3.5" />
          <span>{locale === "cz" ? "Bezplatné poradenství" : locale === "ua" ? "Безкоштовна консультація" : locale === "ru" ? "Бесплатная консультация" : "Free Consultation"}</span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {customTitle || t("ctaTitle")}
        </h3>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">
          {customDescription || t("ctaDescription")}
        </p>

        {status === "success" ? (
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-sm font-medium">
              {tf("success")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="cta-name" className="text-xs text-slate-700">
                  {tf("name")} *
                </Label>
                <Input
                  id="cta-name"
                  placeholder={tf("name")}
                  {...register("name")}
                  className="mt-1 bg-white"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cta-phone" className="text-xs text-slate-700">
                  {tf("phone")} *
                </Label>
                <Input
                  id="cta-phone"
                  placeholder="+420..."
                  {...register("phone")}
                  className="mt-1 bg-white"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cta-email" className="text-xs text-slate-700">
                  {tf("email")} *
                </Label>
                <Input
                  id="cta-email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="mt-1 bg-white"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {status === "error" && (
              <p className="text-xs text-red-600 font-medium">{tf("error")}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 font-semibold shadow-sm"
            >
              {isSubmitting ? tf("sending") : customButtonText || t("ctaButton")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
