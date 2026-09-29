import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { ACTIVITY_SLUGS } from "@/lib/activity-slugs";
import { SITE_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_BLOG_SLUGS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
    routes.push({
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
    routes.push({
      url: `${SITE_URL}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    });

    ACTIVITY_SLUGS.forEach((slug) => {
      routes.push({
        url: `${SITE_URL}/${locale}/activities/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  try {
    const posts = await sanityFetch<{ slug: string; locale: string }[]>({
      query: ALL_BLOG_SLUGS_QUERY,
      revalidate: 3600,
    });

    (posts || []).forEach((post) => {
      routes.push({
        url: `${SITE_URL}/${post.locale}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
  }

  return routes;
}
