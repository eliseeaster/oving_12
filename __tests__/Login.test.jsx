import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Login } from "../src/client/Login";

const googleIdentityProvider = {
  discoveryURL: "https://accounts.google.com/.well-known/openid-configuration",
  client_id:
    "916384078084-0vdudp3eluljf617umqmtoeuu870iru0.apps.googleusercontent.com",
};

describe("login page", () => {
  it("displays login page", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <Login identityProvider={{ googleIdentityProvider }} />,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
  });
});
