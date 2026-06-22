/**
 * ≡ — the triple bar from the Pantheus "E". Monoline, derived from the logo.
 * Doubles as a "foundation" device (three stacked ground-lines).
 */
export default function TripleBarMark({
  className = "",
  strokeWidth = 1.75,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 7 H20" />
      <path d="M4 12 H20" />
      <path d="M4 17 H20" />
    </svg>
  );
}
