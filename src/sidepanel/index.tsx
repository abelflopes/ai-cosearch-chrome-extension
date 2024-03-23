import "./run";
import React from "react";
import { createRoot } from "react-dom/client";
import { Manager } from "react-ck";
import { MainView } from "./views/main";

const rootEl = document.querySelector("#root");

if (!rootEl) throw new Error("Missing root element");

createRoot(rootEl).render(
  <React.StrictMode>
    <Manager>
      <React.Suspense fallback={<div>Loading...</div>}>
        <MainView />
      </React.Suspense>
    </Manager>
  </React.StrictMode>,
);
