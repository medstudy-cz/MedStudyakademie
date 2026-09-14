import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogListingClient } from "@/components/blog/BlogListingClient";
import { sanityFetch } from "@/sanity/lib/client";
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { type Locale } from "@/i18n/routing";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: `${t("title")} | MedStudyacademy z.s.`,
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        "cs-CZ": `/cz/blog`,
        "uk-UA": `/ua/blog`,
        "ru-RU": `/ru/blog`,
        "en-US": `/en/blog`,
      },
    },
    openGraph: {
      title: `${t("title")} | MedStudyacademy z.s.`,
      description: t("subtitle"),
      url: `/${locale}/blog`,
      type: "website",
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let posts = [];
  try {
    posts = await sanityFetch<any[]>({
      query: BLOG_POSTS_QUERY,
      params: { locale },
      revalidate: 60,
    });
  } catch (error) {
    console.error("Error fetching blog posts from Sanity:", error);
  }

  return (
    <div className="bg-slate-50/50">
      <BlogListingClient initialPosts={posts || []} locale={locale} />
    </div>
  );
}
