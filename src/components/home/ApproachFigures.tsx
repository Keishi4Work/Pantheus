/* The three approach figures, traced from the design. Labels come from the
   page so each figure reads in either language. */

/** Fig. 01 — the customer's own process, drawn as it really runs. */
export function FigProcess({
  l,
}: {
  l: Record<
    | "receive"
    | "check"
    | "store"
    | "issue"
    | "assemble"
    | "finished"
    | "ship"
    | "returns"
    | "exception"
    | "caption",
    string
  >;
}) {
  const box = (x: number, y: number, label: string) => (
    <>
      <rect className="pf" x={x} y={y} width="92" height="30" />
      <text className="ptx" x={x + 46} y={y + 19} textAnchor="middle">
        {label}
      </text>
    </>
  );
  return (
    <svg viewBox="0 0 480 360" aria-hidden="true">
      <path
        className="pl"
        d="M122 95 H190 M282 95 H350 M396 110 V180 M350 195 H282 M190 195 H122 M76 210 V280"
      />
      <path className="pa flow" d="M236 80 V46" />
      {box(30, 80, l.receive)}
      {box(190, 80, l.check)}
      {box(350, 80, l.store)}
      {box(350, 180, l.issue)}
      {box(190, 180, l.assemble)}
      {box(30, 180, l.finished)}
      <rect className="pa-fill" x="30" y="280" width="92" height="30" />
      <text className="ptx-a" x="76" y="299" textAnchor="middle">
        {l.ship}
      </text>
      <rect className="pa" x="190" y="16" width="92" height="30" />
      <text className="ptx-a" x="236" y="35" textAnchor="middle">
        {l.returns}
      </text>
      <text className="ptx" x="300" y="35">
        {l.exception}
      </text>
      <text className="ptx" x="460" y="340" textAnchor="end">
        {l.caption}
      </text>
    </svg>
  );
}

/** Fig. 02 — the weekly feedback loop. */
export function FigLoop({
  l,
}: {
  l: Record<
    "feedback" | "spec" | "build" | "update" | "loop" | "weekly" | "button",
    string
  >;
}) {
  return (
    <>
      <svg viewBox="0 0 480 360" aria-hidden="true">
        <circle
          className="pl"
          cx="240"
          cy="180"
          r="110"
          style={{ strokeDasharray: "3 5" }}
        />
        <circle
          className="orbit"
          cx="240"
          cy="180"
          r="110"
          transform="rotate(-90 240 180)"
        />
        <rect className="lp" x="180" y="53" width="120" height="34" />
        <text className="ptx" x="240" y="74" textAnchor="middle">
          {l.feedback}
        </text>
        <rect className="lp d1" x="290" y="163" width="120" height="34" />
        <text className="ptx" x="350" y="184" textAnchor="middle">
          {l.spec}
        </text>
        <rect className="lp d2" x="180" y="273" width="120" height="34" />
        <text className="ptx" x="240" y="294" textAnchor="middle">
          {l.build}
        </text>
        <rect className="lp d3" x="70" y="163" width="120" height="34" />
        <text className="ptx" x="130" y="184" textAnchor="middle">
          {l.update}
        </text>
        <text className="ptx-a" x="240" y="178" textAnchor="middle">
          {l.loop}
        </text>
        <text className="ptx" x="240" y="194" textAnchor="middle">
          {l.weekly}
        </text>
      </svg>
      <span className="fbtn" aria-hidden="true">
        ↗ {l.button}
      </span>
    </>
  );
}

/** Fig. 03 — every business is the shared base plus its own tailored part. */
export function FigLayers({
  l,
}: {
  l: Record<"formula" | "you" | "a" | "b" | "base", string>;
}) {
  return (
    <svg viewBox="0 0 480 360" aria-hidden="true">
      <text className="ptx" x="40" y="62">
        {l.formula}
      </text>
      <g className="float">
        <rect className="pa-fill" x="300" y="96" width="140" height="56" />
        <text className="ptx-a" x="370" y="128" textAnchor="middle">
          {l.you}
        </text>
      </g>
      <rect className="pa" x="40" y="96" width="120" height="56" />
      <text className="ptx" x="100" y="128" textAnchor="middle">
        {l.a}
      </text>
      <rect className="pa" x="170" y="96" width="120" height="56" />
      <text className="ptx" x="230" y="128" textAnchor="middle">
        {l.b}
      </text>
      <rect className="pf" x="40" y="166" width="195" height="64" />
      <text className="ptx" x="137" y="202" textAnchor="middle">
        OFFICE
      </text>
      <rect className="pf" x="245" y="166" width="195" height="64" />
      <text className="ptx" x="342" y="202" textAnchor="middle">
        PRODUCTION
      </text>
      <rect className="pl2" x="40" y="244" width="400" height="56" />
      <text className="ptx" x="240" y="276" textAnchor="middle">
        {l.base}
      </text>
    </svg>
  );
}
