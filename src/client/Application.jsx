import React, { useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { UserInfo } from "./userInfo";
import { CreateUser } from "./createUser";
import Login from "./login";
import { ChatPage } from "./chat";
import { EditUser } from "./EditUser";
import { fetchJSON, postJSON } from "./http";
import { LoginCallBackPage } from "./LoginCallBackPage";
import { LoginInfoPage } from "./LoginInfoPage";
import { Messages } from "./messages";

export function Application() {
  const userApi = {
    listUsers: async () => await fetchJSON("/api/users"),
    getUser: async (id) => await fetchJSON(`/api/users/${id}`),
    createUser: async ({ name, lastName, email }) => {
      return postJSON("http://localhost:3000/api/users", {
        method: "POST",
        json: { name, lastName, email },
      });
    },
    updateUser: async (id, { name, lastName, email }) =>
      postJSON(`/api/users/${id}`, {
        method: "PUT",
        json: { name, lastName, email },
      }),
    loadProfile: async () =>
      await fetchJSON("/api/login-info", {
        headers: {
          ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        },
      }),
  };

  const messageApi = {
    listMessages: async () => await fetchJSON("/api/messages"),
    getMessage: async (id) => await fetchJSON(`/api/messages/${id}`),
    createMessage: async ({ username, message }) => {
      return postJSON("/api/messages", {
        method: "POST",
        json: { username, message },
      });
    },
  };

  const [access_token, setAccess_token] = useState();
  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "869093563251-h9ra6bludm19okni7jgaool77vq8773v.apps.googleusercontent.com",
  };

  return (
    <>
      <main>
        <Switch>
          <Route path="/create">
            <nav>
              <Link to={"/home"}>Back</Link>
            </nav>
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <CreateUser userApi={userApi} />
            )}
          </Route>

          <Route exact path="/users">
            <nav>
              <Link to={"/home"}>Back</Link>
            </nav>
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <UserInfo userApi={userApi} />
            )}
          </Route>

          <Route path="/chat">
            <nav>
              <Link to={"/home"}>Back</Link>
            </nav>
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <ChatPage messageApi={messageApi}></ChatPage>
            )}
          </Route>

          <Route path="/messages">
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <Messages messageApi={messageApi}></Messages>
            )}
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
            <LoginInfoPage userApi={userApi} />
          </Route>

          <Route path="/users/:id/edit">
            <nav>
              <Link to={"/home"}>Back</Link>
            </nav>
            {!access_token ? (
              <Redirect to={"/"} />
            ) : (
              <EditUser userApi={userApi} />
            )}
          </Route>

          <Route exact path="/home">
            <h1>Welcome</h1>
            <div className="navContainer">
              <div>
                <Link to="/users">See users</Link>
              </div>
              <div>
                <Link to="/login-info">Profile</Link>
              </div>

              <div>
                <Link to="/chat">Chat</Link>
              </div>

              <div>
                <Link to="/messages">Messages</Link>
              </div>

              <div>
                <Link to="/create">Create</Link>
              </div>
            </div>
          </Route>
          <Route>Not found</Route>
        </Switch>
      </main>
    </>
  );
}
