import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { UserInfo } from "../src/client/userInfo";

const userApi = {
  listUsers: async () => [
    { id: 1, name: "Elise", lastName: "Halvorsen", email: "elise@mail" },
  ],
};

describe("user list page", () => {
  it("show users on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <UserInfo userApi={userApi} />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toEqual(
      "Name: Elise  Last Name: Halvorsen Email: elise@mail"
    );
  });
});
