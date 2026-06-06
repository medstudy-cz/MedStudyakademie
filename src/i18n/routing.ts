import { defineRouting } from "next-intl/routing";

export const locales = ["cz", "ua", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "cz",
  localePrefix: "always",
});
