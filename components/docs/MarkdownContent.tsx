"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import { CopyCodeButton } from "./CopyCodeButton";
import { Callout } from "./Callout";

// ─── Custom component overrides ───────────────────────────────────────────────

const components: Components = {
  // Code blocks with copy button and language label
  pre({ children, ...props }) {
    const codeEl = (children as any)?.props;
    const className: string = codeEl?.className ?? "";
    const match = /language-(\w+)/.exec(className);
    const language = match ? match[1] : "code";
    
    // Attempt to extract raw text for the copy button
    const extractText = (node: any): string => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(extractText).join("");
      if (node?.props?.children) return extractText(node.props.children);
      return "";
    };
    const code: string = extractText(codeEl?.children).replace(/\n$/, "");

    return (
      <div
        style={{
          position: "relative",
          margin: "20px 0",
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid hsl(var(--border))",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            backgroundColor: "hsl(222 47% 7%)",
            borderBottom: "1px solid hsl(var(--border) / 0.5)",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "hsl(215 16% 47%)",
            }}
          >
            {language}
          </span>
          <CopyCodeButton code={code} />
        </div>

        {/* Code content */}
        <pre
          {...props}
          style={{
            margin: 0,
            padding: "16px 20px",
            overflowX: "auto",
            backgroundColor: "hsl(222 47% 5%)",
            borderRadius: 0,
            border: "none",
          }}
        >
          {children}
        </pre>
      </div>
    );
  },

  // Inline code
  code({ className, children, ...props }) {
    const isBlock = className?.includes("language-") || className?.includes("hljs");
    if (isBlock) {
      return (
        <code className={className} style={{ background: "transparent", border: "none", padding: 0 }} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.85em",
          backgroundColor: "hsl(var(--surface))",
          color: "hsl(var(--accent))",
          padding: "0.15em 0.4em",
          borderRadius: 4,
          border: "1px solid hsl(var(--border))",
        }}
        {...props}
      >
        {children}
      </code>
    );
  },

  // Blockquotes → Callout-style
  blockquote({ children }) {
    // Extract type from first line if it starts with [!INFO], [!WARNING], etc.
    const text = String((children as any)?.props?.children ?? "");
    if (text.startsWith("[!WARNING]")) {
      return <Callout type="warning">{text.replace("[!WARNING]", "").trim()}</Callout>;
    }
    if (text.startsWith("[!TIP]")) {
      return <Callout type="tip">{text.replace("[!TIP]", "").trim()}</Callout>;
    }
    if (text.startsWith("[!CAUTION]")) {
      return <Callout type="caution">{text.replace("[!CAUTION]", "").trim()}</Callout>;
    }
    // Default: info callout
    return <Callout type="info">{children}</Callout>;
  },

  // Tables
  table({ children }) {
    return (
      <div style={{ overflowX: "auto", margin: "20px 0" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
          }}
        >
          {children}
        </table>
      </div>
    );
  },
  thead({ children }) {
    return (
      <thead style={{ backgroundColor: "hsl(var(--surface))" }}>
        {children}
      </thead>
    );
  },
  th({ children }) {
    return (
      <th
        style={{
          padding: "10px 14px",
          textAlign: "left",
          fontWeight: 600,
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "hsl(var(--muted-foreground))",
          borderBottom: "2px solid hsl(var(--border))",
        }}
      >
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid hsl(var(--border))",
          verticalAlign: "top",
          color: "hsl(var(--foreground) / 0.85)",
        }}
      >
        {children}
      </td>
    );
  },

  // Links — open internal links normally, external in new tab
  a({ href, children }) {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        style={{
          color: "hsl(var(--accent))",
          textDecoration: "underline",
          textDecorationColor: "hsl(var(--accent) / 0.4)",
          transition: "text-decoration-color 0.15s",
        }}
      >
        {children}
      </a>
    );
  },
};

// ─── Main Markdown renderer ───────────────────────────────────────────────────

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
