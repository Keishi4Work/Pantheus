// Dev-only: hero close-ups (top viewport) for both locales after the load reveal.
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: "chrome" });

for (const [path, out] of [
  ["/", "/tmp/hero-vi.png"],
  ["/en", "/tmp/hero-en.png"],
]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(4200); // let the on-load reveal + car draw finish
  await page.screenshot({ path: out });
  await page.close();
  console.log("shot", out);
}
await browser.close();
