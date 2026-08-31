import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  LEGAL_ADDRESS,
  LEGAL_COMPANY_NAME,
  LEGAL_ICO,
} from "@/lib/legal";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2 text-sm text-slate-600">
            <p className="text-base font-semibold text-slate-900">
              {t("orgName")}
            </p>
            <p>{t("orgType")}</p>
            <p>{t("country")}</p>
            <p className="pt-2">{t("legalNote")}</p>
          </div>

          <dl className="space-y-4 text-sm text-slate-600">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("legalCompanyName")}
              </dt>
              <dd className="mt-1 font-medium text-slate-800">
                {LEGAL_COMPANY_NAME}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("legalAddress")}
              </dt>
              <dd className="mt-1 leading-relaxed">{LEGAL_ADDRESS}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("legalIco")}
              </dt>
              <dd className="mt-1 font-medium text-slate-800">{LEGAL_ICO}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 text-sm md:items-start lg:items-end">
            <Link
              href="/blog"
              className="font-medium text-primary hover:underline"
            >
              Blog
            </Link>
            <Link
              href="/"
              className="font-medium text-primary hover:underline"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/"
              className="font-medium text-primary hover:underline"
            >
              {t("annualReports")}
            </Link>
          </div>
        </div>

        <p className="mt-8 rounded-lg border border-sky-100 bg-white px-4 py-3 text-xs leading-relaxed text-slate-600">
          {t("googleWorkspaceVerification")}
        </p>

        <p className="mt-6 text-center text-xs text-slate-500">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
