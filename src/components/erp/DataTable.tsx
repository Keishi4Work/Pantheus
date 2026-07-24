import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Data table (design-system v2). Hairline-divided rows on a flat surface — no
 * zebra, no heavy shadow. Header is a mono uppercase eyebrow; numbers are mono
 * tabular and right-aligned. Declarative: pass `columns` + `rows`, use a column
 * `render` for custom cells (status badge, progress bar). `ProgressBar` is the
 * companion cell helper (ink fill; success at 100%, danger when blocked).
 */
type Align = "left" | "right" | "center";

type Column<Row> = {
  key: string;
  header: React.ReactNode;
  /** CSS grid track width, e.g. "96px" or "1.5fr". Defaults to "1fr". */
  width?: string;
  align?: Align;
  /** Render the raw value as mono tabular (codes, quantities). */
  mono?: boolean;
  render?: (row: Row) => React.ReactNode;
};

const alignClass: Record<Align, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

function DataTable<Row extends Record<string, React.ReactNode>>({
  columns,
  rows,
  getRowKey,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  columns: Column<Row>[];
  rows: Row[];
  getRowKey?: (row: Row, index: number) => React.Key;
}) {
  const template = columns.map((c) => c.width ?? "1fr").join(" ");

  return (
    <div
      data-slot="data-table"
      className={cn(
        "overflow-hidden rounded-[6px] border border-line bg-surface",
        className,
      )}
      {...props}
    >
      <div
        className="grid gap-3 border-b border-line px-4 py-[9px] font-mono text-[10px] tracking-[0.1em] uppercase text-muted-ink"
        style={{ gridTemplateColumns: template }}
      >
        {columns.map((c) => (
          <div key={c.key} className={alignClass[c.align ?? "left"]}>
            {c.header}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div
          key={getRowKey ? getRowKey(row, i) : i}
          className="grid items-center gap-3 border-b border-line px-4 py-3 text-[13px] text-ink last:border-b-0"
          style={{ gridTemplateColumns: template }}
        >
          {columns.map((c) => (
            <div
              key={c.key}
              className={cn(
                "min-w-0",
                alignClass[c.align ?? "left"],
                c.mono && "font-mono text-xs tabular-nums text-ink-soft",
              )}
            >
              {c.render ? c.render(row) : row[c.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProgressBar({
  value,
  tone,
  className,
}: {
  value: number;
  tone?: "ink" | "success" | "danger";
  className?: string;
}) {
  const fill =
    tone === "success"
      ? "bg-success"
      : tone === "danger"
        ? "bg-danger"
        : "bg-ink";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-[3px] flex-1 rounded-[2px] bg-section">
        <div
          className={cn("h-[3px] rounded-[2px]", fill)}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <span className="shrink-0 font-mono text-[10.5px] tabular-nums text-muted-ink">
        {value}%
      </span>
    </div>
  );
}

export { DataTable, ProgressBar };
export type { Column };
