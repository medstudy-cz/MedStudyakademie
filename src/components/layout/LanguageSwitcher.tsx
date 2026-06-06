"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  variant?: "dropdown" | "inline";
  onLocaleChange?: () => void;
};

export function LanguageSwitcher({
  className,
  variant = "dropdown",
  onLocaleChange,
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeLabels");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "dropdown") return;

    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant]);

  function selectLocale(code: Locale) {
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
    setOpen(false);
    onLocaleChange?.();
  }

  if (variant === "inline") {
    return (
      <div
        className={cn("flex gap-2", className)}
        role="group"
        aria-label="Language"
      >
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => selectLocale(code)}
            className={cn(
              "min-w-[3rem] flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all",
              locale === code
                ? "bg-primary text-white shadow-sm"
                : "bg-sky-50 text-slate-600 hover:bg-sky-100 hover:text-primary",
            )}
            aria-current={locale === code ? "true" : undefined}
            aria-label={t(code)}
          >
            {code}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full min-w-[9rem] items-center justify-between gap-2 rounded-lg border border-sky-100 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all",
          "hover:border-primary/30 hover:text-primary",
          open && "border-primary/40 text-primary ring-2 ring-primary/10",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
      >
        <span>{t(locale)}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300",
            open && "rotate-180 text-primary",
          )}
          aria-hidden
        />
      </button>

      <ul
        role="listbox"
        aria-label="Language"
        className={cn(
          "absolute right-0 z-50 mt-1.5 min-w-full overflow-hidden rounded-lg border border-slate-100 bg-white py-1 shadow-lg",
          "origin-top transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {locales.map((code) => (
          <li key={code} role="option" aria-selected={locale === code}>
            <button
              type="button"
              onClick={() => selectLocale(code)}
              className={cn(
                "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors",
                locale === code
                  ? "bg-sky-50 font-medium text-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary",
              )}
            >
              {t(code)}
              {locale === code && (
                <Check className="h-4 w-4 shrink-0" aria-hidden />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
