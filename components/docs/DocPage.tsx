import { Clock } from "lucide-react";
import { DocPageData } from "@/types/docs";
import { getReadingTime } from "@/lib/reading-time";
import { extractToc } from "@/lib/toc";
import { Breadcrumbs } from "./Breadcrumbs";
import { PrevNext } from "./PrevNext";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { MarkdownContent } from "./MarkdownContent";

interface DocPageProps {
  data: DocPageData;
}

export function DocPage({ data }: DocPageProps) {
  const { courseId, group, section, item, content, prev, next } = data;
  const readingTime = getReadingTime(content.content);
  const toc = extractToc(content.content);

  return (
    <>
      {/* Right TOC */}
      <TableOfContents items={toc} />

      {/* Main content */}
      <article
        className="doc-content-area page-enter"
        style={{
          flex: 1,
          minWidth: 0,
          padding: "40px 40px 40px 40px",
        }}
      >
        <div style={{ maxWidth: "72ch", margin: "0 auto" }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: group.title.split(":")[0], href: `/learn/${courseId}/${group.sections[0].items[0].slug}` },
              { label: section.title.replace(/^\d+\.\s*/, ''), href: `/learn/${courseId}/${section.items[0].slug}` },
              { label: item.title },
            ]}
          />

          {/* Page header */}
          <header style={{ marginBottom: 32 }}>
            {/* Section badge */}
            <div style={{ marginBottom: 12 }}>
              <span
                className="bg-accent-soft text-brand"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  padding: "4px 10px",
                  borderRadius: 9999,
                  border: "1px solid hsl(var(--brand) / 0.2)",
                }}
              >
                {section.title}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                marginBottom: 12,
              }}
            >
              {content.title}
            </h1>

            {/* Description */}
            <p
              className="text-muted"
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.65,
                marginBottom: 16,
              }}
            >
              {content.description}
            </p>

            {/* Reading time */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                paddingTop: 16,
                borderTop: "1px solid hsl(var(--border))",
              }}
            >
              <span
                className="text-muted"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.875rem",
                }}
              >
                <Clock style={{ width: 14, height: 14 }} aria-hidden="true" />
                {readingTime}
              </span>
            </div>
          </header>

          {/* Markdown content */}
          <MarkdownContent content={content.content} />

          {/* Prev / Next */}
          <PrevNext prev={prev} next={next} courseId={courseId} />

          {/* Footer note */}
          <footer
            style={{
              marginTop: 40,
              paddingTop: 24,
              borderTop: "1px solid hsl(var(--border))",
            }}
          >
            <p
              className="text-muted"
              style={{ fontSize: "0.75rem" }}
            >
              Content coming soon. This page is a placeholder for upcoming documentation.
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
