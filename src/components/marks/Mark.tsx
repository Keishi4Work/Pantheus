/**
 * The Pantheus mark — the lambda "A" from the wordmark, filled (real logo
 * geometry from assets/pantheus-mark.svg). `currentColor` so it themes.
 * This is the brand fingerprint: pillar markers, eyebrows, etc.
 */
export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(-35.74 2.87) scale(0.594)">
        <path d="M157.911 30.8839L194.83 127.795H167.141L148.504 72.5949C147.794 70.3467 147.143 68.0984 146.552 65.8502C146.078 63.4836 145.664 61.1762 145.309 58.9279C145.072 56.6797 144.895 54.6089 144.777 52.7156H144.067C143.948 54.7272 143.712 56.8571 143.357 59.1054C143.002 61.3537 142.528 63.6019 141.937 65.8502C141.463 68.0984 140.872 70.3467 140.162 72.5949L121.525 127.795H93.8359L130.755 30.8839Z" />
      </g>
    </svg>
  );
}
