/**
 * @module
 * This script runs on the background
 * @see https://developer.chrome.com/docs/extensions/develop/concepts/service-workers
 */

import { ACTION, MENU_ITEM, PATH } from "../_common/constants";

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// When tab is updated
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  console.log("Service worker tab updated", tabId, info, tab);
});

// When extension was just installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ITEM.OPEN_SIDE_PANEL,
    title: "Open side panel",
    contexts: ["all"],
  });
  chrome.tabs.create({ url: PATH.WELCOME });
});

// When context menu is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MENU_ITEM.OPEN_SIDE_PANEL) {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab?.windowId });
  }
});

// When message is received
chrome.runtime.onMessage.addListener((message, sender) => {
  // The callback for runtime.onMessage must return falsy if we're not sending a response
  void (async () => {
    if (message.type === ACTION.OPEN_SIDE_PANEL) {
      // This will open a tab-specific side panel only on the current tab.
      await chrome.sidePanel.open({ tabId: sender.tab?.id });
      await chrome.sidePanel.setOptions({
        tabId: sender.tab?.id,
        path: PATH.SIDE_PANEL,
        enabled: true,
      });
    }
  })();

  return undefined;
});

// Test / Debug
void (async (): Promise<void> => {
  chrome.runtime.onConnect.addListener((port) => {
    console.log("__service-worker: onConnect port", port.name);

    port.onMessage.addListener((message) => {
      console.log("__service-worker: onConnect onMessage", message);
    });
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("__service-worker: message, sender", message, sender);

    return undefined;
  });

  chrome.runtime.connect(undefined, { name: "__service-worker" });

  console.log("__service-worker: sendMessage");
  const promise = chrome.runtime.sendMessage({ action: "__service-worker message" });

  console.log("promise", promise);
  console.log("req", await promise);

  setTimeout(() => {
    console.log("__service-worker: timeout");
  }, 0);

  setInterval(() => {
    console.log("__service-worker: sendMessage ping");
    void chrome.runtime.sendMessage({ action: "__service-worker ping message" });
  }, 1000);
})();
