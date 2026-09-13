import puppeteer from "puppeteer-core";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const fileUrl = "file://" + path.resolve(__dirname, "elinlaakari-peli.html");

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });

const consoleErrors = [];
const pageErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => pageErrors.push(err.message));

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 30000 });

const initCheck = await page.evaluate(() => ({
  title: document.title,
  hasScreen: !!document.getElementById("screen"),
  bellaText: document.getElementById("bella-text")?.textContent?.slice(0, 40)
}));

const smoke = await page.evaluate(() => window.__smokeTest());
const stress = await page.evaluate(() => window.__stressTest(100));

async function clickAction(action) {
  await page.evaluate((a) => {
    const el = document.querySelector(`[data-action="${a}"]`);
    if (el) el.click();
  }, action);
}

async function clickRoom(room) {
  await page.evaluate((r) => {
    const el = document.querySelector(`.room-btn[data-room="${r}"]`);
    if (el) el.click();
  }, room);
}

async function getRoom() {
  return page.evaluate(() => {
    const active = document.querySelector(".room-btn.active");
    return active?.dataset?.room || null;
  });
}

async function hasMapLocations() {
  return page.evaluate(() => ({
    reception: !!document.querySelector('[data-action="goto-reception"]'),
    garden: !!document.querySelector('[data-action="goto-garden"]'),
    album: !!document.querySelector('[data-action="open-album-map"]'),
    collection: !!document.querySelector('[data-action="open-collection-map"]')
  }));
}

// Navigation path: reception -> map -> each destination -> back to map
await clickRoom("reception");
await wait(300);
const navResults = {};

await clickRoom("map");
await wait(400);
navResults.onMap = (await getRoom()) === "map";
navResults.mapLocations = await hasMapLocations();

await clickAction("goto-reception");
await wait(400);
navResults.gotoReception = (await getRoom()) === "reception";

await clickRoom("map");
await wait(300);
await clickAction("goto-garden");
await wait(400);
navResults.gotoGarden = (await getRoom()) === "garden";

await clickRoom("map");
await wait(300);
await clickAction("open-album-map");
await wait(400);
navResults.albumModal = await page.evaluate(() => !!document.querySelector('.modal-overlay[data-modal="1"] h3'));

await page.evaluate(() => document.querySelector('[data-action="close-modal"]')?.click());
await wait(200);

await clickAction("open-collection-map");
await wait(400);
navResults.collectionModal = await page.evaluate(() =>
  document.body.textContent.includes("Tarra-kokoelma")
);

await page.evaluate(() => document.querySelector('[data-action="close-modal"]')?.click());
await wait(200);
navResults.stillOnMap = (await getRoom()) === "map";

const screenshotPath = path.resolve(__dirname, "_qa-map-375.png");
await page.screenshot({ path: screenshotPath, fullPage: true });

await browser.close();

const report = {
  syntax: "OK (separate step)",
  initCheck,
  consoleErrors,
  pageErrors,
  smoke,
  stress,
  navResults,
  screenshot: screenshotPath
};

console.log(JSON.stringify(report, null, 2));

const failed =
  pageErrors.length > 0 ||
  consoleErrors.length > 0 ||
  !smoke ||
  !stress ||
  !navResults.onMap ||
  !navResults.gotoReception ||
  !navResults.gotoGarden ||
  !navResults.albumModal ||
  !navResults.collectionModal;

if (failed) process.exit(1);
