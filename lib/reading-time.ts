/**
 * Estimates reading time from a Markdown string.
 * Strips markdown syntax, counts words, assumes 200 wpm.
 */
export function getReadingTime(markdown: string): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, "")     // remove code blocks
    .replace(/`[^`]+`/g, "")            // remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, "")    // remove images
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // links → link text only
    .replace(/#{1,6}\s/g, "")           // remove heading markers
    .replace(/[*_~>|]/g, "")            // remove formatting chars
    .replace(/-{3,}|={3,}/g, "")        // remove horizontal rules
    .replace(/\n+/g, " ");              // collapse newlines

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
