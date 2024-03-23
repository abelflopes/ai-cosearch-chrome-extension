import { MENU_ITEM, PATH } from "../../_common/constants";

// When extension was just installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ITEM.OPEN_SIDE_PANEL,
    title: "Open side panel",
    contexts: ["all"],
  });
  void chrome.tabs.create({ url: PATH.WELCOME });
});

// When context menu is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MENU_ITEM.OPEN_SIDE_PANEL) {
    // This will open the panel in all the pages on the current window.
    void chrome.sidePanel.open({ windowId: tab?.windowId });
  }
});
