"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { SidebarNav } from "./SidebarNav";

export function MobileSidebarTrigger() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const match = pathname.match(/^\/learn\/([^\/]+)/);
  const courseId = match ? match[1] : "dynamics";

  const sidebarContent = (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in sidebar panel */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-72 lg:hidden
          transition-transform duration-300 ease-in-out flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ 
          backgroundColor: 'hsl(var(--background))', 
          borderRight: '1px solid hsl(var(--border))' 
        }}
        aria-label="Mobile navigation"
      >
        {/* Mobile sidebar header */}
        <div
          className="flex items-center justify-between px-4 shrink-0"
          style={{ height: 64, borderBottom: '1px solid hsl(var(--border))' }}
        >
          <span className="font-semibold text-foreground">
            Nexora <span className="text-brand">Learn</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg
              text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]
              hover:bg-[hsl(var(--surface-hover))] transition-colors"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav content */}
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarNav courseId={courseId} onNavigate={() => setOpen(false)} />
        </div>
      </aside>
    </>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg
          text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]
          hover:bg-[hsl(var(--surface-hover))] transition-colors shrink-0"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && createPortal(sidebarContent, document.body)}
    </>
  );
}
