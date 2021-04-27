import { EditUser } from "../src/client/EditUser";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { act, Simulate } from "react-dom/test-utils";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("edit user page", () => {
  it("can show information about an existing user", async () => {
    const getUser = () => ({
      name: "Tina",
      lastName: "Halvorsen",
      email: "tina@mail",
    });
    const container = await renderForTest(<EditUser userApi={{ getUser }} />);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Edit an existing user (Tina)"
    );
  });

  it("can show loading screen", async () => {
    const getUser = () => new Promise((resolve) => {});
    const container = await renderForTest(<EditUser userApi={{ getUser }} />);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual("Loading...");
  });

  it("can show error message", async () => {
    const getUser = () => {
      throw new Error("Failed to load");
    };
    const container = await renderForTest(<EditUser userApi={{ getUser }} />);
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: Error: Failed to load"
    );
  });

  it("updates server on submit", async () => {
    const user = {
      name: "Elise",
      lastName: "Kristiansen",
      email: "elise@mail",
    };
    const getUser = () => user;
    const updateUser = jest.fn();
    const container = await renderForTest(
      <EditUser userApi={{ getUser, updateUser }} />
    );
    Simulate.change(container.querySelector("input"), {
      target: { value: "Fanny" },
    });
    Simulate.submit(container.querySelector("form"));
    expect(updateUser).toBeCalledWith(undefined, {
      ...user,
      name: "Fanny",
    });
  });
});
