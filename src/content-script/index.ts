/**
 * @module
 * This script runs on the tab's content window
 * sharing the same context as the web page, including DOM and JS execution
 * @see https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts
 */

import { ACTION } from "../common/constants";

const button = document.createElement("button");
button.textContent = "Open Side Panel";

console.log("Content window.location", window.location);

button.addEventListener("click", () => {
  void chrome.runtime.sendMessage({ type: ACTION.OPEN_SIDE_PANEL });
});

document.body.append(button);
