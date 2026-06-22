import { cn } from "@/lib/utils";

/**
 * Primary call to action — solid ink block, lightly squared. The arrow nudges
 * on hover (restrained micro-interaction). Placeholder target in v1.
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
        "group inline-flex h-12 items-center gap-2.5 rounded-sm bg-ink px-7 font-sans text-base font-medium text-paper transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
