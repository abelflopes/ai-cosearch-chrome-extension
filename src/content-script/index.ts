/**
 * @module
 * This script runs on the tab's content window
 * sharing the same context as the web page, including DOM and JS execution
 * @remarks
 * sends url and html when the page loads, or content changes
 * @see https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts
 */

import { sendData } from "../_common/actions";

((): void => {
  let actionTO: number | undefined = undefined;

  const debouncedUpdate = (): void => {
    clearTimeout(actionTO);
    actionTO = window.setTimeout(() => {
      const { href: url } = window.location;
      const html = document.documentElement.outerHTML;

      void sendData({ url, html });
    }, 1000);
  };

  const init = (): void => {
    new MutationObserver(debouncedUpdate).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    window.addEventListener("resize", debouncedUpdate);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") debouncedUpdate();
    });
    debouncedUpdate();
  };

  window.addEventListener("load", init);
})();
