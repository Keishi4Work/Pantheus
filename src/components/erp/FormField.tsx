import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Form primitives (design-system v2). Controls sit on the surface with a
 * line-strong hairline; focus draws the oxblood border + a 3px accent-wash ring;
 * the error state swaps to danger. `FormField` is the label/help/error wrapper —
 * pass `error` on the field AND `invalid` on the control to light both up.
 */
const controlBase =
  "w-full rounded-[4px] border bg-surface px-3 py-2 text-[13px] text-ink outline-none transition-colors placeholder:text-muted-ink focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-accent-wash disabled:cursor-not-allowed disabled:bg-section disabled:text-muted-ink";

const invalidClass = "border-danger focus-visible:border-danger";
const validClass = "border-line-strong";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    data-slot="input"
    aria-invalid={invalid || undefined}
    className={cn(controlBase, invalid ? invalidClass : validClass, className)}
    {...props}
  />
));
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    data-slot="textarea"
    aria-invalid={invalid || undefined}
    className={cn(
      controlBase,
      "min-h-16 resize-y",
      invalid ? invalidClass : validClass,
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select"> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <select
    ref={ref}
    data-slot="select"
    aria-invalid={invalid || undefined}
    className={cn(controlBase, invalid ? invalidClass : validClass, className)}
    {...props}
  />
));
Select.displayName = "Select";

function FormField({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label?: React.ReactNode;
  htmlFor?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-slot="form-field" className={cn("grid gap-[5px]", className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className={cn(
            "text-[12.5px] font-semibold",
            error ? "text-danger-text" : "text-ink",
          )}
        >
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="text-[11.5px] text-danger-text">{error}</p>
      ) : hint ? (
        <p className="text-[11.5px] text-muted-ink">{hint}</p>
      ) : null}
    </div>
  );
}

export { FormField, Input, Textarea, Select };
