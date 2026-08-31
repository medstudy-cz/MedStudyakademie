import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "./ContactForm";

const CONTACT_PHONE_TEL = "+420774258018";

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading title={t("title")} />
        </ScrollReveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal delay={0.05}>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-6 rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {t("infoTitle")}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href={`mailto:${t("email")}`}
                      className="flex items-center gap-3 text-slate-700 transition-colors hover:text-primary"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="font-medium">{t("email")}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACT_PHONE_TEL}`}
                      className="flex items-center gap-3 text-slate-700 transition-colors hover:text-primary"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="font-medium">{t("phone")}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
