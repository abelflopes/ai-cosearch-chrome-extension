import puppeteer, { type Browser } from "puppeteer";

import { distDir } from "../../config/paths";

const EXTENSION_PATH = distDir;
// const EXTENSION_ID = "jkomgjfbbjocikdmilgaehbfpllalmia";

export class TestBrowser {
  private browser: Browser | undefined;
  private startTo: NodeJS.Timeout | undefined;

  public startDebounced(): void {
    clearTimeout(this.startTo);
    this.startTo = setTimeout(() => {
      void this.start();
    }, 3000);
  }

  public async start(): Promise<void> {
    console.log(">>>>> START >>>>>");
    this.browser = await puppeteer.launch({
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

    // Navigate to a reddit page
    const redditPage = await this.browser.newPage();
    await redditPage.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
    await redditPage.goto(
      "https://www.reddit.com/r/Supernatural/search/?q=space&type=link&cId=0eec1c12-82a9-4677-b8a0-a8005d11bfd4&iId=804248b2-e844-48bb-9670-848b64317e46",
    );

    // Show extensions page with dev mode enabled
    const extensionsPage = await this.browser.newPage();
    await extensionsPage.goto(`chrome://extensions`);
    await extensionsPage.waitForNetworkIdle();
    await extensionsPage.evaluateHandle(() =>
      document
        .querySelector("body > extensions-manager")
        ?.shadowRoot?.querySelector("#toolbar")
        ?.shadowRoot?.querySelector<HTMLButtonElement>("#devMode")
        ?.click(),
    );
    await extensionsPage.evaluateHandle(() =>
      document
        .querySelector("body > extensions-manager")
        ?.shadowRoot?.querySelector("#viewManager")
        ?.querySelector("#items-list")
        ?.shadowRoot?.querySelector(".items-container:not(.review-panel-container)")
        ?.querySelector("extensions-item")
        ?.shadowRoot?.querySelector<HTMLButtonElement>("#detailsButton")
        ?.click(),
    );
  }

  public end(): void {
    void this.browser?.close();
  }
}
