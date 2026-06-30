import { Course, NavGroup } from "@/types/docs";
import { reactContent } from "@/content/courses/react";

const groups: NavGroup[] = [
  {
    title: "Phase 1: React Engineering",
    sections: [
      {
        title: "1. React Basics",
        slug: "basics",
        items: [
          { title: "Components", slug: "basics/components" },
          { title: "Hooks", slug: "basics/hooks" },
        ],
      },
    ],
  },
];

export const reactCourse: Course = {
  id: "react",
  title: "React Engineering",
  description: "Master modern React frontend development.",
  groups,
  contentMap: reactContent as any, // Typecast for now as dummy content doesn't match perfectly if needed
};
