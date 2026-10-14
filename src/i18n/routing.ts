import { defineRouting } from "next-intl/routing";

export const locales = ["cz", "ua", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "cz",
  /** Czech is served at `/` with HTTP 200. Other locales keep a prefix. */
  localePrefix: "as-needed",
  /** Do not redirect `/` from Accept-Language or the NEXT_LOCALE cookie. */
  localeDetection: false,
  /**
   * Middleware would advertise hreflang="cz" and hreflang="ua".
   * HTML alternates already use cs / uk / ru / en.
   */
  alternateLinks: false,
});
