import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * App sidebar navigation (design-system v2). 224px, surface with a hairline
 * right edge. Group labels are mono eyebrows; items are label-weight, ink-soft
 * until active. Active = ink text + oxblood left-border + section fill (the one
 * place accent marks position in the app). Pass an alert `badge` per item.
 */
type NavItem = {
  label: React.ReactNode;
  href?: string;
  active?: boolean;
  /** Optional trailing element, e.g. a mini danger StatusBadge count. */
  badge?: React.ReactNode;
};

type NavGroup = {
  label?: React.ReactNode;
  items: NavItem[];
};

function SidebarNav({
  groups,
  header,
  footer,
  className,
  ...props
}: Omit<React.ComponentProps<"nav">, "children"> & {
  groups: NavGroup[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <nav
      data-slot="sidebar-nav"
      className={cn(
        "flex w-56 flex-col border-r border-line bg-surface py-4 text-ink",
        className,
      )}
      {...props}
    >
      {header ? (
        <div className="mb-1 border-b border-line px-4 pb-[14px]">{header}</div>
      ) : null}

      {groups.map((group, gi) => (
        <div key={gi} className="mb-1">
          {group.label ? (
            <div className="px-4 pt-4 pb-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-ink">
              {group.label}
            </div>
          ) : null}
          {group.items.map((item, ii) => {
            const cls = cn(
              "flex items-center justify-between gap-2 border-l-2 py-[7px] pr-4 pl-[14px] text-[13.5px] font-semibold transition-colors",
              item.active
                ? "border-accent bg-section text-ink"
                : "border-transparent text-ink-soft hover:text-ink",
            );
            const content = (
              <>
                <span className="truncate">{item.label}</span>
                {item.badge != null ? (
                  <span className="shrink-0">{item.badge}</span>
                ) : null}
              </>
            );
            return item.href ? (
              <a key={ii} href={item.href} className={cls}>
                {content}
              </a>
            ) : (
              <div key={ii} className={cls}>
                {content}
              </div>
            );
          })}
        </div>
      ))}

      {footer ? (
        <div className="mt-auto border-t border-line px-4 pt-3">{footer}</div>
      ) : null}
    </nav>
  );
}

export { SidebarNav };
export type { NavGroup, NavItem };
