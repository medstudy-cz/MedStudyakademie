import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  LEGAL_ADDRESS,
  LEGAL_COMPANY_NAME,
  LEGAL_ICO,
} from "@/lib/legal";
import { pageAlternates } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type WhatItem = {
  title: string;
  description: string;
  href: string;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: pageAlternates(locale, "/about"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: pageAlternates(locale, "/about").canonical,
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const whoParagraphs = t.raw("whoParagraphs") as string[];
  const whatItems = t.raw("whatItems") as WhatItem[];
  const audienceItems = t.raw("audienceItems") as string[];

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
          {t("lead")}
        </p>

        <section className="mt-10 rounded-2xl border border-sky-100 bg-sky-50/60 px-5 py-6 sm:px-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {t("missionTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {t("mission")}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">
            {t("whoTitle")}
          </h2>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-600">
            {whoParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">
            {t("whatTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {t("whatIntro")}
          </p>
          <ul className="mt-5 space-y-4">
            {whatItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href as any}
                  className="block rounded-xl border border-slate-100 px-4 py-3 transition-colors hover:border-sky-200 hover:bg-sky-50/50"
                >
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">
            {t("audienceTitle")}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-600">
            {audienceItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-6 sm:px-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {t("legalTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {t("legalIntro")}
          </p>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-semibold uppercase tracking-wide text-slate-500">
                {t("legalNameLabel")}
              </dt>
              <dd className="mt-1 font-medium text-slate-800">
                {LEGAL_COMPANY_NAME}
              </dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wide text-slate-500">
                {t("legalAddressLabel")}
              </dt>
              <dd className="mt-1 text-slate-700">{LEGAL_ADDRESS}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wide text-slate-500">
                {t("legalIcoLabel")}
              </dt>
              <dd className="mt-1 font-medium text-slate-800">{LEGAL_ICO}</dd>
            </div>
          </dl>
        </section>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-100 pt-8 sm:flex-row sm:flex-wrap">
          <Link
            href="/transparency"
            className={buttonVariants({ size: "lg" })}
          >
            {t("transparencyLink")}
          </Link>
          <Link
            href={{ pathname: "/", hash: "contact" }}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {t("contactCta")}
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {t("homeCta")}
          </Link>
        </div>
      </div>
    </article>
  );
}
