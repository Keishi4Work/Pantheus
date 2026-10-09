import type { Tone } from "./mock";

/* Tour data shared by the server pages (which merge copy with geometry) and
   the client Tour. The floor plan is drawn on a 1600×800 sheet; every
   coordinate is in that space. */
export type XY = readonly [number, number];
export type Rect = readonly [number, number, number, number];
export type Tag = "run" | "soon" | "plan";

/** Where a stop sits on the plan — kept in code, apart from the copy. */
export type StopGeometry = {
  zone: Rect | null;
  token: XY;
  marker?: XY;
  hots: XY[];
  tag: Tag | null;
  app: string;
};

/** A stop's copy, from the message files. */
export type StopText = {
  n: string;
  short: string;
  title: string;
  desc: string;
  screen: string;
  specs: [string, string][];
  hots: { t: string; b: string }[];
};

export type Stop = Omit<StopText, "hots"> &
  Omit<StopGeometry, "hots"> & {
    hots: { t: string; b: string; at: XY }[];
    /** Short context after the stop number: card header, tab, screen label. */
    card: string;
    tab: string;
    where: string;
  };

export type MockApp = {
  crumb: string;
  title: string;
  chips: { t: string; c: Tone }[];
  tabs: string[];
  callout: string;
  head: string[];
  rows: string[][];
  cols: string;
  bar?: string;
};

export type NavGroup = {
  g: string;
  items: { t: string; on?: string[]; soon?: string }[];
};

export function mergeStops<T extends StopText>(
  text: T[],
  geometry: StopGeometry[],
  meta: (s: T) => { card: string; tab: string; where: string },
): Stop[] {
  return text.map((s, i) => ({
    ...s,
    ...geometry[i],
    ...meta(s),
    hots: s.hots.map((h, j) => ({ ...h, at: geometry[i].hots[j] })),
  }));
}

/** Table column widths and progress bars are layout, so they live in code. */
export type AppLayout = Record<string, { cols: string; bar?: string }>;

export function mergeApps(
  text: Record<string, Omit<MockApp, "cols" | "bar">>,
  layout: AppLayout,
): Record<string, MockApp> {
  return Object.fromEntries(
    Object.entries(text).map(([k, a]) => [k, { ...a, ...layout[k] }]),
  );
}
