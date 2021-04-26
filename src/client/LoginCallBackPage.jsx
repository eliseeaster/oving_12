import * as React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

export function LoginCallBackPage({ onAccessToken, identityProvider }) {
  const hash = Object.fromEntries(
    new URLSearchParams(window.location.hash.substr(1))
  );

  const history = useHistory();

  useEffect(() => {
    const loginState = JSON.parse(sessionStorage.getItem("loginState"));
    const { access_token, state } = hash;

    if (state !== loginState.state) {
      alert("go away");
      return;
    }
    onAccessToken(access_token);
    history.push("/home");
  }, [hash]);

  return <h1>Login Callback</h1>;
}
