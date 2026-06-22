import { cn } from "@/lib/utils";

/**
 * Primary call to action — outlined, fills on hover. A solid ink layer sweeps
 * in from the left and the label inverts to paper (the arrow nudges with it).
 * Token-based, so it reads correctly on light and dark sections. Placeholder
 * target in v1.
 */
export default function CTA({
  href = "#",
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-sm border border-ink px-7 font-sans text-base font-medium text-ink transition-colors duration-500 ease-out hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
    >
      {/* fill that sweeps in from the left on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-0 -translate-x-full bg-ink transition-transform duration-500 ease-out group-hover:translate-x-0"
      />
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
