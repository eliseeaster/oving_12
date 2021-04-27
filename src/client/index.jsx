import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchJSON, postJSON } from "./lib/Http";
import { Application } from "./Application";

function App() {
  return (
    <Router>
      <Application />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
