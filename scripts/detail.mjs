// Dev-only: targeted shots to verify the B/W transition + nav inversion.
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: "chrome" });

async function fullReveal(page) {
  await page.evaluate(
    () =>
      new Promise((r) => {
        let y = 0;
        const s = () => {
          window.scrollTo(0, y);
          y += 400;
          if (y < document.body.scrollHeight) setTimeout(s, 80);
          else {
            window.scrollTo(0, 0);
            setTimeout(r, 300);
          }
        };
        s();
      }),
  );
}

const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto(`${base}/en`, { waitUntil: "networkidle" });
await fullReveal(page);
await page.waitForTimeout(400);

// Scroll so the nav sits over the dark Pillars section (verify white wordmark)
const approachTop = await page.evaluate(() => {
  const el = document.querySelector("#approach");
  return el.getBoundingClientRect().top + window.scrollY;
});
await page.evaluate((y) => window.scrollTo(0, y), approachTop + 40);
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/d-nav-dark.png", clip: { x: 0, y: 0, width: 1440, height: 360 } });
console.log("shot /tmp/d-nav-dark.png");

// Full dark Pillars section
const pillars = await page.$("#approach");
await pillars.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await pillars.screenshot({ path: "/tmp/d-pillars-dark.png" });
console.log("shot /tmp/d-pillars-dark.png");

// Closing (dark + aura)
const closing = await page.$("#contact");
await closing.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await closing.screenshot({ path: "/tmp/d-closing-dark.png" });
console.log("shot /tmp/d-closing-dark.png");

await browser.close();
