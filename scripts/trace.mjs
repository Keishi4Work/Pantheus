// Dev-only: two hero frames ~1.6s apart to confirm the live draw-head is running.
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto(`${base}/en`, { waitUntil: "networkidle" });
await page.waitForTimeout(3000); // base drawn + trace running
await page.screenshot({ path: "/tmp/trace-a.png" });
await page.waitForTimeout(1600);
await page.screenshot({ path: "/tmp/trace-b.png" });
console.log("shot /tmp/trace-a.png /tmp/trace-b.png");
await browser.close();
