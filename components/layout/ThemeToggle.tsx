"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="bg-surface"
        style={{ height: 36, width: 36, borderRadius: 8 }}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-muted"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 36,
        width: 36,
        borderRadius: 8,
        border: "1px solid transparent",
        background: "none",
        cursor: "pointer",
        transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.backgroundColor = "hsl(var(--surface-hover))";
        el.style.borderColor = "hsl(var(--border))";
        el.style.color = "hsl(var(--foreground))";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.backgroundColor = "";
        el.style.borderColor = "transparent";
        el.style.color = "";
      }}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        style={{
          position: "absolute",
          width: 16,
          height: 16,
          transition: "all 0.3s",
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
          opacity: isDark ? 1 : 0,
        }}
      />
      <Moon
        style={{
          position: "absolute",
          width: 16,
          height: 16,
          transition: "all 0.3s",
          transform: isDark ? "rotate(-90deg) scale(0)" : "rotate(0deg) scale(1)",
          opacity: isDark ? 0 : 1,
        }}
      />
    </button>
  );
}
