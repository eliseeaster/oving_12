import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { UserInfo } from "./userInfo";
import { CreateUser } from "./createUser";
import Login from "./login";
import Welcome from "./welcome";
import { ChatPage } from "./chat";
import { EditUser } from "./EditUser";
import { fetchJSON } from "./http";
import { LoginCallBackPage } from "./LoginCallBackPage";
import { LoginInfoPage } from "./LoginInfoPage";

export function Application({ userApi }) {
  const [access_token, setAccess_token] = useState();
  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "869093563251-h9ra6bludm19okni7jgaool77vq8773v.apps.googleusercontent.com",
  };

  async function loadProfile() {
    return fetchJSON("/api/login-info", {
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });
  }

  return (
    <>
      <main>
        <Switch>
          <Route path="/create">
            <nav>
              <Link to={"/home"}>Back</Link>
            </nav>
            <CreateUser userApi={userApi} />
          </Route>

          <Route exact path="/users">
            <nav>
              <Link to={"/home"}>Back</Link>
            </nav>
            <UserInfo userApi={userApi} />
          </Route>

          <Route path="/chat">
            <nav>
              <Link to={"/home"}>Back</Link>
            </nav>
            <ChatPage></ChatPage>
          </Route>

          <Route path={"/"} exact>
            <Login identityProvider={googleIdentityProvider} />
          </Route>

          <Route path="/login/callback">
            <LoginCallBackPage
              identityProvider={googleIdentityProvider}
              onAccessToken={(access_token) => setAccess_token(access_token)}
            />
          </Route>

          <Route path="/login-info">
            <nav>
              <Link to={"/home"}>Back</Link>
            </nav>
            <LoginInfoPage loadProfile={loadProfile} />
          </Route>

          <Route path="/users/:id/edit">
            <nav>
              <Link to={"/home"}>Back</Link>
            </nav>
            <EditUser userApi={userApi} />
          </Route>

          <Route exact path="/home">
            <div>
              <h1>Welcome</h1>
              <ul>
                <li>
                  <Link to="/users">See users</Link>
                </li>
                <li>
                  <Link to="/login-info">Profile</Link>
                </li>

                <li>
                  <Link to="/chat">Chat</Link>
                </li>

                <li>
                  <Link to="/create">Create</Link>
                </li>
              </ul>
            </div>
          </Route>
          <Route>Not found</Route>
        </Switch>
      </main>
    </>
  );
}
