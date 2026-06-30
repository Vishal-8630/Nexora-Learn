import { Info, Lightbulb, TriangleAlert, OctagonAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "tip" | "warning" | "caution";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { icon: React.ElementType; label: string; bgVar: string; borderVar: string; textVar: string }
> = {
  info: {
    icon: Info,
    label: "Info",
    bgVar: "var(--info-bg)",
    borderVar: "var(--info-border)",
    textVar: "var(--info-text)",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    bgVar: "var(--tip-bg)",
    borderVar: "var(--tip-border)",
    textVar: "var(--tip-text)",
  },
  warning: {
    icon: TriangleAlert,
    label: "Warning",
    bgVar: "var(--warning-bg)",
    borderVar: "var(--warning-border)",
    textVar: "var(--warning-text)",
  },
  caution: {
    icon: OctagonAlert,
    label: "Caution",
    bgVar: "var(--caution-bg)",
    borderVar: "var(--caution-border)",
    textVar: "var(--caution-text)",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="my-5 rounded-lg border-l-4 px-4 py-3.5"
      style={{
        backgroundColor: `hsl(${config.bgVar})`,
        borderColor: `hsl(${config.borderVar})`,
      }}
      role="note"
      aria-label={title ?? config.label}
    >
      <div className="flex items-start gap-2.5">
        <Icon
          className="h-4 w-4 mt-0.5 shrink-0"
          style={{ color: `hsl(${config.textVar})` }}
          aria-hidden="true"
        />
        <div>
          {title && (
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: `hsl(${config.textVar})` }}
            >
              {title}
            </p>
          )}
          <div
            className="text-sm leading-relaxed"
            style={{ color: `hsl(${config.textVar})` }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
