import { CreateUser } from "../src/client/createUser";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { act, Simulate } from "react-dom/test-utils";
import { jest } from "@jest/globals";

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("Create user page", () => {
  it("can create a user", async () => {
    const createUser = jest.fn();
    const container = await renderForTest(
      <CreateUser userApi={{ createUser }} />
    );

    Simulate.change(container.querySelector("input"), {
      target: { value: "Fanny" },
    });
    Simulate.submit(container.querySelector("form"));
    expect(createUser).toBeCalledWith({
      name: "Fanny",
      lastName: "",
      email: "",
    });
  });
});
