// Dev-only: sample frames across one full 22s blueprint-car loop (plus the
// start of the second cycle to prove the wrap), then a reduced-motion shot.
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto(`${base}/en`, { waitUntil: "networkidle" });

const t0 = Date.now();
for (const t of [2500, 5000, 7500, 9500, 13000, 13300, 19000, 21500, 27500]) {
  await page.waitForTimeout(Math.max(0, t - (Date.now() - t0)));
  await page.screenshot({ path: `/tmp/loop-${t}.png` });
  console.log("shot", `/tmp/loop-${t}.png`);
}

await page.emulateMedia({ reducedMotion: "reduce" });
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "/tmp/loop-reduced.png" });
console.log("shot /tmp/loop-reduced.png");
await browser.close();
