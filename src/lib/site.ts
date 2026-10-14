import { locales, routing, type Locale } from "@/i18n/routing";

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

function pathSuffix(pathAfterLocale = ""): string {
  if (!pathAfterLocale || pathAfterLocale === "/") {
    return "";
  }
  return pathAfterLocale.startsWith("/")
    ? pathAfterLocale
    : `/${pathAfterLocale}`;
}

/**
 * Public URL path. The default locale (Czech) has no prefix, so `/` and
 * `/about` are the canonical addresses. Other locales stay prefixed.
 */
export function publicLocalePath(locale: string, pathAfterLocale = ""): string {
  const suffix = pathSuffix(pathAfterLocale);
  if (locale === routing.defaultLocale) {
    return suffix || "/";
  }
  return `/${locale}${suffix}`;
}

/**
 * Path after the locale segment, e.g. "", "/blog", "/blog/my-post", "/privacy".
 */
export function languageAlternates(
  pathAfterLocale = "",
): Record<string, string> {
  const suffix = pathSuffix(pathAfterLocale);

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[LOCALE_TO_HREFLANG[locale]] = absoluteUrl(
      publicLocalePath(locale, suffix),
    );
  }
  languages["x-default"] = absoluteUrl(
    publicLocalePath(routing.defaultLocale, suffix),
  );
  return languages;
}

export function pageAlternates(locale: string, pathAfterLocale = "") {
  const suffix = pathSuffix(pathAfterLocale);

  return {
    canonical: absoluteUrl(publicLocalePath(locale, suffix)),
    languages: languageAlternates(suffix),
  };
}
