"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import { localeToHtmlLang } from "@/lib/site";

/** Syncs document lang with BCP 47 tag for the active next-intl locale. */
export function LocaleHtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang(locale);
  }, [locale]);

  return null;
}
