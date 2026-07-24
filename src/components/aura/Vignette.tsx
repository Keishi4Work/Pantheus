/**
 * Soft warm-grey vignette — darkens the corners a touch so the lit center
 * holds focus. Pure monochrome (ink mixed into transparent).
 */
export default function Vignette({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        // Intentionally a literal #000, not a theme token: a vignette must
        // darken corners in BOTH light and dark. Mapping this to var(--ink)
        // would invert it in dark mode (ink flips to near-white → corners
        // would lighten). Kept as pure-black-into-transparent by design.
        background:
          "radial-gradient(120% 90% at 50% 30%, transparent 52%, color-mix(in oklab, #000 9%, transparent) 100%)",
      }}
    />
  );
}
