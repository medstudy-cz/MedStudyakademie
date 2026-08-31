"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Sparkles } from "lucide-react";
import { BlogCard, type BlogCardPost } from "./BlogCard";
import { Input } from "@/components/ui/input";

interface BlogListingClientProps {
  initialPosts: BlogCardPost[];
  locale: string;
}

export function BlogListingClient({ initialPosts, locale }: BlogListingClientProps) {
  const t = useTranslations("blog");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return initialPosts;
    return initialPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(query))
    );
  }, [initialPosts, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>MedStudy Akademie Blog</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          {t("subtitle")}
        </p>

        {/* Search input */}
        {initialPosts.length > 0 && (
          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-11 pl-10 rounded-full border-slate-200 bg-white shadow-xs focus-visible:ring-primary"
            />
          </div>
        )}
      </div>

      {/* Articles Grid */}
      <div className="mt-12 sm:mt-16">
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                locale={locale}
                readMoreText={t("readMore")}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-12 text-center">
            <p className="text-base font-medium text-slate-600">
              {t("empty")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
