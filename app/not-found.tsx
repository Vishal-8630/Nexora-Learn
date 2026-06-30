import Link from "next/link";
import { getFirstSlug } from "@/lib/registry";

export default function NotFound() {
  const firstSlug = getFirstSlug("dynamics");

  return (
    <div className="flex flex-1 items-center justify-center min-h-[60vh] px-6">
      <div className="text-center max-w-md">
        <div className="text-7xl font-bold text-[hsl(var(--brand)/0.15)] mb-4 select-none">
          404
        </div>
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-3">
          Page not found
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8 leading-relaxed">
          The documentation page you are looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href={`/learn/dynamics/${firstSlug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
            bg-[hsl(var(--brand))] text-white font-medium text-sm
            hover:bg-[hsl(var(--brand)/0.9)] transition-colors shadow-sm"
        >
          Go to Documentation
        </Link>
      </div>
    </div>
  );
}
