import Grain from "./Grain";
import Vignette from "./Vignette";

/**
 * The page's atmosphere: a faint blueprint grid with a slow monochrome light
 * sweeping across it (like a scanner over a drawing), grain + vignette beneath.
 * CSS/Canvas only — no WebGL. Sweep freezes under prefers-reduced-motion and
 * lightens on mobile (see globals.css). Used on the hero and closing only.
 */
export default function LitGridAura({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* faint structural grid, masked to fade at the edges */}
      <div className="aura-grid absolute inset-0" />

      {/* slow drifting light */}
      <div className="absolute -inset-[20%] flex items-center justify-center">
        <div className="aura-sweep h-[70vmax] w-[70vmax]" />
      </div>

      <Grain />
      <Vignette />
    </div>
  );
}
