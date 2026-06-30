"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { getCourse } from "@/lib/registry";

interface SidebarNavProps {
  courseId: string;
  onNavigate?: () => void;
}

export function SidebarNav({ courseId, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);

  const course = getCourse(courseId);
  const groups = course ? course.groups : [];

  const prefix = `/learn/${courseId}/`;
  const activeSlug = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : "";

  const activeSectionSlug = groups.flatMap((g) => g.sections).find((s) =>
    s.items.some((item) => item.slug === activeSlug)
  )?.slug;

  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (activeSectionSlug) initial.add(activeSectionSlug);
    return initial;
  });

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [pathname]);

  useEffect(() => {
    if (activeSectionSlug) {
      setOpenSections((prev) => new Set([...prev, activeSectionSlug]));
    }
  }, [activeSectionSlug]);

  const toggleSection = (slug: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <nav style={{ padding: "0 8px", paddingBottom: "32px" }} aria-label="Documentation navigation">
      {groups.map((group, groupIndex) => (
        <div key={group.title} className={groupIndex > 0 ? "mt-10" : "mt-4"}>
          <h4 className="px-3 mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))] opacity-70">
            {group.title}
          </h4>
          
          <div className="space-y-1">
            {group.sections.map((section) => {
              const isOpen = openSections.has(section.slug);
              const isSectionActive = section.slug === activeSectionSlug;

              return (
                <div key={section.slug}>
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.slug)}
                    className={`nav-section-btn py-2.5${isSectionActive ? " section-active bg-[hsl(var(--surface-hover))] font-semibold" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={`section-${section.slug}`}
                  >
                    <span className="truncate pr-2">{section.title}</span>
                    <ChevronRight
                      style={{
                        width: 14,
                        height: 14,
                        flexShrink: 0,
                        color: isSectionActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                  </button>

                  {/* Section items */}
                  <div
                    id={`section-${section.slug}`}
                    style={{
                      overflow: "hidden",
                      maxHeight: isOpen ? 1000 : 0,
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 0.3s ease-in-out, opacity 0.25s ease-in-out",
                      marginTop: isOpen ? 4 : 0,
                      paddingLeft: 18,
                      borderLeft: "1px solid hsl(var(--border))",
                      marginLeft: 16,
                      marginBottom: isOpen ? 8 : 0,
                    }}
                  >
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="space-y-1">
                      {section.items.map((item) => {
                        const isActive = item.slug === activeSlug;
                        return (
                          <li key={item.slug}>
                            <Link
                              ref={isActive ? activeRef : undefined}
                              href={`/learn/${courseId}/${item.slug}`}
                              onClick={onNavigate}
                              className={`nav-item py-1.5${isActive ? " active relative before:absolute before:left-[-19px] before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:bg-[hsl(var(--brand))] before:rounded-r-full" : ""}`}
                              aria-current={isActive ? "page" : undefined}
                            >
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
