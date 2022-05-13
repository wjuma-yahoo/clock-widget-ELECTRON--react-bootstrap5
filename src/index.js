import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route } from "react-router-dom";

import App from "./components/App";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Router>
    <Route component={() => <App />} />
  </Router>
);
