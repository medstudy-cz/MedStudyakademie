import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlForImage } from "@/sanity/lib/client";
import { Calendar, ArrowRight } from "lucide-react";

export type BlogCardPost = {
  _id: string;
  title: string;
  slug: string;
  locale: string;
  publishedAt?: string;
  excerpt?: string;
  mainImage?: any;
};

interface BlogCardProps {
  post: BlogCardPost;
  locale: string;
  readMoreText: string;
}

export function BlogCard({ post, locale, readMoreText }: BlogCardProps) {
  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.width(800).height(450).url() : null;

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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      <Link href={`/blog/${post.slug}` as any} className="block overflow-hidden bg-slate-100 aspect-[16/9] relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-slate-100 to-slate-200 text-slate-400">
            <span className="font-semibold text-primary/40">MedStudy Akademie</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {formattedDate && (
            <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </div>
          )}

          <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900 transition group-hover:text-primary">
            <Link href={`/blog/${post.slug}` as any}>
              {post.title}
            </Link>
          </h3>

          {post.excerpt && (
            <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="pt-5 mt-4 border-t border-slate-100">
          <Link
            href={`/blog/${post.slug}` as any}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition duration-200 group-hover:gap-2.5"
          >
            <span>{readMoreText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
