import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./nav";
import Welcome from "./welcome";
import { ChatPage } from "./chat";
import Login from "./login";
import { CreateUser } from "./createUser";
import { fetchJSON, postJSON } from "./http";
import { EditUser } from "./EditUser";
import { UserInfo } from "./userInfo";
import { Link } from "react-router-dom";

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
    <>
      <Router>
        <header>
          <Link to="/">Tilbake</Link>
        </header>
        <Switch>
          <Route exact path="/users">
            <UserInfo userApi={userApi} />
          </Route>
          <Route path="/create">
            <CreateUser userApi={userApi} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/chat">
            <ChatPage></ChatPage>
          </Route>
          <Route path="/users/:id/edit">
            <EditUser userApi={userApi} />
          </Route>
          <Route>
            <h1>Not found</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
