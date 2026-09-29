"use client";

import { useMemo } from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/client";
import { slugify } from "@/lib/blog-utils";

function createUniqueIdFactory() {
  const usedIds = new Map<string, number>();
  return (text: string, fallback: string) => {
    let id = slugify(text.trim()) || fallback;
    const count = usedIds.get(id) ?? 0;
    usedIds.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;
    return id;
  };
}

function textFromValue(value: { children?: { text?: string }[] } | undefined) {
  return Array.isArray(value?.children)
    ? value.children.map((c) => c.text || "").join("")
    : "";
}

function createPortableTextComponents(
  nextHeadingId: (text: string, fallback: string) => string,
): PortableTextComponents {
  return {
    block: {
      h2: ({ children, value }) => {
        const id = nextHeadingId(textFromValue(value), "h2");
        return (
          <h2
            id={id}
            className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mt-10 mb-4"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children, value }) => {
        const id = nextHeadingId(textFromValue(value), "h3");
        return (
          <h3
            id={id}
            className="scroll-mt-28 text-xl font-bold tracking-tight text-slate-800 sm:text-2xl mt-8 mb-3"
          >
            {children}
          </h3>
        );
      },
      normal: ({ children }) => (
        <p className="mb-5 text-base sm:text-lg leading-relaxed text-slate-700">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-6 border-l-4 border-primary pl-4 py-1 italic text-slate-700 bg-slate-50/80 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-700 sm:text-lg">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mb-6 ml-6 list-decimal space-y-2 text-slate-700 sm:text-lg">
          {children}
        </ol>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-slate-900">{children}</strong>
      ),
      link: ({ children, value }) => {
        const href = value?.href || "#";
        const isExternal = href.startsWith("http");
        return (
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }) => {
        const imageUrl = urlForImage(value)?.width(1200).url();
        if (!imageUrl) return null;
        return (
          <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50">
            <div className="relative aspect-video w-full">
              <Image
                src={imageUrl}
                alt={value.alt || "Article illustration"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
            {value.caption && (
              <figcaption className="p-3 text-center text-xs sm:text-sm text-slate-500">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };
}

export function BlogArticleContent({ value }: { value: any }) {
  const components = useMemo(() => {
    // New id factory each time content identity changes (same order as extractHeadings)
    return createPortableTextComponents(createUniqueIdFactory());
  }, [value]);

  if (!value) return null;
  return (
    <div className="blog-content">
      <PortableText value={value} components={components} />
    </div>
  );
}
