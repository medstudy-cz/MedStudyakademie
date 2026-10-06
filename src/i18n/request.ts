import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const base = (await import(`../../messages/${locale}.json`)).default;
  const activityPages = (
    await import(`../../messages/activity-pages/${locale}.json`)
  ).default;
  const privacyPage = (
    await import(`../../messages/privacy/${locale}.json`)
  ).default;
  const aboutPage = (
    await import(`../../messages/about/${locale}.json`)
  ).default;
  const transparencyPage = (
    await import(`../../messages/transparency/${locale}.json`)
  ).default;

  return {
    locale,
    messages: {
      ...base,
      activityPages,
      privacyPage,
      aboutPage,
      transparencyPage,
    },
  };
});
