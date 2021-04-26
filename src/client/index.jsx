import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchJSON, postJSON } from "./http";
import { Application } from "./Application";

function App() {
  const userApi = {
    listUsers: async () => await fetchJSON("/api/users"),
    getUser: async (id) => await fetchJSON(`/api/users/${id}`),
    createUser: async ({ name, lastName, email }) => {
      return postJSON("/api/users", {
        method: "POST",
        json: { name, lastName, email },
      });
    },
    updateUser: async (id, { name, lastName, email }) =>
      postJSON(`/api/users/${id}`, {
        method: "PUT",
        json: { name, lastName, email },
      }),
  };

  return (
    <Router>
      <Application userApi={userApi} />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
