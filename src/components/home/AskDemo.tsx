"use client";

import { useState } from "react";
import Mark from "@/components/marks/Mark";

type Question = {
  q: string;
  p: string;
  a: string;
  lines: { k: string; v: string }[];
  tail: string;
  refs: string[];
};

/**
 * Illustrative chat with Pan: pick a question, read the scripted answer.
 * `children` is the section heading, which sits above the questions.
 */
export default function AskDemo({
  qs,
  labels,
  children,
}: {
  qs: Question[];
  labels: { group: string; who: string; sample: string; placeholder: string };
  children: React.ReactNode;
}) {
  const [i, setI] = useState(0);
  const ans = qs[i];

  return (
    <div className="wrap split">
      <div>
        {children}
        <div className="qs" role="group" aria-label={labels.group}>
          {qs.map((x, j) => (
            <button
              key={x.q}
              type="button"
              className="q"
              aria-pressed={j === i}
              onClick={() => setI(j)}
            >
              <span>{x.q}</span>
              <span className="mono">{x.p}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="chat">
        <div className="chat-h">
          <span className="mono acc">{labels.who}</span>
          <span className="mono text-ink-soft">{labels.sample}</span>
        </div>
        <div className="chat-b" aria-live="polite">
          <div className="bub-q">{ans.q}</div>
          <div className="bub-a">
            <div className="av" aria-hidden="true">
              <Mark className="h-3.5 w-3.5" />
            </div>
            <div className="ans">
              <p>{ans.a}</p>
              <ul>
                {ans.lines.map((l) => (
                  <li key={l.k}>
                    <span>{l.k}</span>
                    <b>{l.v}</b>
                  </li>
                ))}
              </ul>
              <p className="text-[13.5px] text-ink-soft">{ans.tail}</p>
              <div className="refs">
                {ans.refs.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="chat-in" aria-hidden="true">
          <span>{labels.placeholder}</span>
          <span className="mono">↵</span>
        </div>
      </div>
    </div>
  );
}
