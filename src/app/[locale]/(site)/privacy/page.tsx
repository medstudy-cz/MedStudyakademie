import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/** Temporary: redirect until privacy policy page is ready. */
export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect({ href: "/", locale });
}
