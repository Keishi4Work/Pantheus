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
        background:
          "radial-gradient(120% 90% at 50% 30%, transparent 52%, color-mix(in oklab, #000 9%, transparent) 100%)",
      }}
    />
  );
}
