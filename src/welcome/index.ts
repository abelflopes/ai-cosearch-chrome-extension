/**
 * @module
 * This script runs only on the welcome page
 */

import { PATH } from "../common/constants";

void (async (): Promise<void> => {
  // top level await is available in ES modules loaded from script tags
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const tabId = tab?.id;
  const button = document.getElementById("openSidePanel");

  const handleClick = (): void => {
    void (async (): Promise<void> => {
      await chrome.sidePanel.open({ tabId });
      await chrome.sidePanel.setOptions({
        tabId,
        path: PATH.SIDE_PANEL,
        enabled: true,
      });
    })();
  };

  button?.addEventListener("click", handleClick);
})();
