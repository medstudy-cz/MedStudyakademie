import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(150),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Language / Locale",
      type: "string",
      options: {
        list: [
          { title: "Čeština (cz)", value: "cz" },
          { title: "Українська (ua)", value: "ua" },
          { title: "Русский (ru)", value: "ru" },
          { title: "English (en)", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "cz",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image / Cover",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Short Description",
      type: "text",
      rows: 3,
      description: "Brief summary shown in the blog listing and social previews",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2 (H2)", value: "h2" },
            { title: "Heading 3 (H3)", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                        allowRelative: true,
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaBanner",
      title: "Custom Lead CTA Banner (Optional)",
      type: "object",
      description: "Override default lead/consultation CTA in the article",
      fields: [
        { name: "title", title: "CTA Title", type: "string" },
        { name: "description", title: "CTA Description", type: "string" },
        { name: "buttonText", title: "CTA Button Text", type: "string" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string" },
        { name: "metaDescription", title: "Meta Description", type: "text", rows: 2 },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      locale: "locale",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare({ title, locale, media, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : "";
      return {
        title: title || "Untitled post",
        subtitle: `[${(locale || "cz").toUpperCase()}] ${formattedDate}`,
        media,
      };
    },
  },
});
