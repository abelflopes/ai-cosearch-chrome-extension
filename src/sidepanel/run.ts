/**
 * @module
 * This script runs on the extension's own window
 * in an isolated context
 * @see https://developer.chrome.com/docs/extensions/reference/api/sidePanel
 */

import TurndownService from "turndown";
import { onDataMessageReceived } from "../_common/handlers";

const turndownService = new TurndownService();

/**
 * Expands an HTML element and its child nodes (including shadow root) into a string representation
 *
 * @param node - The HTML element to expand.
 * @param exclude - A function that determines whether a child node should be excluded from the expansion.
 * @returns The expanded HTML as a string.
 */
function expandHTML(node: Element, exclude?: (el: ChildNode) => boolean): string {
  let html = "";
  node.childNodes.forEach((n) => {
    if (exclude && exclude(n)) return;
    if ("shadowRoot" in n && n.shadowRoot instanceof Element && n.shadowRoot)
      html += expandHTML(n.shadowRoot);
    else if (n.nodeName === "#text") html += n.nodeValue;
    else if ("outerHTML" in n && typeof n.outerHTML === "string" && n.outerHTML)
      html += n.outerHTML;
    else throw new Error("Unknown node type");
  });
  return html;
}

/**
 * Parses the given HTML string and returns a sanitized version of it. Excludes user sensitive
 * information and irrelevant elements
 *
 * @param html - The HTML string to parse.
 * @returns The sanitized HTML string.
 */
const parseHTML = (html: string): string => {
  const host = document.createElement("div");
  const shadow = host.attachShadow({ mode: "closed" });
  const div = document.createElement("div");
  div.innerHTML = html;
  shadow.appendChild(div);

  return expandHTML(div, (el) =>
    [
      el.nodeName === "#comment", // Exclude comments
      el.nodeName === "SCRIPT", // Exclude scripts
      el.nodeName === "STYLE", // Exclude styles
      el.nodeName === "LINK", // Exclude styles
      el.nodeName === "INPUT", // Exclude inputs
      el.nodeName === "svg", // Exclude svg images
    ].some(Boolean),
  );
};

onDataMessageReceived((data) => {
  console.log("__side-panel: onDataMessageReceived", data);

  const html = parseHTML(data.html);
  const markdown = turndownService.turndown(html);
  console.log("html >>>", html);
  console.log("markdown >>>", markdown);
});

// Connect to service worker
// Triggers service to send initial data once connected
chrome.runtime.connect();
