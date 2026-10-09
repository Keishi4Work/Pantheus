import type { AppLayout, StopGeometry } from "./stops";

/* Pantheus Office: one working day across the office floor plan. */
export const OFFICE_STOPS: StopGeometry[] = [
  { zone: null, token: [300, 790], hots: [], tag: null, app: "inbox" },
  {
    zone: [168, 380, 472, 372],
    token: [300, 540],
    marker: [404, 566],
    hots: [
      [300, 474],
      [500, 644],
    ],
    tag: "run",
    app: "inbox",
  },
  {
    zone: [168, 48, 352, 282],
    token: [345, 262],
    marker: [344, 189],
    hots: [
      [345, 180],
      [176, 180],
    ],
    tag: "run",
    app: "meet",
  },
  {
    zone: [520, 48, 380, 282],
    token: [700, 290],
    marker: [710, 189],
    hots: [
      [710, 148],
      [710, 268],
    ],
    tag: "run",
    app: "proj",
  },
  {
    zone: [640, 380, 440, 372],
    token: [860, 530],
    marker: [860, 566],
    hots: [
      [860, 465],
      [860, 720],
    ],
    tag: "run",
    app: "task",
  },
  {
    zone: [1080, 380, 472, 372],
    token: [1270, 600],
    marker: [1316, 566],
    hots: [
      [1302, 540],
      [1180, 480],
    ],
    tag: "run",
    app: "chat",
  },
  {
    zone: [900, 48, 360, 282],
    token: [1060, 300],
    marker: [1080, 189],
    hots: [
      [1080, 117],
      [1080, 260],
    ],
    tag: "run",
    app: "docs",
  },
  {
    zone: [1260, 48, 292, 282],
    token: [1400, 300],
    marker: [1406, 189],
    hots: [
      [1345, 125],
      [1410, 260],
    ],
    tag: "run",
    app: "pr",
  },
];

export const OFFICE_APPS: AppLayout = {
  inbox: { cols: "2.2fr 1.6fr 1fr 1fr" },
  meet: { cols: "1.8fr 1.2fr 1fr .7fr 1fr" },
  proj: { cols: "2.4fr 1fr 1fr 1.3fr", bar: "75%" },
  task: { cols: "2.4fr 1.1fr 1fr .8fr" },
  chat: { cols: "1.4fr 2.4fr .8fr .7fr" },
  docs: { cols: "2fr 1.5fr .9fr .9fr .7fr" },
  pr: { cols: "2.2fr 1.2fr 1fr 1.1fr" },
};
