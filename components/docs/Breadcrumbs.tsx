import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumb-nav"
    >
      <Link href="/" className="breadcrumb-link" aria-label="Home">
        <Home style={{ width: 14, height: 14 }} />
      </Link>

      {items.map((item, index) => (
        <span key={index} className="breadcrumb-sep">
          <ChevronRight
            style={{ width: 12, height: 12, color: "hsl(var(--border))" }}
            aria-hidden="true"
          />
          {item.href ? (
            <Link href={item.href} className="breadcrumb-link">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-current" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
