import Mark from "@/components/marks/Mark";

/** Mono section label led by the lambda mark — the page's recurring signature. */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mono eyebrow ${className}`}>
      <Mark className="h-3 w-3 shrink-0 text-accent-text" />
      <span>{children}</span>
    </div>
  );
}
