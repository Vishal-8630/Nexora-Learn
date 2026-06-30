"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { courses, getFirstSlug } from "@/lib/registry";
import { ChevronDown, Check, BookOpen, Layout, Code2 } from "lucide-react";

export function CourseSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const match = pathname.match(/^\/learn\/([^\/]+)/);
  const activeCourseId = match ? match[1] : "dynamics";
  const activeCourse = courses[activeCourseId as keyof typeof courses] || courses.dynamics;

  const handleSelect = (courseId: string) => {
    setIsOpen(false);
    if (courseId === activeCourseId) return;
    
    const firstSlug = getFirstSlug(courseId);
    if (firstSlug) {
      router.push(`/learn/${courseId}/${firstSlug}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative ml-2 hidden sm:block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
          isOpen 
            ? "bg-[hsl(var(--surface-hover))] border-[hsl(var(--brand)/0.3)] shadow-[0_0_0_1px_hsl(var(--brand)/0.2)]" 
            : "bg-transparent border-transparent hover:bg-[hsl(var(--surface-hover))] hover:border-[hsl(var(--border))]"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center justify-center w-6 h-6 rounded bg-[hsl(var(--brand)/0.15)] text-[hsl(var(--brand))]">
          {activeCourseId === "react" ? <Code2 className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
        </span>
        <span className="text-[hsl(var(--foreground))] tracking-tight">{activeCourse.title}</span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-1.5 shadow-2xl z-50 dropdown-animation"
          role="listbox"
        >
          <div className="px-2 py-1.5 mb-1">
            <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
              Switch Course
            </span>
          </div>
          {Object.values(courses).map((course) => {
            const isActive = course.id === activeCourseId;
            return (
              <button
                key={course.id}
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(course.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm transition-all duration-200 text-left ${
                  isActive 
                    ? "bg-[hsl(var(--brand)/0.1)] text-[hsl(var(--brand))] font-medium" 
                    : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-hover))]"
                }`}
              >
                <div className={`flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-md transition-colors ${
                  isActive ? "bg-[hsl(var(--brand)/0.2)]" : "bg-[hsl(var(--surface))] text-[hsl(var(--muted-foreground))]"
                }`}>
                  {course.id === "react" ? <Code2 className="w-4 h-4" /> : <Layout className="w-4 h-4" />}
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="leading-tight">{course.title}</span>
                  <span className="text-[11px] text-[hsl(var(--muted-foreground))] leading-tight mt-0.5 opacity-80">
                    {course.id === 'react' ? 'Frontend Web Development' : 'Enterprise ERP/CRM'}
                  </span>
                </div>
                {isActive && <Check className="w-4 h-4 ml-auto text-[hsl(var(--brand))]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
