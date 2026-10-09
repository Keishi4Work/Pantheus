"use client";

import { useState } from "react";
import Mark from "@/components/marks/Mark";

type Step = {
  n: string;
  t: string;
  d: string;
  title: string;
  body: string;
  get: string[];
};

/**
 * The three-step model (tailor, iterate, productise). The figure for each
 * step is drawn on the server and handed in; the second step also lists what
 * actually shipped recently, as proof of the weekly loop.
 */
export default function Approach({
  steps,
  figures,
  shipped,
  labels,
}: {
  steps: Step[];
  figures: React.ReactNode[];
  shipped: {
    title: string;
    items: { date: string; label: string; text: string }[];
  };
  labels: { group: string; gets: string; prev: string; next: string };
}) {
  const [i, setI] = useState(0);
  const cur = steps[i];
  const count = steps.length;

  return (
    <>
      <div className="steps" role="group" aria-label={labels.group}>
        {steps.map((s, j) => (
          <button
            key={s.n}
            type="button"
            className={j < i ? "stp done" : "stp"}
            aria-pressed={j === i}
            onClick={() => setI(j)}
          >
            <span className="mono">{s.n}</span>
            <span className="t">{s.t}</span>
            <span className="d">{s.d}</span>
          </button>
        ))}
      </div>

      <div className="panel">
        <div>
          <div className="mono acc">
            {cur.n} / {steps[count - 1].n}
          </div>
          <h3 className="h3 mt-3.5 text-[34px] leading-[1.15] tracking-[-0.02em] max-[560px]:text-[26px]">
            {cur.title}
          </h3>
          <p className="body mt-[18px]">{cur.body}</p>
          <div className="mono mt-7 mb-3.5 text-ink-soft">{labels.gets}</div>
          <ul className="gets">
            {cur.get.map((g) => (
              <li key={g}>
                <Mark />
                {g}
              </li>
            ))}
          </ul>
          {i === 1 && (
            <div className="shipped">
              <div className="mono text-ink-soft">{shipped.title}</div>
              <ul className="grid gap-2.5">
                {shipped.items.map((s) => (
                  <li key={s.text}>
                    <time dateTime={s.date}>{s.label}</time>
                    {s.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-8 flex gap-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setI((i + count - 1) % count)}
              aria-label={labels.prev}
            >
              ←
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setI((i + 1) % count)}
            >
              {labels.next} <span className="arr">→</span>
            </button>
          </div>
        </div>

        <div className="diag">
          {figures[i]}
          <div className="diag-cap mono">Fig. {cur.n}</div>
        </div>
      </div>
    </>
  );
}
