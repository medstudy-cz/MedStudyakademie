export type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

/**
 * Keep letters/digits from any script (fallback when block has no _key).
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Prefer Sanity block _key (ASCII, unique).
 * Prefix with `h-` so ids never start with a digit (CSS/querySelector-safe).
 */
export function headingIdFromBlock(
  block: { _key?: string } | undefined,
  text: string,
  fallback: string,
): string {
  if (block?._key) return `h-${block._key}`;
  const slug = slugify(text.trim());
  return slug ? `h-${slug}` : fallback;
}

export function extractHeadings(content: any[]): HeadingItem[] {
  if (!content || !Array.isArray(content)) return [];

  const headings: HeadingItem[] = [];
  const usedIds = new Map<string, number>();

  content.forEach((block, index) => {
    if (block._type === "block" && (block.style === "h2" || block.style === "h3")) {
      const text = Array.isArray(block.children)
        ? block.children.map((c: any) => c.text || "").join("")
        : "";

      const trimmed = text.trim();
      if (!trimmed) return;

      let id = headingIdFromBlock(block, trimmed, `h-heading-${index}`);
      const count = usedIds.get(id) ?? 0;
      usedIds.set(id, count + 1);
      if (count > 0) {
        id = `${id}-${count + 1}`;
      }

      headings.push({
        id,
        text: trimmed,
        level: block.style === "h2" ? 2 : 3,
      });
    }
  });

  // Prefer H2-only TOC when article has main sections; otherwise keep H3.
  const h2 = headings.filter((h) => h.level === 2);
  return h2.length > 0 ? h2 : headings.filter((h) => h.level === 3);
}
