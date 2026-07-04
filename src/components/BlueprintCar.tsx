"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MotionProps, TargetAndTransition, Transition } from "motion/react";
import { useHydrated } from "@/lib/useHydrated";

// Technical line-drawing of a modern EV sedan rendered as a LIVE blueprint on
// an infinite loop that tells an assembly story: construction guides, then the
// outline, then the INTERNALS (seats, steering, suspension, axle motors) in
// x-ray, then the body panels close over them and the wheels go on — and the
// finished car runs in place before un-drawing in reverse for the next
// revision. The whole loop is ONE shared 22s timeline: every element animates
// keyframes over `LOOP` with phase boundaries baked into `times`, so nothing
// drifts. Free-running sub-loops (the draw-head trace) are visibility-gated
// by LOOP-synced opacity wrappers instead of delays.

const LOOP = 22; // seconds — one full idea → execution → working cycle
const f = (s: number) => +(s / LOOP).toFixed(4);
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN: [number, number, number, number] = [0.64, 0, 0.78, 0];

const T = {
  drawStart: 0.15,
  drawSpread: 6.2,
  drawDur: 1.6, // unhurried, deliberate drafting (exterior)
  innerStart: 0.9,
  innerSpread: 3.9,
  innerDur: 1.2, // internals sketch in while the outline forms
  cover: 7.6, // …and fade as the last panels close over them
  runIn: 9.4, // wheels start
  spun: 11.0, // cruise speed reached
  cruiseEnd: 16.4,
  runOut: 17.4, // wheels stopped
  eraseStart: 17.7,
  eraseSpread: 2.2,
  eraseDur: 0.9, // rest 20.8 → 22, then wrap
};

type Seg = { d: string; w?: number; dash?: string; dur?: number };

// full circle as a path so every element is a motion.path with a drawable length
const circ = (cx: number, cy: number, r: number) =>
  `M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}`;

