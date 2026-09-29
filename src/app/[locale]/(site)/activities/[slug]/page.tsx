import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ActivityPageView } from "@/components/activities/ActivityPageView";
import {
  ACTIVITY_SLUGS,
  isActivitySlug,
  type ActivitySlug,
} from "@/lib/activity-slugs";
import { routing } from "@/i18n/routing";
import { pageAlternates } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ACTIVITY_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isActivitySlug(slug)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: `activityPages.${slug}`,
  });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: pageAlternates(locale, `/activities/${slug}`),
  };
}

export default async function ActivityPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isActivitySlug(slug)) {
    notFound();
  }

  return <ActivityPageView slug={slug as ActivitySlug} />;
}
