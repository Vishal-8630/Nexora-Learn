import { SidebarNav } from "./SidebarNav";

interface SidebarProps {
  courseId: string;
}

export function Sidebar({ courseId }: SidebarProps) {
  return (
    <aside
      className="sidebar-panel hidden lg:flex flex-col fixed left-0 top-16 bottom-0 w-72 z-30 overflow-hidden"
      aria-label="Documentation sidebar"
    >
      {/* Scrollable nav area */}
      <div className="flex-1 overflow-y-auto py-6 overscroll-contain">
        <SidebarNav courseId={courseId} />
      </div>

      {/* Bottom fade gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--surface)), transparent)",
        }}
      />
    </aside>
  );
}
