import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { pageAlternates } from "@/lib/site";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type PrivacySection = {
  heading: string;
  paragraphs: string[];
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: pageAlternates(locale, "/privacy"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: pageAlternates(locale, "/privacy").canonical,
      type: "website",
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "privacyPage" });
  const sections = t.raw("sections") as PrivacySection[];

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-sm font-medium text-slate-500">{t("updated")}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
          {t("intro")}
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-slate-900">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            MedStudyacademy z.s.
          </Link>
        </div>
      </div>
    </article>
  );
}
