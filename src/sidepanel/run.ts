/**
 * @module
 * This script runs on the extension's own window
 * in an isolated context
 * @see https://developer.chrome.com/docs/extensions/reference/api/sidePanel
 */

import { onDataMessageReceived } from "../_common/handlers";
import { prepareContent } from "./utils";

onDataMessageReceived((data) => {
  console.log("__side-panel: onDataMessageReceived", data);

  const entry = {
    url: data.url,
    content: prepareContent(data.html),
    date: new Date().toISOString(),
  };

  console.log("entry >>>", entry);
});

// Connect to service worker
// Triggers service to send initial data once connected
chrome.runtime.connect();
