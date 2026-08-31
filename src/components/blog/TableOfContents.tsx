"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeadingItem } from "@/lib/blog-utils";

export type { HeadingItem };

interface TableOfContentsProps {
  headings: HeadingItem[];
  title: string;
}

export function TableOfContents({ headings, title }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs" aria-label="Table of contents">
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-bold text-slate-900">
        <List className="h-4 w-4 text-primary" />
        <span>{title}</span>
      </div>
      <ul className="space-y-2.5 text-sm">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={cn(
                "transition-colors",
                item.level === 3 && "pl-4 text-xs"
              )}
            >
              <a
                href={`#${item.id}`}
                className={cn(
                  "block py-0.5 leading-snug transition-colors hover:text-primary",
                  isActive
                    ? "font-semibold text-primary"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
