import { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_BLOG_SLUGS_QUERY } from "@/sanity/lib/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://medstudy-akademie.cz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // Static pages across locales
  locales.forEach((locale) => {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
    routes.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    });
  });

  // Dynamic blog articles
  try {
    const posts = await sanityFetch<{ slug: string; locale: string }[]>({
      query: ALL_BLOG_SLUGS_QUERY,
      revalidate: 3600,
    });

    (posts || []).forEach((post) => {
      routes.push({
        url: `${BASE_URL}/${post.locale}/blog/${post.slug}`,
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
