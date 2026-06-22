"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Technical line-drawing of an e-bike (the manufacturing example from the
// brief) rendered as a LIVE blueprint: a faint base drawing sits always
// visible while a brighter "draw-head" runs continuously along the structure
// — the schematic is perpetually being (re)traced, an engineering/CAD spirit.
// `trigger="load"` draws the base in on mount; the trace loop is always going.
export default function BlueprintBike({
  className = "",
  trigger = "scroll",
}: {
  className?: string;
  trigger?: "scroll" | "load";
}) {
  const reduce = useReducedMotion();
  const onLoad = trigger === "load";

  // `whileInView` (scroll) vs `animate` (on mount) share the same target props.
  const run = (target: object, transition: object) =>
    onLoad
      ? { animate: target, transition }
      : {
          whileInView: target,
          viewport: { once: true, margin: "-12% 0px -12% 0px" },
          transition,
        };

  // base entrance — each element draws itself once, then stays.
  const draw = (i: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          ...run(
            { pathLength: 1, opacity: 1 },
            { duration: 1.2, delay: 0.1 + i * 0.07, ease: EASE },
          ),
        };

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          ...run({ opacity: 1 }, { duration: 0.9, delay, ease: EASE }),
        };

  // perpetual draw-head: a short bright segment runs along the path forever,
  // looping seamlessly (pathOffset 0 and 1 are the same point). Staggered so
  // the whole schematic looks like it's continuously iterating.
  const trace = (i: number, duration: number) => {
    const delay = 0.3 + i * 0.16;
    return {
      pathLength: 0.16,
      initial: { pathOffset: 0, opacity: 0 },
      animate: { pathOffset: 1, opacity: 1 },
      transition: {
        pathOffset: {
          repeat: Infinity,
          duration,
          ease: "linear" as const,
          delay,
        },
        opacity: { duration: 1, delay, ease: EASE },
      },
    };
  };

  const S = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  // frame tubes, seat, bars, crank
  const frame = [
    "M455 400 L398 232", // seat tube
    "M455 400 L606 258", // down tube
    "M398 232 L590 222", // top tube
    "M590 222 L606 258", // head tube
    "M398 232 L250 370", // seat stay
    "M455 400 L250 370", // chain stay
    "M606 258 L660 370", // fork
    "M398 232 L389 188", // seat post
    "M358 184 L417 180", // saddle
    "M590 222 L617 189", // stem
    "M598 183 L642 175", // bar
    "M617 189 L598 198", // bar back
    "M455 400 L431 443", // crank arm
    "M414 443 L448 443", // pedal
  ];

  return (
    <svg viewBox="0 0 880 560" className={className} aria-hidden="true">
      {/* ---- base drawing (faint, always present) ---- */}
      <g strokeOpacity={0.5}>
        {/* wheels */}
        <motion.circle cx={250} cy={370} r={120} strokeWidth={1.5} {...S} {...draw(0)} />
        <motion.circle cx={660} cy={370} r={120} strokeWidth={1.5} {...S} {...draw(1)} />
        <motion.circle cx={250} cy={370} r={104} strokeWidth={1} {...S} {...draw(2)} />
        <motion.circle cx={660} cy={370} r={104} strokeWidth={1} {...S} {...draw(3)} />
        <motion.circle cx={250} cy={370} r={7} strokeWidth={1.2} {...S} {...draw(4)} />
        <motion.circle cx={660} cy={370} r={7} strokeWidth={1.2} {...S} {...draw(5)} />

        {/* crank / chainring */}
        <motion.circle cx={455} cy={400} r={30} strokeWidth={1.5} {...S} {...draw(6)} />
        <motion.circle cx={455} cy={400} r={8} strokeWidth={1.2} {...S} {...draw(6)} />

        {/* frame */}
        {frame.map((d, i) => (
          <motion.path key={i} d={d} strokeWidth={1.6} {...S} {...draw(7 + i)} />
        ))}

        {/* radii — schematic spokes */}
        <motion.g strokeWidth={0.6} {...S} {...fade(1.4)}>
          <line x1={130} y1={370} x2={370} y2={370} />
          <line x1={250} y1={250} x2={250} y2={490} />
          <line x1={540} y1={370} x2={780} y2={370} />
          <line x1={660} y1={250} x2={660} y2={490} />
        </motion.g>

        {/* battery pack (dashed) */}
        <motion.rect
          x={455}
          y={309}
          width={150}
          height={40}
          rx={4}
          strokeWidth={1.3}
          strokeDasharray="5 6"
          transform="rotate(-43 530 329)"
          {...S}
          {...fade(1.3)}
        />
      </g>

      {/* ---- live draw-head: bright segment perpetually tracing the structure ---- */}
      {!reduce && (
        <g strokeWidth={1.9} {...S}>
          <motion.circle cx={250} cy={370} r={120} {...trace(0, 5.5)} />
          <motion.circle cx={660} cy={370} r={120} {...trace(1, 5.5)} />
          <motion.circle cx={455} cy={400} r={30} {...trace(2, 2.6)} />
          {frame.map((d, i) => (
            <motion.path key={i} d={d} {...trace(3 + i, 2.6 + (i % 4) * 0.5)} />
          ))}
        </g>
      )}

      {/* dimension lines */}
      <g strokeOpacity={0.5}>
        <motion.g strokeWidth={0.6} {...S} {...fade(1.7)}>
          <line x1={250} y1={515} x2={660} y2={515} />
          <line x1={250} y1={506} x2={250} y2={524} />
          <line x1={660} y1={506} x2={660} y2={524} />
          <line x1={800} y1={250} x2={800} y2={490} />
          <line x1={791} y1={250} x2={809} y2={250} />
          <line x1={791} y1={490} x2={809} y2={490} />
          <line x1={552} y1={300} x2={576} y2={268} />
        </motion.g>
      </g>

      {/* mono dimension labels */}
      <motion.g
        fill="currentColor"
        fillOpacity={0.6}
        stroke="none"
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "0.05em",
        }}
        {...fade(1.9)}
      >
        <text x={455} y={537} fontSize={13} textAnchor="middle">
          1450 mm
        </text>
        <text
          x={820}
          y={374}
          fontSize={13}
          textAnchor="middle"
          transform="rotate(90 820 370)"
        >
          Ø 480 mm
        </text>
        <text x={582} y={262} fontSize={13}>
          36 V
        </text>
      </motion.g>
    </svg>
  );
}
