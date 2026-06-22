// Dev-only screenshot helper. Drives system Chrome via playwright-core,
// scrolls the page to trigger scroll-reveal animations, then captures full-page.
// Usage: node scripts/shot.mjs <baseUrl>
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3100";

const targets = [
  { url: `${base}/`, out: "/tmp/g6-vi-full.png", w: 1440, h: 1024 },
  { url: `${base}/en`, out: "/tmp/g6-en-full.png", w: 1440, h: 1024 },
  { url: `${base}/`, out: "/tmp/g6-mobile-full.png", w: 390, h: 844 },
];

const browser = await chromium.launch({ channel: "chrome" });
for (const t of targets) {
  const page = await browser.newPage({
    viewport: { width: t.w, height: t.h },
    deviceScaleFactor: 1,
  });
  await page.goto(t.url, { waitUntil: "networkidle" });

  // Walk down the page so every whileInView section fires, then return to top.
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y);
          y += window.innerHeight * 0.6;
          if (y < document.body.scrollHeight) setTimeout(step, 110);
          else {
            window.scrollTo(0, 0);
            setTimeout(resolve, 400);
          }
        };
        step();
      }),
  );

  await page.waitForTimeout(700);
  await page.screenshot({ path: t.out, fullPage: true });
  await page.close();
  console.log("shot", t.out);
}
await browser.close();
