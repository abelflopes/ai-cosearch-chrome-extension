/**
 * @module
 * This script runs on the tab's content window
 * sharing the same context as the web page, including DOM and JS execution
 * @see https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts
 */

const button = document.createElement("button");
button.textContent = "Open Side Panel";

console.log("Content window.location", window.location);

button.addEventListener("click", () => {
  void chrome.runtime.sendMessage({ type: "open_side_panel" });
});

document.body.append(button);
