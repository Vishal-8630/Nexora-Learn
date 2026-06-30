import Link from "next/link";
import { BookOpen, Search, GitBranch } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { MobileSidebarTrigger } from "./MobileSidebarTrigger";
import { SearchTrigger } from "./SearchTrigger";
import { getFirstSlug } from "@/lib/registry";
import { CourseSwitcher } from "./CourseSwitcher";

export function TopNav() {
  const firstSlug = getFirstSlug("dynamics") || "introduction/what-is-dynamics-365";

  return (
    <header className="topnav">
      <div className="topnav-inner">
        {/* Mobile menu trigger */}
        <MobileSidebarTrigger />

        {/* Logo */}
        <Link
          href={`/learn/dynamics/${firstSlug}`}
          className="topnav-logo"
          aria-label="Nexora Learn home"
        >
          <div className="brand-bg topnav-logo-icon">
            <BookOpen style={{ width: 16, height: 16, color: "white" }} />
          </div>
          <span className="font-semibold text-foreground tracking-tight topnav-logo-text">
            Nexora{" "}
            <span className="text-brand">Learn</span>
          </span>
        </Link>
        
        <div className="hidden sm:block ml-2 w-px h-5 bg-[hsl(var(--border))] opacity-50"></div>

        <CourseSwitcher />

        {/* Search bar */}
        <div className="topnav-search-wrap">
          <SearchTrigger />
        </div>

        {/* Right actions */}
        <div className="topnav-actions">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="topnav-icon-btn text-muted"
            aria-label="GitHub"
          >
            <GitBranch style={{ width: 16, height: 16 }} />
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
