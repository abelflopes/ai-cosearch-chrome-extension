import "./run";
import React from "react";
import { createRoot } from "react-dom/client";
import { Container, Manager, Spinner, Text } from "react-ck";

const rootEl = document.querySelector("#root");

if (!rootEl) throw new Error("Missing root element");

createRoot(rootEl).render(
  <React.StrictMode>
    <Manager>
      <Container spacingY>
        <Text variation="h1">AI CoSearch</Text>
        <Text>Use the browser normally and additional information will be presented here</Text>
        <Spinner />
      </Container>
    </Manager>
  </React.StrictMode>,
);
