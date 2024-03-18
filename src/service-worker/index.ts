/**
 * @module
 * This script runs on the background
 * @see https://developer.chrome.com/docs/extensions/develop/concepts/service-workers
 */

import { ACTION, MENU_ITEM, PATH } from "../common/constants";

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  console.log("tab updated", tabId, info, tab);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ITEM.OPEN_SIDE_PANEL,
    title: "Open side panel",
    contexts: ["all"],
  });
  chrome.tabs.create({ url: PATH.WELCOME });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MENU_ITEM.OPEN_SIDE_PANEL) {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab?.windowId });
  }
});

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
