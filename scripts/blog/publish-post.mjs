/**
 * Publish a multi-locale blog post to Sanity.
 *
 * Usage:
 *   set SANITY_API_TOKEN=sk...
 *   node scripts/blog/publish-post.mjs scripts/blog/first-30-days-czech-republic-checklist.json
 *
 * Token: Sanity Manage → Project snabdvge → API → Tokens → Add API token (Editor)
 */
import { createClient } from "@sanity/client";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "snabdvge";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01";
const token =
  process.env.SANITY_API_TOKEN?.trim() ||
  process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!token) {
  console.error("Missing SANITY_API_TOKEN / SANITY_API_WRITE_TOKEN (Editor or higher).");
  process.exit(1);
}

const inputPath = resolve(process.argv[2] || "");
if (!inputPath) {
  console.error("Usage: node scripts/blog/publish-post.mjs <post.json>");
  process.exit(1);
}

const payload = JSON.parse(readFileSync(inputPath, "utf8"));
const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function block(style, text, marks = []) {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks }],
  };
}

function richParagraph(parts) {
  // parts: array of { text, marks?, href? }
  const markDefs = [];
  const children = parts.map((part) => {
    const marks = [...(part.marks || [])];
    if (part.href) {
      const markKey = key();
      markDefs.push({ _type: "link", _key: markKey, href: part.href });
      marks.push(markKey);
    }
    return { _type: "span", _key: key(), text: part.text, marks };
  });
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs,
    children,
  };
}

function bullet(parts) {
  const node = richParagraph(parts);
  node.listItem = "bullet";
  node.level = 1;
  return node;
}

function buildContent(blocks) {
  return blocks.map((b) => {
    if (b.type === "h2") return block("h2", b.text);
    if (b.type === "h3") return block("h3", b.text);
    if (b.type === "p") {
      if (typeof b.text === "string") return block("normal", b.text);
      return richParagraph(b.parts);
    }
    if (b.type === "li") {
      if (typeof b.text === "string") {
        const node = block("normal", b.text);
        node.listItem = "bullet";
        node.level = 1;
        return node;
      }
      return bullet(b.parts);
    }
    throw new Error(`Unknown block type: ${b.type}`);
  });
}

async function uploadImage(imagePath, alt) {
  const abs = resolve(imagePath);
  const buffer = readFileSync(abs);
  const filename = basename(abs);
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/png",
  });
  return {
    _type: "image",
    alt,
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function upsertLocale(localeDoc, shared) {
  const id = `blogPost-${shared.slug}-${localeDoc.locale}`;
  const doc = {
    _id: id,
    _type: "blogPost",
    title: localeDoc.title,
    slug: { _type: "slug", current: shared.slug },
    locale: localeDoc.locale,
    publishedAt: shared.publishedAt,
    excerpt: localeDoc.excerpt,
    mainImage: shared.mainImage,
    content: buildContent(localeDoc.content),
    seo: localeDoc.seo,
    ctaBanner: localeDoc.ctaBanner || undefined,
  };

  await client.createOrReplace(doc);
  console.log(`Published ${id}`);
  return id;
}

const mainImage = await uploadImage(payload.coverImage, payload.coverAlt);
const publishedAt = payload.publishedAt || new Date().toISOString();
const shared = {
  slug: payload.slug,
  publishedAt,
  mainImage,
};

const ids = [];
for (const localeDoc of payload.locales) {
  ids.push(await upsertLocale(localeDoc, shared));
}

console.log("Done:", ids.join(", "));
console.log(
  `URLs:\n` +
    ids
      .map((_, i) => {
        const loc = payload.locales[i].locale;
        return `https://medstudyacademy.cz/${loc}/blog/${payload.slug}`;
      })
      .join("\n"),
);
