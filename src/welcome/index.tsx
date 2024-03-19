/**
 * @module
 * This script runs only on the welcome page
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { Button, Container, Manager, Text } from "react-ck";
import { PATH } from "../common/constants";

const rootEl = document.querySelector("#root");

if (!rootEl) throw new Error("Missing root element");

createRoot(rootEl).render(
  <React.StrictMode>
    <Manager>
      <Container spacingY>
        <Text variation="h1">Welcome</Text>
        <Text>
          You just installed AI CoSearch. Use the browser normally and additional data will be
          provided as you search.
        </Text>
        <Button
          onClick={() => {
            void (async (): Promise<void> => {
              const [tab] = await chrome.tabs.query({
                active: true,
                lastFocusedWindow: true,
              });

              const tabId = tab?.id;

              await chrome.sidePanel.open({ tabId });
              await chrome.sidePanel.setOptions({
                tabId,
                path: PATH.SIDE_PANEL,
                enabled: true,
              });
            })();
          }}>
          Open AI CoSearch
        </Button>
      </Container>
    </Manager>
  </React.StrictMode>,
);
