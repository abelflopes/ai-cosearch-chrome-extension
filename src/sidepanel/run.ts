/**
 * @module
 * This script runs on the extension's own window
 * in an isolated context
 * @see https://developer.chrome.com/docs/extensions/reference/api/sidePanel
 */

// Test / Debug
void (async (): Promise<void> => {
  chrome.runtime.onConnect.addListener((port) => {
    console.log("__side-panel: onConnect port", port.name);

    port.onMessage.addListener((message) => {
      console.log("__side-panel: onConnect onMessage", message);
    });
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("__side-panel: message, sender", message, sender);

    return undefined;
  });

  chrome.runtime.connect(undefined, { name: "__side-panel" });

  console.log("__side-panel: sendMessage");
  await chrome.runtime.sendMessage({ action: "__side-panel message" });

  const contexts = await chrome.runtime.getContexts({});

  console.log("__side-panel: contexts", contexts);

  // const options = await chrome.sidePanel.getOptions();

  // console.log("__side-panel: options", options);
})();
