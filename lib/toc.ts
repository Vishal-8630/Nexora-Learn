import { TocItem } from "@/types/docs";

/**
 * Slugify a heading string the same way rehype-slug does.
 * Converts "What is it?" → "what-is-it"
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // remove special chars except hyphens
    .replace(/[\s_]+/g, "-")    // spaces/underscores → hyphens
    .replace(/^-+|-+$/g, "");   // trim leading/trailing hyphens
}

/**
 * Extracts h2 and h3 headings from a Markdown string.
 * Generates IDs using the same slugify logic as rehype-slug.
 */
export function extractToc(markdown: string): TocItem[] {
  const toc: TocItem[] = [];
  const lines = markdown.split("\n");

  let inCodeBlock = false;

  for (const line of lines) {
    // Track fenced code blocks — skip headings inside them
    if (line.trimStart().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);

    if (h2) {
      const title = h2[1].trim();
      toc.push({ level: 2, id: slugify(title), title });
    } else if (h3) {
      const title = h3[1].trim();
      toc.push({ level: 3, id: slugify(title), title });
    }
  }

  return toc;
}
