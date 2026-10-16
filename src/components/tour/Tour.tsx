"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Eyebrow from "@/components/Eyebrow";
import Mark from "@/components/marks/Mark";
import ProductMark, { type ProductKey } from "@/components/marks/ProductMark";
import { Chip, MockTable, MockTabs } from "./mock";
import type { MockApp, NavGroup, Stop, Tag } from "./stops";

const W = 1600;
const H = 800;

const NARROW = "(max-width: 759px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(NARROW);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const isNarrow = () => window.matchMedia(NARROW).matches;

const pct = (v: number, d: number) => `${((v / d) * 100).toFixed(3)}%`;

/**
 * The guided tour on each product page: a floor plan the camera flies over,
 * one stop at a time, and below it the app screen that stop produces.
 * Both sections share the current stop, so they render together.
 */
export default function Tour({
  stops,
  apps,
  nav,
  plan,
  token,
  brand,
  text,
  ui,
}: {
  stops: Stop[];
  apps: Record<string, MockApp>;
  nav: NavGroup[];
  /** Floor plan SVG content, drawn above the zone highlights. */
  plan: React.ReactNode;
  token: "round" | "square";
  /** `product` draws the Pantheus product mark; without it the mock is under
   * a client's own brand (brand tier), shown as a plain logo stand-in, and
   * Pantheus appears only as "Powered by" with the original λ mark. */
  brand: {
    product?: ProductKey;
    name: string;
    kbd: string;
    poweredBy?: string;
  };
  text: {
    eyebrow: string;
    title: string;
    body: string;
    tabs: string;
    route: string;
    start: string;
    end: string;
    screenEyebrow: string;
    screenNote: string;
  };
  ui: {
    prev: string;
    close: string;
    detail: string;
    next: string;
    hintDetail: string;
    hintZones: string;
    tags: Record<Tag, string>;
  };
}) {
  const [step, setStep] = useState(0);
  const [hot, setHot] = useState(-1);
  const hotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const narrow = useSyncExternalStore(subscribe, isNarrow, () => false);

  const cur = stops[step];
  const last = stops.length - 1;
  const app = apps[cur.app];
  const open = hot >= 0 ? cur.hots[hot] : null;

  const go = (i: number) => () => {
    setStep(i);
    setHot(-1);
  };
  const closeHot = () => {
    hotRefs.current[hot]?.focus();
    setHot(-1);
  };

  useEffect(() => {
    if (hot < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      hotRefs.current[hot]?.focus();
      setHot(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [hot]);

  // Camera: frame the stop's zone (or the whole plan) and keep it clear of
  // the card on wide screens; pins counter-scale so they stay a fixed size.
  let sc: number, cx: number, cy: number;
  if (!cur.zone) {
    sc = narrow ? 0.96 : 0.62;
    cx = W / 2;
    cy = H / 2;
  } else {
    const [x, y, w, h] = cur.zone;
    sc = Math.min(2.3, (W * 0.56) / w, (H * 0.84) / h);
    cx = x + w / 2;
    cy = y + h / 2;
  }
  const fx = narrow ? 0.5 : cur.zone ? 0.64 : 0.68;
  const cam = `translate(${((fx - (sc * cx) / W) * 100).toFixed(3)}%, ${((0.5 - (sc * cy) / H) * 100).toFixed(3)}%) scale(${sc.toFixed(4)})`;
  const pinT = `translate(-50%, -50%) scale(${(1 / sc).toFixed(4)})`;

  const nextLabel =
    step === 0
      ? text.start
      : step === last
        ? text.end
        : `${ui.next} ${stops[step + 1].short}`;

  return (
    <>
      <section
        id="journey"
        className="dark border-t border-line bg-paper pt-[110px] pb-[90px] text-ink max-[900px]:pt-[84px] max-[900px]:pb-[72px]"
      >
        <div className="wrap">
          <Eyebrow>{text.eyebrow}</Eyebrow>
          <div className="mt-[22px] mb-8 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 max-w-[640px]">{text.title}</h2>
            <p className="body max-w-[400px]">{text.body}</p>
          </div>

          <div className="jr">
            <div className="stage">
              <div className="gridbg" aria-hidden="true" />
              <div className="world" style={{ transform: cam }}>
                <svg viewBox="0 0 1600 800" aria-hidden="true">
                  {stops.map(
                    (s, i) =>
                      s.zone && (
                        <rect
                          key={s.n}
                          className={i === step ? "zone on" : "zone"}
                          x={s.zone[0]}
                          y={s.zone[1]}
                          width={s.zone[2]}
                          height={s.zone[3]}
                        />
                      ),
                  )}
                  {plan}
                </svg>

                {/* Number markers repeat the tabs below, so they are a
                    pointer shortcut only; keyboard users get the tabs. */}
                {stops.map(
                  (s, i) =>
                    s.marker &&
                    i !== step && (
                      <div
                        key={s.n}
                        className="pin"
                        style={{
                          left: pct(s.marker[0], W),
                          top: pct(s.marker[1], H),
                        }}
                      >
                        <button
                          type="button"
                          className="mk"
                          style={{ transform: pinT }}
                          onClick={go(i)}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          {s.n}
                        </button>
                      </div>
                    ),
                )}
                {cur.hots.map((h, j) => (
                  <div
                    key={`${step}-${j}`}
                    className="pin"
                    style={{ left: pct(h.at[0], W), top: pct(h.at[1], H) }}
                  >
                    <button
                      type="button"
                      ref={(el) => {
                        hotRefs.current[j] = el;
                      }}
                      className="hs"
                      style={{ transform: pinT }}
                      onClick={() => setHot(j === hot ? -1 : j)}
                      aria-label={`${ui.detail}: ${h.t}`}
                      aria-expanded={j === hot}
                      aria-controls={j === hot ? "tour-detail" : undefined}
                    >
                      +
                    </button>
                  </div>
                ))}
                <div
                  className="pin walk"
                  style={{
                    left: pct(cur.token[0], W),
                    top: pct(cur.token[1], H),
                  }}
                  aria-hidden="true"
                >
                  <div
                    className={token === "square" ? "tok square" : "tok"}
                    style={{ transform: pinT }}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-top">
                <span className="mono acc">
                  {cur.n} / {stops[last].n} · {cur.card}
                </span>
                {cur.tag && (
                  <span className={`tag t-${cur.tag}`}>{ui.tags[cur.tag]}</span>
                )}
              </div>
              <h3 className="h3 text-[24px]">{cur.title}</h3>
              <p className="body text-[14px]">{cur.desc}</p>
              <dl className="spec">
                {cur.specs.map(([k, v]) => (
                  <Fragment key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </Fragment>
                ))}
              </dl>
              <div className="card-nav">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={go((step + last) % stops.length)}
                  aria-label={ui.prev}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="btn btn-sm flex-1"
                  onClick={go((step + 1) % stops.length)}
                >
                  {nextLabel} <span className="arr">→</span>
                </button>
              </div>
            </div>

            {open && (
              <div
                id="tour-detail"
                className="pop light"
                role="dialog"
                aria-label={open.t}
              >
                <button
                  type="button"
                  className="pop-x"
                  onClick={closeHot}
                  aria-label={ui.close}
                >
                  ×
                </button>
                <span className="mono text-accent-text">
                  {cur.n} · {ui.detail}
                </span>
                <h3 className="h3 pr-7 text-[19px]">{open.t}</h3>
                <p className="body text-[14px]">{open.b}</p>
              </div>
            )}
          </div>

          <div className="tabs" role="group" aria-label={text.tabs}>
            {stops.map((s, i) => (
              <button
                key={s.n}
                type="button"
                className="tab"
                aria-pressed={i === step}
                onClick={go(i)}
              >
                <span className="n">{s.tab}</span>
                <span className="l">{s.short}</span>
              </button>
            ))}
          </div>
          <div className="hint mono">
            <span>● {text.route}</span>
            <span>+ {ui.hintDetail}</span>
            <span>
              {stops[1].n}–{stops[last].n} {ui.hintZones}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-section py-24 text-ink max-[900px]:py-[72px]">
        <div className="wrap">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>
                {text.screenEyebrow} · {cur.where}
              </Eyebrow>
              <h2 className="h2 h2-sm mt-4">{cur.screen}</h2>
            </div>
            <p className="body max-w-[380px]">{text.screenNote}</p>
          </div>
          <div className="app">
            <aside className="app-side">
              <div className="app-brand">
                {brand.product ? (
                  <ProductMark product={brand.product} size={16} />
                ) : (
                  <span className="app-logo" aria-hidden="true" />
                )}
                {brand.name}
              </div>
              {nav.map((g) => (
                <div key={g.g} className="app-g">
                  <div className="app-gl">{g.g}</div>
                  {g.items.map((it) => (
                    <div
                      key={it.t}
                      className={
                        it.on?.includes(cur.app) ? "app-i on" : "app-i"
                      }
                    >
                      <span>{it.t}</span>
                      {it.soon && <em>{it.soon}</em>}
                    </div>
                  ))}
                </div>
              ))}
              {brand.poweredBy && (
                <div className="app-pw">
                  <Mark className="h-3 w-3" />
                  {brand.poweredBy}
                </div>
              )}
            </aside>
            <div className="app-main">
              <div className="app-top">
                <span>{app.crumb}</span>
                <span className="kbd">{brand.kbd}</span>
              </div>
              <div className="app-body">
                <div className="app-h">
                  <h3>{app.title}</h3>
                  {app.chips.map((c) => (
                    <Chip key={c.t} tone={c.c}>
                      {c.t}
                    </Chip>
                  ))}
                </div>
                <MockTabs tabs={app.tabs} />
                {app.callout && (
                  <div className="callout">
                    <span>{app.callout}</span>
                    {app.bar && (
                      <div className="bar" aria-hidden="true">
                        <i style={{ width: app.bar }} />
                      </div>
                    )}
                  </div>
                )}
                <MockTable cols={app.cols} head={app.head} rows={app.rows} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
