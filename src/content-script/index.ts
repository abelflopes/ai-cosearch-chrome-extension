/**
 * @module
 * This script runs on the tab's content window
 * sharing the same context as the web page, including DOM and JS execution
 * @see https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts
 */

import { ACTION } from "../_common/constants";

const button = document.createElement("button");
button.textContent = "Open Side Panel";

console.log("Content window.location", window.location);

button.addEventListener("click", () => {
  console.log("Content runtime send message", ACTION.OPEN_SIDE_PANEL);

  void chrome.runtime.sendMessage({ type: ACTION.OPEN_SIDE_PANEL });
});

document.body.append(button);

// Test / Debug
void (async (): Promise<void> => {
  chrome.runtime.onConnect.addListener((port) => {
    console.log("__content-script: onConnect port", port.name);

    port.onMessage.addListener((message) => {
      console.log("__content-script: onConnect onMessage", message);
    });
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("__content-script: message, sender", message, sender);

    return undefined;
  });

  chrome.runtime.connect(undefined, { name: "__content-script" });

  console.log("__content-script: sendMessage");
  await chrome.runtime.sendMessage({ action: "__content-script message" });
})();

((): void => {
  let actionTO: number | undefined;

  const debouncedUpdate = (): void => {
    clearTimeout(actionTO);
    actionTO = window.setTimeout(() => {
      const { href } = window.location;
      const html = document.documentElement.outerHTML;

      console.log("__content-script: href", href);
      console.log("__content-script: html", html);

      void chrome.runtime.sendMessage({ action: "__content-script new-page", href, html });
    }, 1000);
  };

  const init = (): void => {
    new MutationObserver(debouncedUpdate).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", debouncedUpdate);

    debouncedUpdate();
  };

  window.addEventListener("load", init);
})();
