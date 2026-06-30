"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCodeButtonProps {
  code: string;
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: "0.75rem",
        padding: "4px 8px",
        borderRadius: 6,
        border: "none",
        background: "none",
        cursor: "pointer",
        color: copied ? "hsl(142 72% 50%)" : "hsl(215 16% 57%)",
        transition: "color 0.15s, background-color 0.15s",
      }}
      onMouseEnter={(e) => {
        if (!copied)
          (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(215 16% 17%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
      }}
      aria-label="Copy code"
    >
      {copied ? (
        <>
          <Check style={{ width: 12, height: 12 }} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy style={{ width: 12, height: 12 }} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
