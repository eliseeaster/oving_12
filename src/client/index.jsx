import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./nav";
import Welcome from "./welcome";
import UserInfo from "./userInfo";
import ChatPage from "./chat";
import Login from "./login";
import { CreateUser } from "./createUser";
import { fetchJSON, postJSON } from "./http";

function App() {
  const bookApi = {
    createUser: async ({ name, email, age }) => {
      return postJSON("/api/users", {
        method: "POST",
        json: { name, email, age },
      });
    },
  };

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/userInfo" component={UserInfo} />
          <Route path="/chat" component={ChatPage} />
          <Route path="/createUser" component={CreateUser} />
        </Switch>
      </Router>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
