import puppeteer from "puppeteer";
import { distDir } from "../config/paths";

const EXTENSION_PATH = distDir;
// const EXTENSION_ID = "jkomgjfbbjocikdmilgaehbfpllalmia";

void (async (): Promise<void> => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    dumpio: true,
    slowMo: 100,
    // https://github.com/puppeteer/puppeteer/blob/main/docs/guides/chrome-extensions
    // https://github.com/puppeteer/puppeteer/blob/main/packages/puppeteer-core/src/node/ChromeLauncher.ts#L192
    // https://github.com/GoogleChrome/chrome-launcher/blob/main/docs/chrome-flags-for-tools.md
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
      "--window-size=1300,700",
      // "--start-maximized",
    ],
    defaultViewport: {
      width: 740,
      height: 600,
    },
  });

  // Show extensions page with dev mode enabled
  const [page] = await browser.pages();

  if (!page) throw new Error("No page found");

  await page.goto(`chrome://extensions`);
  await page.waitForNetworkIdle();
  await page.evaluateHandle(() =>
    document
      .querySelector("body > extensions-manager")
      ?.shadowRoot?.querySelector("#toolbar")
      ?.shadowRoot?.querySelector<HTMLButtonElement>("#devMode")
      ?.click(),
  );
  await page.evaluateHandle(() =>
    document
      .querySelector("body > extensions-manager")
      ?.shadowRoot?.querySelector("#viewManager")
      ?.querySelector("#items-list")
      ?.shadowRoot?.querySelector(".items-container:not(.review-panel-container)")
      ?.querySelector("extensions-item")
      ?.shadowRoot?.querySelector<HTMLButtonElement>("#detailsButton")
      ?.click(),
  );
})();
