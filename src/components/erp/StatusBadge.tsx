import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Production/status badge (design-system v2). Mono, uppercase, always bordered —
 * never a solid fill. Colour comes entirely from the semantic token families, so
 * it themes for dark automatically. Status → tone mapping used across the ERP:
 * Draft = neutral · Running = info · Awaiting QC = warning · Done = success ·
 * Paused = danger. `size="mini"` is the KPI-delta / count variant.
 */
type StatusTone = "neutral" | "info" | "warning" | "success" | "danger";

const toneClass: Record<StatusTone, string> = {
  neutral: "bg-section border-line-strong text-ink-soft",
  info: "bg-info-bg border-info-border text-info-text",
  warning: "bg-warning-bg border-warning-border text-warning-text",
  success: "bg-success-bg border-success-border text-success-text",
  danger: "bg-danger-bg border-danger-border text-danger-text",
};

function StatusBadge({
  tone = "neutral",
  size = "default",
  className,
  ...props
}: React.ComponentProps<"span"> & {
  tone?: StatusTone;
  size?: "default" | "mini";
}) {
  return (
    <span
      data-slot="status-badge"
      className={cn(
        "inline-flex items-center border font-mono leading-none",
        size === "mini"
          ? "rounded-[2px] px-1.5 py-[2px] text-[10px] tabular-nums"
          : "rounded-[3px] px-2 py-[3px] text-[10px] font-medium tracking-[0.08em] uppercase",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

export { StatusBadge };
export type { StatusTone };
