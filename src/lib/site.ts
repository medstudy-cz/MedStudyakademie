import { locales, type Locale } from "@/i18n/routing";

/** Production site origin used for canonical, hreflang, sitemap, robots. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://medstudyacademy.cz"
).replace(/\/$/, "");

/** URL path locale → BCP 47 language tag for hreflang / html lang. */
export const LOCALE_TO_HREFLANG: Record<Locale, string> = {
  cz: "cs",
  ua: "uk",
  ru: "ru",
  en: "en",
};

export function localeToHtmlLang(locale: string): string {
  if (locale in LOCALE_TO_HREFLANG) {
    return LOCALE_TO_HREFLANG[locale as Locale];
  }
  return locale;
}

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") {
    return SITE_URL;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/**
 * Path after the locale segment, e.g. "", "/blog", "/blog/my-post", "/privacy".
 */
export function languageAlternates(
  pathAfterLocale = "",
): Record<string, string> {
  const suffix =
    !pathAfterLocale || pathAfterLocale === "/"
      ? ""
      : pathAfterLocale.startsWith("/")
        ? pathAfterLocale
        : `/${pathAfterLocale}`;

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[LOCALE_TO_HREFLANG[locale]] = absoluteUrl(`/${locale}${suffix}`);
  }
  languages["x-default"] = absoluteUrl(`/cz${suffix}`);
  return languages;
}

export function pageAlternates(locale: string, pathAfterLocale = "") {
  const suffix =
    !pathAfterLocale || pathAfterLocale === "/"
      ? ""
      : pathAfterLocale.startsWith("/")
        ? pathAfterLocale
        : `/${pathAfterLocale}`;

  return {
    canonical: absoluteUrl(`/${locale}${suffix}`),
    languages: languageAlternates(suffix),
  };
}
