// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // works now
import "./index.css";

export function mountReact(target) {
  ReactDOM.createRoot(target).render(<App />);
}
