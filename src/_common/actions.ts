import { type Data } from "./data";
import { type SendDataMessage } from "../_messages/send-data";
import { PATH } from "./constants";

export const sendMessage = async (message: SendDataMessage): Promise<void> => {
  await chrome.runtime.sendMessage(message);
};

/**
 * Send message to service worker or side panel
 */
export const sendData = async (data: Data): Promise<void> => {
  await sendMessage({ action: "send-data", data });
};

/**
 * Open side panel in all tabs
 */
export const openSidePanelAllTabs = async (): Promise<void> => {
  const tabs = await chrome.tabs.query({});

  await Promise.all(
    tabs.map(async (tab) => {
      const tabId = tab.id;

      await chrome.sidePanel.open({ tabId });
      await chrome.sidePanel.setOptions({
        tabId,
        path: PATH.SIDE_PANEL,
        enabled: true,
      });
    }),
  );
};
