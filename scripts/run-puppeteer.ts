import puppeteer from "puppeteer";
import { distDir } from "../config/paths";

const EXTENSION_PATH = distDir;
// const EXTENSION_ID = "jkomgjfbbjocikdmilgaehbfpllalmia";

void (async (): Promise<void> => {
  await puppeteer.launch({
    headless: false,
    devtools: true,
    dumpio: true,
    slowMo: 250,
    // https://cri.dev/posts/2020-04-04-Full-list-of-Chromium-Puppeteer-flags/
    args: [`--disable-extensions-except=${EXTENSION_PATH}`, `--load-extension=${EXTENSION_PATH}`],
  });

  // const page = await browser.newPage();

  // await page.goto(`chrome-extension://${EXTENSION_ID}/sidepanel/index.html`);
  // await page.goto(`https://www.youtube.com/watch?v=u3Lzk4HVE-c&ab_channel=RTP`);

  // await browser.close();
})();
