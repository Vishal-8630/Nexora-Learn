"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { SearchDialog } from "./SearchDialog";

export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="topnav-search"
        aria-label="Search documentation"
      >
        <Search style={{ width: 14, height: 14, flexShrink: 0 }} />
        <span style={{ flex: 1, textAlign: "left" }}>Search documentation...</span>
        <kbd className="topnav-kbd">⌘K</kbd>
      </button>

      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
