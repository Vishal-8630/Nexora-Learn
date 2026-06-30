import { Course, DocPageData, NavItem } from "@/types/docs";
import { dynamicsCourse } from "./courses/dynamics";
import { reactCourse } from "./courses/react";

export const courses: Record<string, Course> = {
  dynamics: dynamicsCourse,
  react: reactCourse,
};

export function getCourse(courseId: string): Course | null {
  return courses[courseId] || null;
}

export function getAllCourseIds(): string[] {
  return Object.keys(courses);
}

// ─── Helper functions ──────────────────────────────────────────────────────────

export function getAllNavItems(course: Course): NavItem[] {
  return course.groups.flatMap((group) => group.sections).flatMap((section) => section.items);
}

export function getAllSlugs(courseId: string): string[][] {
  const course = getCourse(courseId);
  if (!course) return [];
  return getAllNavItems(course).map((item) => item.slug.split("/"));
}

export function getFirstSlug(courseId: string): string | null {
  const course = getCourse(courseId);
  if (!course || course.groups.length === 0 || course.groups[0].sections.length === 0 || course.groups[0].sections[0].items.length === 0) return null;
  return course.groups[0].sections[0].items[0].slug;
}

// ─── Get doc page data (section, item, content, prev, next) ───────────────────

export function getDocPageData(courseId: string, slug: string): DocPageData | null {
  const course = getCourse(courseId);
  if (!course) return null;

  const allItems = getAllNavItems(course);
  const flatIndex = allItems.findIndex((item) => item.slug === slug);
  if (flatIndex === -1) return null;

  const item = allItems[flatIndex];

  let section: typeof course.groups[0]['sections'][0] | null = null;
  let group: typeof course.groups[0] | null = null;
  let sectionIndex = 0;
  
  for (const g of course.groups) {
    const sIdx = g.sections.findIndex((s) => s.items.includes(item));
    if (sIdx !== -1) {
      group = g;
      section = g.sections[sIdx];
      sectionIndex = sIdx;
      break;
    }
  }

  const content = course.contentMap[slug];
  if (!content || !section || !group) return null;

  return {
    courseId,
    group,
    section,
    item,
    content,
    prev: flatIndex > 0 ? allItems[flatIndex - 1] : null,
    next: flatIndex < allItems.length - 1 ? allItems[flatIndex + 1] : null,
    sectionIndex,
    itemIndex: section.items.indexOf(item),
  };
}
