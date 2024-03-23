/**
 * @module
 * This script runs on the background
 * @see https://developer.chrome.com/docs/extensions/develop/concepts/service-workers
 */

import { type Data } from "./data";
import { isSendDataMessage } from "../_messages/send-data";

export const onDataMessageReceived = (callback: (data: Data) => void): void => {
  chrome.runtime.onMessage.addListener((message) => {
    if (isSendDataMessage(message)) callback(message.data);

    return undefined;
  });
};
