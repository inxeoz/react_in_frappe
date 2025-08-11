// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

let root: Root | null = null;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export function mountReact(target: HTMLElement) {
  if (!root) {
    root = createRoot(target);
  }
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
