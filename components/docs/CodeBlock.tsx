"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightedHtml?: string;
}

export function CodeBlock({ code, language = "code", highlightedHtml }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-5 rounded-xl overflow-hidden border border-[hsl(var(--border))]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2
        bg-[hsl(222_47%_7%)] border-b border-[hsl(var(--border)/0.5)]">
        <span className="text-xs font-mono text-[hsl(215_16%_47%)] uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md
            text-[hsl(215_16%_57%)] hover:text-white
            hover:bg-[hsl(215_16%_17%)] transition-all duration-150"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto p-4 bg-[hsl(222_47%_5%)] m-0 rounded-none border-none">
        {highlightedHtml ? (
          <code
            className="text-sm font-mono leading-relaxed text-[hsl(210_17%_85%)]"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <code className="text-sm font-mono leading-relaxed text-[hsl(210_17%_85%)]">
            {code}
          </code>
        )}
      </pre>
    </div>
  );
}
