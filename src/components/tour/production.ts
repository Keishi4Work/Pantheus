import type { AppLayout, StopGeometry } from "./stops";

/* Pantheus Production: the material flow through the factory floor plan. */
export const PRODUCTION_STOPS: StopGeometry[] = [
  { zone: null, token: [60, 600], hots: [[1020, 121]], tag: null, app: "home" },
  {
    zone: [168, 48, 312, 222],
    token: [325, 160],
    marker: [324, 159],
    hots: [
      [395, 118],
      [325, 212],
    ],
    tag: "run",
    app: "bom",
  },
  {
    zone: [480, 48, 320, 222],
    token: [640, 150],
    marker: [640, 159],
    hots: [
      [645, 205],
      [550, 112],
    ],
    tag: "run",
    app: "plan",
  },
  {
    zone: [10, 340, 400, 422],
    token: [300, 600],
    marker: [210, 551],
    hots: [
      [94, 600],
      [350, 712],
    ],
    tag: "run",
    app: "po",
  },
  {
    zone: [410, 340, 370, 422],
    token: [555, 560],
    marker: [595, 551],
    hots: [
      [457, 470],
      [717, 650],
    ],
    tag: "run",
    app: "stock",
  },
  {
    zone: [780, 340, 460, 422],
    token: [1010, 565],
    marker: [1010, 680],
    hots: [
      [890, 434],
      [1220, 660],
    ],
    tag: "run",
    app: "mo",
  },
  {
    zone: [1240, 340, 322, 422],
    token: [1400, 690],
    marker: [1401, 551],
    hots: [
      [1339, 509],
      [1518, 691],
    ],
    tag: "run",
    app: "fg",
  },
  {
    zone: [1240, 48, 322, 222],
    token: [1400, 160],
    marker: [1401, 159],
    hots: [
      [1506, 137],
      [1380, 211],
    ],
    tag: "plan",
    app: "war",
  },
];

export const PRODUCTION_APPS: AppLayout = {
  home: { cols: "2.2fr .8fr .9fr 1.6fr" },
  bom: { cols: ".5fr 2.4fr 1.1fr .6fr .7fr" },
  plan: { cols: "2.2fr .7fr .7fr .7fr .8fr .8fr" },
  po: { cols: "1.1fr 2fr .7fr .8fr .8fr", bar: "50%" },
  stock: { cols: "1.1fr 2fr 1.1fr .6fr .7fr .8fr" },
  mo: { cols: "1.5fr .95fr .5fr 1.2fr 1.2fr" },
  fg: { cols: "1.3fr 2fr 1fr .6fr .6fr" },
  war: { cols: "1.6fr 1.6fr 1fr 1fr 1.1fr" },
};
