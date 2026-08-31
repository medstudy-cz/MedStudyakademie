export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && locale == $locale] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    locale,
    publishedAt,
    excerpt,
    mainImage
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    "slug": slug.current,
    locale,
    publishedAt,
    excerpt,
    mainImage,
    content,
    ctaBanner,
    seo
  }
`;

export const SIMILAR_BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && locale == $locale && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    locale,
    publishedAt,
    excerpt,
    mainImage
  }
`;

export const ALL_BLOG_SLUGS_QUERY = `
  *[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current,
    locale
  }
`;
