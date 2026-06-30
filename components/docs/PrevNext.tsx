import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavItem } from "@/types/docs";

interface PrevNextProps {
  prev: NavItem | null;
  next: NavItem | null;
  courseId: string;
}

export function PrevNext({ prev, next, courseId }: PrevNextProps) {
  return (
    <div
      style={{
        marginTop: 48,
        paddingTop: 24,
        borderTop: "1px solid hsl(var(--border))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      {prev ? (
        <Link
          href={`/learn/${courseId}/${prev.slug}`}
          className="prevnext-card"
          style={{ maxWidth: "45%" }}
          aria-label={`Previous: ${prev.title}`}
        >
          <ChevronLeft
            className="text-muted"
            style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0 }}
          />
          <div>
            <p
              className="text-muted"
              style={{ fontSize: "0.75rem", marginBottom: 2 }}
            >
              Previous
            </p>
            <p
              className="text-foreground"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/learn/${courseId}/${next.slug}`}
          className="prevnext-card"
          style={{ maxWidth: "45%", marginLeft: "auto", textAlign: "right" }}
          aria-label={`Next: ${next.title}`}
        >
          <div>
            <p
              className="text-muted"
              style={{ fontSize: "0.75rem", marginBottom: 2 }}
            >
              Next
            </p>
            <p
              className="text-foreground"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {next.title}
            </p>
          </div>
          <ChevronRight
            className="text-muted"
            style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0 }}
          />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