// curved aero-wheel blade, swept tangentially from center cap to rim
const blade = (cx: number, cy: number, deg: number): Seg => {
  const a0 = (deg * Math.PI) / 180;
  const p = (r: number, a: number) =>
    `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  return { d: `M ${p(8, a0)} Q ${p(24, a0 + 0.45)} ${p(37, a0 + 0.9)}`, w: 1 };
};

// tire first (static), then the rotating parts: rim, 5 blades, center cap.
// Realistic stance: tire Ø 112 ≈ half the body height, tucked inside the arch.
const wheel = (cx: number, cy: number): Seg[] => [
  { d: circ(cx, cy, 56), w: 1.5 },
  { d: circ(cx, cy, 42), w: 1.1 },
  ...[0, 72, 144, 216, 288].map((a) => blade(cx, cy, a)),
  { d: circ(cx, cy, 4.5), w: 1.1 },
];

// One continuous stroke, front lip → nose → fender peak → fast windshield →
// flyline falling to a crisp ducktail → rear fascia → underside with both
// wheel arches (r 64, wheels r 56 tucked inside).
const SILHOUETTE =
  "M 796 444 L 792 420 C 790 406 783 397 770 391 " +
  "C 734 366 692 350 640 342 C 622 339 600 338 578 338 " +
  "C 532 320 490 288 456 264 C 442 257 424 254 406 255 " +
  "C 348 258 286 276 234 296 C 196 308 156 316 124 320 L 110 322 " +
  "C 98 340 93 372 93 400 C 93 418 97 430 106 440 L 112 447 " +
  "L 171 447 A 64 64 0 1 1 281 447 L 599 447 A 64 64 0 1 1 709 447 " +
  "L 786 446 Z";

const GLASS_OUTLINE =
  "M 560 335 L 462 268 C 446 261 428 260 410 263 L 322 297 C 390 315 486 329 560 335 Z";

const GROUND: Seg[] = [
  { d: "M 70 470 L 812 470", w: 1.1 },
  {
    d: "M 118 470 l -13 13 M 238 470 l -13 13 M 358 470 l -13 13 M 478 470 l -13 13 M 598 470 l -13 13 M 718 470 l -13 13",
    w: 0.6,
  },
];

const BODY: Seg[] = [
  { d: SILHOUETTE, w: 1.7, dur: 2.8 },
  { d: "M 356 336 C 300 326 250 326 210 334 C 184 339 162 344 148 348", w: 0.9 }, // rear haunch
  { d: "M 706 374 C 676 362 648 357 622 356", w: 0.8 }, // front fender crease
  { d: "M 744 386 C 700 368 660 356 614 350", w: 0.8 }, // frunk cutline
  { d: "M 300 439 L 578 439", w: 0.8 }, // sill trim line
  { d: "M 788 426 C 776 423 766 422 756 422", w: 1 }, // lower air intake
  { d: "M 308 272 L 298 263 L 286 270", w: 1.1 }, // shark-fin antenna
];

const GLASS: Seg[] = [
  { d: GLASS_OUTLINE, w: 1.2 },
  { d: "M 356 271 L 364 320", w: 0.8 }, // quarter-glass divider
];

const LIGHTS: Seg[] = [
  { d: "M 778 396 C 766 391 752 388 740 387", w: 2 }, // headlight blade
  { d: "M 774 404 C 764 400 754 398 746 398", w: 0.9 }, // DRL accent
  { d: "M 104 330 L 148 324", w: 2 }, // full-width tail light bar
];

// panel seams — fender/door, B-pillar continuing into the door seam, door/quarter
const CUTLINES: Seg[] = [
  { d: "M 528 336 C 530 372 528 410 522 445", w: 0.8 },
  { d: "M 452 266 L 462 332 C 464 368 462 408 456 445", w: 0.8 },
  { d: "M 344 320 C 346 360 344 404 338 444", w: 0.8 },
];

const DETAILS: Seg[] = [
  { d: "M 496 344 L 522 345", w: 0.9 }, // flush handle
  { d: "M 368 339 L 394 340", w: 0.9 }, // flush handle
  { d: "M 562 332 L 580 323 L 585 328 L 568 336 Z", w: 1 }, // mirror
  { d: "M 158 330 h 10 v 8 h -10 Z", w: 0.9, dash: "2.5 2.5" }, // charge-port flap
];

// x-ray internals: sketched while the outline forms, covered when panels
// close. Sharp machinery, assembly order: floor → drive units (housing,
// rotor/stator rings, inverter, reduction gear + half-shaft, cooling fins) →
// coil-over suspension → brakes (vented disc + caliper) → cabin (seats on
// rails, dash, steering).
const INTERNALS: Seg[] = [
  { d: "M 304 428 L 580 428", w: 0.9 }, // floor pan
  // rear drive unit
  { d: circ(268, 424, 17), w: 1.1 }, // motor housing
  { d: `${circ(268, 424, 10)} ${circ(268, 424, 4)}`, w: 0.8 }, // rotor + stator rings
  { d: "M 252 398 h 32 v 9 h -32 Z", w: 1 }, // inverter
  { d: `${circ(292, 430, 9)} M 283 428 L 249 420`, w: 0.9 }, // reduction gear + half-shaft
  { d: "M 252 444 l 5 6 M 262 444 l 5 6 M 272 444 l 5 6", w: 0.7 }, // cooling fins
  // front drive unit
  { d: circ(612, 424, 17), w: 1.1 }, // motor housing
  { d: `${circ(612, 424, 10)} ${circ(612, 424, 4)}`, w: 0.8 }, // rotor + stator rings
  { d: "M 596 398 h 32 v 9 h -32 Z", w: 1 }, // inverter
  { d: `${circ(588, 430, 9)} M 597 428 L 631 420`, w: 0.9 }, // reduction gear + half-shaft
  { d: "M 602 444 l 5 6 M 612 444 l 5 6 M 622 444 l 5 6", w: 0.7 }, // cooling fins
  // frunk cooling module
  { d: "M 730 400 h 28 v 20 h -28 Z", w: 1 },
  { d: "M 734 407 h 20 M 734 413 h 20", w: 0.7 }, // heat-exchanger fins
  // suspension — twin-line coil-overs with top mounts and lower arms
  { d: "M 221 407 L 212 356 M 228 406 L 219 355", w: 0.9 }, // rear strut body
  { d: "M 208 398 L 230 391 L 208 383 L 230 375 L 208 367 L 228 361", w: 0.9 }, // rear coil
  { d: "M 210 352 L 224 349", w: 1 }, // rear top mount
  { d: "M 230 418 L 276 426", w: 0.9 }, // rear lower arm
  { d: "M 649 407 L 640 356 M 656 406 L 647 355", w: 0.9 }, // front strut body
  { d: "M 636 398 L 658 391 L 636 383 L 658 375 L 636 367 L 656 361", w: 0.9 }, // front coil
  { d: "M 638 352 L 652 349", w: 1 }, // front top mount
  { d: "M 648 418 L 602 426", w: 0.9 }, // front lower arm
  // brakes — vented disc (disc + hat) and caliper
  { d: `${circ(226, 414, 24)} ${circ(226, 414, 15)}`, w: 0.9 }, // rear disc
  { d: "M 210.5 392 A 27 27 0 0 0 199.9 407", w: 3 }, // rear caliper
  { d: `${circ(654, 414, 24)} ${circ(654, 414, 15)}`, w: 0.9 }, // front disc
  { d: "M 669.5 392 A 27 27 0 0 1 680.1 407", w: 3 }, // front caliper
  // cabin — seats (headrest, twin-line backrest, cushion, rail), dash, steering
  { d: "M 316 354 h 13 v 11 h -13 Z", w: 1 }, // rear headrest
  { d: "M 322 366 L 316 410 M 330 367 L 324 411", w: 1 }, // rear backrest
  { d: "M 316 410 Q 314 418 322 419 L 356 420 Q 362 420 362 414", w: 1 }, // rear cushion
  { d: "M 444 350 h 13 v 11 h -13 Z", w: 1 }, // front headrest
  { d: "M 450 363 L 441 408 M 458 364 L 449 409", w: 1 }, // front backrest
  { d: "M 441 408 Q 440 416 448 417 L 488 419 Q 494 419 494 413", w: 1 }, // front cushion
  { d: "M 446 426 L 492 426 M 452 419 L 452 426 M 484 419 L 484 426", w: 0.8 }, // seat rail
  { d: "M 568 337 C 552 344 542 354 536 370 L 534 380", w: 1 }, // dashboard / IP
  { d: "M 508 356 C 502 366 502 376 509 387 M 513 357 C 508 366 508 376 514 386", w: 1 }, // steering rim
  { d: "M 511 374 L 543 386", w: 0.9 }, // steering column
];

// exterior draw order = assembly: guides → outline/body → glass → lights →
// seams → details, wheels fitted last (and taken off first when erasing).
const OUTER = [...GROUND, ...BODY, ...GLASS, ...LIGHTS, ...CUTLINES, ...DETAILS];
const REAR = wheel(226, 414);
const FRONT = wheel(654, 414);
const N = OUTER.length + REAR.length + FRONT.length;

const SPEED = [
  { x1: 200, x2: 640, y: 484, dash: "20 28", w: 1 },
  { x1: 150, x2: 560, y: 493, dash: "12 18", w: 0.8 },
  { x1: 260, x2: 700, y: 502, dash: "26 34", w: 1.1 },
  { x1: 180, x2: 520, y: 510, dash: "9 14", w: 0.7 },
];

export default function BlueprintCar({
  className = "",
  trigger = "scroll",
}: {
  className?: string;
  trigger?: "scroll" | "load";
}) {
  // two-pass: the server can't know the motion preference, so the hydration
  // render must match SSR (reduce=false); the real value applies after.
  // Under reduce the helpers settle to the static final state (not {}),
  // otherwise elements would freeze at their in-flight opacity.
  const rm = useReducedMotion();
  const reduce = useHydrated() && !!rm;
  const onLoad = trigger === "load";

  // `whileInView` (scroll) vs `animate` (on mount) share the same target props.
  const run = (target: TargetAndTransition, transition: Transition): MotionProps =>
    onLoad
      ? { animate: target, transition }
      : {
          whileInView: target,
          viewport: { once: true, margin: "-12% 0px -12% 0px" },
          transition,
        };

  // stagger boundaries for exterior element i — draw in order, erase in
  // REVERSE order. stagger lives in `times`, never in `delay`: a delayed
  // infinite tween is permanently phase-shifted and the loop's phases stop
  // lining up.
  const bounds = (i: number) => {
    const k = Math.max(N - 1, 1);
    return {
      d0: T.drawStart + (i / k) * T.drawSpread,
      e0: T.eraseStart + ((N - 1 - i) / k) * T.eraseSpread,
    };
  };

  // one infinite tween per element: hidden → draw → hold → erase → rest
  const drawLoop = (i: number, dur = T.drawDur): MotionProps => {
    if (reduce)
      return {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 0.3 },
      };
    const { d0, e0 } = bounds(i);
    return {
      initial: { pathLength: 0, opacity: 0 },
      ...run(
        { pathLength: [0, 0, 1, 1, 0, 0], opacity: [0, 0, 1, 1, 0, 0] },
        {
          duration: LOOP,
          repeat: Infinity,
          times: [0, f(d0), f(d0 + dur), f(e0), f(e0 + T.eraseDur), 1],
          ease: ["linear", EASE, "linear", EASE_IN, "linear"],
        },
      ),
    };
  };

  // internals: draw in early, hold in x-ray, then fade as the panels close.
  // They never take part in the erase phase — they're already covered.
  const inner = (j: number): MotionProps => {
    const k = Math.max(INTERNALS.length - 1, 1);
    const d0 = T.innerStart + (j / k) * T.innerSpread;
    const c0 = T.cover + (j / k) * 0.5;
    return {
      initial: { pathLength: 0, opacity: 0 },
      ...run(
        { pathLength: [0, 0, 1, 1, 1, 1], opacity: [0, 0, 1, 1, 0, 0] },
        {
          duration: LOOP,
          repeat: Infinity,
          times: [0, f(d0), f(d0 + T.innerDur), f(c0), f(c0 + 0.7), 1],
          ease: ["linear", EASE, "linear", "easeInOut", "linear"],
        },
      ),
    };
  };

  // dashed elements can't use motion's pathLength API (it owns stroke-dasharray),
  // so they fade through the same stagger windows instead.
  const fadeLoop = (i: number): MotionProps => {
    if (reduce)
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      };
    const { d0, e0 } = bounds(i);
    return {
      initial: { opacity: 0 },
      ...run(
        { opacity: [0, 0, 1, 1, 0, 0] },
        {
          duration: LOOP,
          repeat: Infinity,
          ease: "linear",
          times: [0, f(d0), f(d0 + 0.9), f(e0), f(e0 + 0.6), 1],
        },
      ),
    };
  };

  // LOOP-synced visibility window for fade content and free-running sub-loops
  // (under reduce this only reaches dims/labels — the sub-loop groups unmount)
  const gate = (inAt: number, outAt: number, fadeIn = 0.5, fadeOut = 0.5): MotionProps => {
    if (reduce)
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      };
    return {
      initial: { opacity: 0 },
      ...run(
        { opacity: [0, 0, 1, 1, 0, 0] },
        {
          duration: LOOP,
          repeat: Infinity,
          ease: "linear",
          times: [0, f(inAt), f(inAt + fadeIn), f(outAt - fadeOut), f(outAt), 1],
        },
      ),
    };
  };

  // wheel spin: ramp up → cruise at 540°/s → ramp down. End keyframe is a
  // multiple of 360 so the loop wrap is invisible (and the wheels are erased
  // by then anyway). Motion rotates SVG groups around their fill-box center —
  // each rotating group contains the full rim circle, so that center IS the hub.
  const spin = (): MotionProps => {
    if (reduce) return { animate: { rotate: 0 }, transition: { duration: 0 } };
    return run(
      { rotate: [0, 0, 300, 3216, 3600, 3600] },
      {
        duration: LOOP,
        repeat: Infinity,
        times: [0, f(T.runIn), f(T.spun), f(T.cruiseEnd), f(T.runOut), 1],
        ease: ["linear", "easeIn", "linear", "easeOut", "linear"],
      },
    );
  };

  // speed-lines stream toward the tail (positive dashoffset = pattern slides
  // to path start = leftward), accelerating with the wheels. Manual dasharray
  // only — never combined with motion's pathLength API on the same element.
  const streak = (i: number): MotionProps =>
    run(
      { strokeDashoffset: [0, 0, 60 + i * 12, 940 + i * 100, 940 + i * 100] },
      {
        duration: LOOP,
        repeat: Infinity,
        times: [0, f(T.runIn), f(T.spun), f(T.runOut), 1],
        ease: ["linear", "easeIn", "linear", "linear"],
      },
    );

  // free-running bright draw-head riding along a path (delay OK: free-phase,
  // visibility is owned by the gated wrapper group).
  const trace = (i: number, duration: number) => ({
    pathLength: 0.16,
    initial: { pathOffset: 0 },
    animate: { pathOffset: 1 },
    transition: { repeat: Infinity, duration, ease: "linear" as const, delay: 0.3 + i * 0.6 },
  });

  const S = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const seg = (s: Seg, i: number) => (
    <motion.path
      key={i}
      d={s.d}
      strokeWidth={s.w ?? 1.4}
      strokeDasharray={s.dash}
      {...S}
      {...(s.dash ? fadeLoop(i) : drawLoop(i, s.dur))}
    />
  );

  const wheelGroup = (parts: Seg[], base: number) => (
    <>
      {seg(parts[0], base)}
      <motion.g {...spin()}>{parts.slice(1).map((s, j) => seg(s, base + 1 + j))}</motion.g>
    </>
  );

  return (
    <svg viewBox="0 0 880 560" className={className} aria-hidden="true">
      {/* ---- x-ray internals: sketched first, covered by the body panels ---- */}
      {!reduce && (
        <g strokeOpacity={0.5}>
          {INTERNALS.map((s, j) => (
            <motion.path key={j} d={s.d} strokeWidth={s.w ?? 1} {...S} {...inner(j)} />
          ))}
        </g>
      )}

      {/* ---- base drawing (faint) — draws in, runs, erases in reverse ---- */}
      <g strokeOpacity={0.5}>
        {OUTER.map((s, i) => seg(s, i))}
        {wheelGroup(REAR, OUTER.length)}
        {wheelGroup(FRONT, OUTER.length + REAR.length)}
      </g>

      {/* ---- speed-lines: the car running in place ---- */}
      {!reduce && (
        <motion.g {...gate(T.runIn, T.runOut)}>
          {SPEED.map((l, i) => (
            <motion.line
              key={i}
              x1={l.x1}
              x2={l.x2}
              y1={l.y}
              y2={l.y}
              strokeWidth={l.w}
              strokeDasharray={l.dash}
              strokeOpacity={0.55}
              {...S}
              {...streak(i)}
            />
          ))}
        </motion.g>
      )}

      {/* ---- live draw-head: bright segment perpetually tracing the structure ---- */}
      {!reduce && (
        <motion.g strokeWidth={1.9} {...S} {...gate(1.2, 17.9)}>
          <motion.path d={SILHOUETTE} {...trace(0, 8)} />
          <motion.path d={GLASS_OUTLINE} {...trace(1, 3.8)} />
          <motion.path d={circ(226, 414, 42)} {...trace(2, 3.6)} />
          <motion.path d={circ(654, 414, 42)} {...trace(3, 3.6)} />
          <motion.path d="M 70 470 L 812 470" {...trace(4, 5.5)} />
        </motion.g>
      )}

      {/* ---- dimension / witness lines ---- */}
      <g strokeOpacity={0.5}>
        <motion.g strokeWidth={0.6} {...S} {...gate(8.0, 18.4)}>
          <path d="M 91 520 L 798 520" />
          <path d="M 91 512 L 91 528" />
          <path d="M 798 512 L 798 528" />
          <path d="M 826 255 L 826 470" />
          <path d="M 818 255 L 834 255" />
          <path d="M 818 470 L 834 470" />
          <path d="M 684 384 L 740 330" />
          <path d="M 350 238 L 430 234" />
          <path d="M 419 229 L 430 234 L 419 240" />
        </motion.g>
      </g>

      {/* ---- mono dimension labels ---- */}
      <motion.g
        fill="currentColor"
        fillOpacity={0.6}
        stroke="none"
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.05em",
        }}
        {...gate(8.0, 18.4)}
      >
        <text x={444} y={542} fontSize={13} textAnchor="middle">
          4 920 mm
        </text>
        <text x={846} y={367} fontSize={13} textAnchor="middle" transform="rotate(90 846 362)">
          1 420 mm
        </text>
        <text x={744} y={326} fontSize={13} textAnchor="start">
          Ø 780 mm
        </text>
        <text x={342} y={242} fontSize={13} textAnchor="end">
          Cd 0.21
        </text>
      </motion.g>
    </svg>
  );
}
