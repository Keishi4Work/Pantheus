import * as React from "react";

import { cn } from "@/lib/utils";
import type { StatusTone } from "./StatusBadge";

/**
 * Toast / inline confirmation (design-system v2). Surface + hairline, `shadow-e2`,
 * a small semantic status dot, a label, and an optional mono timestamp. Purely
 * presentational — pair with your own toast queue.
 */
const dotClass: Record<StatusTone, string> = {
  neutral: "bg-muted-ink",
  info: "bg-info",
  warning: "bg-warning",
  success: "bg-success",
  danger: "bg-danger",
};

function Toast({
  tone = "success",
  title,
  time,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  tone?: StatusTone;
  title?: React.ReactNode;
  time?: React.ReactNode;
}) {
  return (
    <div
      data-slot="toast"
      role="status"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-[6px] border border-line bg-surface px-3.5 py-[11px] shadow-e2",
        className,
      )}
      {...props}
    >
      <span className={cn("size-2 shrink-0 rounded-full", dotClass[tone])} />
      <span className="text-[13px] font-semibold text-ink">
        {title ?? children}
      </span>
      {time ? (
        <span className="font-mono text-[10.5px] text-muted-ink">{time}</span>
      ) : null}
    </div>
  );
}

export { Toast };
