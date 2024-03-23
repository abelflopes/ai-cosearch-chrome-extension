/**
 * @module
 * This script runs on the background
 * @see https://developer.chrome.com/docs/extensions/develop/concepts/service-workers
 */

import { sendData } from "../_common/actions";
import { type Data } from "../_common/data";
import { onDataMessageReceived } from "../_common/handlers";
import "./context-menus/open";
import "./lifecycle/init";

let tempData: Data | undefined = undefined;

// Store data in case the side panel was not connected
// to send it once connected
onDataMessageReceived((data) => {
  tempData = data;
});

// Listen to connection from side panel
// Sends existing data once connected
chrome.runtime.onConnect.addListener(() => {
  if (tempData) void sendData(tempData);
});
