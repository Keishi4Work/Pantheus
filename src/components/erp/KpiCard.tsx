import * as React from "react";

import { cn } from "@/lib/utils";
import { StatusBadge, type StatusTone } from "./StatusBadge";

/**
 * KPI / metric card (design-system v2). Flat surface + hairline, tight radius,
 * a mono eyebrow label, one big tabular number, and an optional delta rendered
 * as a mini semantic badge. Lifts to `shadow-e1` on hover.
 */
function KpiCard({
  label,
  value,
  unit,
  delta,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  delta?: { value: React.ReactNode; tone?: StatusTone };
}) {
  return (
    <div
      data-slot="kpi-card"
      className={cn(
        "rounded-[6px] border border-line bg-surface px-4 py-[14px] transition-shadow hover:shadow-e1",
        className,
      )}
      {...props}
    >
      <div className="mb-2 font-mono text-[10px] tracking-[0.12em] uppercase text-muted-ink">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-[-0.02em] tabular-nums text-ink">
          {value}
          {unit ? (
            <span className="text-sm font-normal text-muted-ink"> {unit}</span>
          ) : null}
        </span>
        {delta ? (
          <StatusBadge tone={delta.tone ?? "neutral"} size="mini">
            {delta.value}
          </StatusBadge>
        ) : null}
      </div>
    </div>
  );
}

export { KpiCard };
