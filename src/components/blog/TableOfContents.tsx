"use client";

import { useEffect, useMemo, useState } from "react";
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
  const items = useMemo(
    () => headings.filter((h) => Boolean(h.id)),
    [headings],
  );

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: [0, 0.25, 1] },
    );

    items.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  function scrollToHeading(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    // Do not touch location.hash — empty/Cyrillic hashes jump the page to top.
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return (
    <nav
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
      aria-label="Table of contents"
    >
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-bold text-slate-900">
        <List className="h-4 w-4 text-primary" />
        <span>{title}</span>
      </div>
      <ul className="space-y-2.5 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={cn("transition-colors", item.level === 3 && "pl-4 text-xs")}
            >
              <button
                type="button"
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  "block w-full py-0.5 text-left leading-snug transition-colors hover:text-primary",
                  isActive
                    ? "font-semibold text-primary"
                    : "text-slate-600 hover:text-slate-900",
                )}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
