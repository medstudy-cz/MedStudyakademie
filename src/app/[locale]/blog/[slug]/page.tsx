import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sanityFetch, urlForImage } from "@/sanity/lib/client";
import {
  BLOG_POST_BY_SLUG_QUERY,
  SIMILAR_BLOG_POSTS_QUERY,
  ALL_BLOG_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { extractHeadings } from "@/lib/blog-utils";
import { BlogLeadCta } from "@/components/blog/BlogLeadCta";
import { BlogCard } from "@/components/blog/BlogCard";
import { Calendar, ArrowLeft } from "lucide-react";
import { type Locale } from "@/i18n/routing";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  try {
    const posts = await sanityFetch<{ slug: string; locale: string }[]>({
      query: ALL_BLOG_SLUGS_QUERY,
      revalidate: 60,
    });
    return (posts || []).map((p) => ({
      locale: p.locale,
      slug: p.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await sanityFetch<any>({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { slug, locale },
    revalidate: 60,
  });

  if (!post) {
    return { title: "Blog Article | MedStudyacademy z.s." };
  }

  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = post.seo?.metaDescription || post.excerpt || post.title;
  const imageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(1200).height(630).url()
    : undefined;

  return {
    title: `${metaTitle} | MedStudyacademy z.s.`,
    description: metaDescription,
    keywords: post.seo?.keywords,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        "cs-CZ": `/cz/blog/${slug}`,
        "uk-UA": `/ua/blog/${slug}`,
        "ru-RU": `/ru/blog/${slug}`,
        "en-US": `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `/${locale}/blog/${slug}`,
      type: "article",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [post, similarPosts, t] = await Promise.all([
    sanityFetch<any>({
      query: BLOG_POST_BY_SLUG_QUERY,
      params: { slug, locale },
      revalidate: 60,
    }),
    sanityFetch<any[]>({
      query: SIMILAR_BLOG_POSTS_QUERY,
      params: { slug, locale, currentSlug: slug },
      revalidate: 60,
    }),
    getTranslations({ locale, namespace: "blog" }),
  ]);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const mainImageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(1200).height(675).url()
    : null;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(
        locale === "ru"
          ? "ru-RU"
          : locale === "ua"
            ? "uk-UA"
            : locale === "cz"
              ? "cs-CZ"
              : "en-GB",
        { day: "numeric", month: "long", year: "numeric" }
      )
    : "";

  return (
    <div className="bg-slate-50/50">
      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t("backToBlog")}</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mx-auto max-w-4xl text-center">
          {formattedDate && (
            <div className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </div>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {mainImageUrl && (
          <div className="relative my-10 aspect-[16/9] w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-sm">
            <Image
              src={mainImageUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        )}

        {/* Main Layout: Sidebar & Content */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          {/* Left/Main Column: Article Body */}
          <div className="min-w-0 flex-1">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs">
              <BlogArticleContent value={post.content} />
            </div>

            {/* In-article Bitrix Lead CTA */}
            <BlogLeadCta
              customTitle={post.ctaBanner?.title}
              customDescription={post.ctaBanner?.description}
              customButtonText={post.ctaBanner?.buttonText}
              articleTitle={post.title}
            />
          </div>

          {/* Right Column: Sticky Table of Contents */}
          {headings.length > 0 && (
            <aside className="hidden lg:block lg:w-72 shrink-0 sticky top-24 space-y-6">
              <TableOfContents
                headings={headings}
                title={t("tableOfContents")}
              />
            </aside>
          )}
        </div>

        {/* Similar/More Posts */}
        {similarPosts && similarPosts.length > 0 && (
          <section className="mt-20 border-t border-slate-200/80 pt-12">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {t("similarArticles")}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {similarPosts.map((simPost) => (
                <BlogCard
                  key={simPost._id}
                  post={simPost}
                  locale={locale}
                  readMoreText={t("readMore")}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
