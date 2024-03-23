/**
 * @module
 * This script runs only on the welcome page
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { Button, Container, Manager, Text } from "react-ck";
import { openSidePanelAllTabs } from "../_common/actions";

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
            void openSidePanelAllTabs();
          }}>
          Open AI CoSearch
        </Button>
      </Container>
    </Manager>
  </React.StrictMode>,
);
