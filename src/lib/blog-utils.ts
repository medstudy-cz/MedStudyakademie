export type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractHeadings(content: any[]): HeadingItem[] {
  if (!content || !Array.isArray(content)) return [];

  const headings: HeadingItem[] = [];

  content.forEach((block) => {
    if (block._type === "block" && (block.style === "h2" || block.style === "h3")) {
      const text = Array.isArray(block.children)
        ? block.children.map((c: any) => c.text || "").join("")
        : "";

      if (text.trim()) {
        headings.push({
          id: slugify(text),
          text: text.trim(),
          level: block.style === "h2" ? 2 : 3,
        });
      }
    }
  });

  return headings;
}
