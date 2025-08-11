// // src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx"; // works now
// import "./index.css";

// export function mountReact(target) {
//   ReactDOM.createRoot(target).render(<App />);
// }

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { TicketProvider } from "./ticket/TicketContext";
import "./index.css";

export function mountReact(target) {
  ReactDOM.createRoot(target).render(
    <React.StrictMode>
      <BrowserRouter basename="/app/mypage">
        <TicketProvider>
          <App />
        </TicketProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
