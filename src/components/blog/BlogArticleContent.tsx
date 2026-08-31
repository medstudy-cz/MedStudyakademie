"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/client";
import { slugify } from "@/lib/blog-utils";

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const text = Array.isArray(value?.children)
        ? value.children.map((c: any) => c.text || "").join("")
        : String(children || "");
      const id = slugify(text);
      return (
        <h2 id={id} className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mt-10 mb-4">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text = Array.isArray(value?.children)
        ? value.children.map((c: any) => c.text || "").join("")
        : String(children || "");
      const id = slugify(text);
      return (
        <h3 id={id} className="scroll-mt-28 text-xl font-bold tracking-tight text-slate-800 sm:text-2xl mt-8 mb-3">
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
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
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

export function BlogArticleContent({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="blog-content">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
