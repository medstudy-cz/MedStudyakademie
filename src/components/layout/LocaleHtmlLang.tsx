"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/** Syncs document lang with active next-intl locale (html lives in root layout). */
export function LocaleHtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
