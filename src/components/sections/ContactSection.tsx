import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "./ContactForm";
import {
  LEGAL_ADDRESS,
  LEGAL_COMPANY_NAME,
  LEGAL_ICO,
} from "@/lib/legal";

const CONTACT_PHONE_TEL = "+420774258018";

export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} />

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>

          <div className="space-y-6 rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {t("infoTitle")}
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {t("legalCompanyName")}
                    </p>
                    <p className="mt-0.5 font-medium">{LEGAL_COMPANY_NAME}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {t("legalAddress")}
                    </p>
                    <p className="mt-0.5 font-medium leading-relaxed">
                      {LEGAL_ADDRESS}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="mt-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    ID
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {t("legalIco")}
                    </p>
                    <p className="mt-0.5 font-medium">{LEGAL_ICO}</p>
                  </div>
                </li>
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
        </div>
      </div>
    </section>
  );
}
