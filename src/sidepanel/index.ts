/**
 * @module
 * This script runs on the extension's own window
 * in an isolated context
 * @see https://developer.chrome.com/docs/extensions/reference/api/sidePanel
 */

console.log("Sidepanel window.location", window.location);

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log("Sidepanel message, sender", message, sender);

  return undefined;
});

void (async (): Promise<void> => {
  const contexts = await chrome.runtime.getContexts({});

  console.log("Sidepanel contexts", contexts);

  // const options = await chrome.sidePanel.getOptions();

  // console.log("Sidepanel options", options);
})();
