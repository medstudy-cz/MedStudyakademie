export type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

/**
 * URL-safe id that keeps Unicode letters (Cyrillic, Czech diacritics, etc.).
 * Previous [\s\W-] slug emptied Cyrillic headings and broke TOC anchors.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
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

      let id = slugify(trimmed) || `heading-${index}`;
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

  return headings;
}
