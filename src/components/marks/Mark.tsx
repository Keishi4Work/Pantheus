/**
 * The Pantheus mark — the lambda rebuilt on a 24px grid as a single bold stroke
 * (design-system v2, "option A"). `fill="none"` + `stroke="currentColor"` so
 * `text-*` classes theme it, and it stays crisp down to 16px (favicon, collapsed
 * sidebar). The previous filled letterform is preserved as `MarkLegacy`.
 * This is the brand fingerprint: pillar markers, eyebrows, etc.
 */
export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 3.5 17.5 20.5M11.9 11.4 6 20.5"
        stroke="currentColor"
        strokeWidth={2.6}
      />
    </svg>
  );
}
