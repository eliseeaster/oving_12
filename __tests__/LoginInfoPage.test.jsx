import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import * as React from "react";
import { LoginInfoPage } from "../src/client/LoginInfoPage";
import { jest } from "@jest/globals";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("profile page test", () => {
  it("can show information about logged in user", async () => {
    const loadProfile = () => ({
      name: "Elise",
    });
    const container = await renderForTest(
      <LoginInfoPage userApi={{ loadProfile }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Your profileName: EliseEmail: "
    );
  });

  it("shows loading ", async () => {
    const loadProfile = jest.fn();
    const container = await renderForTest(
      <LoginInfoPage userApi={{ loadProfile }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual("Loading...");
  });

  xit("show error message", async () => {
    const loadProfile = () => {
      throw new Error("Failed to load");
    };
    const container = await renderForTest(
      <LoginInfoPage userApi={{ loadProfile }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: Error: Failed to load"
    );
  });
});
