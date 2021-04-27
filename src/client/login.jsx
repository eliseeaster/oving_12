import React, { useState } from "react";
import "./index.jsx";
import { fetchJSON } from "./http";

export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

export function Login({ identityProvider }) {
  const { discoveryURL, client_id } = identityProvider;

  async function handleLogin() {
    const { authorization_endpoint } = await fetchJSON(discoveryURL);

    const state = randomString(30);
    const loginState = { state };
    sessionStorage.setItem("loginState", JSON.stringify(loginState));

    const params = {
      client_id,
      response_type: "token",
      scope: "openid email profile",
      redirect_uri: window.location.origin + "/login/callback",
      state,
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }

  return (
    <div className="loginDiv">
      <h1 className="loginTxt">Login</h1>
      <button className="loginBtn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
