"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText } from "lucide-react";
import { courses } from "@/lib/registry";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const onSelect = (courseId: string, slug: string) => {
    onOpenChange(false);
    router.push(`/learn/${courseId}/${slug}`);
  };

  return (
    <Command.Dialog open={open} onOpenChange={onOpenChange} className="cmdk-dialog" label="Global Command Menu">
      <div className="cmdk-input-wrapper">
        <Search className="cmdk-search-icon" />
        <Command.Input placeholder="Search documentation..." className="cmdk-input" />
      </div>
      <Command.List className="cmdk-list">
        <Command.Empty className="cmdk-empty">No results found.</Command.Empty>
        {Object.values(courses).map((course) => (
          <Command.Group key={course.id} heading={course.title} className="cmdk-group">
            {course.groups.flatMap(g => g.sections).map((section) =>
              section.items.map((item) => (
                <Command.Item
                  key={`${course.id}-${item.slug}`}
                  onSelect={() => onSelect(course.id, item.slug)}
                  value={`${course.title} ${section.title} ${item.title}`} // filter across all levels
                  className="cmdk-item"
                >
                  <FileText className="w-4 h-4 mr-2 text-[hsl(var(--muted-foreground))]" />
                  <span>{item.title}</span>
                  <span className="ml-auto text-xs text-[hsl(var(--muted-foreground))]">
                    {course.title}
                  </span>
                </Command.Item>
              ))
            )}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
