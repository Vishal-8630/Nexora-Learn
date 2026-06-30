"use client";

import { useEffect, useState, useCallback } from "react";
import { TocItem } from "@/types/docs";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const headings = items
      .map((item) => {
        const el = document.getElementById(item.id);
        return el ? { id: item.id, top: el.getBoundingClientRect().top + scrollY } : null;
      })
      .filter(Boolean) as { id: string; top: number }[];

    const current = headings.filter((h) => h.top <= scrollY + 120).at(-1);
    setActiveId(current?.id ?? headings[0]?.id ?? "");
  }, [items]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  if (items.length === 0) return null;

  return (
    <aside
      className="toc-panel bg-background"
      style={{
        position: "fixed",
        right: 0,
        top: 64,
        bottom: 0,
        width: 240,
        borderLeft: "1px solid hsl(var(--border))",
        overflowY: "auto",
        padding: "32px 16px",
        zIndex: 20,
      }}
      aria-label="Table of contents"
    >
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "hsl(var(--muted-foreground))",
          marginBottom: 12,
        }}
      >
        On this page
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  padding: "3px 0",
                  paddingLeft: item.level === 3 ? 16 : 8,
                  transition: "color 0.15s",
                  borderLeft: `2px solid ${isActive ? "hsl(var(--brand))" : "transparent"}`,
                  color: isActive ? "hsl(var(--brand))" : "hsl(var(--muted-foreground))",
                  fontWeight: isActive ? 500 : 400,
                  textDecoration: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
